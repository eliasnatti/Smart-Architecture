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

  /* Top-level collapsible sections */
  details.research-section {
    border-top: 1px solid var(--global-divider-color);
    padding-top: 0.25rem;
    margin-top: 1.5rem;
  }
  details.research-section > summary {
    cursor: pointer;
    list-style: none;
    padding: 0.75rem 0 0.5rem;
    font-family: 'Roboto Slab', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 500;
    color: var(--global-text-color);
    user-select: none;
  }
  details.research-section > summary::-webkit-details-marker { display: none; }
  details.research-section > summary::before {
    content: '▸';
    display: inline-block;
    margin-right: 0.5rem;
    font-size: 0.85em;
    color: var(--global-text-color-light);
    transition: transform 0.15s ease;
  }
  details.research-section[open] > summary::before {
    transform: rotate(90deg);
  }
  details.research-section > summary:hover { color: var(--global-theme-color); }

  /* Nested subsections (under an always-visible header) */
  details.research-subsection {
    padding: 0.25rem 0 0.25rem 1rem;
    margin: 0.75rem 0;
    border-left: 2px solid var(--global-divider-color);
  }
  details.research-subsection > summary {
    cursor: pointer;
    list-style: none;
    padding: 0.4rem 0;
    font-family: 'Roboto Slab', Georgia, serif;
    font-size: 1.15rem;
    font-weight: 500;
    color: var(--global-text-color);
    user-select: none;
  }
  details.research-subsection > summary::-webkit-details-marker { display: none; }
  details.research-subsection > summary::before {
    content: '▸';
    display: inline-block;
    margin-right: 0.5rem;
    font-size: 0.75em;
    color: var(--global-text-color-light);
    transition: transform 0.15s ease;
  }
  details.research-subsection[open] > summary::before {
    transform: rotate(90deg);
  }
  details.research-subsection > summary:hover { color: var(--global-theme-color); }

  /* Small tag next to sub-section summary to signal audience */
  .aud-tag {
    display: inline-block;
    margin-left: 0.5rem;
    padding: 1px 8px;
    border: 1px solid var(--global-divider-color);
    border-radius: 999px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    color: var(--global-text-color-light);
    vertical-align: middle;
  }
</style>

The work on this site sits inside a single intellectual frame: **architecture as geometry**. The premise is that the systems we build — physical and computational — have geometric structure that their models usually ignore, and that recovering this structure pays off in transfer, data efficiency, and interpretability.

Multiple research threads run under that frame. Sections below are collapsed by default — expand the ones that match what you're looking for.

## Architecture as Geometry

A theoretical program treating neural network architectures as geometric objects operating over Grassmannian and flag manifolds, plus the applied-methodology work that carries the same framing out of the lab and onto physical machines. Two audiences, one framework.

<details class="research-subsection" markdown="1">
<summary>Theory<span class="aud-tag">ML / research</span></summary>

The foundational papers. Paper 1 formalizes the three-primitive framework; Paper 1b is the empirical companion establishing that the framework's predictions hold under multi-task learning.

<div class="paper-card" markdown="1">

### Paper 1 — Architecture as Geometric Prior: A Three-Primitive Framework for Manifold-Aware Neural Network Design

<div class="paper-meta">Elias Natti · preprint · April 2026 · 44 pages</div>

All known neural network architectures — convolutional, attentional, graph, spherical, hyperbolic — are specific constraint configurations of three known reversible primitives: permutation, pointwise invertible transform, and invertible mixer. Each primitive operates in an *intrinsic* mode (within a fixed space) and an *extrinsic* mode (changing the space itself); intrinsic completeness and minimality follow from classical results (LU decomposition, butterfly factorization). The extrinsic modes parameterize smooth invertible paths on Grassmannian manifolds, reframing dimensional changes as subspace rotations rather than lossy projections.

The central reframing: a network's computation is a path on the Grassmannian from the data's initial subspace to the task's meaning space, and an architecture's constraints determine which paths are accessible. Dissolving the position/feature distinction reveals that convolution and attention are different constraints on the same mixer, not different operations. Experimentally, the paper shows that `exp(A)` parameterization with phase decomposition into symmetric (scaling) and skew-symmetric (rotation) components achieves three orders of magnitude improvement over GELU on periodic tasks. The framework is compared head-to-head with the symmetry-group view of geometric deep learning, arguing that symmetry groups characterize what an architecture *preserves* while primitives characterize what it *assumes and computes*.

The practical implication: architecture development — historically a process of human intuition and empirical search — can be reformulated as optimization over a well-defined geometric space.

<div class="paper-actions">
  <a href="{{ '/assets/pdf/paper1_primitives_rev1.pdf' | relative_url }}">PDF (5.3 MB)</a>
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
  <a href="{{ '/assets/pdf/paper1b_geodesic_rev1.pdf' | relative_url }}">PDF (1.0 MB)</a>
</div>

</div>

</details>

<details class="research-subsection" markdown="1">
<summary>Semiconductor application<span class="aud-tag">OEM / capital equipment</span></summary>

The applied-methodology outgrowth of the theory work. Autonomous tuning of precision capital equipment, starting with charged-particle beamlines and ion implanters, framed for OEMs and their customers.

<div class="paper-card" markdown="1">

### Manifold-Aware Tuning: The Self-Tuning Machine

<div class="paper-meta">Elias Natti · white paper · July 2026 · 7 pages</div>

A methodology piece for capital-equipment OEMs and their customers, applying the manifold framing to autonomous tuning of precision instruments — starting with charged-particle beamlines and ion implanters. The premise is that the same geometric structure the theoretical papers identify in neural architectures also organizes the operating manifold of a many-knobbed physical machine, and that a physics-grounded method reasoning over that manifold can turn the tool into one that tunes, diagnoses, and holds itself on-spec from an operator's plain-language intent.

The method sits between the person who knows what the machine should do and the machine that knows how, through three layers. The *Intent* layer converts plain-language requests ("bring the output to target," "find what drifted") into precise objectives and constraints, and asks for clarification when intent is ambiguous or unsafe. The *Reasoning* layer plans candidate actions against a physics-grounded model of the tool, localizes drift when several faults stack, judges feasibility, and chooses the shortest path back to spec. The *Machine* layer executes approved changes through the tool's existing control interface, writing each step to the record as a structured, auditable state transition.

The methodology is machine-agnostic: the OEM or customer supplies the equipment and a physics-grounded model of it, and the method is fit against that model rather than shipped as bundled hardware or trained on a proprietary dataset. First demonstration is end-to-end on a simulated multi-stage beamline — a domain chosen because charged-particle process tools have the exact combination that makes autonomous tuning valuable: multi-parameter interactions, drift, fault stacking, and high downtime cost. The same method generalizes to any precision tool with a physics model and many interacting controls.

*A companion technical brief covering the manifold model, the reasoning-layer algorithms, and the end-to-end simulator validation is available on request.*

<div class="paper-actions">
  <a href="{{ '/assets/pdf/Manifold-Aware Tuning — White Paper.pdf' | relative_url }}">PDF (409 KB)</a>
</div>

</div>

</details>

<details class="research-section" markdown="1">
<summary>Defect Prevention Research</summary>

An empirical thread on how particulate and metal deposits accumulate across a multi-tool fab floor over the course of a campaign, and where intervention strategies — PM scheduling, chamber cleaning cadence, lot routing — actually reduce deposit-driven excursions. The work uses a simulator as the primary research surface: intervention strategies are proposed, run through a realistic multi-tool campaign, and evaluated against per-tool deposit trajectories and excursion counts.

<div class="paper-card" markdown="1">

### ParticleTransfer Digital Foundry — interactive simulation

<div class="paper-meta">Elias Natti · in-browser research simulator · July 2026</div>

An interactive week-of-operation simulation of a multi-tool fab floor covering implant, etch, PVD, and PECVD stages. The simulator tracks how particle and metal deposits accumulate across the floor as lots move through the process flow, when PM events fire, and how deposit-driven excursions build toward the "elevated deposits" KPI that goes critical when the floor's cumulative deposit state crosses threshold. Scrub the timeline to any point in the simulated campaign, drop playback to ½× to inspect a specific handoff, or run at 8× to see multi-day drift compress into seconds. Hover the floor for per-tool state.

The purpose is defect-prevention research: what PM schedules, cleaning intervals, and routing decisions actually keep deposit-driven excursions below threshold, and which choices look reasonable on a single-tool view but break down once deposit propagation across the floor is compounded across a week of operation. The simulator is self-contained (no backend, no external data), runs entirely in the browser, and is intended as a shared reference surface for reasoning about deposit dynamics — not a production forecasting tool.

<div class="paper-actions">
  <a href="{{ '/assets/html/digital_foundry.html' | relative_url }}" target="_blank" rel="noopener">Open simulator ↗</a>
</div>

</div>

</details>

<details class="research-section" markdown="1">
<summary>Prompt Engineering as Geometry (LLM internals)</summary>

An empirical program asking whether the same geometric tools — UMAP, persistence diagrams, Grassmannian path lengths, cluster structure — help us understand how prompts shape what large language models do internally. The motivation is practical: better prompts for domain-specific behavior.

The results across eight experiments are gathered in the [**LLM Topology gallery**]({{ '/llm-topology/' | relative_url }}). Each experiment isolates one mechanism (hallucination, boundary enforcement, chain-of-thought, constraint axes, layer-wise propagation, prompt interference, geodesic path length) and visualizes the model's internal state with system-prompted inputs.

</details>

---

More research areas will appear here as they take shape.
