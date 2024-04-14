+++
title = "deep isometry"
date = "2024-04-09"
[taxonomies]
tags = ["math", "geometry", "topology", "algebra"]
+++

When I was working on my [dissertation](https://api.mountainscholar.org/server/api/core/bitstreams/76b6ae86-e6da-418a-813b-5ac967c8835c/content) (I'm still angry one of my figures was not rendered properly on this) I was captivated by the question of what measurements of a space $X$ are needed for you to recover the space.
In particular, I was curious about whether or not you could recover a Riemannian manifold $(M, g)$ from the Dirichlet-to-Neumann operator (more generally a [Poincaré-Steklov operator](https://en.wikipedia.org/wiki/Poincaré–Steklov_operator#Dirichlet-to-Neumann_operator_on_a_bounded_domain) on the boundary of $M$, $\partial M$.
This general problem is often called the [Calderón problem](https://en.wikipedia.org/wiki/Alberto_Calderón) 
Physically, this is realized in the problem of asking: "Can we determine what the inside of a body looks like by applying a voltage to the surface, and measuring the outgoing current?"
This physical problem is called the [electrical impedance tomography](https://en.wikipedia.org/wiki/Electrical_impedance_tomography) problem and the generalization to Riemannian manifolds of arbitrary dimension was what I wanted to solve, given it has not been solved in any dimension higher than two (for non-analytic manifolds, that is).

Over the years, I made headway on the problem but it still remains unsolved.
The main approach I took was to generalize (part of) the [Boundary Control (BC) method](https://www.researchgate.net/publication/2536121_The_Calderon_Problem_for_Two-Dimensional_Manifolds_by_the_BC-Method) which can be summarized in the following bullet points (WARNING: Lots of jargon ahead, feel free to skip the bullet points and go to $\star$):
- Take the space of (real) spinor fields $C(M; \mathcal{G}^+)$ and note that this is a $C^*$-algebra.
- Take a $(M, g)$ and consider the space of monogenic spinor fields $\mathcal{M}(M) \subset C(M; \mathcal{G}^+)$.
(Think of these as a higher dimensional generalization of [complex holomorphic functions](https://en.wikipedia.org/wiki/Holomorphic_function).)
- Construct *subsurface spinors* which are commutative unital Banach algebras inside of $\mathcal{M}(M)$.
- Define their dual, the *spinor currents* 
$$
C_{\mathcal{G}^+}(M;\mathcal{G})\' = \\{ T\colon C(M;\mathcal{G} \to \mathcal{G} \~\vert\~ T\textrm{ is continuous}\\}
$$
which are $\mathcal{G}^+$-dual to $C(M;\mathcal{G}^+)$ (these are $\mathcal{G}^+$-valued Radon measures of spinor fields on $M$).
- Define the *spinor spectrum* $\mathfrak{M}(M) \subset C_{\mathcal{G}^+}(M;\mathcal{G})\'$ to (essentially) be algebra morphisms on each the subsurface spinor subalgebras of $\mathcal{M}(M)$.
Call the elements $\delta \in \mathfrak{M}(M)$ *spin characters*.

$\star$ After this long winded effort and some essential lemmas, we prove:

**Theorem:** For $M$ a compact submanifold of $\R^n$, then the space $\mathfrak{M}(M)$ with the weak-$\ast$ topology is homeomorphic to $M$.

What is the point here?
The point is that through a sufficiently rich algebraic structure of functions and functors defined on a space, we can recover the space itself.
This is in fact a very general idea in mathematics and is highlighted by the Yoneda lemma in category theory.
More on this another time.

At the very end of my Ph.D, I came across [sheaves](https://en.wikipedia.org/wiki/Sheaf_(mathematics)).
As it turned out, another proof technique for the Calderón problem was to use [sheaf theory](http://www.numdam.org/item/10.1016/s0012-9593(01)01076-x.pdf) but it required the manifold be real-analytic (which is highly restrictive).

Something was nagging at me though.
It seemed that the two approaches were the same in dimension two, but diverged in higher dimensions.
The BC method was less restrictive on smoothness but failed to reach higher dimensions, while the sheaf theory method was more restrictive on smoothness but could reach higher dimensions.
Yet, in dimension two they both essentially relied on this same underlying principals of algebras/continuation/uniqueness.
Namely, the BC method relied on isomorphisms between boundary values of holomorphic functions to an internal holomorphic function algebra, from which we can yield a isometry of $(M,g)$ whereas the sheaf theory method relied on the unique continuation of analytic functions to build up a Hausdorff sheaf which identified points of $M$ and used a mapping from the sheaf into open sets of $\R^n$ to yield a isometry of $g$.

---

What was the relationship here?
Is there something worth investigating in the relationship between these two methods?
I think so.