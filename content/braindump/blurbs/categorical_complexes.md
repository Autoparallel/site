+++
title = "categorical complexes"
date = "2024-04-04"
[extra]
tags = ["math", "category theory", "topology"]
+++

Taking a look at [paths of paths](/braindump/#paths-of-paths) we could see that there is a geometry invoked by thinking of functions of functions.
Considering categories which consist purely of morphisms (functions), we can start to build up their geometric structure.

Take a category with objects $A$ and $B$.
Functions/morphisms between these objects are arrows $f$ and $g$. 
Morphisms or paths between these functions can sometimes be built as well, call them $H_1$ and $H_2$.
We can continue this process and have morphisms between $H_1$ and $H_2$, call it $\Phi$.
We are building up a complex of morphisms and we can draw a diagram:
![higher order functions](/images/blurbs/categorical_complexes/higher_order_functions.svg)

We can think of these mappings as a means of attaching *cells* together.
In particular, there are $0$-cells given by the identity maps $\operatorname{Id}_A$ and $\operatorname{Id}_B$ which you can just picture as points located at $A$ and $B$ respectively.
The $1$-cells are the functions $f_1$ and $f_2$ which are just edges connecting the $0$-cells.
The $2$-cells are the higher order functions $H_1$ and $H_2$ which are just disks glued together at the $1$-cells.
The $3$-cells are the higher order functions $\Phi$ which are just balls glued together at the $2$-cells.
We can explode this diagram to see this more clearly:
![exploded view](/images/blurbs/categorical_complexes/exploded_view.svg)

We have duplicated $A$ and $B$, but we did so by having identity mappings be the arrows between them, which means these are all actually collapsed to a point. 
I told you this was the exploded view!
The single arrows form a 2-dimensional square on all six sides of this cubical diagram. 
Finally, the 3-cell is the hashed arrow (the $\Phi$ morphism that mapped $H_1$ to $H_2$) which gives this cube a 3-dimensional volume.

What's beautiful about this is that we can think of this as a topological space and moreover start to study categories, or categories of categories, as topological spaces.
This is conceptually the idea behind the [Grothendieck topology](https://en.wikipedia.org/wiki/Grothendieck_topology).
Something I would dearly love to be able to construct in Lean 4 or in Rust (or possibly Haskell), to some extent.