+++
title = "paths of paths"
date = "2024-04-03"
[extra]
tags = ["math", "topology"]
+++

There's a nice relationship between higher order functions and higher homotopy theory.
Let's develop a mental picture for what we mean by "paths of paths".

First, we can consider a *path* as a (continuous) function from the unit interval to a topological space $X$. 
We'll take two paths from point $a \in X$ to $b\in X$:
$$
f,g: [0, 1] \to X.
$$
Specifically, $f(0)=g(0)=a$ and $f(1)=g(1)=b$. 
Figure of paths in $X$ below.
![paths](/images/blurbs/paths_of_paths/paths.svg)

Let's consolidate notation and put $\Hom([0,1], X)_{a,b}$ to denote all paths from $a$ to $b$ in $X$. 

From this, we can now consider a *path of paths* as a (continuous) function:
$$
H: [0,1] \to \Hom([0,1], X)_{a,b}.
$$
This $H$ can be taken such that $H(0)=f$ and $H(1)=g$.
Diagramatically:
![homotopy](/images/blurbs/paths_of_paths/homotopy.svg)

It is not true that such an $H$ exists for all $f,g$, and $X$.
The reason is quite geometric and satisfyingly, the diagram above is a good way to see why.

Imagine $H$ performs the action of "dragging" the $f$ arrow to the $g$ arrow. If there were a "singularity" in the diagram, then $H$ would have to pull the arrow across the singularity, which it cannot do.

Amazingly, this becomes concrete if we consider that:

$$\Hom([0,1],\Hom([0,1], X)_{a,b}) \cong  \Hom( [0,1]\times[0,1], X)$$
where $\cong$ denotes an equivalence, and $\Hom([0,1] \times [0,1], X)$ is the set of functions that map the unit square $[0,1] \times [0,1]$ into $X$ such that the boundary of the square is glued to $f$ and $g$.
(We just discovered a functioral property of this $\Hom$ item.)

By this equivalence, we can now see this as mapping $[0,1]\times[0,1]$ to $X$ which is a map of the unit square into $X$.
See below.
![image of unit square](/images/blurbs/paths_of_paths/image_of_unit_square.svg)

Visually, we can see that if we were to "puncture" $X$ between our paths $f$ and $g$, then the image of $H([0,1])$ (the shaded pink region) would be torn.
For instance, we can add a void by cutting out a hole in $X$ between $f$ and $g$ shown with the hashed added region below:
![void](/images/blurbs/paths_of_paths/void.svg)
The tearing is a visual representation of the fact that no such $H$ exists for a given space.

---
All of falls under the notion of *homotopy* in topology.
This is the same idea of homotopy in *homotopy type theory*.
In this theory, we can consider types (for which there are function types) and equality between these types as paths.
I'm trying to get to a more formal understanding of this, but it's a bit of a journey.