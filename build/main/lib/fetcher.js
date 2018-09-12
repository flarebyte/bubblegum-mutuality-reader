"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ntriples_collection_1 = require("ntriples-collection");
/**
 * Fetch a dependency
 *
 * @param releaseFetcher a downloader for the content
 * @param dependency the release to download
 * @returns a list of triples
 */
async function fetchDependency(releaseFetcher, dependency) {
    const triples = await releaseFetcher(dependency);
    return ntriples_collection_1.stringToNTriples(triples);
}
exports.fetchDependency = fetchDependency;
/**
 * Fetch a list of dependencies
 *
 * @param releaseFetcher a downloader for the content
 * @param dependencies the list of releases to download
 * @returns a list of triples
 */
async function fetchDependencies(releaseFetcher, dependencies) {
    const fetches = dependencies.map(d => fetchDependency(releaseFetcher, d));
    const results = Promise.all(fetches).then(listInList => listInList.reduce((a, b) => a.concat(b), []) // flatten
    );
    return results;
}
exports.fetchDependencies = fetchDependencies;
/**
 * Fetch triples by a path or uri
 *
 * @param fileFetcher a downloader for the file
 * @param path the file path or uri for the file
 * @returns a list of triples
 */
async function fetchTriplesByPath(fileFetcher, path) {
    const triples = await fileFetcher(path);
    return ntriples_collection_1.stringToNTriples(triples);
}
exports.fetchTriplesByPath = fetchTriplesByPath;
/**
 * Fetch triples by a list of paths or uris
 *
 * @param fileFetcher a downloader for the file
 * @param paths the list of paths
 * @returns a list of triples
 */
async function fetchTriplesByPaths(fileFetcher, paths) {
    const fetches = paths.map(d => fetchTriplesByPath(fileFetcher, d));
    const results = Promise.all(fetches).then(listInList => listInList.reduce((a, b) => a.concat(b), []) // flatten
    );
    return results;
}
exports.fetchTriplesByPaths = fetchTriplesByPaths;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZmV0Y2hlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDZEQUErRDtBQU0vRDs7Ozs7O0dBTUc7QUFDSSxLQUFLLDBCQUNWLGNBQThCLEVBQzlCLFVBQW1CO0lBRW5CLE1BQU0sT0FBTyxHQUFHLE1BQU0sY0FBYyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ2pELE9BQU8sc0NBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQU5ELDBDQU1DO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksS0FBSyw0QkFDVixjQUE4QixFQUM5QixZQUFvQztJQUVwQyxNQUFNLE9BQU8sR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFFLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxDQUN2QyxVQUFVLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVU7S0FDdEUsQ0FBQztJQUNGLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFURCw4Q0FTQztBQUVEOzs7Ozs7R0FNRztBQUNJLEtBQUssNkJBQ1YsV0FBd0IsRUFDeEIsSUFBWTtJQUVaLE1BQU0sT0FBTyxHQUFHLE1BQU0sV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLE9BQU8sc0NBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDbkMsQ0FBQztBQU5ELGdEQU1DO0FBRUQ7Ozs7OztHQU1HO0FBQ0ksS0FBSyw4QkFDVixXQUF3QixFQUN4QixLQUE0QjtJQUU1QixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbkUsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3ZDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsVUFBVTtLQUN0RSxDQUFDO0lBQ0YsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQVRELGtEQVNDIn0=