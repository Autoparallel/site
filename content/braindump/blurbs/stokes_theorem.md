+++
title = "stokes' theorem"
date = "2024-09-29"
[taxonomies]
tags = ["mathematics", "topology", "geometry", "analysis"]
+++

I can make an argument that the most important theorem in the world is *Stokes' theorem*.
Let me first give the intuitive statement, followed by a formal enough statement, and explain with examples.
Since this is just a short form, I probably won't stand on the soapbox to make the "greatest theorem" argument today.

**Theorem (Stokes', intuitively):** Given an object of arbitrary dimension, and a vector-valued function defined on said object, it must be that summing up interior values of the changes of the vector-valued function inside the object gives the same output as if you summed up the values themselves on the edge of the object.

The formal statement is of course more precise, but at a cost of more hours of mathematical decryption. 
Nonetheless:
**Theorem (Stokes'):** Let $M$ be a smooth (enough) $n$-dimensional topological manifold with boundary $\partial M$. Let $\omega$ be an $n-1$-form and $d$ the exterior derivative. 
Then,
$$
\int_{M} d\omega = \int_{\partial M} \omega
$$

Some quick remarks:
- Manifolds are objects we can make out of potentially higher dimensional playdough; dimension is just the number of unique directions you can walk on the object.
- Differential forms are a bit more than just "vector-valued functions", though I never said what vector spaces I was referring to and any other equipment it carried. 
Sometimes to be intuitive to newcomers, you have to lie or withhold information a bit -- sorry.
- The [exterior derivative](https://en.wikipedia.org/wiki/Exterior_derivative) is the correct generalization of the [derivative](https://en.wikipedia.org/wiki/Derivative) you learn about in Calc I and gradient/divergence/curl you learn in III.
- $M$ probably has to be second countable or something, but I truly don't care to add even more stipulation here.
These days I find myself thinking less like a mathematician, more like a physicist.
---

Okay, so what the hell does any of this mean?
What are some examples of this in every day life?
"I already closed this blurb and left angry."

Let's think of real world examples and come to a conclusion on what this theorem tells us.
Consider a line segment $[a,b]$ and consider a function $f\colon [a,b] \to \mathbb{R}$ with derivative $df = \frac{\partial f}{\partial x}dx$.
For sake of grounding ourselves in reality, imagine this function $f$ describes a fluid pressure at a given point $x\in [a,b]$ where $[a,b]$ itself could be thought of as a 1-dimensional tube.
The derivative of $f$, $df$, then tells us the rate of range of $f$ (pressure) per unit length (the $\partial f / \partial x$) times unit length (times $dx$).
If we then accumulate the changes of $f$ relative to the length, $dx$ along all of $[a,b]$, we should know the total change in pressure ($f$) from one end to the other.

Symbolically we compute the above as:
$$
\int_{[a,b]}df = \int_a^b \frac{\partial f}{\partial x}dx.
$$

There's a simpler way to do this though, I'd argue.
Some of you just realized it from the symbols above, a handful of you from the description I provided above, and I've likely confused the rest.
Nonetheless, let's ignore the symbols.

Physically, we know something.
If the interfaces of this tube are solely at $a$ and $b$, then the flow in the tube is completely defined by the pressure differences at that interface.
(For those of you with background in electromagnetism, consider the sentence I just said but with voltage and current replacing pressure and flow respectively.)
That is, fluid flows from interfaces of higher pressure to lower -- if you've ever used a straw or a vacuum cleaner, you know this.
If this is to be true, then adding up the internal pressure changes from $a$ to $b$ cannot possibly deviate in result.
That is, unless some magical force existed inside the tube somewhere.

If all I did was add the changes of $f$ from $a$ until I got to $b$, certainly I could just have looked at $f(a)$ and $f(b)$ and found their difference to know how $f$ changed over this whole tube.
Symbolically:
$$
\int_{\partial [a,b]} f = \int_{\{a,b\}}f = f\vert_a^b = f(b) - f(a)
$$
and we realize:
$$
\int_{[a,b]}df = \int_{\partial [a,b]} f 
$$
or in other words:
$$
\int_a^b \frac{\partial f}{\partial x}dx = f(b)-f(a)
$$
the *fundamental theorem of calculus*.

The magical force?
It can only exist if $df$ wasn't the derivative of a function $f$.

**going up a dimension**

One dimension???
Boring!
Two dimensions?
Now we're talking!

Consider the same scenario, but now instead $M=[a,b]$, we take $M=\mathbb{B}^2$, the 2-dimensional unit disk.
In this case, consider $\mathbf{v}$ to be a fluid velocity (vector vield).
If I have this $\mathbf{v}$ defined in the disk $\mathbb{B}^2$, I can compute how this field diverges $\nabla \cdot \mathbf{v}$.
Briefly, [*divergence*](https://en.wikipedia.org/wiki/Divergence) $\nabla \cdot \mathbf{v}$ tells me a value at each point $x\in \mathbb{B}^2$ for how quickly a fluid particle placed at $x$ would accelerate radially away from that point on average.
Said differently, a positive value of divergence indicates a point where there is a source of fluid incoming to the region whereas a negative divergence indicates a sink of fluid (i.e., where fluid drains from the region).

Adding up this average radial (outward) acceleration or the sources/sinks of fluid in $\mathbb{B}^2$ can be done like so:
$$
\int_{\mathbb{B}^2}\nabla \cdot \mathbf{v}.
$$
However, if we knew all the amount of the fluid entering and leaving in the inside of the disk, we know that in a closed system, that much fluid must also pass through the boundary of the disk as well.

Play the experiment in your head with a simple setup. 
Consider two parallel glass plates held next to each other with just a small air gap between them. 
Cut a hole in one plate, and pump in air through that hole.
On the outside of these plates, you would feel air escaping outward, right?
Certainly, and I mean certainly, the amount of air coming out the outer edge of the plates must be the same that you pump in to the center, right?
If not, where is it going?

Alas, this is true.
Not just physically, but mathematically so. 
Stokes' theorem tells us!
It must be that 
$$
\int_{\mathbb{B}^2}\nabla \cdot \mathbf{v} = \int_{S^1} \mathbf{v}\cdot \mathbf{n}
$$
where $S^1$ is the boundary circle to the disk $\mathbb{B}^2$ and $\mathbf{n}$ is the direction vector perpendicular to the boundary circle $S^1$.
That is, the right hand side integral counts how much fluid is flowing out of the disk through the edge.
If there are sources in the interior, then a positive amount of fluid flows out the edges, and vice-versa.

---

The general result is massive.
Stokes' theorem doesn't just give us the fundamental theorem of calculus in dimension-1 and the divergence theorem in dimension-2, it gives us a result that is true in arbitrary dimension.
It also tells us some high-caliber relationships such as [*Poincare (-Lefschetz) duality*](https://en.wikipedia.org/wiki/Poincaré_duality), [Taylor's theorem](https://en.wikipedia.org/wiki/Taylor%27s_theorem), provides us a way to write down [global gauge symmetries](https://en.wikipedia.org/wiki/Gauge_theory), rears its head in [elliptic theory](https://en.wikipedia.org/wiki/Elliptic_operator) to provide insight on fundamental mathematical physics concepts like fluid dynamics, electromagnetism, and heat flow, and is immensely useful in [geometric inverse problems](https://en.wikipedia.org/wiki/Inverse_problem) as it provides a means to extract interior data from non-invasive boundary data.

Let this just be step one of this discussion. There's a lot more to say, and I probably didn't even give this the best explanation or glory in this 20 minute speedrun blurb.