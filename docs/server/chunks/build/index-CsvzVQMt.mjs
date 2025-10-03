import { defineComponent, mergeProps, ref, withCtx, unref, createVNode, isRef, toDisplayString, createTextVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, createElementBlock, createElementVNode, getCurrentInstance, computed, inject, reactive, watch, provide, h, withDirectives, vShow, watchEffect, useSlots, Transition, withModifiers, normalizeClass, renderSlot, normalizeStyle, nextTick, toRef, isVNode, warn, readonly, toHandlers, Teleport as Teleport$1, cloneVNode, Comment, Text, shallowRef, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { _ as _export_sfc$1, s as shared_cjs_prodExports, c as useNamespace, f as isUndefined$1, j as isBoolean, p as useTimeoutFn, y as isPropAbsent, t as tryOnScopeDispose, h as isNil, l as useZIndex, m as useId, o as defaultNamespace, k as clamp, a as tryOnMounted, r as resolveUnref, x as isElement, d as isNumber, e as isStringNumber, i as isString, n as noop, q as useGetDerivedNamespace, v as useIdInjection, w as computedEager, g as isClient, b as identity$1 } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-BPb7MvE2.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';

function unrefElement(elRef) {
  var _a;
  const plain = resolveUnref(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
function useEventListener(...args) {
  let target;
  let events2;
  let listeners;
  let options;
  if (isString(args[0]) || Array.isArray(args[0])) {
    [events2, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events2, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events2))
    events2 = [events2];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn2) => fn2());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(() => [unrefElement(target), resolveUnref(options)], ([el, options2]) => {
    cleanup();
    if (!el)
      return;
    cleanups.push(...events2.flatMap((event) => {
      return listeners.map((listener) => register(el, event, listener, options2));
    }));
  }, { immediate: true, flush: "post" });
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
  if (!window2)
    return;
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return ignore.some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  const listener = (event) => {
    const el = unrefElement(target);
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if (event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  const cleanup = [
    useEventListener(window2, "click", listener, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      if (el)
        shouldListen = !e.composedPath().includes(el) && !shouldIgnore(e);
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      var _a;
      const el = unrefElement(target);
      if (((_a = window2.document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement)))
        handler(event);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn2) => fn2());
  return stop;
}
function useSupported(callback, sync = false) {
  const isSupported = ref();
  const update = () => isSupported.value = Boolean(callback());
  update();
  tryOnMounted(update, sync);
  return isSupported;
}
const _global = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
const globalKey = "__vueuse_ssr_handlers__";
_global[globalKey] = _global[globalKey] || {};
var __getOwnPropSymbols$g = Object.getOwnPropertySymbols;
var __hasOwnProp$g = Object.prototype.hasOwnProperty;
var __propIsEnum$g = Object.prototype.propertyIsEnumerable;
var __objRest$2 = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp$g.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols$g)
    for (var prop of __getOwnPropSymbols$g(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum$g.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
function useResizeObserver(target, callback, options = {}) {
  const _a = options, { window: window2 = defaultWindow } = _a, observerOptions = __objRest$2(_a, ["window"]);
  let observer;
  const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const stopWatch = watch(() => unrefElement(target), (el) => {
    cleanup();
    if (isSupported.value && window2 && el) {
      observer = new ResizeObserver(callback);
      observer.observe(el, observerOptions);
    }
  }, { immediate: true, flush: "post" });
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
var SwipeDirection;
(function(SwipeDirection2) {
  SwipeDirection2["UP"] = "UP";
  SwipeDirection2["RIGHT"] = "RIGHT";
  SwipeDirection2["DOWN"] = "DOWN";
  SwipeDirection2["LEFT"] = "LEFT";
  SwipeDirection2["NONE"] = "NONE";
})(SwipeDirection || (SwipeDirection = {}));
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
__spreadValues({
  linear: identity$1
}, _TransitionPresets);
function useWindowSize(options = {}) {
  const {
    window: window2 = defaultWindow,
    initialWidth = Infinity,
    initialHeight = Infinity,
    listenOrientation = true,
    includeScrollbar = true
  } = options;
  const width = ref(initialWidth);
  const height = ref(initialHeight);
  const update = () => {
    if (window2) {
      if (includeScrollbar) {
        width.value = window2.innerWidth;
        height.value = window2.innerHeight;
      } else {
        width.value = window2.document.documentElement.clientWidth;
        height.value = window2.document.documentElement.clientHeight;
      }
    }
  };
  update();
  tryOnMounted(update);
  useEventListener("resize", update, { passive: true });
  if (listenOrientation)
    useEventListener("orientationchange", update, { passive: true });
  return { width, height };
}
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal || freeSelf || Function("return this")();
var Symbol$1 = root.Symbol;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
var nativeObjectToString$1 = objectProto$6.toString;
var symToStringTag$1 = Symbol$1 ? Symbol$1.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$5.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$5 = Object.prototype;
var nativeObjectToString = objectProto$5.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$1 ? Symbol$1.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
}
function arrayMap(array, iteratee) {
  var index2 = -1, length = array == null ? 0 : array.length, result = Array(length);
  while (++index2 < length) {
    result[index2] = iteratee(array[index2], index2, array);
  }
  return result;
}
var isArray = Array.isArray;
var symbolProto = Symbol$1 ? Symbol$1.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
function baseToString(value) {
  if (typeof value == "string") {
    return value;
  }
  if (isArray(value)) {
    return arrayMap(value, baseToString) + "";
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : "";
  }
  var result = value + "";
  return result == "0" && 1 / value == -Infinity ? "-0" : result;
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
function identity(value) {
  return value;
}
var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root["__core-js_shared__"];
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
})();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$4 = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$4 = objectProto$4.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$4).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0:
      return func.call(thisArg);
    case 1:
      return func.call(thisArg, args[0]);
    case 2:
      return func.call(thisArg, args[0], args[1]);
    case 3:
      return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}
var HOT_COUNT = 800, HOT_SPAN = 16;
var nativeNow = Date.now;
function shortOut(func) {
  var count = 0, lastCalled = 0;
  return function() {
    var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(void 0, arguments);
  };
}
function constant(value) {
  return function() {
    return value;
  };
}
var defineProperty = (function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
})();
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, "toString", {
    "configurable": true,
    "enumerable": false,
    "value": constant(string),
    "writable": true
  });
};
var setToString = shortOut(baseSetToString);
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty) {
    defineProperty(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$3 = Object.prototype;
var hasOwnProperty$3 = objectProto$3.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$3.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
var nativeMax = Math.max;
function overRest(func, start, transform) {
  start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
  return function() {
    var args = arguments, index2 = -1, length = nativeMax(args.length - start, 0), array = Array(length);
    while (++index2 < length) {
      array[index2] = args[start + index2];
    }
    index2 = -1;
    var otherArgs = Array(start + 1);
    while (++index2 < start) {
      otherArgs[index2] = args[index2];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var argsTag = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}
var objectProto$2 = Object.prototype;
var hasOwnProperty$2 = objectProto$2.hasOwnProperty;
var propertyIsEnumerable = objectProto$2.propertyIsEnumerable;
var isArguments = baseIsArguments(/* @__PURE__ */ (function() {
  return arguments;
})()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
}
var nativeCreate = getNative(Object, "create");
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$1 = Object.prototype;
var hasOwnProperty$1 = objectProto$1.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$1.call(data, key) ? data[key] : void 0;
}
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index2 == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index2, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  return index2 < 0 ? void 0 : data[index2][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index2][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map$1 = getNative(root, "Map");
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
var FUNC_ERROR_TEXT = "Expected a function";
function memoize(func, resolver) {
  if (typeof func != "function" || resolver != null && typeof resolver != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result) || cache;
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache)();
  return memoized;
}
memoize.Cache = MapCache;
var MAX_MEMOIZE_SIZE = 500;
function memoizeCapped(func) {
  var result = memoize(func, function(key) {
    if (cache.size === MAX_MEMOIZE_SIZE) {
      cache.clear();
    }
    return key;
  });
  var cache = result.cache;
  return result;
}
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;
var stringToPath = memoizeCapped(function(string) {
  var result = [];
  if (string.charCodeAt(0) === 46) {
    result.push("");
  }
  string.replace(rePropName, function(match, number, quote, subString) {
    result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
  });
  return result;
});
function toString(value) {
  return value == null ? "" : baseToString(value);
}
function castPath(value, object) {
  if (isArray(value)) {
    return value;
  }
  return isKey(value, object) ? [value] : stringToPath(toString(value));
}
function toKey(value) {
  if (typeof value == "string" || isSymbol(value)) {
    return value;
  }
  var result = value + "";
  return result == "0" && 1 / value == -Infinity ? "-0" : result;
}
function baseGet(object, path) {
  path = castPath(path, object);
  var index2 = 0, length = path.length;
  while (object != null && index2 < length) {
    object = object[toKey(path[index2++])];
  }
  return index2 && index2 == length ? object : void 0;
}
function get(object, path, defaultValue) {
  var result = object == null ? void 0 : baseGet(object, path);
  return result === void 0 ? defaultValue : result;
}
function arrayPush(array, values) {
  var index2 = -1, length = values.length, offset = array.length;
  while (++index2 < length) {
    array[offset + index2] = values[index2];
  }
  return array;
}
var spreadableSymbol = Symbol$1 ? Symbol$1.isConcatSpreadable : void 0;
function isFlattenable(value) {
  return isArray(value) || isArguments(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
}
function baseFlatten(array, depth, predicate, isStrict, result) {
  var index2 = -1, length = array.length;
  predicate || (predicate = isFlattenable);
  result || (result = []);
  while (++index2 < length) {
    var value = array[index2];
    if (predicate(value)) {
      {
        arrayPush(result, value);
      }
    } else {
      result[result.length] = value;
    }
  }
  return result;
}
function flatten(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseFlatten(array) : [];
}
function flatRest(func) {
  return setToString(overRest(func, void 0, flatten), func + "");
}
function baseHasIn(object, key) {
  return object != null && key in Object(object);
}
function hasPath(object, path, hasFunc) {
  path = castPath(path, object);
  var index2 = -1, length = path.length, result = false;
  while (++index2 < length) {
    var key = toKey(path[index2]);
    if (!(result = object != null && hasFunc(object, key))) {
      break;
    }
    object = object[key];
  }
  if (result || ++index2 != length) {
    return result;
  }
  length = object == null ? 0 : object.length;
  return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
}
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}
function fromPairs(pairs) {
  var index2 = -1, length = pairs == null ? 0 : pairs.length, result = {};
  while (++index2 < length) {
    var pair = pairs[index2];
    result[pair[0]] = pair[1];
  }
  return result;
}
function isUndefined(value) {
  return value === void 0;
}
function baseSet(object, path, value, customizer) {
  if (!isObject(object)) {
    return object;
  }
  path = castPath(path, object);
  var index2 = -1, length = path.length, lastIndex = length - 1, nested = object;
  while (nested != null && ++index2 < length) {
    var key = toKey(path[index2]), newValue = value;
    if (key === "__proto__" || key === "constructor" || key === "prototype") {
      return object;
    }
    if (index2 != lastIndex) {
      var objValue = nested[key];
      newValue = void 0;
      if (newValue === void 0) {
        newValue = isObject(objValue) ? objValue : isIndex(path[index2 + 1]) ? [] : {};
      }
    }
    assignValue(nested, key, newValue);
    nested = nested[key];
  }
  return object;
}
function basePickBy(object, paths, predicate) {
  var index2 = -1, length = paths.length, result = {};
  while (++index2 < length) {
    var path = paths[index2], value = baseGet(object, path);
    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}
function basePick(object, paths) {
  return basePickBy(object, paths, function(value, path) {
    return hasIn(object, path);
  });
}
var pick = flatRest(function(object, paths) {
  return object == null ? {} : basePick(object, paths);
});
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const epPropKey = "__epPropKey";
const definePropType = (val) => val;
const isEpProp = (val) => shared_cjs_prodExports.isObject(val) && !!val[epPropKey];
const buildProp = (prop, key) => {
  if (!shared_cjs_prodExports.isObject(prop) || isEpProp(prop))
    return prop;
  const { values, required, default: defaultValue, type, validator } = prop;
  const _validator = values || validator ? (val) => {
    let valid = false;
    let allowedValues = [];
    if (values) {
      allowedValues = Array.from(values);
      if (shared_cjs_prodExports.hasOwn(prop, "default")) {
        allowedValues.push(defaultValue);
      }
      valid || (valid = allowedValues.includes(val));
    }
    if (validator)
      valid || (valid = validator(val));
    if (!valid && allowedValues.length > 0) {
      const allowValuesText = [...new Set(allowedValues)].map((value) => JSON.stringify(value)).join(", ");
      warn(`Invalid prop: validation failed${key ? ` for prop "${key}"` : ""}. Expected one of [${allowValuesText}], got value ${JSON.stringify(val)}.`);
    }
    return valid;
  } : void 0;
  const epProp = {
    type,
    required: !!required,
    validator: _validator,
    [epPropKey]: true
  };
  if (shared_cjs_prodExports.hasOwn(prop, "default"))
    epProp.default = defaultValue;
  return epProp;
};
const buildProps = (props) => fromPairs(Object.entries(props).map(([key, option]) => [
  key,
  buildProp(option, key)
]));
const __default__$i = defineComponent({
  name: "ElContainer"
});
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  ...__default__$i,
  props: buildProps({
    direction: {
      type: String,
      values: ["horizontal", "vertical"]
    }
  }),
  setup(__props) {
    const props = __props;
    const slots = useSlots();
    const ns = useNamespace("container");
    const isVertical = computed(() => {
      if (props.direction === "vertical") {
        return true;
      } else if (props.direction === "horizontal") {
        return false;
      }
      if (slots && slots.default) {
        const vNodes = slots.default();
        return vNodes.some((vNode) => {
          const tag = vNode.type.name;
          return tag === "ElHeader" || tag === "ElFooter";
        });
      } else {
        return false;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", {
        class: normalizeClass([unref(ns).b(), unref(ns).is("vertical", unref(isVertical))])
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var Container = /* @__PURE__ */ _export_sfc(_sfc_main$q, [["__file", "container.vue"]]);
const __default__$h = defineComponent({
  name: "ElAside"
});
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  ...__default__$h,
  props: {
    width: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("aside");
    const style = computed(() => props.width ? ns.cssVarBlock({ width: props.width }) : {});
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("aside", {
        class: normalizeClass(unref(ns).b()),
        style: normalizeStyle(unref(style))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});
var Aside = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["__file", "aside.vue"]]);
const __default__$g = defineComponent({
  name: "ElFooter"
});
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  ...__default__$g,
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("footer");
    const style = computed(() => props.height ? ns.cssVarBlock({ height: props.height }) : {});
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("footer", {
        class: normalizeClass(unref(ns).b()),
        style: normalizeStyle(unref(style))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});
var Footer$1 = /* @__PURE__ */ _export_sfc(_sfc_main$o, [["__file", "footer.vue"]]);
const __default__$f = defineComponent({
  name: "ElHeader"
});
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  ...__default__$f,
  props: {
    height: {
      type: String,
      default: null
    }
  },
  setup(__props) {
    const props = __props;
    const ns = useNamespace("header");
    const style = computed(() => {
      return props.height ? ns.cssVarBlock({
        height: props.height
      }) : {};
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("header", {
        class: normalizeClass(unref(ns).b()),
        style: normalizeStyle(unref(style))
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 6);
    };
  }
});
var Header = /* @__PURE__ */ _export_sfc(_sfc_main$n, [["__file", "header.vue"]]);
const __default__$e = defineComponent({
  name: "ElMain"
});
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  ...__default__$e,
  setup(__props) {
    const ns = useNamespace("main");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("main", {
        class: normalizeClass(unref(ns).b())
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var Main = /* @__PURE__ */ _export_sfc(_sfc_main$m, [["__file", "main.vue"]]);
const withInstall = (main, extra) => {
  main.install = (app) => {
    for (const comp of [main, ...Object.values(extra != null ? extra : {})]) {
      app.component(comp.name, comp);
    }
  };
  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      main[key] = comp;
    }
  }
  return main;
};
const withNoopInstall = (component) => {
  component.install = shared_cjs_prodExports.NOOP;
  return component;
};
const ElContainer = withInstall(Container, {
  Aside,
  Footer: Footer$1,
  Header,
  Main
});
withNoopInstall(Aside);
withNoopInstall(Footer$1);
const ElHeader = withNoopInstall(Header);
const ElMain = withNoopInstall(Main);
const iconProps = buildProps({
  size: {
    type: definePropType([Number, String])
  },
  color: {
    type: String
  }
});
const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());
const hasClass = (el, cls) => {
  if (!el || !cls)
    return false;
  if (cls.includes(" "))
    throw new Error("className should not contain space.");
  return el.classList.contains(cls);
};
const addClass = (el, cls) => {
  if (!el || !cls.trim())
    return;
  el.classList.add(...classNameToArray(cls));
};
const removeClass = (el, cls) => {
  if (!el || !cls.trim())
    return;
  el.classList.remove(...classNameToArray(cls));
};
function addUnit(value, defaultUnit = "px") {
  if (!value)
    return "";
  if (isNumber(value) || isStringNumber(value)) {
    return `${value}${defaultUnit}`;
  } else if (shared_cjs_prodExports.isString(value)) {
    return value;
  }
}
const __default__$d = defineComponent({
  name: "ElIcon",
  inheritAttrs: false
});
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  ...__default__$d,
  props: iconProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("icon");
    const style = computed(() => {
      const { size, color } = props;
      if (!size && !color)
        return {};
      return {
        fontSize: isUndefined$1(size) ? void 0 : addUnit(size),
        "--color": color
      };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("i", mergeProps({
        class: unref(ns).b(),
        style: unref(style)
      }, _ctx.$attrs), [
        renderSlot(_ctx.$slots, "default")
      ], 16);
    };
  }
});
var Icon = /* @__PURE__ */ _export_sfc(_sfc_main$l, [["__file", "icon.vue"]]);
const ElIcon = withInstall(Icon);
/*! Element Plus Icons Vue v2.3.2 */
var _sfc_main6 = /* @__PURE__ */ defineComponent({
  name: "ArrowDown",
  __name: "arrow-down",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M831.872 340.864 512 652.672 192.128 340.864a30.59 30.59 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.59 30.59 0 0 0-42.752 0z"
      })
    ]));
  }
}), arrow_down_default = _sfc_main6;
var _sfc_main10 = /* @__PURE__ */ defineComponent({
  name: "ArrowRight",
  __name: "arrow-right",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M340.864 149.312a30.59 30.59 0 0 0 0 42.752L652.736 512 340.864 831.872a30.59 30.59 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
      })
    ]));
  }
}), arrow_right_default = _sfc_main10;
var _sfc_main37 = /* @__PURE__ */ defineComponent({
  name: "ChatDotRound",
  __name: "chat-dot-round",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m174.72 855.68 135.296-45.12 23.68 11.84C388.096 849.536 448.576 864 512 864c211.84 0 384-166.784 384-352S723.84 160 512 160 128 326.784 128 512c0 69.12 24.96 139.264 70.848 199.232l22.08 28.8-46.272 115.584zm-45.248 82.56A32 32 0 0 1 89.6 896l58.368-145.92C94.72 680.32 64 596.864 64 512 64 299.904 256 96 512 96s448 203.904 448 416-192 416-448 416a461.06 461.06 0 0 1-206.912-48.384l-175.616 58.56z"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 563.2a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4m192 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4m-384 0a51.2 51.2 0 1 1 0-102.4 51.2 51.2 0 0 1 0 102.4"
      })
    ]));
  }
}), chat_dot_round_default = _sfc_main37;
var _sfc_main43 = /* @__PURE__ */ defineComponent({
  name: "Check",
  __name: "check",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M406.656 706.944 195.84 496.256a32 32 0 1 0-45.248 45.248l256 256 512-512a32 32 0 0 0-45.248-45.248L406.592 706.944z"
      })
    ]));
  }
}), check_default = _sfc_main43;
var _sfc_main54 = /* @__PURE__ */ defineComponent({
  name: "Clock",
  __name: "clock",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M512 896a384 384 0 1 0 0-768 384 384 0 0 0 0 768m0 64a448 448 0 1 1 0-896 448 448 0 0 1 0 896"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M480 256a32 32 0 0 1 32 32v256a32 32 0 0 1-64 0V288a32 32 0 0 1 32-32"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M480 512h256q32 0 32 32t-32 32H480q-32 0-32-32t32-32"
      })
    ]));
  }
}), clock_default = _sfc_main54;
var _sfc_main56 = /* @__PURE__ */ defineComponent({
  name: "Close",
  __name: "close",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
      })
    ]));
  }
}), close_default = _sfc_main56;
var _sfc_main86 = /* @__PURE__ */ defineComponent({
  name: "DocumentChecked",
  __name: "document-checked",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M805.504 320 640 154.496V320zM832 384H576V128H192v768h640zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32m318.4 582.144 180.992-180.992L704.64 510.4 478.4 736.64 320 578.304l45.248-45.312z"
      })
    ]));
  }
}), document_checked_default = _sfc_main86;
var _sfc_main90 = /* @__PURE__ */ defineComponent({
  name: "Document",
  __name: "document",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M832 384H576V128H192v768h640zm-26.496-64L640 154.496V320zM160 64h480l256 256v608a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32m160 448h384v64H320zm0-192h160v64H320zm0 384h384v64H320z"
      })
    ]));
  }
}), document_default = _sfc_main90;
var _sfc_main165 = /* @__PURE__ */ defineComponent({
  name: "Message",
  __name: "message",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M128 224v512a64 64 0 0 0 64 64h640a64 64 0 0 0 64-64V224zm0-64h768a64 64 0 0 1 64 64v512a128 128 0 0 1-128 128H192A128 128 0 0 1 64 736V224a64 64 0 0 1 64-64"
      }),
      createElementVNode("path", {
        fill: "currentColor",
        d: "M904 224 656.512 506.88a192 192 0 0 1-289.024 0L120 224zm-698.944 0 210.56 240.704a128 128 0 0 0 192.704 0L818.944 224z"
      })
    ]));
  }
}), message_default = _sfc_main165;
var _sfc_main175 = /* @__PURE__ */ defineComponent({
  name: "More",
  __name: "more",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "M176 416a112 112 0 1 0 0 224 112 112 0 0 0 0-224m0 64a48 48 0 1 1 0 96 48 48 0 0 1 0-96m336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224m0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96m336-64a112 112 0 1 1 0 224 112 112 0 0 1 0-224m0 64a48 48 0 1 0 0 96 48 48 0 0 0 0-96"
      })
    ]));
  }
}), more_default = _sfc_main175;
var _sfc_main225 = /* @__PURE__ */ defineComponent({
  name: "Search",
  __name: "search",
  setup(__props) {
    return (_ctx, _cache) => (openBlock(), createElementBlock("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 1024 1024"
    }, [
      createElementVNode("path", {
        fill: "currentColor",
        d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704"
      })
    ]));
  }
}), search_default = _sfc_main225;
const useSameTarget = (handleClick) => {
  if (!handleClick) {
    return { onClick: shared_cjs_prodExports.NOOP, onMousedown: shared_cjs_prodExports.NOOP, onMouseup: shared_cjs_prodExports.NOOP };
  }
  let mousedownTarget = false;
  let mouseupTarget = false;
  const onClick = (e) => {
    if (mousedownTarget && mouseupTarget) {
      handleClick(e);
    }
    mousedownTarget = mouseupTarget = false;
  };
  const onMousedown = (e) => {
    mousedownTarget = e.target === e.currentTarget;
  };
  const onMouseup = (e) => {
    mouseupTarget = e.target === e.currentTarget;
  };
  return { onClick, onMousedown, onMouseup };
};
var PatchFlags = /* @__PURE__ */ ((PatchFlags2) => {
  PatchFlags2[PatchFlags2["TEXT"] = 1] = "TEXT";
  PatchFlags2[PatchFlags2["CLASS"] = 2] = "CLASS";
  PatchFlags2[PatchFlags2["STYLE"] = 4] = "STYLE";
  PatchFlags2[PatchFlags2["PROPS"] = 8] = "PROPS";
  PatchFlags2[PatchFlags2["FULL_PROPS"] = 16] = "FULL_PROPS";
  PatchFlags2[PatchFlags2["HYDRATE_EVENTS"] = 32] = "HYDRATE_EVENTS";
  PatchFlags2[PatchFlags2["STABLE_FRAGMENT"] = 64] = "STABLE_FRAGMENT";
  PatchFlags2[PatchFlags2["KEYED_FRAGMENT"] = 128] = "KEYED_FRAGMENT";
  PatchFlags2[PatchFlags2["UNKEYED_FRAGMENT"] = 256] = "UNKEYED_FRAGMENT";
  PatchFlags2[PatchFlags2["NEED_PATCH"] = 512] = "NEED_PATCH";
  PatchFlags2[PatchFlags2["DYNAMIC_SLOTS"] = 1024] = "DYNAMIC_SLOTS";
  PatchFlags2[PatchFlags2["HOISTED"] = -1] = "HOISTED";
  PatchFlags2[PatchFlags2["BAIL"] = -2] = "BAIL";
  return PatchFlags2;
})(PatchFlags || {});
const flattedChildren = (children) => {
  const vNodes = shared_cjs_prodExports.isArray(children) ? children : [children];
  const result = [];
  vNodes.forEach((child) => {
    var _a;
    if (shared_cjs_prodExports.isArray(child)) {
      result.push(...flattedChildren(child));
    } else if (isVNode(child) && ((_a = child.component) == null ? void 0 : _a.subTree)) {
      result.push(child, ...flattedChildren(child.component.subTree));
    } else if (isVNode(child) && shared_cjs_prodExports.isArray(child.children)) {
      result.push(...flattedChildren(child.children));
    } else if (isVNode(child) && child.shapeFlag === 2) {
      result.push(...flattedChildren(child.type()));
    } else {
      result.push(child);
    }
  });
  return result;
};
const overlayProps = buildProps({
  mask: {
    type: Boolean,
    default: true
  },
  customMaskEvent: Boolean,
  overlayClass: {
    type: definePropType([
      String,
      Array,
      Object
    ])
  },
  zIndex: {
    type: definePropType([String, Number])
  }
});
const overlayEmits = {
  click: (evt) => evt instanceof MouseEvent
};
const BLOCK = "overlay";
var Overlay = defineComponent({
  name: "ElOverlay",
  props: overlayProps,
  emits: overlayEmits,
  setup(props, { slots, emit }) {
    const ns = useNamespace(BLOCK);
    const onMaskClick = (e) => {
      emit("click", e);
    };
    const { onClick, onMousedown, onMouseup } = useSameTarget(props.customMaskEvent ? void 0 : onMaskClick);
    return () => {
      return props.mask ? createVNode("div", {
        class: [ns.b(), props.overlayClass],
        style: {
          zIndex: props.zIndex
        },
        onClick,
        onMousedown,
        onMouseup
      }, [renderSlot(slots, "default")], PatchFlags.STYLE | PatchFlags.CLASS | PatchFlags.PROPS, ["onClick", "onMouseup", "onMousedown"]) : h("div", {
        class: props.overlayClass,
        style: {
          zIndex: props.zIndex,
          position: "fixed",
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px"
        }
      }, [renderSlot(slots, "default")]);
    };
  }
});
const ElOverlay = Overlay;
const FOCUSOUT_PREVENTED = "focus-trap.focusout-prevented";
const FOCUSOUT_PREVENTED_OPTS = {
  cancelable: true,
  bubbles: false
};
const ON_TRAP_FOCUS_EVT = "focusAfterTrapped";
const ON_RELEASE_FOCUS_EVT = "focusAfterReleased";
const FOCUS_TRAP_INJECTION_KEY = Symbol("elFocusTrap");
const isHTMLElement = (e) => {
  if (typeof Element === "undefined")
    return false;
  return e instanceof Element;
};
const isFocusable = (element) => {
  if (element.tabIndex > 0 || element.tabIndex === 0 && element.getAttribute("tabIndex") !== null) {
    return true;
  }
  if (element.tabIndex < 0 || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true") {
    return false;
  }
  switch (element.nodeName) {
    case "A": {
      return !!element.href && element.rel !== "ignore";
    }
    case "INPUT": {
      return !(element.type === "hidden" || element.type === "file");
    }
    case "BUTTON":
    case "SELECT":
    case "TEXTAREA": {
      return true;
    }
    default: {
      return false;
    }
  }
};
const focusElement = (el, options) => {
  if (!el || !el.focus)
    return;
  let cleanup = false;
  if (isHTMLElement(el) && !isFocusable(el) && !el.getAttribute("tabindex")) {
    el.setAttribute("tabindex", "-1");
    cleanup = true;
  }
  el.focus(options);
  if (isHTMLElement(el) && cleanup) {
    el.removeAttribute("tabindex");
  }
};
const focusReason = ref();
const lastUserFocusTimestamp = ref(0);
const lastAutomatedFocusTimestamp = ref(0);
const obtainAllFocusableElements = (element) => {
  const nodes = [];
  const walker = (void 0).createTreeWalker(element, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (node) => {
      const isHiddenInput = node.tagName === "INPUT" && node.type === "hidden";
      if (node.disabled || node.hidden || isHiddenInput)
        return NodeFilter.FILTER_SKIP;
      return node.tabIndex >= 0 || node === (void 0).activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  while (walker.nextNode())
    nodes.push(walker.currentNode);
  return nodes;
};
const getVisibleElement = (elements, container) => {
  for (const element of elements) {
    if (!isHidden(element, container))
      return element;
  }
};
const isHidden = (element, container) => {
  if (getComputedStyle(element).visibility === "hidden")
    return true;
  while (element) {
    if (container && element === container)
      return false;
    if (getComputedStyle(element).display === "none")
      return true;
    element = element.parentElement;
  }
  return false;
};
const getEdges = (container) => {
  const focusable = obtainAllFocusableElements(container);
  const first = getVisibleElement(focusable, container);
  const last = getVisibleElement(focusable.reverse(), container);
  return [first, last];
};
const isSelectable = (element) => {
  return element instanceof HTMLInputElement && "select" in element;
};
const tryFocus = (element, shouldSelect) => {
  if (element) {
    const prevFocusedElement = (void 0).activeElement;
    focusElement(element, { preventScroll: true });
    lastAutomatedFocusTimestamp.value = (void 0).performance.now();
    if (element !== prevFocusedElement && isSelectable(element) && shouldSelect) {
      element.select();
    }
  }
};
const useFocusReason = () => {
  return {
    focusReason,
    lastUserFocusTimestamp,
    lastAutomatedFocusTimestamp
  };
};
const createFocusOutPreventedEvent = (detail) => {
  return new CustomEvent(FOCUSOUT_PREVENTED, {
    ...FOCUSOUT_PREVENTED_OPTS,
    detail
  });
};
const isAndroid = () => isClient;
const EVENT_CODE = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
};
const composeEventHandlers = (theirsHandler, oursHandler, { checkForDefaultPrevented = true } = {}) => {
  const handleEvent = (event) => {
    const shouldPrevent = theirsHandler == null ? void 0 : theirsHandler(event);
    if (checkForDefaultPrevented === false || !shouldPrevent) {
      return oursHandler == null ? void 0 : oursHandler(event);
    }
  };
  return handleEvent;
};
const getEventCode = (event) => {
  if (event.code && event.code !== "Unidentified")
    return event.code;
  const key = getEventKey(event);
  if (key) {
    if (Object.values(EVENT_CODE).includes(key))
      return key;
    switch (key) {
      case " ":
        return EVENT_CODE.space;
      default:
        return "";
    }
  }
  return "";
};
const getEventKey = (event) => {
  let key = event.key && event.key !== "Unidentified" ? event.key : "";
  if (!key && event.type === "keyup" && isAndroid()) {
    const target = event.target;
    key = target.value.charAt(target.selectionStart - 1);
  }
  return key;
};
const _sfc_main$k = defineComponent({
  name: "ElFocusTrap",
  inheritAttrs: false,
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object,
    focusStartEl: {
      type: [Object, String],
      default: "first"
    }
  },
  emits: [
    ON_TRAP_FOCUS_EVT,
    ON_RELEASE_FOCUS_EVT,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(props, { emit }) {
    const forwardRef = ref();
    let lastFocusAfterTrapped;
    const { focusReason: focusReason2 } = useFocusReason();
    const onKeydown = (e) => {
      if (!props.loop && !props.trapped)
        return;
      const { altKey, ctrlKey, metaKey, currentTarget, shiftKey } = e;
      const { loop } = props;
      const code = getEventCode(e);
      const isTabbing = code === EVENT_CODE.tab && !altKey && !ctrlKey && !metaKey;
      const currentFocusingEl = (void 0).activeElement;
      if (isTabbing && currentFocusingEl) {
        const container = currentTarget;
        const [first, last] = getEdges(container);
        const isTabbable = first && last;
        if (!isTabbable) {
          if (currentFocusingEl === container) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason2.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
            }
          }
        } else {
          if (!shiftKey && currentFocusingEl === last) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason2.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
              if (loop)
                tryFocus(first, true);
            }
          } else if (shiftKey && [first, container].includes(currentFocusingEl)) {
            const focusoutPreventedEvent = createFocusOutPreventedEvent({
              focusReason: focusReason2.value
            });
            emit("focusout-prevented", focusoutPreventedEvent);
            if (!focusoutPreventedEvent.defaultPrevented) {
              e.preventDefault();
              if (loop)
                tryFocus(last, true);
            }
          }
        }
      }
    };
    provide(FOCUS_TRAP_INJECTION_KEY, {
      focusTrapRef: forwardRef,
      onKeydown
    });
    watch(() => props.focusTrapEl, (focusTrapEl) => {
      if (focusTrapEl) {
        forwardRef.value = focusTrapEl;
      }
    }, { immediate: true });
    watch([forwardRef], ([forwardRef2], [oldForwardRef]) => {
      if (forwardRef2) {
        forwardRef2.addEventListener("keydown", onKeydown);
        forwardRef2.addEventListener("focusin", onFocusIn);
        forwardRef2.addEventListener("focusout", onFocusOut);
      }
      if (oldForwardRef) {
        oldForwardRef.removeEventListener("keydown", onKeydown);
        oldForwardRef.removeEventListener("focusin", onFocusIn);
        oldForwardRef.removeEventListener("focusout", onFocusOut);
      }
    });
    const onFocusIn = (e) => {
      const trapContainer = unref(forwardRef);
      if (!trapContainer)
        return;
      const target = e.target;
      const relatedTarget = e.relatedTarget;
      const isFocusedInTrap = target && trapContainer.contains(target);
      if (!props.trapped) {
        relatedTarget && trapContainer.contains(relatedTarget);
      }
      if (isFocusedInTrap)
        emit("focusin", e);
      if (props.trapped) {
        if (isFocusedInTrap) {
          lastFocusAfterTrapped = target;
        } else {
          tryFocus(lastFocusAfterTrapped, true);
        }
      }
    };
    const onFocusOut = (e) => {
      const trapContainer = unref(forwardRef);
      if (!trapContainer)
        return;
      if (props.trapped) {
        const relatedTarget = e.relatedTarget;
        if (!isNil(relatedTarget) && !trapContainer.contains(relatedTarget)) {
          setTimeout(() => {
            if (props.trapped) {
              const focusoutPreventedEvent = createFocusOutPreventedEvent({
                focusReason: focusReason2.value
              });
              emit("focusout-prevented", focusoutPreventedEvent);
              if (!focusoutPreventedEvent.defaultPrevented) {
                tryFocus(lastFocusAfterTrapped, true);
              }
            }
          }, 0);
        }
      } else {
        const target = e.target;
        const isFocusedInTrap = target && trapContainer.contains(target);
        if (!isFocusedInTrap)
          emit("focusout", e);
      }
    };
    return {
      onKeydown
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default", { handleKeydown: _ctx.onKeydown });
}
var ElFocusTrap = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["render", _sfc_render], ["__file", "focus-trap.vue"]]);
const teleportProps = buildProps({
  to: {
    type: definePropType([String, Object]),
    required: true
  },
  disabled: Boolean
});
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  __name: "teleport",
  props: teleportProps,
  setup(__props) {
    return (_ctx, _cache) => {
      return _ctx.disabled ? renderSlot(_ctx.$slots, "default", { key: 0 }) : (openBlock(), createBlock(Teleport$1, {
        key: 1,
        to: _ctx.to
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 8, ["to"]));
    };
  }
});
var Teleport = /* @__PURE__ */ _export_sfc(_sfc_main$j, [["__file", "teleport.vue"]]);
const ElTeleport = withInstall(Teleport);
const iconPropType = definePropType([
  String,
  Object,
  Function
]);
const dialogContentProps = buildProps({
  center: Boolean,
  alignCenter: {
    type: Boolean,
    default: void 0
  },
  closeIcon: {
    type: iconPropType
  },
  draggable: {
    type: Boolean,
    default: void 0
  },
  overflow: {
    type: Boolean,
    default: void 0
  },
  fullscreen: Boolean,
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  showClose: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ""
  },
  ariaLevel: {
    type: String,
    default: "2"
  }
});
const UPDATE_MODEL_EVENT = "update:modelValue";
const dialogProps = buildProps({
  ...dialogContentProps,
  appendToBody: Boolean,
  appendTo: {
    type: teleportProps.to.type,
    default: "body"
  },
  beforeClose: {
    type: definePropType(Function)
  },
  destroyOnClose: Boolean,
  closeOnClickModal: {
    type: Boolean,
    default: true
  },
  closeOnPressEscape: {
    type: Boolean,
    default: true
  },
  lockScroll: {
    type: Boolean,
    default: true
  },
  modal: {
    type: Boolean,
    default: true
  },
  modalPenetrable: Boolean,
  openDelay: {
    type: Number,
    default: 0
  },
  closeDelay: {
    type: Number,
    default: 0
  },
  top: {
    type: String
  },
  modelValue: Boolean,
  modalClass: String,
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  width: {
    type: [String, Number]
  },
  zIndex: {
    type: Number
  },
  trapFocus: Boolean,
  headerAriaLevel: {
    type: String,
    default: "2"
  },
  transition: {
    type: definePropType([String, Object]),
    default: void 0
  }
});
const dialogEmits = {
  open: () => true,
  opened: () => true,
  close: () => true,
  closed: () => true,
  [UPDATE_MODEL_EVENT]: (value) => isBoolean(value),
  openAutoFocus: () => true,
  closeAutoFocus: () => true
};
const drawerProps = buildProps({
  ...dialogProps,
  direction: {
    type: String,
    default: "rtl",
    values: ["ltr", "rtl", "ttb", "btt"]
  },
  resizable: Boolean,
  size: {
    type: [String, Number],
    default: "30%"
  },
  withHeader: {
    type: Boolean,
    default: true
  },
  modalFade: {
    type: Boolean,
    default: true
  },
  headerAriaLevel: {
    type: String,
    default: "2"
  }
});
const drawerEmits = dialogEmits;
function useResizable(props, target) {
  const { width, height } = useWindowSize();
  const isHorizontal = computed(() => ["ltr", "rtl"].includes(props.direction));
  const sign = computed(() => ["ltr", "ttb"].includes(props.direction) ? 1 : -1);
  const windowSize = computed(() => isHorizontal.value ? width.value : height.value);
  const getSize = computed(() => {
    return clamp(startSize.value + sign.value * offset.value, 4, windowSize.value);
  });
  const startSize = ref(0);
  const offset = ref(0);
  const isResizing = ref(false);
  const hasStartedDragging = ref(false);
  let startPos = [];
  let cleanups = [];
  const getActualSize = () => {
    var _a;
    const drawerEl = (_a = target.value) == null ? void 0 : _a.closest('[aria-modal="true"]');
    if (drawerEl) {
      return isHorizontal.value ? drawerEl.offsetWidth : drawerEl.offsetHeight;
    }
    return 100;
  };
  watch(() => [props.size, props.resizable], () => {
    hasStartedDragging.value = false;
    startSize.value = 0;
    offset.value = 0;
    onMouseUp();
  });
  const onMousedown = (e) => {
    if (!props.resizable)
      return;
    if (!hasStartedDragging.value) {
      startSize.value = getActualSize();
      hasStartedDragging.value = true;
    }
    startPos = [e.pageX, e.pageY];
    isResizing.value = true;
    cleanups.push(useEventListener(void 0, "mouseup", onMouseUp), useEventListener(void 0, "mousemove", onMouseMove));
  };
  const onMouseMove = (e) => {
    const { pageX, pageY } = e;
    const offsetX = pageX - startPos[0];
    const offsetY = pageY - startPos[1];
    offset.value = isHorizontal.value ? offsetX : offsetY;
  };
  const onMouseUp = () => {
    startPos = [];
    startSize.value = getSize.value;
    offset.value = 0;
    isResizing.value = false;
    cleanups.forEach((cleanup2) => cleanup2 == null ? void 0 : cleanup2());
    cleanups = [];
  };
  useEventListener(target, "mousedown", onMousedown);
  return {
    size: computed(() => {
      return hasStartedDragging.value ? `${getSize.value}px` : addUnit(props.size);
    }),
    isResizing,
    isHorizontal
  };
}
const DEFAULT_DIALOG_TRANSITION = "dialog-fade";
class ElementPlusError extends Error {
  constructor(m) {
    super(m);
    this.name = "ElementPlusError";
  }
}
function throwError(scope, m) {
  throw new ElementPlusError(`[${scope}] ${m}`);
}
function debugWarn(scope, message) {
}
const useLockscreen = (trigger, options = {}) => {
  if (!isRef(trigger)) {
    throwError("[useLockscreen]", "You need to pass a ref param to this function");
  }
  const ns = options.ns || useNamespace("popup");
  computed(() => ns.bm("parent", "hidden"));
  {
    return;
  }
};
const configProviderContextKey = Symbol();
var English = {
  name: "en",
  el: {
    breadcrumb: {
      label: "Breadcrumb"
    },
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color.",
      alphaLabel: "pick alpha value"
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    mention: {
      loading: "Loading"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      page: "Page",
      prev: "Go to previous page",
      next: "Go to next page",
      currentPage: "page {pager}",
      prevPages: "Previous {pager} pages",
      nextPages: "Next {pager} pages",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum"
    },
    tour: {
      next: "Next",
      previous: "Previous",
      finish: "Finish",
      close: "Close this dialog"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    },
    carousel: {
      leftArrow: "Carousel arrow left",
      rightArrow: "Carousel arrow right",
      indicator: "Carousel switch to index {index}"
    }
  }
};
const buildTranslator = (locale) => (path, option) => translate(path, option, unref(locale));
const translate = (path, option, locale) => get(locale, path, path).replace(/\{(\w+)\}/g, (_, key) => {
  var _a;
  return `${(_a = option == null ? void 0 : option[key]) != null ? _a : `{${key}}`}`;
});
const buildLocaleContext = (locale) => {
  const lang = computed(() => unref(locale).name);
  const localeRef = isRef(locale) ? locale : ref(locale);
  return {
    lang,
    locale: localeRef,
    t: buildTranslator(locale)
  };
};
const localeContextKey = Symbol("localeContextKey");
const useLocale = (localeOverrides) => {
  const locale = inject(localeContextKey, ref());
  return buildLocaleContext(computed(() => locale.value || English));
};
const globalConfig = ref();
function useGlobalConfig(key, defaultValue = void 0) {
  const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
  if (key) {
    return computed(() => {
      var _a, _b;
      return (_b = (_a = config.value) == null ? void 0 : _a[key]) != null ? _b : defaultValue;
    });
  } else {
    return config;
  }
}
const useDialog = (props, targetRef) => {
  var _a;
  const instance = getCurrentInstance();
  const emit = instance.emit;
  const { nextZIndex } = useZIndex();
  let lastPosition = "";
  const titleId = useId();
  const bodyId = useId();
  const visible = ref(false);
  const closed = ref(false);
  const rendered = ref(false);
  const zIndex = ref((_a = props.zIndex) != null ? _a : nextZIndex());
  let openTimer = void 0;
  let closeTimer = void 0;
  const config = useGlobalConfig();
  const namespace = computed(() => {
    var _a2, _b;
    return (_b = (_a2 = config.value) == null ? void 0 : _a2.namespace) != null ? _b : defaultNamespace;
  });
  const globalConfig2 = computed(() => {
    var _a2;
    return (_a2 = config.value) == null ? void 0 : _a2.dialog;
  });
  const style = computed(() => {
    const style2 = {};
    const varPrefix = `--${namespace.value}-dialog`;
    if (!props.fullscreen) {
      if (props.top) {
        style2[`${varPrefix}-margin-top`] = props.top;
      }
      if (props.width) {
        style2[`${varPrefix}-width`] = addUnit(props.width);
      }
    }
    return style2;
  });
  const _draggable = computed(() => {
    var _a2, _b, _c;
    return ((_c = (_b = props.draggable) != null ? _b : (_a2 = globalConfig2.value) == null ? void 0 : _a2.draggable) != null ? _c : false) && !props.fullscreen;
  });
  const _alignCenter = computed(() => {
    var _a2, _b, _c;
    return (_c = (_b = props.alignCenter) != null ? _b : (_a2 = globalConfig2.value) == null ? void 0 : _a2.alignCenter) != null ? _c : false;
  });
  const _overflow = computed(() => {
    var _a2, _b, _c;
    return (_c = (_b = props.overflow) != null ? _b : (_a2 = globalConfig2.value) == null ? void 0 : _a2.overflow) != null ? _c : false;
  });
  const overlayDialogStyle = computed(() => {
    if (_alignCenter.value) {
      return { display: "flex" };
    }
    return {};
  });
  const transitionConfig = computed(() => {
    var _a2, _b, _c;
    const transition = (_c = (_b = props.transition) != null ? _b : (_a2 = globalConfig2.value) == null ? void 0 : _a2.transition) != null ? _c : DEFAULT_DIALOG_TRANSITION;
    const baseConfig = {
      name: transition,
      onAfterEnter: afterEnter,
      onBeforeLeave: beforeLeave,
      onAfterLeave: afterLeave
    };
    if (shared_cjs_prodExports.isObject(transition)) {
      const config2 = { ...transition };
      const _mergeHook = (userHook, defaultHook) => {
        return (el) => {
          if (shared_cjs_prodExports.isArray(userHook)) {
            userHook.forEach((fn2) => {
              if (shared_cjs_prodExports.isFunction(fn2))
                fn2(el);
            });
          } else if (shared_cjs_prodExports.isFunction(userHook)) {
            userHook(el);
          }
          defaultHook();
        };
      };
      config2.onAfterEnter = _mergeHook(config2.onAfterEnter, afterEnter);
      config2.onBeforeLeave = _mergeHook(config2.onBeforeLeave, beforeLeave);
      config2.onAfterLeave = _mergeHook(config2.onAfterLeave, afterLeave);
      if (!config2.name) {
        config2.name = DEFAULT_DIALOG_TRANSITION;
      }
      return config2;
    }
    return baseConfig;
  });
  function afterEnter() {
    emit("opened");
  }
  function afterLeave() {
    emit("closed");
    emit(UPDATE_MODEL_EVENT, false);
    if (props.destroyOnClose) {
      rendered.value = false;
    }
  }
  function beforeLeave() {
    emit("close");
  }
  function open() {
    closeTimer == null ? void 0 : closeTimer();
    openTimer == null ? void 0 : openTimer();
    if (props.openDelay && props.openDelay > 0) {
      ({ stop: openTimer } = useTimeoutFn(() => doOpen(), props.openDelay));
    }
  }
  function close() {
    openTimer == null ? void 0 : openTimer();
    closeTimer == null ? void 0 : closeTimer();
    if (props.closeDelay && props.closeDelay > 0) {
      ({ stop: closeTimer } = useTimeoutFn(() => doClose(), props.closeDelay));
    } else {
      doClose();
    }
  }
  function handleClose() {
    function hide(shouldCancel) {
      if (shouldCancel)
        return;
      closed.value = true;
      visible.value = false;
    }
    if (props.beforeClose) {
      props.beforeClose(hide);
    } else {
      close();
    }
  }
  function onModalClick() {
    if (props.closeOnClickModal) {
      handleClose();
    }
  }
  function doOpen() {
    return;
  }
  function doClose() {
    visible.value = false;
  }
  function onOpenAutoFocus() {
    emit("openAutoFocus");
  }
  function onCloseAutoFocus() {
    emit("closeAutoFocus");
  }
  function onFocusoutPrevented(event) {
    var _a2;
    if (((_a2 = event.detail) == null ? void 0 : _a2.focusReason) === "pointer") {
      event.preventDefault();
    }
  }
  if (props.lockScroll) {
    useLockscreen(visible);
  }
  function onCloseRequested() {
    if (props.closeOnPressEscape) {
      handleClose();
    }
  }
  watch(() => props.zIndex, () => {
    var _a2;
    zIndex.value = (_a2 = props.zIndex) != null ? _a2 : nextZIndex();
  });
  watch(() => props.modelValue, (val) => {
    var _a2;
    if (val) {
      closed.value = false;
      open();
      rendered.value = true;
      zIndex.value = (_a2 = props.zIndex) != null ? _a2 : nextZIndex();
      nextTick(() => {
        emit("open");
        if (targetRef.value) {
          targetRef.value.parentElement.scrollTop = 0;
          targetRef.value.parentElement.scrollLeft = 0;
          targetRef.value.scrollTop = 0;
        }
      });
    } else {
      if (visible.value) {
        close();
      }
    }
  });
  watch(() => props.fullscreen, (val) => {
    if (!targetRef.value)
      return;
    if (val) {
      lastPosition = targetRef.value.style.transform;
      targetRef.value.style.transform = "";
    } else {
      targetRef.value.style.transform = lastPosition;
    }
  });
  return {
    afterEnter,
    afterLeave,
    beforeLeave,
    handleClose,
    onModalClick,
    close,
    doClose,
    onOpenAutoFocus,
    onCloseAutoFocus,
    onCloseRequested,
    onFocusoutPrevented,
    titleId,
    bodyId,
    closed,
    style,
    overlayDialogStyle,
    rendered,
    visible,
    zIndex,
    transitionConfig,
    _draggable,
    _alignCenter,
    _overflow
  };
};
const useDeprecated = ({ from, replacement, scope, version, ref: ref2, type = "API" }, condition) => {
  watch(() => unref(condition), (val) => {
  }, {
    immediate: true
  });
};
const __default__$c = defineComponent({
  name: "ElDrawer",
  inheritAttrs: false
});
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  ...__default__$c,
  props: drawerProps,
  emits: drawerEmits,
  setup(__props, { expose }) {
    const props = __props;
    const slots = useSlots();
    useDeprecated({
      scope: "el-drawer",
      from: "the title slot",
      replacement: "the header slot",
      version: "3.0.0",
      ref: "https://element-plus.org/en-US/component/drawer.html#slots"
    }, computed(() => !!slots.title));
    const drawerRef = ref();
    const focusStartRef = ref();
    const draggerRef = ref();
    const ns = useNamespace("drawer");
    const { t } = useLocale();
    const {
      afterEnter,
      afterLeave,
      beforeLeave,
      visible,
      rendered,
      titleId,
      bodyId,
      zIndex,
      onModalClick,
      onOpenAutoFocus,
      onCloseAutoFocus,
      onFocusoutPrevented,
      onCloseRequested,
      handleClose
    } = useDialog(props, drawerRef);
    const { isHorizontal, size, isResizing } = useResizable(props, draggerRef);
    expose({
      handleClose,
      afterEnter,
      afterLeave
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElTeleport), {
        to: _ctx.appendTo,
        disabled: _ctx.appendTo !== "body" ? false : !_ctx.appendToBody
      }, {
        default: withCtx(() => [
          createVNode(Transition, {
            name: unref(ns).b("fade"),
            onAfterEnter: unref(afterEnter),
            onAfterLeave: unref(afterLeave),
            onBeforeLeave: unref(beforeLeave),
            persisted: ""
          }, {
            default: withCtx(() => {
              var _a;
              return [
                withDirectives(createVNode(unref(ElOverlay), {
                  mask: _ctx.modal,
                  "overlay-class": [unref(ns).is("drawer"), (_a = _ctx.modalClass) != null ? _a : ""],
                  "z-index": unref(zIndex),
                  onClick: unref(onModalClick)
                }, {
                  default: withCtx(() => [
                    createVNode(unref(ElFocusTrap), {
                      loop: "",
                      trapped: unref(visible),
                      "focus-trap-el": drawerRef.value,
                      "focus-start-el": focusStartRef.value,
                      onFocusAfterTrapped: unref(onOpenAutoFocus),
                      onFocusAfterReleased: unref(onCloseAutoFocus),
                      onFocusoutPrevented: unref(onFocusoutPrevented),
                      onReleaseRequested: unref(onCloseRequested)
                    }, {
                      default: withCtx(() => [
                        createElementVNode("div", mergeProps({
                          ref_key: "drawerRef",
                          ref: drawerRef,
                          "aria-modal": "true",
                          "aria-label": _ctx.title || void 0,
                          "aria-labelledby": !_ctx.title ? unref(titleId) : void 0,
                          "aria-describedby": unref(bodyId)
                        }, _ctx.$attrs, {
                          class: [
                            unref(ns).b(),
                            _ctx.direction,
                            unref(visible) && "open",
                            unref(ns).is("dragging", unref(isResizing))
                          ],
                          style: { [unref(isHorizontal) ? "width" : "height"]: unref(size) },
                          role: "dialog",
                          onClick: withModifiers(() => {
                          }, ["stop"])
                        }), [
                          createElementVNode("span", {
                            ref_key: "focusStartRef",
                            ref: focusStartRef,
                            class: normalizeClass(unref(ns).e("sr-focus")),
                            tabindex: "-1"
                          }, null, 2),
                          _ctx.withHeader ? (openBlock(), createElementBlock("header", {
                            key: 0,
                            class: normalizeClass([unref(ns).e("header"), _ctx.headerClass])
                          }, [
                            !_ctx.$slots.title ? renderSlot(_ctx.$slots, "header", {
                              key: 0,
                              close: unref(handleClose),
                              titleId: unref(titleId),
                              titleClass: unref(ns).e("title")
                            }, () => [
                              createElementVNode("span", {
                                id: unref(titleId),
                                role: "heading",
                                "aria-level": _ctx.headerAriaLevel,
                                class: normalizeClass(unref(ns).e("title"))
                              }, toDisplayString(_ctx.title), 11, ["id", "aria-level"])
                            ]) : renderSlot(_ctx.$slots, "title", { key: 1 }, () => [
                              createCommentVNode(" DEPRECATED SLOT ")
                            ]),
                            _ctx.showClose ? (openBlock(), createElementBlock("button", {
                              key: 2,
                              "aria-label": unref(t)("el.drawer.close"),
                              class: normalizeClass(unref(ns).e("close-btn")),
                              type: "button",
                              onClick: unref(handleClose)
                            }, [
                              createVNode(unref(ElIcon), {
                                class: normalizeClass(unref(ns).e("close"))
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(close_default))
                                ]),
                                _: 1
                              }, 8, ["class"])
                            ], 10, ["aria-label", "onClick"])) : createCommentVNode("v-if", true)
                          ], 2)) : createCommentVNode("v-if", true),
                          unref(rendered) ? (openBlock(), createElementBlock("div", {
                            key: 1,
                            id: unref(bodyId),
                            class: normalizeClass([unref(ns).e("body"), _ctx.bodyClass])
                          }, [
                            renderSlot(_ctx.$slots, "default")
                          ], 10, ["id"])) : createCommentVNode("v-if", true),
                          _ctx.$slots.footer ? (openBlock(), createElementBlock("div", {
                            key: 2,
                            class: normalizeClass([unref(ns).e("footer"), _ctx.footerClass])
                          }, [
                            renderSlot(_ctx.$slots, "footer")
                          ], 2)) : createCommentVNode("v-if", true),
                          _ctx.resizable ? (openBlock(), createElementBlock("div", {
                            key: 3,
                            ref_key: "draggerRef",
                            ref: draggerRef,
                            style: normalizeStyle({ zIndex: unref(zIndex) }),
                            class: normalizeClass(unref(ns).e("dragger"))
                          }, null, 6)) : createCommentVNode("v-if", true)
                        ], 16, ["aria-label", "aria-labelledby", "aria-describedby", "onClick"])
                      ]),
                      _: 3
                    }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusoutPrevented", "onReleaseRequested"])
                  ]),
                  _: 3
                }, 8, ["mask", "overlay-class", "z-index", "onClick"]), [
                  [vShow, unref(visible)]
                ])
              ];
            }),
            _: 3
          }, 8, ["name", "onAfterEnter", "onAfterLeave", "onBeforeLeave"])
        ]),
        _: 3
      }, 8, ["to", "disabled"]);
    };
  }
});
var Drawer = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["__file", "drawer.vue"]]);
const ElDrawer = withInstall(Drawer);
const __default__$b = defineComponent({
  name: "ElMenuCollapseTransition"
});
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  ...__default__$b,
  setup(__props) {
    const ns = useNamespace("menu");
    const listeners = {
      onBeforeEnter: (el) => el.style.opacity = "0.2",
      onEnter(el, done) {
        addClass(el, `${ns.namespace.value}-opacity-transition`);
        el.style.opacity = "1";
        done();
      },
      onAfterEnter(el) {
        removeClass(el, `${ns.namespace.value}-opacity-transition`);
        el.style.opacity = "";
      },
      onBeforeLeave(el) {
        if (!el.dataset)
          el.dataset = {};
        if (hasClass(el, ns.m("collapse"))) {
          removeClass(el, ns.m("collapse"));
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          addClass(el, ns.m("collapse"));
        } else {
          addClass(el, ns.m("collapse"));
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          removeClass(el, ns.m("collapse"));
        }
        el.style.width = `${el.scrollWidth}px`;
        el.style.overflow = "hidden";
      },
      onLeave(el) {
        addClass(el, "horizontal-collapse-transition");
        el.style.width = `${el.dataset.scrollWidth}px`;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, mergeProps({ mode: "out-in" }, unref(listeners)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16);
    };
  }
});
var ElMenuCollapseTransition = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["__file", "menu-collapse-transition.vue"]]);
const __default__$a = defineComponent({
  name: "ElCollapseTransition"
});
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  ...__default__$a,
  setup(__props) {
    const ns = useNamespace("collapse-transition");
    const reset = (el) => {
      el.style.maxHeight = "";
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    };
    const on2 = {
      beforeEnter(el) {
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        if (el.style.height)
          el.dataset.elExistsHeight = el.style.height;
        el.style.maxHeight = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      },
      enter(el) {
        requestAnimationFrame(() => {
          el.dataset.oldOverflow = el.style.overflow;
          if (el.dataset.elExistsHeight) {
            el.style.maxHeight = el.dataset.elExistsHeight;
          } else if (el.scrollHeight !== 0) {
            el.style.maxHeight = `${el.scrollHeight}px`;
          } else {
            el.style.maxHeight = 0;
          }
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
          el.style.overflow = "hidden";
        });
      },
      afterEnter(el) {
        el.style.maxHeight = "";
        el.style.overflow = el.dataset.oldOverflow;
      },
      enterCancelled(el) {
        reset(el);
      },
      beforeLeave(el) {
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;
        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.overflow = "hidden";
      },
      leave(el) {
        if (el.scrollHeight !== 0) {
          el.style.maxHeight = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        }
      },
      afterLeave(el) {
        reset(el);
      },
      leaveCancelled(el) {
        reset(el);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, mergeProps({
        name: unref(ns).b()
      }, toHandlers(on2)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["name"]);
    };
  }
});
var CollapseTransition = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__file", "collapse-transition.vue"]]);
const ElCollapseTransition = withInstall(CollapseTransition);
const POPPER_INJECTION_KEY = Symbol("popper");
const POPPER_CONTENT_INJECTION_KEY = Symbol("popperContent");
const roleTypes = [
  "dialog",
  "grid",
  "group",
  "listbox",
  "menu",
  "navigation",
  "tooltip",
  "tree"
];
const popperProps = buildProps({
  role: {
    type: String,
    values: roleTypes,
    default: "tooltip"
  }
});
const __default__$9 = defineComponent({
  name: "ElPopper",
  inheritAttrs: false
});
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  ...__default__$9,
  props: popperProps,
  setup(__props, { expose }) {
    const props = __props;
    const triggerRef = ref();
    const popperInstanceRef = ref();
    const contentRef = ref();
    const referenceRef = ref();
    const role = computed(() => props.role);
    const popperProvides = {
      triggerRef,
      popperInstanceRef,
      contentRef,
      referenceRef,
      role
    };
    expose(popperProvides);
    provide(POPPER_INJECTION_KEY, popperProvides);
    return (_ctx, _cache) => {
      return renderSlot(_ctx.$slots, "default");
    };
  }
});
var Popper = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__file", "popper.vue"]]);
const __default__$8 = defineComponent({
  name: "ElPopperArrow",
  inheritAttrs: false
});
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  ...__default__$8,
  setup(__props, { expose }) {
    const ns = useNamespace("popper");
    const { arrowRef, arrowStyle } = inject(POPPER_CONTENT_INJECTION_KEY, void 0);
    expose({
      arrowRef
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        ref_key: "arrowRef",
        ref: arrowRef,
        class: normalizeClass(unref(ns).e("arrow")),
        style: normalizeStyle(unref(arrowStyle)),
        "data-popper-arrow": ""
      }, null, 6);
    };
  }
});
var ElPopperArrow = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__file", "arrow.vue"]]);
const popperTriggerProps = buildProps({
  virtualRef: {
    type: definePropType(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: {
    type: definePropType(Function)
  },
  onMouseleave: {
    type: definePropType(Function)
  },
  onClick: {
    type: definePropType(Function)
  },
  onKeydown: {
    type: definePropType(Function)
  },
  onFocus: {
    type: definePropType(Function)
  },
  onBlur: {
    type: definePropType(Function)
  },
  onContextmenu: {
    type: definePropType(Function)
  },
  id: String,
  open: Boolean
});
const FORWARD_REF_INJECTION_KEY = Symbol("elForwardRef");
const useForwardRef = (forwardRef) => {
  const setForwardRef = (el) => {
    forwardRef.value = el;
  };
  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef
  });
};
const useForwardRefDirective = (setForwardRef) => {
  return {
    mounted(el) {
      setForwardRef(el);
    },
    updated(el) {
      setForwardRef(el);
    },
    unmounted() {
      setForwardRef(null);
    }
  };
};
const NAME = "ElOnlyChild";
const OnlyChild = defineComponent({
  name: NAME,
  setup(_, {
    slots,
    attrs
  }) {
    var _a;
    const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY);
    const forwardRefDirective = useForwardRefDirective((_a = forwardRefInjection == null ? void 0 : forwardRefInjection.setForwardRef) != null ? _a : shared_cjs_prodExports.NOOP);
    return () => {
      var _a2;
      const defaultSlot = (_a2 = slots.default) == null ? void 0 : _a2.call(slots, attrs);
      if (!defaultSlot)
        return null;
      const [firstLegitNode, length] = findFirstLegitChild(defaultSlot);
      if (!firstLegitNode) {
        return null;
      }
      return withDirectives(cloneVNode(firstLegitNode, attrs), [[forwardRefDirective]]);
    };
  }
});
function findFirstLegitChild(node) {
  if (!node)
    return [null, 0];
  const children = node;
  const len = children.filter((c) => c.type !== Comment).length;
  for (const child of children) {
    if (shared_cjs_prodExports.isObject(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case "svg":
          return [wrapTextContent(child), len];
        case Fragment:
          return findFirstLegitChild(child.children);
        default:
          return [child, len];
      }
    }
    return [wrapTextContent(child), len];
  }
  return [null, 0];
}
function wrapTextContent(s) {
  const ns = useNamespace("only-child");
  return createVNode("span", {
    "class": ns.e("content")
  }, [s]);
}
const __default__$7 = defineComponent({
  name: "ElPopperTrigger",
  inheritAttrs: false
});
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  ...__default__$7,
  props: popperTriggerProps,
  setup(__props, { expose }) {
    const props = __props;
    const { role, triggerRef } = inject(POPPER_INJECTION_KEY, void 0);
    useForwardRef(triggerRef);
    const ariaControls = computed(() => {
      return ariaHaspopup.value ? props.id : void 0;
    });
    const ariaDescribedby = computed(() => {
      if (role && role.value === "tooltip") {
        return props.open && props.id ? props.id : void 0;
      }
      return void 0;
    });
    const ariaHaspopup = computed(() => {
      if (role && role.value !== "tooltip") {
        return role.value;
      }
      return void 0;
    });
    const ariaExpanded = computed(() => {
      return ariaHaspopup.value ? `${props.open}` : void 0;
    });
    expose({
      triggerRef
    });
    return (_ctx, _cache) => {
      return !_ctx.virtualTriggering ? (openBlock(), createBlock(unref(OnlyChild), mergeProps({ key: 0 }, _ctx.$attrs, {
        "aria-controls": unref(ariaControls),
        "aria-describedby": unref(ariaDescribedby),
        "aria-expanded": unref(ariaExpanded),
        "aria-haspopup": unref(ariaHaspopup)
      }), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"])) : createCommentVNode("v-if", true);
    };
  }
});
var ElPopperTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__file", "trigger.vue"]]);
var E = "top", R = "bottom", W = "right", P = "left", me = "auto", G = [E, R, W, P], U = "start", J = "end", Xe = "clippingParents", je = "viewport", K = "popper", Ye = "reference", De = G.reduce(function(t, e) {
  return t.concat([e + "-" + U, e + "-" + J]);
}, []), Ee = [].concat(G, [me]).reduce(function(t, e) {
  return t.concat([e, e + "-" + U, e + "-" + J]);
}, []), Ge = "beforeRead", Je = "read", Ke = "afterRead", Qe = "beforeMain", Ze = "main", et = "afterMain", tt = "beforeWrite", nt = "write", rt = "afterWrite", ot = [Ge, Je, Ke, Qe, Ze, et, tt, nt, rt];
function C(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function H(t) {
  if (t == null) return void 0;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || void 0;
  }
  return t;
}
function Q(t) {
  var e = H(t).Element;
  return t instanceof e || t instanceof Element;
}
function B(t) {
  var e = H(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Pe(t) {
  if (typeof ShadowRoot == "undefined") return false;
  var e = H(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Mt(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(n) {
    var r = e.styles[n] || {}, o = e.attributes[n] || {}, i = e.elements[n];
    !B(i) || !C(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(a) {
      var s = o[a];
      s === false ? i.removeAttribute(a) : i.setAttribute(a, s === true ? "" : s);
    }));
  });
}
function Rt(t) {
  var e = t.state, n = { popper: { position: e.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
  return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function() {
    Object.keys(e.elements).forEach(function(r) {
      var o = e.elements[r], i = e.attributes[r] || {}, a = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : n[r]), s = a.reduce(function(f, c) {
        return f[c] = "", f;
      }, {});
      !B(o) || !C(o) || (Object.assign(o.style, s), Object.keys(i).forEach(function(f) {
        o.removeAttribute(f);
      }));
    });
  };
}
var Ae = { name: "applyStyles", enabled: true, phase: "write", fn: Mt, effect: Rt, requires: ["computeStyles"] };
function q(t) {
  return t.split("-")[0];
}
var X = Math.max, ve = Math.min, Z = Math.round;
function ee(t, e) {
  e === void 0 && (e = false);
  var n = t.getBoundingClientRect(), r = 1, o = 1;
  if (B(t) && e) {
    var i = t.offsetHeight, a = t.offsetWidth;
    a > 0 && (r = Z(n.width) / a || 1), i > 0 && (o = Z(n.height) / i || 1);
  }
  return { width: n.width / r, height: n.height / o, top: n.top / o, right: n.right / r, bottom: n.bottom / o, left: n.left / r, x: n.left / r, y: n.top / o };
}
function ke(t) {
  var e = ee(t), n = t.offsetWidth, r = t.offsetHeight;
  return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), { x: t.offsetLeft, y: t.offsetTop, width: n, height: r };
}
function it(t, e) {
  var n = e.getRootNode && e.getRootNode();
  if (t.contains(e)) return true;
  if (n && Pe(n)) {
    var r = e;
    do {
      if (r && t.isSameNode(r)) return true;
      r = r.parentNode || r.host;
    } while (r);
  }
  return false;
}
function N(t) {
  return H(t).getComputedStyle(t);
}
function Wt(t) {
  return ["table", "td", "th"].indexOf(C(t)) >= 0;
}
function I(t) {
  return ((Q(t) ? t.ownerDocument : t.document) || (void 0).document).documentElement;
}
function ge(t) {
  return C(t) === "html" ? t : t.assignedSlot || t.parentNode || (Pe(t) ? t.host : null) || I(t);
}
function at(t) {
  return !B(t) || N(t).position === "fixed" ? null : t.offsetParent;
}
function Bt(t) {
  var e = (void 0).userAgent.toLowerCase().indexOf("firefox") !== -1, n = (void 0).userAgent.indexOf("Trident") !== -1;
  if (n && B(t)) {
    var r = N(t);
    if (r.position === "fixed") return null;
  }
  var o = ge(t);
  for (Pe(o) && (o = o.host); B(o) && ["html", "body"].indexOf(C(o)) < 0; ) {
    var i = N(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || e && i.willChange === "filter" || e && i.filter && i.filter !== "none") return o;
    o = o.parentNode;
  }
  return null;
}
function se(t) {
  for (var e = H(t), n = at(t); n && Wt(n) && N(n).position === "static"; ) n = at(n);
  return n && (C(n) === "html" || C(n) === "body" && N(n).position === "static") ? e : n || Bt(t) || e;
}
function Le(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function fe(t, e, n) {
  return X(t, ve(e, n));
}
function St(t, e, n) {
  var r = fe(t, e, n);
  return r > n ? n : r;
}
function st() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function ft(t) {
  return Object.assign({}, st(), t);
}
function ct(t, e) {
  return e.reduce(function(n, r) {
    return n[r] = t, n;
  }, {});
}
var Tt = function(t, e) {
  return t = typeof t == "function" ? t(Object.assign({}, e.rects, { placement: e.placement })) : t, ft(typeof t != "number" ? t : ct(t, G));
};
function Ht(t) {
  var e, n = t.state, r = t.name, o = t.options, i = n.elements.arrow, a = n.modifiersData.popperOffsets, s = q(n.placement), f = Le(s), c = [P, W].indexOf(s) >= 0, u = c ? "height" : "width";
  if (!(!i || !a)) {
    var m = Tt(o.padding, n), v = ke(i), l = f === "y" ? E : P, h2 = f === "y" ? R : W, p = n.rects.reference[u] + n.rects.reference[f] - a[f] - n.rects.popper[u], g = a[f] - n.rects.reference[f], x = se(i), y = x ? f === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, $ = p / 2 - g / 2, d = m[l], b = y - v[u] - m[h2], w = y / 2 - v[u] / 2 + $, O = fe(d, w, b), j = f;
    n.modifiersData[r] = (e = {}, e[j] = O, e.centerOffset = O - w, e);
  }
}
function Ct(t) {
  var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || !it(e.elements.popper, o) || (e.elements.arrow = o));
}
var pt = { name: "arrow", enabled: true, phase: "main", fn: Ht, effect: Ct, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
function te(t) {
  return t.split("-")[1];
}
var qt = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function Vt(t) {
  var e = t.x, n = t.y, r = void 0, o = r.devicePixelRatio || 1;
  return { x: Z(e * o) / o || 0, y: Z(n * o) / o || 0 };
}
function ut(t) {
  var e, n = t.popper, r = t.popperRect, o = t.placement, i = t.variation, a = t.offsets, s = t.position, f = t.gpuAcceleration, c = t.adaptive, u = t.roundOffsets, m = t.isFixed, v = a.x, l = v === void 0 ? 0 : v, h2 = a.y, p = h2 === void 0 ? 0 : h2, g = typeof u == "function" ? u({ x: l, y: p }) : { x: l, y: p };
  l = g.x, p = g.y;
  var x = a.hasOwnProperty("x"), y = a.hasOwnProperty("y"), $ = P, d = E, b = void 0;
  if (c) {
    var w = se(n), O = "clientHeight", j = "clientWidth";
    if (w === H(n) && (w = I(n), N(w).position !== "static" && s === "absolute" && (O = "scrollHeight", j = "scrollWidth")), w = w, o === E || (o === P || o === W) && i === J) {
      d = R;
      var A = m && w === b && b.visualViewport ? b.visualViewport.height : w[O];
      p -= A - r.height, p *= f ? 1 : -1;
    }
    if (o === P || (o === E || o === R) && i === J) {
      $ = W;
      var k = m && w === b && b.visualViewport ? b.visualViewport.width : w[j];
      l -= k - r.width, l *= f ? 1 : -1;
    }
  }
  var D = Object.assign({ position: s }, c && qt), S = u === true ? Vt({ x: l, y: p }) : { x: l, y: p };
  if (l = S.x, p = S.y, f) {
    var L;
    return Object.assign({}, D, (L = {}, L[d] = y ? "0" : "", L[$] = x ? "0" : "", L.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + l + "px, " + p + "px)" : "translate3d(" + l + "px, " + p + "px, 0)", L));
  }
  return Object.assign({}, D, (e = {}, e[d] = y ? p + "px" : "", e[$] = x ? l + "px" : "", e.transform = "", e));
}
function Nt(t) {
  var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? true : r, i = n.adaptive, a = i === void 0 ? true : i, s = n.roundOffsets, f = s === void 0 ? true : s, c = { placement: q(e.placement), variation: te(e.placement), popper: e.elements.popper, popperRect: e.rects.popper, gpuAcceleration: o, isFixed: e.options.strategy === "fixed" };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, ut(Object.assign({}, c, { offsets: e.modifiersData.popperOffsets, position: e.options.strategy, adaptive: a, roundOffsets: f })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, ut(Object.assign({}, c, { offsets: e.modifiersData.arrow, position: "absolute", adaptive: false, roundOffsets: f })))), e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-placement": e.placement });
}
var Me = { name: "computeStyles", enabled: true, phase: "beforeWrite", fn: Nt, data: {} }, ye = { passive: true };
function It(t) {
  var e = t.state, n = t.instance, r = t.options, o = r.scroll, i = o === void 0 ? true : o, a = r.resize, s = a === void 0 ? true : a, f = H(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return i && c.forEach(function(u) {
    u.addEventListener("scroll", n.update, ye);
  }), s && f.addEventListener("resize", n.update, ye), function() {
    i && c.forEach(function(u) {
      u.removeEventListener("scroll", n.update, ye);
    }), s && f.removeEventListener("resize", n.update, ye);
  };
}
var Re = { name: "eventListeners", enabled: true, phase: "write", fn: function() {
}, effect: It, data: {} }, _t = { left: "right", right: "left", bottom: "top", top: "bottom" };
function be(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return _t[e];
  });
}
var zt = { start: "end", end: "start" };
function lt(t) {
  return t.replace(/start|end/g, function(e) {
    return zt[e];
  });
}
function We(t) {
  var e = H(t), n = e.pageXOffset, r = e.pageYOffset;
  return { scrollLeft: n, scrollTop: r };
}
function Be(t) {
  return ee(I(t)).left + We(t).scrollLeft;
}
function Ft(t) {
  var e = H(t), n = I(t), r = e.visualViewport, o = n.clientWidth, i = n.clientHeight, a = 0, s = 0;
  return r && (o = r.width, i = r.height, /^((?!chrome|android).)*safari/i.test((void 0).userAgent) || (a = r.offsetLeft, s = r.offsetTop)), { width: o, height: i, x: a + Be(t), y: s };
}
function Ut(t) {
  var e, n = I(t), r = We(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, i = X(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = X(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), s = -r.scrollLeft + Be(t), f = -r.scrollTop;
  return N(o || n).direction === "rtl" && (s += X(n.clientWidth, o ? o.clientWidth : 0) - i), { width: i, height: a, x: s, y: f };
}
function Se(t) {
  var e = N(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function dt(t) {
  return ["html", "body", "#document"].indexOf(C(t)) >= 0 ? t.ownerDocument.body : B(t) && Se(t) ? t : dt(ge(t));
}
function ce(t, e) {
  var n;
  e === void 0 && (e = []);
  var r = dt(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), i = H(r), a = o ? [i].concat(i.visualViewport || [], Se(r) ? r : []) : r, s = e.concat(a);
  return o ? s : s.concat(ce(ge(a)));
}
function Te(t) {
  return Object.assign({}, t, { left: t.x, top: t.y, right: t.x + t.width, bottom: t.y + t.height });
}
function Xt(t) {
  var e = ee(t);
  return e.top = e.top + t.clientTop, e.left = e.left + t.clientLeft, e.bottom = e.top + t.clientHeight, e.right = e.left + t.clientWidth, e.width = t.clientWidth, e.height = t.clientHeight, e.x = e.left, e.y = e.top, e;
}
function ht(t, e) {
  return e === je ? Te(Ft(t)) : Q(e) ? Xt(e) : Te(Ut(I(t)));
}
function Yt(t) {
  var e = ce(ge(t)), n = ["absolute", "fixed"].indexOf(N(t).position) >= 0, r = n && B(t) ? se(t) : t;
  return Q(r) ? e.filter(function(o) {
    return Q(o) && it(o, r) && C(o) !== "body";
  }) : [];
}
function Gt(t, e, n) {
  var r = e === "clippingParents" ? Yt(t) : [].concat(e), o = [].concat(r, [n]), i = o[0], a = o.reduce(function(s, f) {
    var c = ht(t, f);
    return s.top = X(c.top, s.top), s.right = ve(c.right, s.right), s.bottom = ve(c.bottom, s.bottom), s.left = X(c.left, s.left), s;
  }, ht(t, i));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function mt(t) {
  var e = t.reference, n = t.element, r = t.placement, o = r ? q(r) : null, i = r ? te(r) : null, a = e.x + e.width / 2 - n.width / 2, s = e.y + e.height / 2 - n.height / 2, f;
  switch (o) {
    case E:
      f = { x: a, y: e.y - n.height };
      break;
    case R:
      f = { x: a, y: e.y + e.height };
      break;
    case W:
      f = { x: e.x + e.width, y: s };
      break;
    case P:
      f = { x: e.x - n.width, y: s };
      break;
    default:
      f = { x: e.x, y: e.y };
  }
  var c = o ? Le(o) : null;
  if (c != null) {
    var u = c === "y" ? "height" : "width";
    switch (i) {
      case U:
        f[c] = f[c] - (e[u] / 2 - n[u] / 2);
        break;
      case J:
        f[c] = f[c] + (e[u] / 2 - n[u] / 2);
        break;
    }
  }
  return f;
}
function ne(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = r === void 0 ? t.placement : r, i = n.boundary, a = i === void 0 ? Xe : i, s = n.rootBoundary, f = s === void 0 ? je : s, c = n.elementContext, u = c === void 0 ? K : c, m = n.altBoundary, v = m === void 0 ? false : m, l = n.padding, h2 = l === void 0 ? 0 : l, p = ft(typeof h2 != "number" ? h2 : ct(h2, G)), g = u === K ? Ye : K, x = t.rects.popper, y = t.elements[v ? g : u], $ = Gt(Q(y) ? y : y.contextElement || I(t.elements.popper), a, f), d = ee(t.elements.reference), b = mt({ reference: d, element: x, placement: o }), w = Te(Object.assign({}, x, b)), O = u === K ? w : d, j = { top: $.top - O.top + p.top, bottom: O.bottom - $.bottom + p.bottom, left: $.left - O.left + p.left, right: O.right - $.right + p.right }, A = t.modifiersData.offset;
  if (u === K && A) {
    var k = A[o];
    Object.keys(j).forEach(function(D) {
      var S = [W, R].indexOf(D) >= 0 ? 1 : -1, L = [E, R].indexOf(D) >= 0 ? "y" : "x";
      j[D] += k[L] * S;
    });
  }
  return j;
}
function Jt(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = n.boundary, i = n.rootBoundary, a = n.padding, s = n.flipVariations, f = n.allowedAutoPlacements, c = f === void 0 ? Ee : f, u = te(r), m = u ? s ? De : De.filter(function(h2) {
    return te(h2) === u;
  }) : G, v = m.filter(function(h2) {
    return c.indexOf(h2) >= 0;
  });
  v.length === 0 && (v = m);
  var l = v.reduce(function(h2, p) {
    return h2[p] = ne(t, { placement: p, boundary: o, rootBoundary: i, padding: a })[q(p)], h2;
  }, {});
  return Object.keys(l).sort(function(h2, p) {
    return l[h2] - l[p];
  });
}
function Kt(t) {
  if (q(t) === me) return [];
  var e = be(t);
  return [lt(t), e, lt(e)];
}
function Qt(t) {
  var e = t.state, n = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? true : o, a = n.altAxis, s = a === void 0 ? true : a, f = n.fallbackPlacements, c = n.padding, u = n.boundary, m = n.rootBoundary, v = n.altBoundary, l = n.flipVariations, h2 = l === void 0 ? true : l, p = n.allowedAutoPlacements, g = e.options.placement, x = q(g), y = x === g, $ = f || (y || !h2 ? [be(g)] : Kt(g)), d = [g].concat($).reduce(function(z, V) {
      return z.concat(q(V) === me ? Jt(e, { placement: V, boundary: u, rootBoundary: m, padding: c, flipVariations: h2, allowedAutoPlacements: p }) : V);
    }, []), b = e.rects.reference, w = e.rects.popper, O = /* @__PURE__ */ new Map(), j = true, A = d[0], k = 0; k < d.length; k++) {
      var D = d[k], S = q(D), L = te(D) === U, re = [E, R].indexOf(S) >= 0, oe = re ? "width" : "height", M = ne(e, { placement: D, boundary: u, rootBoundary: m, altBoundary: v, padding: c }), T = re ? L ? W : P : L ? R : E;
      b[oe] > w[oe] && (T = be(T));
      var pe = be(T), _ = [];
      if (i && _.push(M[S] <= 0), s && _.push(M[T] <= 0, M[pe] <= 0), _.every(function(z) {
        return z;
      })) {
        A = D, j = false;
        break;
      }
      O.set(D, _);
    }
    if (j) for (var ue = h2 ? 3 : 1, xe = function(z) {
      var V = d.find(function(de) {
        var ae = O.get(de);
        if (ae) return ae.slice(0, z).every(function(Y) {
          return Y;
        });
      });
      if (V) return A = V, "break";
    }, ie = ue; ie > 0; ie--) {
      var le = xe(ie);
      if (le === "break") break;
    }
    e.placement !== A && (e.modifiersData[r]._skip = true, e.placement = A, e.reset = true);
  }
}
var vt = { name: "flip", enabled: true, phase: "main", fn: Qt, requiresIfExists: ["offset"], data: { _skip: false } };
function gt(t, e, n) {
  return n === void 0 && (n = { x: 0, y: 0 }), { top: t.top - e.height - n.y, right: t.right - e.width + n.x, bottom: t.bottom - e.height + n.y, left: t.left - e.width - n.x };
}
function yt(t) {
  return [E, W, R, P].some(function(e) {
    return t[e] >= 0;
  });
}
function Zt(t) {
  var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, i = e.modifiersData.preventOverflow, a = ne(e, { elementContext: "reference" }), s = ne(e, { altBoundary: true }), f = gt(a, r), c = gt(s, o, i), u = yt(f), m = yt(c);
  e.modifiersData[n] = { referenceClippingOffsets: f, popperEscapeOffsets: c, isReferenceHidden: u, hasPopperEscaped: m }, e.attributes.popper = Object.assign({}, e.attributes.popper, { "data-popper-reference-hidden": u, "data-popper-escaped": m });
}
var bt = { name: "hide", enabled: true, phase: "main", requiresIfExists: ["preventOverflow"], fn: Zt };
function en(t, e, n) {
  var r = q(t), o = [P, E].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, e, { placement: t })) : n, a = i[0], s = i[1];
  return a = a || 0, s = (s || 0) * o, [P, W].indexOf(r) >= 0 ? { x: s, y: a } : { x: a, y: s };
}
function tn(t) {
  var e = t.state, n = t.options, r = t.name, o = n.offset, i = o === void 0 ? [0, 0] : o, a = Ee.reduce(function(u, m) {
    return u[m] = en(m, e.rects, i), u;
  }, {}), s = a[e.placement], f = s.x, c = s.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += f, e.modifiersData.popperOffsets.y += c), e.modifiersData[r] = a;
}
var wt = { name: "offset", enabled: true, phase: "main", requires: ["popperOffsets"], fn: tn };
function nn(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = mt({ reference: e.rects.reference, element: e.rects.popper, placement: e.placement });
}
var He = { name: "popperOffsets", enabled: true, phase: "read", fn: nn, data: {} };
function rn(t) {
  return t === "x" ? "y" : "x";
}
function on(t) {
  var e = t.state, n = t.options, r = t.name, o = n.mainAxis, i = o === void 0 ? true : o, a = n.altAxis, s = a === void 0 ? false : a, f = n.boundary, c = n.rootBoundary, u = n.altBoundary, m = n.padding, v = n.tether, l = v === void 0 ? true : v, h2 = n.tetherOffset, p = h2 === void 0 ? 0 : h2, g = ne(e, { boundary: f, rootBoundary: c, padding: m, altBoundary: u }), x = q(e.placement), y = te(e.placement), $ = !y, d = Le(x), b = rn(d), w = e.modifiersData.popperOffsets, O = e.rects.reference, j = e.rects.popper, A = typeof p == "function" ? p(Object.assign({}, e.rects, { placement: e.placement })) : p, k = typeof A == "number" ? { mainAxis: A, altAxis: A } : Object.assign({ mainAxis: 0, altAxis: 0 }, A), D = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, S = { x: 0, y: 0 };
  if (w) {
    if (i) {
      var L, re = d === "y" ? E : P, oe = d === "y" ? R : W, M = d === "y" ? "height" : "width", T = w[d], pe = T + g[re], _ = T - g[oe], ue = l ? -j[M] / 2 : 0, xe = y === U ? O[M] : j[M], ie = y === U ? -j[M] : -O[M], le = e.elements.arrow, z = l && le ? ke(le) : { width: 0, height: 0 }, V = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : st(), de = V[re], ae = V[oe], Y = fe(0, O[M], z[M]), jt = $ ? O[M] / 2 - ue - Y - de - k.mainAxis : xe - Y - de - k.mainAxis, Dt = $ ? -O[M] / 2 + ue + Y + ae + k.mainAxis : ie + Y + ae + k.mainAxis, Oe = e.elements.arrow && se(e.elements.arrow), Et = Oe ? d === "y" ? Oe.clientTop || 0 : Oe.clientLeft || 0 : 0, Ce = (L = D == null ? void 0 : D[d]) != null ? L : 0, Pt = T + jt - Ce - Et, At = T + Dt - Ce, qe = fe(l ? ve(pe, Pt) : pe, T, l ? X(_, At) : _);
      w[d] = qe, S[d] = qe - T;
    }
    if (s) {
      var Ve, kt = d === "x" ? E : P, Lt = d === "x" ? R : W, F = w[b], he = b === "y" ? "height" : "width", Ne = F + g[kt], Ie = F - g[Lt], $e = [E, P].indexOf(x) !== -1, _e = (Ve = D == null ? void 0 : D[b]) != null ? Ve : 0, ze = $e ? Ne : F - O[he] - j[he] - _e + k.altAxis, Fe = $e ? F + O[he] + j[he] - _e - k.altAxis : Ie, Ue = l && $e ? St(ze, F, Fe) : fe(l ? ze : Ne, F, l ? Fe : Ie);
      w[b] = Ue, S[b] = Ue - F;
    }
    e.modifiersData[r] = S;
  }
}
var xt = { name: "preventOverflow", enabled: true, phase: "main", fn: on, requiresIfExists: ["offset"] };
function an(t) {
  return { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop };
}
function sn(t) {
  return t === H(t) || !B(t) ? We(t) : an(t);
}
function fn(t) {
  var e = t.getBoundingClientRect(), n = Z(e.width) / t.offsetWidth || 1, r = Z(e.height) / t.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function cn(t, e, n) {
  n === void 0 && (n = false);
  var r = B(e), o = B(e) && fn(e), i = I(e), a = ee(t, o), s = { scrollLeft: 0, scrollTop: 0 }, f = { x: 0, y: 0 };
  return (r || !r && !n) && ((C(e) !== "body" || Se(i)) && (s = sn(e)), B(e) ? (f = ee(e, true), f.x += e.clientLeft, f.y += e.clientTop) : i && (f.x = Be(i))), { x: a.left + s.scrollLeft - f.x, y: a.top + s.scrollTop - f.y, width: a.width, height: a.height };
}
function pn(t) {
  var e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  t.forEach(function(i) {
    e.set(i.name, i);
  });
  function o(i) {
    n.add(i.name);
    var a = [].concat(i.requires || [], i.requiresIfExists || []);
    a.forEach(function(s) {
      if (!n.has(s)) {
        var f = e.get(s);
        f && o(f);
      }
    }), r.push(i);
  }
  return t.forEach(function(i) {
    n.has(i.name) || o(i);
  }), r;
}
function un(t) {
  var e = pn(t);
  return ot.reduce(function(n, r) {
    return n.concat(e.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function ln(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(n) {
      Promise.resolve().then(function() {
        e = void 0, n(t());
      });
    })), e;
  };
}
function dn(t) {
  var e = t.reduce(function(n, r) {
    var o = n[r.name];
    return n[r.name] = o ? Object.assign({}, o, r, { options: Object.assign({}, o.options, r.options), data: Object.assign({}, o.data, r.data) }) : r, n;
  }, {});
  return Object.keys(e).map(function(n) {
    return e[n];
  });
}
var Ot = { placement: "bottom", modifiers: [], strategy: "absolute" };
function $t() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function we(t) {
  t === void 0 && (t = {});
  var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, i = o === void 0 ? Ot : o;
  return function(a, s, f) {
    f === void 0 && (f = i);
    var c = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Ot, i), modifiersData: {}, elements: { reference: a, popper: s }, attributes: {}, styles: {} }, u = [], m = false, v = { state: c, setOptions: function(p) {
      var g = typeof p == "function" ? p(c.options) : p;
      h2(), c.options = Object.assign({}, i, c.options, g), c.scrollParents = { reference: Q(a) ? ce(a) : a.contextElement ? ce(a.contextElement) : [], popper: ce(s) };
      var x = un(dn([].concat(r, c.options.modifiers)));
      return c.orderedModifiers = x.filter(function(y) {
        return y.enabled;
      }), l(), v.update();
    }, forceUpdate: function() {
      if (!m) {
        var p = c.elements, g = p.reference, x = p.popper;
        if ($t(g, x)) {
          c.rects = { reference: cn(g, se(x), c.options.strategy === "fixed"), popper: ke(x) }, c.reset = false, c.placement = c.options.placement, c.orderedModifiers.forEach(function(j) {
            return c.modifiersData[j.name] = Object.assign({}, j.data);
          });
          for (var y = 0; y < c.orderedModifiers.length; y++) {
            if (c.reset === true) {
              c.reset = false, y = -1;
              continue;
            }
            var $ = c.orderedModifiers[y], d = $.fn, b = $.options, w = b === void 0 ? {} : b, O = $.name;
            typeof d == "function" && (c = d({ state: c, options: w, name: O, instance: v }) || c);
          }
        }
      }
    }, update: ln(function() {
      return new Promise(function(p) {
        v.forceUpdate(), p(c);
      });
    }), destroy: function() {
      h2(), m = true;
    } };
    if (!$t(a, s)) return v;
    v.setOptions(f).then(function(p) {
      !m && f.onFirstUpdate && f.onFirstUpdate(p);
    });
    function l() {
      c.orderedModifiers.forEach(function(p) {
        var g = p.name, x = p.options, y = x === void 0 ? {} : x, $ = p.effect;
        if (typeof $ == "function") {
          var d = $({ state: c, name: g, instance: v, options: y }), b = function() {
          };
          u.push(d || b);
        }
      });
    }
    function h2() {
      u.forEach(function(p) {
        return p();
      }), u = [];
    }
    return v;
  };
}
we();
var mn = [Re, He, Me, Ae];
we({ defaultModifiers: mn });
var gn = [Re, He, Me, Ae, wt, vt, xt, pt, bt], yn = we({ defaultModifiers: gn });
const popperArrowProps = buildProps({
  arrowOffset: {
    type: Number,
    default: 5
  }
});
const ariaProps = buildProps({
  ariaLabel: String,
  ariaOrientation: {
    type: String,
    values: ["horizontal", "vertical", "undefined"]
  },
  ariaControls: String
});
const useAriaProps = (arias) => {
  return pick(ariaProps, arias);
};
const POSITIONING_STRATEGIES = ["fixed", "absolute"];
const popperCoreConfigProps = buildProps({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: definePropType(Array),
    default: void 0
  },
  gpuAcceleration: {
    type: Boolean,
    default: true
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    values: Ee,
    default: "bottom"
  },
  popperOptions: {
    type: definePropType(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: POSITIONING_STRATEGIES,
    default: "absolute"
  }
});
const popperContentProps = buildProps({
  ...popperCoreConfigProps,
  ...popperArrowProps,
  id: String,
  style: {
    type: definePropType([String, Array, Object])
  },
  className: {
    type: definePropType([String, Array, Object])
  },
  effect: {
    type: definePropType(String),
    default: "dark"
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: true
  },
  pure: Boolean,
  focusOnShow: Boolean,
  trapping: Boolean,
  popperClass: {
    type: definePropType([String, Array, Object])
  },
  popperStyle: {
    type: definePropType([String, Array, Object])
  },
  referenceEl: {
    type: definePropType(Object)
  },
  triggerTargetEl: {
    type: definePropType(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: true
  },
  virtualTriggering: Boolean,
  zIndex: Number,
  ...useAriaProps(["ariaLabel"])
});
const popperContentEmits = {
  mouseenter: (evt) => evt instanceof MouseEvent,
  mouseleave: (evt) => evt instanceof MouseEvent,
  focus: () => true,
  blur: () => true,
  close: () => true
};
const usePopperContentFocusTrap = (props, emit) => {
  const trapped = ref(false);
  const focusStartRef = ref();
  const onFocusAfterTrapped = () => {
    emit("focus");
  };
  const onFocusAfterReleased = (event) => {
    var _a;
    if (((_a = event.detail) == null ? void 0 : _a.focusReason) !== "pointer") {
      focusStartRef.value = "first";
      emit("blur");
    }
  };
  const onFocusInTrap = (event) => {
    if (props.visible && !trapped.value) {
      if (event.target) {
        focusStartRef.value = event.target;
      }
      trapped.value = true;
    }
  };
  const onFocusoutPrevented = (event) => {
    if (!props.trapping) {
      if (event.detail.focusReason === "pointer") {
        event.preventDefault();
      }
      trapped.value = false;
    }
  };
  const onReleaseRequested = () => {
    trapped.value = false;
    emit("close");
  };
  return {
    focusStartRef,
    trapped,
    onFocusAfterReleased,
    onFocusAfterTrapped,
    onFocusInTrap,
    onFocusoutPrevented,
    onReleaseRequested
  };
};
const buildPopperOptions = (props, modifiers = []) => {
  const { placement, strategy, popperOptions } = props;
  const options = {
    placement,
    strategy,
    ...popperOptions,
    modifiers: [...genModifiers(props), ...modifiers]
  };
  deriveExtraModifiers(options, popperOptions == null ? void 0 : popperOptions.modifiers);
  return options;
};
const unwrapMeasurableEl = ($el) => {
  return;
};
function genModifiers(options) {
  const { offset, gpuAcceleration, fallbackPlacements } = options;
  return [
    {
      name: "offset",
      options: {
        offset: [0, offset != null ? offset : 12]
      }
    },
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration
      }
    }
  ];
}
function deriveExtraModifiers(options, modifiers) {
  if (modifiers) {
    options.modifiers = [...options.modifiers, ...modifiers != null ? modifiers : []];
  }
}
const usePopper = (referenceElementRef, popperElementRef, opts = {}) => {
  const stateUpdater = {
    name: "updateState",
    enabled: true,
    phase: "write",
    fn: ({ state }) => {
      const derivedState = deriveState(state);
      Object.assign(states.value, derivedState);
    },
    requires: ["computeStyles"]
  };
  const options = computed(() => {
    const { onFirstUpdate, placement, strategy, modifiers } = unref(opts);
    return {
      onFirstUpdate,
      placement: placement || "bottom",
      strategy: strategy || "absolute",
      modifiers: [
        ...modifiers || [],
        stateUpdater,
        { name: "applyStyles", enabled: false }
      ]
    };
  });
  const instanceRef = shallowRef();
  const states = ref({
    styles: {
      popper: {
        position: unref(options).strategy,
        left: "0",
        top: "0"
      },
      arrow: {
        position: "absolute"
      }
    },
    attributes: {}
  });
  const destroy = () => {
    if (!instanceRef.value)
      return;
    instanceRef.value.destroy();
    instanceRef.value = void 0;
  };
  watch(options, (newOptions) => {
    const instance = unref(instanceRef);
    if (instance) {
      instance.setOptions(newOptions);
    }
  }, {
    deep: true
  });
  watch([referenceElementRef, popperElementRef], ([referenceElement, popperElement]) => {
    destroy();
    if (!referenceElement || !popperElement)
      return;
    instanceRef.value = yn(referenceElement, popperElement, unref(options));
  });
  return {
    state: computed(() => {
      var _a;
      return { ...((_a = unref(instanceRef)) == null ? void 0 : _a.state) || {} };
    }),
    styles: computed(() => unref(states).styles),
    attributes: computed(() => unref(states).attributes),
    update: () => {
      var _a;
      return (_a = unref(instanceRef)) == null ? void 0 : _a.update();
    },
    forceUpdate: () => {
      var _a;
      return (_a = unref(instanceRef)) == null ? void 0 : _a.forceUpdate();
    },
    instanceRef: computed(() => unref(instanceRef))
  };
};
function deriveState(state) {
  const elements = Object.keys(state.elements);
  const styles = fromPairs(elements.map((element) => [element, state.styles[element] || {}]));
  const attributes = fromPairs(elements.map((element) => [element, state.attributes[element]]));
  return {
    styles,
    attributes
  };
}
const DEFAULT_ARROW_OFFSET = 0;
const usePopperContent = (props) => {
  const { popperInstanceRef, contentRef, triggerRef, role } = inject(POPPER_INJECTION_KEY, void 0);
  const arrowRef = ref();
  const arrowOffset = computed(() => props.arrowOffset);
  const eventListenerModifier = computed(() => {
    return {
      name: "eventListeners",
      enabled: !!props.visible
    };
  });
  const arrowModifier = computed(() => {
    var _a;
    const arrowEl = unref(arrowRef);
    const offset = (_a = unref(arrowOffset)) != null ? _a : DEFAULT_ARROW_OFFSET;
    return {
      name: "arrow",
      enabled: !isUndefined(arrowEl),
      options: {
        element: arrowEl,
        padding: offset
      }
    };
  });
  const options = computed(() => {
    return {
      onFirstUpdate: () => {
        update();
      },
      ...buildPopperOptions(props, [
        unref(arrowModifier),
        unref(eventListenerModifier)
      ])
    };
  });
  const computedReference = computed(() => unwrapMeasurableEl(props.referenceEl) || unref(triggerRef));
  const { attributes, state, styles, update, forceUpdate, instanceRef } = usePopper(computedReference, contentRef, options);
  watch(instanceRef, (instance) => popperInstanceRef.value = instance, {
    flush: "sync"
  });
  return {
    attributes,
    arrowRef,
    contentRef,
    instanceRef,
    state,
    styles,
    role,
    forceUpdate,
    update
  };
};
const usePopperContentDOM = (props, {
  attributes,
  styles,
  role
}) => {
  const { nextZIndex } = useZIndex();
  const ns = useNamespace("popper");
  const contentAttrs = computed(() => unref(attributes).popper);
  const contentZIndex = ref(isNumber(props.zIndex) ? props.zIndex : nextZIndex());
  const contentClass = computed(() => [
    ns.b(),
    ns.is("pure", props.pure),
    ns.is(props.effect),
    props.popperClass
  ]);
  const contentStyle = computed(() => {
    return [
      { zIndex: unref(contentZIndex) },
      unref(styles).popper,
      props.popperStyle || {}
    ];
  });
  const ariaModal = computed(() => role.value === "dialog" ? "false" : void 0);
  const arrowStyle = computed(() => unref(styles).arrow || {});
  const updateZIndex = () => {
    contentZIndex.value = isNumber(props.zIndex) ? props.zIndex : nextZIndex();
  };
  return {
    ariaModal,
    arrowStyle,
    contentAttrs,
    contentClass,
    contentStyle,
    contentZIndex,
    updateZIndex
  };
};
const formItemContextKey = Symbol("formItemContextKey");
const __default__$6 = defineComponent({
  name: "ElPopperContent"
});
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  ...__default__$6,
  props: popperContentProps,
  emits: popperContentEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const {
      focusStartRef,
      trapped,
      onFocusAfterReleased,
      onFocusAfterTrapped,
      onFocusInTrap,
      onFocusoutPrevented,
      onReleaseRequested
    } = usePopperContentFocusTrap(props, emit);
    const { attributes, arrowRef, contentRef, styles, instanceRef, role, update } = usePopperContent(props);
    const {
      arrowStyle,
      contentAttrs,
      contentClass,
      contentStyle,
      updateZIndex
    } = usePopperContentDOM(props, {
      styles,
      attributes,
      role
    });
    const formItemContext = inject(formItemContextKey, void 0);
    provide(POPPER_CONTENT_INJECTION_KEY, {
      arrowStyle,
      arrowRef
    });
    if (formItemContext) {
      provide(formItemContextKey, {
        ...formItemContext,
        addInputId: shared_cjs_prodExports.NOOP,
        removeInputId: shared_cjs_prodExports.NOOP
      });
    }
    const updatePopper = (shouldUpdateZIndex = true) => {
      update();
      shouldUpdateZIndex && updateZIndex();
    };
    expose({
      popperContentRef: contentRef,
      popperInstanceRef: instanceRef,
      updatePopper,
      contentStyle
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", mergeProps({
        ref_key: "contentRef",
        ref: contentRef
      }, unref(contentAttrs), {
        style: unref(contentStyle),
        class: unref(contentClass),
        tabindex: "-1",
        onMouseenter: (e) => _ctx.$emit("mouseenter", e),
        onMouseleave: (e) => _ctx.$emit("mouseleave", e)
      }), [
        createVNode(unref(ElFocusTrap), {
          trapped: unref(trapped),
          "trap-on-focus-in": true,
          "focus-trap-el": unref(contentRef),
          "focus-start-el": unref(focusStartRef),
          onFocusAfterTrapped: unref(onFocusAfterTrapped),
          onFocusAfterReleased: unref(onFocusAfterReleased),
          onFocusin: unref(onFocusInTrap),
          onFocusoutPrevented: unref(onFocusoutPrevented),
          onReleaseRequested: unref(onReleaseRequested)
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 8, ["trapped", "focus-trap-el", "focus-start-el", "onFocusAfterTrapped", "onFocusAfterReleased", "onFocusin", "onFocusoutPrevented", "onReleaseRequested"])
      ], 16, ["onMouseenter", "onMouseleave"]);
    };
  }
});
var ElPopperContent = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__file", "content.vue"]]);
const ElPopper = withInstall(Popper);
const TOOLTIP_INJECTION_KEY = Symbol("elTooltip");
function useTimeout() {
  let timeoutHandle;
  const registerTimeout = (fn2, delay) => {
    cancelTimeout();
    timeoutHandle = (void 0).setTimeout(fn2, delay);
  };
  const cancelTimeout = () => (void 0).clearTimeout(timeoutHandle);
  tryOnScopeDispose(() => cancelTimeout());
  return {
    registerTimeout,
    cancelTimeout
  };
}
const useDelayedToggleProps = buildProps({
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  },
  autoClose: {
    type: Number,
    default: 0
  }
});
const useDelayedToggle = ({
  showAfter,
  hideAfter,
  autoClose,
  open,
  close
}) => {
  const { registerTimeout } = useTimeout();
  const {
    registerTimeout: registerTimeoutForAutoClose,
    cancelTimeout: cancelTimeoutForAutoClose
  } = useTimeout();
  const onOpen = (event, delay = unref(showAfter)) => {
    registerTimeout(() => {
      open(event);
      const _autoClose = unref(autoClose);
      if (isNumber(_autoClose) && _autoClose > 0) {
        registerTimeoutForAutoClose(() => {
          close(event);
        }, _autoClose);
      }
    }, delay);
  };
  const onClose = (event, delay = unref(hideAfter)) => {
    cancelTimeoutForAutoClose();
    registerTimeout(() => {
      close(event);
    }, delay);
  };
  return {
    onOpen,
    onClose
  };
};
const useTooltipContentProps = buildProps({
  ...useDelayedToggleProps,
  ...popperContentProps,
  appendTo: {
    type: teleportProps.to.type
  },
  content: {
    type: String,
    default: ""
  },
  rawContent: Boolean,
  persistent: Boolean,
  visible: {
    type: definePropType(Boolean),
    default: null
  },
  transition: String,
  teleported: {
    type: Boolean,
    default: true
  },
  disabled: Boolean,
  ...useAriaProps(["ariaLabel"])
});
const useTooltipTriggerProps = buildProps({
  ...popperTriggerProps,
  disabled: Boolean,
  trigger: {
    type: definePropType([String, Array]),
    default: "hover"
  },
  triggerKeys: {
    type: definePropType(Array),
    default: () => [EVENT_CODE.enter, EVENT_CODE.numpadEnter, EVENT_CODE.space]
  },
  focusOnTarget: Boolean
});
const _prop = buildProp({
  type: definePropType(Boolean),
  default: null
});
const _event = buildProp({
  type: definePropType(Function)
});
const createModelToggleComposable = (name) => {
  const updateEventKey = `update:${name}`;
  const updateEventKeyRaw = `onUpdate:${name}`;
  const useModelToggleEmits2 = [updateEventKey];
  const useModelToggleProps2 = {
    [name]: _prop,
    [updateEventKeyRaw]: _event
  };
  const useModelToggle2 = ({
    indicator,
    toggleReason,
    shouldHideWhenRouteChanges,
    shouldProceed,
    onShow,
    onHide
  }) => {
    const instance = getCurrentInstance();
    const { emit } = instance;
    const props = instance.props;
    const hasUpdateHandler = computed(() => shared_cjs_prodExports.isFunction(props[updateEventKeyRaw]));
    const isModelBindingAbsent = computed(() => props[name] === null);
    const doShow = (event) => {
      if (indicator.value === true) {
        return;
      }
      indicator.value = true;
      if (toggleReason) {
        toggleReason.value = event;
      }
      if (shared_cjs_prodExports.isFunction(onShow)) {
        onShow(event);
      }
    };
    const doHide = (event) => {
      if (indicator.value === false) {
        return;
      }
      indicator.value = false;
      if (toggleReason) {
        toggleReason.value = event;
      }
      if (shared_cjs_prodExports.isFunction(onHide)) {
        onHide(event);
      }
    };
    const show = (event) => {
      if (props.disabled === true || shared_cjs_prodExports.isFunction(shouldProceed) && !shouldProceed())
        return;
      hasUpdateHandler.value && isClient;
      if (isModelBindingAbsent.value || true) {
        doShow(event);
      }
    };
    const hide = (event) => {
      if (props.disabled === true || !isClient)
        return;
    };
    const onChange = (val) => {
      if (!isBoolean(val))
        return;
      if (props.disabled && val) {
        if (hasUpdateHandler.value) {
          emit(updateEventKey, false);
        }
      } else if (indicator.value !== val) {
        if (val) {
          doShow();
        } else {
          doHide();
        }
      }
    };
    const toggle = () => {
      if (indicator.value) {
        hide();
      } else {
        show();
      }
    };
    watch(() => props[name], onChange);
    if (shouldHideWhenRouteChanges && instance.appContext.config.globalProperties.$route !== void 0) {
      watch(() => ({
        ...instance.proxy.$route
      }), () => {
        if (shouldHideWhenRouteChanges.value && indicator.value) {
          hide();
        }
      });
    }
    return {
      hide,
      show,
      toggle,
      hasUpdateHandler
    };
  };
  return {
    useModelToggle: useModelToggle2,
    useModelToggleProps: useModelToggleProps2,
    useModelToggleEmits: useModelToggleEmits2
  };
};
const {
  useModelToggleProps: useTooltipModelToggleProps,
  useModelToggleEmits: useTooltipModelToggleEmits,
  useModelToggle: useTooltipModelToggle
} = createModelToggleComposable("visible");
const useTooltipProps = buildProps({
  ...popperProps,
  ...useTooltipModelToggleProps,
  ...useTooltipContentProps,
  ...useTooltipTriggerProps,
  ...popperArrowProps,
  showArrow: {
    type: Boolean,
    default: true
  }
});
const tooltipEmits = [
  ...useTooltipModelToggleEmits,
  "before-show",
  "before-hide",
  "show",
  "hide",
  "open",
  "close"
];
const isTriggerType = (trigger, type) => {
  if (shared_cjs_prodExports.isArray(trigger)) {
    return trigger.includes(type);
  }
  return trigger === type;
};
const whenTrigger = (trigger, type, handler) => {
  return (e) => {
    isTriggerType(unref(trigger), type) && handler(e);
  };
};
const __default__$5 = defineComponent({
  name: "ElTooltipTrigger"
});
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  ...__default__$5,
  props: useTooltipTriggerProps,
  setup(__props, { expose }) {
    const props = __props;
    const ns = useNamespace("tooltip");
    const { controlled, id, open, onOpen, onClose, onToggle } = inject(TOOLTIP_INJECTION_KEY, void 0);
    const triggerRef = ref(null);
    const stopWhenControlledOrDisabled = () => {
      if (unref(controlled) || props.disabled) {
        return true;
      }
    };
    const trigger = toRef(props, "trigger");
    const onMouseenter = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "hover", (e) => {
      onOpen(e);
      if (props.focusOnTarget && e.target) {
        nextTick(() => {
          focusElement(e.target, { preventScroll: true });
        });
      }
    }));
    const onMouseleave = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "hover", onClose));
    const onClick = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "click", (e) => {
      if (e.button === 0) {
        onToggle(e);
      }
    }));
    const onFocus = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "focus", onOpen));
    const onBlur = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "focus", onClose));
    const onContextMenu = composeEventHandlers(stopWhenControlledOrDisabled, whenTrigger(trigger, "contextmenu", (e) => {
      e.preventDefault();
      onToggle(e);
    }));
    const onKeydown = composeEventHandlers(stopWhenControlledOrDisabled, (e) => {
      const code = getEventCode(e);
      if (props.triggerKeys.includes(code)) {
        e.preventDefault();
        onToggle(e);
      }
    });
    expose({
      triggerRef
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElPopperTrigger), {
        id: unref(id),
        "virtual-ref": _ctx.virtualRef,
        open: unref(open),
        "virtual-triggering": _ctx.virtualTriggering,
        class: normalizeClass(unref(ns).e("trigger")),
        onBlur: unref(onBlur),
        onClick: unref(onClick),
        onContextmenu: unref(onContextMenu),
        onFocus: unref(onFocus),
        onMouseenter: unref(onMouseenter),
        onMouseleave: unref(onMouseleave),
        onKeydown: unref(onKeydown)
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]);
    };
  }
});
var ElTooltipTrigger = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__file", "trigger.vue"]]);
const usePopperContainerId = () => {
  const namespace = useGetDerivedNamespace();
  const idInjection = useIdInjection();
  const id = computed(() => {
    return `${namespace.value}-popper-container-${idInjection.prefix}`;
  });
  const selector = computed(() => `#${id.value}`);
  return {
    id,
    selector
  };
};
const usePopperContainer = () => {
  const { id, selector } = usePopperContainerId();
  return {
    id,
    selector
  };
};
const castArray = (arr) => {
  if (!arr && arr !== 0)
    return [];
  return shared_cjs_prodExports.isArray(arr) ? arr : [arr];
};
const __default__$4 = defineComponent({
  name: "ElTooltipContent",
  inheritAttrs: false
});
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  ...__default__$4,
  props: useTooltipContentProps,
  setup(__props, { expose }) {
    const props = __props;
    const { selector } = usePopperContainerId();
    const ns = useNamespace("tooltip");
    const contentRef = ref();
    const popperContentRef = computedEager(() => {
      var _a;
      return (_a = contentRef.value) == null ? void 0 : _a.popperContentRef;
    });
    let stopHandle;
    const {
      controlled,
      id,
      open,
      trigger,
      onClose,
      onOpen,
      onShow,
      onHide,
      onBeforeShow,
      onBeforeHide
    } = inject(TOOLTIP_INJECTION_KEY, void 0);
    const transitionClass = computed(() => {
      return props.transition || `${ns.namespace.value}-fade-in-linear`;
    });
    const persistentRef = computed(() => {
      return props.persistent;
    });
    const shouldRender = computed(() => {
      return unref(persistentRef) ? true : unref(open);
    });
    const shouldShow = computed(() => {
      return props.disabled ? false : unref(open);
    });
    const appendTo = computed(() => {
      return props.appendTo || selector.value;
    });
    const contentStyle = computed(() => {
      var _a;
      return (_a = props.style) != null ? _a : {};
    });
    const ariaHidden = ref(true);
    const onTransitionLeave = () => {
      onHide();
      isFocusInsideContent() && focusElement((void 0).body, { preventScroll: true });
      ariaHidden.value = true;
    };
    const stopWhenControlled = () => {
      if (unref(controlled))
        return true;
    };
    const onContentEnter = composeEventHandlers(stopWhenControlled, () => {
      if (props.enterable && unref(trigger) === "hover") {
        onOpen();
      }
    });
    const onContentLeave = composeEventHandlers(stopWhenControlled, () => {
      if (unref(trigger) === "hover") {
        onClose();
      }
    });
    const onBeforeEnter = () => {
      var _a, _b;
      (_b = (_a = contentRef.value) == null ? void 0 : _a.updatePopper) == null ? void 0 : _b.call(_a);
      onBeforeShow == null ? void 0 : onBeforeShow();
    };
    const onBeforeLeave = () => {
      onBeforeHide == null ? void 0 : onBeforeHide();
    };
    const onAfterShow = () => {
      onShow();
    };
    const onBlur = () => {
      if (!props.virtualTriggering) {
        onClose();
      }
    };
    const isFocusInsideContent = (event) => {
      var _a;
      const popperContent = (_a = contentRef.value) == null ? void 0 : _a.popperContentRef;
      const activeElement = (event == null ? void 0 : event.relatedTarget) || (void 0).activeElement;
      return popperContent == null ? void 0 : popperContent.contains(activeElement);
    };
    watch(() => unref(open), (val) => {
      if (!val) {
        stopHandle == null ? void 0 : stopHandle();
      } else {
        ariaHidden.value = false;
        stopHandle = onClickOutside(popperContentRef, () => {
          if (unref(controlled))
            return;
          const needClose = castArray(unref(trigger)).every((item) => {
            return item !== "hover" && item !== "focus";
          });
          if (needClose) {
            onClose();
          }
        });
      }
    }, {
      flush: "post"
    });
    watch(() => props.content, () => {
      var _a, _b;
      (_b = (_a = contentRef.value) == null ? void 0 : _a.updatePopper) == null ? void 0 : _b.call(_a);
    });
    expose({
      contentRef,
      isFocusInsideContent
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElTeleport), {
        disabled: !_ctx.teleported,
        to: unref(appendTo)
      }, {
        default: withCtx(() => [
          unref(shouldRender) || !ariaHidden.value ? (openBlock(), createBlock(Transition, {
            key: 0,
            name: unref(transitionClass),
            appear: !unref(persistentRef),
            onAfterLeave: onTransitionLeave,
            onBeforeEnter,
            onAfterEnter: onAfterShow,
            onBeforeLeave,
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createVNode(unref(ElPopperContent), mergeProps({
                id: unref(id),
                ref_key: "contentRef",
                ref: contentRef
              }, _ctx.$attrs, {
                "aria-label": _ctx.ariaLabel,
                "aria-hidden": ariaHidden.value,
                "boundaries-padding": _ctx.boundariesPadding,
                "fallback-placements": _ctx.fallbackPlacements,
                "gpu-acceleration": _ctx.gpuAcceleration,
                offset: _ctx.offset,
                placement: _ctx.placement,
                "popper-options": _ctx.popperOptions,
                "arrow-offset": _ctx.arrowOffset,
                strategy: _ctx.strategy,
                effect: _ctx.effect,
                enterable: _ctx.enterable,
                pure: _ctx.pure,
                "popper-class": _ctx.popperClass,
                "popper-style": [_ctx.popperStyle, unref(contentStyle)],
                "reference-el": _ctx.referenceEl,
                "trigger-target-el": _ctx.triggerTargetEl,
                visible: unref(shouldShow),
                "z-index": _ctx.zIndex,
                onMouseenter: unref(onContentEnter),
                onMouseleave: unref(onContentLeave),
                onBlur,
                onClose: unref(onClose)
              }), {
                default: withCtx(() => [
                  renderSlot(_ctx.$slots, "default")
                ]),
                _: 3
              }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "arrow-offset", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "onMouseenter", "onMouseleave", "onClose"]), [
                [vShow, unref(shouldShow)]
              ])
            ]),
            _: 3
          }, 8, ["name", "appear"])) : createCommentVNode("v-if", true)
        ]),
        _: 3
      }, 8, ["disabled", "to"]);
    };
  }
});
var ElTooltipContent = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__file", "content.vue"]]);
const __default__$3 = defineComponent({
  name: "ElTooltip"
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  ...__default__$3,
  props: useTooltipProps,
  emits: tooltipEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    usePopperContainer();
    const ns = useNamespace("tooltip");
    const id = useId();
    const popperRef = ref();
    const contentRef = ref();
    const updatePopper = () => {
      var _a;
      const popperComponent = unref(popperRef);
      if (popperComponent) {
        (_a = popperComponent.popperInstanceRef) == null ? void 0 : _a.update();
      }
    };
    const open = ref(false);
    const toggleReason = ref();
    const { show, hide, hasUpdateHandler } = useTooltipModelToggle({
      indicator: open,
      toggleReason
    });
    const { onOpen, onClose } = useDelayedToggle({
      showAfter: toRef(props, "showAfter"),
      hideAfter: toRef(props, "hideAfter"),
      autoClose: toRef(props, "autoClose"),
      open: show,
      close: hide
    });
    const controlled = computed(() => isBoolean(props.visible) && !hasUpdateHandler.value);
    const kls = computed(() => {
      return [ns.b(), props.popperClass];
    });
    provide(TOOLTIP_INJECTION_KEY, {
      controlled,
      id,
      open: readonly(open),
      trigger: toRef(props, "trigger"),
      onOpen,
      onClose,
      onToggle: (event) => {
        if (unref(open)) {
          onClose(event);
        } else {
          onOpen(event);
        }
      },
      onShow: () => {
        emit("show", toggleReason.value);
      },
      onHide: () => {
        emit("hide", toggleReason.value);
      },
      onBeforeShow: () => {
        emit("before-show", toggleReason.value);
      },
      onBeforeHide: () => {
        emit("before-hide", toggleReason.value);
      },
      updatePopper
    });
    watch(() => props.disabled, (disabled) => {
      if (disabled && open.value) {
        open.value = false;
      }
    });
    const isFocusInsideContent = (event) => {
      var _a;
      return (_a = contentRef.value) == null ? void 0 : _a.isFocusInsideContent(event);
    };
    expose({
      popperRef,
      contentRef,
      isFocusInsideContent,
      updatePopper,
      onOpen,
      onClose,
      hide
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(unref(ElPopper), {
        ref_key: "popperRef",
        ref: popperRef,
        role: _ctx.role
      }, {
        default: withCtx(() => [
          createVNode(ElTooltipTrigger, {
            disabled: _ctx.disabled,
            trigger: _ctx.trigger,
            "trigger-keys": _ctx.triggerKeys,
            "virtual-ref": _ctx.virtualRef,
            "virtual-triggering": _ctx.virtualTriggering,
            "focus-on-target": _ctx.focusOnTarget
          }, {
            default: withCtx(() => [
              _ctx.$slots.default ? renderSlot(_ctx.$slots, "default", { key: 0 }) : createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering", "focus-on-target"]),
          createVNode(ElTooltipContent, {
            ref_key: "contentRef",
            ref: contentRef,
            "aria-label": _ctx.ariaLabel,
            "boundaries-padding": _ctx.boundariesPadding,
            content: _ctx.content,
            disabled: _ctx.disabled,
            effect: _ctx.effect,
            enterable: _ctx.enterable,
            "fallback-placements": _ctx.fallbackPlacements,
            "hide-after": _ctx.hideAfter,
            "gpu-acceleration": _ctx.gpuAcceleration,
            offset: _ctx.offset,
            persistent: _ctx.persistent,
            "popper-class": unref(kls),
            "popper-style": _ctx.popperStyle,
            placement: _ctx.placement,
            "popper-options": _ctx.popperOptions,
            "arrow-offset": _ctx.arrowOffset,
            pure: _ctx.pure,
            "raw-content": _ctx.rawContent,
            "reference-el": _ctx.referenceEl,
            "trigger-target-el": _ctx.triggerTargetEl,
            "show-after": _ctx.showAfter,
            strategy: _ctx.strategy,
            teleported: _ctx.teleported,
            transition: _ctx.transition,
            "virtual-triggering": _ctx.virtualTriggering,
            "z-index": _ctx.zIndex,
            "append-to": _ctx.appendTo
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "content", {}, () => [
                _ctx.rawContent ? (openBlock(), createElementBlock("span", {
                  key: 0,
                  innerHTML: _ctx.content
                }, null, 8, ["innerHTML"])) : (openBlock(), createElementBlock("span", { key: 1 }, toDisplayString(_ctx.content), 1))
              ]),
              _ctx.showArrow ? (openBlock(), createBlock(unref(ElPopperArrow), { key: 0 })) : createCommentVNode("v-if", true)
            ]),
            _: 3
          }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "arrow-offset", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to"])
        ]),
        _: 3
      }, 8, ["role"]);
    };
  }
});
var Tooltip = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__file", "tooltip.vue"]]);
const ElTooltip = withInstall(Tooltip);
function useMenu(instance, currentIndex) {
  const indexPath = computed(() => {
    let parent = instance.parent;
    const path = [currentIndex.value];
    while (parent.type.name !== "ElMenu") {
      if (parent.props.index) {
        path.unshift(parent.props.index);
      }
      parent = parent.parent;
    }
    return path;
  });
  const parentMenu = computed(() => {
    let parent = instance.parent;
    while (parent && !["ElMenu", "ElSubMenu"].includes(parent.type.name)) {
      parent = parent.parent;
    }
    return parent;
  });
  return {
    parentMenu,
    indexPath
  };
}
function bound01(n, max) {
  if (isOnePointZero(n)) {
    n = "100%";
  }
  var isPercent = isPercentage(n);
  n = max === 360 ? n : Math.min(max, Math.max(0, parseFloat(n)));
  if (isPercent) {
    n = parseInt(String(n * max), 10) / 100;
  }
  if (Math.abs(n - max) < 1e-6) {
    return 1;
  }
  if (max === 360) {
    n = (n < 0 ? n % max + max : n % max) / parseFloat(String(max));
  } else {
    n = n % max / parseFloat(String(max));
  }
  return n;
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
function isOnePointZero(n) {
  return typeof n === "string" && n.indexOf(".") !== -1 && parseFloat(n) === 1;
}
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") !== -1;
}
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}
function convertToPercentage(n) {
  if (n <= 1) {
    return "".concat(Number(n) * 100, "%");
  }
  return n;
}
function pad2(c) {
  return c.length === 1 ? "0" + c : String(c);
}
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h2 = 0;
  var s = 0;
  var l = (max + min) / 2;
  if (max === min) {
    s = 0;
    h2 = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h2 = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h2 = (b - r) / d + 2;
        break;
      case b:
        h2 = (r - g) / d + 4;
        break;
    }
    h2 /= 6;
  }
  return { h: h2, s, l };
}
function hue2rgb(p, q2, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return p + (q2 - p) * (6 * t);
  }
  if (t < 1 / 2) {
    return q2;
  }
  if (t < 2 / 3) {
    return p + (q2 - p) * (2 / 3 - t) * 6;
  }
  return p;
}
function hslToRgb(h2, s, l) {
  var r;
  var g;
  var b;
  h2 = bound01(h2, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  if (s === 0) {
    g = l;
    b = l;
    r = l;
  } else {
    var q2 = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q2;
    r = hue2rgb(p, q2, h2 + 1 / 3);
    g = hue2rgb(p, q2, h2);
    b = hue2rgb(p, q2, h2 - 1 / 3);
  }
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b);
  var min = Math.min(r, g, b);
  var h2 = 0;
  var v = max;
  var d = max - min;
  var s = max === 0 ? 0 : d / max;
  if (max === min) {
    h2 = 0;
  } else {
    switch (max) {
      case r:
        h2 = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h2 = (b - r) / d + 2;
        break;
      case b:
        h2 = (r - g) / d + 4;
        break;
    }
    h2 /= 6;
  }
  return { h: h2, s, v };
}
function hsvToRgb(h2, s, v) {
  h2 = bound01(h2, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h2);
  var f = h2 - i;
  var p = v * (1 - s);
  var q2 = v * (1 - f * s);
  var t = v * (1 - (1 - f) * s);
  var mod = i % 6;
  var r = [v, q2, p, p, t, v][mod];
  var g = [t, v, v, q2, p, p][mod];
  var b = [p, p, t, v, v, q2][mod];
  return { r: r * 255, g: g * 255, b: b * 255 };
}
function rgbToHex(r, g, b, allow3Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16))
  ];
  if (allow3Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16)),
    pad2(convertDecimalToHex(a))
  ];
  if (allow4Char && hex[0].startsWith(hex[0].charAt(1)) && hex[1].startsWith(hex[1].charAt(1)) && hex[2].startsWith(hex[2].charAt(1)) && hex[3].startsWith(hex[3].charAt(1))) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
function convertHexToDecimal(h2) {
  return parseIntFromHex(h2) / 255;
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function numberInputToObject(color) {
  return {
    r: color >> 16,
    g: (color & 65280) >> 8,
    b: color & 255
  };
}
var names = {
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  goldenrod: "#daa520",
  gold: "#ffd700",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavenderblush: "#fff0f5",
  lavender: "#e6e6fa",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  rebeccapurple: "#663399",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
};
function inputToRGB(color) {
  var rgb = { r: 0, g: 0, b: 0 };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color === "string") {
    color = stringInputToObject(color);
  }
  if (typeof color === "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (Object.prototype.hasOwnProperty.call(color, "a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a
  };
}
var CSS_INTEGER = "[-\\+]?\\d+%?";
var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
var CSS_UNIT = "(?:".concat(CSS_NUMBER, ")|(?:").concat(CSS_INTEGER, ")");
var PERMISSIVE_MATCH3 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var PERMISSIVE_MATCH4 = "[\\s|\\(]+(".concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")[,|\\s]+(").concat(CSS_UNIT, ")\\s*\\)?");
var matchers = {
  CSS_UNIT: new RegExp(CSS_UNIT),
  rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
  rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
  hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
  hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
  hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
  hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
  hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
  hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
};
function stringInputToObject(color) {
  color = color.trim().toLowerCase();
  if (color.length === 0) {
    return false;
  }
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color === "transparent") {
    return { r: 0, g: 0, b: 0, a: 0, format: "name" };
  }
  var match = matchers.rgb.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3] };
  }
  match = matchers.rgba.exec(color);
  if (match) {
    return { r: match[1], g: match[2], b: match[3], a: match[4] };
  }
  match = matchers.hsl.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3] };
  }
  match = matchers.hsla.exec(color);
  if (match) {
    return { h: match[1], s: match[2], l: match[3], a: match[4] };
  }
  match = matchers.hsv.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3] };
  }
  match = matchers.hsva.exec(color);
  if (match) {
    return { h: match[1], s: match[2], v: match[3], a: match[4] };
  }
  match = matchers.hex8.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  match = matchers.hex6.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  match = matchers.hex4.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      a: convertHexToDecimal(match[4] + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  match = matchers.hex3.exec(color);
  if (match) {
    return {
      r: parseIntFromHex(match[1] + match[1]),
      g: parseIntFromHex(match[2] + match[2]),
      b: parseIntFromHex(match[3] + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function isValidCSSUnit(color) {
  return Boolean(matchers.CSS_UNIT.exec(String(color)));
}
var TinyColor = (
  /** @class */
  (function() {
    function TinyColor2(color, opts) {
      if (color === void 0) {
        color = "";
      }
      if (opts === void 0) {
        opts = {};
      }
      var _a;
      if (color instanceof TinyColor2) {
        return color;
      }
      if (typeof color === "number") {
        color = numberInputToObject(color);
      }
      this.originalInput = color;
      var rgb = inputToRGB(color);
      this.originalInput = color;
      this.r = rgb.r;
      this.g = rgb.g;
      this.b = rgb.b;
      this.a = rgb.a;
      this.roundA = Math.round(100 * this.a) / 100;
      this.format = (_a = opts.format) !== null && _a !== void 0 ? _a : rgb.format;
      this.gradientType = opts.gradientType;
      if (this.r < 1) {
        this.r = Math.round(this.r);
      }
      if (this.g < 1) {
        this.g = Math.round(this.g);
      }
      if (this.b < 1) {
        this.b = Math.round(this.b);
      }
      this.isValid = rgb.ok;
    }
    TinyColor2.prototype.isDark = function() {
      return this.getBrightness() < 128;
    };
    TinyColor2.prototype.isLight = function() {
      return !this.isDark();
    };
    TinyColor2.prototype.getBrightness = function() {
      var rgb = this.toRgb();
      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
    };
    TinyColor2.prototype.getLuminance = function() {
      var rgb = this.toRgb();
      var R2;
      var G2;
      var B2;
      var RsRGB = rgb.r / 255;
      var GsRGB = rgb.g / 255;
      var BsRGB = rgb.b / 255;
      if (RsRGB <= 0.03928) {
        R2 = RsRGB / 12.92;
      } else {
        R2 = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
      }
      if (GsRGB <= 0.03928) {
        G2 = GsRGB / 12.92;
      } else {
        G2 = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
      }
      if (BsRGB <= 0.03928) {
        B2 = BsRGB / 12.92;
      } else {
        B2 = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
      }
      return 0.2126 * R2 + 0.7152 * G2 + 0.0722 * B2;
    };
    TinyColor2.prototype.getAlpha = function() {
      return this.a;
    };
    TinyColor2.prototype.setAlpha = function(alpha) {
      this.a = boundAlpha(alpha);
      this.roundA = Math.round(100 * this.a) / 100;
      return this;
    };
    TinyColor2.prototype.isMonochrome = function() {
      var s = this.toHsl().s;
      return s === 0;
    };
    TinyColor2.prototype.toHsv = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this.a };
    };
    TinyColor2.prototype.toHsvString = function() {
      var hsv = rgbToHsv(this.r, this.g, this.b);
      var h2 = Math.round(hsv.h * 360);
      var s = Math.round(hsv.s * 100);
      var v = Math.round(hsv.v * 100);
      return this.a === 1 ? "hsv(".concat(h2, ", ").concat(s, "%, ").concat(v, "%)") : "hsva(".concat(h2, ", ").concat(s, "%, ").concat(v, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHsl = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this.a };
    };
    TinyColor2.prototype.toHslString = function() {
      var hsl = rgbToHsl(this.r, this.g, this.b);
      var h2 = Math.round(hsl.h * 360);
      var s = Math.round(hsl.s * 100);
      var l = Math.round(hsl.l * 100);
      return this.a === 1 ? "hsl(".concat(h2, ", ").concat(s, "%, ").concat(l, "%)") : "hsla(".concat(h2, ", ").concat(s, "%, ").concat(l, "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toHex = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return rgbToHex(this.r, this.g, this.b, allow3Char);
    };
    TinyColor2.prototype.toHexString = function(allow3Char) {
      if (allow3Char === void 0) {
        allow3Char = false;
      }
      return "#" + this.toHex(allow3Char);
    };
    TinyColor2.prototype.toHex8 = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return rgbaToHex(this.r, this.g, this.b, this.a, allow4Char);
    };
    TinyColor2.prototype.toHex8String = function(allow4Char) {
      if (allow4Char === void 0) {
        allow4Char = false;
      }
      return "#" + this.toHex8(allow4Char);
    };
    TinyColor2.prototype.toHexShortString = function(allowShortChar) {
      if (allowShortChar === void 0) {
        allowShortChar = false;
      }
      return this.a === 1 ? this.toHexString(allowShortChar) : this.toHex8String(allowShortChar);
    };
    TinyColor2.prototype.toRgb = function() {
      return {
        r: Math.round(this.r),
        g: Math.round(this.g),
        b: Math.round(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toRgbString = function() {
      var r = Math.round(this.r);
      var g = Math.round(this.g);
      var b = Math.round(this.b);
      return this.a === 1 ? "rgb(".concat(r, ", ").concat(g, ", ").concat(b, ")") : "rgba(".concat(r, ", ").concat(g, ", ").concat(b, ", ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toPercentageRgb = function() {
      var fmt = function(x) {
        return "".concat(Math.round(bound01(x, 255) * 100), "%");
      };
      return {
        r: fmt(this.r),
        g: fmt(this.g),
        b: fmt(this.b),
        a: this.a
      };
    };
    TinyColor2.prototype.toPercentageRgbString = function() {
      var rnd = function(x) {
        return Math.round(bound01(x, 255) * 100);
      };
      return this.a === 1 ? "rgb(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%)") : "rgba(".concat(rnd(this.r), "%, ").concat(rnd(this.g), "%, ").concat(rnd(this.b), "%, ").concat(this.roundA, ")");
    };
    TinyColor2.prototype.toName = function() {
      if (this.a === 0) {
        return "transparent";
      }
      if (this.a < 1) {
        return false;
      }
      var hex = "#" + rgbToHex(this.r, this.g, this.b, false);
      for (var _i = 0, _a = Object.entries(names); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (hex === value) {
          return key;
        }
      }
      return false;
    };
    TinyColor2.prototype.toString = function(format) {
      var formatSet = Boolean(format);
      format = format !== null && format !== void 0 ? format : this.format;
      var formattedString = false;
      var hasAlpha = this.a < 1 && this.a >= 0;
      var needsAlphaFormat = !formatSet && hasAlpha && (format.startsWith("hex") || format === "name");
      if (needsAlphaFormat) {
        if (format === "name" && this.a === 0) {
          return this.toName();
        }
        return this.toRgbString();
      }
      if (format === "rgb") {
        formattedString = this.toRgbString();
      }
      if (format === "prgb") {
        formattedString = this.toPercentageRgbString();
      }
      if (format === "hex" || format === "hex6") {
        formattedString = this.toHexString();
      }
      if (format === "hex3") {
        formattedString = this.toHexString(true);
      }
      if (format === "hex4") {
        formattedString = this.toHex8String(true);
      }
      if (format === "hex8") {
        formattedString = this.toHex8String();
      }
      if (format === "name") {
        formattedString = this.toName();
      }
      if (format === "hsl") {
        formattedString = this.toHslString();
      }
      if (format === "hsv") {
        formattedString = this.toHsvString();
      }
      return formattedString || this.toHexString();
    };
    TinyColor2.prototype.toNumber = function() {
      return (Math.round(this.r) << 16) + (Math.round(this.g) << 8) + Math.round(this.b);
    };
    TinyColor2.prototype.clone = function() {
      return new TinyColor2(this.toString());
    };
    TinyColor2.prototype.lighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l += amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.brighten = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var rgb = this.toRgb();
      rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
      rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
      rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
      return new TinyColor2(rgb);
    };
    TinyColor2.prototype.darken = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.l -= amount / 100;
      hsl.l = clamp01(hsl.l);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.tint = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("white", amount);
    };
    TinyColor2.prototype.shade = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      return this.mix("black", amount);
    };
    TinyColor2.prototype.desaturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s -= amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.saturate = function(amount) {
      if (amount === void 0) {
        amount = 10;
      }
      var hsl = this.toHsl();
      hsl.s += amount / 100;
      hsl.s = clamp01(hsl.s);
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.greyscale = function() {
      return this.desaturate(100);
    };
    TinyColor2.prototype.spin = function(amount) {
      var hsl = this.toHsl();
      var hue = (hsl.h + amount) % 360;
      hsl.h = hue < 0 ? 360 + hue : hue;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.mix = function(color, amount) {
      if (amount === void 0) {
        amount = 50;
      }
      var rgb1 = this.toRgb();
      var rgb2 = new TinyColor2(color).toRgb();
      var p = amount / 100;
      var rgba = {
        r: (rgb2.r - rgb1.r) * p + rgb1.r,
        g: (rgb2.g - rgb1.g) * p + rgb1.g,
        b: (rgb2.b - rgb1.b) * p + rgb1.b,
        a: (rgb2.a - rgb1.a) * p + rgb1.a
      };
      return new TinyColor2(rgba);
    };
    TinyColor2.prototype.analogous = function(results, slices) {
      if (results === void 0) {
        results = 6;
      }
      if (slices === void 0) {
        slices = 30;
      }
      var hsl = this.toHsl();
      var part = 360 / slices;
      var ret = [this];
      for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
        hsl.h = (hsl.h + part) % 360;
        ret.push(new TinyColor2(hsl));
      }
      return ret;
    };
    TinyColor2.prototype.complement = function() {
      var hsl = this.toHsl();
      hsl.h = (hsl.h + 180) % 360;
      return new TinyColor2(hsl);
    };
    TinyColor2.prototype.monochromatic = function(results) {
      if (results === void 0) {
        results = 6;
      }
      var hsv = this.toHsv();
      var h2 = hsv.h;
      var s = hsv.s;
      var v = hsv.v;
      var res = [];
      var modification = 1 / results;
      while (results--) {
        res.push(new TinyColor2({ h: h2, s, v }));
        v = (v + modification) % 1;
      }
      return res;
    };
    TinyColor2.prototype.splitcomplement = function() {
      var hsl = this.toHsl();
      var h2 = hsl.h;
      return [
        this,
        new TinyColor2({ h: (h2 + 72) % 360, s: hsl.s, l: hsl.l }),
        new TinyColor2({ h: (h2 + 216) % 360, s: hsl.s, l: hsl.l })
      ];
    };
    TinyColor2.prototype.onBackground = function(background) {
      var fg = this.toRgb();
      var bg = new TinyColor2(background).toRgb();
      var alpha = fg.a + bg.a * (1 - fg.a);
      return new TinyColor2({
        r: (fg.r * fg.a + bg.r * bg.a * (1 - fg.a)) / alpha,
        g: (fg.g * fg.a + bg.g * bg.a * (1 - fg.a)) / alpha,
        b: (fg.b * fg.a + bg.b * bg.a * (1 - fg.a)) / alpha,
        a: alpha
      });
    };
    TinyColor2.prototype.triad = function() {
      return this.polyad(3);
    };
    TinyColor2.prototype.tetrad = function() {
      return this.polyad(4);
    };
    TinyColor2.prototype.polyad = function(n) {
      var hsl = this.toHsl();
      var h2 = hsl.h;
      var result = [this];
      var increment = 360 / n;
      for (var i = 1; i < n; i++) {
        result.push(new TinyColor2({ h: (h2 + i * increment) % 360, s: hsl.s, l: hsl.l }));
      }
      return result;
    };
    TinyColor2.prototype.equals = function(color) {
      return this.toRgbString() === new TinyColor2(color).toRgbString();
    };
    return TinyColor2;
  })()
);
function useMenuColor(props) {
  const menuBarColor = computed(() => {
    const color = props.backgroundColor;
    return color ? new TinyColor(color).shade(20).toString() : "";
  });
  return menuBarColor;
}
const useMenuCssVar = (props, level) => {
  const ns = useNamespace("menu");
  return computed(() => ns.cssVarBlock({
    "text-color": props.textColor || "",
    "hover-text-color": props.textColor || "",
    "bg-color": props.backgroundColor || "",
    "hover-bg-color": useMenuColor(props).value || "",
    "active-color": props.activeTextColor || "",
    level: `${level}`
  }));
};
const MENU_INJECTION_KEY = "rootMenu";
const SUB_MENU_INJECTION_KEY = "subMenu:";
const subMenuProps = buildProps({
  index: {
    type: String,
    required: true
  },
  showTimeout: Number,
  hideTimeout: Number,
  popperClass: String,
  disabled: Boolean,
  teleported: {
    type: Boolean,
    default: void 0
  },
  popperOffset: Number,
  expandCloseIcon: {
    type: iconPropType
  },
  expandOpenIcon: {
    type: iconPropType
  },
  collapseCloseIcon: {
    type: iconPropType
  },
  collapseOpenIcon: {
    type: iconPropType
  }
});
const COMPONENT_NAME$1 = "ElSubMenu";
var SubMenu = defineComponent({
  name: COMPONENT_NAME$1,
  props: subMenuProps,
  setup(props, { slots, expose }) {
    const instance = getCurrentInstance();
    const { indexPath, parentMenu } = useMenu(instance, computed(() => props.index));
    const nsMenu = useNamespace("menu");
    const nsSubMenu = useNamespace("sub-menu");
    const rootMenu = inject(MENU_INJECTION_KEY);
    if (!rootMenu)
      throwError(COMPONENT_NAME$1, "can not inject root menu");
    const subMenu = inject(`${SUB_MENU_INJECTION_KEY}${parentMenu.value.uid}`);
    if (!subMenu)
      throwError(COMPONENT_NAME$1, "can not inject sub menu");
    const items = ref({});
    const subMenus = ref({});
    let timeout;
    const mouseInChild = ref(false);
    const verticalTitleRef = ref();
    const vPopper = ref();
    const isFirstLevel = computed(() => subMenu.level === 0);
    const currentPlacement = computed(() => mode.value === "horizontal" && isFirstLevel.value ? "bottom-start" : "right-start");
    const subMenuTitleIcon = computed(() => {
      const isExpandedMode = mode.value === "horizontal" && isFirstLevel.value || mode.value === "vertical" && !rootMenu.props.collapse;
      if (isExpandedMode) {
        if (props.expandCloseIcon && props.expandOpenIcon) {
          return opened.value ? props.expandOpenIcon : props.expandCloseIcon;
        }
        return arrow_down_default;
      } else {
        if (props.collapseCloseIcon && props.collapseOpenIcon) {
          return opened.value ? props.collapseOpenIcon : props.collapseCloseIcon;
        }
        return arrow_right_default;
      }
    });
    const appendToBody = computed(() => {
      const value = props.teleported;
      return isUndefined$1(value) ? isFirstLevel.value : value;
    });
    const menuTransitionName = computed(() => rootMenu.props.collapse ? `${nsMenu.namespace.value}-zoom-in-left` : `${nsMenu.namespace.value}-zoom-in-top`);
    const fallbackPlacements = computed(() => mode.value === "horizontal" && isFirstLevel.value ? [
      "bottom-start",
      "bottom-end",
      "top-start",
      "top-end",
      "right-start",
      "left-start"
    ] : [
      "right-start",
      "right",
      "right-end",
      "left-start",
      "bottom-start",
      "bottom-end",
      "top-start",
      "top-end"
    ]);
    const opened = computed(() => rootMenu.openedMenus.includes(props.index));
    const active = computed(() => [...Object.values(items.value), ...Object.values(subMenus.value)].some(({ active: active2 }) => active2));
    const mode = computed(() => rootMenu.props.mode);
    const persistent = computed(() => rootMenu.props.persistent);
    reactive({
      index: props.index,
      indexPath,
      active
    });
    const ulStyle = useMenuCssVar(rootMenu.props, subMenu.level + 1);
    const subMenuPopperOffset = computed(() => {
      var _a;
      return (_a = props.popperOffset) != null ? _a : rootMenu.props.popperOffset;
    });
    const subMenuPopperClass = computed(() => {
      var _a;
      return (_a = props.popperClass) != null ? _a : rootMenu.props.popperClass;
    });
    const subMenuShowTimeout = computed(() => {
      var _a;
      return (_a = props.showTimeout) != null ? _a : rootMenu.props.showTimeout;
    });
    const subMenuHideTimeout = computed(() => {
      var _a;
      return (_a = props.hideTimeout) != null ? _a : rootMenu.props.hideTimeout;
    });
    const doDestroy = () => {
      var _a, _b, _c;
      return (_c = (_b = (_a = vPopper.value) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.popperInstanceRef) == null ? void 0 : _c.destroy();
    };
    const handleCollapseToggle = (value) => {
      if (!value) {
        doDestroy();
      }
    };
    const handleClick = () => {
      if (rootMenu.props.menuTrigger === "hover" && rootMenu.props.mode === "horizontal" || rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled)
        return;
      rootMenu.handleSubMenuClick({
        index: props.index,
        indexPath: indexPath.value,
        active: active.value
      });
    };
    const handleMouseenter = (event, showTimeout = subMenuShowTimeout.value) => {
      var _a;
      if (event.type === "focus")
        return;
      if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled) {
        subMenu.mouseInChild.value = true;
        return;
      }
      subMenu.mouseInChild.value = true;
      timeout == null ? void 0 : timeout();
      ({ stop: timeout } = useTimeoutFn(() => {
        rootMenu.openMenu(props.index, indexPath.value);
      }, showTimeout));
      if (appendToBody.value) {
        (_a = parentMenu.value.vnode.el) == null ? void 0 : _a.dispatchEvent(new MouseEvent("mouseenter"));
      }
      if (event.type === "mouseenter" && event.target) {
        nextTick(() => {
          focusElement(event.target, { preventScroll: true });
        });
      }
    };
    const handleMouseleave = (deepDispatch = false) => {
      var _a;
      if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical") {
        subMenu.mouseInChild.value = false;
        return;
      }
      timeout == null ? void 0 : timeout();
      subMenu.mouseInChild.value = false;
      ({ stop: timeout } = useTimeoutFn(() => !mouseInChild.value && rootMenu.closeMenu(props.index, indexPath.value), subMenuHideTimeout.value));
      if (appendToBody.value && deepDispatch) {
        (_a = subMenu.handleMouseleave) == null ? void 0 : _a.call(subMenu, true);
      }
    };
    watch(() => rootMenu.props.collapse, (value) => handleCollapseToggle(Boolean(value)));
    {
      const addSubMenu = (item2) => {
        subMenus.value[item2.index] = item2;
      };
      const removeSubMenu = (item2) => {
        delete subMenus.value[item2.index];
      };
      provide(`${SUB_MENU_INJECTION_KEY}${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        handleMouseleave,
        mouseInChild,
        level: subMenu.level + 1
      });
    }
    expose({
      opened
    });
    return () => {
      var _a;
      const titleTag = [
        (_a = slots.title) == null ? void 0 : _a.call(slots),
        h(ElIcon, {
          class: nsSubMenu.e("icon-arrow"),
          style: {
            transform: opened.value ? props.expandCloseIcon && props.expandOpenIcon || props.collapseCloseIcon && props.collapseOpenIcon && rootMenu.props.collapse ? "none" : "rotateZ(180deg)" : "none"
          }
        }, {
          default: () => shared_cjs_prodExports.isString(subMenuTitleIcon.value) ? h(instance.appContext.components[subMenuTitleIcon.value]) : h(subMenuTitleIcon.value)
        })
      ];
      const child = rootMenu.isMenuPopup ? h(ElTooltip, {
        ref: vPopper,
        visible: opened.value,
        effect: "light",
        pure: true,
        offset: subMenuPopperOffset.value,
        showArrow: false,
        persistent: persistent.value,
        popperClass: subMenuPopperClass.value,
        placement: currentPlacement.value,
        teleported: appendToBody.value,
        fallbackPlacements: fallbackPlacements.value,
        transition: menuTransitionName.value,
        gpuAcceleration: false
      }, {
        content: () => {
          var _a2;
          return h("div", {
            class: [
              nsMenu.m(mode.value),
              nsMenu.m("popup-container"),
              subMenuPopperClass.value
            ],
            onMouseenter: (evt) => handleMouseenter(evt, 100),
            onMouseleave: () => handleMouseleave(true),
            onFocus: (evt) => handleMouseenter(evt, 100)
          }, [
            h("ul", {
              class: [
                nsMenu.b(),
                nsMenu.m("popup"),
                nsMenu.m(`popup-${currentPlacement.value}`)
              ],
              style: ulStyle.value
            }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])
          ]);
        },
        default: () => h("div", {
          class: nsSubMenu.e("title"),
          onClick: handleClick
        }, titleTag)
      }) : h(Fragment, {}, [
        h("div", {
          class: nsSubMenu.e("title"),
          ref: verticalTitleRef,
          onClick: handleClick
        }, titleTag),
        h(ElCollapseTransition, {}, {
          default: () => {
            var _a2;
            return withDirectives(h("ul", {
              role: "menu",
              class: [nsMenu.b(), nsMenu.m("inline")],
              style: ulStyle.value
            }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), [[vShow, opened.value]]);
          }
        })
      ]);
      return h("li", {
        class: [
          nsSubMenu.b(),
          nsSubMenu.is("active", active.value),
          nsSubMenu.is("opened", opened.value),
          nsSubMenu.is("disabled", props.disabled)
        ],
        role: "menuitem",
        ariaHaspopup: true,
        ariaExpanded: opened.value,
        onMouseenter: handleMouseenter,
        onMouseleave: () => handleMouseleave(),
        onFocus: handleMouseenter
      }, [child]);
    };
  }
});
const nodeList = /* @__PURE__ */ new Map();
function createDocumentHandler(el, binding) {
  let excludes = [];
  if (shared_cjs_prodExports.isArray(binding.arg)) {
    excludes = binding.arg;
  } else if (isElement(binding.arg)) {
    excludes.push(binding.arg);
  }
  return function(mouseup, mousedown) {
    const popperRef = binding.instance.popperRef;
    const mouseUpTarget = mouseup.target;
    const mouseDownTarget = mousedown == null ? void 0 : mousedown.target;
    const isBound = !binding || !binding.instance;
    const isTargetExists = !mouseUpTarget || !mouseDownTarget;
    const isContainedByEl = el.contains(mouseUpTarget) || el.contains(mouseDownTarget);
    const isSelf = el === mouseUpTarget;
    const isTargetExcluded = excludes.length && excludes.some((item) => item == null ? void 0 : item.contains(mouseUpTarget)) || excludes.length && excludes.includes(mouseDownTarget);
    const isContainedByPopper = popperRef && (popperRef.contains(mouseUpTarget) || popperRef.contains(mouseDownTarget));
    if (isBound || isTargetExists || isContainedByEl || isSelf || isTargetExcluded || isContainedByPopper) {
      return;
    }
    binding.value(mouseup, mousedown);
  };
}
const ClickOutside = {
  beforeMount(el, binding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }
    nodeList.get(el).push({
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    });
  },
  updated(el, binding) {
    if (!nodeList.has(el)) {
      nodeList.set(el, []);
    }
    const handlers = nodeList.get(el);
    const oldHandlerIndex = handlers.findIndex((item) => item.bindingFn === binding.oldValue);
    const newHandler = {
      documentHandler: createDocumentHandler(el, binding),
      bindingFn: binding.value
    };
    if (oldHandlerIndex >= 0) {
      handlers.splice(oldHandlerIndex, 1, newHandler);
    } else {
      handlers.push(newHandler);
    }
  },
  unmounted(el) {
    nodeList.delete(el);
  }
};
const mutable = (val) => val;
const menuProps = buildProps({
  mode: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "vertical"
  },
  defaultActive: {
    type: String,
    default: ""
  },
  defaultOpeneds: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  uniqueOpened: Boolean,
  router: Boolean,
  menuTrigger: {
    type: String,
    values: ["hover", "click"],
    default: "hover"
  },
  collapse: Boolean,
  backgroundColor: String,
  textColor: String,
  activeTextColor: String,
  closeOnClickOutside: Boolean,
  collapseTransition: {
    type: Boolean,
    default: true
  },
  ellipsis: {
    type: Boolean,
    default: true
  },
  popperOffset: {
    type: Number,
    default: 6
  },
  ellipsisIcon: {
    type: iconPropType,
    default: () => more_default
  },
  popperEffect: {
    type: definePropType(String),
    default: "dark"
  },
  popperClass: String,
  showTimeout: {
    type: Number,
    default: 300
  },
  hideTimeout: {
    type: Number,
    default: 300
  },
  persistent: {
    type: Boolean,
    default: true
  }
});
const checkIndexPath = (indexPath) => shared_cjs_prodExports.isArray(indexPath) && indexPath.every((path) => shared_cjs_prodExports.isString(path));
const menuEmits = {
  close: (index2, indexPath) => shared_cjs_prodExports.isString(index2) && checkIndexPath(indexPath),
  open: (index2, indexPath) => shared_cjs_prodExports.isString(index2) && checkIndexPath(indexPath),
  select: (index2, indexPath, item, routerResult) => shared_cjs_prodExports.isString(index2) && checkIndexPath(indexPath) && shared_cjs_prodExports.isObject(item) && (isUndefined$1(routerResult) || routerResult instanceof Promise)
};
var Menu = defineComponent({
  name: "ElMenu",
  props: menuProps,
  emits: menuEmits,
  setup(props, { emit, slots, expose }) {
    const instance = getCurrentInstance();
    const router = instance.appContext.config.globalProperties.$router;
    const menu = ref();
    const subMenu = ref();
    const nsMenu = useNamespace("menu");
    const nsSubMenu = useNamespace("sub-menu");
    let moreItemWidth = 64;
    const sliceIndex = ref(-1);
    const openedMenus = ref(props.defaultOpeneds && !props.collapse ? props.defaultOpeneds.slice(0) : []);
    const activeIndex = ref(props.defaultActive);
    const items = ref({});
    const subMenus = ref({});
    const isMenuPopup = computed(() => props.mode === "horizontal" || props.mode === "vertical" && props.collapse);
    const initMenu = () => {
      const activeItem = activeIndex.value && items.value[activeIndex.value];
      if (!activeItem || props.mode === "horizontal" || props.collapse)
        return;
      const indexPath = activeItem.indexPath;
      indexPath.forEach((index2) => {
        const subMenu2 = subMenus.value[index2];
        subMenu2 && openMenu(index2, subMenu2.indexPath);
      });
    };
    const openMenu = (index2, indexPath) => {
      if (openedMenus.value.includes(index2))
        return;
      if (props.uniqueOpened) {
        openedMenus.value = openedMenus.value.filter((index22) => indexPath.includes(index22));
      }
      openedMenus.value.push(index2);
      emit("open", index2, indexPath);
    };
    const close = (index2) => {
      const i = openedMenus.value.indexOf(index2);
      if (i !== -1) {
        openedMenus.value.splice(i, 1);
      }
    };
    const closeMenu = (index2, indexPath) => {
      close(index2);
      emit("close", index2, indexPath);
    };
    const handleSubMenuClick = ({
      index: index2,
      indexPath
    }) => {
      const isOpened = openedMenus.value.includes(index2);
      isOpened ? closeMenu(index2, indexPath) : openMenu(index2, indexPath);
    };
    const handleMenuItemClick = (menuItem) => {
      if (props.mode === "horizontal" || props.collapse) {
        openedMenus.value = [];
      }
      const { index: index2, indexPath } = menuItem;
      if (isNil(index2) || isNil(indexPath))
        return;
      if (props.router && router) {
        const route = menuItem.route || index2;
        const routerResult = router.push(route).then((res) => {
          if (!res)
            activeIndex.value = index2;
          return res;
        });
        emit("select", index2, indexPath, { index: index2, indexPath, route }, routerResult);
      } else {
        activeIndex.value = index2;
        emit("select", index2, indexPath, { index: index2, indexPath });
      }
    };
    const updateActiveIndex = (val) => {
      var _a;
      const itemsInData = items.value;
      const item = itemsInData[val] || activeIndex.value && itemsInData[activeIndex.value] || itemsInData[props.defaultActive];
      activeIndex.value = (_a = item == null ? void 0 : item.index) != null ? _a : val;
    };
    const calcMenuItemWidth = (menuItem) => {
      const computedStyle = getComputedStyle(menuItem);
      const marginLeft = Number.parseInt(computedStyle.marginLeft, 10);
      const marginRight = Number.parseInt(computedStyle.marginRight, 10);
      return menuItem.offsetWidth + marginLeft + marginRight || 0;
    };
    const calcSliceIndex = () => {
      var _a, _b;
      if (!menu.value)
        return -1;
      const items2 = Array.from((_b = (_a = menu.value) == null ? void 0 : _a.childNodes) != null ? _b : []).filter((item) => item.nodeName !== "#comment" && (item.nodeName !== "#text" || item.nodeValue));
      const computedMenuStyle = getComputedStyle(menu.value);
      const paddingLeft = Number.parseInt(computedMenuStyle.paddingLeft, 10);
      const paddingRight = Number.parseInt(computedMenuStyle.paddingRight, 10);
      const menuWidth = menu.value.clientWidth - paddingLeft - paddingRight;
      let calcWidth = 0;
      let sliceIndex2 = 0;
      items2.forEach((item, index2) => {
        calcWidth += calcMenuItemWidth(item);
        if (calcWidth <= menuWidth - moreItemWidth) {
          sliceIndex2 = index2 + 1;
        }
      });
      return sliceIndex2 === items2.length ? -1 : sliceIndex2;
    };
    const getIndexPath = (index2) => subMenus.value[index2].indexPath;
    const debounce = (fn2, wait = 33.34) => {
      let timer;
      return () => {
        timer && clearTimeout(timer);
        timer = setTimeout(() => {
          fn2();
        }, wait);
      };
    };
    let isFirstTimeRender = true;
    const handleResize = () => {
      const el = unrefElement(subMenu);
      if (el)
        moreItemWidth = calcMenuItemWidth(el) || 64;
      if (sliceIndex.value === calcSliceIndex())
        return;
      const callback = () => {
        sliceIndex.value = -1;
        nextTick(() => {
          sliceIndex.value = calcSliceIndex();
        });
      };
      isFirstTimeRender ? callback() : debounce(callback)();
      isFirstTimeRender = false;
    };
    watch(() => props.defaultActive, (currentActive) => {
      if (!items.value[currentActive]) {
        activeIndex.value = "";
      }
      updateActiveIndex(currentActive);
    });
    watch(() => props.collapse, (value) => {
      if (value)
        openedMenus.value = [];
    });
    watch(items.value, initMenu);
    let resizeStopper;
    watchEffect(() => {
      if (props.mode === "horizontal" && props.ellipsis)
        resizeStopper = useResizeObserver(menu, handleResize).stop;
      else
        resizeStopper == null ? void 0 : resizeStopper();
    });
    const mouseInChild = ref(false);
    {
      const addSubMenu = (item) => {
        subMenus.value[item.index] = item;
      };
      const removeSubMenu = (item) => {
        delete subMenus.value[item.index];
      };
      const addMenuItem = (item) => {
        items.value[item.index] = item;
      };
      const removeMenuItem = (item) => {
        delete items.value[item.index];
      };
      provide(MENU_INJECTION_KEY, reactive({
        props,
        openedMenus,
        items,
        subMenus,
        activeIndex,
        isMenuPopup,
        addMenuItem,
        removeMenuItem,
        addSubMenu,
        removeSubMenu,
        openMenu,
        closeMenu,
        handleMenuItemClick,
        handleSubMenuClick
      }));
      provide(`${SUB_MENU_INJECTION_KEY}${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        mouseInChild,
        level: 0
      });
    }
    {
      const open = (index2) => {
        const { indexPath } = subMenus.value[index2];
        indexPath.forEach((i) => openMenu(i, indexPath));
      };
      expose({
        open,
        close,
        updateActiveIndex,
        handleResize
      });
    }
    const ulStyle = useMenuCssVar(props, 0);
    return () => {
      var _a, _b;
      let slot = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : [];
      const vShowMore = [];
      if (props.mode === "horizontal" && menu.value) {
        const originalSlot = flattedChildren(slot).filter((vnode) => {
          return (vnode == null ? void 0 : vnode.shapeFlag) !== 8;
        });
        const slotDefault = sliceIndex.value === -1 ? originalSlot : originalSlot.slice(0, sliceIndex.value);
        const slotMore = sliceIndex.value === -1 ? [] : originalSlot.slice(sliceIndex.value);
        if ((slotMore == null ? void 0 : slotMore.length) && props.ellipsis) {
          slot = slotDefault;
          vShowMore.push(h(SubMenu, {
            ref: subMenu,
            index: "sub-menu-more",
            class: nsSubMenu.e("hide-arrow"),
            popperOffset: props.popperOffset
          }, {
            title: () => h(ElIcon, {
              class: nsSubMenu.e("icon-more")
            }, {
              default: () => h(props.ellipsisIcon)
            }),
            default: () => slotMore
          }));
        }
      }
      const directives = props.closeOnClickOutside ? [
        [
          ClickOutside,
          () => {
            if (!openedMenus.value.length)
              return;
            if (!mouseInChild.value) {
              openedMenus.value.forEach((openedMenu) => emit("close", openedMenu, getIndexPath(openedMenu)));
              openedMenus.value = [];
            }
          }
        ]
      ] : [];
      const vMenu = withDirectives(h("ul", {
        key: String(props.collapse),
        role: "menubar",
        ref: menu,
        style: ulStyle.value,
        class: {
          [nsMenu.b()]: true,
          [nsMenu.m(props.mode)]: true,
          [nsMenu.m("collapse")]: props.collapse
        }
      }, [...slot, ...vShowMore]), directives);
      if (props.collapseTransition && props.mode === "vertical") {
        return h(ElMenuCollapseTransition, () => vMenu);
      }
      return vMenu;
    };
  }
});
const menuItemProps = buildProps({
  index: {
    type: definePropType([String, null]),
    default: null
  },
  route: {
    type: definePropType([String, Object])
  },
  disabled: Boolean
});
const menuItemEmits = {
  click: (item) => shared_cjs_prodExports.isString(item.index) && shared_cjs_prodExports.isArray(item.indexPath)
};
const COMPONENT_NAME = "ElMenuItem";
const __default__$2 = defineComponent({
  name: COMPONENT_NAME
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  ...__default__$2,
  props: menuItemProps,
  emits: menuItemEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    isPropAbsent(props.index) && debugWarn();
    const instance = getCurrentInstance();
    const rootMenu = inject(MENU_INJECTION_KEY);
    const nsMenu = useNamespace("menu");
    const nsMenuItem = useNamespace("menu-item");
    if (!rootMenu)
      throwError(COMPONENT_NAME, "can not inject root menu");
    const { parentMenu, indexPath } = useMenu(instance, toRef(props, "index"));
    const subMenu = inject(`${SUB_MENU_INJECTION_KEY}${parentMenu.value.uid}`);
    if (!subMenu)
      throwError(COMPONENT_NAME, "can not inject sub menu");
    const active = computed(() => props.index === rootMenu.activeIndex);
    const item = reactive({
      index: props.index,
      indexPath,
      active
    });
    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.handleMenuItemClick({
          index: props.index,
          indexPath: indexPath.value,
          route: props.route
        });
        emit("click", item);
      }
    };
    expose({
      parentMenu,
      rootMenu,
      active,
      nsMenu,
      nsMenuItem,
      handleClick
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", {
        class: normalizeClass([
          unref(nsMenuItem).b(),
          unref(nsMenuItem).is("active", unref(active)),
          unref(nsMenuItem).is("disabled", _ctx.disabled)
        ]),
        role: "menuitem",
        tabindex: "-1",
        onClick: handleClick
      }, [
        unref(parentMenu).type.name === "ElMenu" && unref(rootMenu).props.collapse && _ctx.$slots.title ? (openBlock(), createBlock(unref(ElTooltip), {
          key: 0,
          effect: unref(rootMenu).props.popperEffect,
          placement: "right",
          "fallback-placements": ["left"],
          persistent: unref(rootMenu).props.persistent,
          "focus-on-target": ""
        }, {
          content: withCtx(() => [
            renderSlot(_ctx.$slots, "title")
          ]),
          default: withCtx(() => [
            createElementVNode("div", {
              class: normalizeClass(unref(nsMenu).be("tooltip", "trigger"))
            }, [
              renderSlot(_ctx.$slots, "default")
            ], 2)
          ]),
          _: 3
        }, 8, ["effect", "persistent"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
          renderSlot(_ctx.$slots, "default"),
          renderSlot(_ctx.$slots, "title")
        ], 64))
      ], 2);
    };
  }
});
var MenuItem = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__file", "menu-item.vue"]]);
const menuItemGroupProps = {
  title: String
};
const __default__$1 = defineComponent({
  name: "ElMenuItemGroup"
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: menuItemGroupProps,
  setup(__props) {
    const ns = useNamespace("menu-item-group");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("li", {
        class: normalizeClass(unref(ns).b())
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(ns).e("title"))
        }, [
          !_ctx.$slots.title ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
            createTextVNode(toDisplayString(_ctx.title), 1)
          ], 64)) : renderSlot(_ctx.$slots, "title", { key: 1 })
        ], 2),
        createElementVNode("ul", null, [
          renderSlot(_ctx.$slots, "default")
        ])
      ], 2);
    };
  }
});
var MenuItemGroup = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__file", "menu-item-group.vue"]]);
const ElMenu = withInstall(Menu, {
  MenuItem,
  MenuItemGroup,
  SubMenu
});
const ElMenuItem = withNoopInstall(MenuItem);
withNoopInstall(MenuItemGroup);
withNoopInstall(SubMenu);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "Navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const activeIndex = ref("demo");
    const menuVisible = ref(false);
    const handleSelect = (index2) => {
      activeIndex.value = index2;
      menuVisible.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_header = ElHeader;
      const _component_el_container = ElContainer;
      const _component_el_icon = ElIcon;
      const _component_el_drawer = ElDrawer;
      const _component_el_menu = ElMenu;
      const _component_el_menu_item = ElMenuItem;
      _push(ssrRenderComponent(_component_el_header, mergeProps({
        class: "sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700",
        style: { "height": "auto", "padding": "12px 0" }
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_container, { class: "px-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center justify-between" data-v-3183d888${_scopeId2}><div class="flex items-center" data-v-3183d888${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_icon, {
                    size: 28,
                    color: "white",
                    class: "bg-blue-600 text-white p-1 rounded-full mr-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(document_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(document_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="flex flex-col" data-v-3183d888${_scopeId2}><span class="text-xl font-bold text-gray-900 dark:text-white" data-v-3183d888${_scopeId2}>法智调</span><span class="text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full self-start" data-v-3183d888${_scopeId2}>智能法律调解助手</span></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "flex items-center" }, [
                        createVNode(_component_el_icon, {
                          size: 28,
                          color: "white",
                          class: "bg-blue-600 text-white p-1 rounded-full mr-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(document_default))
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "flex flex-col" }, [
                          createVNode("span", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "法智调"),
                          createVNode("span", { class: "text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full self-start" }, "智能法律调解助手")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_drawer, {
              modelValue: unref(menuVisible),
              "onUpdate:modelValue": ($event) => isRef(menuVisible) ? menuVisible.value = $event : null,
              direction: "ttb",
              "with-header": false,
              class: "bg-white dark:bg-gray-900"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_el_menu, {
                    mode: "vertical",
                    class: "py-4",
                    onSelect: handleSelect
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_el_menu_item, { index: "overview" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<a href="#overview" data-v-3183d888${_scopeId4}>项目概述</a>`);
                            } else {
                              return [
                                createVNode("a", {
                                  href: "#overview",
                                  onClick: ($event) => menuVisible.value = false
                                }, "项目概述", 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_menu_item, { index: "features" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<a href="#features" data-v-3183d888${_scopeId4}>核心功能</a>`);
                            } else {
                              return [
                                createVNode("a", {
                                  href: "#features",
                                  onClick: ($event) => menuVisible.value = false
                                }, "核心功能", 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_menu_item, { index: "cases" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<a href="#cases" data-v-3183d888${_scopeId4}>案例展示</a>`);
                            } else {
                              return [
                                createVNode("a", {
                                  href: "#cases",
                                  onClick: ($event) => menuVisible.value = false
                                }, "案例展示", 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_el_menu_item, { index: "demo" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<a href="#demo" data-v-3183d888${_scopeId4}>在线演示</a>`);
                            } else {
                              return [
                                createVNode("a", {
                                  href: "#demo",
                                  onClick: ($event) => menuVisible.value = false
                                }, "在线演示", 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_el_menu_item, { index: "overview" }, {
                            default: withCtx(() => [
                              createVNode("a", {
                                href: "#overview",
                                onClick: ($event) => menuVisible.value = false
                              }, "项目概述", 8, ["onClick"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_menu_item, { index: "features" }, {
                            default: withCtx(() => [
                              createVNode("a", {
                                href: "#features",
                                onClick: ($event) => menuVisible.value = false
                              }, "核心功能", 8, ["onClick"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_menu_item, { index: "cases" }, {
                            default: withCtx(() => [
                              createVNode("a", {
                                href: "#cases",
                                onClick: ($event) => menuVisible.value = false
                              }, "案例展示", 8, ["onClick"])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_el_menu_item, { index: "demo" }, {
                            default: withCtx(() => [
                              createVNode("a", {
                                href: "#demo",
                                onClick: ($event) => menuVisible.value = false
                              }, "在线演示", 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_el_menu, {
                      mode: "vertical",
                      class: "py-4",
                      onSelect: handleSelect
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_el_menu_item, { index: "overview" }, {
                          default: withCtx(() => [
                            createVNode("a", {
                              href: "#overview",
                              onClick: ($event) => menuVisible.value = false
                            }, "项目概述", 8, ["onClick"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_menu_item, { index: "features" }, {
                          default: withCtx(() => [
                            createVNode("a", {
                              href: "#features",
                              onClick: ($event) => menuVisible.value = false
                            }, "核心功能", 8, ["onClick"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_menu_item, { index: "cases" }, {
                          default: withCtx(() => [
                            createVNode("a", {
                              href: "#cases",
                              onClick: ($event) => menuVisible.value = false
                            }, "案例展示", 8, ["onClick"])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_el_menu_item, { index: "demo" }, {
                          default: withCtx(() => [
                            createVNode("a", {
                              href: "#demo",
                              onClick: ($event) => menuVisible.value = false
                            }, "在线演示", 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_container, { class: "px-4" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "flex items-center justify-between" }, [
                    createVNode("div", { class: "flex items-center" }, [
                      createVNode(_component_el_icon, {
                        size: 28,
                        color: "white",
                        class: "bg-blue-600 text-white p-1 rounded-full mr-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(document_default))
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "flex flex-col" }, [
                        createVNode("span", { class: "text-xl font-bold text-gray-900 dark:text-white" }, "法智调"),
                        createVNode("span", { class: "text-xs text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-full self-start" }, "智能法律调解助手")
                      ])
                    ])
                  ])
                ]),
                _: 1
              }),
              createVNode(_component_el_drawer, {
                modelValue: unref(menuVisible),
                "onUpdate:modelValue": ($event) => isRef(menuVisible) ? menuVisible.value = $event : null,
                direction: "ttb",
                "with-header": false,
                class: "bg-white dark:bg-gray-900"
              }, {
                default: withCtx(() => [
                  createVNode(_component_el_menu, {
                    mode: "vertical",
                    class: "py-4",
                    onSelect: handleSelect
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_el_menu_item, { index: "overview" }, {
                        default: withCtx(() => [
                          createVNode("a", {
                            href: "#overview",
                            onClick: ($event) => menuVisible.value = false
                          }, "项目概述", 8, ["onClick"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_menu_item, { index: "features" }, {
                        default: withCtx(() => [
                          createVNode("a", {
                            href: "#features",
                            onClick: ($event) => menuVisible.value = false
                          }, "核心功能", 8, ["onClick"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_menu_item, { index: "cases" }, {
                        default: withCtx(() => [
                          createVNode("a", {
                            href: "#cases",
                            onClick: ($event) => menuVisible.value = false
                          }, "案例展示", 8, ["onClick"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_menu_item, { index: "demo" }, {
                        default: withCtx(() => [
                          createVNode("a", {
                            href: "#demo",
                            onClick: ($event) => menuVisible.value = false
                          }, "在线演示", 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Navbar.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const Navbar = /* @__PURE__ */ Object.assign(_export_sfc$1(_sfc_main$6, [["__scopeId", "data-v-3183d888"]]), { __name: "Navbar" });
const cardProps = buildProps({
  header: {
    type: String,
    default: ""
  },
  footer: {
    type: String,
    default: ""
  },
  bodyStyle: {
    type: definePropType([String, Object, Array]),
    default: ""
  },
  headerClass: String,
  bodyClass: String,
  footerClass: String,
  shadow: {
    type: String,
    values: ["always", "hover", "never"],
    default: void 0
  }
});
const __default__ = defineComponent({
  name: "ElCard"
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: cardProps,
  setup(__props) {
    const globalConfig2 = useGlobalConfig("card");
    const ns = useNamespace("card");
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).is(`${_ctx.shadow || ((_a = unref(globalConfig2)) == null ? void 0 : _a.shadow) || "always"}-shadow`)
        ])
      }, [
        _ctx.$slots.header || _ctx.header ? (openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass([unref(ns).e("header"), _ctx.headerClass])
        }, [
          renderSlot(_ctx.$slots, "header", {}, () => [
            createTextVNode(toDisplayString(_ctx.header), 1)
          ])
        ], 2)) : createCommentVNode("v-if", true),
        createElementVNode("div", {
          class: normalizeClass([unref(ns).e("body"), _ctx.bodyClass]),
          style: normalizeStyle(_ctx.bodyStyle)
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 6),
        _ctx.$slots.footer || _ctx.footer ? (openBlock(), createElementBlock("div", {
          key: 1,
          class: normalizeClass([unref(ns).e("footer"), _ctx.footerClass])
        }, [
          renderSlot(_ctx.$slots, "footer", {}, () => [
            createTextVNode(toDisplayString(_ctx.footer), 1)
          ])
        ], 2)) : createCommentVNode("v-if", true)
      ], 2);
    };
  }
});
var Card = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__file", "card.vue"]]);
const ElCard = withInstall(Card);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "HeroSection",
  __ssrInlineRender: true,
  setup(__props) {
    const chatContainer = ref(null);
    const displayedMessages = ref([]);
    ref(true);
    const quickLinks = ref([
      {
        name: "Code",
        icon: "/icons/icon-github.svg",
        iconSize: 24
      },
      {
        name: "model",
        icon: "/icons/icon-huggingface.svg",
        iconSize: 24
      },
      {
        name: "Page",
        icon: "/icons/icon-page.svg",
        iconSize: 24
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_container = ElContainer;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_el_icon = ElIcon;
      const _component_el_card = ElCard;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "relative py-20 overflow-hidden px-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_el_container, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex flex-col justify-around items-center space-y-6 mx-auto py-4"${_scopeId}><h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight"${_scopeId}> 智能法律调解， <span class="text-blue-600 dark:text-blue-400"${_scopeId}>让纠纷解决更高效</span></h2><p class="w-fit text-lg text-gray-600 dark:text-gray-300"${_scopeId}> 法智调是一款基于先进AI技术的法院特邀调解员系统，专为银行欠款、财务纠纷等场景提供智能调解服务， 帮助客户找到合适的还款方案，维护双方合法权益。 </p><div class="flex items-center space-x-4 pt-4"${_scopeId}><div class="flex items-center space-x-4"${_scopeId}><!--[-->`);
            ssrRenderList(quickLinks.value, (quickLink, idx) => {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                key: idx,
                to: "https://github.com",
                target: "_blank"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer bg-white shadow-md rounded-full p-3"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_el_icon, {
                      size: quickLink.iconSize
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<img${ssrRenderAttr("src", quickLink.icon)} alt="icon"${_scopeId3}>`);
                        } else {
                          return [
                            createVNode("img", {
                              src: quickLink.icon,
                              alt: "icon"
                            }, null, 8, ["src"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`<span${_scopeId2}>${ssrInterpolate(quickLink.name)}</span></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer bg-white shadow-md rounded-full p-3" }, [
                        createVNode(_component_el_icon, {
                          size: quickLink.iconSize
                        }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              src: quickLink.icon,
                              alt: "icon"
                            }, null, 8, ["src"])
                          ]),
                          _: 2
                        }, 1032, ["size"]),
                        createVNode("span", null, toDisplayString(quickLink.name), 1)
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]--></div></div></div>`);
          } else {
            return [
              createVNode("div", { class: "flex flex-col justify-around items-center space-y-6 mx-auto py-4" }, [
                createVNode("h2", { class: "text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight" }, [
                  createTextVNode(" 智能法律调解， "),
                  createVNode("span", { class: "text-blue-600 dark:text-blue-400" }, "让纠纷解决更高效")
                ]),
                createVNode("p", { class: "w-fit text-lg text-gray-600 dark:text-gray-300" }, " 法智调是一款基于先进AI技术的法院特邀调解员系统，专为银行欠款、财务纠纷等场景提供智能调解服务， 帮助客户找到合适的还款方案，维护双方合法权益。 "),
                createVNode("div", { class: "flex items-center space-x-4 pt-4" }, [
                  createVNode("div", { class: "flex items-center space-x-4" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(quickLinks.value, (quickLink, idx) => {
                      return openBlock(), createBlock(_component_NuxtLink, {
                        key: idx,
                        to: "https://github.com",
                        target: "_blank"
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "flex items-center space-x-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-pointer bg-white shadow-md rounded-full p-3" }, [
                            createVNode(_component_el_icon, {
                              size: quickLink.iconSize
                            }, {
                              default: withCtx(() => [
                                createVNode("img", {
                                  src: quickLink.icon,
                                  alt: "icon"
                                }, null, 8, ["src"])
                              ]),
                              _: 2
                            }, 1032, ["size"]),
                            createVNode("span", null, toDisplayString(quickLink.name), 1)
                          ])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="relative">`);
      _push(ssrRenderComponent(_component_el_card, { class: "border border-gray-200 dark:border-gray-700 shadow-xl w-full" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between w-full"${_scopeId}><div class="flex space-x-2"${_scopeId}><div class="w-3 h-3 rounded-full bg-red-400"${_scopeId}></div><div class="w-3 h-3 rounded-full bg-yellow-400"${_scopeId}></div><div class="w-3 h-3 rounded-full bg-green-400"${_scopeId}></div></div></div><div id="demo" class="p-4 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 box-border"${_scopeId}><div class="chat-container"${_scopeId}><!--[-->`);
            ssrRenderList(displayedMessages.value, (message, index2) => {
              _push2(`<div class="${ssrRenderClass(
                message.from === "human" ? "flex justify-end mb-4" : "flex justify-start mb-4"
              )}"${_scopeId}>`);
              if (message.from === "gpt") {
                _push2(`<div class="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0"${_scopeId}> 法 </div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="${ssrRenderClass(
                message.from === "gpt" ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-4 rounded-lg rounded-bl-none max-w-[80%]" : "bg-blue-600 text-white p-4 rounded-lg rounded-br-none max-w-[80%]"
              )}"${_scopeId}>${message.htmlContent ?? ""}</div></div>`);
            });
            _push2(`<!--]--></div></div>`);
          } else {
            return [
              createVNode("div", { class: "bg-gray-50 dark:bg-gray-900 px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between w-full" }, [
                createVNode("div", { class: "flex space-x-2" }, [
                  createVNode("div", { class: "w-3 h-3 rounded-full bg-red-400" }),
                  createVNode("div", { class: "w-3 h-3 rounded-full bg-yellow-400" }),
                  createVNode("div", { class: "w-3 h-3 rounded-full bg-green-400" })
                ])
              ]),
              createVNode("div", {
                id: "demo",
                ref_key: "chatContainer",
                ref: chatContainer,
                class: "p-4 h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 box-border"
              }, [
                createVNode("div", { class: "chat-container" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(displayedMessages.value, (message, index2) => {
                    return openBlock(), createBlock("div", {
                      key: index2,
                      class: message.from === "human" ? "flex justify-end mb-4" : "flex justify-start mb-4"
                    }, [
                      message.from === "gpt" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-2 flex-shrink-0"
                      }, " 法 ")) : createCommentVNode("", true),
                      createVNode("div", {
                        class: message.from === "gpt" ? "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white p-4 rounded-lg rounded-bl-none max-w-[80%]" : "bg-blue-600 text-white p-4 rounded-lg rounded-br-none max-w-[80%]",
                        innerHTML: message.htmlContent
                      }, null, 10, ["innerHTML"])
                    ], 2);
                  }), 128))
                ])
              ], 512)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/HeroSection.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const HeroSection = Object.assign(_sfc_main$4, { __name: "HeroSection" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "OverviewSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_container = ElContainer;
      const _component_el_main = ElMain;
      const _component_el_card = ElCard;
      const _component_el_icon = ElIcon;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "overview",
        class: "py-20 bg-white dark:bg-gray-900 px-4"
      }, _attrs))} data-v-28105c84>`);
      _push(ssrRenderComponent(_component_el_container, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_main, { class: "grid lg:grid-cols-2 gap-12 md:grid-cols-1 sm:grid-cols-1 items-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="max-w-3xl mx-auto text-center mb-16 px-2" data-v-28105c84${_scopeId2}><h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6" data-v-28105c84${_scopeId2}> 项目概述 </h2><p class="text-lg text-gray-600 dark:text-gray-300" data-v-28105c84${_scopeId2}> 法智调是一款面向法院调解场景的智能助手系统，旨在通过AI技术提升调解效率，降低司法成本， 为金融纠纷提供公平、公正、高效的解决方案。 </p></div><div class="grid md:grid-cols-3 gap-8" data-v-28105c84${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_card, { class: "border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-8" data-v-28105c84${_scopeId3}><div class="flex flex-col items-center text-center" data-v-28105c84${_scopeId3}><div class="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6" data-v-28105c84${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_icon, {
                          size: "32",
                          class: "text-blue-600"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(chat_dot_round_default), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(chat_dot_round_default))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3" data-v-28105c84${_scopeId3}> 智能调解 </h3><p class="text-gray-600 dark:text-gray-400" data-v-28105c84${_scopeId3}> 基于大语言模型的智能调解对话系统，能够理解复杂的纠纷情况，提供专业的法律建议和还款方案。 </p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-8" }, [
                            createVNode("div", { class: "flex flex-col items-center text-center" }, [
                              createVNode("div", { class: "w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6" }, [
                                createVNode(_component_el_icon, {
                                  size: "32",
                                  class: "text-blue-600"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(chat_dot_round_default))
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-3" }, " 智能调解 "),
                              createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 基于大语言模型的智能调解对话系统，能够理解复杂的纠纷情况，提供专业的法律建议和还款方案。 ")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_card, { class: "border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-8" data-v-28105c84${_scopeId3}><div class="flex flex-col items-center text-center" data-v-28105c84${_scopeId3}><div class="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6" data-v-28105c84${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_icon, {
                          size: "32",
                          class: "text-blue-600 dark:text-blue-400"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<svg t="1759417031265" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1572" width="200" height="200" data-v-28105c84${_scopeId4}><path d="M1020.52 478.23c-1.91-11.62-12.11-20.18-23.93-20.18h-11.64L866.73 146.08l1.94-5.11h20.16v0.03c16.34 0 29.53-16.59 29.53-37.08s-13.19-37.08-29.51-37.08H134.72c-16.35 0-29.56 16.59-29.56 37.11 0 20.46 13.21 37.01 29.53 37.01h17.78l1.95 5.14L36.2 458.08h-7.41c-11.84 0-22.02 8.56-23.93 20.18-1.53 8.98-2.17 16.54-2.17 23.86 0 90.64 83.37 164.37 185.86 164.4v-0.02c102.62 0 186-73.73 186-164.37 0-7.32-0.64-14.88-2.17-23.86-1.91-11.62-12.11-20.18-23.93-20.18h-11.64L218.59 146.11l1.95-5.14h257.19v735.9c0 2.12 0.42 4.18 1.21 6.14H366.39c-17.83 0-32.33 17.5-32.33 38.99 0 21.46 14.5 38.99 32.33 38.99H657.4c8.54 0.06 16.75-4.02 22.82-11.34 6.07-7.31 9.49-17.27 9.51-27.65 0-21.49-14.5-38.99-32.33-38.99H549.76c0.81-1.99 1.24-4.09 1.24-6.25v-735.8h249.63l1.94 5.11-118.22 311.98h-7.41c-11.84 0-22.02 8.56-23.93 20.18-1.53 8.98-2.17 16.54-2.17 23.86 0 90.64 83.37 164.37 185.86 164.4v-0.02c102.62 0 186-73.73 186-164.37-0.01-7.33-0.65-14.88-2.18-23.87zM188.93 601c-61.4 0-111.51-36.97-113.62-83h227.22c-2.09 46.03-52.21 83-113.6 83z m83.71-142.92H100.37l86.14-227.31 86.13 227.31z m562.01-227.34l86.14 227.31H748.51l86.14-227.31z m2.43 370.23c-61.4 0-111.51-36.97-113.62-83h227.22c-2.09 46.03-52.22 83-113.6 83z" p-id="1573" fill="#2c2c2c" data-v-28105c84${_scopeId4}></path></svg>`);
                            } else {
                              return [
                                (openBlock(), createBlock("svg", {
                                  t: "1759417031265",
                                  class: "icon",
                                  viewBox: "0 0 1024 1024",
                                  version: "1.1",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  "p-id": "1572",
                                  width: "200",
                                  height: "200"
                                }, [
                                  createVNode("path", {
                                    d: "M1020.52 478.23c-1.91-11.62-12.11-20.18-23.93-20.18h-11.64L866.73 146.08l1.94-5.11h20.16v0.03c16.34 0 29.53-16.59 29.53-37.08s-13.19-37.08-29.51-37.08H134.72c-16.35 0-29.56 16.59-29.56 37.11 0 20.46 13.21 37.01 29.53 37.01h17.78l1.95 5.14L36.2 458.08h-7.41c-11.84 0-22.02 8.56-23.93 20.18-1.53 8.98-2.17 16.54-2.17 23.86 0 90.64 83.37 164.37 185.86 164.4v-0.02c102.62 0 186-73.73 186-164.37 0-7.32-0.64-14.88-2.17-23.86-1.91-11.62-12.11-20.18-23.93-20.18h-11.64L218.59 146.11l1.95-5.14h257.19v735.9c0 2.12 0.42 4.18 1.21 6.14H366.39c-17.83 0-32.33 17.5-32.33 38.99 0 21.46 14.5 38.99 32.33 38.99H657.4c8.54 0.06 16.75-4.02 22.82-11.34 6.07-7.31 9.49-17.27 9.51-27.65 0-21.49-14.5-38.99-32.33-38.99H549.76c0.81-1.99 1.24-4.09 1.24-6.25v-735.8h249.63l1.94 5.11-118.22 311.98h-7.41c-11.84 0-22.02 8.56-23.93 20.18-1.53 8.98-2.17 16.54-2.17 23.86 0 90.64 83.37 164.37 185.86 164.4v-0.02c102.62 0 186-73.73 186-164.37-0.01-7.33-0.65-14.88-2.18-23.87zM188.93 601c-61.4 0-111.51-36.97-113.62-83h227.22c-2.09 46.03-52.21 83-113.6 83z m83.71-142.92H100.37l86.14-227.31 86.13 227.31z m562.01-227.34l86.14 227.31H748.51l86.14-227.31z m2.43 370.23c-61.4 0-111.51-36.97-113.62-83h227.22c-2.09 46.03-52.22 83-113.6 83z",
                                    "p-id": "1573",
                                    fill: "#2c2c2c"
                                  })
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3" data-v-28105c84${_scopeId3}> 公平公正 </h3><p class="text-gray-600 dark:text-gray-400" data-v-28105c84${_scopeId3}> 严格遵循法律法规和调解原则，确保解决方案公平合理，维护双方当事人的合法权益。 </p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-8" }, [
                            createVNode("div", { class: "flex flex-col items-center text-center" }, [
                              createVNode("div", { class: "w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6" }, [
                                createVNode(_component_el_icon, {
                                  size: "32",
                                  class: "text-blue-600 dark:text-blue-400"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock("svg", {
                                      t: "1759417031265",
                                      class: "icon",
                                      viewBox: "0 0 1024 1024",
                                      version: "1.1",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      "p-id": "1572",
                                      width: "200",
                                      height: "200"
                                    }, [
                                      createVNode("path", {
                                        d: "M1020.52 478.23c-1.91-11.62-12.11-20.18-23.93-20.18h-11.64L866.73 146.08l1.94-5.11h20.16v0.03c16.34 0 29.53-16.59 29.53-37.08s-13.19-37.08-29.51-37.08H134.72c-16.35 0-29.56 16.59-29.56 37.11 0 20.46 13.21 37.01 29.53 37.01h17.78l1.95 5.14L36.2 458.08h-7.41c-11.84 0-22.02 8.56-23.93 20.18-1.53 8.98-2.17 16.54-2.17 23.86 0 90.64 83.37 164.37 185.86 164.4v-0.02c102.62 0 186-73.73 186-164.37 0-7.32-0.64-14.88-2.17-23.86-1.91-11.62-12.11-20.18-23.93-20.18h-11.64L218.59 146.11l1.95-5.14h257.19v735.9c0 2.12 0.42 4.18 1.21 6.14H366.39c-17.83 0-32.33 17.5-32.33 38.99 0 21.46 14.5 38.99 32.33 38.99H657.4c8.54 0.06 16.75-4.02 22.82-11.34 6.07-7.31 9.49-17.27 9.51-27.65 0-21.49-14.5-38.99-32.33-38.99H549.76c0.81-1.99 1.24-4.09 1.24-6.25v-735.8h249.63l1.94 5.11-118.22 311.98h-7.41c-11.84 0-22.02 8.56-23.93 20.18-1.53 8.98-2.17 16.54-2.17 23.86 0 90.64 83.37 164.37 185.86 164.4v-0.02c102.62 0 186-73.73 186-164.37-0.01-7.33-0.65-14.88-2.18-23.87zM188.93 601c-61.4 0-111.51-36.97-113.62-83h227.22c-2.09 46.03-52.21 83-113.6 83z m83.71-142.92H100.37l86.14-227.31 86.13 227.31z m562.01-227.34l86.14 227.31H748.51l86.14-227.31z m2.43 370.23c-61.4 0-111.51-36.97-113.62-83h227.22c-2.09 46.03-52.22 83-113.6 83z",
                                        "p-id": "1573",
                                        fill: "#2c2c2c"
                                      })
                                    ]))
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-3" }, " 公平公正 "),
                              createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 严格遵循法律法规和调解原则，确保解决方案公平合理，维护双方当事人的合法权益。 ")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_el_card, { class: "border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="p-8" data-v-28105c84${_scopeId3}><div class="flex flex-col items-center text-center" data-v-28105c84${_scopeId3}><div class="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6" data-v-28105c84${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_icon, {
                          size: "32",
                          class: "text-blue-600 dark:text-blue-400"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(clock_default), null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(clock_default))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-3" data-v-28105c84${_scopeId3}> 高效便捷 </h3><p class="text-gray-600 dark:text-gray-400" data-v-28105c84${_scopeId3}> 7×24小时在线服务，无需等待，快速响应，大大缩短调解周期，提高纠纷解决效率。 </p></div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "p-8" }, [
                            createVNode("div", { class: "flex flex-col items-center text-center" }, [
                              createVNode("div", { class: "w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6" }, [
                                createVNode(_component_el_icon, {
                                  size: "32",
                                  class: "text-blue-600 dark:text-blue-400"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(clock_default))
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-3" }, " 高效便捷 "),
                              createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 7×24小时在线服务，无需等待，快速响应，大大缩短调解周期，提高纠纷解决效率。 ")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "max-w-3xl mx-auto text-center mb-16 px-2" }, [
                      createVNode("h2", { class: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6" }, " 项目概述 "),
                      createVNode("p", { class: "text-lg text-gray-600 dark:text-gray-300" }, " 法智调是一款面向法院调解场景的智能助手系统，旨在通过AI技术提升调解效率，降低司法成本， 为金融纠纷提供公平、公正、高效的解决方案。 ")
                    ]),
                    createVNode("div", { class: "grid md:grid-cols-3 gap-8" }, [
                      createVNode(_component_el_card, { class: "border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-8" }, [
                            createVNode("div", { class: "flex flex-col items-center text-center" }, [
                              createVNode("div", { class: "w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6" }, [
                                createVNode(_component_el_icon, {
                                  size: "32",
                                  class: "text-blue-600"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(chat_dot_round_default))
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-3" }, " 智能调解 "),
                              createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 基于大语言模型的智能调解对话系统，能够理解复杂的纠纷情况，提供专业的法律建议和还款方案。 ")
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_card, { class: "border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-8" }, [
                            createVNode("div", { class: "flex flex-col items-center text-center" }, [
                              createVNode("div", { class: "w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6" }, [
                                createVNode(_component_el_icon, {
                                  size: "32",
                                  class: "text-blue-600 dark:text-blue-400"
                                }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock("svg", {
                                      t: "1759417031265",
                                      class: "icon",
                                      viewBox: "0 0 1024 1024",
                                      version: "1.1",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      "p-id": "1572",
                                      width: "200",
                                      height: "200"
                                    }, [
                                      createVNode("path", {
                                        d: "M1020.52 478.23c-1.91-11.62-12.11-20.18-23.93-20.18h-11.64L866.73 146.08l1.94-5.11h20.16v0.03c16.34 0 29.53-16.59 29.53-37.08s-13.19-37.08-29.51-37.08H134.72c-16.35 0-29.56 16.59-29.56 37.11 0 20.46 13.21 37.01 29.53 37.01h17.78l1.95 5.14L36.2 458.08h-7.41c-11.84 0-22.02 8.56-23.93 20.18-1.53 8.98-2.17 16.54-2.17 23.86 0 90.64 83.37 164.37 185.86 164.4v-0.02c102.62 0 186-73.73 186-164.37 0-7.32-0.64-14.88-2.17-23.86-1.91-11.62-12.11-20.18-23.93-20.18h-11.64L218.59 146.11l1.95-5.14h257.19v735.9c0 2.12 0.42 4.18 1.21 6.14H366.39c-17.83 0-32.33 17.5-32.33 38.99 0 21.46 14.5 38.99 32.33 38.99H657.4c8.54 0.06 16.75-4.02 22.82-11.34 6.07-7.31 9.49-17.27 9.51-27.65 0-21.49-14.5-38.99-32.33-38.99H549.76c0.81-1.99 1.24-4.09 1.24-6.25v-735.8h249.63l1.94 5.11-118.22 311.98h-7.41c-11.84 0-22.02 8.56-23.93 20.18-1.53 8.98-2.17 16.54-2.17 23.86 0 90.64 83.37 164.37 185.86 164.4v-0.02c102.62 0 186-73.73 186-164.37-0.01-7.33-0.65-14.88-2.18-23.87zM188.93 601c-61.4 0-111.51-36.97-113.62-83h227.22c-2.09 46.03-52.21 83-113.6 83z m83.71-142.92H100.37l86.14-227.31 86.13 227.31z m562.01-227.34l86.14 227.31H748.51l86.14-227.31z m2.43 370.23c-61.4 0-111.51-36.97-113.62-83h227.22c-2.09 46.03-52.22 83-113.6 83z",
                                        "p-id": "1573",
                                        fill: "#2c2c2c"
                                      })
                                    ]))
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-3" }, " 公平公正 "),
                              createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 严格遵循法律法规和调解原则，确保解决方案公平合理，维护双方当事人的合法权益。 ")
                            ])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_el_card, { class: "border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1" }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "p-8" }, [
                            createVNode("div", { class: "flex flex-col items-center text-center" }, [
                              createVNode("div", { class: "w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6" }, [
                                createVNode(_component_el_icon, {
                                  size: "32",
                                  class: "text-blue-600 dark:text-blue-400"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(unref(clock_default))
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-3" }, " 高效便捷 "),
                              createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 7×24小时在线服务，无需等待，快速响应，大大缩短调解周期，提高纠纷解决效率。 ")
                            ])
                          ])
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_main, { class: "grid lg:grid-cols-2 gap-12 md:grid-cols-1 sm:grid-cols-1 items-center" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "max-w-3xl mx-auto text-center mb-16 px-2" }, [
                    createVNode("h2", { class: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6" }, " 项目概述 "),
                    createVNode("p", { class: "text-lg text-gray-600 dark:text-gray-300" }, " 法智调是一款面向法院调解场景的智能助手系统，旨在通过AI技术提升调解效率，降低司法成本， 为金融纠纷提供公平、公正、高效的解决方案。 ")
                  ]),
                  createVNode("div", { class: "grid md:grid-cols-3 gap-8" }, [
                    createVNode(_component_el_card, { class: "border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-8" }, [
                          createVNode("div", { class: "flex flex-col items-center text-center" }, [
                            createVNode("div", { class: "w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6" }, [
                              createVNode(_component_el_icon, {
                                size: "32",
                                class: "text-blue-600"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(chat_dot_round_default))
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-3" }, " 智能调解 "),
                            createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 基于大语言模型的智能调解对话系统，能够理解复杂的纠纷情况，提供专业的法律建议和还款方案。 ")
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_card, { class: "border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-8" }, [
                          createVNode("div", { class: "flex flex-col items-center text-center" }, [
                            createVNode("div", { class: "w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6" }, [
                              createVNode(_component_el_icon, {
                                size: "32",
                                class: "text-blue-600 dark:text-blue-400"
                              }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock("svg", {
                                    t: "1759417031265",
                                    class: "icon",
                                    viewBox: "0 0 1024 1024",
                                    version: "1.1",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    "p-id": "1572",
                                    width: "200",
                                    height: "200"
                                  }, [
                                    createVNode("path", {
                                      d: "M1020.52 478.23c-1.91-11.62-12.11-20.18-23.93-20.18h-11.64L866.73 146.08l1.94-5.11h20.16v0.03c16.34 0 29.53-16.59 29.53-37.08s-13.19-37.08-29.51-37.08H134.72c-16.35 0-29.56 16.59-29.56 37.11 0 20.46 13.21 37.01 29.53 37.01h17.78l1.95 5.14L36.2 458.08h-7.41c-11.84 0-22.02 8.56-23.93 20.18-1.53 8.98-2.17 16.54-2.17 23.86 0 90.64 83.37 164.37 185.86 164.4v-0.02c102.62 0 186-73.73 186-164.37 0-7.32-0.64-14.88-2.17-23.86-1.91-11.62-12.11-20.18-23.93-20.18h-11.64L218.59 146.11l1.95-5.14h257.19v735.9c0 2.12 0.42 4.18 1.21 6.14H366.39c-17.83 0-32.33 17.5-32.33 38.99 0 21.46 14.5 38.99 32.33 38.99H657.4c8.54 0.06 16.75-4.02 22.82-11.34 6.07-7.31 9.49-17.27 9.51-27.65 0-21.49-14.5-38.99-32.33-38.99H549.76c0.81-1.99 1.24-4.09 1.24-6.25v-735.8h249.63l1.94 5.11-118.22 311.98h-7.41c-11.84 0-22.02 8.56-23.93 20.18-1.53 8.98-2.17 16.54-2.17 23.86 0 90.64 83.37 164.37 185.86 164.4v-0.02c102.62 0 186-73.73 186-164.37-0.01-7.33-0.65-14.88-2.18-23.87zM188.93 601c-61.4 0-111.51-36.97-113.62-83h227.22c-2.09 46.03-52.21 83-113.6 83z m83.71-142.92H100.37l86.14-227.31 86.13 227.31z m562.01-227.34l86.14 227.31H748.51l86.14-227.31z m2.43 370.23c-61.4 0-111.51-36.97-113.62-83h227.22c-2.09 46.03-52.22 83-113.6 83z",
                                      "p-id": "1573",
                                      fill: "#2c2c2c"
                                    })
                                  ]))
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-3" }, " 公平公正 "),
                            createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 严格遵循法律法规和调解原则，确保解决方案公平合理，维护双方当事人的合法权益。 ")
                          ])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_el_card, { class: "border border-gray-200 dark:border-gray-700 transition-all hover:shadow-lg hover:-translate-y-1" }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "p-8" }, [
                          createVNode("div", { class: "flex flex-col items-center text-center" }, [
                            createVNode("div", { class: "w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-6" }, [
                              createVNode(_component_el_icon, {
                                size: "32",
                                class: "text-blue-600 dark:text-blue-400"
                              }, {
                                default: withCtx(() => [
                                  createVNode(unref(clock_default))
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-3" }, " 高效便捷 "),
                            createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 7×24小时在线服务，无需等待，快速响应，大大缩短调解周期，提高纠纷解决效率。 ")
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/OverviewSection.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const OverviewSection = /* @__PURE__ */ Object.assign(_export_sfc$1(_sfc_main$3, [["__scopeId", "data-v-28105c84"]]), { __name: "OverviewSection" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "FeaturesSection",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_container = ElContainer;
      const _component_el_card = ElCard;
      const _component_el_icon = ElIcon;
      _push(`<section${ssrRenderAttrs(mergeProps({
        id: "features",
        class: "py-20 bg-gray-50 dark:bg-gray-800"
      }, _attrs))} data-v-a9cc5c7a>`);
      _push(ssrRenderComponent(_component_el_container, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center" data-v-a9cc5c7a${_scopeId}><div class="flex flex-col items-center" data-v-a9cc5c7a${_scopeId}><div class="max-w-3xl mx-auto text-center mb-16 px-4" data-v-a9cc5c7a${_scopeId}><h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6" data-v-a9cc5c7a${_scopeId}> 核心功能 </h2><p class="text-lg text-gray-600 dark:text-gray-300" data-v-a9cc5c7a${_scopeId}> 法智调集成多项先进技术，为法院调解提供全方位支持，实现智能化、自动化、人性化的调解流程。 </p></div>`);
            _push2(ssrRenderComponent(_component_el_card, { class: "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg z-20 border border-gray-200 dark:border-gray-700" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex items-center gap-3" data-v-a9cc5c7a${_scopeId2}><div class="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center" data-v-a9cc5c7a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_icon, {
                    size: "20",
                    class: "text-blue-600 dark:text-blue-400"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(check_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(check_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div data-v-a9cc5c7a${_scopeId2}><p class="text-sm font-medium text-gray-900 dark:text-white" data-v-a9cc5c7a${_scopeId2}> 调解成功率 </p><p class="text-2xl font-bold text-blue-600 dark:text-blue-400" data-v-a9cc5c7a${_scopeId2}> 85% </p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex items-center gap-3" }, [
                      createVNode("div", { class: "w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center" }, [
                        createVNode(_component_el_icon, {
                          size: "20",
                          class: "text-blue-600 dark:text-blue-400"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(check_default))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-white" }, " 调解成功率 "),
                        createVNode("p", { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, " 85% ")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="space-y-8 px-4" data-v-a9cc5c7a${_scopeId}>`);
            _push2(ssrRenderComponent(_component_el_card, { class: "border-0 bg-transparent p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-6" data-v-a9cc5c7a${_scopeId2}><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0" data-v-a9cc5c7a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_icon, {
                    size: "24",
                    class: "text-blue-600 dark:text-blue-400"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(search_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(search_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div data-v-a9cc5c7a${_scopeId2}><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2" data-v-a9cc5c7a${_scopeId2}> 纠纷分析 </h3><p class="text-gray-600 dark:text-gray-400" data-v-a9cc5c7a${_scopeId2}> 智能识别纠纷类型、金额、时间等关键信息，分析案情，为调解提供数据支持。 </p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-6" }, [
                      createVNode("div", { class: "w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0" }, [
                        createVNode(_component_el_icon, {
                          size: "24",
                          class: "text-blue-600 dark:text-blue-400"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(search_default))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-2" }, " 纠纷分析 "),
                        createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 智能识别纠纷类型、金额、时间等关键信息，分析案情，为调解提供数据支持。 ")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_card, { class: "border-0 bg-transparent p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-6" data-v-a9cc5c7a${_scopeId2}><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0" data-v-a9cc5c7a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_icon, {
                    size: "24",
                    class: "text-blue-600 dark:text-blue-400"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(message_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(message_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div data-v-a9cc5c7a${_scopeId2}><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2" data-v-a9cc5c7a${_scopeId2}> 对话引导 </h3><p class="text-gray-600 dark:text-gray-400" data-v-a9cc5c7a${_scopeId2}> 基于法律知识库和调解经验，智能引导双方当事人进行有效沟通，促进和解。 </p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-6" }, [
                      createVNode("div", { class: "w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0" }, [
                        createVNode(_component_el_icon, {
                          size: "24",
                          class: "text-blue-600 dark:text-blue-400"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(message_default))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-2" }, " 对话引导 "),
                        createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 基于法律知识库和调解经验，智能引导双方当事人进行有效沟通，促进和解。 ")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_card, { class: "border-0 bg-transparent p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-6" data-v-a9cc5c7a${_scopeId2}><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0" data-v-a9cc5c7a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_icon, {
                    size: "24",
                    class: "text-blue-600 dark:text-blue-400"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<svg t="1759422255944" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2953" width="200" height="200" data-v-a9cc5c7a${_scopeId3}><path d="M300.8 819.2H160c-19.2 0-32-12.8-32-32V185.6h588.8v83.2c0 19.2 12.8 32 32 32s32-12.8 32-32v-128c0-57.6-44.8-102.4-102.4-102.4H160C102.4 38.4 57.6 83.2 57.6 140.8v646.4c0 57.6 44.8 102.4 102.4 102.4h134.4c19.2 0 32-12.8 32-32 6.4-19.2-6.4-38.4-25.6-38.4z" p-id="2954" data-v-a9cc5c7a${_scopeId3}></path><path d="M371.2 505.6c0-19.2-19.2-38.4-38.4-38.4H243.2c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h89.6c19.2 0 38.4-19.2 38.4-38.4zM576 313.6c0-19.2-19.2-38.4-38.4-38.4H243.2c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h294.4c25.6 0 38.4-19.2 38.4-38.4zM243.2 652.8c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h19.2c19.2 0 38.4-19.2 38.4-38.4s-19.2-38.4-38.4-38.4h-19.2zM761.6 582.4l-147.2 147.2-57.6-57.6c-12.8-12.8-38.4-12.8-51.2 0-12.8 12.8-12.8 38.4 0 51.2l64 64c12.8 12.8 25.6 19.2 44.8 19.2 19.2 0 32-6.4 44.8-19.2l153.6-153.6c12.8-12.8 12.8-38.4 0-51.2-19.2-12.8-38.4-12.8-51.2 0z" p-id="2955" data-v-a9cc5c7a${_scopeId3}></path><path d="M659.2 364.8c-172.8 0-307.2 140.8-307.2 307.2 0 172.8 140.8 307.2 307.2 307.2s307.2-140.8 307.2-307.2c0-166.4-140.8-307.2-307.2-307.2z m0 550.4c-134.4 0-243.2-108.8-243.2-243.2s108.8-243.2 243.2-243.2S896 544 896 678.4s-108.8 236.8-236.8 236.8z" p-id="2956" data-v-a9cc5c7a${_scopeId3}></path></svg>`);
                      } else {
                        return [
                          (openBlock(), createBlock("svg", {
                            t: "1759422255944",
                            class: "icon",
                            viewBox: "0 0 1024 1024",
                            version: "1.1",
                            xmlns: "http://www.w3.org/2000/svg",
                            "p-id": "2953",
                            width: "200",
                            height: "200"
                          }, [
                            createVNode("path", {
                              d: "M300.8 819.2H160c-19.2 0-32-12.8-32-32V185.6h588.8v83.2c0 19.2 12.8 32 32 32s32-12.8 32-32v-128c0-57.6-44.8-102.4-102.4-102.4H160C102.4 38.4 57.6 83.2 57.6 140.8v646.4c0 57.6 44.8 102.4 102.4 102.4h134.4c19.2 0 32-12.8 32-32 6.4-19.2-6.4-38.4-25.6-38.4z",
                              "p-id": "2954"
                            }),
                            createVNode("path", {
                              d: "M371.2 505.6c0-19.2-19.2-38.4-38.4-38.4H243.2c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h89.6c19.2 0 38.4-19.2 38.4-38.4zM576 313.6c0-19.2-19.2-38.4-38.4-38.4H243.2c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h294.4c25.6 0 38.4-19.2 38.4-38.4zM243.2 652.8c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h19.2c19.2 0 38.4-19.2 38.4-38.4s-19.2-38.4-38.4-38.4h-19.2zM761.6 582.4l-147.2 147.2-57.6-57.6c-12.8-12.8-38.4-12.8-51.2 0-12.8 12.8-12.8 38.4 0 51.2l64 64c12.8 12.8 25.6 19.2 44.8 19.2 19.2 0 32-6.4 44.8-19.2l153.6-153.6c12.8-12.8 12.8-38.4 0-51.2-19.2-12.8-38.4-12.8-51.2 0z",
                              "p-id": "2955"
                            }),
                            createVNode("path", {
                              d: "M659.2 364.8c-172.8 0-307.2 140.8-307.2 307.2 0 172.8 140.8 307.2 307.2 307.2s307.2-140.8 307.2-307.2c0-166.4-140.8-307.2-307.2-307.2z m0 550.4c-134.4 0-243.2-108.8-243.2-243.2s108.8-243.2 243.2-243.2S896 544 896 678.4s-108.8 236.8-236.8 236.8z",
                              "p-id": "2956"
                            })
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div data-v-a9cc5c7a${_scopeId2}><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2" data-v-a9cc5c7a${_scopeId2}> 方案生成 </h3><p class="text-gray-600 dark:text-gray-400" data-v-a9cc5c7a${_scopeId2}> 根据双方诉求和实际情况，智能生成多种还款方案和解决方案，供当事人选择。 </p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-6" }, [
                      createVNode("div", { class: "w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0" }, [
                        createVNode(_component_el_icon, {
                          size: "24",
                          class: "text-blue-600 dark:text-blue-400"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock("svg", {
                              t: "1759422255944",
                              class: "icon",
                              viewBox: "0 0 1024 1024",
                              version: "1.1",
                              xmlns: "http://www.w3.org/2000/svg",
                              "p-id": "2953",
                              width: "200",
                              height: "200"
                            }, [
                              createVNode("path", {
                                d: "M300.8 819.2H160c-19.2 0-32-12.8-32-32V185.6h588.8v83.2c0 19.2 12.8 32 32 32s32-12.8 32-32v-128c0-57.6-44.8-102.4-102.4-102.4H160C102.4 38.4 57.6 83.2 57.6 140.8v646.4c0 57.6 44.8 102.4 102.4 102.4h134.4c19.2 0 32-12.8 32-32 6.4-19.2-6.4-38.4-25.6-38.4z",
                                "p-id": "2954"
                              }),
                              createVNode("path", {
                                d: "M371.2 505.6c0-19.2-19.2-38.4-38.4-38.4H243.2c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h89.6c19.2 0 38.4-19.2 38.4-38.4zM576 313.6c0-19.2-19.2-38.4-38.4-38.4H243.2c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h294.4c25.6 0 38.4-19.2 38.4-38.4zM243.2 652.8c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h19.2c19.2 0 38.4-19.2 38.4-38.4s-19.2-38.4-38.4-38.4h-19.2zM761.6 582.4l-147.2 147.2-57.6-57.6c-12.8-12.8-38.4-12.8-51.2 0-12.8 12.8-12.8 38.4 0 51.2l64 64c12.8 12.8 25.6 19.2 44.8 19.2 19.2 0 32-6.4 44.8-19.2l153.6-153.6c12.8-12.8 12.8-38.4 0-51.2-19.2-12.8-38.4-12.8-51.2 0z",
                                "p-id": "2955"
                              }),
                              createVNode("path", {
                                d: "M659.2 364.8c-172.8 0-307.2 140.8-307.2 307.2 0 172.8 140.8 307.2 307.2 307.2s307.2-140.8 307.2-307.2c0-166.4-140.8-307.2-307.2-307.2z m0 550.4c-134.4 0-243.2-108.8-243.2-243.2s108.8-243.2 243.2-243.2S896 544 896 678.4s-108.8 236.8-236.8 236.8z",
                                "p-id": "2956"
                              })
                            ]))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-2" }, " 方案生成 "),
                        createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 根据双方诉求和实际情况，智能生成多种还款方案和解决方案，供当事人选择。 ")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_el_card, { class: "border-0 bg-transparent p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="flex gap-6" data-v-a9cc5c7a${_scopeId2}><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0" data-v-a9cc5c7a${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_icon, {
                    size: "24",
                    class: "text-blue-600 dark:text-blue-400"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(document_checked_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(document_checked_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><div data-v-a9cc5c7a${_scopeId2}><h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2" data-v-a9cc5c7a${_scopeId2}> 协议管理 </h3><p class="text-gray-600 dark:text-gray-400" data-v-a9cc5c7a${_scopeId2}> 自动生成调解协议，支持在线签署和管理，为后续执行提供法律保障。 </p></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "flex gap-6" }, [
                      createVNode("div", { class: "w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0" }, [
                        createVNode(_component_el_icon, {
                          size: "24",
                          class: "text-blue-600 dark:text-blue-400"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(document_checked_default))
                          ]),
                          _: 1
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-2" }, " 协议管理 "),
                        createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 自动生成调解协议，支持在线签署和管理，为后续执行提供法律保障。 ")
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div>`);
          } else {
            return [
              createVNode("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 items-center" }, [
                createVNode("div", { class: "flex flex-col items-center" }, [
                  createVNode("div", { class: "max-w-3xl mx-auto text-center mb-16 px-4" }, [
                    createVNode("h2", { class: "text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6" }, " 核心功能 "),
                    createVNode("p", { class: "text-lg text-gray-600 dark:text-gray-300" }, " 法智调集成多项先进技术，为法院调解提供全方位支持，实现智能化、自动化、人性化的调解流程。 ")
                  ]),
                  createVNode(_component_el_card, { class: "bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg z-20 border border-gray-200 dark:border-gray-700" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center gap-3" }, [
                        createVNode("div", { class: "w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center" }, [
                          createVNode(_component_el_icon, {
                            size: "20",
                            class: "text-blue-600 dark:text-blue-400"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(check_default))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium text-gray-900 dark:text-white" }, " 调解成功率 "),
                          createVNode("p", { class: "text-2xl font-bold text-blue-600 dark:text-blue-400" }, " 85% ")
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                createVNode("div", { class: "space-y-8 px-4" }, [
                  createVNode(_component_el_card, { class: "border-0 bg-transparent p-0" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex gap-6" }, [
                        createVNode("div", { class: "w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0" }, [
                          createVNode(_component_el_icon, {
                            size: "24",
                            class: "text-blue-600 dark:text-blue-400"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(search_default))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-2" }, " 纠纷分析 "),
                          createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 智能识别纠纷类型、金额、时间等关键信息，分析案情，为调解提供数据支持。 ")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_card, { class: "border-0 bg-transparent p-0" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex gap-6" }, [
                        createVNode("div", { class: "w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0" }, [
                          createVNode(_component_el_icon, {
                            size: "24",
                            class: "text-blue-600 dark:text-blue-400"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(message_default))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-2" }, " 对话引导 "),
                          createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 基于法律知识库和调解经验，智能引导双方当事人进行有效沟通，促进和解。 ")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_card, { class: "border-0 bg-transparent p-0" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex gap-6" }, [
                        createVNode("div", { class: "w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0" }, [
                          createVNode(_component_el_icon, {
                            size: "24",
                            class: "text-blue-600 dark:text-blue-400"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock("svg", {
                                t: "1759422255944",
                                class: "icon",
                                viewBox: "0 0 1024 1024",
                                version: "1.1",
                                xmlns: "http://www.w3.org/2000/svg",
                                "p-id": "2953",
                                width: "200",
                                height: "200"
                              }, [
                                createVNode("path", {
                                  d: "M300.8 819.2H160c-19.2 0-32-12.8-32-32V185.6h588.8v83.2c0 19.2 12.8 32 32 32s32-12.8 32-32v-128c0-57.6-44.8-102.4-102.4-102.4H160C102.4 38.4 57.6 83.2 57.6 140.8v646.4c0 57.6 44.8 102.4 102.4 102.4h134.4c19.2 0 32-12.8 32-32 6.4-19.2-6.4-38.4-25.6-38.4z",
                                  "p-id": "2954"
                                }),
                                createVNode("path", {
                                  d: "M371.2 505.6c0-19.2-19.2-38.4-38.4-38.4H243.2c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h89.6c19.2 0 38.4-19.2 38.4-38.4zM576 313.6c0-19.2-19.2-38.4-38.4-38.4H243.2c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h294.4c25.6 0 38.4-19.2 38.4-38.4zM243.2 652.8c-19.2 0-38.4 19.2-38.4 38.4s19.2 38.4 38.4 38.4h19.2c19.2 0 38.4-19.2 38.4-38.4s-19.2-38.4-38.4-38.4h-19.2zM761.6 582.4l-147.2 147.2-57.6-57.6c-12.8-12.8-38.4-12.8-51.2 0-12.8 12.8-12.8 38.4 0 51.2l64 64c12.8 12.8 25.6 19.2 44.8 19.2 19.2 0 32-6.4 44.8-19.2l153.6-153.6c12.8-12.8 12.8-38.4 0-51.2-19.2-12.8-38.4-12.8-51.2 0z",
                                  "p-id": "2955"
                                }),
                                createVNode("path", {
                                  d: "M659.2 364.8c-172.8 0-307.2 140.8-307.2 307.2 0 172.8 140.8 307.2 307.2 307.2s307.2-140.8 307.2-307.2c0-166.4-140.8-307.2-307.2-307.2z m0 550.4c-134.4 0-243.2-108.8-243.2-243.2s108.8-243.2 243.2-243.2S896 544 896 678.4s-108.8 236.8-236.8 236.8z",
                                  "p-id": "2956"
                                })
                              ]))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-2" }, " 方案生成 "),
                          createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 根据双方诉求和实际情况，智能生成多种还款方案和解决方案，供当事人选择。 ")
                        ])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_el_card, { class: "border-0 bg-transparent p-0" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex gap-6" }, [
                        createVNode("div", { class: "w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0" }, [
                          createVNode(_component_el_icon, {
                            size: "24",
                            class: "text-blue-600 dark:text-blue-400"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(document_checked_default))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-xl font-bold text-gray-900 dark:text-white mb-2" }, " 协议管理 "),
                          createVNode("p", { class: "text-gray-600 dark:text-gray-400" }, " 自动生成调解协议，支持在线签署和管理，为后续执行提供法律保障。 ")
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/FeaturesSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const FeaturesSection = /* @__PURE__ */ Object.assign(_export_sfc$1(_sfc_main$2, [["__scopeId", "data-v-a9cc5c7a"]]), { __name: "FeaturesSection" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_el_container = ElContainer;
      const _component_el_main = ElMain;
      const _component_el_icon = ElIcon;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "bg-gray-900 text-white pt-16 pb-8 px-4" }, _attrs))} data-v-4311e476>`);
      _push(ssrRenderComponent(_component_el_container, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_el_main, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-12" data-v-4311e476${_scopeId2}><div data-v-4311e476${_scopeId2}><div class="flex items-center mb-6" data-v-4311e476${_scopeId2}><div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3" data-v-4311e476${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_icon, {
                    size: "24",
                    class: "text-white"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(document_default), null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(document_default))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div><h3 class="text-xl font-bold" data-v-4311e476${_scopeId2}>法智调</h3></div><p class="text-gray-400 mb-6" data-v-4311e476${_scopeId2}> 面向法院调解场景的智能助手系统，为金融纠纷提供公平、公正、高效的解决方案。 </p><div class="flex space-x-4" data-v-4311e476${_scopeId2}><a href="#" class="text-gray-400 hover:text-white transition-colors" data-v-4311e476${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_el_icon, { size: "24" }, null, _parent3, _scopeId2));
                  _push3(`</a></div></div><div data-v-4311e476${_scopeId2}><h4 class="text-lg font-semibold mb-6" data-v-4311e476${_scopeId2}>快速链接</h4><div class="grid grid-cols-1 gap-4 items-center" data-v-4311e476${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "https://github.com",
                    target: "_blank"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center space-x-2 w-min" data-v-4311e476${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_icon, { size: "36" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<svg class="svg-inline--fa fa-github fa-w-16 fa-lg" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg="" data-v-4311e476${_scopeId4}><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" data-v-4311e476${_scopeId4}></path></svg>`);
                            } else {
                              return [
                                (openBlock(), createBlock("svg", {
                                  class: "svg-inline--fa fa-github fa-w-16 fa-lg",
                                  "aria-hidden": "true",
                                  focusable: "false",
                                  "data-prefix": "fab",
                                  "data-icon": "github",
                                  role: "img",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 496 512",
                                  "data-fa-i2svg": ""
                                }, [
                                  createVNode("path", {
                                    fill: "currentColor",
                                    d: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                  })
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p data-v-4311e476${_scopeId3}>Github</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center space-x-2 w-min" }, [
                            createVNode(_component_el_icon, { size: "36" }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock("svg", {
                                  class: "svg-inline--fa fa-github fa-w-16 fa-lg",
                                  "aria-hidden": "true",
                                  focusable: "false",
                                  "data-prefix": "fab",
                                  "data-icon": "github",
                                  role: "img",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  viewBox: "0 0 496 512",
                                  "data-fa-i2svg": ""
                                }, [
                                  createVNode("path", {
                                    fill: "currentColor",
                                    d: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                  })
                                ]))
                              ]),
                              _: 1
                            }),
                            createVNode("p", null, "Github")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "https://huggingface.co",
                    target: "_blank"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="flex items-center space-x-2" data-v-4311e476${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_el_icon, { size: "36" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<svg t="1759423762798" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5295" width="200" height="200" data-v-4311e476${_scopeId4}><path d="M509.824 826.581c167.467 0 303.275-138.837 303.275-310.101S677.29 206.379 509.824 206.379c-167.51 0-303.275 138.837-303.275 310.101s135.766 310.101 303.275 310.101z" fill="#FFD21E" p-id="5296" data-v-4311e476${_scopeId4}></path><path d="M813.099 516.48c0-171.264-135.808-310.101-303.275-310.101-167.51 0-303.275 138.837-303.275 310.101s135.766 310.101 303.275 310.101c167.467 0 303.275-138.837 303.275-310.101z m-641.451 0c0-123.563 64.427-237.696 169.088-299.52a331.733 331.733 0 0 1 338.176 0C783.531 278.784 848 392.917 848 516.48c0 190.976-151.424 345.77-338.176 345.77-186.795 0-338.176-154.794-338.176-345.77z" fill="#FF9D0B" p-id="5297" data-v-4311e476${_scopeId4}></path><path d="M608.341 432.128c11.179 3.925 15.531 27.307 26.795 21.248 15.573-8.448 24.661-25.685 22.997-43.648a44.373 44.373 0 0 0-30.677-38.4 43.05 43.05 0 0 0-46.421 14.25 45.44 45.44 0 0 0-4.907 49.323c5.333 10.24 22.272-6.4 32.299-2.858l-0.086 0.085z m-205.525 0c-11.179 3.925-15.616 27.307-26.795 21.248a44.843 44.843 0 0 1-22.954-43.648 44.373 44.373 0 0 1 30.634-38.4c16.896-5.29 35.2 0.341 46.464 14.25 11.222 13.91 13.142 33.366 4.864 49.323-5.333 10.24-22.357-6.4-32.298-2.858l0.085 0.085z" fill="#3A3B45" p-id="5298" data-v-4311e476${_scopeId4}></path><path d="M507.648 646.23c85.76 0 113.45-78.166 113.45-118.358 0-20.864-13.695-14.25-35.711-3.2-20.31 10.24-47.659 24.448-77.654 24.448-62.72 0-113.493-61.397-113.493-21.248 0 40.192 27.605 118.357 113.493 118.357h-0.085z" fill="#FF323D" p-id="5299" data-v-4311e476${_scopeId4}></path><path d="M441.941 625.792a76.373 76.373 0 0 1 46.251-40.107c3.456-1.024 7.04 5.12 10.795 11.435 3.498 6.101 7.168 12.245 10.837 12.245 3.925 0 7.85-6.058 11.605-12.032 3.926-6.272 7.766-12.33 11.52-11.178 18.774 6.101 34.39 19.456 43.648 37.205 32.555-26.24 44.502-69.035 44.502-95.488 0-20.864-13.696-14.25-35.712-3.2l-1.195 0.64c-20.181 10.24-47.061 23.808-76.544 23.808-29.525 0-56.32-13.568-76.544-23.808-22.699-11.52-36.907-18.773-36.907 2.56 0 27.221 12.715 71.936 47.744 97.92z" fill="#3A3B45" p-id="5300" data-v-4311e476${_scopeId4}></path><path d="M714.923 474.07a28.672 28.672 0 0 0 28.33-29.014 28.672 28.672 0 0 0-28.33-29.013 28.672 28.672 0 0 0-28.374 29.013c0 16.043 12.672 29.013 28.374 29.013z m-405.846 0a28.672 28.672 0 0 0 28.374-29.014 28.672 28.672 0 0 0-28.374-29.013 28.672 28.672 0 0 0-28.33 29.013c0 16.043 12.672 29.013 28.33 29.013z m-58.368 98.133c-14.122 0-26.709 5.93-35.498 16.725-7.552 9.515-11.648 21.333-11.648 33.536a60.715 60.715 0 0 0-16.896-2.645 45.653 45.653 0 0 0-34.39 14.805 52.65 52.65 0 0 0-6.997 62.464c-7.68 6.443-13.227 15.275-15.616 25.173-2.133 8.022-4.181 24.96 6.997 42.283-8.533 13.397-9.728 30.293-3.242 44.8 8.917 20.693 31.146 36.95 74.368 54.443 26.794 10.88 51.37 17.834 51.584 17.92 31.061 8.832 63.146 13.653 95.36 14.293 51.157 0 87.722-16.043 108.757-47.659 33.835-50.773 29.013-97.28-14.848-142.08-24.192-24.789-40.32-61.269-43.648-69.333-6.827-23.723-24.747-50.133-54.528-50.133a49.493 49.493 0 0 0-40.15 21.93c-8.746-11.221-17.28-20.053-24.96-25.173a63.573 63.573 0 0 0-34.645-11.307z m0 35.754c4.438 0 9.942 1.963 15.872 5.76 18.688 12.16 54.571 75.264 67.755 99.798 4.352 8.192 11.947 11.69 18.645 11.69 13.526 0 24.022-13.653 1.28-31.061-34.133-26.155-22.186-68.907-5.888-71.467 0.683-0.213 1.494-0.213 2.091-0.213 14.848 0 21.376 26.155 21.376 26.155s19.2 49.28 52.096 82.986c32.896 33.664 34.646 60.715 10.667 96.683-16.427 24.533-47.787 31.915-79.957 31.915-33.28 0-67.456-8.022-86.571-13.014-0.939-0.256-117.376-33.92-102.613-62.464 2.432-4.821 6.528-6.826 11.69-6.826 20.779 0 58.454 31.616 74.795 31.616 3.584 0 6.101-1.494 7.253-5.334 6.87-25.429-105.258-36.138-95.829-72.917 1.707-6.528 6.187-9.088 12.544-9.088 27.392 0-89.003 49.323-101.973 49.323-0.854 0-1.622-0.256-1.963-0.854-6.485-10.752-2.987-18.218 42.581-46.421 45.654-28.203 77.654-45.184 59.307-65.408-1.963-2.347-4.95-3.413-8.533-3.413-27.734 0-93.099 60.885-93.099 60.885s-17.621 18.73-28.288 18.73a6.4 6.4 0 0 1-5.93-3.413c-7.595-13.013 70.271-73.344 74.623-98.218 2.987-16.982-2.133-25.43-11.434-25.43z" fill="#FF9D0B" p-id="5301" data-v-4311e476${_scopeId4}></path><path d="M434.688 828.288c23.979-36.053 22.23-63.147-10.667-96.768-32.981-33.621-52.181-82.987-52.181-82.987s-7.168-28.586-23.467-25.856c-16.341 2.646-28.288 45.312 5.931 71.467 34.133 26.155-6.827 43.904 19.968 19.37-13.099-24.533-49.067-87.637-67.755-99.797-18.56-12.032-31.658-5.333-27.306 19.627 4.352 24.917 82.304 85.248 74.666 98.176-7.552 13.141-34.261-15.232-34.261-15.232s-83.499-77.739-101.76-57.515c-18.133 20.224 13.867 37.206 59.35 65.408 45.653 28.16 49.237 35.67 42.751 46.379-6.528 10.71-107.178-76.117-116.565-39.253-9.43 36.693 102.699 47.317 95.787 72.746-6.955 25.43-79.062-48.042-93.696-19.456-14.848 28.63 101.674 62.294 102.613 62.55 37.547 9.984 133.12 31.146 166.528-18.902z" fill="#FFD21E" p-id="5302" data-v-4311e476${_scopeId4}></path><path d="M773.29 572.245c14.123 0 26.795 5.888 35.5 16.683 7.551 9.515 11.647 21.333 11.647 33.536 5.504-1.707 11.222-2.56 16.982-2.645 13.525 0 25.77 5.248 34.389 14.805 15.872 16.81 18.73 42.41 6.997 62.464 7.68 6.443 13.142 15.275 15.531 25.173 2.133 8.022 4.181 24.96-6.997 42.283 8.533 13.397 9.728 30.293 3.242 44.8-8.917 20.693-31.146 36.95-74.24 54.443-26.88 10.88-51.498 17.834-51.712 17.92A378.965 378.965 0 0 1 669.27 896c-51.157 0-87.722-16.043-108.757-47.659-33.835-50.773-29.013-97.28 14.848-142.08 24.277-24.789 40.405-61.269 43.733-69.333 6.827-23.723 24.704-50.133 54.443-50.133 16.085 0.256 31.019 8.448 40.15 21.93 8.746-11.221 17.28-20.053 25.045-25.173 10.24-7.04 22.186-11.008 34.56-11.307z m0 35.712c-4.437 0-9.855 1.963-15.871 5.76-18.603 12.16-54.571 75.264-67.755 99.798a21.163 21.163 0 0 1-18.645 11.69c-13.44 0-24.022-13.653-1.238-31.061 34.134-26.155 22.187-68.907 5.846-71.467a13.141 13.141 0 0 0-2.091-0.213c-14.848 0-21.376 26.155-21.376 26.155s-19.2 49.28-52.096 82.986c-32.981 33.664-34.73 60.715-10.667 96.683 16.342 24.533 47.787 31.915 79.872 31.915 33.323 0 67.456-8.022 86.656-13.014 0.854-0.256 117.376-33.92 102.614-62.464-2.518-4.821-6.528-6.826-11.691-6.826-20.779 0-58.539 31.616-74.795 31.616-3.669 0-6.186-1.494-7.253-5.334-6.955-25.429 105.173-36.138 95.744-72.917-1.621-6.528-6.101-9.088-12.544-9.088-27.392 0-89.003 49.323-101.973 49.323-0.854 0-1.622-0.256-1.963-0.854-6.485-10.752-2.987-18.218 42.581-46.421 45.654-28.203 77.654-45.184 59.307-65.408-1.963-2.347-4.95-3.413-8.533-3.413-27.734 0-93.099 60.885-93.099 60.885s-17.621 18.73-28.288 18.73a6.4 6.4 0 0 1-5.93-3.413c-7.595-13.013 70.271-73.344 74.623-98.218 2.987-16.982-2.133-25.43-11.434-25.43z" fill="#FF9D0B" p-id="5303" data-v-4311e476${_scopeId4}></path><path d="M589.397 828.288c-23.978-36.053-22.314-63.147 10.667-96.768 32.896-33.621 52.053-82.987 52.053-82.987s7.211-28.586 23.595-25.856c16.213 2.646 28.16 45.312-5.93 71.467-34.22 26.155 6.826 43.904 19.968 19.37 13.227-24.533 49.152-87.637 67.755-99.797 18.56-12.032 31.744-5.333 27.306 19.627-4.352 24.917-82.218 85.248-74.624 98.176 7.51 13.141 34.219-15.232 34.219-15.232s83.627-77.739 101.76-57.472c18.133 20.224-13.781 37.205-59.35 65.408-45.653 28.16-49.151 35.67-42.751 46.379 6.528 10.709 107.178-76.118 116.565-39.254 9.43 36.694-102.613 47.318-95.701 72.747 6.954 25.43 78.933-48.043 93.696-19.456 14.762 28.63-101.675 62.293-102.614 62.55-37.632 9.983-133.162 31.146-166.528-18.902z" fill="#FFD21E" p-id="5304" data-v-4311e476${_scopeId4}></path></svg>`);
                            } else {
                              return [
                                (openBlock(), createBlock("svg", {
                                  t: "1759423762798",
                                  class: "icon",
                                  viewBox: "0 0 1024 1024",
                                  version: "1.1",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  "p-id": "5295",
                                  width: "200",
                                  height: "200"
                                }, [
                                  createVNode("path", {
                                    d: "M509.824 826.581c167.467 0 303.275-138.837 303.275-310.101S677.29 206.379 509.824 206.379c-167.51 0-303.275 138.837-303.275 310.101s135.766 310.101 303.275 310.101z",
                                    fill: "#FFD21E",
                                    "p-id": "5296"
                                  }),
                                  createVNode("path", {
                                    d: "M813.099 516.48c0-171.264-135.808-310.101-303.275-310.101-167.51 0-303.275 138.837-303.275 310.101s135.766 310.101 303.275 310.101c167.467 0 303.275-138.837 303.275-310.101z m-641.451 0c0-123.563 64.427-237.696 169.088-299.52a331.733 331.733 0 0 1 338.176 0C783.531 278.784 848 392.917 848 516.48c0 190.976-151.424 345.77-338.176 345.77-186.795 0-338.176-154.794-338.176-345.77z",
                                    fill: "#FF9D0B",
                                    "p-id": "5297"
                                  }),
                                  createVNode("path", {
                                    d: "M608.341 432.128c11.179 3.925 15.531 27.307 26.795 21.248 15.573-8.448 24.661-25.685 22.997-43.648a44.373 44.373 0 0 0-30.677-38.4 43.05 43.05 0 0 0-46.421 14.25 45.44 45.44 0 0 0-4.907 49.323c5.333 10.24 22.272-6.4 32.299-2.858l-0.086 0.085z m-205.525 0c-11.179 3.925-15.616 27.307-26.795 21.248a44.843 44.843 0 0 1-22.954-43.648 44.373 44.373 0 0 1 30.634-38.4c16.896-5.29 35.2 0.341 46.464 14.25 11.222 13.91 13.142 33.366 4.864 49.323-5.333 10.24-22.357-6.4-32.298-2.858l0.085 0.085z",
                                    fill: "#3A3B45",
                                    "p-id": "5298"
                                  }),
                                  createVNode("path", {
                                    d: "M507.648 646.23c85.76 0 113.45-78.166 113.45-118.358 0-20.864-13.695-14.25-35.711-3.2-20.31 10.24-47.659 24.448-77.654 24.448-62.72 0-113.493-61.397-113.493-21.248 0 40.192 27.605 118.357 113.493 118.357h-0.085z",
                                    fill: "#FF323D",
                                    "p-id": "5299"
                                  }),
                                  createVNode("path", {
                                    d: "M441.941 625.792a76.373 76.373 0 0 1 46.251-40.107c3.456-1.024 7.04 5.12 10.795 11.435 3.498 6.101 7.168 12.245 10.837 12.245 3.925 0 7.85-6.058 11.605-12.032 3.926-6.272 7.766-12.33 11.52-11.178 18.774 6.101 34.39 19.456 43.648 37.205 32.555-26.24 44.502-69.035 44.502-95.488 0-20.864-13.696-14.25-35.712-3.2l-1.195 0.64c-20.181 10.24-47.061 23.808-76.544 23.808-29.525 0-56.32-13.568-76.544-23.808-22.699-11.52-36.907-18.773-36.907 2.56 0 27.221 12.715 71.936 47.744 97.92z",
                                    fill: "#3A3B45",
                                    "p-id": "5300"
                                  }),
                                  createVNode("path", {
                                    d: "M714.923 474.07a28.672 28.672 0 0 0 28.33-29.014 28.672 28.672 0 0 0-28.33-29.013 28.672 28.672 0 0 0-28.374 29.013c0 16.043 12.672 29.013 28.374 29.013z m-405.846 0a28.672 28.672 0 0 0 28.374-29.014 28.672 28.672 0 0 0-28.374-29.013 28.672 28.672 0 0 0-28.33 29.013c0 16.043 12.672 29.013 28.33 29.013z m-58.368 98.133c-14.122 0-26.709 5.93-35.498 16.725-7.552 9.515-11.648 21.333-11.648 33.536a60.715 60.715 0 0 0-16.896-2.645 45.653 45.653 0 0 0-34.39 14.805 52.65 52.65 0 0 0-6.997 62.464c-7.68 6.443-13.227 15.275-15.616 25.173-2.133 8.022-4.181 24.96 6.997 42.283-8.533 13.397-9.728 30.293-3.242 44.8 8.917 20.693 31.146 36.95 74.368 54.443 26.794 10.88 51.37 17.834 51.584 17.92 31.061 8.832 63.146 13.653 95.36 14.293 51.157 0 87.722-16.043 108.757-47.659 33.835-50.773 29.013-97.28-14.848-142.08-24.192-24.789-40.32-61.269-43.648-69.333-6.827-23.723-24.747-50.133-54.528-50.133a49.493 49.493 0 0 0-40.15 21.93c-8.746-11.221-17.28-20.053-24.96-25.173a63.573 63.573 0 0 0-34.645-11.307z m0 35.754c4.438 0 9.942 1.963 15.872 5.76 18.688 12.16 54.571 75.264 67.755 99.798 4.352 8.192 11.947 11.69 18.645 11.69 13.526 0 24.022-13.653 1.28-31.061-34.133-26.155-22.186-68.907-5.888-71.467 0.683-0.213 1.494-0.213 2.091-0.213 14.848 0 21.376 26.155 21.376 26.155s19.2 49.28 52.096 82.986c32.896 33.664 34.646 60.715 10.667 96.683-16.427 24.533-47.787 31.915-79.957 31.915-33.28 0-67.456-8.022-86.571-13.014-0.939-0.256-117.376-33.92-102.613-62.464 2.432-4.821 6.528-6.826 11.69-6.826 20.779 0 58.454 31.616 74.795 31.616 3.584 0 6.101-1.494 7.253-5.334 6.87-25.429-105.258-36.138-95.829-72.917 1.707-6.528 6.187-9.088 12.544-9.088 27.392 0-89.003 49.323-101.973 49.323-0.854 0-1.622-0.256-1.963-0.854-6.485-10.752-2.987-18.218 42.581-46.421 45.654-28.203 77.654-45.184 59.307-65.408-1.963-2.347-4.95-3.413-8.533-3.413-27.734 0-93.099 60.885-93.099 60.885s-17.621 18.73-28.288 18.73a6.4 6.4 0 0 1-5.93-3.413c-7.595-13.013 70.271-73.344 74.623-98.218 2.987-16.982-2.133-25.43-11.434-25.43z",
                                    fill: "#FF9D0B",
                                    "p-id": "5301"
                                  }),
                                  createVNode("path", {
                                    d: "M434.688 828.288c23.979-36.053 22.23-63.147-10.667-96.768-32.981-33.621-52.181-82.987-52.181-82.987s-7.168-28.586-23.467-25.856c-16.341 2.646-28.288 45.312 5.931 71.467 34.133 26.155-6.827 43.904 19.968 19.37-13.099-24.533-49.067-87.637-67.755-99.797-18.56-12.032-31.658-5.333-27.306 19.627 4.352 24.917 82.304 85.248 74.666 98.176-7.552 13.141-34.261-15.232-34.261-15.232s-83.499-77.739-101.76-57.515c-18.133 20.224 13.867 37.206 59.35 65.408 45.653 28.16 49.237 35.67 42.751 46.379-6.528 10.71-107.178-76.117-116.565-39.253-9.43 36.693 102.699 47.317 95.787 72.746-6.955 25.43-79.062-48.042-93.696-19.456-14.848 28.63 101.674 62.294 102.613 62.55 37.547 9.984 133.12 31.146 166.528-18.902z",
                                    fill: "#FFD21E",
                                    "p-id": "5302"
                                  }),
                                  createVNode("path", {
                                    d: "M773.29 572.245c14.123 0 26.795 5.888 35.5 16.683 7.551 9.515 11.647 21.333 11.647 33.536 5.504-1.707 11.222-2.56 16.982-2.645 13.525 0 25.77 5.248 34.389 14.805 15.872 16.81 18.73 42.41 6.997 62.464 7.68 6.443 13.142 15.275 15.531 25.173 2.133 8.022 4.181 24.96-6.997 42.283 8.533 13.397 9.728 30.293 3.242 44.8-8.917 20.693-31.146 36.95-74.24 54.443-26.88 10.88-51.498 17.834-51.712 17.92A378.965 378.965 0 0 1 669.27 896c-51.157 0-87.722-16.043-108.757-47.659-33.835-50.773-29.013-97.28 14.848-142.08 24.277-24.789 40.405-61.269 43.733-69.333 6.827-23.723 24.704-50.133 54.443-50.133 16.085 0.256 31.019 8.448 40.15 21.93 8.746-11.221 17.28-20.053 25.045-25.173 10.24-7.04 22.186-11.008 34.56-11.307z m0 35.712c-4.437 0-9.855 1.963-15.871 5.76-18.603 12.16-54.571 75.264-67.755 99.798a21.163 21.163 0 0 1-18.645 11.69c-13.44 0-24.022-13.653-1.238-31.061 34.134-26.155 22.187-68.907 5.846-71.467a13.141 13.141 0 0 0-2.091-0.213c-14.848 0-21.376 26.155-21.376 26.155s-19.2 49.28-52.096 82.986c-32.981 33.664-34.73 60.715-10.667 96.683 16.342 24.533 47.787 31.915 79.872 31.915 33.323 0 67.456-8.022 86.656-13.014 0.854-0.256 117.376-33.92 102.614-62.464-2.518-4.821-6.528-6.826-11.691-6.826-20.779 0-58.539 31.616-74.795 31.616-3.669 0-6.186-1.494-7.253-5.334-6.955-25.429 105.173-36.138 95.744-72.917-1.621-6.528-6.101-9.088-12.544-9.088-27.392 0-89.003 49.323-101.973 49.323-0.854 0-1.622-0.256-1.963-0.854-6.485-10.752-2.987-18.218 42.581-46.421 45.654-28.203 77.654-45.184 59.307-65.408-1.963-2.347-4.95-3.413-8.533-3.413-27.734 0-93.099 60.885-93.099 60.885s-17.621 18.73-28.288 18.73a6.4 6.4 0 0 1-5.93-3.413c-7.595-13.013 70.271-73.344 74.623-98.218 2.987-16.982-2.133-25.43-11.434-25.43z",
                                    fill: "#FF9D0B",
                                    "p-id": "5303"
                                  }),
                                  createVNode("path", {
                                    d: "M589.397 828.288c-23.978-36.053-22.314-63.147 10.667-96.768 32.896-33.621 52.053-82.987 52.053-82.987s7.211-28.586 23.595-25.856c16.213 2.646 28.16 45.312-5.93 71.467-34.22 26.155 6.826 43.904 19.968 19.37 13.227-24.533 49.152-87.637 67.755-99.797 18.56-12.032 31.744-5.333 27.306 19.627-4.352 24.917-82.218 85.248-74.624 98.176 7.51 13.141 34.219-15.232 34.219-15.232s83.627-77.739 101.76-57.472c18.133 20.224-13.781 37.205-59.35 65.408-45.653 28.16-49.151 35.67-42.751 46.379 6.528 10.709 107.178-76.118 116.565-39.254 9.43 36.694-102.613 47.318-95.701 72.747 6.954 25.43 78.933-48.043 93.696-19.456 14.762 28.63-101.675 62.293-102.614 62.55-37.632 9.983-133.162 31.146-166.528-18.902z",
                                    fill: "#FFD21E",
                                    "p-id": "5304"
                                  })
                                ]))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<p data-v-4311e476${_scopeId3}>Hugging Face</p></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "flex items-center space-x-2" }, [
                            createVNode(_component_el_icon, { size: "36" }, {
                              default: withCtx(() => [
                                (openBlock(), createBlock("svg", {
                                  t: "1759423762798",
                                  class: "icon",
                                  viewBox: "0 0 1024 1024",
                                  version: "1.1",
                                  xmlns: "http://www.w3.org/2000/svg",
                                  "p-id": "5295",
                                  width: "200",
                                  height: "200"
                                }, [
                                  createVNode("path", {
                                    d: "M509.824 826.581c167.467 0 303.275-138.837 303.275-310.101S677.29 206.379 509.824 206.379c-167.51 0-303.275 138.837-303.275 310.101s135.766 310.101 303.275 310.101z",
                                    fill: "#FFD21E",
                                    "p-id": "5296"
                                  }),
                                  createVNode("path", {
                                    d: "M813.099 516.48c0-171.264-135.808-310.101-303.275-310.101-167.51 0-303.275 138.837-303.275 310.101s135.766 310.101 303.275 310.101c167.467 0 303.275-138.837 303.275-310.101z m-641.451 0c0-123.563 64.427-237.696 169.088-299.52a331.733 331.733 0 0 1 338.176 0C783.531 278.784 848 392.917 848 516.48c0 190.976-151.424 345.77-338.176 345.77-186.795 0-338.176-154.794-338.176-345.77z",
                                    fill: "#FF9D0B",
                                    "p-id": "5297"
                                  }),
                                  createVNode("path", {
                                    d: "M608.341 432.128c11.179 3.925 15.531 27.307 26.795 21.248 15.573-8.448 24.661-25.685 22.997-43.648a44.373 44.373 0 0 0-30.677-38.4 43.05 43.05 0 0 0-46.421 14.25 45.44 45.44 0 0 0-4.907 49.323c5.333 10.24 22.272-6.4 32.299-2.858l-0.086 0.085z m-205.525 0c-11.179 3.925-15.616 27.307-26.795 21.248a44.843 44.843 0 0 1-22.954-43.648 44.373 44.373 0 0 1 30.634-38.4c16.896-5.29 35.2 0.341 46.464 14.25 11.222 13.91 13.142 33.366 4.864 49.323-5.333 10.24-22.357-6.4-32.298-2.858l0.085 0.085z",
                                    fill: "#3A3B45",
                                    "p-id": "5298"
                                  }),
                                  createVNode("path", {
                                    d: "M507.648 646.23c85.76 0 113.45-78.166 113.45-118.358 0-20.864-13.695-14.25-35.711-3.2-20.31 10.24-47.659 24.448-77.654 24.448-62.72 0-113.493-61.397-113.493-21.248 0 40.192 27.605 118.357 113.493 118.357h-0.085z",
                                    fill: "#FF323D",
                                    "p-id": "5299"
                                  }),
                                  createVNode("path", {
                                    d: "M441.941 625.792a76.373 76.373 0 0 1 46.251-40.107c3.456-1.024 7.04 5.12 10.795 11.435 3.498 6.101 7.168 12.245 10.837 12.245 3.925 0 7.85-6.058 11.605-12.032 3.926-6.272 7.766-12.33 11.52-11.178 18.774 6.101 34.39 19.456 43.648 37.205 32.555-26.24 44.502-69.035 44.502-95.488 0-20.864-13.696-14.25-35.712-3.2l-1.195 0.64c-20.181 10.24-47.061 23.808-76.544 23.808-29.525 0-56.32-13.568-76.544-23.808-22.699-11.52-36.907-18.773-36.907 2.56 0 27.221 12.715 71.936 47.744 97.92z",
                                    fill: "#3A3B45",
                                    "p-id": "5300"
                                  }),
                                  createVNode("path", {
                                    d: "M714.923 474.07a28.672 28.672 0 0 0 28.33-29.014 28.672 28.672 0 0 0-28.33-29.013 28.672 28.672 0 0 0-28.374 29.013c0 16.043 12.672 29.013 28.374 29.013z m-405.846 0a28.672 28.672 0 0 0 28.374-29.014 28.672 28.672 0 0 0-28.374-29.013 28.672 28.672 0 0 0-28.33 29.013c0 16.043 12.672 29.013 28.33 29.013z m-58.368 98.133c-14.122 0-26.709 5.93-35.498 16.725-7.552 9.515-11.648 21.333-11.648 33.536a60.715 60.715 0 0 0-16.896-2.645 45.653 45.653 0 0 0-34.39 14.805 52.65 52.65 0 0 0-6.997 62.464c-7.68 6.443-13.227 15.275-15.616 25.173-2.133 8.022-4.181 24.96 6.997 42.283-8.533 13.397-9.728 30.293-3.242 44.8 8.917 20.693 31.146 36.95 74.368 54.443 26.794 10.88 51.37 17.834 51.584 17.92 31.061 8.832 63.146 13.653 95.36 14.293 51.157 0 87.722-16.043 108.757-47.659 33.835-50.773 29.013-97.28-14.848-142.08-24.192-24.789-40.32-61.269-43.648-69.333-6.827-23.723-24.747-50.133-54.528-50.133a49.493 49.493 0 0 0-40.15 21.93c-8.746-11.221-17.28-20.053-24.96-25.173a63.573 63.573 0 0 0-34.645-11.307z m0 35.754c4.438 0 9.942 1.963 15.872 5.76 18.688 12.16 54.571 75.264 67.755 99.798 4.352 8.192 11.947 11.69 18.645 11.69 13.526 0 24.022-13.653 1.28-31.061-34.133-26.155-22.186-68.907-5.888-71.467 0.683-0.213 1.494-0.213 2.091-0.213 14.848 0 21.376 26.155 21.376 26.155s19.2 49.28 52.096 82.986c32.896 33.664 34.646 60.715 10.667 96.683-16.427 24.533-47.787 31.915-79.957 31.915-33.28 0-67.456-8.022-86.571-13.014-0.939-0.256-117.376-33.92-102.613-62.464 2.432-4.821 6.528-6.826 11.69-6.826 20.779 0 58.454 31.616 74.795 31.616 3.584 0 6.101-1.494 7.253-5.334 6.87-25.429-105.258-36.138-95.829-72.917 1.707-6.528 6.187-9.088 12.544-9.088 27.392 0-89.003 49.323-101.973 49.323-0.854 0-1.622-0.256-1.963-0.854-6.485-10.752-2.987-18.218 42.581-46.421 45.654-28.203 77.654-45.184 59.307-65.408-1.963-2.347-4.95-3.413-8.533-3.413-27.734 0-93.099 60.885-93.099 60.885s-17.621 18.73-28.288 18.73a6.4 6.4 0 0 1-5.93-3.413c-7.595-13.013 70.271-73.344 74.623-98.218 2.987-16.982-2.133-25.43-11.434-25.43z",
                                    fill: "#FF9D0B",
                                    "p-id": "5301"
                                  }),
                                  createVNode("path", {
                                    d: "M434.688 828.288c23.979-36.053 22.23-63.147-10.667-96.768-32.981-33.621-52.181-82.987-52.181-82.987s-7.168-28.586-23.467-25.856c-16.341 2.646-28.288 45.312 5.931 71.467 34.133 26.155-6.827 43.904 19.968 19.37-13.099-24.533-49.067-87.637-67.755-99.797-18.56-12.032-31.658-5.333-27.306 19.627 4.352 24.917 82.304 85.248 74.666 98.176-7.552 13.141-34.261-15.232-34.261-15.232s-83.499-77.739-101.76-57.515c-18.133 20.224 13.867 37.206 59.35 65.408 45.653 28.16 49.237 35.67 42.751 46.379-6.528 10.71-107.178-76.117-116.565-39.253-9.43 36.693 102.699 47.317 95.787 72.746-6.955 25.43-79.062-48.042-93.696-19.456-14.848 28.63 101.674 62.294 102.613 62.55 37.547 9.984 133.12 31.146 166.528-18.902z",
                                    fill: "#FFD21E",
                                    "p-id": "5302"
                                  }),
                                  createVNode("path", {
                                    d: "M773.29 572.245c14.123 0 26.795 5.888 35.5 16.683 7.551 9.515 11.647 21.333 11.647 33.536 5.504-1.707 11.222-2.56 16.982-2.645 13.525 0 25.77 5.248 34.389 14.805 15.872 16.81 18.73 42.41 6.997 62.464 7.68 6.443 13.142 15.275 15.531 25.173 2.133 8.022 4.181 24.96-6.997 42.283 8.533 13.397 9.728 30.293 3.242 44.8-8.917 20.693-31.146 36.95-74.24 54.443-26.88 10.88-51.498 17.834-51.712 17.92A378.965 378.965 0 0 1 669.27 896c-51.157 0-87.722-16.043-108.757-47.659-33.835-50.773-29.013-97.28 14.848-142.08 24.277-24.789 40.405-61.269 43.733-69.333 6.827-23.723 24.704-50.133 54.443-50.133 16.085 0.256 31.019 8.448 40.15 21.93 8.746-11.221 17.28-20.053 25.045-25.173 10.24-7.04 22.186-11.008 34.56-11.307z m0 35.712c-4.437 0-9.855 1.963-15.871 5.76-18.603 12.16-54.571 75.264-67.755 99.798a21.163 21.163 0 0 1-18.645 11.69c-13.44 0-24.022-13.653-1.238-31.061 34.134-26.155 22.187-68.907 5.846-71.467a13.141 13.141 0 0 0-2.091-0.213c-14.848 0-21.376 26.155-21.376 26.155s-19.2 49.28-52.096 82.986c-32.981 33.664-34.73 60.715-10.667 96.683 16.342 24.533 47.787 31.915 79.872 31.915 33.323 0 67.456-8.022 86.656-13.014 0.854-0.256 117.376-33.92 102.614-62.464-2.518-4.821-6.528-6.826-11.691-6.826-20.779 0-58.539 31.616-74.795 31.616-3.669 0-6.186-1.494-7.253-5.334-6.955-25.429 105.173-36.138 95.744-72.917-1.621-6.528-6.101-9.088-12.544-9.088-27.392 0-89.003 49.323-101.973 49.323-0.854 0-1.622-0.256-1.963-0.854-6.485-10.752-2.987-18.218 42.581-46.421 45.654-28.203 77.654-45.184 59.307-65.408-1.963-2.347-4.95-3.413-8.533-3.413-27.734 0-93.099 60.885-93.099 60.885s-17.621 18.73-28.288 18.73a6.4 6.4 0 0 1-5.93-3.413c-7.595-13.013 70.271-73.344 74.623-98.218 2.987-16.982-2.133-25.43-11.434-25.43z",
                                    fill: "#FF9D0B",
                                    "p-id": "5303"
                                  }),
                                  createVNode("path", {
                                    d: "M589.397 828.288c-23.978-36.053-22.314-63.147 10.667-96.768 32.896-33.621 52.053-82.987 52.053-82.987s7.211-28.586 23.595-25.856c16.213 2.646 28.16 45.312-5.93 71.467-34.22 26.155 6.826 43.904 19.968 19.37 13.227-24.533 49.152-87.637 67.755-99.797 18.56-12.032 31.744-5.333 27.306 19.627-4.352 24.917-82.218 85.248-74.624 98.176 7.51 13.141 34.219-15.232 34.219-15.232s83.627-77.739 101.76-57.472c18.133 20.224-13.781 37.205-59.35 65.408-45.653 28.16-49.151 35.67-42.751 46.379 6.528 10.709 107.178-76.118 116.565-39.254 9.43 36.694-102.613 47.318-95.701 72.747 6.954 25.43 78.933-48.043 93.696-19.456 14.762 28.63-101.675 62.293-102.614 62.55-37.632 9.983-133.162 31.146-166.528-18.902z",
                                    fill: "#FFD21E",
                                    "p-id": "5304"
                                  })
                                ]))
                              ]),
                              _: 1
                            }),
                            createVNode("p", null, "Hugging Face")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "https://openreview.net",
                    target: "_blank"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div data-v-4311e476${_scopeId3}><p data-v-4311e476${_scopeId3}>OpenReview</p></div>`);
                      } else {
                        return [
                          createVNode("div", null, [
                            createVNode("p", null, "OpenReview")
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div></div></div><div class="border-gray-800 pt-8" data-v-4311e476${_scopeId2}><div class="flex flex-col md:flex-row justify-between items-center" data-v-4311e476${_scopeId2}><p class="text-gray-500 text-sm mb-4 md:mb-0" data-v-4311e476${_scopeId2}> © 2025 法智调. 保留所有权利. </p><div class="flex space-x-6" data-v-4311e476${_scopeId2}><a href="#" class="text-gray-500 hover:text-white text-sm transition-colors" data-v-4311e476${_scopeId2}>隐私政策</a><a href="#" class="text-gray-500 hover:text-white text-sm transition-colors" data-v-4311e476${_scopeId2}>服务条款</a><a href="#" class="text-gray-500 hover:text-white text-sm transition-colors" data-v-4311e476${_scopeId2}>法律声明</a></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-12" }, [
                      createVNode("div", null, [
                        createVNode("div", { class: "flex items-center mb-6" }, [
                          createVNode("div", { class: "w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3" }, [
                            createVNode(_component_el_icon, {
                              size: "24",
                              class: "text-white"
                            }, {
                              default: withCtx(() => [
                                createVNode(unref(document_default))
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("h3", { class: "text-xl font-bold" }, "法智调")
                        ]),
                        createVNode("p", { class: "text-gray-400 mb-6" }, " 面向法院调解场景的智能助手系统，为金融纠纷提供公平、公正、高效的解决方案。 "),
                        createVNode("div", { class: "flex space-x-4" }, [
                          createVNode("a", {
                            href: "#",
                            class: "text-gray-400 hover:text-white transition-colors"
                          }, [
                            createVNode(_component_el_icon, { size: "24" })
                          ])
                        ])
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "text-lg font-semibold mb-6" }, "快速链接"),
                        createVNode("div", { class: "grid grid-cols-1 gap-4 items-center" }, [
                          createVNode(_component_NuxtLink, {
                            to: "https://github.com",
                            target: "_blank"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center space-x-2 w-min" }, [
                                createVNode(_component_el_icon, { size: "36" }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock("svg", {
                                      class: "svg-inline--fa fa-github fa-w-16 fa-lg",
                                      "aria-hidden": "true",
                                      focusable: "false",
                                      "data-prefix": "fab",
                                      "data-icon": "github",
                                      role: "img",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      viewBox: "0 0 496 512",
                                      "data-fa-i2svg": ""
                                    }, [
                                      createVNode("path", {
                                        fill: "currentColor",
                                        d: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                      })
                                    ]))
                                  ]),
                                  _: 1
                                }),
                                createVNode("p", null, "Github")
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_NuxtLink, {
                            to: "https://huggingface.co",
                            target: "_blank"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "flex items-center space-x-2" }, [
                                createVNode(_component_el_icon, { size: "36" }, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock("svg", {
                                      t: "1759423762798",
                                      class: "icon",
                                      viewBox: "0 0 1024 1024",
                                      version: "1.1",
                                      xmlns: "http://www.w3.org/2000/svg",
                                      "p-id": "5295",
                                      width: "200",
                                      height: "200"
                                    }, [
                                      createVNode("path", {
                                        d: "M509.824 826.581c167.467 0 303.275-138.837 303.275-310.101S677.29 206.379 509.824 206.379c-167.51 0-303.275 138.837-303.275 310.101s135.766 310.101 303.275 310.101z",
                                        fill: "#FFD21E",
                                        "p-id": "5296"
                                      }),
                                      createVNode("path", {
                                        d: "M813.099 516.48c0-171.264-135.808-310.101-303.275-310.101-167.51 0-303.275 138.837-303.275 310.101s135.766 310.101 303.275 310.101c167.467 0 303.275-138.837 303.275-310.101z m-641.451 0c0-123.563 64.427-237.696 169.088-299.52a331.733 331.733 0 0 1 338.176 0C783.531 278.784 848 392.917 848 516.48c0 190.976-151.424 345.77-338.176 345.77-186.795 0-338.176-154.794-338.176-345.77z",
                                        fill: "#FF9D0B",
                                        "p-id": "5297"
                                      }),
                                      createVNode("path", {
                                        d: "M608.341 432.128c11.179 3.925 15.531 27.307 26.795 21.248 15.573-8.448 24.661-25.685 22.997-43.648a44.373 44.373 0 0 0-30.677-38.4 43.05 43.05 0 0 0-46.421 14.25 45.44 45.44 0 0 0-4.907 49.323c5.333 10.24 22.272-6.4 32.299-2.858l-0.086 0.085z m-205.525 0c-11.179 3.925-15.616 27.307-26.795 21.248a44.843 44.843 0 0 1-22.954-43.648 44.373 44.373 0 0 1 30.634-38.4c16.896-5.29 35.2 0.341 46.464 14.25 11.222 13.91 13.142 33.366 4.864 49.323-5.333 10.24-22.357-6.4-32.298-2.858l0.085 0.085z",
                                        fill: "#3A3B45",
                                        "p-id": "5298"
                                      }),
                                      createVNode("path", {
                                        d: "M507.648 646.23c85.76 0 113.45-78.166 113.45-118.358 0-20.864-13.695-14.25-35.711-3.2-20.31 10.24-47.659 24.448-77.654 24.448-62.72 0-113.493-61.397-113.493-21.248 0 40.192 27.605 118.357 113.493 118.357h-0.085z",
                                        fill: "#FF323D",
                                        "p-id": "5299"
                                      }),
                                      createVNode("path", {
                                        d: "M441.941 625.792a76.373 76.373 0 0 1 46.251-40.107c3.456-1.024 7.04 5.12 10.795 11.435 3.498 6.101 7.168 12.245 10.837 12.245 3.925 0 7.85-6.058 11.605-12.032 3.926-6.272 7.766-12.33 11.52-11.178 18.774 6.101 34.39 19.456 43.648 37.205 32.555-26.24 44.502-69.035 44.502-95.488 0-20.864-13.696-14.25-35.712-3.2l-1.195 0.64c-20.181 10.24-47.061 23.808-76.544 23.808-29.525 0-56.32-13.568-76.544-23.808-22.699-11.52-36.907-18.773-36.907 2.56 0 27.221 12.715 71.936 47.744 97.92z",
                                        fill: "#3A3B45",
                                        "p-id": "5300"
                                      }),
                                      createVNode("path", {
                                        d: "M714.923 474.07a28.672 28.672 0 0 0 28.33-29.014 28.672 28.672 0 0 0-28.33-29.013 28.672 28.672 0 0 0-28.374 29.013c0 16.043 12.672 29.013 28.374 29.013z m-405.846 0a28.672 28.672 0 0 0 28.374-29.014 28.672 28.672 0 0 0-28.374-29.013 28.672 28.672 0 0 0-28.33 29.013c0 16.043 12.672 29.013 28.33 29.013z m-58.368 98.133c-14.122 0-26.709 5.93-35.498 16.725-7.552 9.515-11.648 21.333-11.648 33.536a60.715 60.715 0 0 0-16.896-2.645 45.653 45.653 0 0 0-34.39 14.805 52.65 52.65 0 0 0-6.997 62.464c-7.68 6.443-13.227 15.275-15.616 25.173-2.133 8.022-4.181 24.96 6.997 42.283-8.533 13.397-9.728 30.293-3.242 44.8 8.917 20.693 31.146 36.95 74.368 54.443 26.794 10.88 51.37 17.834 51.584 17.92 31.061 8.832 63.146 13.653 95.36 14.293 51.157 0 87.722-16.043 108.757-47.659 33.835-50.773 29.013-97.28-14.848-142.08-24.192-24.789-40.32-61.269-43.648-69.333-6.827-23.723-24.747-50.133-54.528-50.133a49.493 49.493 0 0 0-40.15 21.93c-8.746-11.221-17.28-20.053-24.96-25.173a63.573 63.573 0 0 0-34.645-11.307z m0 35.754c4.438 0 9.942 1.963 15.872 5.76 18.688 12.16 54.571 75.264 67.755 99.798 4.352 8.192 11.947 11.69 18.645 11.69 13.526 0 24.022-13.653 1.28-31.061-34.133-26.155-22.186-68.907-5.888-71.467 0.683-0.213 1.494-0.213 2.091-0.213 14.848 0 21.376 26.155 21.376 26.155s19.2 49.28 52.096 82.986c32.896 33.664 34.646 60.715 10.667 96.683-16.427 24.533-47.787 31.915-79.957 31.915-33.28 0-67.456-8.022-86.571-13.014-0.939-0.256-117.376-33.92-102.613-62.464 2.432-4.821 6.528-6.826 11.69-6.826 20.779 0 58.454 31.616 74.795 31.616 3.584 0 6.101-1.494 7.253-5.334 6.87-25.429-105.258-36.138-95.829-72.917 1.707-6.528 6.187-9.088 12.544-9.088 27.392 0-89.003 49.323-101.973 49.323-0.854 0-1.622-0.256-1.963-0.854-6.485-10.752-2.987-18.218 42.581-46.421 45.654-28.203 77.654-45.184 59.307-65.408-1.963-2.347-4.95-3.413-8.533-3.413-27.734 0-93.099 60.885-93.099 60.885s-17.621 18.73-28.288 18.73a6.4 6.4 0 0 1-5.93-3.413c-7.595-13.013 70.271-73.344 74.623-98.218 2.987-16.982-2.133-25.43-11.434-25.43z",
                                        fill: "#FF9D0B",
                                        "p-id": "5301"
                                      }),
                                      createVNode("path", {
                                        d: "M434.688 828.288c23.979-36.053 22.23-63.147-10.667-96.768-32.981-33.621-52.181-82.987-52.181-82.987s-7.168-28.586-23.467-25.856c-16.341 2.646-28.288 45.312 5.931 71.467 34.133 26.155-6.827 43.904 19.968 19.37-13.099-24.533-49.067-87.637-67.755-99.797-18.56-12.032-31.658-5.333-27.306 19.627 4.352 24.917 82.304 85.248 74.666 98.176-7.552 13.141-34.261-15.232-34.261-15.232s-83.499-77.739-101.76-57.515c-18.133 20.224 13.867 37.206 59.35 65.408 45.653 28.16 49.237 35.67 42.751 46.379-6.528 10.71-107.178-76.117-116.565-39.253-9.43 36.693 102.699 47.317 95.787 72.746-6.955 25.43-79.062-48.042-93.696-19.456-14.848 28.63 101.674 62.294 102.613 62.55 37.547 9.984 133.12 31.146 166.528-18.902z",
                                        fill: "#FFD21E",
                                        "p-id": "5302"
                                      }),
                                      createVNode("path", {
                                        d: "M773.29 572.245c14.123 0 26.795 5.888 35.5 16.683 7.551 9.515 11.647 21.333 11.647 33.536 5.504-1.707 11.222-2.56 16.982-2.645 13.525 0 25.77 5.248 34.389 14.805 15.872 16.81 18.73 42.41 6.997 62.464 7.68 6.443 13.142 15.275 15.531 25.173 2.133 8.022 4.181 24.96-6.997 42.283 8.533 13.397 9.728 30.293 3.242 44.8-8.917 20.693-31.146 36.95-74.24 54.443-26.88 10.88-51.498 17.834-51.712 17.92A378.965 378.965 0 0 1 669.27 896c-51.157 0-87.722-16.043-108.757-47.659-33.835-50.773-29.013-97.28 14.848-142.08 24.277-24.789 40.405-61.269 43.733-69.333 6.827-23.723 24.704-50.133 54.443-50.133 16.085 0.256 31.019 8.448 40.15 21.93 8.746-11.221 17.28-20.053 25.045-25.173 10.24-7.04 22.186-11.008 34.56-11.307z m0 35.712c-4.437 0-9.855 1.963-15.871 5.76-18.603 12.16-54.571 75.264-67.755 99.798a21.163 21.163 0 0 1-18.645 11.69c-13.44 0-24.022-13.653-1.238-31.061 34.134-26.155 22.187-68.907 5.846-71.467a13.141 13.141 0 0 0-2.091-0.213c-14.848 0-21.376 26.155-21.376 26.155s-19.2 49.28-52.096 82.986c-32.981 33.664-34.73 60.715-10.667 96.683 16.342 24.533 47.787 31.915 79.872 31.915 33.323 0 67.456-8.022 86.656-13.014 0.854-0.256 117.376-33.92 102.614-62.464-2.518-4.821-6.528-6.826-11.691-6.826-20.779 0-58.539 31.616-74.795 31.616-3.669 0-6.186-1.494-7.253-5.334-6.955-25.429 105.173-36.138 95.744-72.917-1.621-6.528-6.101-9.088-12.544-9.088-27.392 0-89.003 49.323-101.973 49.323-0.854 0-1.622-0.256-1.963-0.854-6.485-10.752-2.987-18.218 42.581-46.421 45.654-28.203 77.654-45.184 59.307-65.408-1.963-2.347-4.95-3.413-8.533-3.413-27.734 0-93.099 60.885-93.099 60.885s-17.621 18.73-28.288 18.73a6.4 6.4 0 0 1-5.93-3.413c-7.595-13.013 70.271-73.344 74.623-98.218 2.987-16.982-2.133-25.43-11.434-25.43z",
                                        fill: "#FF9D0B",
                                        "p-id": "5303"
                                      }),
                                      createVNode("path", {
                                        d: "M589.397 828.288c-23.978-36.053-22.314-63.147 10.667-96.768 32.896-33.621 52.053-82.987 52.053-82.987s7.211-28.586 23.595-25.856c16.213 2.646 28.16 45.312-5.93 71.467-34.22 26.155 6.826 43.904 19.968 19.37 13.227-24.533 49.152-87.637 67.755-99.797 18.56-12.032 31.744-5.333 27.306 19.627-4.352 24.917-82.218 85.248-74.624 98.176 7.51 13.141 34.219-15.232 34.219-15.232s83.627-77.739 101.76-57.472c18.133 20.224-13.781 37.205-59.35 65.408-45.653 28.16-49.151 35.67-42.751 46.379 6.528 10.709 107.178-76.118 116.565-39.254 9.43 36.694-102.613 47.318-95.701 72.747 6.954 25.43 78.933-48.043 93.696-19.456 14.762 28.63-101.675 62.293-102.614 62.55-37.632 9.983-133.162 31.146-166.528-18.902z",
                                        fill: "#FFD21E",
                                        "p-id": "5304"
                                      })
                                    ]))
                                  ]),
                                  _: 1
                                }),
                                createVNode("p", null, "Hugging Face")
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(_component_NuxtLink, {
                            to: "https://openreview.net",
                            target: "_blank"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", null, [
                                createVNode("p", null, "OpenReview")
                              ])
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    createVNode("div", { class: "border-gray-800 pt-8" }, [
                      createVNode("div", { class: "flex flex-col md:flex-row justify-between items-center" }, [
                        createVNode("p", { class: "text-gray-500 text-sm mb-4 md:mb-0" }, " © 2025 法智调. 保留所有权利. "),
                        createVNode("div", { class: "flex space-x-6" }, [
                          createVNode("a", {
                            href: "#",
                            class: "text-gray-500 hover:text-white text-sm transition-colors"
                          }, "隐私政策"),
                          createVNode("a", {
                            href: "#",
                            class: "text-gray-500 hover:text-white text-sm transition-colors"
                          }, "服务条款"),
                          createVNode("a", {
                            href: "#",
                            class: "text-gray-500 hover:text-white text-sm transition-colors"
                          }, "法律声明")
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_el_main, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-12" }, [
                    createVNode("div", null, [
                      createVNode("div", { class: "flex items-center mb-6" }, [
                        createVNode("div", { class: "w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3" }, [
                          createVNode(_component_el_icon, {
                            size: "24",
                            class: "text-white"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(document_default))
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("h3", { class: "text-xl font-bold" }, "法智调")
                      ]),
                      createVNode("p", { class: "text-gray-400 mb-6" }, " 面向法院调解场景的智能助手系统，为金融纠纷提供公平、公正、高效的解决方案。 "),
                      createVNode("div", { class: "flex space-x-4" }, [
                        createVNode("a", {
                          href: "#",
                          class: "text-gray-400 hover:text-white transition-colors"
                        }, [
                          createVNode(_component_el_icon, { size: "24" })
                        ])
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("h4", { class: "text-lg font-semibold mb-6" }, "快速链接"),
                      createVNode("div", { class: "grid grid-cols-1 gap-4 items-center" }, [
                        createVNode(_component_NuxtLink, {
                          to: "https://github.com",
                          target: "_blank"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center space-x-2 w-min" }, [
                              createVNode(_component_el_icon, { size: "36" }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock("svg", {
                                    class: "svg-inline--fa fa-github fa-w-16 fa-lg",
                                    "aria-hidden": "true",
                                    focusable: "false",
                                    "data-prefix": "fab",
                                    "data-icon": "github",
                                    role: "img",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 496 512",
                                    "data-fa-i2svg": ""
                                  }, [
                                    createVNode("path", {
                                      fill: "currentColor",
                                      d: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                                    })
                                  ]))
                                ]),
                                _: 1
                              }),
                              createVNode("p", null, "Github")
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_NuxtLink, {
                          to: "https://huggingface.co",
                          target: "_blank"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "flex items-center space-x-2" }, [
                              createVNode(_component_el_icon, { size: "36" }, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock("svg", {
                                    t: "1759423762798",
                                    class: "icon",
                                    viewBox: "0 0 1024 1024",
                                    version: "1.1",
                                    xmlns: "http://www.w3.org/2000/svg",
                                    "p-id": "5295",
                                    width: "200",
                                    height: "200"
                                  }, [
                                    createVNode("path", {
                                      d: "M509.824 826.581c167.467 0 303.275-138.837 303.275-310.101S677.29 206.379 509.824 206.379c-167.51 0-303.275 138.837-303.275 310.101s135.766 310.101 303.275 310.101z",
                                      fill: "#FFD21E",
                                      "p-id": "5296"
                                    }),
                                    createVNode("path", {
                                      d: "M813.099 516.48c0-171.264-135.808-310.101-303.275-310.101-167.51 0-303.275 138.837-303.275 310.101s135.766 310.101 303.275 310.101c167.467 0 303.275-138.837 303.275-310.101z m-641.451 0c0-123.563 64.427-237.696 169.088-299.52a331.733 331.733 0 0 1 338.176 0C783.531 278.784 848 392.917 848 516.48c0 190.976-151.424 345.77-338.176 345.77-186.795 0-338.176-154.794-338.176-345.77z",
                                      fill: "#FF9D0B",
                                      "p-id": "5297"
                                    }),
                                    createVNode("path", {
                                      d: "M608.341 432.128c11.179 3.925 15.531 27.307 26.795 21.248 15.573-8.448 24.661-25.685 22.997-43.648a44.373 44.373 0 0 0-30.677-38.4 43.05 43.05 0 0 0-46.421 14.25 45.44 45.44 0 0 0-4.907 49.323c5.333 10.24 22.272-6.4 32.299-2.858l-0.086 0.085z m-205.525 0c-11.179 3.925-15.616 27.307-26.795 21.248a44.843 44.843 0 0 1-22.954-43.648 44.373 44.373 0 0 1 30.634-38.4c16.896-5.29 35.2 0.341 46.464 14.25 11.222 13.91 13.142 33.366 4.864 49.323-5.333 10.24-22.357-6.4-32.298-2.858l0.085 0.085z",
                                      fill: "#3A3B45",
                                      "p-id": "5298"
                                    }),
                                    createVNode("path", {
                                      d: "M507.648 646.23c85.76 0 113.45-78.166 113.45-118.358 0-20.864-13.695-14.25-35.711-3.2-20.31 10.24-47.659 24.448-77.654 24.448-62.72 0-113.493-61.397-113.493-21.248 0 40.192 27.605 118.357 113.493 118.357h-0.085z",
                                      fill: "#FF323D",
                                      "p-id": "5299"
                                    }),
                                    createVNode("path", {
                                      d: "M441.941 625.792a76.373 76.373 0 0 1 46.251-40.107c3.456-1.024 7.04 5.12 10.795 11.435 3.498 6.101 7.168 12.245 10.837 12.245 3.925 0 7.85-6.058 11.605-12.032 3.926-6.272 7.766-12.33 11.52-11.178 18.774 6.101 34.39 19.456 43.648 37.205 32.555-26.24 44.502-69.035 44.502-95.488 0-20.864-13.696-14.25-35.712-3.2l-1.195 0.64c-20.181 10.24-47.061 23.808-76.544 23.808-29.525 0-56.32-13.568-76.544-23.808-22.699-11.52-36.907-18.773-36.907 2.56 0 27.221 12.715 71.936 47.744 97.92z",
                                      fill: "#3A3B45",
                                      "p-id": "5300"
                                    }),
                                    createVNode("path", {
                                      d: "M714.923 474.07a28.672 28.672 0 0 0 28.33-29.014 28.672 28.672 0 0 0-28.33-29.013 28.672 28.672 0 0 0-28.374 29.013c0 16.043 12.672 29.013 28.374 29.013z m-405.846 0a28.672 28.672 0 0 0 28.374-29.014 28.672 28.672 0 0 0-28.374-29.013 28.672 28.672 0 0 0-28.33 29.013c0 16.043 12.672 29.013 28.33 29.013z m-58.368 98.133c-14.122 0-26.709 5.93-35.498 16.725-7.552 9.515-11.648 21.333-11.648 33.536a60.715 60.715 0 0 0-16.896-2.645 45.653 45.653 0 0 0-34.39 14.805 52.65 52.65 0 0 0-6.997 62.464c-7.68 6.443-13.227 15.275-15.616 25.173-2.133 8.022-4.181 24.96 6.997 42.283-8.533 13.397-9.728 30.293-3.242 44.8 8.917 20.693 31.146 36.95 74.368 54.443 26.794 10.88 51.37 17.834 51.584 17.92 31.061 8.832 63.146 13.653 95.36 14.293 51.157 0 87.722-16.043 108.757-47.659 33.835-50.773 29.013-97.28-14.848-142.08-24.192-24.789-40.32-61.269-43.648-69.333-6.827-23.723-24.747-50.133-54.528-50.133a49.493 49.493 0 0 0-40.15 21.93c-8.746-11.221-17.28-20.053-24.96-25.173a63.573 63.573 0 0 0-34.645-11.307z m0 35.754c4.438 0 9.942 1.963 15.872 5.76 18.688 12.16 54.571 75.264 67.755 99.798 4.352 8.192 11.947 11.69 18.645 11.69 13.526 0 24.022-13.653 1.28-31.061-34.133-26.155-22.186-68.907-5.888-71.467 0.683-0.213 1.494-0.213 2.091-0.213 14.848 0 21.376 26.155 21.376 26.155s19.2 49.28 52.096 82.986c32.896 33.664 34.646 60.715 10.667 96.683-16.427 24.533-47.787 31.915-79.957 31.915-33.28 0-67.456-8.022-86.571-13.014-0.939-0.256-117.376-33.92-102.613-62.464 2.432-4.821 6.528-6.826 11.69-6.826 20.779 0 58.454 31.616 74.795 31.616 3.584 0 6.101-1.494 7.253-5.334 6.87-25.429-105.258-36.138-95.829-72.917 1.707-6.528 6.187-9.088 12.544-9.088 27.392 0-89.003 49.323-101.973 49.323-0.854 0-1.622-0.256-1.963-0.854-6.485-10.752-2.987-18.218 42.581-46.421 45.654-28.203 77.654-45.184 59.307-65.408-1.963-2.347-4.95-3.413-8.533-3.413-27.734 0-93.099 60.885-93.099 60.885s-17.621 18.73-28.288 18.73a6.4 6.4 0 0 1-5.93-3.413c-7.595-13.013 70.271-73.344 74.623-98.218 2.987-16.982-2.133-25.43-11.434-25.43z",
                                      fill: "#FF9D0B",
                                      "p-id": "5301"
                                    }),
                                    createVNode("path", {
                                      d: "M434.688 828.288c23.979-36.053 22.23-63.147-10.667-96.768-32.981-33.621-52.181-82.987-52.181-82.987s-7.168-28.586-23.467-25.856c-16.341 2.646-28.288 45.312 5.931 71.467 34.133 26.155-6.827 43.904 19.968 19.37-13.099-24.533-49.067-87.637-67.755-99.797-18.56-12.032-31.658-5.333-27.306 19.627 4.352 24.917 82.304 85.248 74.666 98.176-7.552 13.141-34.261-15.232-34.261-15.232s-83.499-77.739-101.76-57.515c-18.133 20.224 13.867 37.206 59.35 65.408 45.653 28.16 49.237 35.67 42.751 46.379-6.528 10.71-107.178-76.117-116.565-39.253-9.43 36.693 102.699 47.317 95.787 72.746-6.955 25.43-79.062-48.042-93.696-19.456-14.848 28.63 101.674 62.294 102.613 62.55 37.547 9.984 133.12 31.146 166.528-18.902z",
                                      fill: "#FFD21E",
                                      "p-id": "5302"
                                    }),
                                    createVNode("path", {
                                      d: "M773.29 572.245c14.123 0 26.795 5.888 35.5 16.683 7.551 9.515 11.647 21.333 11.647 33.536 5.504-1.707 11.222-2.56 16.982-2.645 13.525 0 25.77 5.248 34.389 14.805 15.872 16.81 18.73 42.41 6.997 62.464 7.68 6.443 13.142 15.275 15.531 25.173 2.133 8.022 4.181 24.96-6.997 42.283 8.533 13.397 9.728 30.293 3.242 44.8-8.917 20.693-31.146 36.95-74.24 54.443-26.88 10.88-51.498 17.834-51.712 17.92A378.965 378.965 0 0 1 669.27 896c-51.157 0-87.722-16.043-108.757-47.659-33.835-50.773-29.013-97.28 14.848-142.08 24.277-24.789 40.405-61.269 43.733-69.333 6.827-23.723 24.704-50.133 54.443-50.133 16.085 0.256 31.019 8.448 40.15 21.93 8.746-11.221 17.28-20.053 25.045-25.173 10.24-7.04 22.186-11.008 34.56-11.307z m0 35.712c-4.437 0-9.855 1.963-15.871 5.76-18.603 12.16-54.571 75.264-67.755 99.798a21.163 21.163 0 0 1-18.645 11.69c-13.44 0-24.022-13.653-1.238-31.061 34.134-26.155 22.187-68.907 5.846-71.467a13.141 13.141 0 0 0-2.091-0.213c-14.848 0-21.376 26.155-21.376 26.155s-19.2 49.28-52.096 82.986c-32.981 33.664-34.73 60.715-10.667 96.683 16.342 24.533 47.787 31.915 79.872 31.915 33.323 0 67.456-8.022 86.656-13.014 0.854-0.256 117.376-33.92 102.614-62.464-2.518-4.821-6.528-6.826-11.691-6.826-20.779 0-58.539 31.616-74.795 31.616-3.669 0-6.186-1.494-7.253-5.334-6.955-25.429 105.173-36.138 95.744-72.917-1.621-6.528-6.101-9.088-12.544-9.088-27.392 0-89.003 49.323-101.973 49.323-0.854 0-1.622-0.256-1.963-0.854-6.485-10.752-2.987-18.218 42.581-46.421 45.654-28.203 77.654-45.184 59.307-65.408-1.963-2.347-4.95-3.413-8.533-3.413-27.734 0-93.099 60.885-93.099 60.885s-17.621 18.73-28.288 18.73a6.4 6.4 0 0 1-5.93-3.413c-7.595-13.013 70.271-73.344 74.623-98.218 2.987-16.982-2.133-25.43-11.434-25.43z",
                                      fill: "#FF9D0B",
                                      "p-id": "5303"
                                    }),
                                    createVNode("path", {
                                      d: "M589.397 828.288c-23.978-36.053-22.314-63.147 10.667-96.768 32.896-33.621 52.053-82.987 52.053-82.987s7.211-28.586 23.595-25.856c16.213 2.646 28.16 45.312-5.93 71.467-34.22 26.155 6.826 43.904 19.968 19.37 13.227-24.533 49.152-87.637 67.755-99.797 18.56-12.032 31.744-5.333 27.306 19.627-4.352 24.917-82.218 85.248-74.624 98.176 7.51 13.141 34.219-15.232 34.219-15.232s83.627-77.739 101.76-57.472c18.133 20.224-13.781 37.205-59.35 65.408-45.653 28.16-49.151 35.67-42.751 46.379 6.528 10.709 107.178-76.118 116.565-39.254 9.43 36.694-102.613 47.318-95.701 72.747 6.954 25.43 78.933-48.043 93.696-19.456 14.762 28.63-101.675 62.293-102.614 62.55-37.632 9.983-133.162 31.146-166.528-18.902z",
                                      fill: "#FFD21E",
                                      "p-id": "5304"
                                    })
                                  ]))
                                ]),
                                _: 1
                              }),
                              createVNode("p", null, "Hugging Face")
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(_component_NuxtLink, {
                          to: "https://openreview.net",
                          target: "_blank"
                        }, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode("p", null, "OpenReview")
                            ])
                          ]),
                          _: 1
                        })
                      ])
                    ])
                  ]),
                  createVNode("div", { class: "border-gray-800 pt-8" }, [
                    createVNode("div", { class: "flex flex-col md:flex-row justify-between items-center" }, [
                      createVNode("p", { class: "text-gray-500 text-sm mb-4 md:mb-0" }, " © 2025 法智调. 保留所有权利. "),
                      createVNode("div", { class: "flex space-x-6" }, [
                        createVNode("a", {
                          href: "#",
                          class: "text-gray-500 hover:text-white text-sm transition-colors"
                        }, "隐私政策"),
                        createVNode("a", {
                          href: "#",
                          class: "text-gray-500 hover:text-white text-sm transition-colors"
                        }, "服务条款"),
                        createVNode("a", {
                          href: "#",
                          class: "text-gray-500 hover:text-white text-sm transition-colors"
                        }, "法律声明")
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</footer>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ Object.assign(_export_sfc$1(_sfc_main$1, [["__scopeId", "data-v-4311e476"]]), { __name: "Footer" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen w-full bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" }, _attrs))} data-v-44e921e9>`);
      _push(ssrRenderComponent(Navbar, null, null, _parent));
      _push(ssrRenderComponent(HeroSection, null, null, _parent));
      _push(ssrRenderComponent(OverviewSection, null, null, _parent));
      _push(ssrRenderComponent(FeaturesSection, null, null, _parent));
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc$1(_sfc_main, [["__scopeId", "data-v-44e921e9"]]);

export { index as default };
