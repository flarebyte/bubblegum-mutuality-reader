/** https://www.w3.org/TR/void/#features */
declare enum DependencyFeature {
    N3 = "http://www.w3.org/ns/formats/N3",
    NTriples = "http://www.w3.org/ns/formats/N-Triples",
    Turtle = "http://www.w3.org/ns/formats/Turtle",
    Unknown = ""
}
/**
 * Convert a uri to a DependencyFeature object
 *
 * @param value a url
 * @returns a DependencyFeature
 */
declare const asFeature: (value: string) => DependencyFeature;
interface Release {
    readonly identifier: string;
    readonly created: string;
    readonly feature: DependencyFeature;
    readonly language: string;
    readonly uriSpace: string /** void:uriSpace */;
    readonly dataDump: string /** void:dataDump */;
    readonly revision: string;
    readonly subjects: ReadonlyArray<string> /** dcterms:subject such as http://dbpedia.org/resource/Computer_science */;
    readonly audiences: ReadonlyArray<string> /** dcterms:audience such as http://site.com/all-ages-uk */;
}
declare type ReleaseFilter = (release: Release) => boolean;
/**
 * Filter a list of releases or dependencies by audience
 *
 * ### Example
 * ```js
 * dependencies.filter(byAudience('http://dbpedia.org/resource/Adults'))
 * // => dependencies
 * ```
 *
 * @param audience a specific audience
 * @returns releases
 */
declare function byAudience(audience: string): ReleaseFilter;
/**
 * Filter a list of releases or dependencies by subjects
 *
 * ### Example
 * ```js
 * dependencies.filter(bySubjects(['http://dbpedia.org/resource/Paris']))
 * // => dependencies
 * ```
 *
 * @param subjects a list of subjects
 * @returns releases
 */
declare function bySubjects(subjects: ReadonlyArray<string>): ReleaseFilter;
export { asFeature, Release, DependencyFeature, byAudience, bySubjects };
