+++
title = "algebra as computation"
date = "2024-04-13"
template = "blog.html"
description = "It's good to start with an example, and one I am quite fond of is the construction with vector spaces by creating sum types, product types, and the tensor type. These are all miraculously ubiquitous objects whether you are in physics, computer science, or mathematics. We will see how one can go from the algebraic perspective straight into implementation and how we can extract additional features of these objects naturally."
# They generalize  the complex numbers and quaternions, matrices and exterior algebras, lie algebras and spinors, and more. We get lovely geometry and a beautiful set of computationally efficient rules! Let's do this from a categorical perspective.
[taxonomies]
tags = ["math", "algebra", "category theory"]
+++
---

**Warning:** This blog started as a blurb and I ended up nerd sniping myself into writing this from a far more categorical perspective -- hopefully it illuminates *why* we define structures in the way we do from a perspective of computation!

---

# motivation
Have you ever thought to yourself: "I wish I could multiply vectors together?"
I can assure you that nearly every one of my students tried this in some way when they first learned about vectors.
The ideas of dot products and cross products and how they differ in dimension 2 and 3 really seemed to confuse them.
Nevermind the fact that the cross product fails to generalize into higher dimensions.
At the same time, we often teach ways to combine vectors, yet we don't quite give all the background that I think is instrumental for people to go out and get their hands dirty.
I don't want this to be the case.

Thinking of this concept of vector multiplication leads us down a road for what it means to extend, algebraically, vectors beyond just the space that they come packaged in.
For this, we will pass through a landscape of general constructions that can be applied to more places than just the vectors.
We'll also see why vectors are inherently nice, and we'll visit the notion of a *tensor* along the way.
The concept of tensor seems to be one that I get many questions about, so my hope here is we can do some mental yoga prior to defining this concept only for the tensor to emerge as something clear, albeit tersely defined.

So, let's take an approach that is very algebraic and categorical in nature.
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
In the above, think of `F` as the field we are choosing to work over, $M$ as the number of components of the vectors we are working with (also equivalent to the [dimension](https://en.wikipedia.org/wiki/Dimension_(vector_space))), and the implementations of the `Add` and `Mul<F>` traits are what we defined in the diagrams for the vector addition $V \times V \to V$ and the scalar multiplication $\mathbb{F} \times V \to V$ respectively.
One should also think of the `Default` implementation as the zero vector in the vector space as it should also be used to select the 0 from the field type `F` (though you do have to be careful here and perhaps you should use an external crate just for num types.).
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

## product type
The conceptual idea of a *product type*, in general, is to just pair together objects and work with both simultaneously as a single object.
Given this, we will define the *direct product* of two different vector spaces $V$ and $W$ as $V \times W$.
This direct product should also be a vector space and, if constructed properly, the computations you do with it should be inherited from $V$ and $W$ *naturally*.

### diagram
How do we do this?
Take a look at the diagram below:
![product](/images/longform/holy_trinity/algebra_as_computation/product.svg)
In the diagram, we see a collection of vector spaces $V$, $W$, and $Z$ as well as a collection of maps (all [*linear*](https://en.wikipedia.org/wiki/Linear_map)) $f_V$, $f_W$, $f$, $\pi_V$, and $\pi_W$.
The only requirement of the diagram is that it *commutes* which means that if you follow the arrows in any way, you get the same result.
Specifically, the composition of the maps $\pi_V \circ f = f_V$ should be the same map, and likewise $\pi_W \circ f = f_W$.

Note that the dashed line for $f$ has special meaning -- it is a *unique* map that exists due to the existence of the other maps and the diagram itself.
This is the key to the [*universal property*](https://en.wikipedia.org/wiki/Universal_property) of the direct product $V \times W$.

Let's spend a moment thinking about this diagram and using it to understand what we are guaranteed when working with the *direct product* of vector spaces $V \times W$.
Note that in the direct product, we typically write vectors as tuples $(\boldsymbol{v},\boldsymbol{w})$ where $\boldsymbol{v} \in V$ and $\boldsymbol{w} \in W$.
Now, the direct product *is* the collection $(V \times W, \pi_V, \pi_W)$ that makes the whole diagram commute given the distinctly defined mappings:
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

Now, if let's define some maps by letting $f_V(\boldsymbol{z})=\boldsymbol{v_z}$ and $f_W(\boldsymbol{z})=\boldsymbol{w_z}$.
My claim now is that there is only one map $f$ that makes the diagram commute.
The unique map $f$ is then defined as:
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
Our unique $f$ from the diagram *should* have a blanket implementation for any type that implements the `ProductType` trait, but without having some inherent structure to map into, this isn't really possible.
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
    w: W<N, F>,
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
Remind yourself, this `f`, or $f$ we had in the diagramm, "exists and is unique".

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
In this sense, the product type is essentially like logical `AND` and, in fact, `AND` is also a product categorically.
The product type is a way to combine two objects into a single object and work with them as a single object so that each factor is treated independently.
There is not much of a point to working with the `ProductType` I defined here in Rust and the reason why is that Rust's `struct` types already capture this completely.
However, one should note that we can start to see a bit of the lack of expressiveness in Rust's type system when we start to think about the universal property of the product type.
Without access to Rust's `struct`, could you have defined a `ProductType` that allowed for an arbitary number of types to be combined into a single object?
Can you parameterize the associated types like `type X` and `type Y` in the `ProductType` trait with some other arbitrary trait?

TODO: Talk about the product as gluing together of arrays?

## sum type
One thing we can always do with diagrams is flip them around to create the *dual* of the original diagram.
We may wonder why the hell we would do this, but it turns out that the dual of a diagram can often serve a great utility like the original diagram, and they are in a sense "independent and opposite" types from one another.
When we do this diagram reversal, we add the prefix *co* before the name of the other diagram.
For now, let's take a look then at the *coproduct* (or *sum*) for vector spaces $V$ and $W$ which is often called the *direct sum* and written as $V\oplus W$.

Let's start with the diagramatic/algebraic law $V\oplus W$ must follow.
![coproduct](/images/longform/holy_trinity/algebra_as_computation/coproduct.svg)
We define the coproduct/direct sum $V \oplus W$ as the vector space that satisfies the following universal property of this diagram in that we must have a unique map $f$ that makes the diagram commute.
Specifically, there is only one $f$ where $f_V = f \circ \iota_V$ and $f_W = f \circ \iota_W$.
We will write elements of $V \oplus W$ as $\boldsymbol{v} \oplus \boldsymbol{w}$ where $\boldsymbol{v} \in V$ and $\boldsymbol{w} \in W$ which gives us a construction to work with.
In this case, we have two maps $\iota_V$ and $\iota_W$ that are often called [*inclusions*](https://en.wikipedia.org/wiki/Inclusion_map) and they are defined as:
$$
\begin{align*}
\iota_V \colon V &\to V \oplus W \\\\
\boldsymbol{v} &\mapsto \boldsymbol{v}  \\\\
\end{align*}
$$
and
$$
\begin{align*}
\iota_W \colon W &\to V \oplus W \\\\
\boldsymbol{w} &\mapsto  \boldsymbol{w} \\\\
\end{align*}
$$
where $\boldsymbol{0}$ is the zero vector in the respective vector space.
Note that like the product, these maps $\iota$ come as part of the data of the direct sum.
One may see this as a bit odd as these $\iota$ maps look like they don't do anything, however, they do move that vector into a new space and, if you'd like, you can think of them as a way to tag the vector with the space it comes from and instead put, for example:
$$
\iota_V(v) = \boldsymbol{v} \oplus \boldsymbol{0}
$$
The fact that these maps do indeed move the vector to a new space will be even more clear when we do the implementation in Rust.
Further, we will see this ability to go between $\boldsymbol{v}$ and $\boldsymbol{v} \oplus \boldsymbol{0}$ is special for vector spaces and will correspond to a sneakily implemented trait we have on our vector type in Rust.

With this construction we can still add and scalar multiply vectors in the direct sum in the usual way.
Just for show:
$$
\boldsymbol{v} \oplus \boldsymbol{w} + \boldsymbol{v\'} \oplus \boldsymbol{w\'} = (\boldsymbol{v} + \boldsymbol{v\'}) \oplus (\boldsymbol{w} + \boldsymbol{w\'})\\\\
\alpha (\boldsymbol{v} \oplus \boldsymbol{w}) = (\alpha \boldsymbol{v}) \oplus (\alpha \boldsymbol{w}).
$$

How can this map be defined?
Well, if we have $\boldsymbol{v} \in V$ and $\boldsymbol{w} \in W$, then if we have $f_V(\boldsymbol{v}) = \boldsymbol{z_v}$:
$$
f(\boldsymbol{v} \oplus \boldsymbol{w}) = \boldsymbol{z_v} + \boldsymbol{z_w} = f_V(\boldsymbol{v}) + f_W(\boldsymbol{w})
$$

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

    fn f<Z: Add<Output = Z>>(
        x: Self::X,
        y: Self::Y,
        f_X: impl Fn(Self::X) -> Z,
        f_Y: impl Fn(Self::Y) -> Z,
    ) -> Z {
        f_X(x) + f_Y(y)
    }
}
```


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

### equivalence of direct sum and direct product
Right now we have defined two distinct types in Rust that are actually equivalent.
The reason for this being that the category of vector spaces is [*preadditive*](https://en.wikipedia.org/wiki/Preadditive_category) and the product and coproduct are really a [*biproduct*](https://en.wikipedia.org/wiki/Biproduct) in this category.
Jargon aside, we can see why this is true both mathematically and programmatically.
From this, we will discover the nice property of the `Option::unwrap_or_default` as a means of making the `Product` and `Coproduct` types (essentially) equivalent so long as the underlying types are restricted to implementing `Default`.

First, mathematically, we show that $V \times W$ and $V \oplus W$ are isomorphic by creating an invertible linear map between them. 
Note that we were able to identify $\boldsymbol{v} \oplus \boldsymbol{0} = \boldsymbol{v}$ and $\boldsymbol{w} = \boldsymbol{0} \oplus \boldsymbol{w}$ and so we can define a map:
$$
\begin{align*}
\varphi \colon V\times W &\to V \oplus W \\\\
(\boldsymbol{v}, \boldsymbol{w}) &\mapsto \boldsymbol{v} \oplus \boldsymbol{w} \\\\
\end{align*}
$$
and as for the inverse:
$$
\begin{align*}
\varphi^{-1} \colon V \oplus W &\to V \times W \\\\
\boldsymbol{v} \oplus \boldsymbol{w} &\mapsto (\boldsymbol{v}, \boldsymbol{w}) \\\\
\boldsymbol{v} &\mapsto (\boldsymbol{v}, \boldsymbol{0}) \\\\
\boldsymbol{w} &\mapsto (\boldsymbol{0}, \boldsymbol{w}) \\\\
\end{align*}
$$
I won't show the details here, but this is a quick exercise in linear algebra to show that these maps are linear and inverses of one another.

The above gives us a way to go between the two types programmatically too.
To show these types are equivalent when working with vector spaces (i.e., the underlying type `V<M, F>`), we want to show that a construction of one type yields a construction of the other and this is our programmatic proof.
Let's see how we do this.
```rust



## enumeration type

For instance, in Rust, you maybe have something like:
```rust
// We choose the same "field" (`f64`) for both `V` and `W`
struct V<const M: usize>([f64; M]);
struct W<const N: usize>([f64; N]);

#[derive(Add)]
enum SumVector<const M: usize, const N: usize> {
    V(V<M>),
    W(W<N>),
}
```
where you can select either a array of "real numbers" (actually floats) of length (dimension) $M$ or a array of length $N$ using this enumeration.
An important distinction here is you could not create an instance of `SumVector` that chooses both `V` and `W` at the same time in Rust!



Okay, but how do you define such an $f$ given the above?
Well, if we have $f_V(\boldsymbol{v}) = \boldsymbol{z_v}$ and $f_W(\boldsymbol{w})=\boldsymbol{z_w}$ then:
$$
f(\boldsymbol{v} \oplus \boldsymbol{w}) = \boldsymbol{z_v} + \boldsymbol{z_w}
$$
which makes this diagram commute since, for example,
$$
f \circ \iota_W (\boldsymbol{w}) = f(\boldsymbol{w}) = \boldsymbol{z_w}.
$$

We should think about what the arrows of this diagram (called the *universal property* for the *coproduct*) tell us about how to compute with these objects.
The above shows us that we have natural means to include elements from both $V$ and $W$ into the sum $V \oplus W$. 

Back to our Rust example, remember that we can only have one or the other in the tagged union type which is merely a restriction on behalf of Rust.
However, we can see that the computational rule here imposed by the diagram is given by the syntax of `match`. 
For instance, take the following:
```rust
fn f_V(v: V<M>) -> T {
    // some computation
}

fn f_W(w: W<N>) -> T {
    // some computation
}

fn f(v: SumVector<M, N>) -> T {
    match v {
        Vector::V(v) => f_V(v),
        Vector::W(w) => f_W(w),
    }
}
```
where we can see that the `match` statement is the unique map $f$ in the diagram above.
In fact, we needed this same technology to define the `Add` trait for the `SumVector` type in Rust.
See by:
```rust
impl Add for V<M> {
    type Output = V<M>;
    fn add(self, other: V<M>) -> V<M> {
        let mut sum = self;
        for i in 0..M {
            sum[i] += other[i];
        }
        sum
    }
}

impl Add for W<N> {
    // same as above but for `W`
}

impl Add for SumVector<M, N> {
    type Output = SumVector<M, N>;
    fn add(self, other: SumVector<M, N>) -> SumVector<M, N> {
        match (self, other) {
            (V(v), V(v_other)) => SumVector::V(v + v_other),
            (W(w), W(w_other)) => SumVector::W(w + w_other),
            _ => panic!("This is not possible in Rust!"),
        }
    }
}
```
and we panic only due to the `XOR` nature of Rust's enumeration.

There's a relationship here between our coproduct definition and the product definition.
Importantly, this coproduct type **does not** force a requirement that we must have one of each $V$ and $W$ to make up an element $V \oplus W$ and insteaad says "you can have one or the other or both."

### summary
One may also argue that this is quite similar to an `OR` operation where we are allowing ourselves to pick from any of the $V_i$ and combine them into a single "statement" (and that's because `OR` is also a coproduct).

This unique coproduct construction is often called in computer science a *tagged union* type.

Comparing this to the notion of the `OR` operation I brought up before, Rust takes their enumerations as more of an `XOR` operation.

## comparison of sum and product types
To see why we have (almost) equality between these specific coproduct and product types in Rust for this case, we can define:
```rust
fn surjective(prod_vec: ProductVector<M, N>) -> SumVector<M, N> {
    let ProductVector { v, w } = prod_vec;
    if v == V([0.0; M]) {
        SumVector::W(w)
    } else if w == W([0.0; N]) {
        SumVector::V(v)
    } else {
        panic!("This is not invertible in Rust!")
    }
}

fn injective(sum_vec: SumVector<M, N>) -> ProductVector<M, N> {
    match sum_vec {
        SumVector::V(v) => ProductVector { v, w: W([0.0; N]) },
        SumVector::W(w) => ProductVector { v: V([0.0; M]), w },
    }
}
```
Note that if we compose `surjective(injective(sum_vec))` we get back the original `sum_vec` and if we compose `injective(surjective(prod_vec))` we get back the original `prod_vec` if an only if one of the `v` or `w` was all zeros, hence the `assert!`.
The issue here and why we require `assert!` is solely due to the fact that Rust allows only a single variant of the tagged union type to be selected at a time whereas our general coproduct $\oplus$ allows for any combination of $V$ and $W$ to be selected (i.e., this is `OR` versus `XOR` again)!

At any rate, this is the *sum* operation we will want on vector spaces that will give us a sum on vector-like objects in the long run!
In the case we are using it on spaces, we should think of this computation as a *formation* (or *construction*) rule.

**NOTES FROM BEFORE**

The coproduct and product types are the same for (finite sums or products) of vector spaces since I can assume $\boldsymbol{0}$ can take the place of a missing vector in the sum to create a product, or I can remove it in the case of a product to yield a sum (this was argued before).


## tensor product type
Next, we want to define a multiplicative operation on vector spaces which will descend to a *multiplication* operation on the vector-like objects we are building.
For us, this will be the *tensor* product of vector spaces. 

Let's also take a look at this formally. 
A tensor product $V \otimes W$ of vector spaces $V$ and $W$ is a vector space that is the "freest" vector space that contains all the elements of $V$ and $W$.
By freest, I mean that instead of just attaching one vector to another by extending an array, we are able to form higher dimensional arrays that contain all possible combinations of vectors from $V$ and $W$.

We write elements of the space $V\otimes W$ as $\boldsymbol{v}\otimes \boldsymbol{w}$. 
To see how we work with these elements and compare it to the direct sum or direct product. 
For once, we can not do a reduction 
$$
\boldsymbol{v} \otimes \boldsymbol{0} \neq \boldsymbol{v}
$$
as we could with the direct sum, hence the term "product" being used in tensor product.

But how does this differ from the direct product then?
For one, it will use the direct product as a building block, but prior to that we can see the differences.

Take a look at the universal property below of the tensor product:
![tensor product](/images/longform/holy_trinity/algebra_as_computation/tensor_product.svg)
In the diagram the spaces are, $V\times W$ is the direct product, $V \otimes W$ is the tensor product, and $Z$ is any arbitary vector space.
As for the mappings we have  $\varphi$ is the application of the tensor product from a pair, i.e., $\varphi(\boldsymbol{v},\boldsymbol{w}) = \boldsymbol{v}\otimes \boldsymbol{w}$ into the tensor product space, $h$ is a *bilinear* map from $V\times W$ into $Z$, i.e., it is linear in both components, and finally this determines a unique linear map $\tilde{h}$ from the tensor product into some arbitrary $Z$.

Given any $h$ then, it is our job to define $\tilde{h}$ which, if this is truly some universal construction, restrict the definition of the tensor product space $V\otimes W$ to be the only space that satisfies this property.
At least, that is the idea and what we have seen with the other diagrams.

For one, we let:
$$
h(\boldsymbol{v},\boldsymbol{w}) = \boldsymbol{z_{v,w}}
$$
then if we have $\boldsymbol{v} \otimes \boldsymbol{w}$ in the tensor product space, we can define:
$$
\tilde{h} (\boldsymbol{v} \otimes \boldsymbol{w}) = \boldsymbol{z_{v,w}}.
$$
This is our solution, and now we just have to see what this means for the structure of the tensor product space.

At first this may seem almost trivial, but notice a difference here between the direct product and the tensor product, and it turns out the tensor product is, in general, a lot "freer" (or, perhaps, "wider").

Note that in the direct product we had this uniquely defined mapping from the universal product:
$$
f(\boldsymbol{v},\boldsymbol{w}) = (f_V(\boldsymbol{v}), f_W(\boldsymbol{w}))
$$
so if we change $f_V$ alone, it will not change what $f$ does to the $\boldsymbol{w}$ part of pair as we still just use $f_W$.
In this way, there is a "separation" of the two components of the pair in the direct product (and likewise for the direct sum as argued previously).

This is not true for the tensor product.
Note that if we change $h$ such that 
$$
h\'(\boldsymbol{v},\boldsymbol{w}) = \boldsymbol{z\'_{v,w}}
$$ 
then we must also change as such, and there is no clear way to separate the two components of the pair in the tensor product.
This is because the tensor product is "freer" in that it does not have a restriction to act component-wise on the pair (i.e., dilineated to just the $V$ or $W$ components).

I hate to do this, but we can do a counting exercise if we invoke a basis for $V$ and $W$ and it is quite instrumental to see how the tensor product differs from the direct product or direct sum. 
To this end, let $\boldsymbol{v_1}, \boldsymbol{v_2}, \dots, \boldsymbol{v_m}$ be a basis for $V$ and $\boldsymbol{w_1}, \boldsymbol{w_2}, \dots, \boldsymbol{w_n}$ be a basis for $W$.

{% proof(name="$V \otimes W$ is dimension $mn$") %}
Take the basis we had above for both $V$ and $W$.
Then we have $v_i \otimes w_j$ which consists of $mn$ elements. 
On the basis, we can note:
$$
\tilde{h}(\boldsymbol{v_i} \otimes \boldsymbol{w_j}) = \boldsymbol{z_{i,j}}
$$
which, by choosing $Z$ to be at least $mn$ dimensional, we can pick an element $\boldsymbol{z_{i,j}} \in Z$ that is linearly independent from each other $\boldsymbol{z_{i',j'}}$.
Illustratively, we let $\boldsymbol{z_{i,j}}$ be an $m\times n$ matrix where all entries are zero except for the $i,j$ entry which is one noting that the $m \times n $ matrices are themselves a vector space of dimension $mn$.
{% end %}

For example of the above proof, let's take $\dim(V)==3$ and $\dim(W)=2$ for instance.
Then we can choose $\tilde{h}$ to be a map into $3\times 2$ matrices like so:
$$
\boldsymbol{v} \otimes \boldsymbol{w} = \begin{bmatrix} v_1 \\\\ v_2 \\\\ v_3 \end{bmatrix} \otimes \begin{bmatrix} w_1 \\\\ w_2 \end{bmatrix} = \begin{bmatrix} v_1 w_1 & v_1 w_2 \\\\ v_2 w_1 & v_2 w_2 \\\\ v_3w_1 & v_3w_2 \end{bmatrix}.
$$
where the components of each vector are the entries of the matrix.
By no means do we have to choose this arrangement, but by doing so we can actually illuminate the structure of the tensor product space as a collection of bilinear mappings into the base field. 
To see this, note that you could take a matrix like so, and multiply from the left and the right by the vectors from $V$ (transposed) and $W$ respectively and get a bilinear map (linear in both the left and right side) into the field.

Comparing this to the case for the direct product, we had:
$$
f(\boldsymbol{v_i},\boldsymbol{w_j}) = (\boldsymbol{z_{i}},\boldsymbol{z_{j}})
$$
which yields up to $m+n$ linearly independent values (pick $Z$ to be a vector space with dimension $m+n$ or larger).

{% proof(name="$V \times W$ is dimension $m+n$") %}
Take the basis we had above for both $V$ and $W$.
Then with the mapping 
$$
f(\boldsymbol{v_i},\boldsymbol{w_j}) = (\boldsymbol{z_{i}},\boldsymbol{z_{j}})
$$
Note that we can generate $m+n$ linearly independent values by first mapping $f(\boldsymbol{v_i}, \boldsymbol{0})$ to $(\boldsymbol{z_{i}},\boldsymbol{0})$ for $i \in \{0,\dots, m\}$ and likewise $f(\boldsymbol{0}, \boldsymbol{w_j})$ to $(\boldsymbol{0},\boldsymbol{z_{j}})$ for $j\in \{0,\dots, n\}$. 

To see this is at most dimension $m+n$, we can note that for any other pair $(\boldsymbol{z_{i'}},\boldsymbol{z_{j'}})$ we can write as a linear combination of the above pairs.
{% end %}

Now, how would we define the tensor product type in Rust?

Working with our $V<M>$ and $W<N>$, we can use our universal property intuition for construction:
```rust
struct Tensor<const M: usize, const N: usize>
where
    [(); M * N]:,
{   
    coefficients: [f64; M * N],
}

impl<const M: usize, const N: usize> Tensor<M, N> {
    fn bilinear_map(&self, v: V<M>, w: W<N>) -> f64 {
        let mut sum = 0.0;
        for i in 0..M {
            for j in 0..N {
                sum += self.coefficients[i * N + j] * v[i] * w[j];
            }
        }
        sum
    }
}
```
where we have a collection of coefficients that we can use to define a bilinear map on the tensor product space.

Note that in the above, the first input into the `bilinear_map` is the `Tensor<M, N>` itself (.e., a vector of length $mn$ which is the collection of coefficients used for the mapping).
Perhaps it seems a bit hacky to define things knowing that these are just arrays of floats, but this is a clean way to do it in Rust without checking that the `bilinear_map` field is actually bilinear (in other langauges we could have the proof of bilinearity be in the type definition). 
However, it is not too difficult to prove by hand that the only way to get linearity is to just multiply components of constant arrays together and sum them up, so we can take this as a given and so our `impl` block satisfies this "proof by hand".

What we have also given ourselves is flexibility via Rust's functional capabilities. For instance, by applying the mapping like so:
```rust
// specific choice of coefficients of w
let w = W([1.0; N]);
let linear_functional_on_V = Fn(V<M>) -> f64 = |v| bilinear_map(coefficients, v, w);

// specific choice of coefficients of v
let v = V([1.0; M]);
let linear_functional_on_W = Fn(W<N>) -> f64 = |w| bilinear_map(coefficients, v, w);
```
Notice that the tensor product is yielding quite a flexible powerhouse of mappings!
We could move these functions here defined as closures into the `impl` block for the `Tensor<M, N>` struct.

Actually, out of this `Tensor<M, N>` data structure, we can get even more. For instance, we can use this to define a mapping $V \to W$ by adding this method to the `impl` block:
```rust
fn linear_map_from_V_to_W<const M: usize, const N: usize>(self, v: V<M>) -> W<N> {
    let mut w = W([0.0; N]);
    for i in 0..N {
        let mut sum = 0.0;
        for j in 0..M {
            sum += self.bilinear_map[i * N + j] * v[j];
        }
        w[i] = sum;
    }
}
```
The same can be done to yield a map from $W$ to $V$ if you wish. 
Indeed, one may notice that we effectively used the definitions of the `linear_functional_on_V` to define the `linear_map_from_V_to_W` function and then iterated over and summed this into the components of the output vector to get the desired output.

What we should reflect on here momentarily is that we have actually just created a wrapper type with `Tensor<M, N>` and we could have (almost) just as well have worked directly with the `bilinear_map`.
That is, except for the fact that we could not have defined all this functionality on the primitive function pointer type in Rust.

Note that we do not have a constructor yet for `Tensor<M, N>`, but we showed an earlier example of one that follows from the universal property of the tensor product.
That is, we have a mapping $\varphi \colon V \times W \to V\otimes W$ which yields our constructor in Rust by:
```rust
impl<const M: usize, const N: usize> Tensor<M, N> {
    fn tensor_product(v: V<M>, w: W<N>) -> Self {
        let mut coefficients = [0.0; M * N];
        for i in 0..M {
            for j in 0..N {
                coefficients[i * N + j] = v[i] * w[j];
            }
        }
        Tensor { coefficients }
    }
}
```
This above constructor (which we do not have to use, mind you!) is often called the *outer product*.
Note that not every instance of a tensor product is an outer product, but every outer product is a tensor product (at most using `tensor_product` yields a rank-1 tensor).
What is true, however, is that you can supply a collection of vectors and get a tensor product out can be any tensor you wish. 
For instance:
```rust
impl<const M: usize, const N: usize> Tensor<M, N> {
    fn tensor_product<const P: usize>(v: [V<M>; P], w: [W<N>; P]) -> Self {
        let mut coefficients = [0.0; M * N];
        for p in 0..P {
            for i in 0..M {
                for j in 0..N {
                    coefficients[i * N + j] += v[p][i] * w[p][j];
                }
            }
        }
        Tensor { coefficients }
    }
}
```
This also seems to hinge on the fact that we can add tensors together, which we can.
In general, tensors are themselves a vector space and we implement this by,
```rust
impl<const M: usize, const N: usize> Add for Tensor<M, N> {
    type Output = Tensor<M, N>;
    fn add(self, other: Tensor<M, N>) -> Tensor<M, N> {
        let mut sum = Tensor { coefficients: [0.0; M * N] };
        for i in 0..M * N {
            sum.coefficients[i] = self.coefficients[i] + other.coefficients[i];
        }
        sum
    }
}

impl<const M: usize, const N: usize> Mul<f64> for Tensor<M, N> {
    type Output = Tensor<M, N>;
    fn mul(self, scalar: f64) -> Tensor<M, N> {
        let mut product = Tensor { coefficients: [0.0; M * N] };
        for i in 0..M * N {
            product.coefficients[i] = self.coefficients[i] * scalar;
        }
        product
    }
}
```


### Testing the lower type
TODO: Add the "outer product" constructor function for the tensor.
TODO: Likewise talk about how we can define an add on `Tensor<M, N>` that is also type-safe. 
TODO: Show all these different things are vector spaces and stuff.
TODO: Some of this could be expressed as traits instead (e.g., the tensor could be a trait with all the functionality described and maybe then you could have choices of bases and stuff)
TODO: Organize