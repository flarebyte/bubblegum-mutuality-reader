import { AgentAccess } from './agent-access';
import { Release } from './release';
interface Mutuality {
    /** https://creativecommons.org/ns#License  */
    readonly license: string /** dc:license or cc:license */;
    readonly attributionName: string;
    readonly attributionURL: string;
    /** dublin core http://dublincore.org/documents/2012/06/14/dcmi-terms/ */
    readonly title: string;
    readonly description: string;
    readonly shortDescription: string;
    readonly languages: ReadonlyArray<string>;
    readonly created: string;
    readonly repositoryLocation: string /** git url */;
    readonly homepage: string /** web page */;
    readonly subjects: ReadonlyArray<string> /** dcterms:subject such as http://dbpedia.org/resource/Computer_science */;
    readonly uriSpace: string /** void:uriSpace */;
    readonly writeAccess: ReadonlyArray<string>;
    readonly maintainers: ReadonlyArray<AgentAccess>;
    readonly vocabularies: ReadonlyArray<string> /** void:vocabulary */;
    readonly dependencies: ReadonlyArray<Release>;
    readonly releases: ReadonlyArray<Release>;
}
export { Mutuality };
