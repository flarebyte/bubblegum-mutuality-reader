import { stringToNTriples } from 'ntriples-collection';
/**
 * Fetch a dependency
 *
 * @param releaseFetcher a downloader for the content
 * @param dependency the release to download
 * @returns a list of triples
 */
export async function fetchDependency(releaseFetcher, dependency) {
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
export async function fetchDependencies(releaseFetcher, dependencies) {
    const fetches = dependencies.map(d => fetchDependency(releaseFetcher, d));
    const results = Promise.all(fetches).then(listInList => listInList.reduce((a, b) => a.concat(b), []) // flatten
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
export async function fetchTriplesByPath(fileFetcher, path) {
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
export async function fetchTriplesByPaths(fileFetcher, paths) {
    const fetches = paths.map(d => fetchTriplesByPath(fileFetcher, d));
    const results = Promise.all(fetches).then(listInList => listInList.reduce((a, b) => a.concat(b), []) // flatten
    );
    return results;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmV0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsZ0JBQWdCLEVBQVUsTUFBTSxxQkFBcUIsQ0FBQztBQU0vRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsS0FBSywwQkFDVixjQUE4QixFQUM5QixVQUFtQjtJQUVuQixNQUFNLE9BQU8sR0FBRyxNQUFNLGNBQWMsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNqRCxPQUFPLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsS0FBSyw0QkFDVixjQUE4QixFQUM5QixZQUFvQztJQUVwQyxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN2QyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVU7S0FDdEUsQ0FBQztJQUNGLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFFRDs7Ozs7O0dBTUc7QUFDSCxNQUFNLENBQUMsS0FBSyw2QkFDVixXQUF3QixFQUN4QixJQUFZO0lBRVosTUFBTSxPQUFPLEdBQUcsTUFBTSxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsT0FBTyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNuQyxDQUFDO0FBRUQ7Ozs7OztHQU1HO0FBQ0gsTUFBTSxDQUFDLEtBQUssOEJBQ1YsV0FBd0IsRUFDeEIsS0FBNEI7SUFFNUIsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN2QyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVU7S0FDdEUsQ0FBQztJQUNGLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMifQ==