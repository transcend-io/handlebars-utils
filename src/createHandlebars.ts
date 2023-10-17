import Handlebars from 'handlebars';

import { ObjByString } from '@transcend-io/type-utils';

import { cases } from './change-case';

// TODO: https://transcend.height.app/T-30349 - de-duplicate this with cli and node-util
export { Handlebars };

/**
 * Given a file name, return the desirable name for a handlebars extension
 * The extension is in camel case without the file suffix, and all slashes
 * and spaces get removed
 *
 * @param fileName - Filename
 * @param extension - File extension
 * @returns Partial name
 */
export function getPartialNameFromFileName(
  fileName: string,
  extension = 'hbs',
): string {
  return cases.camelCase(
    fileName
      .slice(0, fileName.length - `.${extension}`.length)
      .split('/')
      .pop(),
  );
}

/**
 * Input for creating a handlebars instance
 */
export interface HandlebarsInput {
  /** The handlebars templates */
  templates?: {
    /** Name of template */
    name: string;
    /** Content of template */
    content: string;
  }[];
  /** Helper functions to register */
  helpers?: { [name in string]: Handlebars.HelperDelegate };
}

/**
 * Default helper functions to register
 */
export const DEFAULT_HANDLEBARS_HELPERS = {
  ...cases,
  /**
   * Pad with back slashes
   *
   * @param word - The word to pad
   * @returns Slashes the length of the word
   */
  pad: (word: string) => '/'.repeat(word.length),
  /**
   * Render if equality is met
   *
   * @param this - This context
   * @param arg1 - First arg
   * @param arg2 - Second arg
   * @param options - Handlebars options
   * @returns The template if args are equal
   */
  ifEqual: function ifNotEqual<T>(
    this: T,
    arg1: string,
    arg2: string,
    options: Handlebars.HelperOptions,
  ) {
    return arg1 === arg2 ? options.fn(this) : options.inverse(this);
  },
  /**
   * Render if equality is not met
   *
   * @param this - This context
   * @param arg1 - First arg
   * @param arg2 - Second arg
   * @param options - Handlebars options
   * @returns The template if args are not equal
   */
  ifNotEqual: function ifNotEqual<T>(
    this: T,
    arg1: string,
    arg2: string,
    options: Handlebars.HelperOptions,
  ) {
    return arg1 !== arg2 ? options.fn(this) : options.inverse(this);
  },
  /**
   * Uri encode a string
   *
   * @param word - The word to encode
   * @returns The URI encoded word
   */
  safeString: (word: string) => encodeURI(word),
  /**
   * Get the length of a list
   *
   * @param list - The list in question
   * @returns The length of the list
   */
  listLen: <T>(list: T[]) => list?.length,
  /**
   * Convert a JSON object to string
   *
   * @param obj - The object to convert
   * @returns The object stringified
   */
  toJSON: <T extends ObjByString>(obj: T) =>
    JSON.stringify(obj, (k, v) => {
      // Necessary, else functions don't get written.
      if (typeof v === 'function') {
        return v.toString();
      }
      return v;
    }),
  /**
   * Compares two string to see if they're sorted
   *
   * @param arg1 - Some string
   * @param arg2 - Some other string to compare against
   * @param options - Handlebar options
   * @returns boolean
   */
  ifSorted: function ifSorted(
    arg1: string,
    arg2: string,
    options: Handlebars.HelperOptions,
  ) {
    return arg1 <= arg2 ? options.fn(this) : options.inverse(this);
  },
};

/**
 * Create an instance of handlebars, loading partial templates and adding utilities
 *
 * @param input - Input to define the handlebars instance
 * @returns The instantiated instance of handlebars
 */
export function createHandlebarsWithHelpers({
  templates = [],
  helpers = {},
}: HandlebarsInput = {}): typeof Handlebars {
  if (templates.length > 0) {
    // Register partials
    templates.forEach(({ name, content }) =>
      Handlebars.registerPartial(name, content),
    );
  }

  // Register helpers
  Object.entries({
    ...DEFAULT_HANDLEBARS_HELPERS,
    ...helpers,
  }).forEach(([key, func]) => Handlebars.registerHelper(key, func));
  return Handlebars;
}
