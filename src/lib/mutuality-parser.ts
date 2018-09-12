import { intersection } from 'lodash';
import {
  findLocalizedStringByPredicate,
  findStringByPredicate,
  findStringsByPredicate,
  stringToNTriples,
  Triple
} from 'ntriples-collection';
import { AgentAccess } from './agent-access';
import { Mutuality } from './mutuality';
import { asFeature, DependencyFeature, Release } from './release';

const ccAttributionName = 'http://creativecommons.org/ns#attributionName';
const ccAttributionURL = 'http://creativecommons.org/ns#attributionURL';
const dcLanguage = 'http://purl.org/dc/elements/1.1/language';
const dctermsCreated = 'http://purl.org/dc/terms/created';
const dctermsAudience = 'http://purl.org/dc/terms/audience';
const dctermsDescription =
  'http://dublincore.org/documents/2012/06/14/dcmi-terms/description';
const dctermsLicense = 'http://purl.org/dc/terms/license';
const dctermsRequires = 'http://purl.org/dc/terms/requires';
const dctermsSubject = 'http://purl.org/dc/terms/subject';
const dctermsTitle = 'http://purl.org/dc/terms/title';
const doapHomepage = 'http://usefulinc.com/ns/doap#homepage';
const doapMaintainer = 'http://usefulinc.com/ns/doap#maintainer';
const doapRelease = 'http://usefulinc.com/ns/doap#release';
const doapRepoLocation = 'http://usefulinc.com/ns/doap#location';
const doapRevision = 'http://usefulinc.com/ns/doap#revision';
const doapShortDesc = 'http://usefulinc.com/ns/doap#shortdesc';
const foafCurrentProject = 'http://xmlns.com/foaf/0.1/currentProject';
const foafHomepage = 'http://xmlns.com/foaf/0.1/homepage';
const foafNickname = 'http://xmlns.com/foaf/0.1/nick';
const voidDataDump = 'http://rdfs.org/ns/void#dataDump';
const voidFeature = 'http://rdfs.org/ns/void#feature';
const voidUriSpace = 'http://rdfs.org/ns/void#uriSpace';
const voidVocabulary = 'http://rdfs.org/ns/void#vocabulary';

const nullToEmpty = (value: string | null) => {
  return value === null ? '' : value;
};

function parseRelease(
  triples: ReadonlyArray<Triple>,
  identifier: string
): Release {
  const releaseTriples = triples.filter(
    triple => triple.subject === identifier
  );
  const findString = (predicate: string) =>
    nullToEmpty(findStringByPredicate(releaseTriples, predicate, ''));
  const findStrings = (predicate: string) =>
    findStringsByPredicate(releaseTriples, predicate);
  const created = findString(dctermsCreated);
  const dataDump = findString(voidDataDump);
  const language = findString(dcLanguage);
  const revision = findString(doapRevision);
  const subjects = findStrings(dctermsSubject);
  const audiences = findStrings(dctermsAudience);
  const uriSpace = findString(voidUriSpace);
  const feature: DependencyFeature = asFeature(findString(voidFeature));
  const release: Release = {
    audiences,
    created,
    dataDump,
    feature,
    identifier,
    language,
    revision,
    subjects,
    uriSpace
  };
  return release;
}

function parseMaintainer(
  triples: ReadonlyArray<Triple>,
  identifier: string,
  access: ReadonlyArray<string>
): AgentAccess {
  const maintainerTriples = triples.filter(
    triple => triple.subject === identifier
  );
  const findString = (predicate: string) =>
    nullToEmpty(findStringByPredicate(maintainerTriples, predicate, ''));
  const findStrings = (predicate: string) =>
    findStringsByPredicate(maintainerTriples, predicate);
  const nickname = findString(foafNickname);
  const homepage = findString(foafHomepage);
  const writeAccess = intersection(findStrings(foafCurrentProject), access);
  const release: AgentAccess = { identifier, nickname, homepage, writeAccess };
  return release;
}

/**
 * Parses a mutuality content provided as n-triples
 *
 * ### Example
 * ```js
 * parseMutuality('en', ntripleStringContent)
 * // => Mutuality object
 * ```
 *
 * @param language the language for all the descriptions
 * @param content the content in the n-triples format
 * @returns a Mutuality object
 */
export default function parseMutuality(
  language: string,
  content: string
): Mutuality {
  const triples = stringToNTriples(content);
  const mainSubject = triples[0].subject;
  const mainTriples = triples.filter(triple => triple.subject === mainSubject);

  const findLocalized = (predicate: string) =>
    nullToEmpty(
      findLocalizedStringByPredicate(mainTriples, predicate, language, [], '')
    );
  const findString = (predicate: string) =>
    nullToEmpty(findStringByPredicate(mainTriples, predicate, ''));
  const findStrings = (predicate: string) =>
    findStringsByPredicate(mainTriples, predicate);

  const asRelease = (predicate: string) => parseRelease(triples, predicate);
  const attributionName = findLocalized(ccAttributionName);
  const attributionURL = findString(ccAttributionURL);
  const created = findString(dctermsCreated);
  const dependencyIds = findStrings(dctermsRequires);
  const dependencies = dependencyIds.map(asRelease);
  const description = findLocalized(dctermsDescription);
  const homepage = findString(doapHomepage);
  const languages = findStrings(dcLanguage);
  const license = findString(dctermsLicense);
  const releaseIds = findStrings(doapRelease);
  const releases = releaseIds.map(asRelease);
  const repositoryLocation = findString(doapRepoLocation);
  const shortDescription = findLocalized(doapShortDesc);
  const subjects = findStrings(dctermsSubject);
  const title = findLocalized(dctermsTitle);
  const vocabularies = findStrings(voidVocabulary);
  const uriSpace = findString(voidUriSpace);
  const writeAccess = findStrings(foafCurrentProject).filter(s =>
    s.startsWith(uriSpace)
  );
  const asMaintainer = (predicate: string) =>
    parseMaintainer(triples, predicate, writeAccess);
  const maintainerIds = findStrings(doapMaintainer);
  const maintainers = maintainerIds.map(asMaintainer);
  const mutuality: Mutuality = {
    attributionName,
    attributionURL,
    created,
    dependencies,
    description,
    homepage,
    languages,
    license,
    maintainers,
    releases,
    repositoryLocation,
    shortDescription,
    subjects,
    title,
    uriSpace,
    vocabularies,
    writeAccess
  };
  return mutuality;
}
