+++
title = "Curry-Howard Correspondence"
date = "2024-04-03"
[extra]
tags = ["math", "metamath"]
+++

The Curry-Howard correspondence was something I found out about too late.
In essence, it shows that mathematical proofs are equivalent to computer programs. 
Since then, I've been curious about type theory and what it means to use a theorem prover or type checker.
In particular, I want to use these tools to write formally verified software.

Curry-Howard gives us the following diagram of equivalences:

{<script type="text/tikz">}
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
