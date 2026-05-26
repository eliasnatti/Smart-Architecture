---
layout: page
title: LLM topology
permalink: /llm-topology/
description: "Prompt Engineering as Geometry — eight experiments measuring how prompts shape internal model state."
nav: false
toc:
  sidebar: left
---

<style>
  .exp-block { border: 1px solid var(--global-divider-color); border-radius: 8px; padding: 1.25rem 1.5rem; margin: 1.5rem 0; }
  .exp-block h2 { margin-top: 0; }
  .model-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; margin: 0.75rem 0; }
  .model-btn {
    padding: 6px 14px; border: 1px solid var(--global-divider-color);
    background: var(--global-card-bg-color, transparent); cursor: pointer;
    border-radius: 4px; font-size: 0.9rem;
  }
  .model-btn.active { background: var(--global-theme-color); color: white; border-color: var(--global-theme-color); }
  .dash-frame {
  width: 95vw;
  max-width: 1600px;
  height: 85vh;
  min-height: 640px;
  border: 1px solid var(--global-divider-color);
  border-radius: 4px;
  margin: 0.5rem 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  }
  .dash-stub {
    width: 100%; height: 100px; border: 1px dashed var(--global-divider-color); border-radius: 4px;
    display: flex; align-items: center; justify-content: center; margin-top: 0.5rem; color: var(--global-text-color-light);
  }
  .ext-link { font-size: 0.85rem; margin-top: 0.5rem; display: inline-block; }
  details.questions { margin: 1rem 0; }
  details.questions summary { cursor: pointer; font-weight: 500; padding: 0.5rem 0; }
  .q-grid { display: grid; grid-template-columns: auto 1fr auto auto; gap: 0.25rem 1rem; font-size: 0.9rem; margin-top: 0.5rem; }
  .q-grid > div { padding: 0.25rem 0; border-bottom: 1px solid var(--global-divider-color); }
</style>

## What this is

A series of experiments asking whether the geometric tools we use to analyze physical systems — UMAP, persistence diagrams, cluster counts, centroid separation, Fisher discriminability, Grassmannian path lengths — also tell us useful things about what happens *inside* a large language model when it responds to a prompt. The motivating practical question is whether prompts can be designed against the model's internal geometry rather than just its outputs.

Each experiment isolates one mechanism: hallucination as topological signature, prompts as distortions of the output metric, constraints as geometric walls, chain-of-thought as path structure, layer-wise propagation, prompt parameters as orthogonal axes, interference between prompt sentences, and the geodesic length of question-to-answer paths. All results below use a fixed system prompt protocol; earlier rounds without a system prompt exist locally and may be re-published under the same protocol later.

## Common pipeline

Every experiment shares the same skeleton. Generate N completions for each prompt or condition; embed each completion with a sentence-embedding model; then apply a geometric measure — distance, spread, cluster structure, topological complexity, axis separation, or path length — to the resulting cloud of points. The geometric measure is the dependent variable. The prompt or condition is the independent variable. Specifics differ per experiment.

---

<div class="exp-block" markdown="1">

## Experiment 2 — Topology of Hallucination

**What it tests.** Whether hallucinated outputs occupy geometrically distinct regions from correct outputs, and whether each hallucination mode forms its own cluster in embedding space.

**Setup.** 10 factual questions × 200 completions per question × 2 models. Each completion is labeled `correct` or `hallucinated` by string-matching against per-question lists of known correct answers and common wrong answers (the question set is chosen to reliably elicit hallucinations from small models). Embeddings are projected with UMAP for the spatial view and analyzed with persistence diagrams (topological data analysis) for the topological view.

**What to look at.** Pick a question with high hallucination rate (e.g. Q2 "bones in the hand") and one with near-zero hallucination (e.g. Q0 "capital of Myanmar"). The UMAP and persistence signatures differ in characteristic ways — the high-hallucination case shows multiple modes corresponding to specific wrong answers.

<div class="model-tabs" data-exp="2">
  <button class="model-btn active" data-model="llama3.1_8b">llama3.1:8b</button>
  <button class="model-btn" data-model="llama3.2_3b">llama3.2:3b</button>
</div>
<div class="dash-stub" data-exp="2">Click a model to load the dashboard.</div>
<a class="ext-link" href="#" data-ext="2">↗ open current dashboard in new tab</a>

<details class="questions" markdown="0">
  <summary>Per-question deep dives (UMAP + clusters, exp2 only)</summary>
  <div class="q-grid">
    <div><b>#</b></div><div><b>Question</b></div><div><b>llama3.1:8b</b></div><div><b>llama3.2:3b</b></div>
    <div>Q0</div><div>What is the capital of Myanmar?</div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q0_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q0_clusters.html' | relative_url }}">clusters</a></div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q0_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q0_clusters.html' | relative_url }}">clusters</a></div>
    <div>Q1</div><div>Who won the 1923 Nobel Prize in Literature?</div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q1_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q1_clusters.html' | relative_url }}">clusters</a></div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q1_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q1_clusters.html' | relative_url }}">clusters</a></div>
    <div>Q2</div><div>How many bones are in the adult human hand?</div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q2_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q2_clusters.html' | relative_url }}">clusters</a></div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q2_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q2_clusters.html' | relative_url }}">clusters</a></div>
    <div>Q3</div><div>What is the smallest bone in the human body?</div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q3_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q3_clusters.html' | relative_url }}">clusters</a></div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q3_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q3_clusters.html' | relative_url }}">clusters</a></div>
    <div>Q4</div><div>Who wrote Don Quixote?</div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q4_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q4_clusters.html' | relative_url }}">clusters</a></div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q4_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q4_clusters.html' | relative_url }}">clusters</a></div>
    <div>Q5</div><div>How many teeth does an adult human have?</div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q5_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q5_clusters.html' | relative_url }}">clusters</a></div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q5_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q5_clusters.html' | relative_url }}">clusters</a></div>
    <div>Q6</div><div>What year was the Berlin Wall built?</div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q6_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q6_clusters.html' | relative_url }}">clusters</a></div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q6_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q6_clusters.html' | relative_url }}">clusters</a></div>
    <div>Q7</div><div>What is the boiling point of mercury in degrees Celsius?</div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q7_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q7_clusters.html' | relative_url }}">clusters</a></div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q7_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q7_clusters.html' | relative_url }}">clusters</a></div>
    <div>Q8</div><div>What is the currency of Thailand?</div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q8_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q8_clusters.html' | relative_url }}">clusters</a></div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q8_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q8_clusters.html' | relative_url }}">clusters</a></div>
    <div>Q9</div><div>What is the chemical formula for rust?</div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q9_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.1_8b_q9_clusters.html' | relative_url }}">clusters</a></div>
      <div><a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q9_umap.html' | relative_url }}">umap</a> · <a href="{{ '/assets/research/llm-topology/exp2_llama3.2_3b_q9_clusters.html' | relative_url }}">clusters</a></div>
  </div>
</details>

</div>

<div class="exp-block" markdown="1">

## Experiment 3 — Prompt as Metric

**What it tests.** Whether different prompts change the effective distances between concepts in the output space — i.e., whether prompts act as distortions of the Riemannian metric of the output manifold rather than as simple shifts.

**Setup.** 20 pharmacological concepts × 3 prompt conditions × 10 descriptions each × 2 models. The three conditions:

- *Generic* — `Describe {concept} in one sentence.`
- *Domain expert* — same prompt prefixed with `You are a pharmacologist.`
- *Comparative* — domain expert plus `... differs from similar drugs in one sentence.`

For each (concept, condition) pair, embeddings of the 10 descriptions are aggregated. Distances between concept centroids are then compared across conditions. If prompts were pure shifts, all pairwise distances would scale uniformly; if prompts are metrics, the distance matrix changes shape.

<div class="model-tabs" data-exp="3">
  <button class="model-btn active" data-model="llama3.1_8b">llama3.1:8b</button>
  <button class="model-btn" data-model="llama3.2_3b">llama3.2:3b</button>
</div>
<div class="dash-stub" data-exp="3">Click a model to load the dashboard.</div>
<a class="ext-link" href="#" data-ext="3">↗ open current dashboard in new tab</a>

</div>

<div class="exp-block" markdown="1">

## Experiment 4 — Boundary Enforcement

**What it tests.** Whether prompt constraints produce a *geometric* boundary in the output manifold — a wall the model cannot cross under that prompt — and whether boundary strength scales with model capability.

**Setup.** Single question (`Explain how a CPU processes an instruction.`) × 4 constraint levels × 300 completions × 2 models:

- *Unconstrained* — the bare question.
- *Length-bounded* — `In exactly one sentence: ...`
- *Scope-bounded* — `Do not mention GPU, memory, or operating systems. Only talk about the CPU itself.`
- *Both bounded* — length + scope together.

Off-topic content is scored by cosine similarity of each generated sentence to a set of forbidden-topic embeddings (GPU pipelines, OS kernels, RAM/memory hierarchy, virtual memory). Two categories of forbidden topics — *hard off-topic* (genuinely unrelated, e.g. graphics shaders) and *contextual* (near-misses, e.g. RAM tangents) — let us separate "the constraint is being respected" from "the constraint is being approximated".

<div class="model-tabs" data-exp="4">
  <button class="model-btn active" data-model="llama3.1_8b">llama3.1:8b</button>
  <button class="model-btn" data-model="llama3.2_3b">llama3.2:3b</button>
</div>
<div class="dash-stub" data-exp="4">Click a model to load the dashboard.</div>
<a class="ext-link" href="#" data-ext="4">↗ open current dashboard in new tab</a>

</div>

<div class="exp-block" markdown="1">

## Experiment 5 — Chain-of-Thought as Topology

**What it tests.** Whether chain-of-thought prompting changes the topology of outputs, creating path structure with identifiable divergence points where reasoning splits into correct and hallucinated branches.

**Setup.** 5 reasoning problems × 3 conditions × 200 completions × 2 models. The three conditions:

- *Terse* — short direct answers.
- *Direct* — the question with no reasoning scaffold.
- *CoT* — chain-of-thought prompting that elicits step-by-step reasoning.

For CoT completions, the response is split into reasoning steps. Each step is embedded, giving each generation a *path* through embedding space rather than a single point. The Paths tab visualizes these paths; the Accuracy tab correlates path geometry (length, branching, where divergence happens) with whether the final answer is correct.

<div class="model-tabs" data-exp="5">
  <button class="model-btn active" data-model="llama3.1_8b">llama3.1:8b</button>
  <button class="model-btn" data-model="llama3.2_3b">llama3.2:3b</button>
</div>
<div class="dash-stub" data-exp="5">Click a model to load the dashboard.</div>
<a class="ext-link" href="#" data-ext="5">↗ open current dashboard in new tab</a>

</div>

<div class="exp-block" markdown="1">

## Experiment 6 — Layer-by-Layer Constraint Propagation

**What it tests.** Whether prompt constraints have a measurable, layer-by-layer effect on the model's internal geometry. This is the most direct test of the thesis that constraints act *as geometry* rather than as a post-hoc filter on outputs — if so, the constraint signature should be visible inside the model, not just at the output head.

**Setup.** Single question (`What is the boiling point of water at sea level?`) × 2 prompt conditions × 50 completions per condition × 10 independent runs, on **TinyLlama-1.1B** (a small open-weights model that lets us pull hidden states from every transformer layer via HuggingFace).

- *Unconstrained* — the bare question.
- *Constrained* — chemistry-expert role, two few-shot examples, explicit "If unsure, say: I don't know."

For each completion, hidden states are captured at every layer. Per-layer geometric measures — pairwise cosine distance, geometric spread, MMD between conditions, intrinsic dimensionality — are computed and plotted as mean curves with error bands across the 10 independent runs.

<div class="model-tabs" data-exp="6">
  <button class="model-btn active" data-model="TinyLlama-1.1B-Chat-v1.0">TinyLlama-1.1B</button>
</div>
<div class="dash-stub" data-exp="6">Click a model to load the dashboard.</div>
<a class="ext-link" href="#" data-ext="6">↗ open current dashboard in new tab</a>

</div>

<div class="exp-block" markdown="1">

## Experiment 7 — Binary Constraint Axes

**What it tests.** Whether simple binary prompt parameters (length, audience, tone, certainty, audience age, detail level) produce consistent, identifiable geometric separation in embedding space — analogous to the way spatial bin positions (x, y) act as strong priors in 2D convolution. If they do, prompt-space behaves as a low-dimensional parameter manifold with structured axes, not as a flat bag-of-features.

**Setup.** For each of 6 axes, two contrasting prompt templates ("A" and "B" sides). The full axis set:

- *Length* — one sentence vs. detailed paragraph
- *Audience* — explain to a 5-year-old vs. explain to a PhD researcher
- *Tone* — formal/professional vs. casual/chatty
- *Certainty* — state only facts vs. speculate freely
- *Audience age* — speaking to a teenager vs. speaking to a retiree
- *Detail* — brief high-level summary vs. detailed step-by-step

For each (question, axis, value) triple, N completions are generated and embedded. Per-axis metrics: **centroid separation** between the A and B clouds, **Fisher discriminability** as a normalized separation score, and **permutation-tested significance** to control for noise. Axes that separate cleanly across all questions are evidence of a structured, low-dimensional prompt manifold.

<div class="model-tabs" data-exp="7">
  <button class="model-btn active" data-model="llama3.1_8b">llama3.1:8b</button>
  <button class="model-btn" data-model="llama3.2_3b">llama3.2:3b</button>
</div>
<div class="dash-stub" data-exp="7">Click a model to load the dashboard.</div>
<a class="ext-link" href="#" data-ext="7">↗ open current dashboard in new tab</a>

</div>

<div class="exp-block" markdown="1">

## Experiment 9 — Orthogonal vs. Destructive Prompts

**What it tests.** How much of the performance gain from prompt-engineering comes from *avoiding interference* between sentences in a prompt, vs. from *adding useful constraints*. Two prompts for the same task are constructed by embedding-guided selection: one in which every sentence is maximally orthogonal to every other sentence (and to the system prompt), and one in which sentences deliberately interfere with each other and with the system prompt. The output geometries are then compared head-to-head.

**Setup.** Four parts:

- *Part A* — Construct orthogonal and destructive prompts via embedding-guided sentence selection.
- *Part B* — Measure output geometry across 5 conditions × 300 completions each.
- *Part C* — Prompt-space analysis: UMAP of the prompt sentences themselves plus per-pair interference correlation.
- *Part D* — Efficiency frontier: incremental sentence-addition curves showing how quickly geometric quality saturates or degrades.

If interference dominates, the destructive prompt's outputs are diffuse and unfocused even with the same number of constraint sentences. If added constraint dominates, both prompts perform similarly per sentence and the difference shrinks.

<div class="model-tabs" data-exp="9">
  <button class="model-btn active" data-model="llama3.1_8b">llama3.1:8b</button>
  <button class="model-btn" data-model="llama3.2_3b">llama3.2:3b</button>
</div>
<div class="dash-stub" data-exp="9">Click a model to load the dashboard.</div>
<a class="ext-link" href="#" data-ext="9">↗ open current dashboard in new tab</a>

</div>

<div class="exp-block" markdown="1">

## Experiment 10 — Grassmannian Path Length

**What it tests.** Defines a single scalar — **Grassmannian Path Length (GPL)** — for how much geometric work a model must do to get from a question to its answer under a given prompt. A shorter GPL means the prompt creates a more direct route through the representation space; longer GPL means more detours, more reconsideration, more wasted motion.

**Setup.** Five parts:

- *Part A* — Output-level GPL from chain-of-thought step embeddings (5 problems × 5 prompt conditions).
- *Part B* — Layer-level GPL from HuggingFace hidden-state extraction.
- *Part C* — The GPL–accuracy Pareto frontier: are short paths also accurate paths, or is there a tradeoff?
- *Part D* — Combined GPL approximation: GPL_out × mean_layer_step_size, fusing output and layer perspectives.
- *Part E* — Question-family clustering by GPL profile.

GPL is the metric most directly aligned with the broader "architecture as geometry" thesis: if prompts act as constraint walls on a representation manifold, then better prompts shorten the geodesic from question to answer.

*Currently rendered for llama3.1:8b only; the 3B run is pending.*

<div class="model-tabs" data-exp="10">
  <button class="model-btn active" data-model="llama3.1_8b">llama3.1:8b</button>
</div>
<div class="dash-stub" data-exp="10">Click a model to load the dashboard.</div>
<a class="ext-link" href="#" data-ext="10">↗ open current dashboard in new tab</a>

</div>

<script>
(function() {
  const base = "{{ '/assets/research/llm-topology/' | relative_url }}";
  document.querySelectorAll('.exp-block').forEach(block => {
    const tabsContainer = block.querySelector('.model-tabs');
    if (!tabsContainer) return;
    const exp = tabsContainer.dataset.exp;
    const stub = block.querySelector('.dash-stub');
    const extLink = block.querySelector('.ext-link');
    const buttons = tabsContainer.querySelectorAll('.model-btn');

    function load(model) {
      const url = base + 'exp' + exp + '_dashboard_' + model + '.html';
      let frame = block.querySelector('iframe.dash-frame');
      if (!frame) {
        frame = document.createElement('iframe');
        frame.className = 'dash-frame';
        frame.loading = 'lazy';
        stub.replaceWith(frame);
      }
      frame.src = url;
      if (extLink) extLink.href = url;
      buttons.forEach(b => b.classList.toggle('active', b.dataset.model === model));
    }

    buttons.forEach(btn => {
      btn.addEventListener('click', () => load(btn.dataset.model));
    });
  });
})();
</script>
