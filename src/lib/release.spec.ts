// tslint:disable:no-expression-statement
import { test } from 'ava';
import { asFeature, byAudience, bySubjects, DependencyFeature, Release } from './release'

const release1: Release = {
  audiences: ['http://site.com/all-ages-uk', 'http://site.com/all-ages-us'],
  created: '2008-09-15T15:53:00+05:00',
  dataDump: 'http://site.com/dump.n3.gz',
  feature: DependencyFeature.NTriples,
  identifier: 'http://one.example/release',
  language: 'en-GB',
  revision: '1.0',
  subjects: ['http://dbpedia.org/resource/Computer_science', 'http://dbpedia.org/resource/Technology'],
  uriSpace: 'http://site.com/release1/en',
}

const release2: Release = {
  audiences: ['http://site.com/all-ages-us'],
  created: '2008-09-15T15:53:00+05:00',
  dataDump: 'http://site.com/dump2.n3.gz',
  feature: DependencyFeature.NTriples,
  identifier: 'http://one.example/release2',
  language: 'en-GB',
  revision: '1.0',
  subjects: ['http://dbpedia.org/resource/Black_magic'],
  uriSpace: 'http://site.com/release2/en',
}


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
