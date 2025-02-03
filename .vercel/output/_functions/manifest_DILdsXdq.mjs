import { d as decodeKey } from './chunks/astro/server_BvsuIkkZ.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_D6HO534Q.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/antho/Documents/Programmation/ichiban-clone/","cacheDir":"file:///C:/Users/antho/Documents/Programmation/ichiban-clone/node_modules/.astro/","outDir":"file:///C:/Users/antho/Documents/Programmation/ichiban-clone/dist/","srcDir":"file:///C:/Users/antho/Documents/Programmation/ichiban-clone/src/","publicDir":"file:///C:/Users/antho/Documents/Programmation/ichiban-clone/public/","buildClientDir":"file:///C:/Users/antho/Documents/Programmation/ichiban-clone/dist/client/","buildServerDir":"file:///C:/Users/antho/Documents/Programmation/ichiban-clone/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.V2R8AmkL.js"}],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.2.3_typescript@5.7.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/page.V2R8AmkL.js"}],"styles":[{"type":"external","src":"/_astro/index.B9VESx-m.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/antho/Documents/Programmation/ichiban-clone/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.2.3_typescript@5.7.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","C:/Users/antho/Documents/Programmation/ichiban-clone/node_modules/.pnpm/astro@5.2.3_typescript@5.7.3/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_DEmHfKP6.mjs","\u0000@astrojs-manifest":"manifest_DILdsXdq.mjs","C:/Users/antho/Documents/Programmation/ichiban-clone/src/components/ContactUs.astro?astro&type=script&index=0&lang.ts":"_astro/ContactUs.astro_astro_type_script_index_0_lang.DybSevkG.js","C:/Users/antho/Documents/Programmation/ichiban-clone/node_modules/.pnpm/@vercel+speed-insights@1.1.0/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.BWHn_pKp.js","C:/Users/antho/Documents/Programmation/ichiban-clone/node_modules/.pnpm/@vercel+analytics@1.4.1/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.Atey_QKf.js","astro:scripts/page.js":"_astro/page.V2R8AmkL.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["C:/Users/antho/Documents/Programmation/ichiban-clone/src/components/ContactUs.astro?astro&type=script&index=0&lang.ts","const e=document.querySelector(\".contact__form__top-left__down__card__label__checkbox\"),c=document.querySelector(\".contact__form__top-left__down__card__label__text\");e.addEventListener(\"click\",()=>{e.classList.toggle(\"checked\")});c.addEventListener(\"click\",()=>{e.classList.toggle(\"checked\")});"],["C:/Users/antho/Documents/Programmation/ichiban-clone/node_modules/.pnpm/@vercel+speed-insights@1.1.0/node_modules/@vercel/speed-insights/dist/astro/index.astro?astro&type=script&index=0&lang.ts","var u=\"@vercel/speed-insights\",l=\"1.1.0\",f=()=>{window.si||(window.si=function(...n){(window.siq=window.siq||[]).push(n)})};function p(){return typeof window<\"u\"}function v(){try{const e=\"production\"}catch{}return\"production\"}function a(){return v()===\"development\"}function w(e,n){if(!e||!n)return e;let r=e;try{const s=Object.entries(n);for(const[i,t]of s)if(!Array.isArray(t)){const o=c(t);o.test(r)&&(r=r.replace(o,`/[${i}]`))}for(const[i,t]of s)if(Array.isArray(t)){const o=c(t.join(\"/\"));o.test(r)&&(r=r.replace(o,`/[...${i}]`))}return r}catch{return e}}function c(e){return new RegExp(`/${m(e)}(?=[/?#]|$)`)}function m(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}var d=\"https://va.vercel-scripts.com/v1/speed-insights\",h=`${d}/script.js`,S=`${d}/script.debug.js`,g=\"/_vercel/speed-insights/script.js\";function R(e={}){var n;if(!p()||e.route===null)return null;f();const s=!!e.dsn?h:g,i=e.scriptSrc||(a()?S:s);if(document.head.querySelector(`script[src*=\"${i}\"]`))return null;e.beforeSend&&((n=window.si)==null||n.call(window,\"beforeSend\",e.beforeSend));const t=document.createElement(\"script\");return t.src=i,t.defer=!0,t.dataset.sdkn=u+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=l,e.sampleRate&&(t.dataset.sampleRate=e.sampleRate.toString()),e.route&&(t.dataset.route=e.route),e.endpoint&&(t.dataset.endpoint=e.endpoint),e.dsn&&(t.dataset.dsn=e.dsn),a()&&e.debug===!1&&(t.dataset.debug=\"false\"),t.onerror=()=>{console.log(`[Vercel Speed Insights] Failed to load script from ${i}. Please check if any content blockers are enabled and try again.`)},document.head.appendChild(t),{setRoute:o=>{t.dataset.route=o??void 0}}}customElements.define(\"vercel-speed-insights\",class extends HTMLElement{constructor(){super();try{const n=JSON.parse(this.dataset.props??\"{}\"),r=JSON.parse(this.dataset.params??\"{}\"),s=w(this.dataset.pathname??\"\",r);R({route:s,...n,framework:\"astro\",beforeSend:window.speedInsightsBeforeSend})}catch(n){throw new Error(`Failed to parse SpeedInsights properties: ${n}`)}}});"],["C:/Users/antho/Documents/Programmation/ichiban-clone/node_modules/.pnpm/@vercel+analytics@1.4.1/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts","var l=\"@vercel/analytics\",f=\"1.4.1\",w=()=>{window.va||(window.va=function(...r){(window.vaq=window.vaq||[]).push(r)})};function d(){return typeof window<\"u\"}function u(){try{const e=\"production\"}catch{}return\"production\"}function v(e=\"auto\"){if(e===\"auto\"){window.vam=u();return}window.vam=e}function m(){return(d()?window.vam:u())||\"production\"}function c(){return m()===\"development\"}function p(e,r){if(!e||!r)return e;let n=e;try{const t=Object.entries(r);for(const[a,o]of t)if(!Array.isArray(o)){const i=s(o);i.test(n)&&(n=n.replace(i,`/[${a}]`))}for(const[a,o]of t)if(Array.isArray(o)){const i=s(o.join(\"/\"));i.test(n)&&(n=n.replace(i,`/[...${a}]`))}return n}catch{return e}}function s(e){return new RegExp(`/${y(e)}(?=[/?#]|$)`)}function y(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}var b=\"https://va.vercel-scripts.com/v1/script.debug.js\",g=\"/_vercel/insights/script.js\";function h(e={debug:!0}){var r;if(!d())return;v(e.mode),w(),e.beforeSend&&((r=window.va)==null||r.call(window,\"beforeSend\",e.beforeSend));const n=e.scriptSrc||(c()?b:g);if(document.head.querySelector(`script[src*=\"${n}\"]`))return;const t=document.createElement(\"script\");t.src=n,t.defer=!0,t.dataset.sdkn=l+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=f,e.disableAutoTrack&&(t.dataset.disableAutoTrack=\"1\"),e.endpoint&&(t.dataset.endpoint=e.endpoint),e.dsn&&(t.dataset.dsn=e.dsn),t.onerror=()=>{const a=c()?\"Please check if any ad blockers are enabled and try again.\":\"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.\";console.log(`[Vercel Web Analytics] Failed to load script from ${n}. ${a}`)},c()&&e.debug===!1&&(t.dataset.debug=\"false\"),document.head.appendChild(t)}function k({route:e,path:r}){var n;(n=window.va)==null||n.call(window,\"pageview\",{route:e,path:r})}customElements.define(\"vercel-analytics\",class extends HTMLElement{constructor(){super();try{const r=JSON.parse(this.dataset.props??\"{}\"),n=JSON.parse(this.dataset.params??\"{}\");h({...r,disableAutoTrack:!0,framework:\"astro\",beforeSend:window.webAnalyticsBeforeSend});const t=this.dataset.pathname;k({route:p(t??\"\",n),path:t})}catch(r){throw new Error(`Failed to parse WebAnalytics properties: ${r}`)}}});"]],"assets":["/_astro/index.B9VESx-m.css","/favicon_256.png","/favicon_32.png","/logo.png","/fonts/Akira-Expanded.woff","/fonts/Inconsolata-Bold.ttf","/fonts/Inconsolata-Bold.woff","/fonts/Inconsolata-Regular.ttf","/fonts/Inconsolata-Regular.woff","/icons/arrow-scroll.svg","/icons/github.svg","/icons/linkedin.svg","/icons/policy-check.svg","/icons/x.svg","/_astro/page.V2R8AmkL.js","/images/dots.png","/images/simplicity.svg","/_astro/page.V2R8AmkL.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"ZRUtcRz9PqLIInG2PTcfhjqPTiJM53+hMZBKwYE8pl4="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
