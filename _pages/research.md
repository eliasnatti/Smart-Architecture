---
layout: page
title: research
permalink: /research/
description: Active research programs and experimental results.
nav: true
nav_order: 3
---

The work on this site sits inside a single intellectual frame: **architecture as geometry**. The premise is that the systems we build — physical and computational — have geometric structure that their models usually ignore, and that recovering this structure pays off in transfer, data efficiency, and interpretability.

Two research programs run under that frame.

## Architecture as Geometry (theory)

A theoretical program treating neural network architectures as geometric objects operating over Grassmannian and flag manifolds. This is the longer-arc work — formalism, proofs, and architecture-design principles. Posts on the [blog]({{ '/blog/' | relative_url }}) about flag manifolds in semiconductors and accelerator beam transport sit on top of this program.

The theory itself lives elsewhere for now; only the parts that overlap with a public post will surface here.

## Prompt Engineering as Geometry (LLM internals)

An empirical program asking whether the same geometric tools — UMAP, persistence diagrams, Grassmannian path lengths, cluster structure — help us understand how prompts shape what large language models do internally. The motivation is practical: better prompts for domain-specific behavior.

The results across six experiments are gathered in the [**LLM Topology gallery**]({{ '/llm-topology/' | relative_url }}). Each experiment isolates one mechanism (hallucination, boundary enforcement, chain-of-thought, constraint axes, layer-wise propagation) and visualizes the model's internal state with system-prompted inputs.

---

More research areas will appear here as they take shape.
