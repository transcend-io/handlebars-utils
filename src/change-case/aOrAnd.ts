/**
 * Determine whether to use a or an depending on whether word begins with vowel
 *
 * @param str - The string to check
 * @returns A if str does not begin with vowel and an if it does
 */
export default function aOrAnd(str: string): string {
  return ['a', 'e', 'i', 'o', 'u', 'y'].includes(str.toLowerCase()[0])
    ? 'an'
    : 'a';
}
