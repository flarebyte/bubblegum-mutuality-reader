import { Mutuality } from './mutuality';
/**
 * Parses a mutuality content provided as n-triples
 *
 * ### Example
 * ```js
 * parseMutuality('en', ntripleStringContent)
 * // => Mutuality object
 * ```
 *
 * @param language the language for all the descriptions
 * @param content the content in the n-triples format
 * @returns a Mutuality object
 */
export default function parseMutuality(language: string, content: string): Mutuality;
