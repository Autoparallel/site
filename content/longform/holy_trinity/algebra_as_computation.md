+++
title = "algebra as computation"
date = "2024-04-17"
template = "blog.html"
description = "It's good to start with an example, and one I am quite fond of is the construction with vector spaces by creating sum types and product types. These all are miraculously ubiquitous objects whether you are in physics, computer science, or mathematics. We will see how one can go from the algebraic perspective straight into implementation and how we can extract additional features of these objects naturally."
[taxonomies]
tags = ["math", "algebra", "category theory"]
+++
---

**Warning:** This blog started as a blurb and I ended up nerd sniping myself into writing this from a far more categorical perspective -- hopefully it illuminates *why* we define structures in the way we do from a perspective of computation!

---

# motivation
This blog is the first in a series that dives into the intersection of mathematics and computation.
Ultimately, I know that I want the first few pieces to go and define very rigorously and programmatically the notion of Clifford algebras.
To get there, we will lay some groundwork and build up fundamentals so we can get to this point.

Let's take an approach that is very algebraic and categorical in nature.
The reason why isn't to be confusing or overly abstract, but to hopefully bridge a gap into how this is all defines a means of computation whereby I mean "your ability to write software using these tools."
From a philosphical perspective, I believe algebra is a means of constructing data structures and computational rules via their relationships to one another.
We should take this approach and build up this technology in a rigorous way.

I firmly believe that being able to go from these abstract constructions of diagrams to implementation is a valuable skill that will enhance your ability to write elegant and safe programs.

# algebraic structure
By algebra and structure, I mean the following:
- **Algebra**: We are working with a set of objects, operations, and relations on these objects.
- **Structure**: We are imposing rules on these objects and operations that make them behave in a certain way given the relations.

There's many places we could begin with algebraic structure, but vector spaces are a nice place to start due to their ubiquity, flexibility, and they also have many nice properties.

These structures will come about in programming as [*interfaces*](https://en.wikipedia.org/wiki/API).
As with an interface, structures do not require a specific implementation, but they do require that certain operations are defined and that they satisfy certain relationships.
Your specific problems will call out to you to make your specific implementations!

## vector spaces
Throughout this longform piece, we will work with finite dimensional [*vector spaces* $V$](https://en.wikipedia.org/wiki/Vector_space) over some [field $\mathbb{F}$](https://en.wikipedia.org/wiki/Field_(mathematics)).
We won't really care about what field we use to be the numbers we pile into vectors, we really just care that the multiplication of these *scalars* (elements of the underlying field) are commutative and we can find inverses for everything other than the $0$ element. 
Replace vector spaces with [modules](https://en.wikipedia.org/wiki/Module_(mathematics)) if you want to be more general or feel free to remove the restriction of finite-dimensionality (though be careful with both!).

If you don't feel comfortable with vector spaces and linear algebra, I would recommend you take a look at [3Blue1Brown's Essence of Linear Algebra](https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab) series.
We will review a bit nonetheless.

### operations and diagrams
Let's review some operations we can do on vector spaces themselves so that we have our modular structures in place.
Ultimately operations at the structural level descend to operations on the object level (e.g., on the vectors).

In a vector space $V$ we can take linear combinations using vectors $\boldsymbol{v},\boldsymbol{v\'} \in V$ and scalars $a, b \in \mathbb{F}$ to get new vectors in $V$:
$$
a\cdot \boldsymbol{v} + b \cdot \boldsymbol{v\'}
$$

Diagramatically, we have the following:
$$
\+ \colon V\times V \to V \\\\ ~ \\\\
\cdot \colon \mathbb{F} \times V \to V
$$
We usually drop the $\cdot$ notation and just put $a\boldsymbol{v}$ for scalar multiplication, but the above was just to be clear.

How can we code something like this up?
First, we need some sort of structure to work with and for a vector space we can just take these to be an array of numbers.
We will define this vector space type in Rust to wrap this array and provide functionality like so:
```rust
#[derive(Copy, Clone)]
pub struct V<const M: usize, F>([F; M]);

impl<const M: usize, F> Default for V<M, F>
where
    F: Default + Copy,
{
    fn default() -> Self {
        V([F::default(); M])
    }
}

impl<const M: usize, F: Add<Output = F> + Default + Copy> Add for V<M, F> {
    type Output = Self;
    fn add(self, other: V<M, F>) -> Self::Output {
        let mut sum = V::default();
        for i in 0..M {
            sum.0[i] = self.0[i] + other.0[i];
        }
        sum
    }
}

impl<const M: usize, F: Mul<Output = F> + Default + Copy> Mul<F> for V<M, F> {
    type Output = Self;
    fn mul(self, scalar: F) -> Self::Output {
        let mut scalar_multiple = V::default();
        for i in 0..M {
            scalar_multiple.0[i] = scalar * self.0[i];
        }
        scalar_multiple
    }
}
```
In the above, think of `F` as the field we are choosing to work over and the method `F::default` as the function that gets the zero element of the field $0\in \mathbb{F}$ (though you do have to be careful here).
Subsequently, $M$ is the number of components of the vectors we are working with (also equivalent to the [dimension](https://en.wikipedia.org/wiki/Dimension_(vector_space))), and the implementations of the `Add` and `Mul<F>` traits are what we defined in the diagrams for the vector addition $V \times V \to V$ and the scalar multiplication $\mathbb{F} \times V \to V$ respectively.
The derived traits like `Clone` and `Copy` do not have to inherently be there for the type we are defining, but they are handy with Rust's memory model.

Diagrams like this yield basic rules, and in a language like Rust, it is nice to be able to define these rules in a way that is both clear and concise.
One thing we do lack in Rust, however, is that it is **not** clear that the properties we require of these operations are satisfied.
For instance, we require that the addition of vectors is [commutative](https://en.wikipedia.org/wiki/Commutative_property), is it clear that this is true as defined?
We will run into other issues down the road.

You see here that we have constructed an interfacial component in your software.
The `V<M, F>` is generic and can be specifically implemented in many different ways.
Likewise, though we didn't define the bounds ourself, the `Add` and `Mul` traits are interfaces that we can implement for our `V` type which are, in essence, inherited from the field type `F` we are working over.

Moreover, I have done us dirty. 
I invoked the *direct product* $V \times V$ in our logic here without defining what this means!

## product
The conceptual idea of a *product type*, in general, is to just pair together objects and work with both simultaneously as a single object.
Given this, we will define the *direct product* of two different vector spaces $V$ and $W$ as $V \times W$.
This direct product should also be a vector space and, if constructed properly, the computations you do with it should be inherited from $V$ and $W$ *naturally*.

Briefly, if we want to think of vectors as arrays, the product $V \times W$ is concatenation of a pair of arrays.
We write $\boldsymbol{v} \in V$ and $\boldsymbol{w} \in W$ as:
$$
\boldsymbol{v} = \begin{bmatrix}
v_1 \\\\
v_2 \\\\
\vdots \\\\
v_M
\end{bmatrix} \qquad \text{and} \qquad \boldsymbol{w} = \begin{bmatrix}
w_1 \\\\
w_2 \\\\
\vdots \\\\
w_N
\end{bmatrix}
$$
then we can write the vector $(\boldsymbol{v},\boldsymbol{w}) \in V \times W$ as:
$$
(\boldsymbol{v},\boldsymbol{w}) = \begin{bmatrix}
v_1 \\\\
v_2 \\\\
\vdots \\\\
v_M \\\\
w_1 \\\\
w_2 \\\\
\vdots \\\\
w_N
\end{bmatrix}
$$
Sometimes this picture can be helpful to think about if you find yourself lost in the abstraction.

With a product we again get a vector space as we know how to add and scalar multiply vectors in $V \times W$:
$$
(\boldsymbol{v},\boldsymbol{w}) + (\boldsymbol{v\prime},\boldsymbol{w\prime}) = (\boldsymbol{v} + \boldsymbol{v\prime},\boldsymbol{w} + \boldsymbol{w\prime}) \\\\
\alpha (\boldsymbol{v},\boldsymbol{w}) = (\alpha \boldsymbol{v},\alpha \boldsymbol{w})
$$
where $\alpha \in \mathbb{F}$.

### diagram
How do we do this?
Take a look at the diagram below:
![product](/images/longform/holy_trinity/algebra_as_computation/product.svg)
In the diagram, we see a collection of vector spaces $V$, $W$, and $Z$ as well as a collection of maps $f_V$, $f_W$, $f$, $\pi_V$, and $\pi_W$ (all of which are [*linear*](https://en.wikipedia.org/wiki/Linear_map)).
Importantly, $\pi_V$ and $\pi_W$ are considered an implicit part of the data of the direct product $V \times W$ and they are defined as:
$$
\begin{align*}
\pi_V \colon V \times W& \to V \\\\
(\boldsymbol{v}, \boldsymbol{w}) &\mapsto \boldsymbol{v} \\\\
\end{align*}
$$
and
$$
\begin{align*}
\pi_W \colon V \times W& \to W \\\\
(\boldsymbol{v}, \boldsymbol{w}) &\mapsto \boldsymbol{w} \\\\
\end{align*}
$$
The maps $\pi_V$ and $\pi_W$ are often called [*projections*](https://en.wikipedia.org/wiki/Projection_(mathematics)).

The only requirement of the diagram is that it *commutes* which means that if you follow the arrows in any way, you get the same result.
Specifically, the composition of the maps $\pi_V \circ f = f_V$ should be the same map and likewise $\pi_W \circ f = f_W$.

Note that the dashed line for $f$ has special meaning -- it is a *unique* map that exists due to the existence of the other maps and the diagram itself.
This is the key to the [*universal property*](https://en.wikipedia.org/wiki/Universal_property) of the direct product $V \times W$.

Let's spend a moment thinking about this diagram and using it to understand what we are guaranteed when working with the *direct product* of vector spaces $V \times W$.
Note that in the direct product, we typically write vectors as tuples $(\boldsymbol{v},\boldsymbol{w})$ where $\boldsymbol{v} \in V$ and $\boldsymbol{w} \in W$.

Now, if let's define some maps by letting $f_V(\boldsymbol{z})=\boldsymbol{v_z}$ and $f_W(\boldsymbol{z})=\boldsymbol{w_z}$.
My claim now is that there is only one map $f$ that makes the diagram commute.
The unique map $f$ **must be** defined as:
$$
f(\boldsymbol{v},\boldsymbol{w}) = (f_V(\boldsymbol{v}), f_W(\boldsymbol{w})) = (\boldsymbol{v_z}, \boldsymbol{w_z}).
$$
This may seem trivial, but it is a powerful statement.
It says that if you have a map from the direct product into some other vector space, then you can always decompose it into two maps that act on the individual components of the pair.
This is exactly what we need to go about implementing the direct product in Rust.


### implementation
Let's try to take our diagram and implement it in Rust.
Before we even restrict ourselves to our vector type from before, we can write this out generally.
We need to define an interfacial component with two types `X` and `Y`, and three functions, `pi_X`, `pi_Y` and `f`.
The final function $f$, should allow for some other type `Z`, but not need inherent knowledge of `X` and `Y`.
```rust
pub trait ProductType
where
    Self: Sized,
{
    type X;
    type Y;

    fn construct(x: Self::X, y: Self::Y) -> Self;

    fn pi_X(&self) -> Self::X;

    fn pi_Y(&self) -> Self::Y;

    fn f<Z>(z: Z, f_X: impl Fn(Z) -> Self::X, f_Y: impl Fn(Z) -> Self::Y) -> Self {
        Self::construct(f_X(z), f_Y(z))
    }
}
```
Our unique $f$ from the diagram *should* have a blanket implementation for any type that implements the `ProductType` trait, but without having some inherent structure to map into, this isn't really possible as we need to tell a computer how to place this in memory.
Hence, this is why we have an additional `construct` function in the trait as this just tells us how the product type is built from the two components.
The `construct` is just the programmatic equivalent of us choosing to represent objects as $(\boldsymbol{v},\boldsymbol{w}) \in V \times W$.
Given we do know how to construct the type, we can then define the `f` function in terms of the `construct` function.

**Pause and ask yourself:** Could you have defined a blanket definition `f` in the trait using only the other trait methods in any other way?

It is worth noting that in Rust, the product type is already captured for us by the `struct` or `tuple` types.
If we look at what we defined above, we essentially just created a wrapper around Rust's internal `struct` type, and within the `ProductType` trait.
Let's see how.

For our case of vector spaces, we can define the `DirectProduct` as follows:
```rust
struct DirectProduct<const M: usize, const N: usize, F> {
    v: V<M, F>,
    w: V<N, F>,
}
```
where you must have both a `V` and a `W` to create a `Vector`. 
This struct allows us to pair together two different sized vector spaces over the same field and work with them as a single unified product object.
Now, we can implement the `ProductType` trait for this `DirectProduct` type using just the inherent Rust methods on structs:
```rust
impl<const M: usize, const N: usize, F> ProductType for DirectProduct<M, N, F> {
    type X = V<M, F>;
    type Y = V<N, F>;

    fn construct(v: Self::X, w: Self::Y) -> Self {
        DirectProduct { v, w }
    }

    fn pi_X(&self) -> Self::X {
        self.v
    }

    fn pi_Y(&self) -> Self::Y {
        self.w
    }
}
```
and we see that the `f` function is already implemented!
We note as well that the `pi_X` and `pi_Y` come as part of the data of the implementation of the interface we've defined here, and we must also build these as only we, the implementer, know how to yield memory from the computer to represent the object in our language.
Remind yourself, this `f`, or $f$ we had in the diagram, "exists and is unique".

Now, we carry on and can note that in this case, you can actually define the `Add` and trait for the `ProductVector` type in Rust without any issues:
```rust
where
    F: Add<Output = F> + Default + Copy,
{
    type Output = Self;
    fn add(self, other: DirectProduct<M, N, F>) -> Self::Output {
        DirectProduct::construct(self.pi_X() + other.pi_X(), self.pi_Y() + other.pi_Y())
    }
}
```
Again, all of this is just wrapping the inherent Rust methods on the `struct` type and the methods we built on `V<M, F>` (and `V<N, F>`).
We could have, for example, defined `Add` using our the `DirectProduct` struct as the diagram $V \times V \to V$ suggests:
```rust
impl<const M: usize, F> Add<()> for DirectProduct<M, M, F>

{
    type Output = V<M, F>;
    fn add(self, _other: ()) -> Self::Output {
        self.pi_X() + self.pi_Y()
    }
}
```
To make this latter implementation useful, you just have to take two `V<M, F>` types, construct a `DirectProduct<M, M, F>` and then call `add` on it.

As for the scalar multiplication $\mathbb{F} \times V \to V$, we can define this as well:
```rust
impl<const M: usize, const N: usize, F> Mul<F> for DirectProduct<M, N, F>
where
    F: Mul<Output = F> + Default + Copy,
{
    type Output = Self;
    fn mul(self, scalar: F) -> Self::Output {
        DirectProduct::construct(self.pi_X() * scalar, self.pi_Y() * scalar)
    }
}
```
No funny business here. 
Everything simply being built up from our methods on the `F`, then `V<M, F>`, and now the `DirectProduct<M, N, F>` types.

### summary
In this sense, the product type is essentially like logical `AND` as it requires us to fill each and every one of its components.
In fact, `AND` is also a categorical product.
The product type is a way to combine two objects into a single object and work with them as a single object so that each factor is treated independently.

There is not much of a point to working with the `ProductType` I defined here in Rust and the reason why is that Rust's `struct` types already capture this completely.
Succinctly: `struct` **is** a product type.
However, one should note that we can start to see a bit of the lack of expressiveness in Rust's type system when we start to think about the universal property of the product type.
Without access to Rust's `struct`, could you have defined a `ProductType` that allowed for an arbitary number of types to be combined into a single object?
Can you parameterize the associated types like `type X` and `type Y` in the `ProductType` trait with some other arbitrary trait?

Lastly, give this some thought with `tuples` instead of `struct` types.
Everything should essentially be the same, but it will also line up clearly with the work we've done here (we wrote the product vector as a tuple, actually) and you should take a challenge to work through the case of products that are arbitrarily long.

## coproduct
One thing we can always do with diagrams is flip them around to create the *dual* of the original diagram.
We may wonder why the hell we would do this, but it turns out that the dual of a diagram can often serve a great utility like the original diagram, and they are often "independent and opposite" types from one another.
When we do this diagram reversal, we add the prefix *co* before the name of the other diagram.
For now, let's take a look then at the *coproduct* (or *sum*) for vector spaces $V$ and $W$ which is often called the *direct sum* and written as $V\oplus W$.


### diagram
Let's start with the diagramatic/algebraic law $V\oplus W$ must follow.
![coproduct](/images/longform/holy_trinity/algebra_as_computation/coproduct.svg)
We define the direct sum $V \oplus W$ as the vector space that satisfies the following universal property of this diagram in that we must have a unique map $f$ that makes the diagram commute.
Specifically, there is only one $f$ where $f_V = f \circ \iota_V$ and $f_W = f \circ \iota_W$.
We will write elements of $V \oplus W$ as $\boldsymbol{v} \oplus \boldsymbol{w}$ where $\boldsymbol{v} \in V$ and $\boldsymbol{w} \in W$ which gives us a construction to work with.
In this case, we have two maps $\iota_V$ and $\iota_W$ that are often called [*inclusions*](https://en.wikipedia.org/wiki/Inclusion_map) and they are defined as:
$$
\begin{align*}
\iota_V \colon V &\to V \oplus W \\\\
\boldsymbol{v} &\mapsto \boldsymbol{v}_V  \\\\
\end{align*}
$$
and
$$
\begin{align*}
\iota_W \colon W &\to V \oplus W \\\\
\boldsymbol{w} &\mapsto  \boldsymbol{w}_W \\\\
\end{align*}
$$
Note that like the product, these maps $\iota$ come as an implicit part of the data of the direct sum.
One may see this as a bit odd as these $\iota$ maps look like they don't do anything other than apply a tag, however, they do move that vector into a new space and, if you'd like, for example:
$$
\iota_V(v) = \boldsymbol{v}_V \oplus \boldsymbol{0}_W
$$
The tag is not a common notation by the way, but I believe it is helpful so I've added it.
The fact that these maps do indeed move the vector to a new space will be even more clear when we do the implementation in Rust.
Further, we will see this ability to go between $\boldsymbol{v}_V$ and $\boldsymbol{v}_V \oplus \boldsymbol{0}_W$ is special for vector spaces and will correspond to a sneakily implemented trait we have on our vector type in Rust.

With this construction we can still add and scalar multiply vectors in the direct sum in the usual way.
Just for show:
$$
\boldsymbol{v}_V \oplus \boldsymbol{w}_W + \boldsymbol{v\'}_V \oplus \boldsymbol{w\'}_W = (\boldsymbol{v}_V + \boldsymbol{v\'}_V) \oplus (\boldsymbol{w} + \boldsymbol{w\'})\\\\
\alpha (\boldsymbol{v}_V \oplus \boldsymbol{w}_W) = (\alpha \boldsymbol{v}_V) \oplus (\alpha \boldsymbol{w}_W).
$$

How can this map be defined?
Well, if we have $\boldsymbol{v} \in V$ and $\boldsymbol{w} \in W$, then if we have $f_V(\boldsymbol{v}) = \boldsymbol{z_v}$:
$$
f(\boldsymbol{v}_V \oplus \boldsymbol{w}_V) = \boldsymbol{z_v} + \boldsymbol{z_w} = f_V(\boldsymbol{v}) + f_W(\boldsymbol{w})
$$


### implementation
Let's go ahead and try to implement this in Rust, but as a forewarning, we should note that this implementation a bit more convoluted than the product type and we will form something a bit more usable after.
```rust
pub trait Coproduct
where
    Self: Sized,
{
    type X;
    type Y;

    fn construct(x: Option<Self::X>, y: Option<Self::Y>) -> Self;

    fn iota_X(x: Option<Self::X>) -> Self {
        Self::construct(x, None)
    }

    fn iota_Y(y: Option<Self::Y>) -> Self {
        Self::construct(None, y)
    }

    fn get_X_via_tag(&self) -> Option<Self::X>;

    fn get_Y_via_tag(&self) -> Option<Self::Y>;

    fn f<Z: Add<Output = Z>>(
        &self,
        f_X: impl Fn(Option<Self::X>) -> Z,
        f_Y: impl Fn(Option<Self::Y>) -> Z,
    ) -> Z {
        f_X(self.get_X_via_tag()) + f_Y(self.get_Y_via_tag())
    }
}
```
Note above these extra methods of `get_X_via_tag` and `get_Y_via_tag` are helpful and they come with the definition of the coproduct definition.
When we wrote out something like $\boldsymbol{v}_V \oplus \boldsymbol{w}_W$, I explicitly wrote the tagging for which space each came from in this direct sum.
We could have also kept this tag by simply leaving the inclusion map present:
$$
\iota_V(\boldsymbol{v}) \oplus \iota_W(\boldsymbol{w}).
$$
Again, this construction and difference and types will become clear in the [enumeration type](#enumerations-tagged-unions) section

Now, doing this in Rust requires us to utilize these underlying `Option` types to allow for the possibility of having only one of the two vectors in the sum.
```rust
pub struct DirectSum<const M: usize, const N: usize, F> {
    v: Option<V<M, F>>,
    w: Option<V<N, F>>,
}
```
The inclusion of the `Options` in the trait definition as well as our struct mean that getting the implementation of the `Coproduct` trait for our `DirectSum` type is extremely straightforward:
```rust
impl<const M: usize, const N: usize, F> Coproduct for DirectSum<M, N, F>
where
    F: Copy,
{
    type X = V<M, F>;
    type Y = V<N, F>;

    fn construct(v: Option<Self::X>, w: Option<Self::Y>) -> Self {
        DirectSum { v, w }
    }
}
```

From here, we begin to see more of the weirdness in trying to make a clean implementation of this type in Rust.
It isn't that the `Add` and `Mul` traits we now need are difficult to implement, but they do rely heavily on the `Option`'s built in functionality.
In fact, we very nicely see the `Option::or` method coming out which points to the `Coproduct` as being some kind of categorical `OR` operation.
Nevertheless, here are both the implementations:
```rust
impl<const M: usize, const N: usize, F> Add for DirectSum<M, N, F>
where
    F: Add<Output = F> + Default + Copy,
{
    type Output = Self;
    fn add(self, other: DirectSum<M, N, F>) -> Self::Output {
        DirectSum::construct(
            self.v
                .zip(other.v)
                .map(|(v, other_v)| v + other_v)
                .or(self.v)
                .or(other.v),
            self.w
                .zip(other.w)
                .map(|(w, other_w)| w + other_w)
                .or(self.w)
                .or(other.w),
        )
    }
}

impl<const M: usize, const N: usize, F> Mul<F> for DirectSum<M, N, F>
where
    F: Mul<Output = F> + Default + Copy,
{
    type Output = Self;
    fn mul(self, scalar: F) -> Self::Output {
        DirectSum::construct(self.v.map(|v| v * scalar), self.w.map(|w| w * scalar))
    }
}
```
In a brief review here, it seems that the ability to toggle between `Some(T)` and `None` in the `Option` enumeration make possible the ability to have a meaningful `Coproduct` type in Rust.

### equivalence of sum and product for vector spaces
Right now we have defined two distinct types in Rust that are actually equivalent.
The reason for this being that the category of vector spaces is [*preadditive*](https://en.wikipedia.org/wiki/Preadditive_category) and the product and coproduct are really a [*biproduct*](https://en.wikipedia.org/wiki/Biproduct) in this category.
Jargon aside, we can see why this is true both mathematically and programmatically.
From this, we will discover the nice property of the `Option::unwrap_or_default` as a means of making the `Product` and `Coproduct` types (essentially) equivalent so long as the underlying types are restricted to implementing `Default`.

First, mathematically, we show that $V \times W$ and $V \oplus W$ are isomorphic by creating an invertible linear map between them. 
Note that we were able to identify $\boldsymbol{v}_V \oplus \boldsymbol{0}_W = \boldsymbol{v}_V$ and $\boldsymbol{w}_W = \boldsymbol{0}_V \oplus \boldsymbol{w}_W$ and so we can define a map:
$$
\begin{align*}
\varphi \colon V\times W &\to V \oplus W \\\\
(\boldsymbol{v}, \boldsymbol{w}) &\mapsto \boldsymbol{v}_V \oplus \boldsymbol{w}_W \\\\
\end{align*}
$$
and as for the inverse:
$$
\begin{align*}
\varphi^{-1} \colon V \oplus W &\to V \times W \\\\
\boldsymbol{v}_V \oplus \boldsymbol{w}_W &\mapsto (\boldsymbol{v}, \boldsymbol{w}) \\\\
\boldsymbol{v}_V &\mapsto (\boldsymbol{v}, \boldsymbol{0}) \\\\
\boldsymbol{w}_W &\mapsto (\boldsymbol{0}, \boldsymbol{w}) \\\\
\end{align*}
$$
I won't show the details here, but this is a quick exercise in linear algebra to show that these maps are linear and inverses of one another.

The above gives us a way to go between the two types programmatically too.
To show these types are equivalent when working with vector spaces (i.e., the underlying type `V<M, F>`), we want to show that a construction of one type yields a one-to-one construction of the other to get our programmatic proof.
One way to do this in Rust is with the `From<_>` (or `Into<_>`) traits.
Let's see how we do this.
```rust
impl<const M: usize, const N: usize, F> From<DirectSum<M, N, F>> for DirectProduct<M, N, F>
where
    F: Add<Output = F> + Default + Copy,
{
    fn from(sum: DirectSum<M, N, F>) -> DirectProduct<M, N, F> {
        DirectProduct::construct(
            sum.get_X_via_tag().unwrap_or_default(),
            sum.get_Y_via_tag().unwrap_or_default(),
        )
    }
}

impl<const M: usize, const N: usize, F> From<DirectProduct<M, N, F>> for DirectSum<M, N, F>
where
    F: Add<Output = F> + Default + Copy,
{
    fn from(prod: DirectProduct<M, N, F>) -> DirectSum<M, N, F> {
        DirectSum::iota_X(Some(prod.pi_X())) + DirectSum::iota_Y(Some(prod.pi_Y()))
    }
}
```
This is quite interesting, actually.
We have shown that the `DirectProduct` and `DirectSum` types are equivalent in Rust by showing that we can convert between them.
That is, given a construction of one type, we can construct the other type.
These constructions are proofs that the two types are equivalent in Rust.

Now, there is a caveat here and I should be forthcoming.
This Rust program doesn't know how to prove that the `DirectProduct` and `DirectSum` types are equivalent.
I did provide for you an implementation of the `From` trait from each direction that we can verify by hand can be done back-and-forth with no loss of information, but we would need an additional constraint in place, i.e., we would need to run a program that checks the following:
```rust
fn check_equivalence_prod_to_sum<M, N, F>(product: DirectProduct<M, N, F>) -> bool
where
    F: Add<Output = F> + Default + Copy,
{
    let sum_from_product: DirectSum<M, N, F> = product.into();
    let product_from_sum: DirectProduct<M, N, F> = sum_from_product.into();
    assert_eq!(product, product_from_sum);
}

fn check_equivalence_prod_to_sum<M, N, F>(sum: DirectSum<M, N, F>) -> bool
where
    F: Add<Output = F> + Default + Copy,
{
    let product_from_sum: DirectProduct<M, N, F> = sum.into();
    let sum_from_product: DirectSum<M, N, F> = product_from_sum.into();
    assert_eq!(sum, sum_from_product);
}
```
This is not only a bit of a pain to do, but it is also not possible to do in Rust as you need to do this for every possible `M`, `N`, and `F` you might want to work with.
This is where other programming languages can allow you to write better "proof carrying code" (e.g., [Haskell](https://www.haskell.org), [Coq](https://coq.inria.fr/), or [Lean](https://lean-lang.org/about/)).
A benefit for those languages, for sure!

### summary
If we thought of the product type as something akin to logical `AND`, it would hopefully be the case that the dual construction, the coproduct, is like the logical `OR` operation.
In fact, it is so.
For the coproduct we created, we are allowing ourselves to pick from either of the $V$ or the $W$ and combine them into a single type.
Creating this coproduct type in Rust was a bit of a pain, mostly because we had to deal with the `Option` type and the `unwrap_or_default` method.
However, what we can see is that we certainly can do it.

We found that for our vector space type, the product and coproduct type were found to be the same type (i.e., they are mathematically isomorphic).
Now, a quick check here really comes via the fact that for our inclusions $\iota$ and our projections $\pi$, we have the relationship:
$$
\pi_V \circ \iota_V = \text{id}_V \quad \text{and} \quad \pi_W \circ \iota_W = \text{id}_W \\\\
\pi_V \circ \iota_W = 0 \quad \text{and} \quad \pi_W \circ \iota_V = 0
$$
Now, programmatically, we were able to attain this exact relationship between the mappings `Option::Some` and `Option::unwrap_or_default`.
Why? 
Well, we have:
```rust
let true = Some::<V<M, F>>(v).unwrap_or_default() == v; 
let true = None::<V<M, F>>.unwrap_or_default() == <V<M, F>>::default();
```
In particular, we have that `T::default` gives us the ability to pick out the zero element of a vector space and this is the set of requirements seen [here](https://en.wikipedia.org/wiki/Biproduct#Definition)!
This, programmatically, is how we see that our `V<M, F>` falls into a preadditive category.


If you'd like, you could try applying this coproduct on a struct like so:
```rust
struct DisjointUnion<T,U> {
    t: HashSet<T>,
    u: HashSet<U>,
}
```
to create the [disjoint union](https://en.wikipedia.org/wiki/Disjoint_union) of two sets, which is the same as the coproduct of two sets in the category of sets.

## enumerations (tagged unions)
Now, there is a type in Rust called an *enumeration* or *enum* that exhibits behavioral patterns that are extremely similar to an `XOR` version of the coproduct (if we think of a coproduct as a categorical `OR` constructor, that is).
This data structure works extremely well as it allows you to exhaustively pattern match against the different cases of the enumeration knowing that at least one will be occupied (just like the coproduct, we know we can have at least one of the two types in the sum).
The difference is, at most, one of the types can be occupied in the enumeration type.

### implementation
For instance, in Rust, you have something like:
```rust
pub enum UniqueDirectSum<const M: usize, const N: usize, F> {
    V(V<M, F>),
    W(V<N, F>),
}
```
It is quite clear that this is a selector between two types and, in general, two elements of this type cannot successfully be added together.

Earlier I mentioned that I would come back to the mappings $\iota_V$ and $\iota_W$ and the tagged union and we can see that these appear explicitly in Rust as the variant constructors:
```rust
let v = UniqueDirectSum::V(v);
let w = UniqueDirectSum::W(w);
```
To reiterate, the `UniqueDirectSum::V` is a mapping from `V<M, F>` into `UniqueDirectSum<M, N, F>` and the `UniqueDirectSum::W` is a mapping from `V<N, F>` into `UniqueDirectSum<M, N, F>` just as $\iota_V$ and $\iota_W$ were mappings from `V` and `W` into the coproduct $V \oplus W$.
This tagging may appear quite natural now!

Carrying on, we can implement a `Add` trait for this type and it will be type-safe.
```rust
impl<const M: usize, const N: usize, F> Add for UniqueDirectSum<M, N, F>
where
    F: Add<Output = F> + Default + Copy,
{
    type Output = Self;
    fn add(self, other: UniqueDirectSum<M, N, F>) -> Self::Output {
        match (self, other) {
            (UniqueDirectSum::V(v), UniqueDirectSum::V(w)) => UniqueDirectSum::V(V::add(v, w)),
            (UniqueDirectSum::W(v), UniqueDirectSum::W(w)) => UniqueDirectSum::W(V::add(v, w)),
            _ => panic!("Cannot add V and W with Rust `UniqueDirectSum`!"),
        }
    }
}
```
Notice that we will hit a different case of `panic!` if we try to add a `V` and a `W` together.
This is an important distinction between the enumeration type and the coproduct type from earlier as with that type, we had the ability to add any combination of the two types together.

As for the scalar multiplication, we can implement this as well:
```rust
impl<const M: usize, const N: usize, F> Mul<F> for UniqueDirectSum<M, N, F>
where
    F: Mul<Output = F> + Default + Copy,
{
    type Output = Self;
    fn mul(self, scalar: F) -> Self::Output {
        match self {
            UniqueDirectSum::V(v) => UniqueDirectSum::V(v * scalar),
            UniqueDirectSum::W(w) => UniqueDirectSum::W(w * scalar),
        }
    }
}
```
where there is no issue that can cause a `panic!` here. 

The syntax of `match` plays an important role here as it exhaustively checks all the possible cases of the enumeration type knowing all along that only one variant may be occupied at a time.
I would argue that this capability outweighs the ability to add any combination of the two types together as we had with the coproduct type at least as far as programming goes.

### diagram?
We've been given a challenge to go the other way and try to derive a diagram from the Rust type itself.
To do so, we can instead think of the coproduct of the the sets of the vectors from each space which I will write as $\\{V\\}$ and $\\{W\\}$ and put $\\{V \\} \amalg \\{W \\}$ to represent the coproduct (disjoint union) of the two sets.
Working with these, we can add additional logic to implement a selector function that will allow us to choose between the two types inside the tagged union.
![tagged union](/images/longform/holy_trinity/algebra_as_computation/tagged_union.svg)

Above, we have $s_V$ which is a choice of a map of a singleton into the set of vectors of $V$. 
Naturally, we also have the inclusion $\iota_V$ for taking the set into its coproduct (the disjoint union) which maps an element of $V$ into the tagged union along with its tag.
From there, we have a map $T$ which takes an element of the tagged union and outputs its tag, show here as being either 1 or 2 for $V$ and $W$ respectively.
The detail we must have is that given a choice of $s_V$, we must have a unique map $s_T$ that selects the tag of the element of the tagged union and makes the above diagram commute.

Programmatically, this selector $s_T$ is captured by pattern matching via the `match` statement or `if let` statement.
It is built into the Rust language and is a very powerful tool for working with tagged unions!
One distinction here, however, is that when we apply the selector $s_T$, we also need to retain the type structure of the tagged union.
For example, in the above we had:
```rust
match our_enum: UniqueDirectSum<M, N, F> {
    UniqueDirectSum::V(v) => UniqueDirectSum::V(v * scalar),
    UniqueDirectSum::W(w) => UniqueDirectSum::W(w * scalar),
}
```
`match` applies the type selector, but we gain introspection into the inner types via looking inside of the `UniqueDirectSum::V` and `UniqueDirectSum::W` (or equivalently `\iota_V` and `\iota_W`) mappings.
Essentially, we have "glued" the diagram of the selector $s_T$ into the coproduct diagram $V \oplus W$.

At the moment, I am not totally satisfied with this diagramatic perspective of the tagged union/enum type of Rust.
This leaves me wanting a deeper explanation by connecting this into *type theory* which we will do as we connect all of the elements of the Curry-Howard-Lambek correspondence.

# where to go from here
This piece has been a bit of a whirlwind to explain some common constructions in mathematics and how they can made programmatic specifically using Rust.
From here, I would like to carry on with some further examples and move into some constructions I found extremely useful in my own work that I have not had the chance to explain here such as *tensors* and *Clifford algebras*.

Eventually, I also want to get into type theory and how these categorical constructions relate to type-theoretic constructions.
This will require us learning about special types of categories, but I think it will be a fun journey to take together.

Furthermore, I want to provide the complete code for the above constructions in a more usable form.
They can be found at this repository: [Autoparallel/tensor](https://github.com/Autoparallel/tensor) with commit hash `c8bd132`.