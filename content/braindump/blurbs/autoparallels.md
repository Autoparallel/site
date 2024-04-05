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

We usually draw pictures of curves $c$ on a manifold $M$ to illustrate the concept:
<script type="text/tikz">


\tikzset{every picture/.style={line width=0.75pt}} %set default line width to 0.75pt        

\begin{tikzpicture}[x=0.75pt,y=0.75pt,yscale=-1,xscale=1]
%uncomment if require: \path (0,300); %set diagram left start at 0, and has height of 300

%Curve Lines [id:da5877276634683528] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (61.93,266.88) .. controls (123.27,-35.79) and (452.6,-76.45) .. (553.27,257.55) ;
%Curve Lines [id:da2871322923868289] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (61.93,266.88) .. controls (135.27,203.55) and (279.27,168.21) .. (359.93,263.55) ;
%Curve Lines [id:da13778808899040507] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (359.93,263.55) .. controls (459.93,194.21) and (503.27,169.55) .. (553.27,257.55) ;
%Curve Lines [id:da4993834209113175] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (174.6,166.88) .. controls (188.05,149.06) and (202.28,131.84) .. (218.02,117.02) .. controls (234.36,101.64) and (252.33,88.83) .. (272.76,80.61) .. controls (292.03,72.86) and (313.49,69.17) .. (337.85,71.25) .. controls (357.81,72.95) and (379.71,78.52) .. (403.93,88.88) ;
\draw [shift={(403.93,88.88)}, rotate = 23.16] [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.75]      (0, 0) circle [x radius= 3.35, y radius= 3.35]   ;
\draw [shift={(198.71,137.08)}, rotate = 130.97] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
\draw [shift={(247.98,93.42)}, rotate = 146.56] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
\draw [shift={(309.97,71.41)}, rotate = 172.94] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
\draw [shift={(376.63,78.89)}, rotate = 196] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
\draw [shift={(174.6,166.88)}, rotate = 307.05] [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.75]      (0, 0) circle [x radius= 3.35, y radius= 3.35]   ;

% Text Node
\draw (176,23.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$M$};
% Text Node
\draw (332,47.73) node [anchor=north west][inner sep=0.75pt]  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$c$};


\end{tikzpicture}
</script>

We also draw pictures of fields $V$ on manifolds like this:
<script type="text/tikz">


\tikzset{every picture/.style={line width=0.75pt}} %set default line width to 0.75pt        

\begin{tikzpicture}[x=0.75pt,y=0.75pt,yscale=-1,xscale=1]
%uncomment if require: \path (0,264); %set diagram left start at 0, and has height of 264

%Curve Lines [id:da37265471149613094] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (81.93,253.99) .. controls (143.27,-48.67) and (472.6,-89.34) .. (573.27,244.66) ;
%Curve Lines [id:da667436362285124] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (81.93,253.99) .. controls (155.27,190.66) and (299.27,155.33) .. (379.93,250.66) ;
%Curve Lines [id:da29436597175796275] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (379.93,250.66) .. controls (479.93,181.33) and (523.27,156.66) .. (573.27,244.66) ;
%Straight Lines [id:da43653321929974087] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (116,201) -- (132.83,173.18) ;
\draw [shift={(134.39,170.61)}, rotate = 121.18] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Curve Lines [id:da8583776588196839] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (81.93,253.99) .. controls (143.27,-48.67) and (472.6,-89.34) .. (573.27,244.66) ;
%Curve Lines [id:da9960892324565658] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (81.93,253.99) .. controls (155.27,190.66) and (299.27,155.33) .. (379.93,250.66) ;
%Curve Lines [id:da9484488775716384] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (379.93,250.66) .. controls (479.93,181.33) and (523.27,156.66) .. (573.27,244.66) ;
%Straight Lines [id:da4541696089202709] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (171,184) -- (183.71,165.1) ;
\draw [shift={(185.39,162.61)}, rotate = 123.93] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da3093153306207266] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (145,193) -- (159.03,165.29) ;
\draw [shift={(160.39,162.61)}, rotate = 116.86] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da9496635885209419] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (308,176) -- (320.71,157.1) ;
\draw [shift={(322.39,154.61)}, rotate = 123.93] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da29190568444839937] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (259,171) -- (271.71,152.1) ;
\draw [shift={(273.39,149.61)}, rotate = 123.93] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da602085440092837] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (231,174) -- (243.71,155.1) ;
\draw [shift={(245.39,152.61)}, rotate = 123.93] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da21940366293797986] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (138,154) -- (154.83,126.18) ;
\draw [shift={(156.39,123.61)}, rotate = 121.18] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da5804154308226659] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (191,145) -- (220.36,112.83) ;
\draw [shift={(222.39,110.61)}, rotate = 132.39] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da5222019371885485] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (166,147) -- (182.94,116.24) ;
\draw [shift={(184.39,113.61)}, rotate = 118.84] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da964620578932758] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (272,129) -- (296.18,106.65) ;
\draw [shift={(298.39,104.61)}, rotate = 137.26] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da9478760370809731] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (242,135) -- (273,111.43) ;
\draw [shift={(275.39,109.61)}, rotate = 142.75] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da396991775356782] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (214,141) -- (249.18,108.65) ;
\draw [shift={(251.39,106.61)}, rotate = 137.39] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da7660199839926967] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (173,107) -- (193.61,79.03) ;
\draw [shift={(195.39,76.61)}, rotate = 126.38] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da7137539655722] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (231,95) -- (253.43,68.89) ;
\draw [shift={(255.39,66.61)}, rotate = 130.67] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da3413237509115701] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (204,102) -- (222.41,80.88) ;
\draw [shift={(224.39,78.61)}, rotate = 131.08] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da9793154128937043] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (312,81) -- (335.84,66.2) ;
\draw [shift={(338.39,64.61)}, rotate = 148.16] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da9224150488001197] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (282,86) -- (307.06,65.51) ;
\draw [shift={(309.39,63.61)}, rotate = 140.74] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da39642422828736645] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (256,89) -- (275.41,66.87) ;
\draw [shift={(277.39,64.61)}, rotate = 131.25] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da9031465754386621] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (284,171) -- (296.71,152.1) ;
\draw [shift={(298.39,149.61)}, rotate = 123.93] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da9045953693285176] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (335,185) -- (353.46,162.92) ;
\draw [shift={(355.39,160.61)}, rotate = 129.89] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da834533313763892] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (305,141) -- (326.17,121.64) ;
\draw [shift={(328.39,119.61)}, rotate = 137.56] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da418897670250884] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (201,175) -- (211.82,158.91) -- (213.71,156.1) ;
\draw [shift={(215.39,153.61)}, rotate = 123.93] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da3146961843898137] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (376,150) -- (401.57,140.65) ;
\draw [shift={(404.39,139.61)}, rotate = 159.9] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da892534360198973] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (356,194) -- (376.22,174.69) ;
\draw [shift={(378.39,172.61)}, rotate = 136.31] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da561534162957767] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (338,150) -- (356.1,134.56) ;
\draw [shift={(358.39,132.61)}, rotate = 139.54] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da421919016316195] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (376,127) -- (400.39,126.66) ;
\draw [shift={(403.39,126.61)}, rotate = 179.19] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da6963553808281575] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (364,211) -- (394.16,183.63) ;
\draw [shift={(396.39,181.61)}, rotate = 137.78] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da6550202937391782] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (452,164) -- (456.74,142.54) ;
\draw [shift={(457.39,139.61)}, rotate = 102.45] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da695353586185858] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (428,171) -- (439.15,146.35) ;
\draw [shift={(440.39,143.61)}, rotate = 114.34] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da1141148845698674] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (400,169) -- (415.74,145.12) ;
\draw [shift={(417.39,142.61)}, rotate = 123.38] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da6780788114026721] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (301,118) -- (325.81,103.15) ;
\draw [shift={(328.39,101.61)}, rotate = 149.11] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da287632391407348] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (375,104) -- (399.47,109.91) ;
\draw [shift={(402.39,110.61)}, rotate = 193.58] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da4224533476249337] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (338,105) -- (356.55,98.59) ;
\draw [shift={(359.39,97.61)}, rotate = 160.95] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da356174408766591] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (440,91) -- (441.21,111.62) ;
\draw [shift={(441.39,114.61)}, rotate = 266.64] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da4287199204760894] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (412,95) -- (423.57,110.23) ;
\draw [shift={(425.39,112.61)}, rotate = 232.77] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da7982436393922598] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (343,117) -- (360.39,116.67) ;
\draw [shift={(363.39,116.61)}, rotate = 178.92] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da9817729368004351] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (216,68) -- (238.51,39.95) ;
\draw [shift={(240.39,37.61)}, rotate = 128.75] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da6237978599773624] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (278,47) -- (303.3,20.77) ;
\draw [shift={(305.39,18.61)}, rotate = 133.97] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da5546865356656272] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (250,56) -- (272.43,29.89) ;
\draw [shift={(274.39,27.61)}, rotate = 130.67] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da4773656616352142] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (360,41) -- (387.71,26.97) ;
\draw [shift={(390.39,25.61)}, rotate = 153.15] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da07750307214890872] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (332,41) -- (356.94,23.35) ;
\draw [shift={(359.39,21.61)}, rotate = 144.71] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da8218774476647794] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (304,44) -- (335,20.43) ;
\draw [shift={(337.39,18.61)}, rotate = 142.75] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da17177270040659076] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (338,78) -- (362.65,66.85) ;
\draw [shift={(365.39,65.61)}, rotate = 155.66] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da4837036537671586] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (399,61) -- (416.89,72.95) ;
\draw [shift={(419.39,74.61)}, rotate = 213.74] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da316054821373847] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (371,70) -- (395.4,72.33) ;
\draw [shift={(398.39,72.61)}, rotate = 185.45] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da6097774850324045] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (429,60) -- (434.54,78.74) ;
\draw [shift={(435.39,81.61)}, rotate = 253.54] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da6528631069475299] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (472.39,96.61) -- (463.84,111.99) ;
\draw [shift={(462.39,114.61)}, rotate = 299.05] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da6499620397789678] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (495,114) -- (474.03,125.2) ;
\draw [shift={(471.39,126.61)}, rotate = 331.89] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da5157836148365185] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (486,158) -- (471.28,139.94) ;
\draw [shift={(469.39,137.61)}, rotate = 50.82] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da142128111734243] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (508,157) -- (491.46,139.78) ;
\draw [shift={(489.39,137.61)}, rotate = 46.16] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da31303110821056124] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (373,229) -- (404.91,207.3) ;
\draw [shift={(407.39,205.61)}, rotate = 145.78] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da2668981058505884] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (417,207) -- (432.49,187.94) ;
\draw [shift={(434.39,185.61)}, rotate = 129.11] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da20986506608732336] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (455,190) -- (469.39,173.85) ;
\draw [shift={(471.39,171.61)}, rotate = 131.71] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da4808559898884184] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (488,179) -- (494.95,166.25) ;
\draw [shift={(496.39,163.61)}, rotate = 118.59] [fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;

% Text Node
\draw (196,10.51) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$M$};
% Text Node
\draw (196,10.51) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$M$};


\end{tikzpicture}
</script>

**What is the intuition?**
Autoparallel fields are, in a way, the lowest energy configurations of a system.
If we take a step back and look at the autoparallel equation where $V=\dot{c}$ is the tangent vector field to a particle following a curve $c$, it can be unraveled into Newton's first law (and you can generalize to get Newton's second law). 
By the way $\dot{c}$ is the velocity of the particle.

So, autoparallel $c$ moves at constant velocity as it is not being acted on by an external force.
Autoparallel fields are those that do not accelerate or decelerate in the direction of the field itself, i.e., they have no force acting on them -- hence they are in a low energy configuration.
Further, the only reason an autoparallel curve $c$ (or field $V$) may appear to bend, twist, or lengthen, is purely due to the curvature of the space it is living in.

**Example (flat space):** If we take the case where we have a curve $c$ whose on a flat manifold such as the plane $\R^2$, then I claim $\nabla_{\dot{c}}\dot{c} = 0$ is $c$ moving at a constant velocity -- so it does not have rotational acceleration (i.e., it does not twist or turn and there is no torque applied) and it also does not have linear acceleration (i.e., it does not start to move more quickly or slow down).

Below  is an example of a curve that is not autoparallel:
<script type="text/tikz">


\tikzset{every picture/.style={line width=0.75pt}} %set default line width to 0.75pt        

\begin{tikzpicture}[x=0.75pt,y=0.75pt,yscale=-1,xscale=1]
%uncomment if require: \path (0,300); %set diagram left start at 0, and has height of 300

%Shape: Rectangle [id:dp7796951244542056] 
\draw  [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ] (128.31,45.01) -- (468.31,45.01) -- (468.31,275.01) -- (128.31,275.01) -- cycle ;
%Curve Lines [id:da2108719958305516] 
\draw [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ]   (145,257) .. controls (165.68,185.42) and (194.45,140.92) .. (226.85,117.11) .. controls (299.91,63.43) and (391.42,114.88) .. (450.31,198.01) ;
\draw [shift={(450.31,198.01)}, rotate = 54.69] [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.75]      (0, 0) circle [x radius= 3.35, y radius= 3.35]   ;
\draw [shift={(145,257)}, rotate = 286.11] [color={rgb, 255:red, 107; green, 201; blue, 223 }  ,draw opacity=1 ][fill={rgb, 255:red, 107; green, 201; blue, 223 }  ,fill opacity=1 ][line width=0.75]      (0, 0) circle [x radius= 3.35, y radius= 3.35]   ;
%Straight Lines [id:da014165255942037769] 
\draw [color={rgb, 255:red, 255; green, 121; blue, 198 }  ,draw opacity=1 ]   (248,105) -- (309.67,71.45) ;
\draw [shift={(312.31,70.01)}, rotate = 151.45] [fill={rgb, 255:red, 255; green, 121; blue, 198 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da03298498203836275] 
\draw [color={rgb, 255:red, 189; green, 147; blue, 249 }  ,draw opacity=1 ]   (248,105) -- (262.88,132.38) ;
\draw [shift={(264.31,135.01)}, rotate = 241.48] [fill={rgb, 255:red, 189; green, 147; blue, 249 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;
%Straight Lines [id:da2875620705256876] 
\draw [color={rgb, 255:red, 255; green, 121; blue, 198 }  ,draw opacity=1 ]   (319,98) -- (363.09,108.33) ;
\draw [shift={(366.01,109.01)}, rotate = 193.19] [fill={rgb, 255:red, 255; green, 121; blue, 198 }  ,fill opacity=1 ][line width=0.08]  [draw opacity=0] (8.93,-4.29) -- (0,0) -- (8.93,4.29) -- cycle    ;

% Text Node
\draw (129,15.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$M$};
% Text Node
\draw (401,116.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 107; green, 201; blue, 223 }  ,opacity=1 ]  {$c$};
% Text Node
\draw (260,53.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 255; green, 121; blue, 198 }  ,opacity=1 ]  {$\dot{c}( t)$};
% Text Node
\draw (237,139.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 189; green, 147; blue, 249 }  ,opacity=1 ]  {$\nabla _{\dot{c}}\dot{c}( t)$};
% Text Node
\draw (351,77.4) node [anchor=north west][inner sep=0.75pt]  [font=\large,color={rgb, 255:red, 255; green, 121; blue, 198 }  ,opacity=1 ]  {$\dot{c}( t')$};


\end{tikzpicture}
</script>
Notice, due to the bend in the curve, the direction of $\dot{c}$ has to change from point to point. For example, from $\dot{c}(t)$ to $\dot{c}(t')$ there is a change in direction. 
You can think of this change in direction is due to the force applied to the curve $c$, and this force just so happens to be $\nabla_{\dot{c}}\dot{c}$.
If we add up the $\nabla_{\dot{c}}\dot{c}$ at each point in time $t$ to $t'$, we will end up with the new velocity $\dot{c}(t')$.
Furthermore, if we add the magnitude of $\nabla_{\dot{c}}\dot{c}$ at every point along the curve, we get a sort of "tension" energy, which is the energy of the configuration of the curve $c$ (or field) I mentioned earlier.
This can, at the least, be zero. 
Hence, autoparallels are the lowest energy configurations of a system.


---

You can do this all much more generally, you could also take a [multivector field](https://en.wikipedia.org/wiki/Multivector) (and therefore [spinor field](https://en.wikipedia.org/wiki/Spinor)) $F$ and claim it is parallel along $V$ if:
$$
\nabla_{V}F = 0.
$$
This is useful if you need to be able to transport multivectors along a manifold.
I used this technique to be able to define *subsurface spinor fields* in some of my personal work.