import type { CaseConversion } from './types';

/**
 * Return a case transformation function that ensures a string ends with another string
 *
 * @param endOfWord - The expected endsWith of the word
 * @param convertWord - A case conversion to apply to word before checking
 * @returns The case conversion function
 */
export function endsWith(
  endOfWord: string,
  convertWord: CaseConversion = (x) => x,
): CaseConversion {
  return (word: string): string => {
    const convertedWord = convertWord(word);
    return convertedWord.endsWith(endOfWord)
      ? convertedWord
      : `${convertedWord}${endOfWord}`;
  };
}

/**
 * Return a case transformation function that ensures a string starts with another string
 *
 * @param startOfWord - The expected startsWith of the word
 * @param convertWord - A case conversion to apply to word before checking
 * @returns The case conversion function
 */
export function startsWith(
  startOfWord: string,
  convertWord: CaseConversion = (x) => x,
): CaseConversion {
  return (word: string): string => {
    const convertedWord = convertWord(word);
    return convertedWord.startsWith(startOfWord)
      ? convertedWord
      : `${startOfWord}${convertedWord}`;
  };
}
