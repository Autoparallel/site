+++
title = "inductive Rust types"
date = "2024-04-04"
[extra]
tags = ["rust", "programming", "type theory"]
+++

Rust allows for `type` and `const` generics which can nearly be used to create something close to inductive types.
A struct we might want to define may have fields that depend on a predecessor or successor value of the current `const` associated to it.
For instance, we may want to have $k$-cells attach to $(k-1)$-cells to build a *cell complex*.
We want to enforce at compile time that we indeed map a specific type `Cell<K>` to a `Cell<K-1>` as opposed to a runtime check like:
```rust
struct Cell {
    dim: usize,
    attachments: Vec<Cell>
}

impl Cell {
    fn attach(&mut self, other: &Cell) {
        if self.dim - 1 == other.dim {
            self.attachments.push(other);
        } else {
            panic!();
        }
    }
}

fn main() {
    let k = 2;
    let k_cell: Cell = Cell::new(k);
    let k_minus_one_cell: Cell = Cell::new(k - 1);

    k_cell.attach(k_minus_one_cell); // passes
    k_cell.attach(k_cell); // panics
}

```
The runtime check is clunky and it should be possible to do this at compile time. 

Let's try to define this as so, with code that may not compile (especially without `#![feature(generic_const_exprs)]`):

```rust
const fn predecessor(K: usize) -> usize 
where K > 0
{
    K - 1 
}

struct Cell<const K: usize> 
where K > 0 
{
    attachments: Vec<Cell<predecessor(K)>>
}

struct Cell<const K: usize>
where K == 0 {
    attachments: (),
}

impl Cell<const K: usize>
where K > 0 
{
    fn attach(&mut self, other: &Cell<predecessor(K)>) {
        self.attachments.push(other);
    }
}
```
Though the above code does not compile, it shows the direction we want to go in.
Specifically, we can parameterize types via the (almost) natural numbers and enforce relationships between them at compile time.
We see our base case for our "inductive type" `Cell<0>` is defined separately from the inductive case `Cell<K>`.
Our base case yields constraints, for instance, trying:
```rust
let 0cell: Cell<0> = Cell::new();
0cell.attach(_); // will not compile for any input
```
will not compile because `.attach()` is not even defined for `Cell<0>`, as it should not be.
Actually, `.attach()` is what you get when you apply the "cell functor" to the `predecessor()` function that defines the inductive step.

We can actually do something similar if you check out this video: [Type Theory for the Working Rustacean](https://www.youtube.com/watch?v=BdXWlQsd7RI). 
I'll summarize the idea here in code:
```rust
trait Nat {}
struct Zero {}
impl Nat for Zero {}
struct Succ<N: Nat> {
    _predecessor: PhantomData<N>
}

impl<N: Nat> Nat for Succ<N> {}
```
With the above trait setup, we have essentially defined a *natural number* type. 
For instance, if we instead attached $k$-cells to $(k+1)$-cells, we could define a struct like:
```rust
struct OpCell<K: Nat> {
    attachments: Vec<OpCell<Succ<K>>>,
}

impl<K: Nat> OpCell<K> {
    fn attach(&mut self, other: &OpCell<Succ<K>>) {
        self.attachments.push(other);
    }
}
```
Some problems here:
1. It is not obvious how to use this for the previous case where $k$-cells attach to $(k-1)$-cells.
2. Managing these types is terrible. 
Imagine having elements such as where we have that natural $k=8$. 
Then it would be of type: `OpCell<Succ<Succ<Succ<Succ<Succ<Succ<Succ<Succ<Zero>>>>>>>>>`.