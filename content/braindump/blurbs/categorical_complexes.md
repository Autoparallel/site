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
We can continue this process and have morphisms between $H_1$ and $H_2$, call it $R$.
We are building up a complex of morphisms and we can draw a diagram:
<script type="text/tikz">


\tikzset{every picture/.style={line width=0.75pt}} %set default line width to 0.75pt        

\begin{tikzpicture}[x=0.75pt,y=0.75pt,yscale=-1,xscale=1]
%uncomment if require: \path (0,316); %set diagram left start at 0, and has height of 316

%Curve Lines [id:da487146387200325] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (191,180) .. controls (221.07,249.46) and (348.78,249.18) .. (380.08,182.05) ;
\draw [shift={(381,180)}, rotate = 113.19] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Curve Lines [id:da1945322864470762] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (191,140) .. controls (221.07,70.86) and (349.76,70.17) .. (380.11,137.93) ;
\draw [shift={(381,140)}, rotate = 247.71] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Curve Lines [id:da4801088212544069] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (271.37,101.45) .. controls (258.96,104.64) and (250.73,117.08) .. (246.39,132.52) .. controls (243.99,141.04) and (242.79,150.51) .. (242.78,159.97) .. controls (242.78,160.02) and (242.78,160.07) .. (242.78,160.12) .. controls (242.78,183.51) and (249.95,207.05) .. (264.73,215.81) .. controls (266.14,216.65) and (267.62,217.34) .. (263.8,215.23)(270.63,98.55) .. controls (257.33,101.96) and (248.19,115.02) .. (243.5,131.7) .. controls (241.03,140.48) and (239.79,150.22) .. (239.78,159.97) .. controls (239.78,160.02) and (239.78,160.07) .. (239.78,160.12) .. controls (239.78,184.78) and (247.73,209.23) .. (263.2,218.39) .. controls (264.78,219.33) and (266.44,220.11) .. (262.77,218.13) ;
\draw [shift={(271,220)}, rotate = 193.94] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Curve Lines [id:da8625179344013716] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (301.37,98.55) .. controls (314.58,101.96) and (323.77,115.01) .. (328.54,131.7) .. controls (331.05,140.47) and (332.35,150.22) .. (332.4,159.96) .. controls (332.4,160.19) and (332.4,160.41) .. (332.4,160.64) .. controls (332.4,185.15) and (324.5,209.33) .. (308.88,218.41) .. controls (307.29,219.34) and (305.62,220.12) .. (309.28,218.18)(300.63,101.45) .. controls (312.96,104.64) and (321.24,117.08) .. (325.66,132.52) .. controls (328.1,141.04) and (329.35,150.51) .. (329.4,159.98) .. controls (329.4,160.2) and (329.4,160.42) .. (329.4,160.64) .. controls (329.4,183.86) and (322.29,207.14) .. (307.38,215.82) .. controls (305.95,216.65) and (304.45,217.34) .. (308.27,215.28) ;
\draw [shift={(301,220)}, rotate = 346.31] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da4100065257104788] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][line width=0.75]    (261,160) -- (308,160) (271,156) -- (271,164)(281,156) -- (281,164)(291,156) -- (291,164)(301,156) -- (301,164) ;
\draw [shift={(311,160)}, rotate = 180] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;

% Text Node
\draw (181,152.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$A$};
% Text Node
\draw (377,152.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$B$};
% Text Node
\draw (281,62.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$f_{1}$};
% Text Node
\draw (279,240.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$f_{2}$};
% Text Node
\draw (216,150.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$H_{1}$};
% Text Node
\draw (336,150.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$H_{2}$};
% Text Node
\draw (280,132.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$R$};


\end{tikzpicture}
</script>

We can think of these mappings as a means of attaching *cells* together.
In particular, there are $0$-cells given by the identity maps $\operatorname{Id}_A$ and $\operatorname{Id}_B$ which you can just picture as points located at $A$ and $B$ respectively.
The $1$-cells are the functions $f_1$ and $f_2$ which are just edges connecting the $0$-cells.
The $2$-cells are the higher order functions $H_1$ and $H_2$ which are just disks glued together at the $1$-cells.
The $3$-cells are the higher order functions $R$ which are just balls glued together at the $2$-cells.
We can explode this diagram to see this more clearly:
<script type="text/tikz">


\tikzset{every picture/.style={line width=0.75pt}} %set default line width to 0.75pt        

\begin{tikzpicture}[x=0.75pt,y=0.75pt,yscale=-1,xscale=1]
%uncomment if require: \path (0,300); %set diagram left start at 0, and has height of 300

%Straight Lines [id:da5209070161367693] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (142.44,258.26) -- (207.56,211.74) ;
\draw [shift={(210,210)}, rotate = 144.46] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
\draw [shift={(140,260)}, rotate = 324.46] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da5217858247647893] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (362.44,258.26) -- (427.56,211.74) ;
\draw [shift={(430,210)}, rotate = 144.46] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
\draw [shift={(360,260)}, rotate = 324.46] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da29027455470599506] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (140,270) -- (337,270) ;
\draw [shift={(340,270)}, rotate = 180] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da6981739734483432] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (237,200) -- (424,200) ;
\draw [shift={(427,200)}, rotate = 180] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da7727115299167708] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (249.13,258.78) -- (311.8,214.01)(250.87,261.22) -- (313.55,216.45) ;
\draw [shift={(320,210)}, rotate = 144.46] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da12157034287286872] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (129,257) -- (129,103) ;
\draw [shift={(129,100)}, rotate = 90] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
\draw [shift={(129,260)}, rotate = 270] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da3358377263590977] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (348,257) -- (348,103) ;
\draw [shift={(348,100)}, rotate = 90] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
\draw [shift={(348,260)}, rotate = 270] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da41171957328981024] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (220,100) -- (220,187) ;
\draw [shift={(220,190)}, rotate = 270] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da08848676662938271] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (220,80) -- (220,33) ;
\draw [shift={(220,30)}, rotate = 90] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da020083335181518613] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (440,187) -- (440,85.29) -- (440,33) ;
\draw [shift={(440,30)}, rotate = 90] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
\draw [shift={(440,190)}, rotate = 270] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da6638383759380284] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (290,220) -- (290,100) (286,210) -- (294,210)(286,200) -- (294,200)(286,190) -- (294,190)(286,180) -- (294,180)(286,170) -- (294,170)(286,160) -- (294,160)(286,150) -- (294,150)(286,140) -- (294,140)(286,130) -- (294,130)(286,120) -- (294,120)(286,110) -- (294,110) ;
%Straight Lines [id:da35789723416170105] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (290,80) -- (290,63) (286,70) -- (294,70) ;
\draw [shift={(290,60)}, rotate = 90] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da4774146354604789] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (140.44,78.26) -- (205.56,31.74) ;
\draw [shift={(208,30)}, rotate = 144.46] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
\draw [shift={(138,80)}, rotate = 324.46] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da23636599923091772] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (361.45,78.27) -- (427.55,31.73) ;
\draw [shift={(430,30)}, rotate = 144.85] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
\draw [shift={(359,80)}, rotate = 324.85] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da05423203638866059] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (138,90) -- (335,90) ;
\draw [shift={(338,90)}, rotate = 180] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da8615657007027591] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (230,20) -- (427,20) ;
\draw [shift={(430,20)}, rotate = 180] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;
%Straight Lines [id:da5989940502812725] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (248.13,78.78) -- (310.8,34.01)(249.87,81.22) -- (312.55,36.45) ;
\draw [shift={(319,30)}, rotate = 144.46] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (10.72,-5.15) -- (0,0) -- (10.72,5.15) -- (7.12,0) -- cycle    ;

% Text Node
\draw (211,192.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$A$};
% Text Node
\draw (121,262.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$A$};
% Text Node
\draw (342,262.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$B$};
% Text Node
\draw (434,192.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$B$};
% Text Node
\draw (212,12.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$A$};
% Text Node
\draw (121,82.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$A$};
% Text Node
\draw (343,82.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$B$};
% Text Node
\draw (435,12.4) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$B$};


\end{tikzpicture}
</script>
We have duplicated $A$ and $B$, but we did so by having identity mappings be the arrows between them, which means these are all actually collapsed to a point. 
I told you this was the exploded view!
The single arrows form a 2-dimensional square on all six sides of this cubical diagram. 
Finally, the 3-cell is the hashed arrow (the $R$ morphism that mapped $H_1$ to $H_2$) which gives this cube a 3-dimensional volume.

What's beautiful about this is that we can think of this as a topological space and moreover start to study categories, or categories of categories, as topological spaces.
This is conceptually the idea behind the [Grothendieck topology](https://en.wikipedia.org/wiki/Grothendieck_topology).
Something I would dearly love to be able to construct in Lean 4 or in Rust (or possibly Haskell), to some extent.