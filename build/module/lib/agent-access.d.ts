interface AgentAccess {
    /**   https://en.wikipedia.org/wiki/FOAF_(ontology)  */
    readonly identifier: string;
    readonly nickname: string;
    readonly homepage: string;
    readonly writeAccess: ReadonlyArray<string>;
}
export { AgentAccess };
