import {
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from 'change-case';
import camelCase from 'lodash/camelCase';
import paramCase from 'lodash/kebabCase';
import lowerCase from 'lodash/lowerCase';
import lowerFirst from 'lodash/lowerFirst';
import titleCase from 'lodash/startCase';
import upperCase from 'lodash/upperCase';
import upperFirst from 'lodash/upperFirst';

import addQuotes from './addQuotes';
import { endsWith, startsWith } from './conditionalAdd';
import { pluralCase, singularCase } from './pluralization';

/**
 * Helper functions that act like the `change-case` module
 */
const CASE_CONVERSIONS = {
  /**
   * Split by command and add quote around each word
   *
   * @param word - The word to change case of
   * @returns The word in csv string case
   */
  csvStringCase: (word: string): string =>
    word
      .split(',')
      .map((item) => addQuotes(item.trim()))
      .join(', '),
  /** Ensure ends with period and starts with capital */
  periodCase: endsWith('.', upperFirst),
  /** Used for regexes */
  regexCase: endsWith('_REGEX', constantCase),
  /** Used for selectors on frontend */
  selectorCase: startsWith('select', pascalCase),
  /** Used for frontend validators */
  validateCase: startsWith('VALIDATE_', constantCase),
  /**
   * Identity function
   *
   * @param word - The word
   * @returns The word
   */
  plainCase: (word: string) => word,
  // pluralize
  pluralCase,
  singularCase,
  /**
   * Pascal and plural
   *
   * @param word - The word to change case of
   * @returns The word in pluralized in pascal case
   */
  pascalPluralCase: (word: string): string => pascalCase(pluralCase(word)),
  // lodash
  lowerCase,
  paramCase,
  lowerFirst,
  camelCase,
  snakeCase,
  titleCase,
  upperCase,
  upperFirst,
  kebabCase: paramCase,
  // Change Case
  constantCase,
  dotCase,
  headerCase,
  noCase,
  pascalCase,
  pathCase,
  sentenceCase,
  capitalCase,
};
export default CASE_CONVERSIONS;
