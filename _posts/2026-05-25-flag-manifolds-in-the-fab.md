---
layout: post
title: "Flag Manifolds in the Fab"
date: 2026-05-25 09:00:00
description: "The nested constraint structure of semiconductor manufacturing is a flag manifold. Almost no ML model deployed in this industry knows that."
tags: geometry semiconductors ml manifolds
categories: motivation
giscus_comments: false
related_posts: false
---

A process engineer who has qualified an implant recipe or watched a beam drift out of tune knows something that most machine learning models trained on fab data do not: the viable region of process space is not just small. It is *shaped*. Each step in the flow does not merely add a constraint to the previous step's output — it constrains the space of constraints that the next step can occupy.

This is a specific mathematical structure. It has a name. It is a flag manifold. And almost no model deployed in semiconductor manufacturing knows that it lives on one.

What follows is a motivation piece. No proofs, no code, no theorems. The goal is to point at something that has always been there.

## A 72-dimensional sheet, 0.016% thick

The cleanest example I have worked with directly is a twelve-stage Wideroe double-gap drift-tube linac used for ion implantation. Each stage has six tunable parameters — voltages, phases, and geometry for two accelerating gaps. Across twelve stages, that is a 72-dimensional control space.

A process engineer or accelerator physicist already knows where this is going. The fraction of that 72-dimensional volume that produces a viable beam at the output is on the order of 0.016 percent. The viable set is a thin sheet.

The interesting fact is not how thin the sheet is. It is how the sheet is *organized*.

A configuration at stage six does not produce viable beam in isolation. It produces viable beam only if the beam arriving at stage six — defined entirely by stages one through five — falls within a bounded region of phase space that stage six can accept. The viable parameter set at stage six is contained inside the projection of the viable set at stage five. The viable set at stage five is contained in the projection of the viable set at stage four. All the way down.

This is the defining property of a flag manifold: a nested sequence of subspaces, each contained in the next, $V_1 \subset V_2 \subset \cdots \subset V_{12}$. The linac is not *like* a flag manifold. It *is* one. The transfer-matrix structure that propagates Twiss parameters from stage to stage is exactly the containment relation. The thin viable sheet is not randomly scattered through the 72-dimensional space — it has the hierarchical, nested geometry of a flag.

If you have ever tuned a beamline by walking constraints back stage by stage from the output, you have been doing arithmetic on a flag manifold by hand.

## The whole process flow is the same shape

The linac is one instance of a pattern that runs through the entire fab.

Deposition feeds lithography. The thickness, uniformity, and stress of a deposited film define the dose/focus window that lithography has to work in. A film that is one sigma off from nominal does not just shift the lithography problem — it shrinks the volume of dose/focus space that can yield a viable pattern. The viable lithography window is a subset of the space the deposition outcome leaves available.

Lithography feeds etch. A resist profile — CD, sidewall angle, footing — determines which etch recipes can produce an in-spec final feature. Etch parameters that work beautifully on a nominal resist profile may be entirely outside the viable set when the resist is at the edge of its own window.

Implant feeds anneal. The as-implanted dopant distribution — peak concentration, projected range, straggle — sets the space of junctions that anneal can produce. Junction depth and activation are not properties of the anneal recipe; they are properties of the anneal recipe acting on a specific implant profile.

In every case, the viable parameter region at step $k+1$ lives inside a region defined by what step $k$ produced. The viable set at the end of the line is the intersection of all these constraints, projected back through the chain.

Process engineers navigate this every day during process window qualification. They walk corners, they back-fit windows, they argue about which step "owns" a marginal yield problem. The thing they are navigating is a flag manifold. It has not had a name in the fab, but it has always been there.

## Device, circuit, system: the same nesting, scaled up

The same nested-containment structure shows up one floor above the process.

Device geometry sets electrical character. Gate length, oxide thickness, and junction depth define what combinations of $V_t$, $I_{on}$, $I_{off}$, and drive current are achievable. Not every electrical operating point is reachable from every geometry — the geometry carves out a subspace of the electrical space.

Electrical character sets circuit behavior. Two transistors with the same $I_{on}$ but different $I_{off}$ and $C_{gs}$ profiles do not span the same circuit performance space. Speed, power, and noise margin live in a subspace defined by the device-level electrical fingerprint.

Circuit behavior sets system behavior. A chip that meets every circuit-level spec at its worst-case process corner still bounds what the system above it can do.

Each level is a subspace inside the next. The performance hierarchy and the process hierarchy are the same kind of object, just at different scales.

## What current ML models do instead

The standard pattern for machine learning in this industry: take the inputs, embed them into a vector, learn a mapping to the output. The embedding space is flat. The model is given no prior that the viable region of the input space is nested, that being viable at stage six implies a specific structure on stages one through five, that the output performance space inherits a flag from the process that produced it.

A model with a flat prior can still learn — given enough data — to act as though it knows about the structure. But "given enough data" is the catch. Without the structural prior, models in this domain tend to require more training examples than the physics should demand, generalize poorly to configurations that are on the viable manifold but outside the training distribution, and have no principled way to detect a query that is geometrically off the manifold entirely.

None of this is an argument that current models are bad. It is an argument that they are leaving structure on the table. The flag manifold is in the physics whether the model uses it or not. A model that knows it is on a flag manifold can exploit that fact at the level of architecture, not as a fine-tuning trick.

## The geometry was always there

The next posts on this blog will work through the experimental side: what architectures look like when they are built to respect Grassmannian and flag structure, what they buy in transfer, in data efficiency, in interpretability, and where the structure breaks down. The purpose of this post is the prior step — to make the case that the geometry exists in the physical systems before any model is built on top of them.

The fab has always been a stack of nested viability constraints. The accelerator has always been a sequence of beam-defined acceptance regions. The device-circuit-system hierarchy has always been a containment chain. The question is not whether the geometry is real. It is whether the model knows.
