(function (/*! Brunch !*/) {
    'use strict';

    var globals = typeof window !== 'undefined' ? window : global;
    if (typeof globals.require === 'function') return;

    var modules = {};
    var cache = {};

    var has = function (object, name) {
        return ({}).hasOwnProperty.call(object, name);
    };

    var expand = function (root, name) {
        var results = [], parts, part;
        if (/^\.\.?(\/|$)/.test(name)) {
            parts = [root, name].join('/').split('/');
        } else {
            parts = name.split('/');
        }
        for (var i = 0, length = parts.length; i < length; i++) {
            part = parts[i];
            if (part === '..') {
                results.pop();
            } else if (part !== '.' && part !== '') {
                results.push(part);
            }
        }
        return results.join('/');
    };

    var dirname = function (path) {
        return path.split('/').slice(0, -1).join('/');
    };

    var localRequire = function (path) {
        return function (name) {
            var dir = dirname(path);
            var absolute = expand(dir, name);
            return globals.require(absolute);
        };
    };

    var initModule = function (name, definition) {
        var module = { id: name, exports: {} };
        definition(module.exports, localRequire(name), module);
        var exports = cache[name] = module.exports;
        return exports;
    };

    var require = function (name) {
        var path = expand(name, '.');

        if (has(cache, path)) return cache[path];
        if (has(modules, path)) return initModule(path, modules[path]);

        var dirIndex = expand(path, './index');
        if (has(cache, dirIndex)) return cache[dirIndex];
        if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

        throw new Error('Cannot find module "' + name + '"');
    };

    var define = function (bundle) {
        for (var key in bundle) {
            if (has(bundle, key)) {
                modules[key] = bundle[key];
            }
        }
    }

    globals.require = require;
    globals.require.define = define;
    globals.require.brunch = true;
})();

// Make it safe to do console.log() always.
(function (con) {
    var method;
    var dummy = function () { };
    var methods = ('assert,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
     'time,timeEnd,trace,warn').split(',');
    while (method = methods.pop()) {
        con[method] = con[method] || dummy;
    }
})(window.console = window.console || {});
;

/*! jQuery v@1.8.0 jquery.com | jquery.org/license */
(function (a, b) { function G(a) { var b = F[a] = {}; return p.each(a.split(s), function (a, c) { b[c] = !0 }), b } function J(a, c, d) { if (d === b && a.nodeType === 1) { var e = "data-" + c.replace(I, "-$1").toLowerCase(); d = a.getAttribute(e); if (typeof d == "string") { try { d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : +d + "" === d ? +d : H.test(d) ? p.parseJSON(d) : d } catch (f) { } p.data(a, c, d) } else d = b } return d } function K(a) { var b; for (b in a) { if (b === "data" && p.isEmptyObject(a[b])) continue; if (b !== "toJSON") return !1 } return !0 } function ba() { return !1 } function bb() { return !0 } function bh(a) { return !a || !a.parentNode || a.parentNode.nodeType === 11 } function bi(a, b) { do a = a[b]; while (a && a.nodeType !== 1); return a } function bj(a, b, c) { b = b || 0; if (p.isFunction(b)) return p.grep(a, function (a, d) { var e = !!b.call(a, d, a); return e === c }); if (b.nodeType) return p.grep(a, function (a, d) { return a === b === c }); if (typeof b == "string") { var d = p.grep(a, function (a) { return a.nodeType === 1 }); if (be.test(b)) return p.filter(b, d, !c); b = p.filter(b, d) } return p.grep(a, function (a, d) { return p.inArray(a, b) >= 0 === c }) } function bk(a) { var b = bl.split("|"), c = a.createDocumentFragment(); if (c.createElement) while (b.length) c.createElement(b.pop()); return c } function bC(a, b) { return a.getElementsByTagName(b)[0] || a.appendChild(a.ownerDocument.createElement(b)) } function bD(a, b) { if (b.nodeType !== 1 || !p.hasData(a)) return; var c, d, e, f = p._data(a), g = p._data(b, f), h = f.events; if (h) { delete g.handle, g.events = {}; for (c in h) for (d = 0, e = h[c].length; d < e; d++) p.event.add(b, c, h[c][d]) } g.data && (g.data = p.extend({}, g.data)) } function bE(a, b) { var c; if (b.nodeType !== 1) return; b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase(), c === "object" ? (b.parentNode && (b.outerHTML = a.outerHTML), p.support.html5Clone && a.innerHTML && !p.trim(b.innerHTML) && (b.innerHTML = a.innerHTML)) : c === "input" && bv.test(a.type) ? (b.defaultChecked = b.checked = a.checked, b.value !== a.value && (b.value = a.value)) : c === "option" ? b.selected = a.defaultSelected : c === "input" || c === "textarea" ? b.defaultValue = a.defaultValue : c === "script" && b.text !== a.text && (b.text = a.text), b.removeAttribute(p.expando) } function bF(a) { return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : [] } function bG(a) { bv.test(a.type) && (a.defaultChecked = a.checked) } function bX(a, b) { if (b in a) return b; var c = b.charAt(0).toUpperCase() + b.slice(1), d = b, e = bV.length; while (e--) { b = bV[e] + c; if (b in a) return b } return d } function bY(a, b) { return a = b || a, p.css(a, "display") === "none" || !p.contains(a.ownerDocument, a) } function bZ(a, b) { var c, d, e = [], f = 0, g = a.length; for (; f < g; f++) { c = a[f]; if (!c.style) continue; e[f] = p._data(c, "olddisplay"), b ? (!e[f] && c.style.display === "none" && (c.style.display = ""), c.style.display === "" && bY(c) && (e[f] = p._data(c, "olddisplay", cb(c.nodeName)))) : (d = bH(c, "display"), !e[f] && d !== "none" && p._data(c, "olddisplay", d)) } for (f = 0; f < g; f++) { c = a[f]; if (!c.style) continue; if (!b || c.style.display === "none" || c.style.display === "") c.style.display = b ? e[f] || "" : "none" } return a } function b$(a, b, c) { var d = bO.exec(b); return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b } function b_(a, b, c, d) { var e = c === (d ? "border" : "content") ? 4 : b === "width" ? 1 : 0, f = 0; for (; e < 4; e += 2) c === "margin" && (f += p.css(a, c + bU[e], !0)), d ? (c === "content" && (f -= parseFloat(bH(a, "padding" + bU[e])) || 0), c !== "margin" && (f -= parseFloat(bH(a, "border" + bU[e] + "Width")) || 0)) : (f += parseFloat(bH(a, "padding" + bU[e])) || 0, c !== "padding" && (f += parseFloat(bH(a, "border" + bU[e] + "Width")) || 0)); return f } function ca(a, b, c) { var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = !0, f = p.support.boxSizing && p.css(a, "boxSizing") === "border-box"; if (d <= 0) { d = bH(a, b); if (d < 0 || d == null) d = a.style[b]; if (bP.test(d)) return d; e = f && (p.support.boxSizingReliable || d === a.style[b]), d = parseFloat(d) || 0 } return d + b_(a, b, c || (f ? "border" : "content"), e) + "px" } function cb(a) { if (bR[a]) return bR[a]; var b = p("<" + a + ">").appendTo(e.body), c = b.css("display"); b.remove(); if (c === "none" || c === "") { bI = e.body.appendChild(bI || p.extend(e.createElement("iframe"), { frameBorder: 0, width: 0, height: 0 })); if (!bJ || !bI.createElement) bJ = (bI.contentWindow || bI.contentDocument).document, bJ.write("<!doctype html><html><body>"), bJ.close(); b = bJ.body.appendChild(bJ.createElement(a)), c = bH(b, "display"), e.body.removeChild(bI) } return bR[a] = c, c } function ch(a, b, c, d) { var e; if (p.isArray(b)) p.each(b, function (b, e) { c || cd.test(a) ? d(a, e) : ch(a + "[" + (typeof e == "object" ? b : "") + "]", e, c, d) }); else if (!c && p.type(b) === "object") for (e in b) ch(a + "[" + e + "]", b[e], c, d); else d(a, b) } function cy(a) { return function (b, c) { typeof b != "string" && (c = b, b = "*"); var d, e, f, g = b.toLowerCase().split(s), h = 0, i = g.length; if (p.isFunction(c)) for (; h < i; h++) d = g[h], f = /^\+/.test(d), f && (d = d.substr(1) || "*"), e = a[d] = a[d] || [], e[f ? "unshift" : "push"](c) } } function cz(a, c, d, e, f, g) { f = f || c.dataTypes[0], g = g || {}, g[f] = !0; var h, i = a[f], j = 0, k = i ? i.length : 0, l = a === cu; for (; j < k && (l || !h); j++) h = i[j](c, d, e), typeof h == "string" && (!l || g[h] ? h = b : (c.dataTypes.unshift(h), h = cz(a, c, d, e, h, g))); return (l || !h) && !g["*"] && (h = cz(a, c, d, e, "*", g)), h } function cA(a, c) { var d, e, f = p.ajaxSettings.flatOptions || {}; for (d in c) c[d] !== b && ((f[d] ? a : e || (e = {}))[d] = c[d]); e && p.extend(!0, a, e) } function cB(a, c, d) { var e, f, g, h, i = a.contents, j = a.dataTypes, k = a.responseFields; for (f in k) f in d && (c[k[f]] = d[f]); while (j[0] === "*") j.shift(), e === b && (e = a.mimeType || c.getResponseHeader("content-type")); if (e) for (f in i) if (i[f] && i[f].test(e)) { j.unshift(f); break } if (j[0] in d) g = j[0]; else { for (f in d) { if (!j[0] || a.converters[f + " " + j[0]]) { g = f; break } h || (h = f) } g = g || h } if (g) return g !== j[0] && j.unshift(g), d[g] } function cC(a, b) { var c, d, e, f, g = a.dataTypes.slice(), h = g[0], i = {}, j = 0; a.dataFilter && (b = a.dataFilter(b, a.dataType)); if (g[1]) for (c in a.converters) i[c.toLowerCase()] = a.converters[c]; for (; e = g[++j]; ) if (e !== "*") { if (h !== "*" && h !== e) { c = i[h + " " + e] || i["* " + e]; if (!c) for (d in i) { f = d.split(" "); if (f[1] === e) { c = i[h + " " + f[0]] || i["* " + f[0]]; if (c) { c === !0 ? c = i[d] : i[d] !== !0 && (e = f[0], g.splice(j--, 0, e)); break } } } if (c !== !0) if (c && a["throws"]) b = c(b); else try { b = c(b) } catch (k) { return { state: "parsererror", error: c ? k : "No conversion from " + h + " to " + e} } } h = e } return { state: "success", data: b} } function cK() { try { return new a.XMLHttpRequest } catch (b) { } } function cL() { try { return new a.ActiveXObject("Microsoft.XMLHTTP") } catch (b) { } } function cT() { return setTimeout(function () { cM = b }, 0), cM = p.now() } function cU(a, b) { p.each(b, function (b, c) { var d = (cS[b] || []).concat(cS["*"]), e = 0, f = d.length; for (; e < f; e++) if (d[e].call(a, b, c)) return }) } function cV(a, b, c) { var d, e = 0, f = 0, g = cR.length, h = p.Deferred().always(function () { delete i.elem }), i = function () { var b = cM || cT(), c = Math.max(0, j.startTime + j.duration - b), d = 1 - (c / j.duration || 0), e = 0, f = j.tweens.length; for (; e < f; e++) j.tweens[e].run(d); return h.notifyWith(a, [j, d, c]), d < 1 && f ? c : (h.resolveWith(a, [j]), !1) }, j = h.promise({ elem: a, props: p.extend({}, b), opts: p.extend(!0, { specialEasing: {} }, c), originalProperties: b, originalOptions: c, startTime: cM || cT(), duration: c.duration, tweens: [], createTween: function (b, c, d) { var e = p.Tween(a, j.opts, b, c, j.opts.specialEasing[b] || j.opts.easing); return j.tweens.push(e), e }, stop: function (b) { var c = 0, d = b ? j.tweens.length : 0; for (; c < d; c++) j.tweens[c].run(1); return b ? h.resolveWith(a, [j, b]) : h.rejectWith(a, [j, b]), this } }), k = j.props; cW(k, j.opts.specialEasing); for (; e < g; e++) { d = cR[e].call(j, a, k, j.opts); if (d) return d } return cU(j, k), p.isFunction(j.opts.start) && j.opts.start.call(a, j), p.fx.timer(p.extend(i, { anim: j, queue: j.opts.queue, elem: a })), j.progress(j.opts.progress).done(j.opts.done, j.opts.complete).fail(j.opts.fail).always(j.opts.always) } function cW(a, b) { var c, d, e, f, g; for (c in a) { d = p.camelCase(c), e = b[d], f = a[c], p.isArray(f) && (e = f[1], f = a[c] = f[0]), c !== d && (a[d] = f, delete a[c]), g = p.cssHooks[d]; if (g && "expand" in g) { f = g.expand(f), delete a[d]; for (c in f) c in a || (a[c] = f[c], b[c] = e) } else b[d] = e } } function cX(a, b, c) { var d, e, f, g, h, i, j, k, l = this, m = a.style, n = {}, o = [], q = a.nodeType && bY(a); c.queue || (j = p._queueHooks(a, "fx"), j.unqueued == null && (j.unqueued = 0, k = j.empty.fire, j.empty.fire = function () { j.unqueued || k() }), j.unqueued++, l.always(function () { l.always(function () { j.unqueued--, p.queue(a, "fx").length || j.empty.fire() }) })), a.nodeType === 1 && ("height" in b || "width" in b) && (c.overflow = [m.overflow, m.overflowX, m.overflowY], p.css(a, "display") === "inline" && p.css(a, "float") === "none" && (!p.support.inlineBlockNeedsLayout || cb(a.nodeName) === "inline" ? m.display = "inline-block" : m.zoom = 1)), c.overflow && (m.overflow = "hidden", p.support.shrinkWrapBlocks || l.done(function () { m.overflow = c.overflow[0], m.overflowX = c.overflow[1], m.overflowY = c.overflow[2] })); for (d in b) { f = b[d]; if (cO.exec(f)) { delete b[d]; if (f === (q ? "hide" : "show")) continue; o.push(d) } } g = o.length; if (g) { h = p._data(a, "fxshow") || p._data(a, "fxshow", {}), q ? p(a).show() : l.done(function () { p(a).hide() }), l.done(function () { var b; p.removeData(a, "fxshow", !0); for (b in n) p.style(a, b, n[b]) }); for (d = 0; d < g; d++) e = o[d], i = l.createTween(e, q ? h[e] : 0), n[e] = h[e] || p.style(a, e), e in h || (h[e] = i.start, q && (i.end = i.start, i.start = e === "width" || e === "height" ? 1 : 0)) } } function cY(a, b, c, d, e) { return new cY.prototype.init(a, b, c, d, e) } function cZ(a, b) { var c, d = { height: a }, e = 0; for (; e < 4; e += 2 - b) c = bU[e], d["margin" + c] = d["padding" + c] = a; return b && (d.opacity = d.width = a), d } function c_(a) { return p.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1 } var c, d, e = a.document, f = a.location, g = a.navigator, h = a.jQuery, i = a.$, j = Array.prototype.push, k = Array.prototype.slice, l = Array.prototype.indexOf, m = Object.prototype.toString, n = Object.prototype.hasOwnProperty, o = String.prototype.trim, p = function (a, b) { return new p.fn.init(a, b, c) }, q = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source, r = /\S/, s = /\s+/, t = r.test(" ") ? /^[\s\xA0]+|[\s\xA0]+$/g : /^\s+|\s+$/g, u = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, v = /^<(\w+)\s*\/?>(?:<\/\1>|)$/, w = /^[\],:{}\s]*$/, x = /(?:^|:|,)(?:\s*\[)+/g, y = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g, z = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g, A = /^-ms-/, B = /-([\da-z])/gi, C = function (a, b) { return (b + "").toUpperCase() }, D = function () { e.addEventListener ? (e.removeEventListener("DOMContentLoaded", D, !1), p.ready()) : e.readyState === "complete" && (e.detachEvent("onreadystatechange", D), p.ready()) }, E = {}; p.fn = p.prototype = { constructor: p, init: function (a, c, d) { var f, g, h, i; if (!a) return this; if (a.nodeType) return this.context = this[0] = a, this.length = 1, this; if (typeof a == "string") { a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? f = [null, a, null] : f = u.exec(a); if (f && (f[1] || !c)) { if (f[1]) return c = c instanceof p ? c[0] : c, i = c && c.nodeType ? c.ownerDocument || c : e, a = p.parseHTML(f[1], i, !0), v.test(f[1]) && p.isPlainObject(c) && this.attr.call(a, c, !0), p.merge(this, a); g = e.getElementById(f[2]); if (g && g.parentNode) { if (g.id !== f[2]) return d.find(a); this.length = 1, this[0] = g } return this.context = e, this.selector = a, this } return !c || c.jquery ? (c || d).find(a) : this.constructor(c).find(a) } return p.isFunction(a) ? d.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), p.makeArray(a, this)) }, selector: "", jquery: "1.8.0", length: 0, size: function () { return this.length }, toArray: function () { return k.call(this) }, get: function (a) { return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a] }, pushStack: function (a, b, c) { var d = p.merge(this.constructor(), a); return d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d }, each: function (a, b) { return p.each(this, a, b) }, ready: function (a) { return p.ready.promise().done(a), this }, eq: function (a) { return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, slice: function () { return this.pushStack(k.apply(this, arguments), "slice", k.call(arguments).join(",")) }, map: function (a) { return this.pushStack(p.map(this, function (b, c) { return a.call(b, c, b) })) }, end: function () { return this.prevObject || this.constructor(null) }, push: j, sort: [].sort, splice: [].splice }, p.fn.init.prototype = p.fn, p.extend = p.fn.extend = function () { var a, c, d, e, f, g, h = arguments[0] || {}, i = 1, j = arguments.length, k = !1; typeof h == "boolean" && (k = h, h = arguments[1] || {}, i = 2), typeof h != "object" && !p.isFunction(h) && (h = {}), j === i && (h = this, --i); for (; i < j; i++) if ((a = arguments[i]) != null) for (c in a) { d = h[c], e = a[c]; if (h === e) continue; k && e && (p.isPlainObject(e) || (f = p.isArray(e))) ? (f ? (f = !1, g = d && p.isArray(d) ? d : []) : g = d && p.isPlainObject(d) ? d : {}, h[c] = p.extend(k, g, e)) : e !== b && (h[c] = e) } return h }, p.extend({ noConflict: function (b) { return a.$ === p && (a.$ = i), b && a.jQuery === p && (a.jQuery = h), p }, isReady: !1, readyWait: 1, holdReady: function (a) { a ? p.readyWait++ : p.ready(!0) }, ready: function (a) { if (a === !0 ? --p.readyWait : p.isReady) return; if (!e.body) return setTimeout(p.ready, 1); p.isReady = !0; if (a !== !0 && --p.readyWait > 0) return; d.resolveWith(e, [p]), p.fn.trigger && p(e).trigger("ready").off("ready") }, isFunction: function (a) { return p.type(a) === "function" }, isArray: Array.isArray || function (a) { return p.type(a) === "array" }, isWindow: function (a) { return a != null && a == a.window }, isNumeric: function (a) { return !isNaN(parseFloat(a)) && isFinite(a) }, type: function (a) { return a == null ? String(a) : E[m.call(a)] || "object" }, isPlainObject: function (a) { if (!a || p.type(a) !== "object" || a.nodeType || p.isWindow(a)) return !1; try { if (a.constructor && !n.call(a, "constructor") && !n.call(a.constructor.prototype, "isPrototypeOf")) return !1 } catch (c) { return !1 } var d; for (d in a); return d === b || n.call(a, d) }, isEmptyObject: function (a) { var b; for (b in a) return !1; return !0 }, error: function (a) { throw new Error(a) }, parseHTML: function (a, b, c) { var d; return !a || typeof a != "string" ? null : (typeof b == "boolean" && (c = b, b = 0), b = b || e, (d = v.exec(a)) ? [b.createElement(d[1])] : (d = p.buildFragment([a], b, c ? null : []), p.merge([], (d.cacheable ? p.clone(d.fragment) : d.fragment).childNodes))) }, parseJSON: function (b) { if (!b || typeof b != "string") return null; b = p.trim(b); if (a.JSON && a.JSON.parse) return a.JSON.parse(b); if (w.test(b.replace(y, "@").replace(z, "]").replace(x, ""))) return (new Function("return " + b))(); p.error("Invalid JSON: " + b) }, parseXML: function (c) { var d, e; if (!c || typeof c != "string") return null; try { a.DOMParser ? (e = new DOMParser, d = e.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c)) } catch (f) { d = b } return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && p.error("Invalid XML: " + c), d }, noop: function () { }, globalEval: function (b) { b && r.test(b) && (a.execScript || function (b) { a.eval.call(a, b) })(b) }, camelCase: function (a) { return a.replace(A, "ms-").replace(B, C) }, nodeName: function (a, b) { return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase() }, each: function (a, c, d) { var e, f = 0, g = a.length, h = g === b || p.isFunction(a); if (d) { if (h) { for (e in a) if (c.apply(a[e], d) === !1) break } else for (; f < g; ) if (c.apply(a[f++], d) === !1) break } else if (h) { for (e in a) if (c.call(a[e], e, a[e]) === !1) break } else for (; f < g; ) if (c.call(a[f], f, a[f++]) === !1) break; return a }, trim: o ? function (a) { return a == null ? "" : o.call(a) } : function (a) { return a == null ? "" : a.toString().replace(t, "") }, makeArray: function (a, b) { var c, d = b || []; return a != null && (c = p.type(a), a.length == null || c === "string" || c === "function" || c === "regexp" || p.isWindow(a) ? j.call(d, a) : p.merge(d, a)), d }, inArray: function (a, b, c) { var d; if (b) { if (l) return l.call(b, a, c); d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0; for (; c < d; c++) if (c in b && b[c] === a) return c } return -1 }, merge: function (a, c) { var d = c.length, e = a.length, f = 0; if (typeof d == "number") for (; f < d; f++) a[e++] = c[f]; else while (c[f] !== b) a[e++] = c[f++]; return a.length = e, a }, grep: function (a, b, c) { var d, e = [], f = 0, g = a.length; c = !!c; for (; f < g; f++) d = !!b(a[f], f), c !== d && e.push(a[f]); return e }, map: function (a, c, d) { var e, f, g = [], h = 0, i = a.length, j = a instanceof p || i !== b && typeof i == "number" && (i > 0 && a[0] && a[i - 1] || i === 0 || p.isArray(a)); if (j) for (; h < i; h++) e = c(a[h], h, d), e != null && (g[g.length] = e); else for (f in a) e = c(a[f], f, d), e != null && (g[g.length] = e); return g.concat.apply([], g) }, guid: 1, proxy: function (a, c) { var d, e, f; return typeof c == "string" && (d = a[c], c = a, a = d), p.isFunction(a) ? (e = k.call(arguments, 2), f = function () { return a.apply(c, e.concat(k.call(arguments))) }, f.guid = a.guid = a.guid || f.guid || p.guid++, f) : b }, access: function (a, c, d, e, f, g, h) { var i, j = d == null, k = 0, l = a.length; if (d && typeof d == "object") { for (k in d) p.access(a, c, k, d[k], 1, g, e); f = 1 } else if (e !== b) { i = h === b && p.isFunction(e), j && (i ? (i = c, c = function (a, b, c) { return i.call(p(a), c) }) : (c.call(a, e), c = null)); if (c) for (; k < l; k++) c(a[k], d, i ? e.call(a[k], k, c(a[k], d)) : e, h); f = 1 } return f ? a : j ? c.call(a) : l ? c(a[0], d) : g }, now: function () { return (new Date).getTime() } }), p.ready.promise = function (b) { if (!d) { d = p.Deferred(); if (e.readyState === "complete" || e.readyState !== "loading" && e.addEventListener) setTimeout(p.ready, 1); else if (e.addEventListener) e.addEventListener("DOMContentLoaded", D, !1), a.addEventListener("load", p.ready, !1); else { e.attachEvent("onreadystatechange", D), a.attachEvent("onload", p.ready); var c = !1; try { c = a.frameElement == null && e.documentElement } catch (f) { } c && c.doScroll && function g() { if (!p.isReady) { try { c.doScroll("left") } catch (a) { return setTimeout(g, 50) } p.ready() } } () } } return d.promise(b) }, p.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (a, b) { E["[object " + b + "]"] = b.toLowerCase() }), c = p(e); var F = {}; p.Callbacks = function (a) { a = typeof a == "string" ? F[a] || G(a) : p.extend({}, a); var c, d, e, f, g, h, i = [], j = !a.once && [], k = function (b) { c = a.memory && b, d = !0, h = f || 0, f = 0, g = i.length, e = !0; for (; i && h < g; h++) if (i[h].apply(b[0], b[1]) === !1 && a.stopOnFalse) { c = !1; break } e = !1, i && (j ? j.length && k(j.shift()) : c ? i = [] : l.disable()) }, l = { add: function () { if (i) { var b = i.length; (function d(b) { p.each(b, function (b, c) { p.isFunction(c) && (!a.unique || !l.has(c)) ? i.push(c) : c && c.length && d(c) }) })(arguments), e ? g = i.length : c && (f = b, k(c)) } return this }, remove: function () { return i && p.each(arguments, function (a, b) { var c; while ((c = p.inArray(b, i, c)) > -1) i.splice(c, 1), e && (c <= g && g--, c <= h && h--) }), this }, has: function (a) { return p.inArray(a, i) > -1 }, empty: function () { return i = [], this }, disable: function () { return i = j = c = b, this }, disabled: function () { return !i }, lock: function () { return j = b, c || l.disable(), this }, locked: function () { return !j }, fireWith: function (a, b) { return b = b || [], b = [a, b.slice ? b.slice() : b], i && (!d || j) && (e ? j.push(b) : k(b)), this }, fire: function () { return l.fireWith(this, arguments), this }, fired: function () { return !!d } }; return l }, p.extend({ Deferred: function (a) { var b = [["resolve", "done", p.Callbacks("once memory"), "resolved"], ["reject", "fail", p.Callbacks("once memory"), "rejected"], ["notify", "progress", p.Callbacks("memory")]], c = "pending", d = { state: function () { return c }, always: function () { return e.done(arguments).fail(arguments), this }, then: function () { var a = arguments; return p.Deferred(function (c) { p.each(b, function (b, d) { var f = d[0], g = a[b]; e[d[1]](p.isFunction(g) ? function () { var a = g.apply(this, arguments); a && p.isFunction(a.promise) ? a.promise().done(c.resolve).fail(c.reject).progress(c.notify) : c[f + "With"](this === e ? c : this, [a]) } : c[f]) }), a = null }).promise() }, promise: function (a) { return typeof a == "object" ? p.extend(a, d) : d } }, e = {}; return d.pipe = d.then, p.each(b, function (a, f) { var g = f[2], h = f[3]; d[f[1]] = g.add, h && g.add(function () { c = h }, b[a ^ 1][2].disable, b[2][2].lock), e[f[0]] = g.fire, e[f[0] + "With"] = g.fireWith }), d.promise(e), a && a.call(e, e), e }, when: function (a) { var b = 0, c = k.call(arguments), d = c.length, e = d !== 1 || a && p.isFunction(a.promise) ? d : 0, f = e === 1 ? a : p.Deferred(), g = function (a, b, c) { return function (d) { b[a] = this, c[a] = arguments.length > 1 ? k.call(arguments) : d, c === h ? f.notifyWith(b, c) : --e || f.resolveWith(b, c) } }, h, i, j; if (d > 1) { h = new Array(d), i = new Array(d), j = new Array(d); for (; b < d; b++) c[b] && p.isFunction(c[b].promise) ? c[b].promise().done(g(b, j, c)).fail(f.reject).progress(g(b, i, h)) : --e } return e || f.resolveWith(j, c), f.promise() } }), p.support = function () { var b, c, d, f, g, h, i, j, k, l, m, n = e.createElement("div"); n.setAttribute("className", "t"), n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", c = n.getElementsByTagName("*"), d = n.getElementsByTagName("a")[0], d.style.cssText = "top:1px;float:left;opacity:.5"; if (!c || !c.length || !d) return {}; f = e.createElement("select"), g = f.appendChild(e.createElement("option")), h = n.getElementsByTagName("input")[0], b = { leadingWhitespace: n.firstChild.nodeType === 3, tbody: !n.getElementsByTagName("tbody").length, htmlSerialize: !!n.getElementsByTagName("link").length, style: /top/.test(d.getAttribute("style")), hrefNormalized: d.getAttribute("href") === "/a", opacity: /^0.5/.test(d.style.opacity), cssFloat: !!d.style.cssFloat, checkOn: h.value === "on", optSelected: g.selected, getSetAttribute: n.className !== "t", enctype: !!e.createElement("form").enctype, html5Clone: e.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", boxModel: e.compatMode === "CSS1Compat", submitBubbles: !0, changeBubbles: !0, focusinBubbles: !1, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, boxSizingReliable: !0, pixelPosition: !1 }, h.checked = !0, b.noCloneChecked = h.cloneNode(!0).checked, f.disabled = !0, b.optDisabled = !g.disabled; try { delete n.test } catch (o) { b.deleteExpando = !1 } !n.addEventListener && n.attachEvent && n.fireEvent && (n.attachEvent("onclick", m = function () { b.noCloneEvent = !1 }), n.cloneNode(!0).fireEvent("onclick"), n.detachEvent("onclick", m)), h = e.createElement("input"), h.value = "t", h.setAttribute("type", "radio"), b.radioValue = h.value === "t", h.setAttribute("checked", "checked"), h.setAttribute("name", "t"), n.appendChild(h), i = e.createDocumentFragment(), i.appendChild(n.lastChild), b.checkClone = i.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = h.checked, i.removeChild(h), i.appendChild(n); if (n.attachEvent) for (k in { submit: !0, change: !0, focusin: !0 }) j = "on" + k, l = j in n, l || (n.setAttribute(j, "return;"), l = typeof n[j] == "function"), b[k + "Bubbles"] = l; return p(function () { var c, d, f, g, h = "padding:0;margin:0;border:0;display:block;overflow:hidden;", i = e.getElementsByTagName("body")[0]; if (!i) return; c = e.createElement("div"), c.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", i.insertBefore(c, i.firstChild), d = e.createElement("div"), c.appendChild(d), d.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", f = d.getElementsByTagName("td"), f[0].style.cssText = "padding:0;margin:0;border:0;display:none", l = f[0].offsetHeight === 0, f[0].style.display = "", f[1].style.display = "none", b.reliableHiddenOffsets = l && f[0].offsetHeight === 0, d.innerHTML = "", d.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", b.boxSizing = d.offsetWidth === 4, b.doesNotIncludeMarginInBodyOffset = i.offsetTop !== 1, a.getComputedStyle && (b.pixelPosition = (a.getComputedStyle(d, null) || {}).top !== "1%", b.boxSizingReliable = (a.getComputedStyle(d, null) || { width: "4px" }).width === "4px", g = e.createElement("div"), g.style.cssText = d.style.cssText = h, g.style.marginRight = g.style.width = "0", d.style.width = "1px", d.appendChild(g), b.reliableMarginRight = !parseFloat((a.getComputedStyle(g, null) || {}).marginRight)), typeof d.style.zoom != "undefined" && (d.innerHTML = "", d.style.cssText = h + "width:1px;padding:1px;display:inline;zoom:1", b.inlineBlockNeedsLayout = d.offsetWidth === 3, d.style.display = "block", d.style.overflow = "visible", d.innerHTML = "<div></div>", d.firstChild.style.width = "5px", b.shrinkWrapBlocks = d.offsetWidth !== 3, c.style.zoom = 1), i.removeChild(c), c = d = f = g = null }), i.removeChild(n), c = d = f = g = h = i = n = null, b } (); var H = /^(?:\{.*\}|\[.*\])$/, I = /([A-Z])/g; p.extend({ cache: {}, deletedIds: [], uuid: 0, expando: "jQuery" + (p.fn.jquery + Math.random()).replace(/\D/g, ""), noData: { embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0 }, hasData: function (a) { return a = a.nodeType ? p.cache[a[p.expando]] : a[p.expando], !!a && !K(a) }, data: function (a, c, d, e) { if (!p.acceptData(a)) return; var f, g, h = p.expando, i = typeof c == "string", j = a.nodeType, k = j ? p.cache : a, l = j ? a[h] : a[h] && h; if ((!l || !k[l] || !e && !k[l].data) && i && d === b) return; l || (j ? a[h] = l = p.deletedIds.pop() || ++p.uuid : l = h), k[l] || (k[l] = {}, j || (k[l].toJSON = p.noop)); if (typeof c == "object" || typeof c == "function") e ? k[l] = p.extend(k[l], c) : k[l].data = p.extend(k[l].data, c); return f = k[l], e || (f.data || (f.data = {}), f = f.data), d !== b && (f[p.camelCase(c)] = d), i ? (g = f[c], g == null && (g = f[p.camelCase(c)])) : g = f, g }, removeData: function (a, b, c) { if (!p.acceptData(a)) return; var d, e, f, g = a.nodeType, h = g ? p.cache : a, i = g ? a[p.expando] : p.expando; if (!h[i]) return; if (b) { d = c ? h[i] : h[i].data; if (d) { p.isArray(b) || (b in d ? b = [b] : (b = p.camelCase(b), b in d ? b = [b] : b = b.split(" "))); for (e = 0, f = b.length; e < f; e++) delete d[b[e]]; if (!(c ? K : p.isEmptyObject)(d)) return } } if (!c) { delete h[i].data; if (!K(h[i])) return } g ? p.cleanData([a], !0) : p.support.deleteExpando || h != h.window ? delete h[i] : h[i] = null }, _data: function (a, b, c) { return p.data(a, b, c, !0) }, acceptData: function (a) { var b = a.nodeName && p.noData[a.nodeName.toLowerCase()]; return !b || b !== !0 && a.getAttribute("classid") === b } }), p.fn.extend({ data: function (a, c) { var d, e, f, g, h, i = this[0], j = 0, k = null; if (a === b) { if (this.length) { k = p.data(i); if (i.nodeType === 1 && !p._data(i, "parsedAttrs")) { f = i.attributes; for (h = f.length; j < h; j++) g = f[j].name, g.indexOf("data-") === 0 && (g = p.camelCase(g.substring(5)), J(i, g, k[g])); p._data(i, "parsedAttrs", !0) } } return k } return typeof a == "object" ? this.each(function () { p.data(this, a) }) : (d = a.split(".", 2), d[1] = d[1] ? "." + d[1] : "", e = d[1] + "!", p.access(this, function (c) { if (c === b) return k = this.triggerHandler("getData" + e, [d[0]]), k === b && i && (k = p.data(i, a), k = J(i, a, k)), k === b && d[1] ? this.data(d[0]) : k; d[1] = c, this.each(function () { var b = p(this); b.triggerHandler("setData" + e, d), p.data(this, a, c), b.triggerHandler("changeData" + e, d) }) }, null, c, arguments.length > 1, null, !1)) }, removeData: function (a) { return this.each(function () { p.removeData(this, a) }) } }), p.extend({ queue: function (a, b, c) { var d; if (a) return b = (b || "fx") + "queue", d = p._data(a, b), c && (!d || p.isArray(c) ? d = p._data(a, b, p.makeArray(c)) : d.push(c)), d || [] }, dequeue: function (a, b) { b = b || "fx"; var c = p.queue(a, b), d = c.shift(), e = p._queueHooks(a, b), f = function () { p.dequeue(a, b) }; d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), delete e.stop, d.call(a, f, e)), !c.length && e && e.empty.fire() }, _queueHooks: function (a, b) { var c = b + "queueHooks"; return p._data(a, c) || p._data(a, c, { empty: p.Callbacks("once memory").add(function () { p.removeData(a, b + "queue", !0), p.removeData(a, c, !0) }) }) } }), p.fn.extend({ queue: function (a, c) { var d = 2; return typeof a != "string" && (c = a, a = "fx", d--), arguments.length < d ? p.queue(this[0], a) : c === b ? this : this.each(function () { var b = p.queue(this, a, c); p._queueHooks(this, a), a === "fx" && b[0] !== "inprogress" && p.dequeue(this, a) }) }, dequeue: function (a) { return this.each(function () { p.dequeue(this, a) }) }, delay: function (a, b) { return a = p.fx ? p.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function (b, c) { var d = setTimeout(b, a); c.stop = function () { clearTimeout(d) } }) }, clearQueue: function (a) { return this.queue(a || "fx", []) }, promise: function (a, c) { var d, e = 1, f = p.Deferred(), g = this, h = this.length, i = function () { --e || f.resolveWith(g, [g]) }; typeof a != "string" && (c = a, a = b), a = a || "fx"; while (h--) (d = p._data(g[h], a + "queueHooks")) && d.empty && (e++, d.empty.add(i)); return i(), f.promise(c) } }); var L, M, N, O = /[\t\r\n]/g, P = /\r/g, Q = /^(?:button|input)$/i, R = /^(?:button|input|object|select|textarea)$/i, S = /^a(?:rea|)$/i, T = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, U = p.support.getSetAttribute; p.fn.extend({ attr: function (a, b) { return p.access(this, p.attr, a, b, arguments.length > 1) }, removeAttr: function (a) { return this.each(function () { p.removeAttr(this, a) }) }, prop: function (a, b) { return p.access(this, p.prop, a, b, arguments.length > 1) }, removeProp: function (a) { return a = p.propFix[a] || a, this.each(function () { try { this[a] = b, delete this[a] } catch (c) { } }) }, addClass: function (a) { var b, c, d, e, f, g, h; if (p.isFunction(a)) return this.each(function (b) { p(this).addClass(a.call(this, b, this.className)) }); if (a && typeof a == "string") { b = a.split(s); for (c = 0, d = this.length; c < d; c++) { e = this[c]; if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a; else { f = " " + e.className + " "; for (g = 0, h = b.length; g < h; g++) ~f.indexOf(" " + b[g] + " ") || (f += b[g] + " "); e.className = p.trim(f) } } } return this }, removeClass: function (a) { var c, d, e, f, g, h, i; if (p.isFunction(a)) return this.each(function (b) { p(this).removeClass(a.call(this, b, this.className)) }); if (a && typeof a == "string" || a === b) { c = (a || "").split(s); for (h = 0, i = this.length; h < i; h++) { e = this[h]; if (e.nodeType === 1 && e.className) { d = (" " + e.className + " ").replace(O, " "); for (f = 0, g = c.length; f < g; f++) while (d.indexOf(" " + c[f] + " ") > -1) d = d.replace(" " + c[f] + " ", " "); e.className = a ? p.trim(d) : "" } } } return this }, toggleClass: function (a, b) { var c = typeof a, d = typeof b == "boolean"; return p.isFunction(a) ? this.each(function (c) { p(this).toggleClass(a.call(this, c, this.className, b), b) }) : this.each(function () { if (c === "string") { var e, f = 0, g = p(this), h = b, i = a.split(s); while (e = i[f++]) h = d ? h : !g.hasClass(e), g[h ? "addClass" : "removeClass"](e) } else if (c === "undefined" || c === "boolean") this.className && p._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : p._data(this, "__className__") || "" }) }, hasClass: function (a) { var b = " " + a + " ", c = 0, d = this.length; for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(O, " ").indexOf(b) > -1) return !0; return !1 }, val: function (a) { var c, d, e, f = this[0]; if (!arguments.length) { if (f) return c = p.valHooks[f.type] || p.valHooks[f.nodeName.toLowerCase()], c && "get" in c && (d = c.get(f, "value")) !== b ? d : (d = f.value, typeof d == "string" ? d.replace(P, "") : d == null ? "" : d); return } return e = p.isFunction(a), this.each(function (d) { var f, g = p(this); if (this.nodeType !== 1) return; e ? f = a.call(this, d, g.val()) : f = a, f == null ? f = "" : typeof f == "number" ? f += "" : p.isArray(f) && (f = p.map(f, function (a) { return a == null ? "" : a + "" })), c = p.valHooks[this.type] || p.valHooks[this.nodeName.toLowerCase()]; if (!c || !("set" in c) || c.set(this, f, "value") === b) this.value = f }) } }), p.extend({ valHooks: { option: { get: function (a) { var b = a.attributes.value; return !b || b.specified ? a.value : a.text } }, select: { get: function (a) { var b, c, d, e, f = a.selectedIndex, g = [], h = a.options, i = a.type === "select-one"; if (f < 0) return null; c = i ? f : 0, d = i ? f + 1 : h.length; for (; c < d; c++) { e = h[c]; if (e.selected && (p.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !p.nodeName(e.parentNode, "optgroup"))) { b = p(e).val(); if (i) return b; g.push(b) } } return i && !g.length && h.length ? p(h[f]).val() : g }, set: function (a, b) { var c = p.makeArray(b); return p(a).find("option").each(function () { this.selected = p.inArray(p(this).val(), c) >= 0 }), c.length || (a.selectedIndex = -1), c } } }, attrFn: {}, attr: function (a, c, d, e) { var f, g, h, i = a.nodeType; if (!a || i === 3 || i === 8 || i === 2) return; if (e && p.isFunction(p.fn[c])) return p(a)[c](d); if (typeof a.getAttribute == "undefined") return p.prop(a, c, d); h = i !== 1 || !p.isXMLDoc(a), h && (c = c.toLowerCase(), g = p.attrHooks[c] || (T.test(c) ? M : L)); if (d !== b) { if (d === null) { p.removeAttr(a, c); return } return g && "set" in g && h && (f = g.set(a, d, c)) !== b ? f : (a.setAttribute(c, "" + d), d) } return g && "get" in g && h && (f = g.get(a, c)) !== null ? f : (f = a.getAttribute(c), f === null ? b : f) }, removeAttr: function (a, b) { var c, d, e, f, g = 0; if (b && a.nodeType === 1) { d = b.split(s); for (; g < d.length; g++) e = d[g], e && (c = p.propFix[e] || e, f = T.test(e), f || p.attr(a, e, ""), a.removeAttribute(U ? e : c), f && c in a && (a[c] = !1)) } }, attrHooks: { type: { set: function (a, b) { if (Q.test(a.nodeName) && a.parentNode) p.error("type property can't be changed"); else if (!p.support.radioValue && b === "radio" && p.nodeName(a, "input")) { var c = a.value; return a.setAttribute("type", b), c && (a.value = c), b } } }, value: { get: function (a, b) { return L && p.nodeName(a, "button") ? L.get(a, b) : b in a ? a.value : null }, set: function (a, b, c) { if (L && p.nodeName(a, "button")) return L.set(a, b, c); a.value = b } } }, propFix: { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" }, prop: function (a, c, d) { var e, f, g, h = a.nodeType; if (!a || h === 3 || h === 8 || h === 2) return; return g = h !== 1 || !p.isXMLDoc(a), g && (c = p.propFix[c] || c, f = p.propHooks[c]), d !== b ? f && "set" in f && (e = f.set(a, d, c)) !== b ? e : a[c] = d : f && "get" in f && (e = f.get(a, c)) !== null ? e : a[c] }, propHooks: { tabIndex: { get: function (a) { var c = a.getAttributeNode("tabindex"); return c && c.specified ? parseInt(c.value, 10) : R.test(a.nodeName) || S.test(a.nodeName) && a.href ? 0 : b } }} }), M = { get: function (a, c) { var d, e = p.prop(a, c); return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b }, set: function (a, b, c) { var d; return b === !1 ? p.removeAttr(a, c) : (d = p.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c } }, U || (N = { name: !0, id: !0, coords: !0 }, L = p.valHooks.button = { get: function (a, c) { var d; return d = a.getAttributeNode(c), d && (N[c] ? d.value !== "" : d.specified) ? d.value : b }, set: function (a, b, c) { var d = a.getAttributeNode(c); return d || (d = e.createAttribute(c), a.setAttributeNode(d)), d.value = b + "" } }, p.each(["width", "height"], function (a, b) { p.attrHooks[b] = p.extend(p.attrHooks[b], { set: function (a, c) { if (c === "") return a.setAttribute(b, "auto"), c } }) }), p.attrHooks.contenteditable = { get: L.get, set: function (a, b, c) { b === "" && (b = "false"), L.set(a, b, c) } }), p.support.hrefNormalized || p.each(["href", "src", "width", "height"], function (a, c) { p.attrHooks[c] = p.extend(p.attrHooks[c], { get: function (a) { var d = a.getAttribute(c, 2); return d === null ? b : d } }) }), p.support.style || (p.attrHooks.style = { get: function (a) { return a.style.cssText.toLowerCase() || b }, set: function (a, b) { return a.style.cssText = "" + b } }), p.support.optSelected || (p.propHooks.selected = p.extend(p.propHooks.selected, { get: function (a) { var b = a.parentNode; return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null } })), p.support.enctype || (p.propFix.enctype = "encoding"), p.support.checkOn || p.each(["radio", "checkbox"], function () { p.valHooks[this] = { get: function (a) { return a.getAttribute("value") === null ? "on" : a.value } } }), p.each(["radio", "checkbox"], function () { p.valHooks[this] = p.extend(p.valHooks[this], { set: function (a, b) { if (p.isArray(b)) return a.checked = p.inArray(p(a).val(), b) >= 0 } }) }); var V = /^(?:textarea|input|select)$/i, W = /^([^\.]*|)(?:\.(.+)|)$/, X = /(?:^|\s)hover(\.\S+|)\b/, Y = /^key/, Z = /^(?:mouse|contextmenu)|click/, $ = /^(?:focusinfocus|focusoutblur)$/, _ = function (a) { return p.event.special.hover ? a : a.replace(X, "mouseenter$1 mouseleave$1") }; p.event = { add: function (a, c, d, e, f) { var g, h, i, j, k, l, m, n, o, q, r; if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(g = p._data(a))) return; d.handler && (o = d, d = o.handler, f = o.selector), d.guid || (d.guid = p.guid++), i = g.events, i || (g.events = i = {}), h = g.handle, h || (g.handle = h = function (a) { return typeof p != "undefined" && (!a || p.event.triggered !== a.type) ? p.event.dispatch.apply(h.elem, arguments) : b }, h.elem = a), c = p.trim(_(c)).split(" "); for (j = 0; j < c.length; j++) { k = W.exec(c[j]) || [], l = k[1], m = (k[2] || "").split(".").sort(), r = p.event.special[l] || {}, l = (f ? r.delegateType : r.bindType) || l, r = p.event.special[l] || {}, n = p.extend({ type: l, origType: k[1], data: e, handler: d, guid: d.guid, selector: f, namespace: m.join(".") }, o), q = i[l]; if (!q) { q = i[l] = [], q.delegateCount = 0; if (!r.setup || r.setup.call(a, e, m, h) === !1) a.addEventListener ? a.addEventListener(l, h, !1) : a.attachEvent && a.attachEvent("on" + l, h) } r.add && (r.add.call(a, n), n.handler.guid || (n.handler.guid = d.guid)), f ? q.splice(q.delegateCount++, 0, n) : q.push(n), p.event.global[l] = !0 } a = null }, global: {}, remove: function (a, b, c, d, e) { var f, g, h, i, j, k, l, m, n, o, q, r = p.hasData(a) && p._data(a); if (!r || !(m = r.events)) return; b = p.trim(_(b || "")).split(" "); for (f = 0; f < b.length; f++) { g = W.exec(b[f]) || [], h = i = g[1], j = g[2]; if (!h) { for (h in m) p.event.remove(a, h + b[f], c, d, !0); continue } n = p.event.special[h] || {}, h = (d ? n.delegateType : n.bindType) || h, o = m[h] || [], k = o.length, j = j ? new RegExp("(^|\\.)" + j.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null; for (l = 0; l < o.length; l++) q = o[l], (e || i === q.origType) && (!c || c.guid === q.guid) && (!j || j.test(q.namespace)) && (!d || d === q.selector || d === "**" && q.selector) && (o.splice(l--, 1), q.selector && o.delegateCount--, n.remove && n.remove.call(a, q)); o.length === 0 && k !== o.length && ((!n.teardown || n.teardown.call(a, j, r.handle) === !1) && p.removeEvent(a, h, r.handle), delete m[h]) } p.isEmptyObject(m) && (delete r.handle, p.removeData(a, "events", !0)) }, customEvent: { getData: !0, setData: !0, changeData: !0 }, trigger: function (c, d, f, g) { if (!f || f.nodeType !== 3 && f.nodeType !== 8) { var h, i, j, k, l, m, n, o, q, r, s = c.type || c, t = []; if ($.test(s + p.event.triggered)) return; s.indexOf("!") >= 0 && (s = s.slice(0, -1), i = !0), s.indexOf(".") >= 0 && (t = s.split("."), s = t.shift(), t.sort()); if ((!f || p.event.customEvent[s]) && !p.event.global[s]) return; c = typeof c == "object" ? c[p.expando] ? c : new p.Event(s, c) : new p.Event(s), c.type = s, c.isTrigger = !0, c.exclusive = i, c.namespace = t.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + t.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, m = s.indexOf(":") < 0 ? "on" + s : ""; if (!f) { h = p.cache; for (j in h) h[j].events && h[j].events[s] && p.event.trigger(c, d, h[j].handle.elem, !0); return } c.result = b, c.target || (c.target = f), d = d != null ? p.makeArray(d) : [], d.unshift(c), n = p.event.special[s] || {}; if (n.trigger && n.trigger.apply(f, d) === !1) return; q = [[f, n.bindType || s]]; if (!g && !n.noBubble && !p.isWindow(f)) { r = n.delegateType || s, k = $.test(r + s) ? f : f.parentNode; for (l = f; k; k = k.parentNode) q.push([k, r]), l = k; l === (f.ownerDocument || e) && q.push([l.defaultView || l.parentWindow || a, r]) } for (j = 0; j < q.length && !c.isPropagationStopped(); j++) k = q[j][0], c.type = q[j][1], o = (p._data(k, "events") || {})[c.type] && p._data(k, "handle"), o && o.apply(k, d), o = m && k[m], o && p.acceptData(k) && o.apply(k, d) === !1 && c.preventDefault(); return c.type = s, !g && !c.isDefaultPrevented() && (!n._default || n._default.apply(f.ownerDocument, d) === !1) && (s !== "click" || !p.nodeName(f, "a")) && p.acceptData(f) && m && f[s] && (s !== "focus" && s !== "blur" || c.target.offsetWidth !== 0) && !p.isWindow(f) && (l = f[m], l && (f[m] = null), p.event.triggered = s, f[s](), p.event.triggered = b, l && (f[m] = l)), c.result } return }, dispatch: function (c) { c = p.event.fix(c || a.event); var d, e, f, g, h, i, j, k, l, m, n, o = (p._data(this, "events") || {})[c.type] || [], q = o.delegateCount, r = [].slice.call(arguments), s = !c.exclusive && !c.namespace, t = p.event.special[c.type] || {}, u = []; r[0] = c, c.delegateTarget = this; if (t.preDispatch && t.preDispatch.call(this, c) === !1) return; if (q && (!c.button || c.type !== "click")) { g = p(this), g.context = this; for (f = c.target; f != this; f = f.parentNode || this) if (f.disabled !== !0 || c.type !== "click") { i = {}, k = [], g[0] = f; for (d = 0; d < q; d++) l = o[d], m = l.selector, i[m] === b && (i[m] = g.is(m)), i[m] && k.push(l); k.length && u.push({ elem: f, matches: k }) } } o.length > q && u.push({ elem: this, matches: o.slice(q) }); for (d = 0; d < u.length && !c.isPropagationStopped(); d++) { j = u[d], c.currentTarget = j.elem; for (e = 0; e < j.matches.length && !c.isImmediatePropagationStopped(); e++) { l = j.matches[e]; if (s || !c.namespace && !l.namespace || c.namespace_re && c.namespace_re.test(l.namespace)) c.data = l.data, c.handleObj = l, h = ((p.event.special[l.origType] || {}).handle || l.handler).apply(j.elem, r), h !== b && (c.result = h, h === !1 && (c.preventDefault(), c.stopPropagation())) } } return t.postDispatch && t.postDispatch.call(this, c), c.result }, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function (a, b) { return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function (a, c) { var d, f, g, h = c.button, i = c.fromElement; return a.pageX == null && c.clientX != null && (d = a.target.ownerDocument || e, f = d.documentElement, g = d.body, a.pageX = c.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = c.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? c.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0), a } }, fix: function (a) { if (a[p.expando]) return a; var b, c, d = a, f = p.event.fixHooks[a.type] || {}, g = f.props ? this.props.concat(f.props) : this.props; a = p.Event(d); for (b = g.length; b; ) c = g[--b], a[c] = d[c]; return a.target || (a.target = d.srcElement || e), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey = !!a.metaKey, f.filter ? f.filter(a, d) : a }, special: { ready: { setup: p.bindReady }, load: { noBubble: !0 }, focus: { delegateType: "focusin" }, blur: { delegateType: "focusout" }, beforeunload: { setup: function (a, b, c) { p.isWindow(this) && (this.onbeforeunload = c) }, teardown: function (a, b) { this.onbeforeunload === b && (this.onbeforeunload = null) } } }, simulate: function (a, b, c, d) { var e = p.extend(new p.Event, c, { type: a, isSimulated: !0, originalEvent: {} }); d ? p.event.trigger(e, null, b) : p.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault() } }, p.event.handle = p.event.dispatch, p.removeEvent = e.removeEventListener ? function (a, b, c) { a.removeEventListener && a.removeEventListener(b, c, !1) } : function (a, b, c) { var d = "on" + b; a.detachEvent && (typeof a[d] == "undefined" && (a[d] = null), a.detachEvent(d, c)) }, p.Event = function (a, b) { if (this instanceof p.Event) a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? bb : ba) : this.type = a, b && p.extend(this, b), this.timeStamp = a && a.timeStamp || p.now(), this[p.expando] = !0; else return new p.Event(a, b) }, p.Event.prototype = { preventDefault: function () { this.isDefaultPrevented = bb; var a = this.originalEvent; if (!a) return; a.preventDefault ? a.preventDefault() : a.returnValue = !1 }, stopPropagation: function () { this.isPropagationStopped = bb; var a = this.originalEvent; if (!a) return; a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0 }, stopImmediatePropagation: function () { this.isImmediatePropagationStopped = bb, this.stopPropagation() }, isDefaultPrevented: ba, isPropagationStopped: ba, isImmediatePropagationStopped: ba }, p.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (a, b) { p.event.special[a] = { delegateType: b, bindType: b, handle: function (a) { var c, d = this, e = a.relatedTarget, f = a.handleObj, g = f.selector; if (!e || e !== d && !p.contains(d, e)) a.type = f.origType, c = f.handler.apply(this, arguments), a.type = b; return c } } }), p.support.submitBubbles || (p.event.special.submit = { setup: function () { if (p.nodeName(this, "form")) return !1; p.event.add(this, "click._submit keypress._submit", function (a) { var c = a.target, d = p.nodeName(c, "input") || p.nodeName(c, "button") ? c.form : b; d && !p._data(d, "_submit_attached") && (p.event.add(d, "submit._submit", function (a) { a._submit_bubble = !0 }), p._data(d, "_submit_attached", !0)) }) }, postDispatch: function (a) { a._submit_bubble && (delete a._submit_bubble, this.parentNode && !a.isTrigger && p.event.simulate("submit", this.parentNode, a, !0)) }, teardown: function () { if (p.nodeName(this, "form")) return !1; p.event.remove(this, "._submit") } }), p.support.changeBubbles || (p.event.special.change = { setup: function () { if (V.test(this.nodeName)) { if (this.type === "checkbox" || this.type === "radio") p.event.add(this, "propertychange._change", function (a) { a.originalEvent.propertyName === "checked" && (this._just_changed = !0) }), p.event.add(this, "click._change", function (a) { this._just_changed && !a.isTrigger && (this._just_changed = !1), p.event.simulate("change", this, a, !0) }); return !1 } p.event.add(this, "beforeactivate._change", function (a) { var b = a.target; V.test(b.nodeName) && !p._data(b, "_change_attached") && (p.event.add(b, "change._change", function (a) { this.parentNode && !a.isSimulated && !a.isTrigger && p.event.simulate("change", this.parentNode, a, !0) }), p._data(b, "_change_attached", !0)) }) }, handle: function (a) { var b = a.target; if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments) }, teardown: function () { return p.event.remove(this, "._change"), V.test(this.nodeName) } }), p.support.focusinBubbles || p.each({ focus: "focusin", blur: "focusout" }, function (a, b) { var c = 0, d = function (a) { p.event.simulate(b, a.target, p.event.fix(a), !0) }; p.event.special[b] = { setup: function () { c++ === 0 && e.addEventListener(a, d, !0) }, teardown: function () { --c === 0 && e.removeEventListener(a, d, !0) } } }), p.fn.extend({ on: function (a, c, d, e, f) { var g, h; if (typeof a == "object") { typeof c != "string" && (d = d || c, c = b); for (h in a) this.on(h, c, d, a[h], f); return this } d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b)); if (e === !1) e = ba; else if (!e) return this; return f === 1 && (g = e, e = function (a) { return p().off(a), g.apply(this, arguments) }, e.guid = g.guid || (g.guid = p.guid++)), this.each(function () { p.event.add(this, a, e, d, c) }) }, one: function (a, b, c, d) { return this.on(a, b, c, d, 1) }, off: function (a, c, d) { var e, f; if (a && a.preventDefault && a.handleObj) return e = a.handleObj, p(a.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this; if (typeof a == "object") { for (f in a) this.off(f, c, a[f]); return this } if (c === !1 || typeof c == "function") d = c, c = b; return d === !1 && (d = ba), this.each(function () { p.event.remove(this, a, d, c) }) }, bind: function (a, b, c) { return this.on(a, null, b, c) }, unbind: function (a, b) { return this.off(a, null, b) }, live: function (a, b, c) { return p(this.context).on(a, this.selector, b, c), this }, die: function (a, b) { return p(this.context).off(a, this.selector || "**", b), this }, delegate: function (a, b, c, d) { return this.on(b, a, c, d) }, undelegate: function (a, b, c) { return arguments.length == 1 ? this.off(a, "**") : this.off(b, a || "**", c) }, trigger: function (a, b) { return this.each(function () { p.event.trigger(a, b, this) }) }, triggerHandler: function (a, b) { if (this[0]) return p.event.trigger(a, b, this[0], !0) }, toggle: function (a) { var b = arguments, c = a.guid || p.guid++, d = 0, e = function (c) { var e = (p._data(this, "lastToggle" + a.guid) || 0) % d; return p._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1 }; e.guid = c; while (d < b.length) b[d++].guid = c; return this.click(e) }, hover: function (a, b) { return this.mouseenter(a).mouseleave(b || a) } }), p.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (a, b) { p.fn[b] = function (a, c) { return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b) }, Y.test(b) && (p.event.fixHooks[b] = p.event.keyHooks), Z.test(b) && (p.event.fixHooks[b] = p.event.mouseHooks) }), function (a, b) { function bd(a, b, c, d) { var e = 0, f = b.length; for (; e < f; e++) Z(a, b[e], c, d) } function be(a, b, c, d, e, f) { var g, h = $.setFilters[b.toLowerCase()]; return h || Z.error(b), (a || !(g = e)) && bd(a || "*", d, g = [], e), g.length > 0 ? h(g, c, f) : [] } function bf(a, c, d, e, f) { var g, h, i, j, k, l, m, n, p = 0, q = f.length, s = L.POS, t = new RegExp("^" + s.source + "(?!" + r + ")", "i"), u = function () { var a = 1, c = arguments.length - 2; for (; a < c; a++) arguments[a] === b && (g[a] = b) }; for (; p < q; p++) { s.exec(""), a = f[p], j = [], i = 0, k = e; while (g = s.exec(a)) { n = s.lastIndex = g.index + g[0].length; if (n > i) { m = a.slice(i, g.index), i = n, l = [c], B.test(m) && (k && (l = k), k = e); if (h = H.test(m)) m = m.slice(0, -5).replace(B, "$&*"); g.length > 1 && g[0].replace(t, u), k = be(m, g[1], g[2], l, k, h) } } k ? (j = j.concat(k), (m = a.slice(i)) && m !== ")" ? B.test(m) ? bd(m, j, d, e) : Z(m, c, d, e ? e.concat(k) : k) : o.apply(d, j)) : Z(a, c, d, e) } return q === 1 ? d : Z.uniqueSort(d) } function bg(a, b, c) { var d, e, f, g = [], i = 0, j = D.exec(a), k = !j.pop() && !j.pop(), l = k && a.match(C) || [""], m = $.preFilter, n = $.filter, o = !c && b !== h; for (; (e = l[i]) != null && k; i++) { g.push(d = []), o && (e = " " + e); while (e) { k = !1; if (j = B.exec(e)) e = e.slice(j[0].length), k = d.push({ part: j.pop().replace(A, " "), captures: j }); for (f in n) (j = L[f].exec(e)) && (!m[f] || (j = m[f](j, b, c))) && (e = e.slice(j.shift().length), k = d.push({ part: f, captures: j })); if (!k) break } } return k || Z.error(a), g } function bh(a, b, e) { var f = b.dir, g = m++; return a || (a = function (a) { return a === e }), b.first ? function (b, c) { while (b = b[f]) if (b.nodeType === 1) return a(b, c) && b } : function (b, e) { var h, i = g + "." + d, j = i + "." + c; while (b = b[f]) if (b.nodeType === 1) { if ((h = b[q]) === j) return b.sizset; if (typeof h == "string" && h.indexOf(i) === 0) { if (b.sizset) return b } else { b[q] = j; if (a(b, e)) return b.sizset = !0, b; b.sizset = !1 } } } } function bi(a, b) { return a ? function (c, d) { var e = b(c, d); return e && a(e === !0 ? c : e, d) } : b } function bj(a, b, c) { var d, e, f = 0; for (; d = a[f]; f++) $.relative[d.part] ? e = bh(e, $.relative[d.part], b) : (d.captures.push(b, c), e = bi(e, $.filter[d.part].apply(null, d.captures))); return e } function bk(a) { return function (b, c) { var d, e = 0; for (; d = a[e]; e++) if (d(b, c)) return !0; return !1 } } var c, d, e, f, g, h = a.document, i = h.documentElement, j = "undefined", k = !1, l = !0, m = 0, n = [].slice, o = [].push, q = ("sizcache" + Math.random()).replace(".", ""), r = "[\\x20\\t\\r\\n\\f]", s = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+", t = s.replace("w", "w#"), u = "([*^$|!~]?=)", v = "\\[" + r + "*(" + s + ")" + r + "*(?:" + u + r + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + t + ")|)|)" + r + "*\\]", w = ":(" + s + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)", x = ":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)", y = r + "*([\\x20\\t\\r\\n\\f>+~])" + r + "*", z = "(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|" + v + "|" + w.replace(2, 7) + "|[^\\\\(),])+", A = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$", "g"), B = new RegExp("^" + y), C = new RegExp(z + "?(?=" + r + "*,|$)", "g"), D = new RegExp("^(?:(?!,)(?:(?:^|,)" + r + "*" + z + ")*?|" + r + "*(.*?))(\\)|$)"), E = new RegExp(z.slice(19, -6) + "\\x20\\t\\r\\n\\f>+~])+|" + y, "g"), F = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/, G = /[\x20\t\r\n\f]*[+~]/, H = /:not\($/, I = /h\d/i, J = /input|select|textarea|button/i, K = /\\(?!\\)/g, L = { ID: new RegExp("^#(" + s + ")"), CLASS: new RegExp("^\\.(" + s + ")"), NAME: new RegExp("^\\[name=['\"]?(" + s + ")['\"]?\\]"), TAG: new RegExp("^(" + s.replace("[-", "[-\\*") + ")"), ATTR: new RegExp("^" + v), PSEUDO: new RegExp("^" + w), CHILD: new RegExp("^:(only|nth|last|first)-child(?:\\(" + r + "*(even|odd|(([+-]|)(\\d*)n|)" + r + "*(?:([+-]|)" + r + "*(\\d+)|))" + r + "*\\)|)", "i"), POS: new RegExp(x, "ig"), needsContext: new RegExp("^" + r + "*[>+~]|" + x, "i") }, M = {}, N = [], O = {}, P = [], Q = function (a) { return a.sizzleFilter = !0, a }, R = function (a) { return function (b) { return b.nodeName.toLowerCase() === "input" && b.type === a } }, S = function (a) { return function (b) { var c = b.nodeName.toLowerCase(); return (c === "input" || c === "button") && b.type === a } }, T = function (a) { var b = !1, c = h.createElement("div"); try { b = a(c) } catch (d) { } return c = null, b }, U = T(function (a) { a.innerHTML = "<select></select>"; var b = typeof a.lastChild.getAttribute("multiple"); return b !== "boolean" && b !== "string" }), V = T(function (a) { a.id = q + 0, a.innerHTML = "<a name='" + q + "'></a><div name='" + q + "'></div>", i.insertBefore(a, i.firstChild); var b = h.getElementsByName && h.getElementsByName(q).length === 2 + h.getElementsByName(q + 0).length; return g = !h.getElementById(q), i.removeChild(a), b }), W = T(function (a) { return a.appendChild(h.createComment("")), a.getElementsByTagName("*").length === 0 }), X = T(function (a) { return a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute !== j && a.firstChild.getAttribute("href") === "#" }), Y = T(function (a) { return a.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !a.getElementsByClassName || a.getElementsByClassName("e").length === 0 ? !1 : (a.lastChild.className = "e", a.getElementsByClassName("e").length !== 1) }), Z = function (a, b, c, d) { c = c || [], b = b || h; var e, f, g, i, j = b.nodeType; if (j !== 1 && j !== 9) return []; if (!a || typeof a != "string") return c; g = ba(b); if (!g && !d) if (e = F.exec(a)) if (i = e[1]) { if (j === 9) { f = b.getElementById(i); if (!f || !f.parentNode) return c; if (f.id === i) return c.push(f), c } else if (b.ownerDocument && (f = b.ownerDocument.getElementById(i)) && bb(b, f) && f.id === i) return c.push(f), c } else { if (e[2]) return o.apply(c, n.call(b.getElementsByTagName(a), 0)), c; if ((i = e[3]) && Y && b.getElementsByClassName) return o.apply(c, n.call(b.getElementsByClassName(i), 0)), c } return bm(a, b, c, d, g) }, $ = Z.selectors = { cacheLength: 50, match: L, order: ["ID", "TAG"], attrHandle: {}, createPseudo: Q, find: { ID: g ? function (a, b, c) { if (typeof b.getElementById !== j && !c) { var d = b.getElementById(a); return d && d.parentNode ? [d] : [] } } : function (a, c, d) { if (typeof c.getElementById !== j && !d) { var e = c.getElementById(a); return e ? e.id === a || typeof e.getAttributeNode !== j && e.getAttributeNode("id").value === a ? [e] : b : [] } }, TAG: W ? function (a, b) { if (typeof b.getElementsByTagName !== j) return b.getElementsByTagName(a) } : function (a, b) { var c = b.getElementsByTagName(a); if (a === "*") { var d, e = [], f = 0; for (; d = c[f]; f++) d.nodeType === 1 && e.push(d); return e } return c } }, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling"} }, preFilter: { ATTR: function (a) { return a[1] = a[1].replace(K, ""), a[3] = (a[4] || a[5] || "").replace(K, ""), a[2] === "~=" && (a[3] = " " + a[3] + " "), a.slice(0, 4) }, CHILD: function (a) { return a[1] = a[1].toLowerCase(), a[1] === "nth" ? (a[2] || Z.error(a[0]), a[3] = +(a[3] ? a[4] + (a[5] || 1) : 2 * (a[2] === "even" || a[2] === "odd")), a[4] = +(a[6] + a[7] || a[2] === "odd")) : a[2] && Z.error(a[0]), a }, PSEUDO: function (a) { var b, c = a[4]; return L.CHILD.test(a[0]) ? null : (c && (b = D.exec(c)) && b.pop() && (a[0] = a[0].slice(0, b[0].length - c.length - 1), c = b[0].slice(0, -1)), a.splice(2, 3, c || a[3]), a) } }, filter: { ID: g ? function (a) { return a = a.replace(K, ""), function (b) { return b.getAttribute("id") === a } } : function (a) { return a = a.replace(K, ""), function (b) { var c = typeof b.getAttributeNode !== j && b.getAttributeNode("id"); return c && c.value === a } }, TAG: function (a) { return a === "*" ? function () { return !0 } : (a = a.replace(K, "").toLowerCase(), function (b) { return b.nodeName && b.nodeName.toLowerCase() === a }) }, CLASS: function (a) { var b = M[a]; return b || (b = M[a] = new RegExp("(^|" + r + ")" + a + "(" + r + "|$)"), N.push(a), N.length > $.cacheLength && delete M[N.shift()]), function (a) { return b.test(a.className || typeof a.getAttribute !== j && a.getAttribute("class") || "") } }, ATTR: function (a, b, c) { return b ? function (d) { var e = Z.attr(d, a), f = e + ""; if (e == null) return b === "!="; switch (b) { case "=": return f === c; case "!=": return f !== c; case "^=": return c && f.indexOf(c) === 0; case "*=": return c && f.indexOf(c) > -1; case "$=": return c && f.substr(f.length - c.length) === c; case "~=": return (" " + f + " ").indexOf(c) > -1; case "|=": return f === c || f.substr(0, c.length + 1) === c + "-" } } : function (b) { return Z.attr(b, a) != null } }, CHILD: function (a, b, c, d) { if (a === "nth") { var e = m++; return function (a) { var b, f, g = 0, h = a; if (c === 1 && d === 0) return !0; b = a.parentNode; if (b && (b[q] !== e || !a.sizset)) { for (h = b.firstChild; h; h = h.nextSibling) if (h.nodeType === 1) { h.sizset = ++g; if (h === a) break } b[q] = e } return f = a.sizset - d, c === 0 ? f === 0 : f % c === 0 && f / c >= 0 } } return function (b) { var c = b; switch (a) { case "only": case "first": while (c = c.previousSibling) if (c.nodeType === 1) return !1; if (a === "first") return !0; c = b; case "last": while (c = c.nextSibling) if (c.nodeType === 1) return !1; return !0 } } }, PSEUDO: function (a, b, c, d) { var e = $.pseudos[a] || $.pseudos[a.toLowerCase()]; return e || Z.error("unsupported pseudo: " + a), e.sizzleFilter ? e(b, c, d) : e } }, pseudos: { not: Q(function (a, b, c) { var d = bl(a.replace(A, "$1"), b, c); return function (a) { return !d(a) } }), enabled: function (a) { return a.disabled === !1 }, disabled: function (a) { return a.disabled === !0 }, checked: function (a) { var b = a.nodeName.toLowerCase(); return b === "input" && !!a.checked || b === "option" && !!a.selected }, selected: function (a) { return a.parentNode && a.parentNode.selectedIndex, a.selected === !0 }, parent: function (a) { return !$.pseudos.empty(a) }, empty: function (a) { var b; a = a.firstChild; while (a) { if (a.nodeName > "@" || (b = a.nodeType) === 3 || b === 4) return !1; a = a.nextSibling } return !0 }, contains: Q(function (a) { return function (b) { return (b.textContent || b.innerText || bc(b)).indexOf(a) > -1 } }), has: Q(function (a) { return function (b) { return Z(a, b).length > 0 } }), header: function (a) { return I.test(a.nodeName) }, text: function (a) { var b, c; return a.nodeName.toLowerCase() === "input" && (b = a.type) === "text" && ((c = a.getAttribute("type")) == null || c.toLowerCase() === b) }, radio: R("radio"), checkbox: R("checkbox"), file: R("file"), password: R("password"), image: R("image"), submit: S("submit"), reset: S("reset"), button: function (a) { var b = a.nodeName.toLowerCase(); return b === "input" && a.type === "button" || b === "button" }, input: function (a) { return J.test(a.nodeName) }, focus: function (a) { var b = a.ownerDocument; return a === b.activeElement && (!b.hasFocus || b.hasFocus()) && (!!a.type || !!a.href) }, active: function (a) { return a === a.ownerDocument.activeElement } }, setFilters: { first: function (a, b, c) { return c ? a.slice(1) : [a[0]] }, last: function (a, b, c) { var d = a.pop(); return c ? a : [d] }, even: function (a, b, c) { var d = [], e = c ? 1 : 0, f = a.length; for (; e < f; e = e + 2) d.push(a[e]); return d }, odd: function (a, b, c) { var d = [], e = c ? 0 : 1, f = a.length; for (; e < f; e = e + 2) d.push(a[e]); return d }, lt: function (a, b, c) { return c ? a.slice(+b) : a.slice(0, +b) }, gt: function (a, b, c) { return c ? a.slice(0, +b + 1) : a.slice(+b + 1) }, eq: function (a, b, c) { var d = a.splice(+b, 1); return c ? a : d } } }; $.setFilters.nth = $.setFilters.eq, $.filters = $.pseudos, X || ($.attrHandle = { href: function (a) { return a.getAttribute("href", 2) }, type: function (a) { return a.getAttribute("type") } }), V && ($.order.push("NAME"), $.find.NAME = function (a, b) { if (typeof b.getElementsByName !== j) return b.getElementsByName(a) }), Y && ($.order.splice(1, 0, "CLASS"), $.find.CLASS = function (a, b, c) { if (typeof b.getElementsByClassName !== j && !c) return b.getElementsByClassName(a) }); try { n.call(i.childNodes, 0)[0].nodeType } catch (_) { n = function (a) { var b, c = []; for (; b = this[a]; a++) c.push(b); return c } } var ba = Z.isXML = function (a) { var b = a && (a.ownerDocument || a).documentElement; return b ? b.nodeName !== "HTML" : !1 }, bb = Z.contains = i.compareDocumentPosition ? function (a, b) { return !!(a.compareDocumentPosition(b) & 16) } : i.contains ? function (a, b) { var c = a.nodeType === 9 ? a.documentElement : a, d = b.parentNode; return a === d || !!(d && d.nodeType === 1 && c.contains && c.contains(d)) } : function (a, b) { while (b = b.parentNode) if (b === a) return !0; return !1 }, bc = Z.getText = function (a) { var b, c = "", d = 0, e = a.nodeType; if (e) { if (e === 1 || e === 9 || e === 11) { if (typeof a.textContent == "string") return a.textContent; for (a = a.firstChild; a; a = a.nextSibling) c += bc(a) } else if (e === 3 || e === 4) return a.nodeValue } else for (; b = a[d]; d++) c += bc(b); return c }; Z.attr = function (a, b) { var c, d = ba(a); return d || (b = b.toLowerCase()), $.attrHandle[b] ? $.attrHandle[b](a) : U || d ? a.getAttribute(b) : (c = a.getAttributeNode(b), c ? typeof a[b] == "boolean" ? a[b] ? b : null : c.specified ? c.value : null : null) }, Z.error = function (a) { throw new Error("Syntax error, unrecognized expression: " + a) }, [0, 0].sort(function () { return l = 0 }), i.compareDocumentPosition ? e = function (a, b) { return a === b ? (k = !0, 0) : (!a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition : a.compareDocumentPosition(b) & 4) ? -1 : 1 } : (e = function (a, b) { if (a === b) return k = !0, 0; if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex; var c, d, e = [], g = [], h = a.parentNode, i = b.parentNode, j = h; if (h === i) return f(a, b); if (!h) return -1; if (!i) return 1; while (j) e.unshift(j), j = j.parentNode; j = i; while (j) g.unshift(j), j = j.parentNode; c = e.length, d = g.length; for (var l = 0; l < c && l < d; l++) if (e[l] !== g[l]) return f(e[l], g[l]); return l === c ? f(a, g[l], -1) : f(e[l], b, 1) }, f = function (a, b, c) { if (a === b) return c; var d = a.nextSibling; while (d) { if (d === b) return -1; d = d.nextSibling } return 1 }), Z.uniqueSort = function (a) { var b, c = 1; if (e) { k = l, a.sort(e); if (k) for (; b = a[c]; c++) b === a[c - 1] && a.splice(c--, 1) } return a }; var bl = Z.compile = function (a, b, c) { var d, e, f, g = O[a]; if (g && g.context === b) return g; e = bg(a, b, c); for (f = 0; d = e[f]; f++) e[f] = bj(d, b, c); return g = O[a] = bk(e), g.context = b, g.runs = g.dirruns = 0, P.push(a), P.length > $.cacheLength && delete O[P.shift()], g }; Z.matches = function (a, b) { return Z(a, null, null, b) }, Z.matchesSelector = function (a, b) { return Z(b, null, null, [a]).length > 0 }; var bm = function (a, b, e, f, g) { a = a.replace(A, "$1"); var h, i, j, k, l, m, p, q, r, s = a.match(C), t = a.match(E), u = b.nodeType; if (L.POS.test(a)) return bf(a, b, e, f, s); if (f) h = n.call(f, 0); else if (s && s.length === 1) { if (t.length > 1 && u === 9 && !g && (s = L.ID.exec(t[0]))) { b = $.find.ID(s[1], b, g)[0]; if (!b) return e; a = a.slice(t.shift().length) } q = (s = G.exec(t[0])) && !s.index && b.parentNode || b, r = t.pop(), m = r.split(":not")[0]; for (j = 0, k = $.order.length; j < k; j++) { p = $.order[j]; if (s = L[p].exec(m)) { h = $.find[p]((s[1] || "").replace(K, ""), q, g); if (h == null) continue; m === r && (a = a.slice(0, a.length - r.length) + m.replace(L[p], ""), a || o.apply(e, n.call(h, 0))); break } } } if (a) { i = bl(a, b, g), d = i.dirruns++, h == null && (h = $.find.TAG("*", G.test(a) && b.parentNode || b)); for (j = 0; l = h[j]; j++) c = i.runs++, i(l, b) && e.push(l) } return e }; h.querySelectorAll && function () { var a, b = bm, c = /'|\\/g, d = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g, e = [], f = [":active"], g = i.matchesSelector || i.mozMatchesSelector || i.webkitMatchesSelector || i.oMatchesSelector || i.msMatchesSelector; T(function (a) { a.innerHTML = "<select><option selected></option></select>", a.querySelectorAll("[selected]").length || e.push("\\[" + r + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), a.querySelectorAll(":checked").length || e.push(":checked") }), T(function (a) { a.innerHTML = "<p test=''></p>", a.querySelectorAll("[test^='']").length && e.push("[*^$]=" + r + "*(?:\"\"|'')"), a.innerHTML = "<input type='hidden'>", a.querySelectorAll(":enabled").length || e.push(":enabled", ":disabled") }), e = e.length && new RegExp(e.join("|")), bm = function (a, d, f, g, h) { if (!g && !h && (!e || !e.test(a))) if (d.nodeType === 9) try { return o.apply(f, n.call(d.querySelectorAll(a), 0)), f } catch (i) { } else if (d.nodeType === 1 && d.nodeName.toLowerCase() !== "object") { var j = d.getAttribute("id"), k = j || q, l = G.test(a) && d.parentNode || d; j ? k = k.replace(c, "\\$&") : d.setAttribute("id", k); try { return o.apply(f, n.call(l.querySelectorAll(a.replace(C, "[id='" + k + "'] $&")), 0)), f } catch (i) { } finally { j || d.removeAttribute("id") } } return b(a, d, f, g, h) }, g && (T(function (b) { a = g.call(b, "div"); try { g.call(b, "[test!='']:sizzle"), f.push($.match.PSEUDO) } catch (c) { } }), f = new RegExp(f.join("|")), Z.matchesSelector = function (b, c) { c = c.replace(d, "='$1']"); if (!ba(b) && !f.test(c) && (!e || !e.test(c))) try { var h = g.call(b, c); if (h || a || b.document && b.document.nodeType !== 11) return h } catch (i) { } return Z(c, null, null, [b]).length > 0 }) } (), Z.attr = p.attr, p.find = Z, p.expr = Z.selectors, p.expr[":"] = p.expr.pseudos, p.unique = Z.uniqueSort, p.text = Z.getText, p.isXMLDoc = Z.isXML, p.contains = Z.contains } (a); var bc = /Until$/, bd = /^(?:parents|prev(?:Until|All))/, be = /^.[^:#\[\.,]*$/, bf = p.expr.match.needsContext, bg = { children: !0, contents: !0, next: !0, prev: !0 }; p.fn.extend({ find: function (a) { var b, c, d, e, f, g, h = this; if (typeof a != "string") return p(a).filter(function () { for (b = 0, c = h.length; b < c; b++) if (p.contains(h[b], this)) return !0 }); g = this.pushStack("", "find", a); for (b = 0, c = this.length; b < c; b++) { d = g.length, p.find(a, this[b], g); if (b > 0) for (e = d; e < g.length; e++) for (f = 0; f < d; f++) if (g[f] === g[e]) { g.splice(e--, 1); break } } return g }, has: function (a) { var b, c = p(a, this), d = c.length; return this.filter(function () { for (b = 0; b < d; b++) if (p.contains(this, c[b])) return !0 }) }, not: function (a) { return this.pushStack(bj(this, a, !1), "not", a) }, filter: function (a) { return this.pushStack(bj(this, a, !0), "filter", a) }, is: function (a) { return !!a && (typeof a == "string" ? bf.test(a) ? p(a, this.context).index(this[0]) >= 0 : p.filter(a, this).length > 0 : this.filter(a).length > 0) }, closest: function (a, b) { var c, d = 0, e = this.length, f = [], g = bf.test(a) || typeof a != "string" ? p(a, b || this.context) : 0; for (; d < e; d++) { c = this[d]; while (c && c.ownerDocument && c !== b && c.nodeType !== 11) { if (g ? g.index(c) > -1 : p.find.matchesSelector(c, a)) { f.push(c); break } c = c.parentNode } } return f = f.length > 1 ? p.unique(f) : f, this.pushStack(f, "closest", a) }, index: function (a) { return a ? typeof a == "string" ? p.inArray(this[0], p(a)) : p.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1 }, add: function (a, b) { var c = typeof a == "string" ? p(a, b) : p.makeArray(a && a.nodeType ? [a] : a), d = p.merge(this.get(), c); return this.pushStack(bh(c[0]) || bh(d[0]) ? d : p.unique(d)) }, addBack: function (a) { return this.add(a == null ? this.prevObject : this.prevObject.filter(a)) } }), p.fn.andSelf = p.fn.addBack, p.each({ parent: function (a) { var b = a.parentNode; return b && b.nodeType !== 11 ? b : null }, parents: function (a) { return p.dir(a, "parentNode") }, parentsUntil: function (a, b, c) { return p.dir(a, "parentNode", c) }, next: function (a) { return bi(a, "nextSibling") }, prev: function (a) { return bi(a, "previousSibling") }, nextAll: function (a) { return p.dir(a, "nextSibling") }, prevAll: function (a) { return p.dir(a, "previousSibling") }, nextUntil: function (a, b, c) { return p.dir(a, "nextSibling", c) }, prevUntil: function (a, b, c) { return p.dir(a, "previousSibling", c) }, siblings: function (a) { return p.sibling((a.parentNode || {}).firstChild, a) }, children: function (a) { return p.sibling(a.firstChild) }, contents: function (a) { return p.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : p.merge([], a.childNodes) } }, function (a, b) { p.fn[a] = function (c, d) { var e = p.map(this, b, c); return bc.test(a) || (d = c), d && typeof d == "string" && (e = p.filter(d, e)), e = this.length > 1 && !bg[a] ? p.unique(e) : e, this.length > 1 && bd.test(a) && (e = e.reverse()), this.pushStack(e, a, k.call(arguments).join(",")) } }), p.extend({ filter: function (a, b, c) { return c && (a = ":not(" + a + ")"), b.length === 1 ? p.find.matchesSelector(b[0], a) ? [b[0]] : [] : p.find.matches(a, b) }, dir: function (a, c, d) { var e = [], f = a[c]; while (f && f.nodeType !== 9 && (d === b || f.nodeType !== 1 || !p(f).is(d))) f.nodeType === 1 && e.push(f), f = f[c]; return e }, sibling: function (a, b) { var c = []; for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a); return c } }); var bl = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", bm = / jQuery\d+="(?:null|\d+)"/g, bn = /^\s+/, bo = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi, bp = /<([\w:]+)/, bq = /<tbody/i, br = /<|&#?\w+;/, bs = /<(?:script|style|link)/i, bt = /<(?:script|object|embed|option|style)/i, bu = new RegExp("<(?:" + bl + ")[\\s/>]", "i"), bv = /^(?:checkbox|radio)$/, bw = /checked\s*(?:[^=]|=\s*.checked.)/i, bx = /\/(java|ecma)script/i, by = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g, bz = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] }, bA = bk(e), bB = bA.appendChild(e.createElement("div")); bz.optgroup = bz.option, bz.tbody = bz.tfoot = bz.colgroup = bz.caption = bz.thead, bz.th = bz.td, p.support.htmlSerialize || (bz._default = [1, "X<div>", "</div>"]), p.fn.extend({ text: function (a) { return p.access(this, function (a) { return a === b ? p.text(this) : this.empty().append((this[0] && this[0].ownerDocument || e).createTextNode(a)) }, null, a, arguments.length) }, wrapAll: function (a) { if (p.isFunction(a)) return this.each(function (b) { p(this).wrapAll(a.call(this, b)) }); if (this[0]) { var b = p(a, this[0].ownerDocument).eq(0).clone(!0); this[0].parentNode && b.insertBefore(this[0]), b.map(function () { var a = this; while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild; return a }).append(this) } return this }, wrapInner: function (a) { return p.isFunction(a) ? this.each(function (b) { p(this).wrapInner(a.call(this, b)) }) : this.each(function () { var b = p(this), c = b.contents(); c.length ? c.wrapAll(a) : b.append(a) }) }, wrap: function (a) { var b = p.isFunction(a); return this.each(function (c) { p(this).wrapAll(b ? a.call(this, c) : a) }) }, unwrap: function () { return this.parent().each(function () { p.nodeName(this, "body") || p(this).replaceWith(this.childNodes) }).end() }, append: function () { return this.domManip(arguments, !0, function (a) { (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(a) }) }, prepend: function () { return this.domManip(arguments, !0, function (a) { (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(a, this.firstChild) }) }, before: function () { if (!bh(this[0])) return this.domManip(arguments, !1, function (a) { this.parentNode.insertBefore(a, this) }); if (arguments.length) { var a = p.clean(arguments); return this.pushStack(p.merge(a, this), "before", this.selector) } }, after: function () { if (!bh(this[0])) return this.domManip(arguments, !1, function (a) { this.parentNode.insertBefore(a, this.nextSibling) }); if (arguments.length) { var a = p.clean(arguments); return this.pushStack(p.merge(this, a), "after", this.selector) } }, remove: function (a, b) { var c, d = 0; for (; (c = this[d]) != null; d++) if (!a || p.filter(a, [c]).length) !b && c.nodeType === 1 && (p.cleanData(c.getElementsByTagName("*")), p.cleanData([c])), c.parentNode && c.parentNode.removeChild(c); return this }, empty: function () { var a, b = 0; for (; (a = this[b]) != null; b++) { a.nodeType === 1 && p.cleanData(a.getElementsByTagName("*")); while (a.firstChild) a.removeChild(a.firstChild) } return this }, clone: function (a, b) { return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function () { return p.clone(this, a, b) }) }, html: function (a) { return p.access(this, function (a) { var c = this[0] || {}, d = 0, e = this.length; if (a === b) return c.nodeType === 1 ? c.innerHTML.replace(bm, "") : b; if (typeof a == "string" && !bs.test(a) && (p.support.htmlSerialize || !bu.test(a)) && (p.support.leadingWhitespace || !bn.test(a)) && !bz[(bp.exec(a) || ["", ""])[1].toLowerCase()]) { a = a.replace(bo, "<$1></$2>"); try { for (; d < e; d++) c = this[d] || {}, c.nodeType === 1 && (p.cleanData(c.getElementsByTagName("*")), c.innerHTML = a); c = 0 } catch (f) { } } c && this.empty().append(a) }, null, a, arguments.length) }, replaceWith: function (a) { return bh(this[0]) ? this.length ? this.pushStack(p(p.isFunction(a) ? a() : a), "replaceWith", a) : this : p.isFunction(a) ? this.each(function (b) { var c = p(this), d = c.html(); c.replaceWith(a.call(this, b, d)) }) : (typeof a != "string" && (a = p(a).detach()), this.each(function () { var b = this.nextSibling, c = this.parentNode; p(this).remove(), b ? p(b).before(a) : p(c).append(a) })) }, detach: function (a) { return this.remove(a, !0) }, domManip: function (a, c, d) { a = [].concat.apply([], a); var e, f, g, h, i = 0, j = a[0], k = [], l = this.length; if (!p.support.checkClone && l > 1 && typeof j == "string" && bw.test(j)) return this.each(function () { p(this).domManip(a, c, d) }); if (p.isFunction(j)) return this.each(function (e) { var f = p(this); a[0] = j.call(this, e, c ? f.html() : b), f.domManip(a, c, d) }); if (this[0]) { e = p.buildFragment(a, this, k), g = e.fragment, f = g.firstChild, g.childNodes.length === 1 && (g = f); if (f) { c = c && p.nodeName(f, "tr"); for (h = e.cacheable || l - 1; i < l; i++) d.call(c && p.nodeName(this[i], "table") ? bC(this[i], "tbody") : this[i], i === h ? g : p.clone(g, !0, !0)) } g = f = null, k.length && p.each(k, function (a, b) { b.src ? p.ajax ? p.ajax({ url: b.src, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) : p.error("no ajax") : p.globalEval((b.text || b.textContent || b.innerHTML || "").replace(by, "")), b.parentNode && b.parentNode.removeChild(b) }) } return this } }), p.buildFragment = function (a, c, d) { var f, g, h, i = a[0]; return c = c || e, c = (c[0] || c).ownerDocument || c[0] || c, typeof c.createDocumentFragment == "undefined" && (c = e), a.length === 1 && typeof i == "string" && i.length < 512 && c === e && i.charAt(0) === "<" && !bt.test(i) && (p.support.checkClone || !bw.test(i)) && (p.support.html5Clone || !bu.test(i)) && (g = !0, f = p.fragments[i], h = f !== b), f || (f = c.createDocumentFragment(), p.clean(a, c, f, d), g && (p.fragments[i] = h && f)), { fragment: f, cacheable: g} }, p.fragments = {}, p.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) { p.fn[a] = function (c) { var d, e = 0, f = [], g = p(c), h = g.length, i = this.length === 1 && this[0].parentNode; if ((i == null || i && i.nodeType === 11 && i.childNodes.length === 1) && h === 1) return g[b](this[0]), this; for (; e < h; e++) d = (e > 0 ? this.clone(!0) : this).get(), p(g[e])[b](d), f = f.concat(d); return this.pushStack(f, a, g.selector) } }), p.extend({ clone: function (a, b, c) { var d, e, f, g; p.support.html5Clone || p.isXMLDoc(a) || !bu.test("<" + a.nodeName + ">") ? g = a.cloneNode(!0) : (bB.innerHTML = a.outerHTML, bB.removeChild(g = bB.firstChild)); if ((!p.support.noCloneEvent || !p.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !p.isXMLDoc(a)) { bE(a, g), d = bF(a), e = bF(g); for (f = 0; d[f]; ++f) e[f] && bE(d[f], e[f]) } if (b) { bD(a, g); if (c) { d = bF(a), e = bF(g); for (f = 0; d[f]; ++f) bD(d[f], e[f]) } } return d = e = null, g }, clean: function (a, b, c, d) { var f, g, h, i, j, k, l, m, n, o, q, r, s = 0, t = []; if (!b || typeof b.createDocumentFragment == "undefined") b = e; for (g = b === e && bA; (h = a[s]) != null; s++) { typeof h == "number" && (h += ""); if (!h) continue; if (typeof h == "string") if (!br.test(h)) h = b.createTextNode(h); else { g = g || bk(b), l = l || g.appendChild(b.createElement("div")), h = h.replace(bo, "<$1></$2>"), i = (bp.exec(h) || ["", ""])[1].toLowerCase(), j = bz[i] || bz._default, k = j[0], l.innerHTML = j[1] + h + j[2]; while (k--) l = l.lastChild; if (!p.support.tbody) { m = bq.test(h), n = i === "table" && !m ? l.firstChild && l.firstChild.childNodes : j[1] === "<table>" && !m ? l.childNodes : []; for (f = n.length - 1; f >= 0; --f) p.nodeName(n[f], "tbody") && !n[f].childNodes.length && n[f].parentNode.removeChild(n[f]) } !p.support.leadingWhitespace && bn.test(h) && l.insertBefore(b.createTextNode(bn.exec(h)[0]), l.firstChild), h = l.childNodes, l = g.lastChild } h.nodeType ? t.push(h) : t = p.merge(t, h) } l && (g.removeChild(l), h = l = g = null); if (!p.support.appendChecked) for (s = 0; (h = t[s]) != null; s++) p.nodeName(h, "input") ? bG(h) : typeof h.getElementsByTagName != "undefined" && p.grep(h.getElementsByTagName("input"), bG); if (c) { q = function (a) { if (!a.type || bx.test(a.type)) return d ? d.push(a.parentNode ? a.parentNode.removeChild(a) : a) : c.appendChild(a) }; for (s = 0; (h = t[s]) != null; s++) if (!p.nodeName(h, "script") || !q(h)) c.appendChild(h), typeof h.getElementsByTagName != "undefined" && (r = p.grep(p.merge([], h.getElementsByTagName("script")), q), t.splice.apply(t, [s + 1, 0].concat(r)), s += r.length) } return t }, cleanData: function (a, b) { var c, d, e, f, g = 0, h = p.expando, i = p.cache, j = p.support.deleteExpando, k = p.event.special; for (; (e = a[g]) != null; g++) if (b || p.acceptData(e)) { d = e[h], c = d && i[d]; if (c) { if (c.events) for (f in c.events) k[f] ? p.event.remove(e, f) : p.removeEvent(e, f, c.handle); i[d] && (delete i[d], j ? delete e[h] : e.removeAttribute ? e.removeAttribute(h) : e[h] = null, p.deletedIds.push(d)) } } } }), function () { var a, b; p.uaMatch = function (a) { a = a.toLowerCase(); var b = /(chrome)[ \/]([\w.]+)/.exec(a) || /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || a.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(a) || []; return { browser: b[1] || "", version: b[2] || "0"} }, a = p.uaMatch(g.userAgent), b = {}, a.browser && (b[a.browser] = !0, b.version = a.version), b.webkit && (b.safari = !0), p.browser = b, p.sub = function () { function a(b, c) { return new a.fn.init(b, c) } p.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function c(c, d) { return d && d instanceof p && !(d instanceof a) && (d = a(d)), p.fn.init.call(this, c, d, b) }, a.fn.init.prototype = a.fn; var b = a(e); return a } } (); var bH, bI, bJ, bK = /alpha\([^)]*\)/i, bL = /opacity=([^)]*)/, bM = /^(top|right|bottom|left)$/, bN = /^margin/, bO = new RegExp("^(" + q + ")(.*)$", "i"), bP = new RegExp("^(" + q + ")(?!px)[a-z%]+$", "i"), bQ = new RegExp("^([-+])=(" + q + ")", "i"), bR = {}, bS = { position: "absolute", visibility: "hidden", display: "block" }, bT = { letterSpacing: 0, fontWeight: 400, lineHeight: 1 }, bU = ["Top", "Right", "Bottom", "Left"], bV = ["Webkit", "O", "Moz", "ms"], bW = p.fn.toggle; p.fn.extend({ css: function (a, c) { return p.access(this, function (a, c, d) { return d !== b ? p.style(a, c, d) : p.css(a, c) }, a, c, arguments.length > 1) }, show: function () { return bZ(this, !0) }, hide: function () { return bZ(this) }, toggle: function (a, b) { var c = typeof a == "boolean"; return p.isFunction(a) && p.isFunction(b) ? bW.apply(this, arguments) : this.each(function () { (c ? a : bY(this)) ? p(this).show() : p(this).hide() }) } }), p.extend({ cssHooks: { opacity: { get: function (a, b) { if (b) { var c = bH(a, "opacity"); return c === "" ? "1" : c } } } }, cssNumber: { fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": p.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function (a, c, d, e) { if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return; var f, g, h, i = p.camelCase(c), j = a.style; c = p.cssProps[i] || (p.cssProps[i] = bX(j, i)), h = p.cssHooks[c] || p.cssHooks[i]; if (d === b) return h && "get" in h && (f = h.get(a, !1, e)) !== b ? f : j[c]; g = typeof d, g === "string" && (f = bQ.exec(d)) && (d = (f[1] + 1) * f[2] + parseFloat(p.css(a, c)), g = "number"); if (d == null || g === "number" && isNaN(d)) return; g === "number" && !p.cssNumber[i] && (d += "px"); if (!h || !("set" in h) || (d = h.set(a, d, e)) !== b) try { j[c] = d } catch (k) { } }, css: function (a, c, d, e) { var f, g, h, i = p.camelCase(c); return c = p.cssProps[i] || (p.cssProps[i] = bX(a.style, i)), h = p.cssHooks[c] || p.cssHooks[i], h && "get" in h && (f = h.get(a, !0, e)), f === b && (f = bH(a, c)), f === "normal" && c in bT && (f = bT[c]), d || e !== b ? (g = parseFloat(f), d || p.isNumeric(g) ? g || 0 : f) : f }, swap: function (a, b, c) { var d, e, f = {}; for (e in b) f[e] = a.style[e], a.style[e] = b[e]; d = c.call(a); for (e in b) a.style[e] = f[e]; return d } }), a.getComputedStyle ? bH = function (a, b) { var c, d, e, f, g = getComputedStyle(a, null), h = a.style; return g && (c = g[b], c === "" && !p.contains(a.ownerDocument.documentElement, a) && (c = p.style(a, b)), bP.test(c) && bN.test(b) && (d = h.width, e = h.minWidth, f = h.maxWidth, h.minWidth = h.maxWidth = h.width = c, c = g.width, h.width = d, h.minWidth = e, h.maxWidth = f)), c } : e.documentElement.currentStyle && (bH = function (a, b) { var c, d, e = a.currentStyle && a.currentStyle[b], f = a.style; return e == null && f && f[b] && (e = f[b]), bP.test(e) && !bM.test(b) && (c = f.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), f.left = b === "fontSize" ? "1em" : e, e = f.pixelLeft + "px", f.left = c, d && (a.runtimeStyle.left = d)), e === "" ? "auto" : e }), p.each(["height", "width"], function (a, b) { p.cssHooks[b] = { get: function (a, c, d) { if (c) return a.offsetWidth !== 0 || bH(a, "display") !== "none" ? ca(a, b, d) : p.swap(a, bS, function () { return ca(a, b, d) }) }, set: function (a, c, d) { return b$(a, c, d ? b_(a, b, d, p.support.boxSizing && p.css(a, "boxSizing") === "border-box") : 0) } } }), p.support.opacity || (p.cssHooks.opacity = { get: function (a, b) { return bL.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : b ? "1" : "" }, set: function (a, b) { var c = a.style, d = a.currentStyle, e = p.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", f = d && d.filter || c.filter || ""; c.zoom = 1; if (b >= 1 && p.trim(f.replace(bK, "")) === "" && c.removeAttribute) { c.removeAttribute("filter"); if (d && !d.filter) return } c.filter = bK.test(f) ? f.replace(bK, e) : f + " " + e } }), p(function () { p.support.reliableMarginRight || (p.cssHooks.marginRight = { get: function (a, b) { return p.swap(a, { display: "inline-block" }, function () { if (b) return bH(a, "marginRight") }) } }), !p.support.pixelPosition && p.fn.position && p.each(["top", "left"], function (a, b) { p.cssHooks[b] = { get: function (a, c) { if (c) { var d = bH(a, b); return bP.test(d) ? p(a).position()[b] + "px" : d } } } }) }), p.expr && p.expr.filters && (p.expr.filters.hidden = function (a) { return a.offsetWidth === 0 && a.offsetHeight === 0 || !p.support.reliableHiddenOffsets && (a.style && a.style.display || bH(a, "display")) === "none" }, p.expr.filters.visible = function (a) { return !p.expr.filters.hidden(a) }), p.each({ margin: "", padding: "", border: "Width" }, function (a, b) { p.cssHooks[a + b] = { expand: function (c) { var d, e = typeof c == "string" ? c.split(" ") : [c], f = {}; for (d = 0; d < 4; d++) f[a + bU[d] + b] = e[d] || e[d - 2] || e[0]; return f } }, bN.test(a) || (p.cssHooks[a + b].set = b$) }); var cc = /%20/g, cd = /\[\]$/, ce = /\r?\n/g, cf = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, cg = /^(?:select|textarea)/i; p.fn.extend({ serialize: function () { return p.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { return this.elements ? p.makeArray(this.elements) : this }).filter(function () { return this.name && !this.disabled && (this.checked || cg.test(this.nodeName) || cf.test(this.type)) }).map(function (a, b) { var c = p(this).val(); return c == null ? null : p.isArray(c) ? p.map(c, function (a, c) { return { name: b.name, value: a.replace(ce, "\r\n")} }) : { name: b.name, value: c.replace(ce, "\r\n")} }).get() } }), p.param = function (a, c) { var d, e = [], f = function (a, b) { b = p.isFunction(b) ? b() : b == null ? "" : b, e[e.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b) }; c === b && (c = p.ajaxSettings && p.ajaxSettings.traditional); if (p.isArray(a) || a.jquery && !p.isPlainObject(a)) p.each(a, function () { f(this.name, this.value) }); else for (d in a) ch(d, a[d], c, f); return e.join("&").replace(cc, "+") }; var ci, cj, ck = /#.*$/, cl = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, cm = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, cn = /^(?:GET|HEAD)$/, co = /^\/\//, cp = /\?/, cq = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, cr = /([?&])_=[^&]*/, cs = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/, ct = p.fn.load, cu = {}, cv = {}, cw = ["*/"] + ["*"]; try { ci = f.href } catch (cx) { ci = e.createElement("a"), ci.href = "", ci = ci.href } cj = cs.exec(ci.toLowerCase()) || [], p.fn.load = function (a, c, d) { if (typeof a != "string" && ct) return ct.apply(this, arguments); if (!this.length) return this; var e, f, g, h = this, i = a.indexOf(" "); return i >= 0 && (e = a.slice(i, a.length), a = a.slice(0, i)), p.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (f = "POST"), p.ajax({ url: a, type: f, dataType: "html", data: c, complete: function (a, b) { d && h.each(d, g || [a.responseText, b, a]) } }).done(function (a) { g = arguments, h.html(e ? p("<div>").append(a.replace(cq, "")).find(e) : a) }), this }, p.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (a, b) { p.fn[b] = function (a) { return this.on(b, a) } }), p.each(["get", "post"], function (a, c) { p[c] = function (a, d, e, f) { return p.isFunction(d) && (f = f || e, e = d, d = b), p.ajax({ type: c, url: a, data: d, success: e, dataType: f }) } }), p.extend({ getScript: function (a, c) { return p.get(a, b, c, "script") }, getJSON: function (a, b, c) { return p.get(a, b, c, "json") }, ajaxSetup: function (a, b) { return b ? cA(a, p.ajaxSettings) : (b = a, a = p.ajaxSettings), cA(a, b), a }, ajaxSettings: { url: ci, isLocal: cm.test(cj[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: !0, async: !0, accepts: { xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": cw }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText" }, converters: { "* text": a.String, "text html": !0, "text json": p.parseJSON, "text xml": p.parseXML }, flatOptions: { context: !0, url: !0} }, ajaxPrefilter: cy(cu), ajaxTransport: cy(cv), ajax: function (a, c) { function y(a, c, f, i) { var k, s, t, u, w, y = c; if (v === 2) return; v = 2, h && clearTimeout(h), g = b, e = i || "", x.readyState = a > 0 ? 4 : 0, f && (u = cB(l, x, f)); if (a >= 200 && a < 300 || a === 304) l.ifModified && (w = x.getResponseHeader("Last-Modified"), w && (p.lastModified[d] = w), w = x.getResponseHeader("Etag"), w && (p.etag[d] = w)), a === 304 ? (y = "notmodified", k = !0) : (k = cC(l, u), y = k.state, s = k.data, t = k.error, k = !t); else { t = y; if (!y || a) y = "error", a < 0 && (a = 0) } x.status = a, x.statusText = "" + (c || y), k ? o.resolveWith(m, [s, y, x]) : o.rejectWith(m, [x, y, t]), x.statusCode(r), r = b, j && n.trigger("ajax" + (k ? "Success" : "Error"), [x, l, k ? s : t]), q.fireWith(m, [x, y]), j && (n.trigger("ajaxComplete", [x, l]), --p.active || p.event.trigger("ajaxStop")) } typeof a == "object" && (c = a, a = b), c = c || {}; var d, e, f, g, h, i, j, k, l = p.ajaxSetup({}, c), m = l.context || l, n = m !== l && (m.nodeType || m instanceof p) ? p(m) : p.event, o = p.Deferred(), q = p.Callbacks("once memory"), r = l.statusCode || {}, t = {}, u = {}, v = 0, w = "canceled", x = { readyState: 0, setRequestHeader: function (a, b) { if (!v) { var c = a.toLowerCase(); a = u[c] = u[c] || a, t[a] = b } return this }, getAllResponseHeaders: function () { return v === 2 ? e : null }, getResponseHeader: function (a) { var c; if (v === 2) { if (!f) { f = {}; while (c = cl.exec(e)) f[c[1].toLowerCase()] = c[2] } c = f[a.toLowerCase()] } return c === b ? null : c }, overrideMimeType: function (a) { return v || (l.mimeType = a), this }, abort: function (a) { return a = a || w, g && g.abort(a), y(0, a), this } }; o.promise(x), x.success = x.done, x.error = x.fail, x.complete = q.add, x.statusCode = function (a) { if (a) { var b; if (v < 2) for (b in a) r[b] = [r[b], a[b]]; else b = a[x.status], x.always(b) } return this }, l.url = ((a || l.url) + "").replace(ck, "").replace(co, cj[1] + "//"), l.dataTypes = p.trim(l.dataType || "*").toLowerCase().split(s), l.crossDomain == null && (i = cs.exec(l.url.toLowerCase()), l.crossDomain = !(!i || i[1] == cj[1] && i[2] == cj[2] && (i[3] || (i[1] === "http:" ? 80 : 443)) == (cj[3] || (cj[1] === "http:" ? 80 : 443)))), l.data && l.processData && typeof l.data != "string" && (l.data = p.param(l.data, l.traditional)), cz(cu, l, c, x); if (v === 2) return x; j = l.global, l.type = l.type.toUpperCase(), l.hasContent = !cn.test(l.type), j && p.active++ === 0 && p.event.trigger("ajaxStart"); if (!l.hasContent) { l.data && (l.url += (cp.test(l.url) ? "&" : "?") + l.data, delete l.data), d = l.url; if (l.cache === !1) { var z = p.now(), A = l.url.replace(cr, "$1_=" + z); l.url = A + (A === l.url ? (cp.test(l.url) ? "&" : "?") + "_=" + z : "") } } (l.data && l.hasContent && l.contentType !== !1 || c.contentType) && x.setRequestHeader("Content-Type", l.contentType), l.ifModified && (d = d || l.url, p.lastModified[d] && x.setRequestHeader("If-Modified-Since", p.lastModified[d]), p.etag[d] && x.setRequestHeader("If-None-Match", p.etag[d])), x.setRequestHeader("Accept", l.dataTypes[0] && l.accepts[l.dataTypes[0]] ? l.accepts[l.dataTypes[0]] + (l.dataTypes[0] !== "*" ? ", " + cw + "; q=0.01" : "") : l.accepts["*"]); for (k in l.headers) x.setRequestHeader(k, l.headers[k]); if (!l.beforeSend || l.beforeSend.call(m, x, l) !== !1 && v !== 2) { w = "abort"; for (k in { success: 1, error: 1, complete: 1 }) x[k](l[k]); g = cz(cv, l, c, x); if (!g) y(-1, "No Transport"); else { x.readyState = 1, j && n.trigger("ajaxSend", [x, l]), l.async && l.timeout > 0 && (h = setTimeout(function () { x.abort("timeout") }, l.timeout)); try { v = 1, g.send(t, y) } catch (B) { if (v < 2) y(-1, B); else throw B } } return x } return x.abort() }, active: 0, lastModified: {}, etag: {} }); var cD = [], cE = /\?/, cF = /(=)\?(?=&|$)|\?\?/, cG = p.now(); p.ajaxSetup({ jsonp: "callback", jsonpCallback: function () { var a = cD.pop() || p.expando + "_" + cG++; return this[a] = !0, a } }), p.ajaxPrefilter("json jsonp", function (c, d, e) { var f, g, h, i = c.data, j = c.url, k = c.jsonp !== !1, l = k && cF.test(j), m = k && !l && typeof i == "string" && !(c.contentType || "").indexOf("application/x-www-form-urlencoded") && cF.test(i); if (c.dataTypes[0] === "jsonp" || l || m) return f = c.jsonpCallback = p.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, g = a[f], l ? c.url = j.replace(cF, "$1" + f) : m ? c.data = i.replace(cF, "$1" + f) : k && (c.url += (cE.test(j) ? "&" : "?") + c.jsonp + "=" + f), c.converters["script json"] = function () { return h || p.error(f + " was not called"), h[0] }, c.dataTypes[0] = "json", a[f] = function () { h = arguments }, e.always(function () { a[f] = g, c[f] && (c.jsonpCallback = d.jsonpCallback, cD.push(f)), h && p.isFunction(g) && g(h[0]), h = g = b }), "script" }), p.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /javascript|ecmascript/ }, converters: { "text script": function (a) { return p.globalEval(a), a } } }), p.ajaxPrefilter("script", function (a) { a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1) }), p.ajaxTransport("script", function (a) { if (a.crossDomain) { var c, d = e.head || e.getElementsByTagName("head")[0] || e.documentElement; return { send: function (f, g) { c = e.createElement("script"), c.async = "async", a.scriptCharset && (c.charset = a.scriptCharset), c.src = a.url, c.onload = c.onreadystatechange = function (a, e) { if (e || !c.readyState || /loaded|complete/.test(c.readyState)) c.onload = c.onreadystatechange = null, d && c.parentNode && d.removeChild(c), c = b, e || g(200, "success") }, d.insertBefore(c, d.firstChild) }, abort: function () { c && c.onload(0, 1) } } } }); var cH, cI = a.ActiveXObject ? function () { for (var a in cH) cH[a](0, 1) } : !1, cJ = 0; p.ajaxSettings.xhr = a.ActiveXObject ? function () { return !this.isLocal && cK() || cL() } : cK, function (a) { p.extend(p.support, { ajax: !!a, cors: !!a && "withCredentials" in a }) } (p.ajaxSettings.xhr()), p.support.ajax && p.ajaxTransport(function (c) { if (!c.crossDomain || p.support.cors) { var d; return { send: function (e, f) { var g, h, i = c.xhr(); c.username ? i.open(c.type, c.url, c.async, c.username, c.password) : i.open(c.type, c.url, c.async); if (c.xhrFields) for (h in c.xhrFields) i[h] = c.xhrFields[h]; c.mimeType && i.overrideMimeType && i.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest"); try { for (h in e) i.setRequestHeader(h, e[h]) } catch (j) { } i.send(c.hasContent && c.data || null), d = function (a, e) { var h, j, k, l, m; try { if (d && (e || i.readyState === 4)) { d = b, g && (i.onreadystatechange = p.noop, cI && delete cH[g]); if (e) i.readyState !== 4 && i.abort(); else { h = i.status, k = i.getAllResponseHeaders(), l = {}, m = i.responseXML, m && m.documentElement && (l.xml = m); try { l.text = i.responseText } catch (a) { } try { j = i.statusText } catch (n) { j = "" } !h && c.isLocal && !c.crossDomain ? h = l.text ? 200 : 404 : h === 1223 && (h = 204) } } } catch (o) { e || f(-1, o) } l && f(h, j, l, k) }, c.async ? i.readyState === 4 ? setTimeout(d, 0) : (g = ++cJ, cI && (cH || (cH = {}, p(a).unload(cI)), cH[g] = d), i.onreadystatechange = d) : d() }, abort: function () { d && d(0, 1) } } } }); var cM, cN, cO = /^(?:toggle|show|hide)$/, cP = new RegExp("^(?:([-+])=|)(" + q + ")([a-z%]*)$", "i"), cQ = /queueHooks$/, cR = [cX], cS = { "*": [function (a, b) { var c, d, e, f = this.createTween(a, b), g = cP.exec(b), h = f.cur(), i = +h || 0, j = 1; if (g) { c = +g[2], d = g[3] || (p.cssNumber[a] ? "" : "px"); if (d !== "px" && i) { i = p.css(f.elem, a, !0) || c || 1; do e = j = j || ".5", i = i / j, p.style(f.elem, a, i + d), j = f.cur() / h; while (j !== 1 && j !== e) } f.unit = d, f.start = i, f.end = g[1] ? i + (g[1] + 1) * c : c } return f } ] }; p.Animation = p.extend(cV, { tweener: function (a, b) { p.isFunction(a) ? (b = a, a = ["*"]) : a = a.split(" "); var c, d = 0, e = a.length; for (; d < e; d++) c = a[d], cS[c] = cS[c] || [], cS[c].unshift(b) }, prefilter: function (a, b) { b ? cR.unshift(a) : cR.push(a) } }), p.Tween = cY, cY.prototype = { constructor: cY, init: function (a, b, c, d, e, f) { this.elem = a, this.prop = c, this.easing = e || "swing", this.options = b, this.start = this.now = this.cur(), this.end = d, this.unit = f || (p.cssNumber[c] ? "" : "px") }, cur: function () { var a = cY.propHooks[this.prop]; return a && a.get ? a.get(this) : cY.propHooks._default.get(this) }, run: function (a) { var b, c = cY.propHooks[this.prop]; return this.pos = b = p.easing[this.easing](a, this.options.duration * a, 0, 1, this.options.duration), this.now = (this.end - this.start) * b + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), c && c.set ? c.set(this) : cY.propHooks._default.set(this), this } }, cY.prototype.init.prototype = cY.prototype, cY.propHooks = { _default: { get: function (a) { var b; return a.elem[a.prop] == null || !!a.elem.style && a.elem.style[a.prop] != null ? (b = p.css(a.elem, a.prop, !1, ""), !b || b === "auto" ? 0 : b) : a.elem[a.prop] }, set: function (a) { p.fx.step[a.prop] ? p.fx.step[a.prop](a) : a.elem.style && (a.elem.style[p.cssProps[a.prop]] != null || p.cssHooks[a.prop]) ? p.style(a.elem, a.prop, a.now + a.unit) : a.elem[a.prop] = a.now } } }, cY.propHooks.scrollTop = cY.propHooks.scrollLeft = { set: function (a) { a.elem.nodeType && a.elem.parentNode && (a.elem[a.prop] = a.now) } }, p.each(["toggle", "show", "hide"], function (a, b) { var c = p.fn[b]; p.fn[b] = function (d, e, f) { return d == null || typeof d == "boolean" || !a && p.isFunction(d) && p.isFunction(e) ? c.apply(this, arguments) : this.animate(cZ(b, !0), d, e, f) } }), p.fn.extend({ fadeTo: function (a, b, c, d) { return this.filter(bY).css("opacity", 0).show().end().animate({ opacity: b }, a, c, d) }, animate: function (a, b, c, d) { var e = p.isEmptyObject(a), f = p.speed(b, c, d), g = function () { var b = cV(this, p.extend({}, a), f); e && b.stop(!0) }; return e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g) }, stop: function (a, c, d) { var e = function (a) { var b = a.stop; delete a.stop, b(d) }; return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function () { var b = !0, c = a != null && a + "queueHooks", f = p.timers, g = p._data(this); if (c) g[c] && g[c].stop && e(g[c]); else for (c in g) g[c] && g[c].stop && cQ.test(c) && e(g[c]); for (c = f.length; c--; ) f[c].elem === this && (a == null || f[c].queue === a) && (f[c].anim.stop(d), b = !1, f.splice(c, 1)); (b || !d) && p.dequeue(this, a) }) } }), p.each({ slideDown: cZ("show"), slideUp: cZ("hide"), slideToggle: cZ("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle"} }, function (a, b) { p.fn[a] = function (a, c, d) { return this.animate(b, a, c, d) } }), p.speed = function (a, b, c) { var d = a && typeof a == "object" ? p.extend({}, a) : { complete: c || !c && b || p.isFunction(a) && a, duration: a, easing: c && b || b && !p.isFunction(b) && b }; d.duration = p.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in p.fx.speeds ? p.fx.speeds[d.duration] : p.fx.speeds._default; if (d.queue == null || d.queue === !0) d.queue = "fx"; return d.old = d.complete, d.complete = function () { p.isFunction(d.old) && d.old.call(this), d.queue && p.dequeue(this, d.queue) }, d }, p.easing = { linear: function (a) { return a }, swing: function (a) { return .5 - Math.cos(a * Math.PI) / 2 } }, p.timers = [], p.fx = cY.prototype.init, p.fx.tick = function () { var a, b = p.timers, c = 0; for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1); b.length || p.fx.stop() }, p.fx.timer = function (a) { a() && p.timers.push(a) && !cN && (cN = setInterval(p.fx.tick, p.fx.interval)) }, p.fx.interval = 13, p.fx.stop = function () { clearInterval(cN), cN = null }, p.fx.speeds = { slow: 600, fast: 200, _default: 400 }, p.fx.step = {}, p.expr && p.expr.filters && (p.expr.filters.animated = function (a) { return p.grep(p.timers, function (b) { return a === b.elem }).length }); var c$ = /^(?:body|html)$/i; p.fn.offset = function (a) { if (arguments.length) return a === b ? this : this.each(function (b) { p.offset.setOffset(this, a, b) }); var c, d, e, f, g, h, i, j, k, l, m = this[0], n = m && m.ownerDocument; if (!n) return; return (e = n.body) === m ? p.offset.bodyOffset(m) : (d = n.documentElement, p.contains(d, m) ? (c = m.getBoundingClientRect(), f = c_(n), g = d.clientTop || e.clientTop || 0, h = d.clientLeft || e.clientLeft || 0, i = f.pageYOffset || d.scrollTop, j = f.pageXOffset || d.scrollLeft, k = c.top + i - g, l = c.left + j - h, { top: k, left: l }) : { top: 0, left: 0 }) }, p.offset = { bodyOffset: function (a) { var b = a.offsetTop, c = a.offsetLeft; return p.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(p.css(a, "marginTop")) || 0, c += parseFloat(p.css(a, "marginLeft")) || 0), { top: b, left: c} }, setOffset: function (a, b, c) { var d = p.css(a, "position"); d === "static" && (a.style.position = "relative"); var e = p(a), f = e.offset(), g = p.css(a, "top"), h = p.css(a, "left"), i = (d === "absolute" || d === "fixed") && p.inArray("auto", [g, h]) > -1, j = {}, k = {}, l, m; i ? (k = e.position(), l = k.top, m = k.left) : (l = parseFloat(g) || 0, m = parseFloat(h) || 0), p.isFunction(b) && (b = b.call(a, c, f)), b.top != null && (j.top = b.top - f.top + l), b.left != null && (j.left = b.left - f.left + m), "using" in b ? b.using.call(a, j) : e.css(j) } }, p.fn.extend({ position: function () { if (!this[0]) return; var a = this[0], b = this.offsetParent(), c = this.offset(), d = c$.test(b[0].nodeName) ? { top: 0, left: 0} : b.offset(); return c.top -= parseFloat(p.css(a, "marginTop")) || 0, c.left -= parseFloat(p.css(a, "marginLeft")) || 0, d.top += parseFloat(p.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(p.css(b[0], "borderLeftWidth")) || 0, { top: c.top - d.top, left: c.left - d.left} }, offsetParent: function () { return this.map(function () { var a = this.offsetParent || e.body; while (a && !c$.test(a.nodeName) && p.css(a, "position") === "static") a = a.offsetParent; return a || e.body }) } }), p.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (a, c) { var d = /Y/.test(c); p.fn[a] = function (e) { return p.access(this, function (a, e, f) { var g = c_(a); if (f === b) return g ? c in g ? g[c] : g.document.documentElement[e] : a[e]; g ? g.scrollTo(d ? p(g).scrollLeft() : f, d ? f : p(g).scrollTop()) : a[e] = f }, a, e, arguments.length, null) } }), p.each({ Height: "height", Width: "width" }, function (a, c) { p.each({ padding: "inner" + a, content: c, "": "outer" + a }, function (d, e) { p.fn[e] = function (e, f) { var g = arguments.length && (d || typeof e != "boolean"), h = d || (e === !0 || f === !0 ? "margin" : "border"); return p.access(this, function (c, d, e) { var f; return p.isWindow(c) ? c.document.documentElement["client" + a] : c.nodeType === 9 ? (f = c.documentElement, Math.max(c.body["scroll" + a], f["scroll" + a], c.body["offset" + a], f["offset" + a], f["client" + a])) : e === b ? p.css(c, d, e, h) : p.style(c, d, e, h) }, c, g ? e : b, g) } }) }), a.jQuery = a.$ = p, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function () { return p }) })(window); ;

// lib/handlebars/base.js
var Handlebars = {};

Handlebars.VERSION = "1.0.beta.6";

Handlebars.helpers = {};
Handlebars.partials = {};

Handlebars.registerHelper = function (name, fn, inverse) {
    if (inverse) { fn.not = inverse; }
    this.helpers[name] = fn;
};

Handlebars.registerPartial = function (name, str) {
    this.partials[name] = str;
};

Handlebars.registerHelper('helperMissing', function (arg) {
    if (arguments.length === 2) {
        return undefined;
    } else {
        throw new Error("Could not find property '" + arg + "'");
    }
});

var toString = Object.prototype.toString, functionType = "[object Function]";

Handlebars.registerHelper('blockHelperMissing', function (context, options) {
    var inverse = options.inverse || function () { }, fn = options.fn;


    var ret = "";
    var type = toString.call(context);

    if (type === functionType) { context = context.call(this); }

    if (context === true) {
        return fn(this);
    } else if (context === false || context == null) {
        return inverse(this);
    } else if (type === "[object Array]") {
        if (context.length > 0) {
            for (var i = 0, j = context.length; i < j; i++) {
                ret = ret + fn(context[i]);
            }
        } else {
            ret = inverse(this);
        }
        return ret;
    } else {
        return fn(context);
    }
});

Handlebars.registerHelper('each', function (context, options) {
    var fn = options.fn, inverse = options.inverse;
    var ret = "";

    if (context && context.length > 0) {
        for (var i = 0, j = context.length; i < j; i++) {
            ret = ret + fn(context[i]);
        }
    } else {
        ret = inverse(this);
    }
    return ret;
});

Handlebars.registerHelper('if', function (context, options) {
    var type = toString.call(context);
    if (type === functionType) { context = context.call(this); }

    if (!context || Handlebars.Utils.isEmpty(context)) {
        return options.inverse(this);
    } else {
        return options.fn(this);
    }
});

Handlebars.registerHelper('unless', function (context, options) {
    var fn = options.fn, inverse = options.inverse;
    options.fn = inverse;
    options.inverse = fn;

    return Handlebars.helpers['if'].call(this, context, options);
});

Handlebars.registerHelper('with', function (context, options) {
    return options.fn(context);
});

Handlebars.registerHelper('log', function (context) {
    Handlebars.log(context);
});
;
// lib/handlebars/compiler/parser.js
/* Jison generated parser */
var handlebars = (function () {

    var parser = { trace: function trace() { },
        yy: {},
        symbols_: { "error": 2, "root": 3, "program": 4, "EOF": 5, "statements": 6, "simpleInverse": 7, "statement": 8, "openInverse": 9, "closeBlock": 10, "openBlock": 11, "mustache": 12, "partial": 13, "CONTENT": 14, "COMMENT": 15, "OPEN_BLOCK": 16, "inMustache": 17, "CLOSE": 18, "OPEN_INVERSE": 19, "OPEN_ENDBLOCK": 20, "path": 21, "OPEN": 22, "OPEN_UNESCAPED": 23, "OPEN_PARTIAL": 24, "params": 25, "hash": 26, "param": 27, "STRING": 28, "INTEGER": 29, "BOOLEAN": 30, "hashSegments": 31, "hashSegment": 32, "ID": 33, "EQUALS": 34, "pathSegments": 35, "SEP": 36, "$accept": 0, "$end": 1 },
        terminals_: { 2: "error", 5: "EOF", 14: "CONTENT", 15: "COMMENT", 16: "OPEN_BLOCK", 18: "CLOSE", 19: "OPEN_INVERSE", 20: "OPEN_ENDBLOCK", 22: "OPEN", 23: "OPEN_UNESCAPED", 24: "OPEN_PARTIAL", 28: "STRING", 29: "INTEGER", 30: "BOOLEAN", 33: "ID", 34: "EQUALS", 36: "SEP" },
        productions_: [0, [3, 2], [4, 3], [4, 1], [4, 0], [6, 1], [6, 2], [8, 3], [8, 3], [8, 1], [8, 1], [8, 1], [8, 1], [11, 3], [9, 3], [10, 3], [12, 3], [12, 3], [13, 3], [13, 4], [7, 2], [17, 3], [17, 2], [17, 2], [17, 1], [25, 2], [25, 1], [27, 1], [27, 1], [27, 1], [27, 1], [26, 1], [31, 2], [31, 1], [32, 3], [32, 3], [32, 3], [32, 3], [21, 1], [35, 3], [35, 1]],
        performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$) {

            var $0 = $$.length - 1;
            switch (yystate) {
                case 1: return $$[$0 - 1]
                    break;
                case 2: this.$ = new yy.ProgramNode($$[$0 - 2], $$[$0])
                    break;
                case 3: this.$ = new yy.ProgramNode($$[$0])
                    break;
                case 4: this.$ = new yy.ProgramNode([])
                    break;
                case 5: this.$ = [$$[$0]]
                    break;
                case 6: $$[$0 - 1].push($$[$0]); this.$ = $$[$0 - 1]
                    break;
                case 7: this.$ = new yy.InverseNode($$[$0 - 2], $$[$0 - 1], $$[$0])
                    break;
                case 8: this.$ = new yy.BlockNode($$[$0 - 2], $$[$0 - 1], $$[$0])
                    break;
                case 9: this.$ = $$[$0]
                    break;
                case 10: this.$ = $$[$0]
                    break;
                case 11: this.$ = new yy.ContentNode($$[$0])
                    break;
                case 12: this.$ = new yy.CommentNode($$[$0])
                    break;
                case 13: this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1])
                    break;
                case 14: this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1])
                    break;
                case 15: this.$ = $$[$0 - 1]
                    break;
                case 16: this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1])
                    break;
                case 17: this.$ = new yy.MustacheNode($$[$0 - 1][0], $$[$0 - 1][1], true)
                    break;
                case 18: this.$ = new yy.PartialNode($$[$0 - 1])
                    break;
                case 19: this.$ = new yy.PartialNode($$[$0 - 2], $$[$0 - 1])
                    break;
                case 20:
                    break;
                case 21: this.$ = [[$$[$0 - 2]].concat($$[$0 - 1]), $$[$0]]
                    break;
                case 22: this.$ = [[$$[$0 - 1]].concat($$[$0]), null]
                    break;
                case 23: this.$ = [[$$[$0 - 1]], $$[$0]]
                    break;
                case 24: this.$ = [[$$[$0]], null]
                    break;
                case 25: $$[$0 - 1].push($$[$0]); this.$ = $$[$0 - 1];
                    break;
                case 26: this.$ = [$$[$0]]
                    break;
                case 27: this.$ = $$[$0]
                    break;
                case 28: this.$ = new yy.StringNode($$[$0])
                    break;
                case 29: this.$ = new yy.IntegerNode($$[$0])
                    break;
                case 30: this.$ = new yy.BooleanNode($$[$0])
                    break;
                case 31: this.$ = new yy.HashNode($$[$0])
                    break;
                case 32: $$[$0 - 1].push($$[$0]); this.$ = $$[$0 - 1]
                    break;
                case 33: this.$ = [$$[$0]]
                    break;
                case 34: this.$ = [$$[$0 - 2], $$[$0]]
                    break;
                case 35: this.$ = [$$[$0 - 2], new yy.StringNode($$[$0])]
                    break;
                case 36: this.$ = [$$[$0 - 2], new yy.IntegerNode($$[$0])]
                    break;
                case 37: this.$ = [$$[$0 - 2], new yy.BooleanNode($$[$0])]
                    break;
                case 38: this.$ = new yy.IdNode($$[$0])
                    break;
                case 39: $$[$0 - 2].push($$[$0]); this.$ = $$[$0 - 2];
                    break;
                case 40: this.$ = [$$[$0]]
                    break;
            }
        },
        table: [{ 3: 1, 4: 2, 5: [2, 4], 6: 3, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 22: [1, 13], 23: [1, 14], 24: [1, 15] }, { 1: [3] }, { 5: [1, 16] }, { 5: [2, 3], 7: 17, 8: 18, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 19], 20: [2, 3], 22: [1, 13], 23: [1, 14], 24: [1, 15] }, { 5: [2, 5], 14: [2, 5], 15: [2, 5], 16: [2, 5], 19: [2, 5], 20: [2, 5], 22: [2, 5], 23: [2, 5], 24: [2, 5] }, { 4: 20, 6: 3, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 4], 22: [1, 13], 23: [1, 14], 24: [1, 15] }, { 4: 21, 6: 3, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 4], 22: [1, 13], 23: [1, 14], 24: [1, 15] }, { 5: [2, 9], 14: [2, 9], 15: [2, 9], 16: [2, 9], 19: [2, 9], 20: [2, 9], 22: [2, 9], 23: [2, 9], 24: [2, 9] }, { 5: [2, 10], 14: [2, 10], 15: [2, 10], 16: [2, 10], 19: [2, 10], 20: [2, 10], 22: [2, 10], 23: [2, 10], 24: [2, 10] }, { 5: [2, 11], 14: [2, 11], 15: [2, 11], 16: [2, 11], 19: [2, 11], 20: [2, 11], 22: [2, 11], 23: [2, 11], 24: [2, 11] }, { 5: [2, 12], 14: [2, 12], 15: [2, 12], 16: [2, 12], 19: [2, 12], 20: [2, 12], 22: [2, 12], 23: [2, 12], 24: [2, 12] }, { 17: 22, 21: 23, 33: [1, 25], 35: 24 }, { 17: 26, 21: 23, 33: [1, 25], 35: 24 }, { 17: 27, 21: 23, 33: [1, 25], 35: 24 }, { 17: 28, 21: 23, 33: [1, 25], 35: 24 }, { 21: 29, 33: [1, 25], 35: 24 }, { 1: [2, 1] }, { 6: 30, 8: 4, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 22: [1, 13], 23: [1, 14], 24: [1, 15] }, { 5: [2, 6], 14: [2, 6], 15: [2, 6], 16: [2, 6], 19: [2, 6], 20: [2, 6], 22: [2, 6], 23: [2, 6], 24: [2, 6] }, { 17: 22, 18: [1, 31], 21: 23, 33: [1, 25], 35: 24 }, { 10: 32, 20: [1, 33] }, { 10: 34, 20: [1, 33] }, { 18: [1, 35] }, { 18: [2, 24], 21: 40, 25: 36, 26: 37, 27: 38, 28: [1, 41], 29: [1, 42], 30: [1, 43], 31: 39, 32: 44, 33: [1, 45], 35: 24 }, { 18: [2, 38], 28: [2, 38], 29: [2, 38], 30: [2, 38], 33: [2, 38], 36: [1, 46] }, { 18: [2, 40], 28: [2, 40], 29: [2, 40], 30: [2, 40], 33: [2, 40], 36: [2, 40] }, { 18: [1, 47] }, { 18: [1, 48] }, { 18: [1, 49] }, { 18: [1, 50], 21: 51, 33: [1, 25], 35: 24 }, { 5: [2, 2], 8: 18, 9: 5, 11: 6, 12: 7, 13: 8, 14: [1, 9], 15: [1, 10], 16: [1, 12], 19: [1, 11], 20: [2, 2], 22: [1, 13], 23: [1, 14], 24: [1, 15] }, { 14: [2, 20], 15: [2, 20], 16: [2, 20], 19: [2, 20], 22: [2, 20], 23: [2, 20], 24: [2, 20] }, { 5: [2, 7], 14: [2, 7], 15: [2, 7], 16: [2, 7], 19: [2, 7], 20: [2, 7], 22: [2, 7], 23: [2, 7], 24: [2, 7] }, { 21: 52, 33: [1, 25], 35: 24 }, { 5: [2, 8], 14: [2, 8], 15: [2, 8], 16: [2, 8], 19: [2, 8], 20: [2, 8], 22: [2, 8], 23: [2, 8], 24: [2, 8] }, { 14: [2, 14], 15: [2, 14], 16: [2, 14], 19: [2, 14], 20: [2, 14], 22: [2, 14], 23: [2, 14], 24: [2, 14] }, { 18: [2, 22], 21: 40, 26: 53, 27: 54, 28: [1, 41], 29: [1, 42], 30: [1, 43], 31: 39, 32: 44, 33: [1, 45], 35: 24 }, { 18: [2, 23] }, { 18: [2, 26], 28: [2, 26], 29: [2, 26], 30: [2, 26], 33: [2, 26] }, { 18: [2, 31], 32: 55, 33: [1, 56] }, { 18: [2, 27], 28: [2, 27], 29: [2, 27], 30: [2, 27], 33: [2, 27] }, { 18: [2, 28], 28: [2, 28], 29: [2, 28], 30: [2, 28], 33: [2, 28] }, { 18: [2, 29], 28: [2, 29], 29: [2, 29], 30: [2, 29], 33: [2, 29] }, { 18: [2, 30], 28: [2, 30], 29: [2, 30], 30: [2, 30], 33: [2, 30] }, { 18: [2, 33], 33: [2, 33] }, { 18: [2, 40], 28: [2, 40], 29: [2, 40], 30: [2, 40], 33: [2, 40], 34: [1, 57], 36: [2, 40] }, { 33: [1, 58] }, { 14: [2, 13], 15: [2, 13], 16: [2, 13], 19: [2, 13], 20: [2, 13], 22: [2, 13], 23: [2, 13], 24: [2, 13] }, { 5: [2, 16], 14: [2, 16], 15: [2, 16], 16: [2, 16], 19: [2, 16], 20: [2, 16], 22: [2, 16], 23: [2, 16], 24: [2, 16] }, { 5: [2, 17], 14: [2, 17], 15: [2, 17], 16: [2, 17], 19: [2, 17], 20: [2, 17], 22: [2, 17], 23: [2, 17], 24: [2, 17] }, { 5: [2, 18], 14: [2, 18], 15: [2, 18], 16: [2, 18], 19: [2, 18], 20: [2, 18], 22: [2, 18], 23: [2, 18], 24: [2, 18] }, { 18: [1, 59] }, { 18: [1, 60] }, { 18: [2, 21] }, { 18: [2, 25], 28: [2, 25], 29: [2, 25], 30: [2, 25], 33: [2, 25] }, { 18: [2, 32], 33: [2, 32] }, { 34: [1, 57] }, { 21: 61, 28: [1, 62], 29: [1, 63], 30: [1, 64], 33: [1, 25], 35: 24 }, { 18: [2, 39], 28: [2, 39], 29: [2, 39], 30: [2, 39], 33: [2, 39], 36: [2, 39] }, { 5: [2, 19], 14: [2, 19], 15: [2, 19], 16: [2, 19], 19: [2, 19], 20: [2, 19], 22: [2, 19], 23: [2, 19], 24: [2, 19] }, { 5: [2, 15], 14: [2, 15], 15: [2, 15], 16: [2, 15], 19: [2, 15], 20: [2, 15], 22: [2, 15], 23: [2, 15], 24: [2, 15] }, { 18: [2, 34], 33: [2, 34] }, { 18: [2, 35], 33: [2, 35] }, { 18: [2, 36], 33: [2, 36] }, { 18: [2, 37], 33: [2, 37]}],
        defaultActions: { 16: [2, 1], 37: [2, 23], 53: [2, 21] },
        parseError: function parseError(str, hash) {
            throw new Error(str);
        },
        parse: function parse(input) {
            var self = this, stack = [0], vstack = [null], lstack = [], table = this.table, yytext = "", yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
            this.lexer.setInput(input);
            this.lexer.yy = this.yy;
            this.yy.lexer = this.lexer;
            if (typeof this.lexer.yylloc == "undefined")
                this.lexer.yylloc = {};
            var yyloc = this.lexer.yylloc;
            lstack.push(yyloc);
            if (typeof this.yy.parseError === "function")
                this.parseError = this.yy.parseError;
            function popStack(n) {
                stack.length = stack.length - 2 * n;
                vstack.length = vstack.length - n;
                lstack.length = lstack.length - n;
            }
            function lex() {
                var token;
                token = self.lexer.lex() || 1;
                if (typeof token !== "number") {
                    token = self.symbols_[token] || token;
                }
                return token;
            }
            var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
            while (true) {
                state = stack[stack.length - 1];
                if (this.defaultActions[state]) {
                    action = this.defaultActions[state];
                } else {
                    if (symbol == null)
                        symbol = lex();
                    action = table[state] && table[state][symbol];
                }
                if (typeof action === "undefined" || !action.length || !action[0]) {
                    if (!recovering) {
                        expected = [];
                        for (p in table[state])
                            if (this.terminals_[p] && p > 2) {
                                expected.push("'" + this.terminals_[p] + "'");
                            }
                        var errStr = "";
                        if (this.lexer.showPosition) {
                            errStr = "Parse error on line " + (yylineno + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + expected.join(", ") + ", got '" + this.terminals_[symbol] + "'";
                        } else {
                            errStr = "Parse error on line " + (yylineno + 1) + ": Unexpected " + (symbol == 1 ? "end of input" : "'" + (this.terminals_[symbol] || symbol) + "'");
                        }
                        this.parseError(errStr, { text: this.lexer.match, token: this.terminals_[symbol] || symbol, line: this.lexer.yylineno, loc: yyloc, expected: expected });
                    }
                }
                if (action[0] instanceof Array && action.length > 1) {
                    throw new Error("Parse Error: multiple actions possible at state: " + state + ", token: " + symbol);
                }
                switch (action[0]) {
                    case 1:
                        stack.push(symbol);
                        vstack.push(this.lexer.yytext);
                        lstack.push(this.lexer.yylloc);
                        stack.push(action[1]);
                        symbol = null;
                        if (!preErrorSymbol) {
                            yyleng = this.lexer.yyleng;
                            yytext = this.lexer.yytext;
                            yylineno = this.lexer.yylineno;
                            yyloc = this.lexer.yylloc;
                            if (recovering > 0)
                                recovering--;
                        } else {
                            symbol = preErrorSymbol;
                            preErrorSymbol = null;
                        }
                        break;
                    case 2:
                        len = this.productions_[action[1]][1];
                        yyval.$ = vstack[vstack.length - len];
                        yyval._$ = { first_line: lstack[lstack.length - (len || 1)].first_line, last_line: lstack[lstack.length - 1].last_line, first_column: lstack[lstack.length - (len || 1)].first_column, last_column: lstack[lstack.length - 1].last_column };
                        r = this.performAction.call(yyval, yytext, yyleng, yylineno, this.yy, action[1], vstack, lstack);
                        if (typeof r !== "undefined") {
                            return r;
                        }
                        if (len) {
                            stack = stack.slice(0, -1 * len * 2);
                            vstack = vstack.slice(0, -1 * len);
                            lstack = lstack.slice(0, -1 * len);
                        }
                        stack.push(this.productions_[action[1]][0]);
                        vstack.push(yyval.$);
                        lstack.push(yyval._$);
                        newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
                        stack.push(newState);
                        break;
                    case 3:
                        return true;
                }
            }
            return true;
        }
    }; /* Jison generated lexer */
    var lexer = (function () {

        var lexer = ({ EOF: 1,
            parseError: function parseError(str, hash) {
                if (this.yy.parseError) {
                    this.yy.parseError(str, hash);
                } else {
                    throw new Error(str);
                }
            },
            setInput: function (input) {
                this._input = input;
                this._more = this._less = this.done = false;
                this.yylineno = this.yyleng = 0;
                this.yytext = this.matched = this.match = '';
                this.conditionStack = ['INITIAL'];
                this.yylloc = { first_line: 1, first_column: 0, last_line: 1, last_column: 0 };
                return this;
            },
            input: function () {
                var ch = this._input[0];
                this.yytext += ch;
                this.yyleng++;
                this.match += ch;
                this.matched += ch;
                var lines = ch.match(/\n/);
                if (lines) this.yylineno++;
                this._input = this._input.slice(1);
                return ch;
            },
            unput: function (ch) {
                this._input = ch + this._input;
                return this;
            },
            more: function () {
                this._more = true;
                return this;
            },
            pastInput: function () {
                var past = this.matched.substr(0, this.matched.length - this.match.length);
                return (past.length > 20 ? '...' : '') + past.substr(-20).replace(/\n/g, "");
            },
            upcomingInput: function () {
                var next = this.match;
                if (next.length < 20) {
                    next += this._input.substr(0, 20 - next.length);
                }
                return (next.substr(0, 20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
            },
            showPosition: function () {
                var pre = this.pastInput();
                var c = new Array(pre.length + 1).join("-");
                return pre + this.upcomingInput() + "\n" + c + "^";
            },
            next: function () {
                if (this.done) {
                    return this.EOF;
                }
                if (!this._input) this.done = true;

                var token,
            match,
            col,
            lines;
                if (!this._more) {
                    this.yytext = '';
                    this.match = '';
                }
                var rules = this._currentRules();
                for (var i = 0; i < rules.length; i++) {
                    match = this._input.match(this.rules[rules[i]]);
                    if (match) {
                        lines = match[0].match(/\n.*/g);
                        if (lines) this.yylineno += lines.length;
                        this.yylloc = { first_line: this.yylloc.last_line,
                            last_line: this.yylineno + 1,
                            first_column: this.yylloc.last_column,
                            last_column: lines ? lines[lines.length - 1].length - 1 : this.yylloc.last_column + match[0].length
                        }
                        this.yytext += match[0];
                        this.match += match[0];
                        this.matches = match;
                        this.yyleng = this.yytext.length;
                        this._more = false;
                        this._input = this._input.slice(match[0].length);
                        this.matched += match[0];
                        token = this.performAction.call(this, this.yy, this, rules[i], this.conditionStack[this.conditionStack.length - 1]);
                        if (token) return token;
                        else return;
                    }
                }
                if (this._input === "") {
                    return this.EOF;
                } else {
                    this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(),
                    { text: "", token: null, line: this.yylineno });
                }
            },
            lex: function lex() {
                var r = this.next();
                if (typeof r !== 'undefined') {
                    return r;
                } else {
                    return this.lex();
                }
            },
            begin: function begin(condition) {
                this.conditionStack.push(condition);
            },
            popState: function popState() {
                return this.conditionStack.pop();
            },
            _currentRules: function _currentRules() {
                return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
            },
            topState: function () {
                return this.conditionStack[this.conditionStack.length - 2];
            },
            pushState: function begin(condition) {
                this.begin(condition);
            } 
        });
        lexer.performAction = function anonymous(yy, yy_, $avoiding_name_collisions, YY_START) {

            var YYSTATE = YY_START
            switch ($avoiding_name_collisions) {
                case 0:
                    if (yy_.yytext.slice(-1) !== "\\") this.begin("mu");
                    if (yy_.yytext.slice(-1) === "\\") yy_.yytext = yy_.yytext.substr(0, yy_.yyleng - 1), this.begin("emu");
                    if (yy_.yytext) return 14;

                    break;
                case 1: return 14;
                    break;
                case 2: this.popState(); return 14;
                    break;
                case 3: return 24;
                    break;
                case 4: return 16;
                    break;
                case 5: return 20;
                    break;
                case 6: return 19;
                    break;
                case 7: return 19;
                    break;
                case 8: return 23;
                    break;
                case 9: return 23;
                    break;
                case 10: yy_.yytext = yy_.yytext.substr(3, yy_.yyleng - 5); this.popState(); return 15;
                    break;
                case 11: return 22;
                    break;
                case 12: return 34;
                    break;
                case 13: return 33;
                    break;
                case 14: return 33;
                    break;
                case 15: return 36;
                    break;
                case 16: /*ignore whitespace*/
                    break;
                case 17: this.popState(); return 18;
                    break;
                case 18: this.popState(); return 18;
                    break;
                case 19: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2).replace(/\\"/g, '"'); return 28;
                    break;
                case 20: return 30;
                    break;
                case 21: return 30;
                    break;
                case 22: return 29;
                    break;
                case 23: return 33;
                    break;
                case 24: yy_.yytext = yy_.yytext.substr(1, yy_.yyleng - 2); return 33;
                    break;
                case 25: return 'INVALID';
                    break;
                case 26: return 5;
                    break;
            }
        };
        lexer.rules = [/^[^\x00]*?(?=(\{\{))/, /^[^\x00]+/, /^[^\x00]{2,}?(?=(\{\{))/, /^\{\{>/, /^\{\{#/, /^\{\{\//, /^\{\{\^/, /^\{\{\s*else\b/, /^\{\{\{/, /^\{\{&/, /^\{\{![\s\S]*?\}\}/, /^\{\{/, /^=/, /^\.(?=[} ])/, /^\.\./, /^[\/.]/, /^\s+/, /^\}\}\}/, /^\}\}/, /^"(\\["]|[^"])*"/, /^true(?=[}\s])/, /^false(?=[}\s])/, /^[0-9]+(?=[}\s])/, /^[a-zA-Z0-9_$-]+(?=[=}\s\/.])/, /^\[[^\]]*\]/, /^./, /^$/];
        lexer.conditions = { "mu": { "rules": [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26], "inclusive": false }, "emu": { "rules": [2], "inclusive": false }, "INITIAL": { "rules": [0, 1, 26], "inclusive": true} }; return lexer;
    })()
    parser.lexer = lexer;
    return parser;
})();
if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
    exports.parser = handlebars;
    exports.parse = function () { return handlebars.parse.apply(handlebars, arguments); }
    exports.main = function commonjsMain(args) {
        if (!args[1])
            throw new Error('Usage: ' + args[0] + ' FILE');
        if (typeof process !== 'undefined') {
            var source = require('fs').readFileSync(require('path').join(process.cwd(), args[1]), "utf8");
        } else {
            var cwd = require("file").path(require("file").cwd());
            var source = cwd.join(args[1]).read({ charset: "utf-8" });
        }
        return exports.parser.parse(source);
    }
    if (typeof module !== 'undefined' && require.main === module) {
        exports.main(typeof process !== 'undefined' ? process.argv.slice(1) : require("system").args);
    }
};
;
// lib/handlebars/compiler/base.js
Handlebars.Parser = handlebars;

Handlebars.parse = function (string) {
    Handlebars.Parser.yy = Handlebars.AST;
    return Handlebars.Parser.parse(string);
};

Handlebars.print = function (ast) {
    return new Handlebars.PrintVisitor().accept(ast);
};

Handlebars.logger = {
    DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, level: 3,

    // override in the host environment
    log: function (level, str) { }
};

Handlebars.log = function (level, str) { Handlebars.logger.log(level, str); };
;
// lib/handlebars/compiler/ast.js
(function () {

    Handlebars.AST = {};

    Handlebars.AST.ProgramNode = function (statements, inverse) {
        this.type = "program";
        this.statements = statements;
        if (inverse) { this.inverse = new Handlebars.AST.ProgramNode(inverse); }
    };

    Handlebars.AST.MustacheNode = function (params, hash, unescaped) {
        this.type = "mustache";
        this.id = params[0];
        this.params = params.slice(1);
        this.hash = hash;
        this.escaped = !unescaped;
    };

    Handlebars.AST.PartialNode = function (id, context) {
        this.type = "partial";

        // TODO: disallow complex IDs

        this.id = id;
        this.context = context;
    };

    var verifyMatch = function (open, close) {
        if (open.original !== close.original) {
            throw new Handlebars.Exception(open.original + " doesn't match " + close.original);
        }
    };

    Handlebars.AST.BlockNode = function (mustache, program, close) {
        verifyMatch(mustache.id, close);
        this.type = "block";
        this.mustache = mustache;
        this.program = program;
    };

    Handlebars.AST.InverseNode = function (mustache, program, close) {
        verifyMatch(mustache.id, close);
        this.type = "inverse";
        this.mustache = mustache;
        this.program = program;
    };

    Handlebars.AST.ContentNode = function (string) {
        this.type = "content";
        this.string = string;
    };

    Handlebars.AST.HashNode = function (pairs) {
        this.type = "hash";
        this.pairs = pairs;
    };

    Handlebars.AST.IdNode = function (parts) {
        this.type = "ID";
        this.original = parts.join(".");

        var dig = [], depth = 0;

        for (var i = 0, l = parts.length; i < l; i++) {
            var part = parts[i];

            if (part === "..") { depth++; }
            else if (part === "." || part === "this") { this.isScoped = true; }
            else { dig.push(part); }
        }

        this.parts = dig;
        this.string = dig.join('.');
        this.depth = depth;
        this.isSimple = (dig.length === 1) && (depth === 0);
    };

    Handlebars.AST.StringNode = function (string) {
        this.type = "STRING";
        this.string = string;
    };

    Handlebars.AST.IntegerNode = function (integer) {
        this.type = "INTEGER";
        this.integer = integer;
    };

    Handlebars.AST.BooleanNode = function (bool) {
        this.type = "BOOLEAN";
        this.bool = bool;
    };

    Handlebars.AST.CommentNode = function (comment) {
        this.type = "comment";
        this.comment = comment;
    };

})(); ;
// lib/handlebars/utils.js
Handlebars.Exception = function (message) {
    var tmp = Error.prototype.constructor.apply(this, arguments);

    for (var p in tmp) {
        if (tmp.hasOwnProperty(p)) { this[p] = tmp[p]; }
    }

    this.message = tmp.message;
};
Handlebars.Exception.prototype = new Error;

// Build out our basic SafeString type
Handlebars.SafeString = function (string) {
    this.string = string;
};
Handlebars.SafeString.prototype.toString = function () {
    return this.string.toString();
};

(function () {
    var escape = {
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#x27;",
        "`": "&#x60;"
    };

    var badChars = /&(?!\w+;)|[<>"'`]/g;
    var possible = /[&<>"'`]/;

    var escapeChar = function (chr) {
        return escape[chr] || "&amp;";
    };

    Handlebars.Utils = {
        escapeExpression: function (string) {
            // don't escape SafeStrings, since they're already safe
            if (string instanceof Handlebars.SafeString) {
                return string.toString();
            } else if (string == null || string === false) {
                return "";
            }

            if (!possible.test(string)) { return string; }
            return string.replace(badChars, escapeChar);
        },

        isEmpty: function (value) {
            if (typeof value === "undefined") {
                return true;
            } else if (value === null) {
                return true;
            } else if (value === false) {
                return true;
            } else if (Object.prototype.toString.call(value) === "[object Array]" && value.length === 0) {
                return true;
            } else {
                return false;
            }
        }
    };
})(); ;
// lib/handlebars/compiler/compiler.js
Handlebars.Compiler = function () { };
Handlebars.JavaScriptCompiler = function () { };

(function (Compiler, JavaScriptCompiler) {
    Compiler.OPCODE_MAP = {
        appendContent: 1,
        getContext: 2,
        lookupWithHelpers: 3,
        lookup: 4,
        append: 5,
        invokeMustache: 6,
        appendEscaped: 7,
        pushString: 8,
        truthyOrFallback: 9,
        functionOrFallback: 10,
        invokeProgram: 11,
        invokePartial: 12,
        push: 13,
        assignToHash: 15,
        pushStringParam: 16
    };

    Compiler.MULTI_PARAM_OPCODES = {
        appendContent: 1,
        getContext: 1,
        lookupWithHelpers: 2,
        lookup: 1,
        invokeMustache: 3,
        pushString: 1,
        truthyOrFallback: 1,
        functionOrFallback: 1,
        invokeProgram: 3,
        invokePartial: 1,
        push: 1,
        assignToHash: 1,
        pushStringParam: 1
    };

    Compiler.DISASSEMBLE_MAP = {};

    for (var prop in Compiler.OPCODE_MAP) {
        var value = Compiler.OPCODE_MAP[prop];
        Compiler.DISASSEMBLE_MAP[value] = prop;
    }

    Compiler.multiParamSize = function (code) {
        return Compiler.MULTI_PARAM_OPCODES[Compiler.DISASSEMBLE_MAP[code]];
    };

    Compiler.prototype = {
        compiler: Compiler,

        disassemble: function () {
            var opcodes = this.opcodes, opcode, nextCode;
            var out = [], str, name, value;

            for (var i = 0, l = opcodes.length; i < l; i++) {
                opcode = opcodes[i];

                if (opcode === 'DECLARE') {
                    name = opcodes[++i];
                    value = opcodes[++i];
                    out.push("DECLARE " + name + " = " + value);
                } else {
                    str = Compiler.DISASSEMBLE_MAP[opcode];

                    var extraParams = Compiler.multiParamSize(opcode);
                    var codes = [];

                    for (var j = 0; j < extraParams; j++) {
                        nextCode = opcodes[++i];

                        if (typeof nextCode === "string") {
                            nextCode = "\"" + nextCode.replace("\n", "\\n") + "\"";
                        }

                        codes.push(nextCode);
                    }

                    str = str + " " + codes.join(" ");

                    out.push(str);
                }
            }

            return out.join("\n");
        },

        guid: 0,

        compile: function (program, options) {
            this.children = [];
            this.depths = { list: [] };
            this.options = options;

            // These changes will propagate to the other compiler components
            var knownHelpers = this.options.knownHelpers;
            this.options.knownHelpers = {
                'helperMissing': true,
                'blockHelperMissing': true,
                'each': true,
                'if': true,
                'unless': true,
                'with': true,
                'log': true
            };
            if (knownHelpers) {
                for (var name in knownHelpers) {
                    this.options.knownHelpers[name] = knownHelpers[name];
                }
            }

            return this.program(program);
        },

        accept: function (node) {
            return this[node.type](node);
        },

        program: function (program) {
            var statements = program.statements, statement;
            this.opcodes = [];

            for (var i = 0, l = statements.length; i < l; i++) {
                statement = statements[i];
                this[statement.type](statement);
            }
            this.isSimple = l === 1;

            this.depths.list = this.depths.list.sort(function (a, b) {
                return a - b;
            });

            return this;
        },

        compileProgram: function (program) {
            var result = new this.compiler().compile(program, this.options);
            var guid = this.guid++;

            this.usePartial = this.usePartial || result.usePartial;

            this.children[guid] = result;

            for (var i = 0, l = result.depths.list.length; i < l; i++) {
                depth = result.depths.list[i];

                if (depth < 2) { continue; }
                else { this.addDepth(depth - 1); }
            }

            return guid;
        },

        block: function (block) {
            var mustache = block.mustache;
            var depth, child, inverse, inverseGuid;

            var params = this.setupStackForMustache(mustache);

            var programGuid = this.compileProgram(block.program);

            if (block.program.inverse) {
                inverseGuid = this.compileProgram(block.program.inverse);
                this.declare('inverse', inverseGuid);
            }

            this.opcode('invokeProgram', programGuid, params.length, !!mustache.hash);
            this.declare('inverse', null);
            this.opcode('append');
        },

        inverse: function (block) {
            var params = this.setupStackForMustache(block.mustache);

            var programGuid = this.compileProgram(block.program);

            this.declare('inverse', programGuid);

            this.opcode('invokeProgram', null, params.length, !!block.mustache.hash);
            this.declare('inverse', null);
            this.opcode('append');
        },

        hash: function (hash) {
            var pairs = hash.pairs, pair, val;

            this.opcode('push', '{}');

            for (var i = 0, l = pairs.length; i < l; i++) {
                pair = pairs[i];
                val = pair[1];

                this.accept(val);
                this.opcode('assignToHash', pair[0]);
            }
        },

        partial: function (partial) {
            var id = partial.id;
            this.usePartial = true;

            if (partial.context) {
                this.ID(partial.context);
            } else {
                this.opcode('push', 'depth0');
            }

            this.opcode('invokePartial', id.original);
            this.opcode('append');
        },

        content: function (content) {
            this.opcode('appendContent', content.string);
        },

        mustache: function (mustache) {
            var params = this.setupStackForMustache(mustache);

            this.opcode('invokeMustache', params.length, mustache.id.original, !!mustache.hash);

            if (mustache.escaped && !this.options.noEscape) {
                this.opcode('appendEscaped');
            } else {
                this.opcode('append');
            }
        },

        ID: function (id) {
            this.addDepth(id.depth);

            this.opcode('getContext', id.depth);

            this.opcode('lookupWithHelpers', id.parts[0] || null, id.isScoped || false);

            for (var i = 1, l = id.parts.length; i < l; i++) {
                this.opcode('lookup', id.parts[i]);
            }
        },

        STRING: function (string) {
            this.opcode('pushString', string.string);
        },

        INTEGER: function (integer) {
            this.opcode('push', integer.integer);
        },

        BOOLEAN: function (bool) {
            this.opcode('push', bool.bool);
        },

        comment: function () { },

        // HELPERS
        pushParams: function (params) {
            var i = params.length, param;

            while (i--) {
                param = params[i];

                if (this.options.stringParams) {
                    if (param.depth) {
                        this.addDepth(param.depth);
                    }

                    this.opcode('getContext', param.depth || 0);
                    this.opcode('pushStringParam', param.string);
                } else {
                    this[param.type](param);
                }
            }
        },

        opcode: function (name, val1, val2, val3) {
            this.opcodes.push(Compiler.OPCODE_MAP[name]);
            if (val1 !== undefined) { this.opcodes.push(val1); }
            if (val2 !== undefined) { this.opcodes.push(val2); }
            if (val3 !== undefined) { this.opcodes.push(val3); }
        },

        declare: function (name, value) {
            this.opcodes.push('DECLARE');
            this.opcodes.push(name);
            this.opcodes.push(value);
        },

        addDepth: function (depth) {
            if (depth === 0) { return; }

            if (!this.depths[depth]) {
                this.depths[depth] = true;
                this.depths.list.push(depth);
            }
        },

        setupStackForMustache: function (mustache) {
            var params = mustache.params;

            this.pushParams(params);

            if (mustache.hash) {
                this.hash(mustache.hash);
            }

            this.ID(mustache.id);

            return params;
        }
    };

    JavaScriptCompiler.prototype = {
        // PUBLIC API: You can override these methods in a subclass to provide
        // alternative compiled forms for name lookup and buffering semantics
        nameLookup: function (parent, name, type) {
            if (/^[0-9]+$/.test(name)) {
                return parent + "[" + name + "]";
            } else if (JavaScriptCompiler.isValidJavaScriptVariableName(name)) {
                return parent + "." + name;
            }
            else {
                return parent + "['" + name + "']";
            }
        },

        appendToBuffer: function (string) {
            if (this.environment.isSimple) {
                return "return " + string + ";";
            } else {
                return "buffer += " + string + ";";
            }
        },

        initializeBuffer: function () {
            return this.quotedString("");
        },

        namespace: "Handlebars",
        // END PUBLIC API

        compile: function (environment, options, context, asObject) {
            this.environment = environment;
            this.options = options || {};

            this.name = this.environment.name;
            this.isChild = !!context;
            this.context = context || {
                programs: [],
                aliases: { self: 'this' },
                registers: { list: [] }
            };

            this.preamble();

            this.stackSlot = 0;
            this.stackVars = [];

            this.compileChildren(environment, options);

            var opcodes = environment.opcodes, opcode;

            this.i = 0;

            for (l = opcodes.length; this.i < l; this.i++) {
                opcode = this.nextOpcode(0);

                if (opcode[0] === 'DECLARE') {
                    this.i = this.i + 2;
                    this[opcode[1]] = opcode[2];
                } else {
                    this.i = this.i + opcode[1].length;
                    this[opcode[0]].apply(this, opcode[1]);
                }
            }

            return this.createFunctionContext(asObject);
        },

        nextOpcode: function (n) {
            var opcodes = this.environment.opcodes, opcode = opcodes[this.i + n], name, val;
            var extraParams, codes;

            if (opcode === 'DECLARE') {
                name = opcodes[this.i + 1];
                val = opcodes[this.i + 2];
                return ['DECLARE', name, val];
            } else {
                name = Compiler.DISASSEMBLE_MAP[opcode];

                extraParams = Compiler.multiParamSize(opcode);
                codes = [];

                for (var j = 0; j < extraParams; j++) {
                    codes.push(opcodes[this.i + j + 1 + n]);
                }

                return [name, codes];
            }
        },

        eat: function (opcode) {
            this.i = this.i + opcode.length;
        },

        preamble: function () {
            var out = [];

            // this register will disambiguate helper lookup from finding a function in
            // a context. This is necessary for mustache compatibility, which requires
            // that context functions in blocks are evaluated by blockHelperMissing, and
            // then proceed as if the resulting value was provided to blockHelperMissing.
            this.useRegister('foundHelper');

            if (!this.isChild) {
                var namespace = this.namespace;
                var copies = "helpers = helpers || " + namespace + ".helpers;";
                if (this.environment.usePartial) { copies = copies + " partials = partials || " + namespace + ".partials;"; }
                out.push(copies);
            } else {
                out.push('');
            }

            if (!this.environment.isSimple) {
                out.push(", buffer = " + this.initializeBuffer());
            } else {
                out.push("");
            }

            // track the last context pushed into place to allow skipping the
            // getContext opcode when it would be a noop
            this.lastContext = 0;
            this.source = out;
        },

        createFunctionContext: function (asObject) {
            var locals = this.stackVars;
            if (!this.isChild) {
                locals = locals.concat(this.context.registers.list);
            }

            if (locals.length > 0) {
                this.source[1] = this.source[1] + ", " + locals.join(", ");
            }

            // Generate minimizer alias mappings
            if (!this.isChild) {
                var aliases = []
                for (var alias in this.context.aliases) {
                    this.source[1] = this.source[1] + ', ' + alias + '=' + this.context.aliases[alias];
                }
            }

            if (this.source[1]) {
                this.source[1] = "var " + this.source[1].substring(2) + ";";
            }

            // Merge children
            if (!this.isChild) {
                this.source[1] += '\n' + this.context.programs.join('\n') + '\n';
            }

            if (!this.environment.isSimple) {
                this.source.push("return buffer;");
            }

            var params = this.isChild ? ["depth0", "data"] : ["Handlebars", "depth0", "helpers", "partials", "data"];

            for (var i = 0, l = this.environment.depths.list.length; i < l; i++) {
                params.push("depth" + this.environment.depths.list[i]);
            }

            if (asObject) {
                params.push(this.source.join("\n  "));

                return Function.apply(this, params);
            } else {
                var functionSource = 'function ' + (this.name || '') + '(' + params.join(',') + ') {\n  ' + this.source.join("\n  ") + '}';
                Handlebars.log(Handlebars.logger.DEBUG, functionSource + "\n\n");
                return functionSource;
            }
        },

        appendContent: function (content) {
            this.source.push(this.appendToBuffer(this.quotedString(content)));
        },

        append: function () {
            var local = this.popStack();
            this.source.push("if(" + local + " || " + local + " === 0) { " + this.appendToBuffer(local) + " }");
            if (this.environment.isSimple) {
                this.source.push("else { " + this.appendToBuffer("''") + " }");
            }
        },

        appendEscaped: function () {
            var opcode = this.nextOpcode(1), extra = "";
            this.context.aliases.escapeExpression = 'this.escapeExpression';

            if (opcode[0] === 'appendContent') {
                extra = " + " + this.quotedString(opcode[1][0]);
                this.eat(opcode);
            }

            this.source.push(this.appendToBuffer("escapeExpression(" + this.popStack() + ")" + extra));
        },

        getContext: function (depth) {
            if (this.lastContext !== depth) {
                this.lastContext = depth;
            }
        },

        lookupWithHelpers: function (name, isScoped) {
            if (name) {
                var topStack = this.nextStack();

                this.usingKnownHelper = false;

                var toPush;
                if (!isScoped && this.options.knownHelpers[name]) {
                    toPush = topStack + " = " + this.nameLookup('helpers', name, 'helper');
                    this.usingKnownHelper = true;
                } else if (isScoped || this.options.knownHelpersOnly) {
                    toPush = topStack + " = " + this.nameLookup('depth' + this.lastContext, name, 'context');
                } else {
                    this.register('foundHelper', this.nameLookup('helpers', name, 'helper'));
                    toPush = topStack + " = foundHelper || " + this.nameLookup('depth' + this.lastContext, name, 'context');
                }

                toPush += ';';
                this.source.push(toPush);
            } else {
                this.pushStack('depth' + this.lastContext);
            }
        },

        lookup: function (name) {
            var topStack = this.topStack();
            this.source.push(topStack + " = (" + topStack + " === null || " + topStack + " === undefined || " + topStack + " === false ? " +
 				topStack + " : " + this.nameLookup(topStack, name, 'context') + ");");
        },

        pushStringParam: function (string) {
            this.pushStack('depth' + this.lastContext);
            this.pushString(string);
        },

        pushString: function (string) {
            this.pushStack(this.quotedString(string));
        },

        push: function (name) {
            this.pushStack(name);
        },

        invokeMustache: function (paramSize, original, hasHash) {
            this.populateParams(paramSize, this.quotedString(original), "{}", null, hasHash, function (nextStack, helperMissingString, id) {
                if (!this.usingKnownHelper) {
                    this.context.aliases.helperMissing = 'helpers.helperMissing';
                    this.context.aliases.undef = 'void 0';
                    this.source.push("else if(" + id + "=== undef) { " + nextStack + " = helperMissing.call(" + helperMissingString + "); }");
                    if (nextStack !== id) {
                        this.source.push("else { " + nextStack + " = " + id + "; }");
                    }
                }
            });
        },

        invokeProgram: function (guid, paramSize, hasHash) {
            var inverse = this.programExpression(this.inverse);
            var mainProgram = this.programExpression(guid);

            this.populateParams(paramSize, null, mainProgram, inverse, hasHash, function (nextStack, helperMissingString, id) {
                if (!this.usingKnownHelper) {
                    this.context.aliases.blockHelperMissing = 'helpers.blockHelperMissing';
                    this.source.push("else { " + nextStack + " = blockHelperMissing.call(" + helperMissingString + "); }");
                }
            });
        },

        populateParams: function (paramSize, helperId, program, inverse, hasHash, fn) {
            var needsRegister = hasHash || this.options.stringParams || inverse || this.options.data;
            var id = this.popStack(), nextStack;
            var params = [], param, stringParam, stringOptions;

            if (needsRegister) {
                this.register('tmp1', program);
                stringOptions = 'tmp1';
            } else {
                stringOptions = '{ hash: {} }';
            }

            if (needsRegister) {
                var hash = (hasHash ? this.popStack() : '{}');
                this.source.push('tmp1.hash = ' + hash + ';');
            }

            if (this.options.stringParams) {
                this.source.push('tmp1.contexts = [];');
            }

            for (var i = 0; i < paramSize; i++) {
                param = this.popStack();
                params.push(param);

                if (this.options.stringParams) {
                    this.source.push('tmp1.contexts.push(' + this.popStack() + ');');
                }
            }

            if (inverse) {
                this.source.push('tmp1.fn = tmp1;');
                this.source.push('tmp1.inverse = ' + inverse + ';');
            }

            if (this.options.data) {
                this.source.push('tmp1.data = data;');
            }

            params.push(stringOptions);

            this.populateCall(params, id, helperId || id, fn, program !== '{}');
        },

        populateCall: function (params, id, helperId, fn, program) {
            var paramString = ["depth0"].concat(params).join(", ");
            var helperMissingString = ["depth0"].concat(helperId).concat(params).join(", ");

            var nextStack = this.nextStack();

            if (this.usingKnownHelper) {
                this.source.push(nextStack + " = " + id + ".call(" + paramString + ");");
            } else {
                this.context.aliases.functionType = '"function"';
                var condition = program ? "foundHelper && " : ""
                this.source.push("if(" + condition + "typeof " + id + " === functionType) { " + nextStack + " = " + id + ".call(" + paramString + "); }");
            }
            fn.call(this, nextStack, helperMissingString, id);
            this.usingKnownHelper = false;
        },

        invokePartial: function (context) {
            params = [this.nameLookup('partials', context, 'partial'), "'" + context + "'", this.popStack(), "helpers", "partials"];

            if (this.options.data) {
                params.push("data");
            }

            this.pushStack("self.invokePartial(" + params.join(", ") + ");");
        },

        assignToHash: function (key) {
            var value = this.popStack();
            var hash = this.topStack();

            this.source.push(hash + "['" + key + "'] = " + value + ";");
        },

        // HELPERS

        compiler: JavaScriptCompiler,

        compileChildren: function (environment, options) {
            var children = environment.children, child, compiler;

            for (var i = 0, l = children.length; i < l; i++) {
                child = children[i];
                compiler = new this.compiler();

                this.context.programs.push('');     // Placeholder to prevent name conflicts for nested children
                var index = this.context.programs.length;
                child.index = index;
                child.name = 'program' + index;
                this.context.programs[index] = compiler.compile(child, options, this.context);
            }
        },

        programExpression: function (guid) {
            if (guid == null) { return "self.noop"; }

            var child = this.environment.children[guid],
          depths = child.depths.list;
            var programParams = [child.index, child.name, "data"];

            for (var i = 0, l = depths.length; i < l; i++) {
                depth = depths[i];

                if (depth === 1) { programParams.push("depth0"); }
                else { programParams.push("depth" + (depth - 1)); }
            }

            if (depths.length === 0) {
                return "self.program(" + programParams.join(", ") + ")";
            } else {
                programParams.shift();
                return "self.programWithDepth(" + programParams.join(", ") + ")";
            }
        },

        register: function (name, val) {
            this.useRegister(name);
            this.source.push(name + " = " + val + ";");
        },

        useRegister: function (name) {
            if (!this.context.registers[name]) {
                this.context.registers[name] = true;
                this.context.registers.list.push(name);
            }
        },

        pushStack: function (item) {
            this.source.push(this.nextStack() + " = " + item + ";");
            return "stack" + this.stackSlot;
        },

        nextStack: function () {
            this.stackSlot++;
            if (this.stackSlot > this.stackVars.length) { this.stackVars.push("stack" + this.stackSlot); }
            return "stack" + this.stackSlot;
        },

        popStack: function () {
            return "stack" + this.stackSlot--;
        },

        topStack: function () {
            return "stack" + this.stackSlot;
        },

        quotedString: function (str) {
            return '"' + str
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r') + '"';
        }
    };

    var reservedWords = (
    "break else new var" +
    " case finally return void" +
    " catch for switch while" +
    " continue function this with" +
    " default if throw" +
    " delete in try" +
    " do instanceof typeof" +
    " abstract enum int short" +
    " boolean export interface static" +
    " byte extends long super" +
    " char final native synchronized" +
    " class float package throws" +
    " const goto private transient" +
    " debugger implements protected volatile" +
    " double import public let yield"
  ).split(" ");

    var compilerWords = JavaScriptCompiler.RESERVED_WORDS = {};

    for (var i = 0, l = reservedWords.length; i < l; i++) {
        compilerWords[reservedWords[i]] = true;
    }

    JavaScriptCompiler.isValidJavaScriptVariableName = function (name) {
        if (!JavaScriptCompiler.RESERVED_WORDS[name] && /^[a-zA-Z_$][0-9a-zA-Z_$]+$/.test(name)) {
            return true;
        }
        return false;
    }

})(Handlebars.Compiler, Handlebars.JavaScriptCompiler);

Handlebars.precompile = function (string, options) {
    options = options || {};

    var ast = Handlebars.parse(string);
    var environment = new Handlebars.Compiler().compile(ast, options);
    return new Handlebars.JavaScriptCompiler().compile(environment, options);
};

Handlebars.compile = function (string, options) {
    options = options || {};

    var compiled;
    function compile() {
        var ast = Handlebars.parse(string);
        var environment = new Handlebars.Compiler().compile(ast, options);
        var templateSpec = new Handlebars.JavaScriptCompiler().compile(environment, options, undefined, true);
        return Handlebars.template(templateSpec);
    }

    // Template is only compiled on first use and cached after that point.
    return function (context, options) {
        if (!compiled) {
            compiled = compile();
        }
        return compiled.call(this, context, options);
    };
};
;
// lib/handlebars/runtime.js
Handlebars.VM = {
    template: function (templateSpec) {
        // Just add water
        var container = {
            escapeExpression: Handlebars.Utils.escapeExpression,
            invokePartial: Handlebars.VM.invokePartial,
            programs: [],
            program: function (i, fn, data) {
                var programWrapper = this.programs[i];
                if (data) {
                    return Handlebars.VM.program(fn, data);
                } else if (programWrapper) {
                    return programWrapper;
                } else {
                    programWrapper = this.programs[i] = Handlebars.VM.program(fn);
                    return programWrapper;
                }
            },
            programWithDepth: Handlebars.VM.programWithDepth,
            noop: Handlebars.VM.noop
        };

        return function (context, options) {
            options = options || {};
            return templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);
        };
    },

    programWithDepth: function (fn, data, $depth) {
        var args = Array.prototype.slice.call(arguments, 2);

        return function (context, options) {
            options = options || {};

            return fn.apply(this, [context, options.data || data].concat(args));
        };
    },
    program: function (fn, data) {
        return function (context, options) {
            options = options || {};

            return fn(context, options.data || data);
        };
    },
    noop: function () { return ""; },
    invokePartial: function (partial, name, context, helpers, partials, data) {
        options = { helpers: helpers, partials: partials, data: data };

        if (partial === undefined) {
            throw new Handlebars.Exception("The partial " + name + " could not be found");
        } else if (partial instanceof Function) {
            return partial(context, options);
        } else if (!Handlebars.compile) {
            throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
        } else {
            partials[name] = Handlebars.compile(partial);
            return partials[name](context, options);
        }
    }
};

Handlebars.template = Handlebars.VM.template;
;
;

// ==========================================================================
// Project:   Ember - JavaScript Application Framework
// Copyright: ©2011-2012 Tilde Inc. and contributors
//            Portions ©2006-2011 Strobe Inc.
//            Portions ©2008-2011 Apple Inc. All rights reserved.
// License:   Licensed under MIT license
//            See https://raw.github.com/emberjs/ember.js/master/LICENSE
// ==========================================================================


// Version: v1.0.0-pre.2
// Last commit: b851567 (2012-10-25 12:56:33 -0700)


(function () { "undefined" == typeof Ember && (Ember = {}); var a = Ember.imports = Ember.imports || this, b = Ember.exports = Ember.exports || this, c = Ember.lookup = Ember.lookup || this; b.Em = b.Ember = Em = Ember, Ember.isNamespace = !0, Ember.toString = function () { return "Ember" }, Ember.VERSION = "1.0.0-pre.2", Ember.ENV = Ember.ENV || ("undefined" == typeof ENV ? {} : ENV), Ember.config = Ember.config || {}, Ember.EXTEND_PROTOTYPES = Ember.ENV.EXTEND_PROTOTYPES, typeof Ember.EXTEND_PROTOTYPES == "undefined" && (Ember.EXTEND_PROTOTYPES = !0), Ember.LOG_STACKTRACE_ON_DEPRECATION = Ember.ENV.LOG_STACKTRACE_ON_DEPRECATION !== !1, Ember.SHIM_ES5 = Ember.ENV.SHIM_ES5 === !1 ? !1 : Ember.EXTEND_PROTOTYPES, Ember.K = function () { return this }, "undefined" == typeof Ember.assert && (Ember.assert = Ember.K), "undefined" == typeof Ember.warn && (Ember.warn = Ember.K), "undefined" == typeof Ember.deprecate && (Ember.deprecate = Ember.K), "undefined" == typeof Ember.deprecateFunc && (Ember.deprecateFunc = function (a, b) { return b }), "undefined" == typeof ember_assert && (b.ember_assert = Ember.K), "undefined" == typeof ember_warn && (b.ember_warn = Ember.K), "undefined" == typeof ember_deprecate && (b.ember_deprecate = Ember.K), "undefined" == typeof ember_deprecateFunc && (b.ember_deprecateFunc = function (a, b) { return b }), Ember.uuid = 0, Ember.Logger = a.console || { log: Ember.K, warn: Ember.K, error: Ember.K, info: Ember.K, debug: Ember.K }, Ember.onerror = null, Ember.handleErrors = function (a, b) { if ("function" != typeof Ember.onerror) return a.apply(b || this); try { return a.apply(b || this) } catch (c) { Ember.onerror(c) } } })(), function () { Ember.Instrumentation = {}; var a = [], b = {}, c = function (c) { var d = [], e; for (var f = 0, g = a.length; f < g; f++) e = a[f], e.regex.test(c) && d.push(e.object); return b[c] = d, d }, d = function () { var a = window.performance || {}, b = a.now || a.mozNow || a.webkitNow || a.msNow || a.oNow; return b ? b.bind(a) : function () { return +(new Date) } } (); Ember.Instrumentation.instrument = function (a, e, f, g) { var h = b[a]; h || (h = c(a)); if (h.length === 0) return f.call(g); var i = [], j, k, l, m; try { for (l = 0, m = h.length; l < m; l++) j = h[l], i[l] = j.before(a, d(), e); k = f.call(g) } catch (n) { e = e || {}, e.exception = n } finally { for (l = 0, m = h.length; l < m; l++) j = h[l], j.after(a, d(), e, i[l]) } return k }, Ember.Instrumentation.subscribe = function (c, d) { var e = c.split("."), f, g = []; for (var h = 0, i = e.length; h < i; h++) f = e[h], f === "*" ? g.push("[^\\.]*") : g.push(f); g = g.join("\\."), g += "(\\..*)?"; var j = { pattern: c, regex: new RegExp("^" + g + "$"), object: d }; return a.push(j), b = {}, j }, Ember.Instrumentation.unsubscribe = function (c) { var d; for (var e = 0, f = a.length; e < f; e++) a[e] === c && (d = e); a.splice(d, 1), b = {} }, Ember.Instrumentation.reset = function () { a = [], b = {} }, Ember.instrument = Ember.Instrumentation.instrument, Ember.subscribe = Ember.Instrumentation.subscribe } (), function () { var a = function (a) { return a && Function.prototype.toString.call(a).indexOf("[native code]") > -1 }, b = a(Array.prototype.map) ? Array.prototype.map : function (a) { if (this === void 0 || this === null) throw new TypeError; var b = Object(this), c = b.length >>> 0; if (typeof a != "function") throw new TypeError; var d = new Array(c), e = arguments[1]; for (var f = 0; f < c; f++) f in b && (d[f] = a.call(e, b[f], f, b)); return d }, c = a(Array.prototype.forEach) ? Array.prototype.forEach : function (a) { if (this === void 0 || this === null) throw new TypeError; var b = Object(this), c = b.length >>> 0; if (typeof a != "function") throw new TypeError; var d = arguments[1]; for (var e = 0; e < c; e++) e in b && a.call(d, b[e], e, b) }, d = a(Array.prototype.indexOf) ? Array.prototype.indexOf : function (a, b) { b === null || b === undefined ? b = 0 : b < 0 && (b = Math.max(0, this.length + b)); for (var c = b, d = this.length; c < d; c++) if (this[c] === a) return c; return -1 }; Ember.ArrayPolyfills = { map: b, forEach: c, indexOf: d }; var e = Ember.EnumerableUtils = { map: function (a, c, d) { return a.map ? a.map.call(a, c, d) : b.call(a, c, d) }, forEach: function (a, b, d) { return a.forEach ? a.forEach.call(a, b, d) : c.call(a, b, d) }, indexOf: function (a, b, c) { return a.indexOf ? a.indexOf.call(a, b, c) : d.call(a, b, c) }, indexesOf: function (a, b) { return b === undefined ? [] : e.map(b, function (b) { return e.indexOf(a, b) }) }, removeObject: function (a, b) { var c = e.indexOf(a, b); c !== -1 && a.splice(c, 1) }, replace: function (a, b, c, d) { if (a.replace) return a.replace(b, c, d); var e = Array.prototype.concat.apply([b, c], d); return a.splice.apply(a, e) } }; Ember.SHIM_ES5 && (Array.prototype.map || (Array.prototype.map = b), Array.prototype.forEach || (Array.prototype.forEach = c), Array.prototype.indexOf || (Array.prototype.indexOf = d)) } (), function () { var a = Ember.platform = {}; Ember.create = Object.create; if (!Ember.create) { var b = function () { }; Ember.create = function (a, c) { b.prototype = a, a = new b; if (c) { b.prototype = a; for (var d in c) b.prototype[d] = c[d].value; a = new b } return b.prototype = null, a }, Ember.create.isSimulated = !0 } var c = Object.defineProperty, d, e; if (c) try { c({}, "a", { get: function () { } }) } catch (f) { c = null } c && (d = function () { var a = {}; return c(a, "a", { configurable: !0, enumerable: !0, get: function () { }, set: function () { } }), c(a, "a", { configurable: !0, enumerable: !0, writable: !0, value: !0 }), a.a === !0 } (), e = function () { try { return c(document.createElement("div"), "definePropertyOnDOM", {}), !0 } catch (a) { } return !1 } (), d ? e || (c = function (a, b, c) { var d; return typeof Node == "object" ? d = a instanceof Node : d = typeof a == "object" && typeof a.nodeType == "number" && typeof a.nodeName == "string", d ? a[b] = c.value : Object.defineProperty(a, b, c) }) : c = null), a.defineProperty = c, a.hasPropertyAccessors = !0, a.defineProperty || (a.hasPropertyAccessors = !1, a.defineProperty = function (a, b, c) { c.get || (a[b] = c.value) }, a.defineProperty.isSimulated = !0), Ember.ENV.MANDATORY_SETTER && !a.hasPropertyAccessors && (Ember.ENV.MANDATORY_SETTER = !1) } (), function () { function m(a) { this.descs = {}, this.watching = {}, this.cache = {}, this.source = a } function n(a, b) { return !!a && typeof a[b] == "function" } var a = Ember.platform.defineProperty, b = Ember.create, c = "__ember" + +(new Date), d = 0, e = [], f = {}, g = Ember.ENV.MANDATORY_SETTER; Ember.GUID_KEY = c; var h = { writable: !1, configurable: !1, enumerable: !1, value: null }; Ember.generateGuid = function (e, f) { f || (f = "ember"); var g = f + d++; return e && (h.value = g, a(e, c, h)), g }, Ember.guidFor = function (g) { if (g === undefined) return "(undefined)"; if (g === null) return "(null)"; var i, j, k = typeof g; switch (k) { case "number": return j = e[g], j || (j = e[g] = "nu" + g), j; case "string": return j = f[g], j || (j = f[g] = "st" + d++), j; case "boolean": return g ? "(true)" : "(false)"; default: if (g[c]) return g[c]; if (g === Object) return "(Object)"; if (g === Array) return "(Array)"; return j = "ember" + d++, h.value = j, a(g, c, h), j } }; var i = { writable: !0, configurable: !1, enumerable: !1, value: null }, j = Ember.GUID_KEY + "_meta"; Ember.META_KEY = j; var k = { descs: {}, watching: {} }; g && (k.values = {}), Ember.EMPTY_META = k, Object.freeze && Object.freeze(k); var l = Ember.platform.defineProperty.isSimulated; l && (m.prototype.__preventPlainObject__ = !0), Ember.meta = function (d, e) { var f = d[j]; return e === !1 ? f || k : (f ? f.source !== d && (l || a(d, j, i), f = b(f), f.descs = b(f.descs), f.watching = b(f.watching), f.cache = {}, f.source = d, g && (f.values = b(f.values)), d[j] = f) : (l || a(d, j, i), f = new m(d), g && (f.values = {}), d[j] = f, f.descs.constructor = null), f) }, Ember.getMeta = function (b, c) { var d = Ember.meta(b, !1); return d[c] }, Ember.setMeta = function (b, c, d) { var e = Ember.meta(b, !0); return e[c] = d, d }, Ember.metaPath = function (c, d, e) { var f = Ember.meta(c, e), g, h; for (var i = 0, j = d.length; i < j; i++) { g = d[i], h = f[g]; if (!h) { if (!e) return undefined; h = f[g] = { __ember_source__: c} } else if (h.__ember_source__ !== c) { if (!e) return undefined; h = f[g] = b(h), h.__ember_source__ = c } f = h } return h }, Ember.wrap = function (a, b) { function c() { } var d = function () { var d, e = this._super; return this._super = b || c, d = a.apply(this, arguments), this._super = e, d }; return d.base = a, d }, Ember.isArray = function (a) { return !a || a.setInterval ? !1 : Array.isArray && Array.isArray(a) ? !0 : Ember.Array && Ember.Array.detect(a) ? !0 : a.length !== undefined && "object" == typeof a ? !0 : !1 }, Ember.makeArray = function (a) { return a === null || a === undefined ? [] : Ember.isArray(a) ? a : [a] }, Ember.canInvoke = n, Ember.tryInvoke = function (a, b, c) { if (n(a, b)) return a[b].apply(a, c || []) } } (), function () { var a = Ember.guidFor, b = Ember.ArrayPolyfills.indexOf, c = function (a) { var b = {}; for (var c in a) a.hasOwnProperty(c) && (b[c] = a[c]); return b }, d = function (a, b) { var d = a.keys.copy(), e = c(a.values); return b.keys = d, b.values = e, b }, e = Ember.OrderedSet = function () { this.clear() }; e.create = function () { return new e }, e.prototype = { clear: function () { this.presenceSet = {}, this.list = [] }, add: function (b) { var c = a(b), d = this.presenceSet, e = this.list; if (c in d) return; d[c] = !0, e.push(b) }, remove: function (c) { var d = a(c), e = this.presenceSet, f = this.list; delete e[d]; var g = b.call(f, c); g > -1 && f.splice(g, 1) }, isEmpty: function () { return this.list.length === 0 }, has: function (b) { var c = a(b), d = this.presenceSet; return c in d }, forEach: function (a, b) { var c = this.list.slice(); for (var d = 0, e = c.length; d < e; d++) a.call(b, c[d]) }, toArray: function () { return this.list.slice() }, copy: function () { var a = new e; return a.presenceSet = c(this.presenceSet), a.list = this.list.slice(), a } }; var f = Ember.Map = function () { this.keys = Ember.OrderedSet.create(), this.values = {} }; f.create = function () { return new f }, f.prototype = { get: function (b) { var c = this.values, d = a(b); return c[d] }, set: function (b, c) { var d = this.keys, e = this.values, f = a(b); d.add(b), e[f] = c }, remove: function (b) { var c = this.keys, d = this.values, e = a(b), f; return d.hasOwnProperty(e) ? (c.remove(b), f = d[e], delete d[e], !0) : !1 }, has: function (b) { var c = this.values, d = a(b); return c.hasOwnProperty(d) }, forEach: function (b, c) { var d = this.keys, e = this.values; d.forEach(function (d) { var f = a(d); b.call(c, d, e[f]) }) }, copy: function () { return d(this, new f) } }; var g = Ember.MapWithDefault = function (a) { f.call(this), this.defaultValue = a.defaultValue }; g.create = function (a) { return a ? new g(a) : new f }, g.prototype = Ember.create(f.prototype), g.prototype.get = function (a) { var b = this.has(a); if (b) return f.prototype.get.call(this, a); var c = this.defaultValue(a); return this.set(a, c), c }, g.prototype.copy = function () { return d(this, new g({ defaultValue: this.defaultValue })) } } (), function () { function i(a) { return a.match(h)[0] } function j(a, c) { var d = g.test(c), e = !d && f.test(c), h; if (!a || e) a = Ember.lookup; d && (c = c.slice(5)), a === Ember.lookup && (h = i(c), a = b(a, h), c = c.slice(h.length + 1)); if (!c || c.length === 0) throw new Error("Invalid Path"); return [a, c] } function k(a, c) { var d, e, f, h, i; if (a === null && c.indexOf(".") === -1) return b(Ember.lookup, c); d = g.test(c); if (!a || d) f = j(a, c), a = f[0], c = f[1], f.length = 0; e = c.split("."), i = e.length; for (h = 0; a && h < i; h++) { a = b(a, e[h], !0); if (a && a.isDestroyed) return undefined } return a } function l(a, b, d, e) { var f; f = b.slice(b.lastIndexOf(".") + 1), b = b.slice(0, b.length - (f.length + 1)), b !== "this" && (a = k(a, b)); if (!f || f.length === 0) throw new Error("You passed an empty path"); if (!a) { if (e) return; throw new Error("Object in path " + b + " could not be found or was destroyed.") } return c(a, f, d) } var a = Ember.META_KEY, b, c, d = Ember.ENV.MANDATORY_SETTER, e = /^([A-Z$]|([0-9][A-Z$]))/, f = /^([A-Z$]|([0-9][A-Z$])).*[\.\*]/, g = /^this[\.\*]/, h = /^([^\.\*]+)/; b = function (c, e) { if (e === "") return c; !e && "string" == typeof c && (e = c, c = null); if (!c || e.indexOf(".") !== -1) return k(c, e); var f = c[a], g = f && f.descs[e], h; return g ? g.get(c, e) : (d && f && f.watching[e] > 0 ? h = f.values[e] : h = c[e], h !== undefined || "object" != typeof c || e in c || "function" != typeof c.unknownProperty ? h : c.unknownProperty(e)) }, c = function (c, e, f, g) { typeof c == "string" && (f = e, e = c, c = null); if (!c || e.indexOf(".") !== -1) return l(c, e, f, g); var h = c[a], i = h && h.descs[e], j, k; return i ? i.set(c, e, f) : (j = "object" == typeof c && !(e in c), j && "function" == typeof c.setUnknownProperty ? c.setUnknownProperty(e, f) : h && h.watching[e] > 0 ? (d ? k = h.values[e] : k = c[e], f !== k && (Ember.propertyWillChange(c, e), d ? k !== undefined || e in c ? h.values[e] = f : Ember.defineProperty(c, e, null, f) : c[e] = f, Ember.propertyDidChange(c, e))) : c[e] = f), f }, Ember.config.overrideAccessors && (Ember.get = b, Ember.set = c, Ember.config.overrideAccessors(), b = Ember.get, c = Ember.set), Ember.normalizeTuple = function (a, b) { return j(a, b) }, Ember.getWithDefault = function (a, c, d) { var e = b(a, c); return e === undefined ? d : e }, Ember.get = b, Ember.getPath = Ember.deprecateFunc("getPath is deprecated since get now supports paths", Ember.get), Ember.set = c, Ember.setPath = Ember.deprecateFunc("setPath is deprecated since set now supports paths", Ember.set), Ember.trySet = function (a, b, d) { return c(a, b, d, !0) }, Ember.trySetPath = Ember.deprecateFunc("trySetPath has been renamed to trySet", Ember.trySet), Ember.isGlobalPath = function (a) { return e.test(a) } } (), function () { var a = Ember.GUID_KEY, b = Ember.META_KEY, c = Ember.EMPTY_META, d = Ember.meta, e = Ember.create, f = Ember.platform.defineProperty, g = Ember.ENV.MANDATORY_SETTER, h = Ember.Descriptor = function () { }; Ember.defineProperty = function (a, c, e, h, i) { var j, k, l, m; return i || (i = d(a)), j = i.descs, k = i.descs[c], l = i.watching[c] > 0, k instanceof Ember.Descriptor && k.teardown(a, c), e instanceof Ember.Descriptor ? (m = e, j[c] = e, g && l ? f(a, c, { configurable: !0, enumerable: !0, writable: !0, value: undefined }) : a[c] = undefined, e.setup(a, c)) : (j[c] = undefined, e == null ? (m = h, g && l ? (i.values[c] = h, f(a, c, { configurable: !0, enumerable: !0, set: function () { }, get: function () { var a = this[b]; return a && a.values[c] } })) : a[c] = h) : (m = e, f(a, c, e))), l && Ember.overrideChains(a, c, i), a.didDefineProperty && a.didDefineProperty(a, c, m), this } } (), function () { function e() { this.clear() } function h(b) { return b + a } function i(a) { return a + b } var a = ":change", b = ":before", c = Ember.guidFor, d = 0; e.prototype.add = function (a, b, c) { var d = this.observerSet, e = this.observers, f = Ember.guidFor(a), g = d[f], h; return g || (d[f] = g = {}), h = g[b], h === undefined && (h = e.push({ sender: a, keyName: b, eventName: c, listeners: {} }) - 1, g[b] = h), e[h].listeners }, e.prototype.flush = function () { var a = this.observers, b, c, d, e; this.clear(); for (b = 0, c = a.length; b < c; ++b) { d = a[b], e = d.sender; if (e.isDestroyed) continue; Ember.sendEvent(e, d.eventName, [e, d.keyName], d.listeners) } }, e.prototype.clear = function () { this.observerSet = {}, this.observers = [] }; var f = new e, g = new e; Ember.beginPropertyChanges = function () { d++ }, Ember.endPropertyChanges = function () { d--, d <= 0 && (f.clear(), g.flush()) }, Ember.changeProperties = function (a, b) { Ember.beginPropertyChanges(); try { a.call(b) } finally { Ember.endPropertyChanges() } }, Ember.setProperties = function (a, b) { return Ember.changeProperties(function () { for (var c in b) b.hasOwnProperty(c) && Ember.set(a, c, b[c]) }), a }, Ember.addObserver = function (a, b, c, d) { return Ember.addListener(a, h(b), c, d), Ember.watch(a, b), this }, Ember.observersFor = function (a, b) { return Ember.listenersFor(a, h(b)) }, Ember.removeObserver = function (a, b, c, d) { return Ember.unwatch(a, b), Ember.removeListener(a, h(b), c, d), this }, Ember.addBeforeObserver = function (a, b, c, d) { return Ember.addListener(a, i(b), c, d), Ember.watch(a, b), this }, Ember._suspendBeforeObserver = function (a, b, c, d, e) { return Ember._suspendListener(a, i(b), c, d, e) }, Ember._suspendObserver = function (a, b, c, d, e) { return Ember._suspendListener(a, h(b), c, d, e) }; var j = Ember.ArrayPolyfills.map; Ember._suspendBeforeObservers = function (a, b, c, d, e) { var f = j.call(b, i); return Ember._suspendListeners(a, f, c, d, e) }, Ember._suspendObservers = function (a, b, c, d, e) { var f = j.call(b, h); return Ember._suspendListeners(a, f, c, d, e) }, Ember.beforeObserversFor = function (a, b) { return Ember.listenersFor(a, i(b)) }, Ember.removeBeforeObserver = function (a, b, c, d) { return Ember.unwatch(a, b), Ember.removeListener(a, i(b), c, d), this }, Ember.notifyBeforeObservers = function (a, b) { if (a.isDestroying) return; var c = i(b), e, g; d ? (e = f.add(a, b, c), g = Ember.listenersDiff(a, c, e), Ember.sendEvent(a, c, [a, b], g)) : Ember.sendEvent(a, c, [a, b]) }, Ember.notifyObservers = function (a, b) { if (a.isDestroying) return; var c = h(b), e; d ? (e = g.add(a, b, c), Ember.listenersUnion(a, c, e)) : Ember.sendEvent(a, c, [a, b]) } } (), function () { function n(a) { return a.match(j)[0] } function o(a) { return a === "*" || !k.test(a) } function q(b, c, d, e, f) { var g = a(c); e[g] || (e[g] = {}); if (e[g][d]) return; e[g][d] = !0; var h = f.deps; h = h && h[d]; if (h) for (var i in h) { if (p[i]) continue; var j = f.descs[i]; if (j && j._suspended === c) continue; b(c, i) } } function t(a, b, c) { if (a.isDestroying) return; var d = r, e = !d; e && (d = r = {}), q(G, a, b, d, c), e && (r = null) } function u(a, b, c) { if (a.isDestroying) return; var d = s, e = !d; e && (d = s = {}), q(H, a, b, d, c), e && (s = null) } function v(c, d, e) { if (!c || "object" != typeof c) return; var f = b(c), g = f.chainWatchers; if (!g || g.__emberproto__ !== c) g = f.chainWatchers = { __emberproto__: c }; g[d] || (g[d] = {}), g[d][a(e)] = e, Ember.watch(c, d) } function w(c, d, e) { if (!c || "object" != typeof c) return; var f = b(c, !1), g = f.chainWatchers; if (!g || g.__emberproto__ !== c) return; g[d] && delete g[d][a(e)], Ember.unwatch(c, d) } function y() { if (x.length === 0) return; var a = x; x = [], i.call(a, function (a) { a[0].add(a[1]) }) } function z(a) { return b(a, !1).proto === a } function C(a) { var c = b(a), d = c.chains; return d ? d.value() !== a && (d = c.chains = d.copy(a)) : d = c.chains = new A(null, null, a), d } function D(a, b, c, d, e) { var f = b.chainWatchers; if (!f || f.__emberproto__ !== a) return; f = f[c]; if (!f) return; for (var g in f) { if (!f.hasOwnProperty(g)) continue; f[g][d](e) } } function E(a, b, c) { D(a, c, b, "willChange") } function F(a, b, c) { D(a, c, b, "didChange") } function G(a, c, d) { var e = b(a, !1), f = e.watching[c] > 0 || c === "length", g = e.proto, h = e.descs[c]; if (!f) return; if (g === a) return; h && h.willChange && h.willChange(a, c), t(a, c, e), E(a, c, e), Ember.notifyBeforeObservers(a, c) } function H(a, c) { var d = b(a, !1), e = d.watching[c] > 0 || c === "length", f = d.proto, g = d.descs[c]; if (f === a) return; g && g.didChange && g.didChange(a, c); if (!e && c !== "length") return; u(a, c, d), F(a, c, d), Ember.notifyObservers(a, c) } var a = Ember.guidFor, b = Ember.meta, c = Ember.get, d = Ember.set, e = Ember.normalizeTuple, f = Ember.GUID_KEY, g = Ember.META_KEY, h = Ember.notifyObservers, i = Ember.ArrayPolyfills.forEach, j = /^([^\.\*]+)/, k = /[\.\*]/, l = Ember.ENV.MANDATORY_SETTER, m = Ember.platform.defineProperty, p = { __emberproto__: !0 }, r, s, x = [], A = function (a, b, c, d) { var e; this._parent = a, this._key = b, this._watching = c === undefined, this._value = c, this._separator = d || ".", this._paths = {}, this._watching && (this._object = a.value(), this._object && v(this._object, this._key, this)), this._parent && this._parent._key === "@each" && this.value() }, B = A.prototype; B.value = function () { if (this._value === undefined && this._watching) { var a = this._parent.value(); this._value = a && !z(a) ? c(a, this._key) : undefined } return this._value }, B.destroy = function () { if (this._watching) { var a = this._object; a && w(a, this._key, this), this._watching = !1 } }, B.copy = function (a) { var b = new A(null, null, a, this._separator), c = this._paths, d; for (d in c) { if (c[d] <= 0) continue; b.add(d) } return b }, B.add = function (a) { var b, c, d, f, g, h; h = this._paths, h[a] = (h[a] || 0) + 1, b = this.value(), c = e(b, a); if (c[0] && c[0] === b) a = c[1], d = n(a), a = a.slice(d.length + 1); else { if (!c[0]) { x.push([this, a]), c.length = 0; return } f = c[0], d = a.slice(0, 0 - (c[1].length + 1)), g = a.slice(d.length, d.length + 1), a = c[1] } c.length = 0, this.chain(d, a, f, g) }, B.remove = function (a) { var b, c, d, f, g; g = this._paths, g[a] > 0 && g[a]--, b = this.value(), c = e(b, a), c[0] === b ? (a = c[1], d = n(a), a = a.slice(d.length + 1)) : (f = c[0], d = a.slice(0, 0 - (c[1].length + 1)), a = c[1]), c.length = 0, this.unchain(d, a) }, B.count = 0, B.chain = function (a, b, c, d) { var e = this._chains, f; e || (e = this._chains = {}), f = e[a], f || (f = e[a] = new A(this, a, c, d)), f.count++, b && b.length > 0 && (a = n(b), b = b.slice(a.length + 1), f.chain(a, b)) }, B.unchain = function (a, b) { var c = this._chains, d = c[a]; b && b.length > 1 && (a = n(b), b = b.slice(a.length + 1), d.unchain(a, b)), d.count--, d.count <= 0 && (delete c[d._key], d.destroy()) }, B.willChange = function () { var a = this._chains; if (a) for (var b in a) { if (!a.hasOwnProperty(b)) continue; a[b].willChange() } this._parent && this._parent.chainWillChange(this, this._key, 1) }, B.chainWillChange = function (a, b, c) { this._key && (b = this._key + this._separator + b), this._parent ? this._parent.chainWillChange(this, b, c + 1) : (c > 1 && Ember.propertyWillChange(this.value(), b), b = "this." + b, this._paths[b] > 0 && Ember.propertyWillChange(this.value(), b)) }, B.chainDidChange = function (a, b, c) { this._key && (b = this._key + this._separator + b), this._parent ? this._parent.chainDidChange(this, b, c + 1) : (c > 1 && Ember.propertyDidChange(this.value(), b), b = "this." + b, this._paths[b] > 0 && Ember.propertyDidChange(this.value(), b)) }, B.didChange = function (a) { if (this._watching) { var b = this._parent.value(); b !== this._object && (w(this._object, this._key, this), this._object = b, v(b, this._key, this)), this._value = undefined, this._parent && this._parent._key === "@each" && this.value() } var c = this._chains; if (c) for (var d in c) { if (!c.hasOwnProperty(d)) continue; c[d].didChange(a) } if (a) return; this._parent && this._parent.chainDidChange(this, this._key, 1) }, Ember.overrideChains = function (a, b, c) { D(a, c, b, "didChange", !0) }, Ember.watch = function (a, c) { if (c === "length" && Ember.typeOf(a) === "array") return this; var d = b(a), e = d.watching, f; return e[c] ? e[c] = (e[c] || 0) + 1 : (e[c] = 1, o(c) ? (f = d.descs[c], f && f.willWatch && f.willWatch(a, c), "function" == typeof a.willWatchProperty && a.willWatchProperty(c), l && c in a && (d.values[c] = a[c], m(a, c, { configurable: !0, enumerable: !0, set: function () { }, get: function () { var a = this[g]; return a && a.values[c] } }))) : C(a).add(c)), this }, Ember.isWatching = function (b, c) { var d = b[g]; return (d && d.watching[c]) > 0 }, Ember.watch.flushPending = y, Ember.unwatch = function (a, c) { if (c === "length" && Ember.typeOf(a) === "array") return this; var d = b(a), e = d.watching, f; return e[c] === 1 ? (e[c] = 0, o(c) ? (f = d.descs[c], f && f.didUnwatch && f.didUnwatch(a, c), "function" == typeof a.didUnwatchProperty && a.didUnwatchProperty(c), l && c in a && (m(a, c, { configurable: !0, enumerable: !0, writable: !0, value: d.values[c] }), delete d.values[c])) : C(a).remove(c)) : e[c] > 1 && e[c]--, this }, Ember.rewatch = function (a) { var c = b(a, !1), d = c.chains; return f in a && !a.hasOwnProperty(f) && Ember.generateGuid(a, "ember"), d && d.value() !== a && (c.chains = d.copy(a)), this }, Ember.finishChains = function (a) { var c = b(a, !1), d = c.chains; d && (d.value() !== a && (c.chains = d = d.copy(a)), d.didChange(!0)) }, Ember.propertyWillChange = G, Ember.propertyDidChange = H; var I = []; Ember.destroy = function (a) { var b = a[g], c, d, e, f; if (b) { a[g] = null, c = b.chains; if (c) { I.push(c); while (I.length > 0) { c = I.pop(), d = c._chains; if (d) for (e in d) d.hasOwnProperty(e) && I.push(d[e]); c._watching && (f = c._object, f && w(f, c._key, c)) } } } } } (), function () { function i(a, b, c) { var d = b[c]; return d ? d.__emberproto__ !== a && (d = b[c] = e(d), d.__emberproto__ = a) : d = b[c] = { __emberproto__: a }, d } function j(a, b) { var c = b.deps; return c ? c.__emberproto__ !== a && (c = b.deps = e(c), c.__emberproto__ = a) : c = b.deps = { __emberproto__: a }, c } function k(a, b, c, d) { var e = a._dependentKeys, f, h, k, l, m; if (!e) return; f = j(b, d); for (h = 0, k = e.length; h < k; h++) l = e[h], m = i(b, f, l), m[c] = (m[c] || 0) + 1, g(b, l) } function l(a, b, c, d) { var e = a._dependentKeys, f, g, k, l, m; if (!e) return; f = j(b, d); for (g = 0, k = e.length; g < k; g++) l = e[g], m = i(b, f, l), m[c] = (m[c] || 0) - 1, h(b, l) } function m(a, b) { this.func = a, this._cacheable = b && b.cacheable !== undefined ? b.cacheable : !0, this._dependentKeys = b && b.dependentKeys } var a = Ember.get, b = Ember.meta, c = Ember.guidFor, d = [].slice, e = Ember.create, f = Ember.META_KEY, g = Ember.watch, h = Ember.unwatch; Ember.ComputedProperty = m, m.prototype = new Ember.Descriptor; var n = m.prototype; n.cacheable = function (a) { return this._cacheable = a !== !1, this }, n.volatile = function () { return this.cacheable(!1) }, n.property = function () { var a = []; for (var b = 0, c = arguments.length; b < c; b++) a.push(arguments[b]); return this._dependentKeys = a, this }, n.meta = function (a) { return arguments.length === 0 ? this._meta || {} : (this._meta = a, this) }, n.willWatch = function (a, b) { var c = a[f]; b in c.cache || k(this, a, b, c) }, n.didUnwatch = function (a, b) { var c = a[f]; b in c.cache || l(this, a, b, c) }, n.didChange = function (a, c) { if (this._cacheable && this._suspended !== a) { var d = b(a); c in d.cache && (delete d.cache[c], d.watching[c] || l(this, a, c, d)) } }, n.get = function (a, c) { var d, e, f; if (this._cacheable) { f = b(a), e = f.cache; if (c in e) return e[c]; d = e[c] = this.func.call(a, c), f.watching[c] || k(this, a, c, f) } else d = this.func.call(a, c); return d }, n.set = function (a, c, d) { var e = this._cacheable, f = b(a, e), g = f.watching[c], h = this._suspended, i = !1, j; this._suspended = a; try { j = this.func.call(a, c, d); if (e && c in f.cache) { if (f.cache[c] === j) return; i = !0 } g && Ember.propertyWillChange(a, c), e && i && delete f.cache[c], e && (!g && !i && k(this, a, c, f), f.cache[c] = j), g && Ember.propertyDidChange(a, c) } finally { this._suspended = h } return j }, n.setup = function (a, c) { var d = a[f]; d && d.watching[c] && k(this, a, c, b(a)) }, n.teardown = function (a, c) { var d = b(a); return (d.watching[c] || c in d.cache) && l(this, a, c, d), this._cacheable && delete d.cache[c], null }, Ember.computed = function (a) { var b; arguments.length > 1 && (b = d.call(arguments, 0, -1), a = d.call(arguments, -1)[0]); var c = new m(a); return b && c.property.apply(c, b), c }, Ember.cacheFor = function (c, d) { var e = b(c, !1).cache; if (e && d in e) return e[d] }, Ember.computed.not = function (b) { return Ember.computed(b, function (c) { return !a(this, b) }) }, Ember.computed.empty = function (b) { return Ember.computed(b, function (c) { var d = a(this, b); return d === undefined || d === null || d === "" || Ember.isArray(d) && a(d, "length") === 0 }) }, Ember.computed.bool = function (b) { return Ember.computed(b, function (c) { return !!a(this, b) }) } } (), function () { function f(a, b, e, f) { return c(a, ["listeners", b, d(e)], f) } function g(a, c) { var d = b(a, !1).listeners; return d ? d[c] || !1 : !1 } function i(a, b) { if (!a) return !1; for (var c in a) { if (h[c]) continue; var d = a[c]; if (d) for (var e in d) { if (h[e]) continue; var f = d[e]; if (f && b(f) === !0) return !0 } } return !1 } function j(a, b, c) { var d = a.method, e = a.target; e || (e = c), "string" == typeof d && (d = e[d]), b ? d.apply(e, b) : d.apply(e) } function k(a, b, c) { i(g(a, b), function (a) { var b = d(a.target), e = d(a.method), f = c[b]; f || (f = c[b] = {}), f[e] = a }) } function l(a, b, c) { var e = {}; return i(g(a, b), function (a) { var b = d(a.target), f = d(a.method), g = c[b], h = e[b]; g || (g = c[b] = {}); if (g[f]) return; g[f] = a, h || (h = e[b] = {}), h[f] = a }), e } function m(a, b, c, e, g) { !e && "function" == typeof c && (e = c, c = null); var h = f(a, b, c, !0), i = g || d(e); h[i] || (h[i] = { target: c, method: e }), "function" == typeof a.didAddListener && a.didAddListener(b, c, e) } function n(a, b, c, e) { function h(c, e) { var g = f(a, b, c, !0), h = d(e); g && g[h] && (g[h] = null), "function" == typeof a.didRemoveListener && a.didRemoveListener(b, c, e) } !e && "function" == typeof c && (e = c, c = null), e ? h(c, e) : i(g(a, b), function (a) { h(a.target, a.method) }) } function o(a, b, c, e, g) { !e && "function" == typeof c && (e = c, c = null); var h = f(a, b, c, !0), i = d(e), j = h && h[i]; h[i] = null; try { return g.call(c) } finally { h[i] = j } } function p(a, b, c, e, g) { !e && "function" == typeof c && (e = c, c = null); var h = [], i = [], j, k, l, m, n, o; for (n = 0, o = b.length; n < o; n++) j = b[n], k = f(a, j, c, !0), l = d(e), h.push(k && k[l]), i.push(k), k[l] = null; try { return g.call(c) } finally { for (n = 0, o = h.length; n < o; n++) j = b[n], i[n][l] = h[n] } } function q(a) { var c = b(a, !1).listeners, d = []; if (c) for (var e in c) !h[e] && c[e] && d.push(e); return d } function r(a, b, c, d) { return a !== Ember && "function" == typeof a.sendEvent && a.sendEvent(b, c), d || (d = g(a, b)), i(d, function (b) { j(b, c, a) }), !0 } function s(a, b) { if (i(g(a, b), function () { return !0 })) return !0; var d = c(a, ["listeners"], !0); return d[b] = null, !1 } function t(a, b) { var c = []; return i(g(a, b), function (a) { c.push([a.target, a.method]) }), c } var a = Ember.create, b = Ember.meta, c = Ember.metaPath, d = Ember.guidFor, e = [].slice, h = { __ember_source__: !0 }; Ember.addListener = m, Ember.removeListener = n, Ember._suspendListener = o, Ember._suspendListeners = p, Ember.sendEvent = r, Ember.hasListeners = s, Ember.watchedEvents = q, Ember.listenersFor = t, Ember.listenersDiff = l, Ember.listenersUnion = k } (), function () { function c(b, c, d, e) { return c === undefined && (c = b, b = undefined), "string" == typeof c && (c = b[c]), d && e > 0 && (d = d.length > e ? a.call(d, e) : null), Ember.handleErrors(function () { return c.apply(b || this, d || []) }, this) } function h() { g = null, f.currentRunLoop && f.end() } function k() { j = null; var a = +(new Date), b = -1; for (var d in i) { if (!i.hasOwnProperty(d)) continue; var e = i[d]; if (e && e.expires) if (a >= e.expires) delete i[d], c(e.target, e.method, e.args, 2); else if (b < 0 || e.expires < b) b = e.expires } b > 0 && (j = setTimeout(k, b - +(new Date))) } function l(a, b) { b[this.tguid] && delete b[this.tguid][this.mguid], i[a] && c(this.target, this.method, this.args), delete i[a] } function m(a, b, c, d) { var e = Ember.guidFor(b), g = Ember.guidFor(c), h = f.autorun().onceTimers, j = h[e] && h[e][g], k; return j && i[j] ? i[j].args = d : (k = { target: b, method: c, args: d, tguid: e, mguid: g }, j = Ember.guidFor(k), i[j] = k, h[e] || (h[e] = {}), h[e][g] = j, f.schedule(a, k, l, j, h)), j } function o() { n = null; for (var a in i) { if (!i.hasOwnProperty(a)) continue; var b = i[a]; b.next && (delete i[a], c(b.target, b.method, b.args, 2)) } } var a = [].slice, b = Ember.ArrayPolyfills.forEach, d, e = function (a) { this._prev = a || null, this.onceTimers = {} }; e.prototype = { end: function () { this.flush() }, prev: function () { return this._prev }, schedule: function (b, c, d) { var e = this._queues, f; e || (e = this._queues = {}), f = e[b], f || (f = e[b] = []); var g = arguments.length > 3 ? a.call(arguments, 3) : null; return f.push({ target: c, method: d, args: g }), this }, flush: function (a) { function j(a) { c(a.target, a.method, a.args) } var e, f, g, h, i; if (!this._queues) return this; Ember.watch.flushPending(); if (a) while (this._queues && (h = this._queues[a])) { this._queues[a] = null; if (a === "sync") { i = Ember.LOG_BINDINGS, i && Ember.Logger.log("Begin: Flush Sync Queue"), Ember.beginPropertyChanges(); try { b.call(h, j) } finally { Ember.endPropertyChanges() } i && Ember.Logger.log("End: Flush Sync Queue") } else b.call(h, j) } else { e = Ember.run.queues, g = e.length, f = 0; a: while (f < g) { a = e[f], h = this._queues && this._queues[a], delete this._queues[a]; if (h) if (a === "sync") { i = Ember.LOG_BINDINGS, i && Ember.Logger.log("Begin: Flush Sync Queue"), Ember.beginPropertyChanges(); try { b.call(h, j) } finally { Ember.endPropertyChanges() } i && Ember.Logger.log("End: Flush Sync Queue") } else b.call(h, j); for (var k = 0; k <= f; k++) if (this._queues && this._queues[e[k]]) { f = k; continue a } f++ } } return d = null, this } }, Ember.RunLoop = e, Ember.run = function (a, b) { var d, e; f.begin(); try { if (a || b) d = c(a, b, arguments, 2) } finally { f.end() } return d }; var f = Ember.run; Ember.run.begin = function () { f.currentRunLoop = new e(f.currentRunLoop) }, Ember.run.end = function () { try { f.currentRunLoop.end() } finally { f.currentRunLoop = f.currentRunLoop.prev() } }, Ember.run.queues = ["sync", "actions", "destroy", "timers"], Ember.run.schedule = function (a, b, c) { var d = f.autorun(); d.schedule.apply(d, arguments) }; var g; Ember.run.hasScheduledTimers = function () { return !!(g || j || n) }, Ember.run.cancelTimers = function () { g && (clearTimeout(g), g = null), j && (clearTimeout(j), j = null), n && (clearTimeout(n), n = null), i = {} }, Ember.run.autorun = function () { return f.currentRunLoop || (f.begin(), g || (g = setTimeout(h, 1))), f.currentRunLoop }, Ember.run.sync = function () { f.autorun(), f.currentRunLoop.flush("sync") }; var i = {}, j; Ember.run.later = function (b, c) { var d, e, g, h, j; return arguments.length === 2 && "function" == typeof b ? (j = c, c = b, b = undefined, d = [b, c]) : (d = a.call(arguments), j = d.pop()), e = +(new Date) + j, g = { target: b, method: c, expires: e, args: d }, h = Ember.guidFor(g), i[h] = g, f.once(i, k), h }, Ember.run.once = function (b, c) { return m("actions", b, c, a.call(arguments, 2)) }, Ember.run.scheduleOnce = function (b, c, d, e) { return m(b, c, d, a.call(arguments, 3)) }; var n; Ember.run.next = function (b, c) { var d, e = { target: b, method: c, args: a.call(arguments), next: !0 }; return d = Ember.guidFor(e), i[d] = e, n || (n = setTimeout(o, 1)), d }, Ember.run.cancel = function (a) { delete i[a] } } (), function () { function e(b, c) { return a(d(c) ? Ember.lookup : b, c) } function g(a, b) { for (var c in b) b.hasOwnProperty(c) && (a[c] = b[c]) } Ember.LOG_BINDINGS = !!Ember.ENV.LOG_BINDINGS; var a = Ember.get, b = Ember.set, c = Ember.guidFor, d = Ember.isGlobalPath, f = function (a, b) { this._direction = "fwd", this._from = b, this._to = a, this._directionMap = Ember.Map.create() }; f.prototype = { copy: function () { var a = new f(this._to, this._from); return this._oneWay && (a._oneWay = !0), a }, from: function (a) { return this._from = a, this }, to: function (a) { return this._to = a, this }, oneWay: function () { return this._oneWay = !0, this }, toString: function () { var a = this._oneWay ? "[oneWay]" : ""; return "Ember.Binding<" + c(this) + ">(" + this._from + " -> " + this._to + ")" + a }, connect: function (a) { var b = this._from, c = this._to; return Ember.trySet(a, c, e(a, b)), Ember.addObserver(a, b, this, this.fromDidChange), this._oneWay || Ember.addObserver(a, c, this, this.toDidChange), this._readyToSync = !0, this }, disconnect: function (a) { var b = !this._oneWay; return Ember.removeObserver(a, this._from, this, this.fromDidChange), b && Ember.removeObserver(a, this._to, this, this.toDidChange), this._readyToSync = !1, this }, fromDidChange: function (a) { this._scheduleSync(a, "fwd") }, toDidChange: function (a) { this._scheduleSync(a, "back") }, _scheduleSync: function (a, b) { var c = this._directionMap, d = c.get(a); d || (Ember.run.schedule("sync", this, this._sync, a), c.set(a, b)), d === "back" && b === "fwd" && c.set(a, "fwd") }, _sync: function (b) { var c = Ember.LOG_BINDINGS; if (b.isDestroyed || !this._readyToSync) return; var d = this._directionMap, f = d.get(b), g = this._from, h = this._to; d.remove(b); if (f === "fwd") { var i = e(b, this._from); c && Ember.Logger.log(" ", this.toString(), "->", i, b), this._oneWay ? Ember.trySet(b, h, i) : Ember._suspendObserver(b, h, this, this.toDidChange, function () { Ember.trySet(b, h, i) }) } else if (f === "back") { var j = a(b, this._to); c && Ember.Logger.log(" ", this.toString(), "<-", j, b), Ember._suspendObserver(b, g, this, this.fromDidChange, function () { Ember.trySet(Ember.isGlobalPath(g) ? Ember.lookup : b, g, j) }) } } }, g(f, { from: function () { var a = this, b = new a; return b.from.apply(b, arguments) }, to: function () { var a = this, b = new a; return b.to.apply(b, arguments) }, oneWay: function (a, b) { var c = this, d = new c(null, a); return d.oneWay(b) } }), Ember.Binding = f, Ember.bind = function (a, b, c) { return (new Ember.Binding(b, c)).connect(a) }, Ember.oneWay = function (a, b, c) { return (new Ember.Binding(b, c)).oneWay().connect(a) } } (), function () {
    function o(a) { var b = Ember.meta(a, !0), c = b.mixins; return c ? c.__emberproto__ !== a && (c = b.mixins = l(c), c.__emberproto__ = a) : c = b.mixins = { __emberproto__: a }, c } function p(b, c) { return c && c.length > 0 && (b.mixins = f.call(c, function (b) { if (b instanceof a) return b; var c = new a; return c.properties = b, c })), b } function q(a) { return "function" == typeof a && a.isMethod !== !1 && a !== Boolean && a !== Object && a !== Number && a !== Array && a !== Date && a !== String } function r(c, d, e, f, i) {
        function v(a) { delete e[a], delete f[a] } var j = c.length, k, l, m, o, p, s, t, u; for (k = 0; k < j; k++) {
            l = c[k]; if (l instanceof a) { m = n(l); if (d[m]) continue; d[m] = l, o = l.properties } else o = l; if (o) {
                u = f.concatenatedProperties ||
    i.concatenatedProperties, o.concatenatedProperties && (u = u ? u.concat(o.concatenatedProperties) : o.concatenatedProperties); for (s in o) { if (!o.hasOwnProperty(s)) continue; p = o[s]; if (p instanceof Ember.Descriptor) { if (p === b && e[s]) continue; e[s] = p, f[s] = undefined } else { if (q(p)) { t = e[s] === undefined && f[s], t || (t = i[s]), "function" != typeof t && (t = null); if (t) { var w = p.__ember_observes__, x = p.__ember_observesBefore__; p = Ember.wrap(p, t), p.__ember_observes__ = w, p.__ember_observesBefore__ = x } } else if (u && g.call(u, s) >= 0 || s === "concatenatedProperties") { var y = f[s] || i[s]; y ? "function" == typeof y.concat ? p = y.concat(p) : p = Ember.makeArray(y).concat(p) : p = Ember.makeArray(p) } e[s] = undefined, f[s] = p } } o.hasOwnProperty("toString") && (i.toString = o.toString)
            } else l.mixins && (r(l.mixins, d, e, f, i), l._without && h.call(l._without, v))
        } 
    } function s(a) { var b = Ember.meta(a), c = b.required; if (!c || c.__emberproto__ !== a) c = b.required = c ? l(c) : { __ember_count__: 0 }, c.__emberproto__ = a; return c } function u(a, b, c, d) { if (t.test(b)) { var e = d.bindings; e ? e.__emberproto__ !== a && (e = d.bindings = l(d.bindings), e.__emberproto__ = a) : e = d.bindings = { __emberproto__: a }, e[b] = c } } function v(a, b) { var c = b.bindings, d, e, f; if (c) { for (d in c) e = d !== "__emberproto__" && c[d], e && (f = d.slice(0, -7), e instanceof Ember.Binding ? (e = e.copy(), e.to(f)) : e = new Ember.Binding(f, e), e.connect(a), a[d] = e); b.bindings = { __emberproto__: a} } } function w(a, b) { return v(a, b || Ember.meta(a)), a } function x(a, d, e) { var f = {}, g = {}, h = Ember.meta(a), i = h.required, j, l, n, p, q, t, v; r(d, o(a), f, g, a); for (j in g) { if (j === "contructor") continue; if (!g.hasOwnProperty(j)) continue; n = f[j], l = g[j]; if (n === b) j in a || (i = s(a), i.__ember_count__++, i[j] = !0); else { while (n && n instanceof c) { var x = n.methodName; f[x] || g[x] ? (l = g[x], n = f[x]) : h.descs[x] ? (n = h.descs[x], l = undefined) : (n = undefined, l = a[x]) } if (n === undefined && l === undefined) continue; p = a[j]; if ("function" == typeof p) if (q = p.__ember_observesBefore__) { t = q.length; for (v = 0; v < t; v++) Ember.removeBeforeObserver(a, q[v], null, j) } else if (q = p.__ember_observes__) { t = q.length; for (v = 0; v < t; v++) Ember.removeObserver(a, q[v], null, j) } u(a, j, l, h), m(a, j, n, l, h); if ("function" == typeof l) if (q = l.__ember_observesBefore__) { t = q.length; for (v = 0; v < t; v++) Ember.addBeforeObserver(a, q[v], null, j) } else if (q = l.__ember_observes__) { t = q.length; for (v = 0; v < t; v++) Ember.addObserver(a, q[v], null, j) } i && i[j] && (i = s(a), i.__ember_count__--, i[j] = !1) } } e || w(a, h); if (!e && i && i.__ember_count__ > 0) { var y = []; for (j in i) { if (k[j]) continue; y.push(j) } } return a } function z(a, b, c) { var d = n(a); if (c[d]) return !1; c[d] = !0; if (a === b) return !0; var e = a.mixins, f = e ? e.length : 0; while (--f >= 0) if (z(e[f], b, c)) return !0; return !1 } function A(a, b, c) { if (c[n(b)]) return; c[n(b)] = !0; if (b.properties) { var d = b.properties; for (var e in d) d.hasOwnProperty(e) && (a[e] = !0) } else b.mixins && h.call(b.mixins, function (b) { A(a, b, c) }) } function D(a, b, c) { var e = a.length; for (var f in b) { if (!b.hasOwnProperty || !b.hasOwnProperty(f)) continue; var g = b[f]; a[e] = f; if (g && g.toString === d) g[B] = a.join("."); else if (g && C(g, "isNamespace")) { if (c[n(g)]) continue; c[n(g)] = !0, D(a, g, c) } } a.length = e } function E() { var a = Ember.Namespace, b = Ember.lookup, c, d; if (a.PROCESSED) return; for (var e in b) { if (e === "globalStorage" && b.StorageList && b.globalStorage instanceof b.StorageList) continue; if (b.hasOwnProperty && !b.hasOwnProperty(e)) continue; try { c = Ember.lookup[e], d = c && C(c, "isNamespace") } catch (f) { continue } d && (c[B] = e) } } var a, b, c, d, e, f = Ember.ArrayPolyfills.map, g = Ember.ArrayPolyfills.indexOf, h = Ember.ArrayPolyfills.forEach, i = [].slice, j = {}, k = { __emberproto__: !0, __ember_count__: !0 }, l = Ember.create, m = Ember.defineProperty, n = Ember.guidFor, t = Ember.IS_BINDING = /^.+Binding$/; Ember.mixin = function (a) { var b = i.call(arguments, 1); return x(a, b, !1), a }, Ember.Mixin = function () { return p(this, arguments) }, a = Ember.Mixin, a._apply = x, a.applyPartial = function (a) { var b = i.call(arguments, 1); return x(a, b, !0) }, a.finishPartial = w, a.create = function () { d.processed = !1; var a = this; return p(new a, arguments) }; var y = a.prototype; y.reopen = function () { var b, c; this.properties ? (b = a.create(), b.properties = this.properties, delete this.properties, this.mixins = [b]) : this.mixins || (this.mixins = []); var d = arguments.length, e = this.mixins, f; for (f = 0; f < d; f++) b = arguments[f], b instanceof a ? e.push(b) : (c = a.create(), c.properties = b, e.push(c)); return this }, y.apply = function (a) { return x(a, [this], !1) }, y.applyPartial = function (a) { return x(a, [this], !0) }, y.detect = function (b) { if (!b) return !1; if (b instanceof a) return z(b, this, {}); var c = Ember.meta(b, !1).mixins; return c ? !!c[n(this)] : !1 }, y.without = function () { var b = new a(this); return b._without = i.call(arguments), b }, y.keys = function () { var a = {}, b = {}, c = []; A(a, this, b); for (var d in a) a.hasOwnProperty(d) && c.push(d); return c }; var B = Ember.GUID_KEY + "_name", C = Ember.get; Ember.identifyNamespaces = E, e = function (a) { var b = a.superclass; if (b) return b[B] ? b[B] : e(b); return }, d = function () { var a = Ember.Namespace, b; if (a && !this[B] && !d.processed) { a.PROCESSED || (E(), a.PROCESSED = !0), d.processed = !0; var c = a.NAMESPACES; for (var f = 0, g = c.length; f < g; f++) b = c[f], D([b.toString()], b, {}) } if (this[B]) return this[B]; var h = e(this); return h ? "(subclass of " + h + ")" : "(unknown mixin)" }, y.toString = d, a.mixins = function (a) { var b = [], c = Ember.meta(a, !1).mixins, d, e; if (c) for (d in c) { if (k[d]) continue; e = c[d], e.properties || b.push(c[d]) } return b }, b = new Ember.Descriptor, b.toString = function () { return "(Required Property)" }, Ember.required = function () { return b }, c = function (a) { this.methodName = a }, c.prototype = new Ember.Descriptor, Ember.alias = function (a) { return new c(a) }, Ember.observer = function (a) { var b = i.call(arguments, 1); return a.__ember_observes__ = b, a }, Ember.immediateObserver = function () { for (var a = 0, b = arguments.length; a < b; a++) var c = arguments[a]; return Ember.observer.apply(this, arguments) }, Ember.beforeObserver = function (a) { var b = i.call(arguments, 1); return a.__ember_observesBefore__ = b, a } 
} (), function () { } (), function () { (function (a) { "use strict"; var b = typeof window != "undefined" ? window : {}, c = b.MutationObserver || b.WebKitMutationObserver, d; if (typeof process != "undefined") d = function (a, b) { process.nextTick(function () { a.call(b) }) }; else if (c) { var e = [], f = new c(function () { var a = e.slice(); e = [], a.forEach(function (a) { var b = a[0], c = a[1]; b.call(c) }) }), g = document.createElement("div"); f.observe(g, { attributes: !0 }), d = function (a, b) { e.push([a, b]), g.setAttribute("drainQueue", "drainQueue") } } else d = function (a, b) { setTimeout(function () { a.call(b) }, 1) }; a.async = d; var h = a.Event = function (a, b) { this.type = a; for (var c in b) { if (!b.hasOwnProperty(c)) continue; this[c] = b[c] } }, i = function (a, b) { for (var c = 0, d = a.length; c < d; c++) if (a[c][0] === b) return c; return -1 }, j = function (a) { var b = a._promiseCallbacks; return b || (b = a._promiseCallbacks = {}), b }, k = a.EventTarget = { mixin: function (a) { return a.on = this.on, a.off = this.off, a.trigger = this.trigger, a }, on: function (a, b, c) { var d = j(this), e; c = c || this, e = d[a], e || (e = d[a] = []), i(e, b) === -1 && e.push([b, c]) }, off: function (a, b) { var c = j(this), d; if (!b) { c[a] = []; return } d = c[a]; var e = i(d, b); e !== -1 && d.splice(e, 1) }, trigger: function (a, b) { var c = j(this), d, e, f, g, i; if (d = c[a]) for (var k = 0, l = d.length; k < l; k++) e = d[k], f = e[0], g = e[1], typeof b != "object" && (b = { detail: b }), i = new h(a, b), f.call(g, i) } }, l = a.Promise = function () { this.on("promise:resolved", function (a) { this.trigger("success", { detail: a.detail }) }, this), this.on("promise:failed", function (a) { this.trigger("error", { detail: a.detail }) }, this) }, m = function () { }, n = function (a, b, c, d) { var e, f; if (c) try { e = c(d.detail) } catch (g) { f = g } else e = d.detail; e instanceof l ? e.then(function (a) { b.resolve(a) }, function (a) { b.reject(a) }) : c && e ? b.resolve(e) : f ? b.reject(f) : b[a](e) }; l.prototype = { then: function (a, b) { var c = new l; return this.on("promise:resolved", function (b) { n("resolve", c, a, b) }), this.on("promise:failed", function (a) { n("reject", c, b, a) }), c }, resolve: function (b) { a.async(function () { this.trigger("promise:resolved", { detail: b }), this.isResolved = b }, this), this.resolve = m, this.reject = m }, reject: function (b) { a.async(function () { this.trigger("promise:failed", { detail: b }), this.isRejected = b }, this), this.resolve = m, this.reject = m } }, k.mixin(l.prototype) })(window.RSVP = {}) } (), function () { function e(b, c, d, f) { var g, h, i; if ("object" != typeof b || b === null) return b; if (c && (h = a(d, b)) >= 0) return f[h]; if (Ember.typeOf(b) === "array") { g = b.slice(); if (c) { h = g.length; while (--h >= 0) g[h] = e(g[h], c, d, f) } } else if (Ember.Copyable && Ember.Copyable.detect(b)) g = b.copy(c, d, f); else { g = {}; for (i in b) { if (!b.hasOwnProperty(i)) continue; g[i] = c ? e(b[i], c, d, f) : b[i] } } return c && (d.push(b), f.push(g)), g } var a = Ember.EnumerableUtils.indexOf, b = {}, c = "Boolean Number String Function Array Date RegExp Object".split(" "); Ember.ArrayPolyfills.forEach.call(c, function (a) { b["[object " + a + "]"] = a.toLowerCase() }); var d = Object.prototype.toString; Ember.typeOf = function (a) { var c; return c = a === null || a === undefined ? String(a) : b[d.call(a)] || "object", c === "function" ? Ember.Object && Ember.Object.detect(a) && (c = "class") : c === "object" && (a instanceof Error ? c = "error" : Ember.Object && a instanceof Ember.Object ? c = "instance" : c = "object"), c }, Ember.none = function (a) { return a === null || a === undefined }, Ember.empty = function (a) { return a === null || a === undefined || a.length === 0 && typeof a != "function" || typeof a == "object" && Ember.get(a, "length") === 0 }, Ember.compare = function g(a, b) { if (a === b) return 0; var c = Ember.typeOf(a), d = Ember.typeOf(b), e = Ember.Comparable; if (e) { if (c === "instance" && e.detect(a.constructor)) return a.constructor.compare(a, b); if (d === "instance" && e.detect(b.constructor)) return 1 - b.constructor.compare(b, a) } var f = Ember.ORDER_DEFINITION_MAPPING; if (!f) { var h = Ember.ORDER_DEFINITION; f = Ember.ORDER_DEFINITION_MAPPING = {}; var i, j; for (i = 0, j = h.length; i < j; ++i) f[h[i]] = i; delete Ember.ORDER_DEFINITION } var k = f[c], l = f[d]; if (k < l) return -1; if (k > l) return 1; switch (c) { case "boolean": case "number": if (a < b) return -1; if (a > b) return 1; return 0; case "string": var m = a.localeCompare(b); if (m < 0) return -1; if (m > 0) return 1; return 0; case "array": var n = a.length, o = b.length, p = Math.min(n, o), q = 0, r = 0; while (q === 0 && r < p) q = g(a[r], b[r]), r++; if (q !== 0) return q; if (n < o) return -1; if (n > o) return 1; return 0; case "instance": if (Ember.Comparable && Ember.Comparable.detect(a)) return a.compare(a, b); return 0; case "date": var s = a.getTime(), t = b.getTime(); if (s < t) return -1; if (s > t) return 1; return 0; default: return 0 } }, Ember.copy = function (a, b) { return "object" != typeof a || a === null ? a : Ember.Copyable && Ember.Copyable.detect(a) ? a.copy(b) : e(a, b, b ? [] : null, b ? [] : null) }, Ember.inspect = function (a) { var b, c = []; for (var d in a) if (a.hasOwnProperty(d)) { b = a[d]; if (b === "toString") continue; Ember.typeOf(b) === "function" && (b = "function() { ... }"), c.push(d + ": " + b) } return "{" + c.join(" , ") + "}" }, Ember.isEqual = function (a, b) { return a && "function" == typeof a.isEqual ? a.isEqual(b) : a === b }, Ember.ORDER_DEFINITION = Ember.ENV.ORDER_DEFINITION || ["undefined", "null", "boolean", "number", "string", "array", "object", "instance", "function", "class", "date"], Ember.keys = Object.keys, Ember.keys || (Ember.keys = function (a) { var b = []; for (var c in a) a.hasOwnProperty(c) && b.push(c); return b }); var f = ["description", "fileName", "lineNumber", "message", "name", "number", "stack"]; Ember.Error = function () { var a = Error.prototype.constructor.apply(this, arguments); for (var b = 0; b < f.length; b++) this[f[b]] = a[f[b]] }, Ember.Error.prototype = Ember.create(Error.prototype) } (), function () { var a = /[ _]/g, b = {}, c = /([a-z])([A-Z])/g, d = /(\-|_|\s)+(.)?/g, e = /([a-z\d])([A-Z]+)/g, f = /\-|\s+/g; Ember.STRINGS = {}, Ember.String = { fmt: function (a, b) { var c = 0; return a.replace(/%@([0-9]+)?/g, function (a, d) { return d = d ? parseInt(d, 0) - 1 : c++, a = b[d], (a === null ? "(null)" : a === undefined ? "" : a).toString() }) }, loc: function (a, b) { return a = Ember.STRINGS[a] || a, Ember.String.fmt(a, b) }, w: function (a) { return a.split(/\s+/) }, decamelize: function (a) { return a.replace(c, "$1_$2").toLowerCase() }, dasherize: function (c) { var d = b, e = d[c]; return e ? e : (e = Ember.String.decamelize(c).replace(a, "-"), d[c] = e, e) }, camelize: function (a) { return a.replace(d, function (a, b, c) { return c ? c.toUpperCase() : "" }) }, classify: function (a) { var b = Ember.String.camelize(a); return b.charAt(0).toUpperCase() + b.substr(1) }, underscore: function (a) { return a.replace(e, "$1_$2").replace(f, "_").toLowerCase() } } } (), function () { var a = Ember.String.fmt, b = Ember.String.w, c = Ember.String.loc, d = Ember.String.camelize, e = Ember.String.decamelize, f = Ember.String.dasherize, g = Ember.String.underscore, h = Ember.String.classify; if (Ember.EXTEND_PROTOTYPES === !0 || Ember.EXTEND_PROTOTYPES.String) String.prototype.fmt = function () { return a(this, arguments) }, String.prototype.w = function () { return b(this) }, String.prototype.loc = function () { return c(this, arguments) }, String.prototype.camelize = function () { return d(this) }, String.prototype.decamelize = function () { return e(this) }, String.prototype.dasherize = function () { return f(this) }, String.prototype.underscore = function () { return g(this) }, String.prototype.classify = function () { return h(this) } } (), function () { var a = Array.prototype.slice; if (Ember.EXTEND_PROTOTYPES === !0 || Ember.EXTEND_PROTOTYPES.Function) Function.prototype.property = function () { var a = Ember.computed(this); return a.property.apply(a, arguments) }, Function.prototype.observes = function () { return this.__ember_observes__ = a.call(arguments), this }, Function.prototype.observesBefore = function () { return this.__ember_observesBefore__ = a.call(arguments), this } } (), function () { } (), function () { function f() { return e.length === 0 ? {} : e.pop() } function g(a) { return e.push(a), null } function h(b, c) { function e(e) { var f = a(e, b); return d ? c === f : !!f } var d = arguments.length === 2; return e } var a = Ember.get, b = Ember.set, c = Array.prototype.slice, d = Ember.EnumerableUtils.indexOf, e = []; Ember.Enumerable = Ember.Mixin.create({ isEnumerable: !0, nextObject: Ember.required(Function), firstObject: Ember.computed(function () { if (a(this, "length") === 0) return undefined; var b = f(), c; return c = this.nextObject(0, null, b), g(b), c }).property("[]"), lastObject: Ember.computed(function () { var b = a(this, "length"); if (b === 0) return undefined; var c = f(), d = 0, e, h = null; do h = e, e = this.nextObject(d++, h, c); while (e !== undefined); return g(c), h }).property("[]"), contains: function (a) { return this.find(function (b) { return b === a }) !== undefined }, forEach: function (b, c) { if (typeof b != "function") throw new TypeError; var d = a(this, "length"), e = null, h = f(); c === undefined && (c = null); for (var i = 0; i < d; i++) { var j = this.nextObject(i, e, h); b.call(c, j, i, this), e = j } return e = null, h = g(h), this }, getEach: function (a) { return this.mapProperty(a) }, setEach: function (a, c) { return this.forEach(function (d) { b(d, a, c) }) }, map: function (a, b) { var c = []; return this.forEach(function (d, e, f) { c[e] = a.call(b, d, e, f) }), c }, mapProperty: function (b) { return this.map(function (c) { return a(c, b) }) }, filter: function (a, b) { var c = []; return this.forEach(function (d, e, f) { a.call(b, d, e, f) && c.push(d) }), c }, filterProperty: function (a, b) { return this.filter(h.apply(this, arguments)) }, find: function (b, c) { var d = a(this, "length"); c === undefined && (c = null); var e = null, h, i = !1, j, k = f(); for (var l = 0; l < d && !i; l++) { h = this.nextObject(l, e, k); if (i = b.call(c, h, l, this)) j = h; e = h } return h = e = null, k = g(k), j }, findProperty: function (a, b) { return this.find(h.apply(this, arguments)) }, every: function (a, b) { return !this.find(function (c, d, e) { return !a.call(b, c, d, e) }) }, everyProperty: function (a, b) { return this.every(h.apply(this, arguments)) }, some: function (a, b) { return !!this.find(function (c, d, e) { return !!a.call(b, c, d, e) }) }, someProperty: function (a, b) { return this.some(h.apply(this, arguments)) }, reduce: function (a, b, c) { if (typeof a != "function") throw new TypeError; var d = b; return this.forEach(function (b, e) { d = a.call(null, d, b, e, this, c) }, this), d }, invoke: function (a) { var b, d = []; return arguments.length > 1 && (b = c.call(arguments, 1)), this.forEach(function (c, e) { var f = c && c[a]; "function" == typeof f && (d[e] = b ? f.apply(c, b) : f.call(c)) }, this), d }, toArray: function () { var a = []; return this.forEach(function (b, c) { a[c] = b }), a }, compact: function () { return this.without(null) }, without: function (a) { if (!this.contains(a)) return this; var b = []; return this.forEach(function (c) { c !== a && (b[b.length] = c) }), b }, uniq: function () { var a = []; return this.forEach(function (b) { d(a, b) < 0 && a.push(b) }), a }, "[]": Ember.computed(function (a, b) { return this }).property(), addEnumerableObserver: function (b, c) { var d = c && c.willChange || "enumerableWillChange", e = c && c.didChange || "enumerableDidChange", f = a(this, "hasEnumerableObservers"); return f || Ember.propertyWillChange(this, "hasEnumerableObservers"), Ember.addListener(this, "@enumerable:before", b, d), Ember.addListener(this, "@enumerable:change", b, e), f || Ember.propertyDidChange(this, "hasEnumerableObservers"), this }, removeEnumerableObserver: function (b, c) { var d = c && c.willChange || "enumerableWillChange", e = c && c.didChange || "enumerableDidChange", f = a(this, "hasEnumerableObservers"); return f && Ember.propertyWillChange(this, "hasEnumerableObservers"), Ember.removeListener(this, "@enumerable:before", b, d), Ember.removeListener(this, "@enumerable:change", b, e), f && Ember.propertyDidChange(this, "hasEnumerableObservers"), this }, hasEnumerableObservers: Ember.computed(function () { return Ember.hasListeners(this, "@enumerable:change") || Ember.hasListeners(this, "@enumerable:before") }).property(), enumerableContentWillChange: function (b, c) { var d, e, f; return "number" == typeof b ? d = b : b ? d = a(b, "length") : d = b = -1, "number" == typeof c ? e = c : c ? e = a(c, "length") : e = c = -1, f = e < 0 || d < 0 || e - d !== 0, b === -1 && (b = null), c === -1 && (c = null), Ember.propertyWillChange(this, "[]"), f && Ember.propertyWillChange(this, "length"), Ember.sendEvent(this, "@enumerable:before", [this, b, c]), this }, enumerableContentDidChange: function (b, c) { var d = this.propertyDidChange, e, f, g; return "number" == typeof b ? e = b : b ? e = a(b, "length") : e = b = -1, "number" == typeof c ? f = c : c ? f = a(c, "length") : f = c = -1, g = f < 0 || e < 0 || f - e !== 0, b === -1 && (b = null), c === -1 && (c = null), Ember.sendEvent(this, "@enumerable:change", [this, b, c]), g && Ember.propertyDidChange(this, "length"), Ember.propertyDidChange(this, "[]"), this } }) } (), function () { function f(a) { return a === null || a === undefined } var a = Ember.get, b = Ember.set, c = Ember.meta, d = Ember.EnumerableUtils.map, e = Ember.cacheFor; Ember.Array = Ember.Mixin.create(Ember.Enumerable, { isSCArray: !0, length: Ember.required(), objectAt: function (b) { return b < 0 || b >= a(this, "length") ? undefined : a(this, b) }, objectsAt: function (a) { var b = this; return d(a, function (a) { return b.objectAt(a) }) }, nextObject: function (a) { return this.objectAt(a) }, "[]": Ember.computed(function (b, c) { return c !== undefined && this.replace(0, a(this, "length"), c), this }).property(), firstObject: Ember.computed(function () { return this.objectAt(0) }).property(), lastObject: Ember.computed(function () { return this.objectAt(a(this, "length") - 1) }).property(), contains: function (a) { return this.indexOf(a) >= 0 }, slice: function (b, c) { var d = [], e = a(this, "length"); f(b) && (b = 0); if (f(c) || c > e) c = e; while (b < c) d[d.length] = this.objectAt(b++); return d }, indexOf: function (b, c) { var d, e = a(this, "length"); c === undefined && (c = 0), c < 0 && (c += e); for (d = c; d < e; d++) if (this.objectAt(d, !0) === b) return d; return -1 }, lastIndexOf: function (b, c) { var d, e = a(this, "length"); if (c === undefined || c >= e) c = e - 1; c < 0 && (c += e); for (d = c; d >= 0; d--) if (this.objectAt(d) === b) return d; return -1 }, addArrayObserver: function (b, c) { var d = c && c.willChange || "arrayWillChange", e = c && c.didChange || "arrayDidChange", f = a(this, "hasArrayObservers"); return f || Ember.propertyWillChange(this, "hasArrayObservers"), Ember.addListener(this, "@array:before", b, d), Ember.addListener(this, "@array:change", b, e), f || Ember.propertyDidChange(this, "hasArrayObservers"), this }, removeArrayObserver: function (b, c) { var d = c && c.willChange || "arrayWillChange", e = c && c.didChange || "arrayDidChange", f = a(this, "hasArrayObservers"); return f && Ember.propertyWillChange(this, "hasArrayObservers"), Ember.removeListener(this, "@array:before", b, d), Ember.removeListener(this, "@array:change", b, e), f && Ember.propertyDidChange(this, "hasArrayObservers"), this }, hasArrayObservers: Ember.computed(function () { return Ember.hasListeners(this, "@array:change") || Ember.hasListeners(this, "@array:before") }).property(), arrayContentWillChange: function (b, c, d) { b === undefined ? (b = 0, c = d = -1) : (c === undefined && (c = -1), d === undefined && (d = -1)), Ember.isWatching(this, "@each") && a(this, "@each"), Ember.sendEvent(this, "@array:before", [this, b, c, d]); var e, f; if (b >= 0 && c >= 0 && a(this, "hasEnumerableObservers")) { e = [], f = b + c; for (var g = b; g < f; g++) e.push(this.objectAt(g)) } else e = c; return this.enumerableContentWillChange(e, d), this }, arrayContentDidChange: function (b, c, d) { b === undefined ? (b = 0, c = d = -1) : (c === undefined && (c = -1), d === undefined && (d = -1)); var f, g; if (b >= 0 && d >= 0 && a(this, "hasEnumerableObservers")) { f = [], g = b + d; for (var h = b; h < g; h++) f.push(this.objectAt(h)) } else f = d; this.enumerableContentDidChange(c, f), Ember.sendEvent(this, "@array:change", [this, b, c, d]); var i = a(this, "length"), j = e(this, "firstObject"), k = e(this, "lastObject"); return this.objectAt(0) !== j && (Ember.propertyWillChange(this, "firstObject"), Ember.propertyDidChange(this, "firstObject")), this.objectAt(i - 1) !== k && (Ember.propertyWillChange(this, "lastObject"), Ember.propertyDidChange(this, "lastObject")), this }, "@each": Ember.computed(function () { return this.__each || (this.__each = new Ember.EachProxy(this)), this.__each }).property() }) } (), function () { Ember.Comparable = Ember.Mixin.create({ isComparable: !0, compare: Ember.required(Function) }) } (), function () { var a = Ember.get, b = Ember.set; Ember.Copyable = Ember.Mixin.create({ copy: Ember.required(Function), frozenCopy: function () { if (Ember.Freezable && Ember.Freezable.detect(this)) return a(this, "isFrozen") ? this : this.copy().freeze(); throw new Error(Ember.String.fmt("%@ does not support freezing", [this])) } }) } (), function () { var a = Ember.get, b = Ember.set; Ember.Freezable = Ember.Mixin.create({ isFrozen: !1, freeze: function () { return a(this, "isFrozen") ? this : (b(this, "isFrozen", !0), this) } }), Ember.FROZEN_ERROR = "Frozen object cannot be modified." } (), function () { var a = Ember.EnumerableUtils.forEach; Ember.MutableEnumerable = Ember.Mixin.create(Ember.Enumerable, { addObject: Ember.required(Function), addObjects: function (b) { return Ember.beginPropertyChanges(this), a(b, function (a) { this.addObject(a) }, this), Ember.endPropertyChanges(this), this }, removeObject: Ember.required(Function), removeObjects: function (b) { return Ember.beginPropertyChanges(this), a(b, function (a) { this.removeObject(a) }, this), Ember.endPropertyChanges(this), this } }) } (), function () { var a = "Index out of range", b = [], c = Ember.get, d = Ember.set, e = Ember.EnumerableUtils.forEach; Ember.MutableArray = Ember.Mixin.create(Ember.Array, Ember.MutableEnumerable, { replace: Ember.required(), clear: function () { var a = c(this, "length"); return a === 0 ? this : (this.replace(0, a, b), this) }, insertAt: function (b, d) { if (b > c(this, "length")) throw new Error(a); return this.replace(b, 0, [d]), this }, removeAt: function (d, e) { if ("number" == typeof d) { if (d < 0 || d >= c(this, "length")) throw new Error(a); e === undefined && (e = 1), this.replace(d, e, b) } return this }, pushObject: function (a) { return this.insertAt(c(this, "length"), a), a }, pushObjects: function (a) { return this.replace(c(this, "length"), 0, a), this }, popObject: function () { var a = c(this, "length"); if (a === 0) return null; var b = this.objectAt(a - 1); return this.removeAt(a - 1, 1), b }, shiftObject: function () { if (c(this, "length") === 0) return null; var a = this.objectAt(0); return this.removeAt(0), a }, unshiftObject: function (a) { return this.insertAt(0, a), a }, unshiftObjects: function (a) { return this.replace(0, 0, a), this }, reverseObjects: function () { var a = c(this, "length"); if (a === 0) return this; var b = this.toArray().reverse(); return this.replace(0, a, b), this }, setObjects: function (a) { if (a.length === 0) return this.clear(); var b = c(this, "length"); return this.replace(0, b, a), this }, removeObject: function (a) { var b = c(this, "length") || 0; while (--b >= 0) { var d = this.objectAt(b); d === a && this.removeAt(b) } return this }, addObject: function (a) { return this.contains(a) || this.pushObject(a), this } }) } (), function () { var a = Ember.get, b = Ember.set, c = Ember.defineProperty; Ember.Observable = Ember.Mixin.create({ isObserverable: !0, get: function (b) { return a(this, b) }, getProperties: function () { var b = {}, c = arguments; arguments.length === 1 && Ember.typeOf(arguments[0]) === "array" && (c = arguments[0]); for (var d = 0; d < c.length; d++) b[c[d]] = a(this, c[d]); return b }, set: function (a, c) { return b(this, a, c), this }, setProperties: function (a) { return Ember.setProperties(this, a) }, beginPropertyChanges: function () { return Ember.beginPropertyChanges(), this }, endPropertyChanges: function () { return Ember.endPropertyChanges(), this }, propertyWillChange: function (a) { return Ember.propertyWillChange(this, a), this }, propertyDidChange: function (a) { return Ember.propertyDidChange(this, a), this }, notifyPropertyChange: function (a) { return this.propertyWillChange(a), this.propertyDidChange(a), this }, addBeforeObserver: function (a, b, c) { Ember.addBeforeObserver(this, a, b, c) }, addObserver: function (a, b, c) { Ember.addObserver(this, a, b, c) }, removeObserver: function (a, b, c) { Ember.removeObserver(this, a, b, c) }, hasObserverFor: function (a) { return Ember.hasListeners(this, a + ":change") }, unknownProperty: function (a) { return undefined }, setUnknownProperty: function (a, d) { c(this, a), b(this, a, d) }, getPath: function (a) { return this.get(a) }, setPath: function (a, b) { return this.set(a, b) }, getWithDefault: function (a, b) { return Ember.getWithDefault(this, a, b) }, incrementProperty: function (c, d) { return d || (d = 1), b(this, c, (a(this, c) || 0) + d), a(this, c) }, decrementProperty: function (c, d) { return d || (d = 1), b(this, c, (a(this, c) || 0) - d), a(this, c) }, toggleProperty: function (c) { return b(this, c, !a(this, c)), a(this, c) }, cacheFor: function (a) { return Ember.cacheFor(this, a) }, observersForKey: function (a) { return Ember.observersFor(this, a) } }) } (), function () { var a = Ember.get, b = Ember.set; Ember.TargetActionSupport = Ember.Mixin.create({ target: null, action: null, targetObject: Ember.computed(function () { var b = a(this, "target"); if (Ember.typeOf(b) === "string") { var c = a(this, b); return c === undefined && (c = a(Ember.lookup, b)), c } return b }).property("target"), triggerAction: function () { var b = a(this, "action"), c = a(this, "targetObject"); if (c && b) { var d; return typeof c.send == "function" ? d = c.send(b, this) : (typeof b == "string" && (b = c[b]), d = b.call(c, this)), d !== !1 && (d = !0), d } return !1 } }) } (), function () { Ember.Evented = Ember.Mixin.create({ on: function (a, b, c) { Ember.addListener(this, a, b, c) }, one: function (a, b, c) { c || (c = b, b = null); var d = this, e = function () { Ember.removeListener(d, a, b, c), "string" == typeof c && (c = this[c]), c.apply(this, arguments) }; Ember.addListener(this, a, b, e, Ember.guidFor(c)) }, trigger: function (a) { var b = [], c, d; for (c = 1, d = arguments.length; c < d; c++) b.push(arguments[c]); Ember.sendEvent(this, a, b) }, fire: function (a) { this.trigger.apply(this, arguments) }, off: function (a, b, c) { Ember.removeListener(this, a, b, c) }, has: function (a) { return Ember.hasListeners(this, a) } }) } (), function () { var a = Ember.get, b = Array.prototype.slice; Ember.Deferred = Ember.Mixin.create({ then: function (b, c) { return a(this, "promise").then(b, c) }, resolve: function (b) { a(this, "promise").resolve(b) }, reject: function (b) { a(this, "promise").reject(b) }, promise: Ember.computed(function () { return new RSVP.Promise }) }) } (), function () { } (), function () { function t() { var a = !1, b, c = function () { a || c.proto(), d(this, f, s), d(this, "_super", s); var e = i(this); e.proto = this, b && (this.reopen.apply(this, b), b = null), p(this, e), delete e.proto, k(this), this.init.apply(this, arguments) }; return c.toString = r, c.willReopen = function () { a && (c.PrototypeMixin = n.create(c.PrototypeMixin)), a = !1 }, c._initMixins = function (a) { b = a }, c.proto = function () { var b = c.superclass; return b && b.proto(), a || (a = !0, c.PrototypeMixin.applyPartial(c.prototype), j(c.prototype)), this.prototype }, c } var a = Ember.set, b = Ember.get, c = Ember.create, d = Ember.platform.defineProperty, e = Array.prototype.slice, f = Ember.GUID_KEY, g = Ember.guidFor, h = Ember.generateGuid, i = Ember.meta, j = Ember.rewatch, k = Ember.finishChains, l = Ember.destroy, m = Ember.run.schedule, n = Ember.Mixin, o = n._apply, p = n.finishPartial, q = n.prototype.reopen, r = n.prototype.toString, s = { configurable: !0, writable: !0, enumerable: !1, value: undefined }, u = t(); u.PrototypeMixin = n.create({ reopen: function () { return o(this, arguments, !0), this }, isInstance: !0, init: function () { }, isDestroyed: !1, isDestroying: !1, destroy: function () { if (this.isDestroying) return; return this.isDestroying = !0, this.willDestroy && this.willDestroy(), a(this, "isDestroyed", !0), m("destroy", this, this._scheduledDestroy), this }, _scheduledDestroy: function () { l(this), this.didDestroy && this.didDestroy() }, bind: function (a, b) { return b instanceof Ember.Binding || (b = Ember.Binding.from(b)), b.to(a).connect(this), b }, toString: function () { return "<" + this.constructor.toString() + ":" + g(this) + ">" } }), Ember.config.overridePrototypeMixin && Ember.config.overridePrototypeMixin(u.PrototypeMixin), u.__super__ = null; var v = n.create({ ClassMixin: Ember.required(), PrototypeMixin: Ember.required(), isClass: !0, isMethod: !1, extend: function () { var a = t(), b; return a.ClassMixin = n.create(this.ClassMixin), a.PrototypeMixin = n.create(this.PrototypeMixin), a.ClassMixin.ownerConstructor = a, a.PrototypeMixin.ownerConstructor = a, q.apply(a.PrototypeMixin, arguments), a.superclass = this, a.__super__ = this.prototype, b = a.prototype = c(this.prototype), b.constructor = a, h(b, "ember"), i(b).proto = b, a.ClassMixin.apply(a), a }, create: function () { var a = this; return arguments.length > 0 && this._initMixins(arguments), new a }, reopen: function () { return this.willReopen(), q.apply(this.PrototypeMixin, arguments), this }, reopenClass: function () { return q.apply(this.ClassMixin, arguments), o(this, arguments, !1), this }, detect: function (a) { if ("function" != typeof a) return !1; while (a) { if (a === this) return !0; a = a.superclass } return !1 }, detectInstance: function (a) { return a instanceof this }, metaForProperty: function (a) { var b = i(this.proto(), !1).descs[a]; return b._meta || {} }, eachComputedProperty: function (a, b) { var c = this.proto(), d = i(c).descs, e = {}, f; for (var g in d) f = d[g], f instanceof Ember.ComputedProperty && a.call(b || this, g, f._meta || e) } }); Ember.config.overrideClassMixin && Ember.config.overrideClassMixin(v), u.ClassMixin = v, v.apply(u), Ember.CoreObject = u } (), function () { var a = Ember.get, b = Ember.set, c = Ember.guidFor, d = Ember.none; Ember.Set = Ember.CoreObject.extend(Ember.MutableEnumerable, Ember.Copyable, Ember.Freezable, { length: 0, clear: function () { if (this.isFrozen) throw new Error(Ember.FROZEN_ERROR); var d = a(this, "length"); if (d === 0) return this; var e; this.enumerableContentWillChange(d, 0), Ember.propertyWillChange(this, "firstObject"), Ember.propertyWillChange(this, "lastObject"); for (var f = 0; f < d; f++) e = c(this[f]), delete this[e], delete this[f]; return b(this, "length", 0), Ember.propertyDidChange(this, "firstObject"), Ember.propertyDidChange(this, "lastObject"), this.enumerableContentDidChange(d, 0), this }, isEqual: function (b) { if (!Ember.Enumerable.detect(b)) return !1; var c = a(this, "length"); if (a(b, "length") !== c) return !1; while (--c >= 0) if (!b.contains(this[c])) return !1; return !0 }, add: Ember.alias("addObject"), remove: Ember.alias("removeObject"), pop: function () { if (a(this, "isFrozen")) throw new Error(Ember.FROZEN_ERROR); var b = this.length > 0 ? this[this.length - 1] : null; return this.remove(b), b }, push: Ember.alias("addObject"), shift: Ember.alias("pop"), unshift: Ember.alias("push"), addEach: Ember.alias("addObjects"), removeEach: Ember.alias("removeObjects"), init: function (a) { this._super(), a && this.addObjects(a) }, nextObject: function (a) { return this[a] }, firstObject: Ember.computed(function () { return this.length > 0 ? this[0] : undefined }).property(), lastObject: Ember.computed(function () { return this.length > 0 ? this[this.length - 1] : undefined }).property(), addObject: function (e) { if (a(this, "isFrozen")) throw new Error(Ember.FROZEN_ERROR); if (d(e)) return this; var f = c(e), g = this[f], h = a(this, "length"), i; return g >= 0 && g < h && this[g] === e ? this : (i = [e], this.enumerableContentWillChange(null, i), Ember.propertyWillChange(this, "lastObject"), h = a(this, "length"), this[f] = h, this[h] = e, b(this, "length", h + 1), Ember.propertyDidChange(this, "lastObject"), this.enumerableContentDidChange(null, i), this) }, removeObject: function (e) { if (a(this, "isFrozen")) throw new Error(Ember.FROZEN_ERROR); if (d(e)) return this; var f = c(e), g = this[f], h = a(this, "length"), i = g === 0, j = g === h - 1, k, l; return g >= 0 && g < h && this[g] === e && (l = [e], this.enumerableContentWillChange(l, null), i && Ember.propertyWillChange(this, "firstObject"), j && Ember.propertyWillChange(this, "lastObject"), g < h - 1 && (k = this[h - 1], this[g] = k, this[c(k)] = g), delete this[f], delete this[h - 1], b(this, "length", h - 1), i && Ember.propertyDidChange(this, "firstObject"), j && Ember.propertyDidChange(this, "lastObject"), this.enumerableContentDidChange(l, null)), this }, contains: function (a) { return this[c(a)] >= 0 }, copy: function () { var d = this.constructor, e = new d, f = a(this, "length"); b(e, "length", f); while (--f >= 0) e[f] = this[f], e[c(this[f])] = f; return e }, toString: function () { var a = this.length, b, c = []; for (b = 0; b < a; b++) c[b] = this[b]; return "Ember.Set<%@>".fmt(c.join(",")) } }) } (), function () { Ember.Object = Ember.CoreObject.extend(Ember.Observable) } (), function () { var a = Ember.ArrayPolyfills.indexOf; Ember.Namespace = Ember.Object.extend({ isNamespace: !0, init: function () { Ember.Namespace.NAMESPACES.push(this), Ember.Namespace.PROCESSED = !1 }, toString: function () { return Ember.identifyNamespaces(), this[Ember.GUID_KEY + "_name"] }, destroy: function () { var b = Ember.Namespace.NAMESPACES; Ember.lookup[this.toString()] = undefined, b.splice(a.call(b, this), 1), this._super() } }), Ember.Namespace.NAMESPACES = [Ember], Ember.Namespace.PROCESSED = !1 } (), function () { Ember.Application = Ember.Namespace.extend() } (), function () {
    var a = Ember.get, b = Ember.set; Ember.ArrayProxy = Ember.Object.extend(Ember.MutableArray, { content: null, arrangedContent: Ember.computed("content", function () { return a(this, "content") }), objectAtContent: function (b) { return a(this, "arrangedContent").objectAt(b) }, replaceContent: function (b, c, d) { a(this, "arrangedContent").replace(b, c, d) }, _contentWillChange: Ember.beforeObserver(function () { this._teardownContent() }, "content"), _teardownContent: function () {
        var b = a(this
    , "content"); b && b.removeArrayObserver(this, { willChange: "contentArrayWillChange", didChange: "contentArrayDidChange" })
    }, contentArrayWillChange: Ember.K, contentArrayDidChange: Ember.K, _contentDidChange: Ember.observer(function () { var b = a(this, "content"); this._setupContent() }, "content"), _setupContent: function () { var b = a(this, "content"); b && b.addArrayObserver(this, { willChange: "contentArrayWillChange", didChange: "contentArrayDidChange" }) }, _arrangedContentWillChange: Ember.beforeObserver(function () { var b = a(this, "arrangedContent"), c = b ? a(b, "length") : 0; this.arrangedContentArrayWillChange(this, 0, c, undefined), this.arrangedContentWillChange(this), this._teardownArrangedContent(b) }, "arrangedContent"), _arrangedContentDidChange: Ember.observer(function () { var b = a(this, "arrangedContent"), c = b ? a(b, "length") : 0; this._setupArrangedContent(), this.arrangedContentDidChange(this), this.arrangedContentArrayDidChange(this, 0, undefined, c) }, "arrangedContent"), _setupArrangedContent: function () { var b = a(this, "arrangedContent"); b && b.addArrayObserver(this, { willChange: "arrangedContentArrayWillChange", didChange: "arrangedContentArrayDidChange" }) }, _teardownArrangedContent: function () { var b = a(this, "arrangedContent"); b && b.removeArrayObserver(this, { willChange: "arrangedContentArrayWillChange", didChange: "arrangedContentArrayDidChange" }) }, arrangedContentWillChange: Ember.K, arrangedContentDidChange: Ember.K, objectAt: function (b) { return a(this, "content") && this.objectAtContent(b) }, length: Ember.computed(function () { var b = a(this, "arrangedContent"); return b ? a(b, "length") : 0 }).property(), replace: function (b, c, d) { return a(this, "content") && this.replaceContent(b, c, d), this }, arrangedContentArrayWillChange: function (a, b, c, d) { this.arrayContentWillChange(b, c, d) }, arrangedContentArrayDidChange: function (a, b, c, d) { this.arrayContentDidChange(b, c, d) }, init: function () { this._super(), this._setupContent(), this._setupArrangedContent() }, willDestroy: function () { this._teardownArrangedContent(), this._teardownContent() } 
    })
} (), function () { function j(a, b) { var c = b.slice(8); if (c in this) return; h(this, c) } function k(a, b) { var c = b.slice(8); if (c in this) return; i(this, c) } var a = Ember.get, b = Ember.set, c = Ember.String.fmt, d = Ember.addBeforeObserver, e = Ember.addObserver, f = Ember.removeBeforeObserver, g = Ember.removeObserver, h = Ember.propertyWillChange, i = Ember.propertyDidChange; Ember.ObjectProxy = Ember.Object.extend({ content: null, _contentDidChange: Ember.observer(function () { }, "content"), willWatchProperty: function (a) { var b = "content." + a; d(this, b, null, j), e(this, b, null, k) }, didUnwatchProperty: function (a) { var b = "content." + a; f(this, b, null, j), g(this, b, null, k) }, unknownProperty: function (b) { var c = a(this, "content"); if (c) return a(c, b) }, setUnknownProperty: function (c, d) { var e = a(this, "content"); return b(e, c, d) } }) } (), function () { function g(a, b, d, e, f) { var g = d._objects, h; g || (g = d._objects = {}); while (--f >= e) { var i = a.objectAt(f); i && (Ember.addBeforeObserver(i, b, d, "contentKeyWillChange"), Ember.addObserver(i, b, d, "contentKeyDidChange"), h = c(i), g[h] || (g[h] = []), g[h].push(f)) } } function h(a, b, d, e, f) { var g = d._objects; g || (g = d._objects = {}); var h, i; while (--f >= e) { var j = a.objectAt(f); j && (Ember.removeBeforeObserver(j, b, d, "contentKeyWillChange"), Ember.removeObserver(j, b, d, "contentKeyDidChange"), i = c(j), h = g[i], h[h.indexOf(f)] = null) } } var a = Ember.set, b = Ember.get, c = Ember.guidFor, d = Ember.EnumerableUtils.forEach, e = Ember.Object.extend(Ember.Array, { init: function (a, b, c) { this._super(), this._keyName = b, this._owner = c, this._content = a }, objectAt: function (a) { var c = this._content.objectAt(a); return c && b(c, this._keyName) }, length: Ember.computed(function () { var a = this._content; return a ? b(a, "length") : 0 }).property() }), f = /^.+:(before|change)$/; Ember.EachProxy = Ember.Object.extend({ init: function (a) { this._super(), this._content = a, a.addArrayObserver(this), d(Ember.watchedEvents(this), function (a) { this.didAddListener(a) }, this) }, unknownProperty: function (a, b) { var c; return c = new e(this._content, a, this), Ember.defineProperty(this, a, null, c), this.beginObservingContentKey(a), c }, arrayWillChange: function (a, b, c, d) { var e = this._keys, f, g, i; i = c > 0 ? b + c : -1, Ember.beginPropertyChanges(this); for (f in e) { if (!e.hasOwnProperty(f)) continue; i > 0 && h(a, f, this, b, i), Ember.propertyWillChange(this, f) } Ember.propertyWillChange(this._content, "@each"), Ember.endPropertyChanges(this) }, arrayDidChange: function (a, b, c, d) { var e = this._keys, f, h, i; i = d > 0 ? b + d : -1, Ember.beginPropertyChanges(this); for (f in e) { if (!e.hasOwnProperty(f)) continue; i > 0 && g(a, f, this, b, i), Ember.propertyDidChange(this, f) } Ember.propertyDidChange(this._content, "@each"), Ember.endPropertyChanges(this) }, didAddListener: function (a) { f.test(a) && this.beginObservingContentKey(a.slice(0, -7)) }, didRemoveListener: function (a) { f.test(a) && this.stopObservingContentKey(a.slice(0, -7)) }, beginObservingContentKey: function (a) { var c = this._keys; c || (c = this._keys = {}); if (!c[a]) { c[a] = 1; var d = this._content, e = b(d, "length"); g(d, a, this, 0, e) } else c[a]++ }, stopObservingContentKey: function (a) { var c = this._keys; if (c && c[a] > 0 && --c[a] <= 0) { var d = this._content, e = b(d, "length"); h(d, a, this, 0, e) } }, contentKeyWillChange: function (a, b) { Ember.propertyWillChange(this, b) }, contentKeyDidChange: function (a, b) { Ember.propertyDidChange(this, b) } }) } (), function () { var a = Ember.get, b = Ember.set, c = Ember.Mixin.create(Ember.MutableArray, Ember.Observable, Ember.Copyable, { get: function (a) { return a === "length" ? this.length : "number" == typeof a ? this[a] : this._super(a) }, objectAt: function (a) { return this[a] }, replace: function (b, c, d) { if (this.isFrozen) throw Ember.FROZEN_ERROR; var e = d ? a(d, "length") : 0; this.arrayContentWillChange(b, c, e); if (!d || d.length === 0) this.splice(b, c); else { var f = [b, c].concat(d); this.splice.apply(this, f) } return this.arrayContentDidChange(b, c, e), this }, unknownProperty: function (a, b) { var c; return b !== undefined && c === undefined && (c = this[a] = b), c }, indexOf: function (a, b) { var c, d = this.length; b === undefined ? b = 0 : b = b < 0 ? Math.ceil(b) : Math.floor(b), b < 0 && (b += d); for (c = b; c < d; c++) if (this[c] === a) return c; return -1 }, lastIndexOf: function (a, b) { var c, d = this.length; b === undefined ? b = d - 1 : b = b < 0 ? Math.ceil(b) : Math.floor(b), b < 0 && (b += d); for (c = b; c >= 0; c--) if (this[c] === a) return c; return -1 }, copy: function () { return this.slice() } }), d = ["length"]; Ember.EnumerableUtils.forEach(c.keys(), function (a) { Array.prototype[a] && d.push(a) }), d.length > 0 && (c = c.without.apply(c, d)), Ember.NativeArray = c, Ember.A = function (a) { return a === undefined && (a = []), Ember.NativeArray.apply(a) }, Ember.NativeArray.activate = function () { c.apply(Array.prototype), Ember.A = function (a) { return a || [] } }, (Ember.EXTEND_PROTOTYPES === !0 || Ember.EXTEND_PROTOTYPES.Array) && Ember.NativeArray.activate() } (), function () { var a = Ember.get, b = Ember.set; Ember._PromiseChain = Ember.Object.extend({ promises: null, failureCallback: Ember.K, successCallback: Ember.K, abortCallback: Ember.K, promiseSuccessCallback: Ember.K, runNextPromise: function () { if (a(this, "isDestroyed")) return; var b = a(this, "promises").shiftObject(); if (b) { var c = a(b, "promise") || b, d = this, e = function () { d.promiseSuccessCallback.call(this, b, arguments), d.runNextPromise() }, f = a(d, "failureCallback"); c.then(e, f) } else this.successCallback() }, start: function () { return this.runNextPromise(), this }, abort: function () { this.abortCallback(), this.destroy() }, init: function () { b(this, "promises", Ember.A(a(this, "promises"))), this._super() } }) } (), function () { var a = {}, b = {}; Ember.onLoad = function (c, d) { var e; a[c] = a[c] || Ember.A(), a[c].pushObject(d), (e = b[c]) && d(e) }, Ember.runLoadHooks = function (c, d) { var e; b[c] = d, (e = a[c]) && a[c].forEach(function (a) { a(d) }) } } (), function () { } (), function () { Ember.ControllerMixin = Ember.Mixin.create({ target: null, store: null }), Ember.Controller = Ember.Object.extend(Ember.ControllerMixin) } (), function () { var a = Ember.get, b = Ember.set, c = Ember.EnumerableUtils.forEach; Ember.SortableMixin = Ember.Mixin.create(Ember.MutableEnumerable, { sortProperties: null, sortAscending: !0, addObject: function (b) { var c = a(this, "content"); c.pushObject(b) }, removeObject: function (b) { var c = a(this, "content"); c.removeObject(b) }, orderBy: function (b, d) { var e = 0, f = a(this, "sortProperties"), g = a(this, "sortAscending"); return c(f, function (c) { e === 0 && (e = Ember.compare(a(b, c), a(d, c)), e !== 0 && !g && (e = -1 * e)) }), e }, destroy: function () { var b = a(this, "content"), d = a(this, "sortProperties"); return b && d && c(b, function (a) { c(d, function (b) { Ember.removeObserver(a, b, this, "contentItemSortPropertyDidChange") }, this) }, this), this._super() }, isSorted: Ember.computed("sortProperties", function () { return !!a(this, "sortProperties") }), arrangedContent: Ember.computed("content", "sortProperties.@each", function (b, d) { var e = a(this, "content"), f = a(this, "isSorted"), g = a(this, "sortProperties"), h = this; return e && f ? (e = e.slice(), e.sort(function (a, b) { return h.orderBy(a, b) }), c(e, function (a) { c(g, function (b) { Ember.addObserver(a, b, this, "contentItemSortPropertyDidChange") }, this) }, this), Ember.A(e)) : e }), _contentWillChange: Ember.beforeObserver(function () { var b = a(this, "content"), d = a(this, "sortProperties"); b && d && c(b, function (a) { c(d, function (b) { Ember.removeObserver(a, b, this, "contentItemSortPropertyDidChange") }, this) }, this), this._super() }, "content"), sortAscendingWillChange: Ember.beforeObserver(function () { this._lastSortAscending = a(this, "sortAscending") }, "sortAscending"), sortAscendingDidChange: Ember.observer(function () { if (a(this, "sortAscending") !== this._lastSortAscending) { var b = a(this, "arrangedContent"); b.reverseObjects() } }, "sortAscending"), contentArrayWillChange: function (b, d, e, f) { var g = a(this, "isSorted"); if (g) { var h = a(this, "arrangedContent"), i = b.slice(d, d + e), j = a(this, "sortProperties"); c(i, function (a) { h.removeObject(a), c(j, function (b) { Ember.removeObserver(a, b, this, "contentItemSortPropertyDidChange") }, this) }) } return this._super(b, d, e, f) }, contentArrayDidChange: function (b, d, e, f) { var g = a(this, "isSorted"), h = a(this, "sortProperties"); if (g) { var i = b.slice(d, d + f), j = a(this, "arrangedContent"); c(i, function (a) { this.insertItemSorted(a), c(h, function (b) { Ember.addObserver(a, b, this, "contentItemSortPropertyDidChange") }, this) }, this) } return this._super(b, d, e, f) }, insertItemSorted: function (b) { var c = a(this, "arrangedContent"), d = a(c, "length"), e = this._binarySearch(b, 0, d); c.insertAt(e, b) }, contentItemSortPropertyDidChange: function (b) { var c = a(this, "arrangedContent"), d = c.indexOf(b), e = c.objectAt(d - 1), f = c.objectAt(d + 1), g = e && this.orderBy(b, e), h = f && this.orderBy(b, f); if (g < 0 || h > 0) c.removeObject(b), this.insertItemSorted(b) }, _binarySearch: function (b, c, d) { var e, f, g, h; return c === d ? c : (h = a(this, "arrangedContent"), e = c + Math.floor((d - c) / 2), f = h.objectAt(e), g = this.orderBy(f, b), g < 0 ? this._binarySearch(b, e + 1, d) : g > 0 ? this._binarySearch(b, c, e) : e) } }) } (), function () { var a = Ember.get, b = Ember.set; Ember.ArrayController = Ember.ArrayProxy.extend(Ember.ControllerMixin, Ember.SortableMixin) } (), function () { Ember.ObjectController = Ember.ObjectProxy.extend(Ember.ControllerMixin) } (), function () { } (), function () { } (), function () { function a(b, c, d, e) { var f = b.name, g = b.incoming, h = b.incomingNames, i = h.length, j; d || (d = {}), e || (e = []); if (d.hasOwnProperty(f)) return; e.push(f), d[f] = !0; for (j = 0; j < i; j++) a(g[h[j]], c, d, e); c(b, e), e.pop() } function b() { this.names = [], this.vertices = {} } b.prototype.add = function (a) { if (!a) return; if (this.vertices.hasOwnProperty(a)) return this.vertices[a]; var b = { name: a, incoming: {}, incomingNames: [], hasOutgoing: !1, value: null }; return this.vertices[a] = b, this.names.push(a), b }, b.prototype.map = function (a, b) { this.add(a).value = b }, b.prototype.addEdge = function (b, c) { function f(a, b) { if (a.name === c) throw new Error("cycle detected: " + c + " <- " + b.join(" <- ")) } if (!b || !c || b === c) return; var d = this.add(b), e = this.add(c); if (e.incoming.hasOwnProperty(b)) return; a(d, f), d.hasOutgoing = !0, e.incoming[b] = d, e.incomingNames.push(b) }, b.prototype.topsort = function (b) { var c = {}, d = this.vertices, e = this.names, f = e.length, g, h; for (g = 0; g < f; g++) h = d[e[g]], h.hasOutgoing || a(h, b, c) }, b.prototype.addEdges = function (a, b, c, d) { var e; this.map(a, b); if (c) if (typeof c == "string") this.addEdge(a, c); else for (e = 0; e < c.length; e++) this.addEdge(a, c[e]); if (d) if (typeof d == "string") this.addEdge(d, a); else for (e = 0; e < d.length; e++) this.addEdge(d[e], a) }, Ember.DAG = b } (), function () { var a = Ember.get, b = Ember.set; Ember.Application = Ember.Namespace.extend({ rootElement: "body", eventDispatcher: null, customEvents: null, autoinit: !Ember.testing, isInitialized: !1, init: function () { this.$ || (this.$ = Ember.$), this._super(), this.createEventDispatcher(), this._readinessDeferrals = 1, this.waitForDOMContentLoaded(); if (this.autoinit) { var a = this; this.$().ready(function () { if (a.isDestroyed || a.isInitialized) return; a.initialize() }) } }, createEventDispatcher: function () { var c = a(this, "rootElement"), d = Ember.EventDispatcher.create({ rootElement: c }); b(this, "eventDispatcher", d) }, waitForDOMContentLoaded: function () { this.deferReadiness(); var a = this; this.$().ready(function () { a.advanceReadiness() }) }, deferReadiness: function () { this._readinessDeferrals++ }, advanceReadiness: function () { this._readinessDeferrals--, this._readinessDeferrals === 0 && Ember.run.once(this, this.didBecomeReady) }, initialize: function (a) { return a = this.setupRouter(a), this.runInjections(a), Ember.runLoadHooks("application", this), this.isInitialized = !0, this.advanceReadiness(), this }, runInjections: function (b) { var c = a(this.constructor, "injections"), d = new Ember.DAG, e = this, f, g, h; for (g = 0; g < c.length; g++) h = c[g], d.addEdges(h.name, h.injection, h.before, h.after); d.topsort(function (a) { var c = a.value, d = Ember.A(Ember.keys(e)); d.forEach(function (a) { c(e, b, a) }) }) }, setupRouter: function (a) { return !a && Ember.Router.detect(this.Router) && (a = this.Router.create(), this._createdRouter = a), a && (b(this, "router", a), b(a, "namespace", this)), a }, didBecomeReady: function () { var b = a(this, "eventDispatcher"), c = a(this, "customEvents"), d; b.setup(c), this.ready(), d = a(this, "router"), this.createApplicationView(d), d && d instanceof Ember.Router && this.startRouting(d) }, createApplicationView: function (c) { var d = a(this, "rootElement"), e = {}, f = this.ApplicationView, g = Ember.TEMPLATES.application, h, i; if (!f && !g) return; c && (h = a(c, "applicationController"), h && (e.controller = h)), g && (e.template = g), f || (f = Ember.View), i = f.create(e), this._createdApplicationView = i, c && b(c, "applicationView", i), i.appendTo(d) }, startRouting: function (b) { var c = a(b, "location"); b.route(c.getURL()), c.onUpdateURL(function (a) { b.route(a) }) }, ready: Ember.K, willDestroy: function () { a(this, "eventDispatcher").destroy(), this._createdRouter && this._createdRouter.destroy(), this._createdApplicationView && this._createdApplicationView.destroy() }, registerInjection: function (a) { this.constructor.registerInjection(a) } }), Ember.Application.reopenClass({ concatenatedProperties: ["injections"], injections: Ember.A(), registerInjection: function (b) { var c = a(this, "injections"); c.push(b) } }), Ember.Application.registerInjection({ name: "controllers", injection: function (a, b, c) { if (!b) return; if (!/^[A-Z].*Controller$/.test(c)) return; var d = c.charAt(0).toLowerCase() + c.substr(1), e = a[c], f; if (!Ember.Object.detect(e)) return; f = a[c].create(), b.set(d, f), f.setProperties({ target: b, controllers: b, namespace: a }) } }), Ember.runLoadHooks("Ember.Application", Ember.Application) } (), function () { } (), function () { } (), function () { var a = Ember.imports.jQuery; Ember.$ = a } (), function () { var a = Ember.String.w("dragstart drag dragenter dragleave dragover drop dragend"); Ember.EnumerableUtils.forEach(a, function (a) { Ember.$.event.fixHooks[a] = { props: ["dataTransfer"]} }) } (), function () { var a = Ember.get, b = Ember.set, c = Ember.ArrayPolyfills.indexOf, d = function () { this.seen = {}, this.list = [] }; d.prototype = { add: function (a) { if (a in this.seen) return; this.seen[a] = !0, this.list.push(a) }, toDOM: function () { return this.list.join(" ") } }, Ember.RenderBuffer = function (a) { return new Ember._RenderBuffer(a) }, Ember._RenderBuffer = function (a) { this.elementTag = a, this.childBuffers = [] }, Ember._RenderBuffer.prototype = { elementClasses: null, elementId: null, elementAttributes: null, elementTag: null, elementStyle: null, parentBuffer: null, push: function (a) { return this.childBuffers.push(String(a)), this }, addClass: function (a) { var b = this.elementClasses = this.elementClasses || new d; return this.elementClasses.add(a), this }, id: function (a) { return this.elementId = a, this }, attr: function (a, b) { var c = this.elementAttributes = this.elementAttributes || {}; return arguments.length === 1 ? c[a] : (c[a] = b, this) }, removeAttr: function (a) { var b = this.elementAttributes; return b && delete b[a], this }, style: function (a, b) { var c = this.elementStyle = this.elementStyle || {}; return this.elementStyle[a] = b, this }, newBuffer: function (a, b, c, d) { var e = new Ember._RenderBuffer(a); return e.parentBuffer = b, d && Ember.$.extend(e, d), c && c.call(this, e), e }, replaceWithBuffer: function (a) { var b = this.parentBuffer; if (!b) return; var d = b.childBuffers, e = c.call(d, this); a ? d.splice(e, 1, a) : d.splice(e, 1) }, begin: function (a) { return this.newBuffer(a, this, function (a) { this.childBuffers.push(a) }) }, prepend: function (a) { return this.newBuffer(a, this, function (a) { this.childBuffers.splice(0, 0, a) }) }, replaceWith: function (a) { var b = this.parentBuffer; return this.newBuffer(a, b, function (a) { this.replaceWithBuffer(a) }) }, insertAfter: function (b) { var d = a(this, "parentBuffer"); return this.newBuffer(b, d, function (a) { var b = d.childBuffers, e = c.call(b, this); b.splice(e + 1, 0, a) }) }, end: function () { var a = this.parentBuffer; return a || this }, remove: function () { this.replaceWithBuffer(null) }, element: function () { return Ember.$(this.string())[0] }, string: function () { var a = "", b = this.elementTag, c; if (b) { var d = this.elementId, e = this.elementClasses, f = this.elementAttributes, g = this.elementStyle, h = "", i; c = ["<" + b], d && c.push('id="' + this._escapeAttribute(d) + '"'), e && c.push('class="' + this._escapeAttribute(e.toDOM()) + '"'); if (g) { for (i in g) g.hasOwnProperty(i) && (h += i + ":" + this._escapeAttribute(g[i]) + ";"); c.push('style="' + h + '"') } if (f) for (i in f) f.hasOwnProperty(i) && c.push(i + '="' + this._escapeAttribute(f[i]) + '"'); c = c.join(" ") + ">" } var j = this.childBuffers; return Ember.ArrayPolyfills.forEach.call(j, function (b) { var c = typeof b == "string"; a += c ? b : b.string() }), b ? c + a + "</" + b + ">" : a }, _escapeAttribute: function (a) { var b = { "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;", "`": "&#x60;" }, c = /&(?!\w+;)|[<>"'`]/g, d = /[&<>"'`]/, e = function (a) { return b[a] || "&amp;" }, f = a.toString(); return d.test(f) ? f.replace(c, e) : f } } } (), function () { var a = Ember.get, b = Ember.set, c = Ember.String.fmt; Ember.EventDispatcher = Ember.Object.extend({ rootElement: "body", setup: function (b) { var c, d = { touchstart: "touchStart", touchmove: "touchMove", touchend: "touchEnd", touchcancel: "touchCancel", keydown: "keyDown", keyup: "keyUp", keypress: "keyPress", mousedown: "mouseDown", mouseup: "mouseUp", contextmenu: "contextMenu", click: "click", dblclick: "doubleClick", mousemove: "mouseMove", focusin: "focusIn", focusout: "focusOut", mouseenter: "mouseEnter", mouseleave: "mouseLeave", submit: "submit", input: "input", change: "change", dragstart: "dragStart", drag: "drag", dragenter: "dragEnter", dragleave: "dragLeave", dragover: "dragOver", drop: "drop", dragend: "dragEnd" }; Ember.$.extend(d, b || {}); var e = Ember.$(a(this, "rootElement")); e.addClass("ember-application"); for (c in d) d.hasOwnProperty(c) && this.setupHandler(e, c, d[c]) }, setupHandler: function (a, b, c) { var d = this; a.delegate(".ember-view", b + ".ember", function (a, b) { return Ember.handleErrors(function () { var e = Ember.View.views[this.id], f = !0, g = null; return g = d._findNearestEventManager(e, c), g && g !== b ? f = d._dispatchEvent(g, a, c, e) : e ? f = d._bubbleEvent(e, a, c) : a.stopPropagation(), f }, this) }), a.delegate("[data-ember-action]", b + ".ember", function (a) { return Ember.handleErrors(function () { var b = Ember.$(a.currentTarget).attr("data-ember-action"), d = Ember.Handlebars.ActionHelper.registeredActions[b], e = d.handler; if (d.eventName === c) return e(a) }, this) }) }, _findNearestEventManager: function (b, c) { var d = null; while (b) { d = a(b, "eventManager"); if (d && d[c]) break; b = a(b, "parentView") } return d }, _dispatchEvent: function (a, b, c, d) { var e = !0, f = a[c]; return Ember.typeOf(f) === "function" ? (e = f.call(a, b, d), b.stopPropagation()) : e = this._bubbleEvent(d, b, c), e }, _bubbleEvent: function (a, b, c) { return Ember.run(function () { return a.handleEvent(c, b) }) }, destroy: function () { var b = a(this, "rootElement"); return Ember.$(b).undelegate(".ember").removeClass("ember-application"), this._super() } }) } (), function () { var a = Ember.run.queues; a.splice(Ember.$.inArray("actions", a) + 1, 0, "render") } (), function () { var a = Ember.get, b = Ember.set; Ember.ControllerMixin.reopen({ target: null, controllers: null, namespace: null, view: null, connectOutlet: function (c, d) { var e, f, g, h, i; Ember.typeOf(d) === "string" && (e = c, c = d, d = arguments[2]), arguments.length === 1 ? Ember.typeOf(c) === "object" && (i = c, e = i.outletName, c = i.name, f = i.viewClass, h = i.controller, d = i.context) : i = {}, e = e || "view"; if (c) { var j = a(this, "namespace"), k = a(this, "controllers"), l = c.charAt(0).toUpperCase() + c.substr(1) + "View"; f = a(j, l), h = a(k, c + "Controller") } return h && d && b(h, "content", d), g = this.createOutletView(e, f), h && b(g, "controller", h), b(this, e, g), g }, connectControllers: function () { var c = a(this, "controllers"), d = Array.prototype.slice.apply(arguments), e; for (var f = 0, g = d.length; f < g; f++) e = d[f] + "Controller", b(this, e, a(c, e)) }, disconnectOutlet: function (a) { a = a || "view", b(this, a, null) }, createOutletView: function (a, b) { return b.create() } }) } (), function () { } (), function () {
    var a = Ember.get, b = Ember.set, c = Ember.addObserver, d = Ember.removeObserver, e = Ember.meta, f = Ember.String.fmt, g = [].slice, h = Ember.EnumerableUtils.forEach, i = Ember.computed(function () { var b = this._childViews, c = Ember.A(); return h(b, function (b) { b.isVirtual ? c.pushObjects(a(b, "childViews")) : c.push(b) }), c }).property(); Ember.TEMPLATES = {}; var j = { preRender: {}, inBuffer: {}, hasElement: {}, inDOM: {}, destroyed: {} }; Ember.CoreView = Ember.Object.extend(Ember.Evented, { init: function () { this._super(), this.isVirtual || (Ember.View.views[a(this, "elementId")] = this) }, parentView: Ember.computed(function () { var b = a(this, "_parentView"); return b && b.isVirtual ? a(b, "parentView") : b }).property("_parentView").volatile(), state: "preRender", _parentView: null, concreteView: Ember.computed(function () { return this.isVirtual ? a(this, "parentView") : this }).property("_parentView").volatile(), renderBuffer: function (b) { b = b || a(this, "tagName"); if (b === null || b === undefined) b = "div"; return Ember.RenderBuffer(b) }, instrumentName: "render.core_view", instrumentDetails: function (a) { a.type = this.constructor.toString() }, renderToBuffer: function (b, c) { var d = a(this, "instrumentName"), e = {}; return this.instrumentDetails(e), Ember.instrument(d, e, function () { return this._renderToBuffer(b, c) }, this) }, _renderToBuffer: function (b, c) { var d; Ember.run.sync(), c = c || "begin"; if (b) { var e = a(this, "tagName"); if (e === null || e === undefined) e = "div"; d = b[c](e) } else d = this.renderBuffer(); return this.buffer = d, this.transitionTo("inBuffer", !1), this.beforeRender(d), this.render(d), this.afterRender(d), d }, trigger: function (a) { this._super.apply(this, arguments); var b = this[a]; if (b) { var c = [], d, e; for (d = 1, e = arguments.length; d < e; d++) c.push(arguments[d]); return b.apply(this, c) } }, has: function (a) { return Ember.typeOf(this[a]) === "function" || this._super(a) }, willDestroy: function () { var b = a(this, "_parentView"); this.removedFromDOM || this.destroyElement(), b && b.removeChild(this), this.state = "destroyed", this.isVirtual || delete Ember.View.views[a(this, "elementId")] }, clearRenderedChildren: Ember.K, invokeRecursively: Ember.K, invalidateRecursively: Ember.K, transitionTo: Ember.K, destroyElement: Ember.K, _notifyWillInsertElement: Ember.K, _notifyDidInsertElement: Ember.K }), Ember.View = Ember.CoreView.extend({ concatenatedProperties: ["classNames", "classNameBindings", "attributeBindings"], isView: !0, templateName: null, layoutName: null, templates: Ember.TEMPLATES, template: Ember.computed(function (b, c) { if (c !== undefined) return c; var d = a(this, "templateName"), e = this.templateForName(d, "template"); return e || a(this, "defaultTemplate") }).property("templateName"), controller: Ember.computed(function (b, c) { var d; return arguments.length === 2 ? c : (d = a(this, "parentView"), d ? a(d, "controller") : null) }).property(), layout: Ember.computed(function (b, c) { if (arguments.length === 2) return c; var d = a(this, "layoutName"), e = this.templateForName(d, "layout"); return e || a(this, "defaultLayout") }).property("layoutName"), templateForName: function (b, c) { if (!b) return; var d = a(this, "templates"), e = a(d, b); if (!e) throw new Ember.Error(f('%@ - Unable to find %@ "%@".', [this, c, b])); return e }, context: Ember.computed(function (c, d) { return arguments.length === 2 ? (b(this, "_context", d), d) : a(this, "_context") }).volatile(), _context: Ember.computed(function (b, c) { var d, e; return arguments.length === 2 ? c : (e = a(this, "controller")) ? e : (d = a(this, "_parentView"), d ? a(d, "_context") : this) }), _displayPropertyDidChange: Ember.observer(function () { this.rerender() }, "context", "controller"), isVisible: !0, childViews: i, _childViews: [], _childViewsWillChange: Ember.beforeObserver(function () { if (this.isVirtual) { var b = a(this, "parentView"); b && Ember.propertyWillChange(b, "childViews") } }, "childViews"), _childViewsDidChange: Ember.observer(function () { if (this.isVirtual) { var b = a(this, "parentView"); b && Ember.propertyDidChange(b, "childViews") } }, "childViews"), nearestInstanceOf: function (b) { var c = a(this, "parentView"); while (c) { if (c instanceof b) return c; c = a(c, "parentView") } }, nearestOfType: function (b) { var c = a(this, "parentView"), d = b instanceof Ember.Mixin ? function (a) { return b.detect(a) } : function (a) { return b.detect(a.constructor) }; while (c) { if (d(c)) return c; c = a(c, "parentView") } }, nearestWithProperty: function (b) { var c = a(this, "parentView"); while (c) { if (b in c) return c; c = a(c, "parentView") } }, nearestChildOf: function (b) { var c = a(this, "parentView"); while (c) { if (a(c, "parentView") instanceof b) return c; c = a(c, "parentView") } }, collectionView: Ember.computed(function () { return this.nearestOfType(Ember.CollectionView) }), itemView: Ember.computed(function () { return this.nearestChildOf(Ember.CollectionView) }), contentView: Ember.computed(function () { return this.nearestWithProperty("content") }), _parentViewDidChange: Ember.observer(function () { if (this.isDestroying) return; this.invokeRecursively(function (a) { a.propertyDidChange("collectionView"), a.propertyDidChange("itemView"), a.propertyDidChange("contentView") }), a(this, "parentView.controller") && !a(this, "controller") && this.notifyPropertyChange("controller") }, "_parentView"), _controllerDidChange: Ember.observer(function () { if (this.isDestroying) return; this.forEachChildView(function (a) { a.propertyDidChange("controller") }) }, "controller"), cloneKeywords: function () { var c = a(this, "templateData"), d = c ? Ember.copy(c.keywords) : {}; return b(d, "view", a(this, "concreteView")), b(d, "controller", a(this, "controller")), d }, render: function (b) { var c = a(this, "layout") || a(this, "template"); if (c) { var d = a(this, "context"), e = this.cloneKeywords(), f = { view: this, buffer: b, isRenderData: !0, keywords: e }, g = c(d, { data: f }); g !== undefined && b.push(g) } }, invokeForState: function (a) { var b = this.state, c, d; if (d = j[b][a]) return c = g.call(arguments), c[0] = this, d.apply(this, c); var e = this, f = e.states, h; while (f) { h = f[b]; while (h) { d = h[a]; if (d) return j[b][a] = d, c = g.call(arguments, 1), c.unshift(this), d.apply(this, c); h = h.parentState } f = f.parent } }, rerender: function () { return this.invokeForState("rerender") }, clearRenderedChildren: function () { var a = this.lengthBeforeRender, b = this.lengthAfterRender, c = this._childViews; for (var d = b - 1; d >= a; d--) c[d] && c[d].destroy() }, _applyClassNameBindings: function () { var b = a(this, "classNameBindings"), e = a(this, "classNames"), f, g, i; if (!b) return; h(b, function (a) { var b, h = Ember.View._parsePropertyPath(a), j = function () { g = this._classStringForProperty(a), f = this.$(); if (!f) { d(this, h.path, j); return } b && (f.removeClass(b), e.removeObject(b)), g ? (f.addClass(g), b = g) : b = null }; i = this._classStringForProperty(a), i && (e.push(i), b = i), c(this, h.path, j), this.one("willClearRender", function () { d(this, h.path, j) }) }, this) }, _applyAttributeBindings: function (b) { var e = a(this, "attributeBindings"), f, g, i; if (!e) return; h(e, function (e) { var h = e.split(":"), i = h[0], j = h[1] || i, k = function () { g = this.$(); if (!g) return; f = a(this, i), Ember.View.applyAttributeBindings(g, j, f) }; c(this, i, k), this.one("willClearRender", function () { d(this, i, k) }), f = a(this, i), Ember.View.applyAttributeBindings(b, j, f) }, this) }, _classStringForProperty: function (b) { var c = Ember.View._parsePropertyPath(b), d = c.path, e = a(this, d); return e === undefined && Ember.isGlobalPath(d) && (e = a(Ember.lookup, d)), Ember.View._classStringForValue(d, e, c.className, c.falsyClassName) }, element: Ember.computed(function (a, b) { return b !== undefined ? this.invokeForState("setElement", b) : this.invokeForState("getElement") }).property("_parentView"), $: function (a) { return this.invokeForState("$", a) }, mutateChildViews: function (a) { var b = this._childViews, c = b.length, d; while (--c >= 0) d = b[c], a.call(this, d, c); return this }, forEachChildView: function (a) { var b = this._childViews; if (!b) return this; var c = b.length, d, e; for (e = 0; e < c; e++) d = b[e], a.call(this, d); return this }, appendTo: function (a) { return this._insertElementLater(function () { this.$().appendTo(a) }), this }, replaceIn: function (a) { return this._insertElementLater(function () { Ember.$(a).empty(), this.$().appendTo(a) }), this }, _insertElementLater: function (a) { this._scheduledInsert = Ember.run.scheduleOnce("render", this, "_insertElement", a) }, _insertElement: function (a) { this._scheduledInsert = null, this.invokeForState("insertElement", a) }, append: function () { return this.appendTo(document.body) }, remove: function () { this.destroyElement(), this.invokeRecursively(function (a) { a.clearRenderedChildren() }) }, elementId: Ember.computed(function (a, b) { return b !== undefined ? b : Ember.guidFor(this) }), _elementIdDidChange: Ember.beforeObserver(function () { throw "Changing a view's elementId after creation is not allowed." }, "elementId"), findElementInParentElement: function (b) { var c = "#" + a(this, "elementId"); return Ember.$(c)[0] || Ember.$(c, b)[0] }, createElement: function () { if (a(this, "element")) return this; var c = this.renderToBuffer(); return b(this, "element", c.element()), this }, willInsertElement: Ember.K, didInsertElement: Ember.K, willClearRender: Ember.K, invokeRecursively: function (a) { a.call(this, this), this.forEachChildView(function (b) { b.invokeRecursively(a) }) }, invalidateRecursively: function (a) { this.forEachChildView(function (b) { b.propertyDidChange(a) }) }, _notifyWillInsertElement: function () { this.invokeRecursively(function (a) { a.trigger("willInsertElement") }) }, _notifyDidInsertElement: function () { this.invokeRecursively(function (a) { a.trigger("didInsertElement") }) }, _notifyWillClearRender: function () { this.invokeRecursively(function (a) { a.trigger("willClearRender") }) }, destroyElement: function () { return this.invokeForState("destroyElement") }, willDestroyElement: function () { }, _notifyWillDestroyElement: function () { this._notifyWillClearRender(), this.invokeRecursively(function (a) { a.trigger("willDestroyElement") }) }, _elementWillChange: Ember.beforeObserver(function () { this.forEachChildView(function (a) { Ember.propertyWillChange(a, "element") }) }, "element"), _elementDidChange: Ember.observer(function () { this.forEachChildView(function (a) { Ember.propertyDidChange(a, "element") }) }, "element"), parentViewDidChange: Ember.K, instrumentName: "render.view", instrumentDetails: function (b) { b.template = a(this, "templateName"), this._super(b) }, _renderToBuffer: function (a, b) { this.lengthBeforeRender = this._childViews.length; var c = this._super(a, b); return this.lengthAfterRender = this._childViews.length, c }, renderToBufferIfNeeded: function () { return this.invokeForState("renderToBufferIfNeeded", this) }, beforeRender: function (a) { this.applyAttributesToBuffer(a) }, afterRender: Ember.K, applyAttributesToBuffer: function (b) { this._applyClassNameBindings(), this._applyAttributeBindings(b), h(a(this, "classNames"), function (a) { b.addClass(a) }), b.id(a(this, "elementId")); var c = a(this, "ariaRole"); c && b.attr("role", c), a(this, "isVisible") === !1 && b.style("display", "none") }, tagName: null, ariaRole: null, classNames: ["ember-view"], classNameBindings: [], attributeBindings: [], init: function () { this._super(), this._childViews = this._childViews.slice(), this.classNameBindings = Ember.A(this.classNameBindings.slice()), this.classNames = Ember.A(this.classNames.slice()); var c = a(this, "viewController"); c && (c = a(c), c && b(c, "view", this)) }, appendChild: function (a, b) { return this.invokeForState("appendChild", a, b) }, removeChild: function (a) { if (this.isDestroying) return; b(a, "_parentView", null); var c = this._childViews; return Ember.EnumerableUtils.removeObject(c, a), this.propertyDidChange("childViews"), this }, removeAllChildren: function () { return this.mutateChildViews(function (a) { this.removeChild(a) }) }, destroyAllChildren: function () { return this.mutateChildViews(function (a) { a.destroy() }) }, removeFromParent: function () { var b = a(this, "_parentView"); return this.remove(), b && b.removeChild(this), this }, willDestroy: function () { var c = this._childViews, d = a(this, "_parentView"), e; this.removedFromDOM || this.destroyElement(); if (this.viewName) { var f = a(this, "parentView"); f && b(f, this.viewName, null) } d && d.removeChild(this), this.state = "destroyed", e = c.length; for (var g = e - 1; g >= 0; g--) c[g].removedFromDOM = !0, c[g].destroy(); this.isVirtual || delete Ember.View.views[a(this, "elementId")] }, createChildView: function (c, d) { return Ember.CoreView.detect(c) ? (d = d || {}, d._parentView = this, d.templateData = d.templateData || a(this, "templateData"), c = c.create(d), c.viewName && b(a(this, "concreteView"), c.viewName, c)) : (a(c, "templateData") || b(c, "templateData", a(this, "templateData")), b(c, "_parentView", this)), c }, becameVisible: Ember.K, becameHidden: Ember.K, _isVisibleDidChange: Ember.observer(function () { var b = this.$(); if (!b) return; var c = a(this, "isVisible"); b.toggle(c); if (this._isAncestorHidden()) return; c ? this._notifyBecameVisible() : this._notifyBecameHidden() }, "isVisible"), _notifyBecameVisible: function () {
        this.trigger("becameVisible"), this.forEachChildView
    (function (b) { var c = a(b, "isVisible"); (c || c === null) && b._notifyBecameVisible() })
    }, _notifyBecameHidden: function () { this.trigger("becameHidden"), this.forEachChildView(function (b) { var c = a(b, "isVisible"); (c || c === null) && b._notifyBecameHidden() }) }, _isAncestorHidden: function () { var b = a(this, "parentView"); while (b) { if (a(b, "isVisible") === !1) return !0; b = a(b, "parentView") } return !1 }, clearBuffer: function () { this.invokeRecursively(function (a) { this.buffer = null }) }, transitionTo: function (a, b) { this.state = a, b !== !1 && this.forEachChildView(function (b) { b.transitionTo(a) }) }, handleEvent: function (a, b) { return this.invokeForState("handleEvent", a, b) } 
    }); var k = { prepend: function (a, b) { a.$().prepend(b) }, after: function (a, b) { a.$().after(b) }, html: function (a, b) { a.$().html(b) }, replace: function (c) { var d = a(c, "element"); b(c, "element", null), c._insertElementLater(function () { Ember.$(d).replaceWith(a(c, "element")) }) }, remove: function (a) { a.$().remove() }, empty: function (a) { a.$().empty() } }; Ember.View.reopen({ states: Ember.View.states, domManager: k }), Ember.View.reopenClass({ _parsePropertyPath: function (a) { var b = a.split(":"), c = b[0], d = "", e, f; return b.length > 1 && (e = b[1], b.length === 3 && (f = b[2]), d = ":" + e, f && (d += ":" + f)), { path: c, classNames: d, className: e === "" ? undefined : e, falsyClassName: f} }, _classStringForValue: function (a, b, c, d) { if (c || d) return c && !!b ? c : d && !b ? d : null; if (b === !0) { var e = a.split("."); return Ember.String.dasherize(e[e.length - 1]) } return b !== !1 && b !== undefined && b !== null ? b : null } }), Ember.View.views = {}, Ember.View.childViewsProperty = i, Ember.View.applyAttributeBindings = function (a, b, c) { var d = Ember.typeOf(c), e = a.attr(b); (d === "string" || d === "number" && !isNaN(c)) && c !== e ? a.attr(b, c) : c && d === "boolean" ? a.attr(b, b) : c || a.removeAttr(b) } 
} (), function () { var a = Ember.get, b = Ember.set; Ember.View.states = { _default: { appendChild: function () { throw "You can't use appendChild outside of the rendering process" }, $: function () { return undefined }, getElement: function () { return null }, handleEvent: function () { return !0 }, destroyElement: function (a) { return b(a, "element", null), a._scheduledInsert && (Ember.run.cancel(a._scheduledInsert), a._scheduledInsert = null), a }, renderToBufferIfNeeded: function () { return !1 } } }, Ember.View.reopen({ states: Ember.View.states }) } (), function () { Ember.View.states.preRender = { parentState: Ember.View.states._default, insertElement: function (a, b) { a.createElement(), a._notifyWillInsertElement(), b.call(a), a.transitionTo("inDOM"), a._notifyDidInsertElement() }, renderToBufferIfNeeded: function (a) { return a.renderToBuffer() }, empty: Ember.K, setElement: function (a, b) { return b !== null && a.transitionTo("hasElement"), b } } } (), function () { var a = Ember.get, b = Ember.set, c = Ember.meta; Ember.View.states.inBuffer = { parentState: Ember.View.states._default, $: function (a, b) { return a.rerender(), Ember.$() }, rerender: function (a) { a._notifyWillClearRender(), a.clearRenderedChildren(), a.renderToBuffer(a.buffer, "replaceWith") }, appendChild: function (a, b, c) { var d = a.buffer; return b = this.createChildView(b, c), a._childViews.push(b), b.renderToBuffer(d), a.propertyDidChange("childViews"), b }, destroyElement: function (a) { return a.clearBuffer(), a._notifyWillDestroyElement(), a.transitionTo("preRender"), a }, empty: function () { }, renderToBufferIfNeeded: function (a) { return a.buffer }, insertElement: function () { throw "You can't insert an element that has already been rendered" }, setElement: function (a, b) { return b === null ? a.transitionTo("preRender") : (a.clearBuffer(), a.transitionTo("hasElement")), b } } } (), function () { var a = Ember.get, b = Ember.set, c = Ember.meta; Ember.View.states.hasElement = { parentState: Ember.View.states._default, $: function (b, c) { var d = a(b, "element"); return c ? Ember.$(c, d) : Ember.$(d) }, getElement: function (b) { var c = a(b, "parentView"); return c && (c = a(c, "element")), c ? b.findElementInParentElement(c) : Ember.$("#" + a(b, "elementId"))[0] }, setElement: function (a, b) { if (b !== null) throw "You cannot set an element to a non-null value when the element is already in the DOM."; return a.transitionTo("preRender"), b }, rerender: function (a) { return a._notifyWillClearRender(), a.clearRenderedChildren(), a.domManager.replace(a), a }, destroyElement: function (a) { return a._notifyWillDestroyElement(), a.domManager.remove(a), b(a, "element", null), a._scheduledInsert && (Ember.run.cancel(a._scheduledInsert), a._scheduledInsert = null), a }, empty: function (a) { var b = a._childViews, c, d; if (b) { c = b.length; for (d = 0; d < c; d++) b[d]._notifyWillDestroyElement() } a.domManager.empty(a) }, handleEvent: function (a, b, c) { return a.has(b) ? a.trigger(b, c) : !0 } }, Ember.View.states.inDOM = { parentState: Ember.View.states.hasElement, insertElement: function (a, b) { throw "You can't insert an element into the DOM that has already been inserted" } } } (), function () { var a = "You can't call %@ on a destroyed view", b = Ember.String.fmt; Ember.View.states.destroyed = { parentState: Ember.View.states._default, appendChild: function () { throw b(a, ["appendChild"]) }, rerender: function () { throw b(a, ["rerender"]) }, destroyElement: function () { throw b(a, ["destroyElement"]) }, empty: function () { throw b(a, ["empty"]) }, setElement: function () { throw b(a, ["set('element', ...)"]) }, renderToBufferIfNeeded: function () { throw b(a, ["renderToBufferIfNeeded"]) }, insertElement: Ember.K} } (), function () { } (), function () { var a = Ember.get, b = Ember.set, c = Ember.meta, d = Ember.EnumerableUtils.forEach, e = Ember.computed(function () { return a(this, "_childViews") }).property("_childViews"); Ember.ContainerView = Ember.View.extend({ init: function () { this._super(); var c = a(this, "childViews"); Ember.defineProperty(this, "childViews", e); var f = this._childViews; d(c, function (c, d) { var e; "string" == typeof c ? (e = a(this, c), e = this.createChildView(e), b(this, c, e)) : e = this.createChildView(c), f[d] = e }, this); var g = a(this, "currentView"); g && f.push(this.createChildView(g)), Ember.A(f), a(this, "childViews").addArrayObserver(this, { willChange: "childViewsWillChange", didChange: "childViewsDidChange" }) }, render: function (a) { this.forEachChildView(function (b) { b.renderToBuffer(a) }) }, instrumentName: "render.container", willDestroy: function () { a(this, "childViews").removeArrayObserver(this, { willChange: "childViewsWillChange", didChange: "childViewsDidChange" }), this._super() }, childViewsWillChange: function (a, b, c) { if (c === 0) return; var d = a.slice(b, b + c); this.initializeViews(d, null, null), this.invokeForState("childViewsWillChange", a, b, c) }, childViewsDidChange: function (b, c, d, e) { var f = a(b, "length"); if (e === 0) return; var g = b.slice(c, c + e); this.initializeViews(g, this, a(this, "templateData")), this.invokeForState("childViewsDidChange", b, c, e) }, initializeViews: function (c, e, f) { d(c, function (c) { b(c, "_parentView", e), a(c, "templateData") || b(c, "templateData", f) }) }, currentView: null, _currentViewWillChange: Ember.beforeObserver(function () { var b = a(this, "childViews"), c = a(this, "currentView"); c && (b.removeObject(c), c.destroy()) }, "currentView"), _currentViewDidChange: Ember.observer(function () { var b = a(this, "childViews"), c = a(this, "currentView"); c && b.pushObject(c) }, "currentView"), _ensureChildrenAreInDOM: function () { this.invokeForState("ensureChildrenAreInDOM", this) } }), Ember.ContainerView.states = { parent: Ember.View.states, inBuffer: { childViewsDidChange: function (a, b, c, d) { var e = a.buffer, f, g, h, i; c === 0 ? (i = b[c], f = c + 1, i.renderToBuffer(e, "prepend")) : (i = b[c - 1], f = c); for (var j = f; j < c + d; j++) g = i, i = b[j], h = g.buffer, i.renderToBuffer(h, "insertAfter") } }, hasElement: { childViewsWillChange: function (a, b, c, d) { for (var e = c; e < c + d; e++) b[e].remove() }, childViewsDidChange: function (a, b, c, d) { Ember.run.scheduleOnce("render", this, "_ensureChildrenAreInDOM") }, ensureChildrenAreInDOM: function (a) { var b = a.get("childViews"), c, d, e, f, g; for (c = 0, d = b.length; c < d; c++) e = b[c], g = e.renderToBufferIfNeeded(), g && (e._notifyWillInsertElement(), f ? f.domManager.after(f, g.string()) : a.domManager.prepend(a, g.string()), e.transitionTo("inDOM"), e.propertyDidChange("element"), e._notifyDidInsertElement()), f = e } } }, Ember.ContainerView.states.inDOM = { parentState: Ember.ContainerView.states.hasElement }, Ember.ContainerView.reopen({ states: Ember.ContainerView.states }) } (), function () { var a = Ember.get, b = Ember.set, c = Ember.String.fmt; Ember.CollectionView = Ember.ContainerView.extend({ content: null, emptyViewClass: Ember.View, emptyView: null, itemViewClass: Ember.View, init: function () { var a = this._super(); return this._contentDidChange(), a }, _contentWillChange: Ember.beforeObserver(function () { var b = this.get("content"); b && b.removeArrayObserver(this); var c = b ? a(b, "length") : 0; this.arrayWillChange(b, 0, c) }, "content"), _contentDidChange: Ember.observer(function () { var b = a(this, "content"); b && b.addArrayObserver(this); var c = b ? a(b, "length") : 0; this.arrayDidChange(b, 0, null, c) }, "content"), willDestroy: function () { var b = a(this, "content"); b && b.removeArrayObserver(this), this._super() }, arrayWillChange: function (b, c, d) { var e = a(this, "emptyView"); e && e instanceof Ember.View && e.removeFromParent(); var f = a(this, "childViews"), g, h, i; i = a(f, "length"); var j = d === i; j && this.invokeForState("empty"); for (h = c + d - 1; h >= c; h--) g = f[h], j && (g.removedFromDOM = !0), g.destroy() }, arrayDidChange: function (c, d, e, f) { var g = a(this, "itemViewClass"), h = a(this, "childViews"), i = [], j, k, l, m, n; "string" == typeof g && (g = a(g)), m = c ? a(c, "length") : 0; if (m) for (l = d; l < d + f; l++) k = c.objectAt(l), j = this.createChildView(g, { content: k, contentIndex: l }), i.push(j); else { var o = a(this, "emptyView"); if (!o) return; o = this.createChildView(o), i.push(o), b(this, "emptyView", o) } h.replace(d, 0, i) }, createChildView: function (c, d) { c = this._super(c, d); var e = a(c, "tagName"), f = e === null || e === undefined ? Ember.CollectionView.CONTAINER_MAP[a(this, "tagName")] : e; return b(c, "tagName", f), c } }), Ember.CollectionView.CONTAINER_MAP = { ul: "li", ol: "li", table: "tr", thead: "tr", tbody: "tr", tfoot: "tr", tr: "td", select: "option"} } (), function () { } (), function () { } (), function () { var a = Ember.get, b = Ember.set; Ember.State = Ember.Object.extend(Ember.Evented, { isState: !0, parentState: null, start: null, name: null, path: Ember.computed(function () { var b = a(this, "parentState.path"), c = a(this, "name"); return b && (c = b + "." + c), c }).property(), trigger: function (a) { this[a] && this[a].apply(this, [].slice.call(arguments, 1)), this._super.apply(this, arguments) }, init: function () { var c = a(this, "states"), d; b(this, "childStates", Ember.A()), b(this, "eventTransitions", a(this, "eventTransitions") || {}); var e, f, g; if (!c) { c = {}; for (e in this) { if (e === "constructor") continue; if (f = this[e]) { if (g = f.transitionTarget) this.eventTransitions[e] = g; this.setupChild(c, e, f) } } b(this, "states", c) } else for (e in c) this.setupChild(c, e, c[e]); b(this, "pathsCache", {}), b(this, "pathsCacheNoContext", {}) }, setupChild: function (c, d, e) { if (!e) return !1; e.isState ? b(e, "name", d) : Ember.State.detect(e) && (e = e.create({ name: d })); if (e.isState) return b(e, "parentState", this), a(this, "childStates").pushObject(e), c[d] = e, e }, lookupEventTransition: function (a) { var b, c = this; while (c && !b) b = c.eventTransitions[a], c = c.get("parentState"); return b }, isLeaf: Ember.computed(function () { return !a(this, "childStates").length }), hasContext: !0, setup: Ember.K, enter: Ember.K, exit: Ember.K }), Ember.State.reopenClass({ transitionTo: function (a) { var b = function (b, c) { var d = [], e, f = Ember.$ && Ember.$.Event; c && f && c instanceof f ? c.hasOwnProperty("contexts") && (d = c.contexts.slice()) : d = [].slice.call(arguments, 1), d.unshift(a), b.transitionTo.apply(b, d) }; return b.transitionTarget = a, b } }) } (), function () { var a = Ember.get, b = Ember.set, c = Ember.String.fmt, d = Ember.ArrayPolyfills.forEach, e = function (a) { this.enterStates = a.enterStates.slice(), this.exitStates = a.exitStates.slice(), this.resolveState = a.resolveState, this.finalState = a.enterStates[a.enterStates.length - 1] || a.resolveState }; e.prototype = { normalize: function (a, b) { return this.matchContextsToStates(b), this.addInitialStates(), this.removeUnchangedContexts(a), this }, matchContextsToStates: function (b) { var c = this.enterStates.length - 1, d = [], e, f; while (b.length > 0) { if (c >= 0) e = this.enterStates[c--]; else { if (this.enterStates.length) { e = a(this.enterStates[0], "parentState"); if (!e) throw "Cannot match all contexts to states" } else e = this.resolveState; this.enterStates.unshift(e), this.exitStates.unshift(e) } a(e, "hasContext") ? f = b.pop() : f = null, d.unshift(f) } this.contexts = d }, addInitialStates: function () { var b = this.finalState, c; for (; ; ) { c = a(b, "initialState") || "start", b = a(b, "states." + c); if (!b) break; this.finalState = b, this.enterStates.push(b), this.contexts.push(undefined) } }, removeUnchangedContexts: function (a) { while (this.enterStates.length > 0) { if (this.enterStates[0] !== this.exitStates[0]) break; if (this.enterStates.length === this.contexts.length) { if (a.getStateMeta(this.enterStates[0], "context") !== this.contexts[0]) break; this.contexts.shift() } this.resolveState = this.enterStates.shift(), this.exitStates.shift() } } }, Ember.StateManager = Ember.State.extend({ init: function () { this._super(), b(this, "stateMeta", Ember.Map.create()); var c = a(this, "initialState"); !c && a(this, "states.start") && (c = "start"), c && this.transitionTo(c) }, stateMetaFor: function (b) { var c = a(this, "stateMeta"), d = c.get(b); return d || (d = {}, c.set(b, d)), d }, setStateMeta: function (a, c, d) { return b(this.stateMetaFor(a), c, d) }, getStateMeta: function (b, c) { return a(this.stateMetaFor(b), c) }, currentState: null, currentPath: Ember.computed("currentState", function () { return a(this, "currentState.path") }), transitionEvent: "setup", errorOnUnhandledEvent: !0, send: function (b) { var c, d; return c = [].slice.call(arguments, 1), d = c, d.unshift(b, a(this, "currentState")), this.sendRecursively.apply(this, d) }, sendRecursively: function (b, d) { var e = this.enableLogging, f = d[b], g, h, i; g = [].slice.call(arguments, 2); if (typeof f == "function") return e && Ember.Logger.log(c("STATEMANAGER: Sending event '%@' to state %@.", [b, a(d, "path")])), i = g, i.unshift(this), f.apply(d, i); var j = a(d, "parentState"); if (j) return h = g, h.unshift(b, j), this.sendRecursively.apply(this, h); if (a(this, "errorOnUnhandledEvent")) throw new Ember.Error(this.toString() + " could not respond to event " + b + " in state " + a(this, "currentState.path") + ".") }, getStateByPath: function (b, c) { var d = c.split("."), e = b; for (var f = 0, g = d.length; f < g; f++) { e = a(a(e, "states"), d[f]); if (!e) break } return e }, findStateByPath: function (b, c) { var d; while (!d && b) d = this.getStateByPath(b, c), b = a(b, "parentState"); return d }, getStatesInPath: function (b, c) { if (!c || c === "") return undefined; var d = c.split("."), e = [], f, g; for (var h = 0, i = d.length; h < i; h++) { f = a(b, "states"); if (!f) return undefined; g = a(f, d[h]); if (!g) return undefined; b = g, e.push(g) } return e }, goToState: function () { return this.transitionTo.apply(this, arguments) }, transitionTo: function (b, c) { if (Ember.empty(b)) return; var d = c ? Array.prototype.slice.call(arguments, 1) : [], f = a(this, "currentState") || this, g = this.contextFreeTransition(f, b), h = (new e(g)).normalize(this, d); this.enterState(h), this.triggerSetupContext(h) }, contextFreeTransition: function (b, c) { var d = b.pathsCache[c]; if (d) return d; var e = this.getStatesInPath(b, c), f = [], g = b; while (g && !e) { f.unshift(g), g = a(g, "parentState"); if (!g) { e = this.getStatesInPath(this, c); if (!e) return } e = this.getStatesInPath(g, c) } while (e.length > 0 && e[0] === f[0]) g = e.shift(), f.shift(); var h = b.pathsCache[c] = { exitStates: f, enterStates: e, resolveState: g }; return h }, triggerSetupContext: function (b) { var c = b.contexts, e = b.enterStates.length - c.length, f = b.enterStates, g = a(this, "transitionEvent"); d.call(f, function (a, b) { a.trigger(g, this, c[b - e]) }, this) }, getState: function (b) { var c = a(this, b), d = a(this, "parentState"); if (c) return c; if (d) return d.getState(b) }, enterState: function (c) { var e = this.enableLogging, f = c.exitStates.slice(0).reverse(); d.call(f, function (a) { a.trigger("exit", this) }, this), d.call(c.enterStates, function (b) { e && Ember.Logger.log("STATEMANAGER: Entering " + a(b, "path")), b.trigger("enter", this) }, this), b(this, "currentState", c.finalState) } }) } (), function () { } (), function () { var a = Ember.get; Ember._ResolvedState = Ember.Object.extend({ manager: null, state: null, match: null, object: Ember.computed(function (b, c) { if (arguments.length === 2) return this._object = c, c; if (this._object) return this._object; var d = a(this, "state"), e = a(this, "match"), f = a(this, "manager"); return d.deserialize(f, e.hash) }).property(), hasPromise: Ember.computed(function () { return Ember.canInvoke(a(this, "object"), "then") }).property("object"), promise: Ember.computed(function () { var b = a(this, "object"); return Ember.canInvoke(b, "then") ? b : { then: function (a) { a(b) } } }).property("object"), transition: function () { var b = a(this, "manager"), c = a(this, "state.path"), d = a(this, "object"); b.transitionTo(c, d) } }) } (), function () { var a = Ember.get, b = function (a) { var b = a.toString(), c = b.split("."), d = c[c.length - 1]; return Ember.String.underscore(d) + "_id" }, c = function (a, b) { for (var c in b) { if (!b.hasOwnProperty(c)) continue; if (a.hasOwnProperty(c)) continue; a[c] = b[c] } }; Ember.Routable = Ember.Mixin.create({ init: function () { var b; this.on("setup", this, this.stashContext); if (b = a(this, "redirectsTo")) this.connectOutlets = function (a) { a.transitionTo(b) }; var c = a(this, "route"); c === "" && (c = "/"), this._super() }, setup: function () { return this.connectOutlets.apply(this, arguments) }, stashContext: function (b, c) { this.router = b; var d = this.serialize(b, c); b.setStateMeta(this, "context", c), b.setStateMeta(this, "serialized", d), a(this, "isRoutable") && !a(b, "isRouting") && this.updateRoute(b, a(b, "location")) }, updateRoute: function (b, c) { if (a(this, "isLeafRoute")) { var d = this.absoluteRoute(b); c.setURL(d) } }, absoluteRoute: function (b, d) { var e = a(this, "parentState"), f = "", g; a(e, "isRoutable") && (f = e.absoluteRoute(b, d)); var h = a(this, "routeMatcher"), i = b.getStateMeta(this, "serialized"); return d = d || {}, c(d, i), g = h && h.generate(d), g && (f = f + "/" + g), f }, isRoutable: Ember.computed(function () { return typeof a(this, "route") == "string" }), isLeafRoute: Ember.computed(function () { return a(this, "isLeaf") ? !0 : !a(this, "childStates").findProperty("isRoutable") }), routeMatcher: Ember.computed(function () { var b = a(this, "route"); if (b) return Ember._RouteMatcher.create({ route: b }) }), hasContext: Ember.computed(function () { var b = a(this, "routeMatcher"); if (b) return b.identifiers.length > 0 }), modelClass: Ember.computed(function () { var b = a(this, "modelType"); return typeof b == "string" ? Ember.get(Ember.lookup, b) : b }), modelClassFor: function (b) { var c, d, e, f, g; if (c = a(this, "modelClass")) return c; if (!b) return; d = a(this, "routeMatcher"); if (!d) return; e = d.identifiers; if (e.length !== 2) return; f = e[1].match(/^(.*)_id$/); if (!f) return; return g = Ember.String.classify(f[1]), a(b, g) }, deserialize: function (c, d) { var e, f, g; return (e = this.modelClassFor(a(c, "namespace"))) ? e.find(d[b(e)]) : d }, serialize: function (c, d) { var e, f, g, h, i; if (Ember.empty(d)) return ""; if (e = this.modelClassFor(a(c, "namespace"))) h = b(e), i = a(d, "id"), d = {}, d[h] = i; return d }, resolvePath: function (b, c) { if (a(this, "isLeafRoute")) return Ember.A(); var d = a(this, "childStates"), e; d = Ember.A(d.filterProperty("isRoutable")), d = d.sort(function (b, c) { var d = a(b, "routeMatcher.identifiers.length"), e = a(c, "routeMatcher.identifiers.length"), f = a(b, "route"), g = a(c, "route"); return f.indexOf(g) === 0 ? -1 : g.indexOf(f) === 0 ? 1 : d !== e ? d - e : a(c, "route.length") - a(b, "route.length") }); var f = d.find(function (b) { var d = a(b, "routeMatcher"); if (e = d.match(c)) return !0 }), g = Ember._ResolvedState.create({ manager: b, state: f, match: e }), h = f.resolvePath(b, e.remaining); return Ember.A([g]).pushObjects(h) }, routePath: function (b, c) { function f() { d.forEach(function (a) { a.transition() }) } if (a(this, "isLeafRoute")) return; var d = this.resolvePath(b, c), e = d.some(function (b) { return a(b, "hasPromise") }); e ? (b.transitionTo("loading"), b.handleStatePromises(d, f)) : f() }, unroutePath: function (b, c) { var d = a(this, "parentState"); if (d === b) return; c = c.replace(/^(?=[^\/])/, "/"); var e = this.absoluteRoute(b), f = a(this, "route"); if (f !== "/") { var g = c.indexOf(e), h = c.charAt(e.length); if (g === 0 && (h === "/" || h === "")) return } b.enterState({ exitStates: [this], enterStates: [], finalState: d }), b.send("unroutePath", c) }, parentTemplate: Ember.computed(function () { var b = this, c, d; while (b = a(b, "parentState")) if (d = a(b, "template")) return d; return "application" }), _template: Ember.computed(function (b, c) { if (arguments.length > 1) return c; if (c = a(this, "template")) return c; var d = this.constructor.toString(), e; if (/^[^\[].*Route$/.test(d)) return e = d.match(/([^\.]+\.)*([^\.]+)/)[2], e = e.replace(/Route$/, ""), e.charAt(0).toLowerCase() + e.substr(1) }), render: function (b) { b = b || {}; var c = b.template || a(this, "_template"), d = b.into || a(this, "parentTemplate"), e = a(this.router, d + "Controller"), f = Ember.String.classify(c) + "View", g = a(a(this.router, "namespace"), f); g = (g || Ember.View).extend({ templateName: c }), e.set("view", g.create()) }, connectOutlets: Ember.K, navigateAway: Ember.K }) } (), function () { Ember.Route = Ember.State.extend(Ember.Routable) } (), function () { var a = function (a) { return a.replace(/[\-\[\]{}()*+?.,\\\^\$|#\s]/g, "\\$&") }; Ember._RouteMatcher = Ember.Object.extend({ state: null, init: function () { var b = this.route, c = [], d = 1, e; b.charAt(0) === "/" && (b = this.route = b.substr(1)), e = a(b); var f = e.replace(/(:|(?:\\\*))([a-z_]+)(?=$|\/)/gi, function (a, b, e) { c[d++] = e; switch (b) { case ":": return "([^/]+)"; case "\\*": return "(.+)" } }); this.identifiers = c, this.regex = new RegExp("^/?" + f) }, match: function (a) { var b = a.match(this.regex); if (b) { var c = this.identifiers, d = {}; for (var e = 1, f = c.length; e < f; e++) d[c[e]] = b[e]; return { remaining: a.substr(b[0].length), hash: c.length > 0 ? d : null} } }, generate: function (a) { var b = this.identifiers, c = this.route, d; for (var e = 1, f = b.length; e < f; e++) d = b[e], c = c.replace(new RegExp("(:|(\\*))" + d), a[d]); return c } }) } (), function () { var a = Ember.get, b = Ember.set; Ember.Location = { create: function (a) { var b = a && a.implementation, c = this.implementations[b]; return c.create.apply(c, arguments) }, registerImplementation: function (a, b) { this.implementations[a] = b }, implementations: {}} } (), function () { var a = Ember.get, b = Ember.set; Ember.NoneLocation = Ember.Object.extend({ path: "", getURL: function () { return a(this, "path") }, setURL: function (a) { b(this, "path", a) }, onUpdateURL: function (a) { }, formatURL: function (a) { return a } }), Ember.Location.registerImplementation("none", Ember.NoneLocation) } (), function () { var a = Ember.get, b = Ember.set; Ember.HashLocation = Ember.Object.extend({ init: function () { b(this, "location", a(this, "location") || window.location) }, getURL: function () { return a(this, "location").hash.substr(1) }, setURL: function (c) { a(this, "location").hash = c, b(this, "lastSetURL", c) }, onUpdateURL: function (c) { var d = this, e = Ember.guidFor(this); Ember.$(window).bind("hashchange.ember-location-" + e, function () { var e = location.hash.substr(1); if (a(d, "lastSetURL") === e) return; b(d, "lastSetURL", null), c(location.hash.substr(1)) }) }, formatURL: function (a) { return "#" + a }, willDestroy: function () { var a = Ember.guidFor(this); Ember.$(window).unbind("hashchange.ember-location-" + a) } }), Ember.Location.registerImplementation("hash", Ember.HashLocation) } (), function () { var a = Ember.get, b = Ember.set, c = !1; Ember.HistoryLocation = Ember.Object.extend({ init: function () { b(this, "location", a(this, "location") || window.location), this.initState() }, initState: function () { this.replaceState(a(this, "location").pathname), b(this, "history", window.history) }, rootURL: "/", getURL: function () { return a(this, "location").pathname }, setURL: function (a) { a = this.formatURL(a), this.getState().path !== a && (c = !0, this.pushState(a)) }, getState: function () { return a(this, "history").state }, pushState: function (a) { window.history.pushState({ path: a }, null, a) }, replaceState: function (a) { window.history.replaceState({ path: a }, null, a) }, onUpdateURL: function (a) { var b = Ember.guidFor(this); Ember.$(window).bind("popstate.ember-location-" + b, function (b) { if (!c) return; a(location.pathname) }) }, formatURL: function (b) { var c = a(this, "rootURL"); return b !== "" && (c = c.replace(/\/$/, "")), c + b }, willDestroy: function () { var a = Ember.guidFor(this); Ember.$(window).unbind("popstate.ember-location-" + a) } }), Ember.Location.registerImplementation("history", Ember.HistoryLocation) } (), function () { } (), function () { var a = Ember.get, b = Ember.set, c = function (a, b) { for (var c in b) { if (!b.hasOwnProperty(c)) continue; if (a.hasOwnProperty(c)) continue; a[c] = b[c] } }; Ember.Router = Ember.StateManager.extend({ initialState: "root", location: "hash", rootURL: "/", transitionTo: function () { this.abortRoutingPromises(), this._super.apply(this, arguments) }, route: function (c) { this.abortRoutingPromises(), b(this, "isRouting", !0); var d; try { c = c.replace(a(this, "rootURL"), ""), c = c.replace(/^(?=[^\/])/, "/"), this.send("navigateAway"), this.send("unroutePath", c), d = a(this, "currentState"); while (d && !d.get("isRoutable")) d = a(d, "parentState"); var e = d ? d.absoluteRoute(this) : "", f = c.substr(e.length); this.send("routePath", f) } finally { b(this, "isRouting", !1) } d = a(this, "currentState"); while (d && !d.get("isRoutable")) d = a(d, "parentState"); d && d.updateRoute(this, a(this, "location")) }, urlFor: function (b, c) { var d = a(this, "currentState") || this, e = this.findStateByPath(d, b), f = a(this, "location"), g = e.absoluteRoute(this, c); return f.formatURL(g) }, urlForEvent: function (b) { var c = Array.prototype.slice.call(arguments, 1), d = a(this, "currentState"), e = d.lookupEventTransition(b), f = this.findStateByPath(d, e), g = this.serializeRecursively(f, c, {}); return this.urlFor(e, g) }, serializeRecursively: function (b, d, e) { var f, g = a(b, "hasContext") ? d.pop() : null; return c(e, b.serialize(this, g)), f = b.get("parentState"), f && f instanceof Ember.Route ? this.serializeRecursively(f, d, e) : e }, abortRoutingPromises: function () { this._routingPromises && (this._routingPromises.abort(), this._routingPromises = null) }, handleStatePromises: function (a, c) { this.abortRoutingPromises(), this.set("isLocked", !0); var d = this; this._routingPromises = Ember._PromiseChain.create({ promises: a.slice(), successCallback: function () { d.set("isLocked", !1), c() }, failureCallback: function () { throw "Unable to load object" }, promiseSuccessCallback: function (a, c) { b(a, "object", c[0]) }, abortCallback: function () { d.set("isLocked", !1) } }).start() }, moveStatesIntoRoot: function () { this.root = Ember.Route.extend(); for (var a in this) { if (a === "constructor") continue; var b = this[a]; if (b instanceof Ember.Route || Ember.Route.detect(b)) this.root[a] = b, delete this[a] } }, init: function () { this.root || this.moveStatesIntoRoot(), this._super(); var c = a(this, "location"), d = a(this, "rootURL"); "string" == typeof c && b(this, "location", Ember.Location.create({ implementation: c, rootURL: d })), this.assignRouter(this, this) }, assignRouter: function (a, b) { a.router = b; var c = a.states; if (c) for (var d in c) { if (!c.hasOwnProperty(d)) continue; this.assignRouter(c[d], b) } }, willDestroy: function () { a(this, "location").destroy() } }) } (), function () { } (), function () { (function (a) { var b = function () { }, c = 0, d = a.document, e = "createRange" in d && typeof Range != "undefined" && Range.prototype.createContextualFragment, f = function () { var a = d.createElement("div"); return a.innerHTML = "<div></div>", a.firstChild.innerHTML = "<script></script>", a.firstChild.innerHTML === "" } (), g = function (a) { var d; this instanceof g ? d = this : d = new b, d.innerHTML = a; var e = "metamorph-" + c++; return d.start = e + "-start", d.end = e + "-end", d }; b.prototype = g.prototype; var h, i, j, k, l, m, n, o, p; k = function () { return this.startTag() + this.innerHTML + this.endTag() }, o = function () { return "<script id='" + this.start + "' type='text/x-placeholder'></script>" }, p = function () { return "<script id='" + this.end + "' type='text/x-placeholder'></script>" }; if (e) h = function (a, b) { var c = d.createRange(), e = d.getElementById(a.start), f = d.getElementById(a.end); return b ? (c.setStartBefore(e), c.setEndAfter(f)) : (c.setStartAfter(e), c.setEndBefore(f)), c }, i = function (a, b) { var c = h(this, b); c.deleteContents(); var d = c.createContextualFragment(a); c.insertNode(d) }, j = function () { var a = h(this, !0); a.deleteContents() }, l = function (a) { var b = d.createRange(); b.setStart(a), b.collapse(!1); var c = b.createContextualFragment(this.outerHTML()); a.appendChild(c) }, m = function (a) { var b = d.createRange(), c = d.getElementById(this.end); b.setStartAfter(c), b.setEndAfter(c); var e = b.createContextualFragment(a); b.insertNode(e) }, n = function (a) { var b = d.createRange(), c = d.getElementById(this.start); b.setStartAfter(c), b.setEndAfter(c); var e = b.createContextualFragment(a); b.insertNode(e) }; else { var q = { select: [1, "<select multiple='multiple'>", "</select>"], fieldset: [1, "<fieldset>", "</fieldset>"], table: [1, "<table>", "</table>"], tbody: [2, "<table><tbody>", "</tbody></table>"], tr: [3, "<table><tbody><tr>", "</tr></tbody></table>"], colgroup: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], map: [1, "<map>", "</map>"], _default: [0, "", ""] }, r = function (a, b) { var c = q[a.tagName.toLowerCase()] || q._default, e = c[0], g = c[1], h = c[2]; f && (b = "&shy;" + b); var i = d.createElement("div"); i.innerHTML = g + b + h; for (var j = 0; j <= e; j++) i = i.firstChild; if (f) { var k = i; while (k.nodeType === 1 && !k.nodeName) k = k.firstChild; k.nodeType === 3 && k.nodeValue.charAt(0) === "­" && (k.nodeValue = k.nodeValue.slice(1)) } return i }, s = function (a) { while (a.parentNode.tagName === "") a = a.parentNode; return a }, t = function (a, b) { a.parentNode !== b.parentNode && b.parentNode.insertBefore(a, b.parentNode.firstChild) }; i = function (a, b) { var c = s(d.getElementById(this.start)), e = d.getElementById(this.end), f = e.parentNode, g, h, i; t(c, e), g = c.nextSibling; while (g) { h = g.nextSibling, i = g === e; if (i) { if (!b) break; e = g.nextSibling } g.parentNode.removeChild(g); if (i) break; g = h } g = r(c.parentNode, a); while (g) h = g.nextSibling, f.insertBefore(g, e), g = h }, j = function () { var a = s(d.getElementById(this.start)), b = d.getElementById(this.end); this.html(""), a.parentNode.removeChild(a), b.parentNode.removeChild(b) }, l = function (a) { var b = r(a, this.outerHTML()); while (b) nextSibling = b.nextSibling, a.appendChild(b), b = nextSibling }, m = function (a) { var b = d.getElementById(this.end), c = b.nextSibling, e = b.parentNode, f, g; g = r(e, a); while (g) f = g.nextSibling, e.insertBefore(g, c), g = f }, n = function (a) { var b = d.getElementById(this.start), c = b.parentNode, e, f; f = r(c, a); var g = b.nextSibling; while (f) e = f.nextSibling, c.insertBefore(f, g), f = e } } g.prototype.html = function (a) { this.checkRemoved(); if (a === undefined) return this.innerHTML; i.call(this, a), this.innerHTML = a }, g.prototype.replaceWith = function (a) { this.checkRemoved(), i.call(this, a, !0) }, g.prototype.remove = j, g.prototype.outerHTML = k, g.prototype.appendTo = l, g.prototype.after = m, g.prototype.prepend = n, g.prototype.startTag = o, g.prototype.endTag = p, g.prototype.isRemoved = function () { var a = d.getElementById(this.start), b = d.getElementById(this.end); return !a || !b }, g.prototype.checkRemoved = function () { if (this.isRemoved()) throw new Error("Cannot perform operations on a Metamorph that is not in the DOM.") }, a.Metamorph = g })(this) } (), function () { var a = Ember.create, b = Ember.imports.Handlebars; Ember.Handlebars = a(b), Ember.Handlebars.helpers = a(b.helpers), Ember.Handlebars.Compiler = function () { }, b.Compiler && (Ember.Handlebars.Compiler.prototype = a(b.Compiler.prototype)), Ember.Handlebars.Compiler.prototype.compiler = Ember.Handlebars.Compiler, Ember.Handlebars.JavaScriptCompiler = function () { }, b.JavaScriptCompiler && (Ember.Handlebars.JavaScriptCompiler.prototype = a(b.JavaScriptCompiler.prototype), Ember.Handlebars.JavaScriptCompiler.prototype.compiler = Ember.Handlebars.JavaScriptCompiler), Ember.Handlebars.JavaScriptCompiler.prototype.namespace = "Ember.Handlebars", Ember.Handlebars.JavaScriptCompiler.prototype.initializeBuffer = function () { return "''" }, Ember.Handlebars.JavaScriptCompiler.prototype.appendToBuffer = function (a) { return "data.buffer.push(" + a + ");" }, Ember.Handlebars.Compiler.prototype.mustache = function (a) { if (a.params.length || a.hash) return b.Compiler.prototype.mustache.call(this, a); var c = new b.AST.IdNode(["_triageMustache"]); return a.escaped || (a.hash = a.hash || new b.AST.HashNode([]), a.hash.pairs.push(["unescaped", new b.AST.StringNode("true")])), a = new b.AST.MustacheNode([c].concat([a.id]), a.hash, !a.escaped), b.Compiler.prototype.mustache.call(this, a) }, Ember.Handlebars.precompile = function (a) { var c = b.parse(a), d = { knownHelpers: { action: !0, unbound: !0, bindAttr: !0, template: !0, view: !0, _triageMustache: !0 }, data: !0, stringParams: !0 }, e = (new Ember.Handlebars.Compiler).compile(c, d); return (new Ember.Handlebars.JavaScriptCompiler).compile(e, d, undefined, !0) }, b.compile && (Ember.Handlebars.compile = function (a) { var c = b.parse(a), d = { data: !0, stringParams: !0 }, e = (new Ember.Handlebars.Compiler).compile(c, d), f = (new Ember.Handlebars.JavaScriptCompiler).compile(e, d, undefined, !0); return b.template(f) }); var c = Ember.Handlebars.normalizePath = function (a, b, c) { var d = c && c.keywords || {}, e, f; return e = b.split(".", 1)[0], d.hasOwnProperty(e) && (a = d[e], f = !0, b === e ? b = "" : b = b.substr(e.length + 1)), { root: a, path: b, isKeyword: f} }; Ember.Handlebars.get = function (a, b, d) { var e = d && d.data, f = c(a, b, e), g; return a = f.root, b = f.path, g = Ember.get(a, b), g === undefined && a !== Ember.lookup && Ember.isGlobalPath(b) && (g = Ember.get(Ember.lookup, b)), g }, Ember.Handlebars.getPath = Ember.deprecateFunc("`Ember.Handlebars.getPath` has been changed to `Ember.Handlebars.get` for consistency.", Ember.Handlebars.get), Ember.Handlebars.registerHelper("helperMissing", function (a, b) { var c, d = ""; throw c = "%@ Handlebars error: Could not find property '%@' on object %@.", b.data && (d = b.data.view), new Ember.Error(Ember.String.fmt(c, [d, a, this])) }) } (), function () { Ember.String.htmlSafe = function (a) { return new Handlebars.SafeString(a) }; var a = Ember.String.htmlSafe; if (Ember.EXTEND_PROTOTYPES === !0 || Ember.EXTEND_PROTOTYPES.String) String.prototype.htmlSafe = function () { return a(this) } } (), function () {
    var a = Ember.set, b = Ember.get, c = { remove: function (a) { a.morph.remove() }, prepend: function (a, b) { a.morph.prepend(b) }, after: function (a, b) { a.morph.after(b) }, html: function (a, b) { a.morph.html(b) }, replace: function (a) { var c = a.morph; a.transitionTo("preRender"), a.clearRenderedChildren(); var d = a.renderToBuffer(); Ember.run.schedule("render", this, function () { if (b(a, "isDestroyed")) return; a.invalidateRecursively("element"), a._notifyWillInsertElement(), c.replaceWith(d.string()), a.transitionTo("inDOM"), a._notifyDidInsertElement() }) }, empty: function (a) { a.morph.html("") } }; Ember._Metamorph = Ember.Mixin
    .create({ isVirtual: !0, tagName: "", instrumentName: "render.metamorph", init: function () { this._super(), this.morph = Metamorph() }, beforeRender: function (a) { a.push(this.morph.startTag()) }, afterRender: function (a) { a.push(this.morph.endTag()) }, createElement: function () { var a = this.renderToBuffer(); this.outerHTML = a.string(), this.clearBuffer() }, domManager: c }), Ember._MetamorphView = Ember.View.extend(Ember._Metamorph), Ember._SimpleMetamorphView = Ember.CoreView.extend(Ember._Metamorph)
} (), function () { var a = Ember.get, b = Ember.set, c = Ember.Handlebars.get; Ember._SimpleHandlebarsView = Ember._SimpleMetamorphView.extend({ instrumentName: "render.simpleHandlebars", normalizedValue: Ember.computed(function () { var b = a(this, "path"), d = a(this, "pathRoot"), e, f; return b === "" ? e = d : (f = a(this, "templateData"), e = c(d, b, { data: f })), e }).property("path", "pathRoot").volatile(), render: function (b) { var c = a(this, "isEscaped"), d = a(this, "normalizedValue"); d === null || d === undefined ? d = "" : d instanceof Handlebars.SafeString || (d = String(d)), c && (d = Handlebars.Utils.escapeExpression(d)), b.push(d); return }, rerender: function () { switch (this.state) { case "preRender": case "destroyed": break; case "inBuffer": throw new Error("Something you did tried to replace an {{expression}} before it was inserted into the DOM."); case "hasElement": case "inDOM": this.domManager.replace(this) } return this }, transitionTo: function (a) { this.state = a } }), Ember._HandlebarsBoundView = Ember._MetamorphView.extend({ instrumentName: "render.boundHandlebars", shouldDisplayFunc: null, preserveContext: !1, previousContext: null, displayTemplate: null, inverseTemplate: null, path: null, pathRoot: null, normalizedValue: Ember.computed(function () { var b = a(this, "path"), d = a(this, "pathRoot"), e = a(this, "valueNormalizerFunc"), f, g; return b === "" ? f = d : (g = a(this, "templateData"), f = c(d, b, { data: g })), e ? e(f) : f }).property("path", "pathRoot", "valueNormalizerFunc").volatile(), rerenderIfNeeded: function () { !a(this, "isDestroyed") && a(this, "normalizedValue") !== this._lastNormalizedValue && this.rerender() }, render: function (c) { var d = a(this, "isEscaped"), e = a(this, "shouldDisplayFunc"), f = a(this, "preserveContext"), g = a(this, "previousContext"), h = a(this, "inverseTemplate"), i = a(this, "displayTemplate"), j = a(this, "normalizedValue"); this._lastNormalizedValue = j; if (e(j)) { b(this, "template", i); if (f) b(this, "_context", g); else { if (!i) { j === null || j === undefined ? j = "" : j instanceof Handlebars.SafeString || (j = String(j)), d && (j = Handlebars.Utils.escapeExpression(j)), c.push(j); return } b(this, "_context", j) } } else h ? (b(this, "template", h), f ? b(this, "_context", g) : b(this, "_context", j)) : b(this, "template", function () { return "" }); return this._super(c) } }) } (), function () { function i(a, b, c, f, g) { var h = b.data, i = b.fn, j = b.inverse, k = h.view, l = this, m, n, o; o = e(l, a, h), m = o.root, n = o.path; if ("object" == typeof this) { var p = k.createChildView(Ember._HandlebarsBoundView, { preserveContext: c, shouldDisplayFunc: f, valueNormalizerFunc: g, displayTemplate: i, inverseTemplate: j, path: n, pathRoot: m, previousContext: l, isEscaped: !b.hash.unescaped, templateData: b.data }); k.appendChild(p); var q = function () { Ember.run.scheduleOnce("render", p, "rerenderIfNeeded") }; n !== "" && (Ember.addObserver(m, n, q), k.one("willClearRender", function () { Ember.removeObserver(m, n, q) })) } else h.buffer.push(d(m, n, b)) } function j(a, b) { var c = b.data, f = c.view, g = this, h, i, j; j = e(g, a, c), h = j.root, i = j.path; if ("object" == typeof this) { var k = Ember._SimpleHandlebarsView.create().setProperties({ path: i, pathRoot: h, isEscaped: !b.hash.unescaped, previousContext: g, templateData: b.data }); f.createChildView(k), f.appendChild(k); var l = function () { Ember.run.scheduleOnce("render", k, "rerender") }; i !== "" && (Ember.addObserver(h, i, l), f.one("willClearRender", function () { Ember.removeObserver(h, i, l) })) } else c.buffer.push(d(h, i, b)) } var a = Ember.get, b = Ember.set, c = Ember.String.fmt, d = Ember.Handlebars.get, e = Ember.Handlebars.normalizePath, f = Ember.ArrayPolyfills.forEach, g = Ember.Handlebars, h = g.helpers; g.registerHelper("_triageMustache", function (a, b) { return h[a] ? h[a].call(this, b) : h.bind.apply(this, arguments) }), g.registerHelper("bind", function (a, b) { var c = b.contexts && b.contexts[0] || this; return b.fn ? i.call(c, a, b, !1, function (a) { return !Ember.none(a) }) : j.call(c, a, b) }), g.registerHelper("boundIf", function (b, c) { var d = c.contexts && c.contexts[0] || this, e = function (b) { return Ember.typeOf(b) === "array" ? a(b, "length") !== 0 : !!b }; return i.call(d, b, c, !0, e, e) }), g.registerHelper("with", function (a, b) { if (arguments.length === 4) { var c, d, f, g; b = arguments[3], c = arguments[2], d = arguments[0]; if (Ember.isGlobalPath(d)) Ember.bind(b.data.keywords, c, d); else { g = e(this, d, b.data), d = g.path, f = g.root; var j = Ember.$.expando + Ember.guidFor(f); b.data.keywords[j] = f; var k = d ? j + "." + d : j; Ember.bind(b.data.keywords, c, k) } return i.call(this, d, b, !0, function (a) { return !Ember.none(a) }) } return h.bind.call(b.contexts[0], a, b) }), g.registerHelper("if", function (a, b) { return h.boundIf.call(b.contexts[0], a, b) }), g.registerHelper("unless", function (a, b) { var c = b.fn, d = b.inverse; return b.fn = d, b.inverse = c, h.boundIf.call(b.contexts[0], a, b) }), g.registerHelper("bindAttr", function (a) { var b = a.hash, c = a.data.view, h = [], i = this, j = ++Ember.uuid, k = b["class"]; if (k !== null && k !== undefined) { var l = g.bindClasses(this, k, c, j, a); h.push('class="' + Handlebars.Utils.escapeExpression(l.join(" ")) + '"'), delete b["class"] } var m = Ember.keys(b); return f.call(m, function (f) { var g = b[f], k, l; l = e(i, g, a.data), k = l.root, g = l.path; var m = g === "this" ? k : d(k, g, a), n = Ember.typeOf(m), o, p; o = function () { var e = d(k, g, a), h = c.$("[data-bindattr-" + j + "='" + j + "']"); if (!h || h.length === 0) { Ember.removeObserver(k, g, p); return } Ember.View.applyAttributeBindings(h, f, e) }, p = function () { Ember.run.scheduleOnce("render", o) }, g !== "this" && (Ember.addObserver(k, g, p), c.one("willClearRender", function () { Ember.removeObserver(k, g, p) })), n === "string" || n === "number" && !isNaN(m) ? h.push(f + '="' + Handlebars.Utils.escapeExpression(m) + '"') : m && n === "boolean" && h.push(f + '="' + f + '"') }, this), h.push("data-bindattr-" + j + '="' + j + '"'), new g.SafeString(h.join(" ")) }), g.bindClasses = function (a, b, c, g, h) { var i = [], j, k, l, m = function (a, b, c) { var e, f = b.path; return f === "this" ? e = a : f === "" ? e = !0 : e = d(a, f, c), Ember.View._classStringForValue(f, e, b.className, b.falsyClassName) }; return f.call(b.split(" "), function (b) { var d, f, n, o = Ember.View._parsePropertyPath(b), p = o.path, q = a, r; p !== "" && p !== "this" && (r = e(a, p, h.data), q = r.root, p = r.path), f = function () { j = m(q, o, h), l = g ? c.$("[data-bindattr-" + g + "='" + g + "']") : c.$(), !l || l.length === 0 ? Ember.removeObserver(q, p, n) : (d && l.removeClass(d), j ? (l.addClass(j), d = j) : d = null) }, n = function () { Ember.run.scheduleOnce("render", f) }, p !== "" && p !== "this" && (Ember.addObserver(q, p, n), c.one("willClearRender", function () { Ember.removeObserver(q, p, n) })), k = m(q, o, h), k && (i.push(k), d = k) }), i } } (), function () { var a = Ember.get, b = Ember.set, c = /^parentView\./, d = Ember.Handlebars; d.ViewHelper = Ember.Object.create({ propertiesFromHTMLOptions: function (a, b) { var c = a.hash, d = a.data, e = {}, f = c["class"], g = !1; c.id && (e.elementId = c.id, g = !0), f && (f = f.split(" "), e.classNames = f, g = !0), c.classBinding && (e.classNameBindings = c.classBinding.split(" "), g = !0), c.classNameBindings && (e.classNameBindings === undefined && (e.classNameBindings = []), e.classNameBindings = e.classNameBindings.concat(c.classNameBindings.split(" ")), g = !0), c.attributeBindings && (e.attributeBindings = null, g = !0), g && (c = Ember.$.extend({}, c), delete c.id, delete c["class"], delete c.classBinding); var h; for (var i in c) { if (!c.hasOwnProperty(i)) continue; Ember.IS_BINDING.test(i) && typeof c[i] == "string" && (h = this.contextualizeBindingPath(c[i], d), h && (c[i] = h)) } if (e.classNameBindings) for (var j in e.classNameBindings) { var k = e.classNameBindings[j]; if (typeof k == "string") { var l = Ember.View._parsePropertyPath(k); h = this.contextualizeBindingPath(l.path, d), h && (e.classNameBindings[j] = h + l.classNames) } } return e.bindingContext = b, Ember.$.extend(c, e) }, contextualizeBindingPath: function (a, b) { var c = Ember.Handlebars.normalizePath(null, a, b); return c.isKeyword ? "templateData.keywords." + a : Ember.isGlobalPath(a) ? null : a === "this" ? "bindingContext" : "bindingContext." + a }, helper: function (a, b, c) { var e = c.inverse, f = c.data, g = f.view, h = c.fn, i = c.hash, j; "string" == typeof b ? j = d.get(a, b, c) : j = b; var k = this.propertiesFromHTMLOptions(c, a), l = f.view; k.templateData = c.data, h && (k.template = h), !j.proto().controller && !j.proto().controllerBinding && !k.controller && !k.controllerBinding && (k._context = a), l.appendChild(j, k) } }), d.registerHelper("view", function (a, b) { return a && a.data && a.data.isRenderData && (b = a, a = "Ember.View"), d.ViewHelper.helper(this, a, b) }) } (), function () { var a = Ember.get, b = Ember.Handlebars.get, c = Ember.String.fmt; Ember.Handlebars.registerHelper("collection", function (c, d) { c && c.data && c.data.isRenderData && (d = c, c = undefined); var e = d.fn, f = d.data, g = d.inverse, h; h = c ? b(this, c, d) : Ember.CollectionView; var i = d.hash, j = {}, k, l, m = i.itemViewClass, n = h.proto(); delete i.itemViewClass, l = m ? b(n, m, d) : n.itemViewClass; for (var o in i) i.hasOwnProperty(o) && (k = o.match(/^item(.)(.*)$/), k && (j[k[1].toLowerCase() + k[2]] = i[o], delete i[o])); var p = i.tagName || n.tagName; e && (j.template = e, delete d.fn); var q; g && g !== Handlebars.VM.noop ? (q = a(n, "emptyViewClass"), q = q.extend({ template: g, tagName: j.tagName })) : i.emptyViewClass && (q = b(this, i.emptyViewClass, d)), i.emptyView = q, i.eachHelper === "each" && (j._context = Ember.computed(function () { return a(this, "content") }).property("content"), delete i.eachHelper); var r = Ember.Handlebars.ViewHelper.propertiesFromHTMLOptions({ data: f, hash: j }, this); return i.itemViewClass = l.extend(r), Ember.Handlebars.helpers.view.call(this, h, d) }) } (), function () { var a = Ember.Handlebars.get; Ember.Handlebars.registerHelper("unbound", function (b, c) { var d = c.contexts && c.contexts[0] || this; return a(d, b, c) }) } (), function () { var a = Ember.Handlebars.get, b = Ember.Handlebars.normalizePath; Ember.Handlebars.registerHelper("log", function (c, d) { var e = d.contexts && d.contexts[0] || this, f = b(e, c, d.data), g = f.root, h = f.path, i = h === "this" ? g : a(g, h, d); Ember.Logger.log(i) }), Ember.Handlebars.registerHelper("debugger", function () { debugger }) } (), function () { var a = Ember.get, b = Ember.set; Ember.Handlebars.EachView = Ember.CollectionView.extend(Ember._Metamorph, { itemViewClass: Ember._MetamorphView, emptyViewClass: Ember._MetamorphView, createChildView: function (c, d) { c = this._super(c, d); var e = a(this, "keyword"); if (e) { var f = a(c, "templateData"); f = Ember.copy(f), f.keywords = c.cloneKeywords(), b(c, "templateData", f); var g = a(c, "content"); f.keywords[e] = g } return c } }), Ember.Handlebars.registerHelper("each", function (a, b) { if (arguments.length === 4) { var c = arguments[0]; b = arguments[3], a = arguments[2], a === "" && (a = "this"), b.hash.keyword = c } else b.hash.eachHelper = "each"; return b.hash.contentBinding = a, Ember.Handlebars.helpers.collection.call(this, "Ember.Handlebars.EachView", b) }) } (), function () { Ember.Handlebars.registerHelper("template", function (a, b) { var c = Ember.TEMPLATES[a]; Ember.TEMPLATES[a](this, { data: b.data }) }) } (), function () { var a = Ember.Handlebars, b = a.get, c = Ember.get, d = Array.prototype.slice, e = a.ActionHelper = { registeredActions: {} }; e.registerAction = function (a, b) { var c = (++Ember.uuid).toString(); return e.registeredActions[c] = { eventName: b.eventName, handler: function (c) { var d = c.shiftKey || c.metaKey || c.altKey || c.ctrlKey, e = c.which > 1, f = d || e; if (b.link && f) return; c.preventDefault(), c.view = b.view, b.hasOwnProperty("context") && (c.context = b.context), b.hasOwnProperty("contexts") && (c.contexts = b.contexts); var g = b.target; return g.isState && typeof g.send == "function" ? g.send(a, c) : g[a].call(g, c) } }, b.view.on("willClearRender", function () { delete e.registeredActions[c] }), c }, a.registerHelper("action", function (f) { var g = arguments[arguments.length - 1], h = d.call(arguments, 1, -1), i = g.hash, j = g.data.view, k, l, m, n = { eventName: i.on || "click" }; n.view = j = c(j, "concreteView"); if (i.target) k = b(this, i.target, g); else if (l = g.data.keywords.controller) k = c(l, "target"); n.target = k = k || j, h.length && (n.contexts = h = Ember.EnumerableUtils.map(h, function (a) { return b(this, a, g) }, this), n.context = h[0]); var o = [], p; i.href && k.urlForEvent && (p = k.urlForEvent.apply(k, [f].concat(h)), o.push('href="' + p + '"'), n.link = !0); var q = e.registerAction(f, n); return o.push('data-ember-action="' + q + '"'), new a.SafeString(o.join(" ")) }) } (), function () { var a = Ember.get, b = Ember.set; Ember.Handlebars.registerHelper("yield", function (b) { var c = b.data.view, d; while (c && !a(c, "layout")) c = a(c, "parentView"); d = a(c, "template"), d && d(this, b) }) } (), function () { Ember.Handlebars.OutletView = Ember.ContainerView.extend(Ember._Metamorph), Ember.Handlebars.registerHelper("outlet", function (a, b) { return a && a.data && a.data.isRenderData && (b = a, a = "view"), b.hash.currentViewBinding = "view.context." + a, Ember.Handlebars.helpers.view.call(this, Ember.Handlebars.OutletView, b) }) } (), function () { } (), function () { } (), function () { var a = Ember.set, b = Ember.get; Ember.Checkbox = Ember.View.extend({ classNames: ["ember-checkbox"], tagName: "input", attributeBindings: ["type", "checked", "disabled", "tabindex"], type: "checkbox", checked: !1, disabled: !1, init: function () { this._super(), this.on("change", this, this._updateElementValue) }, _updateElementValue: function () { a(this, "checked", this.$().prop("checked")) } }) } (), function () { var a = Ember.get, b = Ember.set; Ember.TextSupport = Ember.Mixin.create({ value: "", attributeBindings: ["placeholder", "disabled", "maxlength", "tabindex"], placeholder: null, disabled: !1, maxlength: null, insertNewline: Ember.K, cancel: Ember.K, init: function () { this._super(), this.on("focusOut", this, this._elementValueDidChange), this.on("change", this, this._elementValueDidChange), this.on("keyUp", this, this.interpretKeyEvents) }, interpretKeyEvents: function (a) { var b = Ember.TextSupport.KEY_EVENTS, c = b[a.keyCode]; this._elementValueDidChange(); if (c) return this[c](a) }, _elementValueDidChange: function () { b(this, "value", this.$().val()) } }), Ember.TextSupport.KEY_EVENTS = { 13: "insertNewline", 27: "cancel"} } (), function () { var a = Ember.get, b = Ember.set; Ember.TextField = Ember.View.extend(Ember.TextSupport, { classNames: ["ember-text-field"], tagName: "input", attributeBindings: ["type", "value", "size"], value: "", type: "text", size: null }) } (), function () { var a = Ember.get, b = Ember.set; Ember.Button = Ember.View.extend(Ember.TargetActionSupport, { classNames: ["ember-button"], classNameBindings: ["isActive"], tagName: "button", propagateEvents: !1, attributeBindings: ["type", "disabled", "href", "tabindex"], targetObject: Ember.computed(function () { var b = a(this, "target"), c = a(this, "context"), d = a(this, "templateData"); return typeof b != "string" ? b : Ember.Handlebars.get(c, b, { data: d }) }).property("target"), type: Ember.computed(function (a, b) { var c = this.get("tagName"); b !== undefined && (this._type = b); if (this._type !== undefined) return this._type; if (c === "input" || c === "button") return "button" }).property("tagName"), disabled: !1, href: Ember.computed(function () { return this.get("tagName") === "a" ? "#" : null }).property("tagName"), mouseDown: function () { return a(this, "disabled") || (b(this, "isActive", !0), this._mouseDown = !0, this._mouseEntered = !0), a(this, "propagateEvents") }, mouseLeave: function () { this._mouseDown && (b(this, "isActive", !1), this._mouseEntered = !1) }, mouseEnter: function () { this._mouseDown && (b(this, "isActive", !0), this._mouseEntered = !0) }, mouseUp: function (c) { return a(this, "isActive") && (this.triggerAction(), b(this, "isActive", !1)), this._mouseDown = !1, this._mouseEntered = !1, a(this, "propagateEvents") }, keyDown: function (a) { (a.keyCode === 13 || a.keyCode === 32) && this.mouseDown() }, keyUp: function (a) { (a.keyCode === 13 || a.keyCode === 32) && this.mouseUp() }, touchStart: function (a) { return this.mouseDown(a) }, touchEnd: function (a) { return this.mouseUp(a) }, init: function () { this._super() } }) } (), function () { var a = Ember.get, b = Ember.set; Ember.TextArea = Ember.View.extend(Ember.TextSupport, { classNames: ["ember-text-area"], tagName: "textarea", attributeBindings: ["rows", "cols"], rows: null, cols: null, _updateElementValue: Ember.observer(function () { var b = a(this, "value"), c = this.$(); c && b !== c.val() && c.val(b) }, "value"), init: function () { this._super(), this.on("didInsertElement", this, this._updateElementValue) } }) } (), function () { Ember.TabContainerView = Ember.View.extend({ init: function () { this._super() } }) } (), function () { var a = Ember.get; Ember.TabPaneView = Ember.View.extend({ tabsContainer: Ember.computed(function () { return this.nearestOfType(Ember.TabContainerView) }).property().volatile(), isVisible: Ember.computed(function () { return a(this, "viewName") === a(this, "tabsContainer.currentView") }).property("tabsContainer.currentView").volatile(), init: function () { this._super() } }) } (), function () { var a = Ember.get, b = Ember.setPath; Ember.TabView = Ember.View.extend({ tabsContainer: Ember.computed(function () { return this.nearestInstanceOf(Ember.TabContainerView) }).property().volatile(), mouseUp: function () { b(this, "tabsContainer.currentView", a(this, "value")) }, init: function () { this._super() } }) } (), function () { } (), function () { var a = Ember.set, b = Ember.get, c = Ember.EnumerableUtils.indexOf, d = Ember.EnumerableUtils.indexesOf, e = Ember.EnumerableUtils.replace, f = Ember.isArray; Ember.Select = Ember.View.extend({ tagName: "select", classNames: ["ember-select"], defaultTemplate: Ember.Handlebars.template(function (b, c, d, e, f) { function q(a, b) { var c = "", e, f, g, h; return b.buffer.push("<option value>"), e = a, f = "view.prompt", g = {}, h = "true", g.escaped = h, h = d._triageMustache || a._triageMustache, k = {}, k.hash = g, k.contexts = [], k.contexts.push(e), k.data = b, typeof h === m ? e = h.call(a, f, k) : h === o ? e = n.call(a, "_triageMustache", f, k) : e = h, b.buffer.push(p(e) + "</option>"), c } function r(a, b) { var c, e, f, g; c = a, e = "Ember.SelectOption", f = {}, g = "this", f.contentBinding = g, g = d.view || a.view, k = {}, k.hash = f, k.contexts = [], k.contexts.push(c), k.data = b, typeof g === m ? c = g.call(a, e, k) : g === o ? c = n.call(a, "view", e, k) : c = g, b.buffer.push(p(c)) } d = d || Ember.Handlebars.helpers; var g = "", h, i, j, k, l = this, m = "function", n = d.helperMissing, o = void 0, p = this.escapeExpression; return h = c, i = "view.prompt", j = d["if"], k = l.program(1, q, f), k.hash = {}, k.contexts = [], k.contexts.push(h), k.fn = k, k.inverse = l.noop, k.data = f, h = j.call(c, i, k), (h || h === 0) && f.buffer.push(h), h = c, i = "view.content", j = d.each, k = l.program(3, r, f), k.hash = {}, k.contexts = [], k.contexts.push(h), k.fn = k, k.inverse = l.noop, k.data = f, h = j.call(c, i, k), (h || h === 0) && f.buffer.push(h), g }), attributeBindings: ["multiple", "disabled", "tabindex"], multiple: !1, disabled: !1, content: null, selection: null, value: Ember.computed(function (a, c) { if (arguments.length === 2) return c; var d = b(this, "optionValuePath").replace(/^content\.?/, ""); return d ? b(this, "selection." + d) : b(this, "selection") }).property("selection"), prompt: null, optionLabelPath: "content", optionValuePath: "content", _change: function () { b(this, "multiple") ? this._changeMultiple() : this._changeSingle() }, selectionDidChange: Ember.observer(function () { var c = b(this, "selection"); if (b(this, "multiple")) { if (!f(c)) { a(this, "selection", Ember.A([c])); return } this._selectionDidChangeMultiple() } else this._selectionDidChangeSingle() }, "selection.@each"), valueDidChange: Ember.observer(function () { var a = b(this, "content"), c = b(this, "value"), d = b(this, "optionValuePath").replace(/^content\.?/, ""), e = d ? b(this, "selection." + d) : b(this, "selection"), f; c !== e && (f = a.find(function (a) { return c === (d ? b(a, d) : a) }), this.set("selection", f)) }, "value"), _triggerChange: function () { var a = b(this, "selection"), c = b(this, "value"); a && this.selectionDidChange(), c && this.valueDidChange(), this._change() }, _changeSingle: function () { var c = this.$()[0].selectedIndex, d = b(this, "content"), e = b(this, "prompt"); if (!d) return; if (e && c === 0) { a(this, "selection", null); return } e && (c -= 1), a(this, "selection", d.objectAt(c)) }, _changeMultiple: function () { var c = this.$("option:selected"), d = b(this, "prompt"), g = d ? 1 : 0, h = b(this, "content"), i = b(this, "selection"); if (!h) return; if (c) { var j = c.map(function () { return this.index - g }).toArray(), k = h.objectsAt(j); f(i) ? e(i, 0, b(i, "length"), k) : a(this, "selection", k) } }, _selectionDidChangeSingle: function () { var a = this.get("element"); if (!a) return; var d = b(this, "content"), e = b(this, "selection"), f = d ? c(d, e) : -1, g = b(this, "prompt"); g && (f += 1), a && (a.selectedIndex = f) }, _selectionDidChangeMultiple: function () { var a = b(this, "content"), e = b(this, "selection"), f = a ? d(a, e) : [-1], g = b(this, "prompt"), h = g ? 1 : 0, i = this.$("option"), j; i && i.each(function () { j = this.index > -1 ? this.index - h : -1, this.selected = c(f, j) > -1 }) }, init: function () { this._super(), this.on("didInsertElement", this, this._triggerChange), this.on("change", this, this._change) } }), Ember.SelectOption = Ember.View.extend({ tagName: "option", attributeBindings: ["value", "selected"], defaultTemplate: function (a, b) { b = { data: b.data, hash: {} }, Ember.Handlebars.helpers.bind.call(a, "view.label", b) }, init: function () { this.labelPathDidChange(), this.valuePathDidChange(), this._super() }, selected: Ember.computed(function () { var a = b(this, "content"), d = b(this, "parentView.selection"); return b(this, "parentView.multiple") ? d && c(d, a.valueOf()) > -1 : a == d }).property("content", "parentView.selection").volatile(), labelPathDidChange: Ember.observer(function () { var a = b(this, "parentView.optionLabelPath"); if (!a) return; Ember.defineProperty(this, "label", Ember.computed(function () { return b(this, a) }).property(a)) }, "parentView.optionLabelPath"), valuePathDidChange: Ember.observer(function () { var a = b(this, "parentView.optionValuePath"); if (!a) return; Ember.defineProperty(this, "value", Ember.computed(function () { return b(this, a) }).property(a)) }, "parentView.optionValuePath") }) } (), function () { } (), function () { function a() { Ember.Handlebars.bootstrap(Ember.$(document)) } Ember.Handlebars.bootstrap = function (a) { var b = 'script[type="text/x-handlebars"], script[type="text/x-raw-handlebars"]'; Ember.$(b, a).each(function () { var a = Ember.$(this), b = a.attr("type"), c = a.attr("type") === "text/x-raw-handlebars" ? Ember.$.proxy(Handlebars.compile, Handlebars) : Ember.$.proxy(Ember.Handlebars.compile, Ember.Handlebars), d = a.attr("data-template-name") || a.attr("id") || "application", e = c(a.html()); Ember.TEMPLATES[d] = e, a.remove() }) }, Ember.onLoad("application", a) } (), function () { } (); ;

(function () {
    window.DS = Ember.Namespace.create({
        CURRENT_API_REVISION: 4
    });

})();



(function () {
    var get = Ember.get, set = Ember.set;

    /**
    A record array is an array that contains records of a certain type. The record
    array materializes records as needed when they are retrieved for the first
    time. You should not create record arrays yourself. Instead, an instance of
    DS.RecordArray or its subclasses will be returned by your application's store
    in response to queries.
    */

    DS.RecordArray = Ember.ArrayProxy.extend({

        /**
        The model type contained by this record array.

        @type DS.Model
        */
        type: null,

        // The array of client ids backing the record array. When a
        // record is requested from the record array, the record
        // for the client id at the same index is materialized, if
        // necessary, by the store.
        content: null,

        // The store that created this record array.
        store: null,

        objectAtContent: function (index) {
            var content = get(this, 'content'),
                clientId = content.objectAt(index),
                store = get(this, 'store');

            if (clientId !== undefined) {
                return store.findByClientId(get(this, 'type'), clientId);
            }
        }
    });

})();



(function () {
    var get = Ember.get;

    DS.FilteredRecordArray = DS.RecordArray.extend({
        filterFunction: null,

        replace: function () {
            var type = get(this, 'type').toString();
            throw new Error("The result of a client-side filter (on " + type + ") is immutable.");
        },

        updateFilter: Ember.observer(function () {
            var store = get(this, 'store');
            store.updateRecordArrayFilter(this, get(this, 'type'), get(this, 'filterFunction'));
        }, 'filterFunction')
    });

})();



(function () {
    var get = Ember.get, set = Ember.set;

    DS.AdapterPopulatedRecordArray = DS.RecordArray.extend({
        query: null,
        isLoaded: false,

        replace: function () {
            var type = get(this, 'type').toString();
            throw new Error("The result of a server query (on " + type + ") is immutable.");
        },

        load: function (array) {
            var store = get(this, 'store'), type = get(this, 'type');

            var clientIds = store.loadMany(type, array).clientIds;

            this.beginPropertyChanges();
            set(this, 'content', Ember.A(clientIds));
            set(this, 'isLoaded', true);
            this.endPropertyChanges();
        }
    });


})();



(function () {
    var get = Ember.get, set = Ember.set, guidFor = Ember.guidFor;

    var Set = function () {
        this.hash = {};
        this.list = [];
    };

    Set.prototype = {
        add: function (item) {
            var hash = this.hash,
                guid = guidFor(item);

            if (hash.hasOwnProperty(guid)) { return; }

            hash[guid] = true;
            this.list.push(item);
        },

        remove: function (item) {
            var hash = this.hash,
                guid = guidFor(item);

            if (!hash.hasOwnProperty(guid)) { return; }

            delete hash[guid];
            var list = this.list,
                index = Ember.EnumerableUtils.indexOf(this, item);

            list.splice(index, 1);
        },

        isEmpty: function () {
            return this.list.length === 0;
        }
    };

    var LoadedState = Ember.State.extend({
        recordWasAdded: function (manager, record) {
            var dirty = manager.dirty, observer;
            dirty.add(record);

            observer = function () {
                if (!get(record, 'isDirty')) {
                    record.removeObserver('isDirty', observer);
                    manager.send('childWasSaved', record);
                }
            };

            record.addObserver('isDirty', observer);
        },

        recordWasRemoved: function (manager, record) {
            var dirty = manager.dirty, observer;
            dirty.add(record);

            observer = function () {
                record.removeObserver('isDirty', observer);
                if (!get(record, 'isDirty')) { manager.send('childWasSaved', record); }
            };

            record.addObserver('isDirty', observer);
        }
    });

    var states = {
        loading: Ember.State.create({
            isLoaded: false,
            isDirty: false,

            loadedRecords: function (manager, count) {
                manager.decrement(count);
            },

            becameLoaded: function (manager) {
                manager.transitionTo('clean');
            }
        }),

        clean: LoadedState.create({
            isLoaded: true,
            isDirty: false,

            recordWasAdded: function (manager, record) {
                this._super(manager, record);
                manager.goToState('dirty');
            },

            update: function (manager, clientIds) {
                var manyArray = manager.manyArray;
                set(manyArray, 'content', clientIds);
            }
        }),

        dirty: LoadedState.create({
            isLoaded: true,
            isDirty: true,

            childWasSaved: function (manager, child) {
                var dirty = manager.dirty;
                dirty.remove(child);

                if (dirty.isEmpty()) { manager.send('arrayBecameSaved'); }
            },

            arrayBecameSaved: function (manager) {
                manager.goToState('clean');
            }
        })
    };

    DS.ManyArrayStateManager = Ember.StateManager.extend({
        manyArray: null,
        initialState: 'loading',
        states: states,

        /**
        This number is used to keep track of the number of outstanding
        records that must be loaded before the array is considered
        loaded. As results stream in, this number is decremented until
        it becomes zero, at which case the `isLoaded` flag will be set
        to true
        */
        counter: 0,

        init: function () {
            this._super();
            this.dirty = new Set();
            this.counter = get(this, 'manyArray.length');
        },

        decrement: function (count) {
            var counter = this.counter = this.counter - count;

            Ember.assert("Somehow the ManyArray loaded counter went below 0. This is probably an ember-data bug. Please report it at https://github.com/emberjs/data/issues", counter >= 0);

            if (counter === 0) {
                this.send('becameLoaded');
            }
        }
    });

})();



(function () {
    var get = Ember.get, set = Ember.set;

    DS.ManyArray = DS.RecordArray.extend({
        init: function () {
            set(this, 'stateManager', DS.ManyArrayStateManager.create({ manyArray: this }));

            return this._super();
        },

        parentRecord: null,

        isDirty: Ember.computed(function () {
            return get(this, 'stateManager.currentState.isDirty');
        }).property('stateManager.currentState').cacheable(),

        isLoaded: Ember.computed(function () {
            return get(this, 'stateManager.currentState.isLoaded');
        }).property('stateManager.currentState').cacheable(),

        send: function (event, context) {
            this.get('stateManager').send(event, context);
        },

        fetch: function () {
            var clientIds = get(this, 'content'),
                store = get(this, 'store'),
                type = get(this, 'type');

            store.fetchUnloadedClientIds(type, clientIds);
        },

        // Overrides Ember.Array's replace method to implement
        replaceContent: function (index, removed, added) {
            var parentRecord = get(this, 'parentRecord');
            var pendingParent = parentRecord && !get(parentRecord, 'id');
            var stateManager = get(this, 'stateManager');

            // Map the array of record objects into an array of  client ids.
            added = added.map(function (record) {
                Ember.assert("You can only add records of " + (get(this, 'type') && get(this, 'type').toString()) + " to this association.", !get(this, 'type') || (get(this, 'type') === record.constructor));

                // If the record to which this many array belongs does not yet
                // have an id, notify the newly-added record that it must wait
                // for the parent to receive an id before the child can be
                // saved.
                if (pendingParent) {
                    record.send('waitingOn', parentRecord);
                }

                var oldParent = this.assignInverse(record, parentRecord);

                record.get('transaction')
                    .relationshipBecameDirty(record, oldParent, parentRecord);

                stateManager.send('recordWasAdded', record);

                return record.get('clientId');
            }, this);

            var store = this.store;

            var len = index + removed, record;
            for (var i = index; i < len; i++) {
                // TODO: null out inverse FK
                record = this.objectAt(i);
                var oldParent = this.assignInverse(record, parentRecord, true);

                record.get('transaction')
                    .relationshipBecameDirty(record, parentRecord, null);

                // If we put the child record into a pending state because
                // we were waiting on the parent record to get an id, we
                // can tell the child it no longer needs to wait.
                if (pendingParent) {
                    record.send('doneWaitingOn', parentRecord);
                }

                stateManager.send('recordWasAdded', record);
            }

            this._super(index, removed, added);
        },

        assignInverse: function (record, parentRecord, remove) {
            var associationMap = get(record.constructor, 'associations'),
                possibleAssociations = associationMap.get(parentRecord.constructor),
                possible, actual, oldParent;

            if (!possibleAssociations) { return; }

            for (var i = 0, l = possibleAssociations.length; i < l; i++) {
                possible = possibleAssociations[i];

                if (possible.kind === 'belongsTo') {
                    actual = possible;
                    break;
                }
            }

            if (actual) {
                oldParent = get(record, actual.name);
                set(record, actual.name, remove ? null : parentRecord);
                return oldParent;
            }
        },

        // Create a child record within the parentRecord
        createRecord: function (hash, transaction) {
            var parentRecord = get(this, 'parentRecord'),
                store = get(parentRecord, 'store'),
                type = get(this, 'type'),
                record;

            transaction = transaction || get(parentRecord, 'transaction');

            record = store.createRecord.call(store, type, hash, transaction);
            this.pushObject(record);

            return record;
        }
    });

})();



(function () {

})();



(function () {
    var get = Ember.get, set = Ember.set, fmt = Ember.String.fmt,
        removeObject = Ember.EnumerableUtils.removeObject;

    /**
    A transaction allows you to collect multiple records into a unit of work
    that can be committed or rolled back as a group.

    For example, if a record has local modifications that have not yet
    been saved, calling `commit()` on its transaction will cause those
    modifications to be sent to the adapter to be saved. Calling
    `rollback()` on its transaction would cause all of the modifications to
    be discarded and the record to return to the last known state before
    changes were made.

    If a newly created record's transaction is rolled back, it will
    immediately transition to the deleted state.

    If you do not explicitly create a transaction, a record is assigned to
    an implicit transaction called the default transaction. In these cases,
    you can treat your application's instance of `DS.Store` as a transaction
    and call the `commit()` and `rollback()` methods on the store itself.

    Once a record has been successfully committed or rolled back, it will
    be moved back to the implicit transaction. Because it will now be in
    a clean state, it can be moved to a new transaction if you wish.

    ### Creating a Transaction

    To create a new transaction, call the `transaction()` method of your
    application's `DS.Store` instance:

    var transaction = App.store.transaction();

    This will return a new instance of `DS.Transaction` with no records
    yet assigned to it.

    ### Adding Existing Records

    Add records to a transaction using the `add()` method:

    record = App.store.find(Person, 1);
    transaction.add(record);

    Note that only records whose `isDirty` flag is `false` may be added
    to a transaction. Once modifications to a record have been made
    (its `isDirty` flag is `true`), it is not longer able to be added to
    a transaction.

    ### Creating New Records

    Because newly created records are dirty from the time they are created,
    and because dirty records can not be added to a transaction, you must
    use the `createRecord()` method to assign new records to a transaction.

    For example, instead of this:

    var transaction = store.transaction();
    var person = Person.createRecord({ name: "Steve" });

    // won't work because person is dirty
    transaction.add(person);

    Call `createRecord()` on the transaction directly:

    var transaction = store.transaction();
    transaction.createRecord(Person, { name: "Steve" });

    ### Asynchronous Commits

    Typically, all of the records in a transaction will be committed
    together. However, new records that have a dependency on other new
    records need to wait for their parent record to be saved and assigned an
    ID. In that case, the child record will continue to live in the
    transaction until its parent is saved, at which time the transaction will
    attempt to commit again.

    For this reason, you should not re-use transactions once you have committed
    them. Always make a new transaction and move the desired records to it before
    calling commit.
    */

    DS.Transaction = Ember.Object.extend({
        /**
        @private

        Creates the bucket data structure used to segregate records by
        type.
        */
        init: function () {
            set(this, 'buckets', {
                clean: Ember.Map.create(),
                created: Ember.Map.create(),
                updated: Ember.Map.create(),
                deleted: Ember.Map.create(),
                inflight: Ember.Map.create()
            });

            this.dirtyRelationships = {
                byChild: Ember.Map.create(),
                byNewParent: Ember.Map.create(),
                byOldParent: Ember.Map.create()
            };
        },

        /**
        Creates a new record of the given type and assigns it to the transaction
        on which the method was called.

        This is useful as only clean records can be added to a transaction and
        new records created using other methods immediately become dirty.

        @param {DS.Model} type the model type to create
        @param {Object} hash the data hash to assign the new record
        */
        createRecord: function (type, hash) {
            var store = get(this, 'store');

            return store.createRecord(type, hash, this);
        },

        /**
        Adds an existing record to this transaction. Only records without
        modficiations (i.e., records whose `isDirty` property is `false`)
        can be added to a transaction.

        @param {DS.Model} record the record to add to the transaction
        */
        add: function (record) {
            // we could probably make this work if someone has a valid use case. Do you?
            Ember.assert("Once a record has changed, you cannot move it into a different transaction", !get(record, 'isDirty'));

            var recordTransaction = get(record, 'transaction'),
                defaultTransaction = get(this, 'store.defaultTransaction');

            Ember.assert("Models cannot belong to more than one transaction at a time.", recordTransaction === defaultTransaction);

            this.adoptRecord(record);
        },

        /**
        Commits the transaction, which causes all of the modified records that
        belong to the transaction to be sent to the adapter to be saved.

        Once you call `commit()` on a transaction, you should not re-use it.

        When a record is saved, it will be removed from this transaction and
        moved back to the store's default transaction.
        */
        commit: function () {
            var self = this,
                iterate;

            iterate = function (bucketType, fn, binding) {
                var dirty = self.bucketForType(bucketType);

                dirty.forEach(function (type, records) {
                    if (records.isEmpty()) { return; }

                    var array = [];

                    records.forEach(function (record) {
                        record.send('willCommit');

                        if (get(record, 'isPending') === false) {
                            array.push(record);
                        }
                    });

                    fn.call(binding, type, array);
                });
            };

            var commitDetails = {
                updated: {
                    eachType: function (fn, binding) { iterate('updated', fn, binding); }
                },

                created: {
                    eachType: function (fn, binding) { iterate('created', fn, binding); }
                },

                deleted: {
                    eachType: function (fn, binding) { iterate('deleted', fn, binding); }
                }
            };

            var store = get(this, 'store');
            var adapter = get(store, '_adapter');

            this.removeCleanRecords();

            if (adapter && adapter.commit) { adapter.commit(store, commitDetails); }
            else { throw fmt("Adapter is either null or does not implement `commit` method", this); }
        },

        /**
        Rolling back a transaction resets the records that belong to
        that transaction.

        Updated records have their properties reset to the last known
        value from the persistence layer. Deleted records are reverted
        to a clean, non-deleted state. Newly created records immediately
        become deleted, and are not sent to the adapter to be persisted.

        After the transaction is rolled back, any records that belong
        to it will return to the store's default transaction, and the
        current transaction should not be used again.
        */
        rollback: function () {
            var store = get(this, 'store'),
                dirty;

            // Loop through all of the records in each of the dirty states
            // and initiate a rollback on them. As a side effect of telling
            // the record to roll back, it should also move itself out of
            // the dirty bucket and into the clean bucket.
            ['created', 'updated', 'deleted', 'inflight'].forEach(function (bucketType) {
                dirty = this.bucketForType(bucketType);

                dirty.forEach(function (type, records) {
                    records.forEach(function (record) {
                        record.send('rollback');
                    });
                });
            }, this);

            // Now that all records in the transaction are guaranteed to be
            // clean, migrate them all to the store's default transaction.
            this.removeCleanRecords();
        },

        /**
        @private

        Removes a record from this transaction and back to the store's
        default transaction.

        Note: This method is private for now, but should probably be exposed
        in the future once we have stricter error checking (for example, in the
        case of the record being dirty).

        @param {DS.Model} record
        */
        remove: function (record) {
            var defaultTransaction = get(this, 'store.defaultTransaction');
            defaultTransaction.adoptRecord(record);
        },

        /**
        @private

        Removes all of the records in the transaction's clean bucket.
        */
        removeCleanRecords: function () {
            var clean = this.bucketForType('clean'),
                self = this;

            clean.forEach(function (type, records) {
                records.forEach(function (record) {
                    self.remove(record);
                });
            });
        },

        /**
        @private

        Returns the bucket for the given bucket type. For example, you might call
        `this.bucketForType('updated')` to get the `Ember.Map` that contains all
        of the records that have changes pending.

        @param {String} bucketType the type of bucket
        @returns Ember.Map
        */
        bucketForType: function (bucketType) {
            var buckets = get(this, 'buckets');

            return get(buckets, bucketType);
        },

        /**
        @private

        This method moves a record into a different transaction without the normal
        checks that ensure that the user is not doing something weird, like moving
        a dirty record into a new transaction.

        It is designed for internal use, such as when we are moving a clean record
        into a new transaction when the transaction is committed.

        This method must not be called unless the record is clean.

        @param {DS.Model} record
        */
        adoptRecord: function (record) {
            var oldTransaction = get(record, 'transaction');

            if (oldTransaction) {
                oldTransaction.removeFromBucket('clean', record);
            }

            this.addToBucket('clean', record);
            set(record, 'transaction', this);
        },

        /**
        @private

        Adds a record to the named bucket.

        @param {String} bucketType one of `clean`, `created`, `updated`, or `deleted`
        */
        addToBucket: function (bucketType, record) {
            var bucket = this.bucketForType(bucketType),
                type = record.constructor;

            var records = bucket.get(type);

            if (!records) {
                records = Ember.OrderedSet.create();
                bucket.set(type, records);
            }

            records.add(record);
        },

        /**
        @private

        Removes a record from the named bucket.

        @param {String} bucketType one of `clean`, `created`, `updated`, or `deleted`
        */
        removeFromBucket: function (bucketType, record) {
            var bucket = this.bucketForType(bucketType),
                type = record.constructor;

            var records = bucket.get(type);
            records.remove(record);
        },

        /**
        @private

        Called by a ManyArray when a new record is added to it. This
        method will index a relationship description by the child
        record, its old parent, and its new parent.

        The store will provide this description to the adapter's
        shouldCommit method, so it can determine whether any of
        the records is pending another record. The store will also
        provide a list of these descriptions to the adapter's commit
        method.

        @param {DS.Model} record the new child record
        @param {DS.Model} oldParent the parent that the child is
        moving from, or null
        @param {DS.Model} newParent the parent that the child is
        moving to, or null
        */
        relationshipBecameDirty: function (child, oldParent, newParent) {
            var relationships = this.dirtyRelationships, relationship;

            var relationshipsForChild = relationships.byChild.get(child),
                possibleRelationship,
                needsNewEntries = true;

            // If the child has any existing dirty relationships in this
            // transaction, we need to collapse the old relationship
            // into the new one. For example, if we change the parent of
            // a child record before saving, there is no need to save the
            // record that was its parent temporarily.
            if (relationshipsForChild) {

                // Loop through all of the relationships we know about that
                // contain the same child as the new relationship.
                for (var i = 0, l = relationshipsForChild.length; i < l; i++) {
                    relationship = relationshipsForChild[i];

                    // If the parent of the child record has changed, there is
                    // no need to update the old parent that had not yet been saved.
                    //
                    // This case is two changes in a record's parent:
                    //
                    //   A -> B
                    //   B -> C
                    //
                    // In this case, there is no need to remember the A->B
                    // change. We can collapse both changes into:
                    //
                    //   A -> C
                    //
                    // Another possible case is:
                    //
                    //   A -> B
                    //   B -> A
                    //
                    // In this case, we don't need to do anything. We can
                    // simply remove the original A->B change and call it
                    // a day.
                    if (relationship.newParent === oldParent) {
                        oldParent = relationship.oldParent;
                        this.removeRelationship(relationship);

                        // This is the case of A->B followed by B->A.
                        if (relationship.oldParent === newParent) {
                            needsNewEntries = false;
                        }
                    }
                }
            }

            relationship = {
                child: child,
                oldParent: oldParent,
                newParent: newParent
            };

            // If we didn't go A->B and then B->A, add new dirty relationship
            // entries.
            if (needsNewEntries) {
                this.addRelationshipTo('byChild', child, relationship);
                this.addRelationshipTo('byOldParent', oldParent, relationship);
                this.addRelationshipTo('byNewParent', newParent, relationship);
            }
        },

        removeRelationship: function (relationship) {
            var relationships = this.dirtyRelationships;

            removeObject(relationships.byOldParent.get(relationship.oldParent), relationship);
            removeObject(relationships.byNewParent.get(relationship.newParent), relationship);
            removeObject(relationships.byChild.get(relationship.child), relationship);
        },

        addRelationshipTo: function (type, record, description) {
            var map = this.dirtyRelationships[type];

            var relationships = map.get(record);

            if (!relationships) {
                relationships = [description];
                map.set(record, relationships);
            } else {
                relationships.push(description);
            }
        },

        /**
        @private

        Called by a record's state manager to indicate that the record has entered
        a dirty state. The record will be moved from the `clean` bucket and into
        the appropriate dirty bucket.

        @param {String} bucketType one of `created`, `updated`, or `deleted`
        */
        recordBecameDirty: function (bucketType, record) {
            this.removeFromBucket('clean', record);
            this.addToBucket(bucketType, record);
        },

        /**
        @private

        Called by a record's state manager to indicate that the record has entered
        inflight state. The record will be moved from its current dirty bucket and into
        the `inflight` bucket.

        @param {String} bucketType one of `created`, `updated`, or `deleted`
        */
        recordBecameInFlight: function (kind, record) {
            this.removeFromBucket(kind, record);
            this.addToBucket('inflight', record);
        },

        /**
        @private

        Called by a record's state manager to indicate that the record has entered
        a clean state. The record will be moved from its current dirty or inflight bucket and into
        the `clean` bucket.

        @param {String} bucketType one of `created`, `updated`, or `deleted`
        */
        recordBecameClean: function (kind, record) {
            this.removeFromBucket(kind, record);

            this.remove(record);
        }
    });

})();



(function () {
    /*globals Ember*/
    var get = Ember.get, set = Ember.set, fmt = Ember.String.fmt;

    var DATA_PROXY = {
        get: function (name) {
            return this.savedData[name];
        }
    };

    // These values are used in the data cache when clientIds are
    // needed but the underlying data has not yet been loaded by
    // the server.
    var UNLOADED = 'unloaded';
    var LOADING = 'loading';

    // Implementors Note:
    //
    //   The variables in this file are consistently named according to the following
    //   scheme:
    //
    //   * +id+ means an identifier managed by an external source, provided inside the
    //     data hash provided by that source.
    //   * +clientId+ means a transient numerical identifier generated at runtime by
    //     the data store. It is important primarily because newly created objects may
    //     not yet have an externally generated id.
    //   * +type+ means a subclass of DS.Model.

    /**
    The store contains all of the hashes for records loaded from the server.
    It is also responsible for creating instances of DS.Model when you request one
    of these data hashes, so that they can be bound to in your Handlebars templates.

    Create a new store like this:

    MyApp.store = DS.Store.create();

    You can retrieve DS.Model instances from the store in several ways. To retrieve
    a record for a specific id, use the `find()` method:

    var record = MyApp.store.find(MyApp.Contact, 123);

    By default, the store will talk to your backend using a standard REST mechanism.
    You can customize how the store talks to your backend by specifying a custom adapter:

    MyApp.store = DS.Store.create({
    adapter: 'MyApp.CustomAdapter'
    });

    You can learn more about writing a custom adapter by reading the `DS.Adapter`
    documentation.
    */
    DS.Store = Ember.Object.extend({

        /**
        Many methods can be invoked without specifying which store should be used.
        In those cases, the first store created will be used as the default. If
        an application has multiple stores, it should specify which store to use
        when performing actions, such as finding records by id.

        The init method registers this store as the default if none is specified.
        */
        init: function () {
            // Enforce API revisioning. See BREAKING_CHANGES.md for more.
            var revision = get(this, 'revision');

            if (revision !== DS.CURRENT_API_REVISION && !Ember.ENV.TESTING) {
                throw new Error("Error: The Ember Data library has had breaking API changes since the last time you updated the library. Please review the list of breaking changes at https://github.com/emberjs/data/blob/master/BREAKING_CHANGES.md, then update your store's `revision` property to " + DS.CURRENT_API_REVISION);
            }

            if (!get(DS, 'defaultStore') || get(this, 'isDefaultStore')) {
                set(DS, 'defaultStore', this);
            }

            // internal bookkeeping; not observable
            this.typeMaps = {};
            this.recordCache = [];
            this.clientIdToId = {};
            this.recordArraysByClientId = {};

            // Internally, we maintain a map of all unloaded IDs requested by
            // a ManyArray. As the adapter loads hashes into the store, the
            // store notifies any interested ManyArrays. When the ManyArray's
            // total number of loading records drops to zero, it becomes
            // `isLoaded` and fires a `didLoad` event.
            this.loadingRecordArrays = {};

            set(this, 'defaultTransaction', this.transaction());

            return this._super();
        },

        /**
        Returns a new transaction scoped to this store.

        @see {DS.Transaction}
        @returns DS.Transaction
        */
        transaction: function () {
            return DS.Transaction.create({ store: this });
        },

        /**
        @private

        This is used only by the record's DataProxy. Do not use this directly.
        */
        dataForRecord: function (record) {
            var type = record.constructor,
                clientId = get(record, 'clientId'),
                typeMap = this.typeMapFor(type);

            return typeMap.cidToHash[clientId];
        },

        /**
        The adapter to use to communicate to a backend server or other persistence layer.

        This can be specified as an instance, a class, or a property path that specifies
        where the adapter can be located.

        @property {DS.Adapter|String}
        */
        adapter: null,

        /**
        @private

        This property returns the adapter, after resolving a possible String.

        @returns DS.Adapter
        */
        _adapter: Ember.computed(function () {
            var adapter = get(this, 'adapter');
            if (typeof adapter === 'string') {
                return get(this, adapter, false) || get(window, adapter);
            }
            return adapter;
        }).property('adapter').cacheable(),

        // A monotonically increasing number to be used to uniquely identify
        // data hashes and records.
        clientIdCounter: 1,

        // .....................
        // . CREATE NEW RECORD .
        // .....................

        /**
        Create a new record in the current store. The properties passed
        to this method are set on the newly created record.

        @param {subclass of DS.Model} type
        @param {Object} properties a hash of properties to set on the
        newly created record.
        @returns DS.Model
        */
        createRecord: function (type, properties, transaction) {
            properties = properties || {};

            // Create a new instance of the model `type` and put it
            // into the specified `transaction`. If no transaction is
            // specified, the default transaction will be used.
            //
            // NOTE: A `transaction` is specified when the
            // `transaction.createRecord` API is used.
            var record = type._create({
                store: this
            });

            transaction = transaction || get(this, 'defaultTransaction');
            transaction.adoptRecord(record);

            // Extract the primary key from the `properties` hash,
            // based on the `primaryKey` for the model type.
            var primaryKey = get(record, 'primaryKey'),
                id = properties[primaryKey] || null;

            // If the passed properties do not include a primary key,
            // give the adapter an opportunity to generate one.
            var adapter;
            if (Ember.none(id)) {
                adapter = get(this, 'adapter');
                if (adapter && adapter.generateIdForRecord) {
                    id = adapter.generateIdForRecord(this, record);
                    properties.id = id;
                }
            }

            var hash = {}, clientId;

            // Push the hash into the store. If present, associate the
            // extracted `id` with the hash.
            clientId = this.pushHash(hash, id, type);

            record.send('didChangeData');

            var recordCache = get(this, 'recordCache');

            // Now that we have a clientId, attach it to the record we
            // just created.
            set(record, 'clientId', clientId);

            // Store the record we just created in the record cache for
            // this clientId.
            recordCache[clientId] = record;

            // Set the properties specified on the record.
            record.setProperties(properties);

            this.updateRecordArrays(type, clientId, get(record, 'data'));

            return record;
        },

        // .................
        // . DELETE RECORD .
        // .................

        /**
        For symmetry, a record can be deleted via the store.

        @param {DS.Model} record
        */
        deleteRecord: function (record) {
            record.send('deleteRecord');
        },

        // ................
        // . FIND RECORDS .
        // ................

        /**
        This is the main entry point into finding records. The first
        parameter to this method is always a subclass of `DS.Model`.

        You can use the `find` method on a subclass of `DS.Model`
        directly if your application only has one store. For
        example, instead of `store.find(App.Person, 1)`, you could
        say `App.Person.find(1)`.

        ---

        To find a record by ID, pass the `id` as the second parameter:

        store.find(App.Person, 1);
        App.Person.find(1);

        If the record with that `id` had not previously been loaded,
        the store will return an empty record immediately and ask
        the adapter to find the data by calling the adapter's `find`
        method.

        The `find` method will always return the same object for a
        given type and `id`. To check whether the adapter has populated
        a record, you can check its `isLoaded` property.

        ---

        To find all records for a type, call `find` with no additional
        parameters:

        store.find(App.Person);
        App.Person.find();

        This will return a `RecordArray` representing all known records
        for the given type and kick off a request to the adapter's
        `findAll` method to load any additional records for the type.

        The `RecordArray` returned by `find()` is live. If any more
        records for the type are added at a later time through any
        mechanism, it will automatically update to reflect the change.

        ---

        To find a record by a query, call `find` with a hash as the
        second parameter:

        store.find(App.Person, { page: 1 });
        App.Person.find({ page: 1 });

        This will return a `RecordArray` immediately, but it will always
        be an empty `RecordArray` at first. It will call the adapter's
        `findQuery` method, which will populate the `RecordArray` once
        the server has returned results.

        You can check whether a query results `RecordArray` has loaded
        by checking its `isLoaded` property.
        */
        find: function (type, id, query) {
            if (id === undefined) {
                return this.findAll(type);
            }

            if (query !== undefined) {
                return this.findMany(type, id, query);
            } else if (Ember.typeOf(id) === 'object') {
                return this.findQuery(type, id);
            }

            if (Ember.isArray(id)) {
                return this.findMany(type, id);
            }

            var clientId = this.typeMapFor(type).idToCid[id];

            return this.findByClientId(type, clientId, id);
        },

        findByClientId: function (type, clientId, id) {
            var recordCache = get(this, 'recordCache'),
                dataCache, record;

            // If there is already a clientId assigned for this
            // type/id combination, try to find an existing
            // record for that id and return. Otherwise,
            // materialize a new record and set its data to the
            // value we already have.
            if (clientId !== undefined) {
                record = recordCache[clientId];

                if (!record) {
                    // create a new instance of the model type in the
                    // 'isLoading' state
                    record = this.materializeRecord(type, clientId);

                    dataCache = this.typeMapFor(type).cidToHash;

                    if (typeof dataCache[clientId] === 'object') {
                        record.send('didChangeData');
                    }
                }
            } else {
                clientId = this.pushHash(LOADING, id, type);

                // create a new instance of the model type in the
                // 'isLoading' state
                record = this.materializeRecord(type, clientId, id);

                // let the adapter set the data, possibly async
                var adapter = get(this, '_adapter');
                if (adapter && adapter.find) { adapter.find(this, type, id); }
                else { throw fmt("Adapter is either null or does not implement `find` method", this); }
            }

            return record;
        },

        /**
        @private

        Given a type and array of `clientId`s, determines which of those
        `clientId`s has not yet been loaded.

        In preparation for loading, this method also marks any unloaded
        `clientId`s as loading.
        */
        neededClientIds: function (type, clientIds) {
            var neededClientIds = [],
                typeMap = this.typeMapFor(type),
                dataCache = typeMap.cidToHash,
                clientId;

            for (var i = 0, l = clientIds.length; i < l; i++) {
                clientId = clientIds[i];
                if (dataCache[clientId] === UNLOADED) {
                    neededClientIds.push(clientId);
                    dataCache[clientId] = LOADING;
                }
            }

            return neededClientIds;
        },

        /**
        @private

        This method is the entry point that associations use to update
        themselves when their underlying data changes.

        First, it determines which of its `clientId`s are still unloaded,
        then converts the needed `clientId`s to IDs and invokes `findMany`
        on the adapter.
        */
        fetchUnloadedClientIds: function (type, clientIds) {
            var neededClientIds = this.neededClientIds(type, clientIds);
            this.fetchMany(type, neededClientIds);
        },

        /**
        @private

        This method takes a type and list of `clientId`s, converts the
        `clientId`s into IDs, and then invokes the adapter's `findMany`
        method.

        It is used both by a brand new association (via the `findMany`
        method) or when the data underlying an existing association
        changes (via the `fetchUnloadedClientIds` method).
        */
        fetchMany: function (type, clientIds) {
            var clientIdToId = this.clientIdToId;

            var neededIds = Ember.EnumerableUtils.map(clientIds, function (clientId) {
                return clientIdToId[clientId];
            });

            if (!neededIds.length) { return; }

            var adapter = get(this, '_adapter');
            if (adapter && adapter.findMany) { adapter.findMany(this, type, neededIds); }
            else { throw fmt("Adapter is either null or does not implement `findMany` method", this); }
        },

        /**
        @private

        `findMany` is the entry point that associations use to generate a
        new `ManyArray` for the list of IDs specified by the server for
        the association.

        Its responsibilities are:

        * convert the IDs into clientIds
        * determine which of the clientIds still need to be loaded
        * create a new ManyArray whose content is *all* of the clientIds
        * notify the ManyArray of the number of its elements that are
        already loaded
        * insert the unloaded clientIds into the `loadingRecordArrays`
        bookkeeping structure, which will allow the `ManyArray` to know
        when all of its loading elements are loaded from the server.
        * ask the adapter to load the unloaded elements, by invoking
        findMany with the still-unloaded IDs.
        */
        findMany: function (type, ids) {
            // 1. Convert ids to client ids
            // 2. Determine which of the client ids need to be loaded
            // 3. Create a new ManyArray whose content is ALL of the clientIds
            // 4. Decrement the ManyArray's counter by the number of loaded clientIds
            // 5. Put the ManyArray into our bookkeeping data structure, keyed on
            //    the needed clientIds
            // 6. Ask the adapter to load the records for the unloaded clientIds (but
            //    convert them back to ids)

            var clientIds = this.clientIdsForIds(type, ids);

            var neededClientIds = this.neededClientIds(type, clientIds),
                manyArray = this.createManyArray(type, Ember.A(clientIds)),
                loadedCount = clientIds.length - neededClientIds.length,
                loadingRecordArrays = this.loadingRecordArrays,
                clientId, i, l;

            manyArray.send('loadedRecords', loadedCount);

            if (neededClientIds.length) {
                for (i = 0, l = neededClientIds.length; i < l; i++) {
                    clientId = neededClientIds[i];
                    if (loadingRecordArrays[clientId]) {
                        loadingRecordArrays[clientId].push(manyArray);
                    } else {
                        this.loadingRecordArrays[clientId] = [manyArray];
                    }
                }

                this.fetchMany(type, neededClientIds);
            }

            return manyArray;
        },

        findQuery: function (type, query) {
            var array = DS.AdapterPopulatedRecordArray.create({ type: type, content: Ember.A([]), store: this });
            var adapter = get(this, '_adapter');
            if (adapter && adapter.findQuery) { adapter.findQuery(this, type, query, array); }
            else { throw fmt("Adapter is either null or does not implement `findQuery` method", this); }
            return array;
        },

        findAll: function (type) {

            var typeMap = this.typeMapFor(type),
                findAllCache = typeMap.findAllCache;

            if (findAllCache) { return findAllCache; }

            var array = DS.RecordArray.create({ type: type, content: Ember.A([]), store: this });
            this.registerRecordArray(array, type);

            var adapter = get(this, '_adapter');
            if (adapter && adapter.findAll) { adapter.findAll(this, type); }

            typeMap.findAllCache = array;
            return array;
        },

        filter: function (type, query, filter) {
            // allow an optional server query
            if (arguments.length === 3) {
                this.findQuery(type, query);
            } else if (arguments.length === 2) {
                filter = query;
            }

            var array = DS.FilteredRecordArray.create({ type: type, content: Ember.A([]), store: this, filterFunction: filter });

            this.registerRecordArray(array, type, filter);

            return array;
        },

        recordIsLoaded: function (type, id) {
            return !Ember.none(this.typeMapFor(type).idToCid[id]);
        },

        // ............
        // . UPDATING .
        // ............

        hashWasUpdated: function (type, clientId, record) {
            // Because hash updates are invoked at the end of the run loop,
            // it is possible that a record might be deleted after its hash
            // has been modified and this method was scheduled to be called.
            //
            // If that's the case, the record would have already been removed
            // from all record arrays; calling updateRecordArrays would just
            // add it back. If the record is deleted, just bail. It shouldn't
            // give us any more trouble after this.

            if (get(record, 'isDeleted')) { return; }
            this.updateRecordArrays(type, clientId, get(record, 'data'));
        },

        // ..............
        // . PERSISTING .
        // ..............

        commit: function () {
            var defaultTransaction = get(this, 'defaultTransaction');
            set(this, 'defaultTransaction', this.transaction());

            defaultTransaction.commit();
        },

        didUpdateRecords: function (array, hashes) {
            if (hashes) {
                array.forEach(function (record, idx) {
                    this.didUpdateRecord(record, hashes[idx]);
                }, this);
            } else {
                array.forEach(function (record) {
                    this.didUpdateRecord(record);
                }, this);
            }
        },

        didUpdateRecord: function (record, hash) {
            if (hash) {
                var clientId = get(record, 'clientId'),
                    dataCache = this.typeMapFor(record.constructor).cidToHash;

                dataCache[clientId] = hash;
                record.send('didChangeData');
                record.hashWasUpdated();
            } else {
                record.send('didSaveData');
            }

            record.send('didCommit');
        },

        didDeleteRecords: function (array) {
            array.forEach(function (record) {
                record.send('didCommit');
            });
        },

        didDeleteRecord: function (record) {
            record.send('didCommit');
        },

        _didCreateRecord: function (record, hash, typeMap, clientId, primaryKey) {
            var recordData = get(record, 'data'), id, changes;

            if (hash) {
                typeMap.cidToHash[clientId] = hash;

                // If the server returns a hash, we assume that the server's version
                // of the data supercedes the local changes.
                record.beginPropertyChanges();
                record.send('didChangeData');
                recordData.adapterDidUpdate();
                record.hashWasUpdated();
                record.endPropertyChanges();

                id = hash[primaryKey];

                typeMap.idToCid[id] = clientId;
                this.clientIdToId[clientId] = id;
            } else {
                recordData.commit();
            }

            record.send('didCommit');
        },


        didCreateRecords: function (type, array, hashes) {
            var primaryKey = type.proto().primaryKey,
                typeMap = this.typeMapFor(type),
                clientId;

            for (var i = 0, l = get(array, 'length'); i < l; i++) {
                var record = array[i], hash = hashes[i];
                clientId = get(record, 'clientId');

                this._didCreateRecord(record, hash, typeMap, clientId, primaryKey);
            }
        },

        didCreateRecord: function (record, hash) {
            var type = record.constructor,
                typeMap = this.typeMapFor(type),
                clientId, primaryKey;

            // The hash is optional, but if it is not provided, the client must have
            // provided a primary key.

            primaryKey = type.proto().primaryKey;

            // TODO: Make Ember.assert more flexible
            if (hash) {
                Ember.assert("The server must provide a primary key: " + primaryKey, get(hash, primaryKey));
            } else {
                Ember.assert("The server did not return data, and you did not create a primary key (" + primaryKey + ") on the client", get(get(record, 'data'), primaryKey));
            }

            clientId = get(record, 'clientId');

            this._didCreateRecord(record, hash, typeMap, clientId, primaryKey);
        },

        recordWasInvalid: function (record, errors) {
            record.send('becameInvalid', errors);
        },

        // .................
        // . RECORD ARRAYS .
        // .................

        registerRecordArray: function (array, type, filter) {
            var recordArrays = this.typeMapFor(type).recordArrays;

            recordArrays.push(array);

            this.updateRecordArrayFilter(array, type, filter);
        },

        createManyArray: function (type, clientIds) {
            var array = DS.ManyArray.create({ type: type, content: clientIds, store: this });

            clientIds.forEach(function (clientId) {
                var recordArrays = this.recordArraysForClientId(clientId);
                recordArrays.add(array);
            }, this);

            return array;
        },

        updateRecordArrayFilter: function (array, type, filter) {
            var typeMap = this.typeMapFor(type),
                dataCache = typeMap.cidToHash,
                clientIds = typeMap.clientIds,
                clientId, hash, proxy;

            var recordCache = get(this, 'recordCache'),
                foundRecord,
                record;

            for (var i = 0, l = clientIds.length; i < l; i++) {
                clientId = clientIds[i];
                foundRecord = false;

                hash = dataCache[clientId];
                if (typeof hash === 'object') {
                    if (record = recordCache[clientId]) {
                        if (!get(record, 'isDeleted')) {
                            proxy = get(record, 'data');
                            foundRecord = true;
                        }
                    } else {
                        DATA_PROXY.savedData = hash;
                        proxy = DATA_PROXY;
                        foundRecord = true;
                    }

                    if (foundRecord) { this.updateRecordArray(array, filter, type, clientId, proxy); }
                }
            }
        },

        updateRecordArrays: function (type, clientId, dataProxy) {
            var recordArrays = this.typeMapFor(type).recordArrays,
                filter;

            recordArrays.forEach(function (array) {
                filter = get(array, 'filterFunction');
                this.updateRecordArray(array, filter, type, clientId, dataProxy);
            }, this);

            // loop through all manyArrays containing an unloaded copy of this
            // clientId and notify them that the record was loaded.
            var manyArrays = this.loadingRecordArrays[clientId], manyArray;

            if (manyArrays) {
                for (var i = 0, l = manyArrays.length; i < l; i++) {
                    manyArrays[i].send('loadedRecords', 1);
                }

                this.loadingRecordArrays[clientId] = null;
            }
        },

        updateRecordArray: function (array, filter, type, clientId, dataProxy) {
            var shouldBeInArray;

            if (!filter) {
                shouldBeInArray = true;
            } else {
                shouldBeInArray = filter(dataProxy);
            }

            var content = get(array, 'content');
            var alreadyInArray = content.indexOf(clientId) !== -1;

            var recordArrays = this.recordArraysForClientId(clientId);

            if (shouldBeInArray && !alreadyInArray) {
                recordArrays.add(array);
                content.pushObject(clientId);
            } else if (!shouldBeInArray && alreadyInArray) {
                recordArrays.remove(array);
                content.removeObject(clientId);
            }
        },

        removeFromRecordArrays: function (record) {
            var clientId = get(record, 'clientId');
            var recordArrays = this.recordArraysForClientId(clientId);

            recordArrays.forEach(function (array) {
                var content = get(array, 'content');
                content.removeObject(clientId);
            });
        },

        // ............
        // . INDEXING .
        // ............

        recordArraysForClientId: function (clientId) {
            var recordArrays = get(this, 'recordArraysByClientId');
            var ret = recordArrays[clientId];

            if (!ret) {
                ret = recordArrays[clientId] = Ember.OrderedSet.create();
            }

            return ret;
        },

        typeMapFor: function (type) {
            var typeMaps = get(this, 'typeMaps');
            var guidForType = Ember.guidFor(type);

            var typeMap = typeMaps[guidForType];

            if (typeMap) {
                return typeMap;
            } else {
                return (typeMaps[guidForType] =
                {
                    idToCid: {},
                    clientIds: [],
                    cidToHash: {},
                    recordArrays: []
                });
            }
        },

        /** @private

        For a given type and id combination, returns the client id used by the store.
        If no client id has been assigned yet, one will be created and returned.

        @param {DS.Model} type
        @param {String|Number} id
        */
        clientIdForId: function (type, id) {
            var clientId = this.typeMapFor(type).idToCid[id];

            if (clientId !== undefined) { return clientId; }

            return this.pushHash(UNLOADED, id, type);
        },

        /**
        @private

        This method works exactly like `clientIdForId`, but does not
        require looking up the `typeMap` for every `clientId` and
        invoking a method per `clientId`.
        */
        clientIdsForIds: function (type, ids) {
            var typeMap = this.typeMapFor(type),
                idToClientIdMap = typeMap.idToCid;

            return Ember.EnumerableUtils.map(ids, function (id) {
                var clientId = idToClientIdMap[id];
                if (clientId) { return clientId; }
                return this.pushHash(UNLOADED, id, type);
            }, this);
        },

        // ................
        // . LOADING DATA .
        // ................

        /**
        Load a new data hash into the store for a given id and type combination.
        If data for that record had been loaded previously, the new information
        overwrites the old.

        If the record you are loading data for has outstanding changes that have not
        yet been saved, an exception will be thrown.

        @param {DS.Model} type
        @param {String|Number} id
        @param {Object} hash the data hash to load
        */
        load: function (type, id, hash) {
            if (hash === undefined) {
                hash = id;
                var primaryKey = type.proto().primaryKey;
                Ember.assert("A data hash was loaded for a record of type " + type.toString() + " but no primary key '" + primaryKey + "' was provided.", primaryKey in hash);
                id = hash[primaryKey];
            }

            var typeMap = this.typeMapFor(type),
                dataCache = typeMap.cidToHash,
                clientId = typeMap.idToCid[id],
                recordCache = get(this, 'recordCache');

            if (clientId !== undefined) {
                dataCache[clientId] = hash;

                var record = recordCache[clientId];
                if (record) {
                    record.send('didChangeData');
                }
            } else {
                clientId = this.pushHash(hash, id, type);
            }

            DATA_PROXY.savedData = hash;
            this.updateRecordArrays(type, clientId, DATA_PROXY);

            return { id: id, clientId: clientId };
        },

        loadMany: function (type, ids, hashes) {
            var clientIds = Ember.A([]);

            if (hashes === undefined) {
                hashes = ids;
                ids = [];
                var primaryKey = type.proto().primaryKey;

                ids = Ember.EnumerableUtils.map(hashes, function (hash) {
                    return hash[primaryKey];
                });
            }

            for (var i = 0, l = get(ids, 'length'); i < l; i++) {
                var loaded = this.load(type, ids[i], hashes[i]);
                clientIds.pushObject(loaded.clientId);
            }

            return { clientIds: clientIds, ids: ids };
        },

        /** @private

        Stores a data hash for the specified type and id combination and returns
        the client id.

        @param {Object} hash
        @param {String|Number} id
        @param {DS.Model} type
        @returns {Number}
        */
        pushHash: function (hash, id, type) {
            var typeMap = this.typeMapFor(type);

            var idToClientIdMap = typeMap.idToCid,
                clientIdToIdMap = this.clientIdToId,
                clientIds = typeMap.clientIds,
                dataCache = typeMap.cidToHash;

            var clientId = ++this.clientIdCounter;

            dataCache[clientId] = hash;

            // if we're creating an item, this process will be done
            // later, once the object has been persisted.
            if (id) {
                idToClientIdMap[id] = clientId;
                clientIdToIdMap[clientId] = id;
            }

            clientIds.push(clientId);

            return clientId;
        },

        // ..........................
        // . RECORD MATERIALIZATION .
        // ..........................

        materializeRecord: function (type, clientId, id) {
            var record;

            get(this, 'recordCache')[clientId] = record = type._create({
                store: this,
                clientId: clientId,
                _id: id
            });

            get(this, 'defaultTransaction').adoptRecord(record);

            record.send('loadingData');
            return record;
        },

        destroy: function () {
            if (get(DS, 'defaultStore') === this) {
                set(DS, 'defaultStore', null);
            }

            return this._super();
        }
    });

})();



(function () {
    var get = Ember.get, set = Ember.set, guidFor = Ember.guidFor;

    /**
    This file encapsulates the various states that a record can transition
    through during its lifecycle.

    ### State Manager

    A record's state manager explicitly tracks what state a record is in
    at any given time. For instance, if a record is newly created and has
    not yet been sent to the adapter to be saved, it would be in the
    `created.uncommitted` state.  If a record has had local modifications
    made to it that are in the process of being saved, the record would be
    in the `updated.inFlight` state. (These state paths will be explained
    in more detail below.)

    Events are sent by the record or its store to the record's state manager.
    How the state manager reacts to these events is dependent on which state
    it is in. In some states, certain events will be invalid and will cause
    an exception to be raised.

    States are hierarchical. For example, a record can be in the
    `deleted.start` state, then transition into the `deleted.inFlight` state.
    If a child state does not implement an event handler, the state manager
    will attempt to invoke the event on all parent states until the root state is
    reached. The state hierarchy of a record is described in terms of a path
    string. You can determine a record's current state by getting its manager's
    current state path:

    record.get('stateManager.currentState.path');
    //=> "created.uncommitted"

    The `DS.Model` states are themselves stateless. What we mean is that,
    though each instance of a record also has a unique instance of a
    `DS.StateManager`, the hierarchical states that each of *those* points
    to is a shared data structure. For performance reasons, instead of each
    record getting its own copy of the hierarchy of states, each state
    manager points to this global, immutable shared instance. How does a
    state know which record it should be acting on?  We pass a reference to
    the current state manager as the first parameter to every method invoked
    on a state.

    The state manager passed as the first parameter is where you should stash
    state about the record if needed; you should never store data on the state
    object itself. If you need access to the record being acted on, you can
    retrieve the state manager's `record` property. For example, if you had
    an event handler `myEvent`:

    myEvent: function(manager) {
    var record = manager.get('record');
    record.doSomething();
    }

    For more information about state managers in general, see the Ember.js
    documentation on `Ember.StateManager`.

    ### Events, Flags, and Transitions

    A state may implement zero or more events, flags, or transitions.

    #### Events

    Events are named functions that are invoked when sent to a record. The
    state manager will first look for a method with the given name on the
    current state. If no method is found, it will search the current state's
    parent, and then its grandparent, and so on until reaching the top of
    the hierarchy. If the root is reached without an event handler being found,
    an exception will be raised. This can be very helpful when debugging new
    features.

    Here's an example implementation of a state with a `myEvent` event handler:

    aState: DS.State.create({
    myEvent: function(manager, param) {
    console.log("Received myEvent with "+param);
    }
    })

    To trigger this event:

    record.send('myEvent', 'foo');
    //=> "Received myEvent with foo"

    Note that an optional parameter can be sent to a record's `send()` method,
    which will be passed as the second parameter to the event handler.

    Events should transition to a different state if appropriate. This can be
    done by calling the state manager's `goToState()` method with a path to the
    desired state. The state manager will attempt to resolve the state path
    relative to the current state. If no state is found at that path, it will
    attempt to resolve it relative to the current state's parent, and then its
    parent, and so on until the root is reached. For example, imagine a hierarchy
    like this:

    * created
    * start <-- currentState
    * inFlight
    * updated
    * inFlight

    If we are currently in the `start` state, calling
    `goToState('inFlight')` would transition to the `created.inFlight` state,
    while calling `goToState('updated.inFlight')` would transition to
    the `updated.inFlight` state.

    Remember that *only events* should ever cause a state transition. You should
    never call `goToState()` from outside a state's event handler. If you are
    tempted to do so, create a new event and send that to the state manager.

    #### Flags

    Flags are Boolean values that can be used to introspect a record's current
    state in a more user-friendly way than examining its state path. For example,
    instead of doing this:

    var statePath = record.get('stateManager.currentState.path');
    if (statePath === 'created.inFlight') {
    doSomething();
    }

    You can say:

    if (record.get('isNew') && record.get('isSaving')) {
    doSomething();
    }

    If your state does not set a value for a given flag, the value will
    be inherited from its parent (or the first place in the state hierarchy
    where it is defined).

    The current set of flags are defined below. If you want to add a new flag,
    in addition to the area below, you will also need to declare it in the
    `DS.Model` class.

    #### Transitions

    Transitions are like event handlers but are called automatically upon
    entering or exiting a state. To implement a transition, just call a method
    either `enter` or `exit`:

    myState: DS.State.create({
    // Gets called automatically when entering
    // this state.
    enter: function(manager) {
    console.log("Entered myState");
    }
    })

    Note that enter and exit events are called once per transition. If the
    current state changes, but changes to another child state of the parent,
    the transition event on the parent will not be triggered.
    */

    var stateProperty = Ember.computed(function (key) {
        var parent = get(this, 'parentState');
        if (parent) {
            return get(parent, key);
        }
    }).property();

    var isEmptyObject = function (object) {
        for (var name in object) {
            if (object.hasOwnProperty(name)) { return false; }
        }

        return true;
    };

    var hasDefinedProperties = function (object) {
        for (var name in object) {
            if (object.hasOwnProperty(name) && object[name]) { return true; }
        }

        return false;
    };

    DS.State = Ember.State.extend({
        isLoaded: stateProperty,
        isDirty: stateProperty,
        isSaving: stateProperty,
        isDeleted: stateProperty,
        isError: stateProperty,
        isNew: stateProperty,
        isValid: stateProperty,
        isPending: stateProperty,

        // For states that are substates of a
        // DirtyState (updated or created), it is
        // useful to be able to determine which
        // type of dirty state it is.
        dirtyType: stateProperty
    });

    var setProperty = function (manager, context) {
        var key = context.key, value = context.value;

        var record = get(manager, 'record'),
            data = get(record, 'data');

        set(data, key, value);
    };

    var setAssociation = function (manager, context) {
        var key = context.key, value = context.value;

        var record = get(manager, 'record'),
            data = get(record, 'data');

        data.setAssociation(key, value);
    };

    var didChangeData = function (manager) {
        var record = get(manager, 'record'),
            data = get(record, 'data');

        data._savedData = null;
        record.notifyPropertyChange('data');
    };

    // The waitingOn event shares common functionality
    // between the different dirty states, but each is
    // treated slightly differently. This method is exposed
    // so that each implementation can invoke the common
    // behavior, and then implement the behavior specific
    // to the state.
    var waitingOn = function (manager, object) {
        var record = get(manager, 'record'),
            pendingQueue = get(record, 'pendingQueue'),
            objectGuid = guidFor(object);

        var observer = function () {
            if (get(object, 'id')) {
                manager.send('doneWaitingOn', object);
                Ember.removeObserver(object, 'id', observer);
            }
        };

        pendingQueue[objectGuid] = [object, observer];
        Ember.addObserver(object, 'id', observer);
    };

    // Implementation notes:
    //
    // Each state has a boolean value for all of the following flags:
    //
    // * isLoaded: The record has a populated `data` property. When a
    //   record is loaded via `store.find`, `isLoaded` is false
    //   until the adapter sets it. When a record is created locally,
    //   its `isLoaded` property is always true.
    // * isDirty: The record has local changes that have not yet been
    //   saved by the adapter. This includes records that have been
    //   created (but not yet saved) or deleted.
    // * isSaving: The record's transaction has been committed, but
    //   the adapter has not yet acknowledged that the changes have
    //   been persisted to the backend.
    // * isDeleted: The record was marked for deletion. When `isDeleted`
    //   is true and `isDirty` is true, the record is deleted locally
    //   but the deletion was not yet persisted. When `isSaving` is
    //   true, the change is in-flight. When both `isDirty` and
    //   `isSaving` are false, the change has persisted.
    // * isError: The adapter reported that it was unable to save
    //   local changes to the backend. This may also result in the
    //   record having its `isValid` property become false if the
    //   adapter reported that server-side validations failed.
    // * isNew: The record was created on the client and the adapter
    //   did not yet report that it was successfully saved.
    // * isValid: No client-side validations have failed and the
    //   adapter did not report any server-side validation failures.
    // * isPending: A record `isPending` when it belongs to an
    //   association on another record and that record has not been
    //   saved. A record in this state cannot be saved because it
    //   lacks a "foreign key" that will be supplied by its parent
    //   association when the parent record has been created. When
    //   the adapter reports that the parent has saved, the
    //   `isPending` property on all children will become `false`
    //   and the transaction will try to commit the records.

    // This mixin is mixed into various uncommitted states. Make
    // sure to mix it in *after* the class definition, so its
    // super points to the class definition.
    var Uncommitted = Ember.Mixin.create({
        setProperty: setProperty,
        setAssociation: setAssociation
    });

    // These mixins are mixed into substates of the concrete
    // subclasses of DirtyState.

    var CreatedUncommitted = Ember.Mixin.create({
        deleteRecord: function (manager) {
            var record = get(manager, 'record');
            this._super(manager);

            record.withTransaction(function (t) {
                t.recordBecameClean('created', record);
            });
            manager.goToState('deleted.saved');
        }
    });

    var UpdatedUncommitted = Ember.Mixin.create({
        deleteRecord: function (manager) {
            this._super(manager);

            var record = get(manager, 'record');

            record.withTransaction(function (t) {
                t.recordBecameClean('updated', record);
            });

            manager.goToState('deleted');
        }
    });

    // The dirty state is a abstract state whose functionality is
    // shared between the `created` and `updated` states.
    //
    // The deleted state shares the `isDirty` flag with the
    // subclasses of `DirtyState`, but with a very different
    // implementation.
    var DirtyState = DS.State.extend({
        initialState: 'uncommitted',

        // FLAGS
        isDirty: true,

        // SUBSTATES

        // When a record first becomes dirty, it is `uncommitted`.
        // This means that there are local pending changes,
        // but they have not yet begun to be saved.
        uncommitted: DS.State.extend({
            // TRANSITIONS
            enter: function (manager) {
                var dirtyType = get(this, 'dirtyType'),
                    record = get(manager, 'record');

                record.withTransaction(function (t) {
                    t.recordBecameDirty(dirtyType, record);
                });
            },

            // EVENTS
            deleteRecord: Ember.K,

            waitingOn: function (manager, object) {
                waitingOn(manager, object);
                manager.goToState('pending');
            },

            willCommit: function (manager) {
                manager.goToState('inFlight');
            },

            becameInvalid: function (manager) {
                var dirtyType = get(this, 'dirtyType'),
                    record = get(manager, 'record');

                record.withTransaction(function (t) {
                    t.recordBecameInFlight(dirtyType, record);
                });

                manager.goToState('invalid');
            },

            rollback: function (manager) {
                var record = get(manager, 'record'),
                    dirtyType = get(this, 'dirtyType'),
                    data = get(record, 'data');

                data.rollback();

                record.withTransaction(function (t) {
                    t.recordBecameClean(dirtyType, record);
                });

                manager.goToState('saved');
            }
        }, Uncommitted),

        // Once a record has been handed off to the adapter to be
        // saved, it is in the 'in flight' state. Changes to the
        // record cannot be made during this window.
        inFlight: DS.State.extend({
            // FLAGS
            isSaving: true,

            // TRANSITIONS
            enter: function (manager) {
                var dirtyType = get(this, 'dirtyType'),
                    record = get(manager, 'record');

                record.withTransaction(function (t) {
                    t.recordBecameInFlight(dirtyType, record);
                });
            },

            // EVENTS
            didCommit: function (manager) {
                var dirtyType = get(this, 'dirtyType'),
                    record = get(manager, 'record');

                record.withTransaction(function (t) {
                    t.recordBecameClean('inflight', record);
                });

                manager.goToState('saved');
                manager.send('invokeLifecycleCallbacks', dirtyType);
            },

            becameInvalid: function (manager, errors) {
                var record = get(manager, 'record');

                set(record, 'errors', errors);

                manager.goToState('invalid');
                manager.send('invokeLifecycleCallbacks');
            },

            becameError: function (manager) {
                manager.goToState('error');
                manager.send('invokeLifecycleCallbacks');
            },

            didChangeData: didChangeData
        }),

        // If a record becomes associated with a newly created
        // parent record, it will be `pending` until the parent
        // record has successfully persisted. Once this happens,
        // this record can use the parent's primary key as its
        // foreign key.
        //
        // If the record's transaction had already started to
        // commit, the record will transition to the `inFlight`
        // state. If it had not, the record will transition to
        // the `uncommitted` state.
        pending: DS.State.extend({
            initialState: 'uncommitted',

            // FLAGS
            isPending: true,

            // SUBSTATES

            // A pending record whose transaction has not yet
            // started to commit is in this state.
            uncommitted: DS.State.extend({
                // EVENTS
                deleteRecord: function (manager) {
                    var record = get(manager, 'record'),
                        pendingQueue = get(record, 'pendingQueue'),
                        tuple;

                    // since we are leaving the pending state, remove any
                    // observers we have registered on other records.
                    for (var prop in pendingQueue) {
                        if (!pendingQueue.hasOwnProperty(prop)) { continue; }

                        tuple = pendingQueue[prop];
                        Ember.removeObserver(tuple[0], 'id', tuple[1]);
                    }
                },

                willCommit: function (manager) {
                    manager.goToState('committing');
                },

                doneWaitingOn: function (manager, object) {
                    var record = get(manager, 'record'),
                        pendingQueue = get(record, 'pendingQueue'),
                        objectGuid = guidFor(object);

                    delete pendingQueue[objectGuid];

                    if (isEmptyObject(pendingQueue)) {
                        manager.send('doneWaiting');
                    }
                },

                doneWaiting: function (manager) {
                    var dirtyType = get(this, 'dirtyType');
                    manager.goToState(dirtyType + '.uncommitted');
                }
            }, Uncommitted),

            // A pending record whose transaction has started
            // to commit is in this state. Since it has not yet
            // been sent to the adapter, it is not `inFlight`
            // until all of its dependencies have been committed.
            committing: DS.State.extend({
                // FLAGS
                isSaving: true,

                // EVENTS
                doneWaitingOn: function (manager, object) {
                    var record = get(manager, 'record'),
                        pendingQueue = get(record, 'pendingQueue'),
                        objectGuid = guidFor(object);

                    delete pendingQueue[objectGuid];

                    if (isEmptyObject(pendingQueue)) {
                        manager.send('doneWaiting');
                    }
                },

                doneWaiting: function (manager) {
                    var record = get(manager, 'record'),
                        transaction = get(record, 'transaction');

                    // Now that the record is no longer pending, schedule
                    // the transaction to commit.
                    Ember.run.once(transaction, transaction.commit);
                },

                willCommit: function (manager) {
                    var record = get(manager, 'record'),
                        pendingQueue = get(record, 'pendingQueue');

                    if (isEmptyObject(pendingQueue)) {
                        var dirtyType = get(this, 'dirtyType');
                        manager.goToState(dirtyType + '.inFlight');
                    }
                }
            })
        }),

        // A record is in the `invalid` state when its client-side
        // invalidations have failed, or if the adapter has indicated
        // the the record failed server-side invalidations.
        invalid: DS.State.extend({
            // FLAGS
            isValid: false,

            exit: function (manager) {
                var record = get(manager, 'record');

                record.withTransaction(function (t) {
                    t.recordBecameClean('inflight', record);
                });
            },

            // EVENTS
            deleteRecord: function (manager) {
                manager.goToState('deleted');
            },

            setAssociation: setAssociation,

            setProperty: function (manager, context) {
                setProperty(manager, context);

                var record = get(manager, 'record'),
                    errors = get(record, 'errors'),
                    key = context.key;

                set(errors, key, null);

                if (!hasDefinedProperties(errors)) {
                    manager.send('becameValid');
                }
            },

            rollback: function (manager) {
                manager.send('becameValid');
                manager.send('rollback');
            },

            becameValid: function (manager) {
                manager.goToState('uncommitted');
            },

            invokeLifecycleCallbacks: function (manager) {
                var record = get(manager, 'record');
                record.trigger('becameInvalid', record);
            }
        })
    });

    // The created and updated states are created outside the state
    // chart so we can reopen their substates and add mixins as
    // necessary.

    var createdState = DirtyState.create({
        dirtyType: 'created',

        // FLAGS
        isNew: true
    });

    var updatedState = DirtyState.create({
        dirtyType: 'updated'
    });

    // The created.uncommitted state and created.pending.uncommitted share
    // some logic defined in CreatedUncommitted.
    createdState.states.uncommitted.reopen(CreatedUncommitted);
    createdState.states.pending.states.uncommitted.reopen(CreatedUncommitted);

    // The created.uncommitted state needs to immediately transition to the
    // deleted state if it is rolled back.
    createdState.states.uncommitted.reopen({
        rollback: function (manager) {
            this._super(manager);
            manager.goToState('deleted.saved');
        }
    });

    // The updated.uncommitted state and updated.pending.uncommitted share
    // some logic defined in UpdatedUncommitted.
    updatedState.states.uncommitted.reopen(UpdatedUncommitted);
    updatedState.states.pending.states.uncommitted.reopen(UpdatedUncommitted);
    updatedState.states.inFlight.reopen({
        didSaveData: function (manager) {
            var record = get(manager, 'record'),
                data = get(record, 'data');

            data.saveData();
            data.adapterDidUpdate();
        }
    });

    var states = {
        rootState: Ember.State.create({
            // FLAGS
            isLoaded: false,
            isDirty: false,
            isSaving: false,
            isDeleted: false,
            isError: false,
            isNew: false,
            isValid: true,
            isPending: false,

            // SUBSTATES

            // A record begins its lifecycle in the `empty` state.
            // If its data will come from the adapter, it will
            // transition into the `loading` state. Otherwise, if
            // the record is being created on the client, it will
            // transition into the `created` state.
            empty: DS.State.create({
                // EVENTS
                loadingData: function (manager) {
                    manager.goToState('loading');
                },

                didChangeData: function (manager) {
                    didChangeData(manager);

                    manager.goToState('loaded.created');
                }
            }),

            // A record enters this state when the store askes
            // the adapter for its data. It remains in this state
            // until the adapter provides the requested data.
            //
            // Usually, this process is asynchronous, using an
            // XHR to retrieve the data.
            loading: DS.State.create({
                // TRANSITIONS
                exit: function (manager) {
                    var record = get(manager, 'record');
                    record.trigger('didLoad');
                },

                // EVENTS
                didChangeData: function (manager, data) {
                    didChangeData(manager);
                    manager.send('loadedData');
                },

                loadedData: function (manager) {
                    manager.goToState('loaded');
                }
            }),

            // A record enters this state when its data is populated.
            // Most of a record's lifecycle is spent inside substates
            // of the `loaded` state.
            loaded: DS.State.create({
                initialState: 'saved',

                // FLAGS
                isLoaded: true,

                // SUBSTATES

                // If there are no local changes to a record, it remains
                // in the `saved` state.
                saved: DS.State.create({

                    // EVENTS
                    setProperty: function (manager, context) {
                        setProperty(manager, context);
                        manager.goToState('updated');
                    },

                    setAssociation: function (manager, context) {
                        setAssociation(manager, context);
                        manager.goToState('updated');
                    },

                    didChangeData: didChangeData,

                    deleteRecord: function (manager) {
                        manager.goToState('deleted');
                    },

                    waitingOn: function (manager, object) {
                        waitingOn(manager, object);
                        manager.goToState('updated.pending');
                    },

                    invokeLifecycleCallbacks: function (manager, dirtyType) {
                        var record = get(manager, 'record');
                        if (dirtyType === 'created') {
                            record.trigger('didCreate', record);
                        } else {
                            record.trigger('didUpdate', record);
                        }
                    }
                }),

                // A record is in this state after it has been locally
                // created but before the adapter has indicated that
                // it has been saved.
                created: createdState,

                // A record is in this state if it has already been
                // saved to the server, but there are new local changes
                // that have not yet been saved.
                updated: updatedState
            }),

            // A record is in this state if it was deleted from the store.
            deleted: DS.State.create({
                // FLAGS
                isDeleted: true,
                isLoaded: true,
                isDirty: true,

                // TRANSITIONS
                enter: function (manager) {
                    var record = get(manager, 'record'),
                        store = get(record, 'store');

                    store.removeFromRecordArrays(record);
                },

                // SUBSTATES

                // When a record is deleted, it enters the `start`
                // state. It will exit this state when the record's
                // transaction starts to commit.
                start: DS.State.create({
                    // TRANSITIONS
                    enter: function (manager) {
                        var record = get(manager, 'record');

                        record.withTransaction(function (t) {
                            t.recordBecameDirty('deleted', record);
                        });
                    },

                    // EVENTS
                    willCommit: function (manager) {
                        manager.goToState('inFlight');
                    },

                    rollback: function (manager) {
                        var record = get(manager, 'record'),
                            data = get(record, 'data');

                        data.rollback();
                        record.withTransaction(function (t) {
                            t.recordBecameClean('deleted', record);
                        });
                        manager.goToState('loaded');
                    }
                }),

                // After a record's transaction is committing, but
                // before the adapter indicates that the deletion
                // has saved to the server, a record is in the
                // `inFlight` substate of `deleted`.
                inFlight: DS.State.create({
                    // FLAGS
                    isSaving: true,

                    // TRANSITIONS
                    enter: function (manager) {
                        var record = get(manager, 'record');

                        record.withTransaction(function (t) {
                            t.recordBecameInFlight('deleted', record);
                        });
                    },

                    // EVENTS
                    didCommit: function (manager) {
                        var record = get(manager, 'record');

                        record.withTransaction(function (t) {
                            t.recordBecameClean('inflight', record);
                        });

                        manager.goToState('saved');

                        manager.send('invokeLifecycleCallbacks');
                    }
                }),

                // Once the adapter indicates that the deletion has
                // been saved, the record enters the `saved` substate
                // of `deleted`.
                saved: DS.State.create({
                    // FLAGS
                    isDirty: false,

                    invokeLifecycleCallbacks: function (manager) {
                        var record = get(manager, 'record');
                        record.trigger('didDelete', record);
                    }
                })
            }),

            // If the adapter indicates that there was an unknown
            // error saving a record, the record enters the `error`
            // state.
            error: DS.State.create({
                isError: true,

                // EVENTS

                invokeLifecycleCallbacks: function (manager) {
                    var record = get(manager, 'record');
                    record.trigger('becameError', record);
                }
            })
        })
    };

    DS.StateManager = Ember.StateManager.extend({
        record: null,
        initialState: 'rootState',
        states: states
    });

})();



(function () {
    var get = Ember.get, set = Ember.set;

    //  When a record is changed on the client, it is considered "dirty"--there are
    //  pending changes that need to be saved to a persistence layer, such as a
    //  server.
    //
    //  If the record is rolled back, it re-enters a clean state, any changes are
    //  discarded, and its attributes are reset back to the last known good copy
    //  of the data that came from the server.
    //
    //  If the record is committed, the changes are sent to the server to be saved,
    //  and once the server confirms that they are valid, the record's "canonical"
    //  data becomes the original canonical data plus the changes merged in.
    //
    //  A DataProxy is an object that encapsulates this change tracking. It
    //  contains three buckets:
    //
    //  * `savedData` - the last-known copy of the data from the server
    //  * `unsavedData` - a hash that contains any changes that have not yet
    //     been committed
    //  * `associations` - this is similar to `savedData`, but holds the client
    //    ids of associated records
    //
    //  When setting a property on the object, the value is placed into the
    //  `unsavedData` bucket:
    //
    //      proxy.set('key', 'value');
    //
    //      // unsavedData:
    //      {
    //        key: "value"
    //      }
    //
    //  When retrieving a property from the object, it first looks to see
    //  if that value exists in the `unsavedData` bucket, and returns it if so.
    //  Otherwise, it returns the value from the `savedData` bucket.
    //
    //  When the adapter notifies a record that it has been saved, it merges the
    //  `unsavedData` bucket into the `savedData` bucket. If the record's
    //  transaction is rolled back, the `unsavedData` hash is simply discarded.
    //
    //  This object is a regular JS object for performance. It is only
    //  used internally for bookkeeping purposes.

    var DataProxy = DS._DataProxy = function (record) {
        this.record = record;

        this.unsavedData = {};

        this.associations = {};
    };

    DataProxy.prototype = {
        get: function (key) { return Ember.get(this, key); },
        set: function (key, value) { return Ember.set(this, key, value); },

        setAssociation: function (key, value) {
            this.associations[key] = value;
        },

        savedData: function () {
            var savedData = this._savedData;
            if (savedData) { return savedData; }

            var record = this.record,
                clientId = get(record, 'clientId'),
                store = get(record, 'store');

            if (store) {
                savedData = store.dataForRecord(record);
                this._savedData = savedData;
                return savedData;
            }
        },

        unknownProperty: function (key) {
            var unsavedData = this.unsavedData,
                associations = this.associations,
                savedData = this.savedData(),
                store;

            var value = unsavedData[key], association;

            // if this is a belongsTo association, this will
            // be a clientId.
            association = associations[key];

            if (association !== undefined) {
                store = get(this.record, 'store');
                return store.clientIdToId[association];
            }

            if (savedData && value === undefined) {
                value = savedData[key];
            }

            return value;
        },

        setUnknownProperty: function (key, value) {
            var record = this.record,
                unsavedData = this.unsavedData;

            unsavedData[key] = value;

            record.hashWasUpdated();

            return value;
        },

        commit: function () {
            this.saveData();

            this.record.notifyPropertyChange('data');
        },

        rollback: function () {
            this.unsavedData = {};

            this.record.notifyPropertyChange('data');
        },

        saveData: function () {
            var record = this.record;

            var unsavedData = this.unsavedData;
            var savedData = this.savedData();

            for (var prop in unsavedData) {
                if (unsavedData.hasOwnProperty(prop)) {
                    savedData[prop] = unsavedData[prop];
                    delete unsavedData[prop];
                }
            }
        },

        adapterDidUpdate: function () {
            this.unsavedData = {};
        }
    };

})();



(function () {
    var get = Ember.get, set = Ember.set, none = Ember.none;

    var retrieveFromCurrentState = Ember.computed(function (key) {
        return get(get(this, 'stateManager.currentState'), key);
    }).property('stateManager.currentState').cacheable();

    DS.Model = Ember.Object.extend(Ember.Evented, {
        isLoaded: retrieveFromCurrentState,
        isDirty: retrieveFromCurrentState,
        isSaving: retrieveFromCurrentState,
        isDeleted: retrieveFromCurrentState,
        isError: retrieveFromCurrentState,
        isNew: retrieveFromCurrentState,
        isPending: retrieveFromCurrentState,
        isValid: retrieveFromCurrentState,

        clientId: null,
        transaction: null,
        stateManager: null,
        pendingQueue: null,
        errors: null,

        // because unknownProperty is used, any internal property
        // must be initialized here.
        primaryKey: 'id',
        id: Ember.computed(function (key, value) {
            var primaryKey = get(this, 'primaryKey'),
                data = get(this, 'data');

            if (arguments.length === 2) {
                set(data, primaryKey, value);
                return value;
            }

            var id = get(data, primaryKey);
            return id ? id : this._id;
        }).property('primaryKey', 'data'),

        // The following methods are callbacks invoked by `toJSON`. You
        // can override one of the callbacks to override specific behavior,
        // or toJSON itself.
        //
        // If you override toJSON, you can invoke these callbacks manually
        // to get the default behavior.

        /**
        Add the record's primary key to the JSON hash.

        The default implementation uses the record's specified `primaryKey`
        and the `id` computed property, which are passed in as parameters.

        @param {Object} json the JSON hash being built
        @param {Number|String} id the record's id
        @param {String} key the primaryKey for the record
        */
        addIdToJSON: function (json, id, key) {
            if (id) { json[key] = id; }
        },

        /**
        Add the attributes' current values to the JSON hash.

        The default implementation gets the current value of each
        attribute from the `data`, and uses a `defaultValue` if
        specified in the `DS.attr` definition.

        @param {Object} json the JSON hash being build
        @param {Ember.Map} attributes a Map of attributes
        @param {DataProxy} data the record's data, accessed with `get` and `set`.
        */
        addAttributesToJSON: function (json, attributes, data) {
            attributes.forEach(function (name, meta) {
                var key = meta.key(this.constructor),
                    value = get(data, key);

                if (value === undefined) {
                    value = meta.options.defaultValue;
                }

                json[key] = value;
            }, this);
        },

        /**
        Add the value of a `hasMany` association to the JSON hash.

        The default implementation honors the `embedded` option
        passed to `DS.hasMany`. If embedded, `toJSON` is recursively
        called on the child records. If not, the `id` of each
        record is added.

        Note that if a record is not embedded and does not
        yet have an `id` (usually provided by the server), it
        will not be included in the output.

        @param {Object} json the JSON hash being built
        @param {DataProxy} data the record's data, accessed with `get` and `set`.
        @param {Object} meta information about the association
        @param {Object} options options passed to `toJSON`
        */
        addHasManyToJSON: function (json, data, meta, options) {
            var key = meta.key,
                manyArray = get(this, key),
                records = [], i, l,
                clientId, id;

            if (meta.options.embedded) {
                // TODO: Avoid materializing embedded hashes if possible
                manyArray.forEach(function (record) {
                    records.push(record.toJSON(options));
                });
            } else {
                var clientIds = get(manyArray, 'content');

                for (i = 0, l = clientIds.length; i < l; i++) {
                    clientId = clientIds[i];
                    id = get(this, 'store').clientIdToId[clientId];

                    if (id !== undefined) {
                        records.push(id);
                    }
                }
            }

            key = meta.options.key || get(this, 'namingConvention').keyToJSONKey(key);
            json[key] = records;
        },

        /**
        Add the value of a `belongsTo` association to the JSON hash.

        The default implementation always includes the `id`.

        @param {Object} json the JSON hash being built
        @param {DataProxy} data the record's data, accessed with `get` and `set`.
        @param {Object} meta information about the association
        @param {Object} options options passed to `toJSON`
        */
        addBelongsToToJSON: function (json, data, meta, options) {
            var key = meta.key, value, id;

            if (meta.options.embedded) {
                key = meta.options.key || get(this, 'namingConvention').keyToJSONKey(key);
                value = get(data.record, key);
                json[key] = value ? value.toJSON(options) : null;
            } else {
                key = meta.options.key || get(this, 'namingConvention').foreignKey(key);
                id = data.get(key);
                json[key] = none(id) ? null : id;
            }
        },
        /**
        Create a JSON representation of the record, including its `id`,
        attributes and associations. Honor any settings defined on the
        attributes or associations (such as `embedded` or `key`).
        */
        toJSON: function (options) {
            var data = get(this, 'data'),
                result = {},
                type = this.constructor,
                attributes = get(type, 'attributes'),
                primaryKey = get(this, 'primaryKey'),
                id = get(this, 'id'),
                store = get(this, 'store'),
                associations;

            options = options || {};

            // delegate to `addIdToJSON` callback
            this.addIdToJSON(result, id, primaryKey);

            // delegate to `addAttributesToJSON` callback
            this.addAttributesToJSON(result, attributes, data);

            associations = get(type, 'associationsByName');

            // add associations, delegating to `addHasManyToJSON` and
            // `addBelongsToToJSON`.
            associations.forEach(function (key, meta) {
                if (options.associations && meta.kind === 'hasMany') {
                    this.addHasManyToJSON(result, data, meta, options);
                } else if (meta.kind === 'belongsTo') {
                    this.addBelongsToToJSON(result, data, meta, options);
                }
            }, this);

            return result;
        },

        data: Ember.computed(function () {
            return new DS._DataProxy(this);
        }).cacheable(),

        didLoad: Ember.K,
        didUpdate: Ember.K,
        didCreate: Ember.K,
        didDelete: Ember.K,
        becameInvalid: Ember.K,
        becameError: Ember.K,

        init: function () {
            var stateManager = DS.StateManager.create({
                record: this
            });

            set(this, 'pendingQueue', {});

            set(this, 'stateManager', stateManager);
            stateManager.goToState('empty');
        },

        destroy: function () {
            if (!get(this, 'isDeleted')) {
                this.deleteRecord();
            }
            this._super();
        },

        send: function (name, context) {
            return get(this, 'stateManager').send(name, context);
        },

        withTransaction: function (fn) {
            var transaction = get(this, 'transaction');
            if (transaction) { fn(transaction); }
        },

        setProperty: function (key, value) {
            this.send('setProperty', { key: key, value: value });
        },

        deleteRecord: function () {
            this.send('deleteRecord');
        },

        waitingOn: function (record) {
            this.send('waitingOn', record);
        },

        notifyHashWasUpdated: function () {
            var store = get(this, 'store');
            if (store) {
                store.hashWasUpdated(this.constructor, get(this, 'clientId'), this);
            }
        },

        unknownProperty: function (key) {
            var data = get(this, 'data');

            if (data && key in data) {
                Ember.assert("You attempted to access the " + key + " property on a record without defining an attribute.", false);
            }
        },

        setUnknownProperty: function (key, value) {
            var data = get(this, 'data');

            if (data && key in data) {
                Ember.assert("You attempted to set the " + key + " property on a record without defining an attribute.", false);
            } else {
                return this._super(key, value);
            }
        },

        namingConvention: {
            keyToJSONKey: function (key) {
                // TODO: Strip off `is` from the front. Example: `isHipster` becomes `hipster`
                return Ember.String.decamelize(key);
            },

            foreignKey: function (key) {
                return Ember.String.decamelize(key) + '_id';
            }
        },

        /** @private */
        hashWasUpdated: function () {
            // At the end of the run loop, notify record arrays that
            // this record has changed so they can re-evaluate its contents
            // to determine membership.
            Ember.run.once(this, this.notifyHashWasUpdated);
        },

        dataDidChange: Ember.observer(function () {
            var associations = get(this.constructor, 'associationsByName'),
                data = get(this, 'data'), store = get(this, 'store'),
                idToClientId = store.idToClientId,
                cachedValue;

            associations.forEach(function (name, association) {
                if (association.kind === 'hasMany') {
                    cachedValue = this.cacheFor(name);

                    if (cachedValue) {
                        var key = association.options.key || get(this, 'namingConvention').keyToJSONKey(name),
                            ids = data.get(key) || [];

                        var clientIds;
                        if (association.options.embedded) {
                            clientIds = store.loadMany(association.type, ids).clientIds;
                        } else {
                            clientIds = Ember.EnumerableUtils.map(ids, function (id) {
                                return store.clientIdForId(association.type, id);
                            });
                        }

                        set(cachedValue, 'content', Ember.A(clientIds));
                        cachedValue.fetch();
                    }
                }
            }, this);
        }, 'data'),

        /**
        @private

        Override the default event firing from Ember.Evented to
        also call methods with the given name.
        */
        trigger: function (name) {
            Ember.tryInvoke(this, name, [].slice.call(arguments, 1));
            this._super.apply(this, arguments);
        }
    });

    // Helper function to generate store aliases.
    // This returns a function that invokes the named alias
    // on the default store, but injects the class as the
    // first parameter.
    var storeAlias = function (methodName) {
        return function () {
            var store = get(DS, 'defaultStore'),
                args = [].slice.call(arguments);

            args.unshift(this);
            return store[methodName].apply(store, args);
        };
    };

    DS.Model.reopenClass({
        isLoaded: storeAlias('recordIsLoaded'),
        find: storeAlias('find'),
        filter: storeAlias('filter'),

        _create: DS.Model.create,

        create: function () {
            throw new Ember.Error("You should not call `create` on a model. Instead, call `createRecord` with the attributes you would like to set.");
        },

        createRecord: storeAlias('createRecord')
    });

})();



(function () {
    var get = Ember.get;
    DS.Model.reopenClass({
        attributes: Ember.computed(function () {
            var map = Ember.Map.create();

            this.eachComputedProperty(function (name, meta) {
                if (meta.isAttribute) { map.set(name, meta); }
            });

            return map;
        }).cacheable(),

        processAttributeKeys: function () {
            if (this.processedAttributeKeys) { return; }

            var namingConvention = this.proto().namingConvention;

            this.eachComputedProperty(function (name, meta) {
                if (meta.isAttribute && !meta.options.key) {
                    meta.options.key = namingConvention.keyToJSONKey(name, this);
                }
            }, this);
        }
    });

    function getAttr(record, options, key) {
        var data = get(record, 'data');
        var value = get(data, key);

        if (value === undefined) {
            value = options.defaultValue;
        }

        return value;
    }

    DS.attr = function (type, options) {
        var transform = DS.attr.transforms[type];
        Ember.assert("Could not find model attribute of type " + type, !!transform);

        var transformFrom = transform.from;
        var transformTo = transform.to;

        options = options || {};

        var meta = {
            type: type,
            isAttribute: true,
            options: options,

            // this will ensure that the key always takes naming
            // conventions into consideration.
            key: function (recordType) {
                recordType.processAttributeKeys();
                return options.key;
            }
        };

        return Ember.computed(function (key, value) {
            var data;

            key = meta.key(this.constructor);

            if (arguments.length === 2) {
                value = transformTo(value);

                if (value !== getAttr(this, options, key)) {
                    this.setProperty(key, value);
                }
            } else {
                value = getAttr(this, options, key);
            }

            return transformFrom(value);
            // `data` is never set directly. However, it may be
            // invalidated from the state manager's setData
            // event.
        }).property('data').cacheable().meta(meta);
    };

    DS.attr.transforms = {
        string: {
            from: function (serialized) {
                return Ember.none(serialized) ? null : String(serialized);
            },

            to: function (deserialized) {
                return Ember.none(deserialized) ? null : String(deserialized);
            }
        },

        number: {
            from: function (serialized) {
                return Ember.none(serialized) ? null : Number(serialized);
            },

            to: function (deserialized) {
                return Ember.none(deserialized) ? null : Number(deserialized);
            }
        },

        'boolean': {
            from: function (serialized) {
                return Boolean(serialized);
            },

            to: function (deserialized) {
                return Boolean(deserialized);
            }
        },

        date: {
            from: function (serialized) {
                var type = typeof serialized;

                if (type === "string" || type === "number") {
                    return new Date(serialized);
                } else if (serialized === null || serialized === undefined) {
                    // if the value is not present in the data,
                    // return undefined, not null.
                    return serialized;
                } else {
                    return null;
                }
            },

            to: function (date) {
                if (date instanceof Date) {
                    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

                    var pad = function (num) {
                        return num < 10 ? "0" + num : "" + num;
                    };

                    var utcYear = date.getUTCFullYear(),
                        utcMonth = date.getUTCMonth(),
                        utcDayOfMonth = date.getUTCDate(),
                        utcDay = date.getUTCDay(),
                        utcHours = date.getUTCHours(),
                        utcMinutes = date.getUTCMinutes(),
                        utcSeconds = date.getUTCSeconds();


                    var dayOfWeek = days[utcDay];
                    var dayOfMonth = pad(utcDayOfMonth);
                    var month = months[utcMonth];

                    return dayOfWeek + ", " + dayOfMonth + " " + month + " " + utcYear + " " +
                        pad(utcHours) + ":" + pad(utcMinutes) + ":" + pad(utcSeconds) + " GMT";
                } else if (date === undefined) {
                    return undefined;
                } else {
                    return null;
                }
            }
        }
    };


})();



(function () {

})();



(function () {
    var get = Ember.get, set = Ember.set,
        none = Ember.none;

    var embeddedFindRecord = function (store, type, data, key, one) {
        var association = get(data, key);
        return none(association) ? undefined : store.load(type, association).id;
    };

    var referencedFindRecord = function (store, type, data, key, one) {
        return get(data, key);
    };

    var hasAssociation = function (type, options, one) {
        options = options || {};

        var embedded = options.embedded,
            findRecord = embedded ? embeddedFindRecord : referencedFindRecord;

        var meta = { type: type, isAssociation: true, options: options, kind: 'belongsTo' };

        return Ember.computed(function (key, value) {
            var data = get(this, 'data'), ids, id, association,
                store = get(this, 'store');

            if (typeof type === 'string') {
                type = get(this, type, false) || get(window, type);
            }

            if (arguments.length === 2) {
                key = options.key || get(this, 'namingConvention').foreignKey(key);
                this.send('setAssociation', { key: key, value: Ember.none(value) ? null : get(value, 'clientId') });
                //data.setAssociation(key, get(value, 'clientId'));
                // put the client id in `key` in the data hash
                return value;
            } else {
                // Embedded belongsTo associations should not look for
                // a foreign key.
                if (embedded) {
                    key = options.key || get(this, 'namingConvention').keyToJSONKey(key);

                    // Non-embedded associations should look for a foreign key.
                    // For example, instead of person, we might look for person_id
                } else {
                    key = options.key || get(this, 'namingConvention').foreignKey(key);
                }
                id = findRecord(store, type, data, key, true);
                association = id ? store.find(type, id) : null;
            }

            return association;
        }).property('data').cacheable().meta(meta);
    };

    DS.belongsTo = function (type, options) {
        Ember.assert("The type passed to DS.belongsTo must be defined", !!type);
        return hasAssociation(type, options);
    };

})();



(function () {
    var get = Ember.get, set = Ember.set;
    var embeddedFindRecord = function (store, type, data, key) {
        var association = get(data, key);
        return association ? store.loadMany(type, association).ids : [];
    };

    var referencedFindRecord = function (store, type, data, key, one) {
        return get(data, key);
    };

    var hasAssociation = function (type, options) {
        options = options || {};

        var embedded = options.embedded,
            findRecord = embedded ? embeddedFindRecord : referencedFindRecord;

        var meta = { type: type, isAssociation: true, options: options, kind: 'hasMany' };

        return Ember.computed(function (key, value) {
            var data = get(this, 'data'),
                store = get(this, 'store'),
                ids, id, association;

            if (typeof type === 'string') {
                type = get(this, type, false) || get(window, type);
            }

            key = options.key || get(this, 'namingConvention').keyToJSONKey(key);
            ids = findRecord(store, type, data, key);
            association = store.findMany(type, ids || []);
            set(association, 'parentRecord', this);

            return association;
        }).property().cacheable().meta(meta);
    };

    DS.hasMany = function (type, options) {
        Ember.assert("The type passed to DS.hasMany must be defined", !!type);
        return hasAssociation(type, options);
    };

})();



(function () {
    var get = Ember.get;

    DS.Model.reopenClass({
        typeForAssociation: function (name) {
            var association = get(this, 'associationsByName').get(name);
            return association && association.type;
        },

        associations: Ember.computed(function () {
            var map = Ember.Map.create();

            this.eachComputedProperty(function (name, meta) {
                if (meta.isAssociation) {
                    var type = meta.type,
                        typeList = map.get(type);

                    if (typeof type === 'string') {
                        type = get(this, type, false) || get(window, type);
                        meta.type = type;
                    }

                    if (!typeList) {
                        typeList = [];
                        map.set(type, typeList);
                    }

                    typeList.push({ name: name, kind: meta.kind });
                }
            });

            return map;
        }).cacheable(),

        associationsByName: Ember.computed(function () {
            var map = Ember.Map.create(), type;

            this.eachComputedProperty(function (name, meta) {
                if (meta.isAssociation) {
                    meta.key = name;
                    type = meta.type;

                    if (typeof type === 'string') {
                        type = get(this, type, false) || get(window, type);
                        meta.type = type;
                    }

                    map.set(name, meta);
                }
            });

            return map;
        }).cacheable()
    });

})();



(function () {

})();



(function () {
    /**
    An adapter is an object that receives requests from a store and
    translates them into the appropriate action to take against your
    persistence layer. The persistence layer is usually an HTTP API, but may
    be anything, such as the browser's local storage.

    ### Creating an Adapter

    First, create a new subclass of `DS.Adapter`:

    App.MyAdapter = DS.Adapter.extend({
    // ...your code here
    });

    To tell your store which adapter to use, set its `adapter` property:

    App.store = DS.Store.create({
    revision: 3,
    adapter: App.MyAdapter.create()
    });

    `DS.Adapter` is an abstract base class that you should override in your
    application to customize it for your backend. The minimum set of methods
    that you should implement is:

    * `find()`
    * `createRecord()`
    * `updateRecord()`
    * `deleteRecord()`

    To improve the network performance of your application, you can optimize
    your adapter by overriding these lower-level methods:

    * `findMany()`
    * `createRecords()`
    * `updateRecords()`
    * `deleteRecords()`
    * `commit()`

    For more information about the adapter API, please see `README.md`.
    */

    DS.Adapter = Ember.Object.extend({
        /**
        The `find()` method is invoked when the store is asked for a record that
        has not previously been loaded. In response to `find()` being called, you
        should query your persistence layer for a record with the given ID. Once
        found, you can asynchronously call the store's `load()` method to load
        the record.

        Here is an example `find` implementation:

        find: function(store, type, id) {
        var url = type.url;
        url = url.fmt(id);

        jQuery.getJSON(url, function(data) {
        // data is a Hash of key/value pairs. If your server returns a
        // root, simply do something like:
        // store.load(type, id, data.person)
        store.load(type, id, data);
        });
        }
        */
        find: null,

        /**
        If the globally unique IDs for your records should be generated on the client,
        implement the `generateIdForRecord()` method. This method will be invoked
        each time you create a new record, and the value returned from it will be
        assigned to the record's `primaryKey`.

        Most traditional REST-like HTTP APIs will not use this method. Instead, the ID
        of the record will be set by the server, and your adapter will update the store
        with the new ID when it calls `didCreateRecord()`. Only implement this method if
        you intend to generate record IDs on the client-side.

        The `generateIdForRecord()` method will be invoked with the requesting store as
        the first parameter and the newly created record as the second parameter:

        generateIdForRecord: function(store, record) {
        var uuid = App.generateUUIDWithStatisticallyLowOddsOfCollision();
        return uuid;
        }
        */
        generateIdForRecord: null,

        commit: function (store, commitDetails) {
            commitDetails.updated.eachType(function (type, array) {
                this.updateRecords(store, type, array.slice());
            }, this);

            commitDetails.created.eachType(function (type, array) {
                this.createRecords(store, type, array.slice());
            }, this);

            commitDetails.deleted.eachType(function (type, array) {
                this.deleteRecords(store, type, array.slice());
            }, this);
        },

        createRecords: function (store, type, records) {
            records.forEach(function (record) {
                this.createRecord(store, type, record);
            }, this);
        },

        updateRecords: function (store, type, records) {
            records.forEach(function (record) {
                this.updateRecord(store, type, record);
            }, this);
        },

        deleteRecords: function (store, type, records) {
            records.forEach(function (record) {
                this.deleteRecord(store, type, record);
            }, this);
        },

        findMany: function (store, type, ids) {
            ids.forEach(function (id) {
                this.find(store, type, id);
            }, this);
        }
    });

})();



(function () {
    var set = Ember.set;

    Ember.onLoad('application', function (app) {
        app.registerInjection({
            name: "store",
            before: "controllers",

            injection: function (app, stateManager, property) {
                if (property === 'Store') {
                    set(stateManager, 'store', app[property].create());
                }
            }
        });

        app.registerInjection({
            name: "giveStoreToControllers",

            injection: function (app, stateManager, property) {
                if (property.match(/Controller$/)) {
                    var controllerName = property.charAt(0).toLowerCase() + property.substr(1);
                    var store = stateManager.get('store');
                    var controller = stateManager.get(controllerName);

                    controller.set('store', store);
                }
            }
        });
    });

})();



(function () {
    var get = Ember.get;

    DS.FixtureAdapter = DS.Adapter.extend({

        simulateRemoteResponse: true,

        latency: 50,

        /*
        Implement this method in order to provide data associated with a type
        */
        fixturesForType: function (type) {
            return type.FIXTURES ? Ember.A(type.FIXTURES) : null;
        },

        /*
        Implement this method in order to query fixtures data
        */
        queryFixtures: function (fixtures, query) {
            return fixtures;
        },

        /*
        Implement this method in order to provide provide json for CRUD methods
        */
        mockJSON: function (type, record) {
            return record.toJSON({ associations: true });
        },

        /*
        Adapter methods
        */
        generateIdForRecord: function (store, record) {
            return Ember.guidFor(record);
        },

        find: function (store, type, id) {
            var fixtures = this.fixturesForType(type);

            Ember.assert("Unable to find fixtures for model type " + type.toString(), !!fixtures);

            if (fixtures) {
                fixtures = fixtures.findProperty('id', id);
            }

            if (fixtures) {
                this.simulateRemoteCall(function () {
                    store.load(type, fixtures);
                }, store, type);
            }
        },

        findMany: function (store, type, ids) {
            var fixtures = this.fixturesForType(type);

            Ember.assert("Unable to find fixtures for model type " + type.toString(), !!fixtures);

            if (fixtures) {
                fixtures = fixtures.filter(function (item) {
                    return ids.indexOf(item.id) !== -1;
                });
            }

            if (fixtures) {
                this.simulateRemoteCall(function () {
                    store.loadMany(type, fixtures);
                }, store, type);
            }
        },

        findAll: function (store, type) {
            var fixtures = this.fixturesForType(type);

            Ember.assert("Unable to find fixtures for model type " + type.toString(), !!fixtures);

            this.simulateRemoteCall(function () {
                store.loadMany(type, fixtures);
            }, store, type);
        },

        findQuery: function (store, type, query, array) {
            var fixtures = this.fixturesForType(type);

            Ember.assert("Unable to find fixtures for model type " + type.toString(), !!fixtures);

            fixtures = this.queryFixtures(fixtures, query);

            if (fixtures) {
                this.simulateRemoteCall(function () {
                    array.load(fixtures);
                }, store, type);
            }
        },

        createRecord: function (store, type, record) {
            var fixture = this.mockJSON(type, record);

            fixture.id = this.generateIdForRecord(store, record);

            this.simulateRemoteCall(function () {
                store.didCreateRecord(record, fixture);
            }, store, type, record);
        },

        updateRecord: function (store, type, record) {
            var fixture = this.mockJSON(type, record);

            this.simulateRemoteCall(function () {
                store.didUpdateRecord(record, fixture);
            }, store, type, record);
        },

        deleteRecord: function (store, type, record) {
            this.simulateRemoteCall(function () {
                store.didDeleteRecord(record);
            }, store, type, record);
        },

        /*
        @private
        */
        simulateRemoteCall: function (callback, store, type, record) {
            if (get(this, 'simulateRemoteResponse')) {
                setTimeout(callback, get(this, 'latency'));
            } else {
                callback();
            }
        }
    });

    DS.fixtureAdapter = DS.FixtureAdapter.create();

})();



(function () {
    /*global jQuery*/

    var get = Ember.get, set = Ember.set;

    DS.RESTAdapter = DS.Adapter.extend({
        bulkCommit: false,

        createRecord: function (store, type, record) {
            var root = this.rootForType(type);

            var data = {};
            data[root] = record.toJSON();

            this.ajax(this.buildURL(root), "POST", {
                data: data,
                context: this,
                success: function (json) {
                    this.didCreateRecord(store, type, record, json);
                }
            });
        },

        didCreateRecord: function (store, type, record, json) {
            var root = this.rootForType(type);

            this.sideload(store, type, json, root);
            store.didCreateRecord(record, json[root]);
        },

        createRecords: function (store, type, records) {
            if (get(this, 'bulkCommit') === false) {
                return this._super(store, type, records);
            }

            var root = this.rootForType(type),
                plural = this.pluralize(root);

            var data = {};
            data[plural] = records.map(function (record) {
                return record.toJSON();
            });

            this.ajax(this.buildURL(root), "POST", {
                data: data,
                context: this,
                success: function (json) {
                    this.didCreateRecords(store, type, records, json);
                }
            });
        },

        didCreateRecords: function (store, type, records, json) {
            var root = this.pluralize(this.rootForType(type));

            this.sideload(store, type, json, root);
            store.didCreateRecords(type, records, json[root]);
        },

        updateRecord: function (store, type, record) {
            var id = get(record, 'id');
            var root = this.rootForType(type);

            var data = {};
            data[root] = record.toJSON();

            this.ajax(this.buildURL(root, id), "PUT", {
                data: data,
                context: this,
                success: function (json) {
                    this.didUpdateRecord(store, type, record, json);
                }
            });
        },

        didUpdateRecord: function (store, type, record, json) {
            var root = this.rootForType(type);

            this.sideload(store, type, json, root);
            store.didUpdateRecord(record, json && json[root]);
        },

        updateRecords: function (store, type, records) {
            if (get(this, 'bulkCommit') === false) {
                return this._super(store, type, records);
            }

            var root = this.rootForType(type),
                plural = this.pluralize(root);

            var data = {};
            data[plural] = records.map(function (record) {
                return record.toJSON();
            });

            this.ajax(this.buildURL(root, "bulk"), "PUT", {
                data: data,
                context: this,
                success: function (json) {
                    this.didUpdateRecords(store, type, records, json);
                }
            });
        },

        didUpdateRecords: function (store, type, records, json) {
            var root = this.pluralize(this.rootForType(type));

            this.sideload(store, type, json, root);
            store.didUpdateRecords(records, json[root]);
        },

        deleteRecord: function (store, type, record) {
            var id = get(record, 'id');
            var root = this.rootForType(type);

            this.ajax(this.buildURL(root, id), "DELETE", {
                context: this,
                success: function (json) {
                    this.didDeleteRecord(store, type, record, json);
                }
            });
        },

        didDeleteRecord: function (store, type, record, json) {
            if (json) { this.sideload(store, type, json); }
            store.didDeleteRecord(record);
        },

        deleteRecords: function (store, type, records) {
            if (get(this, 'bulkCommit') === false) {
                return this._super(store, type, records);
            }

            var root = this.rootForType(type),
                plural = this.pluralize(root);

            var data = {};
            data[plural] = records.map(function (record) {
                return get(record, 'id');
            });

            this.ajax(this.buildURL(root, 'bulk'), "DELETE", {
                data: data,
                context: this,
                success: function (json) {
                    this.didDeleteRecords(store, type, records, json);
                }
            });
        },

        didDeleteRecords: function (store, type, records, json) {
            if (json) { this.sideload(store, type, json); }
            store.didDeleteRecords(records);
        },

        find: function (store, type, id) {
            var root = this.rootForType(type);

            this.ajax(this.buildURL(root, id), "GET", {
                success: function (json) {
                    this.sideload(store, type, json, root);
                    store.load(type, json[root]);
                }
            });
        },

        findMany: function (store, type, ids) {
            var root = this.rootForType(type), plural = this.pluralize(root);

            this.ajax(this.buildURL(root), "GET", {
                data: { ids: ids },
                success: function (json) {
                    this.sideload(store, type, json, plural);
                    store.loadMany(type, json[plural]);
                }
            });
        },

        findAll: function (store, type) {
            var root = this.rootForType(type), plural = this.pluralize(root);

            this.ajax(this.buildURL(root), "GET", {
                success: function (json) {
                    this.sideload(store, type, json, plural);
                    store.loadMany(type, json[plural]);
                }
            });
        },

        findQuery: function (store, type, query, recordArray) {
            var root = this.rootForType(type), plural = this.pluralize(root);

            this.ajax(this.buildURL(root), "GET", {
                data: query,
                success: function (json) {
                    this.sideload(store, type, json, plural);
                    recordArray.load(json[plural]);
                }
            });
        },

        // HELPERS

        plurals: {},

        // define a plurals hash in your subclass to define
        // special-case pluralization
        pluralize: function (name) {
            return this.plurals[name] || name + "s";
        },

        rootForType: function (type) {
            if (type.url) { return type.url; }

            // use the last part of the name as the URL
            var parts = type.toString().split(".");
            var name = parts[parts.length - 1];
            return name.replace(/([A-Z])/g, '_$1').toLowerCase().slice(1);
        },

        ajax: function (url, type, hash) {
            hash.url = url;
            hash.type = type;
            hash.dataType = 'json';
            hash.contentType = 'application/json; charset=utf-8';
            hash.context = this;

            if (hash.data && type !== 'GET') {
                hash.data = JSON.stringify(hash.data);
            }

            jQuery.ajax(hash);
        },

        sideload: function (store, type, json, root) {
            var sideloadedType, mappings, loaded = {};

            loaded[root] = true;

            for (var prop in json) {
                if (!json.hasOwnProperty(prop)) { continue; }
                if (prop === root) { continue; }

                sideloadedType = type.typeForAssociation(prop);

                if (!sideloadedType) {
                    mappings = get(this, 'mappings');
                    Ember.assert("Your server returned a hash with the key " + prop + " but you have no mappings", !!mappings);

                    sideloadedType = get(mappings, prop);

                    if (typeof sideloadedType === 'string') {
                        sideloadedType = get(window, sideloadedType);
                    }

                    Ember.assert("Your server returned a hash with the key " + prop + " but you have no mapping for it", !!sideloadedType);
                }

                this.sideloadAssociations(store, sideloadedType, json, prop, loaded);
            }
        },

        sideloadAssociations: function (store, type, json, prop, loaded) {
            loaded[prop] = true;

            get(type, 'associationsByName').forEach(function (key, meta) {
                key = meta.key || key;
                if (meta.kind === 'belongsTo') {
                    key = this.pluralize(key);
                }
                if (json[key] && !loaded[key]) {
                    this.sideloadAssociations(store, meta.type, json, key, loaded);
                }
            }, this);

            this.loadValue(store, type, json[prop]);
        },

        loadValue: function (store, type, value) {
            if (value instanceof Array) {
                store.loadMany(type, value);
            } else {
                store.load(type, value);
            }
        },

        buildURL: function (record, suffix) {
            var url = [""];

            Ember.assert("Namespace URL (" + this.namespace + ") must not start with slash", !this.namespace || this.namespace.toString().charAt(0) !== "/");
            Ember.assert("Record URL (" + record + ") must not start with slash", !record || record.toString().charAt(0) !== "/");
            Ember.assert("URL suffix (" + suffix + ") must not start with slash", !suffix || suffix.toString().charAt(0) !== "/");

            if (this.namespace !== undefined) {
                url.push(this.namespace);
            }

            url.push(this.pluralize(record));
            if (suffix !== undefined) {
                url.push(suffix);
            }

            return url.join("/");
        }
    });


})();



(function () {
    //Copyright (C) 2011 by Living Social, Inc.

    //Permission is hereby granted, free of charge, to any person obtaining a copy of
    //this software and associated documentation files (the "Software"), to deal in
    //the Software without restriction, including without limitation the rights to
    //use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
    //of the Software, and to permit persons to whom the Software is furnished to do
    //so, subject to the following conditions:

    //The above copyright notice and this permission notice shall be included in all
    //copies or substantial portions of the Software.

    //THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    //IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    //FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    //AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    //LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    //OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    //SOFTWARE.

})();

;

/* ===================================================
* bootstrap-transition.js v2.0.4
* http://twitter.github.com/bootstrap/javascript.html#transitions
* ===================================================
* Copyright 2012 Twitter, Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* ========================================================== */


!function ($) {

    $(function () {

        "use strict"; // jshint ;_;


        /* CSS TRANSITION SUPPORT (http://www.modernizr.com/)
        * ======================================================= */

        $.support.transition = (function () {

            var transitionEnd = (function () {

                var el = document.createElement('bootstrap')
          , transEndEventNames = {
              'WebkitTransition': 'webkitTransitionEnd'
            , 'MozTransition': 'transitionend'
            , 'OTransition': 'oTransitionEnd'
            , 'msTransition': 'MSTransitionEnd'
            , 'transition': 'transitionend'
          }
          , name

                for (name in transEndEventNames) {
                    if (el.style[name] !== undefined) {
                        return transEndEventNames[name]
                    }
                }

            } ())

            return transitionEnd && {
                end: transitionEnd
            }

        })()

    })

} (window.jQuery); /* ==========================================================
 * bootstrap-alert.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#alerts
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

    "use strict"; // jshint ;_;


    /* ALERT CLASS DEFINITION
    * ====================== */

    var dismiss = '[data-dismiss="alert"]'
    , Alert = function (el) {
        $(el).on('click', dismiss, this.close)
    }

    Alert.prototype.close = function (e) {
        var $this = $(this)
      , selector = $this.attr('data-target')
      , $parent

        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
        }

        $parent = $(selector)

        e && e.preventDefault()

        $parent.length || ($parent = $this.hasClass('alert') ? $this : $this.parent())

        $parent.trigger(e = $.Event('close'))

        if (e.isDefaultPrevented()) return

        $parent.removeClass('in')

        function removeElement() {
            $parent
        .trigger('closed')
        .remove()
        }

        $.support.transition && $parent.hasClass('fade') ?
      $parent.on($.support.transition.end, removeElement) :
      removeElement()
    }


    /* ALERT PLUGIN DEFINITION
    * ======================= */

    $.fn.alert = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('alert')
            if (!data) $this.data('alert', (data = new Alert(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.alert.Constructor = Alert


    /* ALERT DATA-API
    * ============== */

    $(function () {
        $('body').on('click.alert.data-api', dismiss, Alert.prototype.close)
    })

} (window.jQuery); /* ============================================================
 * bootstrap-button.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#buttons
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

    "use strict"; // jshint ;_;


    /* BUTTON PUBLIC CLASS DEFINITION
    * ============================== */

    var Button = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, $.fn.button.defaults, options)
    }

    Button.prototype.setState = function (state) {
        var d = 'disabled'
      , $el = this.$element
      , data = $el.data()
      , val = $el.is('input') ? 'val' : 'html'

        state = state + 'Text'
        data.resetText || $el.data('resetText', $el[val]())

        $el[val](data[state] || this.options[state])

        // push to event loop to allow forms to submit
        setTimeout(function () {
            state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d)
        }, 0)
    }

    Button.prototype.toggle = function () {
        var $parent = this.$element.parent('[data-toggle="buttons-radio"]')

        $parent && $parent
      .find('.active')
      .removeClass('active')

        this.$element.toggleClass('active')
    }


    /* BUTTON PLUGIN DEFINITION
    * ======================== */

    $.fn.button = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('button')
        , options = typeof option == 'object' && option
            if (!data) $this.data('button', (data = new Button(this, options)))
            if (option == 'toggle') data.toggle()
            else if (option) data.setState(option)
        })
    }

    $.fn.button.defaults = {
        loadingText: 'loading...'
    }

    $.fn.button.Constructor = Button


    /* BUTTON DATA-API
    * =============== */

    $(function () {
        $('body').on('click.button.data-api', '[data-toggle^=button]', function (e) {
            var $btn = $(e.target)
            if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
            $btn.button('toggle')
        })
    })

} (window.jQuery); /* ==========================================================
 * bootstrap-carousel.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#carousel
 * ==========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

    "use strict"; // jshint ;_;


    /* CAROUSEL CLASS DEFINITION
    * ========================= */

    var Carousel = function (element, options) {
        this.$element = $(element)
        this.options = options
        this.options.slide && this.slide(this.options.slide)
        this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
    }

    Carousel.prototype = {

        cycle: function (e) {
            if (!e) this.paused = false
            this.options.interval
        && !this.paused
        && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
            return this
        }

  , to: function (pos) {
      var $active = this.$element.find('.active')
        , children = $active.parent().children()
        , activePos = children.index($active)
        , that = this

      if (pos > (children.length - 1) || pos < 0) return

      if (this.sliding) {
          return this.$element.one('slid', function () {
              that.to(pos)
          })
      }

      if (activePos == pos) {
          return this.pause().cycle()
      }

      return this.slide(pos > activePos ? 'next' : 'prev', $(children[pos]))
  }

  , pause: function (e) {
      if (!e) this.paused = true
      clearInterval(this.interval)
      this.interval = null
      return this
  }

  , next: function () {
      if (this.sliding) return
      return this.slide('next')
  }

  , prev: function () {
      if (this.sliding) return
      return this.slide('prev')
  }

  , slide: function (type, next) {
      var $active = this.$element.find('.active')
        , $next = next || $active[type]()
        , isCycling = this.interval
        , direction = type == 'next' ? 'left' : 'right'
        , fallback = type == 'next' ? 'first' : 'last'
        , that = this
        , e = $.Event('slide')

      this.sliding = true

      isCycling && this.pause()

      $next = $next.length ? $next : this.$element.find('.item')[fallback]()

      if ($next.hasClass('active')) return

      if ($.support.transition && this.$element.hasClass('slide')) {
          this.$element.trigger(e)
          if (e.isDefaultPrevented()) return
          $next.addClass(type)
          $next[0].offsetWidth // force reflow
          $active.addClass(direction)
          $next.addClass(direction)
          this.$element.one($.support.transition.end, function () {
              $next.removeClass([type, direction].join(' ')).addClass('active')
              $active.removeClass(['active', direction].join(' '))
              that.sliding = false
              setTimeout(function () { that.$element.trigger('slid') }, 0)
          })
      } else {
          this.$element.trigger(e)
          if (e.isDefaultPrevented()) return
          $active.removeClass('active')
          $next.addClass('active')
          this.sliding = false
          this.$element.trigger('slid')
      }

      isCycling && this.cycle()

      return this
  }

    }


    /* CAROUSEL PLUGIN DEFINITION
    * ========================== */

    $.fn.carousel = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('carousel')
        , options = $.extend({}, $.fn.carousel.defaults, typeof option == 'object' && option)
            if (!data) $this.data('carousel', (data = new Carousel(this, options)))
            if (typeof option == 'number') data.to(option)
            else if (typeof option == 'string' || (option = options.slide)) data[option]()
            else if (options.interval) data.cycle()
        })
    }

    $.fn.carousel.defaults = {
        interval: 5000
  , pause: 'hover'
    }

    $.fn.carousel.Constructor = Carousel


    /* CAROUSEL DATA-API
    * ================= */

    $(function () {
        $('body').on('click.carousel.data-api', '[data-slide]', function (e) {
            var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , options = !$target.data('modal') && $.extend({}, $target.data(), $this.data())
            $target.carousel(options)
            e.preventDefault()
        })
    })

} (window.jQuery); /* =============================================================
 * bootstrap-collapse.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#collapse
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

    "use strict"; // jshint ;_;


    /* COLLAPSE PUBLIC CLASS DEFINITION
    * ================================ */

    var Collapse = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, $.fn.collapse.defaults, options)

        if (this.options.parent) {
            this.$parent = $(this.options.parent)
        }

        this.options.toggle && this.toggle()
    }

    Collapse.prototype = {

        constructor: Collapse

  , dimension: function () {
      var hasWidth = this.$element.hasClass('width')
      return hasWidth ? 'width' : 'height'
  }

  , show: function () {
      var dimension
        , scroll
        , actives
        , hasData

      if (this.transitioning) return

      dimension = this.dimension()
      scroll = $.camelCase(['scroll', dimension].join('-'))
      actives = this.$parent && this.$parent.find('> .accordion-group > .in')

      if (actives && actives.length) {
          hasData = actives.data('collapse')
          if (hasData && hasData.transitioning) return
          actives.collapse('hide')
          hasData || actives.data('collapse', null)
      }

      this.$element[dimension](0)
      this.transition('addClass', $.Event('show'), 'shown')
      this.$element[dimension](this.$element[0][scroll])
  }

  , hide: function () {
      var dimension
      if (this.transitioning) return
      dimension = this.dimension()
      this.reset(this.$element[dimension]())
      this.transition('removeClass', $.Event('hide'), 'hidden')
      this.$element[dimension](0)
  }

  , reset: function (size) {
      var dimension = this.dimension()

      this.$element
        .removeClass('collapse')
        [dimension](size || 'auto')
        [0].offsetWidth

      this.$element[size !== null ? 'addClass' : 'removeClass']('collapse')

      return this
  }

  , transition: function (method, startEvent, completeEvent) {
      var that = this
        , complete = function () {
            if (startEvent.type == 'show') that.reset()
            that.transitioning = 0
            that.$element.trigger(completeEvent)
        }

      this.$element.trigger(startEvent)

      if (startEvent.isDefaultPrevented()) return

      this.transitioning = 1

      this.$element[method]('in')

      $.support.transition && this.$element.hasClass('collapse') ?
        this.$element.one($.support.transition.end, complete) :
        complete()
  }

  , toggle: function () {
      this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

    }


    /* COLLAPSIBLE PLUGIN DEFINITION
    * ============================== */

    $.fn.collapse = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('collapse')
        , options = typeof option == 'object' && option
            if (!data) $this.data('collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.collapse.defaults = {
        toggle: true
    }

    $.fn.collapse.Constructor = Collapse


    /* COLLAPSIBLE DATA-API
    * ==================== */

    $(function () {
        $('body').on('click.collapse.data-api', '[data-toggle=collapse]', function (e) {
            var $this = $(this), href
        , target = $this.attr('data-target')
          || e.preventDefault()
          || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
        , option = $(target).data('collapse') ? 'toggle' : $this.data()
            $(target).collapse(option)
        })
    })

} (window.jQuery); /* ============================================================
 * bootstrap-dropdown.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
 * ============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

    "use strict"; // jshint ;_;


    /* DROPDOWN CLASS DEFINITION
    * ========================= */

    var toggle = '[data-toggle="dropdown"]'
    , Dropdown = function (element) {
        var $el = $(element).on('click.dropdown.data-api', this.toggle)
        $('html').on('click.dropdown.data-api', function () {
            $el.parent().removeClass('open')
        })
    }

    Dropdown.prototype = {

        constructor: Dropdown

  , toggle: function (e) {
      var $this = $(this)
        , $parent
        , selector
        , isActive

      if ($this.is('.disabled, :disabled')) return

      selector = $this.attr('data-target')

      if (!selector) {
          selector = $this.attr('href')
          selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      $parent = $(selector)
      $parent.length || ($parent = $this.parent())

      isActive = $parent.hasClass('open')

      clearMenus()

      if (!isActive) $parent.toggleClass('open')

      return false
  }

    }

    function clearMenus() {
        $(toggle).parent().removeClass('open')
    }


    /* DROPDOWN PLUGIN DEFINITION
    * ========================== */

    $.fn.dropdown = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('dropdown')
            if (!data) $this.data('dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string') data[option].call($this)
        })
    }

    $.fn.dropdown.Constructor = Dropdown


    /* APPLY TO STANDARD DROPDOWN ELEMENTS
    * =================================== */

    $(function () {
        $('html').on('click.dropdown.data-api', clearMenus)
        $('body')
      .on('click.dropdown', '.dropdown form', function (e) { e.stopPropagation() })
      .on('click.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    })

} (window.jQuery); /* =========================================================
 * bootstrap-modal.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#modals
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */


!function ($) {

    "use strict"; // jshint ;_;


    /* MODAL CLASS DEFINITION
    * ====================== */

    var Modal = function (content, options) {
        this.options = options
        this.$element = $(content)
      .delegate('[data-dismiss="modal"]', 'click.dismiss.modal', $.proxy(this.hide, this))
    }

    Modal.prototype = {

        constructor: Modal

    , toggle: function () {
        return this[!this.isShown ? 'show' : 'hide']()
    }

    , show: function () {
        var that = this
          , e = $.Event('show')

        this.$element.trigger(e)

        if (this.isShown || e.isDefaultPrevented()) return

        $('body').addClass('modal-open')

        this.isShown = true

        escape.call(this)
        backdrop.call(this, function () {
            var transition = $.support.transition && that.$element.hasClass('fade')

            if (!that.$element.parent().length) {
                that.$element.appendTo(document.body) //don't move modals dom position
            }

            that.$element
            .show()

            if (transition) {
                that.$element[0].offsetWidth // force reflow
            }

            that.$element.addClass('in')

            transition ?
            that.$element.one($.support.transition.end, function () { that.$element.trigger('shown') }) :
            that.$element.trigger('shown')

        })
    }

    , hide: function (e) {
        e && e.preventDefault()

        var that = this

        e = $.Event('hide')

        this.$element.trigger(e)

        if (!this.isShown || e.isDefaultPrevented()) return

        this.isShown = false

        $('body').removeClass('modal-open')

        escape.call(this)

        this.$element.removeClass('in')

        $.support.transition && this.$element.hasClass('fade') ?
          hideWithTransition.call(this) :
          hideModal.call(this)
    }

    }


    /* MODAL PRIVATE METHODS
    * ===================== */

    function hideWithTransition() {
        var that = this
      , timeout = setTimeout(function () {
          that.$element.off($.support.transition.end)
          hideModal.call(that)
      }, 500)

        this.$element.one($.support.transition.end, function () {
            clearTimeout(timeout)
            hideModal.call(that)
        })
    }

    function hideModal(that) {
        this.$element
      .hide()
      .trigger('hidden')

        backdrop.call(this)
    }

    function backdrop(callback) {
        var that = this
      , animate = this.$element.hasClass('fade') ? 'fade' : ''

        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate

            this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

            if (this.options.backdrop != 'static') {
                this.$backdrop.click($.proxy(this.hide, this))
            }

            if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

            this.$backdrop.addClass('in')

            doAnimate ?
        this.$backdrop.one($.support.transition.end, callback) :
        callback()

        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in')

            $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop.one($.support.transition.end, $.proxy(removeBackdrop, this)) :
        removeBackdrop.call(this)

        } else if (callback) {
            callback()
        }
    }

    function removeBackdrop() {
        this.$backdrop.remove()
        this.$backdrop = null
    }

    function escape() {
        var that = this
        if (this.isShown && this.options.keyboard) {
            $(document).on('keyup.dismiss.modal', function (e) {
                e.which == 27 && that.hide()
            })
        } else if (!this.isShown) {
            $(document).off('keyup.dismiss.modal')
        }
    }


    /* MODAL PLUGIN DEFINITION
    * ======================= */

    $.fn.modal = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('modal')
        , options = $.extend({}, $.fn.modal.defaults, $this.data(), typeof option == 'object' && option)
            if (!data) $this.data('modal', (data = new Modal(this, options)))
            if (typeof option == 'string') data[option]()
            else if (options.show) data.show()
        })
    }

    $.fn.modal.defaults = {
        backdrop: true
    , keyboard: true
    , show: true
    }

    $.fn.modal.Constructor = Modal


    /* MODAL DATA-API
    * ============== */

    $(function () {
        $('body').on('click.modal.data-api', '[data-toggle="modal"]', function (e) {
            var $this = $(this), href
        , $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
        , option = $target.data('modal') ? 'toggle' : $.extend({}, $target.data(), $this.data())

            e.preventDefault()
            $target.modal(option)
        })
    })

} (window.jQuery); /* ===========================================================
 * bootstrap-tooltip.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

    "use strict"; // jshint ;_;


    /* TOOLTIP PUBLIC CLASS DEFINITION
    * =============================== */

    var Tooltip = function (element, options) {
        this.init('tooltip', element, options)
    }

    Tooltip.prototype = {

        constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger != 'manual') {
          eventIn = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
          eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
          this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
          this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
  }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
          options.delay = {
              show: options.delay
        , hide: options.delay
          }
      }

      return options
  }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function () {
          if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
  }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function () {
          if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
  }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
          $tip = this.tip()
          this.setContent()

          if (this.options.animation) {
              $tip.addClass('fade')
          }

          placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

          inside = /in/.test(placement)

          $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

          pos = this.getPosition(inside)

          actualWidth = $tip[0].offsetWidth
          actualHeight = $tip[0].offsetHeight

          switch (inside ? placement.split(' ')[1] : placement) {
              case 'bottom':
                  tp = { top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2 }
                  break
              case 'top':
                  tp = { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 }
                  break
              case 'left':
                  tp = { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth }
                  break
              case 'right':
                  tp = { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }
                  break
          }

          $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
  }

  , isHTML: function (text) {
      // html string detection logic adapted from jQuery
      return typeof text != 'string'
        || (text.charAt(0) === "<"
          && text.charAt(text.length - 1) === ">"
          && text.length >= 3
        ) || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(text)
  }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.isHTML(title) ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
  }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
          var timeout = setTimeout(function () {
              $tip.off($.support.transition.end).remove()
          }, 500)

          $tip.one($.support.transition.end, function () {
              clearTimeout(timeout)
              $tip.remove()
          })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()
  }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
          $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
  }

  , hasContent: function () {
      return this.getTitle()
  }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? { top: 0, left: 0} : this.$element.offset()), {
          width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
  }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)

      return title
  }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
  }

  , validate: function () {
      if (!this.$element[0].parentNode) {
          this.hide()
          this.$element = null
          this.options = null
      }
  }

  , enable: function () {
      this.enabled = true
  }

  , disable: function () {
      this.enabled = false
  }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
  }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
  }

    }


    /* TOOLTIP PLUGIN DEFINITION
    * ========================= */

    $.fn.tooltip = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
            if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.tooltip.Constructor = Tooltip

    $.fn.tooltip.defaults = {
        animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
    }

} (window.jQuery);
/* ===========================================================
* bootstrap-popover.js v2.0.4
* http://twitter.github.com/bootstrap/javascript.html#popovers
* ===========================================================
* Copyright 2012 Twitter, Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
* =========================================================== */


!function ($) {

    "use strict"; // jshint ;_;


    /* POPOVER PUBLIC CLASS DEFINITION
    * =============================== */

    var Popover = function (element, options) {
        this.init('popover', element, options)
    }


    /* NOTE: POPOVER EXTENDS BOOTSTRAP-TOOLTIP.js
    ========================================== */

    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype, {

        constructor: Popover

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()
        , content = this.getContent()

      $tip.find('.popover-title')[this.isHTML(title) ? 'html' : 'text'](title)
      $tip.find('.popover-content > *')[this.isHTML(content) ? 'html' : 'text'](content)

      $tip.removeClass('fade top bottom left right in')
  }

  , hasContent: function () {
      return this.getTitle() || this.getContent()
  }

  , getContent: function () {
      var content
        , $e = this.$element
        , o = this.options

      content = $e.attr('data-content')
        || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content)

      return content
  }

  , tip: function () {
      if (!this.$tip) {
          this.$tip = $(this.options.template)
      }
      return this.$tip
  }

    })


    /* POPOVER PLUGIN DEFINITION
    * ======================= */

    $.fn.popover = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('popover')
        , options = typeof option == 'object' && option
            if (!data) $this.data('popover', (data = new Popover(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.popover.Constructor = Popover

    $.fn.popover.defaults = $.extend({}, $.fn.tooltip.defaults, {
        placement: 'right'
  , content: ''
  , template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    })

} (window.jQuery); /* =============================================================
 * bootstrap-scrollspy.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */


!function ($) {

    "use strict"; // jshint ;_;


    /* SCROLLSPY CLASS DEFINITION
    * ========================== */

    function ScrollSpy(element, options) {
        var process = $.proxy(this.process, this)
      , $element = $(element).is('body') ? $(window) : $(element)
      , href
        this.options = $.extend({}, $.fn.scrollspy.defaults, options)
        this.$scrollElement = $element.on('scroll.scroll.data-api', process)
        this.selector = (this.options.target
      || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
      || '') + ' .nav li > a'
        this.$body = $('body')
        this.refresh()
        this.process()
    }

    ScrollSpy.prototype = {

        constructor: ScrollSpy

    , refresh: function () {
        var self = this
          , $targets

        this.offsets = $([])
        this.targets = $([])

        $targets = this.$body
          .find(this.selector)
          .map(function () {
              var $el = $(this)
              , href = $el.data('target') || $el.attr('href')
              , $href = /^#\w/.test(href) && $(href)
              return ($href
              && href.length
              && [[$href.position().top, href]]) || null
          })
          .sort(function (a, b) { return a[0] - b[0] })
          .each(function () {
              self.offsets.push(this[0])
              self.targets.push(this[1])
          })
    }

    , process: function () {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
          , scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
          , maxScroll = scrollHeight - this.$scrollElement.height()
          , offsets = this.offsets
          , targets = this.targets
          , activeTarget = this.activeTarget
          , i

        if (scrollTop >= maxScroll) {
            return activeTarget != (i = targets.last()[0])
            && this.activate(i)
        }

        for (i = offsets.length; i--; ) {
            activeTarget != targets[i]
            && scrollTop >= offsets[i]
            && (!offsets[i + 1] || scrollTop <= offsets[i + 1])
            && this.activate(targets[i])
        }
    }

    , activate: function (target) {
        var active
          , selector

        this.activeTarget = target

        $(this.selector)
          .parent('.active')
          .removeClass('active')

        selector = this.selector
          + '[data-target="' + target + '"],'
          + this.selector + '[href="' + target + '"]'

        active = $(selector)
          .parent('li')
          .addClass('active')

        if (active.parent('.dropdown-menu')) {
            active = active.closest('li.dropdown').addClass('active')
        }

        active.trigger('activate')
    }

    }


    /* SCROLLSPY PLUGIN DEFINITION
    * =========================== */

    $.fn.scrollspy = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('scrollspy')
        , options = typeof option == 'object' && option
            if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.scrollspy.Constructor = ScrollSpy

    $.fn.scrollspy.defaults = {
        offset: 10
    }


    /* SCROLLSPY DATA-API
    * ================== */

    $(function () {
        $('[data-spy="scroll"]').each(function () {
            var $spy = $(this)
            $spy.scrollspy($spy.data())
        })
    })

} (window.jQuery); /* ========================================================
 * bootstrap-tab.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

    "use strict"; // jshint ;_;


    /* TAB CLASS DEFINITION
    * ==================== */

    var Tab = function (element) {
        this.element = $(element)
    }

    Tab.prototype = {

        constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
          selector = $this.attr('href')
          selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ($this.parent('li').hasClass('active')) return

      previous = $ul.find('.active a').last()[0]

      e = $.Event('show', {
          relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
          $this.trigger({
              type: 'shown'
        , relatedTarget: previous
          })
      })
  }

  , activate: function (element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
          $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

          element.addClass('active')

          if (transition) {
              element[0].offsetWidth // reflow for transition
              element.addClass('in')
          } else {
              element.removeClass('fade')
          }

          if (element.parent('.dropdown-menu')) {
              element.closest('li.dropdown').addClass('active')
          }

          callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
  }
    }


    /* TAB PLUGIN DEFINITION
    * ===================== */

    $.fn.tab = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('tab')
            if (!data) $this.data('tab', (data = new Tab(this)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.tab.Constructor = Tab


    /* TAB DATA-API
    * ============ */

    $(function () {
        $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
            e.preventDefault()
            $(this).tab('show')
        })
    })

} (window.jQuery); /* =============================================================
 * bootstrap-typeahead.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#typeahead
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================ */


!function ($) {

    "use strict"; // jshint ;_;


    /* TYPEAHEAD PUBLIC CLASS DEFINITION
    * ================================= */

    var Typeahead = function (element, options) {
        this.$element = $(element)
        this.options = $.extend({}, $.fn.typeahead.defaults, options)
        this.matcher = this.options.matcher || this.matcher
        this.sorter = this.options.sorter || this.sorter
        this.highlighter = this.options.highlighter || this.highlighter
        this.updater = this.options.updater || this.updater
        this.$menu = $(this.options.menu).appendTo('body')
        this.source = this.options.source
        this.shown = false
        this.listen()
    }

    Typeahead.prototype = {

        constructor: Typeahead

  , select: function () {
      var val = this.$menu.find('.active').attr('data-value')
      this.$element
        .val(this.updater(val))
        .change()
      return this.hide()
  }

  , updater: function (item) {
      return item
  }

  , show: function () {
      var pos = $.extend({}, this.$element.offset(), {
          height: this.$element[0].offsetHeight
      })

      this.$menu.css({
          top: pos.top + pos.height
      , left: pos.left
      })

      this.$menu.show()
      this.shown = true
      return this
  }

  , hide: function () {
      this.$menu.hide()
      this.shown = false
      return this
  }

  , lookup: function (event) {
      var that = this
        , items
        , q

      this.query = this.$element.val()

      if (!this.query) {
          return this.shown ? this.hide() : this
      }

      items = $.grep(this.source, function (item) {
          return that.matcher(item)
      })

      items = this.sorter(items)

      if (!items.length) {
          return this.shown ? this.hide() : this
      }

      return this.render(items.slice(0, this.options.items)).show()
  }

  , matcher: function (item) {
      return ~item.toLowerCase().indexOf(this.query.toLowerCase())
  }

  , sorter: function (items) {
      var beginswith = []
        , caseSensitive = []
        , caseInsensitive = []
        , item

      while (item = items.shift()) {
          if (!item.toLowerCase().indexOf(this.query.toLowerCase())) beginswith.push(item)
          else if (~item.indexOf(this.query)) caseSensitive.push(item)
          else caseInsensitive.push(item)
      }

      return beginswith.concat(caseSensitive, caseInsensitive)
  }

  , highlighter: function (item) {
      var query = this.query.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&')
      return item.replace(new RegExp('(' + query + ')', 'ig'), function ($1, match) {
          return '<strong>' + match + '</strong>'
      })
  }

  , render: function (items) {
      var that = this

      items = $(items).map(function (i, item) {
          i = $(that.options.item).attr('data-value', item)
          i.find('a').html(that.highlighter(item))
          return i[0]
      })

      items.first().addClass('active')
      this.$menu.html(items)
      return this
  }

  , next: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , next = active.next()

      if (!next.length) {
          next = $(this.$menu.find('li')[0])
      }

      next.addClass('active')
  }

  , prev: function (event) {
      var active = this.$menu.find('.active').removeClass('active')
        , prev = active.prev()

      if (!prev.length) {
          prev = this.$menu.find('li').last()
      }

      prev.addClass('active')
  }

  , listen: function () {
      this.$element
        .on('blur', $.proxy(this.blur, this))
        .on('keypress', $.proxy(this.keypress, this))
        .on('keyup', $.proxy(this.keyup, this))

      if ($.browser.webkit || $.browser.msie) {
          this.$element.on('keydown', $.proxy(this.keypress, this))
      }

      this.$menu
        .on('click', $.proxy(this.click, this))
        .on('mouseenter', 'li', $.proxy(this.mouseenter, this))
  }

  , keyup: function (e) {
      switch (e.keyCode) {
          case 40: // down arrow
          case 38: // up arrow
              break

          case 9: // tab
          case 13: // enter
              if (!this.shown) return
              this.select()
              break

          case 27: // escape
              if (!this.shown) return
              this.hide()
              break

          default:
              this.lookup()
      }

      e.stopPropagation()
      e.preventDefault()
  }

  , keypress: function (e) {
      if (!this.shown) return

      switch (e.keyCode) {
          case 9: // tab
          case 13: // enter
          case 27: // escape
              e.preventDefault()
              break

          case 38: // up arrow
              if (e.type != 'keydown') break
              e.preventDefault()
              this.prev()
              break

          case 40: // down arrow
              if (e.type != 'keydown') break
              e.preventDefault()
              this.next()
              break
      }

      e.stopPropagation()
  }

  , blur: function (e) {
      var that = this
      setTimeout(function () { that.hide() }, 150)
  }

  , click: function (e) {
      e.stopPropagation()
      e.preventDefault()
      this.select()
  }

  , mouseenter: function (e) {
      this.$menu.find('.active').removeClass('active')
      $(e.currentTarget).addClass('active')
  }

    }


    /* TYPEAHEAD PLUGIN DEFINITION
    * =========================== */

    $.fn.typeahead = function (option) {
        return this.each(function () {
            var $this = $(this)
        , data = $this.data('typeahead')
        , options = typeof option == 'object' && option
            if (!data) $this.data('typeahead', (data = new Typeahead(this, options)))
            if (typeof option == 'string') data[option]()
        })
    }

    $.fn.typeahead.defaults = {
        source: []
  , items: 8
  , menu: '<ul class="typeahead dropdown-menu"></ul>'
  , item: '<li><a href="#"></a></li>'
    }

    $.fn.typeahead.Constructor = Typeahead


    /* TYPEAHEAD DATA-API
    * ================== */

    $(function () {
        $('body').on('focus.typeahead.data-api', '[data-provide="typeahead"]', function (e) {
            var $this = $(this)
            if ($this.data('typeahead')) return
            e.preventDefault()
            $this.typeahead($this.data())
        })
    })

} (window.jQuery); ;

(function (b) { b.gritter = {}; b.gritter.options = { position: "", class_name: "", fade_in_speed: "medium", fade_out_speed: 1000, time: 6000 }; b.gritter.add = function (f) { try { return a.add(f || {}) } catch (d) { var c = "Gritter Error: " + d; (typeof (console) != "undefined" && console.error) ? console.error(c, f) : alert(c) } }; b.gritter.remove = function (d, c) { a.removeSpecific(d, c || {}) }; b.gritter.removeAll = function (c) { a.stop(c || {}) }; var a = { position: "", fade_in_speed: "", fade_out_speed: "", time: "", _custom_timer: 0, _item_count: 0, _is_setup: 0, _tpl_close: '<div class="gritter-close"></div>', _tpl_title: '<span class="gritter-title">[[title]]</span>', _tpl_item: '<div id="gritter-item-[[number]]" class="gritter-item-wrapper [[item_class]]" style="display:none"><div class="gritter-top"></div><div class="gritter-item">[[close]][[image]]<div class="[[class_name]]">[[title]]<p>[[text]]</p></div><div style="clear:both"></div></div><div class="gritter-bottom"></div></div>', _tpl_wrap: '<div id="gritter-notice-wrapper"></div>', add: function (g) { if (typeof (g) == "string") { g = { text: g} } if (!g.text) { throw 'You must supply "text" parameter.' } if (!this._is_setup) { this._runSetup() } var k = g.title, n = g.text, e = g.image || "", l = g.sticky || false, m = g.class_name || b.gritter.options.class_name, j = b.gritter.options.position, d = g.time || ""; this._verifyWrapper(); this._item_count++; var f = this._item_count, i = this._tpl_item; b(["before_open", "after_open", "before_close", "after_close"]).each(function (p, q) { a["_" + q + "_" + f] = (b.isFunction(g[q])) ? g[q] : function () { } }); this._custom_timer = 0; if (d) { this._custom_timer = d } var c = (e != "") ? '<img src="' + e + '" class="gritter-image" />' : "", h = (e != "") ? "gritter-with-image" : "gritter-without-image"; if (k) { k = this._str_replace("[[title]]", k, this._tpl_title) } else { k = "" } i = this._str_replace(["[[title]]", "[[text]]", "[[close]]", "[[image]]", "[[number]]", "[[class_name]]", "[[item_class]]"], [k, n, this._tpl_close, c, this._item_count, h, m], i); if (this["_before_open_" + f]() === false) { return false } b("#gritter-notice-wrapper").addClass(j).append(i); var o = b("#gritter-item-" + this._item_count); o.fadeIn(this.fade_in_speed, function () { a["_after_open_" + f](b(this)) }); if (!l) { this._setFadeTimer(o, f) } b(o).bind("mouseenter mouseleave", function (p) { if (p.type == "mouseenter") { if (!l) { a._restoreItemIfFading(b(this), f) } } else { if (!l) { a._setFadeTimer(b(this), f) } } a._hoverState(b(this), p.type) }); b(o).find(".gritter-close").click(function () { a.removeSpecific(f, {}, null, true) }); return f }, _countRemoveWrapper: function (c, d, f) { d.remove(); this["_after_close_" + c](d, f); if (b(".gritter-item-wrapper").length == 0) { b("#gritter-notice-wrapper").remove() } }, _fade: function (g, d, j, f) { var j = j || {}, i = (typeof (j.fade) != "undefined") ? j.fade : true, c = j.speed || this.fade_out_speed, h = f; this["_before_close_" + d](g, h); if (f) { g.unbind("mouseenter mouseleave") } if (i) { g.animate({ opacity: 0 }, c, function () { g.animate({ height: 0 }, 300, function () { a._countRemoveWrapper(d, g, h) }) }) } else { this._countRemoveWrapper(d, g) } }, _hoverState: function (d, c) { if (c == "mouseenter") { d.addClass("hover"); d.find(".gritter-close").show() } else { d.removeClass("hover"); d.find(".gritter-close").hide() } }, removeSpecific: function (c, g, f, d) { if (!f) { var f = b("#gritter-item-" + c) } this._fade(f, c, g || {}, d) }, _restoreItemIfFading: function (d, c) { clearTimeout(this["_int_id_" + c]); d.stop().css({ opacity: "", height: "" }) }, _runSetup: function () { for (opt in b.gritter.options) { this[opt] = b.gritter.options[opt] } this._is_setup = 1 }, _setFadeTimer: function (f, d) { var c = (this._custom_timer) ? this._custom_timer : this.time; this["_int_id_" + d] = setTimeout(function () { a._fade(f, d) }, c) }, stop: function (e) { var c = (b.isFunction(e.before_close)) ? e.before_close : function () { }; var f = (b.isFunction(e.after_close)) ? e.after_close : function () { }; var d = b("#gritter-notice-wrapper"); c(d); d.fadeOut(function () { b(this).remove(); f() }) }, _str_replace: function (v, e, o, n) { var k = 0, h = 0, t = "", m = "", g = 0, q = 0, l = [].concat(v), c = [].concat(e), u = o, d = c instanceof Array, p = u instanceof Array; u = [].concat(u); if (n) { this.window[n] = 0 } for (k = 0, g = u.length; k < g; k++) { if (u[k] === "") { continue } for (h = 0, q = l.length; h < q; h++) { t = u[k] + ""; m = d ? (c[h] !== undefined ? c[h] : "") : c[0]; u[k] = (t).split(l[h]).join(m); if (n && u[k] !== t) { this.window[n] += (t.length - u[k].length) / l[h].length } } } return p ? u : u[0] }, _verifyWrapper: function () { if (b("#gritter-notice-wrapper").length == 0) { b("body").append(this._tpl_wrap) } } } })(jQuery); ;

// Chris Coyier's MD5 Library
// http://css-tricks.com/snippets/javascript/javascript-md5/
var MD5 = function (string) {

    function RotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }

    function AddUnsigned(lX, lY) {
        var lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) {
            return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        }
        if (lX4 | lY4) {
            if (lResult & 0x40000000) {
                return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            } else {
                return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
            }
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }

    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return (x ^ y ^ z); }
    function I(x, y, z) { return (y ^ (x | (~z))); }

    function FF(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function GG(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function HH(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function II(a, b, c, d, x, s, ac) {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
        return AddUnsigned(RotateLeft(a, s), b);
    };

    function ConvertToWordArray(string) {
        var lWordCount;
        var lMessageLength = string.length;
        var lNumberOfWords_temp1 = lMessageLength + 8;
        var lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        var lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        var lWordArray = Array(lNumberOfWords - 1);
        var lBytePosition = 0;
        var lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    };

    function WordToHex(lValue) {
        var WordToHexValue = "", WordToHexValue_temp = "", lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = "0" + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    };

    function Utf8Encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    };

    var x = Array();
    var k, AA, BB, CC, DD, a, b, c, d;
    var S11 = 7, S12 = 12, S13 = 17, S14 = 22;
    var S21 = 5, S22 = 9, S23 = 14, S24 = 20;
    var S31 = 4, S32 = 11, S33 = 16, S34 = 23;
    var S41 = 6, S42 = 10, S43 = 15, S44 = 21;

    string = Utf8Encode(string);

    x = ConvertToWordArray(string);

    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;

    for (k = 0; k < x.length; k += 16) {
        AA = a; BB = b; CC = c; DD = d;
        a = FF(a, b, c, d, x[k + 0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k + 1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k + 2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k + 3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k + 4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k + 5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k + 6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k + 7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k + 8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k + 9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k + 10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k + 11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k + 12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k + 13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k + 14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k + 15], S14, 0x49B40821);
        a = GG(a, b, c, d, x[k + 1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k + 6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k + 11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k + 0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k + 5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k + 10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k + 15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k + 4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k + 9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k + 14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k + 3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k + 8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k + 13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k + 2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k + 7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k + 12], S24, 0x8D2A4C8A);
        a = HH(a, b, c, d, x[k + 5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k + 8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k + 11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k + 14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k + 1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k + 4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k + 7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k + 10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k + 13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k + 0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k + 3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k + 6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k + 9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k + 12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k + 15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k + 2], S34, 0xC4AC5665);
        a = II(a, b, c, d, x[k + 0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k + 7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k + 14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k + 5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k + 12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k + 3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k + 10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k + 1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k + 8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k + 15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k + 6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k + 13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k + 4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k + 11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k + 2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k + 9], S44, 0xEB86D391);
        a = AddUnsigned(a, AA);
        b = AddUnsigned(b, BB);
        c = AddUnsigned(c, CC);
        d = AddUnsigned(d, DD);
    }

    var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);

    return temp.toLowerCase();
}; ;

$(document).ready(function () {

    $(window).resize(function () {
        if ($(this).width() < 1024) {
            iconmenu();
            if ($(window).width() < 570) {
                $('.table').each(function () {
                    if ($(this).find('.table-wrapper').size() == 0) {
                        $(this).wrap('<div class="table-wrapper"></div>');
                    }
                });
            }
        } else {
            fullmenu();
        }
    });

    if ($(window).width() < 1024) {
        iconmenu();
        if ($(window).width() < 570) {
            $('.table').each(function () {
                if ($(this).find('.table-wrapper').size() == 0) {
                    $(this).wrap('<div class="table-wrapper"></div>');
                }
            });
        }
    } else {
        fullmenu();
    }

    // Sticky naviagiot
    $(window).scroll(function () {
        var el = $('.leftmenu > ul');
        if ($(window).width() > 479) {
            if ($(this).scrollTop() > 80) {
                el.css({ 'position': 'fixed', 'top': '10px', 'width': '22.35%' });
            } else {
                el.css({ 'position': 'relative', 'top': '0', 'width': 'auto' });
            }
        } else {
            if ($(this).scrollTop() > 130) {
                el.css({ 'position': 'fixed', 'top': '10px', 'width': '22.35%' });
            } else {
                el.css({ 'position': 'relative', 'top': '0', 'width': 'auto' });
            }
        }
    });

    // Navigation submenus
    $('.leftmenu a').click(function (e) {
        if ($(this).siblings('ul').size() == 1) {
            e.preventDefault();
            var submenu = $(this).siblings('ul');
            if ($(this).hasClass('open')) {
                if ($(this).parents('.leftmenu').hasClass('lefticon')) {
                    submenu.fadeOut();
                } else {
                    submenu.slideUp('fast');
                }
                $(this).removeClass('open');
            } else {
                if ($(this).parents('.leftmenu').hasClass('lefticon')) {
                    submenu.fadeIn();
                } else {
                    submenu.slideDown('fast');
                }
                $(this).addClass('open');
            }
        }
    });

    // Bind the tooltips to menu
    $('.leftmenu').tooltip({
        selector: "a[rel=tooltip]",
        placement: 'right'
    });

    $('body').tooltip({
        selector: '.tooltip'
    });
    $('.tooltip-left').tooltip({
        placement: 'left'
    });
    $('.tooltip-right').tooltip({
        placement: 'right'
    });
    $('.tooltip-top').tooltip({
        placement: 'top'
    });
    $('.tooltip-bottom').tooltip({
        placement: 'bottom'
    });

    //Prettyprint
    window.prettyPrint && prettyPrint()

    // Iphone style radio rand checkboxes
    $(".cb-enable").click(function () {
        var parent = $(this).parents('.switch');
        $('.cb-disable', parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox', parent).attr('checked', true);
    });
    $(".cb-disable").click(function () {
        var parent = $(this).parents('.switch');
        $('.cb-enable', parent).removeClass('selected');
        $(this).addClass('selected');
        $('.checkbox', parent).attr('checked', false);
    });

    var placeholder = $('#search input').attr('placeholder');
    $('#search input').focus(function () {
        if ($(this).val() == placeholder) {
            $(this).val('');
        }
    }).blur(function () {
        if ($(this).val() == '') {
            $(this).val(placeholder);
        }
    });

    // Functions...
    function iconmenu() {
        $('.leftmenu').removeClass('span3').addClass('lefticon').addClass('span1');
        $('.leftmenu > ul > li > a').each(function () {
            atitle = $(this).text();
            $(this).attr({ 'rel': 'tooltip', 'title': atitle });
        });
        $('#content').removeClass('span9').addClass('span11');
    }

    function fullmenu() {
        $('.leftmenu').removeClass('span1').removeClass('lefticon').addClass('span3');
        $('.leftmenu > ul > li > a').each(function () {
            $(this).attr({ 'rel': '', 'title': '' });
        });
        $('#content').removeClass('span11').addClass('span9');
    }
}); ;

