import debug from "debug";
import { slugify } from "../shared/pathHelpers.ts";

export const makeLogs = (suffix: string) =>
  debug("dans-blog:" + slugify(suffix));
