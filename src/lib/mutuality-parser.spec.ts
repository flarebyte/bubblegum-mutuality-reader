// tslint:disable:no-expression-statement
import { test } from 'ava';
import { AgentAccess} from './agent-access'
import { Mutuality} from './mutuality'
import parseMutuality from './mutuality-parser';
import { DependencyFeature, Release} from './release'

const mutualityContent: string = [
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
  '<http://one.example/maintainer1> <http://xmlns.com/foaf/0.1/currentProject> "http://one.example/monsters" .',

].join('\n')

test('parseMutuality', t => {
  const actual = parseMutuality( "en", mutualityContent);
  const release1: Release = {
    audiences: [],
    created: '2008-09-15T15:53:00+05:00',
    dataDump: 'http://site.com/dump.n3.gz',
    feature: DependencyFeature.NTriples,
    identifier: 'http://one.example/release1',
    language: "en-GB",
    revision: '1.0',
    subjects: ["http://dbpedia.org/resource/Computer_science"],
    uriSpace: 'http://site.com/release1/en',
  }
  const release2: Release = {
    audiences: ["http://site.com/all-ages-uk"],
    created: '2008-09-15T15:53:00+05:00',
    dataDump: 'http://site.com/dump2.n3.gz',
    feature: DependencyFeature.N3,
    identifier: 'http://one.example/release2',
    language: "en-GB",
    revision: '2.0',
    subjects: ["http://dbpedia.org/resource/Computer_science"],
    uriSpace: 'http://site.com/release2/en',
  }

  const dependency1: Release = {
    audiences: ["http://site.com/all-ages-uk", "http://site.com/all-ages-us"],
    created: '2008-09-15T15:53:00+05:00',
    dataDump: 'http://site.com/dump.n3.gz',
    feature: DependencyFeature.Turtle,
    identifier: 'http://one.example/dep1',
    language: "en-GB",
    revision: '1.0',
    subjects: ["http://dbpedia.org/resource/Computer_science"],
    uriSpace: 'http://site.com/space1',
  }

  const maintener1: AgentAccess = {
    homepage: 'http://one.example/oli/profile',
    identifier: 'http://one.example/maintainer1',
    nickname: 'Oli',
    writeAccess: ['http://one.example/monsters'],
  }
  
  const expected: Mutuality = {

    attributionName: "attr name",
    attributionURL: "http://site.com/attribution",
    created: "2008-09-15T15:53:00+05:00",
    dependencies: [dependency1],
    description: "some desc",
    homepage: "http://site.com",
    languages: ["en-GB"],
    license: "http://creativecommons.org/licenses/by-nc/3.0/",
    maintainers: [maintener1],
    releases: [release1, release2],
    repositoryLocation: "https://github.com/ewilderj/doap.git",
    shortDescription: "short desc",
    subjects: ["http://dbpedia.org/resource/Computer_science"],
    title: "some title",
    uriSpace: "http://one.example/",
    vocabularies: ["http://purl.org/dc/terms/", "http://rdfs.org/sioc/ns"],
    writeAccess: ['http://one.example/monsters', 'http://one.example/heros'],

  }
  t.deepEqual(actual, expected);
});
