import pluralize from 'pluralize';

import { invert } from '@transcend-io/type-utils';

export { pluralize };

/**
 * Custom defined words to map between singular and plural
 */
export const CUSTOM_WORDS: { [key in string]: string } = {
  alexaAnalytics: 'alexaAnalyticses',
  amazonPayments: 'amazonPaymentses',
  aws: 'awses',
  contactUs: 'contactUses',
  dataPractices: 'dataPracticeses',
  googleAnalytics: 'googleAnalyticses',
  promptAPerson: 'promptAPersons',
  PromptAPerson: 'PromptAPersons',
  quickBooks: 'quickBookses',
};

/**
 * Plural to singular case
 */
export const INVERTED_CUSTOM_WORDS = invert(CUSTOM_WORDS);

/**
 * Pluralize a word
 *
 * @param word - The word to pluralize
 * @returns The pluralized word
 */
export function pluralCase(word: string): string {
  return INVERTED_CUSTOM_WORDS[word]
    ? word
    : CUSTOM_WORDS[word] || pluralize(word);
}

/**
 * Singular tense
 *
 * @param word - The word to change case of
 * @returns The word in singular case
 */
export function singularCase(word: string): string {
  return CUSTOM_WORDS[word]
    ? word
    : INVERTED_CUSTOM_WORDS[word] || pluralize.singular(word);
}
