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
output/                ← generated files (do not edit manually)
```

`config.yaml` is the default filename Ergogen looks for when running `ergogen . -o output`, so no path argument is needed. The local `footprints/ceoloide/` directory is automatically picked up by Ergogen when running from the project root.

`corney-island.yaml` is a reference-only file used to understand patterns and footprint names from the ceoloide library.

## Ergogen Config Architecture (`config.yaml`)

The config has four top-level sections processed in order:

### `units`
Custom variables reused throughout the config:
- `a: 0.75` — small offset/gap used in polygon outline points
- `mcuw: 17.78` — MCU width in mm
- `mcuh: 33` — MCU height in mm
- `u` — built-in Ergogen unit (19mm key spacing)
- `U` — built-in Ergogen unit (19.05mm, exact)

### `points`
Defines all physical positions on the board. Two zone types:

**Key zones** (tagged `key`) — generate switch positions:
- `matrix` — 6 columns × 3 rows = 18 keys
- `thumbfan` — 5 columns, mix of 1–2 rows = 7 keys

**Helper zones** (not key positions):
- `mcu` — tagged `helper`, anchored relative to `matrix_c1_r2`
- `board_screw_1..5` — tagged `board_screw`, placed via `aggregate.parts`

**Naming convention:** `{zone}_{column}_{row}` → e.g. `matrix_c3_r2`, `thumbfan_c1_r2`

**Column layout (matrix):**
| Name | Physical position | Stagger |
|------|------------------|---------|
| `c6` | leftmost (pinky) | 0 |
| `c5` | pinky | 0 |
| `c4` | ring | +u/4 |
| `c3` | middle | +u/4 |
| `c2` | index | -u/4 |
| `c1` | inner (rightmost) | -u/4 |

**Row layout:** `r3` (listed first, bottom of board), `r2` (home), `r1` (top of board, highest y)

**Thumbfan:** anchored to `matrix_c4_r3`, columns `c5→c1` with `-12°` splay on `c3/c2/c1`. Columns `c5/c4/c3` skip row `r1` (upper row only exists on `c2` and `c1`).

### `outlines`
Named 2D shapes built from operations:
- `_keycaps` — 18mm rectangles at every `[key]` point (visualization)
- `_mcu` — rectangle sized `[mcuw, mcuh]` at `[helper]` point
- `_board_screw_heads` — circles radius `4.3/2` at `[board_screw]` points (preview only)
- `board` — the actual PCB edge cut: union of `_keycaps` + `_mcu` + a hand-traced polygon connecting all perimeter points
- `preview` — stacks board + _keycaps + _mcu + _board_screw_heads for visualization

The `board` polygon uses `affect: [x]` / `affect: [y]` to borrow individual axes from different reference points, and `a` as a small expansion gap at stagger transitions.

### `cases`
Generates 3D STL files by extruding 2D outlines. Ergogen can only extrude straight up — no side cutouts or overhangs.
- `mounting_plate` — board outline minus switch cutouts, screw holes, MCU (1.5mm)
- `bottom_plate` — board outline minus screw holes (1.6mm)
- `top_frame` — board outline minus keycap openings, screw holes, MCU, OLED window (3mm)
- TRRS side cutout cannot be done in Ergogen — use FreeCAD

### `pcbs`
Defines the KiCad output (`hasbii_pcb`, template `kicad8`):

| Footprint group | ceoloide footprint | Where |
|---|---|---|
| `inner_switches` | `switch_choc_v1_v2` | `matrix_c[1-5]` + `thumbfan_c[2-5]` |
| `outer_switches_left` | `switch_choc_v1_v2` | `matrix_c6` (left board edge) |
| `outer_switches_right` | `switch_choc_v1_v2` | `thumbfan_c1` (outer thumb edge) |
| `diodes` | `diode_tht_sod123` | all `[key]` points |
| `screws` | `mounting_hole_npth` | all `[board_screw]` points |

Switch params shared via YAML anchor `&switches` / `<<: *switches`. Outer switch groups use `outer_pad_width_back: 2` or `outer_pad_width_front: 2` to prevent pads from extending past the board edge (avoids KiCad DRC errors).

All footprints use `reversible: true` for the reversible PCB design.

## Footprint Gotchas
- `reset_switch_tht_top` — PTS636 (6×3.5mm), NOT the common 6×6 tactile. LCSC: C2689636
- `trrs_pj320a` — specifically PJ-320A. LCSC: C7501806

## Footprint Library (`footprints/ceoloide/`)

Key available footprints:
- `switch_choc_v1_v2` — Choc v1/v2 switches (used)
- `diode_tht_sod123` — THT diodes (used)
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
- `points` — matrix, thumbfan, MCU, display, TRRS, screw hole zones
- `outlines` — board polygon, preview, case plate outlines
- `pcbs` — switches, diodes, mounting holes, MCU (SuperMini nRF52840), OLED (SSD1306), TRRS (PJ-320A)
- `cases` — mounting_plate, bottom_plate, top_frame STLs

**Complete (KiCad — manual):**
- Reset switch footprint — to be added manually (PTS636 6×3.5mm not sourced; using alternate)

**Still needed:**
- KiCad trace routing
- DRC + Gerber export
- TRRS side cutout in case (FreeCAD)
- ZMK firmware config

## TODO
- [ ] Route traces in KiCad
- [ ] Add reset switch footprint manually in KiCad
- [ ] Run DRC and fix errors
- [ ] Export Gerbers → order from JLCPCB or PCBWay
- [ ] TRRS side cutout in FreeCAD/Fusion 360
- [ ] ZMK firmware config (wireless, SuperMini nRF52840)
- [ ] Order components: PJ-320A TRRS jack, 3×6mm reset switch, M2 screws + standoffs

## After Ergogen: Next Steps

1. `pnpm run build` → open `output/pcbs/hasbii_pcb.kicad_pcb` in KiCad
2. Route traces manually (or use freerouter)
3. Run DRC — expect possible minor pad-edge warnings on outer switches
4. Export Gerbers → fabricate at JLCPCB or PCBWay
