# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`hasbii-board` is a custom keyboard hardware design project. The current phase is **keyboard layout design using [Ergogen](https://ergogen.cache.works/)** — a Node.js tool that generates PCB outlines, switch footprint placements, and routing from a YAML config.

Future phases will likely include PCB design (KiCad) and firmware (QMK, ZMK, or KMK).

## Package Manager

This project uses **pnpm**. Always use `pnpm` instead of `npm` or `yarn`.

```bash
pnpm install       # install dependencies
pnpm run <script>  # run scripts
```

## Ergogen

`keyboard.yaml` is the Ergogen layout definition (targets engine v4.1.0). Ergogen config is structured around:

- **`points`** — defines the key matrix (columns, rows, key positions, spread/stagger)
- **`outlines`** — generates board outline shapes from the key positions
- **`cases`** — (optional) 3D case definitions
- **`pcbs`** — PCB output with footprints, routes, and design rules
- **`units`** — reusable numeric variables used throughout the config

To run Ergogen locally (once installed):
```bash
pnpm ergogen keyboard.yaml        # generate output from the layout
```

Or use the [Ergogen web preview](https://ergogen.cache.works/) to visualize `keyboard.yaml` in the browser without a local install.
