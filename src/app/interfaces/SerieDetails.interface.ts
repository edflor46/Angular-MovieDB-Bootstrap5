// To parse this data:
//
//   import { Convert, SerieDetails } from "./file";
//
//   const serieDetails = Convert.toSerieDetails(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface SerieDetails {
    backdrop_path:        string;
    created_by:           CreatedBy[];
    episode_run_time:     number[];
    first_air_date:       Date;
    genres:               Genre[];
    homepage:             string;
    id:                   number;
    in_production:        boolean;
    languages:            string[];
    last_air_date:        Date;
    last_episode_to_air:  TEpisodeToAir;
    name:                 string;
    next_episode_to_air:  TEpisodeToAir;
    networks:             Network[];
    number_of_episodes:   number;
    number_of_seasons:    number;
    origin_country:       string[];
    original_language:    string;
    original_name:        string;
    overview:             string;
    popularity:           number;
    poster_path:          string;
    production_companies: Network[];
    production_countries: ProductionCountry[];
    seasons:              Season[];
    spoken_languages:     SpokenLanguage[];
    status:               string;
    tagline:              string;
    type:                 string;
    vote_average:         number;
    vote_count:           number;
}

export interface CreatedBy {
    id:           number;
    credit_id:    string;
    name:         string;
    gender:       number;
    profile_path: null;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface TEpisodeToAir {
    air_date:        Date;
    episode_number:  number;
    id:              number;
    name:            string;
    overview:        string;
    production_code: string;
    season_number:   number;
    still_path:      string;
    vote_average:    number;
    vote_count:      number;
}

export interface Network {
    name:           string;
    id:             number;
    logo_path:      string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface Season {
    air_date:      Date;
    episode_count: number;
    id:            number;
    name:          string;
    overview:      string;
    poster_path:   string;
    season_number: number;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toSerieDetails(json: string): SerieDetails {
        return cast(JSON.parse(json), r("SerieDetails"));
    }

    public static serieDetailsToJson(value: SerieDetails): string {
        return JSON.stringify(uncast(value, r("SerieDetails")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "SerieDetails": o([
        { json: "backdrop_path", js: "backdrop_path", typ: "" },
        { json: "created_by", js: "created_by", typ: a(r("CreatedBy")) },
        { json: "episode_run_time", js: "episode_run_time", typ: a(0) },
        { json: "first_air_date", js: "first_air_date", typ: Date },
        { json: "genres", js: "genres", typ: a(r("Genre")) },
        { json: "homepage", js: "homepage", typ: "" },
        { json: "id", js: "id", typ: 0 },
        { json: "in_production", js: "in_production", typ: true },
        { json: "languages", js: "languages", typ: a("") },
        { json: "last_air_date", js: "last_air_date", typ: Date },
        { json: "last_episode_to_air", js: "last_episode_to_air", typ: r("TEpisodeToAir") },
        { json: "name", js: "name", typ: "" },
        { json: "next_episode_to_air", js: "next_episode_to_air", typ: r("TEpisodeToAir") },
        { json: "networks", js: "networks", typ: a(r("Network")) },
        { json: "number_of_episodes", js: "number_of_episodes", typ: 0 },
        { json: "number_of_seasons", js: "number_of_seasons", typ: 0 },
        { json: "origin_country", js: "origin_country", typ: a("") },
        { json: "original_language", js: "original_language", typ: "" },
        { json: "original_name", js: "original_name", typ: "" },
        { json: "overview", js: "overview", typ: "" },
        { json: "popularity", js: "popularity", typ: 3.14 },
        { json: "poster_path", js: "poster_path", typ: "" },
        { json: "production_companies", js: "production_companies", typ: a(r("Network")) },
        { json: "production_countries", js: "production_countries", typ: a(r("ProductionCountry")) },
        { json: "seasons", js: "seasons", typ: a(r("Season")) },
        { json: "spoken_languages", js: "spoken_languages", typ: a(r("SpokenLanguage")) },
        { json: "status", js: "status", typ: "" },
        { json: "tagline", js: "tagline", typ: "" },
        { json: "type", js: "type", typ: "" },
        { json: "vote_average", js: "vote_average", typ: 3.14 },
        { json: "vote_count", js: "vote_count", typ: 0 },
    ], false),
    "CreatedBy": o([
        { json: "id", js: "id", typ: 0 },
        { json: "credit_id", js: "credit_id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "gender", js: "gender", typ: 0 },
        { json: "profile_path", js: "profile_path", typ: null },
    ], false),
    "Genre": o([
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
    ], false),
    "TEpisodeToAir": o([
        { json: "air_date", js: "air_date", typ: Date },
        { json: "episode_number", js: "episode_number", typ: 0 },
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "overview", js: "overview", typ: "" },
        { json: "production_code", js: "production_code", typ: "" },
        { json: "season_number", js: "season_number", typ: 0 },
        { json: "still_path", js: "still_path", typ: "" },
        { json: "vote_average", js: "vote_average", typ: 3.14 },
        { json: "vote_count", js: "vote_count", typ: 0 },
    ], false),
    "Network": o([
        { json: "name", js: "name", typ: "" },
        { json: "id", js: "id", typ: 0 },
        { json: "logo_path", js: "logo_path", typ: "" },
        { json: "origin_country", js: "origin_country", typ: "" },
    ], false),
    "ProductionCountry": o([
        { json: "iso_3166_1", js: "iso_3166_1", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], false),
    "Season": o([
        { json: "air_date", js: "air_date", typ: Date },
        { json: "episode_count", js: "episode_count", typ: 0 },
        { json: "id", js: "id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "overview", js: "overview", typ: "" },
        { json: "poster_path", js: "poster_path", typ: "" },
        { json: "season_number", js: "season_number", typ: 0 },
    ], false),
    "SpokenLanguage": o([
        { json: "english_name", js: "english_name", typ: "" },
        { json: "iso_639_1", js: "iso_639_1", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], false),
};
