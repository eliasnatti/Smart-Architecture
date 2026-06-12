---
layout: post
title: "The First Pass Is a Subspace Estimator"
date: 2026-06-15 09:00:00
description: "Y-by-X, trees, and L1+L2 regression are all subspace estimators with different priors. L1+L2's coefficient vector reads as the Plücker basis the engineer needs to act on — and the basis hands back the 2D views worth plotting next."
tags: geometry semiconductors plucker process-engineering regression interpretability
categories: motivation
giscus_comments: false
related_posts: false
---

The [previous post]({{ '/blog/2026/what-y-by-x-cannot-see/' | relative_url }}) ended on a question it left open: is Y-by-X actually the right first pass for surfacing the parameters that span the viable subspace, or is something multivariate from the start a better fit?

The answer is that the first pass — whatever you use — is already doing subspace estimation. The choice of first-pass tool is the choice of subspace estimator with a particular set of priors baked in. Y-by-X has the prior that inputs act one at a time. Trees have the prior that the space is partitionable along coordinate axes. L1+L2 regression has the prior that effects are linear in some sparse combination of inputs. None of these priors are wrong. They just have very different consequences for what the engineer can read off the result.

## Three estimators on the same data

<figure markdown="0" style="margin: 1.5rem 0;">
<svg viewBox="0 0 720 260" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; max-width:720px;">
  <style>
    .pframe { fill: var(--global-theme-color, #b509ac); fill-opacity: 0.04; stroke: var(--global-divider-color, #999); stroke-width: 0.9; }
    .ax     { stroke: var(--global-text-color, #333); stroke-width: 1; fill: none; }
    .dot    { fill: var(--global-text-color, #333); opacity: 0.55; }
    .hot    { fill: var(--global-theme-color, #b509ac); opacity: 0.9; }
    .cut    { stroke: var(--global-text-color, #333); stroke-width: 1.2; stroke-dasharray: 3 3; fill: none; opacity: 0.7; }
    .vec    { stroke: var(--global-theme-color, #b509ac); stroke-width: 2.4; fill: none; marker-end: url(#arr3); }
    .lbl    { fill: var(--global-text-color, #333); font: 12px sans-serif; text-anchor: middle; }
    .small  { fill: var(--global-text-color, #333); font: 10px sans-serif; text-anchor: middle; }
    .cap    { fill: var(--global-text-color-light, #888); font: 11px sans-serif; font-style: italic; text-anchor: middle; }
  </style>
  <defs>
    <marker id="arr3" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto">
      <path d="M0,0 L10,5 L0,10 z" fill="var(--global-theme-color, #b509ac)"/>
    </marker>
  </defs>
  <g transform="translate(20,30)">
    <text class="lbl" x="100" y="14">Y-by-X (marginal)</text>
    <rect class="pframe" x="20" y="24" width="160" height="140"/>
    <line class="ax" x1="20" y1="164" x2="180" y2="164"/>
    <line class="ax" x1="20" y1="24" x2="20" y2="164"/>
    <circle class="dot" cx="35"  cy="92"  r="2.5"/>
    <circle class="dot" cx="52"  cy="135" r="2.5"/>
    <circle class="dot" cx="71"  cy="60"  r="2.5"/>
    <circle class="dot" cx="88"  cy="118" r="2.5"/>
    <circle class="dot" cx="103" cy="78"  r="2.5"/>
    <circle class="dot" cx="121" cy="145" r="2.5"/>
    <circle class="dot" cx="139" cy="55"  r="2.5"/>
    <circle class="dot" cx="156" cy="108" r="2.5"/>
    <circle class="dot" cx="168" cy="42"  r="2.5"/>
    <text class="small" x="100" y="182">X₁ →</text>
    <text class="cap" x="100" y="208">surfaces nothing</text>
  </g>
  <g transform="translate(260,30)">
    <text class="lbl" x="100" y="14">Tree partition</text>
    <rect class="pframe" x="20" y="24" width="160" height="140"/>
    <line class="ax" x1="20" y1="164" x2="180" y2="164"/>
    <line class="ax" x1="20" y1="24" x2="20" y2="164"/>
    <line class="cut" x1="80"  y1="24"  x2="80"  y2="164"/>
    <line class="cut" x1="130" y1="24"  x2="130" y2="164"/>
    <line class="cut" x1="20"  y1="100" x2="180" y2="100"/>
    <line class="cut" x1="80"  y1="65"  x2="180" y2="65"/>
    <line class="cut" x1="130" y1="130" x2="180" y2="130"/>
    <circle class="hot" cx="34" cy="150" r="2.8"/>
    <circle class="hot" cx="54" cy="132" r="2.8"/>
    <circle class="hot" cx="76" cy="115" r="2.8"/>
    <circle class="hot" cx="98" cy="98"  r="2.8"/>
    <circle class="hot" cx="120" cy="80"  r="2.8"/>
    <circle class="hot" cx="142" cy="62"  r="2.8"/>
    <circle class="hot" cx="164" cy="44"  r="2.8"/>
    <text class="small" x="100" y="182">X₁ → · X₂ ↑</text>
    <text class="cap" x="100" y="208">a bag of cuts</text>
  </g>
  <g transform="translate(500,30)">
    <text class="lbl" x="100" y="14">L1+L2 regression</text>
    <rect class="pframe" x="20" y="24" width="160" height="140"/>
    <line class="ax" x1="20" y1="164" x2="180" y2="164"/>
    <line class="ax" x1="20" y1="24" x2="20" y2="164"/>
    <circle class="hot" cx="34" cy="150" r="2.8"/>
    <circle class="hot" cx="54" cy="132" r="2.8"/>
    <circle class="hot" cx="76" cy="115" r="2.8"/>
    <circle class="hot" cx="98" cy="98"  r="2.8"/>
    <circle class="hot" cx="120" cy="80"  r="2.8"/>
    <circle class="hot" cx="142" cy="62"  r="2.8"/>
    <circle class="hot" cx="164" cy="44"  r="2.8"/>
    <line class="vec" x1="34" y1="150" x2="164" y2="44"/>
    <text class="small" x="100" y="182">X₁ → · X₂ ↑</text>
    <text class="cap" x="100" y="208">a direction in the space</text>
  </g>
</svg>
<figcaption style="font-size:0.85rem; color:var(--global-text-color-light); text-align:center; margin-top:0.5rem;">
  The same diagonal-ridge data viewed by three first-pass estimators. Y-by-X projects to a single axis and the signal vanishes. A tree partitions the joint space into axis-aligned rectangles — it can fit the data but cannot represent the relationship as a direction. L1+L2 regression finds the subspace directly: a single recovered vector in the input space.
</figcaption>
</figure>

Y-by-X projects each axis to a marginal and rank-orders the result. Its subspace estimate is a coordinate axis, and the estimator can only ever produce subspaces that are unions of coordinate axes. The diagonal is invisible by construction.

Trees do better at fitting the data and worse at representing it. A deep enough forest will fit the diagonal ridge accurately, as a staircase of small axis-aligned rectangles approximating the line. But the representation is a bag of cuts, not a direction. Trees can recover *that* the diagonal matters; they cannot recover the diagonal *as a subspace*. To an engineer staring at the output, the result is a tree visualization — useful for prediction, opaque as a description of what the underlying physics is doing.

L1+L2 regression has the right prior if the result needs to interpretable to the second or third order.

## The interpretable subspace

The output of an L1+L2 fit is a sparse, stable vector of coefficients — one number per input parameter. That vector is the entire answer, and it is the answer in a form the engineer can read without translation.

<figure markdown="0" style="margin: 1.5rem 0;">
<svg viewBox="0 0 720 320" xmlns="http://www.w3.org/2000/svg" style="width:100%; height:auto; max-width:720px;">
  <style>
    .bar     { fill: var(--global-theme-color, #b509ac); opacity: 0.85; }
    .barneg  { fill: var(--global-text-color, #333); opacity: 0.7; }
    .zeroln  { stroke: var(--global-text-color, #333); stroke-width: 1.2; }
    .gridln  { stroke: var(--global-divider-color, #ccc); stroke-width: 0.5; stroke-dasharray: 2 3; }
    .plbl    { fill: var(--global-text-color, #333); font: 11px sans-serif; }
    .vlbl    { fill: var(--global-text-color, #333); font: 10px monospace; }
    .head    { fill: var(--global-text-color, #333); font: 12px sans-serif; font-weight: 600; }
    .cap     { fill: var(--global-text-color-light, #888); font: 11px sans-serif; font-style: italic; }
    .vbox    { fill: none; stroke: var(--global-divider-color, #999); stroke-width: 0.9; }
    .mono    { fill: var(--global-text-color, #333); font: 12px monospace; }
    .annot   { fill: var(--global-text-color-light, #888); font: 10px sans-serif; font-style: italic; }
  </style>
  <g transform="translate(30,30)">
    <text class="head" x="0" y="-8">L1+L2 coefficient vector</text>
    <line class="zeroln" x1="160" y1="0" x2="160" y2="260"/>
    <line class="gridln" x1="60"  y1="0" x2="60"  y2="260"/>
    <line class="gridln" x1="260" y1="0" x2="260" y2="260"/>
    <text class="vlbl" x="58"  y="275" text-anchor="middle">−0.5</text>
    <text class="vlbl" x="160" y="275" text-anchor="middle">0</text>
    <text class="vlbl" x="262" y="275" text-anchor="middle">+0.5</text>
    <text class="plbl" x="-8" y="20" text-anchor="end">RF power</text>
    <rect class="bar" x="160" y="10" width="124" height="14"/>
    <text class="vlbl" x="288" y="20">+0.62</text>
    <text class="plbl" x="-8" y="44" text-anchor="end">chamber pressure</text>
    <rect class="barneg" x="78" y="34" width="82" height="14"/>
    <text class="vlbl" x="72" y="44" text-anchor="end">−0.41</text>
    <text class="plbl" x="-8" y="68" text-anchor="end">gas flow</text>
    <rect class="bar" x="160" y="58" width="56" height="14"/>
    <text class="vlbl" x="220" y="68">+0.28</text>
    <text class="plbl" x="-8" y="92" text-anchor="end">wafer temp</text>
    <text class="annot" x="166" y="92">— pruned by L1 —</text>
    <text class="plbl" x="-8" y="116" text-anchor="end">bias voltage</text>
    <text class="annot" x="166" y="116">— pruned by L1 —</text>
    <text class="plbl" x="-8" y="140" text-anchor="end">gap height</text>
    <rect class="barneg" x="124" y="130" width="36" height="14"/>
    <text class="vlbl" x="118" y="140" text-anchor="end">−0.18</text>
    <text class="plbl" x="-8" y="164" text-anchor="end">pump speed</text>
    <text class="annot" x="166" y="164">— pruned by L1 —</text>
    <text class="plbl" x="-8" y="188" text-anchor="end">magnet current</text>
    <text class="annot" x="166" y="188">— pruned by L1 —</text>
    <text class="plbl" x="-8" y="212" text-anchor="end">coil ratio</text>
    <text class="annot" x="166" y="212">— pruned by L1 —</text>
    <text class="plbl" x="-8" y="236" text-anchor="end">platen tilt</text>
    <text class="annot" x="166" y="236">— pruned by L1 —</text>
  </g>
  <g transform="translate(460,30)">
    <text class="head" x="0" y="-8">read as a subspace direction</text>
    <rect class="vbox" x="0" y="0" width="220" height="260" rx="4"/>
    <text class="mono" x="14" y="32">v = +0.62 · RF_power</text>
    <text class="mono" x="14" y="60">    − 0.41 · pressure</text>
    <text class="mono" x="14" y="88">    + 0.28 · gas_flow</text>
    <text class="mono" x="14" y="116">    − 0.18 · gap_height</text>
    <line class="gridln" x1="14" y1="135" x2="206" y2="135"/>
    <text class="annot" x="14" y="156">four-dimensional subspace</text>
    <text class="annot" x="14" y="170">in the 10-D process space</text>
    <text class="annot" x="14" y="200">Plücker coordinates =</text>
    <text class="annot" x="14" y="214">  maximal 4×4 minors of</text>
    <text class="annot" x="14" y="228">  the (multi-output)</text>
    <text class="annot" x="14" y="242">  coefficient matrix</text>
  </g>
</svg>
<figcaption style="font-size:0.85rem; color:var(--global-text-color-light); text-align:center; margin-top:0.5rem;">
  An L1+L2 fit on a process with ten candidate parameters. L1 prunes six to zero. The four survivors are the basis of the relevant subspace, with explicit weights and signs that map to physical knobs. Wedging the coefficient vectors of a multi-output fit produces the Plücker coordinates directly.
</figcaption>
</figure>

Four properties matter, and they compound.

**Sparsity is selection.** L1 here refers to the *action* of removing parameters — the property that makes the output a basis rather than a vector of mostly-uninformative weights. The action can be the standard lasso penalty doing the work inside the convex optimization, or it can be an explicit feature-dropping step driven by prior knowledge, a screening procedure, or forward/backward selection. The workflow determines the exact method; what matters is that the cut happens. Either way, the non-zero coefficients are the parameters the regression has decided actually span the relevant subspace free of human bias. The engineer should not have to interpret a feature-importance ranking and decide where to cut; the cut is part of the answer. The variables that remain are the basis. This is what Y-by-X was trying to do and what trees do post-hoc through importance scores — sparsity-as-action does it as part of the fit, accounting for joint structure rather than ranking by marginal correlation.

**Magnitude is contribution; sign is direction.** A coefficient of +0.62 on RF power and −0.41 on chamber pressure tells the engineer not just *which* knobs matter but how to push them. Each non-zero coefficient is a physically interpretable instruction: increase this, decrease that, by approximately these relative magnitudes.

**L2 stabilizes the basis under collinearity.** Process parameters are often correlated by design, because they vary together as part of a recipe or share upstream history. Pure L1 reacts to collinearity by arbitrarily picking one variable from a correlated cluster and zeroing the rest, which collapses the subspace at exactly the moment it most needs to be preserved. L2 keeps correlated variables both non-zero, smoothing the coefficients over the cluster. The combination — L1 for sparsity across uncorrelated directions, L2 for stability within correlated ones — gives a numerically reliable basis instead of a brittle one.

**The coefficient vector is the Plücker basis.** This is the technical bridge to the rest of the workflow. The non-zero coefficient vector — or coefficient matrix, with multiple outputs — is a basis for the subspace the model has found informative. The maximal $k \times k$ minors of that matrix are its Plücker coordinates. Selection of which axes matter, identification of the subspace they span, and computation of the Plücker basis happen in the same step. There is no second stage; the engineer's "interpretable readout" and the framework's "Plücker basis" are the same object, written in two different notations.

## Two at a time

The subspace L1+L2 hands you is $k$-dimensional, and for any $k > 2$ that is still too many dimensions to think about at once. The interpretability win is not really at the subspace level — it is at the 2D-view level, which is where engineers actually work. 2D is the eye's native language for process data: process windows, contour maps, whiteboard scatters. Any methodology that does not bottom out in 2D plots with physical interpretability is going to lose to one that does.

The Plücker basis pays off here. With a $k$-dimensional subspace identified by the L1+L2 fit, each pair of basis vectors defines a 2D plane — a 2D *view of the subspace that already matters*. Picking 2D plots from the raw $p$ input variables means choosing among hundreds of mostly-uninformative slices. Picking them from the basis means choosing among a handful of plots that the geometry has already flagged as worth looking at.

This is also where the [previous post]({{ '/blog/2026/what-y-by-x-cannot-see/' | relative_url }})'s machinery comes back. Each 2D plane chosen from the basis can be plotted as a scatter, regressed for a slope, swept along an un-projected coordinate to watch its orientation change. The sign-flip figure from Post 2 was always doing this — it was tracking a Plücker plane through a sequence of slices of a higher-dimensional flag. Post 2 was the projection step. Post 3 just makes the choice of *which* 2D plane to project to come from the data rather than from the engineer's intuition.

The pipeline closes. L1+L2 picks the subspace. The basis identifies the meaningful 2D views. Plücker tracks how those views deform as you sweep other axes. Every step lands on a 2D plot the engineer can plot, regress, monitor, and reason about.

## A caveat about the data

This would be the whole story if process data were independent samples. It is not.

Fab data is preclustered by the physical realities of operation. Campaigns and PM cycles set a slow clock — a chamber runs the same recipe for thousands of wafers, gets PM'd, behaves differently after. Recipe blocks and lot lineage set a medium clock. The fast clock is batch processing: wafers handled together either *literally batch* (a furnace or multi-wafer implanter) or *sequential same-FOUP* (single-wafer chamber, but every wafer in the FOUP shares its upstream history). Same-FOUP samples are nearly perfectly confounded on every prior process step.

L1+L2 fit on this data does not silently fail in the way pure lasso would. The L2 piece specifically resists collapsing the basis onto any single direction, including the batch-distinguishing ones, so the fit does not just hand back a sparse set of batch indicators in disguise. What it does instead is select variables whose signal exists at *multiple levels* of the hierarchy — variables that vary between batches *and* within batches. That selection criterion is informative on its own: multi-scale signal is often where the real causal physics lives. But each surviving variable now mixes two contributions per coefficient — the within-batch variation, which is what the engineer wants to interpret as causal effect at fixed upstream history, and the between-batch variation, which may be real process drift, pure batch artifact, or some of both.

Separating those contributions is the job of explicit hierarchical modeling: nested random effects for FOUP within campaign within tool, or regression-style orthogonalization of the candidate variables against the batch indicators before the L1+L2 fit runs. Either approach partitions each variable's variation into its within-batch and between-batch components, and the Plücker basis is computed from the within-batch part. The next post is about the other side of this problem: how to design sampling that does not require these corrections in the first place.

## One decision, three forms

The choice of first-pass estimator, the way the data's batch hierarchy is or is not being handled, and the 2D views the engineer ends up plotting are not three problems. They are one decision in three forms. L1+L2 regression with hierarchical controls produces a sparse, stable, signed, physically labeled basis for the relevant subspace, and that basis hands back a small set of meaningful 2D plots to look at next.

Y-by-X was never going to produce that. Trees were never going to produce that. The Plücker basis everyone is implicitly trying to build was always sitting inside the coefficient vector of the right regression, and the 2D views worth plotting were always its faces.
