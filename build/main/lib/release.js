"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
/** https://www.w3.org/TR/void/#features */
var DependencyFeature;
(function (DependencyFeature) {
    DependencyFeature["N3"] = "http://www.w3.org/ns/formats/N3";
    DependencyFeature["NTriples"] = "http://www.w3.org/ns/formats/N-Triples";
    DependencyFeature["Turtle"] = "http://www.w3.org/ns/formats/Turtle";
    DependencyFeature["Unknown"] = "";
})(DependencyFeature || (DependencyFeature = {}));
exports.DependencyFeature = DependencyFeature;
/**
 * Convert a uri to a DependencyFeature object
 *
 * @param value a url
 * @returns a DependencyFeature
 */
const asFeature = (value) => {
    switch (value) {
        case DependencyFeature.NTriples:
            return DependencyFeature.NTriples;
        case DependencyFeature.N3:
            return DependencyFeature.N3;
        case DependencyFeature.Turtle:
            return DependencyFeature.Turtle;
        default:
            return DependencyFeature.Unknown;
    }
};
exports.asFeature = asFeature;
/**
 * Filter a list of releases or dependencies by audience
 *
 * ### Example
 * ```js
 * dependencies.filter(byAudience('http://dbpedia.org/resource/Adults'))
 * // => dependencies
 * ```
 *
 * @param audience a specific audience
 * @returns releases
 */
function byAudience(audience) {
    return r => r.subjects.includes(audience);
}
exports.byAudience = byAudience;
/**
 * Filter a list of releases or dependencies by subjects
 *
 * ### Example
 * ```js
 * dependencies.filter(bySubjects(['http://dbpedia.org/resource/Paris']))
 * // => dependencies
 * ```
 *
 * @param subjects a list of subjects
 * @returns releases
 */
function bySubjects(subjects) {
    return r => lodash_1.intersection(r.subjects, subjects).length > 0;
}
exports.bySubjects = bySubjects;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsZWFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcmVsZWFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG1DQUFzQztBQUV0QywyQ0FBMkM7QUFDM0MsSUFBSyxpQkFLSjtBQUxELFdBQUssaUJBQWlCO0lBQ3BCLDJEQUFzQyxDQUFBO0lBQ3RDLHdFQUFtRCxDQUFBO0lBQ25ELG1FQUE4QyxDQUFBO0lBQzlDLGlDQUFZLENBQUE7QUFDZCxDQUFDLEVBTEksaUJBQWlCLEtBQWpCLGlCQUFpQixRQUtyQjtBQXVFNEIsOENBQWlCO0FBckU5Qzs7Ozs7R0FLRztBQUNILE1BQU0sU0FBUyxHQUFHLENBQUMsS0FBYSxFQUFFLEVBQUU7SUFDbEMsUUFBUSxLQUFLLEVBQUU7UUFDYixLQUFLLGlCQUFpQixDQUFDLFFBQVE7WUFDN0IsT0FBTyxpQkFBaUIsQ0FBQyxRQUFRLENBQUM7UUFDcEMsS0FBSyxpQkFBaUIsQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8saUJBQWlCLENBQUMsRUFBRSxDQUFDO1FBQzlCLEtBQUssaUJBQWlCLENBQUMsTUFBTTtZQUMzQixPQUFPLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztRQUNsQztZQUNFLE9BQU8saUJBQWlCLENBQUMsT0FBTyxDQUFDO0tBQ3BDO0FBQ0gsQ0FBQyxDQUFDO0FBb0RPLDhCQUFTO0FBaENsQjs7Ozs7Ozs7Ozs7R0FXRztBQUNILG9CQUFvQixRQUFnQjtJQUNsQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQWtCK0MsZ0NBQVU7QUFoQjFEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsb0JBQW9CLFFBQStCO0lBQ2pELE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxxQkFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztBQUM1RCxDQUFDO0FBRTJELGdDQUFVIn0=