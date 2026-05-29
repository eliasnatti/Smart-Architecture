---
layout: page
title: research
permalink: /research/
description: Active research programs, papers, and experimental results.
nav: true
nav_order: 3
---

<style>
  .paper-card {
    border: 1px solid var(--global-divider-color);
    border-radius: 8px;
    padding: 1.25rem 1.5rem;
    margin: 1rem 0;
    background: var(--global-card-bg-color, transparent);
  }
  .paper-card h3 { margin-top: 0; margin-bottom: 0.25rem; }
  .paper-meta {
    font-size: 0.85rem;
    color: var(--global-text-color-light);
    margin-bottom: 0.75rem;
  }
  .paper-actions { margin-top: 0.75rem; }
  .paper-actions a {
    display: inline-block;
    padding: 4px 12px;
    margin-right: 0.5rem;
    border: 1px solid var(--global-divider-color);
    border-radius: 4px;
    font-size: 0.85rem;
    text-decoration: none;
    color: var(--global-text-color);
  }
  .paper-actions a:hover {
    background: var(--global-theme-color);
    color: white;
    border-color: var(--global-theme-color);
  }
  .paper-card.forthcoming { opacity: 0.65; border-style: dashed; }
</style>

The work on this site sits inside a single intellectual frame: **architecture as geometry**. The premise is that the systems we build — physical and computational — have geometric structure that their models usually ignore, and that recovering this structure pays off in transfer, data efficiency, and interpretability.

Two research programs run under that frame.

## Architecture as Geometry (theory)

A theoretical program treating neural network architectures as geometric objects operating over Grassmannian and flag manifolds. Paper 1 formalizes the framework; Paper 1b provides the empirical companion, validating and extending the framework's predictions on multi-task learning.

<div class="paper-card" markdown="1">

### Paper 1 — Architecture as Geometric Prior: A Three-Primitive Framework for Manifold-Aware Neural Network Design

<div class="paper-meta">Elias Natti · preprint · April 2026 · 44 pages</div>

All known neural network architectures — convolutional, attentional, graph, spherical, hyperbolic — are specific constraint configurations of three known reversible primitives: permutation, pointwise invertible transform, and invertible mixer. Each primitive operates in an *intrinsic* mode (within a fixed space) and an *extrinsic* mode (changing the space itself); intrinsic completeness and minimality follow from classical results (LU decomposition, butterfly factorization). The extrinsic modes parameterize smooth invertible paths on Grassmannian manifolds, reframing dimensional changes as subspace rotations rather than lossy projections.

The central reframing: a network's computation is a path on the Grassmannian from the data's initial subspace to the task's meaning space, and an architecture's constraints determine which paths are accessible. Dissolving the position/feature distinction reveals that convolution and attention are different constraints on the same mixer, not different operations. Experimentally, the paper shows that `exp(A)` parameterization with phase decomposition into symmetric (scaling) and skew-symmetric (rotation) components achieves three orders of magnitude improvement over GELU on periodic tasks. The framework is compared head-to-head with the symmetry-group view of geometric deep learning, arguing that symmetry groups characterize what an architecture *preserves* while primitives characterize what it *assumes and computes*.

The practical implication: architecture development — historically a process of human intuition and empirical search — can be reformulated as optimization over a well-defined geometric space.

<div class="paper-actions">
  <a href="{{ '/assets/pdf/paper1_primitives_v38.pdf' | relative_url }}">PDF (5.3 MB)</a>
</div>

</div>

<div class="paper-card" markdown="1">

### Paper 1b — Empirical Geometry of Multi-Task Learning: L1-Discovered Complexity, Geodesic Transfer, and Flag Manifold Construction via Cumulative Curriculum

<div class="paper-meta">Eli Natti · preprint · May 2026 · 21 pages</div>

The empirical companion to Paper 1. Using a rotation-of-projection architecture (`H_rotational`) with `exp(A)`-parameterized mixers on five structurally diverse MNIST-derived tasks, the paper establishes three findings that the geometric prior framework predicts but that require empirical discovery to quantify.

First, **L1 regularization on the learned perturbation to a canonical rotation discovers a task-complexity hierarchy without supervision**: tasks solvable by linear combinations of token features (digit addition, spatial center-of-mass) drive the perturbation to zero at every layer, while tasks requiring fine-grained discrimination (10-class classification) require nonzero perturbation throughout. The architectural prior is automatically identified as either sufficient or insufficient for each task.

Second, **transfer learning depends on representational coherence, not rank**. A backbone with reservoir rank 5.45 but incoherent content (from sequential overwriting) transfers worse than one with rank 4.75 but coherent, mutually reinforcing meaning directions. The right diagnostic is *meaning fraction*, not raw subspace dimensionality.

Third, **cumulative curriculum training constructs a flag manifold**: a nested sequence $V_1 \subset V_2 \subset \cdots \subset V_5$ where each new task extends the existing structure rather than overwriting it. The resulting flag geometry is invariant to construction order, converging to the same endpoint as simultaneous multi-task training. (Sequential replacement, by contrast, destroys the flag — a clean negative control.)

Together these results establish three measurable geometric quantities — meaning fraction, reservoir coherence, and flag nesting — as diagnostics for multi-task representation quality, with direct implications for continual learning and automatic architecture discovery.

<div class="paper-actions">
  <a href="{{ '/assets/pdf/paper1b_geodesic_v13.pdf' | relative_url }}">PDF (1.0 MB)</a>
  <a href="https://github.com/eliasnatti/Smart-Architecture-Experiments">Code</a>
</div>

</div>

## Prompt Engineering as Geometry (LLM internals)

An empirical program asking whether the same geometric tools — UMAP, persistence diagrams, Grassmannian path lengths, cluster structure — help us understand how prompts shape what large language models do internally. The motivation is practical: better prompts for domain-specific behavior.

The results across eight experiments are gathered in the [**LLM Topology gallery**]({{ '/llm-topology/' | relative_url }}). Each experiment isolates one mechanism (hallucination, boundary enforcement, chain-of-thought, constraint axes, layer-wise propagation, prompt interference, geodesic path length) and visualizes the model's internal state with system-prompted inputs.

---

More research areas will appear here as they take shape.
