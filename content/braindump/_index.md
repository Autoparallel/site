+++
title = "/braindump/"
description = "<<< what's on my mind >>>"
+++
---

## `TODO`s
- learn: Lean 4.
  - [ ] read: "[Functional Programming in Lean](https://lean-lang.org/functional_programming_in_lean/)" 
  - [ ] read: "[Theorem Proving in Lean 4](https://leanprover.github.io/theorem_proving_in_lean4/)"
  - [ ] read: "[Theorem Proving in Lean](https://leanprover.github.io/theorem_proving_in_lean/)"
- learn: more cryptography. 
  - [ ] read: "[Moonmath Manual](https://github.com/LeastAuthority/moonmath-manual)"
  - [ ] read: "[Proofs, Arguments, and Zero Knowledge](https://people.cs.georgetown.edu/jthaler/ProofsArgsAndZK.html)"
  - [ ] read: "[An Introduction to Mathematical Cryptography](https://link.springer.com/book/10.1007/978-0-387-77993-5)"
- [ ] read: Shannon's papers.
    - [x] read: "A Mathematical Theory of Communication"
    - [ ] read: "Communication Theory of Secrecy Systems"
    - [ ] read: "Communication in the Presence of Noise"

## blurbs

{% blurb(title="paths of paths", date="2024-04-03", tags=["math", "topology"], slug="paths_of_paths") %}
There's a nice relationship between higher order functions and higher homotopy theory.
Let's develop a mental picture for what we mean by "paths of paths".

First, we can consider a *path* as a (continuous) function from the unit interval to a topological space $X$. 
We'll take two paths from point $a \in X$ to $b\in X$:
$$
f,g: [0, 1] \to X.
$$
Specifically, $f(0)=g(0)=a$ and $f(1)=g(1)=b$. 
Figure of paths in $X$ below.

<script type="text/tikz"> 


\tikzset{every picture/.style={line width=0.75pt}} %set default line width to 0.75pt        

\begin{tikzpicture}[x=0.75pt,y=0.75pt,yscale=-1,xscale=1]
%uncomment if require: \path (0,300); %set diagram left start at 0, and has height of 300

%Shape: Circle [id:dp5916889764018756] 
\draw  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ] (154,156.71) .. controls (154,154.66) and (155.66,153) .. (157.71,153) .. controls (159.77,153) and (161.43,154.66) .. (161.43,156.71) .. controls (161.43,158.77) and (159.77,160.43) .. (157.71,160.43) .. controls (155.66,160.43) and (154,158.77) .. (154,156.71) -- cycle ;
%Shape: Circle [id:dp46790486808185605] 
\draw  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ] (350,115.71) .. controls (350,113.66) and (351.66,112) .. (353.71,112) .. controls (355.77,112) and (357.43,113.66) .. (357.43,115.71) .. controls (357.43,117.77) and (355.77,119.43) .. (353.71,119.43) .. controls (351.66,119.43) and (350,117.77) .. (350,115.71) -- cycle ;
%Curve Lines [id:da999241019120903] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (157.71,156.71) .. controls (211.67,186.71) and (313.71,145.71) .. (353.71,115.71) ;
\draw [shift={(265.41,157.45)}, rotate = 164.39] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Curve Lines [id:da6077084593527825] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (157.71,156.71) .. controls (177.67,92.71) and (264.67,24.71) .. (353.71,115.71) ;
\draw [shift={(248.55,72.92)}, rotate = 168.64] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Shape: Rectangle [id:dp2181122147040886] 
\draw  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][line width=1.5]  (110.67,47) -- (400.67,47) -- (400.67,192) -- (110.67,192) -- cycle ;

% Text Node
\draw (274,152.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$g$};
% Text Node
\draw (210,57.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$f$};
% Text Node
\draw (140,153.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$a$};
% Text Node
\draw (364,108.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$b$};
% Text Node
\draw (98,22.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$X$};


\end{tikzpicture}
</script>

Let's consolidate notation and put $\Hom([0,1], X)_{a,b}$ to denote all paths from $a$ to $b$ in $X$. 

From this, we can now consider a *path of paths* as a (continuous) function:
$$
H: [0,1] \to \Hom([0,1], X)_{a,b}.
$$
This $H$ can be taken such that $H(0)=f$ and $H(1)=g$.
Diagramatically:
<script type="text/tikz">


\tikzset{every picture/.style={line width=0.75pt}} %set default line width to 0.75pt        

\begin{tikzpicture}[x=0.75pt,y=0.75pt,yscale=-1,xscale=1]
%uncomment if require: \path (0,281); %set diagram left start at 0, and has height of 281

%Curve Lines [id:da9388209042996238] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (29.05,106.56) .. controls (81.95,11.69) and (211.72,13.94) .. (272.24,108.86) ;
\draw [shift={(273.15,110.3)}, rotate = 238.03] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Curve Lines [id:da22390256742717696] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (29.05,162.98) .. controls (81.95,248.85) and (215.74,253.37) .. (272.3,166.66) ;
\draw [shift={(273.15,165.34)}, rotate = 122.48] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da3453292356684231] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (147.09,58) -- (147.09,204.51)(144.09,58) -- (144.09,204.51) ;
\draw [shift={(145.59,213.51)}, rotate = 270] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;

% Text Node
\draw (4.72,122.56) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$[ 0,1]$};
% Text Node
\draw (265.67,126.03) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$X$};
% Text Node
\draw (140.37,4.93) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$f$};
% Text Node
\draw (140.68,241.63) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$g$};
% Text Node
\draw (154.85,126.03) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$F$};


\end{tikzpicture}
</script>
It is not true that such an $H$ exists for all $f,g$, and $X$.
The reason is quite geometric and satisfyingly, the diagram above is a good way to see why.

Imagine $H$ performs the action of "dragging" the $f$ arrow to the $g$ arrow. If there were a "singularity" in the diagram, then $H$ would have to pull the arrow across the singularity, which it cannot do.

Amazingly, this becomes concrete if we consider that:

$$\Hom([0,1],\Hom([0,1], X)_{a,b}) \cong  \Hom( [0,1]\times[0,1], X)$$
where $\cong$ denotes an equivalence, and $\Hom([0,1] \times [0,1], X)$ is the set of functions that map the unit square $[0,1] \times [0,1]$ into $X$ such that the boundary of the square is glued to $f$ and $g$.
(We just discovered a functioral property of this $\Hom$ item.)

By this equivalence, we can now see this as mapping $[0,1]\times[0,1]$ to $X$ which is a map of the unit square into $X$.
See below.
<script type="text/tikz">


\tikzset{every picture/.style={line width=0.75pt}} %set default line width to 0.75pt        

\begin{tikzpicture}[x=0.75pt,y=0.75pt,yscale=-1,xscale=1]
%uncomment if require: \path (0,300); %set diagram left start at 0, and has height of 300

%Shape: Circle [id:dp5916889764018756] 
\draw  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ] (154,156.71) .. controls (154,154.66) and (155.66,153) .. (157.71,153) .. controls (159.77,153) and (161.43,154.66) .. (161.43,156.71) .. controls (161.43,158.77) and (159.77,160.43) .. (157.71,160.43) .. controls (155.66,160.43) and (154,158.77) .. (154,156.71) -- cycle ;
%Shape: Circle [id:dp46790486808185605] 
\draw  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ] (350,115.71) .. controls (350,113.66) and (351.66,112) .. (353.71,112) .. controls (355.77,112) and (357.43,113.66) .. (357.43,115.71) .. controls (357.43,117.77) and (355.77,119.43) .. (353.71,119.43) .. controls (351.66,119.43) and (350,117.77) .. (350,115.71) -- cycle ;
%Curve Lines [id:da999241019120903] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 255; green, 121; blue, 198 }  ,fill opacity=0.18 ]   (157.71,156.71) .. controls (211.67,186.71) and (313.71,145.71) .. (353.71,115.71) ;
\draw [shift={(265.41,157.45)}, rotate = 164.39] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Curve Lines [id:da6077084593527825] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 255; green, 121; blue, 198 }  ,fill opacity=0.18 ]   (157.71,156.71) .. controls (177.67,92.71) and (264.67,24.71) .. (353.71,115.71) ;
\draw [shift={(248.55,72.92)}, rotate = 168.64] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Shape: Rectangle [id:dp2181122147040886] 
\draw  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][line width=1.5]  (110.67,47) -- (400.67,47) -- (400.67,192) -- (110.67,192) -- cycle ;

% Text Node
\draw (274,152.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$g$};
% Text Node
\draw (210,57.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$f$};
% Text Node
\draw (140,153.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$a$};
% Text Node
\draw (364,108.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$b$};
% Text Node
\draw (98,22.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$X$};
% Text Node
\draw (218,107.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 255; green, 121; blue, 198 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$H([ 0,1])$};
\end{tikzpicture}
</script>

Visually, we can see that if we were to "puncture" $X$ between our paths $f$ and $g$, then the image of $H([0,1])$ (the shaded pink region) would be torn.
For instance, we can add a void with a red shaded cut-out:
<script type="text/tikz">


\tikzset{every picture/.style={line width=0.75pt}} %set default line width to 0.75pt        

\begin{tikzpicture}[x=0.75pt,y=0.75pt,yscale=-1,xscale=1]
%uncomment if require: \path (0,300); %set diagram left start at 0, and has height of 300

%Shape: Circle [id:dp5916889764018756] 
\draw  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ] (154,156.71) .. controls (154,154.66) and (155.66,153) .. (157.71,153) .. controls (159.77,153) and (161.43,154.66) .. (161.43,156.71) .. controls (161.43,158.77) and (159.77,160.43) .. (157.71,160.43) .. controls (155.66,160.43) and (154,158.77) .. (154,156.71) -- cycle ;
%Shape: Circle [id:dp46790486808185605] 
\draw  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ] (350,115.71) .. controls (350,113.66) and (351.66,112) .. (353.71,112) .. controls (355.77,112) and (357.43,113.66) .. (357.43,115.71) .. controls (357.43,117.77) and (355.77,119.43) .. (353.71,119.43) .. controls (351.66,119.43) and (350,117.77) .. (350,115.71) -- cycle ;
%Curve Lines [id:da999241019120903] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (157.71,156.71) .. controls (211.67,186.71) and (313.71,145.71) .. (353.71,115.71) ;
\draw [shift={(265.41,157.45)}, rotate = 164.39] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Curve Lines [id:da6077084593527825] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (157.71,156.71) .. controls (177.67,92.71) and (264.67,24.71) .. (353.71,115.71) ;
\draw [shift={(248.55,72.92)}, rotate = 168.64] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Shape: Rectangle [id:dp2181122147040886] 
\draw  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][line width=1.5]  (110.67,47) -- (400.67,47) -- (400.67,192) -- (110.67,192) -- cycle ;
%Shape: Circle [id:dp5952944687629388] 
\draw  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 255; green, 5; blue, 0 }  ,fill opacity=0.44 ][line width=1.5]  (245,114.5) .. controls (245,108.15) and (250.15,103) .. (256.5,103) .. controls (262.85,103) and (268,108.15) .. (268,114.5) .. controls (268,120.85) and (262.85,126) .. (256.5,126) .. controls (250.15,126) and (245,120.85) .. (245,114.5) -- cycle ;

% Text Node
\draw (274,152.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$g$};
% Text Node
\draw (210,57.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$f$};
% Text Node
\draw (140,153.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$a$};
% Text Node
\draw (364,108.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$b$};
% Text Node
\draw (98,22.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1]  {$X$};


\end{tikzpicture}
</script>
The tearing is a visual representation of the fact that no such $H$ exists for a given space.

---
All of falls under the notion of *homotopy* in topology.
This is the same idea of homotopy in *homotopy type theory*.
In this theory, we can consider types (for which there are function types) and equality between these types as paths.
I'm trying to get to a more formal understanding of this, but it's a bit of a journey.

{% end %}

{% blurb(title="Curry-Howard correspondence", date="2024-04-03", tags=["math", "metamath"], slug="curry-howard_correspondence") %}
The Curry-Howard correspondence was something I found out about too late.
In essence, it shows that mathematical proofs are equivalent to computer programs. 
Since then, I've been curious about type theory and what it means to use a theorem prover or type checker.
In particular, I want to use these tools to write formally verified software.

Curry-Howard gives us the following diagram of equivalences:

<script type="text/tikz">
\tikzset{every picture/.style={line width=0.75pt}} %set default line width to 0.75pt        
\begin{tikzpicture}[x=0.75pt,y=0.75pt,yscale=-1,xscale=1]

%Straight Lines [id:da6002193061235851] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ]   (405.14,176.14) -- (282.14,176.14) ;
\draw [shift={(280.14,176.14)}, rotate = 360] [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][line width=0.75]    (10.93,-3.29) .. controls (6.95,-1.4) and (3.31,-0.3) .. (0,0) .. controls (3.31,0.3) and (6.95,1.4) .. (10.93,3.29)   ;
\draw [shift={(407.14,176.14)}, rotate = 180] [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][line width=0.75]    (10.93,-3.29) .. controls (6.95,-1.4) and (3.31,-0.3) .. (0,0) .. controls (3.31,0.3) and (6.95,1.4) .. (10.93,3.29)   ;
%Straight Lines [id:da7254497935866558] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ]   (438.97,157.52) -- (384.31,81.76) ;
\draw [shift={(383.14,80.14)}, rotate = 54.19] [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][line width=0.75]    (10.93,-3.29) .. controls (6.95,-1.4) and (3.31,-0.3) .. (0,0) .. controls (3.31,0.3) and (6.95,1.4) .. (10.93,3.29)   ;
\draw [shift={(440.14,159.14)}, rotate = 234.19] [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][line width=0.75]    (10.93,-3.29) .. controls (6.95,-1.4) and (3.31,-0.3) .. (0,0) .. controls (3.31,0.3) and (6.95,1.4) .. (10.93,3.29)   ;
%Straight Lines [id:da7273005969982188] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ]   (265.83,82.65) -- (207.46,149.64) ;
\draw [shift={(206.14,151.14)}, rotate = 311.07] [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][line width=0.75]    (10.93,-3.29) .. controls (6.95,-1.4) and (3.31,-0.3) .. (0,0) .. controls (3.31,0.3) and (6.95,1.4) .. (10.93,3.29)   ;
\draw [shift={(267.14,81.14)}, rotate = 131.07] [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][line width=0.75]    (10.93,-3.29) .. controls (6.95,-1.4) and (3.31,-0.3) .. (0,0) .. controls (3.31,0.3) and (6.95,1.4) .. (10.93,3.29)   ;

% Text Node
\draw (274,50) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1] [align=left] {\texttt{Type Theory}};
% Text Node
\draw (126,166) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1] [align=left] {\texttt{Category Theory}};
% Text Node
\draw (424,167) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ,xscale=1.1,yscale=1.1] [align=left] {\texttt{Logic}};

\end{tikzpicture}
</script>
<!-- 
Copilot wrote the following, I wonder if this is correct?
- Propositions as Types
- Proofs as Programs
- Normalization as Computation -->
{% end %}
