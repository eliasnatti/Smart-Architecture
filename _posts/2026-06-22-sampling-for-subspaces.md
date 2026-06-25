---
layout: post
title: "Sampling for Subspaces"
date: 2026-06-22 09:00:00
description: "Cornering tells you the boundary of the viable region. Production data fills its interior. Designed sampling fills the gaps. Together they support the digital twin a subspace analysis needs."
tags: geometry semiconductors plucker process-engineering doe sampling digital-twin
categories: motivation
giscus_comments: false
related_posts: false
---

The [previous post]({{ '/blog/2026/the-first-pass-is-a-subspace-estimator/' | relative_url }}) ended on the sampling-side alternative to its analysis-side fix. If the batch hierarchy of fab data corrupts naive subspace estimation, you have two choices: correct for the corruption after the fact, or design the sampling so the corruption is not there to begin with. The first option is what every retrospective analysis uses. The second option, when you have it, is more powerful — but it is also a narrower problem than it looks, because the bulk of the interior data a subspace analysis needs is already sitting in the production logs.

This post is about how the sampling story actually splits in a fab. Cornering does one job. Production data does another. Designed sampling does a third. They are not in competition; they are three legs of one program, and a working subspace analysis needs all three.

## What classical DOE optimizes

Classical design-of-experiments theory minimizes the variance of *individual regression coefficients*. The mathematical form is a determinant or trace on the coefficient covariance matrix — D-optimality minimizes the determinant, A-optimality minimizes its trace, I-optimality minimizes the average prediction variance. All three reward the design for making each coefficient — the effect of one parameter holding the others fixed — as precisely estimated as possible.

The geometric consequence is consistent across the family: classical designs push runs to the *corners* of the established process window. A two-level fractional factorial with five factors places runs at the extreme combinations $(\pm 1, \pm 1, \pm 1, \pm 1, \pm 1)$. A central composite design adds star points along each axis. These are not naïvely chosen points. They are deliberately placed at the edges of the operating envelope, using domain knowledge, to characterize the *boundary* of the viable region. Cornering tells you where the process starts to fail, how robust the recipe is to edge-of-window excursions, and how much margin sits between nominal operation and the spec walls.

The interior of the window — the part that is neither corner nor axis — is sampled barely or not at all by classical designs.

## Cornering tells you the boundary, not the interior

The Plücker basis you are trying to estimate is a *direction* in the interior of the viable region. The relevant uncertainty is how much that direction can rotate given the data you collected — the angular spread of plausible subspace orientations, not the variance of any single coefficient at the window's edge.

A cornering design concentrates its runs on the boundary of the established window. The information matrix it produces is large along each boundary direction. But information about a diagonal inside the window comes from runs in the *interior*, and a cornering design barely puts any runs there. The subspace estimate that comes out is precise along the boundary directions the design emphasized and wobbly along interior diagonals it ignored. Cornering and subspace estimation answer different questions about the same flag manifold: cornering describes where the manifold's boundary sits and how the process behaves at the edge; subspace estimation describes the joint causal geometry inside the boundary.

<figure markdown="0" style="margin: 1.5rem 0;">
<svg viewBox="0 0 720 280" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; max-width:720px;">
  <style>
    .pframe { fill: var(--global-theme-color, #b509ac); fill-opacity: 0.04; stroke: var(--global-divider-color, #999); stroke-width: 0.9; }
    .ax     { stroke: var(--global-text-color, #333); stroke-width: 1; fill: none; }
    .dot    { fill: var(--global-text-color, #333); opacity: 0.85; }
    .arc    { fill: var(--global-theme-color, #b509ac); fill-opacity: 0.18; stroke: none; }
    .vec    { stroke: var(--global-theme-color, #b509ac); stroke-width: 2.4; fill: none; marker-end: url(#arr4); }
    .lbl    { fill: var(--global-text-color, #333); font: 12px sans-serif; text-anchor: middle; }
    .cap    { fill: var(--global-text-color-light, #888); font: 11px sans-serif; font-style: italic; text-anchor: middle; }
  </style>
  <defs>
    <marker id="arr4" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--global-theme-color, #b509ac)"/>
    </marker>
  </defs>
  <g transform="translate(30,30)">
    <text class="lbl" x="110" y="14">cornering · boundary characterization</text>
    <rect class="pframe" x="20" y="24" width="180" height="180"/>
    <line class="ax" x1="20" y1="204" x2="200" y2="204"/>
    <line class="ax" x1="20" y1="24"  x2="20"  y2="204"/>
    <path class="arc" d="M 110,114 L 195,29 A 120,120 0 0 0 195,200 Z"/>
    <circle class="dot" cx="30"  cy="194" r="4"/>
    <circle class="dot" cx="190" cy="194" r="4"/>
    <circle class="dot" cx="30"  cy="34"  r="4"/>
    <circle class="dot" cx="190" cy="34"  r="4"/>
    <circle class="dot" cx="110" cy="194" r="3.5"/>
    <circle class="dot" cx="30"  cy="114" r="3.5"/>
    <circle class="dot" cx="190" cy="114" r="3.5"/>
    <circle class="dot" cx="110" cy="34"  r="3.5"/>
    <circle class="dot" cx="110" cy="114" r="3.5"/>
    <circle class="dot" cx="60"  cy="194" r="3"/>
    <circle class="dot" cx="160" cy="194" r="3"/>
    <circle class="dot" cx="60"  cy="34"  r="3"/>
    <circle class="dot" cx="160" cy="34"  r="3"/>
    <circle class="dot" cx="35"  cy="189" r="2.5"/>
    <circle class="dot" cx="185" cy="189" r="2.5"/>
    <circle class="dot" cx="35"  cy="39"  r="2.5"/>
    <circle class="dot" cx="185" cy="39"  r="2.5"/>
    <line class="vec" x1="110" y1="114" x2="195" y2="29"/>
    <text class="cap" x="110" y="232">runs at the edges of the window</text>
    <text class="cap" x="110" y="248">wide angular uncertainty on interior diagonals</text>
  </g>
  <g transform="translate(390,30)">
    <text class="lbl" x="110" y="14">interior sampling · subspace structure</text>
    <rect class="pframe" x="20" y="24" width="180" height="180"/>
    <line class="ax" x1="20" y1="204" x2="200" y2="204"/>
    <line class="ax" x1="20" y1="24"  x2="20"  y2="204"/>
    <path class="arc" d="M 110,114 L 195,29 A 120,120 0 0 0 175,15 Z"/>
    <circle class="dot" cx="38"  cy="65"  r="3"/>
    <circle class="dot" cx="60"  cy="165" r="3"/>
    <circle class="dot" cx="78"  cy="44"  r="3"/>
    <circle class="dot" cx="95"  cy="98"  r="3"/>
    <circle class="dot" cx="115" cy="142" r="3"/>
    <circle class="dot" cx="48"  cy="124" r="3"/>
    <circle class="dot" cx="138" cy="68"  r="3"/>
    <circle class="dot" cx="155" cy="178" r="3"/>
    <circle class="dot" cx="178" cy="105" r="3"/>
    <circle class="dot" cx="86"  cy="190" r="3"/>
    <circle class="dot" cx="32"  cy="180" r="3"/>
    <circle class="dot" cx="175" cy="45"  r="3"/>
    <circle class="dot" cx="125" cy="180" r="3"/>
    <circle class="dot" cx="190" cy="155" r="3"/>
    <circle class="dot" cx="68"  cy="80"  r="3"/>
    <circle class="dot" cx="145" cy="115" r="3"/>
    <circle class="dot" cx="100" cy="55"  r="3"/>
    <line class="vec" x1="110" y1="114" x2="195" y2="29"/>
    <text class="cap" x="110" y="232">runs through the interior</text>
    <text class="cap" x="110" y="248">narrow angular uncertainty on diagonals</text>
  </g>
</svg>
<figcaption style="font-size:0.85rem; color:var(--global-text-color-light); text-align:center; margin-top:0.5rem;">
  Two designs with seventeen runs each. The cornering design (left) characterizes the boundary of the operating window with high precision and leaves interior diagonals undersampled — the subspace direction has a wide angular uncertainty (shaded cone). An interior-filling design (right) puts those same runs through the inside of the window; the same nominal direction is estimated with a much narrower cone. They are answering different questions about the same manifold.
</figcaption>
</figure>

## The interior is already sampled

Before designing a single new interior-filling run, look at what is already there. A semiconductor fab generates thousands of interior samples per day. Every wafer that goes through the line is a point inside the operating window with associated outcome metrics — yield, $V_t$, CD. The interior of the viable manifold, which the design problem above looks like it has to construct from scratch, is in modern semiconductor manufacturing already covered by production data more densely than any designed experiment could afford to be.

The catch is the one from the [previous post]({{ '/blog/2026/the-first-pass-is-a-subspace-estimator/' | relative_url }}). Production data is preclustered by FOUP, batch, recipe revision, and PM cycle. An L1+L2 fit run on it without controls returns a Plücker basis polluted by batch structure. The hierarchical handling Post 3 described — nested random effects, orthogonalization against batch indicators — is what turns the abundant-but-clustered production sample into a usable interior subspace estimate.

Once that step is done, the result is functionally a **digital twin** of the manifold's interior. A sparse, signed, physically labeled coefficient matrix that maps parameter changes to outcome changes inside the operating window. The engineer can pose counterfactuals to it — *if I shifted RF power +5% and chamber pressure −2%, what does the model predict for yield* — and the twin answers from the recovered Plücker basis. Subtle interactions that no single production run reveals (because no single run varies the right knobs together by enough) are nonetheless recoverable from the *population* of runs, as long as the population covers enough of the relevant subspace.

This reframes what designed experimentation is for. It is no longer the source of interior coverage. It is targeted gap-filling.

## What designed interior sampling adds

Once production data is the primary interior sample and the twin is built on it, designed sampling earns its tool-time by doing the two things production data cannot:

**Filling regions of the viable interior production has not operated in.** Production runs tend to cluster around recipe-of-record. Operating regions the recipe never visits are absent from the production sample, and the twin's basis has no information about how the process behaves there. A space-filling design (Latin hypercube, Sobol sequence, low-discrepancy quasi-random) deployed within the viable region targets those gaps directly.

**Validating twin predictions at points the twin is uncertain about.** Even where production data exists, the twin's predicted Plücker basis carries uncertainty. The twin says something specific would happen if a particular knob combination were run. A small number of designed runs at exactly those combinations either confirms the twin or falsifies it. Either outcome is information that improves the model.

Both uses are constrained to the *viable region*, established by cornering and confirmed by production envelope. Pure space-filling on the full parameter space would waste most runs on infeasible points; space-filling on the established viable region is a tractable problem with standard tools.

## Sequential sampling: where to add runs when the twin is uncertain

The strongest leverage from a small number of designed runs comes from placing them where the twin is most uncertain. The mechanic is direct: re-fit the L1+L2 estimate many times under batch-stratified resampling — each fit holding out one or more entire batches as test and training on the rest — and watch how much the recovered Plücker basis varies across the ensemble. Plain row-wise bootstrap works when batches are not the relevant grouping; batch-stratified resampling is the version that respects the production data's hierarchy and gives a basis-uncertainty estimate that doesn't double-count within-batch correlations. Where the basis points in the same direction across the ensemble, the twin is well-constrained and more runs there buy little. Where it points in measurably different directions, the basis is ill-constrained, and the next runs should be placed in regions of the viable interior where the candidate bases disagree most.

<figure markdown="0" style="margin: 1.5rem 0;">
<svg viewBox="0 0 720 240" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; max-width:720px;">
  <style>
    .pframe { fill: var(--global-theme-color, #b509ac); fill-opacity: 0.04; stroke: var(--global-divider-color, #999); stroke-width: 0.9; }
    .ax     { stroke: var(--global-text-color, #333); stroke-width: 1; fill: none; }
    .dot    { fill: var(--global-text-color, #333); opacity: 0.75; }
    .next   { fill: var(--global-theme-color, #b509ac); opacity: 1; stroke: var(--global-theme-color, #b509ac); stroke-width: 1.4; }
    .arc2   { fill: var(--global-theme-color, #b509ac); fill-opacity: 0.22; stroke: none; }
    .vec1   { stroke: var(--global-text-color, #333); stroke-width: 1.4; fill: none; stroke-dasharray: 3 3; }
    .vec2   { stroke: var(--global-text-color, #333); stroke-width: 1.4; fill: none; stroke-dasharray: 3 3; }
    .lbl    { fill: var(--global-text-color, #333); font: 12px sans-serif; text-anchor: middle; }
    .anno   { fill: var(--global-text-color-light, #888); font: 11px sans-serif; }
    .cap    { fill: var(--global-text-color-light, #888); font: 11px sans-serif; font-style: italic; text-anchor: middle; }
  </style>
  <g transform="translate(30,20)">
    <text class="lbl" x="320" y="14">posterior over candidate subspace directions from production data</text>
    <rect class="pframe" x="20" y="24" width="640" height="180"/>
    <line class="ax" x1="20" y1="204" x2="660" y2="204"/>
    <line class="ax" x1="20" y1="24"  x2="20"  y2="204"/>
    <circle class="dot" cx="60"  cy="180" r="3"/>
    <circle class="dot" cx="95"  cy="125" r="3"/>
    <circle class="dot" cx="140" cy="60"  r="3"/>
    <circle class="dot" cx="180" cy="155" r="3"/>
    <circle class="dot" cx="225" cy="92"  r="3"/>
    <circle class="dot" cx="270" cy="170" r="3"/>
    <circle class="dot" cx="310" cy="48"  r="3"/>
    <circle class="dot" cx="360" cy="118" r="3"/>
    <circle class="dot" cx="410" cy="65"  r="3"/>
    <circle class="dot" cx="455" cy="160" r="3"/>
    <circle class="dot" cx="490" cy="110" r="3"/>
    <circle class="dot" cx="530" cy="45"  r="3"/>
    <circle class="dot" cx="570" cy="135" r="3"/>
    <circle class="dot" cx="615" cy="80"  r="3"/>
    <line class="vec1" x1="120" y1="170" x2="500" y2="60"/>
    <text class="anno" x="505" y="58">candidate A (well-constrained)</text>
    <line class="vec2" x1="120" y1="170" x2="420" y2="40"/>
    <line class="vec2" x1="120" y1="170" x2="500" y2="125"/>
    <path class="arc2" d="M 120,170 L 420,40 A 350,350 0 0 1 500,125 Z"/>
    <text class="anno" x="445" y="170">candidate B</text>
    <text class="anno" x="445" y="184">(wide uncertainty)</text>
    <circle class="next" cx="475" cy="80"  r="5"/>
    <text class="anno" x="485" y="65" fill="var(--global-theme-color, #b509ac)">next run →</text>
    <text class="cap" x="320" y="232">the next designed run goes where the bootstrap basis disagrees most within the viable region</text>
  </g>
</svg>
<figcaption style="font-size:0.85rem; color:var(--global-text-color-light); text-align:center; margin-top:0.5rem;">
  Bootstrap the twin's L1+L2 fit on the production data; uncertainty over the recovered Plücker basis is the signal. Where the candidate basis directions agree, more sampling buys little. Where they disagree, a designed run in that region of the viable interior sharpens the estimate quickly.
</figcaption>
</figure>

This is active learning with a Grassmannian objective. Classical sequential DOE places the next run where the predicted *response* is most uncertain — minimizing the expected variance of $\hat Y$. Subspace-aware sequential DOE places it where the predicted *subspace direction* is most uncertain — minimizing the expected Grassmannian distance between basis estimates across replicates. The two heuristics typically pick different runs because they care about different uncertainties. In a fab where every designed wafer competes with revenue wafers for tool time, the Grassmannian objective tends to be the more useful one once production data has handled the easy interior coverage.

## Three legs, one twin

A complete sampling program for subspace work has three legs, and a working fab already has the first two.

**Cornering** characterizes the boundary of the viable region. It uses classical D-optimal designs and domain knowledge about where the operating window sits. It tells the engineer where the process breaks and how robust the recipe is to edge-of-window excursions.

**Production data** covers the interior of the viable region, densely and for free. Once the batch hierarchy from Post 3 is handled, it yields a Plücker basis that is functionally a digital twin of the manifold's interior. Most of what an engineer wants to know about joint causal structure inside the window is in this twin.

**Designed interior sampling** earns its tool-time only where the first two legs leave gaps — regions production has never operated in, and points where the twin's prediction is uncertain enough that confirming or falsifying it materially improves the model. Space-filling designs within the viable region target the gaps; sequential designs driven by the twin's basis-uncertainty target the validation runs.

The output of all three legs together is a Plücker basis the engineer can trust to describe the interior structure of the viable region — a twin built from cornering's boundary, production's interior coverage, and designed sampling's gap-filling. The question the next post takes up: what does this actually look like in practice?
