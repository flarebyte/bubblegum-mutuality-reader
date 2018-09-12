"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-expression-statement
const ava_1 = require("ava");
const fetcher_1 = require("./fetcher");
const release_1 = require("./release");
const dump1 = '<http://a.com/a> <http://purl.org/dc/terms/title> "dump1" .';
const dump2 = '<http://a.com/a> <http://purl.org/dc/terms/title> "dump2" .';
const tripleDump1 = {
    object: '"dump1"',
    predicate: 'http://purl.org/dc/terms/title',
    subject: 'http://a.com/a'
};
const tripleDump2 = {
    object: '"dump2"',
    predicate: 'http://purl.org/dc/terms/title',
    subject: 'http://a.com/a'
};
const mockReleaseFetcher = (release) => {
    switch (release.dataDump) {
        case 'http://site.com/dump1.nt':
            return Promise.resolve(dump1);
        case 'http://site.com/dump2.nt':
            return Promise.resolve(dump2);
        default:
            return Promise.reject('no datadump');
    }
};
const mockFileFetcher = (path) => {
    switch (path) {
        case 'a/b':
            return Promise.resolve(dump1);
        case 'c/d':
            return Promise.resolve(dump2);
        default:
            return Promise.reject('no datadump');
    }
};
const dependency1 = {
    audiences: ['http://site.com/all-ages-uk', 'http://site.com/all-ages-us'],
    created: '2008-09-15T15:53:00+05:00',
    dataDump: 'http://site.com/dump1.nt',
    feature: release_1.DependencyFeature.NTriples,
    identifier: 'http://one.example/dep1',
    language: 'en-GB',
    revision: '1.0',
    subjects: ['http://dbpedia.org/resource/Computer_science'],
    uriSpace: 'http://site.com/space1'
};
const dependency2 = {
    audiences: ['http://site.com/all-ages-uk'],
    created: '2008-09-15T15:53:00+05:00',
    dataDump: 'http://site.com/dump2.nt',
    feature: release_1.DependencyFeature.NTriples,
    identifier: 'http://one.example/dep2',
    language: 'en-GB',
    revision: '1.0',
    subjects: ['http://dbpedia.org/resource/Computer_science'],
    uriSpace: 'http://site.com/space1'
};
ava_1.test('fetchDependency should fetch a given dependency', async (t) => {
    t.deepEqual(await fetcher_1.fetchDependency(mockReleaseFetcher, dependency1), [
        tripleDump1
    ]);
});
ava_1.test('fetchMutuality should fetch all triples which are a dependencies', async (t) => {
    t.deepEqual(await fetcher_1.fetchDependencies(mockReleaseFetcher, [dependency1, dependency2]), [tripleDump1, tripleDump2]);
});
ava_1.test('fetchTriplesByPath should fetch a given path', async (t) => {
    t.deepEqual(await fetcher_1.fetchTriplesByPath(mockFileFetcher, 'a/b'), [tripleDump1]);
});
ava_1.test('fetchTriplesByPaths should fetch multiple paths', async (t) => {
    t.deepEqual(await fetcher_1.fetchTriplesByPaths(mockFileFetcher, ['a/b', 'c/d']), [
        tripleDump1,
        tripleDump2
    ]);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmV0Y2hlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9mZXRjaGVyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBeUM7QUFDekMsNkJBQTJCO0FBQzNCLHVDQUttQjtBQUNuQix1Q0FBdUQ7QUFFdkQsTUFBTSxLQUFLLEdBQUcsNkRBQTZELENBQUM7QUFDNUUsTUFBTSxLQUFLLEdBQUcsNkRBQTZELENBQUM7QUFDNUUsTUFBTSxXQUFXLEdBQUc7SUFDbEIsTUFBTSxFQUFFLFNBQVM7SUFDakIsU0FBUyxFQUFFLGdDQUFnQztJQUMzQyxPQUFPLEVBQUUsZ0JBQWdCO0NBQzFCLENBQUM7QUFDRixNQUFNLFdBQVcsR0FBRztJQUNsQixNQUFNLEVBQUUsU0FBUztJQUNqQixTQUFTLEVBQUUsZ0NBQWdDO0lBQzNDLE9BQU8sRUFBRSxnQkFBZ0I7Q0FDMUIsQ0FBQztBQUVGLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxPQUFnQixFQUFFLEVBQUU7SUFDOUMsUUFBUSxPQUFPLENBQUMsUUFBUSxFQUFFO1FBQ3hCLEtBQUssMEJBQTBCO1lBQzdCLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQyxLQUFLLDBCQUEwQjtZQUM3QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDaEM7WUFDRSxPQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDeEM7QUFDSCxDQUFDLENBQUM7QUFFRixNQUFNLGVBQWUsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFO0lBQ3ZDLFFBQVEsSUFBSSxFQUFFO1FBQ1osS0FBSyxLQUFLO1lBQ1IsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2hDLEtBQUssS0FBSztZQUNSLE9BQU8sT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNoQztZQUNFLE9BQU8sT0FBTyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztLQUN4QztBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sV0FBVyxHQUFZO0lBQzNCLFNBQVMsRUFBRSxDQUFDLDZCQUE2QixFQUFFLDZCQUE2QixDQUFDO0lBQ3pFLE9BQU8sRUFBRSwyQkFBMkI7SUFDcEMsUUFBUSxFQUFFLDBCQUEwQjtJQUNwQyxPQUFPLEVBQUUsMkJBQWlCLENBQUMsUUFBUTtJQUNuQyxVQUFVLEVBQUUseUJBQXlCO0lBQ3JDLFFBQVEsRUFBRSxPQUFPO0lBQ2pCLFFBQVEsRUFBRSxLQUFLO0lBQ2YsUUFBUSxFQUFFLENBQUMsOENBQThDLENBQUM7SUFDMUQsUUFBUSxFQUFFLHdCQUF3QjtDQUNuQyxDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQVk7SUFDM0IsU0FBUyxFQUFFLENBQUMsNkJBQTZCLENBQUM7SUFDMUMsT0FBTyxFQUFFLDJCQUEyQjtJQUNwQyxRQUFRLEVBQUUsMEJBQTBCO0lBQ3BDLE9BQU8sRUFBRSwyQkFBaUIsQ0FBQyxRQUFRO0lBQ25DLFVBQVUsRUFBRSx5QkFBeUI7SUFDckMsUUFBUSxFQUFFLE9BQU87SUFDakIsUUFBUSxFQUFFLEtBQUs7SUFDZixRQUFRLEVBQUUsQ0FBQyw4Q0FBOEMsQ0FBQztJQUMxRCxRQUFRLEVBQUUsd0JBQXdCO0NBQ25DLENBQUM7QUFFRixVQUFJLENBQUMsaURBQWlELEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBQyxFQUFFO0lBQ2hFLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSx5QkFBZSxDQUFDLGtCQUFrQixFQUFFLFdBQVcsQ0FBQyxFQUFFO1FBQ2xFLFdBQVc7S0FDWixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQztBQUVILFVBQUksQ0FBQyxrRUFBa0UsRUFBRSxLQUFLLEVBQUMsQ0FBQyxFQUFDLEVBQUU7SUFDakYsQ0FBQyxDQUFDLFNBQVMsQ0FDVCxNQUFNLDJCQUFpQixDQUFDLGtCQUFrQixFQUFFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUFDLEVBQ3ZFLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxDQUMzQixDQUFDO0FBQ0osQ0FBQyxDQUFDLENBQUM7QUFFSCxVQUFJLENBQUMsOENBQThDLEVBQUUsS0FBSyxFQUFDLENBQUMsRUFBQyxFQUFFO0lBQzdELENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSw0QkFBa0IsQ0FBQyxlQUFlLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO0FBQy9FLENBQUMsQ0FBQyxDQUFDO0FBRUgsVUFBSSxDQUFDLGlEQUFpRCxFQUFFLEtBQUssRUFBQyxDQUFDLEVBQUMsRUFBRTtJQUNoRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sNkJBQW1CLENBQUMsZUFBZSxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDdEUsV0FBVztRQUNYLFdBQVc7S0FDWixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9