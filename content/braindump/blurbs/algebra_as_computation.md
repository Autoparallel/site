+++
title = "algebra as computation"
date = "2024-04-12"
[extra]
tags = ["math", "algebra", "category theory"]
+++

**Warning:** This blurb started out as a dive into Clifford algebras and I ended up nerd sniping myself into writing this from a far more categorical perspective -- hopefully it illuminates *why* we define structures in the way we do from a perspective of computation!

---

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

**algebraic structure**

Take a finite dimensional vector space $V$ over a field $\mathbb{F}$.
Let's review some operations we can do on vector spaces themselves so that we have our modular structures in place.
Ultimately operations at the structural level descend to operations on the object level (e.g., on the vectors).

**sums**

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

This coproduct construction is often called in computer science a *tagged union* type.
For instance, in Rust, you maybe have something like:
```rust
// We choose the same "field" (`f64`) for both `V` and `W`
struct V<const M: usize>([f64; M]);
struct W<const N: usize>([f64; N]);

enum SumVector<const M: usize, const N: usize> {
    V(V<M>),
    W(W<N>),
}
```
where you can select either a array of "real numbers" (actually floats) of length (dimension) $M$ or a array of length $N$ using this enumeration.
An important distinction here is you could not create an instance of `SumVector` that chooses both `V` and `W` at the same time in Rust!

Let's think about this diagramatically.
We define the coproduct/direct sum $V \oplus W$ as the vector space that satisfies the following universal property:
- Let $\iota_V$ and $\iota_W$ be the inclusion maps from $V$ and $W$ into $V \oplus W$ respectively, defined like:
$$
(\boldsymbol{v},\boldsymbol{w}) \mapsto \boldsymbol{v} \oplus \boldsymbol{w}.
$$
- For any other vector space $Z$ and linear maps $f_V: V \to Z$ and $f_W: W \to Z$, there exists a unique linear map $h: V \oplus W \to Z$ such that the following diagram "commutes" (that is, "makes sense"):

![coproduct](/images/blurbs/computational_clifford_algebras/coproduct.svg)

Okay, but how do you define such an $f$ given the above?
Well, if we have $f_V(\boldsymbol{v}) = \boldsymbol{z_v}$ and $f_W(\boldsymbol{w})=\boldsymbol{z_w}$ then:
$$
f(\boldsymbol{v} \oplus \boldsymbol{w}) = \boldsymbol{z_v} + \boldsymbol{z_w}
$$
which makes this diagram commute since, for example,
$$
f \circ \iota_W (w) = f(w) = z_w.
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

There's a relationship here between our coproduct definition and the product definition.
Importantly, this coproduct type **does not** force a requirement that we must have one of each $V$ and $W$ to make up an element $V \oplus W$ and insteaad says "you can have one or the other or both."

If you do want the requirement that you must have one of each, then you are looking for a *product* type.
The coproduct and product types are the same for (finite sums or products) of vector spaces since I can assume $\boldsymbol{0}$ can take the place of a missing vector in the sum to create a product, or I can remove it in the case of a product to yield a sum (this was argued before).
In Rust, the product type is the `struct` type:
```rust
struct ProductVector<const M: usize, const N: usize> {
    v: V<M>,
    w: W<N>,
}
```
where you must have both a `V` and a `W` to create a `Vector`. 
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
The issue here and why we require `assert!` is solely due to the fact that Rust allows only a single variant of the tagged union type to be selected at a time whereas our general coproduct $\oplus$ allows for any combination of $V$ and $W$ to be selected!

At any rate, this is the *sum* operation we will want on vector spaces that will give us a sum on vector-like objects in the long run!
In the case we are using it on spaces, we should think of this computation as a *formation* (or *construction*) rule.

**tensor products**

Next, we want to define a multiplicative operation on vector spaces which will descend to a *multiplication* operation on the vector-like objects we are building.
For us, this will be the *tensor* product of vector spaces. 

Let's also take a look at this formally. 
A tensor product $V \otimes W$ of vector spaces $V$ and $W$ is a vector space that is the "freest" vector space that contains all the elements of $V$ and $W$.
By freest, I mean that instead of just attaching one vector to another by extending an array 


![tensor product](/images/blurbs/computational_clifford_algebras/tensor_product.svg)