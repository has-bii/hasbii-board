# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`hasbii-board` is a custom split ergonomic keyboard hardware design project. The current phase is PCB layout design using [Ergogen](https://ergogen.cache.works/) — a Node.js tool that generates PCB outlines, switch footprint placements, and KiCad files from a YAML config.

The keyboard is a **left-half-only reversible PCB** design (same PCB flipped for right half), with Choc v1 low-profile switches and hotswap sockets.

## Commands

```bash
pnpm install          # install dependencies (ergogen ^4.2.1)
pnpm run build        # generate all output → ./output/
```

`pnpm run build` runs `ergogen . -o ./output` and generates:
- `output/points/` — key positions as YAML, SVG, DXF
- `output/outlines/` — board and preview outlines as DXF
- `output/pcbs/` — KiCad PCB file (`hasbii_pcb.kicad_pcb`)
- `output/cases/` — STL/JSCAD files for case plates
- `output/source/` — normalized canonical YAML

⚠️ **Warning:** `pnpm run build` overwrites `hasbii_pcb.kicad_pcb`. Never run after making manual edits in KiCad.

## File Structure

```
config.yaml            ← main Ergogen config (edit this)
corney-island.yaml     ← reference config (do not modify)
footprints/ceoloide/   ← local Ergogen footprint library (27 footprints)
footprints/rp2040zero.js ← custom RP2040 Zero footprint
output/                ← generated files (do not edit manually)
```

`config.yaml` is the default filename Ergogen looks for when running `ergogen . -o output`, so no path argument is needed. The local `footprints/` directory is automatically picked up by Ergogen when running from the project root.

`corney-island.yaml` is a reference-only file used to understand patterns and footprint names from the ceoloide library.

## Ergogen Config Architecture (`config.yaml`)

The config has four top-level sections processed in order:

### `units`
Custom variables reused throughout the config:
- `mcuw: 18`, `mcuh: 23.5` — RP2040 Zero dimensions in mm
- `spacing: 0.5` — gap constant used in outline/placement offsets
- `trrsw: 14`, `trrsh: 6` — TRRS jack dimensions
- `u` — built-in Ergogen unit (19mm key spacing)

### `points`
Defines all physical positions on the board. Two zone types:

**Key zones** (tagged `key`) — generate switch positions:
- `matrix` — 6 columns × 3 rows = 18 keys
- `thumbfan` — columns c3–c6, mix of 1–2 rows = 5 keys

**Helper zones** (not key positions):
- `mcu` — tagged `helper`, anchored relative to `matrix_c6_r1`
- `board_screw_1..4` — tagged `board_screw`, placed via `aggregate.parts`

**Naming convention:** `{zone}_{column}_{row}` → e.g. `matrix_c3_r2`, `thumbfan_c4_r5`

**Column layout (matrix):**
| Name | Physical position | Stagger |
|------|------------------|---------|
| `c1` | leftmost (pinky) | 0 |
| `c2` | pinky | 0 |
| `c3` | ring | +u/8 |
| `c4` | middle | +u/8 |
| `c5` | index | -u/8 |
| `c6` | inner (rightmost) | -u/8 |

**Row layout:** `r3` (listed first, bottom of board), `r2` (home), `r1` (top of board, highest y)

**Thumbfan:** anchored to `matrix_c4_r3`, columns `c3→c6`, rows `r5` (lower) + `r4` (upper, only `c6`). Columns `c3/c4/c5` skip `r4`. `-12°` splay on `c5`/`c6`.

**MCU placement note:** The `mcu` points zone anchor and the `pcbs.mcu` footprint `where` use **different shifts** — the points zone shift is used for the board outline, the footprint shift is the actual pad placement. Do not conflate them.

### `outlines`
Named 2D shapes built from operations:
- `_keycaps` — 18mm rectangles at every `[key]` point (visualization)
- `_mcu` — rectangle sized `[mcuw, mcuh]` at `[helper]` point
- `_board_screw_heads` — circles radius `4.3/2` at `[board_screw]` points (preview only)
- `board` — the actual PCB edge cut: polygon connecting all perimeter points
- `preview` — stacks board + _keycaps + _mcu + _board_screw_heads for visualization

The `board` polygon uses `affect: [x]` / `affect: [y]` to borrow individual axes from different reference points.

### `cases`
Generates 3D STL files by extruding 2D outlines. Ergogen can only extrude straight up — no side cutouts or overhangs.
- `bottom` — board outline (1mm)
- TRRS side cutout cannot be done in Ergogen — use FreeCAD

### `pcbs`
Defines the KiCad output (`hasbii_pcb`, template `kicad8`):

| Footprint | What | Where |
|---|---|---|
| `switches` | `ceoloide/switch_choc_v1_v2` | all `[key]` points |
| `diode` | `diode` | all `[key]` points, shifted [3, -5] |
| `m2_screws` | `ceoloide/mounting_hole_npth` | all `[board_screw]` points |
| `mcu` | `rp2040zero` | `matrix_c6_r1` + shift |
| `trrs` | `ceoloide/trrs_pj320a` | `trrs` zone |
| `reset` | `button` | `reset_switch` zone |

Switch nets: `from: "{{col.name}}"` (column net) → `to: "{{colrow}}"` (per-key net). Diode: `from: "{{colrow}}"` → `to: "{{row}}"` (row net). This is **COL2ROW**.

**MCU GP pin assignment (RP2040 Zero):**
| Net | GP | MCU side | Net | GP | MCU side |
|-----|----|----------|-----|----|----------|
| c1 | GP14 | Left | r1 | GP4 | Right |
| c2 | GP15 | Left | r2 | GP7 | Right |
| c3 | GP26 | Left | r3 | GP8 | Right |
| c4 | GP27 | Left | r4 | GP12 | Bottom |
| c5 | GP28 | Left | r5 | GP13 | Bottom |
| c6 | GP29 | Left | DATA | GP9 | Bottom |

GP0/GP1 reserved. Left-side pins face toward matrix; bottom pins face toward thumbfan/TRRS. `DATA` net is shared between MCU `GP9` and TRRS `R2`.

All footprints use `reversible: true` for the reversible PCB design.

## Footprint Gotchas
- `reset_switch_tht_top` — PTS636 (6×3.5mm), NOT the common 6×6 tactile. LCSC: C2689636
- `trrs_pj320a` — specifically PJ-320A. LCSC: C7501806

## Footprint Library (`footprints/ceoloide/`)

Key available footprints:
- `switch_choc_v1_v2` — Choc v1/v2 switches (used)
- `diode_tht_sod123` — THT diodes
- `mounting_hole_npth` — M2 non-plated mounting holes (used)
- `mcu_supermini_nrf52840` — SuperMini nRF52840 MCU
- `mcu_nice_nano` — nice!nano MCU
- `display_nice_view` — nice!view display
- `battery_connector_jst_ph_2` — JST PH 2-pin battery connector
- `power_switch_smd_side` — SMD side power switch
- `reset_switch_tht_top` — THT reset switch
- `trrs_pj320a` — TRRS jack

## Current Status

**Complete (Ergogen):**
- `points` — matrix, thumbfan, MCU, TRRS, screw hole zones
- `outlines` — board polygon, preview, case plate outlines
- `pcbs` — switches, diodes, mounting holes, MCU (RP2040 Zero), TRRS (PJ-320A), GP pin nets wired
- `cases` — bottom plate STL

**Still needed:**
- KiCad trace routing
- DRC + Gerber export
- TRRS side cutout in case (FreeCAD)
- QMK firmware config

## TODO
- [ ] Route traces in KiCad
- [ ] Add reset switch footprint manually in KiCad
- [ ] Run DRC and fix errors
- [ ] Export Gerbers → order from JLCPCB or PCBWay
- [ ] TRRS side cutout in FreeCAD/Fusion 360
- [ ] QMK firmware config — `DIODE_DIRECTION COL2ROW`, `SERIAL_DRIVER vendor`, `SERIAL_PIN GP9`
- [ ] Order components: PJ-320A TRRS jack, 3×6mm reset switch, M2 screws + standoffs

## After Ergogen: Next Steps

1. `pnpm run build` → open `output/pcbs/hasbii_pcb.kicad_pcb` in KiCad
2. Route traces manually (or use freerouter)
3. Run DRC — expect possible minor pad-edge warnings on outer switches
4. Export Gerbers → fabricate at JLCPCB or PCBWay
