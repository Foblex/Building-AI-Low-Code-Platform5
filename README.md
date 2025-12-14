# Building AI Low-Code Platform in Angular — Part 5 (Configuration Panel)

This repository contains the source code for the upcoming article **“Building AI Low-Code Platform in Angular — Part 5: Creating a Configuration Panel”**. It showcases how we wire a flow canvas, node palette, and configuration panel to let makers design and validate AI-driven flows.

## Highlights

- **Flow builder UI** with draggable nodes (Start, AI Parser, AI Validator, AI Executor, If-Else, Logger) powered by `@foblex/flow`.
- **Configuration panel** backed by Angular signals and reactive forms to edit node details.
- **Live validation**: nodes are visibly flagged when their configuration is incomplete or invalid.
- **IndexedDB persistence** to save and restore flow drafts locally.
- **Backend stubs** (NestJS + Genkit) for executing flow nodes and AI prompts.

## Getting started

```bash
npm ci

# Run the Angular app
npx nx serve low-code-ide

# Run unit tests
npx nx test low-code-ide
```

## Project structure

- `low-code-ide/` — Angular application shell and global styles.
- `libs-domain/flow/` — Flow canvas components (nodes, connections, toolbars).
- `libs-domain/flow-state/` — Flow state management, node metadata, and persistence.
- `libs-domain/node-configuration-*/` — Configuration forms for each node type.
- `server/api/` — Minimal API layer with Genkit prompt definitions.

## Article context

This code is part of the **Building AI Low-Code Platform in Angular** series. Part 5 focuses on crafting a polished configuration experience with validation feedback that keeps flows trustworthy and ready for execution. Stay tuned for the published article (coming soon).
