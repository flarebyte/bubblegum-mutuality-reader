// tslint:disable:no-expression-statement
import { test } from 'ava';
import { fetchDependencies, fetchDependency, fetchTriplesByPath, fetchTriplesByPaths } from './fetcher';
import { DependencyFeature, Release } from './release'

const dump1 =  '<http://a.com/a> <http://purl.org/dc/terms/title> "dump1" .'
const dump2 =  '<http://a.com/a> <http://purl.org/dc/terms/title> "dump2" .'
const tripleDump1 = {subject: 'http://a.com/a', predicate: 'http://purl.org/dc/terms/title', object: '"dump1"'}
const tripleDump2 = {subject: 'http://a.com/a', predicate: 'http://purl.org/dc/terms/title', object: '"dump2"'}

const mockReleaseFetcher= (release: Release) => {
  switch (release.dataDump) {
    case 'http://site.com/dump1.nt': return Promise.resolve(dump1);
    case 'http://site.com/dump2.nt': return Promise.resolve(dump2);
    default: return Promise.reject('no datadump');
  }
}

const mockFileFetcher= (path: string) => {
  switch (path) {
    case 'a/b': return Promise.resolve(dump1);
    case 'c/d': return Promise.resolve(dump2);
    default: return Promise.reject('no datadump');
  }
}

const dependency1: Release = {
  audiences: ["http://site.com/all-ages-uk", "http://site.com/all-ages-us"],
  created: '2008-09-15T15:53:00+05:00',
  dataDump: 'http://site.com/dump1.nt',
  feature: DependencyFeature.NTriples,
  identifier: 'http://one.example/dep1',
  language: "en-GB",
  revision: '1.0',
  subjects: ["http://dbpedia.org/resource/Computer_science"],
  uriSpace: 'http://site.com/space1',
}

const dependency2: Release = {
  audiences: ["http://site.com/all-ages-uk"],
  created: '2008-09-15T15:53:00+05:00',
  dataDump: 'http://site.com/dump2.nt',
  feature: DependencyFeature.NTriples,
  identifier: 'http://one.example/dep2',
  language: "en-GB",
  revision: '1.0',
  subjects: ["http://dbpedia.org/resource/Computer_science"],
  uriSpace: 'http://site.com/space1',
}

test('fetchDependency should fetch a given dependency', async t => {
  t.deepEqual(await fetchDependency(mockReleaseFetcher, dependency1), [tripleDump1]);
});

test('fetchMutuality should fetch all triples which are a dependencies', async t => {
  t.deepEqual(await fetchDependencies(mockReleaseFetcher, [dependency1, dependency2]), [tripleDump1, tripleDump2]);
});

test('fetchTriplesByPath should fetch a given path', async t => {
  t.deepEqual(await fetchTriplesByPath(mockFileFetcher, 'a/b'), [tripleDump1]);
});

test('fetchTriplesByPaths should fetch multiple paths', async t => {
  t.deepEqual(await fetchTriplesByPaths(mockFileFetcher, ['a/b', 'c/d']), [tripleDump1, tripleDump2]);
});
