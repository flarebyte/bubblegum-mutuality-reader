import { intersection } from 'lodash';
/** https://www.w3.org/TR/void/#features */
var DependencyFeature;
(function (DependencyFeature) {
    DependencyFeature["N3"] = "http://www.w3.org/ns/formats/N3";
    DependencyFeature["NTriples"] = "http://www.w3.org/ns/formats/N-Triples";
    DependencyFeature["Turtle"] = "http://www.w3.org/ns/formats/Turtle";
    DependencyFeature["Unknown"] = "";
})(DependencyFeature || (DependencyFeature = {}));
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
    return r => intersection(r.subjects, subjects).length > 0;
}
export { asFeature, DependencyFeature, byAudience, bySubjects };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsZWFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvcmVsZWFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sUUFBUSxDQUFDO0FBRXRDLDJDQUEyQztBQUMzQyxJQUFLLGlCQUtKO0FBTEQsV0FBSyxpQkFBaUI7SUFDcEIsMkRBQXNDLENBQUE7SUFDdEMsd0VBQW1ELENBQUE7SUFDbkQsbUVBQThDLENBQUE7SUFDOUMsaUNBQVksQ0FBQTtBQUNkLENBQUMsRUFMSSxpQkFBaUIsS0FBakIsaUJBQWlCLFFBS3JCO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFNBQVMsR0FBRyxDQUFDLEtBQWEsRUFBRSxFQUFFO0lBQ2xDLFFBQVEsS0FBSyxFQUFFO1FBQ2IsS0FBSyxpQkFBaUIsQ0FBQyxRQUFRO1lBQzdCLE9BQU8saUJBQWlCLENBQUMsUUFBUSxDQUFDO1FBQ3BDLEtBQUssaUJBQWlCLENBQUMsRUFBRTtZQUN2QixPQUFPLGlCQUFpQixDQUFDLEVBQUUsQ0FBQztRQUM5QixLQUFLLGlCQUFpQixDQUFDLE1BQU07WUFDM0IsT0FBTyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7UUFDbEM7WUFDRSxPQUFPLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztLQUNwQztBQUNILENBQUMsQ0FBQztBQW9CRjs7Ozs7Ozs7Ozs7R0FXRztBQUNILG9CQUFvQixRQUFnQjtJQUNsQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQUVEOzs7Ozs7Ozs7OztHQVdHO0FBQ0gsb0JBQW9CLFFBQStCO0lBQ2pELE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBQzVELENBQUM7QUFFRCxPQUFPLEVBQUUsU0FBUyxFQUFXLGlCQUFpQixFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyJ9