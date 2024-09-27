+++
title = "tensors, algebras, and categorical computing"
date = "2024-04-17"
template = "blog.html"
description = "TODO"
[taxonomies]
tags = ["math", "algebra", "category theory"]
+++
---

Have you ever thought to yourself: "I wish I could multiply vectors together?"
I can assure you that nearly every one of my students tried this in some way when they first learned about vectors.
The ideas of dot products and cross products and how they differ in dimension 2 and 3 really seemed to confuse them.
Nevermind the fact that the cross product fails to generalize into higher dimensions (as if dimensions greater than three were not already confusing to many).
At the same time, we often teach ways to combine vectors, yet we don't quite give all the background that I think is instrumental for people to go out and get their hands dirty.
I don't want this to be the case.

Thinking of this concept of vector multiplication leads us down a road for what it means to extend, algebraically, vectors beyond just the space that they come packaged in.
For this, we will pass through a landscape of general constructions that can be applied to more places than just the vectors.
We'll also see why vectors are inherently nice, and we'll visit the notion of a *tensor* along the way.
The concept of tensor seems to be one that I get many questions about, so my hope here is we can do some mental yoga prior to defining this concept only for the tensor to emerge as something clear, albeit tersely defined.

From the freest extension of tensors, you can pick rules to eliminate or condense these dense representations into specialized types that achieve efficiency over generality for given applications.

## tensor product type
Next, we want to define a multiplicative operation on vector spaces which will descend to a *multiplication* operation on the vector-like objects we are building.
For us, this will be the *tensor* product of vector spaces. 

Let's also take a look at this formally. 
A tensor product $V \otimes W$ of vector spaces $V$ and $W$ is a vector space that is the "freest" vector space that contains all the elements of $V$ and $W$.
By freest, I mean that instead of just attaching one vector to another by extending an array, we are able to form higher dimensional arrays that contain all possible combinations of vectors from $V$ and $W$.
A look at [algebra as computation](./algebra_as_computation.md) addresses what I mean by attaching vectors together in the "lowest rank" way (i.e., the direct sum/product). 

We write elements of the space $V\otimes W$ as $\boldsymbol{v}\otimes \boldsymbol{w}$. 
To see how we work with these elements and compare it to the direct sum or direct product. 
For once, we can not do a reduction 
$$
\boldsymbol{v} \otimes \boldsymbol{0} \neq \boldsymbol{v}
$$
as we could with the direct sum, hence the term "product" being used in tensor product.
It's worth noting that the equality I presumed above is more of "isomorphic" than rigid equality inside a given vector space.

But how does this differ from the direct product then?
For one, it will use the direct product as a building block, but prior to that we can see the differences.

In reverse order of last time, let's get intuition from a diagram.
Take a look at the universal property below of the tensor product:
![tensor product](/images/longform/holy_trinity/algebra_as_computation/tensor_product.svg)
In the diagram the spaces are, $V\times W$ is the direct product, $V \otimes W$ is the tensor product, and $Z$ is any arbitary vector space.
As for the mappings we have  $\varphi$ is the application of the tensor product from a pair, i.e., $\varphi(\boldsymbol{v},\boldsymbol{w}) = \boldsymbol{v}\otimes \boldsymbol{w}$ into the tensor product space, $h$ is a *bilinear* map from $V\times W$ into $Z$, i.e., it is linear in both components, and finally this determines a unique linear map $\tilde{h}$ from the tensor product into some arbitrary $Z$.

Said differently, a linear map on a direct product can be expanded through the tensor product space into a map that is linear on both factors of the product individually.
We will return to this precise expression later.

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

At first this may seem almost trivial, but notice a difference here between the direct product and the tensor product, and it turns out the tensor product is, in general, a lot "freer" (or, perhaps, "fatter").

Note that in the direct product we had this uniquely defined mapping from the universal product:
$$
f(\boldsymbol{v},\boldsymbol{w}) = (f_V(\boldsymbol{v}), f_W(\boldsymbol{w}))
$$
so if we change $f_V$ alone, it will not change what $f$ does to the $\boldsymbol{w}$ part of pair as we still just use $f_W$.
In this way, there is a "separation" of the two components of the pair in the direct product (and likewise for the direct sum as argued previously).

This is not true for the tensor product.
Note that if we change $h$ such that 
$$
h\'(\boldsymbol{v},\boldsymbol{w}) = \boldsymbol{z'_{v,w}}
$$ 
then we must also change as such, and there is no clear way to separate the two components of the pair in the tensor product.
This is because the tensor product is "freer" in that it does not have a restriction to act component-wise on the pair (i.e., dilineated to just the $V$ or $W$ components by parts).

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

For example of the above proof, let's take $\dim(V)=3$ and $\dim(W)=2$ for instance.
Then we can choose $\tilde{h}$ to be a map into $3\times 2$ matrices like so:
$$
\boldsymbol{v} \otimes \boldsymbol{w} = \begin{bmatrix} v_1 \\\\ v_2 \\\\ v_3 \end{bmatrix} \otimes \begin{bmatrix} w_1 \\\\ w_2 \end{bmatrix} = \begin{bmatrix} v_1 w_1 & v_1 w_2 \\\\ v_2 w_1 & v_2 w_2 \\\\ v_3w_1 & v_3w_2 \end{bmatrix}.
$$
where the components of each vector are the entries of the matrix.
By no means do we have to choose this arrangement, but by doing so we can actually illuminate the structure of the tensor product space as a collection of bilinear mappings into the base field. 
To see this, note that you could take a matrix like so, and multiply from the left and the right by the vectors from $V$ (transposed) and $W$ respectively and get a bilinear map (linear in both the left and right side) into the field.
I told you we would return to this expression!

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

Working with our `V<M>` and `W<N>`, we can use our universal property intuition for construction:
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

All of this above was given in structure-form, but it really does not need to be. 
Consider the following interface:
```rust
trait TensorProduct<const M: usize, const N: usize, R> {
    type V: Add + Mul<R>;
    type W: Add + Mul<R>;

    fn tensor_product(v: V, w: W) -> Self;

    fn ex
}
```