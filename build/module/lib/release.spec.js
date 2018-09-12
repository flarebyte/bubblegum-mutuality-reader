// tslint:disable:no-expression-statement
import { test } from 'ava';
import { asFeature, byAudience, bySubjects, DependencyFeature } from './release';
const release1 = {
    audiences: ['http://site.com/all-ages-uk', 'http://site.com/all-ages-us'],
    created: '2008-09-15T15:53:00+05:00',
    dataDump: 'http://site.com/dump.n3.gz',
    feature: DependencyFeature.NTriples,
    identifier: 'http://one.example/release',
    language: 'en-GB',
    revision: '1.0',
    subjects: [
        'http://dbpedia.org/resource/Computer_science',
        'http://dbpedia.org/resource/Technology'
    ],
    uriSpace: 'http://site.com/release1/en'
};
const release2 = {
    audiences: ['http://site.com/all-ages-us'],
    created: '2008-09-15T15:53:00+05:00',
    dataDump: 'http://site.com/dump2.n3.gz',
    feature: DependencyFeature.NTriples,
    identifier: 'http://one.example/release2',
    language: 'en-GB',
    revision: '1.0',
    subjects: ['http://dbpedia.org/resource/Black_magic'],
    uriSpace: 'http://site.com/release2/en'
};
test('bySubjects should filter by subject', t => {
    const actual = [release1, release2].filter(bySubjects(['http://dbpedia.org/resource/Computer_science']));
    t.deepEqual(actual, [release1]);
});
test('byAudience should filter by audience', t => {
    const actual = [release1, release2].filter(byAudience('http://dbpedia.org/resource/Computer_science'));
    t.deepEqual(actual, [release1]);
});
test('asFeature should support N3', t => {
    t.deepEqual(asFeature('http://www.w3.org/ns/formats/N3'), DependencyFeature.N3);
});
test('asFeature should support default', t => {
    t.deepEqual(asFeature('anything'), DependencyFeature.Unknown);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsZWFzZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWxlYXNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUNBQXlDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDM0IsT0FBTyxFQUNMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNWLGlCQUFpQixFQUVsQixNQUFNLFdBQVcsQ0FBQztBQUVuQixNQUFNLFFBQVEsR0FBWTtJQUN4QixTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSw2QkFBNkIsQ0FBQztJQUN6RSxPQUFPLEVBQUUsMkJBQTJCO0lBQ3BDLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLFFBQVE7SUFDbkMsVUFBVSxFQUFFLDRCQUE0QjtJQUN4QyxRQUFRLEVBQUUsT0FBTztJQUNqQixRQUFRLEVBQUUsS0FBSztJQUNmLFFBQVEsRUFBRTtRQUNSLDhDQUE4QztRQUM5Qyx3Q0FBd0M7S0FDekM7SUFDRCxRQUFRLEVBQUUsNkJBQTZCO0NBQ3hDLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBWTtJQUN4QixTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztJQUMxQyxPQUFPLEVBQUUsMkJBQTJCO0lBQ3BDLFFBQVEsRUFBRSw2QkFBNkI7SUFDdkMsT0FBTyxFQUFFLGlCQUFpQixDQUFDLFFBQVE7SUFDbkMsVUFBVSxFQUFFLDZCQUE2QjtJQUN6QyxRQUFRLEVBQUUsT0FBTztJQUNqQixRQUFRLEVBQUUsS0FBSztJQUNmLFFBQVEsRUFBRSxDQUFDLHlDQUF5QyxDQUFDO0lBQ3JELFFBQVEsRUFBRSw2QkFBNkI7Q0FDeEMsQ0FBQztBQUVGLElBQUksQ0FBQyxxQ0FBcUMsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUM5QyxNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQ3hDLFVBQVUsQ0FBQyxDQUFDLDhDQUE4QyxDQUFDLENBQUMsQ0FDN0QsQ0FBQztJQUNGLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztBQUNsQyxDQUFDLENBQUMsQ0FBQztBQUVILElBQUksQ0FBQyxzQ0FBc0MsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUMvQyxNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQ3hDLFVBQVUsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUMzRCxDQUFDO0lBQ0YsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLDZCQUE2QixFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQ3RDLENBQUMsQ0FBQyxTQUFTLENBQ1QsU0FBUyxDQUFDLGlDQUFpQyxDQUFDLEVBQzVDLGlCQUFpQixDQUFDLEVBQUUsQ0FDckIsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBRUgsSUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzNDLENBQUMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxFQUFFLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2hFLENBQUMsQ0FBQyxDQUFDIn0=