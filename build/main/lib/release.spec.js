"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-expression-statement
const ava_1 = require("ava");
const release_1 = require("./release");
const release1 = {
    audiences: ['http://site.com/all-ages-uk', 'http://site.com/all-ages-us'],
    created: '2008-09-15T15:53:00+05:00',
    dataDump: 'http://site.com/dump.n3.gz',
    feature: release_1.DependencyFeature.NTriples,
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
    feature: release_1.DependencyFeature.NTriples,
    identifier: 'http://one.example/release2',
    language: 'en-GB',
    revision: '1.0',
    subjects: ['http://dbpedia.org/resource/Black_magic'],
    uriSpace: 'http://site.com/release2/en'
};
ava_1.test('bySubjects should filter by subject', t => {
    const actual = [release1, release2].filter(release_1.bySubjects(['http://dbpedia.org/resource/Computer_science']));
    t.deepEqual(actual, [release1]);
});
ava_1.test('byAudience should filter by audience', t => {
    const actual = [release1, release2].filter(release_1.byAudience('http://dbpedia.org/resource/Computer_science'));
    t.deepEqual(actual, [release1]);
});
ava_1.test('asFeature should support N3', t => {
    t.deepEqual(release_1.asFeature('http://www.w3.org/ns/formats/N3'), release_1.DependencyFeature.N3);
});
ava_1.test('asFeature should support default', t => {
    t.deepEqual(release_1.asFeature('anything'), release_1.DependencyFeature.Unknown);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsZWFzZS5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9yZWxlYXNlLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5Q0FBeUM7QUFDekMsNkJBQTJCO0FBQzNCLHVDQU1tQjtBQUVuQixNQUFNLFFBQVEsR0FBWTtJQUN4QixTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSw2QkFBNkIsQ0FBQztJQUN6RSxPQUFPLEVBQUUsMkJBQTJCO0lBQ3BDLFFBQVEsRUFBRSw0QkFBNEI7SUFDdEMsT0FBTyxFQUFFLDJCQUFpQixDQUFDLFFBQVE7SUFDbkMsVUFBVSxFQUFFLDRCQUE0QjtJQUN4QyxRQUFRLEVBQUUsT0FBTztJQUNqQixRQUFRLEVBQUUsS0FBSztJQUNmLFFBQVEsRUFBRTtRQUNSLDhDQUE4QztRQUM5Qyx3Q0FBd0M7S0FDekM7SUFDRCxRQUFRLEVBQUUsNkJBQTZCO0NBQ3hDLENBQUM7QUFFRixNQUFNLFFBQVEsR0FBWTtJQUN4QixTQUFTLEVBQUUsQ0FBQyw2QkFBNkIsQ0FBQztJQUMxQyxPQUFPLEVBQUUsMkJBQTJCO0lBQ3BDLFFBQVEsRUFBRSw2QkFBNkI7SUFDdkMsT0FBTyxFQUFFLDJCQUFpQixDQUFDLFFBQVE7SUFDbkMsVUFBVSxFQUFFLDZCQUE2QjtJQUN6QyxRQUFRLEVBQUUsT0FBTztJQUNqQixRQUFRLEVBQUUsS0FBSztJQUNmLFFBQVEsRUFBRSxDQUFDLHlDQUF5QyxDQUFDO0lBQ3JELFFBQVEsRUFBRSw2QkFBNkI7Q0FDeEMsQ0FBQztBQUVGLFVBQUksQ0FBQyxxQ0FBcUMsRUFBRSxDQUFDLENBQUMsRUFBRTtJQUM5QyxNQUFNLE1BQU0sR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQ3hDLG9CQUFVLENBQUMsQ0FBQyw4Q0FBOEMsQ0FBQyxDQUFDLENBQzdELENBQUM7SUFDRixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxVQUFJLENBQUMsc0NBQXNDLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDL0MsTUFBTSxNQUFNLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUN4QyxvQkFBVSxDQUFDLDhDQUE4QyxDQUFDLENBQzNELENBQUM7SUFDRixDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDbEMsQ0FBQyxDQUFDLENBQUM7QUFFSCxVQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQyxDQUFDLEVBQUU7SUFDdEMsQ0FBQyxDQUFDLFNBQVMsQ0FDVCxtQkFBUyxDQUFDLGlDQUFpQyxDQUFDLEVBQzVDLDJCQUFpQixDQUFDLEVBQUUsQ0FDckIsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDO0FBRUgsVUFBSSxDQUFDLGtDQUFrQyxFQUFFLENBQUMsQ0FBQyxFQUFFO0lBQzNDLENBQUMsQ0FBQyxTQUFTLENBQUMsbUJBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRSwyQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUNoRSxDQUFDLENBQUMsQ0FBQyJ9