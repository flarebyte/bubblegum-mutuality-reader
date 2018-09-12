import { Triple } from 'ntriples-collection';
import { Release } from './release';
declare type ReleaseFetcher = (release: Release) => Promise<string>;
declare type FileFetcher = (filePath: string) => Promise<string>;
/**
 * Fetch a dependency
 *
 * @param releaseFetcher a downloader for the content
 * @param dependency the release to download
 * @returns a list of triples
 */
export declare function fetchDependency(releaseFetcher: ReleaseFetcher, dependency: Release): Promise<ReadonlyArray<Triple>>;
/**
 * Fetch a list of dependencies
 *
 * @param releaseFetcher a downloader for the content
 * @param dependencies the list of releases to download
 * @returns a list of triples
 */
export declare function fetchDependencies(releaseFetcher: ReleaseFetcher, dependencies: ReadonlyArray<Release>): Promise<ReadonlyArray<Triple>>;
/**
 * Fetch triples by a path or uri
 *
 * @param fileFetcher a downloader for the file
 * @param path the file path or uri for the file
 * @returns a list of triples
 */
export declare function fetchTriplesByPath(fileFetcher: FileFetcher, path: string): Promise<ReadonlyArray<Triple>>;
/**
 * Fetch triples by a list of paths or uris
 *
 * @param fileFetcher a downloader for the file
 * @param paths the list of paths
 * @returns a list of triples
 */
export declare function fetchTriplesByPaths(fileFetcher: FileFetcher, paths: ReadonlyArray<string>): Promise<ReadonlyArray<Triple>>;
export {};
