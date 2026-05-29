---
layout: about
title: about
permalink: /
subtitle: <a href='#'>Independent researcher</a>. Physics, semiconductor process engineering, geometric ML.

profile:
  align: right
  image: prof_pic.png
  image_circular: false
  more_info: >
    <p>Me</p>

news: false
selected_papers: false
social: true

announcements:
  enabled: false

latest_posts:
  enabled: true
  scrollable: true
  limit: 5
---

I am Elias Natti - an independent researcher working at the intersection of physics, semiconductor process engineering, and geometric machine learning. My background is in physics and in ion implantation - the beam physics, the process integration, and the device impact downstream. That kind of work teaches you that the systems we build are full of structure that nobody has bothered to name.

I left Applied Materials to pursue that observation full-time. The problems I had built domain-specific methodologies for - modeling nested process constraints, predicting device impact from upstream variation, navigating high-dimensional viability windows - kept turning out to be instances of the same geometric structure. The specific solutions worked, but they did not generalize. I wanted the time and freedom to build the general ones.

The research program that came out of that, **Architecture as Geometry**, treats neural network architectures as geometric objects operating over Grassmannian and flag manifolds. The goal is models whose structure matches the structure of the physical systems they are trained on — not as a post-hoc regularization, but at the level of architecture.

The guiding philosophy is that when an architecture encodes the right geometric prior, everything else follows. The model is smaller because it does not need capacity to rediscover structure the physics already provides. It learns from less data because the prior constrains it to the viable manifold from the start. And its internal representations stay physically interpretable — not because interpretability was bolted on, but because the geometry it operates over is the geometry of the system it models. The approach is to build architectures up from a small set of reversible primitives — composable operations that can be assembled into whatever structure a problem demands while remaining on the same manifolds the physical system lives on. Full flexibility in what the model can express, without leaving the geometry that makes the expressions meaningful.
