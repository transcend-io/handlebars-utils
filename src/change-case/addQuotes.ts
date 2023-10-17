/**
 * Add single quotes around an item
 *
 * @param  str - The word to add quotes to
 * @returns The word with quotes around it
 */
export default function addQuotes(str: string): string {
  return str.startsWith("'") && str.endsWith("'") ? str : `'${str}'`;
}
