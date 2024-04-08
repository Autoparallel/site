+++
title = "sheaves are probes"
date = "2024-04-07"
[extra]
tags = ["math", "category theory", "topology"]
+++

I found this piece today called [motivation for sheaves, cohomology and higher stacks](https://ncatlab.org/nlab/show/motivation+for+sheaves%2C+cohomology+and+higher+stacks) which was really an interesting read after spending some time in [Sheaf Theory through Examples](https://arxiv.org/abs/2012.08669).

The central idea here is that we often want to try to understand a space by examining it's relationship with other spaces.
A classic example is the study of a topological space $X$ by looking at the continuous functions from spheres $S^n$ into $X$.
Amazingly, this set of continuous mappings $S^n \to X$ with the right notion of equivalence forms a group called the *$n$th homotopy group* $\pi_n(X)$ which is a topological invariant of $X$.
Point is, we can start to see similarities in distinct spaces by looking at how they interact with other spaces.

Sheaves are a generalization of this idea.
Succinctly, sheaves are collections of probes that we can use to study a space and they can be used to generalize our notion of a space.

Take a space $U$, then we think of the set of all the ways to map $U$ into $X$ as the set of probes of $X$ by $U$, which we call $X(U)$.
In order to really understand $X$, we need to understand how it interacts with all possible probes.
For instance, I may also probe $X$ with $V$, and if we have $f \colon U \to V$, then the difference of the probes $X(U)$ and $X(V)$ should be related by the map $f$.
- **Consistency** is guaranteed by $\operatorname{Id}_U \colon U \to U$ yields a $\operatorname{Id}_{X(U)} \colon X(U) \to X(U)$.
- **Composability** is guaranteed by $f \colon U \to V$ and $g \colon V \to W$, then $X(U) \to X(W)$ is the same as $X(U) \to X(V) \to X(W)$.

These just show our $X(_)$ is a functor from the category of spaces to the category of sets -- a *presheaf*.

For our probes to make sense, we have to have the ability to construct probes from other probes.
For instance, if $V_1 \cup V_2 = U$ with $V_1 \cap V_2 \neq \emptyset$, then we should be able to construct a probe in $X(U)$ from probes in $X(V_1)$ along with $X(V_2)$ so long as the probe $p_1 \in X(V_1)$ and $p_2 \in X(V_2)$ agree on the overlap $p_1 = P_2 \in X(V_1 \cap V_2)$.
Expressed purely categorically, this condition is that the parallel morphisms (individual restrictions) $X(V_1) \times X(V_2) \to X(V_1 \cap V_2)$ is the set of matching probes in $X(V_1)$ and $X(V_2)$.
This final condition yields the *locality* and *gluing* conditions for a sheaf if this is true for all $U$ and $V_1, V_2$.

---

So sheaves encapsulate the notion of being able to analyze a space with another space.
Taking this perspective, it's pretty reasonable to see why sheaves can have a use in something like [signal processing](https://link.springer.com/book/10.1007/978-3-642-36104-3).
If your signals live on a space (which they do), they all the ways of analyzing that signal lie inside of all the ways of probing the space!