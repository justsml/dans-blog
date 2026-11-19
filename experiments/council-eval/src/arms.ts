import type { Tier } from "./lib";

/** A lens is the only thing that differs between members of a multi-call arm. */
export type Lens = { kind: "none" } | { kind: "council"; name: string } | { kind: "placebo"; name: string };

export interface ArmSpec {
  id: string;
  tier: Tier;
  /** Lenses for the draft calls. "selection" expands to the family's fixed persona trio. */
  members: Lens[] | "council" | "placebo";
  finalize: "none" | "refine" | "synth";
  /** Cross-vendor: member i runs on the run's provider when true, the other CLI when false. */
  memberHome?: boolean[];
  /** Plan family only: skip planning, the implementer works from the task alone. */
  noPlan?: boolean;
  primary?: boolean;
}

const none: Lens = { kind: "none" };

export const ARMS: Record<string, ArmSpec> = {
  M1: { id: "M1", tier: "mid", members: [none], finalize: "none" },
  F1: { id: "F1", tier: "frontier", members: [none], finalize: "none", primary: true },
  M1R: { id: "M1R", tier: "mid", members: [none], finalize: "refine" },
  M3same: { id: "M3same", tier: "mid", members: [none, none, none], finalize: "synth", primary: true },
  M3style: { id: "M3style", tier: "mid", members: "placebo", finalize: "synth", primary: true },
  M3council: { id: "M3council", tier: "mid", members: "council", finalize: "synth", primary: true },
  F3council: { id: "F3council", tier: "frontier", members: "council", finalize: "synth" },
  X3council: { id: "X3council", tier: "mid", members: "council", finalize: "synth", memberHome: [true, false, true] },
  P0: { id: "P0", tier: "mid", members: [], finalize: "none", noPlan: true },
};

export const TREATMENT = "M3council";
/** Pre-registered primary contrasts, Holm-corrected together. */
export const PRIMARY_CONTRASTS: [string, string][] = [
  ["M3council", "F1"],
  ["M3council", "M3same"],
  ["M3council", "M3style"],
];
export const SECONDARY_CONTRASTS: [string, string][] = [
  ["F3council", "F1"],
  ["M3council", "M1R"],
  ["F1", "M1"],
  ["X3council", "M3council"],
  ["M1", "P0"],
];

export const DEFAULT_ARMS = ["M1", "F1", "M1R", "M3same", "M3style", "M3council"];
