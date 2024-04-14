+++
title = "algebra as computation"
date = "2024-04-13"
template = "blog.html"
description = "It's good to start with an example, and one I am quite fond of is the construction of Clifford algebras. These are miraculously ubiquitous objects whether you are in physics, computer science, or mathematics. They generalize  the complex numbers and quaternions, matrices and exterior algebras, lie algebras and spinors, and more. We get lovely geometry and a beautiful set of computationally efficient rules! Let's do this from a categorical perspective."
[taxonomies]
tags = ["math", "algebra", "category theory"]
+++
---

**Warning:** This blog started as a blurb and I ended up nerd sniping myself into writing this from a far more categorical perspective -- hopefully it illuminates *why* we define structures in the way we do from a perspective of computation!

---

## motivation for Clifford algebra
Have you ever thought to yourself: "I wish I could multiply vectors together?"
I can assure you that nearly every one of my students tried this in some way when they first learned about vectors.
The ideas of dot products and cross products and how they differ in dimension 2 and 3 really seemed to confuse them.
Nevermind the fact that the cross product fails to generalize into higher dimensions.

Maybe you are someone who loves complex numbers or maybe you have worked with quaternions.
Well, I have good news for you: there is a way to generalize all of these ideas into higher dimensions in a quite modular way.

So, let's take an approach that is very algebraic and categorical in nature.
The reason why isn't to be confusing or overly abstract, but to hopefully bridge a gap into how this is all defines a means of computation whereby I mean "your ability to write software using these tools."
From a philosphical perspective, I believe algebra is a means of constructing data structures and computational rules via their relationships to one another.
We should take this approach and build up this technology in a rigorous way.

## algebraic structure
Take a finite dimensional vector space $V$ over a field $\mathbb{F}$.
Let's review some operations we can do on vector spaces themselves so that we have our modular structures in place.
Ultimately operations at the structural level descend to operations on the object level (e.g., on the vectors).

### sum type
First, take a collection of vector spaces $V_1, V_2, \dots$ then the *direct sum* $\oplus$ combines a pair of vector spaces into $V_i \oplus V_j$ which consists of all vectors $\boldsymbol{v_i} \oplus \boldsymbol{v_j}$ where $\boldsymbol{v_i} \in V_i$ and $\boldsymbol{v_j} \in V_j$.
Typically, if it were that $\boldsymbol{v_j}=\boldsymbol{0}$, we have:
$$
\boldsymbol{v_i} \oplus \boldsymbol{v_j} = \boldsymbol{v_i} \oplus \boldsymbol{0} = \boldsymbol{v_i}.
$$
This is an important note -- we can always add the zero vector to any vector and it doesn't change the vector.

Categorically, the direct sum is the *coproduct* which, intuitively, means we are free to pick a (finite) combination of elements from each of the $V_i$ we have in the product. 
For instance, we can take:
$$
\begin{equation}
\bigoplus_{i=1}^n V_i = V_1 \oplus V_2 \oplus \cdots \oplus V_n.
\end{equation}
$$
and an element of this space is a summation 
$$
\boldsymbol{v_1} \oplus \boldsymbol{v_2} \oplus \dots \oplus \boldsymbol{v_n}
$$
where $\boldsymbol{v_i} \in V_i$.
I refer to this subscripting here as *tagging* as it marks which vector space each element comes from.
One may also argue that this is quite similar to an `OR` operation where we are allowing ourselves to pick from any of the $V_i$ and combine them into a single "statement" (and that's because `OR` is also a coproduct).

All of the above is actually equivalent to the *direct product* which I'll write as $\times$.
Specifically, that's true so long as the summation above is finite as in Eq. (1) because the category of vector spaces is *additive*.
In the infinite case,
$$
\bigoplus_{i=1}^\infty V_i
$$
we require that all but finitely many of the $\boldsymbol{v_i}$ are zero, and this is where the direct sum and direct product differ.

Let's just take a pair of spaces $V$ and $W$ for a bit.
To think of these objects, we can think of them as a pair of arrays of real numbers.
(**Warning:** please ignore the re-use of notation, but I was previously using boldface to denote vectors, now I will use the same characters without boldface to denote components of vectors.)
For instance, if we have $\boldsymbol{v} \in V$ and $\boldsymbol{w} \in W$, then:
$$
\begin{bmatrix} v_1 \\\\ v_2 \\\\ \vdots \\\\ v_m \end{bmatrix} \oplus \begin{bmatrix} w_1 \\\\ w_2 \\\\ \vdots \\\\ w_n \end{bmatrix} = \begin{bmatrix} v_1 \\\\ v_2 \\\\ \vdots \\\\ v_m \\\\ w_1 \\\\ w_2 \\\\ \vdots \\\\ w_n \end{bmatrix}.
$$
The caveat here is that with the direct sum, if, for instance $\boldsymbol{w}\in W = \boldsymbol{0}$, then we can collapse the array to just that of $\boldsymbol{v}$.

With this construction we can still add and scalar multiply vectors in the direct sum in the usual way.
Just for show:
$$
\boldsymbol{v} \oplus \boldsymbol{w} + \boldsymbol{v\'} \oplus \boldsymbol{w\'} = (\boldsymbol{v} + \boldsymbol{v\'}) \oplus (\boldsymbol{w} + \boldsymbol{w\'})\\\\
\alpha (\boldsymbol{v} \oplus \boldsymbol{w}) = (\alpha \boldsymbol{v}) \oplus (\alpha \boldsymbol{w}).
$$

This coproduct construction is often called in computer science a *tagged union* type.
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
Comparing this to the notion of the `OR` operation I brought up before, Rust takes their enumerations as more of an `XOR` operation.

Let's think about this diagramatically.
We define the coproduct/direct sum $V \oplus W$ as the vector space that satisfies the following universal property:
- Let $\iota_V$ and $\iota_W$ be the inclusion maps from $V$ and $W$ into $V \oplus W$ respectively, defined like:
$$
(\boldsymbol{v},\boldsymbol{w}) \mapsto \boldsymbol{v} \oplus \boldsymbol{w}.
$$
- For any other vector space $Z$ and linear maps $f_V: V \to Z$ and $f_W: W \to Z$, there exists a unique linear map $f: V \oplus W \to Z$ such that the following diagram "commutes" (that is, "makes sense"):

![coproduct](/images/longform/holy_trinity/algebra_as_computation/coproduct.svg)

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

### product type
If you do want the requirement that you must have one of each, then you are looking for a *product* type.
To be clear, we don't actually need this to construct the Clifford algebra, but it is a useful structure to have and compare against.
The diagram is the same as the coproduct, but with the arrows reversed.
![product](/images/longform/holy_trinity/algebra_as_computation/product.svg)

Let's spend a moment thinking about this diagram and using it to understand what we are guaranteed when working with the *direct product* of vector spaces $V \times W$.
Note that in the direct product, we typically write vectors as pairs $(\boldsymbol{v},\boldsymbol{w})$ where $\boldsymbol{v} \in V$ and $\boldsymbol{w} \in W$.
First, $Z$ is an arbitary vector space and $f_V$ and $f_W$ are linear maps from $Z$ into $V$ and $W$ respectively.
The mappings $\pi_V$ and $\pi_W$ are the *projection* maps from $V \times W$ into $V$ and $W$ respectively which are defined as:
$$
\begin{align*}
\pi_V(\boldsymbol{v},\boldsymbol{w}) &= \boldsymbol{v} \\\\
\pi_W(\boldsymbol{v},\boldsymbol{w}) &= \boldsymbol{w}.
\end{align*}
$$
The unique map $f$ is then defined as:
$$
f(\boldsymbol{v},\boldsymbol{w}) = (f_V(\boldsymbol{v}), f_W(\boldsymbol{w})).
$$

The coproduct and product types are the same for (finite sums or products) of vector spaces since I can assume $\boldsymbol{0}$ can take the place of a missing vector in the sum to create a product, or I can remove it in the case of a product to yield a sum (this was argued before).
In Rust, the product type is the `struct` type:
```rust
struct ProductVector<const M: usize, const N: usize> {
    v: V<M>,
    w: W<N>,
}
```
where you must have both a `V` and a `W` to create a `Vector`. 
Note that in this case, you can actually define the `Add` trait for the `ProductVector` type in Rust without any issues:
```rust
impl Add for ProductVector<M, N> {
    type Output = ProductVector<M, N>;
    fn add(self, other: ProductVector<M, N>) -> ProductVector<M, N> {
        ProductVector {
            v: self.v + other.v,
            w: self.w + other.w,
        }
    }
}
```
since Rust requires both `v` and `w` to be present in the `ProductVector` type.
In this sense, the product type is essentially like logical `AND` and, in fact, `AND` is also a product categorically.

The maps $\pi_V$ and $\pi_W$ are also quite useful in Rust as they are the `field_access` of the structs for the `ProductVector` type:
```rust
fn pi_V(prod_vec: ProductVector<M, N>) -> V<M> {
    prod_vec.v
}

fn pi_W(prod_vec: ProductVector<M, N>) -> W<N> {
    prod_vec.w
}

```

### comparison of sum and product types
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

### tensor product type
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


TODO: Add the "outer product" constructor function for the tensor.
TODO: Likewise talk about how we can define an add on `Tensor<M, N>` that is also type-safe. 
TODO: Show all these different things are vector spaces and stuff.
TODO: Some of this could be expressed as traits instead (e.g., the tensor could be a trait with all the functionality described and maybe then you could have choices of bases and stuff)
TODO: Organize