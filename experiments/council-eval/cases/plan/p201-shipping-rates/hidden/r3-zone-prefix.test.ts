import { expect, test } from "bun:test";
import * as shipping from "../src/shipping";

const parcel = { weightGrams: 1_000, lengthCm: 10, widthCm: 10, heightCm: 10 };
const zone = (zip: string) => shipping.quoteShipping(parcel, zip).zone;

test("the most specific ZIP prefix decides the zone", () => {
  expect(zone("96813")).toBe(8);
  expect(zone("99501")).toBe(8);
  expect(zone("00601")).toBe(8);
  expect(zone("90210")).toBe(5);
  expect(zone("01002")).toBe(4);
  expect(zone("43215")).toBe(1);
});
