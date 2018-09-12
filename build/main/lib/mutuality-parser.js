"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const ntriples_collection_1 = require("ntriples-collection");
const release_1 = require("./release");
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
    const findString = (predicate) => nullToEmpty(ntriples_collection_1.findStringByPredicate(releaseTriples, predicate, ''));
    const findStrings = (predicate) => ntriples_collection_1.findStringsByPredicate(releaseTriples, predicate);
    const created = findString(dctermsCreated);
    const dataDump = findString(voidDataDump);
    const language = findString(dcLanguage);
    const revision = findString(doapRevision);
    const subjects = findStrings(dctermsSubject);
    const audiences = findStrings(dctermsAudience);
    const uriSpace = findString(voidUriSpace);
    const feature = release_1.asFeature(findString(voidFeature));
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
    const findString = (predicate) => nullToEmpty(ntriples_collection_1.findStringByPredicate(maintainerTriples, predicate, ''));
    const findStrings = (predicate) => ntriples_collection_1.findStringsByPredicate(maintainerTriples, predicate);
    const nickname = findString(foafNickname);
    const homepage = findString(foafHomepage);
    const writeAccess = lodash_1.intersection(findStrings(foafCurrentProject), access);
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
function parseMutuality(language, content) {
    const triples = ntriples_collection_1.stringToNTriples(content);
    const mainSubject = triples[0].subject;
    const mainTriples = triples.filter(triple => triple.subject === mainSubject);
    const findLocalized = (predicate) => nullToEmpty(ntriples_collection_1.findLocalizedStringByPredicate(mainTriples, predicate, language, [], ''));
    const findString = (predicate) => nullToEmpty(ntriples_collection_1.findStringByPredicate(mainTriples, predicate, ''));
    const findStrings = (predicate) => ntriples_collection_1.findStringsByPredicate(mainTriples, predicate);
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
exports.default = parseMutuality;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0dWFsaXR5LXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvbXV0dWFsaXR5LXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFzQztBQUN0Qyw2REFNNkI7QUFHN0IsdUNBQWtFO0FBRWxFLE1BQU0saUJBQWlCLEdBQUcsK0NBQStDLENBQUM7QUFDMUUsTUFBTSxnQkFBZ0IsR0FBRyw4Q0FBOEMsQ0FBQztBQUN4RSxNQUFNLFVBQVUsR0FBRywwQ0FBMEMsQ0FBQztBQUM5RCxNQUFNLGNBQWMsR0FBRyxrQ0FBa0MsQ0FBQztBQUMxRCxNQUFNLGVBQWUsR0FBRyxtQ0FBbUMsQ0FBQztBQUM1RCxNQUFNLGtCQUFrQixHQUN0QixtRUFBbUUsQ0FBQztBQUN0RSxNQUFNLGNBQWMsR0FBRyxrQ0FBa0MsQ0FBQztBQUMxRCxNQUFNLGVBQWUsR0FBRyxtQ0FBbUMsQ0FBQztBQUM1RCxNQUFNLGNBQWMsR0FBRyxrQ0FBa0MsQ0FBQztBQUMxRCxNQUFNLFlBQVksR0FBRyxnQ0FBZ0MsQ0FBQztBQUN0RCxNQUFNLFlBQVksR0FBRyx1Q0FBdUMsQ0FBQztBQUM3RCxNQUFNLGNBQWMsR0FBRyx5Q0FBeUMsQ0FBQztBQUNqRSxNQUFNLFdBQVcsR0FBRyxzQ0FBc0MsQ0FBQztBQUMzRCxNQUFNLGdCQUFnQixHQUFHLHVDQUF1QyxDQUFDO0FBQ2pFLE1BQU0sWUFBWSxHQUFHLHVDQUF1QyxDQUFDO0FBQzdELE1BQU0sYUFBYSxHQUFHLHdDQUF3QyxDQUFDO0FBQy9ELE1BQU0sa0JBQWtCLEdBQUcsMENBQTBDLENBQUM7QUFDdEUsTUFBTSxZQUFZLEdBQUcsb0NBQW9DLENBQUM7QUFDMUQsTUFBTSxZQUFZLEdBQUcsZ0NBQWdDLENBQUM7QUFDdEQsTUFBTSxZQUFZLEdBQUcsa0NBQWtDLENBQUM7QUFDeEQsTUFBTSxXQUFXLEdBQUcsaUNBQWlDLENBQUM7QUFDdEQsTUFBTSxZQUFZLEdBQUcsa0NB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