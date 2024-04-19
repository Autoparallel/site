+++
title = "space and quantity duality"
date = "2024-04-19"
[taxonomies]
tags = ["mathematics", "category theory"]
+++

I have touched on the topic of [space and quantity](https://ncatlab.org/nlab/show/space+and+quantity) in both [sheaves are probes](/braindump/#sheaves-are-probes) and [deep isometry](/braindump/#deep-isometry) to an extent, but I want to revisit it.
The idea is remarkably beautiful, in essence we can think of spaces as presheaves (contravariant functors) on a category $C$ (into the category of sets).
Succinctly, this is because all it takes to define a *space* is the means in which you can probe them and this is exactly what a (pre)sheaf does.
For this, we say that a space is modeled on the category $C$.
In order to not lose concreteness, we can still think of spaces as objects like topological spaces -- this is strictly more general.
Also, probes we should think of as a means of mapping **into** a space.

On the other hand, *quantity* should reflect some kind of measurement out of a space into some set we know how to interpret measurements in. 
For instance, if I have the set of all line segments $\mathcal{S}$, then a valid measurement (or quantity) is a function $f \colon \mathcal{S} \to \mathbb{R}$ which assigns a real number to each line segment.
An example of a valid quantity would be $f([a,b]) = b - a$.
Categorically, if a space is modeled on $C$, this is just a covariant functor $C$ into the category of sets.

But how is this useful?
What the hell is going on?
Let's take it just one more step.
It turns out that there is a notion of *duality* called [Isbell duality](https://en.wikipedia.org/wiki/Isbell_duality) which gives us this extremely powerful and beautiful relationship between spaces and quantities.
Namely, there is a duality between spaces themselves and quantities on those spaces that allows one to determine the other (at least in certain cases!).

A concrete example for us would be the following.
Consider a smooth compact surface $X$ as a space.
On $X$, we can consider all of the holomorphic functions on that surface $H(X)$ as a set of $\mathbb{C}$-valued quantities.
Now, it turns out that $H(X)$ itself is a [ring](https://en.wikipedia.org/wiki/Ring_(mathematics)).
We can compute the [maximal ideals](https://en.wikipedia.org/wiki/Maximal_ideal) of this ring and put them into the set $\mathcal{I}(X)$.

Real fast, for concreteness, these ideals in $\mathcal{I}(X)$ are just the set of all functions that vanish at a single point.
Note a holomorphic function on a compact surface may only vanish at finitely many points since [zeros of holomorphic functions are isolated](https://math.stackexchange.com/questions/4248728/proof-of-the-zeros-of-a-holomorphic-function-being-isolated) and we have the [Bolzano-Weierstrass theorem](https://en.wikipedia.org/wiki/Bolzano%E2%80%93Weierstrass_theorem).
Then, for an element to be a **maximal** ideal, it must only vanish at a single point, not two or more.

Amazingly, there is a holomorphic function $f \colon X \to \mathbb{C}$ that vanishes at any given point $x \in X$ and so the set of maximal ideals $\mathcal{I}(X)$ is in bijection with the points of $X$.
Finally, given the right topology on $\mathcal{I}(X)$, we can recover the topology of $X$ from the set of maximal ideals.
That is to say, $\mathcal{I}(X) \cong X$ (homeomorphism or even conformal equivalence) and we have realized that quantities and spaces are dual to each other and can even be used to recover one another.

---

The concept of Isbell duality or this general duality between space and quantity is rather new to me and I wish I would have known it when I was trying to do inverse problems.
Put this tool in your toolbox.