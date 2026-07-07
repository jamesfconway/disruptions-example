# Disruptions Example

This repository is a product showcase, not a production system.

It pulls together two AI-assisted frontend prototypes into a single GitHub Pages case study about a bus-control disruption workflow: what the workflow problem was, what product model sat underneath it, and how lightweight prototypes were used to make the change concrete.

## The Product Problem

Users of a Bus Control product needed to record service disruptions while also being able to customise the disruption types and causes available to them.

While exploring that capability, I found that friction in the existing workflow was adding up to more than 30 hours of lost time each month across the user base. The issue was not just UI untidiness. The deeper problem was that the workflow, the configuration model, and the downstream logic were not cleanly aligned.

This repo exists to show how I framed that as a product problem:

- quantify the operational friction
- map the workflow and product model underneath it
- separate controller workflow decisions from admin configuration decisions
- use fast prototypes to align design and engineering around what actually needed to change

## What The Prototypes Show

The showcase has two linked artifacts.

### Unified Service Disruption Form

This is the user-side prototype.

It explores a more unified disruption flow across three entry points:

- single-trip entry from the trip page
- multi-trip entry from the trip page
- single-trip entry from a trip card

The point of the prototype is not visual polish. It is to test whether one disruption model can work across different operational contexts without creating unnecessary branching or extra operator effort.

### Disruption Preferences

This is the admin-side prototype.

It focuses on the configuration model behind the workflow:

- defining disruption types
- defining causes
- controlling which type-cause combinations are valid

The point here is to make the underlying rules explicit and manageable, so the user-facing disruption flow is supported by a cleaner configuration structure.

## Why These Are White-Label

These prototypes were deliberately kept atomic, frontend-only, and white-label.

That was intentional. The goal was to focus attention on workflow change, system implications, and product decisions rather than on branding, production architecture, or polished UI detail.

## How AI Fits In

I used AI as a prototyping accelerator rather than as a substitute for product thinking.

ChatGPT helped structure discovery findings and requirement prompts. Figma Make was then used to generate fast frontend prototypes from those requirement documents. The result was a pair of artifacts that made the proposed changes tangible enough for design and engineering to react to, challenge, and refine.

## What This Repo Is For

This repo is best read as a compact case study in:

- identifying workflow friction from a product perspective
- moving from evidence to product model changes
- using AI-assisted prototyping to create alignment
- separating operational workflow design from admin configuration design

The live version is published via GitHub Pages and is intended as a portfolio-style demonstration of that work.

## Source Prototypes

The demos in this repo are adapted from:

- [jamesfconway/disruption-preferences](https://github.com/jamesfconway/disruption-preferences)
- [jamesfconway/unified-service-disruption-form](https://github.com/jamesfconway/unified-service-disruption-form)
