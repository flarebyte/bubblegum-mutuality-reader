import { stringToNTriples, Triple } from 'ntriples-collection';
import { Release } from './release';

type ReleaseFetcher = (release: Release) => Promise<string>;
type FileFetcher = (filePath: string) => Promise<string>;

/**
 * Fetch a dependency
 *
 * @param releaseFetcher a downloader for the content
 * @param dependency the release to download
 * @returns a list of triples
 */
export async function fetchDependency(
  releaseFetcher: ReleaseFetcher,
  dependency: Release
): Promise<ReadonlyArray<Triple>> {
  const triples = await releaseFetcher(dependency);
  return stringToNTriples(triples);
}

/**
 * Fetch a list of dependencies
 *
 * @param releaseFetcher a downloader for the content
 * @param dependencies the list of releases to download
 * @returns a list of triples
 */
export async function fetchDependencies(
  releaseFetcher: ReleaseFetcher,
  dependencies: ReadonlyArray<Release>
): Promise<ReadonlyArray<Triple>> {
  const fetches = dependencies.map(d => fetchDependency(releaseFetcher, d));
  const results = Promise.all(fetches).then(
    listInList => listInList.reduce((a, b) => a.concat(b), []) // flatten
  );
  return results;
}

/**
 * Fetch triples by a path or uri
 *
 * @param fileFetcher a downloader for the file
 * @param path the file path or uri for the file
 * @returns a list of triples
 */
export async function fetchTriplesByPath(
  fileFetcher: FileFetcher,
  path: string
): Promise<ReadonlyArray<Triple>> {
  const triples = await fileFetcher(path);
  return stringToNTriples(triples);
}

/**
 * Fetch triples by a list of paths or uris
 *
 * @param fileFetcher a downloader for the file
 * @param paths the list of paths
 * @returns a list of triples
 */
export async function fetchTriplesByPaths(
  fileFetcher: FileFetcher,
  paths: ReadonlyArray<string>
): Promise<ReadonlyArray<Triple>> {
  const fetches = paths.map(d => fetchTriplesByPath(fileFetcher, d));
  const results = Promise.all(fetches).then(
    listInList => listInList.reduce((a, b) => a.concat(b), []) // flatten
  );
  return results;
}
