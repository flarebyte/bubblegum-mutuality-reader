// tslint:disable:no-expression-statement
import { test } from 'ava';
import parseMutuality from './mutuality-parser';
import { DependencyFeature } from './release';
const mutualityContent = [
    '<http://one.example/subject1> <http://dublincore.org/documents/2012/06/14/dcmi-terms/description> "some desc"@en .',
    '<http://one.example/subject1> <http://purl.org/dc/terms/title> "some title"@en .',
    '<http://one.example/subject1> <http://usefulinc.com/ns/doap#shortdesc> "short desc"@en .',
    '<http://one.example/subject1> <http://purl.org/dc/elements/1.1/language> "en-GB" .',
    '<http://one.example/subject1> <http://usefulinc.com/ns/doap#homepage> "http://site.com" .',
    '<http://one.example/subject1> <http://purl.org/dc/terms/license> <http://creativecommons.org/licenses/by-nc/3.0/> .',
    '<http://one.example/subject1> <http://creativecommons.org/ns#attributionName> "attr name"@en .',
    '<http://one.example/subject1> <http://creativecommons.org/ns#attributionURL> "http://site.com/attribution" .',
    '<http://one.example/subject1> <http://usefulinc.com/ns/doap#location> "https://github.com/ewilderj/doap.git" .',
    '<http://one.example/subject1> <http://purl.org/dc/terms/created> "2008-09-15T15:53:00+05:00" .',
    '<http://one.example/subject1> <http://purl.org/dc/terms/subject> <http://dbpedia.org/resource/Computer_science> .',
    '<http://one.example/subject1> <http://usefulinc.com/ns/doap#release> <http://one.example/release1> .',
    '<http://one.example/subject1> <http://usefulinc.com/ns/doap#release> <http://one.example/release2> .',
    '<http://one.example/subject1> <http://rdfs.org/ns/void#vocabulary> "http://purl.org/dc/terms/" .',
    '<http://one.example/subject1> <http://rdfs.org/ns/void#vocabulary> "http://rdfs.org/sioc/ns" .',
    '<http://one.example/subject1> <http://rdfs.org/ns/void#uriSpace> "http://one.example/" .',
    '<http://one.example/subject1> <http://purl.org/dc/terms/requires> <http://one.example/dep1> .',
    '<http://one.example/subject1> <http://usefulinc.com/ns/doap#maintainer> <http://one.example/maintainer1> .',
    '<http://one.example/subject1> <http://xmlns.com/foaf/0.1/currentProject> "http://one.example/monsters" .',
    '<http://one.example/subject1> <http://xmlns.com/foaf/0.1/currentProject> "http://one.example/heros" .',
    '<http://one.example/release1> <http://purl.org/dc/terms/created> "2008-09-15T15:53:00+05:00" .',
    '<http://one.example/release1> <http://rdfs.org/ns/void#dataDump> "http://site.com/dump.n3.gz" .',
    '<http://one.example/release1> <http://purl.org/dc/elements/1.1/language> "en-GB" .',
    '<http://one.example/release1> <http://rdfs.org/ns/void#feature> <http://www.w3.org/ns/formats/N-Triples> .',
    '<http://one.example/release1> <http://usefulinc.com/ns/doap#revision> "1.0".',
    '<http://one.example/release1> <http://rdfs.org/ns/void#uriSpace> "http://site.com/release1/en" .',
    '<http://one.example/release1> <http://purl.org/dc/terms/subject> <http://dbpedia.org/resource/Computer_science> .',
    '<http://one.example/release2> <http://purl.org/dc/terms/created> "2008-09-15T15:53:00+05:00" .',
    '<http://one.example/release2> <http://rdfs.org/ns/void#dataDump> "http://site.com/dump2.n3.gz" .',
    '<http://one.example/release2> <http://rdfs.org/ns/void#feature> <http://www.w3.org/ns/formats/N3> .',
    '<http://one.example/release2> <http://usefulinc.com/ns/doap#revision> "2.0".',
    '<http://one.example/release2> <http://purl.org/dc/elements/1.1/language> "en-GB".',
    '<http://one.example/release2> <http://rdfs.org/ns/void#uriSpace> <http://site.com/release2/en> .',
    '<http://one.example/release2> <http://purl.org/dc/terms/subject> <http://dbpedia.org/resource/Computer_science> .',
    '<http://one.example/release2> <http://purl.org/dc/terms/audience> <http://site.com/all-ages-uk> .',
    '<http://one.example/dep1> <http://purl.org/dc/terms/created> "2008-09-15T15:53:00+05:00".',
    '<http://one.example/dep1> <http://rdfs.org/ns/void#dataDump> "http://site.com/dump.n3.gz".',
    '<http://one.example/dep1> <http://rdfs.org/ns/void#feature> <http://www.w3.org/ns/formats/Turtle> .',
    '<http://one.example/dep1> <http://usefulinc.com/ns/doap#revision> "1.0".',
    '<http://one.example/dep1> <http://purl.org/dc/elements/1.1/language> "en-GB".',
    '<http://one.example/dep1> <http://rdfs.org/ns/void#uriSpace> <http://site.com/space1> .',
    '<http://one.example/dep1> <http://purl.org/dc/terms/subject> <http://dbpedia.org/resource/Computer_science> .',
    '<http://one.example/dep1> <http://purl.org/dc/terms/audience> <http://site.com/all-ages-uk> .',
    '<http://one.example/dep1> <http://purl.org/dc/terms/audience> <http://site.com/all-ages-us> .',
    '<http://one.example/maintainer1> <http://xmlns.com/foaf/0.1/homepage> <http://one.example/oli/profile> .',
    '<http://one.example/maintainer1> <http://xmlns.com/foaf/0.1/nick> "Oli" .',
    '<http://one.example/maintainer1> <http://xmlns.com/foaf/0.1/currentProject> "http://one.example/monsters" .'
].join('\n');
test('parseMutuality', t => {
    const actual = parseMutuality('en', mutualityContent);
    const release1 = {
        audiences: [],
        created: '2008-09-15T15:53:00+05:00',
        dataDump: 'http://site.com/dump.n3.gz',
        feature: DependencyFeature.NTriples,
        identifier: 'http://one.example/release1',
        language: 'en-GB',
        revision: '1.0',
        subjects: ['http://dbpedia.org/resource/Computer_science'],
        uriSpace: 'http://site.com/release1/en'
    };
    const release2 = {
        audiences: ['http://site.com/all-ages-uk'],
        created: '2008-09-15T15:53:00+05:00',
        dataDump: 'http://site.com/dump2.n3.gz',
        feature: DependencyFeature.N3,
        identifier: 'http://one.example/release2',
        language: 'en-GB',
        revision: '2.0',
        subjects: ['http://dbpedia.org/resource/Computer_science'],
        uriSpace: 'http://site.com/release2/en'
    };
    const dependency1 = {
        audiences: ['http://site.com/all-ages-uk', 'http://site.com/all-ages-us'],
        created: '2008-09-15T15:53:00+05:00',
        dataDump: 'http://site.com/dump.n3.gz',
        feature: DependencyFeature.Turtle,
        identifier: 'http://one.example/dep1',
        language: 'en-GB',
        revision: '1.0',
        subjects: ['http://dbpedia.org/resource/Computer_science'],
        uriSpace: 'http://site.com/space1'
    };
    const maintener1 = {
        homepage: 'http://one.example/oli/profile',
        identifier: 'http://one.example/maintainer1',
        nickname: 'Oli',
        writeAccess: ['http://one.example/monsters']
    };
    const expected = {
        attributionName: 'attr name',
        attributionURL: 'http://site.com/attribution',
        created: '2008-09-15T15:53:00+05:00',
        dependencies: [dependency1],
        description: 'some desc',
        homepage: 'http://site.com',
        languages: ['en-GB'],
        license: 'http://creativecommons.org/licenses/by-nc/3.0/',
        maintainers: [maintener1],
        releases: [release1, release2],
        repositoryLocation: 'https://github.com/ewilderj/doap.git',
        shortDescription: 'short desc',
        subjects: ['http://dbpedia.org/resource/Computer_science'],
        title: 'some title',
        uriSpace: 'http://one.example/',
        vocabularies: ['http://purl.org/dc/terms/', 'http://rdfs.org/sioc/ns'],
        writeAccess: ['http://one.example/monsters', 'http://one.example/heros']
    };
    t.deepEqual(actual, expected);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0dWFsaXR5LXBhcnNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9tdXR1YWxpdHktcGFyc2VyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseUNBQXlDO0FBQ3pDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFHM0IsT0FBTyxjQUFjLE1BQU0sb0JBQW9CLENBQUM7QUFDaEQsT0FBTyxFQUFFLGlCQUFpQixFQUFXLE1BQU0sV0FBVyxDQUFDO0FBRXZELE1BQU0sZ0JBQWdCLEdBQVc7SUFDL0Isb0hBQW9IO0lBQ3BILGtGQUFrRjtJQUNsRiwwRkFBMEY7SUFDMUYsb0ZBQW9GO0lBQ3BGLDJGQUEyRjtJQUMzRixxSEFBcUg7SUFDckgsZ0dBQWdHO0lBQ2hHLDhHQUE4RztJQUM5RyxnSEFBZ0g7SUFDaEgsZ0dBQWdHO0lBQ2hHLG1IQUFtSDtJQUNuSCxzR0FBc0c7SUFDdEcsc0dBQXNHO0lBQ3RHLGtHQUFrRztJQUNsRyxnR0FBZ0c7SUFDaEcsMEZBQTBGO0lBQzFGLCtGQUErRjtJQUMvRiw0R0FBNEc7SUFDNUcsMEdBQTBHO0lBQzFHLHVHQUF1RztJQUN2RyxnR0FBZ0c7SUFDaEcsaUdBQWlHO0lBQ2pHLG9GQUFvRjtJQUNwRiw0R0FBNEc7SUFDNUcsOEVBQThFO0lBQzlFLGtHQUFrRztJQUNsRyxtSEFBbUg7SUFDbkgsZ0dBQWdHO0lBQ2hHLGtHQUFrRztJQUNsRyxxR0FBcUc7SUFDckcsOEVBQThFO0lBQzlFLG1GQUFtRjtJQUNuRixrR0FBa0c7SUFDbEcsbUhBQW1IO0lBQ25ILG1HQUFtRztJQUNuRywyRkFBMkY7SUFDM0YsNEZBQTRGO0lBQzVGLHFHQUFxRztJQUNyRywwRUFBMEU7SUFDMUUsK0VBQStFO0lBQy9FLHlGQUF5RjtJQUN6RiwrR0FBK0c7SUFDL0csK0ZBQStGO0lBQy9GLCtGQUErRjtJQUMvRiwwR0FBMEc7SUFDMUcsMkVBQTJFO0lBQzNFLDZH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