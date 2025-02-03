import { i as createComponent, r as renderTemplate, m as maybeRenderHead, n as renderComponent, o as renderScript, p as defineScriptVars, l as addAttribute, j as createAstro, q as renderHead, u as renderSlot } from '../chunks/astro/server_BvsuIkkZ.mjs';
import { $ as $$Image } from '../chunks/_astro_assets_DU5TSv1E.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const version = "5.2.3";
const astroPkg = {
  version};

// src/constants/analytics.ts

// package.json
var package_default = {
  version: "1.3.0"};

// src/constants/analytics.ts
var ASTRO_CLOUDINARY_ANALYTICS_PRODUCT_ID = "B";
var ASTRO_CLOUDINARY_ANALYTICS_ID = "G";
var ASTRO_VERSION = normalizeVersion(astroPkg.version);
var ASTRO_CLOUDINARY_VERSION = normalizeVersion(package_default.version);
function normalizeVersion(version) {
  let normalized = version;
  if (normalized.includes("-")) {
    normalized = normalized.split("-")[0];
  }
  return normalized;
}

// src/lib/cloudinary.ts
var REGEX_VERSION = /\/v\d+\//;
var REGEX_FORMAT = /\.(ai|avif|gif|png|webp|bmp|bw|djvu|dng|ps|ept|eps|eps3|fbx|flif|gif|glb|gltf|heif|heic|ico|indd|jpg|jpe|jpeg|jp2|wdp|jxr|hdp|obj|pdf|ply|png|psd|arw|cr2|svg|tga|tif|tiff|u3ma|usdz|webp|3g2|3gp|avi|flv|m3u8|ts|m2ts|mts|mov|mkv|mp4|mpeg|mpd|mxf|ogv|webm|wmv)$/i;
var REGEX_URL = /https?:\/\/(?<host>[^/]+)\/(?<cloudName>[^/]+)?\/?(?<assetType>image|images|video|videos|raw|files)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)?\/?(?<signature>s--([a-zA-Z0-9_-]{8}|[a-zA-Z0-9_-]{32})--)?\/?(?<transformations>(?:[^_/]+_[^,/]+,?\/?)*\/)*(?<version>v\d+|\w{1,2})\/(?<publicId>[^\s]+)$/;
var ASSET_TYPES_SEO = ["images", "videos", "files"];
var CLOUDINARY_DEFAULT_HOST = "res.cloudinary.com";
function parseUrl(src) {
  if (typeof src !== "string") {
    throw new Error(`Failed to parse URL - Invalid src: Is not a string`);
  }
  const hasVersion = REGEX_VERSION.test(src);
  if (!hasVersion) {
    throw new Error(
      `Failed to parse URL - Invalid src: Does not include version (Ex: /v1234/)`
    );
  }
  const [baseUrlWithExtension, queryString] = src.split("?");
  const format = getFormat(baseUrlWithExtension);
  let baseUrl = baseUrlWithExtension;
  if (format) {
    baseUrl = baseUrlWithExtension.replace(new RegExp(`${format}$`), "");
  }
  const results = baseUrl.match(REGEX_URL);
  const transformations = results?.groups?.transformations?.split("/").filter((t) => !!t);
  const parts = {
    ...results?.groups,
    format,
    seoSuffix: undefined,
    transformations: transformations || [],
    queryParams: {},
    version: results?.groups?.version ? parseInt(results.groups.version.replace("v", "")) : undefined
  };
  if (parts.host === CLOUDINARY_DEFAULT_HOST && !parts.cloudName) {
    throw new Error(
      "Failed to parse URL - Invalid src: Cloudinary URL delivered from res.cloudinary.com must include Cloud Name (ex: res.cloudinary.com/<Cloud Name>/image/...)"
    );
  }
  if (queryString) {
    parts.queryParams = queryString.split("&").reduce((prev, curr) => {
      const [key, value] = curr.split("=");
      prev[key] = value;
      return prev;
    }, {});
  }
  if (parts.assetType && ASSET_TYPES_SEO.includes(parts.assetType)) {
    const publicIdParts = parts.publicId?.split("/") || [];
    parts.seoSuffix = publicIdParts.pop();
    parts.publicId = publicIdParts.join("/");
  }
  if (parts.publicId) {
    parts.publicId = decodeURIComponent(parts.publicId);
  }
  return parts;
}
function getTransformations(src) {
  const { transformations = [] } = parseUrl(src) || {};
  return transformations.map((t) => t.split(","));
}
function getFormat(src) {
  const matches = src.match(REGEX_FORMAT);
  if (matches === null) return;
  return matches[0];
}
function normalizeNumberParameter(param) {
  if (typeof param !== "string") return param;
  return parseInt(param);
}

// src/lib/colors.ts
function testColorIsHex(value) {
  if (typeof value !== "string") return false;
  return !!value.startsWith("#");
}
function convertColorHexToRgb(value) {
  return `rgb:${value.replace("#", "")}`;
}

// src/lib/util.ts
function encodeBase64(value) {
  if (typeof btoa === "function") {
    return btoa(value);
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value).toString("base64");
  }
}
function objectHasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function sortByKey(array = [], key, type = "asc") {
  function compare(a, b) {
    let keyA = a[key];
    let keyB = b[key];
    if (typeof keyA === "string") {
      keyA = keyA.toLowerCase();
    }
    if (typeof keyB === "string") {
      keyB = keyB.toLowerCase();
    }
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  }
  let newArray = [...array];
  newArray = newArray.sort(compare);
  if (type === "desc") {
    return newArray.reverse();
  }
  return newArray;
}

/**
 *
 * @private
 * @param {any} a
 */
function isObject(a) {
    if (typeof a !== 'object' || a instanceof Array) {
        return false;
    }
    else {
        return true;
    }
}
class Config {
    filterOutNonSupportedKeys(userProvidedConfig, validKeys) {
        const obj = Object.create({});
        if (isObject(userProvidedConfig)) {
            Object.keys(userProvidedConfig).forEach((key) => {
                if (validKeys.indexOf(key) >= 0) {
                    obj[key] = userProvidedConfig[key];
                }
                else {
                    console.warn('Warning - unsupported key provided to configuration: ', key);
                }
            });
            return obj;
        }
        else {
            return Object.create({});
        }
    }
}

/**
 * This file is for internal constants only.
 * It is not intended for public use and is not part of the public API
 */
/**
 * @private
 */
const ALLOWED_URL_CONFIG = [
    'cname',
    'secureDistribution',
    'privateCdn',
    'signUrl',
    'longUrlSignature',
    'shorten',
    'useRootPath',
    'secure',
    'forceVersion',
    'analytics',
    'queryParams'
];

class URLConfig extends Config {
    /**
     * @param {IURLConfig} userURLConfig
     */
    constructor(userURLConfig) {
        super();
        const urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
        Object.assign(this, {
            secure: true
        }, urlConfig);
    }
    extend(userURLConfig) {
        const urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
        return new URLConfig(Object.assign({}, this, urlConfig));
    }
    /**
     * @param {string} value Sets the cname
     */
    setCname(value) {
        this.cname = value;
        return this;
    }
    /**
     * @param {string} value Sets the secureDistribution
     */
    setSecureDistribution(value) {
        this.secureDistribution = value;
        return this;
    }
    /**
     * @param {boolean} value Sets whether to use a private CDN (Removes cloudName from URL)
     */
    setPrivateCdn(value) {
        this.privateCdn = value;
        return this;
    }
    /**
     * @param value Sets whether or not to sign the URL
     */
    setSignUrl(value) {
        this.signUrl = value;
        return this;
    }
    /**
     * @param value Sets whether or not to use a long signature
     */
    setLongUrlSignature(value) {
        this.longUrlSignature = value;
        return this;
    }
    /**
     * @param value Sets whether or not to shorten the URL
     */
    setShorten(value) {
        this.shorten = value;
        return this;
    }
    /**
     * @param value Sets whether or not to use a root path
     */
    setUseRootPath(value) {
        this.useRootPath = value;
        return this;
    }
    /**
     * @param value Sets whether or not to deliver the asset through https
     */
    setSecure(value) {
        this.secure = value;
        return this;
    }
    /**
     * @param value Sets whether to force a version in the URL
     */
    setForceVersion(value) {
        this.forceVersion = value;
        return this;
    }
    /**
     * @param params Sets additional params
     */
    setQueryParams(params) {
        this.queryParams = params;
        return this;
    }
}

/**
 * @summary SDK
 * @memberOf SDK
 */
class QualifierValue {
    /**
     *
     * @param {QualifierValue | QualifierValue[] | any[] | string | number}qualifierValue
     */
    constructor(qualifierValue) {
        this.values = [];
        this.delimiter = ':'; // {value}{delimiter}{value}...
        if (this.hasValue(qualifierValue)) {
            this.addValue(qualifierValue);
        }
    }
    /**
     * @description Joins the provided values with the provided delimiter
     */
    toString() {
        return this.values.join(this.delimiter);
    }
    /**
     * @description Checks if the provided argument has a value
     * @param {any} v
     * @private
     * @return {boolean}
     */
    hasValue(v) {
        return typeof v !== 'undefined' && v !== null && v !== '';
    }
    /**
     * @desc Adds a value for the this qualifier instance
     * @param {any} value
     * @return {this}
     */
    addValue(value) {
        // Append value or array of values
        if (Array.isArray(value)) {
            this.values = this.values.concat(value);
        }
        else {
            this.values.push(value);
        }
        // Remove falsy values
        this.values = this.values.filter((v) => this.hasValue(v));
        return this;
    }
    /**
     * @description Sets the delimiter for this instance
     * @param delimiter
     */
    setDelimiter(delimiter) {
        this.delimiter = delimiter;
        return this;
    }
}

class UnsupportedError extends Error {
    constructor(message = 'Unsupported') {
        super(message);
    }
}
/**
 * Creates a new UnsupportedError
 * @param message
 */
function createUnsupportedError(message) {
    return new UnsupportedError(message);
}

/**
 * Returns the action's model
 */
function qualifierToJson() {
    return this._qualifierModel || { error: createUnsupportedError(`unsupported qualifier ${this.constructor.name}`) };
}

class QualifierModel {
    constructor() {
        this._qualifierModel = {};
    }
    toJson() {
        return qualifierToJson.apply(this);
    }
}

/**
 * @summary SDK
 * @memberOf SDK
 */
class Qualifier extends QualifierModel {
    constructor(key, qualifierValue) {
        super();
        this.delimiter = '_'; // {key}{delimiter}{qualifierValue}
        this.key = key;
        if (qualifierValue instanceof QualifierValue) {
            this.qualifierValue = qualifierValue;
        }
        else {
            this.qualifierValue = new QualifierValue();
            this.qualifierValue.addValue(qualifierValue);
        }
    }
    toString() {
        const { key, delimiter, qualifierValue } = this;
        return `${key}${delimiter}${qualifierValue.toString()}`;
    }
    addValue(value) {
        this.qualifierValue.addValue(value);
        return this;
    }
}

/**
 * @memberOf Qualifiers.Flag
 * @extends {SDK.Qualifier}
 * @description the FlagQualifier class
 */
class FlagQualifier extends Qualifier {
    constructor(flagType, flagValue) {
        let qualifierValue;
        if (flagValue) {
            qualifierValue = new QualifierValue([flagType, `${flagValue}`]).setDelimiter(':');
        }
        else {
            qualifierValue = flagType;
        }
        super('fl', qualifierValue);
        this.flagValue = flagValue;
    }
    toString() {
        return super.toString().replace(/\./g, '%2E');
    }
    getFlagValue() {
        return this.flagValue;
    }
}

/**
 * Sort a map by key
 * @private
 * @param map <string, any>
 * @Return array of map's values sorted by key
 */
function mapToSortedArray(map, flags) {
    const array = Array.from(map.entries());
    // objects from the Array.from() method above are stored in array of arrays:
    // [[qualifierKey, QualifierObj], [qualifierKey, QualifierObj]]
    // Flags is an array of FlagQualifierObj
    // We need to convert it to the same form: [flagQualifier] =>  ['fl', flagQualifier]
    flags.forEach((flag) => {
        array.push(['fl', flag]); // push ['fl', flagQualifier]
    });
    return array.sort().map((v) => v[1]);
}

/**
 * Returns the action's model
 */
function actionToJson() {
    var _a, _b, _c;
    const actionModelIsNotEmpty = this._actionModel && Object.keys(this._actionModel).length;
    const sourceTransformationError = (_c = (_b = (_a = this._actionModel) === null || _a === undefined ? undefined : _a.source) === null || _b === undefined ? undefined : _b.transformation) === null || _c === undefined ? undefined : _c.error;
    // Should return error when there is unsupported transformation inside
    if (sourceTransformationError && sourceTransformationError instanceof Error) {
        return { error: sourceTransformationError };
    }
    if (actionModelIsNotEmpty) {
        return this._actionModel;
    }
    return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
}

class ActionModel {
    constructor() {
        this._actionModel = {};
    }
    toJson() {
        return actionToJson.apply(this);
    }
}

/**
 * @summary SDK
 * @memberOf SDK
 * @description Defines the category of transformation to perform.
 */
class Action extends ActionModel {
    constructor() {
        super(...arguments);
        // We're using map, to overwrite existing keys. for example:
        // addParam(w_100).addQualifier(w_200) should result in w_200. and not w_100,w_200
        this.qualifiers = new Map();
        // Unlike regular qualifiers, there can be multiple flags in each url component /fl_1,fl_2/
        // If the falgs are added to the qualifiers map, only a single flag could exist in a component (it's a map)
        // So flags are stored separately until the very end because of that reason
        this.flags = [];
        this.delimiter = ','; // {qualifier}{delimiter}{qualifier} for example: `${'w_100'}${','}${'c_fill'}`
        this.actionTag = ''; // A custom name tag to identify this action in the future
    }
    prepareQualifiers() { }
    /**
     * @description Returns the custom name tag that was given to this action
     * @return {string}
     */
    getActionTag() {
        return this.actionTag;
    }
    /**
     * @description Sets the custom name tag for this action
     * @return {this}
     */
    setActionTag(tag) {
        this.actionTag = tag;
        return this;
    }
    /**
     * @description Calls toString() on all child qualifiers (implicitly by using .join()).
     * @return {string}
     */
    toString() {
        this.prepareQualifiers();
        return mapToSortedArray(this.qualifiers, this.flags).join(this.delimiter);
    }
    /**
     * @description Adds the parameter to the action.
     * @param {SDK.Qualifier} qualifier
     * @return {this}
     */
    addQualifier(qualifier) {
        // if string, find the key and value
        if (typeof qualifier === 'string') {
            const [key, value] = qualifier.toLowerCase().split('_');
            if (key === 'fl') {
                // if string qualifier is a flag, store it in the flags arrays
                this.flags.push(new FlagQualifier(value));
            }
            else {
                // if the string qualifier is not a flag, create a new qualifier from it
                this.qualifiers.set(key, new Qualifier(key, value));
            }
        }
        else {
            // if a qualifier object, insert to the qualifiers map
            this.qualifiers.set(qualifier.key, qualifier);
        }
        return this;
    }
    /**
     * @description Adds a flag to the current action.
     * @param {Qualifiers.Flag} flag
     * @return {this}
     */
    addFlag(flag) {
        if (typeof flag === 'string') {
            this.flags.push(new FlagQualifier(flag));
        }
        else {
            if (flag instanceof FlagQualifier) {
                this.flags.push(flag);
            }
        }
        return this;
    }
    addValueToQualifier(qualifierKey, qualifierValue) {
        this.qualifiers.get(qualifierKey).addValue(qualifierValue);
        return this;
    }
}

/**
 * Returns RGB or Color
 * @private
 * @param color
 */
function prepareColor(color) {
    if (color) {
        return color.match(/^#/) ? `rgb:${color.substr(1)}` : color;
    }
    else {
        return color;
    }
}

/**
 * @extends SDK.Action
 * @description A class for background transformations.
 */
class BackgroundColor extends Action {
    constructor(color) {
        super();
        this._actionModel = {};
        this.addQualifier(new Qualifier('b', new QualifierValue(prepareColor(color)).setDelimiter('_')));
        this._actionModel.color = color;
        this._actionModel.actionType = 'backgroundColor';
    }
    static fromJson(actionModel) {
        const { color } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(color);
        return result;
    }
}

/**
 * @summary SDK
 * @memberOf SDK
 * @description Defines an action that's a string literal, no validations or manipulations are performed
 */
class RawAction {
    constructor(raw) {
        this.raw = raw;
    }
    toString() {
        return this.raw;
    }
    toJson() {
        return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
    }
}

/**
 * Validates obj is an instance of IErrorObject
 * @param obj
 */
function isErrorObject(obj) {
    const errorObj = obj;
    return ('error' in errorObj) && !!errorObj.error;
}

/**
 * @description Defines flags that you can use to alter the default transformation behavior.
 * @namespace Flag
 * @memberOf Qualifiers
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.Flag
 * @description Automatically use lossy compression when delivering animated GIF files.
 *
 * This flag can also be used as a conditional flag for delivering PNG files: it tells Cloudinary to deliver the
 * image in PNG format (as requested) unless there is no transparency channel - in which case deliver in JPEG
 * format.
 * @return {Qualifiers.Flag.FlagQualifier}
 */
function lossy() {
    return new FlagQualifier('lossy');
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Flag
 * @description When used with automatic fetch_format (f_auto): ensures that images with a transparency channel will be
 * delivered in PNG format.
 * @return {Qualifiers.Flag.FlagQualifier}
 */
function preserveTransparency() {
    return new FlagQualifier('preserve_transparency');
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Flag
 * @description Generates a JPG image using the progressive (interlaced) JPG format.
 *
 * This format allows the browser to quickly show a low-quality rendering of the image until the full-quality
 * image is loaded.
 *
 * @param {string} mode? The mode to determine a specific progressive outcome as follows:
 * * semi - A smart optimization of the decoding time, compression level and progressive rendering
 *          (less iterations). This is the default mode when using q_auto.
 * * steep - Delivers a preview very quickly, and in a single later phase improves the image to
 *           the required resolution.
 * * none  - Use this to deliver a non-progressive image. This is the default mode when setting
 *           a specific value for quality.
 * @return {Qualifiers.Flag.FlagQualifier}
 */
function progressive(mode) {
    return new FlagQualifier('progressive', mode);
}

/**
 * @memberOf Qualifiers.Format
 * @extends {SDK.QualifierValue}
 */
class FormatQualifier extends QualifierValue {
    constructor(val) {
        super(val);
        this.val = val;
    }
    getValue() {
        return this.val;
    }
}

/**
 * Flip keys and values for given object
 * @param obj
 */
function objectFlip(obj) {
    const result = {};
    Object.keys(obj).forEach((key) => {
        result[obj[key]] = key;
    });
    return result;
}

/**
 * This file is for internal constants only.
 * It is not intended for public use and is not part of the public API
 */
const ACTION_TYPE_TO_CROP_MODE_MAP = {
    limitFit: 'limit',
    limitFill: 'lfill',
    minimumFit: 'mfit',
    thumbnail: 'thumb',
    limitPad: 'lpad',
    minimumPad: 'mpad',
    autoPad: 'auto_pad'
};
const ACTION_TYPE_TO_DELIVERY_MODE_MAP = {
    colorSpace: 'cs',
    dpr: 'dpr',
    density: 'dn',
    defaultImage: 'd',
    format: 'f',
    quality: 'q'
};
const ACTION_TYPE_TO_EFFECT_MODE_MAP = {
    redEye: 'redeye',
    advancedRedEye: 'adv_redeye',
    oilPaint: 'oil_paint',
    unsharpMask: 'unsharp_mask',
    makeTransparent: 'make_transparent',
    generativeRestore: 'gen_restore',
    upscale: 'upscale'
};
const ACTION_TYPE_TO_QUALITY_MODE_MAP = {
    autoBest: 'auto:best',
    autoEco: 'auto:eco',
    autoGood: 'auto:good',
    autoLow: 'auto:low',
    jpegminiHigh: 'jpegmini:1',
    jpegminiMedium: 'jpegmini:2',
    jpegminiBest: 'jpegmini:0'
};
const ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP = {
    fullHd: 'full_hd',
    fullHdWifi: 'full_hd_wifi',
    fullHdLean: 'full_hd_lean',
    hdLean: 'hd_lean'
};
const CHROMA_VALUE_TO_CHROMA_MODEL_ENUM = {
    444: "CHROMA_444",
    420: "CHROMA_420"
};
const COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP = {
    'noCmyk': 'no_cmyk',
    'keepCmyk': 'keep_cmyk',
    'tinySrgb': 'tinysrgb',
    'srgbTrueColor': 'srgb:truecolor'
};
objectFlip(CHROMA_VALUE_TO_CHROMA_MODEL_ENUM);
objectFlip(COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP);
objectFlip(ACTION_TYPE_TO_CROP_MODE_MAP);
const DELIVERY_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_DELIVERY_MODE_MAP);
objectFlip(ACTION_TYPE_TO_EFFECT_MODE_MAP);
objectFlip(ACTION_TYPE_TO_QUALITY_MODE_MAP);
objectFlip(ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP);

/**
 * @description Qualifies the delivery of an asset.
 * @memberOf Actions.Delivery
 * @extends SDK.Action
 */
class DeliveryAction extends Action {
    /**
     * @param {string} deliveryKey A generic Delivery Action Key (such as q, f, dn, etc.)
     * @param {string} deliveryType A Format Qualifiers for the action, such as Quality.auto()
     * @param {string} modelProperty internal model property of the action, for example quality uses `level` while dpr uses `density`
     * @see Visit {@link Actions.Delivery|Delivery} for an example
     */
    constructor(deliveryKey, deliveryType, modelProperty) {
        super();
        this._actionModel = {};
        let deliveryTypeValue;
        if (deliveryType instanceof FormatQualifier) {
            deliveryTypeValue = deliveryType.getValue();
        }
        else {
            deliveryTypeValue = deliveryType;
        }
        this._actionModel.actionType = DELIVERY_MODE_TO_ACTION_TYPE_MAP[deliveryKey];
        this._actionModel[modelProperty] = deliveryTypeValue;
        this.addQualifier(new Qualifier(deliveryKey, deliveryType));
    }
}

/**
 * @description Contains functions to select the mode when using a progressive format.
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/transformation_reference#fl_progressive|Progressive modes}
 * @memberOf Qualifiers
 * @namespace Progressive
 * @example
 * import {Cloudinary} from "@cloudinary/url-gen";
 * import {format} from "@cloudinary/url-gen/actions/delivery";
 * import {jpg} from "@cloudinary/url-gen/qualifiers/format";
 * import {steep} from "@cloudinary/url-gen/qualifiers/progressive";
 *
 * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
 * const image = yourCldInstance.image('woman');
 * image.delivery(format(jpg()).progressive(steep()))
 */
class ProgressiveQualifier extends FlagQualifier {
    constructor(mode) {
        super('progressive', mode);
    }
}

/**
 * @memberOf Actions.Delivery
 * @extends {Actions.Delivery.DeliveryAction}
 * @see Visit {@link Actions.Delivery|Delivery} for an example
 */
class DeliveryFormatAction extends DeliveryAction {
    constructor(deliveryKey, deliveryType) {
        super(deliveryKey, deliveryType, 'formatType');
    }
    /**
     * @description Uses lossy compression when delivering animated GIF files.
     * @return {this}
     */
    lossy() {
        this._actionModel.lossy = true;
        this.addFlag(lossy());
        return this;
    }
    /**
     * @description Uses progressive compression when delivering JPG file format.
     * @return {this}
     */
    progressive(mode) {
        if (mode instanceof ProgressiveQualifier) {
            this._actionModel.progressive = { mode: mode.getFlagValue() };
            this.addFlag(mode);
        }
        else {
            this._actionModel.progressive = { mode: mode };
            this.addFlag(progressive(mode));
        }
        return this;
    }
    /**
     * @description Ensures that images with a transparency channel are delivered in PNG format.
     */
    preserveTransparency() {
        this._actionModel.preserveTransparency = true;
        this.addFlag(preserveTransparency());
        return this;
    }
    static fromJson(actionModel) {
        const { formatType, lossy, progressive, preserveTransparency } = actionModel;
        let result;
        if (formatType) {
            result = new this('f', formatType);
        }
        else {
            result = new this('f');
        }
        if (progressive) {
            if (progressive.mode) {
                result.progressive(progressive.mode);
            }
            else {
                result.progressive();
            }
        }
        lossy && result.lossy();
        preserveTransparency && result.preserveTransparency();
        return result;
    }
}

/**
 * @summary SDK
 * @description - Defines how to transform an asset
 * @memberOf SDK
 */
class Transformation {
    constructor() {
        this.actions = [];
    }
    /**
     * @param {SDK.Action | string} action
     * @return {this}
     */
    addAction(action) {
        let actionToAdd;
        if (typeof action === 'string') {
            if (action.indexOf('/') >= 0) {
                throw 'addAction cannot accept a string with a forward slash in it - /, use .addTransformation() instead';
            }
            else {
                actionToAdd = new RawAction(action);
            }
        }
        else {
            actionToAdd = action;
        }
        this.actions.push(actionToAdd);
        return this;
    }
    /**
     * @description Allows the injection of a raw transformation as a string into the transformation, or a Transformation instance that was previously created
     * @param {string | SDK.Transformation} tx
     * @example
     * import {Transformation} from "@cloudinary/url-gen";
     *
     * const transformation = new Transformation();
     * transformation.addTransformation('w_100/w_200/w_300');
     * @return {this}
     */
    addTransformation(tx) {
        if (tx instanceof Transformation) {
            // Concat the new actions into the existing actions
            this.actions = this.actions.concat(tx.actions);
        }
        else {
            this.actions.push(new RawAction(tx));
        }
        return this;
    }
    /**
     * @return {string}
     */
    toString() {
        return this.actions
            .map((action) => {
            return action.toString();
        })
            .filter((a) => a)
            .join('/');
    }
    /**
     * @description Delivers an animated GIF.
     * @param {AnimatedAction} animatedAction
     * @return {this}
     */
    animated(animatedAction) {
        return this.addAction(animatedAction);
    }
    /**
     * @description Adds a border around the image.
     * @param {Border} borderAction
     * @return {this}
     */
    border(borderAction) {
        return this.addAction(borderAction);
    }
    /**
     * @description Adjusts the shape of the delivered image. </br>
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#distort|Shape changes and distortion effects}
     * @param {IReshape} reshapeAction
     * @return {this}
     */
    reshape(reshapeAction) {
        return this.addAction(reshapeAction);
    }
    /**
     * @description Resize the asset using provided resize action
     * @param {ResizeSimpleAction} resizeAction
     * @return {this}
     */
    resize(resizeAction) {
        return this.addAction(resizeAction);
    }
    /**
     * @desc An alias to Action Delivery.quality
     * @param {string|number} quality
     * @return {this}
     */
    quality(quality) {
        this.addAction(new DeliveryFormatAction('q', quality));
        return this;
    }
    /**
     * @desc An alias to Action Delivery.format
     * @param {string} format
     * @return {this}
     */
    format(format) {
        this.addAction(new DeliveryFormatAction('f', format));
        return this;
    }
    /**
     * @description Rounds the specified corners of an image.
     * @param roundCornersAction
     * @return {this}
     */
    roundCorners(roundCornersAction) {
        return this.addAction(roundCornersAction);
    }
    /**
     * @description Adds an overlay over the base image.
     * @param {LayerAction} overlayAction
     * @return {this}
     */
    overlay(overlayAction) {
        return this.addAction(overlayAction);
    }
    /**
     * @description Adds an underlay under the base image.
     * @param {LayerAction} underlayAction
     * @return {this}
     */
    underlay(underlayAction) {
        underlayAction.setLayerType('u');
        return this.addAction(underlayAction);
    }
    /**
     * @description Defines an new user variable.
     * @param {VariableAction} variableAction
     * @return {this}
     */
    addVariable(variableAction) {
        return this.addAction(variableAction);
    }
    /**
     * @description Specifies a condition to be met before applying a transformation.
     * @param {ConditionalAction} conditionAction
     * @return {this}
     */
    conditional(conditionAction) {
        return this.addAction(conditionAction);
    }
    /**
     * @description Applies a filter or an effect on an asset.
     * @param {SimpleEffectAction} effectAction
     * @return {this}
     */
    effect(effectAction) {
        return this.addAction(effectAction);
    }
    /**
     * @description Applies adjustment effect on an asset.
     * @param action
     * @return {this}
     */
    adjust(action) {
        return this.addAction(action);
    }
    /**
     * @description Rotates the asset by the given angle.
     * @param {RotateAction} rotateAction
     * @return {this}
     */
    rotate(rotateAction) {
        return this.addAction(rotateAction);
    }
    /**
     * @description Applies a pre-defined named transformation of the given name.
     * @param {NamedTransformation} namedTransformation
     * @return {this}
     */
    namedTransformation(namedTransformation) {
        return this.addAction(namedTransformation);
    }
    /**
     * @description Applies delivery action.
     * @param deliveryAction
     * @return {this}
     */
    delivery(deliveryAction) {
        return this.addAction(deliveryAction);
    }
    /**
     * @description Sets the color of the background.
     * @param {Qualifiers.Color} color
     * @return {this}
     */
    backgroundColor(color) {
        return this.addAction(new BackgroundColor(color));
    }
    /**
     * @description Adds a layer in a Photoshop document.
     * @param action
     * @return {this}
     */
    psdTools(action) {
        return this.addAction(action);
    }
    /**
     * @description Extracts an image or a page using an index, a range, or a name from a layered media asset.
     * @param action
     * @return {this}
     */
    extract(action) {
        return this.addAction(action);
    }
    /**
     * @description Adds a flag as a separate action.
     * @param {Qualifiers.Flag | string} flagQualifier
     * @return {this}
     */
    addFlag(flagQualifier) {
        const action = new Action();
        let flagToAdd = flagQualifier;
        if (typeof flagQualifier === 'string') {
            flagToAdd = new FlagQualifier(flagQualifier);
        }
        action.addQualifier(flagToAdd);
        return this.addAction(action);
    }
    /**
     * @description Inject a custom function into the image transformation pipeline.
     * @return {this}
     */
    customFunction(customFunction) {
        return this.addAction(customFunction);
    }
    /**
     * Transcodes the video (or audio) to another format.
     * @param {Action} action
     * @return {this}
     */
    transcode(action) {
        return this.addAction(action);
    }
    /**
     * Applies the specified video edit action.
     *
     * @param {videoEditType} action
     * @return {this}
     */
    videoEdit(action) {
        return this.addAction(action);
    }
    toJson() {
        const actions = [];
        for (const action of this.actions) {
            const json = action.toJson();
            if (isErrorObject(json)) {
                // Fail early and return an IErrorObject
                return json;
            }
            actions.push(json);
        }
        return { actions };
    }
}

/**
 * @summary SDK
 * @extends {SDK.Transformation}
 * @memberOf SDK
 */
class ImageTransformation extends Transformation {
}

/**
 * @summary SDK
 * @extends {SDK.Transformation}
 * @memberOf SDK
 */
class VideoTransformation extends Transformation {
}

/**
 *
 * @param publicID
 */
function isUrl(publicID) {
    return publicID.match(/^https?:\//);
}

/**
 *
 * @param publicID
 */
function isFileName(publicID) {
    return publicID.indexOf('/') < 0;
}

/**
 *
 * @param publicID
 */
function publicIDContainsVersion(publicID) {
    return publicID.match(/^v[0-9]+/);
}

/**
 * Create the URL prefix for Cloudinary resources.
 * Available use cases
 * http://res.cloudinary.com/{cloudName}
 * https://res.cloudinary.com/{cloudName}
 * https://{cloudName}-res.cloudinary.com/
 * http://{domain}/${cloudName}
 * https://{domain}/${cloudName}
 * https://{domain}
 * @private
 *
 * @param {string} cloudName
 * @param {IURLConfig} urlConfig
 */
function getUrlPrefix(cloudName, urlConfig) {
    const secure = urlConfig.secure;
    const privateCDN = urlConfig.privateCdn;
    const cname = urlConfig.cname;
    const secureDistribution = urlConfig.secureDistribution;
    if (!secure && !cname) {
        return `http://res.cloudinary.com/${cloudName}`;
    }
    if (secure && !secureDistribution && privateCDN) {
        return `https://${cloudName}-res.cloudinary.com`;
    }
    if (secure && !secureDistribution) {
        return `https://res.cloudinary.com/${cloudName}`;
    }
    if (secure && secureDistribution && privateCDN) {
        return `https://${secureDistribution}`;
    }
    if (secure && secureDistribution) {
        return `https://${secureDistribution}/${cloudName}`;
    }
    if (!secure && cname) {
        return `http://${cname}/${cloudName}`;
    }
    else {
        return 'ERROR';
    }
}
/**
 * @private
 * @param assetType
 */
function handleAssetType(assetType) {
    //default to image
    if (!assetType) {
        return 'image';
    }
    return assetType;
}
/**
 * @private
 * @param deliveryType
 */
function handleDeliveryType(deliveryType) {
    //default to upload
    if (!deliveryType) {
        return 'upload';
    }
    return deliveryType;
}
/**
 *
 * @param {string} publicID
 * @param {number} version
 * @param {boolean} forceVersion
 */
function getUrlVersion(publicID, version, forceVersion) {
    const shouldForceVersion = forceVersion !== false;
    if (version) {
        return `v${version}`;
    }
    // In all these conditions we never force a version
    if (publicIDContainsVersion(publicID) || isUrl(publicID) || isFileName(publicID)) {
        return '';
    }
    return shouldForceVersion ? 'v1' : '';
}

/**
 * @private
 * @description Adds left padding to a string with the desired substring the provided number of times
 * @example stringPad(foo, 3, 'a'') // -> aaafoo
 * @param {string} value
 * @param {number} _targetLength
 * @param {string} _padString
 */
function stringPad(value, _targetLength, _padString) {
    let targetLength = _targetLength >> 0; //truncate if number or convert non-number to 0;
    let padString = String((_padString ));
    if (value.length > targetLength) {
        return String(value);
    }
    else {
        targetLength = targetLength - value.length;
        if (targetLength > padString.length) {
            padString += repeatStringNumTimes(padString, targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + String(value);
    }
}
/**
 * @description Repeat a string multiple times, cross-browser-safe alternative to string.repeat()
 * @param string
 * @param _times
 */
function repeatStringNumTimes(string, _times) {
    let times = _times;
    let repeatedString = "";
    while (times > 0) {
        repeatedString += string;
        times--;
    }
    return repeatedString;
}

/**
 * This file maps sequences of 6 bit binary digits to a character in base64.
 * 000000 -> A
 * 110011 -> Z
 * 111111 -> /
 */
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const base64Map = {};
let num = 0;
chars.split('').forEach((char) => {
    let key = num.toString(2);
    key = stringPad(key, 6, '0');
    base64Map[key] = char;
    num++;
});

/**
 * @private
 * @description Reverses the version positions, x.y.z turns to z.y.x
 *              Pads each segment with '0' so they have length of 2
 *              Example: 1.2.3 -> 03.02.01
 * @param {string} semVer Input can be either x.y.z or x.y
 * @return {string} in the form of zz.yy.xx (
 */
function reverseVersion(semVer) {
    if (semVer.split('.').length < 2) {
        throw new Error('invalid semVer, must have at least two segments');
    }
    // Split by '.', reverse, create new array with padded values and concat it together
    return semVer.split('.').reverse().map((segment) => {
        // try to cast to number
        const asNumber = +segment;
        if (isNaN(asNumber) || asNumber < 0) {
            throw 'Invalid version number provided';
        }
        return stringPad(segment, 2, '0');
    }).join('.');
}

/**
 * @private
 * @description Encodes a semVer-like version string
 * @param {string} semVer Input can be either x.y.z or x.y
 * @return {string} A string built from 3 characters of the base64 table that encode the semVer
 */
function encodeVersion(semVer) {
    let strResult = '';
    // support x.y or x.y.z by using 'parts' as a variable
    const parts = semVer.split('.').length;
    const paddedStringLength = parts * 6; // we pad to either 12 or 18 characters
    // reverse (but don't mirror) the version. 1.5.15 -> 15.5.1
    // Pad to two spaces, 15.5.1 -> 15.05.01
    const paddedReversedSemver = reverseVersion(semVer);
    // turn 15.05.01 to a string '150501' then to a number 150501
    const num = parseInt(paddedReversedSemver.split('.').join(''));
    // Represent as binary, add left padding to 12 or 18 characters.
    // 150,501 -> 100100101111100101
    let paddedBinary = num.toString(2);
    paddedBinary = stringPad(paddedBinary, paddedStringLength, '0');
    // Stop in case an invalid version number was provided
    // paddedBinary must be built from sections of 6 bits
    if (paddedBinary.length % 6 !== 0) {
        throw 'Version must be smaller than 43.21.26)';
    }
    // turn every 6 bits into a character using the base64Map
    paddedBinary.match(/.{1,6}/g).forEach((bitString) => {
        // console.log(bitString);
        strResult += base64Map[bitString];
    });
    return strResult;
}

/**
 * @private
 * @description Gets the analyticsOptions from options- should include sdkSemver, techVersion, sdkCode, and feature
 * @param {ITrackedPropertiesThroughAnalytics} options
 * @returns {IAnalyticsOptions}
 */
function getAnalyticsOptions(options) {
    const analyticsOptions = {
        sdkSemver: options.sdkSemver,
        techVersion: options.techVersion,
        sdkCode: options.sdkCode,
        product: options.product,
        feature: '0',
    };
    if (options.accessibility) {
        analyticsOptions.feature = 'D';
    }
    if (options.lazyload) {
        analyticsOptions.feature = 'C';
    }
    if (options.responsive) {
        analyticsOptions.feature = 'A';
    }
    if (options.placeholder) {
        analyticsOptions.feature = 'B';
    }
    return analyticsOptions;
}

const packageVersion = '1.15.0';

/**
 * @private
 * @description Try to get the node version out of process, if browser just return 0.0.0
 */
function getNodeVersion() {
    const failedVersion = '0.0.0';
    if (typeof window !== 'undefined') {
        return failedVersion;
    }
    else {
        // node env
        try {
            return process.versions.node || failedVersion;
        }
        catch (e) {
            return failedVersion;
        }
    }
}
/**
 * @private
 * @description Ensure that all values ITrackedPropertiesThroughAnalytics are populated.
 * Accept a partial map of values and returns the complete interface of ITrackedPropertiesThroughAnalytics
 * @param {ITrackedPropertiesThroughAnalytics} trackedAnalytics
 * @param {ITrackedPropertiesThroughAnalytics} trackedAnalytics
 */
function ensureShapeOfTrackedProperties(trackedAnalytics) {
    // try to get the process version from node, but if we're on the client return 0.0.0
    const defaults = {
        techVersion: getNodeVersion(),
        sdkCode: 'T',
        sdkSemver: packageVersion.split('-')[0],
        product: 'A',
        responsive: false,
        placeholder: false,
        lazyload: false,
        accessibility: false
    };
    if (!trackedAnalytics) {
        return defaults;
    }
    else {
        return Object.assign(Object.assign({}, defaults), trackedAnalytics);
    }
}
/**
 * @private
 * @description Creates the complete SDK signature by using all the values provided by ITrackedPropertiesThroughAnalytics
 *              Creation of the signature
 *              - Set the AlgoVersion of the encoding, this is an internal letter that represents the version
 *                of our encoding algorithm, it will allow us to perform breaking changes if we'll need them.
 *              - Take the constant SDK code (Arbitrary letter chosen for each SDK, for Base that letter is 'T')
 *                this is used to tell apart which SDK is being tracked.
 *              - Take the {major.minor} versions of the node version (techVersion) (14.2, 16.2 etc.)
 *              - Take the full semver of the SDK you wish to track
 *              - Take the features used(lazy, placeholder etc.) and turn them to a letter (for example accessibility -> D)
 *              - Before appending the string, the Versions must be encoded, see the function `encodeVersion` for more details
 *              - Append all the variables to a single string
 *              - In any case of an error, return the single letter 'E'
 *
 * @return {string} sdkAnalyticsSignature
 */
function getSDKAnalyticsSignature(_trackedAnalytics) {
    const trackedAnalytics = ensureShapeOfTrackedProperties(_trackedAnalytics);
    const analyticsOptions = getAnalyticsOptions(trackedAnalytics);
    try {
        const twoPartVersion = removePatchFromSemver(analyticsOptions.techVersion);
        const encodedSDKVersion = encodeVersion(analyticsOptions.sdkSemver);
        const encodedTechVersion = encodeVersion(twoPartVersion);
        const featureCode = analyticsOptions.feature;
        const SDKCode = analyticsOptions.sdkCode;
        const product = analyticsOptions.product;
        const algoVersion = 'B'; // The algo version is determined here, it should not be an argument
        return `${algoVersion}${product}${SDKCode}${encodedSDKVersion}${encodedTechVersion}${featureCode}`;
    }
    catch (e) {
        // Either SDK or Node versions were unparsable
        return 'E';
    }
}
/**
 * @private
 * @description Removes patch version from the semver if it exists
 *              Turns x.y.z OR x.y into x.y
 * @param {'x.y.z' | 'x.y' | string} semVerStr
 */
function removePatchFromSemver(semVerStr) {
    const parts = semVerStr.split('.');
    return `${parts[0]}.${parts[1]}`;
}

/**
 * This const contains all the valid combination of asset/delivery for URL shortening purposes
 * It's exported because it's used in a test, but it's not really shared enough to belong in a separate file
 */
const SEO_TYPES = {
    "image/upload": "images",
    "image/private": "private_images",
    "image/authenticated": "authenticated_images",
    "raw/upload": "files",
    "video/upload": "videos"
};
/**
 * @description Cloudinary file without a transformation
 * @summary SDK
 * @memberOf SDK
 */
class CloudinaryFile {
    constructor(publicID, cloudConfig = {}, urlConfig) {
        this.setPublicID(publicID);
        this.setCloudConfig(cloudConfig);
        this.setURLConfig(urlConfig);
    }
    /**
     * @description Sets the URL Config for this asset
     * @param urlConfig
     * @return {this}
     */
    setURLConfig(urlConfig) {
        this.urlConfig = new URLConfig(urlConfig);
        return this;
    }
    /**
     * @description Sets the Cloud Config for this asset
     * @param urlConfig
     * @return {this}
     */
    setCloudConfig(cloudConfig) {
        this.cloudName = cloudConfig.cloudName;
        this.apiKey = cloudConfig.apiKey;
        this.apiSecret = cloudConfig.apiSecret;
        this.authToken = cloudConfig.authToken;
        return this;
    }
    /**
     * @description Sets the public ID of the asset.
     * @param {string} publicID The public ID of the asset.
     * @return {this}
     */
    setPublicID(publicID) {
        // PublicID must be a string!
        this.publicID = publicID ? publicID.toString() : '';
        return this;
    }
    /**
     * @description Sets the delivery type of the asset.
     * @param {DELIVERY_TYPE | string} newType The type of the asset.
     * @return {this}
     */
    setDeliveryType(newType) {
        this.deliveryType = newType;
        return this;
    }
    /**
     * @description Sets the URL SEO suffix of the asset.
     * @param {string} newSuffix The SEO suffix.
     * @return {this}
     */
    setSuffix(newSuffix) {
        this.suffix = newSuffix;
        return this;
    }
    /**
     * @description Sets the signature of the asset.
     * @param {string} signature The signature.
     * @return {this}
     */
    setSignature(signature) {
        this.signature = signature;
        return this;
    }
    /**
     * @description Sets the version of the asset.
     * @param {string} newVersion The version of the asset.
     * @return {this}
     */
    setVersion(newVersion) {
        if (newVersion) {
            this.version = newVersion;
        }
        return this;
    }
    /**
     * @description Sets the asset type.
     * @param {string} newType The type of the asset.
     * @return {this}
     */
    setAssetType(newType) {
        if (newType) {
            this.assetType = newType;
        }
        return this;
    }
    sign() {
        return this;
    }
    /**
     * @description Serializes to URL string
     * @param overwriteOptions
     */
    toURL(overwriteOptions = {}) {
        return this.createCloudinaryURL(null, overwriteOptions.trackedAnalytics);
    }
    /**
     * @description Validate various options before attempting to create a URL
     * The function will throw in case a violation
     * @throws Validation errors
     */
    validateAssetForURLCreation() {
        if (typeof this.cloudName === 'undefined') {
            throw 'You must supply a cloudName when initializing the asset';
        }
        const suffixContainsDot = this.suffix && this.suffix.indexOf('.') >= 0;
        const suffixContainsSlash = this.suffix && this.suffix.indexOf('/') >= 0;
        if (suffixContainsDot || suffixContainsSlash) {
            throw '`suffix`` should not include . or /';
        }
    }
    /**
     * @description return an SEO friendly name for a combination of asset/delivery, some examples:
     * * image/upload -> images
     * * video/upload -> videos
     * If no match is found, return `{asset}/{delivery}`
     */
    getResourceType() {
        const assetType = handleAssetType(this.assetType);
        const deliveryType = handleDeliveryType(this.deliveryType);
        const hasSuffix = !!this.suffix;
        const regularSEOType = `${assetType}/${deliveryType}`;
        const shortSEOType = SEO_TYPES[`${assetType}/${deliveryType}`];
        const useRootPath = this.urlConfig.useRootPath;
        const shorten = this.urlConfig.shorten;
        // Quick exit incase of useRootPath
        if (useRootPath) {
            if (regularSEOType === 'image/upload') {
                return ''; // For image/upload we're done, just return nothing
            }
            else {
                throw new Error(`useRootPath can only be used with assetType: 'image' and deliveryType: 'upload'. Provided: ${regularSEOType} instead`);
            }
        }
        if (shorten && regularSEOType === 'image/upload') {
            return 'iu';
        }
        if (hasSuffix) {
            if (shortSEOType) {
                return shortSEOType;
            }
            else {
                throw new Error(`URL Suffix only supported for ${Object.keys(SEO_TYPES).join(', ')}, Provided: ${regularSEOType} instead`);
            }
        }
        // If all else fails, return the regular image/upload combination (asset/delivery)
        return regularSEOType;
    }
    getSignature() {
        if (this.signature) {
            return `s--${this.signature}--`;
        }
        else {
            return '';
        }
    }
    /**
     *
     * @description Creates a fully qualified CloudinaryURL
     * @return {string} CloudinaryURL
     * @throws Validation Errors
     */
    createCloudinaryURL(transformation, trackedAnalytics) {
        // In accordance with the existing implementation, if no publicID exists we should return nothing.
        if (!this.publicID) {
            return '';
        }
        // Throws if some options are mis-configured
        // See the function for more information on when it throws
        this.validateAssetForURLCreation();
        const prefix = getUrlPrefix(this.cloudName, this.urlConfig);
        const transformationString = transformation ? transformation.toString() : '';
        const version = getUrlVersion(this.publicID, this.version, this.urlConfig.forceVersion);
        const publicID = this.publicID;
        if (typeof transformation === 'string') {
            const url = [prefix, this.getResourceType(), this.getSignature(), transformationString, version, publicID.replace(/,/g, '%2C'), this.suffix]
                .filter((a) => a)
                .join('/');
            return url;
        }
        else {
            // Avoid applying encodeURI on entire string in case where we have transformations with comma (i.e. f_auto,q_auto)
            // Since encodeURI does not encode commas we replace commas *only* on the publicID
            const safeURL = [
                encodeURI(prefix),
                this.getResourceType(),
                this.getSignature(),
                encodeURI(transformationString),
                version,
                encodeURI(publicID).replace(/,/g, '%2C'),
                this.suffix && encodeURI(this.suffix)
            ]
                .filter((a) => a)
                .join('/')
                .replace(/\?/g, '%3F')
                .replace(/=/g, '%3D');
            const shouldAddAnalytics = this.urlConfig.analytics !== false && !(publicID.includes('?'));
            let queryParamsString = '';
            if (typeof (this.urlConfig.queryParams) === 'object') {
                try {
                    const queryParams = new URLSearchParams(this.urlConfig.queryParams);
                    if (shouldAddAnalytics) {
                        queryParams.set("_a", getSDKAnalyticsSignature(trackedAnalytics));
                    }
                    queryParamsString = queryParams.toString();
                }
                catch (err) {
                    console.error('Error: URLSearchParams is not available so the queryParams object cannot be parsed, please try passing as an already parsed string');
                }
            }
            else {
                queryParamsString = this.urlConfig.queryParams || '';
                if (shouldAddAnalytics) {
                    queryParamsString += `${(queryParamsString.length > 0 ? '&' : '')}_a=${getSDKAnalyticsSignature(trackedAnalytics)}`;
                }
            }
            if (queryParamsString) {
                return `${safeURL}?${queryParamsString}`;
            }
            else {
                return safeURL;
            }
        }
    }
}

/**
 * @desc Cloudinary Transformable interface, extended by any class that needs a Transformation Interface
 * @summary SDK
 * @memberOf SDK
 */
class CloudinaryTransformable extends CloudinaryFile {
    constructor(publicID, cloudConfig, urlConfig, transformation) {
        /* istanbul ignore next */
        super(publicID, cloudConfig, urlConfig);
        this.transformation = transformation;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Animated} animated
     * @return {this}
     */
    animated(animated) {
        this.transformation.animated(animated);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Border} border
     * @return {this}
     */
    border(border) {
        this.transformation.border(border);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Reshape} reshape
     * @return {this}
     */
    reshape(reshape) {
        this.transformation.reshape(reshape);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Resize} resize
     * @return {this}
     */
    resize(resize) {
        this.transformation.resize(resize);
        return this;
    }
    /**
     * @desc An alias to Action Delivery.quality
     * @param {string|number} quality
     * @return {this}
     */
    quality(quality) {
        this.addAction(new DeliveryFormatAction('q', quality));
        return this;
    }
    /**
     * @desc An alias to Action Delivery.format
     * @param {string} format
     * @return {this}
     */
    format(format) {
        this.addAction(new DeliveryFormatAction('f', format));
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.RoundCorners} roundCorners
     * @return {this}
     */
    roundCorners(roundCorners) {
        this.transformation.roundCorners(roundCorners);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @return {this}
     */
    overlay(overlayAction) {
        this.transformation.overlay(overlayAction);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Variable} variableAction
     * @return {this}
     */
    addVariable(variableAction) {
        this.transformation.addVariable(variableAction);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Condition} conditionalAction
     * @return {this}
     */
    conditional(conditionalAction) {
        this.transformation.conditional(conditionalAction);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Effect} effect
     * @return {this}
     */
    effect(effect) {
        this.transformation.effect(effect);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Adjust} action
     * @return {this}
     */
    adjust(action) {
        this.transformation.adjust(action);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Rotate} rotate
     * @return {this}
     */
    rotate(rotate) {
        this.transformation.rotate(rotate);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.NamedTransformation} namedTransformation
     * @return {this}
     */
    namedTransformation(namedTransformation) {
        this.transformation.namedTransformation(namedTransformation);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Delivery} deliveryAction
     * @return {this}
     */
    delivery(deliveryAction) {
        this.transformation.delivery(deliveryAction);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Qualifiers.color} color
     * @return {this}
     */
    backgroundColor(color) {
        this.transformation.backgroundColor(color);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.PSDTools} action
     * @return {this}
     */
    psdTools(action) {
        this.transformation.psdTools(action);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Extract} action
     * @return {this}
     */
    extract(action) {
        this.transformation.extract(action);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Qualifiers.Flag | string} flagQualifier
     * @return {this}
     */
    addFlag(flagQualifier) {
        this.transformation.addFlag(flagQualifier);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.CustomFunction} customFunction
     * @return {this}
     */
    customFunction(customFunction) {
        this.transformation.customFunction(customFunction);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {SDK.Action | string} action
     * @return {this}
     */
    addAction(action) {
        this.transformation.addAction(action);
        return this;
    }
    /**
     * @description Extend your transformation with another transformation
     * @param { string | SDK.Transformation } tx
     */
    addTransformation(tx) {
        this.transformation.addTransformation(tx);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @return {string}
     */
    toString() {
        return this.transformation.toString();
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @return {this}
     */
    underlay(underlayAction) {
        this.transformation.underlay(underlayAction);
        return this;
    }
    toURL(overwriteOptions = {}) {
        return this.createCloudinaryURL(this.transformation, overwriteOptions === null || overwriteOptions === undefined ? undefined : overwriteOptions.trackedAnalytics);
    }
}

/**
 * @desc Cloudinary image asset, with image-related transformations
 * @summary SDK
 * @memberOf SDK
 */
class CloudinaryImage extends CloudinaryTransformable {
    constructor(publicID, cloudConfig, urlConfig) {
        /* istanbul ignore next */
        super(publicID, cloudConfig, urlConfig, new ImageTransformation());
    }
}

/**
 * @desc Cloudinary video asset, with video-related transformations
 * @summary SDK
 * @memberOf SDK
 */
class CloudinaryVideo extends CloudinaryTransformable {
    constructor(publicID, cloudConfig, urlConfig) {
        /* istanbul ignore next */
        super(publicID, cloudConfig, urlConfig, new VideoTransformation());
        this.assetType = 'video';
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Transcode} action
     * @return {this}
     */
    transcode(action) {
        this.transformation.transcode(action);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.VideoEdit} action
     * @return {this}
     */
    videoEdit(action) {
        this.transformation.videoEdit(action);
        return this;
    }
}

class Cloudinary {
    constructor(cloudinaryConfig) {
        if (cloudinaryConfig) {
            this.cloudinaryConfig = cloudinaryConfig;
        }
    }
    image(publicID) {
        return new CloudinaryImage(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
    }
    video(publicID) {
        return new CloudinaryVideo(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
    }
    setConfig(cloudinaryConfig) {
        this.cloudinaryConfig = cloudinaryConfig;
        return this;
    }
    getConfig() {
        return this.cloudinaryConfig;
    }
    extendConfig() {
        // Future implementation
    }
}

// src/lib/cloudinary.ts

// src/lib/plugin.ts
var plugin = (def) => ({
  strict: false,
  alwaysApply: false,
  ...def,
  apply: (cldAsset, ctx) => def.apply(cldAsset, ctx, ctx)
});

// src/plugins/abr.ts
var AbrPlugin = /* @__PURE__ */ plugin({
  name: "Abr",
  supports: "video",
  inferOwnOptions: {},
  props: {
    streamingProfile: true
  },
  apply: (asset, opts) => {
    if (typeof opts.streamingProfile !== "string") return {};
    asset.addTransformation(`sp_${opts.streamingProfile}`);
    return {};
  }
});
var DefaultImagePlugin = /* @__PURE__ */ plugin({
  name: "DefaultImage",
  supports: "image",
  inferOwnOptions: {},
  props: { defaultImage: true },
  apply: (asset, opts) => {
    const { defaultImage } = opts;
    if (typeof defaultImage !== "string") return {};
    if (!getFormat(defaultImage)) {
      console.warn(
        `The defaultImage prop may be missing a format and must include it along with the public ID. (Ex: myimage.jpg)`
      );
    }
    const defaultImageId = defaultImage.replace(/\//g, ":");
    asset.addTransformation(`d_${defaultImageId}`);
    return {};
  }
});
var convertersColors = [
  {
    test: testColorIsHex,
    convert: convertColorHexToRgb
  }
];
var primary = {
  aspectRatio: {
    qualifier: "ar"
  },
  crop: {
    qualifier: "c"
  },
  gravity: {
    qualifier: "g"
  },
  height: {
    qualifier: "h"
  },
  width: { qualifier: "w" }
};
var position = {
  angle: {
    qualifier: "a"
  },
  gravity: {
    qualifier: "g"
  },
  x: { qualifier: "x" },
  y: { qualifier: "y" }
};
var text = {
  alignment: {
    qualifier: false,
    order: 6
  },
  antialias: {
    qualifier: "antialias"
  },
  border: {
    qualifier: "bo",
    location: "primary"
  },
  color: {
    qualifier: "co",
    location: "primary",
    converters: convertersColors
  },
  fontFamily: {
    qualifier: false,
    order: 1
  },
  fontSize: {
    qualifier: false,
    order: 2
  },
  fontStyle: {
    qualifier: false,
    order: 4
  },
  fontWeight: {
    qualifier: false,
    order: 3
  },
  hinting: {
    qualifier: "hinting"
  },
  letterSpacing: {
    qualifier: "letter_spacing"
  },
  lineSpacing: {
    qualifier: "line_spacing"
  },
  stroke: {
    qualifier: "self",
    order: 7
  },
  textDecoration: {
    qualifier: false,
    order: 5
  }
};
var effects = {
  angle: {
    qualifier: "a"
  },
  art: {
    prefix: "e",
    qualifier: "art"
  },
  autoBrightness: {
    prefix: "e",
    qualifier: "auto_brightness"
  },
  autoColor: {
    prefix: "e",
    qualifier: "auto_color"
  },
  autoContrast: {
    prefix: "e",
    qualifier: "auto_contrast"
  },
  assistColorblind: {
    prefix: "e",
    qualifier: "assist_colorblind"
  },
  background: {
    qualifier: "b"
  },
  blackwhite: {
    prefix: "e",
    qualifier: "blackwhite"
  },
  blur: {
    prefix: "e",
    qualifier: "blur"
  },
  blurFaces: {
    prefix: "e",
    qualifier: "blur_faces"
  },
  blurRegion: {
    prefix: "e",
    qualifier: "blur_region"
  },
  border: {
    qualifier: "bo"
  },
  brightness: {
    prefix: "e",
    qualifier: "brightness"
  },
  brightnessHSB: {
    prefix: "e",
    qualifier: "brightness_hsb"
  },
  cartoonify: {
    prefix: "e",
    qualifier: "cartoonify"
  },
  color: {
    qualifier: "co",
    converters: convertersColors
  },
  colorize: {
    prefix: "e",
    qualifier: "colorize"
  },
  contrast: {
    prefix: "e",
    qualifier: "contrast"
  },
  displace: {
    prefix: "e",
    qualifier: "distort"
  },
  distort: {
    prefix: "e",
    qualifier: "distort"
  },
  fillLight: {
    prefix: "e",
    qualifier: "fill_light"
  },
  gamma: {
    prefix: "e",
    qualifier: "gamma"
  },
  gradientFade: {
    prefix: "e",
    qualifier: "gradient_fade"
  },
  grayscale: {
    prefix: "e",
    qualifier: "grayscale"
  },
  hue: {
    prefix: "e",
    qualifier: "hue"
  },
  improve: {
    prefix: "e",
    qualifier: "improve"
  },
  loop: {
    prefix: "e",
    qualifier: "loop"
  },
  multiply: {
    prefix: "e",
    qualifier: "multiply"
  },
  negate: {
    prefix: "e",
    qualifier: "negate"
  },
  noise: {
    prefix: "e",
    qualifier: "noise"
  },
  oilPaint: {
    prefix: "e",
    qualifier: "oil_paint"
  },
  opacity: {
    qualifier: "o"
  },
  outline: {
    prefix: "e",
    qualifier: "outline"
  },
  pixelate: {
    prefix: "e",
    qualifier: "pixelate"
  },
  pixelateFaces: {
    prefix: "e",
    qualifier: "pixelate_faces"
  },
  pixelateRegion: {
    prefix: "e",
    qualifier: "pixelate_region"
  },
  radius: {
    qualifier: "r"
  },
  redeye: {
    prefix: "e",
    qualifier: "redeye"
  },
  replaceColor: {
    prefix: "e",
    qualifier: "replace_color"
  },
  saturation: {
    prefix: "e",
    qualifier: "saturation"
  },
  screen: {
    prefix: "e",
    qualifier: "screen"
  },
  sepia: {
    prefix: "e",
    qualifier: "sepia"
  },
  shadow: {
    prefix: "e",
    qualifier: "shadow"
  },
  sharpen: {
    prefix: "e",
    qualifier: "sharpen"
  },
  shear: {
    prefix: "e",
    qualifier: "shear"
  },
  simulateColorblind: {
    prefix: "e",
    qualifier: "simulate_colorblind"
  },
  tint: {
    prefix: "e",
    qualifier: "tint"
  },
  trim: {
    prefix: "e",
    qualifier: "trim"
  },
  unsharpMask: {
    prefix: "e",
    qualifier: "unsharp_mask"
  },
  vectorize: {
    prefix: "e",
    qualifier: "vectorize"
  },
  vibrance: {
    prefix: "e",
    qualifier: "vibrance"
  },
  vignette: {
    prefix: "e",
    qualifier: "vignette"
  }
};

// src/lib/transformations.ts
function constructTransformation({
  prefix,
  qualifier,
  value,
  converters
}) {
  let transformation = "";
  if (prefix) {
    transformation = `${prefix}_`;
  }
  let transformationValue = value;
  converters?.forEach(({ test, convert }) => {
    if (!test(transformationValue)) return;
    transformationValue = convert(transformationValue);
  });
  if (transformationValue === true || transformationValue === "true") {
    return `${transformation}${qualifier}`;
  }
  if (typeof transformationValue === "string" || typeof transformationValue === "number") {
    if (prefix) {
      return `${transformation}${qualifier}:${transformationValue}`;
    } else {
      return `${qualifier}_${transformationValue}`;
    }
  }
}
function promptArrayToString(promptArray) {
  return `(${promptArray.join(";")})`;
}

// src/lib/utils.ts
var isArray = Array.isArray;
var entriesOf = Object.entries;
var throwError = (message, ctor = Error) => {
  throw new ctor(message);
};

// src/plugins/effects.ts
var EffectsPlugin = /* @__PURE__ */ plugin({
  name: "Effects",
  supports: "all",
  inferOwnOptions: {},
  props: {
    angle: true,
    art: true,
    autoBrightness: true,
    autoColor: true,
    autoContrast: true,
    assistColorblind: true,
    background: true,
    blackwhite: true,
    blur: true,
    blurFaces: true,
    blurRegion: true,
    border: true,
    brightness: true,
    brightnessHSB: true,
    cartoonify: true,
    color: true,
    colorize: true,
    contrast: true,
    displace: true,
    distort: true,
    fillLight: true,
    gamma: true,
    gradientFade: true,
    grayscale: true,
    hue: true,
    improve: true,
    loop: true,
    multiply: true,
    negate: true,
    noise: true,
    oilPaint: true,
    opacity: true,
    outline: true,
    pixelate: true,
    pixelateFaces: true,
    pixelateRegion: true,
    radius: true,
    redeye: true,
    replaceColor: true,
    saturation: true,
    screen: true,
    sepia: true,
    shadow: true,
    sharpen: true,
    shear: true,
    simulateColorblind: true,
    tint: true,
    trim: true,
    unsharpMask: true,
    vectorize: true,
    vibrance: true,
    vignette: true,
    effects: true
  },
  apply: (cldAsset, opts) => {
    const transformationStrings = constructTransformationString({
      effects,
      options: opts
    });
    transformationStrings.forEach((transformation) => {
      if (transformation) {
        cldAsset.addTransformation(transformation);
      }
    });
    if (isArray(opts?.effects)) {
      opts?.effects.forEach((effectsSet) => {
        const transformationString = constructTransformationString({
          effects,
          options: effectsSet
        }).filter((t) => !!t).join(",");
        cldAsset.addTransformation(transformationString);
      });
    }
    function constructTransformationString({
      effects: effects2,
      options
    }) {
      return Object.keys(effects2).map(
        (key) => {
          const { prefix, qualifier, converters } = effects2[key];
          return constructTransformation({
            qualifier,
            prefix,
            value: options?.[key],
            converters
          });
        }
      );
    }
    return {};
  }
});
var defaultCrop = "pad";
var FillBackgroundPlugin = /* @__PURE__ */ plugin({
  name: "FillBackground",
  supports: "image",
  inferOwnOptions: {},
  props: {
    fillBackground: true
  },
  apply: (cldAsset, opts, ctx) => {
    const { fillBackground } = opts;
    if (typeof fillBackground === "undefined") return {};
    const width = normalizeNumberParameter(ctx.width);
    const height = normalizeNumberParameter(ctx.height);
    const hasDefinedDimensions = typeof height === "number" && typeof width === "number";
    let aspectRatio = ctx.aspectRatio;
    if (!aspectRatio && hasDefinedDimensions) {
      aspectRatio = `${width}:${height}`;
    }
    if (!aspectRatio) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `Could not determine aspect ratio based on available options to use fillBackground. Please specify width and height or an aspect ratio.`
        );
      }
      return {};
    }
    if (fillBackground === true) {
      const properties = [
        "b_gen_fill",
        `ar_${aspectRatio}`,
        `c_${defaultCrop}`
      ];
      cldAsset.addTransformation(properties.join(","));
    } else if (typeof fillBackground === "object") {
      const { crop = defaultCrop, gravity, prompt } = fillBackground;
      const properties = [`ar_${aspectRatio}`, `c_${crop}`];
      if (typeof prompt === "string") {
        properties.unshift(`b_gen_fill:${prompt}`);
      } else {
        properties.unshift(`b_gen_fill`);
      }
      if (typeof gravity === "string") {
        properties.push(`g_${gravity}`);
      }
      cldAsset.addTransformation(properties.join(","));
    }
    return {};
  }
});

// src/plugins/flags.ts
var FlagsPlugin = /* @__PURE__ */ plugin({
  name: "Flags",
  supports: "all",
  inferOwnOptions: {},
  props: {
    flags: true
  },
  apply: (cldAsset, { flags }) => {
    if (typeof flags === "string") {
      flags = [flags];
    }
    if (isArray(flags)) {
      flags.forEach((flag) => cldAsset.addFlag(flag));
    } else if (typeof flags === "object") {
      Object.entries(flags).forEach(([qualifier, value]) => {
        cldAsset.addTransformation(`fl_${qualifier}:${value}`);
      });
    }
    return {};
  }
});
var PreserveTransformationsPlugin = /* @__PURE__ */ plugin({
  name: "PreserveTransformations",
  supports: "all",
  inferOwnOptions: {},
  props: {
    preserveTransformations: true
  },
  apply: (cldAsset, opts, ctx) => {
    const { preserveTransformations = false } = opts;
    if (preserveTransformations) {
      try {
        if (ctx.src === void 0) {
          throw new Error("options.src was undefined");
        }
        const transformations = getTransformations(ctx.src).map(
          (t) => t.join(",")
        );
        transformations.flat().forEach((transformation) => {
          cldAsset.addTransformation(transformation);
        });
      } catch (e) {
        console.warn(
          `Failed to preserve transformations: ${e.message}`
        );
      }
    }
    return {};
  }
});

// src/plugins/raw-transformations.ts
var RawTransformationsPlugin = /* @__PURE__ */ plugin({
  name: "RawTransformations",
  supports: "all",
  inferOwnOptions: {},
  props: {
    rawTransformations: true
  },
  apply: (cldAsset, opts) => {
    let { rawTransformations = [] } = opts;
    if (!isArray(rawTransformations)) {
      rawTransformations = [rawTransformations];
    }
    rawTransformations.forEach((transformation) => {
      cldAsset.addTransformation(transformation);
    });
    return {};
  }
});

// src/plugins/recolor.ts
var RecolorPlugin = /* @__PURE__ */ plugin({
  name: "Recolor",
  supports: "image",
  inferOwnOptions: {},
  props: {
    recolor: true
  },
  apply: (cldAsset, opts) => {
    const { recolor } = opts;
    const recolorOptions = {
      prompt: undefined,
      "to-color": undefined,
      multiple: undefined
    };
    if (isArray(recolor)) {
      if (isArray(recolor[0])) {
        recolorOptions.prompt = promptArrayToString(recolor[0]);
      } else {
        recolorOptions.prompt = recolor[0];
      }
      if (typeof recolor[1] === "string") {
        recolorOptions["to-color"] = recolor[1];
      }
    } else if (typeof recolor === "object") {
      if (typeof recolor.prompt === "string") {
        recolorOptions.prompt = recolor.prompt;
      } else if (isArray(recolor.prompt)) {
        recolorOptions.prompt = promptArrayToString(recolor.prompt);
      }
      if (typeof recolor.to === "string") {
        recolorOptions["to-color"] = recolor.to;
      }
      if (recolor.multiple === true) {
        recolorOptions.multiple = `true`;
      }
    }
    const transformation = Object.entries(recolorOptions).filter(([, value]) => !!value).map(([key, value]) => `${key}_${value}`).join(";");
    if (transformation) {
      cldAsset.addTransformation(`e_gen_recolor:${transformation}`);
    }
    return {};
  }
});

// src/plugins/remove-background.ts
var RemoveBackgroundPlugin = /* @__PURE__ */ plugin({
  name: "RemoveBackground",
  supports: "image",
  inferOwnOptions: {},
  props: {
    removeBackground: true
  },
  apply: (cldAsset, opts) => {
    if (opts.removeBackground) {
      cldAsset.addTransformation("e_background_removal");
    }
    return {};
  }
});

// src/plugins/remove.ts
var RemovePlugin = /* @__PURE__ */ plugin({
  name: "Remove",
  supports: "image",
  inferOwnOptions: {},
  props: {
    remove: true
  },
  apply: (cldAsset, opts) => {
    const { remove } = opts;
    const removeOptions = {
      prompt: undefined,
      region: undefined,
      multiple: undefined,
      "remove-shadow": undefined
    };
    if (typeof remove === "string") {
      removeOptions.prompt = remove;
    } else if (isArray(remove)) {
      removeOptions.prompt = promptArrayToString(remove);
    } else if (typeof remove === "object") {
      const hasPrompt = typeof remove.prompt === "string" || isArray(remove.prompt);
      const hasRegion = isArray(remove.region);
      if (hasPrompt && hasRegion) {
        throw new Error(
          "Invalid remove options: you can not have both a prompt and a region. More info: https://cloudinary.com/documentation/transformation_reference#e_gen_remove"
        );
      }
      if (typeof remove.prompt === "string") {
        removeOptions.prompt = remove.prompt;
      } else if (isArray(remove.prompt)) {
        removeOptions.prompt = promptArrayToString(remove.prompt);
      }
      if (isArray(remove.region)) {
        removeOptions.region = regionArrayToString(remove.region);
      }
      if (remove.multiple === true) {
        removeOptions.multiple = `true`;
      }
      if (remove.removeShadow === true) {
        removeOptions["remove-shadow"] = `true`;
      }
    }
    const transformation = Object.entries(removeOptions).filter(([, value]) => !!value).map(([key, value]) => `${key}_${value}`).join(";");
    if (transformation) {
      cldAsset.addTransformation(`e_gen_remove:${transformation}`);
    }
    return {};
  }
});
function regionArrayToString(regionArray) {
  const indexes = {
    0: "x",
    1: "y",
    2: "w",
    3: "h"
  };
  const regionString = regionArray.map((region, index) => {
    if (isArray(region)) {
      return regionArrayToString(region);
    }
    const key = indexes[index];
    return `${key}_${region}`;
  }).join(";");
  return `(${regionString})`;
}

// src/plugins/replace-background.ts
var ReplaceBackgroundPlugin = /* @__PURE__ */ plugin({
  name: "ReplaceBackground",
  supports: "image",
  inferOwnOptions: {},
  props: {
    replaceBackground: true
  },
  apply: (cldAsset, opts) => {
    const { replaceBackground } = opts;
    if (!replaceBackground) return {};
    const properties = [];
    if (typeof replaceBackground === "object") {
      if (typeof replaceBackground.prompt !== "undefined") {
        properties.push(`prompt_${replaceBackground.prompt}`);
      }
      if (typeof replaceBackground.seed === "number") {
        properties.push(`seed_${replaceBackground.seed}`);
      }
    } else if (typeof replaceBackground === "string") {
      properties.push(`prompt_${replaceBackground}`);
    }
    let transformation = "e_gen_background_replace";
    if (properties.length > 0) {
      transformation = `${transformation}:${properties.join(";")}`;
    }
    cldAsset.addTransformation(transformation);
    return {};
  }
});

// src/plugins/replace.ts
var ReplacePlugin = /* @__PURE__ */ plugin({
  name: "Replace",
  supports: "image",
  inferOwnOptions: {},
  props: {
    replace: true
  },
  apply: (cldAsset, opts) => {
    const { replace } = opts;
    if (!replace) return {};
    let from, to, preserveGeometry = false;
    if (isArray(replace)) {
      from = replace[0];
      to = replace[1];
      preserveGeometry = replace[2] || false;
    } else {
      from = replace.from;
      to = replace.to;
      preserveGeometry = replace.preserveGeometry || false;
    }
    const properties = [`e_gen_replace:from_${from}`, `to_${to}`];
    if (preserveGeometry) {
      properties.push(`preserve-geometry_${preserveGeometry}`);
    }
    cldAsset.addTransformation(properties.join(";"));
    return {};
  }
});

// src/plugins/restore.ts
var RestorePlugin = /* @__PURE__ */ plugin({
  name: "Restore",
  supports: "image",
  inferOwnOptions: {},
  props: {
    restore: true
  },
  apply: (cldAsset, opts) => {
    const { restore } = opts;
    if (restore) {
      cldAsset.addTransformation("e_gen_restore");
    }
    return {};
  }
});

// src/plugins/sanitize.ts
var SanitizePlugin = /* @__PURE__ */ plugin({
  name: "Sanitize",
  supports: "image",
  inferOwnOptions: {},
  props: {
    sanitize: true
  },
  alwaysApply: true,
  apply: (cldAsset, opts, ctx) => {
    const { sanitize = true } = opts;
    const shouldApplySanitizer = sanitize && (ctx.format === "svg" || cldAsset.publicID.endsWith(".svg"));
    if (shouldApplySanitizer) {
      cldAsset.addTransformation("fl_sanitize");
    }
    return {};
  }
});

// src/plugins/seo.ts
var SeoPlugin = /* @__PURE__ */ plugin({
  name: "Seo",
  supports: "all",
  inferOwnOptions: {},
  props: {
    seoSuffix: true
  },
  apply: (cldAsset, opts, ctx) => {
    const { seoSuffix } = opts;
    if (typeof seoSuffix !== "string") return {};
    if (ctx.deliveryType === "fetch") {
      console.warn("SEO suffix is not supported with a delivery type of fetch");
    } else {
      cldAsset.setSuffix(seoSuffix);
    }
    return {};
  }
});
var UnderlaysPlugin = /* @__PURE__ */ plugin({
  name: "Underlays",
  supports: "all",
  inferOwnOptions: {},
  props: {
    underlay: true,
    underlays: true
  },
  apply: (cldAsset, opts) => {
    const { underlay, underlays = [] } = opts;
    const typeQualifier = "u";
    if (isArray(underlays)) {
      underlays.forEach(applyUnderlay);
    }
    if (typeof underlay === "string") {
      const underlayOptions = {
        publicId: underlay,
        crop: "fill",
        width: "1.0",
        height: "1.0",
        flags: ["relative"]
      };
      applyUnderlay(underlayOptions);
    }
    function applyUnderlay({
      publicId,
      type,
      position: position2,
      effects: layerEffects = [],
      flags: layerFlags = [],
      appliedFlags = [],
      ...options
    }) {
      const hasPublicId = typeof publicId === "string";
      const hasPosition = typeof position2 === "object";
      if (!hasPublicId) {
        console.warn(`An ${type} is missing a Public ID`);
        return;
      }
      let layerTransformation = `${typeQualifier}_${publicId.replace(
        /\//g,
        ":"
      )}`;
      const primary2 = [];
      const applied = [];
      entriesOf(options).forEach(([key, value]) => {
        if (!objectHasKey(primary, key)) return;
        const { qualifier } = primary[key];
        primary2.push(`${qualifier}_${value}`);
      });
      layerEffects.forEach((effect) => {
        Object.keys(effect).forEach((key) => {
          if (!objectHasKey(primary, key)) return;
          const { qualifier } = primary[key];
          primary2.push(`${qualifier}_${effect[key]}`);
        });
      });
      if (hasPosition) {
        entriesOf(position2).forEach(([key, value]) => {
          if (!objectHasKey(position, key)) return;
          const { qualifier } = position[key];
          applied.push(`${qualifier}_${value}`);
        });
      }
      const activeLayerFlags = isArray(layerFlags) ? layerFlags : [layerFlags];
      activeLayerFlags.forEach((flag) => primary2.push(`fl_${flag}`));
      const activeAppliedFlags = isArray(appliedFlags) ? appliedFlags : [appliedFlags];
      activeAppliedFlags.forEach((flag) => applied.push(`fl_${flag}`));
      layerTransformation = `${layerTransformation},${primary2.join(",")}`;
      layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;
      if (applied.length > 0) {
        layerTransformation = `${layerTransformation},${applied.join(",")}`;
      }
      cldAsset.addTransformation(layerTransformation);
    }
    return {};
  }
});

// src/plugins/zoompan.ts
var ZoompanPlugin = /* @__PURE__ */ plugin({
  name: "Zoompan",
  supports: "image",
  inferOwnOptions: {},
  props: {
    zoompan: true
  },
  apply: (cldAsset, opts) => {
    const { zoompan = false } = opts;
    const overrides = {
      format: undefined
    };
    if (zoompan === true) {
      cldAsset.addTransformation("e_zoompan");
    } else if (typeof zoompan === "string") {
      if (zoompan === "loop") {
        cldAsset.addTransformation("e_zoompan");
        cldAsset.addTransformation("e_loop");
      } else {
        cldAsset.addTransformation(`e_zoompan:${zoompan}`);
      }
    } else if (typeof zoompan === "object") {
      let zoompanEffect = "e_zoompan";
      if (typeof zoompan.options === "string") {
        zoompanEffect = `${zoompanEffect}:${zoompan.options}`;
      }
      cldAsset.addTransformation(zoompanEffect);
      let loopEffect;
      if (zoompan.loop === true) {
        loopEffect = "e_loop";
      } else if (typeof zoompan.loop === "string" || typeof zoompan.loop === "number") {
        loopEffect = `e_loop:${zoompan.loop}`;
      }
      if (loopEffect) {
        cldAsset.addTransformation(loopEffect);
      }
    }
    if (zoompan !== false) {
      overrides.format = "auto:animated";
    }
    return {
      options: overrides
    };
  }
});
var cropsAspectRatio = ["auto", "crop", "fill", "lfill", "fill_pad", "thumb"];
var cropsGravityAuto = ["auto", "crop", "fill", "lfill", "fill_pad", "thumb"];
var cropsWithZoom = ["crop", "thumb"];
var DEFAULT_CROP = "limit";
var CroppingPlugin = /* @__PURE__ */ plugin({
  name: "Cropping",
  supports: "all",
  inferOwnOptions: {},
  props: {
    aspectRatio: true,
    crop: true,
    gravity: true,
    zoom: true,
    height: true,
    width: true
  },
  // crop is applied even if the crop key is undefined
  apply: (asset, opts) => {
    let crops = [];
    if (typeof opts.crop === "string" || typeof opts.crop === "undefined") {
      crops.push({
        aspectRatio: opts.aspectRatio,
        height: opts.height,
        gravity: opts.gravity,
        type: opts.crop || DEFAULT_CROP,
        width: opts.width,
        zoom: opts.zoom
      });
    } else if (typeof opts.crop === "object" && !isArray(opts.crop)) {
      crops.push(opts.crop);
    } else if (isArray(opts.crop)) {
      crops = [...opts.crop];
    }
    if (crops.length === 1 && crops[0].source === true) {
      crops.push({
        aspectRatio: opts.aspectRatio,
        width: opts.width,
        height: opts.height,
        gravity: opts.gravity,
        type: DEFAULT_CROP,
        zoom: opts.zoom
      });
    }
    const finalTransformations = [];
    const sourceTransformations = [];
    for (const crop of crops) {
      const cropDimensions = {
        width: crop.width,
        height: crop.height
      };
      if (typeof cropDimensions.width === "undefined" && typeof crop.aspectRatio === "undefined") {
        cropDimensions.width = opts.width;
        if (typeof cropDimensions.height === "undefined") {
          cropDimensions.height = opts.height;
        }
      }
      const transformations = collectTransformations({
        aspectRatio: crop.aspectRatio,
        gravity: crop.gravity,
        type: crop.type || DEFAULT_CROP,
        x: crop.x,
        y: crop.y,
        zoom: crop.zoom,
        ...cropDimensions
      });
      if (transformations.length > 0) {
        if (crop.source === true) {
          sourceTransformations.push(transformations);
        } else {
          finalTransformations.push(transformations);
        }
      }
    }
    sourceTransformations.forEach((transformation) => {
      if (transformation.length > 0) {
        asset.addTransformation(transformation.join(","));
      }
    });
    const results = {
      options: {}
    };
    if (results.options && finalTransformations.length > 0) {
      results.options.resize = finalTransformations.map((transformation) => transformation.join(",")).join("/");
    }
    return results;
  }
});
function collectTransformations(collectOptions) {
  const { aspectRatio, type: crop, x, y, zoom } = collectOptions;
  let gravity = collectOptions.gravity;
  const height = normalizeNumberParameter(collectOptions.height);
  const width = normalizeNumberParameter(collectOptions.width);
  const transformations = [];
  const hasDefinedDimensions = height || width;
  const hasValidAspectRatio = aspectRatio && cropsAspectRatio.includes(crop);
  const hasXCoordinate = typeof x === "number" || typeof x === "string";
  const hasYCoordinate = typeof y === "number" || typeof y === "string";
  const hasDefinedCoordinates = hasXCoordinate || hasYCoordinate;
  if (crop && (hasDefinedDimensions || hasValidAspectRatio || hasDefinedCoordinates)) {
    transformations.push(`c_${crop}`);
  }
  if (hasValidAspectRatio) {
    transformations.push(`ar_${aspectRatio}`);
  }
  if (width) {
    transformations.push(`w_${width}`);
  }
  if (!["limit"].includes(crop) && typeof height === "number") {
    transformations.push(`h_${height}`);
  }
  if (hasXCoordinate) {
    transformations.push(`x_${x}`);
  }
  if (hasYCoordinate) {
    transformations.push(`y_${y}`);
  }
  if (!gravity && cropsGravityAuto.includes(crop) && !hasDefinedCoordinates) {
    gravity = "auto";
  }
  if (gravity) {
    if (gravity === "auto" && !cropsGravityAuto.includes(crop)) {
      console.warn(
        `Auto gravity can only be used with crop modes: ${cropsGravityAuto.join(
          ", "
        )}. Not applying gravity.`
      );
    } else {
      transformations.push(`g_${gravity}`);
    }
  }
  if (zoom) {
    if (zoom === "auto" && !cropsWithZoom.includes(crop)) {
      console.warn(
        `Zoom can only be used with crop modes: ${cropsWithZoom.join(
          ", "
        )}. Not applying zoom.`
      );
    } else {
      transformations.push(`z_${zoom}`);
    }
  }
  return transformations;
}

// src/plugins/enhance.ts
var EnhancePlugin = /* @__PURE__ */ plugin({
  name: "Enhance",
  supports: "image",
  inferOwnOptions: {},
  props: {
    enhance: true
  },
  apply: (cldAsset, opts) => {
    if (opts.enhance) {
      cldAsset.addTransformation("e_enhance");
    }
    return {};
  }
});

// src/plugins/extract.ts
var ExtractPlugin = /* @__PURE__ */ plugin({
  name: "Extract",
  supports: "image",
  inferOwnOptions: {},
  props: {
    extract: true
  },
  apply: (cldAsset, { extract }) => {
    const properties = [];
    if (typeof extract === "string") {
      properties.push(`prompt_${extract}`);
    } else if (isArray(extract)) {
      properties.push(`prompt_${formatPrompts(extract)}`);
    } else {
      const prompt = formatPrompts(extract.prompt);
      if (prompt) {
        properties.push(`prompt_${prompt}`);
      }
      if (extract.invert === true) {
        properties.push("invert_true");
      }
      if (typeof extract.mode === "string") {
        properties.push(`mode_${extract.mode}`);
      }
      if (extract.multiple === true) {
        properties.push("multiple_true");
      }
    }
    if (properties.length > 0) {
      const transformation = `e_extract:${properties.join(";")}`;
      cldAsset.addTransformation(transformation);
    }
    return {};
  }
});
function formatPrompts(prompts) {
  if (typeof prompts === "string") return prompts;
  if (isArray(prompts)) {
    return `(${prompts.filter((prompt) => typeof prompt === "string").join(";")})`;
  }
  return undefined;
}

// src/plugins/named-transformations.ts
var NamedTransformationsPlugin = /* @__PURE__ */ plugin({
  name: "NamedTransformations",
  strict: true,
  supports: "all",
  inferOwnOptions: {},
  props: {
    namedTransformations: true,
    transformations: true
  },
  apply: (cldAsset, opts) => {
    const { transformations, namedTransformations } = opts;
    if (transformations && process.env.NODE_ENVIRONMENT === "development") {
      console.warn(
        "The transformations prop is deprecated. Please use namedTransformations instead."
      );
    }
    let _namedTransformations = namedTransformations || transformations || [];
    if (!isArray(_namedTransformations)) {
      _namedTransformations = [_namedTransformations];
    }
    _namedTransformations.forEach((transformation) => {
      cldAsset.addTransformation(`t_${transformation}`);
    });
    return {};
  }
});
var DEFAULT_TEXT_OPTIONS = {
  color: "black",
  fontFamily: "Arial",
  fontSize: 200,
  fontWeight: "bold"
};
var OverlaysPlugin = /* @__PURE__ */ plugin({
  name: "Overlays",
  supports: "all",
  inferOwnOptions: {},
  props: {
    overlays: true,
    text: true
  },
  apply: (cldAsset, opts) => {
    const { text: text2, overlays = [] } = opts;
    const type = "overlay";
    const typeQualifier = "l";
    if (isArray(overlays)) {
      overlays.forEach(applyOverlay);
    }
    if (typeof text2 === "string") {
      applyOverlay({
        text: Object.assign({}, DEFAULT_TEXT_OPTIONS, {
          text: text2
        })
      });
    } else if (typeof text2 === "object") {
      applyOverlay({
        text: Object.assign({}, DEFAULT_TEXT_OPTIONS, text2)
      });
    }
    function applyOverlay({
      publicId,
      url,
      position: position2,
      text: text3,
      effects: layerEffects = [],
      appliedEffects = [],
      flags: layerFlags = [],
      appliedFlags = [],
      ...options
    }) {
      const hasPublicId = typeof publicId === "string";
      const hasUrl = typeof url === "string";
      const hasText = typeof text3 === "object" || typeof text3 === "string";
      const hasPosition = typeof position2 === "object";
      if (!hasPublicId && !hasUrl && !hasText) {
        console.warn(`An ${type} is missing Public ID, URL, or Text`);
        return;
      }
      let layerTransformation;
      if (hasText) {
        layerTransformation = `${typeQualifier}_text`;
      } else if (hasPublicId) {
        layerTransformation = `${typeQualifier}_${publicId.replace(
          /\//g,
          ":"
        )}`;
      } else if (hasUrl) {
        layerTransformation = `${typeQualifier}_fetch:${encodeBase64(url)}`;
      }
      const primary2 = [];
      const applied = [];
      Object.keys(options).forEach((key) => {
        if (!objectHasKey(primary, key)) return;
        const { qualifier, converters } = primary[key];
        const transformation = constructTransformation({
          qualifier,
          value: options[key],
          converters
        });
        if (transformation) {
          primary2.push(transformation);
        }
      });
      layerEffects.forEach((effect) => {
        Object.keys(effect).forEach((key) => {
          const effectQualifier = primary[key] || effects[key] || position[key];
          if (!effectQualifier) return;
          const { qualifier, prefix, converters } = effectQualifier;
          const transformation = constructTransformation({
            qualifier,
            prefix,
            value: effect[key],
            converters
          });
          if (transformation) {
            primary2.push(transformation);
          }
        });
      });
      appliedEffects.forEach((effect) => {
        Object.keys(effect).forEach((key) => {
          const effectQualifier = primary[key] || effects[key] || position[key];
          if (!effectQualifier) return;
          const { qualifier, prefix, converters } = effectQualifier;
          const transformation = constructTransformation({
            qualifier,
            prefix,
            value: effect[key],
            converters
          });
          if (transformation) {
            applied.push(transformation);
          }
        });
      });
      const activeLayerFlags = isArray(layerFlags) ? layerFlags : [layerFlags];
      activeLayerFlags.forEach((flag) => {
        primary2.push(`fl_${flag}`);
      });
      const activeAppliedFlags = isArray(appliedFlags) ? appliedFlags : [appliedFlags];
      activeAppliedFlags.forEach((flag) => {
        applied.push(`fl_${flag}`);
      });
      if (hasText) {
        if (typeof text3 === "string") {
          text3 = {
            ...DEFAULT_TEXT_OPTIONS,
            text: text3
          };
        }
        const textTransformations = [];
        if (typeof text3 === "object") {
          const textOptions = entriesOf(text3).flatMap(
            ([key, value]) => {
              if (!text[key]) return [];
              return {
                ...text[key],
                key,
                value,
                order: text[key].order || 99
              };
            }
          );
          const sortedTextOptions = sortByKey(textOptions, "order");
          for (const textOption of sortedTextOptions) {
            const { key, value, qualifier, location, converters } = textOption;
            let textValue = value;
            converters?.forEach(({ test, convert }) => {
              if (!test(value)) return;
              textValue = convert(value);
            });
            if (location === "primary") {
              primary2.push(`${qualifier}_${textValue}`);
            } else if (qualifier === "self") {
              textTransformations.push(key);
            } else if (qualifier) {
              textTransformations.push(`${qualifier}_${textValue}`);
            } else {
              textTransformations.push(textValue);
            }
          }
        }
        const specialCharacters = {
          ".": "%2E",
          ",": "%2C",
          "/": "%2F"
        };
        let layerText = text3?.text || "";
        if (typeof layerText === "string") {
          Object.keys(specialCharacters)?.forEach((character) => {
            layerText = layerText?.replace(
              character,
              specialCharacters[character]
            );
          });
        }
        layerTransformation = `${layerTransformation}:${textTransformations.join(
          "_"
        )}:${layerText}`;
      }
      if (hasPosition) {
        Object.entries(position2).forEach(([key, value]) => {
          if (!objectHasKey(position, key)) return;
          const { qualifier, converters } = position[key];
          const transformation = constructTransformation({
            qualifier,
            value,
            converters
          });
          if (transformation) {
            applied.push(transformation);
          }
        });
      }
      if (primary2.length > 0) {
        layerTransformation = `${layerTransformation},${primary2.join(",")}`;
      }
      layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;
      if (applied.length > 0) {
        layerTransformation = `${layerTransformation},${applied.join(",")}`;
      }
      cldAsset.addTransformation(layerTransformation);
    }
    return {};
  }
});

// src/plugins/version.ts
var VersionPlugin = /* @__PURE__ */ plugin({
  name: "Version",
  supports: "all",
  inferOwnOptions: {},
  props: {
    version: true
  },
  apply: (cldAsset, opts) => {
    const { version } = opts;
    if (typeof version !== "string" && typeof version !== "number") return {};
    cldAsset.setVersion(`${version}`.replace("v", ""));
    return {};
  }
});

// src/lib/cloudinary.ts
var transformationPlugins = [
  // Some features *must* be the first transformation applied
  // thus their plugins *must* come first in the chain
  EnhancePlugin,
  ExtractPlugin,
  RecolorPlugin,
  RemoveBackgroundPlugin,
  RemovePlugin,
  ReplacePlugin,
  ReplaceBackgroundPlugin,
  RestorePlugin,
  // Cropping needs to be before any other general transformations
  // as it provides the option of 2-step resizing where someone
  // can resize the "base" canvas as well as the final resize
  // mechanism commonly used for responsive resizing
  CroppingPlugin,
  // Raw transformations should always come before
  // other arguments to avoid conflicting with
  // added options via the component
  PreserveTransformationsPlugin,
  RawTransformationsPlugin,
  AbrPlugin,
  DefaultImagePlugin,
  EffectsPlugin,
  FillBackgroundPlugin,
  FlagsPlugin,
  OverlaysPlugin,
  SanitizePlugin,
  NamedTransformationsPlugin,
  SeoPlugin,
  UnderlaysPlugin,
  VersionPlugin,
  ZoompanPlugin
];
function constructCloudinaryUrl({ options, config = {}, analytics }) {
  if (analytics === false) {
    if (typeof config?.url === "undefined") {
      config.url = {};
    }
    config.url.analytics = false;
  }
  const cld = new Cloudinary(config);
  if (typeof options?.src !== "string") {
    throw Error(
      `Failed to construct Cloudinary URL: Missing source (src) in options.`
    );
  }
  if (!options?.assetType) {
    options.assetType = "image";
  }
  const parsedOptions = {};
  let publicId;
  if (typeof options.src === "string" && /^https?:\/\//.test(options.src)) {
    try {
      const parts = parseUrl(options.src);
      publicId = parts?.publicId;
      parsedOptions.seoSuffix = parts?.seoSuffix;
      parsedOptions.version = parts?.version;
    } catch (e) {
    }
  }
  if (!publicId) {
    publicId = options.src;
  }
  entriesOf(parsedOptions).forEach(([key, value]) => {
    if (objectHasKey(options, key)) return;
    options[key] = value;
  });
  options.version ?? (options.version = 1);
  const normalizedAssetType = options.assetType === "image" || options.assetType === "images" ? "image" : options.assetType === "video" || options.assetType === "videos" ? "video" : throwError(`${options.assetType} is not a valid assetType`);
  const cldAsset = cld[normalizedAssetType](publicId);
  const pluginEffects = {};
  transformationPlugins.forEach(
    ({ name, apply, strict, supports, props }) => {
      const shouldApply = Object.keys(props).some(
        (key) => options[key] !== undefined
      );
      if (!shouldApply) return;
      if (normalizedAssetType !== supports && supports !== "all") {
        console.warn(
          `${name} does not support assetType ${normalizedAssetType}`
        );
        return;
      }
      if (options.strictTransformations && !strict) {
        console.warn(`${name} does not support Strict Transformations.`);
        return;
      }
      const results = apply(cldAsset, options);
      const pluginOptions = results?.options ?? {};
      Object.assign(pluginEffects, pluginOptions);
    }
  );
  if (typeof pluginEffects.resize === "string") {
    cldAsset.addTransformation(pluginEffects.resize);
  }
  cldAsset.setDeliveryType(options?.deliveryType || "upload");
  if (!options.strictTransformations) {
    if (options?.dpr) {
      let dpr = options.dpr;
      if (typeof dpr === "number") {
        dpr = dpr.toFixed(1);
      }
      cldAsset.addTransformation(`dpr_${dpr}`);
    }
    const defaultFormat = options?.format === "default";
    const rawContainsFormat = searchAssetRawTransformations("f_", cldAsset, {
      matchType: "startsWith"
    });
    const rawContainsFormatAndExplicit = rawContainsFormat && typeof options?.format !== "undefined";
    if (pluginEffects?.format || !defaultFormat && (!rawContainsFormat || rawContainsFormatAndExplicit)) {
      cldAsset.format(options?.format || pluginEffects?.format || "auto");
    }
    const defaultQuality = options?.quality === "default";
    const rawContainsQuality = searchAssetRawTransformations("q_", cldAsset, {
      matchType: "startsWith"
    });
    const rawContainsQualityAndExplicit = rawContainsQuality && typeof options?.quality !== "undefined";
    if (!defaultQuality && (!rawContainsQuality || rawContainsQualityAndExplicit)) {
      cldAsset.quality(options?.quality || "auto");
    }
  }
  return cldAsset.toURL({
    trackedAnalytics: typeof analytics === "object" ? analytics : undefined
  });
}
function searchAssetRawTransformations(query, asset, options) {
  if (typeof asset.transformation === "undefined") return;
  const { matchType = "includes" } = options || {};
  const transformations = asset.transformation.actions.flatMap(
    (transformation) => {
      return transformation.toString().split("/").flatMap((seg) => seg.split(","));
    }
  );
  const matches = transformations.filter((transformation) => {
    if (matchType === "startsWith") {
      return transformation.startsWith(query);
    } else {
      return transformation.includes(query);
    }
  });
  return matches.length > 0;
}

function getCloudinaryConfig(config) {
  const cloudName = "hysteria";
  const apiKey = "545485158726184";
  const secureDistribution = undefined                                                     ;
  const privateCdn = undefined                                             ;
  return Object.assign({
    cloud: {
      ...config?.cloud,
      apiKey,
      cloudName
    },
    url: {
      ...config?.url,
      secureDistribution,
      privateCdn
    }
  }, config);
}
function getCloudinaryAnalytics(analytics) {
  return Object.assign({
    product: ASTRO_CLOUDINARY_ANALYTICS_PRODUCT_ID,
    sdkCode: ASTRO_CLOUDINARY_ANALYTICS_ID,
    sdkSemver: ASTRO_CLOUDINARY_VERSION,
    techVersion: ASTRO_VERSION,
    feature: ""
  }, analytics);
}
function getCldImageUrl(options, config, analytics) {
  return constructCloudinaryUrl({
    options,
    config: getCloudinaryConfig(config),
    analytics: getCloudinaryAnalytics(analytics)
  });
}
function getCldVideoUrl(options, config, analytics) {
  return constructCloudinaryUrl({
    options: {
      assetType: "video",
      format: "auto:video",
      ...options
    },
    config: getCloudinaryConfig(config),
    analytics: getCloudinaryAnalytics(analytics)
  });
}

const $$ContactUs = createComponent(($$result, $$props, $$slots) => {
  const ctaImage = getCldImageUrl({
    src: "https://res.cloudinary.com/hysteria/image/upload/v1738076478/ichiban/CTA_Image_yfh1b6.jpg"
  });
  const reloadLogo = getCldImageUrl({
    src: "https://res.cloudinary.com/hysteria/image/upload/v1738076478/ichiban/Reload_Lang_Logo_bam80t.png"
  });
  const ichibanTeam1 = getCldImageUrl({
    src: "https://res.cloudinary.com/hysteria/image/upload/v1738076478/ichiban/IMG_2_pohbys.jpg"
  });
  const ichibanTeam2 = getCldImageUrl({
    src: "https://res.cloudinary.com/hysteria/image/upload/v1738076478/ichiban/IMG_3_tozad8.jpg"
  });
  const ichibanTeam3 = getCldImageUrl({
    src: "https://res.cloudinary.com/hysteria/image/upload/v1738076478/ichiban/IMG_1_e9hvfk.jpg"
  });
  return renderTemplate`${maybeRenderHead()}<div class="contact" id="contact-us" data-astro-cid-ypgb7zfc> <div class="page-padding" data-astro-cid-ypgb7zfc> <div class="contact__container container" data-astro-cid-ypgb7zfc> <div class="contact__form" data-astro-cid-ypgb7zfc> <div class="contact__form__top-left" data-astro-cid-ypgb7zfc> <div class="contact__form__top-left__up" data-astro-cid-ypgb7zfc> <h3 class="contact__form__top-left__up__title" data-astro-cid-ypgb7zfc>
express your interest to stay updated on Ichiban release dates and pricing
</h3> <p class="contact__form__top-left__up__text" data-astro-cid-ypgb7zfc>
After winning several design awards and receiving glowing media praise, we've attracted support from innovative
              companies for distribution, finance, and future technology development. To scale up production, we need your
              support.
</p> </div> <div class="contact__form__top-left__down" data-astro-cid-ypgb7zfc> <div class="contact__form__top-left__down__card" data-astro-cid-ypgb7zfc> <input type="email" id="email" placeholder="your@mail.com" name="email" alt="email input field" class="contact__form__top-left__down__card__input-field" data-astro-cid-ypgb7zfc> <button class="contact__form__top-left__down__card__button" data-astro-cid-ypgb7zfc>Express interest</button> <label for="policy" class="contact__form__top-left__down__card__label" data-astro-cid-ypgb7zfc> <input type="checkbox" name="policy" id="policy" data-astro-cid-ypgb7zfc> <div class="contact__form__top-left__down__card__label__checkbox" data-astro-cid-ypgb7zfc></div> <span class="contact__form__top-left__down__card__label__text" data-astro-cid-ypgb7zfc>I agree with Privacy Policy</span> </label> </div> <div class="contact__form__top-left__down__info" data-astro-cid-ypgb7zfc> <div class="contact__form__top-left__down__info__no-spam" data-astro-cid-ypgb7zfc> <img src="/icons/policy-check.svg" alt="Policy Check Picture" data-astro-cid-ypgb7zfc> <p data-astro-cid-ypgb7zfc>no spam guaranteed</p> </div> <p data-astro-cid-ypgb7zfc>Your mail will only be used as evidence that real people are interested in our product</p> </div> </div> </div> <div class="contact__form__top-right" data-astro-cid-ypgb7zfc> ${renderComponent($$result, "Image", $$Image, { "src": ctaImage, "alt": "A man wearing a helmet seated on ichiban bike", "width": 650, "height": 800, "data-astro-cid-ypgb7zfc": true })} <div class="contact__form__top-right__card" data-astro-cid-ypgb7zfc> ${renderComponent($$result, "Image", $$Image, { "src": reloadLogo, "alt": "Reload logo", "width": 128, "height": 128, "data-astro-cid-ypgb7zfc": true })} <div class="contact__form__top-right__card__text" data-astro-cid-ypgb7zfc> <h4 data-astro-cid-ypgb7zfc>Reload Land</h4> <p data-astro-cid-ypgb7zfc>official partner</p> </div> </div> </div> <div class="contact__form__bottom-left" data-astro-cid-ypgb7zfc> ${renderComponent($$result, "Image", $$Image, { "src": ichibanTeam1, "alt": "A designer standing ahead of ichiban moto sketches", "width": 2560, "height": 1706, "data-astro-cid-ypgb7zfc": true })} <div class="contact__form__bottom-left__content" data-astro-cid-ypgb7zfc> <p class="contact__form__bottom-left__content__bold-text" data-astro-cid-ypgb7zfc>
The Ichiban team brings together extensive expertise in motorcycle design and the development of cutting-edge
              technology products.
</p> <p class="contact__form__bottom-left__content__text" data-astro-cid-ypgb7zfc>
Led by award-winning industrial designer Ivan Zhurba, the team combines a diverse skill set with a shared passion
              for innovation, making them uniquely positioned to revolutionize the motorcycling industry.
</p> </div> </div> <div class="contact__form__bottom-right" data-astro-cid-ypgb7zfc> <div class="contact__form__bottom-right__image" data-astro-cid-ypgb7zfc> ${renderComponent($$result, "Image", $$Image, { "src": ichibanTeam2, "alt": "Two people of Ichiban Team showing a sketch of the ichiban moto", "width": 2560, "height": 1707, "data-astro-cid-ypgb7zfc": true })} </div> <div class="contact__form__bottom-right__image" data-astro-cid-ypgb7zfc> ${renderComponent($$result, "Image", $$Image, { "src": ichibanTeam3, "alt": "A man reading a magazine talking about ichiban motorcycles", "width": 2560, "height": 1707, "data-astro-cid-ypgb7zfc": true })} </div> </div> </div> </div> </div> </div> ${renderScript($$result, "C:/Users/antho/Documents/Programmation/ichiban-clone/src/components/ContactUs.astro?astro&type=script&index=0&lang.ts")} `;
}, "C:/Users/antho/Documents/Programmation/ichiban-clone/src/components/ContactUs.astro", undefined);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const ichibanHorizontalLogo = getCldImageUrl({
    src: "https://res.cloudinary.com/hysteria/image/upload/v1738076477/ichiban/Logo_horizontal_with_slogan_black_z0yyma.png"
  });
  const dots = getCldImageUrl({
    src: "https://res.cloudinary.com/hysteria/image/upload/v1738244842/ichiban/dots_footer_whnc41.png"
  });
  return renderTemplate`${maybeRenderHead()}<footer class="footer" role="contentinfo" data-astro-cid-sz7xmlte> <div class="page-padding" data-astro-cid-sz7xmlte> <div class="container" data-astro-cid-sz7xmlte> <div class="footer-block-one" data-astro-cid-sz7xmlte> <a href="/" aria-current="page" class="footer-block-one__logo" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "src": ichibanHorizontalLogo, "alt": "Ichiban Logo", "width": 529, "height": 80, "data-astro-cid-sz7xmlte": true })} </a> <nav role="navigation" aria-label="Footer navigation" class="footer-block-one__nav" data-astro-cid-sz7xmlte> <a href="#unique-design" data-astro-cid-sz7xmlte>Unique Design</a> <a href="#key-features" data-astro-cid-sz7xmlte>Key Features</a> <a href="#godzilla-mode" data-astro-cid-sz7xmlte>Godzilla Mode</a> <a href="#contact-us" data-astro-cid-sz7xmlte>Contact Us</a> </nav> </div> <div class="footer-block-two" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "src": dots, "alt": "Dots", "width": 1432, "height": 134, "data-astro-cid-sz7xmlte": true })} </div> <div class="footer-block-three" data-astro-cid-sz7xmlte> <div class="footer-block-three__social" data-astro-cid-sz7xmlte> <div class="footer-block-three__social__links" data-astro-cid-sz7xmlte> <a href="https://github.com/anthonyrovira" rel="noopener noreferrer" target="_blank" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "src": "/icons/github.svg", "alt": "Link to Anthony Rovira's Github profile", "width": 24, "height": 24, "data-astro-cid-sz7xmlte": true })} </a> <a href="https://www.linkedin.com/in/anthonyrovira/?locale=en_US" rel="noopener noreferrer" target="_blank" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "src": "/icons/linkedin.svg", "alt": "Link to  Anthony Rovira's LinkedIn profile", "width": 24, "height": 24, "data-astro-cid-sz7xmlte": true })} </a> <a href="https://x.com/AnthonyRoviraJS" rel="noopener noreferrer" target="_blank" data-astro-cid-sz7xmlte> ${renderComponent($$result, "Image", $$Image, { "src": "/icons/x.svg", "alt": "Link to  Anthony Rovira's X profile", "width": 24, "height": 24, "data-astro-cid-sz7xmlte": true })} </a> </div> <p class="footer-block-three__social__disclaimer" data-astro-cid-sz7xmlte>
This is a clone development project, made with 🖤 by Anthony Rovira and inspired by <a href="https://www.ichiban.bike" rel="noopener noreferrer" target="_blank" data-astro-cid-sz7xmlte>www.ichiban.bike</a> </p> </div> <div class="footer-block-three__legal" data-astro-cid-sz7xmlte> <p data-astro-cid-sz7xmlte>privacy policy</p> <p data-astro-cid-sz7xmlte>cookie policy</p> </div> </div> </div> </div> </footer> `;
}, "C:/Users/antho/Documents/Programmation/ichiban-clone/src/components/Footer.astro", undefined);

function generateHeroFrameUrls(totalFrames) {
  return Array.from({ length: totalFrames }, (_, i) => {
    const frameNumber = `${(i + 1).toString().padStart(3, "0")}`;
    return `/src/assets/frames/hero/moto-${frameNumber}.webp`;
  });
}
function generateTransmissionFrameUrls(totalFrames) {
  return Array.from({ length: totalFrames }, (_, i) => {
    const frameNumber = `${(i + 1).toString().padStart(3, "0")}`;
    return `/src/assets/frames/transmission/img-${frameNumber}.webp`;
  });
}
function generateHeartFrameUrls(totalFrames) {
  return Array.from({ length: totalFrames }, (_, i) => {
    const frameNumber = `${(i + 1).toString().padStart(3, "0")}`;
    return `/src/assets/frames/heart/img-${frameNumber}.webp`;
  });
}

var __freeze$2 = Object.freeze;
var __defProp$2 = Object.defineProperty;
var __template$2 = (cooked, raw) => __freeze$2(__defProp$2(cooked, "raw", { value: __freeze$2(raw || cooked.slice()) }));
var _a$2;
const $$GodzillaMode = createComponent(async ($$result, $$props, $$slots) => {
  const totalFrames = 31;
  const frameUrls = generateHeartFrameUrls(totalFrames);
  const motoVideo = getCldVideoUrl({
    src: "https://res.cloudinary.com/hysteria/video/upload/v1736877171/ichiban/Side_Loop_Video_1_CUT-transcode_gykudu.mp4"
  });
  const godzillaVideo = getCldVideoUrl({
    src: "https://res.cloudinary.com/hysteria/video/upload/v1736877171/ichiban/Godzilla_screams_f75126-transcode_h0nosz.mp4"
  });
  const godzillaImage = getCldImageUrl({
    src: "https://res.cloudinary.com/hysteria/image/upload/v1737119790/ichiban/godzilla_image_xe6dft.png"
  });
  return renderTemplate(_a$2 || (_a$2 = __template$2(["", '<section id="godzilla-mode" class="godzilla" data-astro-cid-n3pysghq> <div class="gradient gradient-down" data-astro-cid-n3pysghq></div> <div class="godzilla__video-container" data-astro-cid-n3pysghq> <video', "", "", "", "", ' data-astro-cid-n3pysghq></video> </div> <div class="godzilla__container page-padding" data-astro-cid-n3pysghq> <div class="godzilla__content container" data-astro-cid-n3pysghq> <div class="godzilla__content__right" data-astro-cid-n3pysghq> <h3 data-astro-cid-n3pysghq>\nActivating Godzilla mode unleashes unparalleled torque and power for a breathtaking 10 seconds of pure motorcycling\n          frenzy\n</h3> <div class="godzilla__content__cards" data-astro-cid-n3pysghq> <div class="godzilla__content__cards__container" data-astro-cid-n3pysghq> <div class="godzilla__content__card__left" data-astro-cid-n3pysghq> <video', "", "", "", "", ' data-astro-cid-n3pysghq></video> </div> <div class="godzilla__content__card__right" data-astro-cid-n3pysghq> ', ' <p data-astro-cid-n3pysghq>Godzilla Mode</p> </div> </div> </div> <h3 data-astro-cid-n3pysghq>guaranteed to accelerate your heartbeat with intense exhilaration</h3> <div class="godzilla__content__cards-hearts" data-astro-cid-n3pysghq> <div class="godzilla__content__cards-hearts__container" data-astro-cid-n3pysghq> <div class="godzilla__content__cards-hearts__left sides" data-astro-cid-n3pysghq> <figure id="animated-heart-1" class="animated-heart sides" data-astro-cid-n3pysghq></figure> </div> <div class="godzilla__content__cards-hearts__center" data-astro-cid-n3pysghq> <figure id="animated-heart-2" class="animated-heart" data-astro-cid-n3pysghq></figure> </div> <div class="godzilla__content__cards-hearts__right sides" data-astro-cid-n3pysghq> <figure id="animated-heart-3" class="animated-heart sides" data-astro-cid-n3pysghq></figure> </div> </div> </div> <h3 class="godzilla__content__right__last-item" data-astro-cid-n3pysghq>\nThe only thought crossing your mind as you dismount your Ichiban will be the eagerness for your next thrilling ride\n</h3> </div> </div> </div> </section> <script>(function(){', '\n  const animatedHeart1 = document.getElementById("animated-heart-1");\n  const animatedHeart2 = document.getElementById("animated-heart-2");\n  const animatedHeart3 = document.getElementById("animated-heart-3");\n\n  // Cache for preloaded images\n  const imageCache = new Map();\n  let currentFrame = 0;\n  let isLoaded = false;\n  const frameRate = 12;\n  let animationInterval;\n  let isAnimating = false;\n\n  // Preload all frames before starting animation\n  async function preloadImages() {\n    // Prevent multiple preloading calls\n    if (isLoaded) return;\n\n    const loadingPromises = frameUrls.map((url) => {\n      return new Promise((resolve, reject) => {\n        // Check if image is already cached\n        if (imageCache.has(url)) {\n          resolve();\n          return;\n        }\n\n        const img = new Image();\n        img.onload = () => {\n          imageCache.set(url, img);\n          resolve();\n        };\n        img.onerror = reject;\n        img.src = url;\n      });\n    });\n\n    try {\n      await Promise.all(loadingPromises);\n      isLoaded = true;\n      startAnimation();\n      console.log("Images loaded:", imageCache.size);\n    } catch (error) {\n      console.error("Loading error:", error);\n    }\n  }\n\n  function updateImage(frame) {\n    if (!animatedHeart1 || !animatedHeart2 || !animatedHeart3 || !isAnimating) return;\n\n    const url = frameUrls[frame];\n    const img = imageCache.get(url);\n\n    if (img) {\n      // Use requestAnimationFrame for smoother transitions\n      requestAnimationFrame(() => {\n        animatedHeart1.style.backgroundImage = `url(${img.src})`;\n        animatedHeart2.style.backgroundImage = `url(${img.src})`;\n        animatedHeart3.style.backgroundImage = `url(${img.src})`;\n      });\n    }\n  }\n\n  function startAnimation() {\n    if (!isLoaded || isAnimating) return;\n\n    isAnimating = true;\n\n    // Clear any existing interval\n    if (animationInterval) {\n      clearInterval(animationInterval);\n    }\n\n    // Use requestAnimationFrame for the first frame\n    requestAnimationFrame(() => {\n      updateImage(currentFrame);\n    });\n\n    // Set up the animation interval\n    animationInterval = setInterval(() => {\n      currentFrame = (currentFrame + 1) % totalFrames;\n      updateImage(currentFrame);\n    }, 1000 / frameRate);\n  }\n\n  function stopAnimation() {\n    isAnimating = false;\n    if (animationInterval) {\n      clearInterval(animationInterval);\n      animationInterval = null;\n    }\n  }\n\n  // Optional: Add cleanup function\n  function cleanup() {\n    stopAnimation();\n    imageCache.clear();\n    isLoaded = false;\n  }\n\n  // Start preloading when script runs\n  preloadImages();\n\n  // Optional: Clean up on page unload\n  window.addEventListener("unload", cleanup);\n})();<\/script> '], ["", '<section id="godzilla-mode" class="godzilla" data-astro-cid-n3pysghq> <div class="gradient gradient-down" data-astro-cid-n3pysghq></div> <div class="godzilla__video-container" data-astro-cid-n3pysghq> <video', "", "", "", "", ' data-astro-cid-n3pysghq></video> </div> <div class="godzilla__container page-padding" data-astro-cid-n3pysghq> <div class="godzilla__content container" data-astro-cid-n3pysghq> <div class="godzilla__content__right" data-astro-cid-n3pysghq> <h3 data-astro-cid-n3pysghq>\nActivating Godzilla mode unleashes unparalleled torque and power for a breathtaking 10 seconds of pure motorcycling\n          frenzy\n</h3> <div class="godzilla__content__cards" data-astro-cid-n3pysghq> <div class="godzilla__content__cards__container" data-astro-cid-n3pysghq> <div class="godzilla__content__card__left" data-astro-cid-n3pysghq> <video', "", "", "", "", ' data-astro-cid-n3pysghq></video> </div> <div class="godzilla__content__card__right" data-astro-cid-n3pysghq> ', ' <p data-astro-cid-n3pysghq>Godzilla Mode</p> </div> </div> </div> <h3 data-astro-cid-n3pysghq>guaranteed to accelerate your heartbeat with intense exhilaration</h3> <div class="godzilla__content__cards-hearts" data-astro-cid-n3pysghq> <div class="godzilla__content__cards-hearts__container" data-astro-cid-n3pysghq> <div class="godzilla__content__cards-hearts__left sides" data-astro-cid-n3pysghq> <figure id="animated-heart-1" class="animated-heart sides" data-astro-cid-n3pysghq></figure> </div> <div class="godzilla__content__cards-hearts__center" data-astro-cid-n3pysghq> <figure id="animated-heart-2" class="animated-heart" data-astro-cid-n3pysghq></figure> </div> <div class="godzilla__content__cards-hearts__right sides" data-astro-cid-n3pysghq> <figure id="animated-heart-3" class="animated-heart sides" data-astro-cid-n3pysghq></figure> </div> </div> </div> <h3 class="godzilla__content__right__last-item" data-astro-cid-n3pysghq>\nThe only thought crossing your mind as you dismount your Ichiban will be the eagerness for your next thrilling ride\n</h3> </div> </div> </div> </section> <script>(function(){', '\n  const animatedHeart1 = document.getElementById("animated-heart-1");\n  const animatedHeart2 = document.getElementById("animated-heart-2");\n  const animatedHeart3 = document.getElementById("animated-heart-3");\n\n  // Cache for preloaded images\n  const imageCache = new Map();\n  let currentFrame = 0;\n  let isLoaded = false;\n  const frameRate = 12;\n  let animationInterval;\n  let isAnimating = false;\n\n  // Preload all frames before starting animation\n  async function preloadImages() {\n    // Prevent multiple preloading calls\n    if (isLoaded) return;\n\n    const loadingPromises = frameUrls.map((url) => {\n      return new Promise((resolve, reject) => {\n        // Check if image is already cached\n        if (imageCache.has(url)) {\n          resolve();\n          return;\n        }\n\n        const img = new Image();\n        img.onload = () => {\n          imageCache.set(url, img);\n          resolve();\n        };\n        img.onerror = reject;\n        img.src = url;\n      });\n    });\n\n    try {\n      await Promise.all(loadingPromises);\n      isLoaded = true;\n      startAnimation();\n      console.log("Images loaded:", imageCache.size);\n    } catch (error) {\n      console.error("Loading error:", error);\n    }\n  }\n\n  function updateImage(frame) {\n    if (!animatedHeart1 || !animatedHeart2 || !animatedHeart3 || !isAnimating) return;\n\n    const url = frameUrls[frame];\n    const img = imageCache.get(url);\n\n    if (img) {\n      // Use requestAnimationFrame for smoother transitions\n      requestAnimationFrame(() => {\n        animatedHeart1.style.backgroundImage = \\`url(\\${img.src})\\`;\n        animatedHeart2.style.backgroundImage = \\`url(\\${img.src})\\`;\n        animatedHeart3.style.backgroundImage = \\`url(\\${img.src})\\`;\n      });\n    }\n  }\n\n  function startAnimation() {\n    if (!isLoaded || isAnimating) return;\n\n    isAnimating = true;\n\n    // Clear any existing interval\n    if (animationInterval) {\n      clearInterval(animationInterval);\n    }\n\n    // Use requestAnimationFrame for the first frame\n    requestAnimationFrame(() => {\n      updateImage(currentFrame);\n    });\n\n    // Set up the animation interval\n    animationInterval = setInterval(() => {\n      currentFrame = (currentFrame + 1) % totalFrames;\n      updateImage(currentFrame);\n    }, 1000 / frameRate);\n  }\n\n  function stopAnimation() {\n    isAnimating = false;\n    if (animationInterval) {\n      clearInterval(animationInterval);\n      animationInterval = null;\n    }\n  }\n\n  // Optional: Add cleanup function\n  function cleanup() {\n    stopAnimation();\n    imageCache.clear();\n    isLoaded = false;\n  }\n\n  // Start preloading when script runs\n  preloadImages();\n\n  // Optional: Clean up on page unload\n  window.addEventListener("unload", cleanup);\n})();<\/script> '])), maybeRenderHead(), addAttribute(motoVideo, "src"), addAttribute(true, "autoplay"), addAttribute(true, "muted"), addAttribute(false, "controls"), addAttribute(true, "loop"), addAttribute(godzillaVideo, "src"), addAttribute(true, "autoplay"), addAttribute(true, "muted"), addAttribute(false, "controls"), addAttribute(true, "loop"), renderComponent($$result, "Image", $$Image, { "src": godzillaImage, "alt": "Godzilla Mode 2", "width": 300, "height": 300, "data-astro-cid-n3pysghq": true }), defineScriptVars({ frameUrls, totalFrames }));
}, "C:/Users/antho/Documents/Programmation/ichiban-clone/src/components/GodzillaMode.astro", undefined);

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<header class="header" data-astro-cid-3ef6ksr2> <div class="header__sun" data-astro-cid-3ef6ksr2> <img src="/logo.png" alt="Ichiban Logo" class="header__sun__logo" height="56" fetchpriority="high" data-astro-cid-3ef6ksr2> </div> <div class="header__content" data-astro-cid-3ef6ksr2> <div class="header__content__column header__content__column--left" data-astro-cid-3ef6ksr2> <div class="header__content__column__top" data-astro-cid-3ef6ksr2><span data-astro-cid-3ef6ksr2>DESCRIPTION</span><span data-astro-cid-3ef6ksr2>MOD.001</span></div> <div class="header__content__column__border header__content__column__border--bolder" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border header__content__column__border--bolder" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border header__content__column__border--bolder" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border" data-astro-cid-3ef6ksr2></div> <p class="header__content__column__border header__content__column__border--last" data-astro-cid-3ef6ksr2>
Ichiban isn't simply a mode of transport; it's an escape, a liberating streak of freedom in an excessively interconnected
        world.
</p> </div> <div class="header__content__column header__content__column--middle" data-astro-cid-3ef6ksr2> <span class="header__content__column__scroll-text" data-astro-cid-3ef6ksr2>SCROLL</span> <div class="header__content__column__scroll-box" data-astro-cid-3ef6ksr2> <img src="/icons/arrow-scroll.svg" alt="Arrow Scroll" class="header__content__column__scroll-arrow header__content__column__scroll-arrow--top" data-astro-cid-3ef6ksr2> <img src="/icons/arrow-scroll.svg" alt="Arrow Scroll" class="header__content__column__scroll-arrow header__content__column__scroll-arrow--bottom" data-astro-cid-3ef6ksr2> </div> <span class="header__content__column__scroll-text" data-astro-cid-3ef6ksr2>FOR MORE</span> </div> <div class="header__content__column header__content__column--right" data-astro-cid-3ef6ksr2> <div class="header__content__column__top" data-astro-cid-3ef6ksr2> <span data-astro-cid-3ef6ksr2>BROWSE</span><span data-astro-cid-3ef6ksr2>LIST:FULL</span> </div> <div class="header__content__column__border header__content__column__border--bolder" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border" data-astro-cid-3ef6ksr2></div> <div class="header__content__column__border header__content__column__border--bolder" data-astro-cid-3ef6ksr2></div> <a href="#unique-design" class="header__content__column__anchor" data-astro-cid-3ef6ksr2> <div class="header__content__column__anchor__box header__content__column__anchor__box--top" data-astro-cid-3ef6ksr2> <div class="header__content__column__anchor__number" data-astro-cid-3ef6ksr2>001</div> <div class="header__content__column__anchor__text" data-astro-cid-3ef6ksr2>UNIQUE DESIGN</div> </div> <div class="header__content__column__anchor__box header__content__column__anchor__box--bottom" data-astro-cid-3ef6ksr2> <div class="header__content__column__anchor__number" data-astro-cid-3ef6ksr2>001</div> <div class="header__content__column__anchor__text" data-astro-cid-3ef6ksr2>UNIQUE DESIGN</div> </div> </a> <a href="#key-features" class="header__content__column__anchor" data-astro-cid-3ef6ksr2> <div class="header__content__column__anchor__box header__content__column__anchor__box--top" data-astro-cid-3ef6ksr2> <div class="header__content__column__anchor__number" data-astro-cid-3ef6ksr2>002</div> <div class="header__content__column__anchor__text" data-astro-cid-3ef6ksr2>KEY FEATURES</div> </div> <div class="header__content__column__anchor__box header__content__column__anchor__box--bottom" data-astro-cid-3ef6ksr2> <div class="header__content__column__anchor__number" data-astro-cid-3ef6ksr2>002</div> <div class="header__content__column__anchor__text" data-astro-cid-3ef6ksr2>KEY FEATURES</div> </div> </a> <a href="#godzilla-mode" class="header__content__column__anchor" data-astro-cid-3ef6ksr2> <div class="header__content__column__anchor__box header__content__column__anchor__box--top" data-astro-cid-3ef6ksr2> <div class="header__content__column__anchor__number" data-astro-cid-3ef6ksr2>003</div> <div class="header__content__column__anchor__text" data-astro-cid-3ef6ksr2>GODZILLA MODE</div> </div> <div class="header__content__column__anchor__box header__content__column__anchor__box--bottom" data-astro-cid-3ef6ksr2> <div class="header__content__column__anchor__number" data-astro-cid-3ef6ksr2>003</div> <div class="header__content__column__anchor__text" data-astro-cid-3ef6ksr2>GODZILLA MODE</div> </div> </a> <a href="#contact-us" class="header__content__column__anchor" data-astro-cid-3ef6ksr2> <div class="header__content__column__anchor__box header__content__column__anchor__box--top" data-astro-cid-3ef6ksr2> <div class="header__content__column__anchor__number" data-astro-cid-3ef6ksr2>004</div> <div class="header__content__column__anchor__text" data-astro-cid-3ef6ksr2>CONTACT US</div> </div> <div class="header__content__column__anchor__box header__content__column__anchor__box--bottom" data-astro-cid-3ef6ksr2> <div class="header__content__column__anchor__number" data-astro-cid-3ef6ksr2>004</div> <div class="header__content__column__anchor__text" data-astro-cid-3ef6ksr2>CONTACT US</div> </div> </a> <div class="header__content__column__border" data-astro-cid-3ef6ksr2></div> </div> </div> </header> `;
}, "C:/Users/antho/Documents/Programmation/ichiban-clone/src/components/Header.astro", undefined);

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(raw || cooked.slice()) }));
var _a$1;
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const totalFrames = 151;
  const frameUrls = generateHeroFrameUrls(totalFrames);
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<section class="hero container" data-astro-cid-bbe6dxrz> ', ' <div class="sequence-container" data-astro-cid-bbe6dxrz> <div id="moto-image" class="hero-moto-image" data-astro-cid-bbe6dxrz></div> <img id="sequence-loader" class="sequence-loader" src="/src/assets/frames/hero/moto-001.webp" alt="Moto Sequence Loader" data-astro-cid-bbe6dxrz> </div> <div class="animation_spacer" data-astro-cid-bbe6dxrz></div> </section> <script>(function(){', '\n  const imageCache = new Map();\n  let currentFrame = 0;\n  let isLoaded = false;\n  let ticking = false;\n  let maxScroll = 0;\n\n  const motoImage = document.getElementById("moto-image");\n  const loader = document.getElementById("sequence-loader");\n\n  async function preloadImages() {\n    const loadingPromises = frameUrls.map((url, index) => {\n      return new Promise((resolve, reject) => {\n        const img = new Image();\n        img.onload = () => {\n          imageCache.set(index, img);\n          resolve();\n        };\n        img.onerror = reject;\n        img.src = url;\n      });\n    });\n\n    try {\n      await Promise.all(loadingPromises);\n      isLoaded = true;\n      loader?.remove();\n      updateImage(0);\n      console.log("Images charg\xE9es:", imageCache.size);\n    } catch (error) {\n      console.error("Erreur de chargement:", error);\n    }\n  }\n\n  function updateImage(frame) {\n    if (!isLoaded || !motoImage) return;\n\n    const cachedImage = imageCache.get(frame);\n    if (cachedImage) {\n      const imageUrl = cachedImage.src;\n      motoImage.style.backgroundImage = `url(\'${imageUrl}\')`;\n      console.log("Frame mise \xE0 jour:", frame, imageUrl);\n    }\n  }\n\n  function calculateMaxScroll() {\n    const heroSectionHeight = 2585;\n\n    const windowHeight = window.innerHeight;\n    maxScroll = heroSectionHeight - windowHeight;\n    return maxScroll;\n  }\n\n  function handleScroll() {\n    if (!isLoaded) return;\n\n    if (!ticking) {\n      requestAnimationFrame(() => {\n        const scrollPosition = window.scrollY;\n        // Recalculate maxScroll if needed\n        if (maxScroll <= 0) {\n          calculateMaxScroll();\n        }\n\n        // Make sure maxScroll is not 0 to avoid division by 0\n        if (maxScroll > 0) {\n          const scrollFraction = Math.max(0, Math.min(1, scrollPosition / maxScroll));\n          const frame = Math.min(Math.floor(scrollFraction * (totalFrames - 1)), totalFrames - 1);\n\n          console.log({\n            scrollPosition,\n            maxScroll,\n            scrollFraction,\n            calculatedFrame: frame,\n            currentFrame,\n          });\n\n          if (frame !== currentFrame) {\n            currentFrame = frame;\n            updateImage(frame);\n          }\n        }\n        ticking = false;\n      });\n      ticking = true;\n    }\n  }\n\n  function init() {\n    // Calculate maxScroll after the DOM is loaded\n    calculateMaxScroll();\n\n    // Wait for images to preload before adding scroll listener\n    preloadImages().then(() => {\n      window.addEventListener("scroll", handleScroll, { passive: true });\n      console.log("\xC9couteur de scroll ajout\xE9");\n    });\n\n    // Recalculate maxScroll on resize\n    window.addEventListener(\n      "resize",\n      () => {\n        calculateMaxScroll();\n      },\n      { passive: true }\n    );\n  }\n\n  // Make sure the DOM is fully loaded before running the script\n  if (document.readyState === "loading") {\n    document.addEventListener("DOMContentLoaded", init);\n  } else {\n    init();\n  }\n})();<\/script> '], ["", '<section class="hero container" data-astro-cid-bbe6dxrz> ', ' <div class="sequence-container" data-astro-cid-bbe6dxrz> <div id="moto-image" class="hero-moto-image" data-astro-cid-bbe6dxrz></div> <img id="sequence-loader" class="sequence-loader" src="/src/assets/frames/hero/moto-001.webp" alt="Moto Sequence Loader" data-astro-cid-bbe6dxrz> </div> <div class="animation_spacer" data-astro-cid-bbe6dxrz></div> </section> <script>(function(){', '\n  const imageCache = new Map();\n  let currentFrame = 0;\n  let isLoaded = false;\n  let ticking = false;\n  let maxScroll = 0;\n\n  const motoImage = document.getElementById("moto-image");\n  const loader = document.getElementById("sequence-loader");\n\n  async function preloadImages() {\n    const loadingPromises = frameUrls.map((url, index) => {\n      return new Promise((resolve, reject) => {\n        const img = new Image();\n        img.onload = () => {\n          imageCache.set(index, img);\n          resolve();\n        };\n        img.onerror = reject;\n        img.src = url;\n      });\n    });\n\n    try {\n      await Promise.all(loadingPromises);\n      isLoaded = true;\n      loader?.remove();\n      updateImage(0);\n      console.log("Images charg\xE9es:", imageCache.size);\n    } catch (error) {\n      console.error("Erreur de chargement:", error);\n    }\n  }\n\n  function updateImage(frame) {\n    if (!isLoaded || !motoImage) return;\n\n    const cachedImage = imageCache.get(frame);\n    if (cachedImage) {\n      const imageUrl = cachedImage.src;\n      motoImage.style.backgroundImage = \\`url(\'\\${imageUrl}\')\\`;\n      console.log("Frame mise \xE0 jour:", frame, imageUrl);\n    }\n  }\n\n  function calculateMaxScroll() {\n    const heroSectionHeight = 2585;\n\n    const windowHeight = window.innerHeight;\n    maxScroll = heroSectionHeight - windowHeight;\n    return maxScroll;\n  }\n\n  function handleScroll() {\n    if (!isLoaded) return;\n\n    if (!ticking) {\n      requestAnimationFrame(() => {\n        const scrollPosition = window.scrollY;\n        // Recalculate maxScroll if needed\n        if (maxScroll <= 0) {\n          calculateMaxScroll();\n        }\n\n        // Make sure maxScroll is not 0 to avoid division by 0\n        if (maxScroll > 0) {\n          const scrollFraction = Math.max(0, Math.min(1, scrollPosition / maxScroll));\n          const frame = Math.min(Math.floor(scrollFraction * (totalFrames - 1)), totalFrames - 1);\n\n          console.log({\n            scrollPosition,\n            maxScroll,\n            scrollFraction,\n            calculatedFrame: frame,\n            currentFrame,\n          });\n\n          if (frame !== currentFrame) {\n            currentFrame = frame;\n            updateImage(frame);\n          }\n        }\n        ticking = false;\n      });\n      ticking = true;\n    }\n  }\n\n  function init() {\n    // Calculate maxScroll after the DOM is loaded\n    calculateMaxScroll();\n\n    // Wait for images to preload before adding scroll listener\n    preloadImages().then(() => {\n      window.addEventListener("scroll", handleScroll, { passive: true });\n      console.log("\xC9couteur de scroll ajout\xE9");\n    });\n\n    // Recalculate maxScroll on resize\n    window.addEventListener(\n      "resize",\n      () => {\n        calculateMaxScroll();\n      },\n      { passive: true }\n    );\n  }\n\n  // Make sure the DOM is fully loaded before running the script\n  if (document.readyState === "loading") {\n    document.addEventListener("DOMContentLoaded", init);\n  } else {\n    init();\n  }\n})();<\/script> '])), maybeRenderHead(), renderComponent($$result, "Header", $$Header, { "data-astro-cid-bbe6dxrz": true }), defineScriptVars({ frameUrls, totalFrames }));
}, "C:/Users/antho/Documents/Programmation/ichiban-clone/src/components/Hero.astro", undefined);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$KeyFeatures = createComponent(async ($$result, $$props, $$slots) => {
  const totalFrames = 101;
  const frameUrls = generateTransmissionFrameUrls(totalFrames);
  const dashboradVideoUrl = getCldVideoUrl({
    src: "https://res.cloudinary.com/hysteria/video/upload/v1736877170/ichiban/Dash_animation-transcode_smrd31.mp4"
  });
  const cubesVideoUrl = getCldVideoUrl({
    src: "https://res.cloudinary.com/hysteria/video/upload/v1736877171/ichiban/Sphere_02-transcode_p6tyuy.mp4"
  });
  const motoVideoUrl = getCldVideoUrl({
    src: "https://res.cloudinary.com/hysteria/video/upload/v1736877172/ichiban/Top_Video_CUT-transcode_q1osag.mp4"
  });
  const safetyImg = getCldImageUrl({
    src: "https://res.cloudinary.com/hysteria/image/upload/v1736965499/ichiban/Safety_Image_avi7bh.png"
  });
  const powerImg = getCldImageUrl({ src: "https://res.cloudinary.com/hysteria/image/upload/v1736965500/ichiban/moto_zrw4f0.jpg" });
  return renderTemplate(_a || (_a = __template(["", '<section id="key-features" class="key-features" data-astro-cid-qz6tcar7> <div class="key-features-container container" data-astro-cid-qz6tcar7> <header class="key-features__title" data-astro-cid-qz6tcar7> <p class="key-features__title__left" data-astro-cid-qz6tcar7>YOUR</p> <div class="key-features__title__center" data-astro-cid-qz6tcar7> <p data-astro-cid-qz6tcar7>[</p> <p class="key-features__title__center__text" data-astro-cid-qz6tcar7>WAY TO</p> <p data-astro-cid-qz6tcar7>]</p> </div> <p class="key-features__title__right" data-astro-cid-qz6tcar7>FREEDOM</p> </header> <div class="features-container" data-astro-cid-qz6tcar7> <div class="features-container__top-left" data-astro-cid-qz6tcar7> <div class="features-container__top-left__content" data-astro-cid-qz6tcar7> <div class="features-container__top-left__content__text" data-astro-cid-qz6tcar7> <h3 data-astro-cid-qz6tcar7>HIGH<br data-astro-cid-qz6tcar7>PERFORMANCE</h3> <p data-astro-cid-qz6tcar7>The 45kW power dual motor system enables 0-100 km/h in 3.5 seconds</p> </div> </div> <video', "", "", "", "", "", ' data-astro-cid-qz6tcar7></video> </div> <div class="features-container__top-right" data-astro-cid-qz6tcar7> <div class="features-container__top-right__content" data-astro-cid-qz6tcar7> <div class="features-container__top-right__content__text" data-astro-cid-qz6tcar7> <h3 data-astro-cid-qz6tcar7>EVERYDAY CONVENIENCE</h3> <p data-astro-cid-qz6tcar7>250 km range, 70% of the charge in just 30 min</p> </div> </div> <video', "", "", "", "", "", ' data-astro-cid-qz6tcar7></video> </div> <div class="features-container__center" data-astro-cid-qz6tcar7> <div class="features-container__center__content" data-astro-cid-qz6tcar7> <div class="features-container__center__content__text" data-astro-cid-qz6tcar7> <h3 data-astro-cid-qz6tcar7>PURE AUTHENTIC DESIGN</h3> <p data-astro-cid-qz6tcar7>The distinctive design language embodies a sense of freedom and control</p> </div> </div> <video', "", "", "", "", ' data-astro-cid-qz6tcar7></video> </div> <div class="features-container__bottom-left" data-astro-cid-qz6tcar7> <div class="features-container__bottom-left__content-left" data-astro-cid-qz6tcar7> <div class="features-container__bottom-left__content__text" data-astro-cid-qz6tcar7> <h3 data-astro-cid-qz6tcar7>TRANSMISSION MODES</h3> <p data-astro-cid-qz6tcar7>Designed for electric motorcycle to deliver a truly immersive riding experience</p> </div> <figure id="animated-transmission" class="animated-transmission" data-astro-cid-qz6tcar7></figure> </div> <div class="features-container__bottom-left__content-right" data-astro-cid-qz6tcar7> <div class="features-container__bottom-left__content__text" data-astro-cid-qz6tcar7> <h3 data-astro-cid-qz6tcar7>MODERN<br data-astro-cid-qz6tcar7>SAFETY</h3> <p data-astro-cid-qz6tcar7>ABS and Traction Control for a safe ride in any weather conditions</p> </div> ', ' </div> </div> <div class="features-container__bottom-right" data-astro-cid-qz6tcar7> <div class="features-container__bottom-right__content" data-astro-cid-qz6tcar7> <div class="features-container__bottom-right__content__text" data-astro-cid-qz6tcar7> <h3 data-astro-cid-qz6tcar7>INSTANT<br data-astro-cid-qz6tcar7>POWER</h3> <p data-astro-cid-qz6tcar7>Experience instant, mind-blowing acceleration with maximum torque available at the twist of the throttle</p> </div> </div> ', ' </div> </div> <footer class="key-features__title down" data-astro-cid-qz6tcar7> <p class="key-features__title__left" data-astro-cid-qz6tcar7>SECTION 002</p> <div class="key-features__title__center" data-astro-cid-qz6tcar7> <p class="key-features__title__center__left-bracket" data-astro-cid-qz6tcar7>[</p> <p class="key-features__title__center__text" data-astro-cid-qz6tcar7>FEATURES</p> <p class="key-features__title__center__right-bracket" data-astro-cid-qz6tcar7>]</p> </div> <p class="key-features__title__right" data-astro-cid-qz6tcar7>START.POINT</p> </footer> </div> </section> <script>(function(){', '\n  const animatedTransmission = document.getElementById("animated-transmission");\n\n  // Cache for preloaded images\n  const imageCache = new Map();\n  let currentFrame = 0;\n  let isLoaded = false;\n  const frameRate = 24;\n  let animationInterval;\n  let isAnimating = false;\n\n  // Preload all frames before starting animation\n  async function preloadImages() {\n    // Prevent multiple preloading calls\n    if (isLoaded) return;\n\n    const loadingPromises = frameUrls.map((url) => {\n      return new Promise((resolve, reject) => {\n        // Check if image is already cached\n        if (imageCache.has(url)) {\n          resolve();\n          return;\n        }\n\n        const img = new Image();\n        img.onload = () => {\n          imageCache.set(url, img);\n          resolve();\n        };\n        img.onerror = reject;\n        img.src = url;\n      });\n    });\n\n    try {\n      await Promise.all(loadingPromises);\n      isLoaded = true;\n      startAnimation();\n      console.log("Images loaded:", imageCache.size);\n    } catch (error) {\n      console.error("Loading error:", error);\n    }\n  }\n\n  function updateImage(frame) {\n    if (!animatedTransmission || !isAnimating) return;\n\n    const url = frameUrls[frame];\n    const img = imageCache.get(url);\n\n    if (img) {\n      // Use requestAnimationFrame for smoother transitions\n      requestAnimationFrame(() => {\n        animatedTransmission.style.backgroundImage = `url(${img.src})`;\n      });\n    }\n  }\n\n  function startAnimation() {\n    if (!isLoaded || isAnimating) return;\n\n    isAnimating = true;\n\n    // Clear any existing interval\n    if (animationInterval) {\n      clearInterval(animationInterval);\n    }\n\n    // Use requestAnimationFrame for the first frame\n    requestAnimationFrame(() => {\n      updateImage(currentFrame);\n    });\n\n    // Set up the animation interval\n    animationInterval = setInterval(() => {\n      currentFrame = (currentFrame + 1) % totalFrames;\n      updateImage(currentFrame);\n    }, 1000 / frameRate);\n  }\n\n  function stopAnimation() {\n    isAnimating = false;\n    if (animationInterval) {\n      clearInterval(animationInterval);\n      animationInterval = null;\n    }\n  }\n\n  // Optional: Add cleanup function\n  function cleanup() {\n    stopAnimation();\n    imageCache.clear();\n    isLoaded = false;\n  }\n\n  // Start preloading when script runs\n  preloadImages();\n\n  // Optional: Clean up on page unload\n  window.addEventListener("unload", cleanup);\n})();<\/script> '], ["", '<section id="key-features" class="key-features" data-astro-cid-qz6tcar7> <div class="key-features-container container" data-astro-cid-qz6tcar7> <header class="key-features__title" data-astro-cid-qz6tcar7> <p class="key-features__title__left" data-astro-cid-qz6tcar7>YOUR</p> <div class="key-features__title__center" data-astro-cid-qz6tcar7> <p data-astro-cid-qz6tcar7>[</p> <p class="key-features__title__center__text" data-astro-cid-qz6tcar7>WAY TO</p> <p data-astro-cid-qz6tcar7>]</p> </div> <p class="key-features__title__right" data-astro-cid-qz6tcar7>FREEDOM</p> </header> <div class="features-container" data-astro-cid-qz6tcar7> <div class="features-container__top-left" data-astro-cid-qz6tcar7> <div class="features-container__top-left__content" data-astro-cid-qz6tcar7> <div class="features-container__top-left__content__text" data-astro-cid-qz6tcar7> <h3 data-astro-cid-qz6tcar7>HIGH<br data-astro-cid-qz6tcar7>PERFORMANCE</h3> <p data-astro-cid-qz6tcar7>The 45kW power dual motor system enables 0-100 km/h in 3.5 seconds</p> </div> </div> <video', "", "", "", "", "", ' data-astro-cid-qz6tcar7></video> </div> <div class="features-container__top-right" data-astro-cid-qz6tcar7> <div class="features-container__top-right__content" data-astro-cid-qz6tcar7> <div class="features-container__top-right__content__text" data-astro-cid-qz6tcar7> <h3 data-astro-cid-qz6tcar7>EVERYDAY CONVENIENCE</h3> <p data-astro-cid-qz6tcar7>250 km range, 70% of the charge in just 30 min</p> </div> </div> <video', "", "", "", "", "", ' data-astro-cid-qz6tcar7></video> </div> <div class="features-container__center" data-astro-cid-qz6tcar7> <div class="features-container__center__content" data-astro-cid-qz6tcar7> <div class="features-container__center__content__text" data-astro-cid-qz6tcar7> <h3 data-astro-cid-qz6tcar7>PURE AUTHENTIC DESIGN</h3> <p data-astro-cid-qz6tcar7>The distinctive design language embodies a sense of freedom and control</p> </div> </div> <video', "", "", "", "", ' data-astro-cid-qz6tcar7></video> </div> <div class="features-container__bottom-left" data-astro-cid-qz6tcar7> <div class="features-container__bottom-left__content-left" data-astro-cid-qz6tcar7> <div class="features-container__bottom-left__content__text" data-astro-cid-qz6tcar7> <h3 data-astro-cid-qz6tcar7>TRANSMISSION MODES</h3> <p data-astro-cid-qz6tcar7>Designed for electric motorcycle to deliver a truly immersive riding experience</p> </div> <figure id="animated-transmission" class="animated-transmission" data-astro-cid-qz6tcar7></figure> </div> <div class="features-container__bottom-left__content-right" data-astro-cid-qz6tcar7> <div class="features-container__bottom-left__content__text" data-astro-cid-qz6tcar7> <h3 data-astro-cid-qz6tcar7>MODERN<br data-astro-cid-qz6tcar7>SAFETY</h3> <p data-astro-cid-qz6tcar7>ABS and Traction Control for a safe ride in any weather conditions</p> </div> ', ' </div> </div> <div class="features-container__bottom-right" data-astro-cid-qz6tcar7> <div class="features-container__bottom-right__content" data-astro-cid-qz6tcar7> <div class="features-container__bottom-right__content__text" data-astro-cid-qz6tcar7> <h3 data-astro-cid-qz6tcar7>INSTANT<br data-astro-cid-qz6tcar7>POWER</h3> <p data-astro-cid-qz6tcar7>Experience instant, mind-blowing acceleration with maximum torque available at the twist of the throttle</p> </div> </div> ', ' </div> </div> <footer class="key-features__title down" data-astro-cid-qz6tcar7> <p class="key-features__title__left" data-astro-cid-qz6tcar7>SECTION 002</p> <div class="key-features__title__center" data-astro-cid-qz6tcar7> <p class="key-features__title__center__left-bracket" data-astro-cid-qz6tcar7>[</p> <p class="key-features__title__center__text" data-astro-cid-qz6tcar7>FEATURES</p> <p class="key-features__title__center__right-bracket" data-astro-cid-qz6tcar7>]</p> </div> <p class="key-features__title__right" data-astro-cid-qz6tcar7>START.POINT</p> </footer> </div> </section> <script>(function(){', '\n  const animatedTransmission = document.getElementById("animated-transmission");\n\n  // Cache for preloaded images\n  const imageCache = new Map();\n  let currentFrame = 0;\n  let isLoaded = false;\n  const frameRate = 24;\n  let animationInterval;\n  let isAnimating = false;\n\n  // Preload all frames before starting animation\n  async function preloadImages() {\n    // Prevent multiple preloading calls\n    if (isLoaded) return;\n\n    const loadingPromises = frameUrls.map((url) => {\n      return new Promise((resolve, reject) => {\n        // Check if image is already cached\n        if (imageCache.has(url)) {\n          resolve();\n          return;\n        }\n\n        const img = new Image();\n        img.onload = () => {\n          imageCache.set(url, img);\n          resolve();\n        };\n        img.onerror = reject;\n        img.src = url;\n      });\n    });\n\n    try {\n      await Promise.all(loadingPromises);\n      isLoaded = true;\n      startAnimation();\n      console.log("Images loaded:", imageCache.size);\n    } catch (error) {\n      console.error("Loading error:", error);\n    }\n  }\n\n  function updateImage(frame) {\n    if (!animatedTransmission || !isAnimating) return;\n\n    const url = frameUrls[frame];\n    const img = imageCache.get(url);\n\n    if (img) {\n      // Use requestAnimationFrame for smoother transitions\n      requestAnimationFrame(() => {\n        animatedTransmission.style.backgroundImage = \\`url(\\${img.src})\\`;\n      });\n    }\n  }\n\n  function startAnimation() {\n    if (!isLoaded || isAnimating) return;\n\n    isAnimating = true;\n\n    // Clear any existing interval\n    if (animationInterval) {\n      clearInterval(animationInterval);\n    }\n\n    // Use requestAnimationFrame for the first frame\n    requestAnimationFrame(() => {\n      updateImage(currentFrame);\n    });\n\n    // Set up the animation interval\n    animationInterval = setInterval(() => {\n      currentFrame = (currentFrame + 1) % totalFrames;\n      updateImage(currentFrame);\n    }, 1000 / frameRate);\n  }\n\n  function stopAnimation() {\n    isAnimating = false;\n    if (animationInterval) {\n      clearInterval(animationInterval);\n      animationInterval = null;\n    }\n  }\n\n  // Optional: Add cleanup function\n  function cleanup() {\n    stopAnimation();\n    imageCache.clear();\n    isLoaded = false;\n  }\n\n  // Start preloading when script runs\n  preloadImages();\n\n  // Optional: Clean up on page unload\n  window.addEventListener("unload", cleanup);\n})();<\/script> '])), maybeRenderHead(), addAttribute(dashboradVideoUrl, "src"), addAttribute(632, "width"), addAttribute(true, "autoplay"), addAttribute(true, "muted"), addAttribute(false, "controls"), addAttribute(true, "loop"), addAttribute(cubesVideoUrl, "src"), addAttribute(632, "width"), addAttribute(true, "autoplay"), addAttribute(true, "muted"), addAttribute(false, "controls"), addAttribute(true, "loop"), addAttribute(motoVideoUrl, "src"), addAttribute(true, "autoplay"), addAttribute(true, "muted"), addAttribute(false, "controls"), addAttribute(true, "loop"), renderComponent($$result, "Image", $$Image, { "src": safetyImg, "width": 260, "height": 260, "alt": "Image of visualisation of the ABS and Traction Control", "data-astro-cid-qz6tcar7": true }), renderComponent($$result, "Image", $$Image, { "src": powerImg, "width": 632, "height": 600, "alt": "Image of the motorcycle from a rear point of view", "data-astro-cid-qz6tcar7": true }), defineScriptVars({ frameUrls, totalFrames }));
}, "C:/Users/antho/Documents/Programmation/ichiban-clone/src/components/KeyFeatures.astro", undefined);

const $$ThrillOfRiding = createComponent(($$result, $$props, $$slots) => {
  const ichibanLogo = getCldImageUrl({
    src: "https://res.cloudinary.com/hysteria/image/upload/v1736965583/ichiban/favicon_256_ta3bwq.png"
  });
  return renderTemplate`${maybeRenderHead()}<div class="thrill" data-astro-cid-wtkrfyk5> <div class="gradient gradient-up" data-astro-cid-wtkrfyk5></div> <div class="page-padding" data-astro-cid-wtkrfyk5> <div class="thrill__container container" data-astro-cid-wtkrfyk5> ${renderComponent($$result, "Image", $$Image, { "src": ichibanLogo, "class": "thrill__container__image", "alt": "Ichiban logo", "width": 128, "height": 128, "data-astro-cid-wtkrfyk5": true })} <p class="thrill__container__text" data-astro-cid-wtkrfyk5>
This is The thrill of riding <span class="thrill__container__text--red" data-astro-cid-wtkrfyk5>Ichiban</span> </p> </div> </div> </div> `;
}, "C:/Users/antho/Documents/Programmation/ichiban-clone/src/components/ThrillOfRiding.astro", undefined);

const $$UniqueDesign = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<section id="unique-design" class="unique container" data-astro-cid-x4wv35bt> <div class="kanso-heading" data-astro-cid-x4wv35bt> <h2 class="heading-small" data-astro-cid-x4wv35bt>CRAFTED WITH THE SPIRIT OF KANSO</h2> ${renderComponent($$result, "Image", $$Image, { "src": "/images/simplicity.svg", "alt": "Simplicity written in Japanese", "width": 432, "height": 211, "class": "heading-image", "data-astro-cid-x4wv35bt": true })} </div> <div class="kanso-content__grid" data-astro-cid-x4wv35bt> ${renderComponent($$result, "Image", $$Image, { "src": "/images/dots.png", "alt": "dots matrix", "width": 873, "height": 402, "class": "kanso-content__grid__dots", "data-astro-cid-x4wv35bt": true })} ${renderComponent($$result, "Image", $$Image, { "src": "/images/dots.png", "alt": "dots matrix", "width": 873, "height": 402, "class": "kanso-content__grid__dots", "data-astro-cid-x4wv35bt": true })} <p class="kanso-content__grid__text" data-astro-cid-x4wv35bt>
Embodying the Japanese principle of Kanso, the Ichiban electric motorcycle showcases the beauty of simplicity and purpose in
      design.
</p> <p class="kanso-content__grid__text" data-astro-cid-x4wv35bt>
Amidst the cacophony of the world, it offers an escape into a tranquil journey, not just transporting you to your
      destination, but enriching the entire ride.
</p> </div> </section> `;
}, "C:/Users/antho/Documents/Programmation/ichiban-clone/src/components/UniqueDesign.astro", undefined);

const $$Astro$2 = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/png" href="/favicon_32.png"><link rel="icon" type="image/png" href="/favicon_256.png"><link href="https://cdn.prod.website-files.com/66cfddaa1d0f79b524971014/66dc210802429c73b80c27eb_favicon_32.png" rel="shortcut icon" type="image/x-icon"><link href="https://cdn.prod.website-files.com/66cfddaa1d0f79b524971014/66dc210da803d0d57fe3b539_favicon_256.png" rel="apple-touch-icon"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Ichiban Clone</title><link rel="stylesheet" href="/src/styles/global.css"><link rel="stylesheet" href="/src/styles/variables.css">${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/antho/Documents/Programmation/ichiban-clone/src/layouts/Layout.astro", undefined);

const $$Astro$1 = createAstro();
const $$Index$2 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$2;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-analytics", "vercel-analytics", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "C:/Users/antho/Documents/Programmation/ichiban-clone/node_modules/.pnpm/@vercel+analytics@1.4.1/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/antho/Documents/Programmation/ichiban-clone/node_modules/.pnpm/@vercel+analytics@1.4.1/node_modules/@vercel/analytics/dist/astro/index.astro", undefined);

const $$Astro = createAstro();
const $$Index$1 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index$1;
  const propsStr = JSON.stringify(Astro2.props);
  const paramsStr = JSON.stringify(Astro2.params);
  return renderTemplate`${renderComponent($$result, "vercel-speed-insights", "vercel-speed-insights", { "data-props": propsStr, "data-params": paramsStr, "data-pathname": Astro2.url.pathname })} ${renderScript($$result, "C:/Users/antho/Documents/Programmation/ichiban-clone/node_modules/.pnpm/@vercel+speed-insights@1.1.0/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/antho/Documents/Programmation/ichiban-clone/node_modules/.pnpm/@vercel+speed-insights@1.1.0/node_modules/@vercel/speed-insights/dist/astro/index.astro", undefined);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div class="page-padding"> ${renderComponent($$result2, "Hero", $$Hero, {})} ${renderComponent($$result2, "UniqueDesign", $$UniqueDesign, {})} </div> <div class="gradient gradient-up"></div> ${renderComponent($$result2, "KeyFeatures", $$KeyFeatures, {})} ${renderComponent($$result2, "GodzillaMode", $$GodzillaMode, {})} ${renderComponent($$result2, "ThrillOfRiding", $$ThrillOfRiding, {})} ${renderComponent($$result2, "ContactUs", $$ContactUs, {})} </main> ${renderComponent($$result2, "Footer", $$Footer, {})} ${renderComponent($$result2, "Analytics", $$Index$2, {})} ${renderComponent($$result2, "SpeedInsights", $$Index$1, {})} ` })}`;
}, "C:/Users/antho/Documents/Programmation/ichiban-clone/src/pages/index.astro", undefined);

const $$file = "C:/Users/antho/Documents/Programmation/ichiban-clone/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
