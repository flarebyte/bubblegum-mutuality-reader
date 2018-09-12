import { intersection } from 'lodash';
import { findLocalizedStringByPredicate, findStringByPredicate, findStringsByPredicate, stringToNTriples } from 'ntriples-collection';
import { asFeature } from './release';
const ccAttributionName = 'http://creativecommons.org/ns#attributionName';
const ccAttributionURL = 'http://creativecommons.org/ns#attributionURL';
const dcLanguage = 'http://purl.org/dc/elements/1.1/language';
const dctermsCreated = 'http://purl.org/dc/terms/created';
const dctermsAudience = 'http://purl.org/dc/terms/audience';
const dctermsDescription = 'http://dublincore.org/documents/2012/06/14/dcmi-terms/description';
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
const nullToEmpty = (value) => {
    return value === null ? '' : value;
};
function parseRelease(triples, identifier) {
    const releaseTriples = triples.filter(triple => triple.subject === identifier);
    const findString = (predicate) => nullToEmpty(findStringByPredicate(releaseTriples, predicate, ''));
    const findStrings = (predicate) => findStringsByPredicate(releaseTriples, predicate);
    const created = findString(dctermsCreated);
    const dataDump = findString(voidDataDump);
    const language = findString(dcLanguage);
    const revision = findString(doapRevision);
    const subjects = findStrings(dctermsSubject);
    const audiences = findStrings(dctermsAudience);
    const uriSpace = findString(voidUriSpace);
    const feature = asFeature(findString(voidFeature));
    const release = {
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
function parseMaintainer(triples, identifier, access) {
    const maintainerTriples = triples.filter(triple => triple.subject === identifier);
    const findString = (predicate) => nullToEmpty(findStringByPredicate(maintainerTriples, predicate, ''));
    const findStrings = (predicate) => findStringsByPredicate(maintainerTriples, predicate);
    const nickname = findString(foafNickname);
    const homepage = findString(foafHomepage);
    const writeAccess = intersection(findStrings(foafCurrentProject), access);
    const release = { identifier, nickname, homepage, writeAccess };
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
export default function parseMutuality(language, content) {
    const triples = stringToNTriples(content);
    const mainSubject = triples[0].subject;
    const mainTriples = triples.filter(triple => triple.subject === mainSubject);
    const findLocalized = (predicate) => nullToEmpty(findLocalizedStringByPredicate(mainTriples, predicate, language, [], ''));
    const findString = (predicate) => nullToEmpty(findStringByPredicate(mainTriples, predicate, ''));
    const findStrings = (predicate) => findStringsByPredicate(mainTriples, predicate);
    const asRelease = (predicate) => parseRelease(triples, predicate);
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
    const writeAccess = findStrings(foafCurrentProject).filter(s => s.startsWith(uriSpace));
    const asMaintainer = (predicate) => parseMaintainer(triples, predicate, writeAccess);
    const maintainerIds = findStrings(doapMaintainer);
    const maintainers = maintainerIds.map(asMaintainer);
    const mutuality = {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0dWFsaXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbXV0dWFsaXR5LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBQ3RDLE9BQU8sRUFDTCw4QkFBOEIsRUFDOUIscUJBQXFCLEVBQ3JCLHNCQUFzQixFQUN0QixnQkFBZ0IsRUFFakIsTUFBTSxxQkFBcUIsQ0FBQztBQUc3QixPQUFPLEVBQUUsU0FBUyxFQUE4QixNQUFNLFdBQVcsQ0FBQztBQUVsRSxNQUFNLGlCQUFpQixHQUFHLCtDQUErQyxDQUFDO0FBQzFFLE1BQU0sZ0JBQWdCLEdBQUcsOENBQThDLENBQUM7QUFDeEUsTUFBTSxVQUFVLEdBQUcsMENBQTBDLENBQUM7QUFDOUQsTUFBTSxjQUFjLEdBQUcsa0NBQWtDLENBQUM7QUFDMUQsTUFBTSxlQUFlLEdBQUcsbUNBQW1DLENBQUM7QUFDNUQsTUFBTSxrQkFBa0IsR0FDdEIsbUVBQW1FLENBQUM7QUFDdEUsTUFBTSxjQUFjLEdBQUcsa0NBQWtDLENBQUM7QUFDMUQsTUFBTSxlQUFlLEdBQUcsbUNBQW1DLENBQUM7QUFDNUQsTUFBTSxjQUFjLEdBQUcsa0NBQWtDLENBQUM7QUFDMUQsTUFBTSxZQUFZLEdBQUcsZ0NBQWdDLENBQUM7QUFDdEQsTUFBTSxZQUFZLEdBQUcsdUNBQXVDLENBQUM7QUFDN0QsTUFBTSxjQUFjLEdBQUcseUNBQXlDLENBQUM7QUFDakUsTUFBTSxXQUFXLEdBQUcsc0NBQXNDLENBQUM7QUFDM0QsTUFBTSxnQkFBZ0IsR0FBRyx1Q0FBdUMsQ0FBQztBQUNqRSxNQUFNLFlBQVksR0FBRyx1Q0FBdUMsQ0FBQztBQUM3RCxNQUFNLGFBQWEsR0FBRyx3Q0FBd0MsQ0FBQztBQUMvRCxNQUFNLGtCQUFrQixHQUFHLDBDQUEwQyxDQUFDO0FBQ3RFLE1BQU0sWUFBWSxHQUFHLG9DQUFvQyxD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