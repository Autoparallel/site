+++
title = "autoparallels"
date = "2024-04-05"
[extra]
tags = ["math", "geometry", "physics"]
+++

The universe, as far as we know, is a pseudo-Riemannian manifold *à-la* [general relativity](https://en.wikipedia.org/wiki/General_relativity).
In this context, *autoparallel fields* are those that do not twist or turn with respect to a [connection](https://en.wikipedia.org/wiki/Connection_(mathematics)).
This is a broad generalization of Newton's first law for curved spaces.
In particular, *autoparallel fields* $V$ satisfy the *autoparallel equation*:
$$
\nabla_{V}V = 0.
$$
Above, we are taking a directional derivative (really, [covariant derivative](https://en.wikipedia.org/wiki/Covariant_derivative)) of $V$ along $V$ and setting it to zero.
Succinctly, we can think: "$V$ does not change in length or direction when you move in the direction of $V$."

We usually draw pictures of curves $\gamma$ on a manifold $M$ to illustrate the concept:
![manifold curve](/images/blurbs/autoparallels/manifold_curve.svg)

We also draw pictures of fields $V$ on manifolds like this:
![manifold field](/images/blurbs/autoparallels/manifold_field.svg)

**What is the intuition?**
Autoparallel fields are, in a way, the lowest energy configurations of a system.
If we take a step back and look at the autoparallel equation where $V=\dot{\gamma}$ is the tangent vector field to a particle following a curve $\gamma$, it can be unraveled into Newton's first law (and you can generalize to get Newton's second law). 
By the way $\dot{\gamma}$ is the velocity of the particle.

So, autoparallel $\gamma$ moves at constant velocity as it is not being acted on by an external force.
Autoparallel fields are those that do not accelerate or decelerate in the direction of the field itself, i.e., they have no force acting on them -- hence they are in a low energy configuration.
Further, the only reason an autoparallel curve $\gamma$ (or field $V$) may appear to bend, twist, or lengthen, is purely due to the curvature of the space it is living in.

**Example (flat space):** If we take the case where we have a curve $\gamma$ whose on a flat manifold such as the plane $\R^2$, then I claim $\nabla_{\dot{\gamma}}\dot{\gamma} = 0$ is $\gamma$ moving at a constant velocity -- so it does not have rotational acceleration (i.e., it does not twist or turn and there is no torque applied) and it also does not have linear acceleration (i.e., it does not start to move more quickly or slow down).

Below  is an example of a curve that is not autoparallel:
![not autoparallel](/images/blurbs/autoparallels/not_autoparallel.svg)

Notice, due to the bend in the curve, the direction of $\dot{\gamma}$ has to change from point to point. For example, from $\dot{\gamma}(t)$ to $\dot{\gamma}(t')$ there is a change in direction. 
You can think of this change in direction is due to the force applied to the curve $\gamma$, and this force just so happens to be $\nabla_{\dot{\gamma}}\dot{\gamma}$.
If we add up the $\nabla_{\dot{\gamma}}\dot{\gamma}$ at each point in time $t$ to $t'$, we will end up with the new velocity $\dot{\gamma}(t')$.
Furthermore, if we add the magnitude of $\nabla_{\dot{\gamma}}\dot{\gamma}$ at every point along the curve, we get a sort of "tension" energy, which is the energy of the configuration of the curve $\gamma$ (or field) I mentioned earlier.
This can, at the least, be zero. 
Hence, autoparallels are the lowest energy configurations of a system.


---

You can do this all much more generally, you could also take a [multivector field](https://en.wikipedia.org/wiki/Multivector) (and therefore [spinor field](https://en.wikipedia.org/wiki/Spinor)) $F$ and claim it is parallel along $V$ if:
$$
\nabla_{V}F = 0.
$$
This is useful if you need to be able to transport multivectors along a manifold.
I used this technique to be able to define *subsurface spinor fields* in some of my personal work.