/**
 * After a key is rotated, the old key keeps working for this long so customers can
 * roll the new one out across their servers. Agreed in the API terms; do not shorten
 * it without legal.
 */
export const KEY_ROTATION_OVERLAP_MS = 24 * 60 * 60 * 1000;

export const MAX_KEYS_PER_ACCOUNT = 10;
