import { apply } from '@transcend-io/type-utils';

import cases from './cases';
import type { CaseConversion } from './types';

/**
 * A word in every casing
 */
export type ChangedCase = { [conversionName in keyof typeof cases]: string };

/**
 * Creates a utility that can easily transform a word to different casings
 *
 * @param word - The word to transform
 * @returns The word in a variety of cases
 */
export function createCaseTransformer(word: string): ChangedCase {
  return apply(cases, (func) => func(word));
}

/**
 * If a case function is provided it will be applied.
 * If a string is provided, it will attempt to lookup the case function in `cases`.
 *
 * @throws {Error} If the case function does not exist
 * @param word - The word to set the case of
 * @param transform - The case transformation function to apply
 * @returns The word transformed to the proper case
 */
export function transformCase(
  word: string,
  transform: keyof typeof cases | CaseConversion,
): string {
  // If no transformation provided, simply return the word
  if (!transform) {
    return word;
  }

  // If a function was provided, apply it
  if (typeof transform === 'function') {
    return transform(word);
  }

  // Check if cases has the function
  const caseTransform = cases[transform];

  // Apply the case transformation
  return caseTransform(word);
}
