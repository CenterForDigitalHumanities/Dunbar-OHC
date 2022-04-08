export default {
    ID: "deer-id", // attribute, URI for resource to render
    TYPE: "deer-type", // attribute, JSON-LD @type
    TEMPLATE: "deer-template", // attribute, enum for custom template
    KEY: "deer-key", // attribute, key to use for annotation
    LABEL: "title", // attribute, alternate label for properties
    CONTEXT: "deer-context", // attribute, JSON-LD @context, scoped
    ATTRIBUTION: "deer-creator", // attribute, Web Annotation `creator`, scoped
    MOTIVATION: "deer-motivation", // attribute, Web Annotation `motivation`, scoped
    LIST: "deer-list", // attribute, property with resource array
    COLLECTION: "deer-collection", // attribute, name of aggregating collection
    LISTENING: "deer-listening", // attribute, name of container to watch for clicks
    LINK: "deer-link", // attribute, location of href#[deer-id] for <a>s
    VIEW: "deer-view, .deer-view", // selector, identifies render containers
    FORM: "form[deer-type]", // selector, identifies data entry containers
    ITEMTYPE: "deer-item-type", //attribute, specialty forms ('entity' by default)
    SOURCE: "deer-source", // attribute, URI for asserting annotation
    EVIDENCE: "nv-evidence", // attribute, URI for supporting evidence
    INPUTTYPE: "deer-input-type", //attribute, defines whether this is an array list, array set, or object 
    ARRAYDELIMETER: "deer-array-delimeter", //attribute, denotes delimeter to use for array.join()

    INPUTS: ["input", "textarea", "dataset", "select"], // array of selectors, identifies inputs with .value
    CONTAINERS: ["ItemList", "ItemListElement", "List", "Set", "list", "set", "@list", "@set"], // array of supported list and set types the app will dig into for array values
    PRIMITIVES: [],

    URLS: {
        BASE_ID: "http://store.rerum.io/v1",
        CREATE: "http://tinydev.rerum.io/app/create",
        UPDATE: "http://tinydev.rerum.io/app/update",
        OVERWRITE: "http://tinydev.rerum.io/app/overwrite",
        QUERY: "http://tinydev.rerum.io/app/query",
        SINCE: "http://store.rerum.io/v1/since"
    },

    EVENTS: {
        CREATED: "deer-created",
        UPDATED: "deer-updated",
        LOADED: "deer-loaded",
        NEW_VIEW: "deer-view",
        NEW_FORM: "deer-form",
        VIEW_RENDERED : "deer-view-rendered",
        FORM_RENDERED : "deer-form-rendered",
        CLICKED: "deer-clicked"
    },

    SUPPRESS: ["__rerum", "@context"], //properties to ignore
    DELIMETERDEFAULT: ",", //Default delimeter for .split()ing and .join()ing 
    ROBUSTFEEDBACK: true, //Show warnings along with errors in the web console.  Set to false to only see errors.  

    /**
     * Add any custom templates here through import or copy paste.
     * Templates added here will overwrite the defaults in deer-render.js.
     * 
     * Each property must be lower-cased and return a template literal
     * or an HTML String.
     */
    TEMPLATES: {
        queryList: function (obj, options = {}) {
            let tmpl = `<h2>${obj.label.en[0]}</h2>`
            if (options.list) {
                tmpl += `<ol>`
                obj[options.list].forEach((val, index) => {
                    tmpl += `<li><a href="${options.link ?? "#"}${val['@id'] ?? val }">${val.label}</a></li>`
                })
                tmpl += `</ol>`
            }
            return tmpl
        },
        record: (obj,options={}) => {
            let tmpl = `
            <h4>${obj.label}</h4>
            <dl>
                <dt>Collection</dt>
                <dd>${getMetadata("Collection")}</dd>
                <dt>Creator</dt>
                <dd>${getMetadata("Creator")}</dd>
                <dt>Description</dt>
                <dd>${getMetadata("Description").replace("\\","")}</dd>
                <dt>Source</dt>
                <dd>${getMetadata("Source")}</dd>
            </dl>
            ${getThumbnailElement()}
            
            <p><a target="_blank" title="View IIIF Manifest" href="${obj['@id']}" aria-label="View IIIF Manifest"><svg height="2em" width="2em" style="margin-bottom:-5px;" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" version="1.1" id="svg2" xml:space="preserve" viewBox="0 0 586.95789 534.94622"> <metadata id="metadata8"><rdf:rdf><cc:work rdf:about=""><dc:format>image/svg+xml</dc:format><dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"></dc:type><dc:title></dc:title></cc:work></rdf:rdf></metadata><defs id="defs6"></defs><g style="display:inline" id="g10" transform="matrix(1.3333333,0,0,-1.3333333,42.08939,487.43895)"> <g style="display:inline;" id="layer4"><rect ry="56.48138" transform="scale(1,-1)" y="-354.32922" x="-20.317043" height="378.70969" width="417.71841" id="rect2281" style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#ffffff;stroke-width:22.5;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"></rect> </g><g id="g12" transform="scale(0.1)"><path d="M 65.2422,2178.75 775.242,1915 773.992,15 65.2422,276.25 v 1902.5" style="fill:#2873ab;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path14"></path><path d="m 804.145,2640.09 c 81.441,-240.91 -26.473,-436.2 -241.04,-436.2 -214.558,0 -454.511,195.29 -535.9527,436.2 -81.4335,240.89 26.4805,436.18 241.0387,436.18 214.567,0 454.512,-195.29 535.954,-436.18" style="fill:#2873ab;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path16"></path><path d="M 1678.58,2178.75 968.578,1915 969.828,15 1678.58,276.25 v 1902.5" style="fill:#ed1d33;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path18"></path><path d="m 935.082,2640.09 c -81.437,-240.91 26.477,-436.2 241.038,-436.2 214.56,0 454.51,195.29 535.96,436.2 81.43,240.89 -26.48,436.18 -241.04,436.18 -214.57,0 -454.52,-195.29 -535.958,-436.18" style="fill:#ed1d33;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path20"></path><path d="m 1860.24,2178.75 710,-263.75 -1.25,-1900 -708.75,261.25 v 1902.5" style="fill:#2873ab;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path22"></path><path d="m 2603.74,2640.09 c 81.45,-240.91 -26.47,-436.2 -241.03,-436.2 -214.58,0 -454.52,195.29 -535.96,436.2 -81.44,240.89 26.48,436.18 241.03,436.18 214.57,0 454.51,-195.29 535.96,-436.18" style="fill:#2873ab;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path24"></path><path d="m 3700.24,3310 v -652.5 c 0,0 -230,90 -257.5,-142.5 -2.5,-247.5 0,-336.25 0,-336.25 l 257.5,83.75 V 1690 l -258.61,-92.5 V 262.5 L 2735.24,0 v 2360 c 0,0 -15,850 965,950" style="fill:#ed1d33;fill-opacity:1;fill-rule:nonzero;stroke:none" id="path26"></path></g></g></svg></a>
            <small>${getMetadata("Rights")}</small></p>
            `
            return tmpl

            function getMetadata(key) {
                return obj.metadata.filter(m=>(m.label === key)).pop()?.value
            }

            function getThumbnailElement() {
                const src = obj.sequences[0].canvases[0].images[0].resource['@id']?.replace("full/full","full/,250")
                if(src){
                    return `<a target="_blank" href="${obj.sequences[0].canvases[0].images[0].resource['@id']}"><img alt="thumbnail" class="thumbnail" src="${src}" ></a>`
                }
            }
        }
    },
    version: "alpha"
}
