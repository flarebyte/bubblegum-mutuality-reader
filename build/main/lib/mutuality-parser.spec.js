"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:no-expression-statement
const ava_1 = require("ava");
const mutuality_parser_1 = __importDefault(require("./mutuality-parser"));
const release_1 = require("./release");
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
ava_1.test('parseMutuality', t => {
    const actual = mutuality_parser_1.default('en', mutualityContent);
    const release1 = {
        audiences: [],
        created: '2008-09-15T15:53:00+05:00',
        dataDump: 'http://site.com/dump.n3.gz',
        feature: release_1.DependencyFeature.NTriples,
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
        feature: release_1.DependencyFeature.N3,
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
        feature: release_1.DependencyFeature.Turtle,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0dWFsaXR5LXBhcnNlci5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9tdXR1YWxpdHktcGFyc2VyLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSx5Q0FBeUM7QUFDekMsNkJBQTJCO0FBRzNCLDBFQUFnRDtBQUNoRCx1Q0FBdUQ7QUFFdkQsTUFBTSxnQkFBZ0IsR0FBVztJQUMvQixvSEFBb0g7SUFDcEgsa0ZBQWtGO0lBQ2xGLDBGQUEwRjtJQUMxRixvRkFBb0Y7SUFDcEYsMkZBQTJGO0lBQzNGLHFIQUFxSDtJQUNySCxnR0FBZ0c7SUFDaEcsOEdBQThHO0lBQzlHLGdIQUFnSDtJQUNoSCxnR0FBZ0c7SUFDaEcsbUhBQW1IO0lBQ25ILHNHQUFzRztJQUN0RyxzR0FBc0c7SUFDdEcsa0dBQWtHO0lBQ2xHLGdHQUFnRztJQUNoRywwRkFBMEY7SUFDMUYsK0ZBQStGO0lBQy9GLDRHQUE0RztJQUM1RywwR0FBMEc7SUFDMUcsdUdBQXVHO0lBQ3ZHLGdHQUFnRztJQUNoRyxpR0FBaUc7SUFDakcsb0ZBQW9GO0lBQ3BGLDRHQUE0RztJQUM1Ryw4RUFBOEU7SUFDOUUsa0dBQWtHO0lBQ2xHLG1IQUFtSDtJQUNuSCxnR0FBZ0c7SUFDaEcsa0dBQWtHO0lBQ2xHLHFHQUFxRztJQUNyRyw4RUFBOEU7SUFDOUUsbUZBQW1GO0lBQ25GLGtHQUFrRztJQUNsRyxtSEFBbUg7SUFDbkgsbUdBQW1HO0lBQ25HLDJGQUEyRjtJQUMzRiw0RkFBNEY7SUFDNUYscUdBQXFHO0lBQ3JHLDBFQUEwRTtJQUMxRSwrRUFBK0U7SUFDL0UseUZBQXlGO0lBQ3pGLCtHQUErRztJQUMvRywrRkFBK0Y7SUFDL0YsK0ZBQStGO0lBQy9GLDBHQUEwRztJQUMxRywyRUFBMkU7SUFDM0UsNkdBQTZHO0NBQzlHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWIsVUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMs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