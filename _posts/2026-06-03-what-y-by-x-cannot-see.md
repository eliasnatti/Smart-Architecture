---
layout: post
title: "What Y-by-X Cannot See"
date: 2026-06-03 09:00:00
description: "Plücker coordinates as a second-tier tool for the structure Y-by-X is built to miss."
tags: geometry semiconductors plucker process-engineering
categories: motivation
giscus_comments: false
related_posts: false
---

The standard first-pass on any process investigation in a fab is the same in every fab: Y-by-X. Take the output you care about — yield, $V_t$, critical dimension, edge-die failure rate — and plot it against every input parameter you have. Sort the result by R² or by p-value. The top of the pareto tells you which knobs to investigate.

Y-by-X is what every fab does and has done for decades. It catches single-knob effects fast and is the entry point for almost every process investigation. This post takes it as the starting point — what it surfaces, and what it cannot.

This is about what Y-by-X is *built* to miss, why what it misses is exactly the structure I argued for in [the previous post]({{ '/blog/2026/flag-manifolds-in-the-fab/' | relative_url }}), and what a working second-tier pass looks like.

## The marginal blind spot

Y-by-X is a marginal view. Each X is examined against Y on its own. A scatter plot of $X_1$ vs. $Y$ projects away every other dimension; a scatter of $X_2$ vs. $Y$ does the same. If the causal signal lives entirely in one knob, this works. If the causal signal lives in a *combination* of knobs, the marginal projections can be empty even when the joint structure is sharp.

<figure markdown="0" style="margin: 1.5rem 0;">
<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; max-width:720px;">
  <style>
    .axis { stroke: var(--global-text-color, #333); stroke-width: 1; fill: none; }
    .grid { stroke: var(--global-divider-color, #ccc); stroke-width: 0.5; fill: none; }
    .dot  { fill: var(--global-text-color, #333); opacity: 0.55; }
    .hot  { fill: var(--global-theme-color, #b509ac); opacity: 0.9; }
    .lbl  { fill: var(--global-text-color, #333); font: 12px sans-serif; }
    .cap  { fill: var(--global-text-color-light, #888); font: 11px sans-serif; font-style: italic; }
  </style>
  <g transform="translate(20,20)">
    <text class="lbl" x="100" y="14" text-anchor="middle">X₁ vs Y</text>
    <rect x="20" y="24" width="160" height="140" class="grid"/>
    <line x1="20" y1="164" x2="180" y2="164" class="axis"/>
    <line x1="20" y1="24"  x2="20"  y2="164" class="axis"/>
    <circle class="dot" cx="35"  cy="92"  r="3"/>
    <circle class="dot" cx="52"  cy="135" r="3"/>
    <circle class="dot" cx="71"  cy="60"  r="3"/>
    <circle class="dot" cx="88"  cy="118" r="3"/>
    <circle class="dot" cx="103" cy="78"  r="3"/>
    <circle class="dot" cx="121" cy="145" r="3"/>
    <circle class="dot" cx="139" cy="55"  r="3"/>
    <circle class="dot" cx="156" cy="108" r="3"/>
    <circle class="dot" cx="168" cy="42"  r="3"/>
    <text class="cap" x="100" y="190" text-anchor="middle">no marginal trend</text>
  </g>
  <g transform="translate(260,20)">
    <text class="lbl" x="100" y="14" text-anchor="middle">X₂ vs Y</text>
    <rect x="20" y="24" width="160" height="140" class="grid"/>
    <line x1="20" y1="164" x2="180" y2="164" class="axis"/>
    <line x1="20" y1="24"  x2="20"  y2="164" class="axis"/>
    <circle class="dot" cx="33"  cy="111" r="3"/>
    <circle class="dot" cx="49"  cy="58"  r="3"/>
    <circle class="dot" cx="68"  cy="142" r="3"/>
    <circle class="dot" cx="86"  cy="73"  r="3"/>
    <circle class="dot" cx="104" cy="125" r="3"/>
    <circle class="dot" cx="122" cy="64"  r="3"/>
    <circle class="dot" cx="139" cy="148" r="3"/>
    <circle class="dot" cx="156" cy="89"  r="3"/>
    <circle class="dot" cx="170" cy="40"  r="3"/>
    <text class="cap" x="100" y="190" text-anchor="middle">no marginal trend</text>
  </g>
  <g transform="translate(500,20)">
    <text class="lbl" x="100" y="14" text-anchor="middle">X₁ × X₂ joint</text>
    <rect x="20" y="24" width="160" height="140" class="grid"/>
    <line x1="20" y1="164" x2="180" y2="164" class="axis"/>
    <line x1="20" y1="24"  x2="20"  y2="164" class="axis"/>
    <circle class="dot" cx="40"  cy="40"  r="2.5"/>
    <circle class="dot" cx="60"  cy="55"  r="2.5"/>
    <circle class="dot" cx="155" cy="148" r="2.5"/>
    <circle class="dot" cx="140" cy="140" r="2.5"/>
    <circle class="dot" cx="45"  cy="90"  r="2.5"/>
    <circle class="dot" cx="150" cy="65"  r="2.5"/>
    <circle class="dot" cx="170" cy="100" r="2.5"/>
    <circle class="dot" cx="35"  cy="135" r="2.5"/>
    <circle class="hot" cx="40"  cy="150" r="3.5"/>
    <circle class="hot" cx="58"  cy="132" r="3.5"/>
    <circle class="hot" cx="76"  cy="115" r="3.5"/>
    <circle class="hot" cx="94"  cy="98"  r="3.5"/>
    <circle class="hot" cx="112" cy="80"  r="3.5"/>
    <circle class="hot" cx="130" cy="63"  r="3.5"/>
    <circle class="hot" cx="148" cy="46"  r="3.5"/>
    <circle class="hot" cx="166" cy="30"  r="3.5"/>
    <text class="cap" x="100" y="190" text-anchor="middle">sharp diagonal ridge</text>
  </g>
</svg>
<figcaption style="font-size:0.85rem; color:var(--global-text-color-light); text-align:center; margin-top:0.5rem;">
  Highlighted points are runs where Y is high. The signal is invisible in either marginal — it lives in the joint.
</figcaption>
</figure>

Process engineers know this happens. The word for it is *interaction*, and design-of-experiments was built in part to catch it. But the universal first-pass screening tool — the Y-by-X pareto — is not built to. The pareto tells you which knobs *individually* correlate with Y. It is structurally silent on the question of which *subspaces* of the knob space correlate with Y. A two-parameter ridge can produce a pristine Y-by-X pareto where nothing flags, and a beautiful clean joint structure that you only find if you go looking.

This is the same blindness the previous post argued machine learning models inherit when they treat process inputs as a flat embedding. The fab's viability region is shaped — it is a flag, with nested viable subspaces — and any analysis that treats parameters one axis at a time projects that shape away.

## Freeze, bucket, slice

The full process flow has dozens of parameters. Y-by-X surfaces five or ten with reasonable signal. The other sixty-plus are quiet at first pass. To investigate joint structure in the surfaced parameters, the noise from the quiet ones has to be controlled.

The standard practical move is to freeze the quiet parameters at nominal, or bucket them into two or three coarse levels and stratify the analysis within each level. This is not a new idea — it is what process engineers do already during process window qualification. In the flag-manifold language of the previous post, freezing or bucketing is taking a *slice* through the flag: you fix the configuration at every stage you are not currently investigating, and you study the remaining viable region as a lower-dimensional flag.

This step is the bridge. It reduces the problem from "what is the joint structure of 72 parameters" to "what is the joint structure of these five we surfaced, given the rest are held at nominal." That smaller problem is the one the second tier is for.

## What Plücker coordinates encode

Here is the move. Inside the slice, the parameters that matter span some subspace of the local process space. You can characterize that subspace by listing the parameters and their pairwise correlations — which is what most analyses do — or you can characterize it by the geometry of the subspace itself, independent of how the parameters are labeled. The latter is what Plücker coordinates give you.

The intuition is short. A two-dimensional plane in three-dimensional space can be described by a single triple of numbers: the components of any normal vector to the plane. Two planes with the same normal-vector triple (up to sign and scale) are the same plane, no matter how you chose to draw the basis vectors that span them. The triple encodes the *plane*, not the *basis*.

Plücker coordinates generalize this. A $k$-dimensional subspace of $n$-dimensional space is described by $\binom{n}{k}$ numbers — its Plücker coordinates — that depend only on the subspace itself. A 2-plane in 4-space has 6 of them. A 3-flat in 7-space has 35. Any two bases that span the same subspace produce the same Plücker coordinates, up to overall scale.

<figure markdown="0" style="margin: 1.5rem 0;">
<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; max-width:720px;">
  <style>
    .face { fill: var(--global-theme-color, #b509ac); fill-opacity: 0.10; stroke: var(--global-theme-color, #b509ac); stroke-width: 1.2; }
    .arr  { stroke: var(--global-text-color, #333); stroke-width: 1.8; fill: none; marker-end: url(#arrowhead); }
    .arr2 { stroke: var(--global-theme-color, #b509ac); stroke-width: 1.8; fill: none; marker-end: url(#arrowhead2); }
    .lbl  { fill: var(--global-text-color, #333); font: 13px sans-serif; }
    .cap  { fill: var(--global-text-color-light, #888); font: 12px sans-serif; font-style: italic; text-anchor: middle; }
    .pluck { fill: var(--global-text-color, #333); font: 12px monospace; text-anchor: middle; }
  </style>
  <defs>
    <marker id="arrowhead"  viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--global-text-color, #333)"/>
    </marker>
    <marker id="arrowhead2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--global-theme-color, #b509ac)"/>
    </marker>
  </defs>
  <g transform="translate(40,30)">
    <text class="cap" x="140" y="0">basis A</text>
    <polygon points="40,140 220,130 240,50 60,60" class="face"/>
    <line class="arr" x1="120" y1="100" x2="200" y2="92"/>
    <text class="lbl" x="207" y="92">e₁</text>
    <line class="arr" x1="120" y1="100" x2="135" y2="55"/>
    <text class="lbl" x="138" y="50">e₂</text>
    <circle cx="120" cy="100" r="2.5" fill="var(--global-text-color, #333)"/>
  </g>
  <g transform="translate(400,30)">
    <text class="cap" x="140" y="0">basis B</text>
    <polygon points="40,140 220,130 240,50 60,60" class="face"/>
    <line class="arr2" x1="120" y1="100" x2="195" y2="62"/>
    <text class="lbl" x="200" y="60" fill="var(--global-theme-color, #b509ac)">e′₁</text>
    <line class="arr2" x1="120" y1="100" x2="170" y2="125"/>
    <text class="lbl" x="178" y="130" fill="var(--global-theme-color, #b509ac)">e′₂</text>
    <circle cx="120" cy="100" r="2.5" fill="var(--global-text-color, #333)"/>
  </g>
  <text class="pluck" x="360" y="225">Plücker coordinates: ( p₁₂ , p₁₃ , p₂₃ , p₁₄ , p₂₄ , p₃₄ ) — the same for both</text>
</svg>
<figcaption style="font-size:0.85rem; color:var(--global-text-color-light); text-align:center; margin-top:0.5rem;">
  Same subspace, two different choices of basis. The Plücker coordinates strip out the basis and label the subspace itself.
</figcaption>
</figure>

This invariance is the entire point. In a fab, the labels on the parameter axes are conventions — a recipe variable is "RF power," "gas flow," "chamber pressure" because that is how the tool exposes them. The physics does not know about those labels. Two operating regions that look completely different at the parameter level can be operating on the same underlying causal subspace, and a coordinate that depends on the parameter labels will tell you the regions are different. A coordinate that depends only on the subspace will tell you they are the same.

## What the pairing buys you

Pair the two passes and you can ask three questions Y-by-X structurally cannot:

**Are two operating points causally equivalent?** Two recipes that look different parameter-by-parameter can produce the same Plücker signature, meaning they are operating on the same effective causal subspace. The fab-floor version: "we changed three knobs but yield is the same." Plücker coordinates tell you whether you changed the underlying regime or just moved around inside it.

**Is the process drifting *in subspace*?** A process can produce in-spec runs day after day while the subspace that defines viability slowly rotates. Every individual SPC chart looks fine. The Plücker signature of the viable subspace, tracked over time, can expose rotation invisible to per-parameter SPC.

**Which parameter interactions are real?** Y-by-X can flag a candidate two-knob interaction; running the Plücker analysis on that pair (with the rest of the surfaced parameters in the slice) tells you whether the two knobs are spanning a real subspace of the viable region or whether the apparent interaction is an artifact of how the parameters are individually parameterized.

The first pass is doing the work of pruning sixty knobs down to a handful. The second pass takes that handful and asks the question the first pass — by construction, projecting one axis at a time — cannot. Whether the first pass itself is the right one for this purpose is a question for a later post; for now, take it as given.

## Sweeping the frozen axis

Freezing an axis to investigate a single slice is a one-shot move. The harder question — the one that gets at genuinely nonlinear structure — is what happens when you *un*freeze that axis and sweep it through its range, watching the Plücker signature of the surfaced subspace as you go.

If the Plücker coordinates stay roughly constant across the sweep, the two-knob interaction you measured does not depend on the swept axis. It is a real second-order effect. The frozen axis is independent of it.

If the Plücker coordinates change as you sweep, the swept axis is *modulating* the interaction. This is a third-order effect by construction — a two-knob interaction whose strength or geometry is a function of a third knob — and the shape of the modulation is in how the Plücker coordinates bend along the sweep.

The clearest cases are the ones where the relationship between two knobs does not just weaken or strengthen as you sweep the third — it *changes sign*. At low values of the swept axis the two knobs are positively correlated; somewhere in the middle the correlation passes through zero; at high values the same two knobs are negatively correlated. The Plücker signature is encoding a 2D plane that rotates as you move through the 3D sweep space.

<figure markdown="0" style="margin: 1.5rem 0;">
<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; max-width:720px;">
  <style>
    .x3axis { stroke: var(--global-text-color, #333); stroke-width: 1.6; fill: none; marker-end: url(#x3arr); }
    .tickln { stroke: var(--global-text-color, #333); stroke-width: 1.4; fill: none; }
    .face   { fill: var(--global-theme-color, #b509ac); fill-opacity: 0.07; stroke: var(--global-divider-color, #999); stroke-width: 0.9; }
    .pax    { stroke: var(--global-text-color, #333); stroke-width: 0.9; fill: none; opacity: 0.7; }
    .dot    { fill: var(--global-text-color, #333); opacity: 0.6; }
    .fit    { stroke: var(--global-theme-color, #b509ac); stroke-width: 2; fill: none; }
    .lbl    { fill: var(--global-text-color, #333); font: 12px sans-serif; }
    .small  { fill: var(--global-text-color, #333); font: 10px sans-serif; }
    .tlbl   { fill: var(--global-text-color, #333); font: 11px sans-serif; font-weight: 600; text-anchor: middle; }
    .cap    { fill: var(--global-text-color-light, #888); font: 11px sans-serif; font-style: italic; text-anchor: middle; }
  </style>
  <defs>
    <marker id="x3arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--global-text-color, #333)"/>
    </marker>
  </defs>

  <!-- X3 axis: diagonal line going up-right -->
  <line class="x3axis" x1="40" y1="374" x2="610" y2="160"/>
  <text class="lbl" x="625" y="158">X₃</text>

  <!-- ===== Plane 1: X3 = low (positive slope) ===== -->
  <!-- Anchor (BL of plane) on X3 axis at (115, 333) -->
  <g>
    <!-- tick mark on X3 axis -->
    <circle cx="115" cy="333" r="3" fill="var(--global-text-color, #333)"/>
    <text class="tlbl" x="115" y="358">X₃ = low</text>
    <!-- plane parallelogram: BL=(115,333) BR=(245,333) TR=(257,228) TL=(127,228) -->
    <polygon class="face" points="115,333 245,333 257,228 127,228"/>
    <!-- in-plane X1 axis (along bottom) and Y axis (along left edge) -->
    <line class="pax" x1="115" y1="333" x2="245" y2="333"/>
    <line class="pax" x1="115" y1="333" x2="127" y2="228"/>
    <text class="small" x="248" y="337">X₁</text>
    <text class="small" x="118" y="222">Y</text>
    <!-- regression line going BL to TR (positive slope inside the plane) -->
    <line class="fit" x1="122" y1="328" x2="250" y2="233"/>
    <!-- scatter dots along positive correlation -->
    <circle class="dot" cx="129" cy="322" r="2.6"/>
    <circle class="dot" cx="137" cy="312" r="2.6"/>
    <circle class="dot" cx="151" cy="307" r="2.6"/>
    <circle class="dot" cx="165" cy="291" r="2.6"/>
    <circle class="dot" cx="180" cy="281" r="2.6"/>
    <circle class="dot" cx="193" cy="275" r="2.6"/>
    <circle class="dot" cx="208" cy="259" r="2.6"/>
    <circle class="dot" cx="222" cy="251" r="2.6"/>
    <circle class="dot" cx="236" cy="244" r="2.6"/>
    <text class="cap" x="186" y="220">positive correlation</text>
  </g>

  <!-- ===== Plane 2: X3 = threshold (flat) ===== -->
  <!-- Anchor (BL) at (322, 257) -->
  <g>
    <circle cx="322" cy="257" r="3" fill="var(--global-text-color, #333)"/>
    <text class="tlbl" x="322" y="282">X₃ = threshold</text>
    <!-- plane parallelogram: BL=(322,257) BR=(452,257) TR=(464,152) TL=(334,152) -->
    <polygon class="face" points="322,257 452,257 464,152 334,152"/>
    <line class="pax" x1="322" y1="257" x2="452" y2="257"/>
    <line class="pax" x1="322" y1="257" x2="334" y2="152"/>
    <text class="small" x="455" y="261">X₁</text>
    <text class="small" x="325" y="146">Y</text>
    <!-- regression line: horizontal at mid-plane -->
    <line class="fit" x1="333" y1="204" x2="451" y2="204"/>
    <!-- scatter dots: no trend -->
    <circle class="dot" cx="340" cy="210" r="2.6"/>
    <circle class="dot" cx="355" cy="199" r="2.6"/>
    <circle class="dot" cx="367" cy="204" r="2.6"/>
    <circle class="dot" cx="379" cy="215" r="2.6"/>
    <circle class="dot" cx="394" cy="194" r="2.6"/>
    <circle class="dot" cx="405" cy="210" r="2.6"/>
    <circle class="dot" cx="420" cy="199" r="2.6"/>
    <circle class="dot" cx="432" cy="204" r="2.6"/>
    <circle class="dot" cx="446" cy="208" r="2.6"/>
    <text class="cap" x="393" y="144">flat</text>
  </g>

  <!-- ===== Plane 3: X3 = high (negative slope) ===== -->
  <!-- Anchor (BL) at (529, 182) -->
  <g>
    <circle cx="529" cy="182" r="3" fill="var(--global-text-color, #333)"/>
    <text class="tlbl" x="529" y="207">X₃ = high</text>
    <!-- plane parallelogram: BL=(529,182) BR=(659,182) TR=(671,77) TL=(541,77) -->
    <polygon class="face" points="529,182 659,182 671,77 541,77"/>
    <line class="pax" x1="529" y1="182" x2="659" y2="182"/>
    <line class="pax" x1="529" y1="182" x2="541" y2="77"/>
    <text class="small" x="662" y="186">X₁</text>
    <text class="small" x="532" y="71">Y</text>
    <!-- regression line: TL to BR (negative slope) -->
    <line class="fit" x1="547" y1="82" x2="653" y2="177"/>
    <!-- scatter dots along negative correlation -->
    <circle class="dot" cx="553" cy="87"  r="2.6"/>
    <circle class="dot" cx="564" cy="100" r="2.6"/>
    <circle class="dot" cx="577" cy="106" r="2.6"/>
    <circle class="dot" cx="588" cy="119" r="2.6"/>
    <circle class="dot" cx="601" cy="124" r="2.6"/>
    <circle class="dot" cx="612" cy="140" r="2.6"/>
    <circle class="dot" cx="623" cy="153" r="2.6"/>
    <circle class="dot" cx="635" cy="163" r="2.6"/>
    <circle class="dot" cx="647" cy="171" r="2.6"/>
    <text class="cap" x="600" y="69">negative correlation</text>
  </g>
</svg>
<figcaption style="font-size:0.85rem; color:var(--global-text-color-light); text-align:center; margin-top:0.5rem;">
  Three (X₁, Y) slices attached to the X₃ axis at low, threshold, and high values. As X₃ sweeps, the (X₁, Y) plane rotates in real Cartesian space — positive correlation at one end, flat at the threshold, negative correlation at the other end. The Plücker coordinates of the plane track that rotation as a smooth function of X₃.
</figcaption>
</figure>

A related pattern, just as common in fab physics, is a threshold gate where the interaction is at the noise floor below some value of the swept axis and emerges sharply above it. Both shapes — sign flip and emergence past threshold — are third-order effects with non-linear onset. Both are invisible to a 2D analysis that does not vary the third knob.

The pattern shows up everywhere in fab physics once you look for it. An RF power × chamber pressure interaction that is invisible below a plasma-density threshold and sharply present above it. A dose × time interaction in dopant activation that is gated by wafer temperature. An etch rate × bias voltage interaction that turns on only above a polymer-formation threshold. A beam current × bunch phase interaction in the linac that requires sufficient beam loading to exist at all. In every case the order of the interaction is genuinely higher than a 2D analysis can recover, and the *geometry* of the modulation — abrupt threshold, smooth ramp, hysteretic — is encoded in how the Plücker coordinates move along the sweep axis.

A linear interaction model fit only above the threshold will look fine. The same model extrapolated below the threshold will be wrong in a way that looks like noise and is actually structure. The sweep is what tells you which regime you are in.

The same machinery scales. Unfreeze two axes and you watch a surface of Plücker coordinates deform; unfreeze three and you watch a volume. The only thing that changes is how many axes of the sweep you can hold in your head at once.

## Two passes, one shape

Everyone working in a fab knows the structure of process space is multidimensional. That is not the news. The hard part is having a mental model rigorous enough to examine that structure and concrete enough to act on. The Y-by-X pareto is the dominant mental model today not because it captures the structure but because it fits in the head — one knob, one effect, ranked.

Plücker coordinates do not introduce the multidimensional structure. They introduce a math-and-physics-interpretable projection of it. A 2-plane in a 4-dimensional slice has six Plücker coordinates — six numbers, fewer than the number of parameters in any real process — and each one carries a geometric meaning an engineer can reason about: which pair of axes the plane projects onto, and how strongly. Sweeping the third axis turns those six numbers into six curves whose shape encodes the third-order modulation. The flag manifold of process viability is not made smaller by Plücker. It is made *thinkable*.

Y-by-X identifies the axes. Plücker coordinates identify the subspaces those axes span. Sweeping the frozen axes identifies how those subspaces deform. The first answers *which knobs*; the second answers *what shape*; the third answers *what bends*. The pareto, the plane, and the deformation. A mental model of the fab's viable region that an engineer can hold in their head — and act on — needs all three to be legible.

The next post returns to the first pass itself — whether Y-by-X is actually the right tool for surfacing the candidate parameters, or whether something multivariate from the start would do that job better.
