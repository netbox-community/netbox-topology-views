(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
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
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __reExport = (target, module, desc) => {
    if (module && typeof module === "object" || typeof module === "function") {
      for (let key of __getOwnPropNames(module))
        if (!__hasOwnProp.call(target, key) && key !== "default")
          __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
    }
    return target;
  };
  var __toModule = (module) => {
    return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x2) => x2.done ? resolve(x2.value) : Promise.resolve(x2.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/component-emitter/index.js
  var require_component_emitter = __commonJS({
    "node_modules/component-emitter/index.js"(exports, module) {
      if (typeof module !== "undefined") {
        module.exports = Emitter3;
      }
      function Emitter3(obj) {
        if (obj)
          return mixin(obj);
      }
      function mixin(obj) {
        for (var key in Emitter3.prototype) {
          obj[key] = Emitter3.prototype[key];
        }
        return obj;
      }
      Emitter3.prototype.on = Emitter3.prototype.addEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
        return this;
      };
      Emitter3.prototype.once = function(event, fn) {
        function on() {
          this.off(event, on);
          fn.apply(this, arguments);
        }
        on.fn = fn;
        this.on(event, on);
        return this;
      };
      Emitter3.prototype.off = Emitter3.prototype.removeListener = Emitter3.prototype.removeAllListeners = Emitter3.prototype.removeEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        if (arguments.length == 0) {
          this._callbacks = {};
          return this;
        }
        var callbacks = this._callbacks["$" + event];
        if (!callbacks)
          return this;
        if (arguments.length == 1) {
          delete this._callbacks["$" + event];
          return this;
        }
        var cb;
        for (var i2 = 0; i2 < callbacks.length; i2++) {
          cb = callbacks[i2];
          if (cb === fn || cb.fn === fn) {
            callbacks.splice(i2, 1);
            break;
          }
        }
        if (callbacks.length === 0) {
          delete this._callbacks["$" + event];
        }
        return this;
      };
      Emitter3.prototype.emit = function(event) {
        this._callbacks = this._callbacks || {};
        var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
        for (var i2 = 1; i2 < arguments.length; i2++) {
          args[i2 - 1] = arguments[i2];
        }
        if (callbacks) {
          callbacks = callbacks.slice(0);
          for (var i2 = 0, len = callbacks.length; i2 < len; ++i2) {
            callbacks[i2].apply(this, args);
          }
        }
        return this;
      };
      Emitter3.prototype.listeners = function(event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks["$" + event] || [];
      };
      Emitter3.prototype.hasListeners = function(event) {
        return !!this.listeners(event).length;
      };
    }
  });

  // node_modules/vis-util/esnext/esm/vis-util.js
  var import_component_emitter = __toModule(require_component_emitter());

  // node_modules/@egjs/hammerjs/dist/hammer.esm.js
  function _extends() {
    _extends = Object.assign || function(target) {
      for (var i2 = 1; i2 < arguments.length; i2++) {
        var source = arguments[i2];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    return _extends.apply(this, arguments);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    subClass.__proto__ = superClass;
  }
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }
  var assign;
  if (typeof Object.assign !== "function") {
    assign = function assign2(target) {
      if (target === void 0 || target === null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      var output = Object(target);
      for (var index2 = 1; index2 < arguments.length; index2++) {
        var source = arguments[index2];
        if (source !== void 0 && source !== null) {
          for (var nextKey in source) {
            if (source.hasOwnProperty(nextKey)) {
              output[nextKey] = source[nextKey];
            }
          }
        }
      }
      return output;
    };
  } else {
    assign = Object.assign;
  }
  var assign$1 = assign;
  var VENDOR_PREFIXES = ["", "webkit", "Moz", "MS", "ms", "o"];
  var TEST_ELEMENT = typeof document === "undefined" ? {
    style: {}
  } : document.createElement("div");
  var TYPE_FUNCTION = "function";
  var round = Math.round;
  var abs = Math.abs;
  var now = Date.now;
  function prefixed(obj, property) {
    var prefix;
    var prop;
    var camelProp = property[0].toUpperCase() + property.slice(1);
    var i2 = 0;
    while (i2 < VENDOR_PREFIXES.length) {
      prefix = VENDOR_PREFIXES[i2];
      prop = prefix ? prefix + camelProp : property;
      if (prop in obj) {
        return prop;
      }
      i2++;
    }
    return void 0;
  }
  var win;
  if (typeof window === "undefined") {
    win = {};
  } else {
    win = window;
  }
  var PREFIXED_TOUCH_ACTION = prefixed(TEST_ELEMENT.style, "touchAction");
  var NATIVE_TOUCH_ACTION = PREFIXED_TOUCH_ACTION !== void 0;
  function getTouchActionProps() {
    if (!NATIVE_TOUCH_ACTION) {
      return false;
    }
    var touchMap = {};
    var cssSupports = win.CSS && win.CSS.supports;
    ["auto", "manipulation", "pan-y", "pan-x", "pan-x pan-y", "none"].forEach(function(val) {
      return touchMap[val] = cssSupports ? win.CSS.supports("touch-action", val) : true;
    });
    return touchMap;
  }
  var TOUCH_ACTION_COMPUTE = "compute";
  var TOUCH_ACTION_AUTO = "auto";
  var TOUCH_ACTION_MANIPULATION = "manipulation";
  var TOUCH_ACTION_NONE = "none";
  var TOUCH_ACTION_PAN_X = "pan-x";
  var TOUCH_ACTION_PAN_Y = "pan-y";
  var TOUCH_ACTION_MAP = getTouchActionProps();
  var MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
  var SUPPORT_TOUCH = "ontouchstart" in win;
  var SUPPORT_POINTER_EVENTS = prefixed(win, "PointerEvent") !== void 0;
  var SUPPORT_ONLY_TOUCH = SUPPORT_TOUCH && MOBILE_REGEX.test(navigator.userAgent);
  var INPUT_TYPE_TOUCH = "touch";
  var INPUT_TYPE_PEN = "pen";
  var INPUT_TYPE_MOUSE = "mouse";
  var INPUT_TYPE_KINECT = "kinect";
  var COMPUTE_INTERVAL = 25;
  var INPUT_START = 1;
  var INPUT_MOVE = 2;
  var INPUT_END = 4;
  var INPUT_CANCEL = 8;
  var DIRECTION_NONE = 1;
  var DIRECTION_LEFT = 2;
  var DIRECTION_RIGHT = 4;
  var DIRECTION_UP = 8;
  var DIRECTION_DOWN = 16;
  var DIRECTION_HORIZONTAL = DIRECTION_LEFT | DIRECTION_RIGHT;
  var DIRECTION_VERTICAL = DIRECTION_UP | DIRECTION_DOWN;
  var DIRECTION_ALL = DIRECTION_HORIZONTAL | DIRECTION_VERTICAL;
  var PROPS_XY = ["x", "y"];
  var PROPS_CLIENT_XY = ["clientX", "clientY"];
  function each(obj, iterator, context) {
    var i2;
    if (!obj) {
      return;
    }
    if (obj.forEach) {
      obj.forEach(iterator, context);
    } else if (obj.length !== void 0) {
      i2 = 0;
      while (i2 < obj.length) {
        iterator.call(context, obj[i2], i2, obj);
        i2++;
      }
    } else {
      for (i2 in obj) {
        obj.hasOwnProperty(i2) && iterator.call(context, obj[i2], i2, obj);
      }
    }
  }
  function boolOrFn(val, args) {
    if (typeof val === TYPE_FUNCTION) {
      return val.apply(args ? args[0] || void 0 : void 0, args);
    }
    return val;
  }
  function inStr(str, find) {
    return str.indexOf(find) > -1;
  }
  function cleanTouchActions(actions) {
    if (inStr(actions, TOUCH_ACTION_NONE)) {
      return TOUCH_ACTION_NONE;
    }
    var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X);
    var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y);
    if (hasPanX && hasPanY) {
      return TOUCH_ACTION_NONE;
    }
    if (hasPanX || hasPanY) {
      return hasPanX ? TOUCH_ACTION_PAN_X : TOUCH_ACTION_PAN_Y;
    }
    if (inStr(actions, TOUCH_ACTION_MANIPULATION)) {
      return TOUCH_ACTION_MANIPULATION;
    }
    return TOUCH_ACTION_AUTO;
  }
  var TouchAction = /* @__PURE__ */ function() {
    function TouchAction2(manager, value) {
      this.manager = manager;
      this.set(value);
    }
    var _proto = TouchAction2.prototype;
    _proto.set = function set(value) {
      if (value === TOUCH_ACTION_COMPUTE) {
        value = this.compute();
      }
      if (NATIVE_TOUCH_ACTION && this.manager.element.style && TOUCH_ACTION_MAP[value]) {
        this.manager.element.style[PREFIXED_TOUCH_ACTION] = value;
      }
      this.actions = value.toLowerCase().trim();
    };
    _proto.update = function update() {
      this.set(this.manager.options.touchAction);
    };
    _proto.compute = function compute() {
      var actions = [];
      each(this.manager.recognizers, function(recognizer) {
        if (boolOrFn(recognizer.options.enable, [recognizer])) {
          actions = actions.concat(recognizer.getTouchAction());
        }
      });
      return cleanTouchActions(actions.join(" "));
    };
    _proto.preventDefaults = function preventDefaults(input) {
      var srcEvent = input.srcEvent;
      var direction = input.offsetDirection;
      if (this.manager.session.prevented) {
        srcEvent.preventDefault();
        return;
      }
      var actions = this.actions;
      var hasNone = inStr(actions, TOUCH_ACTION_NONE) && !TOUCH_ACTION_MAP[TOUCH_ACTION_NONE];
      var hasPanY = inStr(actions, TOUCH_ACTION_PAN_Y) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_Y];
      var hasPanX = inStr(actions, TOUCH_ACTION_PAN_X) && !TOUCH_ACTION_MAP[TOUCH_ACTION_PAN_X];
      if (hasNone) {
        var isTapPointer = input.pointers.length === 1;
        var isTapMovement = input.distance < 2;
        var isTapTouchTime = input.deltaTime < 250;
        if (isTapPointer && isTapMovement && isTapTouchTime) {
          return;
        }
      }
      if (hasPanX && hasPanY) {
        return;
      }
      if (hasNone || hasPanY && direction & DIRECTION_HORIZONTAL || hasPanX && direction & DIRECTION_VERTICAL) {
        return this.preventSrc(srcEvent);
      }
    };
    _proto.preventSrc = function preventSrc(srcEvent) {
      this.manager.session.prevented = true;
      srcEvent.preventDefault();
    };
    return TouchAction2;
  }();
  function hasParent(node, parent) {
    while (node) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
  function getCenter(pointers) {
    var pointersLength = pointers.length;
    if (pointersLength === 1) {
      return {
        x: round(pointers[0].clientX),
        y: round(pointers[0].clientY)
      };
    }
    var x2 = 0;
    var y2 = 0;
    var i2 = 0;
    while (i2 < pointersLength) {
      x2 += pointers[i2].clientX;
      y2 += pointers[i2].clientY;
      i2++;
    }
    return {
      x: round(x2 / pointersLength),
      y: round(y2 / pointersLength)
    };
  }
  function simpleCloneInputData(input) {
    var pointers = [];
    var i2 = 0;
    while (i2 < input.pointers.length) {
      pointers[i2] = {
        clientX: round(input.pointers[i2].clientX),
        clientY: round(input.pointers[i2].clientY)
      };
      i2++;
    }
    return {
      timeStamp: now(),
      pointers,
      center: getCenter(pointers),
      deltaX: input.deltaX,
      deltaY: input.deltaY
    };
  }
  function getDistance(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }
    var x2 = p2[props[0]] - p1[props[0]];
    var y2 = p2[props[1]] - p1[props[1]];
    return Math.sqrt(x2 * x2 + y2 * y2);
  }
  function getAngle(p1, p2, props) {
    if (!props) {
      props = PROPS_XY;
    }
    var x2 = p2[props[0]] - p1[props[0]];
    var y2 = p2[props[1]] - p1[props[1]];
    return Math.atan2(y2, x2) * 180 / Math.PI;
  }
  function getDirection(x2, y2) {
    if (x2 === y2) {
      return DIRECTION_NONE;
    }
    if (abs(x2) >= abs(y2)) {
      return x2 < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
    }
    return y2 < 0 ? DIRECTION_UP : DIRECTION_DOWN;
  }
  function computeDeltaXY(session, input) {
    var center = input.center;
    var offset = session.offsetDelta || {};
    var prevDelta = session.prevDelta || {};
    var prevInput = session.prevInput || {};
    if (input.eventType === INPUT_START || prevInput.eventType === INPUT_END) {
      prevDelta = session.prevDelta = {
        x: prevInput.deltaX || 0,
        y: prevInput.deltaY || 0
      };
      offset = session.offsetDelta = {
        x: center.x,
        y: center.y
      };
    }
    input.deltaX = prevDelta.x + (center.x - offset.x);
    input.deltaY = prevDelta.y + (center.y - offset.y);
  }
  function getVelocity(deltaTime, x2, y2) {
    return {
      x: x2 / deltaTime || 0,
      y: y2 / deltaTime || 0
    };
  }
  function getScale(start, end) {
    return getDistance(end[0], end[1], PROPS_CLIENT_XY) / getDistance(start[0], start[1], PROPS_CLIENT_XY);
  }
  function getRotation(start, end) {
    return getAngle(end[1], end[0], PROPS_CLIENT_XY) + getAngle(start[1], start[0], PROPS_CLIENT_XY);
  }
  function computeIntervalInputData(session, input) {
    var last = session.lastInterval || input;
    var deltaTime = input.timeStamp - last.timeStamp;
    var velocity;
    var velocityX;
    var velocityY;
    var direction;
    if (input.eventType !== INPUT_CANCEL && (deltaTime > COMPUTE_INTERVAL || last.velocity === void 0)) {
      var deltaX = input.deltaX - last.deltaX;
      var deltaY = input.deltaY - last.deltaY;
      var v = getVelocity(deltaTime, deltaX, deltaY);
      velocityX = v.x;
      velocityY = v.y;
      velocity = abs(v.x) > abs(v.y) ? v.x : v.y;
      direction = getDirection(deltaX, deltaY);
      session.lastInterval = input;
    } else {
      velocity = last.velocity;
      velocityX = last.velocityX;
      velocityY = last.velocityY;
      direction = last.direction;
    }
    input.velocity = velocity;
    input.velocityX = velocityX;
    input.velocityY = velocityY;
    input.direction = direction;
  }
  function computeInputData(manager, input) {
    var session = manager.session;
    var pointers = input.pointers;
    var pointersLength = pointers.length;
    if (!session.firstInput) {
      session.firstInput = simpleCloneInputData(input);
    }
    if (pointersLength > 1 && !session.firstMultiple) {
      session.firstMultiple = simpleCloneInputData(input);
    } else if (pointersLength === 1) {
      session.firstMultiple = false;
    }
    var firstInput = session.firstInput, firstMultiple = session.firstMultiple;
    var offsetCenter = firstMultiple ? firstMultiple.center : firstInput.center;
    var center = input.center = getCenter(pointers);
    input.timeStamp = now();
    input.deltaTime = input.timeStamp - firstInput.timeStamp;
    input.angle = getAngle(offsetCenter, center);
    input.distance = getDistance(offsetCenter, center);
    computeDeltaXY(session, input);
    input.offsetDirection = getDirection(input.deltaX, input.deltaY);
    var overallVelocity = getVelocity(input.deltaTime, input.deltaX, input.deltaY);
    input.overallVelocityX = overallVelocity.x;
    input.overallVelocityY = overallVelocity.y;
    input.overallVelocity = abs(overallVelocity.x) > abs(overallVelocity.y) ? overallVelocity.x : overallVelocity.y;
    input.scale = firstMultiple ? getScale(firstMultiple.pointers, pointers) : 1;
    input.rotation = firstMultiple ? getRotation(firstMultiple.pointers, pointers) : 0;
    input.maxPointers = !session.prevInput ? input.pointers.length : input.pointers.length > session.prevInput.maxPointers ? input.pointers.length : session.prevInput.maxPointers;
    computeIntervalInputData(session, input);
    var target = manager.element;
    var srcEvent = input.srcEvent;
    var srcEventTarget;
    if (srcEvent.composedPath) {
      srcEventTarget = srcEvent.composedPath()[0];
    } else if (srcEvent.path) {
      srcEventTarget = srcEvent.path[0];
    } else {
      srcEventTarget = srcEvent.target;
    }
    if (hasParent(srcEventTarget, target)) {
      target = srcEventTarget;
    }
    input.target = target;
  }
  function inputHandler(manager, eventType, input) {
    var pointersLen = input.pointers.length;
    var changedPointersLen = input.changedPointers.length;
    var isFirst = eventType & INPUT_START && pointersLen - changedPointersLen === 0;
    var isFinal = eventType & (INPUT_END | INPUT_CANCEL) && pointersLen - changedPointersLen === 0;
    input.isFirst = !!isFirst;
    input.isFinal = !!isFinal;
    if (isFirst) {
      manager.session = {};
    }
    input.eventType = eventType;
    computeInputData(manager, input);
    manager.emit("hammer.input", input);
    manager.recognize(input);
    manager.session.prevInput = input;
  }
  function splitStr(str) {
    return str.trim().split(/\s+/g);
  }
  function addEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
      target.addEventListener(type, handler, false);
    });
  }
  function removeEventListeners(target, types, handler) {
    each(splitStr(types), function(type) {
      target.removeEventListener(type, handler, false);
    });
  }
  function getWindowForElement(element) {
    var doc = element.ownerDocument || element;
    return doc.defaultView || doc.parentWindow || window;
  }
  var Input = /* @__PURE__ */ function() {
    function Input2(manager, callback) {
      var self = this;
      this.manager = manager;
      this.callback = callback;
      this.element = manager.element;
      this.target = manager.options.inputTarget;
      this.domHandler = function(ev) {
        if (boolOrFn(manager.options.enable, [manager])) {
          self.handler(ev);
        }
      };
      this.init();
    }
    var _proto = Input2.prototype;
    _proto.handler = function handler() {
    };
    _proto.init = function init() {
      this.evEl && addEventListeners(this.element, this.evEl, this.domHandler);
      this.evTarget && addEventListeners(this.target, this.evTarget, this.domHandler);
      this.evWin && addEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    };
    _proto.destroy = function destroy() {
      this.evEl && removeEventListeners(this.element, this.evEl, this.domHandler);
      this.evTarget && removeEventListeners(this.target, this.evTarget, this.domHandler);
      this.evWin && removeEventListeners(getWindowForElement(this.element), this.evWin, this.domHandler);
    };
    return Input2;
  }();
  function inArray(src, find, findByKey) {
    if (src.indexOf && !findByKey) {
      return src.indexOf(find);
    } else {
      var i2 = 0;
      while (i2 < src.length) {
        if (findByKey && src[i2][findByKey] == find || !findByKey && src[i2] === find) {
          return i2;
        }
        i2++;
      }
      return -1;
    }
  }
  var POINTER_INPUT_MAP = {
    pointerdown: INPUT_START,
    pointermove: INPUT_MOVE,
    pointerup: INPUT_END,
    pointercancel: INPUT_CANCEL,
    pointerout: INPUT_CANCEL
  };
  var IE10_POINTER_TYPE_ENUM = {
    2: INPUT_TYPE_TOUCH,
    3: INPUT_TYPE_PEN,
    4: INPUT_TYPE_MOUSE,
    5: INPUT_TYPE_KINECT
  };
  var POINTER_ELEMENT_EVENTS = "pointerdown";
  var POINTER_WINDOW_EVENTS = "pointermove pointerup pointercancel";
  if (win.MSPointerEvent && !win.PointerEvent) {
    POINTER_ELEMENT_EVENTS = "MSPointerDown";
    POINTER_WINDOW_EVENTS = "MSPointerMove MSPointerUp MSPointerCancel";
  }
  var PointerEventInput = /* @__PURE__ */ function(_Input) {
    _inheritsLoose(PointerEventInput2, _Input);
    function PointerEventInput2() {
      var _this;
      var proto = PointerEventInput2.prototype;
      proto.evEl = POINTER_ELEMENT_EVENTS;
      proto.evWin = POINTER_WINDOW_EVENTS;
      _this = _Input.apply(this, arguments) || this;
      _this.store = _this.manager.session.pointerEvents = [];
      return _this;
    }
    var _proto = PointerEventInput2.prototype;
    _proto.handler = function handler(ev) {
      var store = this.store;
      var removePointer = false;
      var eventTypeNormalized = ev.type.toLowerCase().replace("ms", "");
      var eventType = POINTER_INPUT_MAP[eventTypeNormalized];
      var pointerType = IE10_POINTER_TYPE_ENUM[ev.pointerType] || ev.pointerType;
      var isTouch = pointerType === INPUT_TYPE_TOUCH;
      var storeIndex = inArray(store, ev.pointerId, "pointerId");
      if (eventType & INPUT_START && (ev.button === 0 || isTouch)) {
        if (storeIndex < 0) {
          store.push(ev);
          storeIndex = store.length - 1;
        }
      } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
        removePointer = true;
      }
      if (storeIndex < 0) {
        return;
      }
      store[storeIndex] = ev;
      this.callback(this.manager, eventType, {
        pointers: store,
        changedPointers: [ev],
        pointerType,
        srcEvent: ev
      });
      if (removePointer) {
        store.splice(storeIndex, 1);
      }
    };
    return PointerEventInput2;
  }(Input);
  function toArray(obj) {
    return Array.prototype.slice.call(obj, 0);
  }
  function uniqueArray(src, key, sort) {
    var results = [];
    var values = [];
    var i2 = 0;
    while (i2 < src.length) {
      var val = key ? src[i2][key] : src[i2];
      if (inArray(values, val) < 0) {
        results.push(src[i2]);
      }
      values[i2] = val;
      i2++;
    }
    if (sort) {
      if (!key) {
        results = results.sort();
      } else {
        results = results.sort(function(a, b) {
          return a[key] > b[key];
        });
      }
    }
    return results;
  }
  var TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
  };
  var TOUCH_TARGET_EVENTS = "touchstart touchmove touchend touchcancel";
  var TouchInput = /* @__PURE__ */ function(_Input) {
    _inheritsLoose(TouchInput2, _Input);
    function TouchInput2() {
      var _this;
      TouchInput2.prototype.evTarget = TOUCH_TARGET_EVENTS;
      _this = _Input.apply(this, arguments) || this;
      _this.targetIds = {};
      return _this;
    }
    var _proto = TouchInput2.prototype;
    _proto.handler = function handler(ev) {
      var type = TOUCH_INPUT_MAP[ev.type];
      var touches = getTouches.call(this, ev, type);
      if (!touches) {
        return;
      }
      this.callback(this.manager, type, {
        pointers: touches[0],
        changedPointers: touches[1],
        pointerType: INPUT_TYPE_TOUCH,
        srcEvent: ev
      });
    };
    return TouchInput2;
  }(Input);
  function getTouches(ev, type) {
    var allTouches = toArray(ev.touches);
    var targetIds = this.targetIds;
    if (type & (INPUT_START | INPUT_MOVE) && allTouches.length === 1) {
      targetIds[allTouches[0].identifier] = true;
      return [allTouches, allTouches];
    }
    var i2;
    var targetTouches;
    var changedTouches = toArray(ev.changedTouches);
    var changedTargetTouches = [];
    var target = this.target;
    targetTouches = allTouches.filter(function(touch) {
      return hasParent(touch.target, target);
    });
    if (type === INPUT_START) {
      i2 = 0;
      while (i2 < targetTouches.length) {
        targetIds[targetTouches[i2].identifier] = true;
        i2++;
      }
    }
    i2 = 0;
    while (i2 < changedTouches.length) {
      if (targetIds[changedTouches[i2].identifier]) {
        changedTargetTouches.push(changedTouches[i2]);
      }
      if (type & (INPUT_END | INPUT_CANCEL)) {
        delete targetIds[changedTouches[i2].identifier];
      }
      i2++;
    }
    if (!changedTargetTouches.length) {
      return;
    }
    return [
      uniqueArray(targetTouches.concat(changedTargetTouches), "identifier", true),
      changedTargetTouches
    ];
  }
  var MOUSE_INPUT_MAP = {
    mousedown: INPUT_START,
    mousemove: INPUT_MOVE,
    mouseup: INPUT_END
  };
  var MOUSE_ELEMENT_EVENTS = "mousedown";
  var MOUSE_WINDOW_EVENTS = "mousemove mouseup";
  var MouseInput = /* @__PURE__ */ function(_Input) {
    _inheritsLoose(MouseInput2, _Input);
    function MouseInput2() {
      var _this;
      var proto = MouseInput2.prototype;
      proto.evEl = MOUSE_ELEMENT_EVENTS;
      proto.evWin = MOUSE_WINDOW_EVENTS;
      _this = _Input.apply(this, arguments) || this;
      _this.pressed = false;
      return _this;
    }
    var _proto = MouseInput2.prototype;
    _proto.handler = function handler(ev) {
      var eventType = MOUSE_INPUT_MAP[ev.type];
      if (eventType & INPUT_START && ev.button === 0) {
        this.pressed = true;
      }
      if (eventType & INPUT_MOVE && ev.which !== 1) {
        eventType = INPUT_END;
      }
      if (!this.pressed) {
        return;
      }
      if (eventType & INPUT_END) {
        this.pressed = false;
      }
      this.callback(this.manager, eventType, {
        pointers: [ev],
        changedPointers: [ev],
        pointerType: INPUT_TYPE_MOUSE,
        srcEvent: ev
      });
    };
    return MouseInput2;
  }(Input);
  var DEDUP_TIMEOUT = 2500;
  var DEDUP_DISTANCE = 25;
  function setLastTouch(eventData) {
    var _eventData$changedPoi = eventData.changedPointers, touch = _eventData$changedPoi[0];
    if (touch.identifier === this.primaryTouch) {
      var lastTouch = {
        x: touch.clientX,
        y: touch.clientY
      };
      var lts = this.lastTouches;
      this.lastTouches.push(lastTouch);
      var removeLastTouch = function removeLastTouch2() {
        var i2 = lts.indexOf(lastTouch);
        if (i2 > -1) {
          lts.splice(i2, 1);
        }
      };
      setTimeout(removeLastTouch, DEDUP_TIMEOUT);
    }
  }
  function recordTouches(eventType, eventData) {
    if (eventType & INPUT_START) {
      this.primaryTouch = eventData.changedPointers[0].identifier;
      setLastTouch.call(this, eventData);
    } else if (eventType & (INPUT_END | INPUT_CANCEL)) {
      setLastTouch.call(this, eventData);
    }
  }
  function isSyntheticEvent(eventData) {
    var x2 = eventData.srcEvent.clientX;
    var y2 = eventData.srcEvent.clientY;
    for (var i2 = 0; i2 < this.lastTouches.length; i2++) {
      var t = this.lastTouches[i2];
      var dx = Math.abs(x2 - t.x);
      var dy = Math.abs(y2 - t.y);
      if (dx <= DEDUP_DISTANCE && dy <= DEDUP_DISTANCE) {
        return true;
      }
    }
    return false;
  }
  var TouchMouseInput = /* @__PURE__ */ function() {
    var TouchMouseInput2 = /* @__PURE__ */ function(_Input) {
      _inheritsLoose(TouchMouseInput3, _Input);
      function TouchMouseInput3(_manager, callback) {
        var _this;
        _this = _Input.call(this, _manager, callback) || this;
        _this.handler = function(manager, inputEvent, inputData) {
          var isTouch = inputData.pointerType === INPUT_TYPE_TOUCH;
          var isMouse = inputData.pointerType === INPUT_TYPE_MOUSE;
          if (isMouse && inputData.sourceCapabilities && inputData.sourceCapabilities.firesTouchEvents) {
            return;
          }
          if (isTouch) {
            recordTouches.call(_assertThisInitialized(_assertThisInitialized(_this)), inputEvent, inputData);
          } else if (isMouse && isSyntheticEvent.call(_assertThisInitialized(_assertThisInitialized(_this)), inputData)) {
            return;
          }
          _this.callback(manager, inputEvent, inputData);
        };
        _this.touch = new TouchInput(_this.manager, _this.handler);
        _this.mouse = new MouseInput(_this.manager, _this.handler);
        _this.primaryTouch = null;
        _this.lastTouches = [];
        return _this;
      }
      var _proto = TouchMouseInput3.prototype;
      _proto.destroy = function destroy() {
        this.touch.destroy();
        this.mouse.destroy();
      };
      return TouchMouseInput3;
    }(Input);
    return TouchMouseInput2;
  }();
  function createInputInstance(manager) {
    var Type;
    var inputClass = manager.options.inputClass;
    if (inputClass) {
      Type = inputClass;
    } else if (SUPPORT_POINTER_EVENTS) {
      Type = PointerEventInput;
    } else if (SUPPORT_ONLY_TOUCH) {
      Type = TouchInput;
    } else if (!SUPPORT_TOUCH) {
      Type = MouseInput;
    } else {
      Type = TouchMouseInput;
    }
    return new Type(manager, inputHandler);
  }
  function invokeArrayArg(arg, fn, context) {
    if (Array.isArray(arg)) {
      each(arg, context[fn], context);
      return true;
    }
    return false;
  }
  var STATE_POSSIBLE = 1;
  var STATE_BEGAN = 2;
  var STATE_CHANGED = 4;
  var STATE_ENDED = 8;
  var STATE_RECOGNIZED = STATE_ENDED;
  var STATE_CANCELLED = 16;
  var STATE_FAILED = 32;
  var _uniqueId = 1;
  function uniqueId() {
    return _uniqueId++;
  }
  function getRecognizerByNameIfManager(otherRecognizer, recognizer) {
    var manager = recognizer.manager;
    if (manager) {
      return manager.get(otherRecognizer);
    }
    return otherRecognizer;
  }
  function stateStr(state) {
    if (state & STATE_CANCELLED) {
      return "cancel";
    } else if (state & STATE_ENDED) {
      return "end";
    } else if (state & STATE_CHANGED) {
      return "move";
    } else if (state & STATE_BEGAN) {
      return "start";
    }
    return "";
  }
  var Recognizer = /* @__PURE__ */ function() {
    function Recognizer2(options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      this.options = _extends({
        enable: true
      }, options2);
      this.id = uniqueId();
      this.manager = null;
      this.state = STATE_POSSIBLE;
      this.simultaneous = {};
      this.requireFail = [];
    }
    var _proto = Recognizer2.prototype;
    _proto.set = function set(options2) {
      assign$1(this.options, options2);
      this.manager && this.manager.touchAction.update();
      return this;
    };
    _proto.recognizeWith = function recognizeWith(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, "recognizeWith", this)) {
        return this;
      }
      var simultaneous = this.simultaneous;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      if (!simultaneous[otherRecognizer.id]) {
        simultaneous[otherRecognizer.id] = otherRecognizer;
        otherRecognizer.recognizeWith(this);
      }
      return this;
    };
    _proto.dropRecognizeWith = function dropRecognizeWith(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, "dropRecognizeWith", this)) {
        return this;
      }
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      delete this.simultaneous[otherRecognizer.id];
      return this;
    };
    _proto.requireFailure = function requireFailure(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, "requireFailure", this)) {
        return this;
      }
      var requireFail = this.requireFail;
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      if (inArray(requireFail, otherRecognizer) === -1) {
        requireFail.push(otherRecognizer);
        otherRecognizer.requireFailure(this);
      }
      return this;
    };
    _proto.dropRequireFailure = function dropRequireFailure(otherRecognizer) {
      if (invokeArrayArg(otherRecognizer, "dropRequireFailure", this)) {
        return this;
      }
      otherRecognizer = getRecognizerByNameIfManager(otherRecognizer, this);
      var index2 = inArray(this.requireFail, otherRecognizer);
      if (index2 > -1) {
        this.requireFail.splice(index2, 1);
      }
      return this;
    };
    _proto.hasRequireFailures = function hasRequireFailures() {
      return this.requireFail.length > 0;
    };
    _proto.canRecognizeWith = function canRecognizeWith(otherRecognizer) {
      return !!this.simultaneous[otherRecognizer.id];
    };
    _proto.emit = function emit(input) {
      var self = this;
      var state = this.state;
      function emit2(event) {
        self.manager.emit(event, input);
      }
      if (state < STATE_ENDED) {
        emit2(self.options.event + stateStr(state));
      }
      emit2(self.options.event);
      if (input.additionalEvent) {
        emit2(input.additionalEvent);
      }
      if (state >= STATE_ENDED) {
        emit2(self.options.event + stateStr(state));
      }
    };
    _proto.tryEmit = function tryEmit(input) {
      if (this.canEmit()) {
        return this.emit(input);
      }
      this.state = STATE_FAILED;
    };
    _proto.canEmit = function canEmit() {
      var i2 = 0;
      while (i2 < this.requireFail.length) {
        if (!(this.requireFail[i2].state & (STATE_FAILED | STATE_POSSIBLE))) {
          return false;
        }
        i2++;
      }
      return true;
    };
    _proto.recognize = function recognize(inputData) {
      var inputDataClone = assign$1({}, inputData);
      if (!boolOrFn(this.options.enable, [this, inputDataClone])) {
        this.reset();
        this.state = STATE_FAILED;
        return;
      }
      if (this.state & (STATE_RECOGNIZED | STATE_CANCELLED | STATE_FAILED)) {
        this.state = STATE_POSSIBLE;
      }
      this.state = this.process(inputDataClone);
      if (this.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED | STATE_CANCELLED)) {
        this.tryEmit(inputDataClone);
      }
    };
    _proto.process = function process(inputData) {
    };
    _proto.getTouchAction = function getTouchAction() {
    };
    _proto.reset = function reset() {
    };
    return Recognizer2;
  }();
  var TapRecognizer = /* @__PURE__ */ function(_Recognizer) {
    _inheritsLoose(TapRecognizer2, _Recognizer);
    function TapRecognizer2(options2) {
      var _this;
      if (options2 === void 0) {
        options2 = {};
      }
      _this = _Recognizer.call(this, _extends({
        event: "tap",
        pointers: 1,
        taps: 1,
        interval: 300,
        time: 250,
        threshold: 9,
        posThreshold: 10
      }, options2)) || this;
      _this.pTime = false;
      _this.pCenter = false;
      _this._timer = null;
      _this._input = null;
      _this.count = 0;
      return _this;
    }
    var _proto = TapRecognizer2.prototype;
    _proto.getTouchAction = function getTouchAction() {
      return [TOUCH_ACTION_MANIPULATION];
    };
    _proto.process = function process(input) {
      var _this2 = this;
      var options2 = this.options;
      var validPointers = input.pointers.length === options2.pointers;
      var validMovement = input.distance < options2.threshold;
      var validTouchTime = input.deltaTime < options2.time;
      this.reset();
      if (input.eventType & INPUT_START && this.count === 0) {
        return this.failTimeout();
      }
      if (validMovement && validTouchTime && validPointers) {
        if (input.eventType !== INPUT_END) {
          return this.failTimeout();
        }
        var validInterval = this.pTime ? input.timeStamp - this.pTime < options2.interval : true;
        var validMultiTap = !this.pCenter || getDistance(this.pCenter, input.center) < options2.posThreshold;
        this.pTime = input.timeStamp;
        this.pCenter = input.center;
        if (!validMultiTap || !validInterval) {
          this.count = 1;
        } else {
          this.count += 1;
        }
        this._input = input;
        var tapCount = this.count % options2.taps;
        if (tapCount === 0) {
          if (!this.hasRequireFailures()) {
            return STATE_RECOGNIZED;
          } else {
            this._timer = setTimeout(function() {
              _this2.state = STATE_RECOGNIZED;
              _this2.tryEmit();
            }, options2.interval);
            return STATE_BEGAN;
          }
        }
      }
      return STATE_FAILED;
    };
    _proto.failTimeout = function failTimeout() {
      var _this3 = this;
      this._timer = setTimeout(function() {
        _this3.state = STATE_FAILED;
      }, this.options.interval);
      return STATE_FAILED;
    };
    _proto.reset = function reset() {
      clearTimeout(this._timer);
    };
    _proto.emit = function emit() {
      if (this.state === STATE_RECOGNIZED) {
        this._input.tapCount = this.count;
        this.manager.emit(this.options.event, this._input);
      }
    };
    return TapRecognizer2;
  }(Recognizer);
  var AttrRecognizer = /* @__PURE__ */ function(_Recognizer) {
    _inheritsLoose(AttrRecognizer2, _Recognizer);
    function AttrRecognizer2(options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return _Recognizer.call(this, _extends({
        pointers: 1
      }, options2)) || this;
    }
    var _proto = AttrRecognizer2.prototype;
    _proto.attrTest = function attrTest(input) {
      var optionPointers = this.options.pointers;
      return optionPointers === 0 || input.pointers.length === optionPointers;
    };
    _proto.process = function process(input) {
      var state = this.state;
      var eventType = input.eventType;
      var isRecognized = state & (STATE_BEGAN | STATE_CHANGED);
      var isValid = this.attrTest(input);
      if (isRecognized && (eventType & INPUT_CANCEL || !isValid)) {
        return state | STATE_CANCELLED;
      } else if (isRecognized || isValid) {
        if (eventType & INPUT_END) {
          return state | STATE_ENDED;
        } else if (!(state & STATE_BEGAN)) {
          return STATE_BEGAN;
        }
        return state | STATE_CHANGED;
      }
      return STATE_FAILED;
    };
    return AttrRecognizer2;
  }(Recognizer);
  function directionStr(direction) {
    if (direction === DIRECTION_DOWN) {
      return "down";
    } else if (direction === DIRECTION_UP) {
      return "up";
    } else if (direction === DIRECTION_LEFT) {
      return "left";
    } else if (direction === DIRECTION_RIGHT) {
      return "right";
    }
    return "";
  }
  var PanRecognizer = /* @__PURE__ */ function(_AttrRecognizer) {
    _inheritsLoose(PanRecognizer2, _AttrRecognizer);
    function PanRecognizer2(options2) {
      var _this;
      if (options2 === void 0) {
        options2 = {};
      }
      _this = _AttrRecognizer.call(this, _extends({
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: DIRECTION_ALL
      }, options2)) || this;
      _this.pX = null;
      _this.pY = null;
      return _this;
    }
    var _proto = PanRecognizer2.prototype;
    _proto.getTouchAction = function getTouchAction() {
      var direction = this.options.direction;
      var actions = [];
      if (direction & DIRECTION_HORIZONTAL) {
        actions.push(TOUCH_ACTION_PAN_Y);
      }
      if (direction & DIRECTION_VERTICAL) {
        actions.push(TOUCH_ACTION_PAN_X);
      }
      return actions;
    };
    _proto.directionTest = function directionTest(input) {
      var options2 = this.options;
      var hasMoved = true;
      var distance = input.distance;
      var direction = input.direction;
      var x2 = input.deltaX;
      var y2 = input.deltaY;
      if (!(direction & options2.direction)) {
        if (options2.direction & DIRECTION_HORIZONTAL) {
          direction = x2 === 0 ? DIRECTION_NONE : x2 < 0 ? DIRECTION_LEFT : DIRECTION_RIGHT;
          hasMoved = x2 !== this.pX;
          distance = Math.abs(input.deltaX);
        } else {
          direction = y2 === 0 ? DIRECTION_NONE : y2 < 0 ? DIRECTION_UP : DIRECTION_DOWN;
          hasMoved = y2 !== this.pY;
          distance = Math.abs(input.deltaY);
        }
      }
      input.direction = direction;
      return hasMoved && distance > options2.threshold && direction & options2.direction;
    };
    _proto.attrTest = function attrTest(input) {
      return AttrRecognizer.prototype.attrTest.call(this, input) && (this.state & STATE_BEGAN || !(this.state & STATE_BEGAN) && this.directionTest(input));
    };
    _proto.emit = function emit(input) {
      this.pX = input.deltaX;
      this.pY = input.deltaY;
      var direction = directionStr(input.direction);
      if (direction) {
        input.additionalEvent = this.options.event + direction;
      }
      _AttrRecognizer.prototype.emit.call(this, input);
    };
    return PanRecognizer2;
  }(AttrRecognizer);
  var SwipeRecognizer = /* @__PURE__ */ function(_AttrRecognizer) {
    _inheritsLoose(SwipeRecognizer2, _AttrRecognizer);
    function SwipeRecognizer2(options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return _AttrRecognizer.call(this, _extends({
        event: "swipe",
        threshold: 10,
        velocity: 0.3,
        direction: DIRECTION_HORIZONTAL | DIRECTION_VERTICAL,
        pointers: 1
      }, options2)) || this;
    }
    var _proto = SwipeRecognizer2.prototype;
    _proto.getTouchAction = function getTouchAction() {
      return PanRecognizer.prototype.getTouchAction.call(this);
    };
    _proto.attrTest = function attrTest(input) {
      var direction = this.options.direction;
      var velocity;
      if (direction & (DIRECTION_HORIZONTAL | DIRECTION_VERTICAL)) {
        velocity = input.overallVelocity;
      } else if (direction & DIRECTION_HORIZONTAL) {
        velocity = input.overallVelocityX;
      } else if (direction & DIRECTION_VERTICAL) {
        velocity = input.overallVelocityY;
      }
      return _AttrRecognizer.prototype.attrTest.call(this, input) && direction & input.offsetDirection && input.distance > this.options.threshold && input.maxPointers === this.options.pointers && abs(velocity) > this.options.velocity && input.eventType & INPUT_END;
    };
    _proto.emit = function emit(input) {
      var direction = directionStr(input.offsetDirection);
      if (direction) {
        this.manager.emit(this.options.event + direction, input);
      }
      this.manager.emit(this.options.event, input);
    };
    return SwipeRecognizer2;
  }(AttrRecognizer);
  var PinchRecognizer = /* @__PURE__ */ function(_AttrRecognizer) {
    _inheritsLoose(PinchRecognizer2, _AttrRecognizer);
    function PinchRecognizer2(options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return _AttrRecognizer.call(this, _extends({
        event: "pinch",
        threshold: 0,
        pointers: 2
      }, options2)) || this;
    }
    var _proto = PinchRecognizer2.prototype;
    _proto.getTouchAction = function getTouchAction() {
      return [TOUCH_ACTION_NONE];
    };
    _proto.attrTest = function attrTest(input) {
      return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.scale - 1) > this.options.threshold || this.state & STATE_BEGAN);
    };
    _proto.emit = function emit(input) {
      if (input.scale !== 1) {
        var inOut = input.scale < 1 ? "in" : "out";
        input.additionalEvent = this.options.event + inOut;
      }
      _AttrRecognizer.prototype.emit.call(this, input);
    };
    return PinchRecognizer2;
  }(AttrRecognizer);
  var RotateRecognizer = /* @__PURE__ */ function(_AttrRecognizer) {
    _inheritsLoose(RotateRecognizer2, _AttrRecognizer);
    function RotateRecognizer2(options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return _AttrRecognizer.call(this, _extends({
        event: "rotate",
        threshold: 0,
        pointers: 2
      }, options2)) || this;
    }
    var _proto = RotateRecognizer2.prototype;
    _proto.getTouchAction = function getTouchAction() {
      return [TOUCH_ACTION_NONE];
    };
    _proto.attrTest = function attrTest(input) {
      return _AttrRecognizer.prototype.attrTest.call(this, input) && (Math.abs(input.rotation) > this.options.threshold || this.state & STATE_BEGAN);
    };
    return RotateRecognizer2;
  }(AttrRecognizer);
  var PressRecognizer = /* @__PURE__ */ function(_Recognizer) {
    _inheritsLoose(PressRecognizer2, _Recognizer);
    function PressRecognizer2(options2) {
      var _this;
      if (options2 === void 0) {
        options2 = {};
      }
      _this = _Recognizer.call(this, _extends({
        event: "press",
        pointers: 1,
        time: 251,
        threshold: 9
      }, options2)) || this;
      _this._timer = null;
      _this._input = null;
      return _this;
    }
    var _proto = PressRecognizer2.prototype;
    _proto.getTouchAction = function getTouchAction() {
      return [TOUCH_ACTION_AUTO];
    };
    _proto.process = function process(input) {
      var _this2 = this;
      var options2 = this.options;
      var validPointers = input.pointers.length === options2.pointers;
      var validMovement = input.distance < options2.threshold;
      var validTime = input.deltaTime > options2.time;
      this._input = input;
      if (!validMovement || !validPointers || input.eventType & (INPUT_END | INPUT_CANCEL) && !validTime) {
        this.reset();
      } else if (input.eventType & INPUT_START) {
        this.reset();
        this._timer = setTimeout(function() {
          _this2.state = STATE_RECOGNIZED;
          _this2.tryEmit();
        }, options2.time);
      } else if (input.eventType & INPUT_END) {
        return STATE_RECOGNIZED;
      }
      return STATE_FAILED;
    };
    _proto.reset = function reset() {
      clearTimeout(this._timer);
    };
    _proto.emit = function emit(input) {
      if (this.state !== STATE_RECOGNIZED) {
        return;
      }
      if (input && input.eventType & INPUT_END) {
        this.manager.emit(this.options.event + "up", input);
      } else {
        this._input.timeStamp = now();
        this.manager.emit(this.options.event, this._input);
      }
    };
    return PressRecognizer2;
  }(Recognizer);
  var defaults = {
    domEvents: false,
    touchAction: TOUCH_ACTION_COMPUTE,
    enable: true,
    inputTarget: null,
    inputClass: null,
    cssProps: {
      userSelect: "none",
      touchSelect: "none",
      touchCallout: "none",
      contentZooming: "none",
      userDrag: "none",
      tapHighlightColor: "rgba(0,0,0,0)"
    }
  };
  var preset = [[RotateRecognizer, {
    enable: false
  }], [PinchRecognizer, {
    enable: false
  }, ["rotate"]], [SwipeRecognizer, {
    direction: DIRECTION_HORIZONTAL
  }], [PanRecognizer, {
    direction: DIRECTION_HORIZONTAL
  }, ["swipe"]], [TapRecognizer], [TapRecognizer, {
    event: "doubletap",
    taps: 2
  }, ["tap"]], [PressRecognizer]];
  var STOP = 1;
  var FORCED_STOP = 2;
  function toggleCssProps(manager, add) {
    var element = manager.element;
    if (!element.style) {
      return;
    }
    var prop;
    each(manager.options.cssProps, function(value, name) {
      prop = prefixed(element.style, name);
      if (add) {
        manager.oldCssProps[prop] = element.style[prop];
        element.style[prop] = value;
      } else {
        element.style[prop] = manager.oldCssProps[prop] || "";
      }
    });
    if (!add) {
      manager.oldCssProps = {};
    }
  }
  function triggerDomEvent(event, data) {
    var gestureEvent = document.createEvent("Event");
    gestureEvent.initEvent(event, true, true);
    gestureEvent.gesture = data;
    data.target.dispatchEvent(gestureEvent);
  }
  var Manager = /* @__PURE__ */ function() {
    function Manager2(element, options2) {
      var _this = this;
      this.options = assign$1({}, defaults, options2 || {});
      this.options.inputTarget = this.options.inputTarget || element;
      this.handlers = {};
      this.session = {};
      this.recognizers = [];
      this.oldCssProps = {};
      this.element = element;
      this.input = createInputInstance(this);
      this.touchAction = new TouchAction(this, this.options.touchAction);
      toggleCssProps(this, true);
      each(this.options.recognizers, function(item) {
        var recognizer = _this.add(new item[0](item[1]));
        item[2] && recognizer.recognizeWith(item[2]);
        item[3] && recognizer.requireFailure(item[3]);
      }, this);
    }
    var _proto = Manager2.prototype;
    _proto.set = function set(options2) {
      assign$1(this.options, options2);
      if (options2.touchAction) {
        this.touchAction.update();
      }
      if (options2.inputTarget) {
        this.input.destroy();
        this.input.target = options2.inputTarget;
        this.input.init();
      }
      return this;
    };
    _proto.stop = function stop(force) {
      this.session.stopped = force ? FORCED_STOP : STOP;
    };
    _proto.recognize = function recognize(inputData) {
      var session = this.session;
      if (session.stopped) {
        return;
      }
      this.touchAction.preventDefaults(inputData);
      var recognizer;
      var recognizers = this.recognizers;
      var curRecognizer = session.curRecognizer;
      if (!curRecognizer || curRecognizer && curRecognizer.state & STATE_RECOGNIZED) {
        session.curRecognizer = null;
        curRecognizer = null;
      }
      var i2 = 0;
      while (i2 < recognizers.length) {
        recognizer = recognizers[i2];
        if (session.stopped !== FORCED_STOP && (!curRecognizer || recognizer === curRecognizer || recognizer.canRecognizeWith(curRecognizer))) {
          recognizer.recognize(inputData);
        } else {
          recognizer.reset();
        }
        if (!curRecognizer && recognizer.state & (STATE_BEGAN | STATE_CHANGED | STATE_ENDED)) {
          session.curRecognizer = recognizer;
          curRecognizer = recognizer;
        }
        i2++;
      }
    };
    _proto.get = function get(recognizer) {
      if (recognizer instanceof Recognizer) {
        return recognizer;
      }
      var recognizers = this.recognizers;
      for (var i2 = 0; i2 < recognizers.length; i2++) {
        if (recognizers[i2].options.event === recognizer) {
          return recognizers[i2];
        }
      }
      return null;
    };
    _proto.add = function add(recognizer) {
      if (invokeArrayArg(recognizer, "add", this)) {
        return this;
      }
      var existing = this.get(recognizer.options.event);
      if (existing) {
        this.remove(existing);
      }
      this.recognizers.push(recognizer);
      recognizer.manager = this;
      this.touchAction.update();
      return recognizer;
    };
    _proto.remove = function remove(recognizer) {
      if (invokeArrayArg(recognizer, "remove", this)) {
        return this;
      }
      var targetRecognizer = this.get(recognizer);
      if (recognizer) {
        var recognizers = this.recognizers;
        var index2 = inArray(recognizers, targetRecognizer);
        if (index2 !== -1) {
          recognizers.splice(index2, 1);
          this.touchAction.update();
        }
      }
      return this;
    };
    _proto.on = function on(events, handler) {
      if (events === void 0 || handler === void 0) {
        return this;
      }
      var handlers = this.handlers;
      each(splitStr(events), function(event) {
        handlers[event] = handlers[event] || [];
        handlers[event].push(handler);
      });
      return this;
    };
    _proto.off = function off(events, handler) {
      if (events === void 0) {
        return this;
      }
      var handlers = this.handlers;
      each(splitStr(events), function(event) {
        if (!handler) {
          delete handlers[event];
        } else {
          handlers[event] && handlers[event].splice(inArray(handlers[event], handler), 1);
        }
      });
      return this;
    };
    _proto.emit = function emit(event, data) {
      if (this.options.domEvents) {
        triggerDomEvent(event, data);
      }
      var handlers = this.handlers[event] && this.handlers[event].slice();
      if (!handlers || !handlers.length) {
        return;
      }
      data.type = event;
      data.preventDefault = function() {
        data.srcEvent.preventDefault();
      };
      var i2 = 0;
      while (i2 < handlers.length) {
        handlers[i2](data);
        i2++;
      }
    };
    _proto.destroy = function destroy() {
      this.element && toggleCssProps(this, false);
      this.handlers = {};
      this.session = {};
      this.input.destroy();
      this.element = null;
    };
    return Manager2;
  }();
  var SINGLE_TOUCH_INPUT_MAP = {
    touchstart: INPUT_START,
    touchmove: INPUT_MOVE,
    touchend: INPUT_END,
    touchcancel: INPUT_CANCEL
  };
  var SINGLE_TOUCH_TARGET_EVENTS = "touchstart";
  var SINGLE_TOUCH_WINDOW_EVENTS = "touchstart touchmove touchend touchcancel";
  var SingleTouchInput = /* @__PURE__ */ function(_Input) {
    _inheritsLoose(SingleTouchInput2, _Input);
    function SingleTouchInput2() {
      var _this;
      var proto = SingleTouchInput2.prototype;
      proto.evTarget = SINGLE_TOUCH_TARGET_EVENTS;
      proto.evWin = SINGLE_TOUCH_WINDOW_EVENTS;
      _this = _Input.apply(this, arguments) || this;
      _this.started = false;
      return _this;
    }
    var _proto = SingleTouchInput2.prototype;
    _proto.handler = function handler(ev) {
      var type = SINGLE_TOUCH_INPUT_MAP[ev.type];
      if (type === INPUT_START) {
        this.started = true;
      }
      if (!this.started) {
        return;
      }
      var touches = normalizeSingleTouches.call(this, ev, type);
      if (type & (INPUT_END | INPUT_CANCEL) && touches[0].length - touches[1].length === 0) {
        this.started = false;
      }
      this.callback(this.manager, type, {
        pointers: touches[0],
        changedPointers: touches[1],
        pointerType: INPUT_TYPE_TOUCH,
        srcEvent: ev
      });
    };
    return SingleTouchInput2;
  }(Input);
  function normalizeSingleTouches(ev, type) {
    var all = toArray(ev.touches);
    var changed = toArray(ev.changedTouches);
    if (type & (INPUT_END | INPUT_CANCEL)) {
      all = uniqueArray(all.concat(changed), "identifier", true);
    }
    return [all, changed];
  }
  function deprecate(method, name, message) {
    var deprecationMessage = "DEPRECATED METHOD: " + name + "\n" + message + " AT \n";
    return function() {
      var e = new Error("get-stack-trace");
      var stack = e && e.stack ? e.stack.replace(/^[^\(]+?[\n$]/gm, "").replace(/^\s+at\s+/gm, "").replace(/^Object.<anonymous>\s*\(/gm, "{anonymous}()@") : "Unknown Stack Trace";
      var log = window.console && (window.console.warn || window.console.log);
      if (log) {
        log.call(window.console, deprecationMessage, stack);
      }
      return method.apply(this, arguments);
    };
  }
  var extend = deprecate(function(dest, src, merge3) {
    var keys = Object.keys(src);
    var i2 = 0;
    while (i2 < keys.length) {
      if (!merge3 || merge3 && dest[keys[i2]] === void 0) {
        dest[keys[i2]] = src[keys[i2]];
      }
      i2++;
    }
    return dest;
  }, "extend", "Use `assign`.");
  var merge = deprecate(function(dest, src) {
    return extend(dest, src, true);
  }, "merge", "Use `assign`.");
  function inherit(child, base, properties) {
    var baseP = base.prototype;
    var childP;
    childP = child.prototype = Object.create(baseP);
    childP.constructor = child;
    childP._super = baseP;
    if (properties) {
      assign$1(childP, properties);
    }
  }
  function bindFn(fn, context) {
    return function boundFn() {
      return fn.apply(context, arguments);
    };
  }
  var Hammer = /* @__PURE__ */ function() {
    var Hammer3 = function Hammer4(element, options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return new Manager(element, _extends({
        recognizers: preset.concat()
      }, options2));
    };
    Hammer3.VERSION = "2.0.17-rc";
    Hammer3.DIRECTION_ALL = DIRECTION_ALL;
    Hammer3.DIRECTION_DOWN = DIRECTION_DOWN;
    Hammer3.DIRECTION_LEFT = DIRECTION_LEFT;
    Hammer3.DIRECTION_RIGHT = DIRECTION_RIGHT;
    Hammer3.DIRECTION_UP = DIRECTION_UP;
    Hammer3.DIRECTION_HORIZONTAL = DIRECTION_HORIZONTAL;
    Hammer3.DIRECTION_VERTICAL = DIRECTION_VERTICAL;
    Hammer3.DIRECTION_NONE = DIRECTION_NONE;
    Hammer3.DIRECTION_DOWN = DIRECTION_DOWN;
    Hammer3.INPUT_START = INPUT_START;
    Hammer3.INPUT_MOVE = INPUT_MOVE;
    Hammer3.INPUT_END = INPUT_END;
    Hammer3.INPUT_CANCEL = INPUT_CANCEL;
    Hammer3.STATE_POSSIBLE = STATE_POSSIBLE;
    Hammer3.STATE_BEGAN = STATE_BEGAN;
    Hammer3.STATE_CHANGED = STATE_CHANGED;
    Hammer3.STATE_ENDED = STATE_ENDED;
    Hammer3.STATE_RECOGNIZED = STATE_RECOGNIZED;
    Hammer3.STATE_CANCELLED = STATE_CANCELLED;
    Hammer3.STATE_FAILED = STATE_FAILED;
    Hammer3.Manager = Manager;
    Hammer3.Input = Input;
    Hammer3.TouchAction = TouchAction;
    Hammer3.TouchInput = TouchInput;
    Hammer3.MouseInput = MouseInput;
    Hammer3.PointerEventInput = PointerEventInput;
    Hammer3.TouchMouseInput = TouchMouseInput;
    Hammer3.SingleTouchInput = SingleTouchInput;
    Hammer3.Recognizer = Recognizer;
    Hammer3.AttrRecognizer = AttrRecognizer;
    Hammer3.Tap = TapRecognizer;
    Hammer3.Pan = PanRecognizer;
    Hammer3.Swipe = SwipeRecognizer;
    Hammer3.Pinch = PinchRecognizer;
    Hammer3.Rotate = RotateRecognizer;
    Hammer3.Press = PressRecognizer;
    Hammer3.on = addEventListeners;
    Hammer3.off = removeEventListeners;
    Hammer3.each = each;
    Hammer3.merge = merge;
    Hammer3.extend = extend;
    Hammer3.bindFn = bindFn;
    Hammer3.assign = assign$1;
    Hammer3.inherit = inherit;
    Hammer3.bindFn = bindFn;
    Hammer3.prefixed = prefixed;
    Hammer3.toArray = toArray;
    Hammer3.inArray = inArray;
    Hammer3.uniqueArray = uniqueArray;
    Hammer3.splitStr = splitStr;
    Hammer3.boolOrFn = boolOrFn;
    Hammer3.hasParent = hasParent;
    Hammer3.addEventListeners = addEventListeners;
    Hammer3.removeEventListeners = removeEventListeners;
    Hammer3.defaults = assign$1({}, defaults, {
      preset
    });
    return Hammer3;
  }();
  var defaults$1 = Hammer.defaults;
  var hammer_esm_default = Hammer;

  // node_modules/vis-util/esnext/esm/vis-util.js
  var DELETE = Symbol("DELETE");
  function pureDeepObjectAssign(base, ...updates) {
    return deepObjectAssign({}, base, ...updates);
  }
  function deepObjectAssign(...values) {
    const merged = deepObjectAssignNonentry(...values);
    stripDelete(merged);
    return merged;
  }
  function deepObjectAssignNonentry(...values) {
    if (values.length < 2) {
      return values[0];
    } else if (values.length > 2) {
      return deepObjectAssignNonentry(deepObjectAssign(values[0], values[1]), ...values.slice(2));
    }
    const a = values[0];
    const b = values[1];
    if (a instanceof Date && b instanceof Date) {
      a.setTime(b.getTime());
      return a;
    }
    for (const prop of Reflect.ownKeys(b)) {
      if (!Object.prototype.propertyIsEnumerable.call(b, prop))
        ;
      else if (b[prop] === DELETE) {
        delete a[prop];
      } else if (a[prop] !== null && b[prop] !== null && typeof a[prop] === "object" && typeof b[prop] === "object" && !Array.isArray(a[prop]) && !Array.isArray(b[prop])) {
        a[prop] = deepObjectAssignNonentry(a[prop], b[prop]);
      } else {
        a[prop] = clone(b[prop]);
      }
    }
    return a;
  }
  function clone(a) {
    if (Array.isArray(a)) {
      return a.map((value) => clone(value));
    } else if (typeof a === "object" && a !== null) {
      if (a instanceof Date) {
        return new Date(a.getTime());
      }
      return deepObjectAssignNonentry({}, a);
    } else {
      return a;
    }
  }
  function stripDelete(a) {
    for (const prop of Object.keys(a)) {
      if (a[prop] === DELETE) {
        delete a[prop];
      } else if (typeof a[prop] === "object" && a[prop] !== null) {
        stripDelete(a[prop]);
      }
    }
  }
  function Alea(...seed) {
    return AleaImplementation(seed.length ? seed : [Date.now()]);
  }
  function AleaImplementation(seed) {
    let [s0, s1, s2] = mashSeed(seed);
    let c2 = 1;
    const random = () => {
      const t = 2091639 * s0 + c2 * 23283064365386963e-26;
      s0 = s1;
      s1 = s2;
      return s2 = t - (c2 = t | 0);
    };
    random.uint32 = () => random() * 4294967296;
    random.fract53 = () => random() + (random() * 2097152 | 0) * 11102230246251565e-32;
    random.algorithm = "Alea";
    random.seed = seed;
    random.version = "0.9";
    return random;
  }
  function mashSeed(...seed) {
    const mash = Mash();
    let s0 = mash(" ");
    let s1 = mash(" ");
    let s2 = mash(" ");
    for (let i2 = 0; i2 < seed.length; i2++) {
      s0 -= mash(seed[i2]);
      if (s0 < 0) {
        s0 += 1;
      }
      s1 -= mash(seed[i2]);
      if (s1 < 0) {
        s1 += 1;
      }
      s2 -= mash(seed[i2]);
      if (s2 < 0) {
        s2 += 1;
      }
    }
    return [s0, s1, s2];
  }
  function Mash() {
    let n = 4022871197;
    return function(data) {
      const string2 = data.toString();
      for (let i2 = 0; i2 < string2.length; i2++) {
        n += string2.charCodeAt(i2);
        let h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 4294967296;
      }
      return (n >>> 0) * 23283064365386963e-26;
    };
  }
  function hammerMock() {
    const noop = () => {
    };
    return {
      on: noop,
      off: noop,
      destroy: noop,
      emit: noop,
      get() {
        return {
          set: noop
        };
      }
    };
  }
  var Hammer$1 = typeof window !== "undefined" ? window.Hammer || hammer_esm_default : function() {
    return hammerMock();
  };
  function Activator$1(container2) {
    this._cleanupQueue = [];
    this.active = false;
    this._dom = {
      container: container2,
      overlay: document.createElement("div")
    };
    this._dom.overlay.classList.add("vis-overlay");
    this._dom.container.appendChild(this._dom.overlay);
    this._cleanupQueue.push(() => {
      this._dom.overlay.parentNode.removeChild(this._dom.overlay);
    });
    const hammer = Hammer$1(this._dom.overlay);
    hammer.on("tap", this._onTapOverlay.bind(this));
    this._cleanupQueue.push(() => {
      hammer.destroy();
    });
    const events = [
      "tap",
      "doubletap",
      "press",
      "pinch",
      "pan",
      "panstart",
      "panmove",
      "panend"
    ];
    events.forEach((event) => {
      hammer.on(event, (event2) => {
        event2.srcEvent.stopPropagation();
      });
    });
    if (document && document.body) {
      this._onClick = (event) => {
        if (!_hasParent(event.target, container2)) {
          this.deactivate();
        }
      };
      document.body.addEventListener("click", this._onClick);
      this._cleanupQueue.push(() => {
        document.body.removeEventListener("click", this._onClick);
      });
    }
    this._escListener = (event) => {
      if ("key" in event ? event.key === "Escape" : event.keyCode === 27) {
        this.deactivate();
      }
    };
  }
  (0, import_component_emitter.default)(Activator$1.prototype);
  Activator$1.current = null;
  Activator$1.prototype.destroy = function() {
    this.deactivate();
    for (const callback of this._cleanupQueue.splice(0).reverse()) {
      callback();
    }
  };
  Activator$1.prototype.activate = function() {
    if (Activator$1.current) {
      Activator$1.current.deactivate();
    }
    Activator$1.current = this;
    this.active = true;
    this._dom.overlay.style.display = "none";
    this._dom.container.classList.add("vis-active");
    this.emit("change");
    this.emit("activate");
    document.body.addEventListener("keydown", this._escListener);
  };
  Activator$1.prototype.deactivate = function() {
    this.active = false;
    this._dom.overlay.style.display = "block";
    this._dom.container.classList.remove("vis-active");
    document.body.removeEventListener("keydown", this._escListener);
    this.emit("change");
    this.emit("deactivate");
  };
  Activator$1.prototype._onTapOverlay = function(event) {
    this.activate();
    event.srcEvent.stopPropagation();
  };
  function _hasParent(element, parent) {
    while (element) {
      if (element === parent) {
        return true;
      }
      element = element.parentNode;
    }
    return false;
  }
  var fullHexRE = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
  var shortHexRE = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var rgbRE = /^rgb\( *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *\)$/i;
  var rgbaRE = /^rgba\( *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *(1?\d{1,2}|2[0-4]\d|25[0-5]) *, *([01]|0?\.\d+) *\)$/i;
  function recursiveDOMDelete(DOMobject) {
    if (DOMobject) {
      while (DOMobject.hasChildNodes() === true) {
        const child = DOMobject.firstChild;
        if (child) {
          recursiveDOMDelete(child);
          DOMobject.removeChild(child);
        }
      }
    }
  }
  function isString(value) {
    return value instanceof String || typeof value === "string";
  }
  function isObject(value) {
    return typeof value === "object" && value !== null;
  }
  function copyOrDelete(a, b, prop, allowDeletion) {
    let doDeletion = false;
    if (allowDeletion === true) {
      doDeletion = b[prop] === null && a[prop] !== void 0;
    }
    if (doDeletion) {
      delete a[prop];
    } else {
      a[prop] = b[prop];
    }
  }
  function fillIfDefined(a, b, allowDeletion = false) {
    for (const prop in a) {
      if (b[prop] !== void 0) {
        if (b[prop] === null || typeof b[prop] !== "object") {
          copyOrDelete(a, b, prop, allowDeletion);
        } else {
          const aProp = a[prop];
          const bProp = b[prop];
          if (isObject(aProp) && isObject(bProp)) {
            fillIfDefined(aProp, bProp, allowDeletion);
          }
        }
      }
    }
  }
  function selectiveDeepExtend(props, a, b, allowDeletion = false) {
    if (Array.isArray(b)) {
      throw new TypeError("Arrays are not supported by deepExtend");
    }
    for (let p = 0; p < props.length; p++) {
      const prop = props[p];
      if (Object.prototype.hasOwnProperty.call(b, prop)) {
        if (b[prop] && b[prop].constructor === Object) {
          if (a[prop] === void 0) {
            a[prop] = {};
          }
          if (a[prop].constructor === Object) {
            deepExtend(a[prop], b[prop], false, allowDeletion);
          } else {
            copyOrDelete(a, b, prop, allowDeletion);
          }
        } else if (Array.isArray(b[prop])) {
          throw new TypeError("Arrays are not supported by deepExtend");
        } else {
          copyOrDelete(a, b, prop, allowDeletion);
        }
      }
    }
    return a;
  }
  function selectiveNotDeepExtend(propsToExclude, a, b, allowDeletion = false) {
    if (Array.isArray(b)) {
      throw new TypeError("Arrays are not supported by deepExtend");
    }
    for (const prop in b) {
      if (!Object.prototype.hasOwnProperty.call(b, prop)) {
        continue;
      }
      if (propsToExclude.includes(prop)) {
        continue;
      }
      if (b[prop] && b[prop].constructor === Object) {
        if (a[prop] === void 0) {
          a[prop] = {};
        }
        if (a[prop].constructor === Object) {
          deepExtend(a[prop], b[prop]);
        } else {
          copyOrDelete(a, b, prop, allowDeletion);
        }
      } else if (Array.isArray(b[prop])) {
        a[prop] = [];
        for (let i2 = 0; i2 < b[prop].length; i2++) {
          a[prop].push(b[prop][i2]);
        }
      } else {
        copyOrDelete(a, b, prop, allowDeletion);
      }
    }
    return a;
  }
  function deepExtend(a, b, protoExtend = false, allowDeletion = false) {
    for (const prop in b) {
      if (Object.prototype.hasOwnProperty.call(b, prop) || protoExtend === true) {
        if (typeof b[prop] === "object" && b[prop] !== null && Object.getPrototypeOf(b[prop]) === Object.prototype) {
          if (a[prop] === void 0) {
            a[prop] = deepExtend({}, b[prop], protoExtend);
          } else if (typeof a[prop] === "object" && a[prop] !== null && Object.getPrototypeOf(a[prop]) === Object.prototype) {
            deepExtend(a[prop], b[prop], protoExtend);
          } else {
            copyOrDelete(a, b, prop, allowDeletion);
          }
        } else if (Array.isArray(b[prop])) {
          a[prop] = b[prop].slice();
        } else {
          copyOrDelete(a, b, prop, allowDeletion);
        }
      }
    }
    return a;
  }
  function copyAndExtendArray(arr, newValue) {
    return [...arr, newValue];
  }
  function copyArray(arr) {
    return arr.slice();
  }
  function getAbsoluteLeft(elem) {
    return elem.getBoundingClientRect().left;
  }
  function getAbsoluteTop(elem) {
    return elem.getBoundingClientRect().top;
  }
  function forEach(object2, callback) {
    if (Array.isArray(object2)) {
      const len = object2.length;
      for (let i2 = 0; i2 < len; i2++) {
        callback(object2[i2], i2, object2);
      }
    } else {
      for (const key in object2) {
        if (Object.prototype.hasOwnProperty.call(object2, key)) {
          callback(object2[key], key, object2);
        }
      }
    }
  }
  function hexToRGB(hex) {
    let result;
    switch (hex.length) {
      case 3:
      case 4:
        result = shortHexRE.exec(hex);
        return result ? {
          r: parseInt(result[1] + result[1], 16),
          g: parseInt(result[2] + result[2], 16),
          b: parseInt(result[3] + result[3], 16)
        } : null;
      case 6:
      case 7:
        result = fullHexRE.exec(hex);
        return result ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        } : null;
      default:
        return null;
    }
  }
  function overrideOpacity(color, opacity) {
    if (color.includes("rgba")) {
      return color;
    } else if (color.includes("rgb")) {
      const rgb = color.substr(color.indexOf("(") + 1).replace(")", "").split(",");
      return "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + opacity + ")";
    } else {
      const rgb = hexToRGB(color);
      if (rgb == null) {
        return color;
      } else {
        return "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + opacity + ")";
      }
    }
  }
  function RGBToHex(red, green, blue) {
    return "#" + ((1 << 24) + (red << 16) + (green << 8) + blue).toString(16).slice(1);
  }
  function parseColor(inputColor, defaultColor) {
    if (isString(inputColor)) {
      let colorStr = inputColor;
      if (isValidRGB(colorStr)) {
        const rgb = colorStr.substr(4).substr(0, colorStr.length - 5).split(",").map(function(value) {
          return parseInt(value);
        });
        colorStr = RGBToHex(rgb[0], rgb[1], rgb[2]);
      }
      if (isValidHex(colorStr) === true) {
        const hsv = hexToHSV(colorStr);
        const lighterColorHSV = {
          h: hsv.h,
          s: hsv.s * 0.8,
          v: Math.min(1, hsv.v * 1.02)
        };
        const darkerColorHSV = {
          h: hsv.h,
          s: Math.min(1, hsv.s * 1.25),
          v: hsv.v * 0.8
        };
        const darkerColorHex = HSVToHex(darkerColorHSV.h, darkerColorHSV.s, darkerColorHSV.v);
        const lighterColorHex = HSVToHex(lighterColorHSV.h, lighterColorHSV.s, lighterColorHSV.v);
        return {
          background: colorStr,
          border: darkerColorHex,
          highlight: {
            background: lighterColorHex,
            border: darkerColorHex
          },
          hover: {
            background: lighterColorHex,
            border: darkerColorHex
          }
        };
      } else {
        return {
          background: colorStr,
          border: colorStr,
          highlight: {
            background: colorStr,
            border: colorStr
          },
          hover: {
            background: colorStr,
            border: colorStr
          }
        };
      }
    } else {
      if (defaultColor) {
        const color = {
          background: inputColor.background || defaultColor.background,
          border: inputColor.border || defaultColor.border,
          highlight: isString(inputColor.highlight) ? {
            border: inputColor.highlight,
            background: inputColor.highlight
          } : {
            background: inputColor.highlight && inputColor.highlight.background || defaultColor.highlight.background,
            border: inputColor.highlight && inputColor.highlight.border || defaultColor.highlight.border
          },
          hover: isString(inputColor.hover) ? {
            border: inputColor.hover,
            background: inputColor.hover
          } : {
            border: inputColor.hover && inputColor.hover.border || defaultColor.hover.border,
            background: inputColor.hover && inputColor.hover.background || defaultColor.hover.background
          }
        };
        return color;
      } else {
        const color = {
          background: inputColor.background || void 0,
          border: inputColor.border || void 0,
          highlight: isString(inputColor.highlight) ? {
            border: inputColor.highlight,
            background: inputColor.highlight
          } : {
            background: inputColor.highlight && inputColor.highlight.background || void 0,
            border: inputColor.highlight && inputColor.highlight.border || void 0
          },
          hover: isString(inputColor.hover) ? {
            border: inputColor.hover,
            background: inputColor.hover
          } : {
            border: inputColor.hover && inputColor.hover.border || void 0,
            background: inputColor.hover && inputColor.hover.background || void 0
          }
        };
        return color;
      }
    }
  }
  function RGBToHSV(red, green, blue) {
    red = red / 255;
    green = green / 255;
    blue = blue / 255;
    const minRGB = Math.min(red, Math.min(green, blue));
    const maxRGB = Math.max(red, Math.max(green, blue));
    if (minRGB === maxRGB) {
      return { h: 0, s: 0, v: minRGB };
    }
    const d = red === minRGB ? green - blue : blue === minRGB ? red - green : blue - red;
    const h = red === minRGB ? 3 : blue === minRGB ? 1 : 5;
    const hue = 60 * (h - d / (maxRGB - minRGB)) / 360;
    const saturation = (maxRGB - minRGB) / maxRGB;
    const value = maxRGB;
    return { h: hue, s: saturation, v: value };
  }
  function HSVToRGB(h, s, v) {
    let r;
    let g;
    let b;
    const i2 = Math.floor(h * 6);
    const f = h * 6 - i2;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    switch (i2 % 6) {
      case 0:
        r = v, g = t, b = p;
        break;
      case 1:
        r = q, g = v, b = p;
        break;
      case 2:
        r = p, g = v, b = t;
        break;
      case 3:
        r = p, g = q, b = v;
        break;
      case 4:
        r = t, g = p, b = v;
        break;
      case 5:
        r = v, g = p, b = q;
        break;
    }
    return {
      r: Math.floor(r * 255),
      g: Math.floor(g * 255),
      b: Math.floor(b * 255)
    };
  }
  function HSVToHex(h, s, v) {
    const rgb = HSVToRGB(h, s, v);
    return RGBToHex(rgb.r, rgb.g, rgb.b);
  }
  function hexToHSV(hex) {
    const rgb = hexToRGB(hex);
    if (!rgb) {
      throw new TypeError(`'${hex}' is not a valid color.`);
    }
    return RGBToHSV(rgb.r, rgb.g, rgb.b);
  }
  function isValidHex(hex) {
    const isOk = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex);
    return isOk;
  }
  function isValidRGB(rgb) {
    return rgbRE.test(rgb);
  }
  function isValidRGBA(rgba) {
    return rgbaRE.test(rgba);
  }
  function bridgeObject(referenceObject) {
    if (referenceObject === null || typeof referenceObject !== "object") {
      return null;
    }
    if (referenceObject instanceof Element) {
      return referenceObject;
    }
    const objectTo = Object.create(referenceObject);
    for (const i2 in referenceObject) {
      if (Object.prototype.hasOwnProperty.call(referenceObject, i2)) {
        if (typeof referenceObject[i2] == "object") {
          objectTo[i2] = bridgeObject(referenceObject[i2]);
        }
      }
    }
    return objectTo;
  }
  function mergeOptions(mergeTarget, options2, option, globalOptions = {}) {
    const isPresent = function(obj) {
      return obj !== null && obj !== void 0;
    };
    const isObject2 = function(obj) {
      return obj !== null && typeof obj === "object";
    };
    const isEmpty = function(obj) {
      for (const x2 in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, x2)) {
          return false;
        }
      }
      return true;
    };
    if (!isObject2(mergeTarget)) {
      throw new Error("Parameter mergeTarget must be an object");
    }
    if (!isObject2(options2)) {
      throw new Error("Parameter options must be an object");
    }
    if (!isPresent(option)) {
      throw new Error("Parameter option must have a value");
    }
    if (!isObject2(globalOptions)) {
      throw new Error("Parameter globalOptions must be an object");
    }
    const doMerge = function(target, options3, option2) {
      if (!isObject2(target[option2])) {
        target[option2] = {};
      }
      const src = options3[option2];
      const dst = target[option2];
      for (const prop in src) {
        if (Object.prototype.hasOwnProperty.call(src, prop)) {
          dst[prop] = src[prop];
        }
      }
    };
    const srcOption = options2[option];
    const globalPassed = isObject2(globalOptions) && !isEmpty(globalOptions);
    const globalOption = globalPassed ? globalOptions[option] : void 0;
    const globalEnabled = globalOption ? globalOption.enabled : void 0;
    if (srcOption === void 0) {
      return;
    }
    if (typeof srcOption === "boolean") {
      if (!isObject2(mergeTarget[option])) {
        mergeTarget[option] = {};
      }
      mergeTarget[option].enabled = srcOption;
      return;
    }
    if (srcOption === null && !isObject2(mergeTarget[option])) {
      if (isPresent(globalOption)) {
        mergeTarget[option] = Object.create(globalOption);
      } else {
        return;
      }
    }
    if (!isObject2(srcOption)) {
      return;
    }
    let enabled = true;
    if (srcOption.enabled !== void 0) {
      enabled = srcOption.enabled;
    } else {
      if (globalEnabled !== void 0) {
        enabled = globalOption.enabled;
      }
    }
    doMerge(mergeTarget, options2, option);
    mergeTarget[option].enabled = enabled;
  }
  var easingFunctions = {
    linear(t) {
      return t;
    },
    easeInQuad(t) {
      return t * t;
    },
    easeOutQuad(t) {
      return t * (2 - t);
    },
    easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    },
    easeInCubic(t) {
      return t * t * t;
    },
    easeOutCubic(t) {
      return --t * t * t + 1;
    },
    easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    easeInQuart(t) {
      return t * t * t * t;
    },
    easeOutQuart(t) {
      return 1 - --t * t * t * t;
    },
    easeInOutQuart(t) {
      return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
    },
    easeInQuint(t) {
      return t * t * t * t * t;
    },
    easeOutQuint(t) {
      return 1 + --t * t * t * t * t;
    },
    easeInOutQuint(t) {
      return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
    }
  };
  function topMost(pile, accessors) {
    let candidate;
    if (!Array.isArray(accessors)) {
      accessors = [accessors];
    }
    for (const member of pile) {
      if (member) {
        candidate = member[accessors[0]];
        for (let i2 = 1; i2 < accessors.length; i2++) {
          if (candidate) {
            candidate = candidate[accessors[i2]];
          }
        }
        if (typeof candidate !== "undefined") {
          break;
        }
      }
    }
    return candidate;
  }
  var htmlColors = {
    black: "#000000",
    navy: "#000080",
    darkblue: "#00008B",
    mediumblue: "#0000CD",
    blue: "#0000FF",
    darkgreen: "#006400",
    green: "#008000",
    teal: "#008080",
    darkcyan: "#008B8B",
    deepskyblue: "#00BFFF",
    darkturquoise: "#00CED1",
    mediumspringgreen: "#00FA9A",
    lime: "#00FF00",
    springgreen: "#00FF7F",
    aqua: "#00FFFF",
    cyan: "#00FFFF",
    midnightblue: "#191970",
    dodgerblue: "#1E90FF",
    lightseagreen: "#20B2AA",
    forestgreen: "#228B22",
    seagreen: "#2E8B57",
    darkslategray: "#2F4F4F",
    limegreen: "#32CD32",
    mediumseagreen: "#3CB371",
    turquoise: "#40E0D0",
    royalblue: "#4169E1",
    steelblue: "#4682B4",
    darkslateblue: "#483D8B",
    mediumturquoise: "#48D1CC",
    indigo: "#4B0082",
    darkolivegreen: "#556B2F",
    cadetblue: "#5F9EA0",
    cornflowerblue: "#6495ED",
    mediumaquamarine: "#66CDAA",
    dimgray: "#696969",
    slateblue: "#6A5ACD",
    olivedrab: "#6B8E23",
    slategray: "#708090",
    lightslategray: "#778899",
    mediumslateblue: "#7B68EE",
    lawngreen: "#7CFC00",
    chartreuse: "#7FFF00",
    aquamarine: "#7FFFD4",
    maroon: "#800000",
    purple: "#800080",
    olive: "#808000",
    gray: "#808080",
    skyblue: "#87CEEB",
    lightskyblue: "#87CEFA",
    blueviolet: "#8A2BE2",
    darkred: "#8B0000",
    darkmagenta: "#8B008B",
    saddlebrown: "#8B4513",
    darkseagreen: "#8FBC8F",
    lightgreen: "#90EE90",
    mediumpurple: "#9370D8",
    darkviolet: "#9400D3",
    palegreen: "#98FB98",
    darkorchid: "#9932CC",
    yellowgreen: "#9ACD32",
    sienna: "#A0522D",
    brown: "#A52A2A",
    darkgray: "#A9A9A9",
    lightblue: "#ADD8E6",
    greenyellow: "#ADFF2F",
    paleturquoise: "#AFEEEE",
    lightsteelblue: "#B0C4DE",
    powderblue: "#B0E0E6",
    firebrick: "#B22222",
    darkgoldenrod: "#B8860B",
    mediumorchid: "#BA55D3",
    rosybrown: "#BC8F8F",
    darkkhaki: "#BDB76B",
    silver: "#C0C0C0",
    mediumvioletred: "#C71585",
    indianred: "#CD5C5C",
    peru: "#CD853F",
    chocolate: "#D2691E",
    tan: "#D2B48C",
    lightgrey: "#D3D3D3",
    palevioletred: "#D87093",
    thistle: "#D8BFD8",
    orchid: "#DA70D6",
    goldenrod: "#DAA520",
    crimson: "#DC143C",
    gainsboro: "#DCDCDC",
    plum: "#DDA0DD",
    burlywood: "#DEB887",
    lightcyan: "#E0FFFF",
    lavender: "#E6E6FA",
    darksalmon: "#E9967A",
    violet: "#EE82EE",
    palegoldenrod: "#EEE8AA",
    lightcoral: "#F08080",
    khaki: "#F0E68C",
    aliceblue: "#F0F8FF",
    honeydew: "#F0FFF0",
    azure: "#F0FFFF",
    sandybrown: "#F4A460",
    wheat: "#F5DEB3",
    beige: "#F5F5DC",
    whitesmoke: "#F5F5F5",
    mintcream: "#F5FFFA",
    ghostwhite: "#F8F8FF",
    salmon: "#FA8072",
    antiquewhite: "#FAEBD7",
    linen: "#FAF0E6",
    lightgoldenrodyellow: "#FAFAD2",
    oldlace: "#FDF5E6",
    red: "#FF0000",
    fuchsia: "#FF00FF",
    magenta: "#FF00FF",
    deeppink: "#FF1493",
    orangered: "#FF4500",
    tomato: "#FF6347",
    hotpink: "#FF69B4",
    coral: "#FF7F50",
    darkorange: "#FF8C00",
    lightsalmon: "#FFA07A",
    orange: "#FFA500",
    lightpink: "#FFB6C1",
    pink: "#FFC0CB",
    gold: "#FFD700",
    peachpuff: "#FFDAB9",
    navajowhite: "#FFDEAD",
    moccasin: "#FFE4B5",
    bisque: "#FFE4C4",
    mistyrose: "#FFE4E1",
    blanchedalmond: "#FFEBCD",
    papayawhip: "#FFEFD5",
    lavenderblush: "#FFF0F5",
    seashell: "#FFF5EE",
    cornsilk: "#FFF8DC",
    lemonchiffon: "#FFFACD",
    floralwhite: "#FFFAF0",
    snow: "#FFFAFA",
    yellow: "#FFFF00",
    lightyellow: "#FFFFE0",
    ivory: "#FFFFF0",
    white: "#FFFFFF"
  };
  var ColorPicker$1 = class ColorPicker {
    constructor(pixelRatio = 1) {
      this.pixelRatio = pixelRatio;
      this.generated = false;
      this.centerCoordinates = { x: 289 / 2, y: 289 / 2 };
      this.r = 289 * 0.49;
      this.color = { r: 255, g: 255, b: 255, a: 1 };
      this.hueCircle = void 0;
      this.initialColor = { r: 255, g: 255, b: 255, a: 1 };
      this.previousColor = void 0;
      this.applied = false;
      this.updateCallback = () => {
      };
      this.closeCallback = () => {
      };
      this._create();
    }
    insertTo(container2) {
      if (this.hammer !== void 0) {
        this.hammer.destroy();
        this.hammer = void 0;
      }
      this.container = container2;
      this.container.appendChild(this.frame);
      this._bindHammer();
      this._setSize();
    }
    setUpdateCallback(callback) {
      if (typeof callback === "function") {
        this.updateCallback = callback;
      } else {
        throw new Error("Function attempted to set as colorPicker update callback is not a function.");
      }
    }
    setCloseCallback(callback) {
      if (typeof callback === "function") {
        this.closeCallback = callback;
      } else {
        throw new Error("Function attempted to set as colorPicker closing callback is not a function.");
      }
    }
    _isColorString(color) {
      if (typeof color === "string") {
        return htmlColors[color];
      }
    }
    setColor(color, setInitial = true) {
      if (color === "none") {
        return;
      }
      let rgba;
      const htmlColor = this._isColorString(color);
      if (htmlColor !== void 0) {
        color = htmlColor;
      }
      if (isString(color) === true) {
        if (isValidRGB(color) === true) {
          const rgbaArray = color.substr(4).substr(0, color.length - 5).split(",");
          rgba = { r: rgbaArray[0], g: rgbaArray[1], b: rgbaArray[2], a: 1 };
        } else if (isValidRGBA(color) === true) {
          const rgbaArray = color.substr(5).substr(0, color.length - 6).split(",");
          rgba = {
            r: rgbaArray[0],
            g: rgbaArray[1],
            b: rgbaArray[2],
            a: rgbaArray[3]
          };
        } else if (isValidHex(color) === true) {
          const rgbObj = hexToRGB(color);
          rgba = { r: rgbObj.r, g: rgbObj.g, b: rgbObj.b, a: 1 };
        }
      } else {
        if (color instanceof Object) {
          if (color.r !== void 0 && color.g !== void 0 && color.b !== void 0) {
            const alpha = color.a !== void 0 ? color.a : "1.0";
            rgba = { r: color.r, g: color.g, b: color.b, a: alpha };
          }
        }
      }
      if (rgba === void 0) {
        throw new Error("Unknown color passed to the colorPicker. Supported are strings: rgb, hex, rgba. Object: rgb ({r:r,g:g,b:b,[a:a]}). Supplied: " + JSON.stringify(color));
      } else {
        this._setColor(rgba, setInitial);
      }
    }
    show() {
      if (this.closeCallback !== void 0) {
        this.closeCallback();
        this.closeCallback = void 0;
      }
      this.applied = false;
      this.frame.style.display = "block";
      this._generateHueCircle();
    }
    _hide(storePrevious = true) {
      if (storePrevious === true) {
        this.previousColor = Object.assign({}, this.color);
      }
      if (this.applied === true) {
        this.updateCallback(this.initialColor);
      }
      this.frame.style.display = "none";
      setTimeout(() => {
        if (this.closeCallback !== void 0) {
          this.closeCallback();
          this.closeCallback = void 0;
        }
      }, 0);
    }
    _save() {
      this.updateCallback(this.color);
      this.applied = false;
      this._hide();
    }
    _apply() {
      this.applied = true;
      this.updateCallback(this.color);
      this._updatePicker(this.color);
    }
    _loadLast() {
      if (this.previousColor !== void 0) {
        this.setColor(this.previousColor, false);
      } else {
        alert("There is no last color to load...");
      }
    }
    _setColor(rgba, setInitial = true) {
      if (setInitial === true) {
        this.initialColor = Object.assign({}, rgba);
      }
      this.color = rgba;
      const hsv = RGBToHSV(rgba.r, rgba.g, rgba.b);
      const angleConvert = 2 * Math.PI;
      const radius = this.r * hsv.s;
      const x2 = this.centerCoordinates.x + radius * Math.sin(angleConvert * hsv.h);
      const y2 = this.centerCoordinates.y + radius * Math.cos(angleConvert * hsv.h);
      this.colorPickerSelector.style.left = x2 - 0.5 * this.colorPickerSelector.clientWidth + "px";
      this.colorPickerSelector.style.top = y2 - 0.5 * this.colorPickerSelector.clientHeight + "px";
      this._updatePicker(rgba);
    }
    _setOpacity(value) {
      this.color.a = value / 100;
      this._updatePicker(this.color);
    }
    _setBrightness(value) {
      const hsv = RGBToHSV(this.color.r, this.color.g, this.color.b);
      hsv.v = value / 100;
      const rgba = HSVToRGB(hsv.h, hsv.s, hsv.v);
      rgba["a"] = this.color.a;
      this.color = rgba;
      this._updatePicker();
    }
    _updatePicker(rgba = this.color) {
      const hsv = RGBToHSV(rgba.r, rgba.g, rgba.b);
      const ctx = this.colorPickerCanvas.getContext("2d");
      if (this.pixelRation === void 0) {
        this.pixelRatio = (window.devicePixelRatio || 1) / (ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1);
      }
      ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
      const w = this.colorPickerCanvas.clientWidth;
      const h = this.colorPickerCanvas.clientHeight;
      ctx.clearRect(0, 0, w, h);
      ctx.putImageData(this.hueCircle, 0, 0);
      ctx.fillStyle = "rgba(0,0,0," + (1 - hsv.v) + ")";
      ctx.circle(this.centerCoordinates.x, this.centerCoordinates.y, this.r);
      ctx.fill();
      this.brightnessRange.value = 100 * hsv.v;
      this.opacityRange.value = 100 * rgba.a;
      this.initialColorDiv.style.backgroundColor = "rgba(" + this.initialColor.r + "," + this.initialColor.g + "," + this.initialColor.b + "," + this.initialColor.a + ")";
      this.newColorDiv.style.backgroundColor = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")";
    }
    _setSize() {
      this.colorPickerCanvas.style.width = "100%";
      this.colorPickerCanvas.style.height = "100%";
      this.colorPickerCanvas.width = 289 * this.pixelRatio;
      this.colorPickerCanvas.height = 289 * this.pixelRatio;
    }
    _create() {
      this.frame = document.createElement("div");
      this.frame.className = "vis-color-picker";
      this.colorPickerDiv = document.createElement("div");
      this.colorPickerSelector = document.createElement("div");
      this.colorPickerSelector.className = "vis-selector";
      this.colorPickerDiv.appendChild(this.colorPickerSelector);
      this.colorPickerCanvas = document.createElement("canvas");
      this.colorPickerDiv.appendChild(this.colorPickerCanvas);
      if (!this.colorPickerCanvas.getContext) {
        const noCanvas = document.createElement("DIV");
        noCanvas.style.color = "red";
        noCanvas.style.fontWeight = "bold";
        noCanvas.style.padding = "10px";
        noCanvas.innerText = "Error: your browser does not support HTML canvas";
        this.colorPickerCanvas.appendChild(noCanvas);
      } else {
        const ctx = this.colorPickerCanvas.getContext("2d");
        this.pixelRatio = (window.devicePixelRatio || 1) / (ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1);
        this.colorPickerCanvas.getContext("2d").setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
      }
      this.colorPickerDiv.className = "vis-color";
      this.opacityDiv = document.createElement("div");
      this.opacityDiv.className = "vis-opacity";
      this.brightnessDiv = document.createElement("div");
      this.brightnessDiv.className = "vis-brightness";
      this.arrowDiv = document.createElement("div");
      this.arrowDiv.className = "vis-arrow";
      this.opacityRange = document.createElement("input");
      try {
        this.opacityRange.type = "range";
        this.opacityRange.min = "0";
        this.opacityRange.max = "100";
      } catch (err) {
      }
      this.opacityRange.value = "100";
      this.opacityRange.className = "vis-range";
      this.brightnessRange = document.createElement("input");
      try {
        this.brightnessRange.type = "range";
        this.brightnessRange.min = "0";
        this.brightnessRange.max = "100";
      } catch (err) {
      }
      this.brightnessRange.value = "100";
      this.brightnessRange.className = "vis-range";
      this.opacityDiv.appendChild(this.opacityRange);
      this.brightnessDiv.appendChild(this.brightnessRange);
      const me = this;
      this.opacityRange.onchange = function() {
        me._setOpacity(this.value);
      };
      this.opacityRange.oninput = function() {
        me._setOpacity(this.value);
      };
      this.brightnessRange.onchange = function() {
        me._setBrightness(this.value);
      };
      this.brightnessRange.oninput = function() {
        me._setBrightness(this.value);
      };
      this.brightnessLabel = document.createElement("div");
      this.brightnessLabel.className = "vis-label vis-brightness";
      this.brightnessLabel.innerText = "brightness:";
      this.opacityLabel = document.createElement("div");
      this.opacityLabel.className = "vis-label vis-opacity";
      this.opacityLabel.innerText = "opacity:";
      this.newColorDiv = document.createElement("div");
      this.newColorDiv.className = "vis-new-color";
      this.newColorDiv.innerText = "new";
      this.initialColorDiv = document.createElement("div");
      this.initialColorDiv.className = "vis-initial-color";
      this.initialColorDiv.innerText = "initial";
      this.cancelButton = document.createElement("div");
      this.cancelButton.className = "vis-button vis-cancel";
      this.cancelButton.innerText = "cancel";
      this.cancelButton.onclick = this._hide.bind(this, false);
      this.applyButton = document.createElement("div");
      this.applyButton.className = "vis-button vis-apply";
      this.applyButton.innerText = "apply";
      this.applyButton.onclick = this._apply.bind(this);
      this.saveButton = document.createElement("div");
      this.saveButton.className = "vis-button vis-save";
      this.saveButton.innerText = "save";
      this.saveButton.onclick = this._save.bind(this);
      this.loadButton = document.createElement("div");
      this.loadButton.className = "vis-button vis-load";
      this.loadButton.innerText = "load last";
      this.loadButton.onclick = this._loadLast.bind(this);
      this.frame.appendChild(this.colorPickerDiv);
      this.frame.appendChild(this.arrowDiv);
      this.frame.appendChild(this.brightnessLabel);
      this.frame.appendChild(this.brightnessDiv);
      this.frame.appendChild(this.opacityLabel);
      this.frame.appendChild(this.opacityDiv);
      this.frame.appendChild(this.newColorDiv);
      this.frame.appendChild(this.initialColorDiv);
      this.frame.appendChild(this.cancelButton);
      this.frame.appendChild(this.applyButton);
      this.frame.appendChild(this.saveButton);
      this.frame.appendChild(this.loadButton);
    }
    _bindHammer() {
      this.drag = {};
      this.pinch = {};
      this.hammer = new Hammer$1(this.colorPickerCanvas);
      this.hammer.get("pinch").set({ enable: true });
      this.hammer.on("hammer.input", (event) => {
        if (event.isFirst) {
          this._moveSelector(event);
        }
      });
      this.hammer.on("tap", (event) => {
        this._moveSelector(event);
      });
      this.hammer.on("panstart", (event) => {
        this._moveSelector(event);
      });
      this.hammer.on("panmove", (event) => {
        this._moveSelector(event);
      });
      this.hammer.on("panend", (event) => {
        this._moveSelector(event);
      });
    }
    _generateHueCircle() {
      if (this.generated === false) {
        const ctx = this.colorPickerCanvas.getContext("2d");
        if (this.pixelRation === void 0) {
          this.pixelRatio = (window.devicePixelRatio || 1) / (ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1);
        }
        ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
        const w = this.colorPickerCanvas.clientWidth;
        const h = this.colorPickerCanvas.clientHeight;
        ctx.clearRect(0, 0, w, h);
        let x2, y2, hue, sat;
        this.centerCoordinates = { x: w * 0.5, y: h * 0.5 };
        this.r = 0.49 * w;
        const angleConvert = 2 * Math.PI / 360;
        const hfac = 1 / 360;
        const sfac = 1 / this.r;
        let rgb;
        for (hue = 0; hue < 360; hue++) {
          for (sat = 0; sat < this.r; sat++) {
            x2 = this.centerCoordinates.x + sat * Math.sin(angleConvert * hue);
            y2 = this.centerCoordinates.y + sat * Math.cos(angleConvert * hue);
            rgb = HSVToRGB(hue * hfac, sat * sfac, 1);
            ctx.fillStyle = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";
            ctx.fillRect(x2 - 0.5, y2 - 0.5, 2, 2);
          }
        }
        ctx.strokeStyle = "rgba(0,0,0,1)";
        ctx.circle(this.centerCoordinates.x, this.centerCoordinates.y, this.r);
        ctx.stroke();
        this.hueCircle = ctx.getImageData(0, 0, w, h);
      }
      this.generated = true;
    }
    _moveSelector(event) {
      const rect = this.colorPickerDiv.getBoundingClientRect();
      const left = event.center.x - rect.left;
      const top = event.center.y - rect.top;
      const centerY = 0.5 * this.colorPickerDiv.clientHeight;
      const centerX = 0.5 * this.colorPickerDiv.clientWidth;
      const x2 = left - centerX;
      const y2 = top - centerY;
      const angle = Math.atan2(x2, y2);
      const radius = 0.98 * Math.min(Math.sqrt(x2 * x2 + y2 * y2), centerX);
      const newTop = Math.cos(angle) * radius + centerY;
      const newLeft = Math.sin(angle) * radius + centerX;
      this.colorPickerSelector.style.top = newTop - 0.5 * this.colorPickerSelector.clientHeight + "px";
      this.colorPickerSelector.style.left = newLeft - 0.5 * this.colorPickerSelector.clientWidth + "px";
      let h = angle / (2 * Math.PI);
      h = h < 0 ? h + 1 : h;
      const s = radius / this.r;
      const hsv = RGBToHSV(this.color.r, this.color.g, this.color.b);
      hsv.h = h;
      hsv.s = s;
      const rgba = HSVToRGB(hsv.h, hsv.s, hsv.v);
      rgba["a"] = this.color.a;
      this.color = rgba;
      this.initialColorDiv.style.backgroundColor = "rgba(" + this.initialColor.r + "," + this.initialColor.g + "," + this.initialColor.b + "," + this.initialColor.a + ")";
      this.newColorDiv.style.backgroundColor = "rgba(" + this.color.r + "," + this.color.g + "," + this.color.b + "," + this.color.a + ")";
    }
  };
  function wrapInTag(...rest) {
    if (rest.length < 1) {
      throw new TypeError("Invalid arguments.");
    } else if (rest.length === 1) {
      return document.createTextNode(rest[0]);
    } else {
      const element = document.createElement(rest[0]);
      element.appendChild(wrapInTag(...rest.slice(1)));
      return element;
    }
  }
  var Configurator$1 = class Configurator {
    constructor(parentModule, defaultContainer, configureOptions2, pixelRatio = 1, hideOption = () => false) {
      this.parent = parentModule;
      this.changedOptions = [];
      this.container = defaultContainer;
      this.allowCreation = false;
      this.hideOption = hideOption;
      this.options = {};
      this.initialized = false;
      this.popupCounter = 0;
      this.defaultOptions = {
        enabled: false,
        filter: true,
        container: void 0,
        showButton: true
      };
      Object.assign(this.options, this.defaultOptions);
      this.configureOptions = configureOptions2;
      this.moduleOptions = {};
      this.domElements = [];
      this.popupDiv = {};
      this.popupLimit = 5;
      this.popupHistory = {};
      this.colorPicker = new ColorPicker$1(pixelRatio);
      this.wrapper = void 0;
    }
    setOptions(options2) {
      if (options2 !== void 0) {
        this.popupHistory = {};
        this._removePopup();
        let enabled = true;
        if (typeof options2 === "string") {
          this.options.filter = options2;
        } else if (Array.isArray(options2)) {
          this.options.filter = options2.join();
        } else if (typeof options2 === "object") {
          if (options2 == null) {
            throw new TypeError("options cannot be null");
          }
          if (options2.container !== void 0) {
            this.options.container = options2.container;
          }
          if (options2.filter !== void 0) {
            this.options.filter = options2.filter;
          }
          if (options2.showButton !== void 0) {
            this.options.showButton = options2.showButton;
          }
          if (options2.enabled !== void 0) {
            enabled = options2.enabled;
          }
        } else if (typeof options2 === "boolean") {
          this.options.filter = true;
          enabled = options2;
        } else if (typeof options2 === "function") {
          this.options.filter = options2;
          enabled = true;
        }
        if (this.options.filter === false) {
          enabled = false;
        }
        this.options.enabled = enabled;
      }
      this._clean();
    }
    setModuleOptions(moduleOptions) {
      this.moduleOptions = moduleOptions;
      if (this.options.enabled === true) {
        this._clean();
        if (this.options.container !== void 0) {
          this.container = this.options.container;
        }
        this._create();
      }
    }
    _create() {
      this._clean();
      this.changedOptions = [];
      const filter = this.options.filter;
      let counter = 0;
      let show = false;
      for (const option in this.configureOptions) {
        if (Object.prototype.hasOwnProperty.call(this.configureOptions, option)) {
          this.allowCreation = false;
          show = false;
          if (typeof filter === "function") {
            show = filter(option, []);
            show = show || this._handleObject(this.configureOptions[option], [option], true);
          } else if (filter === true || filter.indexOf(option) !== -1) {
            show = true;
          }
          if (show !== false) {
            this.allowCreation = true;
            if (counter > 0) {
              this._makeItem([]);
            }
            this._makeHeader(option);
            this._handleObject(this.configureOptions[option], [option]);
          }
          counter++;
        }
      }
      this._makeButton();
      this._push();
    }
    _push() {
      this.wrapper = document.createElement("div");
      this.wrapper.className = "vis-configuration-wrapper";
      this.container.appendChild(this.wrapper);
      for (let i2 = 0; i2 < this.domElements.length; i2++) {
        this.wrapper.appendChild(this.domElements[i2]);
      }
      this._showPopupIfNeeded();
    }
    _clean() {
      for (let i2 = 0; i2 < this.domElements.length; i2++) {
        this.wrapper.removeChild(this.domElements[i2]);
      }
      if (this.wrapper !== void 0) {
        this.container.removeChild(this.wrapper);
        this.wrapper = void 0;
      }
      this.domElements = [];
      this._removePopup();
    }
    _getValue(path) {
      let base = this.moduleOptions;
      for (let i2 = 0; i2 < path.length; i2++) {
        if (base[path[i2]] !== void 0) {
          base = base[path[i2]];
        } else {
          base = void 0;
          break;
        }
      }
      return base;
    }
    _makeItem(path, ...domElements) {
      if (this.allowCreation === true) {
        const item = document.createElement("div");
        item.className = "vis-configuration vis-config-item vis-config-s" + path.length;
        domElements.forEach((element) => {
          item.appendChild(element);
        });
        this.domElements.push(item);
        return this.domElements.length;
      }
      return 0;
    }
    _makeHeader(name) {
      const div = document.createElement("div");
      div.className = "vis-configuration vis-config-header";
      div.innerText = name;
      this._makeItem([], div);
    }
    _makeLabel(name, path, objectLabel = false) {
      const div = document.createElement("div");
      div.className = "vis-configuration vis-config-label vis-config-s" + path.length;
      if (objectLabel === true) {
        while (div.firstChild) {
          div.removeChild(div.firstChild);
        }
        div.appendChild(wrapInTag("i", "b", name));
      } else {
        div.innerText = name + ":";
      }
      return div;
    }
    _makeDropdown(arr, value, path) {
      const select = document.createElement("select");
      select.className = "vis-configuration vis-config-select";
      let selectedValue = 0;
      if (value !== void 0) {
        if (arr.indexOf(value) !== -1) {
          selectedValue = arr.indexOf(value);
        }
      }
      for (let i2 = 0; i2 < arr.length; i2++) {
        const option = document.createElement("option");
        option.value = arr[i2];
        if (i2 === selectedValue) {
          option.selected = "selected";
        }
        option.innerText = arr[i2];
        select.appendChild(option);
      }
      const me = this;
      select.onchange = function() {
        me._update(this.value, path);
      };
      const label = this._makeLabel(path[path.length - 1], path);
      this._makeItem(path, label, select);
    }
    _makeRange(arr, value, path) {
      const defaultValue = arr[0];
      const min = arr[1];
      const max = arr[2];
      const step = arr[3];
      const range = document.createElement("input");
      range.className = "vis-configuration vis-config-range";
      try {
        range.type = "range";
        range.min = min;
        range.max = max;
      } catch (err) {
      }
      range.step = step;
      let popupString = "";
      let popupValue = 0;
      if (value !== void 0) {
        const factor = 1.2;
        if (value < 0 && value * factor < min) {
          range.min = Math.ceil(value * factor);
          popupValue = range.min;
          popupString = "range increased";
        } else if (value / factor < min) {
          range.min = Math.ceil(value / factor);
          popupValue = range.min;
          popupString = "range increased";
        }
        if (value * factor > max && max !== 1) {
          range.max = Math.ceil(value * factor);
          popupValue = range.max;
          popupString = "range increased";
        }
        range.value = value;
      } else {
        range.value = defaultValue;
      }
      const input = document.createElement("input");
      input.className = "vis-configuration vis-config-rangeinput";
      input.value = range.value;
      const me = this;
      range.onchange = function() {
        input.value = this.value;
        me._update(Number(this.value), path);
      };
      range.oninput = function() {
        input.value = this.value;
      };
      const label = this._makeLabel(path[path.length - 1], path);
      const itemIndex = this._makeItem(path, label, range, input);
      if (popupString !== "" && this.popupHistory[itemIndex] !== popupValue) {
        this.popupHistory[itemIndex] = popupValue;
        this._setupPopup(popupString, itemIndex);
      }
    }
    _makeButton() {
      if (this.options.showButton === true) {
        const generateButton = document.createElement("div");
        generateButton.className = "vis-configuration vis-config-button";
        generateButton.innerText = "generate options";
        generateButton.onclick = () => {
          this._printOptions();
        };
        generateButton.onmouseover = () => {
          generateButton.className = "vis-configuration vis-config-button hover";
        };
        generateButton.onmouseout = () => {
          generateButton.className = "vis-configuration vis-config-button";
        };
        this.optionsContainer = document.createElement("div");
        this.optionsContainer.className = "vis-configuration vis-config-option-container";
        this.domElements.push(this.optionsContainer);
        this.domElements.push(generateButton);
      }
    }
    _setupPopup(string2, index2) {
      if (this.initialized === true && this.allowCreation === true && this.popupCounter < this.popupLimit) {
        const div = document.createElement("div");
        div.id = "vis-configuration-popup";
        div.className = "vis-configuration-popup";
        div.innerText = string2;
        div.onclick = () => {
          this._removePopup();
        };
        this.popupCounter += 1;
        this.popupDiv = { html: div, index: index2 };
      }
    }
    _removePopup() {
      if (this.popupDiv.html !== void 0) {
        this.popupDiv.html.parentNode.removeChild(this.popupDiv.html);
        clearTimeout(this.popupDiv.hideTimeout);
        clearTimeout(this.popupDiv.deleteTimeout);
        this.popupDiv = {};
      }
    }
    _showPopupIfNeeded() {
      if (this.popupDiv.html !== void 0) {
        const correspondingElement = this.domElements[this.popupDiv.index];
        const rect = correspondingElement.getBoundingClientRect();
        this.popupDiv.html.style.left = rect.left + "px";
        this.popupDiv.html.style.top = rect.top - 30 + "px";
        document.body.appendChild(this.popupDiv.html);
        this.popupDiv.hideTimeout = setTimeout(() => {
          this.popupDiv.html.style.opacity = 0;
        }, 1500);
        this.popupDiv.deleteTimeout = setTimeout(() => {
          this._removePopup();
        }, 1800);
      }
    }
    _makeCheckbox(defaultValue, value, path) {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "vis-configuration vis-config-checkbox";
      checkbox.checked = defaultValue;
      if (value !== void 0) {
        checkbox.checked = value;
        if (value !== defaultValue) {
          if (typeof defaultValue === "object") {
            if (value !== defaultValue.enabled) {
              this.changedOptions.push({ path, value });
            }
          } else {
            this.changedOptions.push({ path, value });
          }
        }
      }
      const me = this;
      checkbox.onchange = function() {
        me._update(this.checked, path);
      };
      const label = this._makeLabel(path[path.length - 1], path);
      this._makeItem(path, label, checkbox);
    }
    _makeTextInput(defaultValue, value, path) {
      const checkbox = document.createElement("input");
      checkbox.type = "text";
      checkbox.className = "vis-configuration vis-config-text";
      checkbox.value = value;
      if (value !== defaultValue) {
        this.changedOptions.push({ path, value });
      }
      const me = this;
      checkbox.onchange = function() {
        me._update(this.value, path);
      };
      const label = this._makeLabel(path[path.length - 1], path);
      this._makeItem(path, label, checkbox);
    }
    _makeColorField(arr, value, path) {
      const defaultColor = arr[1];
      const div = document.createElement("div");
      value = value === void 0 ? defaultColor : value;
      if (value !== "none") {
        div.className = "vis-configuration vis-config-colorBlock";
        div.style.backgroundColor = value;
      } else {
        div.className = "vis-configuration vis-config-colorBlock none";
      }
      value = value === void 0 ? defaultColor : value;
      div.onclick = () => {
        this._showColorPicker(value, div, path);
      };
      const label = this._makeLabel(path[path.length - 1], path);
      this._makeItem(path, label, div);
    }
    _showColorPicker(value, div, path) {
      div.onclick = function() {
      };
      this.colorPicker.insertTo(div);
      this.colorPicker.show();
      this.colorPicker.setColor(value);
      this.colorPicker.setUpdateCallback((color) => {
        const colorString = "rgba(" + color.r + "," + color.g + "," + color.b + "," + color.a + ")";
        div.style.backgroundColor = colorString;
        this._update(colorString, path);
      });
      this.colorPicker.setCloseCallback(() => {
        div.onclick = () => {
          this._showColorPicker(value, div, path);
        };
      });
    }
    _handleObject(obj, path = [], checkOnly = false) {
      let show = false;
      const filter = this.options.filter;
      let visibleInSet = false;
      for (const subObj in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, subObj)) {
          show = true;
          const item = obj[subObj];
          const newPath = copyAndExtendArray(path, subObj);
          if (typeof filter === "function") {
            show = filter(subObj, path);
            if (show === false) {
              if (!Array.isArray(item) && typeof item !== "string" && typeof item !== "boolean" && item instanceof Object) {
                this.allowCreation = false;
                show = this._handleObject(item, newPath, true);
                this.allowCreation = checkOnly === false;
              }
            }
          }
          if (show !== false) {
            visibleInSet = true;
            const value = this._getValue(newPath);
            if (Array.isArray(item)) {
              this._handleArray(item, value, newPath);
            } else if (typeof item === "string") {
              this._makeTextInput(item, value, newPath);
            } else if (typeof item === "boolean") {
              this._makeCheckbox(item, value, newPath);
            } else if (item instanceof Object) {
              if (!this.hideOption(path, subObj, this.moduleOptions)) {
                if (item.enabled !== void 0) {
                  const enabledPath = copyAndExtendArray(newPath, "enabled");
                  const enabledValue = this._getValue(enabledPath);
                  if (enabledValue === true) {
                    const label = this._makeLabel(subObj, newPath, true);
                    this._makeItem(newPath, label);
                    visibleInSet = this._handleObject(item, newPath) || visibleInSet;
                  } else {
                    this._makeCheckbox(item, enabledValue, newPath);
                  }
                } else {
                  const label = this._makeLabel(subObj, newPath, true);
                  this._makeItem(newPath, label);
                  visibleInSet = this._handleObject(item, newPath) || visibleInSet;
                }
              }
            } else {
              console.error("dont know how to handle", item, subObj, newPath);
            }
          }
        }
      }
      return visibleInSet;
    }
    _handleArray(arr, value, path) {
      if (typeof arr[0] === "string" && arr[0] === "color") {
        this._makeColorField(arr, value, path);
        if (arr[1] !== value) {
          this.changedOptions.push({ path, value });
        }
      } else if (typeof arr[0] === "string") {
        this._makeDropdown(arr, value, path);
        if (arr[0] !== value) {
          this.changedOptions.push({ path, value });
        }
      } else if (typeof arr[0] === "number") {
        this._makeRange(arr, value, path);
        if (arr[0] !== value) {
          this.changedOptions.push({ path, value: Number(value) });
        }
      }
    }
    _update(value, path) {
      const options2 = this._constructOptions(value, path);
      if (this.parent.body && this.parent.body.emitter && this.parent.body.emitter.emit) {
        this.parent.body.emitter.emit("configChange", options2);
      }
      this.initialized = true;
      this.parent.setOptions(options2);
    }
    _constructOptions(value, path, optionsObj = {}) {
      let pointer = optionsObj;
      value = value === "true" ? true : value;
      value = value === "false" ? false : value;
      for (let i2 = 0; i2 < path.length; i2++) {
        if (path[i2] !== "global") {
          if (pointer[path[i2]] === void 0) {
            pointer[path[i2]] = {};
          }
          if (i2 !== path.length - 1) {
            pointer = pointer[path[i2]];
          } else {
            pointer[path[i2]] = value;
          }
        }
      }
      return optionsObj;
    }
    _printOptions() {
      const options2 = this.getOptions();
      while (this.optionsContainer.firstChild) {
        this.optionsContainer.removeChild(this.optionsContainer.firstChild);
      }
      this.optionsContainer.appendChild(wrapInTag("pre", "const options = " + JSON.stringify(options2, null, 2)));
    }
    getOptions() {
      const options2 = {};
      for (let i2 = 0; i2 < this.changedOptions.length; i2++) {
        this._constructOptions(this.changedOptions[i2].value, this.changedOptions[i2].path, options2);
      }
      return options2;
    }
  };
  var Popup$1 = class Popup {
    constructor(container2, overflowMethod) {
      this.container = container2;
      this.overflowMethod = overflowMethod || "cap";
      this.x = 0;
      this.y = 0;
      this.padding = 5;
      this.hidden = false;
      this.frame = document.createElement("div");
      this.frame.className = "vis-tooltip";
      this.container.appendChild(this.frame);
    }
    setPosition(x2, y2) {
      this.x = parseInt(x2);
      this.y = parseInt(y2);
    }
    setText(content) {
      if (content instanceof Element) {
        while (this.frame.firstChild) {
          this.frame.removeChild(this.frame.firstChild);
        }
        this.frame.appendChild(content);
      } else {
        this.frame.innerText = content;
      }
    }
    show(doShow) {
      if (doShow === void 0) {
        doShow = true;
      }
      if (doShow === true) {
        const height = this.frame.clientHeight;
        const width = this.frame.clientWidth;
        const maxHeight = this.frame.parentNode.clientHeight;
        const maxWidth = this.frame.parentNode.clientWidth;
        let left = 0, top = 0;
        if (this.overflowMethod == "flip") {
          let isLeft = false, isTop = true;
          if (this.y - height < this.padding) {
            isTop = false;
          }
          if (this.x + width > maxWidth - this.padding) {
            isLeft = true;
          }
          if (isLeft) {
            left = this.x - width;
          } else {
            left = this.x;
          }
          if (isTop) {
            top = this.y - height;
          } else {
            top = this.y;
          }
        } else {
          top = this.y - height;
          if (top + height + this.padding > maxHeight) {
            top = maxHeight - height - this.padding;
          }
          if (top < this.padding) {
            top = this.padding;
          }
          left = this.x;
          if (left + width + this.padding > maxWidth) {
            left = maxWidth - width - this.padding;
          }
          if (left < this.padding) {
            left = this.padding;
          }
        }
        this.frame.style.left = left + "px";
        this.frame.style.top = top + "px";
        this.frame.style.visibility = "visible";
        this.hidden = false;
      } else {
        this.hide();
      }
    }
    hide() {
      this.hidden = true;
      this.frame.style.left = "0";
      this.frame.style.top = "0";
      this.frame.style.visibility = "hidden";
    }
    destroy() {
      this.frame.parentNode.removeChild(this.frame);
    }
  };
  var errorFound = false;
  var allOptions;
  var VALIDATOR_PRINT_STYLE$1 = "background: #FFeeee; color: #dd0000";
  var Validator$1 = class Validator {
    static validate(options2, referenceOptions, subObject) {
      errorFound = false;
      allOptions = referenceOptions;
      let usedOptions = referenceOptions;
      if (subObject !== void 0) {
        usedOptions = referenceOptions[subObject];
      }
      Validator.parse(options2, usedOptions, []);
      return errorFound;
    }
    static parse(options2, referenceOptions, path) {
      for (const option in options2) {
        if (Object.prototype.hasOwnProperty.call(options2, option)) {
          Validator.check(option, options2, referenceOptions, path);
        }
      }
    }
    static check(option, options2, referenceOptions, path) {
      if (referenceOptions[option] === void 0 && referenceOptions.__any__ === void 0) {
        Validator.getSuggestion(option, referenceOptions, path);
        return;
      }
      let referenceOption = option;
      let is_object = true;
      if (referenceOptions[option] === void 0 && referenceOptions.__any__ !== void 0) {
        referenceOption = "__any__";
        is_object = Validator.getType(options2[option]) === "object";
      }
      let refOptionObj = referenceOptions[referenceOption];
      if (is_object && refOptionObj.__type__ !== void 0) {
        refOptionObj = refOptionObj.__type__;
      }
      Validator.checkFields(option, options2, referenceOptions, referenceOption, refOptionObj, path);
    }
    static checkFields(option, options2, referenceOptions, referenceOption, refOptionObj, path) {
      const log = function(message) {
        console.error("%c" + message + Validator.printLocation(path, option), VALIDATOR_PRINT_STYLE$1);
      };
      const optionType = Validator.getType(options2[option]);
      const refOptionType = refOptionObj[optionType];
      if (refOptionType !== void 0) {
        if (Validator.getType(refOptionType) === "array" && refOptionType.indexOf(options2[option]) === -1) {
          log('Invalid option detected in "' + option + '". Allowed values are:' + Validator.print(refOptionType) + ' not "' + options2[option] + '". ');
          errorFound = true;
        } else if (optionType === "object" && referenceOption !== "__any__") {
          path = copyAndExtendArray(path, option);
          Validator.parse(options2[option], referenceOptions[referenceOption], path);
        }
      } else if (refOptionObj["any"] === void 0) {
        log('Invalid type received for "' + option + '". Expected: ' + Validator.print(Object.keys(refOptionObj)) + ". Received [" + optionType + '] "' + options2[option] + '"');
        errorFound = true;
      }
    }
    static getType(object2) {
      const type = typeof object2;
      if (type === "object") {
        if (object2 === null) {
          return "null";
        }
        if (object2 instanceof Boolean) {
          return "boolean";
        }
        if (object2 instanceof Number) {
          return "number";
        }
        if (object2 instanceof String) {
          return "string";
        }
        if (Array.isArray(object2)) {
          return "array";
        }
        if (object2 instanceof Date) {
          return "date";
        }
        if (object2.nodeType !== void 0) {
          return "dom";
        }
        if (object2._isAMomentObject === true) {
          return "moment";
        }
        return "object";
      } else if (type === "number") {
        return "number";
      } else if (type === "boolean") {
        return "boolean";
      } else if (type === "string") {
        return "string";
      } else if (type === void 0) {
        return "undefined";
      }
      return type;
    }
    static getSuggestion(option, options2, path) {
      const localSearch = Validator.findInOptions(option, options2, path, false);
      const globalSearch = Validator.findInOptions(option, allOptions, [], true);
      const localSearchThreshold = 8;
      const globalSearchThreshold = 4;
      let msg;
      if (localSearch.indexMatch !== void 0) {
        msg = " in " + Validator.printLocation(localSearch.path, option, "") + 'Perhaps it was incomplete? Did you mean: "' + localSearch.indexMatch + '"?\n\n';
      } else if (globalSearch.distance <= globalSearchThreshold && localSearch.distance > globalSearch.distance) {
        msg = " in " + Validator.printLocation(localSearch.path, option, "") + "Perhaps it was misplaced? Matching option found at: " + Validator.printLocation(globalSearch.path, globalSearch.closestMatch, "");
      } else if (localSearch.distance <= localSearchThreshold) {
        msg = '. Did you mean "' + localSearch.closestMatch + '"?' + Validator.printLocation(localSearch.path, option);
      } else {
        msg = ". Did you mean one of these: " + Validator.print(Object.keys(options2)) + Validator.printLocation(path, option);
      }
      console.error('%cUnknown option detected: "' + option + '"' + msg, VALIDATOR_PRINT_STYLE$1);
      errorFound = true;
    }
    static findInOptions(option, options2, path, recursive = false) {
      let min = 1e9;
      let closestMatch = "";
      let closestMatchPath = [];
      const lowerCaseOption = option.toLowerCase();
      let indexMatch = void 0;
      for (const op in options2) {
        let distance;
        if (options2[op].__type__ !== void 0 && recursive === true) {
          const result = Validator.findInOptions(option, options2[op], copyAndExtendArray(path, op));
          if (min > result.distance) {
            closestMatch = result.closestMatch;
            closestMatchPath = result.path;
            min = result.distance;
            indexMatch = result.indexMatch;
          }
        } else {
          if (op.toLowerCase().indexOf(lowerCaseOption) !== -1) {
            indexMatch = op;
          }
          distance = Validator.levenshteinDistance(option, op);
          if (min > distance) {
            closestMatch = op;
            closestMatchPath = copyArray(path);
            min = distance;
          }
        }
      }
      return {
        closestMatch,
        path: closestMatchPath,
        distance: min,
        indexMatch
      };
    }
    static printLocation(path, option, prefix = "Problem value found at: \n") {
      let str = "\n\n" + prefix + "options = {\n";
      for (let i2 = 0; i2 < path.length; i2++) {
        for (let j = 0; j < i2 + 1; j++) {
          str += "  ";
        }
        str += path[i2] + ": {\n";
      }
      for (let j = 0; j < path.length + 1; j++) {
        str += "  ";
      }
      str += option + "\n";
      for (let i2 = 0; i2 < path.length + 1; i2++) {
        for (let j = 0; j < path.length - i2; j++) {
          str += "  ";
        }
        str += "}\n";
      }
      return str + "\n\n";
    }
    static print(options2) {
      return JSON.stringify(options2).replace(/(")|(\[)|(\])|(,"__type__")/g, "").replace(/(,)/g, ", ");
    }
    static levenshteinDistance(a, b) {
      if (a.length === 0)
        return b.length;
      if (b.length === 0)
        return a.length;
      const matrix = [];
      let i2;
      for (i2 = 0; i2 <= b.length; i2++) {
        matrix[i2] = [i2];
      }
      let j;
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }
      for (i2 = 1; i2 <= b.length; i2++) {
        for (j = 1; j <= a.length; j++) {
          if (b.charAt(i2 - 1) == a.charAt(j - 1)) {
            matrix[i2][j] = matrix[i2 - 1][j - 1];
          } else {
            matrix[i2][j] = Math.min(matrix[i2 - 1][j - 1] + 1, Math.min(matrix[i2][j - 1] + 1, matrix[i2 - 1][j] + 1));
          }
        }
      }
      return matrix[b.length][a.length];
    }
  };
  var Activator = Activator$1;
  var Configurator2 = Configurator$1;
  var Hammer2 = Hammer$1;
  var Popup2 = Popup$1;
  var VALIDATOR_PRINT_STYLE = VALIDATOR_PRINT_STYLE$1;
  var Validator2 = Validator$1;

  // node_modules/uuid/dist/esm-browser/rng.js
  var getRandomValues;
  var rnds8 = new Uint8Array(16);
  function rng() {
    if (!getRandomValues) {
      getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto !== "undefined" && typeof msCrypto.getRandomValues === "function" && msCrypto.getRandomValues.bind(msCrypto);
      if (!getRandomValues) {
        throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
      }
    }
    return getRandomValues(rnds8);
  }

  // node_modules/uuid/dist/esm-browser/regex.js
  var regex_default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;

  // node_modules/uuid/dist/esm-browser/validate.js
  function validate(uuid) {
    return typeof uuid === "string" && regex_default.test(uuid);
  }
  var validate_default = validate;

  // node_modules/uuid/dist/esm-browser/stringify.js
  var byteToHex = [];
  for (i2 = 0; i2 < 256; ++i2) {
    byteToHex.push((i2 + 256).toString(16).substr(1));
  }
  var i2;
  function stringify(arr) {
    var offset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    var uuid = (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
    if (!validate_default(uuid)) {
      throw TypeError("Stringified UUID is invalid");
    }
    return uuid;
  }
  var stringify_default = stringify;

  // node_modules/uuid/dist/esm-browser/v4.js
  function v4(options2, buf, offset) {
    options2 = options2 || {};
    var rnds = options2.random || (options2.rng || rng)();
    rnds[6] = rnds[6] & 15 | 64;
    rnds[8] = rnds[8] & 63 | 128;
    if (buf) {
      offset = offset || 0;
      for (var i2 = 0; i2 < 16; ++i2) {
        buf[offset + i2] = rnds[i2];
      }
      return buf;
    }
    return stringify_default(rnds);
  }
  var v4_default = v4;

  // node_modules/vis-data/esnext/esm/vis-data.js
  function isId(value) {
    return typeof value === "string" || typeof value === "number";
  }
  var Queue = class {
    constructor(options2) {
      __publicField(this, "delay");
      __publicField(this, "max");
      __publicField(this, "_queue", []);
      __publicField(this, "_timeout", null);
      __publicField(this, "_extended", null);
      this.delay = null;
      this.max = Infinity;
      this.setOptions(options2);
    }
    setOptions(options2) {
      if (options2 && typeof options2.delay !== "undefined") {
        this.delay = options2.delay;
      }
      if (options2 && typeof options2.max !== "undefined") {
        this.max = options2.max;
      }
      this._flushIfNeeded();
    }
    static extend(object2, options2) {
      const queue = new Queue(options2);
      if (object2.flush !== void 0) {
        throw new Error("Target object already has a property flush");
      }
      object2.flush = () => {
        queue.flush();
      };
      const methods = [
        {
          name: "flush",
          original: void 0
        }
      ];
      if (options2 && options2.replace) {
        for (let i2 = 0; i2 < options2.replace.length; i2++) {
          const name = options2.replace[i2];
          methods.push({
            name,
            original: object2[name]
          });
          queue.replace(object2, name);
        }
      }
      queue._extended = {
        object: object2,
        methods
      };
      return queue;
    }
    destroy() {
      this.flush();
      if (this._extended) {
        const object2 = this._extended.object;
        const methods = this._extended.methods;
        for (let i2 = 0; i2 < methods.length; i2++) {
          const method = methods[i2];
          if (method.original) {
            object2[method.name] = method.original;
          } else {
            delete object2[method.name];
          }
        }
        this._extended = null;
      }
    }
    replace(object2, method) {
      const me = this;
      const original = object2[method];
      if (!original) {
        throw new Error("Method " + method + " undefined");
      }
      object2[method] = function(...args) {
        me.queue({
          args,
          fn: original,
          context: this
        });
      };
    }
    queue(entry) {
      if (typeof entry === "function") {
        this._queue.push({ fn: entry });
      } else {
        this._queue.push(entry);
      }
      this._flushIfNeeded();
    }
    _flushIfNeeded() {
      if (this._queue.length > this.max) {
        this.flush();
      }
      if (this._timeout != null) {
        clearTimeout(this._timeout);
        this._timeout = null;
      }
      if (this.queue.length > 0 && typeof this.delay === "number") {
        this._timeout = setTimeout(() => {
          this.flush();
        }, this.delay);
      }
    }
    flush() {
      this._queue.splice(0).forEach((entry) => {
        entry.fn.apply(entry.context || entry.fn, entry.args || []);
      });
    }
  };
  var DataSetPart = class {
    constructor() {
      __publicField(this, "_subscribers", {
        "*": [],
        add: [],
        remove: [],
        update: []
      });
      __publicField(this, "subscribe", DataSetPart.prototype.on);
      __publicField(this, "unsubscribe", DataSetPart.prototype.off);
    }
    _trigger(event, payload, senderId) {
      if (event === "*") {
        throw new Error("Cannot trigger event *");
      }
      [...this._subscribers[event], ...this._subscribers["*"]].forEach((subscriber) => {
        subscriber(event, payload, senderId != null ? senderId : null);
      });
    }
    on(event, callback) {
      if (typeof callback === "function") {
        this._subscribers[event].push(callback);
      }
    }
    off(event, callback) {
      this._subscribers[event] = this._subscribers[event].filter((subscriber) => subscriber !== callback);
    }
  };
  var DataStream = class {
    constructor(pairs) {
      __publicField(this, "_pairs");
      this._pairs = pairs;
    }
    *[Symbol.iterator]() {
      for (const [id, item] of this._pairs) {
        yield [id, item];
      }
    }
    *entries() {
      for (const [id, item] of this._pairs) {
        yield [id, item];
      }
    }
    *keys() {
      for (const [id] of this._pairs) {
        yield id;
      }
    }
    *values() {
      for (const [, item] of this._pairs) {
        yield item;
      }
    }
    toIdArray() {
      return [...this._pairs].map((pair) => pair[0]);
    }
    toItemArray() {
      return [...this._pairs].map((pair) => pair[1]);
    }
    toEntryArray() {
      return [...this._pairs];
    }
    toObjectMap() {
      const map = Object.create(null);
      for (const [id, item] of this._pairs) {
        map[id] = item;
      }
      return map;
    }
    toMap() {
      return new Map(this._pairs);
    }
    toIdSet() {
      return new Set(this.toIdArray());
    }
    toItemSet() {
      return new Set(this.toItemArray());
    }
    cache() {
      return new DataStream([...this._pairs]);
    }
    distinct(callback) {
      const set = new Set();
      for (const [id, item] of this._pairs) {
        set.add(callback(item, id));
      }
      return set;
    }
    filter(callback) {
      const pairs = this._pairs;
      return new DataStream({
        *[Symbol.iterator]() {
          for (const [id, item] of pairs) {
            if (callback(item, id)) {
              yield [id, item];
            }
          }
        }
      });
    }
    forEach(callback) {
      for (const [id, item] of this._pairs) {
        callback(item, id);
      }
    }
    map(callback) {
      const pairs = this._pairs;
      return new DataStream({
        *[Symbol.iterator]() {
          for (const [id, item] of pairs) {
            yield [id, callback(item, id)];
          }
        }
      });
    }
    max(callback) {
      const iter = this._pairs[Symbol.iterator]();
      let curr = iter.next();
      if (curr.done) {
        return null;
      }
      let maxItem = curr.value[1];
      let maxValue = callback(curr.value[1], curr.value[0]);
      while (!(curr = iter.next()).done) {
        const [id, item] = curr.value;
        const value = callback(item, id);
        if (value > maxValue) {
          maxValue = value;
          maxItem = item;
        }
      }
      return maxItem;
    }
    min(callback) {
      const iter = this._pairs[Symbol.iterator]();
      let curr = iter.next();
      if (curr.done) {
        return null;
      }
      let minItem = curr.value[1];
      let minValue = callback(curr.value[1], curr.value[0]);
      while (!(curr = iter.next()).done) {
        const [id, item] = curr.value;
        const value = callback(item, id);
        if (value < minValue) {
          minValue = value;
          minItem = item;
        }
      }
      return minItem;
    }
    reduce(callback, accumulator) {
      for (const [id, item] of this._pairs) {
        accumulator = callback(accumulator, item, id);
      }
      return accumulator;
    }
    sort(callback) {
      return new DataStream({
        [Symbol.iterator]: () => [...this._pairs].sort(([idA, itemA], [idB, itemB]) => callback(itemA, itemB, idA, idB))[Symbol.iterator]()
      });
    }
  };
  function ensureFullItem(item, idProp) {
    if (item[idProp] == null) {
      item[idProp] = v4_default();
    }
    return item;
  }
  var DataSet = class extends DataSetPart {
    constructor(data, options2) {
      super();
      __publicField(this, "flush");
      __publicField(this, "length");
      __publicField(this, "_options");
      __publicField(this, "_data");
      __publicField(this, "_idProp");
      __publicField(this, "_queue", null);
      if (data && !Array.isArray(data)) {
        options2 = data;
        data = [];
      }
      this._options = options2 || {};
      this._data = new Map();
      this.length = 0;
      this._idProp = this._options.fieldId || "id";
      if (data && data.length) {
        this.add(data);
      }
      this.setOptions(options2);
    }
    get idProp() {
      return this._idProp;
    }
    setOptions(options2) {
      if (options2 && options2.queue !== void 0) {
        if (options2.queue === false) {
          if (this._queue) {
            this._queue.destroy();
            this._queue = null;
          }
        } else {
          if (!this._queue) {
            this._queue = Queue.extend(this, {
              replace: ["add", "update", "remove"]
            });
          }
          if (options2.queue && typeof options2.queue === "object") {
            this._queue.setOptions(options2.queue);
          }
        }
      }
    }
    add(data, senderId) {
      const addedIds = [];
      let id;
      if (Array.isArray(data)) {
        const idsToAdd = data.map((d) => d[this._idProp]);
        if (idsToAdd.some((id2) => this._data.has(id2))) {
          throw new Error("A duplicate id was found in the parameter array.");
        }
        for (let i2 = 0, len = data.length; i2 < len; i2++) {
          id = this._addItem(data[i2]);
          addedIds.push(id);
        }
      } else if (data && typeof data === "object") {
        id = this._addItem(data);
        addedIds.push(id);
      } else {
        throw new Error("Unknown dataType");
      }
      if (addedIds.length) {
        this._trigger("add", { items: addedIds }, senderId);
      }
      return addedIds;
    }
    update(data, senderId) {
      const addedIds = [];
      const updatedIds = [];
      const oldData = [];
      const updatedData = [];
      const idProp = this._idProp;
      const addOrUpdate = (item) => {
        const origId = item[idProp];
        if (origId != null && this._data.has(origId)) {
          const fullItem = item;
          const oldItem = Object.assign({}, this._data.get(origId));
          const id = this._updateItem(fullItem);
          updatedIds.push(id);
          updatedData.push(fullItem);
          oldData.push(oldItem);
        } else {
          const id = this._addItem(item);
          addedIds.push(id);
        }
      };
      if (Array.isArray(data)) {
        for (let i2 = 0, len = data.length; i2 < len; i2++) {
          if (data[i2] && typeof data[i2] === "object") {
            addOrUpdate(data[i2]);
          } else {
            console.warn("Ignoring input item, which is not an object at index " + i2);
          }
        }
      } else if (data && typeof data === "object") {
        addOrUpdate(data);
      } else {
        throw new Error("Unknown dataType");
      }
      if (addedIds.length) {
        this._trigger("add", { items: addedIds }, senderId);
      }
      if (updatedIds.length) {
        const props = { items: updatedIds, oldData, data: updatedData };
        this._trigger("update", props, senderId);
      }
      return addedIds.concat(updatedIds);
    }
    updateOnly(data, senderId) {
      if (!Array.isArray(data)) {
        data = [data];
      }
      const updateEventData = data.map((update) => {
        const oldData = this._data.get(update[this._idProp]);
        if (oldData == null) {
          throw new Error("Updating non-existent items is not allowed.");
        }
        return { oldData, update };
      }).map(({ oldData, update }) => {
        const id = oldData[this._idProp];
        const updatedData = pureDeepObjectAssign(oldData, update);
        this._data.set(id, updatedData);
        return {
          id,
          oldData,
          updatedData
        };
      });
      if (updateEventData.length) {
        const props = {
          items: updateEventData.map((value) => value.id),
          oldData: updateEventData.map((value) => value.oldData),
          data: updateEventData.map((value) => value.updatedData)
        };
        this._trigger("update", props, senderId);
        return props.items;
      } else {
        return [];
      }
    }
    get(first2, second) {
      let id = void 0;
      let ids = void 0;
      let options2 = void 0;
      if (isId(first2)) {
        id = first2;
        options2 = second;
      } else if (Array.isArray(first2)) {
        ids = first2;
        options2 = second;
      } else {
        options2 = first2;
      }
      const returnType = options2 && options2.returnType === "Object" ? "Object" : "Array";
      const filter = options2 && options2.filter;
      const items = [];
      let item = void 0;
      let itemIds = void 0;
      let itemId = void 0;
      if (id != null) {
        item = this._data.get(id);
        if (item && filter && !filter(item)) {
          item = void 0;
        }
      } else if (ids != null) {
        for (let i2 = 0, len = ids.length; i2 < len; i2++) {
          item = this._data.get(ids[i2]);
          if (item != null && (!filter || filter(item))) {
            items.push(item);
          }
        }
      } else {
        itemIds = [...this._data.keys()];
        for (let i2 = 0, len = itemIds.length; i2 < len; i2++) {
          itemId = itemIds[i2];
          item = this._data.get(itemId);
          if (item != null && (!filter || filter(item))) {
            items.push(item);
          }
        }
      }
      if (options2 && options2.order && id == void 0) {
        this._sort(items, options2.order);
      }
      if (options2 && options2.fields) {
        const fields = options2.fields;
        if (id != void 0 && item != null) {
          item = this._filterFields(item, fields);
        } else {
          for (let i2 = 0, len = items.length; i2 < len; i2++) {
            items[i2] = this._filterFields(items[i2], fields);
          }
        }
      }
      if (returnType == "Object") {
        const result = {};
        for (let i2 = 0, len = items.length; i2 < len; i2++) {
          const resultant = items[i2];
          const id2 = resultant[this._idProp];
          result[id2] = resultant;
        }
        return result;
      } else {
        if (id != null) {
          return item != null ? item : null;
        } else {
          return items;
        }
      }
    }
    getIds(options2) {
      const data = this._data;
      const filter = options2 && options2.filter;
      const order = options2 && options2.order;
      const itemIds = [...data.keys()];
      const ids = [];
      if (filter) {
        if (order) {
          const items = [];
          for (let i2 = 0, len = itemIds.length; i2 < len; i2++) {
            const id = itemIds[i2];
            const item = this._data.get(id);
            if (item != null && filter(item)) {
              items.push(item);
            }
          }
          this._sort(items, order);
          for (let i2 = 0, len = items.length; i2 < len; i2++) {
            ids.push(items[i2][this._idProp]);
          }
        } else {
          for (let i2 = 0, len = itemIds.length; i2 < len; i2++) {
            const id = itemIds[i2];
            const item = this._data.get(id);
            if (item != null && filter(item)) {
              ids.push(item[this._idProp]);
            }
          }
        }
      } else {
        if (order) {
          const items = [];
          for (let i2 = 0, len = itemIds.length; i2 < len; i2++) {
            const id = itemIds[i2];
            items.push(data.get(id));
          }
          this._sort(items, order);
          for (let i2 = 0, len = items.length; i2 < len; i2++) {
            ids.push(items[i2][this._idProp]);
          }
        } else {
          for (let i2 = 0, len = itemIds.length; i2 < len; i2++) {
            const id = itemIds[i2];
            const item = data.get(id);
            if (item != null) {
              ids.push(item[this._idProp]);
            }
          }
        }
      }
      return ids;
    }
    getDataSet() {
      return this;
    }
    forEach(callback, options2) {
      const filter = options2 && options2.filter;
      const data = this._data;
      const itemIds = [...data.keys()];
      if (options2 && options2.order) {
        const items = this.get(options2);
        for (let i2 = 0, len = items.length; i2 < len; i2++) {
          const item = items[i2];
          const id = item[this._idProp];
          callback(item, id);
        }
      } else {
        for (let i2 = 0, len = itemIds.length; i2 < len; i2++) {
          const id = itemIds[i2];
          const item = this._data.get(id);
          if (item != null && (!filter || filter(item))) {
            callback(item, id);
          }
        }
      }
    }
    map(callback, options2) {
      const filter = options2 && options2.filter;
      const mappedItems = [];
      const data = this._data;
      const itemIds = [...data.keys()];
      for (let i2 = 0, len = itemIds.length; i2 < len; i2++) {
        const id = itemIds[i2];
        const item = this._data.get(id);
        if (item != null && (!filter || filter(item))) {
          mappedItems.push(callback(item, id));
        }
      }
      if (options2 && options2.order) {
        this._sort(mappedItems, options2.order);
      }
      return mappedItems;
    }
    _filterFields(item, fields) {
      if (!item) {
        return item;
      }
      return (Array.isArray(fields) ? fields : Object.keys(fields)).reduce((filteredItem, field) => {
        filteredItem[field] = item[field];
        return filteredItem;
      }, {});
    }
    _sort(items, order) {
      if (typeof order === "string") {
        const name = order;
        items.sort((a, b) => {
          const av = a[name];
          const bv = b[name];
          return av > bv ? 1 : av < bv ? -1 : 0;
        });
      } else if (typeof order === "function") {
        items.sort(order);
      } else {
        throw new TypeError("Order must be a function or a string");
      }
    }
    remove(id, senderId) {
      const removedIds = [];
      const removedItems = [];
      const ids = Array.isArray(id) ? id : [id];
      for (let i2 = 0, len = ids.length; i2 < len; i2++) {
        const item = this._remove(ids[i2]);
        if (item) {
          const itemId = item[this._idProp];
          if (itemId != null) {
            removedIds.push(itemId);
            removedItems.push(item);
          }
        }
      }
      if (removedIds.length) {
        this._trigger("remove", { items: removedIds, oldData: removedItems }, senderId);
      }
      return removedIds;
    }
    _remove(id) {
      let ident;
      if (isId(id)) {
        ident = id;
      } else if (id && typeof id === "object") {
        ident = id[this._idProp];
      }
      if (ident != null && this._data.has(ident)) {
        const item = this._data.get(ident) || null;
        this._data.delete(ident);
        --this.length;
        return item;
      }
      return null;
    }
    clear(senderId) {
      const ids = [...this._data.keys()];
      const items = [];
      for (let i2 = 0, len = ids.length; i2 < len; i2++) {
        items.push(this._data.get(ids[i2]));
      }
      this._data.clear();
      this.length = 0;
      this._trigger("remove", { items: ids, oldData: items }, senderId);
      return ids;
    }
    max(field) {
      let max = null;
      let maxField = null;
      for (const item of this._data.values()) {
        const itemField = item[field];
        if (typeof itemField === "number" && (maxField == null || itemField > maxField)) {
          max = item;
          maxField = itemField;
        }
      }
      return max || null;
    }
    min(field) {
      let min = null;
      let minField = null;
      for (const item of this._data.values()) {
        const itemField = item[field];
        if (typeof itemField === "number" && (minField == null || itemField < minField)) {
          min = item;
          minField = itemField;
        }
      }
      return min || null;
    }
    distinct(prop) {
      const data = this._data;
      const itemIds = [...data.keys()];
      const values = [];
      let count = 0;
      for (let i2 = 0, len = itemIds.length; i2 < len; i2++) {
        const id = itemIds[i2];
        const item = data.get(id);
        const value = item[prop];
        let exists = false;
        for (let j = 0; j < count; j++) {
          if (values[j] == value) {
            exists = true;
            break;
          }
        }
        if (!exists && value !== void 0) {
          values[count] = value;
          count++;
        }
      }
      return values;
    }
    _addItem(item) {
      const fullItem = ensureFullItem(item, this._idProp);
      const id = fullItem[this._idProp];
      if (this._data.has(id)) {
        throw new Error("Cannot add item: item with id " + id + " already exists");
      }
      this._data.set(id, fullItem);
      ++this.length;
      return id;
    }
    _updateItem(update) {
      const id = update[this._idProp];
      if (id == null) {
        throw new Error("Cannot update item: item has no id (item: " + JSON.stringify(update) + ")");
      }
      const item = this._data.get(id);
      if (!item) {
        throw new Error("Cannot update item: no item with id " + id + " found");
      }
      this._data.set(id, __spreadValues(__spreadValues({}, item), update));
      return id;
    }
    stream(ids) {
      if (ids) {
        const data = this._data;
        return new DataStream({
          *[Symbol.iterator]() {
            for (const id of ids) {
              const item = data.get(id);
              if (item != null) {
                yield [id, item];
              }
            }
          }
        });
      } else {
        return new DataStream({
          [Symbol.iterator]: this._data.entries.bind(this._data)
        });
      }
    }
  };
  function isDataSetLike(idProp, v) {
    return typeof v === "object" && v !== null && idProp === v.idProp && typeof v.add === "function" && typeof v.clear === "function" && typeof v.distinct === "function" && typeof v.forEach === "function" && typeof v.get === "function" && typeof v.getDataSet === "function" && typeof v.getIds === "function" && typeof v.length === "number" && typeof v.map === "function" && typeof v.max === "function" && typeof v.min === "function" && typeof v.off === "function" && typeof v.on === "function" && typeof v.remove === "function" && typeof v.setOptions === "function" && typeof v.stream === "function" && typeof v.update === "function" && typeof v.updateOnly === "function";
  }
  function isDataViewLike(idProp, v) {
    return typeof v === "object" && v !== null && idProp === v.idProp && typeof v.forEach === "function" && typeof v.get === "function" && typeof v.getDataSet === "function" && typeof v.getIds === "function" && typeof v.length === "number" && typeof v.map === "function" && typeof v.off === "function" && typeof v.on === "function" && typeof v.stream === "function" && isDataSetLike(idProp, v.getDataSet());
  }

  // node_modules/vis-network/esnext/esm/vis-network.js
  var import_component_emitter2 = __toModule(require_component_emitter());

  // node_modules/keycharm/src/keycharm.js
  function keycharm(options2) {
    var preventDefault = options2 && options2.preventDefault || false;
    var container2 = options2 && options2.container || window;
    var _exportFunctions = {};
    var _bound = { keydown: {}, keyup: {} };
    var _keys = {};
    var i2;
    for (i2 = 97; i2 <= 122; i2++) {
      _keys[String.fromCharCode(i2)] = { code: 65 + (i2 - 97), shift: false };
    }
    for (i2 = 65; i2 <= 90; i2++) {
      _keys[String.fromCharCode(i2)] = { code: i2, shift: true };
    }
    for (i2 = 0; i2 <= 9; i2++) {
      _keys["" + i2] = { code: 48 + i2, shift: false };
    }
    for (i2 = 1; i2 <= 12; i2++) {
      _keys["F" + i2] = { code: 111 + i2, shift: false };
    }
    for (i2 = 0; i2 <= 9; i2++) {
      _keys["num" + i2] = { code: 96 + i2, shift: false };
    }
    _keys["num*"] = { code: 106, shift: false };
    _keys["num+"] = { code: 107, shift: false };
    _keys["num-"] = { code: 109, shift: false };
    _keys["num/"] = { code: 111, shift: false };
    _keys["num."] = { code: 110, shift: false };
    _keys["left"] = { code: 37, shift: false };
    _keys["up"] = { code: 38, shift: false };
    _keys["right"] = { code: 39, shift: false };
    _keys["down"] = { code: 40, shift: false };
    _keys["space"] = { code: 32, shift: false };
    _keys["enter"] = { code: 13, shift: false };
    _keys["shift"] = { code: 16, shift: void 0 };
    _keys["esc"] = { code: 27, shift: false };
    _keys["backspace"] = { code: 8, shift: false };
    _keys["tab"] = { code: 9, shift: false };
    _keys["ctrl"] = { code: 17, shift: false };
    _keys["alt"] = { code: 18, shift: false };
    _keys["delete"] = { code: 46, shift: false };
    _keys["pageup"] = { code: 33, shift: false };
    _keys["pagedown"] = { code: 34, shift: false };
    _keys["="] = { code: 187, shift: false };
    _keys["-"] = { code: 189, shift: false };
    _keys["]"] = { code: 221, shift: false };
    _keys["["] = { code: 219, shift: false };
    var down = function(event) {
      handleEvent(event, "keydown");
    };
    var up = function(event) {
      handleEvent(event, "keyup");
    };
    var handleEvent = function(event, type) {
      if (_bound[type][event.keyCode] !== void 0) {
        var bound = _bound[type][event.keyCode];
        for (var i3 = 0; i3 < bound.length; i3++) {
          if (bound[i3].shift === void 0) {
            bound[i3].fn(event);
          } else if (bound[i3].shift == true && event.shiftKey == true) {
            bound[i3].fn(event);
          } else if (bound[i3].shift == false && event.shiftKey == false) {
            bound[i3].fn(event);
          }
        }
        if (preventDefault == true) {
          event.preventDefault();
        }
      }
    };
    _exportFunctions.bind = function(key, callback, type) {
      if (type === void 0) {
        type = "keydown";
      }
      if (_keys[key] === void 0) {
        throw new Error("unsupported key: " + key);
      }
      if (_bound[type][_keys[key].code] === void 0) {
        _bound[type][_keys[key].code] = [];
      }
      _bound[type][_keys[key].code].push({ fn: callback, shift: _keys[key].shift });
    };
    _exportFunctions.bindAll = function(callback, type) {
      if (type === void 0) {
        type = "keydown";
      }
      for (var key in _keys) {
        if (_keys.hasOwnProperty(key)) {
          _exportFunctions.bind(key, callback, type);
        }
      }
    };
    _exportFunctions.getKey = function(event) {
      for (var key in _keys) {
        if (_keys.hasOwnProperty(key)) {
          if (event.shiftKey == true && _keys[key].shift == true && event.keyCode == _keys[key].code) {
            return key;
          } else if (event.shiftKey == false && _keys[key].shift == false && event.keyCode == _keys[key].code) {
            return key;
          } else if (event.keyCode == _keys[key].code && key == "shift") {
            return key;
          }
        }
      }
      return "unknown key, currently not supported";
    };
    _exportFunctions.unbind = function(key, callback, type) {
      if (type === void 0) {
        type = "keydown";
      }
      if (_keys[key] === void 0) {
        throw new Error("unsupported key: " + key);
      }
      if (callback !== void 0) {
        var newBindings = [];
        var bound = _bound[type][_keys[key].code];
        if (bound !== void 0) {
          for (var i3 = 0; i3 < bound.length; i3++) {
            if (!(bound[i3].fn == callback && bound[i3].shift == _keys[key].shift)) {
              newBindings.push(_bound[type][_keys[key].code][i3]);
            }
          }
        }
        _bound[type][_keys[key].code] = newBindings;
      } else {
        _bound[type][_keys[key].code] = [];
      }
    };
    _exportFunctions.reset = function() {
      _bound = { keydown: {}, keyup: {} };
    };
    _exportFunctions.destroy = function() {
      _bound = { keydown: {}, keyup: {} };
      container2.removeEventListener("keydown", down, true);
      container2.removeEventListener("keyup", up, true);
    };
    container2.addEventListener("keydown", down, true);
    container2.addEventListener("keyup", up, true);
    return _exportFunctions;
  }

  // node_modules/vis-network/esnext/esm/vis-network.js
  function drawCircle(ctx, x2, y2, r) {
    ctx.beginPath();
    ctx.arc(x2, y2, r, 0, 2 * Math.PI, false);
    ctx.closePath();
  }
  function drawSquare(ctx, x2, y2, r) {
    ctx.beginPath();
    ctx.rect(x2 - r, y2 - r, r * 2, r * 2);
    ctx.closePath();
  }
  function drawTriangle(ctx, x2, y2, r) {
    ctx.beginPath();
    r *= 1.15;
    y2 += 0.275 * r;
    const s = r * 2;
    const s2 = s / 2;
    const ir = Math.sqrt(3) / 6 * s;
    const h = Math.sqrt(s * s - s2 * s2);
    ctx.moveTo(x2, y2 - (h - ir));
    ctx.lineTo(x2 + s2, y2 + ir);
    ctx.lineTo(x2 - s2, y2 + ir);
    ctx.lineTo(x2, y2 - (h - ir));
    ctx.closePath();
  }
  function drawTriangleDown(ctx, x2, y2, r) {
    ctx.beginPath();
    r *= 1.15;
    y2 -= 0.275 * r;
    const s = r * 2;
    const s2 = s / 2;
    const ir = Math.sqrt(3) / 6 * s;
    const h = Math.sqrt(s * s - s2 * s2);
    ctx.moveTo(x2, y2 + (h - ir));
    ctx.lineTo(x2 + s2, y2 - ir);
    ctx.lineTo(x2 - s2, y2 - ir);
    ctx.lineTo(x2, y2 + (h - ir));
    ctx.closePath();
  }
  function drawStar(ctx, x2, y2, r) {
    ctx.beginPath();
    r *= 0.82;
    y2 += 0.1 * r;
    for (let n = 0; n < 10; n++) {
      const radius = n % 2 === 0 ? r * 1.3 : r * 0.5;
      ctx.lineTo(x2 + radius * Math.sin(n * 2 * Math.PI / 10), y2 - radius * Math.cos(n * 2 * Math.PI / 10));
    }
    ctx.closePath();
  }
  function drawDiamond(ctx, x2, y2, r) {
    ctx.beginPath();
    ctx.lineTo(x2, y2 + r);
    ctx.lineTo(x2 + r, y2);
    ctx.lineTo(x2, y2 - r);
    ctx.lineTo(x2 - r, y2);
    ctx.closePath();
  }
  function drawRoundRect(ctx, x2, y2, w, h, r) {
    const r2d = Math.PI / 180;
    if (w - 2 * r < 0) {
      r = w / 2;
    }
    if (h - 2 * r < 0) {
      r = h / 2;
    }
    ctx.beginPath();
    ctx.moveTo(x2 + r, y2);
    ctx.lineTo(x2 + w - r, y2);
    ctx.arc(x2 + w - r, y2 + r, r, r2d * 270, r2d * 360, false);
    ctx.lineTo(x2 + w, y2 + h - r);
    ctx.arc(x2 + w - r, y2 + h - r, r, 0, r2d * 90, false);
    ctx.lineTo(x2 + r, y2 + h);
    ctx.arc(x2 + r, y2 + h - r, r, r2d * 90, r2d * 180, false);
    ctx.lineTo(x2, y2 + r);
    ctx.arc(x2 + r, y2 + r, r, r2d * 180, r2d * 270, false);
    ctx.closePath();
  }
  function drawEllipse(ctx, x2, y2, w, h) {
    const kappa = 0.5522848, ox = w / 2 * kappa, oy = h / 2 * kappa, xe = x2 + w, ye = y2 + h, xm = x2 + w / 2, ym = y2 + h / 2;
    ctx.beginPath();
    ctx.moveTo(x2, ym);
    ctx.bezierCurveTo(x2, ym - oy, xm - ox, y2, xm, y2);
    ctx.bezierCurveTo(xm + ox, y2, xe, ym - oy, xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x2, ym + oy, x2, ym);
    ctx.closePath();
  }
  function drawDatabase(ctx, x2, y2, w, h) {
    const f = 1 / 3;
    const wEllipse = w;
    const hEllipse = h * f;
    const kappa = 0.5522848, ox = wEllipse / 2 * kappa, oy = hEllipse / 2 * kappa, xe = x2 + wEllipse, ye = y2 + hEllipse, xm = x2 + wEllipse / 2, ym = y2 + hEllipse / 2, ymb = y2 + (h - hEllipse / 2), yeb = y2 + h;
    ctx.beginPath();
    ctx.moveTo(xe, ym);
    ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
    ctx.bezierCurveTo(xm - ox, ye, x2, ym + oy, x2, ym);
    ctx.bezierCurveTo(x2, ym - oy, xm - ox, y2, xm, y2);
    ctx.bezierCurveTo(xm + ox, y2, xe, ym - oy, xe, ym);
    ctx.lineTo(xe, ymb);
    ctx.bezierCurveTo(xe, ymb + oy, xm + ox, yeb, xm, yeb);
    ctx.bezierCurveTo(xm - ox, yeb, x2, ymb + oy, x2, ymb);
    ctx.lineTo(x2, ym);
  }
  function drawDashedLine(ctx, x2, y2, x22, y22, pattern) {
    ctx.beginPath();
    ctx.moveTo(x2, y2);
    const patternLength = pattern.length;
    const dx = x22 - x2;
    const dy = y22 - y2;
    const slope = dy / dx;
    let distRemaining = Math.sqrt(dx * dx + dy * dy);
    let patternIndex = 0;
    let draw = true;
    let xStep = 0;
    let dashLength = +pattern[0];
    while (distRemaining >= 0.1) {
      dashLength = +pattern[patternIndex++ % patternLength];
      if (dashLength > distRemaining) {
        dashLength = distRemaining;
      }
      xStep = Math.sqrt(dashLength * dashLength / (1 + slope * slope));
      xStep = dx < 0 ? -xStep : xStep;
      x2 += xStep;
      y2 += slope * xStep;
      if (draw === true) {
        ctx.lineTo(x2, y2);
      } else {
        ctx.moveTo(x2, y2);
      }
      distRemaining -= dashLength;
      draw = !draw;
    }
  }
  function drawHexagon(ctx, x2, y2, r) {
    ctx.beginPath();
    const sides = 6;
    const a = Math.PI * 2 / sides;
    ctx.moveTo(x2 + r, y2);
    for (let i2 = 1; i2 < sides; i2++) {
      ctx.lineTo(x2 + r * Math.cos(a * i2), y2 + r * Math.sin(a * i2));
    }
    ctx.closePath();
  }
  var shapeMap = {
    circle: drawCircle,
    dashedLine: drawDashedLine,
    database: drawDatabase,
    diamond: drawDiamond,
    ellipse: drawEllipse,
    ellipse_vis: drawEllipse,
    hexagon: drawHexagon,
    roundRect: drawRoundRect,
    square: drawSquare,
    star: drawStar,
    triangle: drawTriangle,
    triangleDown: drawTriangleDown
  };
  function getShape(name) {
    if (Object.prototype.hasOwnProperty.call(shapeMap, name)) {
      return shapeMap[name];
    } else {
      return function(ctx, ...args) {
        CanvasRenderingContext2D.prototype[name].call(ctx, args);
      };
    }
  }
  function parseDOT(data) {
    dot = data;
    return parseGraph();
  }
  var NODE_ATTR_MAPPING = {
    fontsize: "font.size",
    fontcolor: "font.color",
    labelfontcolor: "font.color",
    fontname: "font.face",
    color: ["color.border", "color.background"],
    fillcolor: "color.background",
    tooltip: "title",
    labeltooltip: "title"
  };
  var EDGE_ATTR_MAPPING = Object.create(NODE_ATTR_MAPPING);
  EDGE_ATTR_MAPPING.color = "color.color";
  EDGE_ATTR_MAPPING.style = "dashes";
  var TOKENTYPE = {
    NULL: 0,
    DELIMITER: 1,
    IDENTIFIER: 2,
    UNKNOWN: 3
  };
  var DELIMITERS = {
    "{": true,
    "}": true,
    "[": true,
    "]": true,
    ";": true,
    "=": true,
    ",": true,
    "->": true,
    "--": true
  };
  var dot = "";
  var index = 0;
  var c = "";
  var token = "";
  var tokenType = TOKENTYPE.NULL;
  function first() {
    index = 0;
    c = dot.charAt(0);
  }
  function next() {
    index++;
    c = dot.charAt(index);
  }
  function nextPreview() {
    return dot.charAt(index + 1);
  }
  function isAlphaNumeric(c2) {
    var charCode = c2.charCodeAt(0);
    if (charCode < 47) {
      return charCode === 35 || charCode === 46;
    }
    if (charCode < 59) {
      return charCode > 47;
    }
    if (charCode < 91) {
      return charCode > 64;
    }
    if (charCode < 96) {
      return charCode === 95;
    }
    if (charCode < 123) {
      return charCode > 96;
    }
    return false;
  }
  function merge2(a, b) {
    if (!a) {
      a = {};
    }
    if (b) {
      for (var name in b) {
        if (b.hasOwnProperty(name)) {
          a[name] = b[name];
        }
      }
    }
    return a;
  }
  function setValue(obj, path, value) {
    var keys = path.split(".");
    var o = obj;
    while (keys.length) {
      var key = keys.shift();
      if (keys.length) {
        if (!o[key]) {
          o[key] = {};
        }
        o = o[key];
      } else {
        o[key] = value;
      }
    }
  }
  function addNode(graph2, node) {
    var i2, len;
    var current = null;
    var graphs = [graph2];
    var root = graph2;
    while (root.parent) {
      graphs.push(root.parent);
      root = root.parent;
    }
    if (root.nodes) {
      for (i2 = 0, len = root.nodes.length; i2 < len; i2++) {
        if (node.id === root.nodes[i2].id) {
          current = root.nodes[i2];
          break;
        }
      }
    }
    if (!current) {
      current = {
        id: node.id
      };
      if (graph2.node) {
        current.attr = merge2(current.attr, graph2.node);
      }
    }
    for (i2 = graphs.length - 1; i2 >= 0; i2--) {
      var g = graphs[i2];
      if (!g.nodes) {
        g.nodes = [];
      }
      if (g.nodes.indexOf(current) === -1) {
        g.nodes.push(current);
      }
    }
    if (node.attr) {
      current.attr = merge2(current.attr, node.attr);
    }
  }
  function addEdge(graph2, edge) {
    if (!graph2.edges) {
      graph2.edges = [];
    }
    graph2.edges.push(edge);
    if (graph2.edge) {
      var attr = merge2({}, graph2.edge);
      edge.attr = merge2(attr, edge.attr);
    }
  }
  function createEdge(graph2, from, to, type, attr) {
    var edge = {
      from,
      to,
      type
    };
    if (graph2.edge) {
      edge.attr = merge2({}, graph2.edge);
    }
    edge.attr = merge2(edge.attr || {}, attr);
    if (attr != null) {
      if (attr.hasOwnProperty("arrows") && attr["arrows"] != null) {
        edge["arrows"] = { to: { enabled: true, type: attr.arrows.type } };
        attr["arrows"] = null;
      }
    }
    return edge;
  }
  function getToken() {
    tokenType = TOKENTYPE.NULL;
    token = "";
    while (c === " " || c === "	" || c === "\n" || c === "\r") {
      next();
    }
    do {
      var isComment = false;
      if (c === "#") {
        var i2 = index - 1;
        while (dot.charAt(i2) === " " || dot.charAt(i2) === "	") {
          i2--;
        }
        if (dot.charAt(i2) === "\n" || dot.charAt(i2) === "") {
          while (c != "" && c != "\n") {
            next();
          }
          isComment = true;
        }
      }
      if (c === "/" && nextPreview() === "/") {
        while (c != "" && c != "\n") {
          next();
        }
        isComment = true;
      }
      if (c === "/" && nextPreview() === "*") {
        while (c != "") {
          if (c === "*" && nextPreview() === "/") {
            next();
            next();
            break;
          } else {
            next();
          }
        }
        isComment = true;
      }
      while (c === " " || c === "	" || c === "\n" || c === "\r") {
        next();
      }
    } while (isComment);
    if (c === "") {
      tokenType = TOKENTYPE.DELIMITER;
      return;
    }
    var c2 = c + nextPreview();
    if (DELIMITERS[c2]) {
      tokenType = TOKENTYPE.DELIMITER;
      token = c2;
      next();
      next();
      return;
    }
    if (DELIMITERS[c]) {
      tokenType = TOKENTYPE.DELIMITER;
      token = c;
      next();
      return;
    }
    if (isAlphaNumeric(c) || c === "-") {
      token += c;
      next();
      while (isAlphaNumeric(c)) {
        token += c;
        next();
      }
      if (token === "false") {
        token = false;
      } else if (token === "true") {
        token = true;
      } else if (!isNaN(Number(token))) {
        token = Number(token);
      }
      tokenType = TOKENTYPE.IDENTIFIER;
      return;
    }
    if (c === '"') {
      next();
      while (c != "" && (c != '"' || c === '"' && nextPreview() === '"')) {
        if (c === '"') {
          token += c;
          next();
        } else if (c === "\\" && nextPreview() === "n") {
          token += "\n";
          next();
        } else {
          token += c;
        }
        next();
      }
      if (c != '"') {
        throw newSyntaxError('End of string " expected');
      }
      next();
      tokenType = TOKENTYPE.IDENTIFIER;
      return;
    }
    tokenType = TOKENTYPE.UNKNOWN;
    while (c != "") {
      token += c;
      next();
    }
    throw new SyntaxError('Syntax error in part "' + chop(token, 30) + '"');
  }
  function parseGraph() {
    var graph2 = {};
    first();
    getToken();
    if (token === "strict") {
      graph2.strict = true;
      getToken();
    }
    if (token === "graph" || token === "digraph") {
      graph2.type = token;
      getToken();
    }
    if (tokenType === TOKENTYPE.IDENTIFIER) {
      graph2.id = token;
      getToken();
    }
    if (token != "{") {
      throw newSyntaxError("Angle bracket { expected");
    }
    getToken();
    parseStatements(graph2);
    if (token != "}") {
      throw newSyntaxError("Angle bracket } expected");
    }
    getToken();
    if (token !== "") {
      throw newSyntaxError("End of file expected");
    }
    getToken();
    delete graph2.node;
    delete graph2.edge;
    delete graph2.graph;
    return graph2;
  }
  function parseStatements(graph2) {
    while (token !== "" && token != "}") {
      parseStatement(graph2);
      if (token === ";") {
        getToken();
      }
    }
  }
  function parseStatement(graph2) {
    var subgraph = parseSubgraph(graph2);
    if (subgraph) {
      parseEdge(graph2, subgraph);
      return;
    }
    var attr = parseAttributeStatement(graph2);
    if (attr) {
      return;
    }
    if (tokenType != TOKENTYPE.IDENTIFIER) {
      throw newSyntaxError("Identifier expected");
    }
    var id = token;
    getToken();
    if (token === "=") {
      getToken();
      if (tokenType != TOKENTYPE.IDENTIFIER) {
        throw newSyntaxError("Identifier expected");
      }
      graph2[id] = token;
      getToken();
    } else {
      parseNodeStatement(graph2, id);
    }
  }
  function parseSubgraph(graph2) {
    var subgraph = null;
    if (token === "subgraph") {
      subgraph = {};
      subgraph.type = "subgraph";
      getToken();
      if (tokenType === TOKENTYPE.IDENTIFIER) {
        subgraph.id = token;
        getToken();
      }
    }
    if (token === "{") {
      getToken();
      if (!subgraph) {
        subgraph = {};
      }
      subgraph.parent = graph2;
      subgraph.node = graph2.node;
      subgraph.edge = graph2.edge;
      subgraph.graph = graph2.graph;
      parseStatements(subgraph);
      if (token != "}") {
        throw newSyntaxError("Angle bracket } expected");
      }
      getToken();
      delete subgraph.node;
      delete subgraph.edge;
      delete subgraph.graph;
      delete subgraph.parent;
      if (!graph2.subgraphs) {
        graph2.subgraphs = [];
      }
      graph2.subgraphs.push(subgraph);
    }
    return subgraph;
  }
  function parseAttributeStatement(graph2) {
    if (token === "node") {
      getToken();
      graph2.node = parseAttributeList();
      return "node";
    } else if (token === "edge") {
      getToken();
      graph2.edge = parseAttributeList();
      return "edge";
    } else if (token === "graph") {
      getToken();
      graph2.graph = parseAttributeList();
      return "graph";
    }
    return null;
  }
  function parseNodeStatement(graph2, id) {
    var node = {
      id
    };
    var attr = parseAttributeList();
    if (attr) {
      node.attr = attr;
    }
    addNode(graph2, node);
    parseEdge(graph2, id);
  }
  function parseEdge(graph2, from) {
    while (token === "->" || token === "--") {
      var to;
      var type = token;
      getToken();
      var subgraph = parseSubgraph(graph2);
      if (subgraph) {
        to = subgraph;
      } else {
        if (tokenType != TOKENTYPE.IDENTIFIER) {
          throw newSyntaxError("Identifier or subgraph expected");
        }
        to = token;
        addNode(graph2, {
          id: to
        });
        getToken();
      }
      var attr = parseAttributeList();
      var edge = createEdge(graph2, from, to, type, attr);
      addEdge(graph2, edge);
      from = to;
    }
  }
  function parseAttributeList() {
    var i2;
    var attr = null;
    var edgeStyles = {
      dashed: true,
      solid: false,
      dotted: [1, 5]
    };
    var arrowTypes = {
      dot: "circle",
      box: "box",
      crow: "crow",
      curve: "curve",
      icurve: "inv_curve",
      normal: "triangle",
      inv: "inv_triangle",
      diamond: "diamond",
      tee: "bar",
      vee: "vee"
    };
    var attr_list = new Array();
    var attr_names = new Array();
    while (token === "[") {
      getToken();
      attr = {};
      while (token !== "" && token != "]") {
        if (tokenType != TOKENTYPE.IDENTIFIER) {
          throw newSyntaxError("Attribute name expected");
        }
        var name = token;
        getToken();
        if (token != "=") {
          throw newSyntaxError("Equal sign = expected");
        }
        getToken();
        if (tokenType != TOKENTYPE.IDENTIFIER) {
          throw newSyntaxError("Attribute value expected");
        }
        var value = token;
        if (name === "style") {
          value = edgeStyles[value];
        }
        var arrowType;
        if (name === "arrowhead") {
          arrowType = arrowTypes[value];
          name = "arrows";
          value = { to: { enabled: true, type: arrowType } };
        }
        if (name === "arrowtail") {
          arrowType = arrowTypes[value];
          name = "arrows";
          value = { from: { enabled: true, type: arrowType } };
        }
        attr_list.push({ attr, name, value });
        attr_names.push(name);
        getToken();
        if (token == ",") {
          getToken();
        }
      }
      if (token != "]") {
        throw newSyntaxError("Bracket ] expected");
      }
      getToken();
    }
    if (attr_names.includes("dir")) {
      var idx = {};
      idx.arrows = {};
      for (i2 = 0; i2 < attr_list.length; i2++) {
        if (attr_list[i2].name === "arrows") {
          if (attr_list[i2].value.to != null) {
            idx.arrows.to = i2;
          } else if (attr_list[i2].value.from != null) {
            idx.arrows.from = i2;
          } else {
            throw newSyntaxError("Invalid value of arrows");
          }
        } else if (attr_list[i2].name === "dir") {
          idx.dir = i2;
        }
      }
      var dir_type = attr_list[idx.dir].value;
      if (!attr_names.includes("arrows")) {
        if (dir_type === "both") {
          attr_list.push({
            attr: attr_list[idx.dir].attr,
            name: "arrows",
            value: { to: { enabled: true } }
          });
          idx.arrows.to = attr_list.length - 1;
          attr_list.push({
            attr: attr_list[idx.dir].attr,
            name: "arrows",
            value: { from: { enabled: true } }
          });
          idx.arrows.from = attr_list.length - 1;
        } else if (dir_type === "forward") {
          attr_list.push({
            attr: attr_list[idx.dir].attr,
            name: "arrows",
            value: { to: { enabled: true } }
          });
          idx.arrows.to = attr_list.length - 1;
        } else if (dir_type === "back") {
          attr_list.push({
            attr: attr_list[idx.dir].attr,
            name: "arrows",
            value: { from: { enabled: true } }
          });
          idx.arrows.from = attr_list.length - 1;
        } else if (dir_type === "none") {
          attr_list.push({
            attr: attr_list[idx.dir].attr,
            name: "arrows",
            value: ""
          });
          idx.arrows.to = attr_list.length - 1;
        } else {
          throw newSyntaxError('Invalid dir type "' + dir_type + '"');
        }
      }
      var from_type;
      var to_type;
      if (dir_type === "both") {
        if (idx.arrows.to && idx.arrows.from) {
          to_type = attr_list[idx.arrows.to].value.to.type;
          from_type = attr_list[idx.arrows.from].value.from.type;
          attr_list[idx.arrows.to] = {
            attr: attr_list[idx.arrows.to].attr,
            name: attr_list[idx.arrows.to].name,
            value: {
              to: { enabled: true, type: to_type },
              from: { enabled: true, type: from_type }
            }
          };
          attr_list.splice(idx.arrows.from, 1);
        } else if (idx.arrows.to) {
          to_type = attr_list[idx.arrows.to].value.to.type;
          from_type = "arrow";
          attr_list[idx.arrows.to] = {
            attr: attr_list[idx.arrows.to].attr,
            name: attr_list[idx.arrows.to].name,
            value: {
              to: { enabled: true, type: to_type },
              from: { enabled: true, type: from_type }
            }
          };
        } else if (idx.arrows.from) {
          to_type = "arrow";
          from_type = attr_list[idx.arrows.from].value.from.type;
          attr_list[idx.arrows.from] = {
            attr: attr_list[idx.arrows.from].attr,
            name: attr_list[idx.arrows.from].name,
            value: {
              to: { enabled: true, type: to_type },
              from: { enabled: true, type: from_type }
            }
          };
        }
      } else if (dir_type === "back") {
        if (idx.arrows.to && idx.arrows.from) {
          to_type = "";
          from_type = attr_list[idx.arrows.from].value.from.type;
          attr_list[idx.arrows.from] = {
            attr: attr_list[idx.arrows.from].attr,
            name: attr_list[idx.arrows.from].name,
            value: {
              to: { enabled: true, type: to_type },
              from: { enabled: true, type: from_type }
            }
          };
        } else if (idx.arrows.to) {
          to_type = "";
          from_type = "arrow";
          idx.arrows.from = idx.arrows.to;
          attr_list[idx.arrows.from] = {
            attr: attr_list[idx.arrows.from].attr,
            name: attr_list[idx.arrows.from].name,
            value: {
              to: { enabled: true, type: to_type },
              from: { enabled: true, type: from_type }
            }
          };
        } else if (idx.arrows.from) {
          to_type = "";
          from_type = attr_list[idx.arrows.from].value.from.type;
          attr_list[idx.arrows.to] = {
            attr: attr_list[idx.arrows.from].attr,
            name: attr_list[idx.arrows.from].name,
            value: {
              to: { enabled: true, type: to_type },
              from: { enabled: true, type: from_type }
            }
          };
        }
        attr_list[idx.arrows.from] = {
          attr: attr_list[idx.arrows.from].attr,
          name: attr_list[idx.arrows.from].name,
          value: {
            from: {
              enabled: true,
              type: attr_list[idx.arrows.from].value.from.type
            }
          }
        };
      } else if (dir_type === "none") {
        var idx_arrow;
        if (idx.arrows.to) {
          idx_arrow = idx.arrows.to;
        } else {
          idx_arrow = idx.arrows.from;
        }
        attr_list[idx_arrow] = {
          attr: attr_list[idx_arrow].attr,
          name: attr_list[idx_arrow].name,
          value: ""
        };
      } else if (dir_type === "forward") {
        if (idx.arrows.to && idx.arrows.from) {
          to_type = attr_list[idx.arrows.to].value.to.type;
          from_type = "";
          attr_list[idx.arrows.to] = {
            attr: attr_list[idx.arrows.to].attr,
            name: attr_list[idx.arrows.to].name,
            value: {
              to: { enabled: true, type: to_type },
              from: { enabled: true, type: from_type }
            }
          };
        } else if (idx.arrows.to) {
          to_type = attr_list[idx.arrows.to].value.to.type;
          from_type = "";
          attr_list[idx.arrows.to] = {
            attr: attr_list[idx.arrows.to].attr,
            name: attr_list[idx.arrows.to].name,
            value: {
              to: { enabled: true, type: to_type },
              from: { enabled: true, type: from_type }
            }
          };
        } else if (idx.arrows.from) {
          to_type = "arrow";
          from_type = "";
          idx.arrows.to = idx.arrows.from;
          attr_list[idx.arrows.to] = {
            attr: attr_list[idx.arrows.to].attr,
            name: attr_list[idx.arrows.to].name,
            value: {
              to: { enabled: true, type: to_type },
              from: { enabled: true, type: from_type }
            }
          };
        }
        attr_list[idx.arrows.to] = {
          attr: attr_list[idx.arrows.to].attr,
          name: attr_list[idx.arrows.to].name,
          value: {
            to: { enabled: true, type: attr_list[idx.arrows.to].value.to.type }
          }
        };
      } else {
        throw newSyntaxError('Invalid dir type "' + dir_type + '"');
      }
      attr_list.splice(idx.dir, 1);
    }
    var nof_attr_list;
    if (attr_names.includes("penwidth")) {
      var tmp_attr_list = [];
      nof_attr_list = attr_list.length;
      for (i2 = 0; i2 < nof_attr_list; i2++) {
        if (attr_list[i2].name !== "width") {
          if (attr_list[i2].name === "penwidth") {
            attr_list[i2].name = "width";
          }
          tmp_attr_list.push(attr_list[i2]);
        }
      }
      attr_list = tmp_attr_list;
    }
    nof_attr_list = attr_list.length;
    for (i2 = 0; i2 < nof_attr_list; i2++) {
      setValue(attr_list[i2].attr, attr_list[i2].name, attr_list[i2].value);
    }
    return attr;
  }
  function newSyntaxError(message) {
    return new SyntaxError(message + ', got "' + chop(token, 30) + '" (char ' + index + ")");
  }
  function chop(text, maxLength) {
    return text.length <= maxLength ? text : text.substr(0, 27) + "...";
  }
  function forEach2(array1, array2, fn) {
    if (Array.isArray(array1)) {
      array1.forEach(function(elem1) {
        if (Array.isArray(array2)) {
          array2.forEach(function(elem2) {
            fn(elem1, elem2);
          });
        } else {
          fn(elem1, array2);
        }
      });
    } else {
      if (Array.isArray(array2)) {
        array2.forEach(function(elem2) {
          fn(array1, elem2);
        });
      } else {
        fn(array1, array2);
      }
    }
  }
  function setProp(object2, path, value) {
    var names = path.split(".");
    var prop = names.pop();
    var obj = object2;
    for (var i2 = 0; i2 < names.length; i2++) {
      var name = names[i2];
      if (!(name in obj)) {
        obj[name] = {};
      }
      obj = obj[name];
    }
    obj[prop] = value;
    return object2;
  }
  function convertAttr(attr, mapping) {
    var converted = {};
    for (var prop in attr) {
      if (attr.hasOwnProperty(prop)) {
        var visProp = mapping[prop];
        if (Array.isArray(visProp)) {
          visProp.forEach(function(visPropI) {
            setProp(converted, visPropI, attr[prop]);
          });
        } else if (typeof visProp === "string") {
          setProp(converted, visProp, attr[prop]);
        } else {
          setProp(converted, prop, attr[prop]);
        }
      }
    }
    return converted;
  }
  function DOTToGraph(data) {
    var dotData = parseDOT(data);
    var graphData = {
      nodes: [],
      edges: [],
      options: {}
    };
    if (dotData.nodes) {
      dotData.nodes.forEach(function(dotNode) {
        var graphNode = {
          id: dotNode.id,
          label: String(dotNode.label || dotNode.id)
        };
        merge2(graphNode, convertAttr(dotNode.attr, NODE_ATTR_MAPPING));
        if (graphNode.image) {
          graphNode.shape = "image";
        }
        graphData.nodes.push(graphNode);
      });
    }
    if (dotData.edges) {
      var convertEdge = function(dotEdge) {
        var graphEdge = {
          from: dotEdge.from,
          to: dotEdge.to
        };
        merge2(graphEdge, convertAttr(dotEdge.attr, EDGE_ATTR_MAPPING));
        if (graphEdge.arrows == null && dotEdge.type === "->") {
          graphEdge.arrows = "to";
        }
        return graphEdge;
      };
      dotData.edges.forEach(function(dotEdge) {
        var from, to;
        if (dotEdge.from instanceof Object) {
          from = dotEdge.from.nodes;
        } else {
          from = {
            id: dotEdge.from
          };
        }
        if (dotEdge.to instanceof Object) {
          to = dotEdge.to.nodes;
        } else {
          to = {
            id: dotEdge.to
          };
        }
        if (dotEdge.from instanceof Object && dotEdge.from.edges) {
          dotEdge.from.edges.forEach(function(subEdge) {
            var graphEdge = convertEdge(subEdge);
            graphData.edges.push(graphEdge);
          });
        }
        forEach2(from, to, function(from2, to2) {
          var subEdge = createEdge(graphData, from2.id, to2.id, dotEdge.type, dotEdge.attr);
          var graphEdge = convertEdge(subEdge);
          graphData.edges.push(graphEdge);
        });
        if (dotEdge.to instanceof Object && dotEdge.to.edges) {
          dotEdge.to.edges.forEach(function(subEdge) {
            var graphEdge = convertEdge(subEdge);
            graphData.edges.push(graphEdge);
          });
        }
      });
    }
    if (dotData.attr) {
      graphData.options = dotData.attr;
    }
    return graphData;
  }
  function parseGephi(gephiJSON, optionsObj) {
    const options2 = {
      edges: {
        inheritColor: false
      },
      nodes: {
        fixed: false,
        parseColor: false
      }
    };
    if (optionsObj != null) {
      if (optionsObj.fixed != null) {
        options2.nodes.fixed = optionsObj.fixed;
      }
      if (optionsObj.parseColor != null) {
        options2.nodes.parseColor = optionsObj.parseColor;
      }
      if (optionsObj.inheritColor != null) {
        options2.edges.inheritColor = optionsObj.inheritColor;
      }
    }
    const gEdges = gephiJSON.edges;
    const vEdges = gEdges.map((gEdge) => {
      const vEdge = {
        from: gEdge.source,
        id: gEdge.id,
        to: gEdge.target
      };
      if (gEdge.attributes != null) {
        vEdge.attributes = gEdge.attributes;
      }
      if (gEdge.label != null) {
        vEdge.label = gEdge.label;
      }
      if (gEdge.attributes != null && gEdge.attributes.title != null) {
        vEdge.title = gEdge.attributes.title;
      }
      if (gEdge.type === "Directed") {
        vEdge.arrows = "to";
      }
      if (gEdge.color && options2.edges.inheritColor === false) {
        vEdge.color = gEdge.color;
      }
      return vEdge;
    });
    const vNodes = gephiJSON.nodes.map((gNode) => {
      const vNode = {
        id: gNode.id,
        fixed: options2.nodes.fixed && gNode.x != null && gNode.y != null
      };
      if (gNode.attributes != null) {
        vNode.attributes = gNode.attributes;
      }
      if (gNode.label != null) {
        vNode.label = gNode.label;
      }
      if (gNode.size != null) {
        vNode.size = gNode.size;
      }
      if (gNode.attributes != null && gNode.attributes.title != null) {
        vNode.title = gNode.attributes.title;
      }
      if (gNode.title != null) {
        vNode.title = gNode.title;
      }
      if (gNode.x != null) {
        vNode.x = gNode.x;
      }
      if (gNode.y != null) {
        vNode.y = gNode.y;
      }
      if (gNode.color != null) {
        if (options2.nodes.parseColor === true) {
          vNode.color = gNode.color;
        } else {
          vNode.color = {
            background: gNode.color,
            border: gNode.color,
            highlight: {
              background: gNode.color,
              border: gNode.color
            },
            hover: {
              background: gNode.color,
              border: gNode.color
            }
          };
        }
      }
      return vNode;
    });
    return { nodes: vNodes, edges: vEdges };
  }
  var en = {
    addDescription: "Click in an empty space to place a new node.",
    addEdge: "Add Edge",
    addNode: "Add Node",
    back: "Back",
    close: "Close",
    createEdgeError: "Cannot link edges to a cluster.",
    del: "Delete selected",
    deleteClusterError: "Clusters cannot be deleted.",
    edgeDescription: "Click on a node and drag the edge to another node to connect them.",
    edit: "Edit",
    editClusterError: "Clusters cannot be edited.",
    editEdge: "Edit Edge",
    editEdgeDescription: "Click on the control points and drag them to a node to connect to it.",
    editNode: "Edit Node"
  };
  var de = {
    addDescription: "Klicke auf eine freie Stelle, um einen neuen Knoten zu plazieren.",
    addEdge: "Kante hinzuf\xFCgen",
    addNode: "Knoten hinzuf\xFCgen",
    back: "Zur\xFCck",
    close: "Schlie\xDFen",
    createEdgeError: "Es ist nicht m\xF6glich, Kanten mit Clustern zu verbinden.",
    del: "L\xF6sche Auswahl",
    deleteClusterError: "Cluster k\xF6nnen nicht gel\xF6scht werden.",
    edgeDescription: "Klicke auf einen Knoten und ziehe die Kante zu einem anderen Knoten, um diese zu verbinden.",
    edit: "Editieren",
    editClusterError: "Cluster k\xF6nnen nicht editiert werden.",
    editEdge: "Kante editieren",
    editEdgeDescription: "Klicke auf die Verbindungspunkte und ziehe diese auf einen Knoten, um sie zu verbinden.",
    editNode: "Knoten editieren"
  };
  var es = {
    addDescription: "Haga clic en un lugar vac\xEDo para colocar un nuevo nodo.",
    addEdge: "A\xF1adir arista",
    addNode: "A\xF1adir nodo",
    back: "Atr\xE1s",
    close: "Cerrar",
    createEdgeError: "No se puede conectar una arista a un grupo.",
    del: "Eliminar selecci\xF3n",
    deleteClusterError: "No es posible eliminar grupos.",
    edgeDescription: "Haga clic en un nodo y arrastre la arista hacia otro nodo para conectarlos.",
    edit: "Editar",
    editClusterError: "No es posible editar grupos.",
    editEdge: "Editar arista",
    editEdgeDescription: "Haga clic en un punto de control y arrastrelo a un nodo para conectarlo.",
    editNode: "Editar nodo"
  };
  var it = {
    addDescription: "Clicca per aggiungere un nuovo nodo",
    addEdge: "Aggiungi un vertice",
    addNode: "Aggiungi un nodo",
    back: "Indietro",
    close: "Chiudere",
    createEdgeError: "Non si possono collegare vertici ad un cluster",
    del: "Cancella la selezione",
    deleteClusterError: "I cluster non possono essere cancellati",
    edgeDescription: "Clicca su un nodo e trascinalo ad un altro nodo per connetterli.",
    edit: "Modifica",
    editClusterError: "I clusters non possono essere modificati.",
    editEdge: "Modifica il vertice",
    editEdgeDescription: "Clicca sui Punti di controllo e trascinali ad un nodo per connetterli.",
    editNode: "Modifica il nodo"
  };
  var nl = {
    addDescription: "Klik op een leeg gebied om een nieuwe node te maken.",
    addEdge: "Link toevoegen",
    addNode: "Node toevoegen",
    back: "Terug",
    close: "Sluiten",
    createEdgeError: "Kan geen link maken naar een cluster.",
    del: "Selectie verwijderen",
    deleteClusterError: "Clusters kunnen niet worden verwijderd.",
    edgeDescription: "Klik op een node en sleep de link naar een andere node om ze te verbinden.",
    edit: "Wijzigen",
    editClusterError: "Clusters kunnen niet worden aangepast.",
    editEdge: "Link wijzigen",
    editEdgeDescription: "Klik op de verbindingspunten en sleep ze naar een node om daarmee te verbinden.",
    editNode: "Node wijzigen"
  };
  var pt = {
    addDescription: "Clique em um espa\xE7o em branco para adicionar um novo n\xF3",
    addEdge: "Adicionar aresta",
    addNode: "Adicionar n\xF3",
    back: "Voltar",
    close: "Fechar",
    createEdgeError: "N\xE3o foi poss\xEDvel linkar arestas a um cluster.",
    del: "Remover selecionado",
    deleteClusterError: "Clusters n\xE3o puderam ser removidos.",
    edgeDescription: "Clique em um n\xF3 e arraste a aresta at\xE9 outro n\xF3 para conect\xE1-los",
    edit: "Editar",
    editClusterError: "Clusters n\xE3o puderam ser editados.",
    editEdge: "Editar aresta",
    editEdgeDescription: "Clique nos pontos de controle e os arraste para um n\xF3 para conect\xE1-los",
    editNode: "Editar n\xF3"
  };
  var ru = {
    addDescription: "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0432 \u0441\u0432\u043E\u0431\u043E\u0434\u043D\u043E\u0435 \u043C\u0435\u0441\u0442\u043E, \u0447\u0442\u043E\u0431\u044B \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043D\u043E\u0432\u044B\u0439 \u0443\u0437\u0435\u043B.",
    addEdge: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0440\u0435\u0431\u0440\u043E",
    addNode: "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0443\u0437\u0435\u043B",
    back: "\u041D\u0430\u0437\u0430\u0434",
    close: "\u0417\u0430\u043A\u0440\u044B\u0432\u0430\u0442\u044C",
    createEdgeError: "\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C \u0440\u0435\u0431\u0440\u0430 \u0432 \u043A\u043B\u0430\u0441\u0442\u0435\u0440.",
    del: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0435",
    deleteClusterError: "\u041A\u043B\u0430\u0441\u0442\u0435\u0440\u044B \u043D\u0435 \u043C\u043E\u0433\u0443\u0442 \u0431\u044B\u0442\u044C \u0443\u0434\u0430\u043B\u0435\u043D\u044B",
    edgeDescription: "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u043D\u0430 \u0443\u0437\u0435\u043B \u0438 \u043F\u0440\u043E\u0442\u044F\u043D\u0438\u0442\u0435 \u0440\u0435\u0431\u0440\u043E \u043A \u0434\u0440\u0443\u0433\u043E\u043C\u0443 \u0443\u0437\u043B\u0443, \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0435\u0434\u0438\u043D\u0438\u0442\u044C \u0438\u0445.",
    edit: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
    editClusterError: "\u041A\u043B\u0430\u0441\u0442\u0435\u0440\u044B \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0434\u043B\u044F \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u044F.",
    editEdge: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0440\u0435\u0431\u0440\u043E",
    editEdgeDescription: "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u043D\u0430 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C\u043D\u044B\u0435 \u0442\u043E\u0447\u043A\u0438 \u0438 \u043F\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 \u0438\u0445 \u0432 \u0443\u0437\u0435\u043B, \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u044C\u0441\u044F \u043A \u043D\u0435\u043C\u0443.",
    editNode: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0443\u0437\u0435\u043B"
  };
  var cn = {
    addDescription: "\u5355\u51FB\u7A7A\u767D\u5904\u653E\u7F6E\u65B0\u8282\u70B9\u3002",
    addEdge: "\u6DFB\u52A0\u8FDE\u63A5\u7EBF",
    addNode: "\u6DFB\u52A0\u8282\u70B9",
    back: "\u8FD4\u56DE",
    close: "\u95DC\u9589",
    createEdgeError: "\u65E0\u6CD5\u5C06\u8FDE\u63A5\u7EBF\u8FDE\u63A5\u5230\u7FA4\u96C6\u3002",
    del: "\u5220\u9664\u9009\u5B9A",
    deleteClusterError: "\u65E0\u6CD5\u5220\u9664\u7FA4\u96C6\u3002",
    edgeDescription: "\u5355\u51FB\u67D0\u4E2A\u8282\u70B9\u5E76\u5C06\u8BE5\u8FDE\u63A5\u7EBF\u62D6\u52A8\u5230\u53E6\u4E00\u4E2A\u8282\u70B9\u4EE5\u8FDE\u63A5\u5B83\u4EEC\u3002",
    edit: "\u7F16\u8F91",
    editClusterError: "\u65E0\u6CD5\u7F16\u8F91\u7FA4\u96C6\u3002",
    editEdge: "\u7F16\u8F91\u8FDE\u63A5\u7EBF",
    editEdgeDescription: "\u5355\u51FB\u63A7\u5236\u8282\u70B9\u5E76\u5C06\u5B83\u4EEC\u62D6\u5230\u8282\u70B9\u4E0A\u8FDE\u63A5\u3002",
    editNode: "\u7F16\u8F91\u8282\u70B9"
  };
  var uk = {
    addDescription: "K\u043B\u0456\u043A\u043D\u0456\u0442\u044C \u043D\u0430 \u0432\u0456\u043B\u044C\u043D\u0435 \u043C\u0456\u0441\u0446\u0435, \u0449\u043E\u0431 \u0434\u043E\u0434\u0430\u0442\u0438 \u043D\u043E\u0432\u0438\u0439 \u0432\u0443\u0437\u043E\u043B.",
    addEdge: "\u0414\u043E\u0434\u0430\u0442\u0438 \u043A\u0440\u0430\u0439",
    addNode: "\u0414\u043E\u0434\u0430\u0442\u0438 \u0432\u0443\u0437\u043E\u043B",
    back: "\u041D\u0430\u0437\u0430\u0434",
    close: "\u0417\u0430\u043A\u0440\u0438\u0442\u0438",
    createEdgeError: "\u041D\u0435 \u043C\u043E\u0436\u043B\u0438\u0432\u043E \u043E\u0431'\u0454\u0434\u043D\u0430\u0442\u0438 \u043A\u0440\u0430\u0457 \u0432 \u0433\u0440\u0443\u043F\u0443.",
    del: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u043E\u0431\u0440\u0430\u043D\u0435",
    deleteClusterError: "\u0413\u0440\u0443\u043F\u0438 \u043D\u0435 \u043C\u043E\u0436\u0443\u0442\u044C \u0431\u0443\u0442\u0438 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u0456.",
    edgeDescription: "\u041A\u043B\u0456\u043A\u043D\u0456\u0442\u044C \u043D\u0430 \u0432\u0443\u0437\u043E\u043B \u0456 \u043F\u0435\u0440\u0435\u0442\u044F\u0433\u043D\u0456\u0442\u044C \u043A\u0440\u0430\u0439 \u0434\u043E \u0456\u043D\u0448\u043E\u0433\u043E \u0432\u0443\u0437\u043B\u0430, \u0449\u043E\u0431 \u0457\u0445 \u0437'\u0454\u0434\u043D\u0430\u0442\u0438.",
    edit: "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438",
    editClusterError: "\u0413\u0440\u0443\u043F\u0438 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0456 \u0434\u043B\u044F \u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F.",
    editEdge: "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u043A\u0440\u0430\u0439",
    editEdgeDescription: "\u041A\u043B\u0456\u043A\u043D\u0456\u0442\u044C \u043D\u0430 \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u044C\u043D\u0456 \u0442\u043E\u0447\u043A\u0438 \u0456 \u043F\u0435\u0440\u0435\u0442\u044F\u0433\u043D\u0456\u0442\u044C \u0457\u0445 \u0443 \u0432\u0443\u0437\u043E\u043B, \u0449\u043E\u0431 \u043F\u0456\u0434\u043A\u043B\u044E\u0447\u0438\u0442\u0438\u0441\u044F \u0434\u043E \u043D\u044C\u043E\u0433\u043E.",
    editNode: "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u0432\u0443\u0437\u043E\u043B"
  };
  var fr = {
    addDescription: "Cliquez dans un endroit vide pour placer un n\u0153ud.",
    addEdge: "Ajouter un lien",
    addNode: "Ajouter un n\u0153ud",
    back: "Retour",
    close: "Fermer",
    createEdgeError: "Impossible de cr\xE9er un lien vers un cluster.",
    del: "Effacer la s\xE9lection",
    deleteClusterError: "Les clusters ne peuvent pas \xEAtre effac\xE9s.",
    edgeDescription: "Cliquez sur un n\u0153ud et glissez le lien vers un autre n\u0153ud pour les connecter.",
    edit: "\xC9diter",
    editClusterError: "Les clusters ne peuvent pas \xEAtre \xE9dit\xE9s.",
    editEdge: "\xC9diter le lien",
    editEdgeDescription: "Cliquez sur les points de contr\xF4le et glissez-les pour connecter un n\u0153ud.",
    editNode: "\xC9diter le n\u0153ud"
  };
  var cs = {
    addDescription: "Kluknut\xEDm do pr\xE1zdn\xE9ho prostoru m\u016F\u017Eete p\u0159idat nov\xFD vrchol.",
    addEdge: "P\u0159idat hranu",
    addNode: "P\u0159idat vrchol",
    back: "Zp\u011Bt",
    close: "Zav\u0159\xEDt",
    createEdgeError: "Nelze p\u0159ipojit hranu ke shluku.",
    del: "Smazat v\xFDb\u011Br",
    deleteClusterError: "Nelze mazat shluky.",
    edgeDescription: "P\u0159eta\u017Een\xEDm z jednoho vrcholu do druh\xE9ho m\u016F\u017Eete spojit tyto vrcholy novou hranou.",
    edit: "Upravit",
    editClusterError: "Nelze upravovat shluky.",
    editEdge: "Upravit hranu",
    editEdgeDescription: "P\u0159eta\u017Een\xEDm kontroln\xEDho vrcholu hrany ji m\u016F\u017Eete p\u0159ipojit k jin\xE9mu vrcholu.",
    editNode: "Upravit vrchol"
  };
  var locales = /* @__PURE__ */ Object.freeze({
    __proto__: null,
    cn,
    cs,
    de,
    en,
    es,
    fr,
    it,
    nl,
    pt,
    ru,
    uk
  });
  function normalizeLanguageCode(locales2, rawCode) {
    try {
      const [rawLanguage, rawCountry] = rawCode.split(/[-_ /]/, 2);
      const language = rawLanguage != null ? rawLanguage.toLowerCase() : null;
      const country = rawCountry != null ? rawCountry.toUpperCase() : null;
      if (language && country) {
        const code = language + "-" + country;
        if (Object.prototype.hasOwnProperty.call(locales2, code)) {
          return code;
        } else {
          console.warn(`Unknown variant ${country} of language ${language}.`);
        }
      }
      if (language) {
        const code = language;
        if (Object.prototype.hasOwnProperty.call(locales2, code)) {
          return code;
        } else {
          console.warn(`Unknown language ${language}`);
        }
      }
      console.warn(`Unknown locale ${rawCode}, falling back to English.`);
      return "en";
    } catch (error) {
      console.error(error);
      console.warn(`Unexpected error while normalizing locale ${rawCode}, falling back to English.`);
      return "en";
    }
  }
  var CachedImage = class {
    constructor() {
      this.NUM_ITERATIONS = 4;
      this.image = new Image();
      this.canvas = document.createElement("canvas");
    }
    init() {
      if (this.initialized())
        return;
      this.src = this.image.src;
      const w = this.image.width;
      const h = this.image.height;
      this.width = w;
      this.height = h;
      const h2 = Math.floor(h / 2);
      const h4 = Math.floor(h / 4);
      const h8 = Math.floor(h / 8);
      const h16 = Math.floor(h / 16);
      const w2 = Math.floor(w / 2);
      const w4 = Math.floor(w / 4);
      const w8 = Math.floor(w / 8);
      const w16 = Math.floor(w / 16);
      this.canvas.width = 3 * w4;
      this.canvas.height = h2;
      this.coordinates = [
        [0, 0, w2, h2],
        [w2, 0, w4, h4],
        [w2, h4, w8, h8],
        [5 * w8, h4, w16, h16]
      ];
      this._fillMipMap();
    }
    initialized() {
      return this.coordinates !== void 0;
    }
    _fillMipMap() {
      const ctx = this.canvas.getContext("2d");
      const to = this.coordinates[0];
      ctx.drawImage(this.image, to[0], to[1], to[2], to[3]);
      for (let iterations = 1; iterations < this.NUM_ITERATIONS; iterations++) {
        const from = this.coordinates[iterations - 1];
        const to2 = this.coordinates[iterations];
        ctx.drawImage(this.canvas, from[0], from[1], from[2], from[3], to2[0], to2[1], to2[2], to2[3]);
      }
    }
    drawImageAtPosition(ctx, factor, left, top, width, height) {
      if (!this.initialized())
        return;
      if (factor > 2) {
        factor *= 0.5;
        let iterations = 0;
        while (factor > 2 && iterations < this.NUM_ITERATIONS) {
          factor *= 0.5;
          iterations += 1;
        }
        if (iterations >= this.NUM_ITERATIONS) {
          iterations = this.NUM_ITERATIONS - 1;
        }
        const from = this.coordinates[iterations];
        ctx.drawImage(this.canvas, from[0], from[1], from[2], from[3], left, top, width, height);
      } else {
        ctx.drawImage(this.image, left, top, width, height);
      }
    }
  };
  var Images = class {
    constructor(callback) {
      this.images = {};
      this.imageBroken = {};
      this.callback = callback;
    }
    _tryloadBrokenUrl(url, brokenUrl, imageToLoadBrokenUrlOn) {
      if (url === void 0 || imageToLoadBrokenUrlOn === void 0)
        return;
      if (brokenUrl === void 0) {
        console.warn("No broken url image defined");
        return;
      }
      imageToLoadBrokenUrlOn.image.onerror = () => {
        console.error("Could not load brokenImage:", brokenUrl);
      };
      imageToLoadBrokenUrlOn.image.src = brokenUrl;
    }
    _redrawWithImage(imageToRedrawWith) {
      if (this.callback) {
        this.callback(imageToRedrawWith);
      }
    }
    load(url, brokenUrl) {
      const cachedImage = this.images[url];
      if (cachedImage)
        return cachedImage;
      const img = new CachedImage();
      this.images[url] = img;
      img.image.onload = () => {
        this._fixImageCoordinates(img.image);
        img.init();
        this._redrawWithImage(img);
      };
      img.image.onerror = () => {
        console.error("Could not load image:", url);
        this._tryloadBrokenUrl(url, brokenUrl, img);
      };
      img.image.src = url;
      return img;
    }
    _fixImageCoordinates(imageToCache) {
      if (imageToCache.width === 0) {
        document.body.appendChild(imageToCache);
        imageToCache.width = imageToCache.offsetWidth;
        imageToCache.height = imageToCache.offsetHeight;
        document.body.removeChild(imageToCache);
      }
    }
  };
  var Groups = class {
    constructor() {
      this.clear();
      this._defaultIndex = 0;
      this._groupIndex = 0;
      this._defaultGroups = [
        {
          border: "#2B7CE9",
          background: "#97C2FC",
          highlight: { border: "#2B7CE9", background: "#D2E5FF" },
          hover: { border: "#2B7CE9", background: "#D2E5FF" }
        },
        {
          border: "#FFA500",
          background: "#FFFF00",
          highlight: { border: "#FFA500", background: "#FFFFA3" },
          hover: { border: "#FFA500", background: "#FFFFA3" }
        },
        {
          border: "#FA0A10",
          background: "#FB7E81",
          highlight: { border: "#FA0A10", background: "#FFAFB1" },
          hover: { border: "#FA0A10", background: "#FFAFB1" }
        },
        {
          border: "#41A906",
          background: "#7BE141",
          highlight: { border: "#41A906", background: "#A1EC76" },
          hover: { border: "#41A906", background: "#A1EC76" }
        },
        {
          border: "#E129F0",
          background: "#EB7DF4",
          highlight: { border: "#E129F0", background: "#F0B3F5" },
          hover: { border: "#E129F0", background: "#F0B3F5" }
        },
        {
          border: "#7C29F0",
          background: "#AD85E4",
          highlight: { border: "#7C29F0", background: "#D3BDF0" },
          hover: { border: "#7C29F0", background: "#D3BDF0" }
        },
        {
          border: "#C37F00",
          background: "#FFA807",
          highlight: { border: "#C37F00", background: "#FFCA66" },
          hover: { border: "#C37F00", background: "#FFCA66" }
        },
        {
          border: "#4220FB",
          background: "#6E6EFD",
          highlight: { border: "#4220FB", background: "#9B9BFD" },
          hover: { border: "#4220FB", background: "#9B9BFD" }
        },
        {
          border: "#FD5A77",
          background: "#FFC0CB",
          highlight: { border: "#FD5A77", background: "#FFD1D9" },
          hover: { border: "#FD5A77", background: "#FFD1D9" }
        },
        {
          border: "#4AD63A",
          background: "#C2FABC",
          highlight: { border: "#4AD63A", background: "#E6FFE3" },
          hover: { border: "#4AD63A", background: "#E6FFE3" }
        },
        {
          border: "#990000",
          background: "#EE0000",
          highlight: { border: "#BB0000", background: "#FF3333" },
          hover: { border: "#BB0000", background: "#FF3333" }
        },
        {
          border: "#FF6000",
          background: "#FF6000",
          highlight: { border: "#FF6000", background: "#FF6000" },
          hover: { border: "#FF6000", background: "#FF6000" }
        },
        {
          border: "#97C2FC",
          background: "#2B7CE9",
          highlight: { border: "#D2E5FF", background: "#2B7CE9" },
          hover: { border: "#D2E5FF", background: "#2B7CE9" }
        },
        {
          border: "#399605",
          background: "#255C03",
          highlight: { border: "#399605", background: "#255C03" },
          hover: { border: "#399605", background: "#255C03" }
        },
        {
          border: "#B70054",
          background: "#FF007E",
          highlight: { border: "#B70054", background: "#FF007E" },
          hover: { border: "#B70054", background: "#FF007E" }
        },
        {
          border: "#AD85E4",
          background: "#7C29F0",
          highlight: { border: "#D3BDF0", background: "#7C29F0" },
          hover: { border: "#D3BDF0", background: "#7C29F0" }
        },
        {
          border: "#4557FA",
          background: "#000EA1",
          highlight: { border: "#6E6EFD", background: "#000EA1" },
          hover: { border: "#6E6EFD", background: "#000EA1" }
        },
        {
          border: "#FFC0CB",
          background: "#FD5A77",
          highlight: { border: "#FFD1D9", background: "#FD5A77" },
          hover: { border: "#FFD1D9", background: "#FD5A77" }
        },
        {
          border: "#C2FABC",
          background: "#74D66A",
          highlight: { border: "#E6FFE3", background: "#74D66A" },
          hover: { border: "#E6FFE3", background: "#74D66A" }
        },
        {
          border: "#EE0000",
          background: "#990000",
          highlight: { border: "#FF3333", background: "#BB0000" },
          hover: { border: "#FF3333", background: "#BB0000" }
        }
      ];
      this.options = {};
      this.defaultOptions = {
        useDefaultGroups: true
      };
      Object.assign(this.options, this.defaultOptions);
    }
    setOptions(options2) {
      const optionFields = ["useDefaultGroups"];
      if (options2 !== void 0) {
        for (const groupName in options2) {
          if (Object.prototype.hasOwnProperty.call(options2, groupName)) {
            if (optionFields.indexOf(groupName) === -1) {
              const group = options2[groupName];
              this.add(groupName, group);
            }
          }
        }
      }
    }
    clear() {
      this._groups = new Map();
      this._groupNames = [];
    }
    get(groupname, shouldCreate = true) {
      let group = this._groups.get(groupname);
      if (group === void 0 && shouldCreate) {
        if (this.options.useDefaultGroups === false && this._groupNames.length > 0) {
          const index2 = this._groupIndex % this._groupNames.length;
          ++this._groupIndex;
          group = {};
          group.color = this._groups.get(this._groupNames[index2]);
          this._groups.set(groupname, group);
        } else {
          const index2 = this._defaultIndex % this._defaultGroups.length;
          this._defaultIndex++;
          group = {};
          group.color = this._defaultGroups[index2];
          this._groups.set(groupname, group);
        }
      }
      return group;
    }
    add(groupName, style) {
      if (!this._groups.has(groupName)) {
        this._groupNames.push(groupName);
      }
      this._groups.set(groupName, style);
      return style;
    }
  };
  function choosify(subOption, pile) {
    const allowed = ["node", "edge", "label"];
    let value = true;
    const chosen = topMost(pile, "chosen");
    if (typeof chosen === "boolean") {
      value = chosen;
    } else if (typeof chosen === "object") {
      if (allowed.indexOf(subOption) === -1) {
        throw new Error("choosify: subOption '" + subOption + "' should be one of '" + allowed.join("', '") + "'");
      }
      const chosenEdge = topMost(pile, ["chosen", subOption]);
      if (typeof chosenEdge === "boolean" || typeof chosenEdge === "function") {
        value = chosenEdge;
      }
    }
    return value;
  }
  function pointInRect(rect, point, rotationPoint) {
    if (rect.width <= 0 || rect.height <= 0) {
      return false;
    }
    if (rotationPoint !== void 0) {
      const tmp = {
        x: point.x - rotationPoint.x,
        y: point.y - rotationPoint.y
      };
      if (rotationPoint.angle !== 0) {
        const angle = -rotationPoint.angle;
        const tmp2 = {
          x: Math.cos(angle) * tmp.x - Math.sin(angle) * tmp.y,
          y: Math.sin(angle) * tmp.x + Math.cos(angle) * tmp.y
        };
        point = tmp2;
      } else {
        point = tmp;
      }
    }
    const right = rect.x + rect.width;
    const bottom = rect.y + rect.width;
    return rect.left < point.x && right > point.x && rect.top < point.y && bottom > point.y;
  }
  function isValidLabel(text) {
    return typeof text === "string" && text !== "";
  }
  function getSelfRefCoordinates(ctx, angle, radius, node) {
    let x2 = node.x;
    let y2 = node.y;
    if (typeof node.distanceToBorder === "function") {
      const toBorderDist = node.distanceToBorder(ctx, angle);
      const yFromNodeCenter = Math.sin(angle) * toBorderDist;
      const xFromNodeCenter = Math.cos(angle) * toBorderDist;
      if (xFromNodeCenter === toBorderDist) {
        x2 += toBorderDist;
        y2 = node.y;
      } else if (yFromNodeCenter === toBorderDist) {
        x2 = node.x;
        y2 -= toBorderDist;
      } else {
        x2 += xFromNodeCenter;
        y2 -= yFromNodeCenter;
      }
    } else if (node.shape.width > node.shape.height) {
      x2 = node.x + node.shape.width * 0.5;
      y2 = node.y - radius;
    } else {
      x2 = node.x + radius;
      y2 = node.y - node.shape.height * 0.5;
    }
    return { x: x2, y: y2 };
  }
  var LabelAccumulator = class {
    constructor(measureText) {
      this.measureText = measureText;
      this.current = 0;
      this.width = 0;
      this.height = 0;
      this.lines = [];
    }
    _add(l, text, mod = "normal") {
      if (this.lines[l] === void 0) {
        this.lines[l] = {
          width: 0,
          height: 0,
          blocks: []
        };
      }
      let tmpText = text;
      if (text === void 0 || text === "")
        tmpText = " ";
      const result = this.measureText(tmpText, mod);
      const block = Object.assign({}, result.values);
      block.text = text;
      block.width = result.width;
      block.mod = mod;
      if (text === void 0 || text === "") {
        block.width = 0;
      }
      this.lines[l].blocks.push(block);
      this.lines[l].width += block.width;
    }
    curWidth() {
      const line = this.lines[this.current];
      if (line === void 0)
        return 0;
      return line.width;
    }
    append(text, mod = "normal") {
      this._add(this.current, text, mod);
    }
    newLine(text, mod = "normal") {
      this._add(this.current, text, mod);
      this.current++;
    }
    determineLineHeights() {
      for (let k = 0; k < this.lines.length; k++) {
        const line = this.lines[k];
        let height = 0;
        if (line.blocks !== void 0) {
          for (let l = 0; l < line.blocks.length; l++) {
            const block = line.blocks[l];
            if (height < block.height) {
              height = block.height;
            }
          }
        }
        line.height = height;
      }
    }
    determineLabelSize() {
      let width = 0;
      let height = 0;
      for (let k = 0; k < this.lines.length; k++) {
        const line = this.lines[k];
        if (line.width > width) {
          width = line.width;
        }
        height += line.height;
      }
      this.width = width;
      this.height = height;
    }
    removeEmptyBlocks() {
      const tmpLines = [];
      for (let k = 0; k < this.lines.length; k++) {
        const line = this.lines[k];
        if (line.blocks.length === 0)
          continue;
        if (k === this.lines.length - 1) {
          if (line.width === 0)
            continue;
        }
        const tmpLine = {};
        Object.assign(tmpLine, line);
        tmpLine.blocks = [];
        let firstEmptyBlock;
        const tmpBlocks = [];
        for (let l = 0; l < line.blocks.length; l++) {
          const block = line.blocks[l];
          if (block.width !== 0) {
            tmpBlocks.push(block);
          } else {
            if (firstEmptyBlock === void 0) {
              firstEmptyBlock = block;
            }
          }
        }
        if (tmpBlocks.length === 0 && firstEmptyBlock !== void 0) {
          tmpBlocks.push(firstEmptyBlock);
        }
        tmpLine.blocks = tmpBlocks;
        tmpLines.push(tmpLine);
      }
      return tmpLines;
    }
    finalize() {
      this.determineLineHeights();
      this.determineLabelSize();
      const tmpLines = this.removeEmptyBlocks();
      return {
        width: this.width,
        height: this.height,
        lines: tmpLines
      };
    }
  };
  var tagPattern = {
    "<b>": /<b>/,
    "<i>": /<i>/,
    "<code>": /<code>/,
    "</b>": /<\/b>/,
    "</i>": /<\/i>/,
    "</code>": /<\/code>/,
    "*": /\*/,
    _: /_/,
    "`": /`/,
    afterBold: /[^*]/,
    afterItal: /[^_]/,
    afterMono: /[^`]/
  };
  var MarkupAccumulator = class {
    constructor(text) {
      this.text = text;
      this.bold = false;
      this.ital = false;
      this.mono = false;
      this.spacing = false;
      this.position = 0;
      this.buffer = "";
      this.modStack = [];
      this.blocks = [];
    }
    mod() {
      return this.modStack.length === 0 ? "normal" : this.modStack[0];
    }
    modName() {
      if (this.modStack.length === 0)
        return "normal";
      else if (this.modStack[0] === "mono")
        return "mono";
      else {
        if (this.bold && this.ital) {
          return "boldital";
        } else if (this.bold) {
          return "bold";
        } else if (this.ital) {
          return "ital";
        }
      }
    }
    emitBlock() {
      if (this.spacing) {
        this.add(" ");
        this.spacing = false;
      }
      if (this.buffer.length > 0) {
        this.blocks.push({ text: this.buffer, mod: this.modName() });
        this.buffer = "";
      }
    }
    add(text) {
      if (text === " ") {
        this.spacing = true;
      }
      if (this.spacing) {
        this.buffer += " ";
        this.spacing = false;
      }
      if (text != " ") {
        this.buffer += text;
      }
    }
    parseWS(ch) {
      if (/[ \t]/.test(ch)) {
        if (!this.mono) {
          this.spacing = true;
        } else {
          this.add(ch);
        }
        return true;
      }
      return false;
    }
    setTag(tagName) {
      this.emitBlock();
      this[tagName] = true;
      this.modStack.unshift(tagName);
    }
    unsetTag(tagName) {
      this.emitBlock();
      this[tagName] = false;
      this.modStack.shift();
    }
    parseStartTag(tagName, tag) {
      if (!this.mono && !this[tagName] && this.match(tag)) {
        this.setTag(tagName);
        return true;
      }
      return false;
    }
    match(tag, advance = true) {
      const [regExp, length2] = this.prepareRegExp(tag);
      const matched = regExp.test(this.text.substr(this.position, length2));
      if (matched && advance) {
        this.position += length2 - 1;
      }
      return matched;
    }
    parseEndTag(tagName, tag, nextTag) {
      let checkTag = this.mod() === tagName;
      if (tagName === "mono") {
        checkTag = checkTag && this.mono;
      } else {
        checkTag = checkTag && !this.mono;
      }
      if (checkTag && this.match(tag)) {
        if (nextTag !== void 0) {
          if (this.position === this.text.length - 1 || this.match(nextTag, false)) {
            this.unsetTag(tagName);
          }
        } else {
          this.unsetTag(tagName);
        }
        return true;
      }
      return false;
    }
    replace(tag, value) {
      if (this.match(tag)) {
        this.add(value);
        this.position += length - 1;
        return true;
      }
      return false;
    }
    prepareRegExp(tag) {
      let length2;
      let regExp;
      if (tag instanceof RegExp) {
        regExp = tag;
        length2 = 1;
      } else {
        const prepared = tagPattern[tag];
        if (prepared !== void 0) {
          regExp = prepared;
        } else {
          regExp = new RegExp(tag);
        }
        length2 = tag.length;
      }
      return [regExp, length2];
    }
  };
  var LabelSplitter = class {
    constructor(ctx, parent, selected, hover) {
      this.ctx = ctx;
      this.parent = parent;
      this.selected = selected;
      this.hover = hover;
      const textWidth = (text, mod) => {
        if (text === void 0)
          return 0;
        const values = this.parent.getFormattingValues(ctx, selected, hover, mod);
        let width = 0;
        if (text !== "") {
          const measure = this.ctx.measureText(text);
          width = measure.width;
        }
        return { width, values };
      };
      this.lines = new LabelAccumulator(textWidth);
    }
    process(text) {
      if (!isValidLabel(text)) {
        return this.lines.finalize();
      }
      const font = this.parent.fontOptions;
      text = text.replace(/\r\n/g, "\n");
      text = text.replace(/\r/g, "\n");
      const nlLines = String(text).split("\n");
      const lineCount = nlLines.length;
      if (font.multi) {
        for (let i2 = 0; i2 < lineCount; i2++) {
          const blocks = this.splitBlocks(nlLines[i2], font.multi);
          if (blocks === void 0)
            continue;
          if (blocks.length === 0) {
            this.lines.newLine("");
            continue;
          }
          if (font.maxWdt > 0) {
            for (let j = 0; j < blocks.length; j++) {
              const mod = blocks[j].mod;
              const text2 = blocks[j].text;
              this.splitStringIntoLines(text2, mod, true);
            }
          } else {
            for (let j = 0; j < blocks.length; j++) {
              const mod = blocks[j].mod;
              const text2 = blocks[j].text;
              this.lines.append(text2, mod);
            }
          }
          this.lines.newLine();
        }
      } else {
        if (font.maxWdt > 0) {
          for (let i2 = 0; i2 < lineCount; i2++) {
            this.splitStringIntoLines(nlLines[i2]);
          }
        } else {
          for (let i2 = 0; i2 < lineCount; i2++) {
            this.lines.newLine(nlLines[i2]);
          }
        }
      }
      return this.lines.finalize();
    }
    decodeMarkupSystem(markupSystem) {
      let system = "none";
      if (markupSystem === "markdown" || markupSystem === "md") {
        system = "markdown";
      } else if (markupSystem === true || markupSystem === "html") {
        system = "html";
      }
      return system;
    }
    splitHtmlBlocks(text) {
      const s = new MarkupAccumulator(text);
      const parseEntities = (ch) => {
        if (/&/.test(ch)) {
          const parsed = s.replace(s.text, "&lt;", "<") || s.replace(s.text, "&amp;", "&");
          if (!parsed) {
            s.add("&");
          }
          return true;
        }
        return false;
      };
      while (s.position < s.text.length) {
        const ch = s.text.charAt(s.position);
        const parsed = s.parseWS(ch) || /</.test(ch) && (s.parseStartTag("bold", "<b>") || s.parseStartTag("ital", "<i>") || s.parseStartTag("mono", "<code>") || s.parseEndTag("bold", "</b>") || s.parseEndTag("ital", "</i>") || s.parseEndTag("mono", "</code>")) || parseEntities(ch);
        if (!parsed) {
          s.add(ch);
        }
        s.position++;
      }
      s.emitBlock();
      return s.blocks;
    }
    splitMarkdownBlocks(text) {
      const s = new MarkupAccumulator(text);
      let beginable = true;
      const parseOverride = (ch) => {
        if (/\\/.test(ch)) {
          if (s.position < this.text.length + 1) {
            s.position++;
            ch = this.text.charAt(s.position);
            if (/ \t/.test(ch)) {
              s.spacing = true;
            } else {
              s.add(ch);
              beginable = false;
            }
          }
          return true;
        }
        return false;
      };
      while (s.position < s.text.length) {
        const ch = s.text.charAt(s.position);
        const parsed = s.parseWS(ch) || parseOverride(ch) || (beginable || s.spacing) && (s.parseStartTag("bold", "*") || s.parseStartTag("ital", "_") || s.parseStartTag("mono", "`")) || s.parseEndTag("bold", "*", "afterBold") || s.parseEndTag("ital", "_", "afterItal") || s.parseEndTag("mono", "`", "afterMono");
        if (!parsed) {
          s.add(ch);
          beginable = false;
        }
        s.position++;
      }
      s.emitBlock();
      return s.blocks;
    }
    splitBlocks(text, markupSystem) {
      const system = this.decodeMarkupSystem(markupSystem);
      if (system === "none") {
        return [
          {
            text,
            mod: "normal"
          }
        ];
      } else if (system === "markdown") {
        return this.splitMarkdownBlocks(text);
      } else if (system === "html") {
        return this.splitHtmlBlocks(text);
      }
    }
    overMaxWidth(text) {
      const width = this.ctx.measureText(text).width;
      return this.lines.curWidth() + width > this.parent.fontOptions.maxWdt;
    }
    getLongestFit(words) {
      let text = "";
      let w = 0;
      while (w < words.length) {
        const pre = text === "" ? "" : " ";
        const newText = text + pre + words[w];
        if (this.overMaxWidth(newText))
          break;
        text = newText;
        w++;
      }
      return w;
    }
    getLongestFitWord(words) {
      let w = 0;
      while (w < words.length) {
        if (this.overMaxWidth(words.slice(0, w)))
          break;
        w++;
      }
      return w;
    }
    splitStringIntoLines(str, mod = "normal", appendLast = false) {
      this.parent.getFormattingValues(this.ctx, this.selected, this.hover, mod);
      str = str.replace(/^( +)/g, "$1\r");
      str = str.replace(/([^\r][^ ]*)( +)/g, "$1\r$2\r");
      let words = str.split("\r");
      while (words.length > 0) {
        let w = this.getLongestFit(words);
        if (w === 0) {
          const word = words[0];
          const x2 = this.getLongestFitWord(word);
          this.lines.newLine(word.slice(0, x2), mod);
          words[0] = word.slice(x2);
        } else {
          let newW = w;
          if (words[w - 1] === " ") {
            w--;
          } else if (words[newW] === " ") {
            newW++;
          }
          const text = words.slice(0, w).join("");
          if (w == words.length && appendLast) {
            this.lines.append(text, mod);
          } else {
            this.lines.newLine(text, mod);
          }
          words = words.slice(newW);
        }
      }
    }
  };
  var multiFontStyle = ["bold", "ital", "boldital", "mono"];
  var Label = class {
    constructor(body, options2, edgelabel = false) {
      this.body = body;
      this.pointToSelf = false;
      this.baseSize = void 0;
      this.fontOptions = {};
      this.setOptions(options2);
      this.size = { top: 0, left: 0, width: 0, height: 0, yLine: 0 };
      this.isEdgeLabel = edgelabel;
    }
    setOptions(options2) {
      this.elementOptions = options2;
      this.initFontOptions(options2.font);
      if (isValidLabel(options2.label)) {
        this.labelDirty = true;
      } else {
        options2.label = void 0;
      }
      if (options2.font !== void 0 && options2.font !== null) {
        if (typeof options2.font === "string") {
          this.baseSize = this.fontOptions.size;
        } else if (typeof options2.font === "object") {
          const size = options2.font.size;
          if (size !== void 0) {
            this.baseSize = size;
          }
        }
      }
    }
    initFontOptions(newFontOptions) {
      forEach(multiFontStyle, (style) => {
        this.fontOptions[style] = {};
      });
      if (Label.parseFontString(this.fontOptions, newFontOptions)) {
        this.fontOptions.vadjust = 0;
        return;
      }
      forEach(newFontOptions, (prop, n) => {
        if (prop !== void 0 && prop !== null && typeof prop !== "object") {
          this.fontOptions[n] = prop;
        }
      });
    }
    static parseFontString(outOptions, inOptions) {
      if (!inOptions || typeof inOptions !== "string")
        return false;
      const newOptionsArray = inOptions.split(" ");
      outOptions.size = +newOptionsArray[0].replace("px", "");
      outOptions.face = newOptionsArray[1];
      outOptions.color = newOptionsArray[2];
      return true;
    }
    constrain(pile) {
      const fontOptions = {
        constrainWidth: false,
        maxWdt: -1,
        minWdt: -1,
        constrainHeight: false,
        minHgt: -1,
        valign: "middle"
      };
      const widthConstraint = topMost(pile, "widthConstraint");
      if (typeof widthConstraint === "number") {
        fontOptions.maxWdt = Number(widthConstraint);
        fontOptions.minWdt = Number(widthConstraint);
      } else if (typeof widthConstraint === "object") {
        const widthConstraintMaximum = topMost(pile, [
          "widthConstraint",
          "maximum"
        ]);
        if (typeof widthConstraintMaximum === "number") {
          fontOptions.maxWdt = Number(widthConstraintMaximum);
        }
        const widthConstraintMinimum = topMost(pile, [
          "widthConstraint",
          "minimum"
        ]);
        if (typeof widthConstraintMinimum === "number") {
          fontOptions.minWdt = Number(widthConstraintMinimum);
        }
      }
      const heightConstraint = topMost(pile, "heightConstraint");
      if (typeof heightConstraint === "number") {
        fontOptions.minHgt = Number(heightConstraint);
      } else if (typeof heightConstraint === "object") {
        const heightConstraintMinimum = topMost(pile, [
          "heightConstraint",
          "minimum"
        ]);
        if (typeof heightConstraintMinimum === "number") {
          fontOptions.minHgt = Number(heightConstraintMinimum);
        }
        const heightConstraintValign = topMost(pile, [
          "heightConstraint",
          "valign"
        ]);
        if (typeof heightConstraintValign === "string") {
          if (heightConstraintValign === "top" || heightConstraintValign === "bottom") {
            fontOptions.valign = heightConstraintValign;
          }
        }
      }
      return fontOptions;
    }
    update(options2, pile) {
      this.setOptions(options2, true);
      this.propagateFonts(pile);
      deepExtend(this.fontOptions, this.constrain(pile));
      this.fontOptions.chooser = choosify("label", pile);
    }
    adjustSizes(margins) {
      const widthBias = margins ? margins.right + margins.left : 0;
      if (this.fontOptions.constrainWidth) {
        this.fontOptions.maxWdt -= widthBias;
        this.fontOptions.minWdt -= widthBias;
      }
      const heightBias = margins ? margins.top + margins.bottom : 0;
      if (this.fontOptions.constrainHeight) {
        this.fontOptions.minHgt -= heightBias;
      }
    }
    addFontOptionsToPile(dstPile, srcPile) {
      for (let i2 = 0; i2 < srcPile.length; ++i2) {
        this.addFontToPile(dstPile, srcPile[i2]);
      }
    }
    addFontToPile(pile, options2) {
      if (options2 === void 0)
        return;
      if (options2.font === void 0 || options2.font === null)
        return;
      const item = options2.font;
      pile.push(item);
    }
    getBasicOptions(pile) {
      const ret = {};
      for (let n = 0; n < pile.length; ++n) {
        let fontOptions = pile[n];
        const tmpShorthand = {};
        if (Label.parseFontString(tmpShorthand, fontOptions)) {
          fontOptions = tmpShorthand;
        }
        forEach(fontOptions, (opt, name) => {
          if (opt === void 0)
            return;
          if (Object.prototype.hasOwnProperty.call(ret, name))
            return;
          if (multiFontStyle.indexOf(name) !== -1) {
            ret[name] = {};
          } else {
            ret[name] = opt;
          }
        });
      }
      return ret;
    }
    getFontOption(pile, multiName, option) {
      let multiFont;
      for (let n = 0; n < pile.length; ++n) {
        const fontOptions = pile[n];
        if (Object.prototype.hasOwnProperty.call(fontOptions, multiName)) {
          multiFont = fontOptions[multiName];
          if (multiFont === void 0 || multiFont === null)
            continue;
          const tmpShorthand = {};
          if (Label.parseFontString(tmpShorthand, multiFont)) {
            multiFont = tmpShorthand;
          }
          if (Object.prototype.hasOwnProperty.call(multiFont, option)) {
            return multiFont[option];
          }
        }
      }
      if (Object.prototype.hasOwnProperty.call(this.fontOptions, option)) {
        return this.fontOptions[option];
      }
      throw new Error("Did not find value for multi-font for property: '" + option + "'");
    }
    getFontOptions(pile, multiName) {
      const result = {};
      const optionNames = ["color", "size", "face", "mod", "vadjust"];
      for (let i2 = 0; i2 < optionNames.length; ++i2) {
        const mod = optionNames[i2];
        result[mod] = this.getFontOption(pile, multiName, mod);
      }
      return result;
    }
    propagateFonts(pile) {
      const fontPile = [];
      this.addFontOptionsToPile(fontPile, pile);
      this.fontOptions = this.getBasicOptions(fontPile);
      for (let i2 = 0; i2 < multiFontStyle.length; ++i2) {
        const mod = multiFontStyle[i2];
        const modOptions = this.fontOptions[mod];
        const tmpMultiFontOptions = this.getFontOptions(fontPile, mod);
        forEach(tmpMultiFontOptions, (option, n) => {
          modOptions[n] = option;
        });
        modOptions.size = Number(modOptions.size);
        modOptions.vadjust = Number(modOptions.vadjust);
      }
    }
    draw(ctx, x2, y2, selected, hover, baseline = "middle") {
      if (this.elementOptions.label === void 0)
        return;
      let viewFontSize = this.fontOptions.size * this.body.view.scale;
      if (this.elementOptions.label && viewFontSize < this.elementOptions.scaling.label.drawThreshold - 1)
        return;
      if (viewFontSize >= this.elementOptions.scaling.label.maxVisible) {
        viewFontSize = Number(this.elementOptions.scaling.label.maxVisible) / this.body.view.scale;
      }
      this.calculateLabelSize(ctx, selected, hover, x2, y2, baseline);
      this._drawBackground(ctx);
      this._drawText(ctx, x2, this.size.yLine, baseline, viewFontSize);
    }
    _drawBackground(ctx) {
      if (this.fontOptions.background !== void 0 && this.fontOptions.background !== "none") {
        ctx.fillStyle = this.fontOptions.background;
        const size = this.getSize();
        ctx.fillRect(size.left, size.top, size.width, size.height);
      }
    }
    _drawText(ctx, x2, y2, baseline = "middle", viewFontSize) {
      [x2, y2] = this._setAlignment(ctx, x2, y2, baseline);
      ctx.textAlign = "left";
      x2 = x2 - this.size.width / 2;
      if (this.fontOptions.valign && this.size.height > this.size.labelHeight) {
        if (this.fontOptions.valign === "top") {
          y2 -= (this.size.height - this.size.labelHeight) / 2;
        }
        if (this.fontOptions.valign === "bottom") {
          y2 += (this.size.height - this.size.labelHeight) / 2;
        }
      }
      for (let i2 = 0; i2 < this.lineCount; i2++) {
        const line = this.lines[i2];
        if (line && line.blocks) {
          let width = 0;
          if (this.isEdgeLabel || this.fontOptions.align === "center") {
            width += (this.size.width - line.width) / 2;
          } else if (this.fontOptions.align === "right") {
            width += this.size.width - line.width;
          }
          for (let j = 0; j < line.blocks.length; j++) {
            const block = line.blocks[j];
            ctx.font = block.font;
            const [fontColor, strokeColor] = this._getColor(block.color, viewFontSize, block.strokeColor);
            if (block.strokeWidth > 0) {
              ctx.lineWidth = block.strokeWidth;
              ctx.strokeStyle = strokeColor;
              ctx.lineJoin = "round";
            }
            ctx.fillStyle = fontColor;
            if (block.strokeWidth > 0) {
              ctx.strokeText(block.text, x2 + width, y2 + block.vadjust);
            }
            ctx.fillText(block.text, x2 + width, y2 + block.vadjust);
            width += block.width;
          }
          y2 += line.height;
        }
      }
    }
    _setAlignment(ctx, x2, y2, baseline) {
      if (this.isEdgeLabel && this.fontOptions.align !== "horizontal" && this.pointToSelf === false) {
        x2 = 0;
        y2 = 0;
        const lineMargin = 2;
        if (this.fontOptions.align === "top") {
          ctx.textBaseline = "alphabetic";
          y2 -= 2 * lineMargin;
        } else if (this.fontOptions.align === "bottom") {
          ctx.textBaseline = "hanging";
          y2 += 2 * lineMargin;
        } else {
          ctx.textBaseline = "middle";
        }
      } else {
        ctx.textBaseline = baseline;
      }
      return [x2, y2];
    }
    _getColor(color, viewFontSize, initialStrokeColor) {
      let fontColor = color || "#000000";
      let strokeColor = initialStrokeColor || "#ffffff";
      if (viewFontSize <= this.elementOptions.scaling.label.drawThreshold) {
        const opacity = Math.max(0, Math.min(1, 1 - (this.elementOptions.scaling.label.drawThreshold - viewFontSize)));
        fontColor = overrideOpacity(fontColor, opacity);
        strokeColor = overrideOpacity(strokeColor, opacity);
      }
      return [fontColor, strokeColor];
    }
    getTextSize(ctx, selected = false, hover = false) {
      this._processLabel(ctx, selected, hover);
      return {
        width: this.size.width,
        height: this.size.height,
        lineCount: this.lineCount
      };
    }
    getSize() {
      const lineMargin = 2;
      let x2 = this.size.left;
      let y2 = this.size.top - 0.5 * lineMargin;
      if (this.isEdgeLabel) {
        const x22 = -this.size.width * 0.5;
        switch (this.fontOptions.align) {
          case "middle":
            x2 = x22;
            y2 = -this.size.height * 0.5;
            break;
          case "top":
            x2 = x22;
            y2 = -(this.size.height + lineMargin);
            break;
          case "bottom":
            x2 = x22;
            y2 = lineMargin;
            break;
        }
      }
      const ret = {
        left: x2,
        top: y2,
        width: this.size.width,
        height: this.size.height
      };
      return ret;
    }
    calculateLabelSize(ctx, selected, hover, x2 = 0, y2 = 0, baseline = "middle") {
      this._processLabel(ctx, selected, hover);
      this.size.left = x2 - this.size.width * 0.5;
      this.size.top = y2 - this.size.height * 0.5;
      this.size.yLine = y2 + (1 - this.lineCount) * 0.5 * this.fontOptions.size;
      if (baseline === "hanging") {
        this.size.top += 0.5 * this.fontOptions.size;
        this.size.top += 4;
        this.size.yLine += 4;
      }
    }
    getFormattingValues(ctx, selected, hover, mod) {
      const getValue = function(fontOptions, mod2, option) {
        if (mod2 === "normal") {
          if (option === "mod")
            return "";
          return fontOptions[option];
        }
        if (fontOptions[mod2][option] !== void 0) {
          return fontOptions[mod2][option];
        } else {
          return fontOptions[option];
        }
      };
      const values = {
        color: getValue(this.fontOptions, mod, "color"),
        size: getValue(this.fontOptions, mod, "size"),
        face: getValue(this.fontOptions, mod, "face"),
        mod: getValue(this.fontOptions, mod, "mod"),
        vadjust: getValue(this.fontOptions, mod, "vadjust"),
        strokeWidth: this.fontOptions.strokeWidth,
        strokeColor: this.fontOptions.strokeColor
      };
      if (selected || hover) {
        if (mod === "normal" && this.fontOptions.chooser === true && this.elementOptions.labelHighlightBold) {
          values.mod = "bold";
        } else {
          if (typeof this.fontOptions.chooser === "function") {
            this.fontOptions.chooser(values, this.elementOptions.id, selected, hover);
          }
        }
      }
      let fontString = "";
      if (values.mod !== void 0 && values.mod !== "") {
        fontString += values.mod + " ";
      }
      fontString += values.size + "px " + values.face;
      ctx.font = fontString.replace(/"/g, "");
      values.font = ctx.font;
      values.height = values.size;
      return values;
    }
    differentState(selected, hover) {
      return selected !== this.selectedState || hover !== this.hoverState;
    }
    _processLabelText(ctx, selected, hover, inText) {
      const splitter = new LabelSplitter(ctx, this, selected, hover);
      return splitter.process(inText);
    }
    _processLabel(ctx, selected, hover) {
      if (this.labelDirty === false && !this.differentState(selected, hover))
        return;
      const state = this._processLabelText(ctx, selected, hover, this.elementOptions.label);
      if (this.fontOptions.minWdt > 0 && state.width < this.fontOptions.minWdt) {
        state.width = this.fontOptions.minWdt;
      }
      this.size.labelHeight = state.height;
      if (this.fontOptions.minHgt > 0 && state.height < this.fontOptions.minHgt) {
        state.height = this.fontOptions.minHgt;
      }
      this.lines = state.lines;
      this.lineCount = state.lines.length;
      this.size.width = state.width;
      this.size.height = state.height;
      this.selectedState = selected;
      this.hoverState = hover;
      this.labelDirty = false;
    }
    visible() {
      if (this.size.width === 0 || this.size.height === 0 || this.elementOptions.label === void 0) {
        return false;
      }
      const viewFontSize = this.fontOptions.size * this.body.view.scale;
      if (viewFontSize < this.elementOptions.scaling.label.drawThreshold - 1) {
        return false;
      }
      return true;
    }
  };
  var NodeBase = class {
    constructor(options2, body, labelModule) {
      this.body = body;
      this.labelModule = labelModule;
      this.setOptions(options2);
      this.top = void 0;
      this.left = void 0;
      this.height = void 0;
      this.width = void 0;
      this.radius = void 0;
      this.margin = void 0;
      this.refreshNeeded = true;
      this.boundingBox = { top: 0, left: 0, right: 0, bottom: 0 };
    }
    setOptions(options2) {
      this.options = options2;
    }
    _setMargins(labelModule) {
      this.margin = {};
      if (this.options.margin) {
        if (typeof this.options.margin == "object") {
          this.margin.top = this.options.margin.top;
          this.margin.right = this.options.margin.right;
          this.margin.bottom = this.options.margin.bottom;
          this.margin.left = this.options.margin.left;
        } else {
          this.margin.top = this.options.margin;
          this.margin.right = this.options.margin;
          this.margin.bottom = this.options.margin;
          this.margin.left = this.options.margin;
        }
      }
      labelModule.adjustSizes(this.margin);
    }
    _distanceToBorder(ctx, angle) {
      const borderWidth = this.options.borderWidth;
      if (ctx) {
        this.resize(ctx);
      }
      return Math.min(Math.abs(this.width / 2 / Math.cos(angle)), Math.abs(this.height / 2 / Math.sin(angle))) + borderWidth;
    }
    enableShadow(ctx, values) {
      if (values.shadow) {
        ctx.shadowColor = values.shadowColor;
        ctx.shadowBlur = values.shadowSize;
        ctx.shadowOffsetX = values.shadowX;
        ctx.shadowOffsetY = values.shadowY;
      }
    }
    disableShadow(ctx, values) {
      if (values.shadow) {
        ctx.shadowColor = "rgba(0,0,0,0)";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
    }
    enableBorderDashes(ctx, values) {
      if (values.borderDashes !== false) {
        if (ctx.setLineDash !== void 0) {
          let dashes = values.borderDashes;
          if (dashes === true) {
            dashes = [5, 15];
          }
          ctx.setLineDash(dashes);
        } else {
          console.warn("setLineDash is not supported in this browser. The dashed borders cannot be used.");
          this.options.shapeProperties.borderDashes = false;
          values.borderDashes = false;
        }
      }
    }
    disableBorderDashes(ctx, values) {
      if (values.borderDashes !== false) {
        if (ctx.setLineDash !== void 0) {
          ctx.setLineDash([0]);
        } else {
          console.warn("setLineDash is not supported in this browser. The dashed borders cannot be used.");
          this.options.shapeProperties.borderDashes = false;
          values.borderDashes = false;
        }
      }
    }
    needsRefresh(selected, hover) {
      if (this.refreshNeeded === true) {
        this.refreshNeeded = false;
        return true;
      }
      return this.width === void 0 || this.labelModule.differentState(selected, hover);
    }
    initContextForDraw(ctx, values) {
      const borderWidth = values.borderWidth / this.body.view.scale;
      ctx.lineWidth = Math.min(this.width, borderWidth);
      ctx.strokeStyle = values.borderColor;
      ctx.fillStyle = values.color;
    }
    performStroke(ctx, values) {
      const borderWidth = values.borderWidth / this.body.view.scale;
      ctx.save();
      if (borderWidth > 0) {
        this.enableBorderDashes(ctx, values);
        ctx.stroke();
        this.disableBorderDashes(ctx, values);
      }
      ctx.restore();
    }
    performFill(ctx, values) {
      ctx.save();
      ctx.fillStyle = values.color;
      this.enableShadow(ctx, values);
      ctx.fill();
      this.disableShadow(ctx, values);
      ctx.restore();
      this.performStroke(ctx, values);
    }
    _addBoundingBoxMargin(margin) {
      this.boundingBox.left -= margin;
      this.boundingBox.top -= margin;
      this.boundingBox.bottom += margin;
      this.boundingBox.right += margin;
    }
    _updateBoundingBox(x2, y2, ctx, selected, hover) {
      if (ctx !== void 0) {
        this.resize(ctx, selected, hover);
      }
      this.left = x2 - this.width / 2;
      this.top = y2 - this.height / 2;
      this.boundingBox.left = this.left;
      this.boundingBox.top = this.top;
      this.boundingBox.bottom = this.top + this.height;
      this.boundingBox.right = this.left + this.width;
    }
    updateBoundingBox(x2, y2, ctx, selected, hover) {
      this._updateBoundingBox(x2, y2, ctx, selected, hover);
    }
    getDimensionsFromLabel(ctx, selected, hover) {
      this.textSize = this.labelModule.getTextSize(ctx, selected, hover);
      let width = this.textSize.width;
      let height = this.textSize.height;
      const DEFAULT_SIZE = 14;
      if (width === 0) {
        width = DEFAULT_SIZE;
        height = DEFAULT_SIZE;
      }
      return { width, height };
    }
  };
  var Box$1 = class Box extends NodeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
      this._setMargins(labelModule);
    }
    resize(ctx, selected = this.selected, hover = this.hover) {
      if (this.needsRefresh(selected, hover)) {
        const dimensions = this.getDimensionsFromLabel(ctx, selected, hover);
        this.width = dimensions.width + this.margin.right + this.margin.left;
        this.height = dimensions.height + this.margin.top + this.margin.bottom;
        this.radius = this.width / 2;
      }
    }
    draw(ctx, x2, y2, selected, hover, values) {
      this.resize(ctx, selected, hover);
      this.left = x2 - this.width / 2;
      this.top = y2 - this.height / 2;
      this.initContextForDraw(ctx, values);
      drawRoundRect(ctx, this.left, this.top, this.width, this.height, values.borderRadius);
      this.performFill(ctx, values);
      this.updateBoundingBox(x2, y2, ctx, selected, hover);
      this.labelModule.draw(ctx, this.left + this.textSize.width / 2 + this.margin.left, this.top + this.textSize.height / 2 + this.margin.top, selected, hover);
    }
    updateBoundingBox(x2, y2, ctx, selected, hover) {
      this._updateBoundingBox(x2, y2, ctx, selected, hover);
      const borderRadius = this.options.shapeProperties.borderRadius;
      this._addBoundingBoxMargin(borderRadius);
    }
    distanceToBorder(ctx, angle) {
      if (ctx) {
        this.resize(ctx);
      }
      const borderWidth = this.options.borderWidth;
      return Math.min(Math.abs(this.width / 2 / Math.cos(angle)), Math.abs(this.height / 2 / Math.sin(angle))) + borderWidth;
    }
  };
  var CircleImageBase = class extends NodeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
      this.labelOffset = 0;
      this.selected = false;
    }
    setOptions(options2, imageObj, imageObjAlt) {
      this.options = options2;
      if (!(imageObj === void 0 && imageObjAlt === void 0)) {
        this.setImages(imageObj, imageObjAlt);
      }
    }
    setImages(imageObj, imageObjAlt) {
      if (imageObjAlt && this.selected) {
        this.imageObj = imageObjAlt;
        this.imageObjAlt = imageObj;
      } else {
        this.imageObj = imageObj;
        this.imageObjAlt = imageObjAlt;
      }
    }
    switchImages(selected) {
      const selection_changed = selected && !this.selected || !selected && this.selected;
      this.selected = selected;
      if (this.imageObjAlt !== void 0 && selection_changed) {
        const imageTmp = this.imageObj;
        this.imageObj = this.imageObjAlt;
        this.imageObjAlt = imageTmp;
      }
    }
    _getImagePadding() {
      const imgPadding = { top: 0, right: 0, bottom: 0, left: 0 };
      if (this.options.imagePadding) {
        const optImgPadding = this.options.imagePadding;
        if (typeof optImgPadding == "object") {
          imgPadding.top = optImgPadding.top;
          imgPadding.right = optImgPadding.right;
          imgPadding.bottom = optImgPadding.bottom;
          imgPadding.left = optImgPadding.left;
        } else {
          imgPadding.top = optImgPadding;
          imgPadding.right = optImgPadding;
          imgPadding.bottom = optImgPadding;
          imgPadding.left = optImgPadding;
        }
      }
      return imgPadding;
    }
    _resizeImage() {
      let width, height;
      if (this.options.shapeProperties.useImageSize === false) {
        let ratio_width = 1;
        let ratio_height = 1;
        if (this.imageObj.width && this.imageObj.height) {
          if (this.imageObj.width > this.imageObj.height) {
            ratio_width = this.imageObj.width / this.imageObj.height;
          } else {
            ratio_height = this.imageObj.height / this.imageObj.width;
          }
        }
        width = this.options.size * 2 * ratio_width;
        height = this.options.size * 2 * ratio_height;
      } else {
        const imgPadding = this._getImagePadding();
        width = this.imageObj.width + imgPadding.left + imgPadding.right;
        height = this.imageObj.height + imgPadding.top + imgPadding.bottom;
      }
      this.width = width;
      this.height = height;
      this.radius = 0.5 * this.width;
    }
    _drawRawCircle(ctx, x2, y2, values) {
      this.initContextForDraw(ctx, values);
      drawCircle(ctx, x2, y2, values.size);
      this.performFill(ctx, values);
    }
    _drawImageAtPosition(ctx, values) {
      if (this.imageObj.width != 0) {
        ctx.globalAlpha = values.opacity !== void 0 ? values.opacity : 1;
        this.enableShadow(ctx, values);
        let factor = 1;
        if (this.options.shapeProperties.interpolation === true) {
          factor = this.imageObj.width / this.width / this.body.view.scale;
        }
        const imgPadding = this._getImagePadding();
        const imgPosLeft = this.left + imgPadding.left;
        const imgPosTop = this.top + imgPadding.top;
        const imgWidth = this.width - imgPadding.left - imgPadding.right;
        const imgHeight = this.height - imgPadding.top - imgPadding.bottom;
        this.imageObj.drawImageAtPosition(ctx, factor, imgPosLeft, imgPosTop, imgWidth, imgHeight);
        this.disableShadow(ctx, values);
      }
    }
    _drawImageLabel(ctx, x2, y2, selected, hover) {
      let offset = 0;
      if (this.height !== void 0) {
        offset = this.height * 0.5;
        const labelDimensions = this.labelModule.getTextSize(ctx, selected, hover);
        if (labelDimensions.lineCount >= 1) {
          offset += labelDimensions.height / 2;
        }
      }
      const yLabel = y2 + offset;
      if (this.options.label) {
        this.labelOffset = offset;
      }
      this.labelModule.draw(ctx, x2, yLabel, selected, hover, "hanging");
    }
  };
  var Circle$1 = class Circle extends CircleImageBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
      this._setMargins(labelModule);
    }
    resize(ctx, selected = this.selected, hover = this.hover) {
      if (this.needsRefresh(selected, hover)) {
        const dimensions = this.getDimensionsFromLabel(ctx, selected, hover);
        const diameter = Math.max(dimensions.width + this.margin.right + this.margin.left, dimensions.height + this.margin.top + this.margin.bottom);
        this.options.size = diameter / 2;
        this.width = diameter;
        this.height = diameter;
        this.radius = this.width / 2;
      }
    }
    draw(ctx, x2, y2, selected, hover, values) {
      this.resize(ctx, selected, hover);
      this.left = x2 - this.width / 2;
      this.top = y2 - this.height / 2;
      this._drawRawCircle(ctx, x2, y2, values);
      this.updateBoundingBox(x2, y2);
      this.labelModule.draw(ctx, this.left + this.textSize.width / 2 + this.margin.left, y2, selected, hover);
    }
    updateBoundingBox(x2, y2) {
      this.boundingBox.top = y2 - this.options.size;
      this.boundingBox.left = x2 - this.options.size;
      this.boundingBox.right = x2 + this.options.size;
      this.boundingBox.bottom = y2 + this.options.size;
    }
    distanceToBorder(ctx) {
      if (ctx) {
        this.resize(ctx);
      }
      return this.width * 0.5;
    }
  };
  var CircularImage = class extends CircleImageBase {
    constructor(options2, body, labelModule, imageObj, imageObjAlt) {
      super(options2, body, labelModule);
      this.setImages(imageObj, imageObjAlt);
    }
    resize(ctx, selected = this.selected, hover = this.hover) {
      const imageAbsent = this.imageObj.src === void 0 || this.imageObj.width === void 0 || this.imageObj.height === void 0;
      if (imageAbsent) {
        const diameter = this.options.size * 2;
        this.width = diameter;
        this.height = diameter;
        this.radius = 0.5 * this.width;
        return;
      }
      if (this.needsRefresh(selected, hover)) {
        this._resizeImage();
      }
    }
    draw(ctx, x2, y2, selected, hover, values) {
      this.switchImages(selected);
      this.resize();
      let labelX = x2, labelY = y2;
      if (this.options.shapeProperties.coordinateOrigin === "top-left") {
        this.left = x2;
        this.top = y2;
        labelX += this.width / 2;
        labelY += this.height / 2;
      } else {
        this.left = x2 - this.width / 2;
        this.top = y2 - this.height / 2;
      }
      this._drawRawCircle(ctx, labelX, labelY, values);
      ctx.save();
      ctx.clip();
      this._drawImageAtPosition(ctx, values);
      ctx.restore();
      this._drawImageLabel(ctx, labelX, labelY, selected, hover);
      this.updateBoundingBox(x2, y2);
    }
    updateBoundingBox(x2, y2) {
      if (this.options.shapeProperties.coordinateOrigin === "top-left") {
        this.boundingBox.top = y2;
        this.boundingBox.left = x2;
        this.boundingBox.right = x2 + this.options.size * 2;
        this.boundingBox.bottom = y2 + this.options.size * 2;
      } else {
        this.boundingBox.top = y2 - this.options.size;
        this.boundingBox.left = x2 - this.options.size;
        this.boundingBox.right = x2 + this.options.size;
        this.boundingBox.bottom = y2 + this.options.size;
      }
      this.boundingBox.left = Math.min(this.boundingBox.left, this.labelModule.size.left);
      this.boundingBox.right = Math.max(this.boundingBox.right, this.labelModule.size.left + this.labelModule.size.width);
      this.boundingBox.bottom = Math.max(this.boundingBox.bottom, this.boundingBox.bottom + this.labelOffset);
    }
    distanceToBorder(ctx) {
      if (ctx) {
        this.resize(ctx);
      }
      return this.width * 0.5;
    }
  };
  var ShapeBase = class extends NodeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    resize(ctx, selected = this.selected, hover = this.hover, values = { size: this.options.size }) {
      var _a, _b;
      if (this.needsRefresh(selected, hover)) {
        this.labelModule.getTextSize(ctx, selected, hover);
        const size = 2 * values.size;
        this.width = (_a = this.customSizeWidth) != null ? _a : size;
        this.height = (_b = this.customSizeHeight) != null ? _b : size;
        this.radius = 0.5 * this.width;
      }
    }
    _drawShape(ctx, shape, sizeMultiplier, x2, y2, selected, hover, values) {
      this.resize(ctx, selected, hover, values);
      this.left = x2 - this.width / 2;
      this.top = y2 - this.height / 2;
      this.initContextForDraw(ctx, values);
      getShape(shape)(ctx, x2, y2, values.size);
      this.performFill(ctx, values);
      if (this.options.icon !== void 0) {
        if (this.options.icon.code !== void 0) {
          ctx.font = (selected ? "bold " : "") + this.height / 2 + "px " + (this.options.icon.face || "FontAwesome");
          ctx.fillStyle = this.options.icon.color || "black";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(this.options.icon.code, x2, y2);
        }
      }
      return {
        drawExternalLabel: () => {
          if (this.options.label !== void 0) {
            this.labelModule.calculateLabelSize(ctx, selected, hover, x2, y2, "hanging");
            const yLabel = y2 + 0.5 * this.height + 0.5 * this.labelModule.size.height;
            this.labelModule.draw(ctx, x2, yLabel, selected, hover, "hanging");
          }
          this.updateBoundingBox(x2, y2);
        }
      };
    }
    updateBoundingBox(x2, y2) {
      this.boundingBox.top = y2 - this.options.size;
      this.boundingBox.left = x2 - this.options.size;
      this.boundingBox.right = x2 + this.options.size;
      this.boundingBox.bottom = y2 + this.options.size;
      if (this.options.label !== void 0 && this.labelModule.size.width > 0) {
        this.boundingBox.left = Math.min(this.boundingBox.left, this.labelModule.size.left);
        this.boundingBox.right = Math.max(this.boundingBox.right, this.labelModule.size.left + this.labelModule.size.width);
        this.boundingBox.bottom = Math.max(this.boundingBox.bottom, this.boundingBox.bottom + this.labelModule.size.height);
      }
    }
  };
  var CustomShape = class extends ShapeBase {
    constructor(options2, body, labelModule, ctxRenderer) {
      super(options2, body, labelModule, ctxRenderer);
      this.ctxRenderer = ctxRenderer;
    }
    draw(ctx, x2, y2, selected, hover, values) {
      this.resize(ctx, selected, hover, values);
      this.left = x2 - this.width / 2;
      this.top = y2 - this.height / 2;
      ctx.save();
      const drawLater = this.ctxRenderer({
        ctx,
        id: this.options.id,
        x: x2,
        y: y2,
        state: { selected, hover },
        style: __spreadValues({}, values),
        label: this.options.label
      });
      if (drawLater.drawNode != null) {
        drawLater.drawNode();
      }
      ctx.restore();
      if (drawLater.drawExternalLabel) {
        const drawExternalLabel = drawLater.drawExternalLabel;
        drawLater.drawExternalLabel = () => {
          ctx.save();
          drawExternalLabel();
          ctx.restore();
        };
      }
      if (drawLater.nodeDimensions) {
        this.customSizeWidth = drawLater.nodeDimensions.width;
        this.customSizeHeight = drawLater.nodeDimensions.height;
      }
      return drawLater;
    }
    distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  };
  var Database = class extends NodeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
      this._setMargins(labelModule);
    }
    resize(ctx, selected, hover) {
      if (this.needsRefresh(selected, hover)) {
        const dimensions = this.getDimensionsFromLabel(ctx, selected, hover);
        const size = dimensions.width + this.margin.right + this.margin.left;
        this.width = size;
        this.height = size;
        this.radius = this.width / 2;
      }
    }
    draw(ctx, x2, y2, selected, hover, values) {
      this.resize(ctx, selected, hover);
      this.left = x2 - this.width / 2;
      this.top = y2 - this.height / 2;
      this.initContextForDraw(ctx, values);
      drawDatabase(ctx, x2 - this.width / 2, y2 - this.height / 2, this.width, this.height);
      this.performFill(ctx, values);
      this.updateBoundingBox(x2, y2, ctx, selected, hover);
      this.labelModule.draw(ctx, this.left + this.textSize.width / 2 + this.margin.left, this.top + this.textSize.height / 2 + this.margin.top, selected, hover);
    }
    distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  };
  var Diamond$1 = class Diamond extends ShapeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    draw(ctx, x2, y2, selected, hover, values) {
      return this._drawShape(ctx, "diamond", 4, x2, y2, selected, hover, values);
    }
    distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  };
  var Dot = class extends ShapeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    draw(ctx, x2, y2, selected, hover, values) {
      return this._drawShape(ctx, "circle", 2, x2, y2, selected, hover, values);
    }
    distanceToBorder(ctx) {
      if (ctx) {
        this.resize(ctx);
      }
      return this.options.size;
    }
  };
  var Ellipse = class extends NodeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    resize(ctx, selected = this.selected, hover = this.hover) {
      if (this.needsRefresh(selected, hover)) {
        const dimensions = this.getDimensionsFromLabel(ctx, selected, hover);
        this.height = dimensions.height * 2;
        this.width = dimensions.width + dimensions.height;
        this.radius = 0.5 * this.width;
      }
    }
    draw(ctx, x2, y2, selected, hover, values) {
      this.resize(ctx, selected, hover);
      this.left = x2 - this.width * 0.5;
      this.top = y2 - this.height * 0.5;
      this.initContextForDraw(ctx, values);
      drawEllipse(ctx, this.left, this.top, this.width, this.height);
      this.performFill(ctx, values);
      this.updateBoundingBox(x2, y2, ctx, selected, hover);
      this.labelModule.draw(ctx, x2, y2, selected, hover);
    }
    distanceToBorder(ctx, angle) {
      if (ctx) {
        this.resize(ctx);
      }
      const a = this.width * 0.5;
      const b = this.height * 0.5;
      const w = Math.sin(angle) * a;
      const h = Math.cos(angle) * b;
      return a * b / Math.sqrt(w * w + h * h);
    }
  };
  var Icon = class extends NodeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
      this._setMargins(labelModule);
    }
    resize(ctx, selected, hover) {
      if (this.needsRefresh(selected, hover)) {
        this.iconSize = {
          width: Number(this.options.icon.size),
          height: Number(this.options.icon.size)
        };
        this.width = this.iconSize.width + this.margin.right + this.margin.left;
        this.height = this.iconSize.height + this.margin.top + this.margin.bottom;
        this.radius = 0.5 * this.width;
      }
    }
    draw(ctx, x2, y2, selected, hover, values) {
      this.resize(ctx, selected, hover);
      this.options.icon.size = this.options.icon.size || 50;
      this.left = x2 - this.width / 2;
      this.top = y2 - this.height / 2;
      this._icon(ctx, x2, y2, selected, hover, values);
      return {
        drawExternalLabel: () => {
          if (this.options.label !== void 0) {
            const iconTextSpacing = 5;
            this.labelModule.draw(ctx, this.left + this.iconSize.width / 2 + this.margin.left, y2 + this.height / 2 + iconTextSpacing, selected);
          }
          this.updateBoundingBox(x2, y2);
        }
      };
    }
    updateBoundingBox(x2, y2) {
      this.boundingBox.top = y2 - this.options.icon.size * 0.5;
      this.boundingBox.left = x2 - this.options.icon.size * 0.5;
      this.boundingBox.right = x2 + this.options.icon.size * 0.5;
      this.boundingBox.bottom = y2 + this.options.icon.size * 0.5;
      if (this.options.label !== void 0 && this.labelModule.size.width > 0) {
        const iconTextSpacing = 5;
        this.boundingBox.left = Math.min(this.boundingBox.left, this.labelModule.size.left);
        this.boundingBox.right = Math.max(this.boundingBox.right, this.labelModule.size.left + this.labelModule.size.width);
        this.boundingBox.bottom = Math.max(this.boundingBox.bottom, this.boundingBox.bottom + this.labelModule.size.height + iconTextSpacing);
      }
    }
    _icon(ctx, x2, y2, selected, hover, values) {
      const iconSize = Number(this.options.icon.size);
      if (this.options.icon.code !== void 0) {
        ctx.font = [
          this.options.icon.weight != null ? this.options.icon.weight : selected ? "bold" : "",
          (this.options.icon.weight != null && selected ? 5 : 0) + iconSize + "px",
          this.options.icon.face
        ].join(" ");
        ctx.fillStyle = this.options.icon.color || "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        this.enableShadow(ctx, values);
        ctx.fillText(this.options.icon.code, x2, y2);
        this.disableShadow(ctx, values);
      } else {
        console.error("When using the icon shape, you need to define the code in the icon options object. This can be done per node or globally.");
      }
    }
    distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  };
  var Image$2 = class Image2 extends CircleImageBase {
    constructor(options2, body, labelModule, imageObj, imageObjAlt) {
      super(options2, body, labelModule);
      this.setImages(imageObj, imageObjAlt);
    }
    resize(ctx, selected = this.selected, hover = this.hover) {
      const imageAbsent = this.imageObj.src === void 0 || this.imageObj.width === void 0 || this.imageObj.height === void 0;
      if (imageAbsent) {
        const side = this.options.size * 2;
        this.width = side;
        this.height = side;
        return;
      }
      if (this.needsRefresh(selected, hover)) {
        this._resizeImage();
      }
    }
    draw(ctx, x2, y2, selected, hover, values) {
      ctx.save();
      this.switchImages(selected);
      this.resize();
      let labelX = x2, labelY = y2;
      if (this.options.shapeProperties.coordinateOrigin === "top-left") {
        this.left = x2;
        this.top = y2;
        labelX += this.width / 2;
        labelY += this.height / 2;
      } else {
        this.left = x2 - this.width / 2;
        this.top = y2 - this.height / 2;
      }
      if (this.options.shapeProperties.useBorderWithImage === true) {
        const neutralborderWidth = this.options.borderWidth;
        const selectionLineWidth = this.options.borderWidthSelected || 2 * this.options.borderWidth;
        const borderWidth = (selected ? selectionLineWidth : neutralborderWidth) / this.body.view.scale;
        ctx.lineWidth = Math.min(this.width, borderWidth);
        ctx.beginPath();
        let strokeStyle = selected ? this.options.color.highlight.border : hover ? this.options.color.hover.border : this.options.color.border;
        let fillStyle = selected ? this.options.color.highlight.background : hover ? this.options.color.hover.background : this.options.color.background;
        if (values.opacity !== void 0) {
          strokeStyle = overrideOpacity(strokeStyle, values.opacity);
          fillStyle = overrideOpacity(fillStyle, values.opacity);
        }
        ctx.strokeStyle = strokeStyle;
        ctx.fillStyle = fillStyle;
        ctx.rect(this.left - 0.5 * ctx.lineWidth, this.top - 0.5 * ctx.lineWidth, this.width + ctx.lineWidth, this.height + ctx.lineWidth);
        ctx.fill();
        this.performStroke(ctx, values);
        ctx.closePath();
      }
      this._drawImageAtPosition(ctx, values);
      this._drawImageLabel(ctx, labelX, labelY, selected, hover);
      this.updateBoundingBox(x2, y2);
      ctx.restore();
    }
    updateBoundingBox(x2, y2) {
      this.resize();
      if (this.options.shapeProperties.coordinateOrigin === "top-left") {
        this.left = x2;
        this.top = y2;
      } else {
        this.left = x2 - this.width / 2;
        this.top = y2 - this.height / 2;
      }
      this.boundingBox.left = this.left;
      this.boundingBox.top = this.top;
      this.boundingBox.bottom = this.top + this.height;
      this.boundingBox.right = this.left + this.width;
      if (this.options.label !== void 0 && this.labelModule.size.width > 0) {
        this.boundingBox.left = Math.min(this.boundingBox.left, this.labelModule.size.left);
        this.boundingBox.right = Math.max(this.boundingBox.right, this.labelModule.size.left + this.labelModule.size.width);
        this.boundingBox.bottom = Math.max(this.boundingBox.bottom, this.boundingBox.bottom + this.labelOffset);
      }
    }
    distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  };
  var Square = class extends ShapeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    draw(ctx, x2, y2, selected, hover, values) {
      return this._drawShape(ctx, "square", 2, x2, y2, selected, hover, values);
    }
    distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  };
  var Hexagon = class extends ShapeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    draw(ctx, x2, y2, selected, hover, values) {
      return this._drawShape(ctx, "hexagon", 4, x2, y2, selected, hover, values);
    }
    distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  };
  var Star = class extends ShapeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    draw(ctx, x2, y2, selected, hover, values) {
      return this._drawShape(ctx, "star", 4, x2, y2, selected, hover, values);
    }
    distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  };
  var Text = class extends NodeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
      this._setMargins(labelModule);
    }
    resize(ctx, selected, hover) {
      if (this.needsRefresh(selected, hover)) {
        this.textSize = this.labelModule.getTextSize(ctx, selected, hover);
        this.width = this.textSize.width + this.margin.right + this.margin.left;
        this.height = this.textSize.height + this.margin.top + this.margin.bottom;
        this.radius = 0.5 * this.width;
      }
    }
    draw(ctx, x2, y2, selected, hover, values) {
      this.resize(ctx, selected, hover);
      this.left = x2 - this.width / 2;
      this.top = y2 - this.height / 2;
      this.enableShadow(ctx, values);
      this.labelModule.draw(ctx, this.left + this.textSize.width / 2 + this.margin.left, this.top + this.textSize.height / 2 + this.margin.top, selected, hover);
      this.disableShadow(ctx, values);
      this.updateBoundingBox(x2, y2, ctx, selected, hover);
    }
    distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  };
  var Triangle$1 = class Triangle extends ShapeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    draw(ctx, x2, y2, selected, hover, values) {
      return this._drawShape(ctx, "triangle", 3, x2, y2, selected, hover, values);
    }
    distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  };
  var TriangleDown = class extends ShapeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    draw(ctx, x2, y2, selected, hover, values) {
      return this._drawShape(ctx, "triangleDown", 3, x2, y2, selected, hover, values);
    }
    distanceToBorder(ctx, angle) {
      return this._distanceToBorder(ctx, angle);
    }
  };
  var Node = class {
    constructor(options2, body, imagelist, grouplist, globalOptions, defaultOptions) {
      this.options = bridgeObject(globalOptions);
      this.globalOptions = globalOptions;
      this.defaultOptions = defaultOptions;
      this.body = body;
      this.edges = [];
      this.id = void 0;
      this.imagelist = imagelist;
      this.grouplist = grouplist;
      this.x = void 0;
      this.y = void 0;
      this.baseSize = this.options.size;
      this.baseFontSize = this.options.font.size;
      this.predefinedPosition = false;
      this.selected = false;
      this.hover = false;
      this.labelModule = new Label(this.body, this.options, false);
      this.setOptions(options2);
    }
    attachEdge(edge) {
      if (this.edges.indexOf(edge) === -1) {
        this.edges.push(edge);
      }
    }
    detachEdge(edge) {
      const index2 = this.edges.indexOf(edge);
      if (index2 != -1) {
        this.edges.splice(index2, 1);
      }
    }
    setOptions(options2) {
      const currentShape = this.options.shape;
      if (!options2) {
        return;
      }
      if (typeof options2.color !== "undefined") {
        this._localColor = options2.color;
      }
      if (options2.id !== void 0) {
        this.id = options2.id;
      }
      if (this.id === void 0) {
        throw new Error("Node must have an id");
      }
      Node.checkMass(options2, this.id);
      if (options2.x !== void 0) {
        if (options2.x === null) {
          this.x = void 0;
          this.predefinedPosition = false;
        } else {
          this.x = parseInt(options2.x);
          this.predefinedPosition = true;
        }
      }
      if (options2.y !== void 0) {
        if (options2.y === null) {
          this.y = void 0;
          this.predefinedPosition = false;
        } else {
          this.y = parseInt(options2.y);
          this.predefinedPosition = true;
        }
      }
      if (options2.size !== void 0) {
        this.baseSize = options2.size;
      }
      if (options2.value !== void 0) {
        options2.value = parseFloat(options2.value);
      }
      Node.parseOptions(this.options, options2, true, this.globalOptions, this.grouplist);
      const pile = [options2, this.options, this.defaultOptions];
      this.chooser = choosify("node", pile);
      this._load_images();
      this.updateLabelModule(options2);
      if (options2.opacity !== void 0 && Node.checkOpacity(options2.opacity)) {
        this.options.opacity = options2.opacity;
      }
      this.updateShape(currentShape);
      return options2.hidden !== void 0 || options2.physics !== void 0;
    }
    _load_images() {
      if (this.options.shape === "circularImage" || this.options.shape === "image") {
        if (this.options.image === void 0) {
          throw new Error("Option image must be defined for node type '" + this.options.shape + "'");
        }
      }
      if (this.options.image === void 0) {
        return;
      }
      if (this.imagelist === void 0) {
        throw new Error("Internal Error: No images provided");
      }
      if (typeof this.options.image === "string") {
        this.imageObj = this.imagelist.load(this.options.image, this.options.brokenImage, this.id);
      } else {
        if (this.options.image.unselected === void 0) {
          throw new Error("No unselected image provided");
        }
        this.imageObj = this.imagelist.load(this.options.image.unselected, this.options.brokenImage, this.id);
        if (this.options.image.selected !== void 0) {
          this.imageObjAlt = this.imagelist.load(this.options.image.selected, this.options.brokenImage, this.id);
        } else {
          this.imageObjAlt = void 0;
        }
      }
    }
    static checkOpacity(opacity) {
      return 0 <= opacity && opacity <= 1;
    }
    static checkCoordinateOrigin(origin) {
      return origin === void 0 || origin === "center" || origin === "top-left";
    }
    static updateGroupOptions(parentOptions, newOptions, groupList) {
      if (groupList === void 0)
        return;
      const group = parentOptions.group;
      if (newOptions !== void 0 && newOptions.group !== void 0 && group !== newOptions.group) {
        throw new Error("updateGroupOptions: group values in options don't match.");
      }
      const hasGroup = typeof group === "number" || typeof group === "string" && group != "";
      if (!hasGroup)
        return;
      const groupObj = groupList.get(group);
      if (groupObj.opacity !== void 0 && newOptions.opacity === void 0) {
        if (!Node.checkOpacity(groupObj.opacity)) {
          console.error("Invalid option for node opacity. Value must be between 0 and 1, found: " + groupObj.opacity);
          groupObj.opacity = void 0;
        }
      }
      const skipProperties = Object.getOwnPropertyNames(newOptions).filter((p) => newOptions[p] != null);
      skipProperties.push("font");
      selectiveNotDeepExtend(skipProperties, parentOptions, groupObj);
      parentOptions.color = parseColor(parentOptions.color);
    }
    static parseOptions(parentOptions, newOptions, allowDeletion = false, globalOptions = {}, groupList) {
      const fields = ["color", "fixed", "shadow"];
      selectiveNotDeepExtend(fields, parentOptions, newOptions, allowDeletion);
      Node.checkMass(newOptions);
      if (parentOptions.opacity !== void 0) {
        if (!Node.checkOpacity(parentOptions.opacity)) {
          console.error("Invalid option for node opacity. Value must be between 0 and 1, found: " + parentOptions.opacity);
          parentOptions.opacity = void 0;
        }
      }
      if (newOptions.opacity !== void 0) {
        if (!Node.checkOpacity(newOptions.opacity)) {
          console.error("Invalid option for node opacity. Value must be between 0 and 1, found: " + newOptions.opacity);
          newOptions.opacity = void 0;
        }
      }
      if (newOptions.shapeProperties && !Node.checkCoordinateOrigin(newOptions.shapeProperties.coordinateOrigin)) {
        console.error("Invalid option for node coordinateOrigin, found: " + newOptions.shapeProperties.coordinateOrigin);
      }
      mergeOptions(parentOptions, newOptions, "shadow", globalOptions);
      if (newOptions.color !== void 0 && newOptions.color !== null) {
        const parsedColor = parseColor(newOptions.color);
        fillIfDefined(parentOptions.color, parsedColor);
      } else if (allowDeletion === true && newOptions.color === null) {
        parentOptions.color = bridgeObject(globalOptions.color);
      }
      if (newOptions.fixed !== void 0 && newOptions.fixed !== null) {
        if (typeof newOptions.fixed === "boolean") {
          parentOptions.fixed.x = newOptions.fixed;
          parentOptions.fixed.y = newOptions.fixed;
        } else {
          if (newOptions.fixed.x !== void 0 && typeof newOptions.fixed.x === "boolean") {
            parentOptions.fixed.x = newOptions.fixed.x;
          }
          if (newOptions.fixed.y !== void 0 && typeof newOptions.fixed.y === "boolean") {
            parentOptions.fixed.y = newOptions.fixed.y;
          }
        }
      }
      if (allowDeletion === true && newOptions.font === null) {
        parentOptions.font = bridgeObject(globalOptions.font);
      }
      Node.updateGroupOptions(parentOptions, newOptions, groupList);
      if (newOptions.scaling !== void 0) {
        mergeOptions(parentOptions.scaling, newOptions.scaling, "label", globalOptions.scaling);
      }
    }
    getFormattingValues() {
      const values = {
        color: this.options.color.background,
        opacity: this.options.opacity,
        borderWidth: this.options.borderWidth,
        borderColor: this.options.color.border,
        size: this.options.size,
        borderDashes: this.options.shapeProperties.borderDashes,
        borderRadius: this.options.shapeProperties.borderRadius,
        shadow: this.options.shadow.enabled,
        shadowColor: this.options.shadow.color,
        shadowSize: this.options.shadow.size,
        shadowX: this.options.shadow.x,
        shadowY: this.options.shadow.y
      };
      if (this.selected || this.hover) {
        if (this.chooser === true) {
          if (this.selected) {
            if (this.options.borderWidthSelected != null) {
              values.borderWidth = this.options.borderWidthSelected;
            } else {
              values.borderWidth *= 2;
            }
            values.color = this.options.color.highlight.background;
            values.borderColor = this.options.color.highlight.border;
            values.shadow = this.options.shadow.enabled;
          } else if (this.hover) {
            values.color = this.options.color.hover.background;
            values.borderColor = this.options.color.hover.border;
            values.shadow = this.options.shadow.enabled;
          }
        } else if (typeof this.chooser === "function") {
          this.chooser(values, this.options.id, this.selected, this.hover);
          if (values.shadow === false) {
            if (values.shadowColor !== this.options.shadow.color || values.shadowSize !== this.options.shadow.size || values.shadowX !== this.options.shadow.x || values.shadowY !== this.options.shadow.y) {
              values.shadow = true;
            }
          }
        }
      } else {
        values.shadow = this.options.shadow.enabled;
      }
      if (this.options.opacity !== void 0) {
        const opacity = this.options.opacity;
        values.borderColor = overrideOpacity(values.borderColor, opacity);
        values.color = overrideOpacity(values.color, opacity);
        values.shadowColor = overrideOpacity(values.shadowColor, opacity);
      }
      return values;
    }
    updateLabelModule(options2) {
      if (this.options.label === void 0 || this.options.label === null) {
        this.options.label = "";
      }
      Node.updateGroupOptions(this.options, __spreadProps(__spreadValues({}, options2), {
        color: options2 && options2.color || this._localColor || void 0
      }), this.grouplist);
      const currentGroup = this.grouplist.get(this.options.group, false);
      const pile = [
        options2,
        this.options,
        currentGroup,
        this.globalOptions,
        this.defaultOptions
      ];
      this.labelModule.update(this.options, pile);
      if (this.labelModule.baseSize !== void 0) {
        this.baseFontSize = this.labelModule.baseSize;
      }
    }
    updateShape(currentShape) {
      if (currentShape === this.options.shape && this.shape) {
        this.shape.setOptions(this.options, this.imageObj, this.imageObjAlt);
      } else {
        switch (this.options.shape) {
          case "box":
            this.shape = new Box$1(this.options, this.body, this.labelModule);
            break;
          case "circle":
            this.shape = new Circle$1(this.options, this.body, this.labelModule);
            break;
          case "circularImage":
            this.shape = new CircularImage(this.options, this.body, this.labelModule, this.imageObj, this.imageObjAlt);
            break;
          case "custom":
            this.shape = new CustomShape(this.options, this.body, this.labelModule, this.options.ctxRenderer);
            break;
          case "database":
            this.shape = new Database(this.options, this.body, this.labelModule);
            break;
          case "diamond":
            this.shape = new Diamond$1(this.options, this.body, this.labelModule);
            break;
          case "dot":
            this.shape = new Dot(this.options, this.body, this.labelModule);
            break;
          case "ellipse":
            this.shape = new Ellipse(this.options, this.body, this.labelModule);
            break;
          case "icon":
            this.shape = new Icon(this.options, this.body, this.labelModule);
            break;
          case "image":
            this.shape = new Image$2(this.options, this.body, this.labelModule, this.imageObj, this.imageObjAlt);
            break;
          case "square":
            this.shape = new Square(this.options, this.body, this.labelModule);
            break;
          case "hexagon":
            this.shape = new Hexagon(this.options, this.body, this.labelModule);
            break;
          case "star":
            this.shape = new Star(this.options, this.body, this.labelModule);
            break;
          case "text":
            this.shape = new Text(this.options, this.body, this.labelModule);
            break;
          case "triangle":
            this.shape = new Triangle$1(this.options, this.body, this.labelModule);
            break;
          case "triangleDown":
            this.shape = new TriangleDown(this.options, this.body, this.labelModule);
            break;
          default:
            this.shape = new Ellipse(this.options, this.body, this.labelModule);
            break;
        }
      }
      this.needsRefresh();
    }
    select() {
      this.selected = true;
      this.needsRefresh();
    }
    unselect() {
      this.selected = false;
      this.needsRefresh();
    }
    needsRefresh() {
      this.shape.refreshNeeded = true;
    }
    getTitle() {
      return this.options.title;
    }
    distanceToBorder(ctx, angle) {
      return this.shape.distanceToBorder(ctx, angle);
    }
    isFixed() {
      return this.options.fixed.x && this.options.fixed.y;
    }
    isSelected() {
      return this.selected;
    }
    getValue() {
      return this.options.value;
    }
    getLabelSize() {
      return this.labelModule.size();
    }
    setValueRange(min, max, total) {
      if (this.options.value !== void 0) {
        const scale = this.options.scaling.customScalingFunction(min, max, total, this.options.value);
        const sizeDiff = this.options.scaling.max - this.options.scaling.min;
        if (this.options.scaling.label.enabled === true) {
          const fontDiff = this.options.scaling.label.max - this.options.scaling.label.min;
          this.options.font.size = this.options.scaling.label.min + scale * fontDiff;
        }
        this.options.size = this.options.scaling.min + scale * sizeDiff;
      } else {
        this.options.size = this.baseSize;
        this.options.font.size = this.baseFontSize;
      }
      this.updateLabelModule();
    }
    draw(ctx) {
      const values = this.getFormattingValues();
      return this.shape.draw(ctx, this.x, this.y, this.selected, this.hover, values) || {};
    }
    updateBoundingBox(ctx) {
      this.shape.updateBoundingBox(this.x, this.y, ctx);
    }
    resize(ctx) {
      const values = this.getFormattingValues();
      this.shape.resize(ctx, this.selected, this.hover, values);
    }
    getItemsOnPoint(point) {
      const ret = [];
      if (this.labelModule.visible()) {
        if (pointInRect(this.labelModule.getSize(), point)) {
          ret.push({ nodeId: this.id, labelId: 0 });
        }
      }
      if (pointInRect(this.shape.boundingBox, point)) {
        ret.push({ nodeId: this.id });
      }
      return ret;
    }
    isOverlappingWith(obj) {
      return this.shape.left < obj.right && this.shape.left + this.shape.width > obj.left && this.shape.top < obj.bottom && this.shape.top + this.shape.height > obj.top;
    }
    isBoundingBoxOverlappingWith(obj) {
      return this.shape.boundingBox.left < obj.right && this.shape.boundingBox.right > obj.left && this.shape.boundingBox.top < obj.bottom && this.shape.boundingBox.bottom > obj.top;
    }
    static checkMass(options2, id) {
      if (options2.mass !== void 0 && options2.mass <= 0) {
        let strId = "";
        if (id !== void 0) {
          strId = " in node id: " + id;
        }
        console.error("%cNegative or zero mass disallowed" + strId + ", setting mass to 1.", VALIDATOR_PRINT_STYLE);
        options2.mass = 1;
      }
    }
  };
  var NodesHandler = class {
    constructor(body, images, groups, layoutEngine) {
      this.body = body;
      this.images = images;
      this.groups = groups;
      this.layoutEngine = layoutEngine;
      this.body.functions.createNode = this.create.bind(this);
      this.nodesListeners = {
        add: (event, params) => {
          this.add(params.items);
        },
        update: (event, params) => {
          this.update(params.items, params.data, params.oldData);
        },
        remove: (event, params) => {
          this.remove(params.items);
        }
      };
      this.defaultOptions = {
        borderWidth: 1,
        borderWidthSelected: void 0,
        brokenImage: void 0,
        color: {
          border: "#2B7CE9",
          background: "#97C2FC",
          highlight: {
            border: "#2B7CE9",
            background: "#D2E5FF"
          },
          hover: {
            border: "#2B7CE9",
            background: "#D2E5FF"
          }
        },
        opacity: void 0,
        fixed: {
          x: false,
          y: false
        },
        font: {
          color: "#343434",
          size: 14,
          face: "arial",
          background: "none",
          strokeWidth: 0,
          strokeColor: "#ffffff",
          align: "center",
          vadjust: 0,
          multi: false,
          bold: {
            mod: "bold"
          },
          boldital: {
            mod: "bold italic"
          },
          ital: {
            mod: "italic"
          },
          mono: {
            mod: "",
            size: 15,
            face: "monospace",
            vadjust: 2
          }
        },
        group: void 0,
        hidden: false,
        icon: {
          face: "FontAwesome",
          code: void 0,
          size: 50,
          color: "#2B7CE9"
        },
        image: void 0,
        imagePadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        },
        label: void 0,
        labelHighlightBold: true,
        level: void 0,
        margin: {
          top: 5,
          right: 5,
          bottom: 5,
          left: 5
        },
        mass: 1,
        physics: true,
        scaling: {
          min: 10,
          max: 30,
          label: {
            enabled: false,
            min: 14,
            max: 30,
            maxVisible: 30,
            drawThreshold: 5
          },
          customScalingFunction: function(min, max, total, value) {
            if (max === min) {
              return 0.5;
            } else {
              const scale = 1 / (max - min);
              return Math.max(0, (value - min) * scale);
            }
          }
        },
        shadow: {
          enabled: false,
          color: "rgba(0,0,0,0.5)",
          size: 10,
          x: 5,
          y: 5
        },
        shape: "ellipse",
        shapeProperties: {
          borderDashes: false,
          borderRadius: 6,
          interpolation: true,
          useImageSize: false,
          useBorderWithImage: false,
          coordinateOrigin: "center"
        },
        size: 25,
        title: void 0,
        value: void 0,
        x: void 0,
        y: void 0
      };
      if (this.defaultOptions.mass <= 0) {
        throw "Internal error: mass in defaultOptions of NodesHandler may not be zero or negative";
      }
      this.options = bridgeObject(this.defaultOptions);
      this.bindEventListeners();
    }
    bindEventListeners() {
      this.body.emitter.on("refreshNodes", this.refresh.bind(this));
      this.body.emitter.on("refresh", this.refresh.bind(this));
      this.body.emitter.on("destroy", () => {
        forEach(this.nodesListeners, (callback, event) => {
          if (this.body.data.nodes)
            this.body.data.nodes.off(event, callback);
        });
        delete this.body.functions.createNode;
        delete this.nodesListeners.add;
        delete this.nodesListeners.update;
        delete this.nodesListeners.remove;
        delete this.nodesListeners;
      });
    }
    setOptions(options2) {
      if (options2 !== void 0) {
        Node.parseOptions(this.options, options2);
        if (options2.opacity !== void 0) {
          if (Number.isNaN(options2.opacity) || !Number.isFinite(options2.opacity) || options2.opacity < 0 || options2.opacity > 1) {
            console.error("Invalid option for node opacity. Value must be between 0 and 1, found: " + options2.opacity);
          } else {
            this.options.opacity = options2.opacity;
          }
        }
        if (options2.shape !== void 0) {
          for (const nodeId in this.body.nodes) {
            if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
              this.body.nodes[nodeId].updateShape();
            }
          }
        }
        if (typeof options2.font !== "undefined" || typeof options2.widthConstraint !== "undefined" || typeof options2.heightConstraint !== "undefined") {
          for (const nodeId of Object.keys(this.body.nodes)) {
            this.body.nodes[nodeId].updateLabelModule();
            this.body.nodes[nodeId].needsRefresh();
          }
        }
        if (options2.size !== void 0) {
          for (const nodeId in this.body.nodes) {
            if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
              this.body.nodes[nodeId].needsRefresh();
            }
          }
        }
        if (options2.hidden !== void 0 || options2.physics !== void 0) {
          this.body.emitter.emit("_dataChanged");
        }
      }
    }
    setData(nodes, doNotEmit = false) {
      const oldNodesData = this.body.data.nodes;
      if (isDataViewLike("id", nodes)) {
        this.body.data.nodes = nodes;
      } else if (Array.isArray(nodes)) {
        this.body.data.nodes = new DataSet();
        this.body.data.nodes.add(nodes);
      } else if (!nodes) {
        this.body.data.nodes = new DataSet();
      } else {
        throw new TypeError("Array or DataSet expected");
      }
      if (oldNodesData) {
        forEach(this.nodesListeners, function(callback, event) {
          oldNodesData.off(event, callback);
        });
      }
      this.body.nodes = {};
      if (this.body.data.nodes) {
        const me = this;
        forEach(this.nodesListeners, function(callback, event) {
          me.body.data.nodes.on(event, callback);
        });
        const ids = this.body.data.nodes.getIds();
        this.add(ids, true);
      }
      if (doNotEmit === false) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    add(ids, doNotEmit = false) {
      let id;
      const newNodes = [];
      for (let i2 = 0; i2 < ids.length; i2++) {
        id = ids[i2];
        const properties = this.body.data.nodes.get(id);
        const node = this.create(properties);
        newNodes.push(node);
        this.body.nodes[id] = node;
      }
      this.layoutEngine.positionInitially(newNodes);
      if (doNotEmit === false) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    update(ids, changedData, oldData) {
      const nodes = this.body.nodes;
      let dataChanged = false;
      for (let i2 = 0; i2 < ids.length; i2++) {
        const id = ids[i2];
        let node = nodes[id];
        const data = changedData[i2];
        if (node !== void 0) {
          if (node.setOptions(data)) {
            dataChanged = true;
          }
        } else {
          dataChanged = true;
          node = this.create(data);
          nodes[id] = node;
        }
      }
      if (!dataChanged && oldData !== void 0) {
        dataChanged = changedData.some(function(newValue, index2) {
          const oldValue = oldData[index2];
          return oldValue && oldValue.level !== newValue.level;
        });
      }
      if (dataChanged === true) {
        this.body.emitter.emit("_dataChanged");
      } else {
        this.body.emitter.emit("_dataUpdated");
      }
    }
    remove(ids) {
      const nodes = this.body.nodes;
      for (let i2 = 0; i2 < ids.length; i2++) {
        const id = ids[i2];
        delete nodes[id];
      }
      this.body.emitter.emit("_dataChanged");
    }
    create(properties, constructorClass = Node) {
      return new constructorClass(properties, this.body, this.images, this.groups, this.options, this.defaultOptions);
    }
    refresh(clearPositions = false) {
      forEach(this.body.nodes, (node, nodeId) => {
        const data = this.body.data.nodes.get(nodeId);
        if (data !== void 0) {
          if (clearPositions === true) {
            node.setOptions({ x: null, y: null });
          }
          node.setOptions({ fixed: false });
          node.setOptions(data);
        }
      });
    }
    getPositions(ids) {
      const dataArray = {};
      if (ids !== void 0) {
        if (Array.isArray(ids) === true) {
          for (let i2 = 0; i2 < ids.length; i2++) {
            if (this.body.nodes[ids[i2]] !== void 0) {
              const node = this.body.nodes[ids[i2]];
              dataArray[ids[i2]] = {
                x: Math.round(node.x),
                y: Math.round(node.y)
              };
            }
          }
        } else {
          if (this.body.nodes[ids] !== void 0) {
            const node = this.body.nodes[ids];
            dataArray[ids] = { x: Math.round(node.x), y: Math.round(node.y) };
          }
        }
      } else {
        for (let i2 = 0; i2 < this.body.nodeIndices.length; i2++) {
          const node = this.body.nodes[this.body.nodeIndices[i2]];
          dataArray[this.body.nodeIndices[i2]] = {
            x: Math.round(node.x),
            y: Math.round(node.y)
          };
        }
      }
      return dataArray;
    }
    getPosition(id) {
      if (id == void 0) {
        throw new TypeError("No id was specified for getPosition method.");
      } else if (this.body.nodes[id] == void 0) {
        throw new ReferenceError(`NodeId provided for getPosition does not exist. Provided: ${id}`);
      } else {
        return {
          x: Math.round(this.body.nodes[id].x),
          y: Math.round(this.body.nodes[id].y)
        };
      }
    }
    storePositions() {
      const dataArray = [];
      const dataset = this.body.data.nodes.getDataSet();
      for (const dsNode of dataset.get()) {
        const id = dsNode.id;
        const bodyNode = this.body.nodes[id];
        const x2 = Math.round(bodyNode.x);
        const y2 = Math.round(bodyNode.y);
        if (dsNode.x !== x2 || dsNode.y !== y2) {
          dataArray.push({ id, x: x2, y: y2 });
        }
      }
      dataset.update(dataArray);
    }
    getBoundingBox(nodeId) {
      if (this.body.nodes[nodeId] !== void 0) {
        return this.body.nodes[nodeId].shape.boundingBox;
      }
    }
    getConnectedNodes(nodeId, direction) {
      const nodeList = [];
      if (this.body.nodes[nodeId] !== void 0) {
        const node = this.body.nodes[nodeId];
        const nodeObj = {};
        for (let i2 = 0; i2 < node.edges.length; i2++) {
          const edge = node.edges[i2];
          if (direction !== "to" && edge.toId == node.id) {
            if (nodeObj[edge.fromId] === void 0) {
              nodeList.push(edge.fromId);
              nodeObj[edge.fromId] = true;
            }
          } else if (direction !== "from" && edge.fromId == node.id) {
            if (nodeObj[edge.toId] === void 0) {
              nodeList.push(edge.toId);
              nodeObj[edge.toId] = true;
            }
          }
        }
      }
      return nodeList;
    }
    getConnectedEdges(nodeId) {
      const edgeList = [];
      if (this.body.nodes[nodeId] !== void 0) {
        const node = this.body.nodes[nodeId];
        for (let i2 = 0; i2 < node.edges.length; i2++) {
          edgeList.push(node.edges[i2].id);
        }
      } else {
        console.error("NodeId provided for getConnectedEdges does not exist. Provided: ", nodeId);
      }
      return edgeList;
    }
    moveNode(nodeId, x2, y2) {
      if (this.body.nodes[nodeId] !== void 0) {
        this.body.nodes[nodeId].x = Number(x2);
        this.body.nodes[nodeId].y = Number(y2);
        setTimeout(() => {
          this.body.emitter.emit("startSimulation");
        }, 0);
      } else {
        console.error("Node id supplied to moveNode does not exist. Provided: ", nodeId);
      }
    }
  };
  var EndPoint = class {
    static transform(points, arrowData) {
      if (!Array.isArray(points)) {
        points = [points];
      }
      const x2 = arrowData.point.x;
      const y2 = arrowData.point.y;
      const angle = arrowData.angle;
      const length2 = arrowData.length;
      for (let i2 = 0; i2 < points.length; ++i2) {
        const p = points[i2];
        const xt = p.x * Math.cos(angle) - p.y * Math.sin(angle);
        const yt = p.x * Math.sin(angle) + p.y * Math.cos(angle);
        p.x = x2 + length2 * xt;
        p.y = y2 + length2 * yt;
      }
    }
    static drawPath(ctx, points) {
      ctx.beginPath();
      ctx.moveTo(points[0].x, points[0].y);
      for (let i2 = 1; i2 < points.length; ++i2) {
        ctx.lineTo(points[i2].x, points[i2].y);
      }
      ctx.closePath();
    }
  };
  var Image$1 = class Image3 extends EndPoint {
    static draw(ctx, arrowData) {
      if (arrowData.image) {
        ctx.save();
        ctx.translate(arrowData.point.x, arrowData.point.y);
        ctx.rotate(Math.PI / 2 + arrowData.angle);
        const width = arrowData.imageWidth != null ? arrowData.imageWidth : arrowData.image.width;
        const height = arrowData.imageHeight != null ? arrowData.imageHeight : arrowData.image.height;
        arrowData.image.drawImageAtPosition(ctx, 1, -width / 2, 0, width, height);
        ctx.restore();
      }
      return false;
    }
  };
  var Arrow = class extends EndPoint {
    static draw(ctx, arrowData) {
      const points = [
        { x: 0, y: 0 },
        { x: -1, y: 0.3 },
        { x: -0.9, y: 0 },
        { x: -1, y: -0.3 }
      ];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  };
  var Crow = class {
    static draw(ctx, arrowData) {
      const points = [
        { x: -1, y: 0 },
        { x: 0, y: 0.3 },
        { x: -0.4, y: 0 },
        { x: 0, y: -0.3 }
      ];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  };
  var Curve = class {
    static draw(ctx, arrowData) {
      const point = { x: -0.4, y: 0 };
      EndPoint.transform(point, arrowData);
      ctx.strokeStyle = ctx.fillStyle;
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      const pi = Math.PI;
      const startAngle = arrowData.angle - pi / 2;
      const endAngle = arrowData.angle + pi / 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, arrowData.length * 0.4, startAngle, endAngle, false);
      ctx.stroke();
      return true;
    }
  };
  var InvertedCurve = class {
    static draw(ctx, arrowData) {
      const point = { x: -0.3, y: 0 };
      EndPoint.transform(point, arrowData);
      ctx.strokeStyle = ctx.fillStyle;
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      const pi = Math.PI;
      const startAngle = arrowData.angle + pi / 2;
      const endAngle = arrowData.angle + 3 * pi / 2;
      ctx.beginPath();
      ctx.arc(point.x, point.y, arrowData.length * 0.4, startAngle, endAngle, false);
      ctx.stroke();
      return true;
    }
  };
  var Triangle2 = class {
    static draw(ctx, arrowData) {
      const points = [
        { x: 0.02, y: 0 },
        { x: -1, y: 0.3 },
        { x: -1, y: -0.3 }
      ];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  };
  var InvertedTriangle = class {
    static draw(ctx, arrowData) {
      const points = [
        { x: 0, y: 0.3 },
        { x: 0, y: -0.3 },
        { x: -1, y: 0 }
      ];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  };
  var Circle2 = class {
    static draw(ctx, arrowData) {
      const point = { x: -0.4, y: 0 };
      EndPoint.transform(point, arrowData);
      drawCircle(ctx, point.x, point.y, arrowData.length * 0.4);
      return true;
    }
  };
  var Bar = class {
    static draw(ctx, arrowData) {
      const points = [
        { x: 0, y: 0.5 },
        { x: 0, y: -0.5 },
        { x: -0.15, y: -0.5 },
        { x: -0.15, y: 0.5 }
      ];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  };
  var Box2 = class {
    static draw(ctx, arrowData) {
      const points = [
        { x: 0, y: 0.3 },
        { x: 0, y: -0.3 },
        { x: -0.6, y: -0.3 },
        { x: -0.6, y: 0.3 }
      ];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  };
  var Diamond2 = class {
    static draw(ctx, arrowData) {
      const points = [
        { x: 0, y: 0 },
        { x: -0.5, y: -0.3 },
        { x: -1, y: 0 },
        { x: -0.5, y: 0.3 }
      ];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  };
  var Vee = class {
    static draw(ctx, arrowData) {
      const points = [
        { x: -1, y: 0.3 },
        { x: -0.5, y: 0 },
        { x: -1, y: -0.3 },
        { x: 0, y: 0 }
      ];
      EndPoint.transform(points, arrowData);
      EndPoint.drawPath(ctx, points);
      return true;
    }
  };
  var EndPoints = class {
    static draw(ctx, arrowData) {
      let type;
      if (arrowData.type) {
        type = arrowData.type.toLowerCase();
      }
      switch (type) {
        case "image":
          return Image$1.draw(ctx, arrowData);
        case "circle":
          return Circle2.draw(ctx, arrowData);
        case "box":
          return Box2.draw(ctx, arrowData);
        case "crow":
          return Crow.draw(ctx, arrowData);
        case "curve":
          return Curve.draw(ctx, arrowData);
        case "diamond":
          return Diamond2.draw(ctx, arrowData);
        case "inv_curve":
          return InvertedCurve.draw(ctx, arrowData);
        case "triangle":
          return Triangle2.draw(ctx, arrowData);
        case "inv_triangle":
          return InvertedTriangle.draw(ctx, arrowData);
        case "bar":
          return Bar.draw(ctx, arrowData);
        case "vee":
          return Vee.draw(ctx, arrowData);
        case "arrow":
        default:
          return Arrow.draw(ctx, arrowData);
      }
    }
  };
  var EdgeBase = class {
    constructor(options2, _body, _labelModule) {
      this._body = _body;
      this._labelModule = _labelModule;
      this.color = {};
      this.colorDirty = true;
      this.hoverWidth = 1.5;
      this.selectionWidth = 2;
      this.setOptions(options2);
      this.fromPoint = this.from;
      this.toPoint = this.to;
    }
    connect() {
      this.from = this._body.nodes[this.options.from];
      this.to = this._body.nodes[this.options.to];
    }
    cleanup() {
      return false;
    }
    setOptions(options2) {
      this.options = options2;
      this.from = this._body.nodes[this.options.from];
      this.to = this._body.nodes[this.options.to];
      this.id = this.options.id;
    }
    drawLine(ctx, values, _selected, _hover, viaNode = this.getViaNode()) {
      ctx.strokeStyle = this.getColor(ctx, values);
      ctx.lineWidth = values.width;
      if (values.dashes !== false) {
        this._drawDashedLine(ctx, values, viaNode);
      } else {
        this._drawLine(ctx, values, viaNode);
      }
    }
    _drawLine(ctx, values, viaNode, fromPoint, toPoint) {
      if (this.from != this.to) {
        this._line(ctx, values, viaNode, fromPoint, toPoint);
      } else {
        const [x2, y2, radius] = this._getCircleData(ctx);
        this._circle(ctx, values, x2, y2, radius);
      }
    }
    _drawDashedLine(ctx, values, viaNode, _fromPoint, _toPoint) {
      ctx.lineCap = "round";
      const pattern = Array.isArray(values.dashes) ? values.dashes : [5, 5];
      if (ctx.setLineDash !== void 0) {
        ctx.save();
        ctx.setLineDash(pattern);
        ctx.lineDashOffset = 0;
        if (this.from != this.to) {
          this._line(ctx, values, viaNode);
        } else {
          const [x2, y2, radius] = this._getCircleData(ctx);
          this._circle(ctx, values, x2, y2, radius);
        }
        ctx.setLineDash([0]);
        ctx.lineDashOffset = 0;
        ctx.restore();
      } else {
        if (this.from != this.to) {
          drawDashedLine(ctx, this.from.x, this.from.y, this.to.x, this.to.y, pattern);
        } else {
          const [x2, y2, radius] = this._getCircleData(ctx);
          this._circle(ctx, values, x2, y2, radius);
        }
        this.enableShadow(ctx, values);
        ctx.stroke();
        this.disableShadow(ctx, values);
      }
    }
    findBorderPosition(node, ctx, options2) {
      if (this.from != this.to) {
        return this._findBorderPosition(node, ctx, options2);
      } else {
        return this._findBorderPositionCircle(node, ctx, options2);
      }
    }
    findBorderPositions(ctx) {
      if (this.from != this.to) {
        return {
          from: this._findBorderPosition(this.from, ctx),
          to: this._findBorderPosition(this.to, ctx)
        };
      } else {
        const [x2, y2] = this._getCircleData(ctx).slice(0, 2);
        return {
          from: this._findBorderPositionCircle(this.from, ctx, {
            x: x2,
            y: y2,
            low: 0.25,
            high: 0.6,
            direction: -1
          }),
          to: this._findBorderPositionCircle(this.from, ctx, {
            x: x2,
            y: y2,
            low: 0.6,
            high: 0.8,
            direction: 1
          })
        };
      }
    }
    _getCircleData(ctx) {
      const radius = this.options.selfReference.size;
      if (ctx !== void 0) {
        if (this.from.shape.width === void 0) {
          this.from.shape.resize(ctx);
        }
      }
      const coordinates = getSelfRefCoordinates(ctx, this.options.selfReference.angle, radius, this.from);
      return [coordinates.x, coordinates.y, radius];
    }
    _pointOnCircle(x2, y2, radius, position) {
      const angle = position * 2 * Math.PI;
      return {
        x: x2 + radius * Math.cos(angle),
        y: y2 - radius * Math.sin(angle)
      };
    }
    _findBorderPositionCircle(nearNode, ctx, options2) {
      const x2 = options2.x;
      const y2 = options2.y;
      let low = options2.low;
      let high = options2.high;
      const direction = options2.direction;
      const maxIterations = 10;
      const radius = this.options.selfReference.size;
      const threshold = 0.05;
      let pos2;
      let middle = (low + high) * 0.5;
      let endPointOffset = 0;
      if (this.options.arrowStrikethrough === true) {
        if (direction === -1) {
          endPointOffset = this.options.endPointOffset.from;
        } else if (direction === 1) {
          endPointOffset = this.options.endPointOffset.to;
        }
      }
      let iteration = 0;
      do {
        middle = (low + high) * 0.5;
        pos2 = this._pointOnCircle(x2, y2, radius, middle);
        const angle = Math.atan2(nearNode.y - pos2.y, nearNode.x - pos2.x);
        const distanceToBorder = nearNode.distanceToBorder(ctx, angle) + endPointOffset;
        const distanceToPoint = Math.sqrt(Math.pow(pos2.x - nearNode.x, 2) + Math.pow(pos2.y - nearNode.y, 2));
        const difference = distanceToBorder - distanceToPoint;
        if (Math.abs(difference) < threshold) {
          break;
        } else if (difference > 0) {
          if (direction > 0) {
            low = middle;
          } else {
            high = middle;
          }
        } else {
          if (direction > 0) {
            high = middle;
          } else {
            low = middle;
          }
        }
        ++iteration;
      } while (low <= high && iteration < maxIterations);
      return __spreadProps(__spreadValues({}, pos2), {
        t: middle
      });
    }
    getLineWidth(selected, hover) {
      if (selected === true) {
        return Math.max(this.selectionWidth, 0.3 / this._body.view.scale);
      } else if (hover === true) {
        return Math.max(this.hoverWidth, 0.3 / this._body.view.scale);
      } else {
        return Math.max(this.options.width, 0.3 / this._body.view.scale);
      }
    }
    getColor(ctx, values) {
      if (values.inheritsColor !== false) {
        if (values.inheritsColor === "both" && this.from.id !== this.to.id) {
          const grd = ctx.createLinearGradient(this.from.x, this.from.y, this.to.x, this.to.y);
          let fromColor = this.from.options.color.highlight.border;
          let toColor = this.to.options.color.highlight.border;
          if (this.from.selected === false && this.to.selected === false) {
            fromColor = overrideOpacity(this.from.options.color.border, values.opacity);
            toColor = overrideOpacity(this.to.options.color.border, values.opacity);
          } else if (this.from.selected === true && this.to.selected === false) {
            toColor = this.to.options.color.border;
          } else if (this.from.selected === false && this.to.selected === true) {
            fromColor = this.from.options.color.border;
          }
          grd.addColorStop(0, fromColor);
          grd.addColorStop(1, toColor);
          return grd;
        }
        if (values.inheritsColor === "to") {
          return overrideOpacity(this.to.options.color.border, values.opacity);
        } else {
          return overrideOpacity(this.from.options.color.border, values.opacity);
        }
      } else {
        return overrideOpacity(values.color, values.opacity);
      }
    }
    _circle(ctx, values, x2, y2, radius) {
      this.enableShadow(ctx, values);
      let angleFrom = 0;
      let angleTo = Math.PI * 2;
      if (!this.options.selfReference.renderBehindTheNode) {
        const low = this.options.selfReference.angle;
        const high = this.options.selfReference.angle + Math.PI;
        const pointTFrom = this._findBorderPositionCircle(this.from, ctx, {
          x: x2,
          y: y2,
          low,
          high,
          direction: -1
        });
        const pointTTo = this._findBorderPositionCircle(this.from, ctx, {
          x: x2,
          y: y2,
          low,
          high,
          direction: 1
        });
        angleFrom = Math.atan2(pointTFrom.y - y2, pointTFrom.x - x2);
        angleTo = Math.atan2(pointTTo.y - y2, pointTTo.x - x2);
      }
      ctx.beginPath();
      ctx.arc(x2, y2, radius, angleFrom, angleTo, false);
      ctx.stroke();
      this.disableShadow(ctx, values);
    }
    getDistanceToEdge(x1, y1, x2, y2, x3, y3) {
      if (this.from != this.to) {
        return this._getDistanceToEdge(x1, y1, x2, y2, x3, y3);
      } else {
        const [x4, y4, radius] = this._getCircleData(void 0);
        const dx = x4 - x3;
        const dy = y4 - y3;
        return Math.abs(Math.sqrt(dx * dx + dy * dy) - radius);
      }
    }
    _getDistanceToLine(x1, y1, x2, y2, x3, y3) {
      const px = x2 - x1;
      const py = y2 - y1;
      const something = px * px + py * py;
      let u = ((x3 - x1) * px + (y3 - y1) * py) / something;
      if (u > 1) {
        u = 1;
      } else if (u < 0) {
        u = 0;
      }
      const x4 = x1 + u * px;
      const y4 = y1 + u * py;
      const dx = x4 - x3;
      const dy = y4 - y3;
      return Math.sqrt(dx * dx + dy * dy);
    }
    getArrowData(ctx, position, viaNode, _selected, _hover, values) {
      let angle;
      let arrowPoint;
      let node1;
      let node2;
      let reversed;
      let scaleFactor;
      let type;
      const lineWidth = values.width;
      if (position === "from") {
        node1 = this.from;
        node2 = this.to;
        reversed = values.fromArrowScale < 0;
        scaleFactor = Math.abs(values.fromArrowScale);
        type = values.fromArrowType;
      } else if (position === "to") {
        node1 = this.to;
        node2 = this.from;
        reversed = values.toArrowScale < 0;
        scaleFactor = Math.abs(values.toArrowScale);
        type = values.toArrowType;
      } else {
        node1 = this.to;
        node2 = this.from;
        reversed = values.middleArrowScale < 0;
        scaleFactor = Math.abs(values.middleArrowScale);
        type = values.middleArrowType;
      }
      const length2 = 15 * scaleFactor + 3 * lineWidth;
      if (node1 != node2) {
        const approximateEdgeLength = Math.hypot(node1.x - node2.x, node1.y - node2.y);
        const relativeLength = length2 / approximateEdgeLength;
        if (position !== "middle") {
          if (this.options.smooth.enabled === true) {
            const pointT = this._findBorderPosition(node1, ctx, { via: viaNode });
            const guidePos = this.getPoint(pointT.t + relativeLength * (position === "from" ? 1 : -1), viaNode);
            angle = Math.atan2(pointT.y - guidePos.y, pointT.x - guidePos.x);
            arrowPoint = pointT;
          } else {
            angle = Math.atan2(node1.y - node2.y, node1.x - node2.x);
            arrowPoint = this._findBorderPosition(node1, ctx);
          }
        } else {
          const halfLength = (reversed ? -relativeLength : relativeLength) / 2;
          const guidePos1 = this.getPoint(0.5 + halfLength, viaNode);
          const guidePos2 = this.getPoint(0.5 - halfLength, viaNode);
          angle = Math.atan2(guidePos1.y - guidePos2.y, guidePos1.x - guidePos2.x);
          arrowPoint = this.getPoint(0.5, viaNode);
        }
      } else {
        const [x2, y2, radius] = this._getCircleData(ctx);
        if (position === "from") {
          const low = this.options.selfReference.angle;
          const high = this.options.selfReference.angle + Math.PI;
          const pointT = this._findBorderPositionCircle(this.from, ctx, {
            x: x2,
            y: y2,
            low,
            high,
            direction: -1
          });
          angle = pointT.t * -2 * Math.PI + 1.5 * Math.PI + 0.1 * Math.PI;
          arrowPoint = pointT;
        } else if (position === "to") {
          const low = this.options.selfReference.angle;
          const high = this.options.selfReference.angle + Math.PI;
          const pointT = this._findBorderPositionCircle(this.from, ctx, {
            x: x2,
            y: y2,
            low,
            high,
            direction: 1
          });
          angle = pointT.t * -2 * Math.PI + 1.5 * Math.PI - 1.1 * Math.PI;
          arrowPoint = pointT;
        } else {
          const pos2 = this.options.selfReference.angle / (2 * Math.PI);
          arrowPoint = this._pointOnCircle(x2, y2, radius, pos2);
          angle = pos2 * -2 * Math.PI + 1.5 * Math.PI + 0.1 * Math.PI;
        }
      }
      const xi = arrowPoint.x - length2 * 0.9 * Math.cos(angle);
      const yi = arrowPoint.y - length2 * 0.9 * Math.sin(angle);
      const arrowCore = { x: xi, y: yi };
      return {
        point: arrowPoint,
        core: arrowCore,
        angle,
        length: length2,
        type
      };
    }
    drawArrowHead(ctx, values, _selected, _hover, arrowData) {
      ctx.strokeStyle = this.getColor(ctx, values);
      ctx.fillStyle = ctx.strokeStyle;
      ctx.lineWidth = values.width;
      const canFill = EndPoints.draw(ctx, arrowData);
      if (canFill) {
        this.enableShadow(ctx, values);
        ctx.fill();
        this.disableShadow(ctx, values);
      }
    }
    enableShadow(ctx, values) {
      if (values.shadow === true) {
        ctx.shadowColor = values.shadowColor;
        ctx.shadowBlur = values.shadowSize;
        ctx.shadowOffsetX = values.shadowX;
        ctx.shadowOffsetY = values.shadowY;
      }
    }
    disableShadow(ctx, values) {
      if (values.shadow === true) {
        ctx.shadowColor = "rgba(0,0,0,0)";
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
      }
    }
    drawBackground(ctx, values) {
      if (values.background !== false) {
        const origCtxAttr = {
          strokeStyle: ctx.strokeStyle,
          lineWidth: ctx.lineWidth,
          dashes: ctx.dashes
        };
        ctx.strokeStyle = values.backgroundColor;
        ctx.lineWidth = values.backgroundSize;
        this.setStrokeDashed(ctx, values.backgroundDashes);
        ctx.stroke();
        ctx.strokeStyle = origCtxAttr.strokeStyle;
        ctx.lineWidth = origCtxAttr.lineWidth;
        ctx.dashes = origCtxAttr.dashes;
        this.setStrokeDashed(ctx, values.dashes);
      }
    }
    setStrokeDashed(ctx, dashes) {
      if (dashes !== false) {
        if (ctx.setLineDash !== void 0) {
          const pattern = Array.isArray(dashes) ? dashes : [5, 5];
          ctx.setLineDash(pattern);
        } else {
          console.warn("setLineDash is not supported in this browser. The dashed stroke cannot be used.");
        }
      } else {
        if (ctx.setLineDash !== void 0) {
          ctx.setLineDash([]);
        } else {
          console.warn("setLineDash is not supported in this browser. The dashed stroke cannot be used.");
        }
      }
    }
  };
  var BezierEdgeBase = class extends EdgeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    _findBorderPositionBezier(nearNode, ctx, viaNode = this._getViaCoordinates()) {
      const maxIterations = 10;
      const threshold = 0.2;
      let from = false;
      let high = 1;
      let low = 0;
      let node = this.to;
      let pos2;
      let middle;
      let endPointOffset = this.options.endPointOffset ? this.options.endPointOffset.to : 0;
      if (nearNode.id === this.from.id) {
        node = this.from;
        from = true;
        endPointOffset = this.options.endPointOffset ? this.options.endPointOffset.from : 0;
      }
      if (this.options.arrowStrikethrough === false) {
        endPointOffset = 0;
      }
      let iteration = 0;
      do {
        middle = (low + high) * 0.5;
        pos2 = this.getPoint(middle, viaNode);
        const angle = Math.atan2(node.y - pos2.y, node.x - pos2.x);
        const distanceToBorder = node.distanceToBorder(ctx, angle) + endPointOffset;
        const distanceToPoint = Math.sqrt(Math.pow(pos2.x - node.x, 2) + Math.pow(pos2.y - node.y, 2));
        const difference = distanceToBorder - distanceToPoint;
        if (Math.abs(difference) < threshold) {
          break;
        } else if (difference < 0) {
          if (from === false) {
            low = middle;
          } else {
            high = middle;
          }
        } else {
          if (from === false) {
            high = middle;
          } else {
            low = middle;
          }
        }
        ++iteration;
      } while (low <= high && iteration < maxIterations);
      return __spreadProps(__spreadValues({}, pos2), {
        t: middle
      });
    }
    _getDistanceToBezierEdge(x1, y1, x2, y2, x3, y3, via) {
      let minDistance = 1e9;
      let distance;
      let i2, t, x4, y4;
      let lastX = x1;
      let lastY = y1;
      for (i2 = 1; i2 < 10; i2++) {
        t = 0.1 * i2;
        x4 = Math.pow(1 - t, 2) * x1 + 2 * t * (1 - t) * via.x + Math.pow(t, 2) * x2;
        y4 = Math.pow(1 - t, 2) * y1 + 2 * t * (1 - t) * via.y + Math.pow(t, 2) * y2;
        if (i2 > 0) {
          distance = this._getDistanceToLine(lastX, lastY, x4, y4, x3, y3);
          minDistance = distance < minDistance ? distance : minDistance;
        }
        lastX = x4;
        lastY = y4;
      }
      return minDistance;
    }
    _bezierCurve(ctx, values, viaNode1, viaNode2) {
      ctx.beginPath();
      ctx.moveTo(this.fromPoint.x, this.fromPoint.y);
      if (viaNode1 != null && viaNode1.x != null) {
        if (viaNode2 != null && viaNode2.x != null) {
          ctx.bezierCurveTo(viaNode1.x, viaNode1.y, viaNode2.x, viaNode2.y, this.toPoint.x, this.toPoint.y);
        } else {
          ctx.quadraticCurveTo(viaNode1.x, viaNode1.y, this.toPoint.x, this.toPoint.y);
        }
      } else {
        ctx.lineTo(this.toPoint.x, this.toPoint.y);
      }
      this.drawBackground(ctx, values);
      this.enableShadow(ctx, values);
      ctx.stroke();
      this.disableShadow(ctx, values);
    }
    getViaNode() {
      return this._getViaCoordinates();
    }
  };
  var BezierEdgeDynamic = class extends BezierEdgeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
      this.via = this.via;
      this._boundFunction = () => {
        this.positionBezierNode();
      };
      this._body.emitter.on("_repositionBezierNodes", this._boundFunction);
    }
    setOptions(options2) {
      super.setOptions(options2);
      let physicsChange = false;
      if (this.options.physics !== options2.physics) {
        physicsChange = true;
      }
      this.options = options2;
      this.id = this.options.id;
      this.from = this._body.nodes[this.options.from];
      this.to = this._body.nodes[this.options.to];
      this.setupSupportNode();
      this.connect();
      if (physicsChange === true) {
        this.via.setOptions({ physics: this.options.physics });
        this.positionBezierNode();
      }
    }
    connect() {
      this.from = this._body.nodes[this.options.from];
      this.to = this._body.nodes[this.options.to];
      if (this.from === void 0 || this.to === void 0 || this.options.physics === false) {
        this.via.setOptions({ physics: false });
      } else {
        if (this.from.id === this.to.id) {
          this.via.setOptions({ physics: false });
        } else {
          this.via.setOptions({ physics: true });
        }
      }
    }
    cleanup() {
      this._body.emitter.off("_repositionBezierNodes", this._boundFunction);
      if (this.via !== void 0) {
        delete this._body.nodes[this.via.id];
        this.via = void 0;
        return true;
      }
      return false;
    }
    setupSupportNode() {
      if (this.via === void 0) {
        const nodeId = "edgeId:" + this.id;
        const node = this._body.functions.createNode({
          id: nodeId,
          shape: "circle",
          physics: true,
          hidden: true
        });
        this._body.nodes[nodeId] = node;
        this.via = node;
        this.via.parentEdgeId = this.id;
        this.positionBezierNode();
      }
    }
    positionBezierNode() {
      if (this.via !== void 0 && this.from !== void 0 && this.to !== void 0) {
        this.via.x = 0.5 * (this.from.x + this.to.x);
        this.via.y = 0.5 * (this.from.y + this.to.y);
      } else if (this.via !== void 0) {
        this.via.x = 0;
        this.via.y = 0;
      }
    }
    _line(ctx, values, viaNode) {
      this._bezierCurve(ctx, values, viaNode);
    }
    _getViaCoordinates() {
      return this.via;
    }
    getViaNode() {
      return this.via;
    }
    getPoint(position, viaNode = this.via) {
      if (this.from === this.to) {
        const [cx, cy, cr] = this._getCircleData();
        const a = 2 * Math.PI * (1 - position);
        return {
          x: cx + cr * Math.sin(a),
          y: cy + cr - cr * (1 - Math.cos(a))
        };
      } else {
        return {
          x: Math.pow(1 - position, 2) * this.fromPoint.x + 2 * position * (1 - position) * viaNode.x + Math.pow(position, 2) * this.toPoint.x,
          y: Math.pow(1 - position, 2) * this.fromPoint.y + 2 * position * (1 - position) * viaNode.y + Math.pow(position, 2) * this.toPoint.y
        };
      }
    }
    _findBorderPosition(nearNode, ctx) {
      return this._findBorderPositionBezier(nearNode, ctx, this.via);
    }
    _getDistanceToEdge(x1, y1, x2, y2, x3, y3) {
      return this._getDistanceToBezierEdge(x1, y1, x2, y2, x3, y3, this.via);
    }
  };
  var BezierEdgeStatic = class extends BezierEdgeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    _line(ctx, values, viaNode) {
      this._bezierCurve(ctx, values, viaNode);
    }
    getViaNode() {
      return this._getViaCoordinates();
    }
    _getViaCoordinates() {
      const factor = this.options.smooth.roundness;
      const type = this.options.smooth.type;
      let dx = Math.abs(this.from.x - this.to.x);
      let dy = Math.abs(this.from.y - this.to.y);
      if (type === "discrete" || type === "diagonalCross") {
        let stepX;
        let stepY;
        if (dx <= dy) {
          stepX = stepY = factor * dy;
        } else {
          stepX = stepY = factor * dx;
        }
        if (this.from.x > this.to.x) {
          stepX = -stepX;
        }
        if (this.from.y >= this.to.y) {
          stepY = -stepY;
        }
        let xVia = this.from.x + stepX;
        let yVia = this.from.y + stepY;
        if (type === "discrete") {
          if (dx <= dy) {
            xVia = dx < factor * dy ? this.from.x : xVia;
          } else {
            yVia = dy < factor * dx ? this.from.y : yVia;
          }
        }
        return { x: xVia, y: yVia };
      } else if (type === "straightCross") {
        let stepX = (1 - factor) * dx;
        let stepY = (1 - factor) * dy;
        if (dx <= dy) {
          stepX = 0;
          if (this.from.y < this.to.y) {
            stepY = -stepY;
          }
        } else {
          if (this.from.x < this.to.x) {
            stepX = -stepX;
          }
          stepY = 0;
        }
        return {
          x: this.to.x + stepX,
          y: this.to.y + stepY
        };
      } else if (type === "horizontal") {
        let stepX = (1 - factor) * dx;
        if (this.from.x < this.to.x) {
          stepX = -stepX;
        }
        return {
          x: this.to.x + stepX,
          y: this.from.y
        };
      } else if (type === "vertical") {
        let stepY = (1 - factor) * dy;
        if (this.from.y < this.to.y) {
          stepY = -stepY;
        }
        return {
          x: this.from.x,
          y: this.to.y + stepY
        };
      } else if (type === "curvedCW") {
        dx = this.to.x - this.from.x;
        dy = this.from.y - this.to.y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        const pi = Math.PI;
        const originalAngle = Math.atan2(dy, dx);
        const myAngle = (originalAngle + (factor * 0.5 + 0.5) * pi) % (2 * pi);
        return {
          x: this.from.x + (factor * 0.5 + 0.5) * radius * Math.sin(myAngle),
          y: this.from.y + (factor * 0.5 + 0.5) * radius * Math.cos(myAngle)
        };
      } else if (type === "curvedCCW") {
        dx = this.to.x - this.from.x;
        dy = this.from.y - this.to.y;
        const radius = Math.sqrt(dx * dx + dy * dy);
        const pi = Math.PI;
        const originalAngle = Math.atan2(dy, dx);
        const myAngle = (originalAngle + (-factor * 0.5 + 0.5) * pi) % (2 * pi);
        return {
          x: this.from.x + (factor * 0.5 + 0.5) * radius * Math.sin(myAngle),
          y: this.from.y + (factor * 0.5 + 0.5) * radius * Math.cos(myAngle)
        };
      } else {
        let stepX;
        let stepY;
        if (dx <= dy) {
          stepX = stepY = factor * dy;
        } else {
          stepX = stepY = factor * dx;
        }
        if (this.from.x > this.to.x) {
          stepX = -stepX;
        }
        if (this.from.y >= this.to.y) {
          stepY = -stepY;
        }
        let xVia = this.from.x + stepX;
        let yVia = this.from.y + stepY;
        if (dx <= dy) {
          if (this.from.x <= this.to.x) {
            xVia = this.to.x < xVia ? this.to.x : xVia;
          } else {
            xVia = this.to.x > xVia ? this.to.x : xVia;
          }
        } else {
          if (this.from.y >= this.to.y) {
            yVia = this.to.y > yVia ? this.to.y : yVia;
          } else {
            yVia = this.to.y < yVia ? this.to.y : yVia;
          }
        }
        return { x: xVia, y: yVia };
      }
    }
    _findBorderPosition(nearNode, ctx, options2 = {}) {
      return this._findBorderPositionBezier(nearNode, ctx, options2.via);
    }
    _getDistanceToEdge(x1, y1, x2, y2, x3, y3, viaNode = this._getViaCoordinates()) {
      return this._getDistanceToBezierEdge(x1, y1, x2, y2, x3, y3, viaNode);
    }
    getPoint(position, viaNode = this._getViaCoordinates()) {
      const t = position;
      const x2 = Math.pow(1 - t, 2) * this.fromPoint.x + 2 * t * (1 - t) * viaNode.x + Math.pow(t, 2) * this.toPoint.x;
      const y2 = Math.pow(1 - t, 2) * this.fromPoint.y + 2 * t * (1 - t) * viaNode.y + Math.pow(t, 2) * this.toPoint.y;
      return { x: x2, y: y2 };
    }
  };
  var CubicBezierEdgeBase = class extends BezierEdgeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    _getDistanceToBezierEdge2(x1, y1, x2, y2, x3, y3, via1, via2) {
      let minDistance = 1e9;
      let lastX = x1;
      let lastY = y1;
      const vec = [0, 0, 0, 0];
      for (let i2 = 1; i2 < 10; i2++) {
        const t = 0.1 * i2;
        vec[0] = Math.pow(1 - t, 3);
        vec[1] = 3 * t * Math.pow(1 - t, 2);
        vec[2] = 3 * Math.pow(t, 2) * (1 - t);
        vec[3] = Math.pow(t, 3);
        const x4 = vec[0] * x1 + vec[1] * via1.x + vec[2] * via2.x + vec[3] * x2;
        const y4 = vec[0] * y1 + vec[1] * via1.y + vec[2] * via2.y + vec[3] * y2;
        if (i2 > 0) {
          const distance = this._getDistanceToLine(lastX, lastY, x4, y4, x3, y3);
          minDistance = distance < minDistance ? distance : minDistance;
        }
        lastX = x4;
        lastY = y4;
      }
      return minDistance;
    }
  };
  var CubicBezierEdge = class extends CubicBezierEdgeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    _line(ctx, values, viaNodes) {
      const via1 = viaNodes[0];
      const via2 = viaNodes[1];
      this._bezierCurve(ctx, values, via1, via2);
    }
    _getViaCoordinates() {
      const dx = this.from.x - this.to.x;
      const dy = this.from.y - this.to.y;
      let x1;
      let y1;
      let x2;
      let y2;
      const roundness = this.options.smooth.roundness;
      if ((Math.abs(dx) > Math.abs(dy) || this.options.smooth.forceDirection === true || this.options.smooth.forceDirection === "horizontal") && this.options.smooth.forceDirection !== "vertical") {
        y1 = this.from.y;
        y2 = this.to.y;
        x1 = this.from.x - roundness * dx;
        x2 = this.to.x + roundness * dx;
      } else {
        y1 = this.from.y - roundness * dy;
        y2 = this.to.y + roundness * dy;
        x1 = this.from.x;
        x2 = this.to.x;
      }
      return [
        { x: x1, y: y1 },
        { x: x2, y: y2 }
      ];
    }
    getViaNode() {
      return this._getViaCoordinates();
    }
    _findBorderPosition(nearNode, ctx) {
      return this._findBorderPositionBezier(nearNode, ctx);
    }
    _getDistanceToEdge(x1, y1, x2, y2, x3, y3, [via1, via2] = this._getViaCoordinates()) {
      return this._getDistanceToBezierEdge2(x1, y1, x2, y2, x3, y3, via1, via2);
    }
    getPoint(position, [via1, via2] = this._getViaCoordinates()) {
      const t = position;
      const vec = [
        Math.pow(1 - t, 3),
        3 * t * Math.pow(1 - t, 2),
        3 * Math.pow(t, 2) * (1 - t),
        Math.pow(t, 3)
      ];
      const x2 = vec[0] * this.fromPoint.x + vec[1] * via1.x + vec[2] * via2.x + vec[3] * this.toPoint.x;
      const y2 = vec[0] * this.fromPoint.y + vec[1] * via1.y + vec[2] * via2.y + vec[3] * this.toPoint.y;
      return { x: x2, y: y2 };
    }
  };
  var StraightEdge = class extends EdgeBase {
    constructor(options2, body, labelModule) {
      super(options2, body, labelModule);
    }
    _line(ctx, values) {
      ctx.beginPath();
      ctx.moveTo(this.fromPoint.x, this.fromPoint.y);
      ctx.lineTo(this.toPoint.x, this.toPoint.y);
      this.enableShadow(ctx, values);
      ctx.stroke();
      this.disableShadow(ctx, values);
    }
    getViaNode() {
      return void 0;
    }
    getPoint(position) {
      return {
        x: (1 - position) * this.fromPoint.x + position * this.toPoint.x,
        y: (1 - position) * this.fromPoint.y + position * this.toPoint.y
      };
    }
    _findBorderPosition(nearNode, ctx) {
      let node1 = this.to;
      let node2 = this.from;
      if (nearNode.id === this.from.id) {
        node1 = this.from;
        node2 = this.to;
      }
      const angle = Math.atan2(node1.y - node2.y, node1.x - node2.x);
      const dx = node1.x - node2.x;
      const dy = node1.y - node2.y;
      const edgeSegmentLength = Math.sqrt(dx * dx + dy * dy);
      const toBorderDist = nearNode.distanceToBorder(ctx, angle);
      const toBorderPoint = (edgeSegmentLength - toBorderDist) / edgeSegmentLength;
      return {
        x: (1 - toBorderPoint) * node2.x + toBorderPoint * node1.x,
        y: (1 - toBorderPoint) * node2.y + toBorderPoint * node1.y,
        t: 0
      };
    }
    _getDistanceToEdge(x1, y1, x2, y2, x3, y3) {
      return this._getDistanceToLine(x1, y1, x2, y2, x3, y3);
    }
  };
  var Edge = class {
    constructor(options2, body, imagelist, globalOptions, defaultOptions) {
      if (body === void 0) {
        throw new Error("No body provided");
      }
      this.options = bridgeObject(globalOptions);
      this.globalOptions = globalOptions;
      this.defaultOptions = defaultOptions;
      this.body = body;
      this.imagelist = imagelist;
      this.id = void 0;
      this.fromId = void 0;
      this.toId = void 0;
      this.selected = false;
      this.hover = false;
      this.labelDirty = true;
      this.baseWidth = this.options.width;
      this.baseFontSize = this.options.font.size;
      this.from = void 0;
      this.to = void 0;
      this.edgeType = void 0;
      this.connected = false;
      this.labelModule = new Label(this.body, this.options, true);
      this.setOptions(options2);
    }
    setOptions(options2) {
      if (!options2) {
        return;
      }
      let affectsLayout = typeof options2.physics !== "undefined" && this.options.physics !== options2.physics || typeof options2.hidden !== "undefined" && (this.options.hidden || false) !== (options2.hidden || false) || typeof options2.from !== "undefined" && this.options.from !== options2.from || typeof options2.to !== "undefined" && this.options.to !== options2.to;
      Edge.parseOptions(this.options, options2, true, this.globalOptions);
      if (options2.id !== void 0) {
        this.id = options2.id;
      }
      if (options2.from !== void 0) {
        this.fromId = options2.from;
      }
      if (options2.to !== void 0) {
        this.toId = options2.to;
      }
      if (options2.title !== void 0) {
        this.title = options2.title;
      }
      if (options2.value !== void 0) {
        options2.value = parseFloat(options2.value);
      }
      const pile = [options2, this.options, this.defaultOptions];
      this.chooser = choosify("edge", pile);
      this.updateLabelModule(options2);
      affectsLayout = this.updateEdgeType() || affectsLayout;
      this._setInteractionWidths();
      this.connect();
      return affectsLayout;
    }
    static parseOptions(parentOptions, newOptions, allowDeletion = false, globalOptions = {}, copyFromGlobals = false) {
      const fields = [
        "endPointOffset",
        "arrowStrikethrough",
        "id",
        "from",
        "hidden",
        "hoverWidth",
        "labelHighlightBold",
        "length",
        "line",
        "opacity",
        "physics",
        "scaling",
        "selectionWidth",
        "selfReferenceSize",
        "selfReference",
        "to",
        "title",
        "value",
        "width",
        "font",
        "chosen",
        "widthConstraint"
      ];
      selectiveDeepExtend(fields, parentOptions, newOptions, allowDeletion);
      if (newOptions.endPointOffset !== void 0 && newOptions.endPointOffset.from !== void 0) {
        if (Number.isFinite(newOptions.endPointOffset.from)) {
          parentOptions.endPointOffset.from = newOptions.endPointOffset.from;
        } else {
          parentOptions.endPointOffset.from = globalOptions.endPointOffset.from !== void 0 ? globalOptions.endPointOffset.from : 0;
          console.error("endPointOffset.from is not a valid number");
        }
      }
      if (newOptions.endPointOffset !== void 0 && newOptions.endPointOffset.to !== void 0) {
        if (Number.isFinite(newOptions.endPointOffset.to)) {
          parentOptions.endPointOffset.to = newOptions.endPointOffset.to;
        } else {
          parentOptions.endPointOffset.to = globalOptions.endPointOffset.to !== void 0 ? globalOptions.endPointOffset.to : 0;
          console.error("endPointOffset.to is not a valid number");
        }
      }
      if (isValidLabel(newOptions.label)) {
        parentOptions.label = newOptions.label;
      } else if (!isValidLabel(parentOptions.label)) {
        parentOptions.label = void 0;
      }
      mergeOptions(parentOptions, newOptions, "smooth", globalOptions);
      mergeOptions(parentOptions, newOptions, "shadow", globalOptions);
      mergeOptions(parentOptions, newOptions, "background", globalOptions);
      if (newOptions.dashes !== void 0 && newOptions.dashes !== null) {
        parentOptions.dashes = newOptions.dashes;
      } else if (allowDeletion === true && newOptions.dashes === null) {
        parentOptions.dashes = Object.create(globalOptions.dashes);
      }
      if (newOptions.scaling !== void 0 && newOptions.scaling !== null) {
        if (newOptions.scaling.min !== void 0) {
          parentOptions.scaling.min = newOptions.scaling.min;
        }
        if (newOptions.scaling.max !== void 0) {
          parentOptions.scaling.max = newOptions.scaling.max;
        }
        mergeOptions(parentOptions.scaling, newOptions.scaling, "label", globalOptions.scaling);
      } else if (allowDeletion === true && newOptions.scaling === null) {
        parentOptions.scaling = Object.create(globalOptions.scaling);
      }
      if (newOptions.arrows !== void 0 && newOptions.arrows !== null) {
        if (typeof newOptions.arrows === "string") {
          const arrows = newOptions.arrows.toLowerCase();
          parentOptions.arrows.to.enabled = arrows.indexOf("to") != -1;
          parentOptions.arrows.middle.enabled = arrows.indexOf("middle") != -1;
          parentOptions.arrows.from.enabled = arrows.indexOf("from") != -1;
        } else if (typeof newOptions.arrows === "object") {
          mergeOptions(parentOptions.arrows, newOptions.arrows, "to", globalOptions.arrows);
          mergeOptions(parentOptions.arrows, newOptions.arrows, "middle", globalOptions.arrows);
          mergeOptions(parentOptions.arrows, newOptions.arrows, "from", globalOptions.arrows);
        } else {
          throw new Error("The arrow newOptions can only be an object or a string. Refer to the documentation. You used:" + JSON.stringify(newOptions.arrows));
        }
      } else if (allowDeletion === true && newOptions.arrows === null) {
        parentOptions.arrows = Object.create(globalOptions.arrows);
      }
      if (newOptions.color !== void 0 && newOptions.color !== null) {
        const fromColor = isString(newOptions.color) ? {
          color: newOptions.color,
          highlight: newOptions.color,
          hover: newOptions.color,
          inherit: false,
          opacity: 1
        } : newOptions.color;
        const toColor = parentOptions.color;
        if (copyFromGlobals) {
          deepExtend(toColor, globalOptions.color, false, allowDeletion);
        } else {
          for (const i2 in toColor) {
            if (Object.prototype.hasOwnProperty.call(toColor, i2)) {
              delete toColor[i2];
            }
          }
        }
        if (isString(toColor)) {
          toColor.color = toColor;
          toColor.highlight = toColor;
          toColor.hover = toColor;
          toColor.inherit = false;
          if (fromColor.opacity === void 0) {
            toColor.opacity = 1;
          }
        } else {
          let colorsDefined = false;
          if (fromColor.color !== void 0) {
            toColor.color = fromColor.color;
            colorsDefined = true;
          }
          if (fromColor.highlight !== void 0) {
            toColor.highlight = fromColor.highlight;
            colorsDefined = true;
          }
          if (fromColor.hover !== void 0) {
            toColor.hover = fromColor.hover;
            colorsDefined = true;
          }
          if (fromColor.inherit !== void 0) {
            toColor.inherit = fromColor.inherit;
          }
          if (fromColor.opacity !== void 0) {
            toColor.opacity = Math.min(1, Math.max(0, fromColor.opacity));
          }
          if (colorsDefined === true) {
            toColor.inherit = false;
          } else {
            if (toColor.inherit === void 0) {
              toColor.inherit = "from";
            }
          }
        }
      } else if (allowDeletion === true && newOptions.color === null) {
        parentOptions.color = bridgeObject(globalOptions.color);
      }
      if (allowDeletion === true && newOptions.font === null) {
        parentOptions.font = bridgeObject(globalOptions.font);
      }
      if (Object.prototype.hasOwnProperty.call(newOptions, "selfReferenceSize")) {
        console.warn("The selfReferenceSize property has been deprecated. Please use selfReference property instead. The selfReference can be set like thise selfReference:{size:30, angle:Math.PI / 4}");
        parentOptions.selfReference.size = newOptions.selfReferenceSize;
      }
    }
    getFormattingValues() {
      const toArrow = this.options.arrows.to === true || this.options.arrows.to.enabled === true;
      const fromArrow = this.options.arrows.from === true || this.options.arrows.from.enabled === true;
      const middleArrow = this.options.arrows.middle === true || this.options.arrows.middle.enabled === true;
      const inheritsColor = this.options.color.inherit;
      const values = {
        toArrow,
        toArrowScale: this.options.arrows.to.scaleFactor,
        toArrowType: this.options.arrows.to.type,
        toArrowSrc: this.options.arrows.to.src,
        toArrowImageWidth: this.options.arrows.to.imageWidth,
        toArrowImageHeight: this.options.arrows.to.imageHeight,
        middleArrow,
        middleArrowScale: this.options.arrows.middle.scaleFactor,
        middleArrowType: this.options.arrows.middle.type,
        middleArrowSrc: this.options.arrows.middle.src,
        middleArrowImageWidth: this.options.arrows.middle.imageWidth,
        middleArrowImageHeight: this.options.arrows.middle.imageHeight,
        fromArrow,
        fromArrowScale: this.options.arrows.from.scaleFactor,
        fromArrowType: this.options.arrows.from.type,
        fromArrowSrc: this.options.arrows.from.src,
        fromArrowImageWidth: this.options.arrows.from.imageWidth,
        fromArrowImageHeight: this.options.arrows.from.imageHeight,
        arrowStrikethrough: this.options.arrowStrikethrough,
        color: inheritsColor ? void 0 : this.options.color.color,
        inheritsColor,
        opacity: this.options.color.opacity,
        hidden: this.options.hidden,
        length: this.options.length,
        shadow: this.options.shadow.enabled,
        shadowColor: this.options.shadow.color,
        shadowSize: this.options.shadow.size,
        shadowX: this.options.shadow.x,
        shadowY: this.options.shadow.y,
        dashes: this.options.dashes,
        width: this.options.width,
        background: this.options.background.enabled,
        backgroundColor: this.options.background.color,
        backgroundSize: this.options.background.size,
        backgroundDashes: this.options.background.dashes
      };
      if (this.selected || this.hover) {
        if (this.chooser === true) {
          if (this.selected) {
            const selectedWidth = this.options.selectionWidth;
            if (typeof selectedWidth === "function") {
              values.width = selectedWidth(values.width);
            } else if (typeof selectedWidth === "number") {
              values.width += selectedWidth;
            }
            values.width = Math.max(values.width, 0.3 / this.body.view.scale);
            values.color = this.options.color.highlight;
            values.shadow = this.options.shadow.enabled;
          } else if (this.hover) {
            const hoverWidth = this.options.hoverWidth;
            if (typeof hoverWidth === "function") {
              values.width = hoverWidth(values.width);
            } else if (typeof hoverWidth === "number") {
              values.width += hoverWidth;
            }
            values.width = Math.max(values.width, 0.3 / this.body.view.scale);
            values.color = this.options.color.hover;
            values.shadow = this.options.shadow.enabled;
          }
        } else if (typeof this.chooser === "function") {
          this.chooser(values, this.options.id, this.selected, this.hover);
          if (values.color !== void 0) {
            values.inheritsColor = false;
          }
          if (values.shadow === false) {
            if (values.shadowColor !== this.options.shadow.color || values.shadowSize !== this.options.shadow.size || values.shadowX !== this.options.shadow.x || values.shadowY !== this.options.shadow.y) {
              values.shadow = true;
            }
          }
        }
      } else {
        values.shadow = this.options.shadow.enabled;
        values.width = Math.max(values.width, 0.3 / this.body.view.scale);
      }
      return values;
    }
    updateLabelModule(options2) {
      const pile = [
        options2,
        this.options,
        this.globalOptions,
        this.defaultOptions
      ];
      this.labelModule.update(this.options, pile);
      if (this.labelModule.baseSize !== void 0) {
        this.baseFontSize = this.labelModule.baseSize;
      }
    }
    updateEdgeType() {
      const smooth = this.options.smooth;
      let dataChanged = false;
      let changeInType = true;
      if (this.edgeType !== void 0) {
        if (this.edgeType instanceof BezierEdgeDynamic && smooth.enabled === true && smooth.type === "dynamic" || this.edgeType instanceof CubicBezierEdge && smooth.enabled === true && smooth.type === "cubicBezier" || this.edgeType instanceof BezierEdgeStatic && smooth.enabled === true && smooth.type !== "dynamic" && smooth.type !== "cubicBezier" || this.edgeType instanceof StraightEdge && smooth.type.enabled === false) {
          changeInType = false;
        }
        if (changeInType === true) {
          dataChanged = this.cleanup();
        }
      }
      if (changeInType === true) {
        if (smooth.enabled === true) {
          if (smooth.type === "dynamic") {
            dataChanged = true;
            this.edgeType = new BezierEdgeDynamic(this.options, this.body, this.labelModule);
          } else if (smooth.type === "cubicBezier") {
            this.edgeType = new CubicBezierEdge(this.options, this.body, this.labelModule);
          } else {
            this.edgeType = new BezierEdgeStatic(this.options, this.body, this.labelModule);
          }
        } else {
          this.edgeType = new StraightEdge(this.options, this.body, this.labelModule);
        }
      } else {
        this.edgeType.setOptions(this.options);
      }
      return dataChanged;
    }
    connect() {
      this.disconnect();
      this.from = this.body.nodes[this.fromId] || void 0;
      this.to = this.body.nodes[this.toId] || void 0;
      this.connected = this.from !== void 0 && this.to !== void 0;
      if (this.connected === true) {
        this.from.attachEdge(this);
        this.to.attachEdge(this);
      } else {
        if (this.from) {
          this.from.detachEdge(this);
        }
        if (this.to) {
          this.to.detachEdge(this);
        }
      }
      this.edgeType.connect();
    }
    disconnect() {
      if (this.from) {
        this.from.detachEdge(this);
        this.from = void 0;
      }
      if (this.to) {
        this.to.detachEdge(this);
        this.to = void 0;
      }
      this.connected = false;
    }
    getTitle() {
      return this.title;
    }
    isSelected() {
      return this.selected;
    }
    getValue() {
      return this.options.value;
    }
    setValueRange(min, max, total) {
      if (this.options.value !== void 0) {
        const scale = this.options.scaling.customScalingFunction(min, max, total, this.options.value);
        const widthDiff = this.options.scaling.max - this.options.scaling.min;
        if (this.options.scaling.label.enabled === true) {
          const fontDiff = this.options.scaling.label.max - this.options.scaling.label.min;
          this.options.font.size = this.options.scaling.label.min + scale * fontDiff;
        }
        this.options.width = this.options.scaling.min + scale * widthDiff;
      } else {
        this.options.width = this.baseWidth;
        this.options.font.size = this.baseFontSize;
      }
      this._setInteractionWidths();
      this.updateLabelModule();
    }
    _setInteractionWidths() {
      if (typeof this.options.hoverWidth === "function") {
        this.edgeType.hoverWidth = this.options.hoverWidth(this.options.width);
      } else {
        this.edgeType.hoverWidth = this.options.hoverWidth + this.options.width;
      }
      if (typeof this.options.selectionWidth === "function") {
        this.edgeType.selectionWidth = this.options.selectionWidth(this.options.width);
      } else {
        this.edgeType.selectionWidth = this.options.selectionWidth + this.options.width;
      }
    }
    draw(ctx) {
      const values = this.getFormattingValues();
      if (values.hidden) {
        return;
      }
      const viaNode = this.edgeType.getViaNode();
      this.edgeType.drawLine(ctx, values, this.selected, this.hover, viaNode);
      this.drawLabel(ctx, viaNode);
    }
    drawArrows(ctx) {
      const values = this.getFormattingValues();
      if (values.hidden) {
        return;
      }
      const viaNode = this.edgeType.getViaNode();
      const arrowData = {};
      this.edgeType.fromPoint = this.edgeType.from;
      this.edgeType.toPoint = this.edgeType.to;
      if (values.fromArrow) {
        arrowData.from = this.edgeType.getArrowData(ctx, "from", viaNode, this.selected, this.hover, values);
        if (values.arrowStrikethrough === false)
          this.edgeType.fromPoint = arrowData.from.core;
        if (values.fromArrowSrc) {
          arrowData.from.image = this.imagelist.load(values.fromArrowSrc);
        }
        if (values.fromArrowImageWidth) {
          arrowData.from.imageWidth = values.fromArrowImageWidth;
        }
        if (values.fromArrowImageHeight) {
          arrowData.from.imageHeight = values.fromArrowImageHeight;
        }
      }
      if (values.toArrow) {
        arrowData.to = this.edgeType.getArrowData(ctx, "to", viaNode, this.selected, this.hover, values);
        if (values.arrowStrikethrough === false)
          this.edgeType.toPoint = arrowData.to.core;
        if (values.toArrowSrc) {
          arrowData.to.image = this.imagelist.load(values.toArrowSrc);
        }
        if (values.toArrowImageWidth) {
          arrowData.to.imageWidth = values.toArrowImageWidth;
        }
        if (values.toArrowImageHeight) {
          arrowData.to.imageHeight = values.toArrowImageHeight;
        }
      }
      if (values.middleArrow) {
        arrowData.middle = this.edgeType.getArrowData(ctx, "middle", viaNode, this.selected, this.hover, values);
        if (values.middleArrowSrc) {
          arrowData.middle.image = this.imagelist.load(values.middleArrowSrc);
        }
        if (values.middleArrowImageWidth) {
          arrowData.middle.imageWidth = values.middleArrowImageWidth;
        }
        if (values.middleArrowImageHeight) {
          arrowData.middle.imageHeight = values.middleArrowImageHeight;
        }
      }
      if (values.fromArrow) {
        this.edgeType.drawArrowHead(ctx, values, this.selected, this.hover, arrowData.from);
      }
      if (values.middleArrow) {
        this.edgeType.drawArrowHead(ctx, values, this.selected, this.hover, arrowData.middle);
      }
      if (values.toArrow) {
        this.edgeType.drawArrowHead(ctx, values, this.selected, this.hover, arrowData.to);
      }
    }
    drawLabel(ctx, viaNode) {
      if (this.options.label !== void 0) {
        const node1 = this.from;
        const node2 = this.to;
        if (this.labelModule.differentState(this.selected, this.hover)) {
          this.labelModule.getTextSize(ctx, this.selected, this.hover);
        }
        let point;
        if (node1.id != node2.id) {
          this.labelModule.pointToSelf = false;
          point = this.edgeType.getPoint(0.5, viaNode);
          ctx.save();
          const rotationPoint = this._getRotation(ctx);
          if (rotationPoint.angle != 0) {
            ctx.translate(rotationPoint.x, rotationPoint.y);
            ctx.rotate(rotationPoint.angle);
          }
          this.labelModule.draw(ctx, point.x, point.y, this.selected, this.hover);
          ctx.restore();
        } else {
          this.labelModule.pointToSelf = true;
          const coordinates = getSelfRefCoordinates(ctx, this.options.selfReference.angle, this.options.selfReference.size, node1);
          point = this._pointOnCircle(coordinates.x, coordinates.y, this.options.selfReference.size, this.options.selfReference.angle);
          this.labelModule.draw(ctx, point.x, point.y, this.selected, this.hover);
        }
      }
    }
    getItemsOnPoint(point) {
      const ret = [];
      if (this.labelModule.visible()) {
        const rotationPoint = this._getRotation();
        if (pointInRect(this.labelModule.getSize(), point, rotationPoint)) {
          ret.push({ edgeId: this.id, labelId: 0 });
        }
      }
      const obj = {
        left: point.x,
        top: point.y
      };
      if (this.isOverlappingWith(obj)) {
        ret.push({ edgeId: this.id });
      }
      return ret;
    }
    isOverlappingWith(obj) {
      if (this.connected) {
        const distMax = 10;
        const xFrom = this.from.x;
        const yFrom = this.from.y;
        const xTo = this.to.x;
        const yTo = this.to.y;
        const xObj = obj.left;
        const yObj = obj.top;
        const dist = this.edgeType.getDistanceToEdge(xFrom, yFrom, xTo, yTo, xObj, yObj);
        return dist < distMax;
      } else {
        return false;
      }
    }
    _getRotation(ctx) {
      const viaNode = this.edgeType.getViaNode();
      const point = this.edgeType.getPoint(0.5, viaNode);
      if (ctx !== void 0) {
        this.labelModule.calculateLabelSize(ctx, this.selected, this.hover, point.x, point.y);
      }
      const ret = {
        x: point.x,
        y: this.labelModule.size.yLine,
        angle: 0
      };
      if (!this.labelModule.visible()) {
        return ret;
      }
      if (this.options.font.align === "horizontal") {
        return ret;
      }
      const dy = this.from.y - this.to.y;
      const dx = this.from.x - this.to.x;
      let angle = Math.atan2(dy, dx);
      if (angle < -1 && dx < 0 || angle > 0 && dx < 0) {
        angle += Math.PI;
      }
      ret.angle = angle;
      return ret;
    }
    _pointOnCircle(x2, y2, radius, angle) {
      return {
        x: x2 + radius * Math.cos(angle),
        y: y2 - radius * Math.sin(angle)
      };
    }
    select() {
      this.selected = true;
    }
    unselect() {
      this.selected = false;
    }
    cleanup() {
      return this.edgeType.cleanup();
    }
    remove() {
      this.cleanup();
      this.disconnect();
      delete this.body.edges[this.id];
    }
    endPointsValid() {
      return this.body.nodes[this.fromId] !== void 0 && this.body.nodes[this.toId] !== void 0;
    }
  };
  var EdgesHandler = class {
    constructor(body, images, groups) {
      this.body = body;
      this.images = images;
      this.groups = groups;
      this.body.functions.createEdge = this.create.bind(this);
      this.edgesListeners = {
        add: (event, params) => {
          this.add(params.items);
        },
        update: (event, params) => {
          this.update(params.items);
        },
        remove: (event, params) => {
          this.remove(params.items);
        }
      };
      this.options = {};
      this.defaultOptions = {
        arrows: {
          to: { enabled: false, scaleFactor: 1, type: "arrow" },
          middle: { enabled: false, scaleFactor: 1, type: "arrow" },
          from: { enabled: false, scaleFactor: 1, type: "arrow" }
        },
        endPointOffset: {
          from: 0,
          to: 0
        },
        arrowStrikethrough: true,
        color: {
          color: "#848484",
          highlight: "#848484",
          hover: "#848484",
          inherit: "from",
          opacity: 1
        },
        dashes: false,
        font: {
          color: "#343434",
          size: 14,
          face: "arial",
          background: "none",
          strokeWidth: 2,
          strokeColor: "#ffffff",
          align: "horizontal",
          multi: false,
          vadjust: 0,
          bold: {
            mod: "bold"
          },
          boldital: {
            mod: "bold italic"
          },
          ital: {
            mod: "italic"
          },
          mono: {
            mod: "",
            size: 15,
            face: "courier new",
            vadjust: 2
          }
        },
        hidden: false,
        hoverWidth: 1.5,
        label: void 0,
        labelHighlightBold: true,
        length: void 0,
        physics: true,
        scaling: {
          min: 1,
          max: 15,
          label: {
            enabled: true,
            min: 14,
            max: 30,
            maxVisible: 30,
            drawThreshold: 5
          },
          customScalingFunction: function(min, max, total, value) {
            if (max === min) {
              return 0.5;
            } else {
              const scale = 1 / (max - min);
              return Math.max(0, (value - min) * scale);
            }
          }
        },
        selectionWidth: 1.5,
        selfReference: {
          size: 20,
          angle: Math.PI / 4,
          renderBehindTheNode: true
        },
        shadow: {
          enabled: false,
          color: "rgba(0,0,0,0.5)",
          size: 10,
          x: 5,
          y: 5
        },
        background: {
          enabled: false,
          color: "rgba(111,111,111,1)",
          size: 10,
          dashes: false
        },
        smooth: {
          enabled: true,
          type: "dynamic",
          forceDirection: "none",
          roundness: 0.5
        },
        title: void 0,
        width: 1,
        value: void 0
      };
      deepExtend(this.options, this.defaultOptions);
      this.bindEventListeners();
    }
    bindEventListeners() {
      this.body.emitter.on("_forceDisableDynamicCurves", (type, emit = true) => {
        if (type === "dynamic") {
          type = "continuous";
        }
        let dataChanged = false;
        for (const edgeId in this.body.edges) {
          if (Object.prototype.hasOwnProperty.call(this.body.edges, edgeId)) {
            const edge = this.body.edges[edgeId];
            const edgeData = this.body.data.edges.get(edgeId);
            if (edgeData != null) {
              const smoothOptions = edgeData.smooth;
              if (smoothOptions !== void 0) {
                if (smoothOptions.enabled === true && smoothOptions.type === "dynamic") {
                  if (type === void 0) {
                    edge.setOptions({ smooth: false });
                  } else {
                    edge.setOptions({ smooth: { type } });
                  }
                  dataChanged = true;
                }
              }
            }
          }
        }
        if (emit === true && dataChanged === true) {
          this.body.emitter.emit("_dataChanged");
        }
      });
      this.body.emitter.on("_dataUpdated", () => {
        this.reconnectEdges();
      });
      this.body.emitter.on("refreshEdges", this.refresh.bind(this));
      this.body.emitter.on("refresh", this.refresh.bind(this));
      this.body.emitter.on("destroy", () => {
        forEach(this.edgesListeners, (callback, event) => {
          if (this.body.data.edges)
            this.body.data.edges.off(event, callback);
        });
        delete this.body.functions.createEdge;
        delete this.edgesListeners.add;
        delete this.edgesListeners.update;
        delete this.edgesListeners.remove;
        delete this.edgesListeners;
      });
    }
    setOptions(options2) {
      if (options2 !== void 0) {
        Edge.parseOptions(this.options, options2, true, this.defaultOptions, true);
        let dataChanged = false;
        if (options2.smooth !== void 0) {
          for (const edgeId in this.body.edges) {
            if (Object.prototype.hasOwnProperty.call(this.body.edges, edgeId)) {
              dataChanged = this.body.edges[edgeId].updateEdgeType() || dataChanged;
            }
          }
        }
        if (options2.font !== void 0) {
          for (const edgeId in this.body.edges) {
            if (Object.prototype.hasOwnProperty.call(this.body.edges, edgeId)) {
              this.body.edges[edgeId].updateLabelModule();
            }
          }
        }
        if (options2.hidden !== void 0 || options2.physics !== void 0 || dataChanged === true) {
          this.body.emitter.emit("_dataChanged");
        }
      }
    }
    setData(edges, doNotEmit = false) {
      const oldEdgesData = this.body.data.edges;
      if (isDataViewLike("id", edges)) {
        this.body.data.edges = edges;
      } else if (Array.isArray(edges)) {
        this.body.data.edges = new DataSet();
        this.body.data.edges.add(edges);
      } else if (!edges) {
        this.body.data.edges = new DataSet();
      } else {
        throw new TypeError("Array or DataSet expected");
      }
      if (oldEdgesData) {
        forEach(this.edgesListeners, (callback, event) => {
          oldEdgesData.off(event, callback);
        });
      }
      this.body.edges = {};
      if (this.body.data.edges) {
        forEach(this.edgesListeners, (callback, event) => {
          this.body.data.edges.on(event, callback);
        });
        const ids = this.body.data.edges.getIds();
        this.add(ids, true);
      }
      this.body.emitter.emit("_adjustEdgesForHierarchicalLayout");
      if (doNotEmit === false) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    add(ids, doNotEmit = false) {
      const edges = this.body.edges;
      const edgesData = this.body.data.edges;
      for (let i2 = 0; i2 < ids.length; i2++) {
        const id = ids[i2];
        const oldEdge = edges[id];
        if (oldEdge) {
          oldEdge.disconnect();
        }
        const data = edgesData.get(id, { showInternalIds: true });
        edges[id] = this.create(data);
      }
      this.body.emitter.emit("_adjustEdgesForHierarchicalLayout");
      if (doNotEmit === false) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    update(ids) {
      const edges = this.body.edges;
      const edgesData = this.body.data.edges;
      let dataChanged = false;
      for (let i2 = 0; i2 < ids.length; i2++) {
        const id = ids[i2];
        const data = edgesData.get(id);
        const edge = edges[id];
        if (edge !== void 0) {
          edge.disconnect();
          dataChanged = edge.setOptions(data) || dataChanged;
          edge.connect();
        } else {
          this.body.edges[id] = this.create(data);
          dataChanged = true;
        }
      }
      if (dataChanged === true) {
        this.body.emitter.emit("_adjustEdgesForHierarchicalLayout");
        this.body.emitter.emit("_dataChanged");
      } else {
        this.body.emitter.emit("_dataUpdated");
      }
    }
    remove(ids, emit = true) {
      if (ids.length === 0)
        return;
      const edges = this.body.edges;
      forEach(ids, (id) => {
        const edge = edges[id];
        if (edge !== void 0) {
          edge.remove();
        }
      });
      if (emit) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    refresh() {
      forEach(this.body.edges, (edge, edgeId) => {
        const data = this.body.data.edges.get(edgeId);
        if (data !== void 0) {
          edge.setOptions(data);
        }
      });
    }
    create(properties) {
      return new Edge(properties, this.body, this.images, this.options, this.defaultOptions);
    }
    reconnectEdges() {
      let id;
      const nodes = this.body.nodes;
      const edges = this.body.edges;
      for (id in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, id)) {
          nodes[id].edges = [];
        }
      }
      for (id in edges) {
        if (Object.prototype.hasOwnProperty.call(edges, id)) {
          const edge = edges[id];
          edge.from = null;
          edge.to = null;
          edge.connect();
        }
      }
    }
    getConnectedNodes(edgeId) {
      const nodeList = [];
      if (this.body.edges[edgeId] !== void 0) {
        const edge = this.body.edges[edgeId];
        if (edge.fromId !== void 0) {
          nodeList.push(edge.fromId);
        }
        if (edge.toId !== void 0) {
          nodeList.push(edge.toId);
        }
      }
      return nodeList;
    }
    _updateState() {
      this._addMissingEdges();
      this._removeInvalidEdges();
    }
    _removeInvalidEdges() {
      const edgesToDelete = [];
      forEach(this.body.edges, (edge, id) => {
        const toNode = this.body.nodes[edge.toId];
        const fromNode = this.body.nodes[edge.fromId];
        if (toNode !== void 0 && toNode.isCluster === true || fromNode !== void 0 && fromNode.isCluster === true) {
          return;
        }
        if (toNode === void 0 || fromNode === void 0) {
          edgesToDelete.push(id);
        }
      });
      this.remove(edgesToDelete, false);
    }
    _addMissingEdges() {
      const edgesData = this.body.data.edges;
      if (edgesData === void 0 || edgesData === null) {
        return;
      }
      const edges = this.body.edges;
      const addIds = [];
      edgesData.forEach((edgeData, edgeId) => {
        const edge = edges[edgeId];
        if (edge === void 0) {
          addIds.push(edgeId);
        }
      });
      this.add(addIds, true);
    }
  };
  var BarnesHutSolver = class {
    constructor(body, physicsBody, options2) {
      this.body = body;
      this.physicsBody = physicsBody;
      this.barnesHutTree;
      this.setOptions(options2);
      this._rng = Alea("BARNES HUT SOLVER");
    }
    setOptions(options2) {
      this.options = options2;
      this.thetaInversed = 1 / this.options.theta;
      this.overlapAvoidanceFactor = 1 - Math.max(0, Math.min(1, this.options.avoidOverlap));
    }
    solve() {
      if (this.options.gravitationalConstant !== 0 && this.physicsBody.physicsNodeIndices.length > 0) {
        let node;
        const nodes = this.body.nodes;
        const nodeIndices = this.physicsBody.physicsNodeIndices;
        const nodeCount = nodeIndices.length;
        const barnesHutTree = this._formBarnesHutTree(nodes, nodeIndices);
        this.barnesHutTree = barnesHutTree;
        for (let i2 = 0; i2 < nodeCount; i2++) {
          node = nodes[nodeIndices[i2]];
          if (node.options.mass > 0) {
            this._getForceContributions(barnesHutTree.root, node);
          }
        }
      }
    }
    _getForceContributions(parentBranch, node) {
      this._getForceContribution(parentBranch.children.NW, node);
      this._getForceContribution(parentBranch.children.NE, node);
      this._getForceContribution(parentBranch.children.SW, node);
      this._getForceContribution(parentBranch.children.SE, node);
    }
    _getForceContribution(parentBranch, node) {
      if (parentBranch.childrenCount > 0) {
        const dx = parentBranch.centerOfMass.x - node.x;
        const dy = parentBranch.centerOfMass.y - node.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance * parentBranch.calcSize > this.thetaInversed) {
          this._calculateForces(distance, dx, dy, node, parentBranch);
        } else {
          if (parentBranch.childrenCount === 4) {
            this._getForceContributions(parentBranch, node);
          } else {
            if (parentBranch.children.data.id != node.id) {
              this._calculateForces(distance, dx, dy, node, parentBranch);
            }
          }
        }
      }
    }
    _calculateForces(distance, dx, dy, node, parentBranch) {
      if (distance === 0) {
        distance = 0.1;
        dx = distance;
      }
      if (this.overlapAvoidanceFactor < 1 && node.shape.radius) {
        distance = Math.max(0.1 + this.overlapAvoidanceFactor * node.shape.radius, distance - node.shape.radius);
      }
      const gravityForce = this.options.gravitationalConstant * parentBranch.mass * node.options.mass / Math.pow(distance, 3);
      const fx = dx * gravityForce;
      const fy = dy * gravityForce;
      this.physicsBody.forces[node.id].x += fx;
      this.physicsBody.forces[node.id].y += fy;
    }
    _formBarnesHutTree(nodes, nodeIndices) {
      let node;
      const nodeCount = nodeIndices.length;
      let minX = nodes[nodeIndices[0]].x;
      let minY = nodes[nodeIndices[0]].y;
      let maxX = nodes[nodeIndices[0]].x;
      let maxY = nodes[nodeIndices[0]].y;
      for (let i2 = 1; i2 < nodeCount; i2++) {
        const node2 = nodes[nodeIndices[i2]];
        const x2 = node2.x;
        const y2 = node2.y;
        if (node2.options.mass > 0) {
          if (x2 < minX) {
            minX = x2;
          }
          if (x2 > maxX) {
            maxX = x2;
          }
          if (y2 < minY) {
            minY = y2;
          }
          if (y2 > maxY) {
            maxY = y2;
          }
        }
      }
      const sizeDiff = Math.abs(maxX - minX) - Math.abs(maxY - minY);
      if (sizeDiff > 0) {
        minY -= 0.5 * sizeDiff;
        maxY += 0.5 * sizeDiff;
      } else {
        minX += 0.5 * sizeDiff;
        maxX -= 0.5 * sizeDiff;
      }
      const minimumTreeSize = 1e-5;
      const rootSize = Math.max(minimumTreeSize, Math.abs(maxX - minX));
      const halfRootSize = 0.5 * rootSize;
      const centerX = 0.5 * (minX + maxX), centerY = 0.5 * (minY + maxY);
      const barnesHutTree = {
        root: {
          centerOfMass: { x: 0, y: 0 },
          mass: 0,
          range: {
            minX: centerX - halfRootSize,
            maxX: centerX + halfRootSize,
            minY: centerY - halfRootSize,
            maxY: centerY + halfRootSize
          },
          size: rootSize,
          calcSize: 1 / rootSize,
          children: { data: null },
          maxWidth: 0,
          level: 0,
          childrenCount: 4
        }
      };
      this._splitBranch(barnesHutTree.root);
      for (let i2 = 0; i2 < nodeCount; i2++) {
        node = nodes[nodeIndices[i2]];
        if (node.options.mass > 0) {
          this._placeInTree(barnesHutTree.root, node);
        }
      }
      return barnesHutTree;
    }
    _updateBranchMass(parentBranch, node) {
      const centerOfMass = parentBranch.centerOfMass;
      const totalMass = parentBranch.mass + node.options.mass;
      const totalMassInv = 1 / totalMass;
      centerOfMass.x = centerOfMass.x * parentBranch.mass + node.x * node.options.mass;
      centerOfMass.x *= totalMassInv;
      centerOfMass.y = centerOfMass.y * parentBranch.mass + node.y * node.options.mass;
      centerOfMass.y *= totalMassInv;
      parentBranch.mass = totalMass;
      const biggestSize = Math.max(Math.max(node.height, node.radius), node.width);
      parentBranch.maxWidth = parentBranch.maxWidth < biggestSize ? biggestSize : parentBranch.maxWidth;
    }
    _placeInTree(parentBranch, node, skipMassUpdate) {
      if (skipMassUpdate != true || skipMassUpdate === void 0) {
        this._updateBranchMass(parentBranch, node);
      }
      const range = parentBranch.children.NW.range;
      let region;
      if (range.maxX > node.x) {
        if (range.maxY > node.y) {
          region = "NW";
        } else {
          region = "SW";
        }
      } else {
        if (range.maxY > node.y) {
          region = "NE";
        } else {
          region = "SE";
        }
      }
      this._placeInRegion(parentBranch, node, region);
    }
    _placeInRegion(parentBranch, node, region) {
      const children = parentBranch.children[region];
      switch (children.childrenCount) {
        case 0:
          children.children.data = node;
          children.childrenCount = 1;
          this._updateBranchMass(children, node);
          break;
        case 1:
          if (children.children.data.x === node.x && children.children.data.y === node.y) {
            node.x += this._rng();
            node.y += this._rng();
          } else {
            this._splitBranch(children);
            this._placeInTree(children, node);
          }
          break;
        case 4:
          this._placeInTree(children, node);
          break;
      }
    }
    _splitBranch(parentBranch) {
      let containedNode = null;
      if (parentBranch.childrenCount === 1) {
        containedNode = parentBranch.children.data;
        parentBranch.mass = 0;
        parentBranch.centerOfMass.x = 0;
        parentBranch.centerOfMass.y = 0;
      }
      parentBranch.childrenCount = 4;
      parentBranch.children.data = null;
      this._insertRegion(parentBranch, "NW");
      this._insertRegion(parentBranch, "NE");
      this._insertRegion(parentBranch, "SW");
      this._insertRegion(parentBranch, "SE");
      if (containedNode != null) {
        this._placeInTree(parentBranch, containedNode);
      }
    }
    _insertRegion(parentBranch, region) {
      let minX, maxX, minY, maxY;
      const childSize = 0.5 * parentBranch.size;
      switch (region) {
        case "NW":
          minX = parentBranch.range.minX;
          maxX = parentBranch.range.minX + childSize;
          minY = parentBranch.range.minY;
          maxY = parentBranch.range.minY + childSize;
          break;
        case "NE":
          minX = parentBranch.range.minX + childSize;
          maxX = parentBranch.range.maxX;
          minY = parentBranch.range.minY;
          maxY = parentBranch.range.minY + childSize;
          break;
        case "SW":
          minX = parentBranch.range.minX;
          maxX = parentBranch.range.minX + childSize;
          minY = parentBranch.range.minY + childSize;
          maxY = parentBranch.range.maxY;
          break;
        case "SE":
          minX = parentBranch.range.minX + childSize;
          maxX = parentBranch.range.maxX;
          minY = parentBranch.range.minY + childSize;
          maxY = parentBranch.range.maxY;
          break;
      }
      parentBranch.children[region] = {
        centerOfMass: { x: 0, y: 0 },
        mass: 0,
        range: { minX, maxX, minY, maxY },
        size: 0.5 * parentBranch.size,
        calcSize: 2 * parentBranch.calcSize,
        children: { data: null },
        maxWidth: 0,
        level: parentBranch.level + 1,
        childrenCount: 0
      };
    }
    _debug(ctx, color) {
      if (this.barnesHutTree !== void 0) {
        ctx.lineWidth = 1;
        this._drawBranch(this.barnesHutTree.root, ctx, color);
      }
    }
    _drawBranch(branch, ctx, color) {
      if (color === void 0) {
        color = "#FF0000";
      }
      if (branch.childrenCount === 4) {
        this._drawBranch(branch.children.NW, ctx);
        this._drawBranch(branch.children.NE, ctx);
        this._drawBranch(branch.children.SE, ctx);
        this._drawBranch(branch.children.SW, ctx);
      }
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(branch.range.minX, branch.range.minY);
      ctx.lineTo(branch.range.maxX, branch.range.minY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(branch.range.maxX, branch.range.minY);
      ctx.lineTo(branch.range.maxX, branch.range.maxY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(branch.range.maxX, branch.range.maxY);
      ctx.lineTo(branch.range.minX, branch.range.maxY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(branch.range.minX, branch.range.maxY);
      ctx.lineTo(branch.range.minX, branch.range.minY);
      ctx.stroke();
    }
  };
  var RepulsionSolver = class {
    constructor(body, physicsBody, options2) {
      this._rng = Alea("REPULSION SOLVER");
      this.body = body;
      this.physicsBody = physicsBody;
      this.setOptions(options2);
    }
    setOptions(options2) {
      this.options = options2;
    }
    solve() {
      let dx, dy, distance, fx, fy, repulsingForce, node1, node2;
      const nodes = this.body.nodes;
      const nodeIndices = this.physicsBody.physicsNodeIndices;
      const forces = this.physicsBody.forces;
      const nodeDistance = this.options.nodeDistance;
      const a = -2 / 3 / nodeDistance;
      const b = 4 / 3;
      for (let i2 = 0; i2 < nodeIndices.length - 1; i2++) {
        node1 = nodes[nodeIndices[i2]];
        for (let j = i2 + 1; j < nodeIndices.length; j++) {
          node2 = nodes[nodeIndices[j]];
          dx = node2.x - node1.x;
          dy = node2.y - node1.y;
          distance = Math.sqrt(dx * dx + dy * dy);
          if (distance === 0) {
            distance = 0.1 * this._rng();
            dx = distance;
          }
          if (distance < 2 * nodeDistance) {
            if (distance < 0.5 * nodeDistance) {
              repulsingForce = 1;
            } else {
              repulsingForce = a * distance + b;
            }
            repulsingForce = repulsingForce / distance;
            fx = dx * repulsingForce;
            fy = dy * repulsingForce;
            forces[node1.id].x -= fx;
            forces[node1.id].y -= fy;
            forces[node2.id].x += fx;
            forces[node2.id].y += fy;
          }
        }
      }
    }
  };
  var HierarchicalRepulsionSolver = class {
    constructor(body, physicsBody, options2) {
      this.body = body;
      this.physicsBody = physicsBody;
      this.setOptions(options2);
    }
    setOptions(options2) {
      this.options = options2;
      this.overlapAvoidanceFactor = Math.max(0, Math.min(1, this.options.avoidOverlap || 0));
    }
    solve() {
      const nodes = this.body.nodes;
      const nodeIndices = this.physicsBody.physicsNodeIndices;
      const forces = this.physicsBody.forces;
      const nodeDistance = this.options.nodeDistance;
      for (let i2 = 0; i2 < nodeIndices.length - 1; i2++) {
        const node1 = nodes[nodeIndices[i2]];
        for (let j = i2 + 1; j < nodeIndices.length; j++) {
          const node2 = nodes[nodeIndices[j]];
          if (node1.level === node2.level) {
            const theseNodesDistance = nodeDistance + this.overlapAvoidanceFactor * ((node1.shape.radius || 0) / 2 + (node2.shape.radius || 0) / 2);
            const dx = node2.x - node1.x;
            const dy = node2.y - node1.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const steepness = 0.05;
            let repulsingForce;
            if (distance < theseNodesDistance) {
              repulsingForce = -Math.pow(steepness * distance, 2) + Math.pow(steepness * theseNodesDistance, 2);
            } else {
              repulsingForce = 0;
            }
            if (distance !== 0) {
              repulsingForce = repulsingForce / distance;
            }
            const fx = dx * repulsingForce;
            const fy = dy * repulsingForce;
            forces[node1.id].x -= fx;
            forces[node1.id].y -= fy;
            forces[node2.id].x += fx;
            forces[node2.id].y += fy;
          }
        }
      }
    }
  };
  var SpringSolver = class {
    constructor(body, physicsBody, options2) {
      this.body = body;
      this.physicsBody = physicsBody;
      this.setOptions(options2);
    }
    setOptions(options2) {
      this.options = options2;
    }
    solve() {
      let edgeLength, edge;
      const edgeIndices = this.physicsBody.physicsEdgeIndices;
      const edges = this.body.edges;
      let node1, node2, node3;
      for (let i2 = 0; i2 < edgeIndices.length; i2++) {
        edge = edges[edgeIndices[i2]];
        if (edge.connected === true && edge.toId !== edge.fromId) {
          if (this.body.nodes[edge.toId] !== void 0 && this.body.nodes[edge.fromId] !== void 0) {
            if (edge.edgeType.via !== void 0) {
              edgeLength = edge.options.length === void 0 ? this.options.springLength : edge.options.length;
              node1 = edge.to;
              node2 = edge.edgeType.via;
              node3 = edge.from;
              this._calculateSpringForce(node1, node2, 0.5 * edgeLength);
              this._calculateSpringForce(node2, node3, 0.5 * edgeLength);
            } else {
              edgeLength = edge.options.length === void 0 ? this.options.springLength * 1.5 : edge.options.length;
              this._calculateSpringForce(edge.from, edge.to, edgeLength);
            }
          }
        }
      }
    }
    _calculateSpringForce(node1, node2, edgeLength) {
      const dx = node1.x - node2.x;
      const dy = node1.y - node2.y;
      const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.01);
      const springForce = this.options.springConstant * (edgeLength - distance) / distance;
      const fx = dx * springForce;
      const fy = dy * springForce;
      if (this.physicsBody.forces[node1.id] !== void 0) {
        this.physicsBody.forces[node1.id].x += fx;
        this.physicsBody.forces[node1.id].y += fy;
      }
      if (this.physicsBody.forces[node2.id] !== void 0) {
        this.physicsBody.forces[node2.id].x -= fx;
        this.physicsBody.forces[node2.id].y -= fy;
      }
    }
  };
  var HierarchicalSpringSolver = class {
    constructor(body, physicsBody, options2) {
      this.body = body;
      this.physicsBody = physicsBody;
      this.setOptions(options2);
    }
    setOptions(options2) {
      this.options = options2;
    }
    solve() {
      let edgeLength, edge;
      let dx, dy, fx, fy, springForce, distance;
      const edges = this.body.edges;
      const factor = 0.5;
      const edgeIndices = this.physicsBody.physicsEdgeIndices;
      const nodeIndices = this.physicsBody.physicsNodeIndices;
      const forces = this.physicsBody.forces;
      for (let i2 = 0; i2 < nodeIndices.length; i2++) {
        const nodeId = nodeIndices[i2];
        forces[nodeId].springFx = 0;
        forces[nodeId].springFy = 0;
      }
      for (let i2 = 0; i2 < edgeIndices.length; i2++) {
        edge = edges[edgeIndices[i2]];
        if (edge.connected === true) {
          edgeLength = edge.options.length === void 0 ? this.options.springLength : edge.options.length;
          dx = edge.from.x - edge.to.x;
          dy = edge.from.y - edge.to.y;
          distance = Math.sqrt(dx * dx + dy * dy);
          distance = distance === 0 ? 0.01 : distance;
          springForce = this.options.springConstant * (edgeLength - distance) / distance;
          fx = dx * springForce;
          fy = dy * springForce;
          if (edge.to.level != edge.from.level) {
            if (forces[edge.toId] !== void 0) {
              forces[edge.toId].springFx -= fx;
              forces[edge.toId].springFy -= fy;
            }
            if (forces[edge.fromId] !== void 0) {
              forces[edge.fromId].springFx += fx;
              forces[edge.fromId].springFy += fy;
            }
          } else {
            if (forces[edge.toId] !== void 0) {
              forces[edge.toId].x -= factor * fx;
              forces[edge.toId].y -= factor * fy;
            }
            if (forces[edge.fromId] !== void 0) {
              forces[edge.fromId].x += factor * fx;
              forces[edge.fromId].y += factor * fy;
            }
          }
        }
      }
      springForce = 1;
      let springFx, springFy;
      for (let i2 = 0; i2 < nodeIndices.length; i2++) {
        const nodeId = nodeIndices[i2];
        springFx = Math.min(springForce, Math.max(-springForce, forces[nodeId].springFx));
        springFy = Math.min(springForce, Math.max(-springForce, forces[nodeId].springFy));
        forces[nodeId].x += springFx;
        forces[nodeId].y += springFy;
      }
      let totalFx = 0;
      let totalFy = 0;
      for (let i2 = 0; i2 < nodeIndices.length; i2++) {
        const nodeId = nodeIndices[i2];
        totalFx += forces[nodeId].x;
        totalFy += forces[nodeId].y;
      }
      const correctionFx = totalFx / nodeIndices.length;
      const correctionFy = totalFy / nodeIndices.length;
      for (let i2 = 0; i2 < nodeIndices.length; i2++) {
        const nodeId = nodeIndices[i2];
        forces[nodeId].x -= correctionFx;
        forces[nodeId].y -= correctionFy;
      }
    }
  };
  var CentralGravitySolver = class {
    constructor(body, physicsBody, options2) {
      this.body = body;
      this.physicsBody = physicsBody;
      this.setOptions(options2);
    }
    setOptions(options2) {
      this.options = options2;
    }
    solve() {
      let dx, dy, distance, node;
      const nodes = this.body.nodes;
      const nodeIndices = this.physicsBody.physicsNodeIndices;
      const forces = this.physicsBody.forces;
      for (let i2 = 0; i2 < nodeIndices.length; i2++) {
        const nodeId = nodeIndices[i2];
        node = nodes[nodeId];
        dx = -node.x;
        dy = -node.y;
        distance = Math.sqrt(dx * dx + dy * dy);
        this._calculateForces(distance, dx, dy, forces, node);
      }
    }
    _calculateForces(distance, dx, dy, forces, node) {
      const gravityForce = distance === 0 ? 0 : this.options.centralGravity / distance;
      forces[node.id].x = dx * gravityForce;
      forces[node.id].y = dy * gravityForce;
    }
  };
  var ForceAtlas2BasedRepulsionSolver = class extends BarnesHutSolver {
    constructor(body, physicsBody, options2) {
      super(body, physicsBody, options2);
      this._rng = Alea("FORCE ATLAS 2 BASED REPULSION SOLVER");
    }
    _calculateForces(distance, dx, dy, node, parentBranch) {
      if (distance === 0) {
        distance = 0.1 * this._rng();
        dx = distance;
      }
      if (this.overlapAvoidanceFactor < 1 && node.shape.radius) {
        distance = Math.max(0.1 + this.overlapAvoidanceFactor * node.shape.radius, distance - node.shape.radius);
      }
      const degree = node.edges.length + 1;
      const gravityForce = this.options.gravitationalConstant * parentBranch.mass * node.options.mass * degree / Math.pow(distance, 2);
      const fx = dx * gravityForce;
      const fy = dy * gravityForce;
      this.physicsBody.forces[node.id].x += fx;
      this.physicsBody.forces[node.id].y += fy;
    }
  };
  var ForceAtlas2BasedCentralGravitySolver = class extends CentralGravitySolver {
    constructor(body, physicsBody, options2) {
      super(body, physicsBody, options2);
    }
    _calculateForces(distance, dx, dy, forces, node) {
      if (distance > 0) {
        const degree = node.edges.length + 1;
        const gravityForce = this.options.centralGravity * degree * node.options.mass;
        forces[node.id].x = dx * gravityForce;
        forces[node.id].y = dy * gravityForce;
      }
    }
  };
  var PhysicsEngine = class {
    constructor(body) {
      this.body = body;
      this.physicsBody = {
        physicsNodeIndices: [],
        physicsEdgeIndices: [],
        forces: {},
        velocities: {}
      };
      this.physicsEnabled = true;
      this.simulationInterval = 1e3 / 60;
      this.requiresTimeout = true;
      this.previousStates = {};
      this.referenceState = {};
      this.freezeCache = {};
      this.renderTimer = void 0;
      this.adaptiveTimestep = false;
      this.adaptiveTimestepEnabled = false;
      this.adaptiveCounter = 0;
      this.adaptiveInterval = 3;
      this.stabilized = false;
      this.startedStabilization = false;
      this.stabilizationIterations = 0;
      this.ready = false;
      this.options = {};
      this.defaultOptions = {
        enabled: true,
        barnesHut: {
          theta: 0.5,
          gravitationalConstant: -2e3,
          centralGravity: 0.3,
          springLength: 95,
          springConstant: 0.04,
          damping: 0.09,
          avoidOverlap: 0
        },
        forceAtlas2Based: {
          theta: 0.5,
          gravitationalConstant: -50,
          centralGravity: 0.01,
          springConstant: 0.08,
          springLength: 100,
          damping: 0.4,
          avoidOverlap: 0
        },
        repulsion: {
          centralGravity: 0.2,
          springLength: 200,
          springConstant: 0.05,
          nodeDistance: 100,
          damping: 0.09,
          avoidOverlap: 0
        },
        hierarchicalRepulsion: {
          centralGravity: 0,
          springLength: 100,
          springConstant: 0.01,
          nodeDistance: 120,
          damping: 0.09
        },
        maxVelocity: 50,
        minVelocity: 0.75,
        solver: "barnesHut",
        stabilization: {
          enabled: true,
          iterations: 1e3,
          updateInterval: 50,
          onlyDynamicEdges: false,
          fit: true
        },
        timestep: 0.5,
        adaptiveTimestep: true,
        wind: { x: 0, y: 0 }
      };
      Object.assign(this.options, this.defaultOptions);
      this.timestep = 0.5;
      this.layoutFailed = false;
      this.bindEventListeners();
    }
    bindEventListeners() {
      this.body.emitter.on("initPhysics", () => {
        this.initPhysics();
      });
      this.body.emitter.on("_layoutFailed", () => {
        this.layoutFailed = true;
      });
      this.body.emitter.on("resetPhysics", () => {
        this.stopSimulation();
        this.ready = false;
      });
      this.body.emitter.on("disablePhysics", () => {
        this.physicsEnabled = false;
        this.stopSimulation();
      });
      this.body.emitter.on("restorePhysics", () => {
        this.setOptions(this.options);
        if (this.ready === true) {
          this.startSimulation();
        }
      });
      this.body.emitter.on("startSimulation", () => {
        if (this.ready === true) {
          this.startSimulation();
        }
      });
      this.body.emitter.on("stopSimulation", () => {
        this.stopSimulation();
      });
      this.body.emitter.on("destroy", () => {
        this.stopSimulation(false);
        this.body.emitter.off();
      });
      this.body.emitter.on("_dataChanged", () => {
        this.updatePhysicsData();
      });
    }
    setOptions(options2) {
      if (options2 !== void 0) {
        if (options2 === false) {
          this.options.enabled = false;
          this.physicsEnabled = false;
          this.stopSimulation();
        } else if (options2 === true) {
          this.options.enabled = true;
          this.physicsEnabled = true;
          this.startSimulation();
        } else {
          this.physicsEnabled = true;
          selectiveNotDeepExtend(["stabilization"], this.options, options2);
          mergeOptions(this.options, options2, "stabilization");
          if (options2.enabled === void 0) {
            this.options.enabled = true;
          }
          if (this.options.enabled === false) {
            this.physicsEnabled = false;
            this.stopSimulation();
          }
          const wind = this.options.wind;
          if (wind) {
            if (typeof wind.x !== "number" || Number.isNaN(wind.x)) {
              wind.x = 0;
            }
            if (typeof wind.y !== "number" || Number.isNaN(wind.y)) {
              wind.y = 0;
            }
          }
          this.timestep = this.options.timestep;
        }
      }
      this.init();
    }
    init() {
      let options2;
      if (this.options.solver === "forceAtlas2Based") {
        options2 = this.options.forceAtlas2Based;
        this.nodesSolver = new ForceAtlas2BasedRepulsionSolver(this.body, this.physicsBody, options2);
        this.edgesSolver = new SpringSolver(this.body, this.physicsBody, options2);
        this.gravitySolver = new ForceAtlas2BasedCentralGravitySolver(this.body, this.physicsBody, options2);
      } else if (this.options.solver === "repulsion") {
        options2 = this.options.repulsion;
        this.nodesSolver = new RepulsionSolver(this.body, this.physicsBody, options2);
        this.edgesSolver = new SpringSolver(this.body, this.physicsBody, options2);
        this.gravitySolver = new CentralGravitySolver(this.body, this.physicsBody, options2);
      } else if (this.options.solver === "hierarchicalRepulsion") {
        options2 = this.options.hierarchicalRepulsion;
        this.nodesSolver = new HierarchicalRepulsionSolver(this.body, this.physicsBody, options2);
        this.edgesSolver = new HierarchicalSpringSolver(this.body, this.physicsBody, options2);
        this.gravitySolver = new CentralGravitySolver(this.body, this.physicsBody, options2);
      } else {
        options2 = this.options.barnesHut;
        this.nodesSolver = new BarnesHutSolver(this.body, this.physicsBody, options2);
        this.edgesSolver = new SpringSolver(this.body, this.physicsBody, options2);
        this.gravitySolver = new CentralGravitySolver(this.body, this.physicsBody, options2);
      }
      this.modelOptions = options2;
    }
    initPhysics() {
      if (this.physicsEnabled === true && this.options.enabled === true) {
        if (this.options.stabilization.enabled === true) {
          this.stabilize();
        } else {
          this.stabilized = false;
          this.ready = true;
          this.body.emitter.emit("fit", {}, this.layoutFailed);
          this.startSimulation();
        }
      } else {
        this.ready = true;
        this.body.emitter.emit("fit");
      }
    }
    startSimulation() {
      if (this.physicsEnabled === true && this.options.enabled === true) {
        this.stabilized = false;
        this.adaptiveTimestep = false;
        this.body.emitter.emit("_resizeNodes");
        if (this.viewFunction === void 0) {
          this.viewFunction = this.simulationStep.bind(this);
          this.body.emitter.on("initRedraw", this.viewFunction);
          this.body.emitter.emit("_startRendering");
        }
      } else {
        this.body.emitter.emit("_redraw");
      }
    }
    stopSimulation(emit = true) {
      this.stabilized = true;
      if (emit === true) {
        this._emitStabilized();
      }
      if (this.viewFunction !== void 0) {
        this.body.emitter.off("initRedraw", this.viewFunction);
        this.viewFunction = void 0;
        if (emit === true) {
          this.body.emitter.emit("_stopRendering");
        }
      }
    }
    simulationStep() {
      const startTime = Date.now();
      this.physicsTick();
      const physicsTime = Date.now() - startTime;
      if ((physicsTime < 0.4 * this.simulationInterval || this.runDoubleSpeed === true) && this.stabilized === false) {
        this.physicsTick();
        this.runDoubleSpeed = true;
      }
      if (this.stabilized === true) {
        this.stopSimulation();
      }
    }
    _emitStabilized(amountOfIterations = this.stabilizationIterations) {
      if (this.stabilizationIterations > 1 || this.startedStabilization === true) {
        setTimeout(() => {
          this.body.emitter.emit("stabilized", {
            iterations: amountOfIterations
          });
          this.startedStabilization = false;
          this.stabilizationIterations = 0;
        }, 0);
      }
    }
    physicsStep() {
      this.gravitySolver.solve();
      this.nodesSolver.solve();
      this.edgesSolver.solve();
      this.moveNodes();
    }
    adjustTimeStep() {
      const factor = 1.2;
      if (this._evaluateStepQuality() === true) {
        this.timestep = factor * this.timestep;
      } else {
        if (this.timestep / factor < this.options.timestep) {
          this.timestep = this.options.timestep;
        } else {
          this.adaptiveCounter = -1;
          this.timestep = Math.max(this.options.timestep, this.timestep / factor);
        }
      }
    }
    physicsTick() {
      this._startStabilizing();
      if (this.stabilized === true)
        return;
      if (this.adaptiveTimestep === true && this.adaptiveTimestepEnabled === true) {
        const doAdaptive = this.adaptiveCounter % this.adaptiveInterval === 0;
        if (doAdaptive) {
          this.timestep = 2 * this.timestep;
          this.physicsStep();
          this.revert();
          this.timestep = 0.5 * this.timestep;
          this.physicsStep();
          this.physicsStep();
          this.adjustTimeStep();
        } else {
          this.physicsStep();
        }
        this.adaptiveCounter += 1;
      } else {
        this.timestep = this.options.timestep;
        this.physicsStep();
      }
      if (this.stabilized === true)
        this.revert();
      this.stabilizationIterations++;
    }
    updatePhysicsData() {
      this.physicsBody.forces = {};
      this.physicsBody.physicsNodeIndices = [];
      this.physicsBody.physicsEdgeIndices = [];
      const nodes = this.body.nodes;
      const edges = this.body.edges;
      for (const nodeId in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
          if (nodes[nodeId].options.physics === true) {
            this.physicsBody.physicsNodeIndices.push(nodes[nodeId].id);
          }
        }
      }
      for (const edgeId in edges) {
        if (Object.prototype.hasOwnProperty.call(edges, edgeId)) {
          if (edges[edgeId].options.physics === true) {
            this.physicsBody.physicsEdgeIndices.push(edges[edgeId].id);
          }
        }
      }
      for (let i2 = 0; i2 < this.physicsBody.physicsNodeIndices.length; i2++) {
        const nodeId = this.physicsBody.physicsNodeIndices[i2];
        this.physicsBody.forces[nodeId] = { x: 0, y: 0 };
        if (this.physicsBody.velocities[nodeId] === void 0) {
          this.physicsBody.velocities[nodeId] = { x: 0, y: 0 };
        }
      }
      for (const nodeId in this.physicsBody.velocities) {
        if (nodes[nodeId] === void 0) {
          delete this.physicsBody.velocities[nodeId];
        }
      }
    }
    revert() {
      const nodeIds = Object.keys(this.previousStates);
      const nodes = this.body.nodes;
      const velocities = this.physicsBody.velocities;
      this.referenceState = {};
      for (let i2 = 0; i2 < nodeIds.length; i2++) {
        const nodeId = nodeIds[i2];
        if (nodes[nodeId] !== void 0) {
          if (nodes[nodeId].options.physics === true) {
            this.referenceState[nodeId] = {
              positions: { x: nodes[nodeId].x, y: nodes[nodeId].y }
            };
            velocities[nodeId].x = this.previousStates[nodeId].vx;
            velocities[nodeId].y = this.previousStates[nodeId].vy;
            nodes[nodeId].x = this.previousStates[nodeId].x;
            nodes[nodeId].y = this.previousStates[nodeId].y;
          }
        } else {
          delete this.previousStates[nodeId];
        }
      }
    }
    _evaluateStepQuality() {
      let dx, dy, dpos;
      const nodes = this.body.nodes;
      const reference = this.referenceState;
      const posThreshold = 0.3;
      for (const nodeId in this.referenceState) {
        if (Object.prototype.hasOwnProperty.call(this.referenceState, nodeId) && nodes[nodeId] !== void 0) {
          dx = nodes[nodeId].x - reference[nodeId].positions.x;
          dy = nodes[nodeId].y - reference[nodeId].positions.y;
          dpos = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
          if (dpos > posThreshold) {
            return false;
          }
        }
      }
      return true;
    }
    moveNodes() {
      const nodeIndices = this.physicsBody.physicsNodeIndices;
      let maxNodeVelocity = 0;
      let averageNodeVelocity = 0;
      const velocityAdaptiveThreshold = 5;
      for (let i2 = 0; i2 < nodeIndices.length; i2++) {
        const nodeId = nodeIndices[i2];
        const nodeVelocity = this._performStep(nodeId);
        maxNodeVelocity = Math.max(maxNodeVelocity, nodeVelocity);
        averageNodeVelocity += nodeVelocity;
      }
      this.adaptiveTimestepEnabled = averageNodeVelocity / nodeIndices.length < velocityAdaptiveThreshold;
      this.stabilized = maxNodeVelocity < this.options.minVelocity;
    }
    calculateComponentVelocity(v, f, m) {
      const df = this.modelOptions.damping * v;
      const a = (f - df) / m;
      v += a * this.timestep;
      const maxV = this.options.maxVelocity || 1e9;
      if (Math.abs(v) > maxV) {
        v = v > 0 ? maxV : -maxV;
      }
      return v;
    }
    _performStep(nodeId) {
      const node = this.body.nodes[nodeId];
      const force = this.physicsBody.forces[nodeId];
      if (this.options.wind) {
        force.x += this.options.wind.x;
        force.y += this.options.wind.y;
      }
      const velocity = this.physicsBody.velocities[nodeId];
      this.previousStates[nodeId] = {
        x: node.x,
        y: node.y,
        vx: velocity.x,
        vy: velocity.y
      };
      if (node.options.fixed.x === false) {
        velocity.x = this.calculateComponentVelocity(velocity.x, force.x, node.options.mass);
        node.x += velocity.x * this.timestep;
      } else {
        force.x = 0;
        velocity.x = 0;
      }
      if (node.options.fixed.y === false) {
        velocity.y = this.calculateComponentVelocity(velocity.y, force.y, node.options.mass);
        node.y += velocity.y * this.timestep;
      } else {
        force.y = 0;
        velocity.y = 0;
      }
      const totalVelocity = Math.sqrt(Math.pow(velocity.x, 2) + Math.pow(velocity.y, 2));
      return totalVelocity;
    }
    _freezeNodes() {
      const nodes = this.body.nodes;
      for (const id in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, id)) {
          if (nodes[id].x && nodes[id].y) {
            const fixed = nodes[id].options.fixed;
            this.freezeCache[id] = { x: fixed.x, y: fixed.y };
            fixed.x = true;
            fixed.y = true;
          }
        }
      }
    }
    _restoreFrozenNodes() {
      const nodes = this.body.nodes;
      for (const id in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, id)) {
          if (this.freezeCache[id] !== void 0) {
            nodes[id].options.fixed.x = this.freezeCache[id].x;
            nodes[id].options.fixed.y = this.freezeCache[id].y;
          }
        }
      }
      this.freezeCache = {};
    }
    stabilize(iterations = this.options.stabilization.iterations) {
      if (typeof iterations !== "number") {
        iterations = this.options.stabilization.iterations;
        console.error("The stabilize method needs a numeric amount of iterations. Switching to default: ", iterations);
      }
      if (this.physicsBody.physicsNodeIndices.length === 0) {
        this.ready = true;
        return;
      }
      this.adaptiveTimestep = this.options.adaptiveTimestep;
      this.body.emitter.emit("_resizeNodes");
      this.stopSimulation();
      this.stabilized = false;
      this.body.emitter.emit("_blockRedraw");
      this.targetIterations = iterations;
      if (this.options.stabilization.onlyDynamicEdges === true) {
        this._freezeNodes();
      }
      this.stabilizationIterations = 0;
      setTimeout(() => this._stabilizationBatch(), 0);
    }
    _startStabilizing() {
      if (this.startedStabilization === true)
        return false;
      this.body.emitter.emit("startStabilizing");
      this.startedStabilization = true;
      return true;
    }
    _stabilizationBatch() {
      const running = () => this.stabilized === false && this.stabilizationIterations < this.targetIterations;
      const sendProgress = () => {
        this.body.emitter.emit("stabilizationProgress", {
          iterations: this.stabilizationIterations,
          total: this.targetIterations
        });
      };
      if (this._startStabilizing()) {
        sendProgress();
      }
      let count = 0;
      while (running() && count < this.options.stabilization.updateInterval) {
        this.physicsTick();
        count++;
      }
      sendProgress();
      if (running()) {
        setTimeout(this._stabilizationBatch.bind(this), 0);
      } else {
        this._finalizeStabilization();
      }
    }
    _finalizeStabilization() {
      this.body.emitter.emit("_allowRedraw");
      if (this.options.stabilization.fit === true) {
        this.body.emitter.emit("fit");
      }
      if (this.options.stabilization.onlyDynamicEdges === true) {
        this._restoreFrozenNodes();
      }
      this.body.emitter.emit("stabilizationIterationsDone");
      this.body.emitter.emit("_requestRedraw");
      if (this.stabilized === true) {
        this._emitStabilized();
      } else {
        this.startSimulation();
      }
      this.ready = true;
    }
    _drawForces(ctx) {
      for (let i2 = 0; i2 < this.physicsBody.physicsNodeIndices.length; i2++) {
        const index2 = this.physicsBody.physicsNodeIndices[i2];
        const node = this.body.nodes[index2];
        const force = this.physicsBody.forces[index2];
        const factor = 20;
        const colorFactor = 0.03;
        const forceSize = Math.sqrt(Math.pow(force.x, 2) + Math.pow(force.x, 2));
        const size = Math.min(Math.max(5, forceSize), 15);
        const arrowSize = 3 * size;
        const color = HSVToHex((180 - Math.min(1, Math.max(0, colorFactor * forceSize)) * 180) / 360, 1, 1);
        const point = {
          x: node.x + factor * force.x,
          y: node.y + factor * force.y
        };
        ctx.lineWidth = size;
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(point.x, point.y);
        ctx.stroke();
        const angle = Math.atan2(force.y, force.x);
        ctx.fillStyle = color;
        EndPoints.draw(ctx, {
          type: "arrow",
          point,
          angle,
          length: arrowSize
        });
        ctx.fill();
      }
    }
  };
  var NetworkUtil = class {
    constructor() {
    }
    static getRange(allNodes, specificNodes = []) {
      let minY = 1e9, maxY = -1e9, minX = 1e9, maxX = -1e9, node;
      if (specificNodes.length > 0) {
        for (let i2 = 0; i2 < specificNodes.length; i2++) {
          node = allNodes[specificNodes[i2]];
          if (minX > node.shape.boundingBox.left) {
            minX = node.shape.boundingBox.left;
          }
          if (maxX < node.shape.boundingBox.right) {
            maxX = node.shape.boundingBox.right;
          }
          if (minY > node.shape.boundingBox.top) {
            minY = node.shape.boundingBox.top;
          }
          if (maxY < node.shape.boundingBox.bottom) {
            maxY = node.shape.boundingBox.bottom;
          }
        }
      }
      if (minX === 1e9 && maxX === -1e9 && minY === 1e9 && maxY === -1e9) {
        minY = 0, maxY = 0, minX = 0, maxX = 0;
      }
      return { minX, maxX, minY, maxY };
    }
    static getRangeCore(allNodes, specificNodes = []) {
      let minY = 1e9, maxY = -1e9, minX = 1e9, maxX = -1e9, node;
      if (specificNodes.length > 0) {
        for (let i2 = 0; i2 < specificNodes.length; i2++) {
          node = allNodes[specificNodes[i2]];
          if (minX > node.x) {
            minX = node.x;
          }
          if (maxX < node.x) {
            maxX = node.x;
          }
          if (minY > node.y) {
            minY = node.y;
          }
          if (maxY < node.y) {
            maxY = node.y;
          }
        }
      }
      if (minX === 1e9 && maxX === -1e9 && minY === 1e9 && maxY === -1e9) {
        minY = 0, maxY = 0, minX = 0, maxX = 0;
      }
      return { minX, maxX, minY, maxY };
    }
    static findCenter(range) {
      return {
        x: 0.5 * (range.maxX + range.minX),
        y: 0.5 * (range.maxY + range.minY)
      };
    }
    static cloneOptions(item, type) {
      const clonedOptions = {};
      if (type === void 0 || type === "node") {
        deepExtend(clonedOptions, item.options, true);
        clonedOptions.x = item.x;
        clonedOptions.y = item.y;
        clonedOptions.amountOfConnections = item.edges.length;
      } else {
        deepExtend(clonedOptions, item.options, true);
      }
      return clonedOptions;
    }
  };
  var Cluster = class extends Node {
    constructor(options2, body, imagelist, grouplist, globalOptions, defaultOptions) {
      super(options2, body, imagelist, grouplist, globalOptions, defaultOptions);
      this.isCluster = true;
      this.containedNodes = {};
      this.containedEdges = {};
    }
    _openChildCluster(childClusterId) {
      const childCluster = this.body.nodes[childClusterId];
      if (this.containedNodes[childClusterId] === void 0) {
        throw new Error("node with id: " + childClusterId + " not in current cluster");
      }
      if (!childCluster.isCluster) {
        throw new Error("node with id: " + childClusterId + " is not a cluster");
      }
      delete this.containedNodes[childClusterId];
      forEach(childCluster.edges, (edge) => {
        delete this.containedEdges[edge.id];
      });
      forEach(childCluster.containedNodes, (node, nodeId) => {
        this.containedNodes[nodeId] = node;
      });
      childCluster.containedNodes = {};
      forEach(childCluster.containedEdges, (edge, edgeId) => {
        this.containedEdges[edgeId] = edge;
      });
      childCluster.containedEdges = {};
      forEach(childCluster.edges, (clusterEdge) => {
        forEach(this.edges, (parentClusterEdge) => {
          const index2 = parentClusterEdge.clusteringEdgeReplacingIds.indexOf(clusterEdge.id);
          if (index2 === -1)
            return;
          forEach(clusterEdge.clusteringEdgeReplacingIds, (srcId) => {
            parentClusterEdge.clusteringEdgeReplacingIds.push(srcId);
            this.body.edges[srcId].edgeReplacedById = parentClusterEdge.id;
          });
          parentClusterEdge.clusteringEdgeReplacingIds.splice(index2, 1);
        });
      });
      childCluster.edges = [];
    }
  };
  var ClusterEngine = class {
    constructor(body) {
      this.body = body;
      this.clusteredNodes = {};
      this.clusteredEdges = {};
      this.options = {};
      this.defaultOptions = {};
      Object.assign(this.options, this.defaultOptions);
      this.body.emitter.on("_resetData", () => {
        this.clusteredNodes = {};
        this.clusteredEdges = {};
      });
    }
    clusterByHubsize(hubsize, options2) {
      if (hubsize === void 0) {
        hubsize = this._getHubSize();
      } else if (typeof hubsize === "object") {
        options2 = this._checkOptions(hubsize);
        hubsize = this._getHubSize();
      }
      const nodesToCluster = [];
      for (let i2 = 0; i2 < this.body.nodeIndices.length; i2++) {
        const node = this.body.nodes[this.body.nodeIndices[i2]];
        if (node.edges.length >= hubsize) {
          nodesToCluster.push(node.id);
        }
      }
      for (let i2 = 0; i2 < nodesToCluster.length; i2++) {
        this.clusterByConnection(nodesToCluster[i2], options2, true);
      }
      this.body.emitter.emit("_dataChanged");
    }
    cluster(options2 = {}, refreshData = true) {
      if (options2.joinCondition === void 0) {
        throw new Error("Cannot call clusterByNodeData without a joinCondition function in the options.");
      }
      options2 = this._checkOptions(options2);
      const childNodesObj = {};
      const childEdgesObj = {};
      forEach(this.body.nodes, (node, nodeId) => {
        if (node.options && options2.joinCondition(node.options) === true) {
          childNodesObj[nodeId] = node;
          forEach(node.edges, (edge) => {
            if (this.clusteredEdges[edge.id] === void 0) {
              childEdgesObj[edge.id] = edge;
            }
          });
        }
      });
      this._cluster(childNodesObj, childEdgesObj, options2, refreshData);
    }
    clusterByEdgeCount(edgeCount, options2, refreshData = true) {
      options2 = this._checkOptions(options2);
      const clusters = [];
      const usedNodes = {};
      let edge, edges, relevantEdgeCount;
      for (let i2 = 0; i2 < this.body.nodeIndices.length; i2++) {
        const childNodesObj = {};
        const childEdgesObj = {};
        const nodeId = this.body.nodeIndices[i2];
        const node = this.body.nodes[nodeId];
        if (usedNodes[nodeId] === void 0) {
          relevantEdgeCount = 0;
          edges = [];
          for (let j = 0; j < node.edges.length; j++) {
            edge = node.edges[j];
            if (this.clusteredEdges[edge.id] === void 0) {
              if (edge.toId !== edge.fromId) {
                relevantEdgeCount++;
              }
              edges.push(edge);
            }
          }
          if (relevantEdgeCount === edgeCount) {
            const checkJoinCondition = function(node2) {
              if (options2.joinCondition === void 0 || options2.joinCondition === null) {
                return true;
              }
              const clonedOptions = NetworkUtil.cloneOptions(node2);
              return options2.joinCondition(clonedOptions);
            };
            let gatheringSuccessful = true;
            for (let j = 0; j < edges.length; j++) {
              edge = edges[j];
              const childNodeId = this._getConnectedId(edge, nodeId);
              if (checkJoinCondition(node)) {
                childEdgesObj[edge.id] = edge;
                childNodesObj[nodeId] = node;
                childNodesObj[childNodeId] = this.body.nodes[childNodeId];
                usedNodes[nodeId] = true;
              } else {
                gatheringSuccessful = false;
                break;
              }
            }
            if (Object.keys(childNodesObj).length > 0 && Object.keys(childEdgesObj).length > 0 && gatheringSuccessful === true) {
              const findClusterData = function() {
                for (let n = 0; n < clusters.length; ++n) {
                  for (const m in childNodesObj) {
                    if (clusters[n].nodes[m] !== void 0) {
                      return clusters[n];
                    }
                  }
                }
                return void 0;
              };
              const foundCluster = findClusterData();
              if (foundCluster !== void 0) {
                for (const m in childNodesObj) {
                  if (foundCluster.nodes[m] === void 0) {
                    foundCluster.nodes[m] = childNodesObj[m];
                  }
                }
                for (const m in childEdgesObj) {
                  if (foundCluster.edges[m] === void 0) {
                    foundCluster.edges[m] = childEdgesObj[m];
                  }
                }
              } else {
                clusters.push({ nodes: childNodesObj, edges: childEdgesObj });
              }
            }
          }
        }
      }
      for (let i2 = 0; i2 < clusters.length; i2++) {
        this._cluster(clusters[i2].nodes, clusters[i2].edges, options2, false);
      }
      if (refreshData === true) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    clusterOutliers(options2, refreshData = true) {
      this.clusterByEdgeCount(1, options2, refreshData);
    }
    clusterBridges(options2, refreshData = true) {
      this.clusterByEdgeCount(2, options2, refreshData);
    }
    clusterByConnection(nodeId, options2, refreshData = true) {
      if (nodeId === void 0) {
        throw new Error("No nodeId supplied to clusterByConnection!");
      }
      if (this.body.nodes[nodeId] === void 0) {
        throw new Error("The nodeId given to clusterByConnection does not exist!");
      }
      const node = this.body.nodes[nodeId];
      options2 = this._checkOptions(options2, node);
      if (options2.clusterNodeProperties.x === void 0) {
        options2.clusterNodeProperties.x = node.x;
      }
      if (options2.clusterNodeProperties.y === void 0) {
        options2.clusterNodeProperties.y = node.y;
      }
      if (options2.clusterNodeProperties.fixed === void 0) {
        options2.clusterNodeProperties.fixed = {};
        options2.clusterNodeProperties.fixed.x = node.options.fixed.x;
        options2.clusterNodeProperties.fixed.y = node.options.fixed.y;
      }
      const childNodesObj = {};
      const childEdgesObj = {};
      const parentNodeId = node.id;
      const parentClonedOptions = NetworkUtil.cloneOptions(node);
      childNodesObj[parentNodeId] = node;
      for (let i2 = 0; i2 < node.edges.length; i2++) {
        const edge = node.edges[i2];
        if (this.clusteredEdges[edge.id] === void 0) {
          const childNodeId = this._getConnectedId(edge, parentNodeId);
          if (this.clusteredNodes[childNodeId] === void 0) {
            if (childNodeId !== parentNodeId) {
              if (options2.joinCondition === void 0) {
                childEdgesObj[edge.id] = edge;
                childNodesObj[childNodeId] = this.body.nodes[childNodeId];
              } else {
                const childClonedOptions = NetworkUtil.cloneOptions(this.body.nodes[childNodeId]);
                if (options2.joinCondition(parentClonedOptions, childClonedOptions) === true) {
                  childEdgesObj[edge.id] = edge;
                  childNodesObj[childNodeId] = this.body.nodes[childNodeId];
                }
              }
            } else {
              childEdgesObj[edge.id] = edge;
            }
          }
        }
      }
      const childNodeIDs = Object.keys(childNodesObj).map(function(childNode) {
        return childNodesObj[childNode].id;
      });
      for (const childNodeKey in childNodesObj) {
        if (!Object.prototype.hasOwnProperty.call(childNodesObj, childNodeKey))
          continue;
        const childNode = childNodesObj[childNodeKey];
        for (let y2 = 0; y2 < childNode.edges.length; y2++) {
          const childEdge = childNode.edges[y2];
          if (childNodeIDs.indexOf(this._getConnectedId(childEdge, childNode.id)) > -1) {
            childEdgesObj[childEdge.id] = childEdge;
          }
        }
      }
      this._cluster(childNodesObj, childEdgesObj, options2, refreshData);
    }
    _createClusterEdges(childNodesObj, childEdgesObj, clusterNodeProperties, clusterEdgeProperties) {
      let edge, childNodeId, childNode, toId, fromId, otherNodeId;
      const childKeys = Object.keys(childNodesObj);
      const createEdges = [];
      for (let i2 = 0; i2 < childKeys.length; i2++) {
        childNodeId = childKeys[i2];
        childNode = childNodesObj[childNodeId];
        for (let j = 0; j < childNode.edges.length; j++) {
          edge = childNode.edges[j];
          if (this.clusteredEdges[edge.id] === void 0) {
            if (edge.toId == edge.fromId) {
              childEdgesObj[edge.id] = edge;
            } else {
              if (edge.toId == childNodeId) {
                toId = clusterNodeProperties.id;
                fromId = edge.fromId;
                otherNodeId = fromId;
              } else {
                toId = edge.toId;
                fromId = clusterNodeProperties.id;
                otherNodeId = toId;
              }
            }
            if (childNodesObj[otherNodeId] === void 0) {
              createEdges.push({ edge, fromId, toId });
            }
          }
        }
      }
      const newEdges = [];
      const getNewEdge = function(createdEdge) {
        for (let j = 0; j < newEdges.length; j++) {
          const newEdge = newEdges[j];
          const matchToDirection = createdEdge.fromId === newEdge.fromId && createdEdge.toId === newEdge.toId;
          const matchFromDirection = createdEdge.fromId === newEdge.toId && createdEdge.toId === newEdge.fromId;
          if (matchToDirection || matchFromDirection) {
            return newEdge;
          }
        }
        return null;
      };
      for (let j = 0; j < createEdges.length; j++) {
        const createdEdge = createEdges[j];
        const edge2 = createdEdge.edge;
        let newEdge = getNewEdge(createdEdge);
        if (newEdge === null) {
          newEdge = this._createClusteredEdge(createdEdge.fromId, createdEdge.toId, edge2, clusterEdgeProperties);
          newEdges.push(newEdge);
        } else {
          newEdge.clusteringEdgeReplacingIds.push(edge2.id);
        }
        this.body.edges[edge2.id].edgeReplacedById = newEdge.id;
        this._backupEdgeOptions(edge2);
        edge2.setOptions({ physics: false });
      }
    }
    _checkOptions(options2 = {}) {
      if (options2.clusterEdgeProperties === void 0) {
        options2.clusterEdgeProperties = {};
      }
      if (options2.clusterNodeProperties === void 0) {
        options2.clusterNodeProperties = {};
      }
      return options2;
    }
    _cluster(childNodesObj, childEdgesObj, options2, refreshData = true) {
      const tmpNodesToRemove = [];
      for (const nodeId in childNodesObj) {
        if (Object.prototype.hasOwnProperty.call(childNodesObj, nodeId)) {
          if (this.clusteredNodes[nodeId] !== void 0) {
            tmpNodesToRemove.push(nodeId);
          }
        }
      }
      for (let n = 0; n < tmpNodesToRemove.length; ++n) {
        delete childNodesObj[tmpNodesToRemove[n]];
      }
      if (Object.keys(childNodesObj).length == 0) {
        return;
      }
      if (Object.keys(childNodesObj).length == 1 && options2.clusterNodeProperties.allowSingleNodeCluster != true) {
        return;
      }
      let clusterNodeProperties = deepExtend({}, options2.clusterNodeProperties);
      if (options2.processProperties !== void 0) {
        const childNodesOptions = [];
        for (const nodeId in childNodesObj) {
          if (Object.prototype.hasOwnProperty.call(childNodesObj, nodeId)) {
            const clonedOptions = NetworkUtil.cloneOptions(childNodesObj[nodeId]);
            childNodesOptions.push(clonedOptions);
          }
        }
        const childEdgesOptions = [];
        for (const edgeId in childEdgesObj) {
          if (Object.prototype.hasOwnProperty.call(childEdgesObj, edgeId)) {
            if (edgeId.substr(0, 12) !== "clusterEdge:") {
              const clonedOptions = NetworkUtil.cloneOptions(childEdgesObj[edgeId], "edge");
              childEdgesOptions.push(clonedOptions);
            }
          }
        }
        clusterNodeProperties = options2.processProperties(clusterNodeProperties, childNodesOptions, childEdgesOptions);
        if (!clusterNodeProperties) {
          throw new Error("The processProperties function does not return properties!");
        }
      }
      if (clusterNodeProperties.id === void 0) {
        clusterNodeProperties.id = "cluster:" + v4_default();
      }
      const clusterId = clusterNodeProperties.id;
      if (clusterNodeProperties.label === void 0) {
        clusterNodeProperties.label = "cluster";
      }
      let pos2 = void 0;
      if (clusterNodeProperties.x === void 0) {
        pos2 = this._getClusterPosition(childNodesObj);
        clusterNodeProperties.x = pos2.x;
      }
      if (clusterNodeProperties.y === void 0) {
        if (pos2 === void 0) {
          pos2 = this._getClusterPosition(childNodesObj);
        }
        clusterNodeProperties.y = pos2.y;
      }
      clusterNodeProperties.id = clusterId;
      const clusterNode = this.body.functions.createNode(clusterNodeProperties, Cluster);
      clusterNode.containedNodes = childNodesObj;
      clusterNode.containedEdges = childEdgesObj;
      clusterNode.clusterEdgeProperties = options2.clusterEdgeProperties;
      this.body.nodes[clusterNodeProperties.id] = clusterNode;
      this._clusterEdges(childNodesObj, childEdgesObj, clusterNodeProperties, options2.clusterEdgeProperties);
      clusterNodeProperties.id = void 0;
      if (refreshData === true) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    _backupEdgeOptions(edge) {
      if (this.clusteredEdges[edge.id] === void 0) {
        this.clusteredEdges[edge.id] = { physics: edge.options.physics };
      }
    }
    _restoreEdge(edge) {
      const originalOptions = this.clusteredEdges[edge.id];
      if (originalOptions !== void 0) {
        edge.setOptions({ physics: originalOptions.physics });
        delete this.clusteredEdges[edge.id];
      }
    }
    isCluster(nodeId) {
      if (this.body.nodes[nodeId] !== void 0) {
        return this.body.nodes[nodeId].isCluster === true;
      } else {
        console.error("Node does not exist.");
        return false;
      }
    }
    _getClusterPosition(childNodesObj) {
      const childKeys = Object.keys(childNodesObj);
      let minX = childNodesObj[childKeys[0]].x;
      let maxX = childNodesObj[childKeys[0]].x;
      let minY = childNodesObj[childKeys[0]].y;
      let maxY = childNodesObj[childKeys[0]].y;
      let node;
      for (let i2 = 1; i2 < childKeys.length; i2++) {
        node = childNodesObj[childKeys[i2]];
        minX = node.x < minX ? node.x : minX;
        maxX = node.x > maxX ? node.x : maxX;
        minY = node.y < minY ? node.y : minY;
        maxY = node.y > maxY ? node.y : maxY;
      }
      return { x: 0.5 * (minX + maxX), y: 0.5 * (minY + maxY) };
    }
    openCluster(clusterNodeId, options2, refreshData = true) {
      if (clusterNodeId === void 0) {
        throw new Error("No clusterNodeId supplied to openCluster.");
      }
      const clusterNode = this.body.nodes[clusterNodeId];
      if (clusterNode === void 0) {
        throw new Error("The clusterNodeId supplied to openCluster does not exist.");
      }
      if (clusterNode.isCluster !== true || clusterNode.containedNodes === void 0 || clusterNode.containedEdges === void 0) {
        throw new Error("The node:" + clusterNodeId + " is not a valid cluster.");
      }
      const stack = this.findNode(clusterNodeId);
      const parentIndex = stack.indexOf(clusterNodeId) - 1;
      if (parentIndex >= 0) {
        const parentClusterNodeId = stack[parentIndex];
        const parentClusterNode = this.body.nodes[parentClusterNodeId];
        parentClusterNode._openChildCluster(clusterNodeId);
        delete this.body.nodes[clusterNodeId];
        if (refreshData === true) {
          this.body.emitter.emit("_dataChanged");
        }
        return;
      }
      const containedNodes = clusterNode.containedNodes;
      const containedEdges = clusterNode.containedEdges;
      if (options2 !== void 0 && options2.releaseFunction !== void 0 && typeof options2.releaseFunction === "function") {
        const positions = {};
        const clusterPosition = { x: clusterNode.x, y: clusterNode.y };
        for (const nodeId in containedNodes) {
          if (Object.prototype.hasOwnProperty.call(containedNodes, nodeId)) {
            const containedNode = this.body.nodes[nodeId];
            positions[nodeId] = { x: containedNode.x, y: containedNode.y };
          }
        }
        const newPositions = options2.releaseFunction(clusterPosition, positions);
        for (const nodeId in containedNodes) {
          if (Object.prototype.hasOwnProperty.call(containedNodes, nodeId)) {
            const containedNode = this.body.nodes[nodeId];
            if (newPositions[nodeId] !== void 0) {
              containedNode.x = newPositions[nodeId].x === void 0 ? clusterNode.x : newPositions[nodeId].x;
              containedNode.y = newPositions[nodeId].y === void 0 ? clusterNode.y : newPositions[nodeId].y;
            }
          }
        }
      } else {
        forEach(containedNodes, function(containedNode) {
          if (containedNode.options.fixed.x === false) {
            containedNode.x = clusterNode.x;
          }
          if (containedNode.options.fixed.y === false) {
            containedNode.y = clusterNode.y;
          }
        });
      }
      for (const nodeId in containedNodes) {
        if (Object.prototype.hasOwnProperty.call(containedNodes, nodeId)) {
          const containedNode = this.body.nodes[nodeId];
          containedNode.vx = clusterNode.vx;
          containedNode.vy = clusterNode.vy;
          containedNode.setOptions({ physics: true });
          delete this.clusteredNodes[nodeId];
        }
      }
      const edgesToBeDeleted = [];
      for (let i2 = 0; i2 < clusterNode.edges.length; i2++) {
        edgesToBeDeleted.push(clusterNode.edges[i2]);
      }
      for (let i2 = 0; i2 < edgesToBeDeleted.length; i2++) {
        const edge = edgesToBeDeleted[i2];
        const otherNodeId = this._getConnectedId(edge, clusterNodeId);
        const otherNode = this.clusteredNodes[otherNodeId];
        for (let j = 0; j < edge.clusteringEdgeReplacingIds.length; j++) {
          const transferId = edge.clusteringEdgeReplacingIds[j];
          const transferEdge = this.body.edges[transferId];
          if (transferEdge === void 0)
            continue;
          if (otherNode !== void 0) {
            const otherCluster = this.body.nodes[otherNode.clusterId];
            otherCluster.containedEdges[transferEdge.id] = transferEdge;
            delete containedEdges[transferEdge.id];
            let fromId = transferEdge.fromId;
            let toId = transferEdge.toId;
            if (transferEdge.toId == otherNodeId) {
              toId = otherNode.clusterId;
            } else {
              fromId = otherNode.clusterId;
            }
            this._createClusteredEdge(fromId, toId, transferEdge, otherCluster.clusterEdgeProperties, { hidden: false, physics: true });
          } else {
            this._restoreEdge(transferEdge);
          }
        }
        edge.remove();
      }
      for (const edgeId in containedEdges) {
        if (Object.prototype.hasOwnProperty.call(containedEdges, edgeId)) {
          this._restoreEdge(containedEdges[edgeId]);
        }
      }
      delete this.body.nodes[clusterNodeId];
      if (refreshData === true) {
        this.body.emitter.emit("_dataChanged");
      }
    }
    getNodesInCluster(clusterId) {
      const nodesArray = [];
      if (this.isCluster(clusterId) === true) {
        const containedNodes = this.body.nodes[clusterId].containedNodes;
        for (const nodeId in containedNodes) {
          if (Object.prototype.hasOwnProperty.call(containedNodes, nodeId)) {
            nodesArray.push(this.body.nodes[nodeId].id);
          }
        }
      }
      return nodesArray;
    }
    findNode(nodeId) {
      const stack = [];
      const max = 100;
      let counter = 0;
      let node;
      while (this.clusteredNodes[nodeId] !== void 0 && counter < max) {
        node = this.body.nodes[nodeId];
        if (node === void 0)
          return [];
        stack.push(node.id);
        nodeId = this.clusteredNodes[nodeId].clusterId;
        counter++;
      }
      node = this.body.nodes[nodeId];
      if (node === void 0)
        return [];
      stack.push(node.id);
      stack.reverse();
      return stack;
    }
    updateClusteredNode(clusteredNodeId, newOptions) {
      if (clusteredNodeId === void 0) {
        throw new Error("No clusteredNodeId supplied to updateClusteredNode.");
      }
      if (newOptions === void 0) {
        throw new Error("No newOptions supplied to updateClusteredNode.");
      }
      if (this.body.nodes[clusteredNodeId] === void 0) {
        throw new Error("The clusteredNodeId supplied to updateClusteredNode does not exist.");
      }
      this.body.nodes[clusteredNodeId].setOptions(newOptions);
      this.body.emitter.emit("_dataChanged");
    }
    updateEdge(startEdgeId, newOptions) {
      if (startEdgeId === void 0) {
        throw new Error("No startEdgeId supplied to updateEdge.");
      }
      if (newOptions === void 0) {
        throw new Error("No newOptions supplied to updateEdge.");
      }
      if (this.body.edges[startEdgeId] === void 0) {
        throw new Error("The startEdgeId supplied to updateEdge does not exist.");
      }
      const allEdgeIds = this.getClusteredEdges(startEdgeId);
      for (let i2 = 0; i2 < allEdgeIds.length; i2++) {
        const edge = this.body.edges[allEdgeIds[i2]];
        edge.setOptions(newOptions);
      }
      this.body.emitter.emit("_dataChanged");
    }
    getClusteredEdges(edgeId) {
      const stack = [];
      const max = 100;
      let counter = 0;
      while (edgeId !== void 0 && this.body.edges[edgeId] !== void 0 && counter < max) {
        stack.push(this.body.edges[edgeId].id);
        edgeId = this.body.edges[edgeId].edgeReplacedById;
        counter++;
      }
      stack.reverse();
      return stack;
    }
    getBaseEdge(clusteredEdgeId) {
      return this.getBaseEdges(clusteredEdgeId)[0];
    }
    getBaseEdges(clusteredEdgeId) {
      const IdsToHandle = [clusteredEdgeId];
      const doneIds = [];
      const foundIds = [];
      const max = 100;
      let counter = 0;
      while (IdsToHandle.length > 0 && counter < max) {
        const nextId = IdsToHandle.pop();
        if (nextId === void 0)
          continue;
        const nextEdge = this.body.edges[nextId];
        if (nextEdge === void 0)
          continue;
        counter++;
        const replacingIds = nextEdge.clusteringEdgeReplacingIds;
        if (replacingIds === void 0) {
          foundIds.push(nextId);
        } else {
          for (let i2 = 0; i2 < replacingIds.length; ++i2) {
            const replacingId = replacingIds[i2];
            if (IdsToHandle.indexOf(replacingIds) !== -1 || doneIds.indexOf(replacingIds) !== -1) {
              continue;
            }
            IdsToHandle.push(replacingId);
          }
        }
        doneIds.push(nextId);
      }
      return foundIds;
    }
    _getConnectedId(edge, nodeId) {
      if (edge.toId != nodeId) {
        return edge.toId;
      } else if (edge.fromId != nodeId) {
        return edge.fromId;
      } else {
        return edge.fromId;
      }
    }
    _getHubSize() {
      let average = 0;
      let averageSquared = 0;
      let hubCounter = 0;
      let largestHub = 0;
      for (let i2 = 0; i2 < this.body.nodeIndices.length; i2++) {
        const node = this.body.nodes[this.body.nodeIndices[i2]];
        if (node.edges.length > largestHub) {
          largestHub = node.edges.length;
        }
        average += node.edges.length;
        averageSquared += Math.pow(node.edges.length, 2);
        hubCounter += 1;
      }
      average = average / hubCounter;
      averageSquared = averageSquared / hubCounter;
      const variance = averageSquared - Math.pow(average, 2);
      const standardDeviation = Math.sqrt(variance);
      let hubThreshold = Math.floor(average + 2 * standardDeviation);
      if (hubThreshold > largestHub) {
        hubThreshold = largestHub;
      }
      return hubThreshold;
    }
    _createClusteredEdge(fromId, toId, baseEdge, clusterEdgeProperties, extraOptions) {
      const clonedOptions = NetworkUtil.cloneOptions(baseEdge, "edge");
      deepExtend(clonedOptions, clusterEdgeProperties);
      clonedOptions.from = fromId;
      clonedOptions.to = toId;
      clonedOptions.id = "clusterEdge:" + v4_default();
      if (extraOptions !== void 0) {
        deepExtend(clonedOptions, extraOptions);
      }
      const newEdge = this.body.functions.createEdge(clonedOptions);
      newEdge.clusteringEdgeReplacingIds = [baseEdge.id];
      newEdge.connect();
      this.body.edges[newEdge.id] = newEdge;
      return newEdge;
    }
    _clusterEdges(childNodes, childEdges, clusterNode, clusterEdgeProperties) {
      if (childEdges instanceof Edge) {
        const edge = childEdges;
        const obj = {};
        obj[edge.id] = edge;
        childEdges = obj;
      }
      if (childNodes instanceof Node) {
        const node = childNodes;
        const obj = {};
        obj[node.id] = node;
        childNodes = obj;
      }
      if (clusterNode === void 0 || clusterNode === null) {
        throw new Error("_clusterEdges: parameter clusterNode required");
      }
      if (clusterEdgeProperties === void 0) {
        clusterEdgeProperties = clusterNode.clusterEdgeProperties;
      }
      this._createClusterEdges(childNodes, childEdges, clusterNode, clusterEdgeProperties);
      for (const edgeId in childEdges) {
        if (Object.prototype.hasOwnProperty.call(childEdges, edgeId)) {
          if (this.body.edges[edgeId] !== void 0) {
            const edge = this.body.edges[edgeId];
            this._backupEdgeOptions(edge);
            edge.setOptions({ physics: false });
          }
        }
      }
      for (const nodeId in childNodes) {
        if (Object.prototype.hasOwnProperty.call(childNodes, nodeId)) {
          this.clusteredNodes[nodeId] = {
            clusterId: clusterNode.id,
            node: this.body.nodes[nodeId]
          };
          this.body.nodes[nodeId].setOptions({ physics: false });
        }
      }
    }
    _getClusterNodeForNode(nodeId) {
      if (nodeId === void 0)
        return void 0;
      const clusteredNode = this.clusteredNodes[nodeId];
      if (clusteredNode === void 0)
        return void 0;
      const clusterId = clusteredNode.clusterId;
      if (clusterId === void 0)
        return void 0;
      return this.body.nodes[clusterId];
    }
    _filter(arr, callback) {
      const ret = [];
      forEach(arr, (item) => {
        if (callback(item)) {
          ret.push(item);
        }
      });
      return ret;
    }
    _updateState() {
      let nodeId;
      const deletedNodeIds = [];
      const deletedEdgeIds = {};
      const eachClusterNode = (callback) => {
        forEach(this.body.nodes, (node) => {
          if (node.isCluster === true) {
            callback(node);
          }
        });
      };
      for (nodeId in this.clusteredNodes) {
        if (!Object.prototype.hasOwnProperty.call(this.clusteredNodes, nodeId))
          continue;
        const node = this.body.nodes[nodeId];
        if (node === void 0) {
          deletedNodeIds.push(nodeId);
        }
      }
      eachClusterNode(function(clusterNode) {
        for (let n = 0; n < deletedNodeIds.length; n++) {
          delete clusterNode.containedNodes[deletedNodeIds[n]];
        }
      });
      for (let n = 0; n < deletedNodeIds.length; n++) {
        delete this.clusteredNodes[deletedNodeIds[n]];
      }
      forEach(this.clusteredEdges, (edgeId) => {
        const edge = this.body.edges[edgeId];
        if (edge === void 0 || !edge.endPointsValid()) {
          deletedEdgeIds[edgeId] = edgeId;
        }
      });
      eachClusterNode(function(clusterNode) {
        forEach(clusterNode.containedEdges, (edge, edgeId) => {
          if (!edge.endPointsValid() && !deletedEdgeIds[edgeId]) {
            deletedEdgeIds[edgeId] = edgeId;
          }
        });
      });
      forEach(this.body.edges, (edge, edgeId) => {
        let isValid = true;
        const replacedIds = edge.clusteringEdgeReplacingIds;
        if (replacedIds !== void 0) {
          let numValid = 0;
          forEach(replacedIds, (containedEdgeId) => {
            const containedEdge = this.body.edges[containedEdgeId];
            if (containedEdge !== void 0 && containedEdge.endPointsValid()) {
              numValid += 1;
            }
          });
          isValid = numValid > 0;
        }
        if (!edge.endPointsValid() || !isValid) {
          deletedEdgeIds[edgeId] = edgeId;
        }
      });
      eachClusterNode((clusterNode) => {
        forEach(deletedEdgeIds, (deletedEdgeId) => {
          delete clusterNode.containedEdges[deletedEdgeId];
          forEach(clusterNode.edges, (edge, m) => {
            if (edge.id === deletedEdgeId) {
              clusterNode.edges[m] = null;
              return;
            }
            edge.clusteringEdgeReplacingIds = this._filter(edge.clusteringEdgeReplacingIds, function(id) {
              return !deletedEdgeIds[id];
            });
          });
          clusterNode.edges = this._filter(clusterNode.edges, function(item) {
            return item !== null;
          });
        });
      });
      forEach(deletedEdgeIds, (edgeId) => {
        delete this.clusteredEdges[edgeId];
      });
      forEach(deletedEdgeIds, (edgeId) => {
        delete this.body.edges[edgeId];
      });
      const ids = Object.keys(this.body.edges);
      forEach(ids, (edgeId) => {
        const edge = this.body.edges[edgeId];
        const shouldBeClustered = this._isClusteredNode(edge.fromId) || this._isClusteredNode(edge.toId);
        if (shouldBeClustered === this._isClusteredEdge(edge.id)) {
          return;
        }
        if (shouldBeClustered) {
          const clusterFrom = this._getClusterNodeForNode(edge.fromId);
          if (clusterFrom !== void 0) {
            this._clusterEdges(this.body.nodes[edge.fromId], edge, clusterFrom);
          }
          const clusterTo = this._getClusterNodeForNode(edge.toId);
          if (clusterTo !== void 0) {
            this._clusterEdges(this.body.nodes[edge.toId], edge, clusterTo);
          }
        } else {
          delete this._clusterEdges[edgeId];
          this._restoreEdge(edge);
        }
      });
      let changed = false;
      let continueLoop = true;
      while (continueLoop) {
        const clustersToOpen = [];
        eachClusterNode(function(clusterNode) {
          const numNodes = Object.keys(clusterNode.containedNodes).length;
          const allowSingle = clusterNode.options.allowSingleNodeCluster === true;
          if (allowSingle && numNodes < 1 || !allowSingle && numNodes < 2) {
            clustersToOpen.push(clusterNode.id);
          }
        });
        for (let n = 0; n < clustersToOpen.length; ++n) {
          this.openCluster(clustersToOpen[n], {}, false);
        }
        continueLoop = clustersToOpen.length > 0;
        changed = changed || continueLoop;
      }
      if (changed) {
        this._updateState();
      }
    }
    _isClusteredNode(nodeId) {
      return this.clusteredNodes[nodeId] !== void 0;
    }
    _isClusteredEdge(edgeId) {
      return this.clusteredEdges[edgeId] !== void 0;
    }
  };
  function _initRequestAnimationFrame() {
    let func;
    if (window !== void 0) {
      func = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    }
    if (func === void 0) {
      window.requestAnimationFrame = function(callback) {
        callback();
      };
    } else {
      window.requestAnimationFrame = func;
    }
  }
  var CanvasRenderer = class {
    constructor(body, canvas) {
      _initRequestAnimationFrame();
      this.body = body;
      this.canvas = canvas;
      this.redrawRequested = false;
      this.renderTimer = void 0;
      this.requiresTimeout = true;
      this.renderingActive = false;
      this.renderRequests = 0;
      this.allowRedraw = true;
      this.dragging = false;
      this.zooming = false;
      this.options = {};
      this.defaultOptions = {
        hideEdgesOnDrag: false,
        hideEdgesOnZoom: false,
        hideNodesOnDrag: false
      };
      Object.assign(this.options, this.defaultOptions);
      this._determineBrowserMethod();
      this.bindEventListeners();
    }
    bindEventListeners() {
      this.body.emitter.on("dragStart", () => {
        this.dragging = true;
      });
      this.body.emitter.on("dragEnd", () => {
        this.dragging = false;
      });
      this.body.emitter.on("zoom", () => {
        this.zooming = true;
        window.clearTimeout(this.zoomTimeoutId);
        this.zoomTimeoutId = window.setTimeout(() => {
          this.zooming = false;
          this._requestRedraw.bind(this)();
        }, 250);
      });
      this.body.emitter.on("_resizeNodes", () => {
        this._resizeNodes();
      });
      this.body.emitter.on("_redraw", () => {
        if (this.renderingActive === false) {
          this._redraw();
        }
      });
      this.body.emitter.on("_blockRedraw", () => {
        this.allowRedraw = false;
      });
      this.body.emitter.on("_allowRedraw", () => {
        this.allowRedraw = true;
        this.redrawRequested = false;
      });
      this.body.emitter.on("_requestRedraw", this._requestRedraw.bind(this));
      this.body.emitter.on("_startRendering", () => {
        this.renderRequests += 1;
        this.renderingActive = true;
        this._startRendering();
      });
      this.body.emitter.on("_stopRendering", () => {
        this.renderRequests -= 1;
        this.renderingActive = this.renderRequests > 0;
        this.renderTimer = void 0;
      });
      this.body.emitter.on("destroy", () => {
        this.renderRequests = 0;
        this.allowRedraw = false;
        this.renderingActive = false;
        if (this.requiresTimeout === true) {
          clearTimeout(this.renderTimer);
        } else {
          window.cancelAnimationFrame(this.renderTimer);
        }
        this.body.emitter.off();
      });
    }
    setOptions(options2) {
      if (options2 !== void 0) {
        const fields = ["hideEdgesOnDrag", "hideEdgesOnZoom", "hideNodesOnDrag"];
        selectiveDeepExtend(fields, this.options, options2);
      }
    }
    _requestNextFrame(callback, delay) {
      if (typeof window === "undefined")
        return;
      let timer;
      const myWindow = window;
      if (this.requiresTimeout === true) {
        timer = myWindow.setTimeout(callback, delay);
      } else {
        if (myWindow.requestAnimationFrame) {
          timer = myWindow.requestAnimationFrame(callback);
        }
      }
      return timer;
    }
    _startRendering() {
      if (this.renderingActive === true) {
        if (this.renderTimer === void 0) {
          this.renderTimer = this._requestNextFrame(this._renderStep.bind(this), this.simulationInterval);
        }
      }
    }
    _renderStep() {
      if (this.renderingActive === true) {
        this.renderTimer = void 0;
        if (this.requiresTimeout === true) {
          this._startRendering();
        }
        this._redraw();
        if (this.requiresTimeout === false) {
          this._startRendering();
        }
      }
    }
    redraw() {
      this.body.emitter.emit("setSize");
      this._redraw();
    }
    _requestRedraw() {
      if (this.redrawRequested !== true && this.renderingActive === false && this.allowRedraw === true) {
        this.redrawRequested = true;
        this._requestNextFrame(() => {
          this._redraw(false);
        }, 0);
      }
    }
    _redraw(hidden = false) {
      if (this.allowRedraw === true) {
        this.body.emitter.emit("initRedraw");
        this.redrawRequested = false;
        const drawLater = {
          drawExternalLabels: null
        };
        if (this.canvas.frame.canvas.width === 0 || this.canvas.frame.canvas.height === 0) {
          this.canvas.setSize();
        }
        this.canvas.setTransform();
        const ctx = this.canvas.getContext();
        const w = this.canvas.frame.canvas.clientWidth;
        const h = this.canvas.frame.canvas.clientHeight;
        ctx.clearRect(0, 0, w, h);
        if (this.canvas.frame.clientWidth === 0) {
          return;
        }
        ctx.save();
        ctx.translate(this.body.view.translation.x, this.body.view.translation.y);
        ctx.scale(this.body.view.scale, this.body.view.scale);
        ctx.beginPath();
        this.body.emitter.emit("beforeDrawing", ctx);
        ctx.closePath();
        if (hidden === false) {
          if ((this.dragging === false || this.dragging === true && this.options.hideEdgesOnDrag === false) && (this.zooming === false || this.zooming === true && this.options.hideEdgesOnZoom === false)) {
            this._drawEdges(ctx);
          }
        }
        if (this.dragging === false || this.dragging === true && this.options.hideNodesOnDrag === false) {
          const { drawExternalLabels } = this._drawNodes(ctx, hidden);
          drawLater.drawExternalLabels = drawExternalLabels;
        }
        if (hidden === false) {
          if ((this.dragging === false || this.dragging === true && this.options.hideEdgesOnDrag === false) && (this.zooming === false || this.zooming === true && this.options.hideEdgesOnZoom === false)) {
            this._drawArrows(ctx);
          }
        }
        if (drawLater.drawExternalLabels != null) {
          drawLater.drawExternalLabels();
        }
        if (hidden === false) {
          this._drawSelectionBox(ctx);
        }
        ctx.beginPath();
        this.body.emitter.emit("afterDrawing", ctx);
        ctx.closePath();
        ctx.restore();
        if (hidden === true) {
          ctx.clearRect(0, 0, w, h);
        }
      }
    }
    _resizeNodes() {
      this.canvas.setTransform();
      const ctx = this.canvas.getContext();
      ctx.save();
      ctx.translate(this.body.view.translation.x, this.body.view.translation.y);
      ctx.scale(this.body.view.scale, this.body.view.scale);
      const nodes = this.body.nodes;
      let node;
      for (const nodeId in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
          node = nodes[nodeId];
          node.resize(ctx);
          node.updateBoundingBox(ctx, node.selected);
        }
      }
      ctx.restore();
    }
    _drawNodes(ctx, alwaysShow = false) {
      const nodes = this.body.nodes;
      const nodeIndices = this.body.nodeIndices;
      let node;
      const selected = [];
      const hovered = [];
      const margin = 20;
      const topLeft = this.canvas.DOMtoCanvas({ x: -margin, y: -margin });
      const bottomRight = this.canvas.DOMtoCanvas({
        x: this.canvas.frame.canvas.clientWidth + margin,
        y: this.canvas.frame.canvas.clientHeight + margin
      });
      const viewableArea = {
        top: topLeft.y,
        left: topLeft.x,
        bottom: bottomRight.y,
        right: bottomRight.x
      };
      const drawExternalLabels = [];
      for (let i3 = 0; i3 < nodeIndices.length; i3++) {
        node = nodes[nodeIndices[i3]];
        if (node.hover) {
          hovered.push(nodeIndices[i3]);
        } else if (node.isSelected()) {
          selected.push(nodeIndices[i3]);
        } else {
          if (alwaysShow === true) {
            const drawLater = node.draw(ctx);
            if (drawLater.drawExternalLabel != null) {
              drawExternalLabels.push(drawLater.drawExternalLabel);
            }
          } else if (node.isBoundingBoxOverlappingWith(viewableArea) === true) {
            const drawLater = node.draw(ctx);
            if (drawLater.drawExternalLabel != null) {
              drawExternalLabels.push(drawLater.drawExternalLabel);
            }
          } else {
            node.updateBoundingBox(ctx, node.selected);
          }
        }
      }
      let i2;
      const selectedLength = selected.length;
      const hoveredLength = hovered.length;
      for (i2 = 0; i2 < selectedLength; i2++) {
        node = nodes[selected[i2]];
        const drawLater = node.draw(ctx);
        if (drawLater.drawExternalLabel != null) {
          drawExternalLabels.push(drawLater.drawExternalLabel);
        }
      }
      for (i2 = 0; i2 < hoveredLength; i2++) {
        node = nodes[hovered[i2]];
        const drawLater = node.draw(ctx);
        if (drawLater.drawExternalLabel != null) {
          drawExternalLabels.push(drawLater.drawExternalLabel);
        }
      }
      return {
        drawExternalLabels: () => {
          for (const draw of drawExternalLabels) {
            draw();
          }
        }
      };
    }
    _drawEdges(ctx) {
      const edges = this.body.edges;
      const edgeIndices = this.body.edgeIndices;
      for (let i2 = 0; i2 < edgeIndices.length; i2++) {
        const edge = edges[edgeIndices[i2]];
        if (edge.connected === true) {
          edge.draw(ctx);
        }
      }
    }
    _drawArrows(ctx) {
      const edges = this.body.edges;
      const edgeIndices = this.body.edgeIndices;
      for (let i2 = 0; i2 < edgeIndices.length; i2++) {
        const edge = edges[edgeIndices[i2]];
        if (edge.connected === true) {
          edge.drawArrows(ctx);
        }
      }
    }
    _determineBrowserMethod() {
      if (typeof window !== "undefined") {
        const browserType = navigator.userAgent.toLowerCase();
        this.requiresTimeout = false;
        if (browserType.indexOf("msie 9.0") != -1) {
          this.requiresTimeout = true;
        } else if (browserType.indexOf("safari") != -1) {
          if (browserType.indexOf("chrome") <= -1) {
            this.requiresTimeout = true;
          }
        }
      } else {
        this.requiresTimeout = true;
      }
    }
    _drawSelectionBox(ctx) {
      if (this.body.selectionBox.show) {
        ctx.beginPath();
        const width = this.body.selectionBox.position.end.x - this.body.selectionBox.position.start.x;
        const height = this.body.selectionBox.position.end.y - this.body.selectionBox.position.start.y;
        ctx.rect(this.body.selectionBox.position.start.x, this.body.selectionBox.position.start.y, width, height);
        ctx.fillStyle = "rgba(151, 194, 252, 0.2)";
        ctx.fillRect(this.body.selectionBox.position.start.x, this.body.selectionBox.position.start.y, width, height);
        ctx.strokeStyle = "rgba(151, 194, 252, 1)";
        ctx.stroke();
      } else {
        ctx.closePath();
      }
    }
  };
  function onTouch(hammer, callback) {
    callback.inputHandler = function(event) {
      if (event.isFirst) {
        callback(event);
      }
    };
    hammer.on("hammer.input", callback.inputHandler);
  }
  function onRelease(hammer, callback) {
    callback.inputHandler = function(event) {
      if (event.isFinal) {
        callback(event);
      }
    };
    return hammer.on("hammer.input", callback.inputHandler);
  }
  var Canvas = class {
    constructor(body) {
      this.body = body;
      this.pixelRatio = 1;
      this.cameraState = {};
      this.initialized = false;
      this.canvasViewCenter = {};
      this._cleanupCallbacks = [];
      this.options = {};
      this.defaultOptions = {
        autoResize: true,
        height: "100%",
        width: "100%"
      };
      Object.assign(this.options, this.defaultOptions);
      this.bindEventListeners();
    }
    bindEventListeners() {
      this.body.emitter.once("resize", (obj) => {
        if (obj.width !== 0) {
          this.body.view.translation.x = obj.width * 0.5;
        }
        if (obj.height !== 0) {
          this.body.view.translation.y = obj.height * 0.5;
        }
      });
      this.body.emitter.on("setSize", this.setSize.bind(this));
      this.body.emitter.on("destroy", () => {
        this.hammerFrame.destroy();
        this.hammer.destroy();
        this._cleanUp();
      });
    }
    setOptions(options2) {
      if (options2 !== void 0) {
        const fields = ["width", "height", "autoResize"];
        selectiveDeepExtend(fields, this.options, options2);
      }
      this._cleanUp();
      if (this.options.autoResize === true) {
        if (window.ResizeObserver) {
          const observer2 = new ResizeObserver(() => {
            const changed = this.setSize();
            if (changed === true) {
              this.body.emitter.emit("_requestRedraw");
            }
          });
          const { frame } = this;
          observer2.observe(frame);
          this._cleanupCallbacks.push(() => {
            observer2.unobserve(frame);
          });
        } else {
          const resizeTimer = setInterval(() => {
            const changed = this.setSize();
            if (changed === true) {
              this.body.emitter.emit("_requestRedraw");
            }
          }, 1e3);
          this._cleanupCallbacks.push(() => {
            clearInterval(resizeTimer);
          });
        }
        const resizeFunction = this._onResize.bind(this);
        window.addEventListener("resize", resizeFunction);
        this._cleanupCallbacks.push(() => {
          window.removeEventListener("resize", resizeFunction);
        });
      }
    }
    _cleanUp() {
      this._cleanupCallbacks.splice(0).reverse().forEach((callback) => {
        try {
          callback();
        } catch (error) {
          console.error(error);
        }
      });
    }
    _onResize() {
      this.setSize();
      this.body.emitter.emit("_redraw");
    }
    _getCameraState(pixelRatio = this.pixelRatio) {
      if (this.initialized === true) {
        this.cameraState.previousWidth = this.frame.canvas.width / pixelRatio;
        this.cameraState.previousHeight = this.frame.canvas.height / pixelRatio;
        this.cameraState.scale = this.body.view.scale;
        this.cameraState.position = this.DOMtoCanvas({
          x: 0.5 * this.frame.canvas.width / pixelRatio,
          y: 0.5 * this.frame.canvas.height / pixelRatio
        });
      }
    }
    _setCameraState() {
      if (this.cameraState.scale !== void 0 && this.frame.canvas.clientWidth !== 0 && this.frame.canvas.clientHeight !== 0 && this.pixelRatio !== 0 && this.cameraState.previousWidth > 0 && this.cameraState.previousHeight > 0) {
        const widthRatio = this.frame.canvas.width / this.pixelRatio / this.cameraState.previousWidth;
        const heightRatio = this.frame.canvas.height / this.pixelRatio / this.cameraState.previousHeight;
        let newScale = this.cameraState.scale;
        if (widthRatio != 1 && heightRatio != 1) {
          newScale = this.cameraState.scale * 0.5 * (widthRatio + heightRatio);
        } else if (widthRatio != 1) {
          newScale = this.cameraState.scale * widthRatio;
        } else if (heightRatio != 1) {
          newScale = this.cameraState.scale * heightRatio;
        }
        this.body.view.scale = newScale;
        const currentViewCenter = this.DOMtoCanvas({
          x: 0.5 * this.frame.canvas.clientWidth,
          y: 0.5 * this.frame.canvas.clientHeight
        });
        const distanceFromCenter = {
          x: currentViewCenter.x - this.cameraState.position.x,
          y: currentViewCenter.y - this.cameraState.position.y
        };
        this.body.view.translation.x += distanceFromCenter.x * this.body.view.scale;
        this.body.view.translation.y += distanceFromCenter.y * this.body.view.scale;
      }
    }
    _prepareValue(value) {
      if (typeof value === "number") {
        return value + "px";
      } else if (typeof value === "string") {
        if (value.indexOf("%") !== -1 || value.indexOf("px") !== -1) {
          return value;
        } else if (value.indexOf("%") === -1) {
          return value + "px";
        }
      }
      throw new Error("Could not use the value supplied for width or height:" + value);
    }
    _create() {
      while (this.body.container.hasChildNodes()) {
        this.body.container.removeChild(this.body.container.firstChild);
      }
      this.frame = document.createElement("div");
      this.frame.className = "vis-network";
      this.frame.style.position = "relative";
      this.frame.style.overflow = "hidden";
      this.frame.tabIndex = 0;
      this.frame.canvas = document.createElement("canvas");
      this.frame.canvas.style.position = "relative";
      this.frame.appendChild(this.frame.canvas);
      if (!this.frame.canvas.getContext) {
        const noCanvas = document.createElement("DIV");
        noCanvas.style.color = "red";
        noCanvas.style.fontWeight = "bold";
        noCanvas.style.padding = "10px";
        noCanvas.innerText = "Error: your browser does not support HTML canvas";
        this.frame.canvas.appendChild(noCanvas);
      } else {
        this._setPixelRatio();
        this.setTransform();
      }
      this.body.container.appendChild(this.frame);
      this.body.view.scale = 1;
      this.body.view.translation = {
        x: 0.5 * this.frame.canvas.clientWidth,
        y: 0.5 * this.frame.canvas.clientHeight
      };
      this._bindHammer();
    }
    _bindHammer() {
      if (this.hammer !== void 0) {
        this.hammer.destroy();
      }
      this.drag = {};
      this.pinch = {};
      this.hammer = new Hammer2(this.frame.canvas);
      this.hammer.get("pinch").set({ enable: true });
      this.hammer.get("pan").set({ threshold: 5, direction: Hammer2.DIRECTION_ALL });
      onTouch(this.hammer, (event) => {
        this.body.eventListeners.onTouch(event);
      });
      this.hammer.on("tap", (event) => {
        this.body.eventListeners.onTap(event);
      });
      this.hammer.on("doubletap", (event) => {
        this.body.eventListeners.onDoubleTap(event);
      });
      this.hammer.on("press", (event) => {
        this.body.eventListeners.onHold(event);
      });
      this.hammer.on("panstart", (event) => {
        this.body.eventListeners.onDragStart(event);
      });
      this.hammer.on("panmove", (event) => {
        this.body.eventListeners.onDrag(event);
      });
      this.hammer.on("panend", (event) => {
        this.body.eventListeners.onDragEnd(event);
      });
      this.hammer.on("pinch", (event) => {
        this.body.eventListeners.onPinch(event);
      });
      this.frame.canvas.addEventListener("wheel", (event) => {
        this.body.eventListeners.onMouseWheel(event);
      });
      this.frame.canvas.addEventListener("mousemove", (event) => {
        this.body.eventListeners.onMouseMove(event);
      });
      this.frame.canvas.addEventListener("contextmenu", (event) => {
        this.body.eventListeners.onContext(event);
      });
      this.hammerFrame = new Hammer2(this.frame);
      onRelease(this.hammerFrame, (event) => {
        this.body.eventListeners.onRelease(event);
      });
    }
    setSize(width = this.options.width, height = this.options.height) {
      width = this._prepareValue(width);
      height = this._prepareValue(height);
      let emitEvent = false;
      const oldWidth = this.frame.canvas.width;
      const oldHeight = this.frame.canvas.height;
      const previousRatio = this.pixelRatio;
      this._setPixelRatio();
      if (width != this.options.width || height != this.options.height || this.frame.style.width != width || this.frame.style.height != height) {
        this._getCameraState(previousRatio);
        this.frame.style.width = width;
        this.frame.style.height = height;
        this.frame.canvas.style.width = "100%";
        this.frame.canvas.style.height = "100%";
        this.frame.canvas.width = Math.round(this.frame.canvas.clientWidth * this.pixelRatio);
        this.frame.canvas.height = Math.round(this.frame.canvas.clientHeight * this.pixelRatio);
        this.options.width = width;
        this.options.height = height;
        this.canvasViewCenter = {
          x: 0.5 * this.frame.clientWidth,
          y: 0.5 * this.frame.clientHeight
        };
        emitEvent = true;
      } else {
        const newWidth = Math.round(this.frame.canvas.clientWidth * this.pixelRatio);
        const newHeight = Math.round(this.frame.canvas.clientHeight * this.pixelRatio);
        if (this.frame.canvas.width !== newWidth || this.frame.canvas.height !== newHeight) {
          this._getCameraState(previousRatio);
        }
        if (this.frame.canvas.width !== newWidth) {
          this.frame.canvas.width = newWidth;
          emitEvent = true;
        }
        if (this.frame.canvas.height !== newHeight) {
          this.frame.canvas.height = newHeight;
          emitEvent = true;
        }
      }
      if (emitEvent === true) {
        this.body.emitter.emit("resize", {
          width: Math.round(this.frame.canvas.width / this.pixelRatio),
          height: Math.round(this.frame.canvas.height / this.pixelRatio),
          oldWidth: Math.round(oldWidth / this.pixelRatio),
          oldHeight: Math.round(oldHeight / this.pixelRatio)
        });
        this._setCameraState();
      }
      this.initialized = true;
      return emitEvent;
    }
    getContext() {
      return this.frame.canvas.getContext("2d");
    }
    _determinePixelRatio() {
      const ctx = this.getContext();
      if (ctx === void 0) {
        throw new Error("Could not get canvax context");
      }
      let numerator = 1;
      if (typeof window !== "undefined") {
        numerator = window.devicePixelRatio || 1;
      }
      const denominator = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
      return numerator / denominator;
    }
    _setPixelRatio() {
      this.pixelRatio = this._determinePixelRatio();
    }
    setTransform() {
      const ctx = this.getContext();
      if (ctx === void 0) {
        throw new Error("Could not get canvax context");
      }
      ctx.setTransform(this.pixelRatio, 0, 0, this.pixelRatio, 0, 0);
    }
    _XconvertDOMtoCanvas(x2) {
      return (x2 - this.body.view.translation.x) / this.body.view.scale;
    }
    _XconvertCanvasToDOM(x2) {
      return x2 * this.body.view.scale + this.body.view.translation.x;
    }
    _YconvertDOMtoCanvas(y2) {
      return (y2 - this.body.view.translation.y) / this.body.view.scale;
    }
    _YconvertCanvasToDOM(y2) {
      return y2 * this.body.view.scale + this.body.view.translation.y;
    }
    canvasToDOM(pos2) {
      return {
        x: this._XconvertCanvasToDOM(pos2.x),
        y: this._YconvertCanvasToDOM(pos2.y)
      };
    }
    DOMtoCanvas(pos2) {
      return {
        x: this._XconvertDOMtoCanvas(pos2.x),
        y: this._YconvertDOMtoCanvas(pos2.y)
      };
    }
  };
  function normalizeFitOptions(rawOptions, allNodeIds) {
    const options2 = Object.assign({
      nodes: allNodeIds,
      minZoomLevel: Number.MIN_VALUE,
      maxZoomLevel: 1
    }, rawOptions != null ? rawOptions : {});
    if (!Array.isArray(options2.nodes)) {
      throw new TypeError("Nodes has to be an array of ids.");
    }
    if (options2.nodes.length === 0) {
      options2.nodes = allNodeIds;
    }
    if (!(typeof options2.minZoomLevel === "number" && options2.minZoomLevel > 0)) {
      throw new TypeError("Min zoom level has to be a number higher than zero.");
    }
    if (!(typeof options2.maxZoomLevel === "number" && options2.minZoomLevel <= options2.maxZoomLevel)) {
      throw new TypeError("Max zoom level has to be a number higher than min zoom level.");
    }
    return options2;
  }
  var View = class {
    constructor(body, canvas) {
      this.body = body;
      this.canvas = canvas;
      this.animationSpeed = 1 / this.renderRefreshRate;
      this.animationEasingFunction = "easeInOutQuint";
      this.easingTime = 0;
      this.sourceScale = 0;
      this.targetScale = 0;
      this.sourceTranslation = 0;
      this.targetTranslation = 0;
      this.lockedOnNodeId = void 0;
      this.lockedOnNodeOffset = void 0;
      this.touchTime = 0;
      this.viewFunction = void 0;
      this.body.emitter.on("fit", this.fit.bind(this));
      this.body.emitter.on("animationFinished", () => {
        this.body.emitter.emit("_stopRendering");
      });
      this.body.emitter.on("unlockNode", this.releaseNode.bind(this));
    }
    setOptions(options2 = {}) {
      this.options = options2;
    }
    fit(options2, initialZoom = false) {
      options2 = normalizeFitOptions(options2, this.body.nodeIndices);
      const canvasWidth = this.canvas.frame.canvas.clientWidth;
      const canvasHeight = this.canvas.frame.canvas.clientHeight;
      let range;
      let zoomLevel;
      if (canvasWidth === 0 || canvasHeight === 0) {
        zoomLevel = 1;
        range = NetworkUtil.getRange(this.body.nodes, options2.nodes);
      } else if (initialZoom === true) {
        let positionDefined = 0;
        for (const nodeId in this.body.nodes) {
          if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
            const node = this.body.nodes[nodeId];
            if (node.predefinedPosition === true) {
              positionDefined += 1;
            }
          }
        }
        if (positionDefined > 0.5 * this.body.nodeIndices.length) {
          this.fit(options2, false);
          return;
        }
        range = NetworkUtil.getRange(this.body.nodes, options2.nodes);
        const numberOfNodes = this.body.nodeIndices.length;
        zoomLevel = 12.662 / (numberOfNodes + 7.4147) + 0.0964822;
        const factor = Math.min(canvasWidth / 600, canvasHeight / 600);
        zoomLevel *= factor;
      } else {
        this.body.emitter.emit("_resizeNodes");
        range = NetworkUtil.getRange(this.body.nodes, options2.nodes);
        const xDistance = Math.abs(range.maxX - range.minX) * 1.1;
        const yDistance = Math.abs(range.maxY - range.minY) * 1.1;
        const xZoomLevel = canvasWidth / xDistance;
        const yZoomLevel = canvasHeight / yDistance;
        zoomLevel = xZoomLevel <= yZoomLevel ? xZoomLevel : yZoomLevel;
      }
      if (zoomLevel > options2.maxZoomLevel) {
        zoomLevel = options2.maxZoomLevel;
      } else if (zoomLevel < options2.minZoomLevel) {
        zoomLevel = options2.minZoomLevel;
      }
      const center = NetworkUtil.findCenter(range);
      const animationOptions = {
        position: center,
        scale: zoomLevel,
        animation: options2.animation
      };
      this.moveTo(animationOptions);
    }
    focus(nodeId, options2 = {}) {
      if (this.body.nodes[nodeId] !== void 0) {
        const nodePosition = {
          x: this.body.nodes[nodeId].x,
          y: this.body.nodes[nodeId].y
        };
        options2.position = nodePosition;
        options2.lockedOnNode = nodeId;
        this.moveTo(options2);
      } else {
        console.error("Node: " + nodeId + " cannot be found.");
      }
    }
    moveTo(options2) {
      if (options2 === void 0) {
        options2 = {};
        return;
      }
      if (options2.offset != null) {
        if (options2.offset.x != null) {
          options2.offset.x = +options2.offset.x;
          if (!Number.isFinite(options2.offset.x)) {
            throw new TypeError('The option "offset.x" has to be a finite number.');
          }
        } else {
          options2.offset.x = 0;
        }
        if (options2.offset.y != null) {
          options2.offset.y = +options2.offset.y;
          if (!Number.isFinite(options2.offset.y)) {
            throw new TypeError('The option "offset.y" has to be a finite number.');
          }
        } else {
          options2.offset.x = 0;
        }
      } else {
        options2.offset = {
          x: 0,
          y: 0
        };
      }
      if (options2.position != null) {
        if (options2.position.x != null) {
          options2.position.x = +options2.position.x;
          if (!Number.isFinite(options2.position.x)) {
            throw new TypeError('The option "position.x" has to be a finite number.');
          }
        } else {
          options2.position.x = 0;
        }
        if (options2.position.y != null) {
          options2.position.y = +options2.position.y;
          if (!Number.isFinite(options2.position.y)) {
            throw new TypeError('The option "position.y" has to be a finite number.');
          }
        } else {
          options2.position.x = 0;
        }
      } else {
        options2.position = this.getViewPosition();
      }
      if (options2.scale != null) {
        options2.scale = +options2.scale;
        if (!(options2.scale > 0)) {
          throw new TypeError('The option "scale" has to be a number greater than zero.');
        }
      } else {
        options2.scale = this.body.view.scale;
      }
      if (options2.animation === void 0) {
        options2.animation = { duration: 0 };
      }
      if (options2.animation === false) {
        options2.animation = { duration: 0 };
      }
      if (options2.animation === true) {
        options2.animation = {};
      }
      if (options2.animation.duration === void 0) {
        options2.animation.duration = 1e3;
      }
      if (options2.animation.easingFunction === void 0) {
        options2.animation.easingFunction = "easeInOutQuad";
      }
      this.animateView(options2);
    }
    animateView(options2) {
      if (options2 === void 0) {
        return;
      }
      this.animationEasingFunction = options2.animation.easingFunction;
      this.releaseNode();
      if (options2.locked === true) {
        this.lockedOnNodeId = options2.lockedOnNode;
        this.lockedOnNodeOffset = options2.offset;
      }
      if (this.easingTime != 0) {
        this._transitionRedraw(true);
      }
      this.sourceScale = this.body.view.scale;
      this.sourceTranslation = this.body.view.translation;
      this.targetScale = options2.scale;
      this.body.view.scale = this.targetScale;
      const viewCenter = this.canvas.DOMtoCanvas({
        x: 0.5 * this.canvas.frame.canvas.clientWidth,
        y: 0.5 * this.canvas.frame.canvas.clientHeight
      });
      const distanceFromCenter = {
        x: viewCenter.x - options2.position.x,
        y: viewCenter.y - options2.position.y
      };
      this.targetTranslation = {
        x: this.sourceTranslation.x + distanceFromCenter.x * this.targetScale + options2.offset.x,
        y: this.sourceTranslation.y + distanceFromCenter.y * this.targetScale + options2.offset.y
      };
      if (options2.animation.duration === 0) {
        if (this.lockedOnNodeId != void 0) {
          this.viewFunction = this._lockedRedraw.bind(this);
          this.body.emitter.on("initRedraw", this.viewFunction);
        } else {
          this.body.view.scale = this.targetScale;
          this.body.view.translation = this.targetTranslation;
          this.body.emitter.emit("_requestRedraw");
        }
      } else {
        this.animationSpeed = 1 / (60 * options2.animation.duration * 1e-3) || 1 / 60;
        this.animationEasingFunction = options2.animation.easingFunction;
        this.viewFunction = this._transitionRedraw.bind(this);
        this.body.emitter.on("initRedraw", this.viewFunction);
        this.body.emitter.emit("_startRendering");
      }
    }
    _lockedRedraw() {
      const nodePosition = {
        x: this.body.nodes[this.lockedOnNodeId].x,
        y: this.body.nodes[this.lockedOnNodeId].y
      };
      const viewCenter = this.canvas.DOMtoCanvas({
        x: 0.5 * this.canvas.frame.canvas.clientWidth,
        y: 0.5 * this.canvas.frame.canvas.clientHeight
      });
      const distanceFromCenter = {
        x: viewCenter.x - nodePosition.x,
        y: viewCenter.y - nodePosition.y
      };
      const sourceTranslation = this.body.view.translation;
      const targetTranslation = {
        x: sourceTranslation.x + distanceFromCenter.x * this.body.view.scale + this.lockedOnNodeOffset.x,
        y: sourceTranslation.y + distanceFromCenter.y * this.body.view.scale + this.lockedOnNodeOffset.y
      };
      this.body.view.translation = targetTranslation;
    }
    releaseNode() {
      if (this.lockedOnNodeId !== void 0 && this.viewFunction !== void 0) {
        this.body.emitter.off("initRedraw", this.viewFunction);
        this.lockedOnNodeId = void 0;
        this.lockedOnNodeOffset = void 0;
      }
    }
    _transitionRedraw(finished = false) {
      this.easingTime += this.animationSpeed;
      this.easingTime = finished === true ? 1 : this.easingTime;
      const progress = easingFunctions[this.animationEasingFunction](this.easingTime);
      this.body.view.scale = this.sourceScale + (this.targetScale - this.sourceScale) * progress;
      this.body.view.translation = {
        x: this.sourceTranslation.x + (this.targetTranslation.x - this.sourceTranslation.x) * progress,
        y: this.sourceTranslation.y + (this.targetTranslation.y - this.sourceTranslation.y) * progress
      };
      if (this.easingTime >= 1) {
        this.body.emitter.off("initRedraw", this.viewFunction);
        this.easingTime = 0;
        if (this.lockedOnNodeId != void 0) {
          this.viewFunction = this._lockedRedraw.bind(this);
          this.body.emitter.on("initRedraw", this.viewFunction);
        }
        this.body.emitter.emit("animationFinished");
      }
    }
    getScale() {
      return this.body.view.scale;
    }
    getViewPosition() {
      return this.canvas.DOMtoCanvas({
        x: 0.5 * this.canvas.frame.canvas.clientWidth,
        y: 0.5 * this.canvas.frame.canvas.clientHeight
      });
    }
  };
  var NavigationHandler = class {
    constructor(body, canvas) {
      this.body = body;
      this.canvas = canvas;
      this.iconsCreated = false;
      this.navigationHammers = [];
      this.boundFunctions = {};
      this.touchTime = 0;
      this.activated = false;
      this.body.emitter.on("activate", () => {
        this.activated = true;
        this.configureKeyboardBindings();
      });
      this.body.emitter.on("deactivate", () => {
        this.activated = false;
        this.configureKeyboardBindings();
      });
      this.body.emitter.on("destroy", () => {
        if (this.keycharm !== void 0) {
          this.keycharm.destroy();
        }
      });
      this.options = {};
    }
    setOptions(options2) {
      if (options2 !== void 0) {
        this.options = options2;
        this.create();
      }
    }
    create() {
      if (this.options.navigationButtons === true) {
        if (this.iconsCreated === false) {
          this.loadNavigationElements();
        }
      } else if (this.iconsCreated === true) {
        this.cleanNavigation();
      }
      this.configureKeyboardBindings();
    }
    cleanNavigation() {
      if (this.navigationHammers.length != 0) {
        for (let i2 = 0; i2 < this.navigationHammers.length; i2++) {
          this.navigationHammers[i2].destroy();
        }
        this.navigationHammers = [];
      }
      if (this.navigationDOM && this.navigationDOM["wrapper"] && this.navigationDOM["wrapper"].parentNode) {
        this.navigationDOM["wrapper"].parentNode.removeChild(this.navigationDOM["wrapper"]);
      }
      this.iconsCreated = false;
    }
    loadNavigationElements() {
      this.cleanNavigation();
      this.navigationDOM = {};
      const navigationDivs = [
        "up",
        "down",
        "left",
        "right",
        "zoomIn",
        "zoomOut",
        "zoomExtends"
      ];
      const navigationDivActions = [
        "_moveUp",
        "_moveDown",
        "_moveLeft",
        "_moveRight",
        "_zoomIn",
        "_zoomOut",
        "_fit"
      ];
      this.navigationDOM["wrapper"] = document.createElement("div");
      this.navigationDOM["wrapper"].className = "vis-navigation";
      this.canvas.frame.appendChild(this.navigationDOM["wrapper"]);
      for (let i2 = 0; i2 < navigationDivs.length; i2++) {
        this.navigationDOM[navigationDivs[i2]] = document.createElement("div");
        this.navigationDOM[navigationDivs[i2]].className = "vis-button vis-" + navigationDivs[i2];
        this.navigationDOM["wrapper"].appendChild(this.navigationDOM[navigationDivs[i2]]);
        const hammer = new Hammer2(this.navigationDOM[navigationDivs[i2]]);
        if (navigationDivActions[i2] === "_fit") {
          onTouch(hammer, this._fit.bind(this));
        } else {
          onTouch(hammer, this.bindToRedraw.bind(this, navigationDivActions[i2]));
        }
        this.navigationHammers.push(hammer);
      }
      const hammerFrame = new Hammer2(this.canvas.frame);
      onRelease(hammerFrame, () => {
        this._stopMovement();
      });
      this.navigationHammers.push(hammerFrame);
      this.iconsCreated = true;
    }
    bindToRedraw(action) {
      if (this.boundFunctions[action] === void 0) {
        this.boundFunctions[action] = this[action].bind(this);
        this.body.emitter.on("initRedraw", this.boundFunctions[action]);
        this.body.emitter.emit("_startRendering");
      }
    }
    unbindFromRedraw(action) {
      if (this.boundFunctions[action] !== void 0) {
        this.body.emitter.off("initRedraw", this.boundFunctions[action]);
        this.body.emitter.emit("_stopRendering");
        delete this.boundFunctions[action];
      }
    }
    _fit() {
      if (new Date().valueOf() - this.touchTime > 700) {
        this.body.emitter.emit("fit", { duration: 700 });
        this.touchTime = new Date().valueOf();
      }
    }
    _stopMovement() {
      for (const boundAction in this.boundFunctions) {
        if (Object.prototype.hasOwnProperty.call(this.boundFunctions, boundAction)) {
          this.body.emitter.off("initRedraw", this.boundFunctions[boundAction]);
          this.body.emitter.emit("_stopRendering");
        }
      }
      this.boundFunctions = {};
    }
    _moveUp() {
      this.body.view.translation.y += this.options.keyboard.speed.y;
    }
    _moveDown() {
      this.body.view.translation.y -= this.options.keyboard.speed.y;
    }
    _moveLeft() {
      this.body.view.translation.x += this.options.keyboard.speed.x;
    }
    _moveRight() {
      this.body.view.translation.x -= this.options.keyboard.speed.x;
    }
    _zoomIn() {
      const scaleOld = this.body.view.scale;
      const scale = this.body.view.scale * (1 + this.options.keyboard.speed.zoom);
      const translation = this.body.view.translation;
      const scaleFrac = scale / scaleOld;
      const tx = (1 - scaleFrac) * this.canvas.canvasViewCenter.x + translation.x * scaleFrac;
      const ty = (1 - scaleFrac) * this.canvas.canvasViewCenter.y + translation.y * scaleFrac;
      this.body.view.scale = scale;
      this.body.view.translation = { x: tx, y: ty };
      this.body.emitter.emit("zoom", {
        direction: "+",
        scale: this.body.view.scale,
        pointer: null
      });
    }
    _zoomOut() {
      const scaleOld = this.body.view.scale;
      const scale = this.body.view.scale / (1 + this.options.keyboard.speed.zoom);
      const translation = this.body.view.translation;
      const scaleFrac = scale / scaleOld;
      const tx = (1 - scaleFrac) * this.canvas.canvasViewCenter.x + translation.x * scaleFrac;
      const ty = (1 - scaleFrac) * this.canvas.canvasViewCenter.y + translation.y * scaleFrac;
      this.body.view.scale = scale;
      this.body.view.translation = { x: tx, y: ty };
      this.body.emitter.emit("zoom", {
        direction: "-",
        scale: this.body.view.scale,
        pointer: null
      });
    }
    configureKeyboardBindings() {
      if (this.keycharm !== void 0) {
        this.keycharm.destroy();
      }
      if (this.options.keyboard.enabled === true) {
        if (this.options.keyboard.bindToWindow === true) {
          this.keycharm = keycharm({ container: window, preventDefault: true });
        } else {
          this.keycharm = keycharm({
            container: this.canvas.frame,
            preventDefault: true
          });
        }
        this.keycharm.reset();
        if (this.activated === true) {
          this.keycharm.bind("up", () => {
            this.bindToRedraw("_moveUp");
          }, "keydown");
          this.keycharm.bind("down", () => {
            this.bindToRedraw("_moveDown");
          }, "keydown");
          this.keycharm.bind("left", () => {
            this.bindToRedraw("_moveLeft");
          }, "keydown");
          this.keycharm.bind("right", () => {
            this.bindToRedraw("_moveRight");
          }, "keydown");
          this.keycharm.bind("=", () => {
            this.bindToRedraw("_zoomIn");
          }, "keydown");
          this.keycharm.bind("num+", () => {
            this.bindToRedraw("_zoomIn");
          }, "keydown");
          this.keycharm.bind("num-", () => {
            this.bindToRedraw("_zoomOut");
          }, "keydown");
          this.keycharm.bind("-", () => {
            this.bindToRedraw("_zoomOut");
          }, "keydown");
          this.keycharm.bind("[", () => {
            this.bindToRedraw("_zoomOut");
          }, "keydown");
          this.keycharm.bind("]", () => {
            this.bindToRedraw("_zoomIn");
          }, "keydown");
          this.keycharm.bind("pageup", () => {
            this.bindToRedraw("_zoomIn");
          }, "keydown");
          this.keycharm.bind("pagedown", () => {
            this.bindToRedraw("_zoomOut");
          }, "keydown");
          this.keycharm.bind("up", () => {
            this.unbindFromRedraw("_moveUp");
          }, "keyup");
          this.keycharm.bind("down", () => {
            this.unbindFromRedraw("_moveDown");
          }, "keyup");
          this.keycharm.bind("left", () => {
            this.unbindFromRedraw("_moveLeft");
          }, "keyup");
          this.keycharm.bind("right", () => {
            this.unbindFromRedraw("_moveRight");
          }, "keyup");
          this.keycharm.bind("=", () => {
            this.unbindFromRedraw("_zoomIn");
          }, "keyup");
          this.keycharm.bind("num+", () => {
            this.unbindFromRedraw("_zoomIn");
          }, "keyup");
          this.keycharm.bind("num-", () => {
            this.unbindFromRedraw("_zoomOut");
          }, "keyup");
          this.keycharm.bind("-", () => {
            this.unbindFromRedraw("_zoomOut");
          }, "keyup");
          this.keycharm.bind("[", () => {
            this.unbindFromRedraw("_zoomOut");
          }, "keyup");
          this.keycharm.bind("]", () => {
            this.unbindFromRedraw("_zoomIn");
          }, "keyup");
          this.keycharm.bind("pageup", () => {
            this.unbindFromRedraw("_zoomIn");
          }, "keyup");
          this.keycharm.bind("pagedown", () => {
            this.unbindFromRedraw("_zoomOut");
          }, "keyup");
        }
      }
    }
  };
  var InteractionHandler = class {
    constructor(body, canvas, selectionHandler) {
      this.body = body;
      this.canvas = canvas;
      this.selectionHandler = selectionHandler;
      this.navigationHandler = new NavigationHandler(body, canvas);
      this.body.eventListeners.onTap = this.onTap.bind(this);
      this.body.eventListeners.onTouch = this.onTouch.bind(this);
      this.body.eventListeners.onDoubleTap = this.onDoubleTap.bind(this);
      this.body.eventListeners.onHold = this.onHold.bind(this);
      this.body.eventListeners.onDragStart = this.onDragStart.bind(this);
      this.body.eventListeners.onDrag = this.onDrag.bind(this);
      this.body.eventListeners.onDragEnd = this.onDragEnd.bind(this);
      this.body.eventListeners.onMouseWheel = this.onMouseWheel.bind(this);
      this.body.eventListeners.onPinch = this.onPinch.bind(this);
      this.body.eventListeners.onMouseMove = this.onMouseMove.bind(this);
      this.body.eventListeners.onRelease = this.onRelease.bind(this);
      this.body.eventListeners.onContext = this.onContext.bind(this);
      this.touchTime = 0;
      this.drag = {};
      this.pinch = {};
      this.popup = void 0;
      this.popupObj = void 0;
      this.popupTimer = void 0;
      this.body.functions.getPointer = this.getPointer.bind(this);
      this.options = {};
      this.defaultOptions = {
        dragNodes: true,
        dragView: true,
        hover: false,
        keyboard: {
          enabled: false,
          speed: { x: 10, y: 10, zoom: 0.02 },
          bindToWindow: true,
          autoFocus: true
        },
        navigationButtons: false,
        tooltipDelay: 300,
        zoomView: true,
        zoomSpeed: 1
      };
      Object.assign(this.options, this.defaultOptions);
      this.bindEventListeners();
    }
    bindEventListeners() {
      this.body.emitter.on("destroy", () => {
        clearTimeout(this.popupTimer);
        delete this.body.functions.getPointer;
      });
    }
    setOptions(options2) {
      if (options2 !== void 0) {
        const fields = [
          "hideEdgesOnDrag",
          "hideEdgesOnZoom",
          "hideNodesOnDrag",
          "keyboard",
          "multiselect",
          "selectable",
          "selectConnectedEdges"
        ];
        selectiveNotDeepExtend(fields, this.options, options2);
        mergeOptions(this.options, options2, "keyboard");
        if (options2.tooltip) {
          Object.assign(this.options.tooltip, options2.tooltip);
          if (options2.tooltip.color) {
            this.options.tooltip.color = parseColor(options2.tooltip.color);
          }
        }
      }
      this.navigationHandler.setOptions(this.options);
    }
    getPointer(touch) {
      return {
        x: touch.x - getAbsoluteLeft(this.canvas.frame.canvas),
        y: touch.y - getAbsoluteTop(this.canvas.frame.canvas)
      };
    }
    onTouch(event) {
      if (new Date().valueOf() - this.touchTime > 50) {
        this.drag.pointer = this.getPointer(event.center);
        this.drag.pinched = false;
        this.pinch.scale = this.body.view.scale;
        this.touchTime = new Date().valueOf();
      }
    }
    onTap(event) {
      const pointer = this.getPointer(event.center);
      const multiselect = this.selectionHandler.options.multiselect && (event.changedPointers[0].ctrlKey || event.changedPointers[0].metaKey);
      this.checkSelectionChanges(pointer, multiselect);
      this.selectionHandler.commitAndEmit(pointer, event);
      this.selectionHandler.generateClickEvent("click", event, pointer);
    }
    onDoubleTap(event) {
      const pointer = this.getPointer(event.center);
      this.selectionHandler.generateClickEvent("doubleClick", event, pointer);
    }
    onHold(event) {
      const pointer = this.getPointer(event.center);
      const multiselect = this.selectionHandler.options.multiselect;
      this.checkSelectionChanges(pointer, multiselect);
      this.selectionHandler.commitAndEmit(pointer, event);
      this.selectionHandler.generateClickEvent("click", event, pointer);
      this.selectionHandler.generateClickEvent("hold", event, pointer);
    }
    onRelease(event) {
      if (new Date().valueOf() - this.touchTime > 10) {
        const pointer = this.getPointer(event.center);
        this.selectionHandler.generateClickEvent("release", event, pointer);
        this.touchTime = new Date().valueOf();
      }
    }
    onContext(event) {
      const pointer = this.getPointer({ x: event.clientX, y: event.clientY });
      this.selectionHandler.generateClickEvent("oncontext", event, pointer);
    }
    checkSelectionChanges(pointer, add = false) {
      if (add === true) {
        this.selectionHandler.selectAdditionalOnPoint(pointer);
      } else {
        this.selectionHandler.selectOnPoint(pointer);
      }
    }
    _determineDifference(firstSet, secondSet) {
      const arrayDiff = function(firstArr, secondArr) {
        const result = [];
        for (let i2 = 0; i2 < firstArr.length; i2++) {
          const value = firstArr[i2];
          if (secondArr.indexOf(value) === -1) {
            result.push(value);
          }
        }
        return result;
      };
      return {
        nodes: arrayDiff(firstSet.nodes, secondSet.nodes),
        edges: arrayDiff(firstSet.edges, secondSet.edges)
      };
    }
    onDragStart(event) {
      if (this.drag.dragging) {
        return;
      }
      if (this.drag.pointer === void 0) {
        this.onTouch(event);
      }
      const node = this.selectionHandler.getNodeAt(this.drag.pointer);
      this.drag.dragging = true;
      this.drag.selection = [];
      this.drag.translation = Object.assign({}, this.body.view.translation);
      this.drag.nodeId = void 0;
      if (event.srcEvent.shiftKey) {
        this.body.selectionBox.show = true;
        const pointer = this.getPointer(event.center);
        this.body.selectionBox.position.start = {
          x: this.canvas._XconvertDOMtoCanvas(pointer.x),
          y: this.canvas._YconvertDOMtoCanvas(pointer.y)
        };
        this.body.selectionBox.position.end = {
          x: this.canvas._XconvertDOMtoCanvas(pointer.x),
          y: this.canvas._YconvertDOMtoCanvas(pointer.y)
        };
      } else if (node !== void 0 && this.options.dragNodes === true) {
        this.drag.nodeId = node.id;
        if (node.isSelected() === false) {
          this.selectionHandler.setSelection({ nodes: [node.id] });
        }
        this.selectionHandler.generateClickEvent("dragStart", event, this.drag.pointer);
        for (const node2 of this.selectionHandler.getSelectedNodes()) {
          const s = {
            id: node2.id,
            node: node2,
            x: node2.x,
            y: node2.y,
            xFixed: node2.options.fixed.x,
            yFixed: node2.options.fixed.y
          };
          node2.options.fixed.x = true;
          node2.options.fixed.y = true;
          this.drag.selection.push(s);
        }
      } else {
        this.selectionHandler.generateClickEvent("dragStart", event, this.drag.pointer, void 0, true);
      }
    }
    onDrag(event) {
      if (this.drag.pinched === true) {
        return;
      }
      this.body.emitter.emit("unlockNode");
      const pointer = this.getPointer(event.center);
      const selection = this.drag.selection;
      if (selection && selection.length && this.options.dragNodes === true) {
        this.selectionHandler.generateClickEvent("dragging", event, pointer);
        const deltaX = pointer.x - this.drag.pointer.x;
        const deltaY = pointer.y - this.drag.pointer.y;
        selection.forEach((selection2) => {
          const node = selection2.node;
          if (selection2.xFixed === false) {
            node.x = this.canvas._XconvertDOMtoCanvas(this.canvas._XconvertCanvasToDOM(selection2.x) + deltaX);
          }
          if (selection2.yFixed === false) {
            node.y = this.canvas._YconvertDOMtoCanvas(this.canvas._YconvertCanvasToDOM(selection2.y) + deltaY);
          }
        });
        this.body.emitter.emit("startSimulation");
      } else {
        if (event.srcEvent.shiftKey) {
          this.selectionHandler.generateClickEvent("dragging", event, pointer, void 0, true);
          if (this.drag.pointer === void 0) {
            this.onDragStart(event);
            return;
          }
          this.body.selectionBox.position.end = {
            x: this.canvas._XconvertDOMtoCanvas(pointer.x),
            y: this.canvas._YconvertDOMtoCanvas(pointer.y)
          };
          this.body.emitter.emit("_requestRedraw");
        }
        if (this.options.dragView === true && !event.srcEvent.shiftKey) {
          this.selectionHandler.generateClickEvent("dragging", event, pointer, void 0, true);
          if (this.drag.pointer === void 0) {
            this.onDragStart(event);
            return;
          }
          const diffX = pointer.x - this.drag.pointer.x;
          const diffY = pointer.y - this.drag.pointer.y;
          this.body.view.translation = {
            x: this.drag.translation.x + diffX,
            y: this.drag.translation.y + diffY
          };
          this.body.emitter.emit("_requestRedraw");
        }
      }
    }
    onDragEnd(event) {
      this.drag.dragging = false;
      if (this.body.selectionBox.show) {
        this.body.selectionBox.show = false;
        const selectionBoxPosition = this.body.selectionBox.position;
        const selectionBoxPositionMinMax = {
          minX: Math.min(selectionBoxPosition.start.x, selectionBoxPosition.end.x),
          minY: Math.min(selectionBoxPosition.start.y, selectionBoxPosition.end.y),
          maxX: Math.max(selectionBoxPosition.start.x, selectionBoxPosition.end.x),
          maxY: Math.max(selectionBoxPosition.start.y, selectionBoxPosition.end.y)
        };
        const toBeSelectedNodes = this.body.nodeIndices.filter((nodeId) => {
          const node = this.body.nodes[nodeId];
          return node.x >= selectionBoxPositionMinMax.minX && node.x <= selectionBoxPositionMinMax.maxX && node.y >= selectionBoxPositionMinMax.minY && node.y <= selectionBoxPositionMinMax.maxY;
        });
        toBeSelectedNodes.forEach((nodeId) => this.selectionHandler.selectObject(this.body.nodes[nodeId]));
        const pointer = this.getPointer(event.center);
        this.selectionHandler.commitAndEmit(pointer, event);
        this.selectionHandler.generateClickEvent("dragEnd", event, this.getPointer(event.center), void 0, true);
        this.body.emitter.emit("_requestRedraw");
      } else {
        const selection = this.drag.selection;
        if (selection && selection.length) {
          selection.forEach(function(s) {
            s.node.options.fixed.x = s.xFixed;
            s.node.options.fixed.y = s.yFixed;
          });
          this.selectionHandler.generateClickEvent("dragEnd", event, this.getPointer(event.center));
          this.body.emitter.emit("startSimulation");
        } else {
          this.selectionHandler.generateClickEvent("dragEnd", event, this.getPointer(event.center), void 0, true);
          this.body.emitter.emit("_requestRedraw");
        }
      }
    }
    onPinch(event) {
      const pointer = this.getPointer(event.center);
      this.drag.pinched = true;
      if (this.pinch["scale"] === void 0) {
        this.pinch.scale = 1;
      }
      const scale = this.pinch.scale * event.scale;
      this.zoom(scale, pointer);
    }
    zoom(scale, pointer) {
      if (this.options.zoomView === true) {
        const scaleOld = this.body.view.scale;
        if (scale < 1e-5) {
          scale = 1e-5;
        }
        if (scale > 10) {
          scale = 10;
        }
        let preScaleDragPointer = void 0;
        if (this.drag !== void 0) {
          if (this.drag.dragging === true) {
            preScaleDragPointer = this.canvas.DOMtoCanvas(this.drag.pointer);
          }
        }
        const translation = this.body.view.translation;
        const scaleFrac = scale / scaleOld;
        const tx = (1 - scaleFrac) * pointer.x + translation.x * scaleFrac;
        const ty = (1 - scaleFrac) * pointer.y + translation.y * scaleFrac;
        this.body.view.scale = scale;
        this.body.view.translation = { x: tx, y: ty };
        if (preScaleDragPointer != void 0) {
          const postScaleDragPointer = this.canvas.canvasToDOM(preScaleDragPointer);
          this.drag.pointer.x = postScaleDragPointer.x;
          this.drag.pointer.y = postScaleDragPointer.y;
        }
        this.body.emitter.emit("_requestRedraw");
        if (scaleOld < scale) {
          this.body.emitter.emit("zoom", {
            direction: "+",
            scale: this.body.view.scale,
            pointer
          });
        } else {
          this.body.emitter.emit("zoom", {
            direction: "-",
            scale: this.body.view.scale,
            pointer
          });
        }
      }
    }
    onMouseWheel(event) {
      if (this.options.zoomView === true) {
        if (event.deltaY !== 0) {
          let scale = this.body.view.scale;
          scale *= 1 + (event.deltaY < 0 ? 1 : -1) * (this.options.zoomSpeed * 0.1);
          const pointer = this.getPointer({ x: event.clientX, y: event.clientY });
          this.zoom(scale, pointer);
        }
        event.preventDefault();
      }
    }
    onMouseMove(event) {
      const pointer = this.getPointer({ x: event.clientX, y: event.clientY });
      let popupVisible = false;
      if (this.popup !== void 0) {
        if (this.popup.hidden === false) {
          this._checkHidePopup(pointer);
        }
        if (this.popup.hidden === false) {
          popupVisible = true;
          this.popup.setPosition(pointer.x + 3, pointer.y - 5);
          this.popup.show();
        }
      }
      if (this.options.keyboard.autoFocus && this.options.keyboard.bindToWindow === false && this.options.keyboard.enabled === true) {
        this.canvas.frame.focus();
      }
      if (popupVisible === false) {
        if (this.popupTimer !== void 0) {
          clearInterval(this.popupTimer);
          this.popupTimer = void 0;
        }
        if (!this.drag.dragging) {
          this.popupTimer = setTimeout(() => this._checkShowPopup(pointer), this.options.tooltipDelay);
        }
      }
      if (this.options.hover === true) {
        this.selectionHandler.hoverObject(event, pointer);
      }
    }
    _checkShowPopup(pointer) {
      const x2 = this.canvas._XconvertDOMtoCanvas(pointer.x);
      const y2 = this.canvas._YconvertDOMtoCanvas(pointer.y);
      const pointerObj = {
        left: x2,
        top: y2,
        right: x2,
        bottom: y2
      };
      const previousPopupObjId = this.popupObj === void 0 ? void 0 : this.popupObj.id;
      let nodeUnderCursor = false;
      let popupType = "node";
      if (this.popupObj === void 0) {
        const nodeIndices = this.body.nodeIndices;
        const nodes = this.body.nodes;
        let node;
        const overlappingNodes = [];
        for (let i2 = 0; i2 < nodeIndices.length; i2++) {
          node = nodes[nodeIndices[i2]];
          if (node.isOverlappingWith(pointerObj) === true) {
            nodeUnderCursor = true;
            if (node.getTitle() !== void 0) {
              overlappingNodes.push(nodeIndices[i2]);
            }
          }
        }
        if (overlappingNodes.length > 0) {
          this.popupObj = nodes[overlappingNodes[overlappingNodes.length - 1]];
          nodeUnderCursor = true;
        }
      }
      if (this.popupObj === void 0 && nodeUnderCursor === false) {
        const edgeIndices = this.body.edgeIndices;
        const edges = this.body.edges;
        let edge;
        const overlappingEdges = [];
        for (let i2 = 0; i2 < edgeIndices.length; i2++) {
          edge = edges[edgeIndices[i2]];
          if (edge.isOverlappingWith(pointerObj) === true) {
            if (edge.connected === true && edge.getTitle() !== void 0) {
              overlappingEdges.push(edgeIndices[i2]);
            }
          }
        }
        if (overlappingEdges.length > 0) {
          this.popupObj = edges[overlappingEdges[overlappingEdges.length - 1]];
          popupType = "edge";
        }
      }
      if (this.popupObj !== void 0) {
        if (this.popupObj.id !== previousPopupObjId) {
          if (this.popup === void 0) {
            this.popup = new Popup2(this.canvas.frame);
          }
          this.popup.popupTargetType = popupType;
          this.popup.popupTargetId = this.popupObj.id;
          this.popup.setPosition(pointer.x + 3, pointer.y - 5);
          this.popup.setText(this.popupObj.getTitle());
          this.popup.show();
          this.body.emitter.emit("showPopup", this.popupObj.id);
        }
      } else {
        if (this.popup !== void 0) {
          this.popup.hide();
          this.body.emitter.emit("hidePopup");
        }
      }
    }
    _checkHidePopup(pointer) {
      const pointerObj = this.selectionHandler._pointerToPositionObject(pointer);
      let stillOnObj = false;
      if (this.popup.popupTargetType === "node") {
        if (this.body.nodes[this.popup.popupTargetId] !== void 0) {
          stillOnObj = this.body.nodes[this.popup.popupTargetId].isOverlappingWith(pointerObj);
          if (stillOnObj === true) {
            const overNode = this.selectionHandler.getNodeAt(pointer);
            stillOnObj = overNode === void 0 ? false : overNode.id === this.popup.popupTargetId;
          }
        }
      } else {
        if (this.selectionHandler.getNodeAt(pointer) === void 0) {
          if (this.body.edges[this.popup.popupTargetId] !== void 0) {
            stillOnObj = this.body.edges[this.popup.popupTargetId].isOverlappingWith(pointerObj);
          }
        }
      }
      if (stillOnObj === false) {
        this.popupObj = void 0;
        this.popup.hide();
        this.body.emitter.emit("hidePopup");
      }
    }
  };
  function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  }
  function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  }
  typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
  };
  var _SingleTypeSelectionAccumulator_previousSelection;
  var _SingleTypeSelectionAccumulator_selection;
  var _SelectionAccumulator_nodes;
  var _SelectionAccumulator_edges;
  var _SelectionAccumulator_commitHandler;
  function diffSets(prev, next2) {
    const diff = new Set();
    for (const item of next2) {
      if (!prev.has(item)) {
        diff.add(item);
      }
    }
    return diff;
  }
  var SingleTypeSelectionAccumulator = class {
    constructor() {
      _SingleTypeSelectionAccumulator_previousSelection.set(this, new Set());
      _SingleTypeSelectionAccumulator_selection.set(this, new Set());
    }
    get size() {
      return __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f").size;
    }
    add(...items) {
      for (const item of items) {
        __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f").add(item);
      }
    }
    delete(...items) {
      for (const item of items) {
        __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f").delete(item);
      }
    }
    clear() {
      __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f").clear();
    }
    getSelection() {
      return [...__classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f")];
    }
    getChanges() {
      return {
        added: [...diffSets(__classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_previousSelection, "f"), __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f"))],
        deleted: [...diffSets(__classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f"), __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_previousSelection, "f"))],
        previous: [...new Set(__classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_previousSelection, "f"))],
        current: [...new Set(__classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f"))]
      };
    }
    commit() {
      const changes = this.getChanges();
      __classPrivateFieldSet(this, _SingleTypeSelectionAccumulator_previousSelection, __classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_selection, "f"), "f");
      __classPrivateFieldSet(this, _SingleTypeSelectionAccumulator_selection, new Set(__classPrivateFieldGet(this, _SingleTypeSelectionAccumulator_previousSelection, "f")), "f");
      for (const item of changes.added) {
        item.select();
      }
      for (const item of changes.deleted) {
        item.unselect();
      }
      return changes;
    }
  };
  _SingleTypeSelectionAccumulator_previousSelection = new WeakMap(), _SingleTypeSelectionAccumulator_selection = new WeakMap();
  var SelectionAccumulator = class {
    constructor(commitHandler = () => {
    }) {
      _SelectionAccumulator_nodes.set(this, new SingleTypeSelectionAccumulator());
      _SelectionAccumulator_edges.set(this, new SingleTypeSelectionAccumulator());
      _SelectionAccumulator_commitHandler.set(this, void 0);
      __classPrivateFieldSet(this, _SelectionAccumulator_commitHandler, commitHandler, "f");
    }
    get sizeNodes() {
      return __classPrivateFieldGet(this, _SelectionAccumulator_nodes, "f").size;
    }
    get sizeEdges() {
      return __classPrivateFieldGet(this, _SelectionAccumulator_edges, "f").size;
    }
    getNodes() {
      return __classPrivateFieldGet(this, _SelectionAccumulator_nodes, "f").getSelection();
    }
    getEdges() {
      return __classPrivateFieldGet(this, _SelectionAccumulator_edges, "f").getSelection();
    }
    addNodes(...nodes) {
      __classPrivateFieldGet(this, _SelectionAccumulator_nodes, "f").add(...nodes);
    }
    addEdges(...edges) {
      __classPrivateFieldGet(this, _SelectionAccumulator_edges, "f").add(...edges);
    }
    deleteNodes(node) {
      __classPrivateFieldGet(this, _SelectionAccumulator_nodes, "f").delete(node);
    }
    deleteEdges(edge) {
      __classPrivateFieldGet(this, _SelectionAccumulator_edges, "f").delete(edge);
    }
    clear() {
      __classPrivateFieldGet(this, _SelectionAccumulator_nodes, "f").clear();
      __classPrivateFieldGet(this, _SelectionAccumulator_edges, "f").clear();
    }
    commit(...rest) {
      const summary = {
        nodes: __classPrivateFieldGet(this, _SelectionAccumulator_nodes, "f").commit(),
        edges: __classPrivateFieldGet(this, _SelectionAccumulator_edges, "f").commit()
      };
      __classPrivateFieldGet(this, _SelectionAccumulator_commitHandler, "f").call(this, summary, ...rest);
      return summary;
    }
  };
  _SelectionAccumulator_nodes = new WeakMap(), _SelectionAccumulator_edges = new WeakMap(), _SelectionAccumulator_commitHandler = new WeakMap();
  var SelectionHandler = class {
    constructor(body, canvas) {
      this.body = body;
      this.canvas = canvas;
      this._selectionAccumulator = new SelectionAccumulator();
      this.hoverObj = { nodes: {}, edges: {} };
      this.options = {};
      this.defaultOptions = {
        multiselect: false,
        selectable: true,
        selectConnectedEdges: true,
        hoverConnectedEdges: true
      };
      Object.assign(this.options, this.defaultOptions);
      this.body.emitter.on("_dataChanged", () => {
        this.updateSelection();
      });
    }
    setOptions(options2) {
      if (options2 !== void 0) {
        const fields = [
          "multiselect",
          "hoverConnectedEdges",
          "selectable",
          "selectConnectedEdges"
        ];
        selectiveDeepExtend(fields, this.options, options2);
      }
    }
    selectOnPoint(pointer) {
      let selected = false;
      if (this.options.selectable === true) {
        const obj = this.getNodeAt(pointer) || this.getEdgeAt(pointer);
        this.unselectAll();
        if (obj !== void 0) {
          selected = this.selectObject(obj);
        }
        this.body.emitter.emit("_requestRedraw");
      }
      return selected;
    }
    selectAdditionalOnPoint(pointer) {
      let selectionChanged = false;
      if (this.options.selectable === true) {
        const obj = this.getNodeAt(pointer) || this.getEdgeAt(pointer);
        if (obj !== void 0) {
          selectionChanged = true;
          if (obj.isSelected() === true) {
            this.deselectObject(obj);
          } else {
            this.selectObject(obj);
          }
          this.body.emitter.emit("_requestRedraw");
        }
      }
      return selectionChanged;
    }
    _initBaseEvent(event, pointer) {
      const properties = {};
      properties["pointer"] = {
        DOM: { x: pointer.x, y: pointer.y },
        canvas: this.canvas.DOMtoCanvas(pointer)
      };
      properties["event"] = event;
      return properties;
    }
    generateClickEvent(eventType, event, pointer, oldSelection, emptySelection = false) {
      const properties = this._initBaseEvent(event, pointer);
      if (emptySelection === true) {
        properties.nodes = [];
        properties.edges = [];
      } else {
        const tmp = this.getSelection();
        properties.nodes = tmp.nodes;
        properties.edges = tmp.edges;
      }
      if (oldSelection !== void 0) {
        properties["previousSelection"] = oldSelection;
      }
      if (eventType == "click") {
        properties.items = this.getClickedItems(pointer);
      }
      if (event.controlEdge !== void 0) {
        properties.controlEdge = event.controlEdge;
      }
      this.body.emitter.emit(eventType, properties);
    }
    selectObject(obj, highlightEdges = this.options.selectConnectedEdges) {
      if (obj !== void 0) {
        if (obj instanceof Node) {
          if (highlightEdges === true) {
            this._selectionAccumulator.addEdges(...obj.edges);
          }
          this._selectionAccumulator.addNodes(obj);
        } else {
          this._selectionAccumulator.addEdges(obj);
        }
        return true;
      }
      return false;
    }
    deselectObject(obj) {
      if (obj.isSelected() === true) {
        obj.selected = false;
        this._removeFromSelection(obj);
      }
    }
    _getAllNodesOverlappingWith(object2) {
      const overlappingNodes = [];
      const nodes = this.body.nodes;
      for (let i2 = 0; i2 < this.body.nodeIndices.length; i2++) {
        const nodeId = this.body.nodeIndices[i2];
        if (nodes[nodeId].isOverlappingWith(object2)) {
          overlappingNodes.push(nodeId);
        }
      }
      return overlappingNodes;
    }
    _pointerToPositionObject(pointer) {
      const canvasPos = this.canvas.DOMtoCanvas(pointer);
      return {
        left: canvasPos.x - 1,
        top: canvasPos.y + 1,
        right: canvasPos.x + 1,
        bottom: canvasPos.y - 1
      };
    }
    getNodeAt(pointer, returnNode = true) {
      const positionObject = this._pointerToPositionObject(pointer);
      const overlappingNodes = this._getAllNodesOverlappingWith(positionObject);
      if (overlappingNodes.length > 0) {
        if (returnNode === true) {
          return this.body.nodes[overlappingNodes[overlappingNodes.length - 1]];
        } else {
          return overlappingNodes[overlappingNodes.length - 1];
        }
      } else {
        return void 0;
      }
    }
    _getEdgesOverlappingWith(object2, overlappingEdges) {
      const edges = this.body.edges;
      for (let i2 = 0; i2 < this.body.edgeIndices.length; i2++) {
        const edgeId = this.body.edgeIndices[i2];
        if (edges[edgeId].isOverlappingWith(object2)) {
          overlappingEdges.push(edgeId);
        }
      }
    }
    _getAllEdgesOverlappingWith(object2) {
      const overlappingEdges = [];
      this._getEdgesOverlappingWith(object2, overlappingEdges);
      return overlappingEdges;
    }
    getEdgeAt(pointer, returnEdge = true) {
      const canvasPos = this.canvas.DOMtoCanvas(pointer);
      let mindist = 10;
      let overlappingEdge = null;
      const edges = this.body.edges;
      for (let i2 = 0; i2 < this.body.edgeIndices.length; i2++) {
        const edgeId = this.body.edgeIndices[i2];
        const edge = edges[edgeId];
        if (edge.connected) {
          const xFrom = edge.from.x;
          const yFrom = edge.from.y;
          const xTo = edge.to.x;
          const yTo = edge.to.y;
          const dist = edge.edgeType.getDistanceToEdge(xFrom, yFrom, xTo, yTo, canvasPos.x, canvasPos.y);
          if (dist < mindist) {
            overlappingEdge = edgeId;
            mindist = dist;
          }
        }
      }
      if (overlappingEdge !== null) {
        if (returnEdge === true) {
          return this.body.edges[overlappingEdge];
        } else {
          return overlappingEdge;
        }
      } else {
        return void 0;
      }
    }
    _addToHover(obj) {
      if (obj instanceof Node) {
        this.hoverObj.nodes[obj.id] = obj;
      } else {
        this.hoverObj.edges[obj.id] = obj;
      }
    }
    _removeFromSelection(obj) {
      if (obj instanceof Node) {
        this._selectionAccumulator.deleteNodes(obj);
        this._selectionAccumulator.deleteEdges(...obj.edges);
      } else {
        this._selectionAccumulator.deleteEdges(obj);
      }
    }
    unselectAll() {
      this._selectionAccumulator.clear();
    }
    getSelectedNodeCount() {
      return this._selectionAccumulator.sizeNodes;
    }
    getSelectedEdgeCount() {
      return this._selectionAccumulator.sizeEdges;
    }
    _hoverConnectedEdges(node) {
      for (let i2 = 0; i2 < node.edges.length; i2++) {
        const edge = node.edges[i2];
        edge.hover = true;
        this._addToHover(edge);
      }
    }
    emitBlurEvent(event, pointer, object2) {
      const properties = this._initBaseEvent(event, pointer);
      if (object2.hover === true) {
        object2.hover = false;
        if (object2 instanceof Node) {
          properties.node = object2.id;
          this.body.emitter.emit("blurNode", properties);
        } else {
          properties.edge = object2.id;
          this.body.emitter.emit("blurEdge", properties);
        }
      }
    }
    emitHoverEvent(event, pointer, object2) {
      const properties = this._initBaseEvent(event, pointer);
      let hoverChanged = false;
      if (object2.hover === false) {
        object2.hover = true;
        this._addToHover(object2);
        hoverChanged = true;
        if (object2 instanceof Node) {
          properties.node = object2.id;
          this.body.emitter.emit("hoverNode", properties);
        } else {
          properties.edge = object2.id;
          this.body.emitter.emit("hoverEdge", properties);
        }
      }
      return hoverChanged;
    }
    hoverObject(event, pointer) {
      let object2 = this.getNodeAt(pointer);
      if (object2 === void 0) {
        object2 = this.getEdgeAt(pointer);
      }
      let hoverChanged = false;
      for (const nodeId in this.hoverObj.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.hoverObj.nodes, nodeId)) {
          if (object2 === void 0 || object2 instanceof Node && object2.id != nodeId || object2 instanceof Edge) {
            this.emitBlurEvent(event, pointer, this.hoverObj.nodes[nodeId]);
            delete this.hoverObj.nodes[nodeId];
            hoverChanged = true;
          }
        }
      }
      for (const edgeId in this.hoverObj.edges) {
        if (Object.prototype.hasOwnProperty.call(this.hoverObj.edges, edgeId)) {
          if (hoverChanged === true) {
            this.hoverObj.edges[edgeId].hover = false;
            delete this.hoverObj.edges[edgeId];
          } else if (object2 === void 0 || object2 instanceof Edge && object2.id != edgeId || object2 instanceof Node && !object2.hover) {
            this.emitBlurEvent(event, pointer, this.hoverObj.edges[edgeId]);
            delete this.hoverObj.edges[edgeId];
            hoverChanged = true;
          }
        }
      }
      if (object2 !== void 0) {
        const hoveredEdgesCount = Object.keys(this.hoverObj.edges).length;
        const hoveredNodesCount = Object.keys(this.hoverObj.nodes).length;
        const newOnlyHoveredEdge = object2 instanceof Edge && hoveredEdgesCount === 0 && hoveredNodesCount === 0;
        const newOnlyHoveredNode = object2 instanceof Node && hoveredEdgesCount === 0 && hoveredNodesCount === 0;
        if (hoverChanged || newOnlyHoveredEdge || newOnlyHoveredNode) {
          hoverChanged = this.emitHoverEvent(event, pointer, object2);
        }
        if (object2 instanceof Node && this.options.hoverConnectedEdges === true) {
          this._hoverConnectedEdges(object2);
        }
      }
      if (hoverChanged === true) {
        this.body.emitter.emit("_requestRedraw");
      }
    }
    commitWithoutEmitting() {
      this._selectionAccumulator.commit();
    }
    commitAndEmit(pointer, event) {
      let selected = false;
      const selectionChanges = this._selectionAccumulator.commit();
      const previousSelection = {
        nodes: selectionChanges.nodes.previous,
        edges: selectionChanges.edges.previous
      };
      if (selectionChanges.edges.deleted.length > 0) {
        this.generateClickEvent("deselectEdge", event, pointer, previousSelection);
        selected = true;
      }
      if (selectionChanges.nodes.deleted.length > 0) {
        this.generateClickEvent("deselectNode", event, pointer, previousSelection);
        selected = true;
      }
      if (selectionChanges.nodes.added.length > 0) {
        this.generateClickEvent("selectNode", event, pointer);
        selected = true;
      }
      if (selectionChanges.edges.added.length > 0) {
        this.generateClickEvent("selectEdge", event, pointer);
        selected = true;
      }
      if (selected === true) {
        this.generateClickEvent("select", event, pointer);
      }
    }
    getSelection() {
      return {
        nodes: this.getSelectedNodeIds(),
        edges: this.getSelectedEdgeIds()
      };
    }
    getSelectedNodes() {
      return this._selectionAccumulator.getNodes();
    }
    getSelectedEdges() {
      return this._selectionAccumulator.getEdges();
    }
    getSelectedNodeIds() {
      return this._selectionAccumulator.getNodes().map((node) => node.id);
    }
    getSelectedEdgeIds() {
      return this._selectionAccumulator.getEdges().map((edge) => edge.id);
    }
    setSelection(selection, options2 = {}) {
      if (!selection || !selection.nodes && !selection.edges) {
        throw new TypeError("Selection must be an object with nodes and/or edges properties");
      }
      if (options2.unselectAll || options2.unselectAll === void 0) {
        this.unselectAll();
      }
      if (selection.nodes) {
        for (const id of selection.nodes) {
          const node = this.body.nodes[id];
          if (!node) {
            throw new RangeError('Node with id "' + id + '" not found');
          }
          this.selectObject(node, options2.highlightEdges);
        }
      }
      if (selection.edges) {
        for (const id of selection.edges) {
          const edge = this.body.edges[id];
          if (!edge) {
            throw new RangeError('Edge with id "' + id + '" not found');
          }
          this.selectObject(edge);
        }
      }
      this.body.emitter.emit("_requestRedraw");
      this._selectionAccumulator.commit();
    }
    selectNodes(selection, highlightEdges = true) {
      if (!selection || selection.length === void 0)
        throw "Selection must be an array with ids";
      this.setSelection({ nodes: selection }, { highlightEdges });
    }
    selectEdges(selection) {
      if (!selection || selection.length === void 0)
        throw "Selection must be an array with ids";
      this.setSelection({ edges: selection });
    }
    updateSelection() {
      for (const node in this._selectionAccumulator.getNodes()) {
        if (!Object.prototype.hasOwnProperty.call(this.body.nodes, node.id)) {
          this._selectionAccumulator.deleteNodes(node);
        }
      }
      for (const edge in this._selectionAccumulator.getEdges()) {
        if (!Object.prototype.hasOwnProperty.call(this.body.edges, edge.id)) {
          this._selectionAccumulator.deleteEdges(edge);
        }
      }
    }
    getClickedItems(pointer) {
      const point = this.canvas.DOMtoCanvas(pointer);
      const items = [];
      const nodeIndices = this.body.nodeIndices;
      const nodes = this.body.nodes;
      for (let i2 = nodeIndices.length - 1; i2 >= 0; i2--) {
        const node = nodes[nodeIndices[i2]];
        const ret = node.getItemsOnPoint(point);
        items.push.apply(items, ret);
      }
      const edgeIndices = this.body.edgeIndices;
      const edges = this.body.edges;
      for (let i2 = edgeIndices.length - 1; i2 >= 0; i2--) {
        const edge = edges[edgeIndices[i2]];
        const ret = edge.getItemsOnPoint(point);
        items.push.apply(items, ret);
      }
      return items;
    }
  };
  var DirectionInterface = class {
    abstract() {
      throw new Error("Can't instantiate abstract class!");
    }
    fake_use() {
    }
    curveType() {
      return this.abstract();
    }
    getPosition(node) {
      this.fake_use(node);
      return this.abstract();
    }
    setPosition(node, position, level = void 0) {
      this.fake_use(node, position, level);
      this.abstract();
    }
    getTreeSize(index2) {
      this.fake_use(index2);
      return this.abstract();
    }
    sort(nodeArray) {
      this.fake_use(nodeArray);
      this.abstract();
    }
    fix(node, level) {
      this.fake_use(node, level);
      this.abstract();
    }
    shift(nodeId, diff) {
      this.fake_use(nodeId, diff);
      this.abstract();
    }
  };
  var VerticalStrategy = class extends DirectionInterface {
    constructor(layout) {
      super();
      this.layout = layout;
    }
    curveType() {
      return "horizontal";
    }
    getPosition(node) {
      return node.x;
    }
    setPosition(node, position, level = void 0) {
      if (level !== void 0) {
        this.layout.hierarchical.addToOrdering(node, level);
      }
      node.x = position;
    }
    getTreeSize(index2) {
      const res = this.layout.hierarchical.getTreeSize(this.layout.body.nodes, index2);
      return { min: res.min_x, max: res.max_x };
    }
    sort(nodeArray) {
      nodeArray.sort(function(a, b) {
        return a.x - b.x;
      });
    }
    fix(node, level) {
      node.y = this.layout.options.hierarchical.levelSeparation * level;
      node.options.fixed.y = true;
    }
    shift(nodeId, diff) {
      this.layout.body.nodes[nodeId].x += diff;
    }
  };
  var HorizontalStrategy = class extends DirectionInterface {
    constructor(layout) {
      super();
      this.layout = layout;
    }
    curveType() {
      return "vertical";
    }
    getPosition(node) {
      return node.y;
    }
    setPosition(node, position, level = void 0) {
      if (level !== void 0) {
        this.layout.hierarchical.addToOrdering(node, level);
      }
      node.y = position;
    }
    getTreeSize(index2) {
      const res = this.layout.hierarchical.getTreeSize(this.layout.body.nodes, index2);
      return { min: res.min_y, max: res.max_y };
    }
    sort(nodeArray) {
      nodeArray.sort(function(a, b) {
        return a.y - b.y;
      });
    }
    fix(node, level) {
      node.x = this.layout.options.hierarchical.levelSeparation * level;
      node.options.fixed.x = true;
    }
    shift(nodeId, diff) {
      this.layout.body.nodes[nodeId].y += diff;
    }
  };
  function fillLevelsByDirectionCyclic(nodes, levels) {
    const edges = new Set();
    nodes.forEach((node) => {
      node.edges.forEach((edge) => {
        if (edge.connected) {
          edges.add(edge);
        }
      });
    });
    edges.forEach((edge) => {
      const fromId = edge.from.id;
      const toId = edge.to.id;
      if (levels[fromId] == null) {
        levels[fromId] = 0;
      }
      if (levels[toId] == null || levels[fromId] >= levels[toId]) {
        levels[toId] = levels[fromId] + 1;
      }
    });
    return levels;
  }
  function fillLevelsByDirectionLeaves(nodes) {
    return fillLevelsByDirection((node) => node.edges.filter((edge) => nodes.has(edge.toId)).every((edge) => edge.to === node), (newLevel, oldLevel) => oldLevel > newLevel, "from", nodes);
  }
  function fillLevelsByDirectionRoots(nodes) {
    return fillLevelsByDirection((node) => node.edges.filter((edge) => nodes.has(edge.toId)).every((edge) => edge.from === node), (newLevel, oldLevel) => oldLevel < newLevel, "to", nodes);
  }
  function fillLevelsByDirection(isEntryNode, shouldLevelBeReplaced, direction, nodes) {
    const levels = Object.create(null);
    const limit = [...nodes.values()].reduce((acc, node) => acc + 1 + node.edges.length, 0);
    const edgeIdProp = direction + "Id";
    const newLevelDiff = direction === "to" ? 1 : -1;
    for (const [entryNodeId, entryNode] of nodes) {
      if (!nodes.has(entryNodeId) || !isEntryNode(entryNode)) {
        continue;
      }
      levels[entryNodeId] = 0;
      const stack = [entryNode];
      let done = 0;
      let node;
      while (node = stack.pop()) {
        if (!nodes.has(entryNodeId)) {
          continue;
        }
        const newLevel = levels[node.id] + newLevelDiff;
        node.edges.filter((edge) => edge.connected && edge.to !== edge.from && edge[direction] !== node && nodes.has(edge.toId) && nodes.has(edge.fromId)).forEach((edge) => {
          const targetNodeId = edge[edgeIdProp];
          const oldLevel = levels[targetNodeId];
          if (oldLevel == null || shouldLevelBeReplaced(newLevel, oldLevel)) {
            levels[targetNodeId] = newLevel;
            stack.push(edge[direction]);
          }
        });
        if (done > limit) {
          return fillLevelsByDirectionCyclic(nodes, levels);
        } else {
          ++done;
        }
      }
    }
    return levels;
  }
  var HierarchicalStatus = class {
    constructor() {
      this.childrenReference = {};
      this.parentReference = {};
      this.trees = {};
      this.distributionOrdering = {};
      this.levels = {};
      this.distributionIndex = {};
      this.isTree = false;
      this.treeIndex = -1;
    }
    addRelation(parentNodeId, childNodeId) {
      if (this.childrenReference[parentNodeId] === void 0) {
        this.childrenReference[parentNodeId] = [];
      }
      this.childrenReference[parentNodeId].push(childNodeId);
      if (this.parentReference[childNodeId] === void 0) {
        this.parentReference[childNodeId] = [];
      }
      this.parentReference[childNodeId].push(parentNodeId);
    }
    checkIfTree() {
      for (const i2 in this.parentReference) {
        if (this.parentReference[i2].length > 1) {
          this.isTree = false;
          return;
        }
      }
      this.isTree = true;
    }
    numTrees() {
      return this.treeIndex + 1;
    }
    setTreeIndex(node, treeId) {
      if (treeId === void 0)
        return;
      if (this.trees[node.id] === void 0) {
        this.trees[node.id] = treeId;
        this.treeIndex = Math.max(treeId, this.treeIndex);
      }
    }
    ensureLevel(nodeId) {
      if (this.levels[nodeId] === void 0) {
        this.levels[nodeId] = 0;
      }
    }
    getMaxLevel(nodeId) {
      const accumulator = {};
      const _getMaxLevel = (nodeId2) => {
        if (accumulator[nodeId2] !== void 0) {
          return accumulator[nodeId2];
        }
        let level = this.levels[nodeId2];
        if (this.childrenReference[nodeId2]) {
          const children = this.childrenReference[nodeId2];
          if (children.length > 0) {
            for (let i2 = 0; i2 < children.length; i2++) {
              level = Math.max(level, _getMaxLevel(children[i2]));
            }
          }
        }
        accumulator[nodeId2] = level;
        return level;
      };
      return _getMaxLevel(nodeId);
    }
    levelDownstream(nodeA, nodeB) {
      if (this.levels[nodeB.id] === void 0) {
        if (this.levels[nodeA.id] === void 0) {
          this.levels[nodeA.id] = 0;
        }
        this.levels[nodeB.id] = this.levels[nodeA.id] + 1;
      }
    }
    setMinLevelToZero(nodes) {
      let minLevel = 1e9;
      for (const nodeId in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
          if (this.levels[nodeId] !== void 0) {
            minLevel = Math.min(this.levels[nodeId], minLevel);
          }
        }
      }
      for (const nodeId in nodes) {
        if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
          if (this.levels[nodeId] !== void 0) {
            this.levels[nodeId] -= minLevel;
          }
        }
      }
    }
    getTreeSize(nodes, index2) {
      let min_x = 1e9;
      let max_x = -1e9;
      let min_y = 1e9;
      let max_y = -1e9;
      for (const nodeId in this.trees) {
        if (Object.prototype.hasOwnProperty.call(this.trees, nodeId)) {
          if (this.trees[nodeId] === index2) {
            const node = nodes[nodeId];
            min_x = Math.min(node.x, min_x);
            max_x = Math.max(node.x, max_x);
            min_y = Math.min(node.y, min_y);
            max_y = Math.max(node.y, max_y);
          }
        }
      }
      return {
        min_x,
        max_x,
        min_y,
        max_y
      };
    }
    hasSameParent(node1, node2) {
      const parents1 = this.parentReference[node1.id];
      const parents2 = this.parentReference[node2.id];
      if (parents1 === void 0 || parents2 === void 0) {
        return false;
      }
      for (let i2 = 0; i2 < parents1.length; i2++) {
        for (let j = 0; j < parents2.length; j++) {
          if (parents1[i2] == parents2[j]) {
            return true;
          }
        }
      }
      return false;
    }
    inSameSubNetwork(node1, node2) {
      return this.trees[node1.id] === this.trees[node2.id];
    }
    getLevels() {
      return Object.keys(this.distributionOrdering);
    }
    addToOrdering(node, level) {
      if (this.distributionOrdering[level] === void 0) {
        this.distributionOrdering[level] = [];
      }
      let isPresent = false;
      const curLevel = this.distributionOrdering[level];
      for (const n in curLevel) {
        if (curLevel[n] === node) {
          isPresent = true;
          break;
        }
      }
      if (!isPresent) {
        this.distributionOrdering[level].push(node);
        this.distributionIndex[node.id] = this.distributionOrdering[level].length - 1;
      }
    }
  };
  var LayoutEngine = class {
    constructor(body) {
      this.body = body;
      this._resetRNG(Math.random() + ":" + Date.now());
      this.setPhysics = false;
      this.options = {};
      this.optionsBackup = { physics: {} };
      this.defaultOptions = {
        randomSeed: void 0,
        improvedLayout: true,
        clusterThreshold: 150,
        hierarchical: {
          enabled: false,
          levelSeparation: 150,
          nodeSpacing: 100,
          treeSpacing: 200,
          blockShifting: true,
          edgeMinimization: true,
          parentCentralization: true,
          direction: "UD",
          sortMethod: "hubsize"
        }
      };
      Object.assign(this.options, this.defaultOptions);
      this.bindEventListeners();
    }
    bindEventListeners() {
      this.body.emitter.on("_dataChanged", () => {
        this.setupHierarchicalLayout();
      });
      this.body.emitter.on("_dataLoaded", () => {
        this.layoutNetwork();
      });
      this.body.emitter.on("_resetHierarchicalLayout", () => {
        this.setupHierarchicalLayout();
      });
      this.body.emitter.on("_adjustEdgesForHierarchicalLayout", () => {
        if (this.options.hierarchical.enabled !== true) {
          return;
        }
        const type = this.direction.curveType();
        this.body.emitter.emit("_forceDisableDynamicCurves", type, false);
      });
    }
    setOptions(options2, allOptions3) {
      if (options2 !== void 0) {
        const hierarchical = this.options.hierarchical;
        const prevHierarchicalState = hierarchical.enabled;
        selectiveDeepExtend(["randomSeed", "improvedLayout", "clusterThreshold"], this.options, options2);
        mergeOptions(this.options, options2, "hierarchical");
        if (options2.randomSeed !== void 0) {
          this._resetRNG(options2.randomSeed);
        }
        if (hierarchical.enabled === true) {
          if (prevHierarchicalState === true) {
            this.body.emitter.emit("refresh", true);
          }
          if (hierarchical.direction === "RL" || hierarchical.direction === "DU") {
            if (hierarchical.levelSeparation > 0) {
              hierarchical.levelSeparation *= -1;
            }
          } else {
            if (hierarchical.levelSeparation < 0) {
              hierarchical.levelSeparation *= -1;
            }
          }
          this.setDirectionStrategy();
          this.body.emitter.emit("_resetHierarchicalLayout");
          return this.adaptAllOptionsForHierarchicalLayout(allOptions3);
        } else {
          if (prevHierarchicalState === true) {
            this.body.emitter.emit("refresh");
            return deepExtend(allOptions3, this.optionsBackup);
          }
        }
      }
      return allOptions3;
    }
    _resetRNG(seed) {
      this.initialRandomSeed = seed;
      this._rng = Alea(this.initialRandomSeed);
    }
    adaptAllOptionsForHierarchicalLayout(allOptions3) {
      if (this.options.hierarchical.enabled === true) {
        const backupPhysics = this.optionsBackup.physics;
        if (allOptions3.physics === void 0 || allOptions3.physics === true) {
          allOptions3.physics = {
            enabled: backupPhysics.enabled === void 0 ? true : backupPhysics.enabled,
            solver: "hierarchicalRepulsion"
          };
          backupPhysics.enabled = backupPhysics.enabled === void 0 ? true : backupPhysics.enabled;
          backupPhysics.solver = backupPhysics.solver || "barnesHut";
        } else if (typeof allOptions3.physics === "object") {
          backupPhysics.enabled = allOptions3.physics.enabled === void 0 ? true : allOptions3.physics.enabled;
          backupPhysics.solver = allOptions3.physics.solver || "barnesHut";
          allOptions3.physics.solver = "hierarchicalRepulsion";
        } else if (allOptions3.physics !== false) {
          backupPhysics.solver = "barnesHut";
          allOptions3.physics = { solver: "hierarchicalRepulsion" };
        }
        let type = this.direction.curveType();
        if (allOptions3.edges === void 0) {
          this.optionsBackup.edges = {
            smooth: { enabled: true, type: "dynamic" }
          };
          allOptions3.edges = { smooth: false };
        } else if (allOptions3.edges.smooth === void 0) {
          this.optionsBackup.edges = {
            smooth: { enabled: true, type: "dynamic" }
          };
          allOptions3.edges.smooth = false;
        } else {
          if (typeof allOptions3.edges.smooth === "boolean") {
            this.optionsBackup.edges = { smooth: allOptions3.edges.smooth };
            allOptions3.edges.smooth = {
              enabled: allOptions3.edges.smooth,
              type
            };
          } else {
            const smooth = allOptions3.edges.smooth;
            if (smooth.type !== void 0 && smooth.type !== "dynamic") {
              type = smooth.type;
            }
            this.optionsBackup.edges = {
              smooth: {
                enabled: smooth.enabled === void 0 ? true : smooth.enabled,
                type: smooth.type === void 0 ? "dynamic" : smooth.type,
                roundness: smooth.roundness === void 0 ? 0.5 : smooth.roundness,
                forceDirection: smooth.forceDirection === void 0 ? false : smooth.forceDirection
              }
            };
            allOptions3.edges.smooth = {
              enabled: smooth.enabled === void 0 ? true : smooth.enabled,
              type,
              roundness: smooth.roundness === void 0 ? 0.5 : smooth.roundness,
              forceDirection: smooth.forceDirection === void 0 ? false : smooth.forceDirection
            };
          }
        }
        this.body.emitter.emit("_forceDisableDynamicCurves", type);
      }
      return allOptions3;
    }
    positionInitially(nodesArray) {
      if (this.options.hierarchical.enabled !== true) {
        this._resetRNG(this.initialRandomSeed);
        const radius = nodesArray.length + 50;
        for (let i2 = 0; i2 < nodesArray.length; i2++) {
          const node = nodesArray[i2];
          const angle = 2 * Math.PI * this._rng();
          if (node.x === void 0) {
            node.x = radius * Math.cos(angle);
          }
          if (node.y === void 0) {
            node.y = radius * Math.sin(angle);
          }
        }
      }
    }
    layoutNetwork() {
      if (this.options.hierarchical.enabled !== true && this.options.improvedLayout === true) {
        const indices = this.body.nodeIndices;
        let positionDefined = 0;
        for (let i2 = 0; i2 < indices.length; i2++) {
          const node = this.body.nodes[indices[i2]];
          if (node.predefinedPosition === true) {
            positionDefined += 1;
          }
        }
        if (positionDefined < 0.5 * indices.length) {
          const MAX_LEVELS = 10;
          let level = 0;
          const clusterThreshold = this.options.clusterThreshold;
          const clusterOptions = {
            clusterNodeProperties: {
              shape: "ellipse",
              label: "",
              group: "",
              font: { multi: false }
            },
            clusterEdgeProperties: {
              label: "",
              font: { multi: false },
              smooth: {
                enabled: false
              }
            }
          };
          if (indices.length > clusterThreshold) {
            const startLength = indices.length;
            while (indices.length > clusterThreshold && level <= MAX_LEVELS) {
              level += 1;
              const before = indices.length;
              if (level % 3 === 0) {
                this.body.modules.clustering.clusterBridges(clusterOptions);
              } else {
                this.body.modules.clustering.clusterOutliers(clusterOptions);
              }
              const after = indices.length;
              if (before == after && level % 3 !== 0) {
                this._declusterAll();
                this.body.emitter.emit("_layoutFailed");
                console.info("This network could not be positioned by this version of the improved layout algorithm. Please disable improvedLayout for better performance.");
                return;
              }
            }
            this.body.modules.kamadaKawai.setOptions({
              springLength: Math.max(150, 2 * startLength)
            });
          }
          if (level > MAX_LEVELS) {
            console.info("The clustering didn't succeed within the amount of interations allowed, progressing with partial result.");
          }
          this.body.modules.kamadaKawai.solve(indices, this.body.edgeIndices, true);
          this._shiftToCenter();
          const offset = 70;
          for (let i2 = 0; i2 < indices.length; i2++) {
            const node = this.body.nodes[indices[i2]];
            if (node.predefinedPosition === false) {
              node.x += (0.5 - this._rng()) * offset;
              node.y += (0.5 - this._rng()) * offset;
            }
          }
          this._declusterAll();
          this.body.emitter.emit("_repositionBezierNodes");
        }
      }
    }
    _shiftToCenter() {
      const range = NetworkUtil.getRangeCore(this.body.nodes, this.body.nodeIndices);
      const center = NetworkUtil.findCenter(range);
      for (let i2 = 0; i2 < this.body.nodeIndices.length; i2++) {
        const node = this.body.nodes[this.body.nodeIndices[i2]];
        node.x -= center.x;
        node.y -= center.y;
      }
    }
    _declusterAll() {
      let clustersPresent = true;
      while (clustersPresent === true) {
        clustersPresent = false;
        for (let i2 = 0; i2 < this.body.nodeIndices.length; i2++) {
          if (this.body.nodes[this.body.nodeIndices[i2]].isCluster === true) {
            clustersPresent = true;
            this.body.modules.clustering.openCluster(this.body.nodeIndices[i2], {}, false);
          }
        }
        if (clustersPresent === true) {
          this.body.emitter.emit("_dataChanged");
        }
      }
    }
    getSeed() {
      return this.initialRandomSeed;
    }
    setupHierarchicalLayout() {
      if (this.options.hierarchical.enabled === true && this.body.nodeIndices.length > 0) {
        let node, nodeId;
        let definedLevel = false;
        let undefinedLevel = false;
        this.lastNodeOnLevel = {};
        this.hierarchical = new HierarchicalStatus();
        for (nodeId in this.body.nodes) {
          if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
            node = this.body.nodes[nodeId];
            if (node.options.level !== void 0) {
              definedLevel = true;
              this.hierarchical.levels[nodeId] = node.options.level;
            } else {
              undefinedLevel = true;
            }
          }
        }
        if (undefinedLevel === true && definedLevel === true) {
          throw new Error("To use the hierarchical layout, nodes require either no predefined levels or levels have to be defined for all nodes.");
        } else {
          if (undefinedLevel === true) {
            const sortMethod = this.options.hierarchical.sortMethod;
            if (sortMethod === "hubsize") {
              this._determineLevelsByHubsize();
            } else if (sortMethod === "directed") {
              this._determineLevelsDirected();
            } else if (sortMethod === "custom") {
              this._determineLevelsCustomCallback();
            }
          }
          for (const nodeId2 in this.body.nodes) {
            if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId2)) {
              this.hierarchical.ensureLevel(nodeId2);
            }
          }
          const distribution = this._getDistribution();
          this._generateMap();
          this._placeNodesByHierarchy(distribution);
          this._condenseHierarchy();
          this._shiftToCenter();
        }
      }
    }
    _condenseHierarchy() {
      let stillShifting = false;
      const branches = {};
      const shiftTrees = () => {
        const treeSizes = getTreeSizes();
        let shiftBy = 0;
        for (let i2 = 0; i2 < treeSizes.length - 1; i2++) {
          const diff = treeSizes[i2].max - treeSizes[i2 + 1].min;
          shiftBy += diff + this.options.hierarchical.treeSpacing;
          shiftTree(i2 + 1, shiftBy);
        }
      };
      const shiftTree = (index2, offset) => {
        const trees = this.hierarchical.trees;
        for (const nodeId in trees) {
          if (Object.prototype.hasOwnProperty.call(trees, nodeId)) {
            if (trees[nodeId] === index2) {
              this.direction.shift(nodeId, offset);
            }
          }
        }
      };
      const getTreeSizes = () => {
        const treeWidths = [];
        for (let i2 = 0; i2 < this.hierarchical.numTrees(); i2++) {
          treeWidths.push(this.direction.getTreeSize(i2));
        }
        return treeWidths;
      };
      const getBranchNodes = (source, map) => {
        if (map[source.id]) {
          return;
        }
        map[source.id] = true;
        if (this.hierarchical.childrenReference[source.id]) {
          const children = this.hierarchical.childrenReference[source.id];
          if (children.length > 0) {
            for (let i2 = 0; i2 < children.length; i2++) {
              getBranchNodes(this.body.nodes[children[i2]], map);
            }
          }
        }
      };
      const getBranchBoundary = (branchMap, maxLevel = 1e9) => {
        let minSpace = 1e9;
        let maxSpace = 1e9;
        let min = 1e9;
        let max = -1e9;
        for (const branchNode in branchMap) {
          if (Object.prototype.hasOwnProperty.call(branchMap, branchNode)) {
            const node = this.body.nodes[branchNode];
            const level = this.hierarchical.levels[node.id];
            const position = this.direction.getPosition(node);
            const [minSpaceNode, maxSpaceNode] = this._getSpaceAroundNode(node, branchMap);
            minSpace = Math.min(minSpaceNode, minSpace);
            maxSpace = Math.min(maxSpaceNode, maxSpace);
            if (level <= maxLevel) {
              min = Math.min(position, min);
              max = Math.max(position, max);
            }
          }
        }
        return [min, max, minSpace, maxSpace];
      };
      const getCollisionLevel = (node1, node2) => {
        const maxLevel1 = this.hierarchical.getMaxLevel(node1.id);
        const maxLevel2 = this.hierarchical.getMaxLevel(node2.id);
        return Math.min(maxLevel1, maxLevel2);
      };
      const shiftElementsCloser = (callback, levels, centerParents) => {
        const hier = this.hierarchical;
        for (let i2 = 0; i2 < levels.length; i2++) {
          const level = levels[i2];
          const levelNodes = hier.distributionOrdering[level];
          if (levelNodes.length > 1) {
            for (let j = 0; j < levelNodes.length - 1; j++) {
              const node1 = levelNodes[j];
              const node2 = levelNodes[j + 1];
              if (hier.hasSameParent(node1, node2) && hier.inSameSubNetwork(node1, node2)) {
                callback(node1, node2, centerParents);
              }
            }
          }
        }
      };
      const branchShiftCallback = (node1, node2, centerParent = false) => {
        const pos1 = this.direction.getPosition(node1);
        const pos2 = this.direction.getPosition(node2);
        const diffAbs = Math.abs(pos2 - pos1);
        const nodeSpacing = this.options.hierarchical.nodeSpacing;
        if (diffAbs > nodeSpacing) {
          const branchNodes1 = {};
          const branchNodes2 = {};
          getBranchNodes(node1, branchNodes1);
          getBranchNodes(node2, branchNodes2);
          const maxLevel = getCollisionLevel(node1, node2);
          const branchNodeBoundary1 = getBranchBoundary(branchNodes1, maxLevel);
          const branchNodeBoundary2 = getBranchBoundary(branchNodes2, maxLevel);
          const max1 = branchNodeBoundary1[1];
          const min2 = branchNodeBoundary2[0];
          const minSpace2 = branchNodeBoundary2[2];
          const diffBranch = Math.abs(max1 - min2);
          if (diffBranch > nodeSpacing) {
            let offset = max1 - min2 + nodeSpacing;
            if (offset < -minSpace2 + nodeSpacing) {
              offset = -minSpace2 + nodeSpacing;
            }
            if (offset < 0) {
              this._shiftBlock(node2.id, offset);
              stillShifting = true;
              if (centerParent === true)
                this._centerParent(node2);
            }
          }
        }
      };
      const minimizeEdgeLength = (iterations, node) => {
        const nodeId = node.id;
        const allEdges = node.edges;
        const nodeLevel = this.hierarchical.levels[node.id];
        const C2 = this.options.hierarchical.levelSeparation * this.options.hierarchical.levelSeparation;
        const referenceNodes = {};
        const aboveEdges = [];
        for (let i2 = 0; i2 < allEdges.length; i2++) {
          const edge = allEdges[i2];
          if (edge.toId != edge.fromId) {
            const otherNode = edge.toId == nodeId ? edge.from : edge.to;
            referenceNodes[allEdges[i2].id] = otherNode;
            if (this.hierarchical.levels[otherNode.id] < nodeLevel) {
              aboveEdges.push(edge);
            }
          }
        }
        const getFx = (point, edges) => {
          let sum = 0;
          for (let i2 = 0; i2 < edges.length; i2++) {
            if (referenceNodes[edges[i2].id] !== void 0) {
              const a = this.direction.getPosition(referenceNodes[edges[i2].id]) - point;
              sum += a / Math.sqrt(a * a + C2);
            }
          }
          return sum;
        };
        const getDFx = (point, edges) => {
          let sum = 0;
          for (let i2 = 0; i2 < edges.length; i2++) {
            if (referenceNodes[edges[i2].id] !== void 0) {
              const a = this.direction.getPosition(referenceNodes[edges[i2].id]) - point;
              sum -= C2 * Math.pow(a * a + C2, -1.5);
            }
          }
          return sum;
        };
        const getGuess = (iterations2, edges) => {
          let guess2 = this.direction.getPosition(node);
          const guessMap = {};
          for (let i2 = 0; i2 < iterations2; i2++) {
            const fx = getFx(guess2, edges);
            const dfx = getDFx(guess2, edges);
            const limit = 40;
            const ratio = Math.max(-limit, Math.min(limit, Math.round(fx / dfx)));
            guess2 = guess2 - ratio;
            if (guessMap[guess2] !== void 0) {
              break;
            }
            guessMap[guess2] = i2;
          }
          return guess2;
        };
        const moveBranch = (guess2) => {
          const nodePosition = this.direction.getPosition(node);
          if (branches[node.id] === void 0) {
            const branchNodes = {};
            getBranchNodes(node, branchNodes);
            branches[node.id] = branchNodes;
          }
          const branchBoundary = getBranchBoundary(branches[node.id]);
          const minSpaceBranch = branchBoundary[2];
          const maxSpaceBranch = branchBoundary[3];
          const diff = guess2 - nodePosition;
          let branchOffset = 0;
          if (diff > 0) {
            branchOffset = Math.min(diff, maxSpaceBranch - this.options.hierarchical.nodeSpacing);
          } else if (diff < 0) {
            branchOffset = -Math.min(-diff, minSpaceBranch - this.options.hierarchical.nodeSpacing);
          }
          if (branchOffset != 0) {
            this._shiftBlock(node.id, branchOffset);
            stillShifting = true;
          }
        };
        const moveNode = (guess2) => {
          const nodePosition = this.direction.getPosition(node);
          const [minSpace, maxSpace] = this._getSpaceAroundNode(node);
          const diff = guess2 - nodePosition;
          let newPosition = nodePosition;
          if (diff > 0) {
            newPosition = Math.min(nodePosition + (maxSpace - this.options.hierarchical.nodeSpacing), guess2);
          } else if (diff < 0) {
            newPosition = Math.max(nodePosition - (minSpace - this.options.hierarchical.nodeSpacing), guess2);
          }
          if (newPosition !== nodePosition) {
            this.direction.setPosition(node, newPosition);
            stillShifting = true;
          }
        };
        let guess = getGuess(iterations, aboveEdges);
        moveBranch(guess);
        guess = getGuess(iterations, allEdges);
        moveNode(guess);
      };
      const minimizeEdgeLengthBottomUp = (iterations) => {
        let levels = this.hierarchical.getLevels();
        levels = levels.reverse();
        for (let i2 = 0; i2 < iterations; i2++) {
          stillShifting = false;
          for (let j = 0; j < levels.length; j++) {
            const level = levels[j];
            const levelNodes = this.hierarchical.distributionOrdering[level];
            for (let k = 0; k < levelNodes.length; k++) {
              minimizeEdgeLength(1e3, levelNodes[k]);
            }
          }
          if (stillShifting !== true) {
            break;
          }
        }
      };
      const shiftBranchesCloserBottomUp = (iterations) => {
        let levels = this.hierarchical.getLevels();
        levels = levels.reverse();
        for (let i2 = 0; i2 < iterations; i2++) {
          stillShifting = false;
          shiftElementsCloser(branchShiftCallback, levels, true);
          if (stillShifting !== true) {
            break;
          }
        }
      };
      const centerAllParents = () => {
        for (const nodeId in this.body.nodes) {
          if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId))
            this._centerParent(this.body.nodes[nodeId]);
        }
      };
      const centerAllParentsBottomUp = () => {
        let levels = this.hierarchical.getLevels();
        levels = levels.reverse();
        for (let i2 = 0; i2 < levels.length; i2++) {
          const level = levels[i2];
          const levelNodes = this.hierarchical.distributionOrdering[level];
          for (let j = 0; j < levelNodes.length; j++) {
            this._centerParent(levelNodes[j]);
          }
        }
      };
      if (this.options.hierarchical.blockShifting === true) {
        shiftBranchesCloserBottomUp(5);
        centerAllParents();
      }
      if (this.options.hierarchical.edgeMinimization === true) {
        minimizeEdgeLengthBottomUp(20);
      }
      if (this.options.hierarchical.parentCentralization === true) {
        centerAllParentsBottomUp();
      }
      shiftTrees();
    }
    _getSpaceAroundNode(node, map) {
      let useMap = true;
      if (map === void 0) {
        useMap = false;
      }
      const level = this.hierarchical.levels[node.id];
      if (level !== void 0) {
        const index2 = this.hierarchical.distributionIndex[node.id];
        const position = this.direction.getPosition(node);
        const ordering = this.hierarchical.distributionOrdering[level];
        let minSpace = 1e9;
        let maxSpace = 1e9;
        if (index2 !== 0) {
          const prevNode = ordering[index2 - 1];
          if (useMap === true && map[prevNode.id] === void 0 || useMap === false) {
            const prevPos = this.direction.getPosition(prevNode);
            minSpace = position - prevPos;
          }
        }
        if (index2 != ordering.length - 1) {
          const nextNode = ordering[index2 + 1];
          if (useMap === true && map[nextNode.id] === void 0 || useMap === false) {
            const nextPos = this.direction.getPosition(nextNode);
            maxSpace = Math.min(maxSpace, nextPos - position);
          }
        }
        return [minSpace, maxSpace];
      } else {
        return [0, 0];
      }
    }
    _centerParent(node) {
      if (this.hierarchical.parentReference[node.id]) {
        const parents = this.hierarchical.parentReference[node.id];
        for (let i2 = 0; i2 < parents.length; i2++) {
          const parentId = parents[i2];
          const parentNode = this.body.nodes[parentId];
          const children = this.hierarchical.childrenReference[parentId];
          if (children !== void 0) {
            const newPosition = this._getCenterPosition(children);
            const position = this.direction.getPosition(parentNode);
            const [minSpace, maxSpace] = this._getSpaceAroundNode(parentNode);
            const diff = position - newPosition;
            if (diff < 0 && Math.abs(diff) < maxSpace - this.options.hierarchical.nodeSpacing || diff > 0 && Math.abs(diff) < minSpace - this.options.hierarchical.nodeSpacing) {
              this.direction.setPosition(parentNode, newPosition);
            }
          }
        }
      }
    }
    _placeNodesByHierarchy(distribution) {
      this.positionedNodes = {};
      for (const level in distribution) {
        if (Object.prototype.hasOwnProperty.call(distribution, level)) {
          let nodeArray = Object.keys(distribution[level]);
          nodeArray = this._indexArrayToNodes(nodeArray);
          this.direction.sort(nodeArray);
          let handledNodeCount = 0;
          for (let i2 = 0; i2 < nodeArray.length; i2++) {
            const node = nodeArray[i2];
            if (this.positionedNodes[node.id] === void 0) {
              const spacing = this.options.hierarchical.nodeSpacing;
              let pos2 = spacing * handledNodeCount;
              if (handledNodeCount > 0) {
                pos2 = this.direction.getPosition(nodeArray[i2 - 1]) + spacing;
              }
              this.direction.setPosition(node, pos2, level);
              this._validatePositionAndContinue(node, level, pos2);
              handledNodeCount++;
            }
          }
        }
      }
    }
    _placeBranchNodes(parentId, parentLevel) {
      const childRef = this.hierarchical.childrenReference[parentId];
      if (childRef === void 0) {
        return;
      }
      const childNodes = [];
      for (let i2 = 0; i2 < childRef.length; i2++) {
        childNodes.push(this.body.nodes[childRef[i2]]);
      }
      this.direction.sort(childNodes);
      for (let i2 = 0; i2 < childNodes.length; i2++) {
        const childNode = childNodes[i2];
        const childNodeLevel = this.hierarchical.levels[childNode.id];
        if (childNodeLevel > parentLevel && this.positionedNodes[childNode.id] === void 0) {
          const spacing = this.options.hierarchical.nodeSpacing;
          let pos2;
          if (i2 === 0) {
            pos2 = this.direction.getPosition(this.body.nodes[parentId]);
          } else {
            pos2 = this.direction.getPosition(childNodes[i2 - 1]) + spacing;
          }
          this.direction.setPosition(childNode, pos2, childNodeLevel);
          this._validatePositionAndContinue(childNode, childNodeLevel, pos2);
        } else {
          return;
        }
      }
      const center = this._getCenterPosition(childNodes);
      this.direction.setPosition(this.body.nodes[parentId], center, parentLevel);
    }
    _validatePositionAndContinue(node, level, pos2) {
      if (!this.hierarchical.isTree)
        return;
      if (this.lastNodeOnLevel[level] !== void 0) {
        const previousPos = this.direction.getPosition(this.body.nodes[this.lastNodeOnLevel[level]]);
        if (pos2 - previousPos < this.options.hierarchical.nodeSpacing) {
          const diff = previousPos + this.options.hierarchical.nodeSpacing - pos2;
          const sharedParent = this._findCommonParent(this.lastNodeOnLevel[level], node.id);
          this._shiftBlock(sharedParent.withChild, diff);
        }
      }
      this.lastNodeOnLevel[level] = node.id;
      this.positionedNodes[node.id] = true;
      this._placeBranchNodes(node.id, level);
    }
    _indexArrayToNodes(idArray) {
      const array2 = [];
      for (let i2 = 0; i2 < idArray.length; i2++) {
        array2.push(this.body.nodes[idArray[i2]]);
      }
      return array2;
    }
    _getDistribution() {
      const distribution = {};
      let nodeId, node;
      for (nodeId in this.body.nodes) {
        if (Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId)) {
          node = this.body.nodes[nodeId];
          const level = this.hierarchical.levels[nodeId] === void 0 ? 0 : this.hierarchical.levels[nodeId];
          this.direction.fix(node, level);
          if (distribution[level] === void 0) {
            distribution[level] = {};
          }
          distribution[level][nodeId] = node;
        }
      }
      return distribution;
    }
    _getActiveEdges(node) {
      const result = [];
      forEach(node.edges, (edge) => {
        if (this.body.edgeIndices.indexOf(edge.id) !== -1) {
          result.push(edge);
        }
      });
      return result;
    }
    _getHubSizes() {
      const hubSizes = {};
      const nodeIds = this.body.nodeIndices;
      forEach(nodeIds, (nodeId) => {
        const node = this.body.nodes[nodeId];
        const hubSize = this._getActiveEdges(node).length;
        hubSizes[hubSize] = true;
      });
      const result = [];
      forEach(hubSizes, (size) => {
        result.push(Number(size));
      });
      result.sort(function(a, b) {
        return b - a;
      });
      return result;
    }
    _determineLevelsByHubsize() {
      const levelDownstream = (nodeA, nodeB) => {
        this.hierarchical.levelDownstream(nodeA, nodeB);
      };
      const hubSizes = this._getHubSizes();
      for (let i2 = 0; i2 < hubSizes.length; ++i2) {
        const hubSize = hubSizes[i2];
        if (hubSize === 0)
          break;
        forEach(this.body.nodeIndices, (nodeId) => {
          const node = this.body.nodes[nodeId];
          if (hubSize === this._getActiveEdges(node).length) {
            this._crawlNetwork(levelDownstream, nodeId);
          }
        });
      }
    }
    _determineLevelsCustomCallback() {
      const minLevel = 1e5;
      const customCallback = function(nodeA, nodeB, edge) {
      };
      const levelByDirection = (nodeA, nodeB, edge) => {
        let levelA = this.hierarchical.levels[nodeA.id];
        if (levelA === void 0) {
          levelA = this.hierarchical.levels[nodeA.id] = minLevel;
        }
        const diff = customCallback(NetworkUtil.cloneOptions(nodeA, "node"), NetworkUtil.cloneOptions(nodeB, "node"), NetworkUtil.cloneOptions(edge, "edge"));
        this.hierarchical.levels[nodeB.id] = levelA + diff;
      };
      this._crawlNetwork(levelByDirection);
      this.hierarchical.setMinLevelToZero(this.body.nodes);
    }
    _determineLevelsDirected() {
      const nodes = this.body.nodeIndices.reduce((acc, id) => {
        acc.set(id, this.body.nodes[id]);
        return acc;
      }, new Map());
      if (this.options.hierarchical.shakeTowards === "roots") {
        this.hierarchical.levels = fillLevelsByDirectionRoots(nodes);
      } else {
        this.hierarchical.levels = fillLevelsByDirectionLeaves(nodes);
      }
      this.hierarchical.setMinLevelToZero(this.body.nodes);
    }
    _generateMap() {
      const fillInRelations = (parentNode, childNode) => {
        if (this.hierarchical.levels[childNode.id] > this.hierarchical.levels[parentNode.id]) {
          this.hierarchical.addRelation(parentNode.id, childNode.id);
        }
      };
      this._crawlNetwork(fillInRelations);
      this.hierarchical.checkIfTree();
    }
    _crawlNetwork(callback = function() {
    }, startingNodeId) {
      const progress = {};
      const crawler = (node, tree) => {
        if (progress[node.id] === void 0) {
          this.hierarchical.setTreeIndex(node, tree);
          progress[node.id] = true;
          let childNode;
          const edges = this._getActiveEdges(node);
          for (let i2 = 0; i2 < edges.length; i2++) {
            const edge = edges[i2];
            if (edge.connected === true) {
              if (edge.toId == node.id) {
                childNode = edge.from;
              } else {
                childNode = edge.to;
              }
              if (node.id != childNode.id) {
                callback(node, childNode, edge);
                crawler(childNode, tree);
              }
            }
          }
        }
      };
      if (startingNodeId === void 0) {
        let treeIndex = 0;
        for (let i2 = 0; i2 < this.body.nodeIndices.length; i2++) {
          const nodeId = this.body.nodeIndices[i2];
          if (progress[nodeId] === void 0) {
            const node = this.body.nodes[nodeId];
            crawler(node, treeIndex);
            treeIndex += 1;
          }
        }
      } else {
        const node = this.body.nodes[startingNodeId];
        if (node === void 0) {
          console.error("Node not found:", startingNodeId);
          return;
        }
        crawler(node);
      }
    }
    _shiftBlock(parentId, diff) {
      const progress = {};
      const shifter = (parentId2) => {
        if (progress[parentId2]) {
          return;
        }
        progress[parentId2] = true;
        this.direction.shift(parentId2, diff);
        const childRef = this.hierarchical.childrenReference[parentId2];
        if (childRef !== void 0) {
          for (let i2 = 0; i2 < childRef.length; i2++) {
            shifter(childRef[i2]);
          }
        }
      };
      shifter(parentId);
    }
    _findCommonParent(childA, childB) {
      const parents = {};
      const iterateParents = (parents2, child) => {
        const parentRef = this.hierarchical.parentReference[child];
        if (parentRef !== void 0) {
          for (let i2 = 0; i2 < parentRef.length; i2++) {
            const parent = parentRef[i2];
            parents2[parent] = true;
            iterateParents(parents2, parent);
          }
        }
      };
      const findParent = (parents2, child) => {
        const parentRef = this.hierarchical.parentReference[child];
        if (parentRef !== void 0) {
          for (let i2 = 0; i2 < parentRef.length; i2++) {
            const parent = parentRef[i2];
            if (parents2[parent] !== void 0) {
              return { foundParent: parent, withChild: child };
            }
            const branch = findParent(parents2, parent);
            if (branch.foundParent !== null) {
              return branch;
            }
          }
        }
        return { foundParent: null, withChild: child };
      };
      iterateParents(parents, childA);
      return findParent(parents, childB);
    }
    setDirectionStrategy() {
      const isVertical = this.options.hierarchical.direction === "UD" || this.options.hierarchical.direction === "DU";
      if (isVertical) {
        this.direction = new VerticalStrategy(this);
      } else {
        this.direction = new HorizontalStrategy(this);
      }
    }
    _getCenterPosition(childNodes) {
      let minPos = 1e9;
      let maxPos = -1e9;
      for (let i2 = 0; i2 < childNodes.length; i2++) {
        let childNode;
        if (childNodes[i2].id !== void 0) {
          childNode = childNodes[i2];
        } else {
          const childNodeId = childNodes[i2];
          childNode = this.body.nodes[childNodeId];
        }
        const position = this.direction.getPosition(childNode);
        minPos = Math.min(minPos, position);
        maxPos = Math.max(maxPos, position);
      }
      return 0.5 * (minPos + maxPos);
    }
  };
  var ManipulationSystem = class {
    constructor(body, canvas, selectionHandler, interactionHandler) {
      this.body = body;
      this.canvas = canvas;
      this.selectionHandler = selectionHandler;
      this.interactionHandler = interactionHandler;
      this.editMode = false;
      this.manipulationDiv = void 0;
      this.editModeDiv = void 0;
      this.closeDiv = void 0;
      this._domEventListenerCleanupQueue = [];
      this.temporaryUIFunctions = {};
      this.temporaryEventFunctions = [];
      this.touchTime = 0;
      this.temporaryIds = { nodes: [], edges: [] };
      this.guiEnabled = false;
      this.inMode = false;
      this.selectedControlNode = void 0;
      this.options = {};
      this.defaultOptions = {
        enabled: false,
        initiallyActive: false,
        addNode: true,
        addEdge: true,
        editNode: void 0,
        editEdge: true,
        deleteNode: true,
        deleteEdge: true,
        controlNodeStyle: {
          shape: "dot",
          size: 6,
          color: {
            background: "#ff0000",
            border: "#3c3c3c",
            highlight: { background: "#07f968", border: "#3c3c3c" }
          },
          borderWidth: 2,
          borderWidthSelected: 2
        }
      };
      Object.assign(this.options, this.defaultOptions);
      this.body.emitter.on("destroy", () => {
        this._clean();
      });
      this.body.emitter.on("_dataChanged", this._restore.bind(this));
      this.body.emitter.on("_resetData", this._restore.bind(this));
    }
    _restore() {
      if (this.inMode !== false) {
        if (this.options.initiallyActive === true) {
          this.enableEditMode();
        } else {
          this.disableEditMode();
        }
      }
    }
    setOptions(options2, allOptions3, globalOptions) {
      if (allOptions3 !== void 0) {
        if (allOptions3.locale !== void 0) {
          this.options.locale = allOptions3.locale;
        } else {
          this.options.locale = globalOptions.locale;
        }
        if (allOptions3.locales !== void 0) {
          this.options.locales = allOptions3.locales;
        } else {
          this.options.locales = globalOptions.locales;
        }
      }
      if (options2 !== void 0) {
        if (typeof options2 === "boolean") {
          this.options.enabled = options2;
        } else {
          this.options.enabled = true;
          deepExtend(this.options, options2);
        }
        if (this.options.initiallyActive === true) {
          this.editMode = true;
        }
        this._setup();
      }
    }
    toggleEditMode() {
      if (this.editMode === true) {
        this.disableEditMode();
      } else {
        this.enableEditMode();
      }
    }
    enableEditMode() {
      this.editMode = true;
      this._clean();
      if (this.guiEnabled === true) {
        this.manipulationDiv.style.display = "block";
        this.closeDiv.style.display = "block";
        this.editModeDiv.style.display = "none";
        this.showManipulatorToolbar();
      }
    }
    disableEditMode() {
      this.editMode = false;
      this._clean();
      if (this.guiEnabled === true) {
        this.manipulationDiv.style.display = "none";
        this.closeDiv.style.display = "none";
        this.editModeDiv.style.display = "block";
        this._createEditButton();
      }
    }
    showManipulatorToolbar() {
      this._clean();
      this.manipulationDOM = {};
      if (this.guiEnabled === true) {
        this.editMode = true;
        this.manipulationDiv.style.display = "block";
        this.closeDiv.style.display = "block";
        const selectedNodeCount = this.selectionHandler.getSelectedNodeCount();
        const selectedEdgeCount = this.selectionHandler.getSelectedEdgeCount();
        const selectedTotalCount = selectedNodeCount + selectedEdgeCount;
        const locale = this.options.locales[this.options.locale];
        let needSeperator = false;
        if (this.options.addNode !== false) {
          this._createAddNodeButton(locale);
          needSeperator = true;
        }
        if (this.options.addEdge !== false) {
          if (needSeperator === true) {
            this._createSeperator(1);
          } else {
            needSeperator = true;
          }
          this._createAddEdgeButton(locale);
        }
        if (selectedNodeCount === 1 && typeof this.options.editNode === "function") {
          if (needSeperator === true) {
            this._createSeperator(2);
          } else {
            needSeperator = true;
          }
          this._createEditNodeButton(locale);
        } else if (selectedEdgeCount === 1 && selectedNodeCount === 0 && this.options.editEdge !== false) {
          if (needSeperator === true) {
            this._createSeperator(3);
          } else {
            needSeperator = true;
          }
          this._createEditEdgeButton(locale);
        }
        if (selectedTotalCount !== 0) {
          if (selectedNodeCount > 0 && this.options.deleteNode !== false) {
            if (needSeperator === true) {
              this._createSeperator(4);
            }
            this._createDeleteButton(locale);
          } else if (selectedNodeCount === 0 && this.options.deleteEdge !== false) {
            if (needSeperator === true) {
              this._createSeperator(4);
            }
            this._createDeleteButton(locale);
          }
        }
        this._bindElementEvents(this.closeDiv, this.toggleEditMode.bind(this));
        this._temporaryBindEvent("select", this.showManipulatorToolbar.bind(this));
      }
      this.body.emitter.emit("_redraw");
    }
    addNodeMode() {
      if (this.editMode !== true) {
        this.enableEditMode();
      }
      this._clean();
      this.inMode = "addNode";
      if (this.guiEnabled === true) {
        const locale = this.options.locales[this.options.locale];
        this.manipulationDOM = {};
        this._createBackButton(locale);
        this._createSeperator();
        this._createDescription(locale["addDescription"] || this.options.locales["en"]["addDescription"]);
        this._bindElementEvents(this.closeDiv, this.toggleEditMode.bind(this));
      }
      this._temporaryBindEvent("click", this._performAddNode.bind(this));
    }
    editNode() {
      if (this.editMode !== true) {
        this.enableEditMode();
      }
      this._clean();
      const node = this.selectionHandler.getSelectedNodes()[0];
      if (node !== void 0) {
        this.inMode = "editNode";
        if (typeof this.options.editNode === "function") {
          if (node.isCluster !== true) {
            const data = deepExtend({}, node.options, false);
            data.x = node.x;
            data.y = node.y;
            if (this.options.editNode.length === 2) {
              this.options.editNode(data, (finalizedData) => {
                if (finalizedData !== null && finalizedData !== void 0 && this.inMode === "editNode") {
                  this.body.data.nodes.getDataSet().update(finalizedData);
                }
                this.showManipulatorToolbar();
              });
            } else {
              throw new Error("The function for edit does not support two arguments (data, callback)");
            }
          } else {
            alert(this.options.locales[this.options.locale]["editClusterError"] || this.options.locales["en"]["editClusterError"]);
          }
        } else {
          throw new Error("No function has been configured to handle the editing of nodes.");
        }
      } else {
        this.showManipulatorToolbar();
      }
    }
    addEdgeMode() {
      if (this.editMode !== true) {
        this.enableEditMode();
      }
      this._clean();
      this.inMode = "addEdge";
      if (this.guiEnabled === true) {
        const locale = this.options.locales[this.options.locale];
        this.manipulationDOM = {};
        this._createBackButton(locale);
        this._createSeperator();
        this._createDescription(locale["edgeDescription"] || this.options.locales["en"]["edgeDescription"]);
        this._bindElementEvents(this.closeDiv, this.toggleEditMode.bind(this));
      }
      this._temporaryBindUI("onTouch", this._handleConnect.bind(this));
      this._temporaryBindUI("onDragEnd", this._finishConnect.bind(this));
      this._temporaryBindUI("onDrag", this._dragControlNode.bind(this));
      this._temporaryBindUI("onRelease", this._finishConnect.bind(this));
      this._temporaryBindUI("onDragStart", this._dragStartEdge.bind(this));
      this._temporaryBindUI("onHold", () => {
      });
    }
    editEdgeMode() {
      if (this.editMode !== true) {
        this.enableEditMode();
      }
      this._clean();
      this.inMode = "editEdge";
      if (typeof this.options.editEdge === "object" && typeof this.options.editEdge.editWithoutDrag === "function") {
        this.edgeBeingEditedId = this.selectionHandler.getSelectedEdgeIds()[0];
        if (this.edgeBeingEditedId !== void 0) {
          const edge = this.body.edges[this.edgeBeingEditedId];
          this._performEditEdge(edge.from.id, edge.to.id);
          return;
        }
      }
      if (this.guiEnabled === true) {
        const locale = this.options.locales[this.options.locale];
        this.manipulationDOM = {};
        this._createBackButton(locale);
        this._createSeperator();
        this._createDescription(locale["editEdgeDescription"] || this.options.locales["en"]["editEdgeDescription"]);
        this._bindElementEvents(this.closeDiv, this.toggleEditMode.bind(this));
      }
      this.edgeBeingEditedId = this.selectionHandler.getSelectedEdgeIds()[0];
      if (this.edgeBeingEditedId !== void 0) {
        const edge = this.body.edges[this.edgeBeingEditedId];
        const controlNodeFrom = this._getNewTargetNode(edge.from.x, edge.from.y);
        const controlNodeTo = this._getNewTargetNode(edge.to.x, edge.to.y);
        this.temporaryIds.nodes.push(controlNodeFrom.id);
        this.temporaryIds.nodes.push(controlNodeTo.id);
        this.body.nodes[controlNodeFrom.id] = controlNodeFrom;
        this.body.nodeIndices.push(controlNodeFrom.id);
        this.body.nodes[controlNodeTo.id] = controlNodeTo;
        this.body.nodeIndices.push(controlNodeTo.id);
        this._temporaryBindUI("onTouch", this._controlNodeTouch.bind(this));
        this._temporaryBindUI("onTap", () => {
        });
        this._temporaryBindUI("onHold", () => {
        });
        this._temporaryBindUI("onDragStart", this._controlNodeDragStart.bind(this));
        this._temporaryBindUI("onDrag", this._controlNodeDrag.bind(this));
        this._temporaryBindUI("onDragEnd", this._controlNodeDragEnd.bind(this));
        this._temporaryBindUI("onMouseMove", () => {
        });
        this._temporaryBindEvent("beforeDrawing", (ctx) => {
          const positions = edge.edgeType.findBorderPositions(ctx);
          if (controlNodeFrom.selected === false) {
            controlNodeFrom.x = positions.from.x;
            controlNodeFrom.y = positions.from.y;
          }
          if (controlNodeTo.selected === false) {
            controlNodeTo.x = positions.to.x;
            controlNodeTo.y = positions.to.y;
          }
        });
        this.body.emitter.emit("_redraw");
      } else {
        this.showManipulatorToolbar();
      }
    }
    deleteSelected() {
      if (this.editMode !== true) {
        this.enableEditMode();
      }
      this._clean();
      this.inMode = "delete";
      const selectedNodes = this.selectionHandler.getSelectedNodeIds();
      const selectedEdges = this.selectionHandler.getSelectedEdgeIds();
      let deleteFunction = void 0;
      if (selectedNodes.length > 0) {
        for (let i2 = 0; i2 < selectedNodes.length; i2++) {
          if (this.body.nodes[selectedNodes[i2]].isCluster === true) {
            alert(this.options.locales[this.options.locale]["deleteClusterError"] || this.options.locales["en"]["deleteClusterError"]);
            return;
          }
        }
        if (typeof this.options.deleteNode === "function") {
          deleteFunction = this.options.deleteNode;
        }
      } else if (selectedEdges.length > 0) {
        if (typeof this.options.deleteEdge === "function") {
          deleteFunction = this.options.deleteEdge;
        }
      }
      if (typeof deleteFunction === "function") {
        const data = { nodes: selectedNodes, edges: selectedEdges };
        if (deleteFunction.length === 2) {
          deleteFunction(data, (finalizedData) => {
            if (finalizedData !== null && finalizedData !== void 0 && this.inMode === "delete") {
              this.body.data.edges.getDataSet().remove(finalizedData.edges);
              this.body.data.nodes.getDataSet().remove(finalizedData.nodes);
              this.body.emitter.emit("startSimulation");
              this.showManipulatorToolbar();
            } else {
              this.body.emitter.emit("startSimulation");
              this.showManipulatorToolbar();
            }
          });
        } else {
          throw new Error("The function for delete does not support two arguments (data, callback)");
        }
      } else {
        this.body.data.edges.getDataSet().remove(selectedEdges);
        this.body.data.nodes.getDataSet().remove(selectedNodes);
        this.body.emitter.emit("startSimulation");
        this.showManipulatorToolbar();
      }
    }
    _setup() {
      if (this.options.enabled === true) {
        this.guiEnabled = true;
        this._createWrappers();
        if (this.editMode === false) {
          this._createEditButton();
        } else {
          this.showManipulatorToolbar();
        }
      } else {
        this._removeManipulationDOM();
        this.guiEnabled = false;
      }
    }
    _createWrappers() {
      var _a, _b;
      if (this.manipulationDiv === void 0) {
        this.manipulationDiv = document.createElement("div");
        this.manipulationDiv.className = "vis-manipulation";
        if (this.editMode === true) {
          this.manipulationDiv.style.display = "block";
        } else {
          this.manipulationDiv.style.display = "none";
        }
        this.canvas.frame.appendChild(this.manipulationDiv);
      }
      if (this.editModeDiv === void 0) {
        this.editModeDiv = document.createElement("div");
        this.editModeDiv.className = "vis-edit-mode";
        if (this.editMode === true) {
          this.editModeDiv.style.display = "none";
        } else {
          this.editModeDiv.style.display = "block";
        }
        this.canvas.frame.appendChild(this.editModeDiv);
      }
      if (this.closeDiv === void 0) {
        this.closeDiv = document.createElement("button");
        this.closeDiv.className = "vis-close";
        this.closeDiv.setAttribute("aria-label", (_b = (_a = this.options.locales[this.options.locale]) == null ? void 0 : _a["close"]) != null ? _b : this.options.locales["en"]["close"]);
        this.closeDiv.style.display = this.manipulationDiv.style.display;
        this.canvas.frame.appendChild(this.closeDiv);
      }
    }
    _getNewTargetNode(x2, y2) {
      const controlNodeStyle = deepExtend({}, this.options.controlNodeStyle);
      controlNodeStyle.id = "targetNode" + v4_default();
      controlNodeStyle.hidden = false;
      controlNodeStyle.physics = false;
      controlNodeStyle.x = x2;
      controlNodeStyle.y = y2;
      const node = this.body.functions.createNode(controlNodeStyle);
      node.shape.boundingBox = { left: x2, right: x2, top: y2, bottom: y2 };
      return node;
    }
    _createEditButton() {
      this._clean();
      this.manipulationDOM = {};
      recursiveDOMDelete(this.editModeDiv);
      const locale = this.options.locales[this.options.locale];
      const button = this._createButton("editMode", "vis-edit vis-edit-mode", locale["edit"] || this.options.locales["en"]["edit"]);
      this.editModeDiv.appendChild(button);
      this._bindElementEvents(button, this.toggleEditMode.bind(this));
    }
    _clean() {
      this.inMode = false;
      if (this.guiEnabled === true) {
        recursiveDOMDelete(this.editModeDiv);
        recursiveDOMDelete(this.manipulationDiv);
        this._cleanupDOMEventListeners();
      }
      this._cleanupTemporaryNodesAndEdges();
      this._unbindTemporaryUIs();
      this._unbindTemporaryEvents();
      this.body.emitter.emit("restorePhysics");
    }
    _cleanupDOMEventListeners() {
      for (const callback of this._domEventListenerCleanupQueue.splice(0)) {
        callback();
      }
    }
    _removeManipulationDOM() {
      this._clean();
      recursiveDOMDelete(this.manipulationDiv);
      recursiveDOMDelete(this.editModeDiv);
      recursiveDOMDelete(this.closeDiv);
      if (this.manipulationDiv) {
        this.canvas.frame.removeChild(this.manipulationDiv);
      }
      if (this.editModeDiv) {
        this.canvas.frame.removeChild(this.editModeDiv);
      }
      if (this.closeDiv) {
        this.canvas.frame.removeChild(this.closeDiv);
      }
      this.manipulationDiv = void 0;
      this.editModeDiv = void 0;
      this.closeDiv = void 0;
    }
    _createSeperator(index2 = 1) {
      this.manipulationDOM["seperatorLineDiv" + index2] = document.createElement("div");
      this.manipulationDOM["seperatorLineDiv" + index2].className = "vis-separator-line";
      this.manipulationDiv.appendChild(this.manipulationDOM["seperatorLineDiv" + index2]);
    }
    _createAddNodeButton(locale) {
      const button = this._createButton("addNode", "vis-add", locale["addNode"] || this.options.locales["en"]["addNode"]);
      this.manipulationDiv.appendChild(button);
      this._bindElementEvents(button, this.addNodeMode.bind(this));
    }
    _createAddEdgeButton(locale) {
      const button = this._createButton("addEdge", "vis-connect", locale["addEdge"] || this.options.locales["en"]["addEdge"]);
      this.manipulationDiv.appendChild(button);
      this._bindElementEvents(button, this.addEdgeMode.bind(this));
    }
    _createEditNodeButton(locale) {
      const button = this._createButton("editNode", "vis-edit", locale["editNode"] || this.options.locales["en"]["editNode"]);
      this.manipulationDiv.appendChild(button);
      this._bindElementEvents(button, this.editNode.bind(this));
    }
    _createEditEdgeButton(locale) {
      const button = this._createButton("editEdge", "vis-edit", locale["editEdge"] || this.options.locales["en"]["editEdge"]);
      this.manipulationDiv.appendChild(button);
      this._bindElementEvents(button, this.editEdgeMode.bind(this));
    }
    _createDeleteButton(locale) {
      let deleteBtnClass;
      if (this.options.rtl) {
        deleteBtnClass = "vis-delete-rtl";
      } else {
        deleteBtnClass = "vis-delete";
      }
      const button = this._createButton("delete", deleteBtnClass, locale["del"] || this.options.locales["en"]["del"]);
      this.manipulationDiv.appendChild(button);
      this._bindElementEvents(button, this.deleteSelected.bind(this));
    }
    _createBackButton(locale) {
      const button = this._createButton("back", "vis-back", locale["back"] || this.options.locales["en"]["back"]);
      this.manipulationDiv.appendChild(button);
      this._bindElementEvents(button, this.showManipulatorToolbar.bind(this));
    }
    _createButton(id, className, label, labelClassName = "vis-label") {
      this.manipulationDOM[id + "Div"] = document.createElement("button");
      this.manipulationDOM[id + "Div"].className = "vis-button " + className;
      this.manipulationDOM[id + "Label"] = document.createElement("div");
      this.manipulationDOM[id + "Label"].className = labelClassName;
      this.manipulationDOM[id + "Label"].innerText = label;
      this.manipulationDOM[id + "Div"].appendChild(this.manipulationDOM[id + "Label"]);
      return this.manipulationDOM[id + "Div"];
    }
    _createDescription(label) {
      this.manipulationDOM["descriptionLabel"] = document.createElement("div");
      this.manipulationDOM["descriptionLabel"].className = "vis-none";
      this.manipulationDOM["descriptionLabel"].innerText = label;
      this.manipulationDiv.appendChild(this.manipulationDOM["descriptionLabel"]);
    }
    _temporaryBindEvent(event, newFunction) {
      this.temporaryEventFunctions.push({
        event,
        boundFunction: newFunction
      });
      this.body.emitter.on(event, newFunction);
    }
    _temporaryBindUI(UIfunctionName, newFunction) {
      if (this.body.eventListeners[UIfunctionName] !== void 0) {
        this.temporaryUIFunctions[UIfunctionName] = this.body.eventListeners[UIfunctionName];
        this.body.eventListeners[UIfunctionName] = newFunction;
      } else {
        throw new Error("This UI function does not exist. Typo? You tried: " + UIfunctionName + " possible are: " + JSON.stringify(Object.keys(this.body.eventListeners)));
      }
    }
    _unbindTemporaryUIs() {
      for (const functionName in this.temporaryUIFunctions) {
        if (Object.prototype.hasOwnProperty.call(this.temporaryUIFunctions, functionName)) {
          this.body.eventListeners[functionName] = this.temporaryUIFunctions[functionName];
          delete this.temporaryUIFunctions[functionName];
        }
      }
      this.temporaryUIFunctions = {};
    }
    _unbindTemporaryEvents() {
      for (let i2 = 0; i2 < this.temporaryEventFunctions.length; i2++) {
        const eventName = this.temporaryEventFunctions[i2].event;
        const boundFunction = this.temporaryEventFunctions[i2].boundFunction;
        this.body.emitter.off(eventName, boundFunction);
      }
      this.temporaryEventFunctions = [];
    }
    _bindElementEvents(domElement, boundFunction) {
      const hammer = new Hammer2(domElement, {});
      onTouch(hammer, boundFunction);
      this._domEventListenerCleanupQueue.push(() => {
        hammer.destroy();
      });
      const keyupListener = ({ keyCode, key }) => {
        if (key === "Enter" || key === " " || keyCode === 13 || keyCode === 32) {
          boundFunction();
        }
      };
      domElement.addEventListener("keyup", keyupListener, false);
      this._domEventListenerCleanupQueue.push(() => {
        domElement.removeEventListener("keyup", keyupListener, false);
      });
    }
    _cleanupTemporaryNodesAndEdges() {
      for (let i2 = 0; i2 < this.temporaryIds.edges.length; i2++) {
        this.body.edges[this.temporaryIds.edges[i2]].disconnect();
        delete this.body.edges[this.temporaryIds.edges[i2]];
        const indexTempEdge = this.body.edgeIndices.indexOf(this.temporaryIds.edges[i2]);
        if (indexTempEdge !== -1) {
          this.body.edgeIndices.splice(indexTempEdge, 1);
        }
      }
      for (let i2 = 0; i2 < this.temporaryIds.nodes.length; i2++) {
        delete this.body.nodes[this.temporaryIds.nodes[i2]];
        const indexTempNode = this.body.nodeIndices.indexOf(this.temporaryIds.nodes[i2]);
        if (indexTempNode !== -1) {
          this.body.nodeIndices.splice(indexTempNode, 1);
        }
      }
      this.temporaryIds = { nodes: [], edges: [] };
    }
    _controlNodeTouch(event) {
      this.selectionHandler.unselectAll();
      this.lastTouch = this.body.functions.getPointer(event.center);
      this.lastTouch.translation = Object.assign({}, this.body.view.translation);
    }
    _controlNodeDragStart() {
      const pointer = this.lastTouch;
      const pointerObj = this.selectionHandler._pointerToPositionObject(pointer);
      const from = this.body.nodes[this.temporaryIds.nodes[0]];
      const to = this.body.nodes[this.temporaryIds.nodes[1]];
      const edge = this.body.edges[this.edgeBeingEditedId];
      this.selectedControlNode = void 0;
      const fromSelect = from.isOverlappingWith(pointerObj);
      const toSelect = to.isOverlappingWith(pointerObj);
      if (fromSelect === true) {
        this.selectedControlNode = from;
        edge.edgeType.from = from;
      } else if (toSelect === true) {
        this.selectedControlNode = to;
        edge.edgeType.to = to;
      }
      if (this.selectedControlNode !== void 0) {
        this.selectionHandler.selectObject(this.selectedControlNode);
      }
      this.body.emitter.emit("_redraw");
    }
    _controlNodeDrag(event) {
      this.body.emitter.emit("disablePhysics");
      const pointer = this.body.functions.getPointer(event.center);
      const pos2 = this.canvas.DOMtoCanvas(pointer);
      if (this.selectedControlNode !== void 0) {
        this.selectedControlNode.x = pos2.x;
        this.selectedControlNode.y = pos2.y;
      } else {
        this.interactionHandler.onDrag(event);
      }
      this.body.emitter.emit("_redraw");
    }
    _controlNodeDragEnd(event) {
      const pointer = this.body.functions.getPointer(event.center);
      const pointerObj = this.selectionHandler._pointerToPositionObject(pointer);
      const edge = this.body.edges[this.edgeBeingEditedId];
      if (this.selectedControlNode === void 0) {
        return;
      }
      this.selectionHandler.unselectAll();
      const overlappingNodeIds = this.selectionHandler._getAllNodesOverlappingWith(pointerObj);
      let node = void 0;
      for (let i2 = overlappingNodeIds.length - 1; i2 >= 0; i2--) {
        if (overlappingNodeIds[i2] !== this.selectedControlNode.id) {
          node = this.body.nodes[overlappingNodeIds[i2]];
          break;
        }
      }
      if (node !== void 0 && this.selectedControlNode !== void 0) {
        if (node.isCluster === true) {
          alert(this.options.locales[this.options.locale]["createEdgeError"] || this.options.locales["en"]["createEdgeError"]);
        } else {
          const from = this.body.nodes[this.temporaryIds.nodes[0]];
          if (this.selectedControlNode.id === from.id) {
            this._performEditEdge(node.id, edge.to.id);
          } else {
            this._performEditEdge(edge.from.id, node.id);
          }
        }
      } else {
        edge.updateEdgeType();
        this.body.emitter.emit("restorePhysics");
      }
      this.body.emitter.emit("_redraw");
    }
    _handleConnect(event) {
      if (new Date().valueOf() - this.touchTime > 100) {
        this.lastTouch = this.body.functions.getPointer(event.center);
        this.lastTouch.translation = Object.assign({}, this.body.view.translation);
        this.interactionHandler.drag.pointer = this.lastTouch;
        this.interactionHandler.drag.translation = this.lastTouch.translation;
        const pointer = this.lastTouch;
        const node = this.selectionHandler.getNodeAt(pointer);
        if (node !== void 0) {
          if (node.isCluster === true) {
            alert(this.options.locales[this.options.locale]["createEdgeError"] || this.options.locales["en"]["createEdgeError"]);
          } else {
            const targetNode = this._getNewTargetNode(node.x, node.y);
            this.body.nodes[targetNode.id] = targetNode;
            this.body.nodeIndices.push(targetNode.id);
            const connectionEdge = this.body.functions.createEdge({
              id: "connectionEdge" + v4_default(),
              from: node.id,
              to: targetNode.id,
              physics: false,
              smooth: {
                enabled: true,
                type: "continuous",
                roundness: 0.5
              }
            });
            this.body.edges[connectionEdge.id] = connectionEdge;
            this.body.edgeIndices.push(connectionEdge.id);
            this.temporaryIds.nodes.push(targetNode.id);
            this.temporaryIds.edges.push(connectionEdge.id);
          }
        }
        this.touchTime = new Date().valueOf();
      }
    }
    _dragControlNode(event) {
      const pointer = this.body.functions.getPointer(event.center);
      const pointerObj = this.selectionHandler._pointerToPositionObject(pointer);
      let connectFromId = void 0;
      if (this.temporaryIds.edges[0] !== void 0) {
        connectFromId = this.body.edges[this.temporaryIds.edges[0]].fromId;
      }
      const overlappingNodeIds = this.selectionHandler._getAllNodesOverlappingWith(pointerObj);
      let node = void 0;
      for (let i2 = overlappingNodeIds.length - 1; i2 >= 0; i2--) {
        if (this.temporaryIds.nodes.indexOf(overlappingNodeIds[i2]) === -1) {
          node = this.body.nodes[overlappingNodeIds[i2]];
          break;
        }
      }
      event.controlEdge = { from: connectFromId, to: node ? node.id : void 0 };
      this.selectionHandler.generateClickEvent("controlNodeDragging", event, pointer);
      if (this.temporaryIds.nodes[0] !== void 0) {
        const targetNode = this.body.nodes[this.temporaryIds.nodes[0]];
        targetNode.x = this.canvas._XconvertDOMtoCanvas(pointer.x);
        targetNode.y = this.canvas._YconvertDOMtoCanvas(pointer.y);
        this.body.emitter.emit("_redraw");
      } else {
        this.interactionHandler.onDrag(event);
      }
    }
    _finishConnect(event) {
      const pointer = this.body.functions.getPointer(event.center);
      const pointerObj = this.selectionHandler._pointerToPositionObject(pointer);
      let connectFromId = void 0;
      if (this.temporaryIds.edges[0] !== void 0) {
        connectFromId = this.body.edges[this.temporaryIds.edges[0]].fromId;
      }
      const overlappingNodeIds = this.selectionHandler._getAllNodesOverlappingWith(pointerObj);
      let node = void 0;
      for (let i2 = overlappingNodeIds.length - 1; i2 >= 0; i2--) {
        if (this.temporaryIds.nodes.indexOf(overlappingNodeIds[i2]) === -1) {
          node = this.body.nodes[overlappingNodeIds[i2]];
          break;
        }
      }
      this._cleanupTemporaryNodesAndEdges();
      if (node !== void 0) {
        if (node.isCluster === true) {
          alert(this.options.locales[this.options.locale]["createEdgeError"] || this.options.locales["en"]["createEdgeError"]);
        } else {
          if (this.body.nodes[connectFromId] !== void 0 && this.body.nodes[node.id] !== void 0) {
            this._performAddEdge(connectFromId, node.id);
          }
        }
      }
      event.controlEdge = { from: connectFromId, to: node ? node.id : void 0 };
      this.selectionHandler.generateClickEvent("controlNodeDragEnd", event, pointer);
      this.body.emitter.emit("_redraw");
    }
    _dragStartEdge(event) {
      const pointer = this.lastTouch;
      this.selectionHandler.generateClickEvent("dragStart", event, pointer, void 0, true);
    }
    _performAddNode(clickData) {
      const defaultData = {
        id: v4_default(),
        x: clickData.pointer.canvas.x,
        y: clickData.pointer.canvas.y,
        label: "new"
      };
      if (typeof this.options.addNode === "function") {
        if (this.options.addNode.length === 2) {
          this.options.addNode(defaultData, (finalizedData) => {
            if (finalizedData !== null && finalizedData !== void 0 && this.inMode === "addNode") {
              this.body.data.nodes.getDataSet().add(finalizedData);
            }
            this.showManipulatorToolbar();
          });
        } else {
          this.showManipulatorToolbar();
          throw new Error("The function for add does not support two arguments (data,callback)");
        }
      } else {
        this.body.data.nodes.getDataSet().add(defaultData);
        this.showManipulatorToolbar();
      }
    }
    _performAddEdge(sourceNodeId, targetNodeId) {
      const defaultData = { from: sourceNodeId, to: targetNodeId };
      if (typeof this.options.addEdge === "function") {
        if (this.options.addEdge.length === 2) {
          this.options.addEdge(defaultData, (finalizedData) => {
            if (finalizedData !== null && finalizedData !== void 0 && this.inMode === "addEdge") {
              this.body.data.edges.getDataSet().add(finalizedData);
              this.selectionHandler.unselectAll();
              this.showManipulatorToolbar();
            }
          });
        } else {
          throw new Error("The function for connect does not support two arguments (data,callback)");
        }
      } else {
        this.body.data.edges.getDataSet().add(defaultData);
        this.selectionHandler.unselectAll();
        this.showManipulatorToolbar();
      }
    }
    _performEditEdge(sourceNodeId, targetNodeId) {
      const defaultData = {
        id: this.edgeBeingEditedId,
        from: sourceNodeId,
        to: targetNodeId,
        label: this.body.data.edges.get(this.edgeBeingEditedId).label
      };
      let eeFunct = this.options.editEdge;
      if (typeof eeFunct === "object") {
        eeFunct = eeFunct.editWithoutDrag;
      }
      if (typeof eeFunct === "function") {
        if (eeFunct.length === 2) {
          eeFunct(defaultData, (finalizedData) => {
            if (finalizedData === null || finalizedData === void 0 || this.inMode !== "editEdge") {
              this.body.edges[defaultData.id].updateEdgeType();
              this.body.emitter.emit("_redraw");
              this.showManipulatorToolbar();
            } else {
              this.body.data.edges.getDataSet().update(finalizedData);
              this.selectionHandler.unselectAll();
              this.showManipulatorToolbar();
            }
          });
        } else {
          throw new Error("The function for edit does not support two arguments (data, callback)");
        }
      } else {
        this.body.data.edges.getDataSet().update(defaultData);
        this.selectionHandler.unselectAll();
        this.showManipulatorToolbar();
      }
    }
  };
  var string = "string";
  var bool = "boolean";
  var number = "number";
  var array = "array";
  var object = "object";
  var dom = "dom";
  var any = "any";
  var endPoints = [
    "arrow",
    "bar",
    "box",
    "circle",
    "crow",
    "curve",
    "diamond",
    "image",
    "inv_curve",
    "inv_triangle",
    "triangle",
    "vee"
  ];
  var nodeOptions = {
    borderWidth: { number },
    borderWidthSelected: { number, undefined: "undefined" },
    brokenImage: { string, undefined: "undefined" },
    chosen: {
      label: { boolean: bool, function: "function" },
      node: { boolean: bool, function: "function" },
      __type__: { object, boolean: bool }
    },
    color: {
      border: { string },
      background: { string },
      highlight: {
        border: { string },
        background: { string },
        __type__: { object, string }
      },
      hover: {
        border: { string },
        background: { string },
        __type__: { object, string }
      },
      __type__: { object, string }
    },
    opacity: { number, undefined: "undefined" },
    fixed: {
      x: { boolean: bool },
      y: { boolean: bool },
      __type__: { object, boolean: bool }
    },
    font: {
      align: { string },
      color: { string },
      size: { number },
      face: { string },
      background: { string },
      strokeWidth: { number },
      strokeColor: { string },
      vadjust: { number },
      multi: { boolean: bool, string },
      bold: {
        color: { string },
        size: { number },
        face: { string },
        mod: { string },
        vadjust: { number },
        __type__: { object, string }
      },
      boldital: {
        color: { string },
        size: { number },
        face: { string },
        mod: { string },
        vadjust: { number },
        __type__: { object, string }
      },
      ital: {
        color: { string },
        size: { number },
        face: { string },
        mod: { string },
        vadjust: { number },
        __type__: { object, string }
      },
      mono: {
        color: { string },
        size: { number },
        face: { string },
        mod: { string },
        vadjust: { number },
        __type__: { object, string }
      },
      __type__: { object, string }
    },
    group: { string, number, undefined: "undefined" },
    heightConstraint: {
      minimum: { number },
      valign: { string },
      __type__: { object, boolean: bool, number }
    },
    hidden: { boolean: bool },
    icon: {
      face: { string },
      code: { string },
      size: { number },
      color: { string },
      weight: { string, number },
      __type__: { object }
    },
    id: { string, number },
    image: {
      selected: { string, undefined: "undefined" },
      unselected: { string, undefined: "undefined" },
      __type__: { object, string }
    },
    imagePadding: {
      top: { number },
      right: { number },
      bottom: { number },
      left: { number },
      __type__: { object, number }
    },
    label: { string, undefined: "undefined" },
    labelHighlightBold: { boolean: bool },
    level: { number, undefined: "undefined" },
    margin: {
      top: { number },
      right: { number },
      bottom: { number },
      left: { number },
      __type__: { object, number }
    },
    mass: { number },
    physics: { boolean: bool },
    scaling: {
      min: { number },
      max: { number },
      label: {
        enabled: { boolean: bool },
        min: { number },
        max: { number },
        maxVisible: { number },
        drawThreshold: { number },
        __type__: { object, boolean: bool }
      },
      customScalingFunction: { function: "function" },
      __type__: { object }
    },
    shadow: {
      enabled: { boolean: bool },
      color: { string },
      size: { number },
      x: { number },
      y: { number },
      __type__: { object, boolean: bool }
    },
    shape: {
      string: [
        "custom",
        "ellipse",
        "circle",
        "database",
        "box",
        "text",
        "image",
        "circularImage",
        "diamond",
        "dot",
        "star",
        "triangle",
        "triangleDown",
        "square",
        "icon",
        "hexagon"
      ]
    },
    ctxRenderer: { function: "function" },
    shapeProperties: {
      borderDashes: { boolean: bool, array },
      borderRadius: { number },
      interpolation: { boolean: bool },
      useImageSize: { boolean: bool },
      useBorderWithImage: { boolean: bool },
      coordinateOrigin: { string: ["center", "top-left"] },
      __type__: { object }
    },
    size: { number },
    title: { string, dom, undefined: "undefined" },
    value: { number, undefined: "undefined" },
    widthConstraint: {
      minimum: { number },
      maximum: { number },
      __type__: { object, boolean: bool, number }
    },
    x: { number },
    y: { number },
    __type__: { object }
  };
  var allOptions2 = {
    configure: {
      enabled: { boolean: bool },
      filter: { boolean: bool, string, array, function: "function" },
      container: { dom },
      showButton: { boolean: bool },
      __type__: { object, boolean: bool, string, array, function: "function" }
    },
    edges: {
      arrows: {
        to: {
          enabled: { boolean: bool },
          scaleFactor: { number },
          type: { string: endPoints },
          imageHeight: { number },
          imageWidth: { number },
          src: { string },
          __type__: { object, boolean: bool }
        },
        middle: {
          enabled: { boolean: bool },
          scaleFactor: { number },
          type: { string: endPoints },
          imageWidth: { number },
          imageHeight: { number },
          src: { string },
          __type__: { object, boolean: bool }
        },
        from: {
          enabled: { boolean: bool },
          scaleFactor: { number },
          type: { string: endPoints },
          imageWidth: { number },
          imageHeight: { number },
          src: { string },
          __type__: { object, boolean: bool }
        },
        __type__: { string: ["from", "to", "middle"], object }
      },
      endPointOffset: {
        from: {
          number
        },
        to: {
          number
        },
        __type__: {
          object,
          number
        }
      },
      arrowStrikethrough: { boolean: bool },
      background: {
        enabled: { boolean: bool },
        color: { string },
        size: { number },
        dashes: { boolean: bool, array },
        __type__: { object, boolean: bool }
      },
      chosen: {
        label: { boolean: bool, function: "function" },
        edge: { boolean: bool, function: "function" },
        __type__: { object, boolean: bool }
      },
      color: {
        color: { string },
        highlight: { string },
        hover: { string },
        inherit: { string: ["from", "to", "both"], boolean: bool },
        opacity: { number },
        __type__: { object, string }
      },
      dashes: { boolean: bool, array },
      font: {
        color: { string },
        size: { number },
        face: { string },
        background: { string },
        strokeWidth: { number },
        strokeColor: { string },
        align: { string: ["horizontal", "top", "middle", "bottom"] },
        vadjust: { number },
        multi: { boolean: bool, string },
        bold: {
          color: { string },
          size: { number },
          face: { string },
          mod: { string },
          vadjust: { number },
          __type__: { object, string }
        },
        boldital: {
          color: { string },
          size: { number },
          face: { string },
          mod: { string },
          vadjust: { number },
          __type__: { object, string }
        },
        ital: {
          color: { string },
          size: { number },
          face: { string },
          mod: { string },
          vadjust: { number },
          __type__: { object, string }
        },
        mono: {
          color: { string },
          size: { number },
          face: { string },
          mod: { string },
          vadjust: { number },
          __type__: { object, string }
        },
        __type__: { object, string }
      },
      hidden: { boolean: bool },
      hoverWidth: { function: "function", number },
      label: { string, undefined: "undefined" },
      labelHighlightBold: { boolean: bool },
      length: { number, undefined: "undefined" },
      physics: { boolean: bool },
      scaling: {
        min: { number },
        max: { number },
        label: {
          enabled: { boolean: bool },
          min: { number },
          max: { number },
          maxVisible: { number },
          drawThreshold: { number },
          __type__: { object, boolean: bool }
        },
        customScalingFunction: { function: "function" },
        __type__: { object }
      },
      selectionWidth: { function: "function", number },
      selfReferenceSize: { number },
      selfReference: {
        size: { number },
        angle: { number },
        renderBehindTheNode: { boolean: bool },
        __type__: { object }
      },
      shadow: {
        enabled: { boolean: bool },
        color: { string },
        size: { number },
        x: { number },
        y: { number },
        __type__: { object, boolean: bool }
      },
      smooth: {
        enabled: { boolean: bool },
        type: {
          string: [
            "dynamic",
            "continuous",
            "discrete",
            "diagonalCross",
            "straightCross",
            "horizontal",
            "vertical",
            "curvedCW",
            "curvedCCW",
            "cubicBezier"
          ]
        },
        roundness: { number },
        forceDirection: {
          string: ["horizontal", "vertical", "none"],
          boolean: bool
        },
        __type__: { object, boolean: bool }
      },
      title: { string, undefined: "undefined" },
      width: { number },
      widthConstraint: {
        maximum: { number },
        __type__: { object, boolean: bool, number }
      },
      value: { number, undefined: "undefined" },
      __type__: { object }
    },
    groups: {
      useDefaultGroups: { boolean: bool },
      __any__: nodeOptions,
      __type__: { object }
    },
    interaction: {
      dragNodes: { boolean: bool },
      dragView: { boolean: bool },
      hideEdgesOnDrag: { boolean: bool },
      hideEdgesOnZoom: { boolean: bool },
      hideNodesOnDrag: { boolean: bool },
      hover: { boolean: bool },
      keyboard: {
        enabled: { boolean: bool },
        speed: {
          x: { number },
          y: { number },
          zoom: { number },
          __type__: { object }
        },
        bindToWindow: { boolean: bool },
        autoFocus: { boolean: bool },
        __type__: { object, boolean: bool }
      },
      multiselect: { boolean: bool },
      navigationButtons: { boolean: bool },
      selectable: { boolean: bool },
      selectConnectedEdges: { boolean: bool },
      hoverConnectedEdges: { boolean: bool },
      tooltipDelay: { number },
      zoomView: { boolean: bool },
      zoomSpeed: { number },
      __type__: { object }
    },
    layout: {
      randomSeed: { undefined: "undefined", number, string },
      improvedLayout: { boolean: bool },
      clusterThreshold: { number },
      hierarchical: {
        enabled: { boolean: bool },
        levelSeparation: { number },
        nodeSpacing: { number },
        treeSpacing: { number },
        blockShifting: { boolean: bool },
        edgeMinimization: { boolean: bool },
        parentCentralization: { boolean: bool },
        direction: { string: ["UD", "DU", "LR", "RL"] },
        sortMethod: { string: ["hubsize", "directed"] },
        shakeTowards: { string: ["leaves", "roots"] },
        __type__: { object, boolean: bool }
      },
      __type__: { object }
    },
    manipulation: {
      enabled: { boolean: bool },
      initiallyActive: { boolean: bool },
      addNode: { boolean: bool, function: "function" },
      addEdge: { boolean: bool, function: "function" },
      editNode: { function: "function" },
      editEdge: {
        editWithoutDrag: { function: "function" },
        __type__: { object, boolean: bool, function: "function" }
      },
      deleteNode: { boolean: bool, function: "function" },
      deleteEdge: { boolean: bool, function: "function" },
      controlNodeStyle: nodeOptions,
      __type__: { object, boolean: bool }
    },
    nodes: nodeOptions,
    physics: {
      enabled: { boolean: bool },
      barnesHut: {
        theta: { number },
        gravitationalConstant: { number },
        centralGravity: { number },
        springLength: { number },
        springConstant: { number },
        damping: { number },
        avoidOverlap: { number },
        __type__: { object }
      },
      forceAtlas2Based: {
        theta: { number },
        gravitationalConstant: { number },
        centralGravity: { number },
        springLength: { number },
        springConstant: { number },
        damping: { number },
        avoidOverlap: { number },
        __type__: { object }
      },
      repulsion: {
        centralGravity: { number },
        springLength: { number },
        springConstant: { number },
        nodeDistance: { number },
        damping: { number },
        __type__: { object }
      },
      hierarchicalRepulsion: {
        centralGravity: { number },
        springLength: { number },
        springConstant: { number },
        nodeDistance: { number },
        damping: { number },
        avoidOverlap: { number },
        __type__: { object }
      },
      maxVelocity: { number },
      minVelocity: { number },
      solver: {
        string: [
          "barnesHut",
          "repulsion",
          "hierarchicalRepulsion",
          "forceAtlas2Based"
        ]
      },
      stabilization: {
        enabled: { boolean: bool },
        iterations: { number },
        updateInterval: { number },
        onlyDynamicEdges: { boolean: bool },
        fit: { boolean: bool },
        __type__: { object, boolean: bool }
      },
      timestep: { number },
      adaptiveTimestep: { boolean: bool },
      wind: {
        x: { number },
        y: { number },
        __type__: { object }
      },
      __type__: { object, boolean: bool }
    },
    autoResize: { boolean: bool },
    clickToUse: { boolean: bool },
    locale: { string },
    locales: {
      __any__: { any },
      __type__: { object }
    },
    height: { string },
    width: { string },
    __type__: { object }
  };
  var configureOptions = {
    nodes: {
      borderWidth: [1, 0, 10, 1],
      borderWidthSelected: [2, 0, 10, 1],
      color: {
        border: ["color", "#2B7CE9"],
        background: ["color", "#97C2FC"],
        highlight: {
          border: ["color", "#2B7CE9"],
          background: ["color", "#D2E5FF"]
        },
        hover: {
          border: ["color", "#2B7CE9"],
          background: ["color", "#D2E5FF"]
        }
      },
      opacity: [0, 0, 1, 0.1],
      fixed: {
        x: false,
        y: false
      },
      font: {
        color: ["color", "#343434"],
        size: [14, 0, 100, 1],
        face: ["arial", "verdana", "tahoma"],
        background: ["color", "none"],
        strokeWidth: [0, 0, 50, 1],
        strokeColor: ["color", "#ffffff"]
      },
      hidden: false,
      labelHighlightBold: true,
      physics: true,
      scaling: {
        min: [10, 0, 200, 1],
        max: [30, 0, 200, 1],
        label: {
          enabled: false,
          min: [14, 0, 200, 1],
          max: [30, 0, 200, 1],
          maxVisible: [30, 0, 200, 1],
          drawThreshold: [5, 0, 20, 1]
        }
      },
      shadow: {
        enabled: false,
        color: "rgba(0,0,0,0.5)",
        size: [10, 0, 20, 1],
        x: [5, -30, 30, 1],
        y: [5, -30, 30, 1]
      },
      shape: [
        "ellipse",
        "box",
        "circle",
        "database",
        "diamond",
        "dot",
        "square",
        "star",
        "text",
        "triangle",
        "triangleDown",
        "hexagon"
      ],
      shapeProperties: {
        borderDashes: false,
        borderRadius: [6, 0, 20, 1],
        interpolation: true,
        useImageSize: false
      },
      size: [25, 0, 200, 1]
    },
    edges: {
      arrows: {
        to: { enabled: false, scaleFactor: [1, 0, 3, 0.05], type: "arrow" },
        middle: { enabled: false, scaleFactor: [1, 0, 3, 0.05], type: "arrow" },
        from: { enabled: false, scaleFactor: [1, 0, 3, 0.05], type: "arrow" }
      },
      endPointOffset: {
        from: [0, -10, 10, 1],
        to: [0, -10, 10, 1]
      },
      arrowStrikethrough: true,
      color: {
        color: ["color", "#848484"],
        highlight: ["color", "#848484"],
        hover: ["color", "#848484"],
        inherit: ["from", "to", "both", true, false],
        opacity: [1, 0, 1, 0.05]
      },
      dashes: false,
      font: {
        color: ["color", "#343434"],
        size: [14, 0, 100, 1],
        face: ["arial", "verdana", "tahoma"],
        background: ["color", "none"],
        strokeWidth: [2, 0, 50, 1],
        strokeColor: ["color", "#ffffff"],
        align: ["horizontal", "top", "middle", "bottom"]
      },
      hidden: false,
      hoverWidth: [1.5, 0, 5, 0.1],
      labelHighlightBold: true,
      physics: true,
      scaling: {
        min: [1, 0, 100, 1],
        max: [15, 0, 100, 1],
        label: {
          enabled: true,
          min: [14, 0, 200, 1],
          max: [30, 0, 200, 1],
          maxVisible: [30, 0, 200, 1],
          drawThreshold: [5, 0, 20, 1]
        }
      },
      selectionWidth: [1.5, 0, 5, 0.1],
      selfReferenceSize: [20, 0, 200, 1],
      selfReference: {
        size: [20, 0, 200, 1],
        angle: [Math.PI / 2, -6 * Math.PI, 6 * Math.PI, Math.PI / 8],
        renderBehindTheNode: true
      },
      shadow: {
        enabled: false,
        color: "rgba(0,0,0,0.5)",
        size: [10, 0, 20, 1],
        x: [5, -30, 30, 1],
        y: [5, -30, 30, 1]
      },
      smooth: {
        enabled: true,
        type: [
          "dynamic",
          "continuous",
          "discrete",
          "diagonalCross",
          "straightCross",
          "horizontal",
          "vertical",
          "curvedCW",
          "curvedCCW",
          "cubicBezier"
        ],
        forceDirection: ["horizontal", "vertical", "none"],
        roundness: [0.5, 0, 1, 0.05]
      },
      width: [1, 0, 30, 1]
    },
    layout: {
      hierarchical: {
        enabled: false,
        levelSeparation: [150, 20, 500, 5],
        nodeSpacing: [100, 20, 500, 5],
        treeSpacing: [200, 20, 500, 5],
        blockShifting: true,
        edgeMinimization: true,
        parentCentralization: true,
        direction: ["UD", "DU", "LR", "RL"],
        sortMethod: ["hubsize", "directed"],
        shakeTowards: ["leaves", "roots"]
      }
    },
    interaction: {
      dragNodes: true,
      dragView: true,
      hideEdgesOnDrag: false,
      hideEdgesOnZoom: false,
      hideNodesOnDrag: false,
      hover: false,
      keyboard: {
        enabled: false,
        speed: {
          x: [10, 0, 40, 1],
          y: [10, 0, 40, 1],
          zoom: [0.02, 0, 0.1, 5e-3]
        },
        bindToWindow: true,
        autoFocus: true
      },
      multiselect: false,
      navigationButtons: false,
      selectable: true,
      selectConnectedEdges: true,
      hoverConnectedEdges: true,
      tooltipDelay: [300, 0, 1e3, 25],
      zoomView: true,
      zoomSpeed: [1, 0.1, 2, 0.1]
    },
    manipulation: {
      enabled: false,
      initiallyActive: false
    },
    physics: {
      enabled: true,
      barnesHut: {
        theta: [0.5, 0.1, 1, 0.05],
        gravitationalConstant: [-2e3, -3e4, 0, 50],
        centralGravity: [0.3, 0, 10, 0.05],
        springLength: [95, 0, 500, 5],
        springConstant: [0.04, 0, 1.2, 5e-3],
        damping: [0.09, 0, 1, 0.01],
        avoidOverlap: [0, 0, 1, 0.01]
      },
      forceAtlas2Based: {
        theta: [0.5, 0.1, 1, 0.05],
        gravitationalConstant: [-50, -500, 0, 1],
        centralGravity: [0.01, 0, 1, 5e-3],
        springLength: [95, 0, 500, 5],
        springConstant: [0.08, 0, 1.2, 5e-3],
        damping: [0.4, 0, 1, 0.01],
        avoidOverlap: [0, 0, 1, 0.01]
      },
      repulsion: {
        centralGravity: [0.2, 0, 10, 0.05],
        springLength: [200, 0, 500, 5],
        springConstant: [0.05, 0, 1.2, 5e-3],
        nodeDistance: [100, 0, 500, 5],
        damping: [0.09, 0, 1, 0.01]
      },
      hierarchicalRepulsion: {
        centralGravity: [0.2, 0, 10, 0.05],
        springLength: [100, 0, 500, 5],
        springConstant: [0.01, 0, 1.2, 5e-3],
        nodeDistance: [120, 0, 500, 5],
        damping: [0.09, 0, 1, 0.01],
        avoidOverlap: [0, 0, 1, 0.01]
      },
      maxVelocity: [50, 0, 150, 1],
      minVelocity: [0.1, 0.01, 0.5, 0.01],
      solver: [
        "barnesHut",
        "forceAtlas2Based",
        "repulsion",
        "hierarchicalRepulsion"
      ],
      timestep: [0.5, 0.01, 1, 0.01],
      wind: {
        x: [0, -10, 10, 0.1],
        y: [0, -10, 10, 0.1]
      }
    }
  };
  var configuratorHideOption = (parentPath, optionName, options2) => {
    if (parentPath.includes("physics") && configureOptions.physics.solver.includes(optionName) && options2.physics.solver !== optionName && optionName !== "wind") {
      return true;
    }
    return false;
  };
  var FloydWarshall = class {
    constructor() {
    }
    getDistances(body, nodesArray, edgesArray) {
      const D_matrix = {};
      const edges = body.edges;
      for (let i2 = 0; i2 < nodesArray.length; i2++) {
        const node = nodesArray[i2];
        const cell = {};
        D_matrix[node] = cell;
        for (let j = 0; j < nodesArray.length; j++) {
          cell[nodesArray[j]] = i2 == j ? 0 : 1e9;
        }
      }
      for (let i2 = 0; i2 < edgesArray.length; i2++) {
        const edge = edges[edgesArray[i2]];
        if (edge.connected === true && D_matrix[edge.fromId] !== void 0 && D_matrix[edge.toId] !== void 0) {
          D_matrix[edge.fromId][edge.toId] = 1;
          D_matrix[edge.toId][edge.fromId] = 1;
        }
      }
      const nodeCount = nodesArray.length;
      for (let k = 0; k < nodeCount; k++) {
        const knode = nodesArray[k];
        const kcolm = D_matrix[knode];
        for (let i2 = 0; i2 < nodeCount - 1; i2++) {
          const inode = nodesArray[i2];
          const icolm = D_matrix[inode];
          for (let j = i2 + 1; j < nodeCount; j++) {
            const jnode = nodesArray[j];
            const jcolm = D_matrix[jnode];
            const val = Math.min(icolm[jnode], icolm[knode] + kcolm[jnode]);
            icolm[jnode] = val;
            jcolm[inode] = val;
          }
        }
      }
      return D_matrix;
    }
  };
  var KamadaKawai = class {
    constructor(body, edgeLength, edgeStrength) {
      this.body = body;
      this.springLength = edgeLength;
      this.springConstant = edgeStrength;
      this.distanceSolver = new FloydWarshall();
    }
    setOptions(options2) {
      if (options2) {
        if (options2.springLength) {
          this.springLength = options2.springLength;
        }
        if (options2.springConstant) {
          this.springConstant = options2.springConstant;
        }
      }
    }
    solve(nodesArray, edgesArray, ignoreClusters = false) {
      const D_matrix = this.distanceSolver.getDistances(this.body, nodesArray, edgesArray);
      this._createL_matrix(D_matrix);
      this._createK_matrix(D_matrix);
      this._createE_matrix();
      const threshold = 0.01;
      const innerThreshold = 1;
      let iterations = 0;
      const maxIterations = Math.max(1e3, Math.min(10 * this.body.nodeIndices.length, 6e3));
      const maxInnerIterations = 5;
      let maxEnergy = 1e9;
      let highE_nodeId = 0, dE_dx = 0, dE_dy = 0, delta_m = 0, subIterations = 0;
      while (maxEnergy > threshold && iterations < maxIterations) {
        iterations += 1;
        [highE_nodeId, maxEnergy, dE_dx, dE_dy] = this._getHighestEnergyNode(ignoreClusters);
        delta_m = maxEnergy;
        subIterations = 0;
        while (delta_m > innerThreshold && subIterations < maxInnerIterations) {
          subIterations += 1;
          this._moveNode(highE_nodeId, dE_dx, dE_dy);
          [delta_m, dE_dx, dE_dy] = this._getEnergy(highE_nodeId);
        }
      }
    }
    _getHighestEnergyNode(ignoreClusters) {
      const nodesArray = this.body.nodeIndices;
      const nodes = this.body.nodes;
      let maxEnergy = 0;
      let maxEnergyNodeId = nodesArray[0];
      let dE_dx_max = 0, dE_dy_max = 0;
      for (let nodeIdx = 0; nodeIdx < nodesArray.length; nodeIdx++) {
        const m = nodesArray[nodeIdx];
        if (nodes[m].predefinedPosition !== true || nodes[m].isCluster === true && ignoreClusters === true || nodes[m].options.fixed.x !== true || nodes[m].options.fixed.y !== true) {
          const [delta_m, dE_dx, dE_dy] = this._getEnergy(m);
          if (maxEnergy < delta_m) {
            maxEnergy = delta_m;
            maxEnergyNodeId = m;
            dE_dx_max = dE_dx;
            dE_dy_max = dE_dy;
          }
        }
      }
      return [maxEnergyNodeId, maxEnergy, dE_dx_max, dE_dy_max];
    }
    _getEnergy(m) {
      const [dE_dx, dE_dy] = this.E_sums[m];
      const delta_m = Math.sqrt(dE_dx ** 2 + dE_dy ** 2);
      return [delta_m, dE_dx, dE_dy];
    }
    _moveNode(m, dE_dx, dE_dy) {
      const nodesArray = this.body.nodeIndices;
      const nodes = this.body.nodes;
      let d2E_dx2 = 0;
      let d2E_dxdy = 0;
      let d2E_dy2 = 0;
      const x_m = nodes[m].x;
      const y_m = nodes[m].y;
      const km = this.K_matrix[m];
      const lm = this.L_matrix[m];
      for (let iIdx = 0; iIdx < nodesArray.length; iIdx++) {
        const i2 = nodesArray[iIdx];
        if (i2 !== m) {
          const x_i = nodes[i2].x;
          const y_i = nodes[i2].y;
          const kmat = km[i2];
          const lmat = lm[i2];
          const denominator = 1 / ((x_m - x_i) ** 2 + (y_m - y_i) ** 2) ** 1.5;
          d2E_dx2 += kmat * (1 - lmat * (y_m - y_i) ** 2 * denominator);
          d2E_dxdy += kmat * (lmat * (x_m - x_i) * (y_m - y_i) * denominator);
          d2E_dy2 += kmat * (1 - lmat * (x_m - x_i) ** 2 * denominator);
        }
      }
      const A = d2E_dx2, B = d2E_dxdy, C = dE_dx, D = d2E_dy2, E = dE_dy;
      const dy = (C / A + E / B) / (B / A - D / B);
      const dx = -(B * dy + C) / A;
      nodes[m].x += dx;
      nodes[m].y += dy;
      this._updateE_matrix(m);
    }
    _createL_matrix(D_matrix) {
      const nodesArray = this.body.nodeIndices;
      const edgeLength = this.springLength;
      this.L_matrix = [];
      for (let i2 = 0; i2 < nodesArray.length; i2++) {
        this.L_matrix[nodesArray[i2]] = {};
        for (let j = 0; j < nodesArray.length; j++) {
          this.L_matrix[nodesArray[i2]][nodesArray[j]] = edgeLength * D_matrix[nodesArray[i2]][nodesArray[j]];
        }
      }
    }
    _createK_matrix(D_matrix) {
      const nodesArray = this.body.nodeIndices;
      const edgeStrength = this.springConstant;
      this.K_matrix = [];
      for (let i2 = 0; i2 < nodesArray.length; i2++) {
        this.K_matrix[nodesArray[i2]] = {};
        for (let j = 0; j < nodesArray.length; j++) {
          this.K_matrix[nodesArray[i2]][nodesArray[j]] = edgeStrength * D_matrix[nodesArray[i2]][nodesArray[j]] ** -2;
        }
      }
    }
    _createE_matrix() {
      const nodesArray = this.body.nodeIndices;
      const nodes = this.body.nodes;
      this.E_matrix = {};
      this.E_sums = {};
      for (let mIdx = 0; mIdx < nodesArray.length; mIdx++) {
        this.E_matrix[nodesArray[mIdx]] = [];
      }
      for (let mIdx = 0; mIdx < nodesArray.length; mIdx++) {
        const m = nodesArray[mIdx];
        const x_m = nodes[m].x;
        const y_m = nodes[m].y;
        let dE_dx = 0;
        let dE_dy = 0;
        for (let iIdx = mIdx; iIdx < nodesArray.length; iIdx++) {
          const i2 = nodesArray[iIdx];
          if (i2 !== m) {
            const x_i = nodes[i2].x;
            const y_i = nodes[i2].y;
            const denominator = 1 / Math.sqrt((x_m - x_i) ** 2 + (y_m - y_i) ** 2);
            this.E_matrix[m][iIdx] = [
              this.K_matrix[m][i2] * (x_m - x_i - this.L_matrix[m][i2] * (x_m - x_i) * denominator),
              this.K_matrix[m][i2] * (y_m - y_i - this.L_matrix[m][i2] * (y_m - y_i) * denominator)
            ];
            this.E_matrix[i2][mIdx] = this.E_matrix[m][iIdx];
            dE_dx += this.E_matrix[m][iIdx][0];
            dE_dy += this.E_matrix[m][iIdx][1];
          }
        }
        this.E_sums[m] = [dE_dx, dE_dy];
      }
    }
    _updateE_matrix(m) {
      const nodesArray = this.body.nodeIndices;
      const nodes = this.body.nodes;
      const colm = this.E_matrix[m];
      const kcolm = this.K_matrix[m];
      const lcolm = this.L_matrix[m];
      const x_m = nodes[m].x;
      const y_m = nodes[m].y;
      let dE_dx = 0;
      let dE_dy = 0;
      for (let iIdx = 0; iIdx < nodesArray.length; iIdx++) {
        const i2 = nodesArray[iIdx];
        if (i2 !== m) {
          const cell = colm[iIdx];
          const oldDx = cell[0];
          const oldDy = cell[1];
          const x_i = nodes[i2].x;
          const y_i = nodes[i2].y;
          const denominator = 1 / Math.sqrt((x_m - x_i) ** 2 + (y_m - y_i) ** 2);
          const dx = kcolm[i2] * (x_m - x_i - lcolm[i2] * (x_m - x_i) * denominator);
          const dy = kcolm[i2] * (y_m - y_i - lcolm[i2] * (y_m - y_i) * denominator);
          colm[iIdx] = [dx, dy];
          dE_dx += dx;
          dE_dy += dy;
          const sum = this.E_sums[i2];
          sum[0] += dx - oldDx;
          sum[1] += dy - oldDy;
        }
      }
      this.E_sums[m] = [dE_dx, dE_dy];
    }
  };
  function Network(container2, data, options2) {
    if (!(this instanceof Network)) {
      throw new SyntaxError("Constructor must be called with the new operator");
    }
    this.options = {};
    this.defaultOptions = {
      locale: "en",
      locales,
      clickToUse: false
    };
    Object.assign(this.options, this.defaultOptions);
    this.body = {
      container: container2,
      nodes: {},
      nodeIndices: [],
      edges: {},
      edgeIndices: [],
      emitter: {
        on: this.on.bind(this),
        off: this.off.bind(this),
        emit: this.emit.bind(this),
        once: this.once.bind(this)
      },
      eventListeners: {
        onTap: function() {
        },
        onTouch: function() {
        },
        onDoubleTap: function() {
        },
        onHold: function() {
        },
        onDragStart: function() {
        },
        onDrag: function() {
        },
        onDragEnd: function() {
        },
        onMouseWheel: function() {
        },
        onPinch: function() {
        },
        onMouseMove: function() {
        },
        onRelease: function() {
        },
        onContext: function() {
        }
      },
      data: {
        nodes: null,
        edges: null
      },
      functions: {
        createNode: function() {
        },
        createEdge: function() {
        },
        getPointer: function() {
        }
      },
      modules: {},
      view: {
        scale: 1,
        translation: { x: 0, y: 0 }
      },
      selectionBox: {
        show: false,
        position: {
          start: { x: 0, y: 0 },
          end: { x: 0, y: 0 }
        }
      }
    };
    this.bindEventListeners();
    this.images = new Images(() => this.body.emitter.emit("_requestRedraw"));
    this.groups = new Groups();
    this.canvas = new Canvas(this.body);
    this.selectionHandler = new SelectionHandler(this.body, this.canvas);
    this.interactionHandler = new InteractionHandler(this.body, this.canvas, this.selectionHandler);
    this.view = new View(this.body, this.canvas);
    this.renderer = new CanvasRenderer(this.body, this.canvas);
    this.physics = new PhysicsEngine(this.body);
    this.layoutEngine = new LayoutEngine(this.body);
    this.clustering = new ClusterEngine(this.body);
    this.manipulation = new ManipulationSystem(this.body, this.canvas, this.selectionHandler, this.interactionHandler);
    this.nodesHandler = new NodesHandler(this.body, this.images, this.groups, this.layoutEngine);
    this.edgesHandler = new EdgesHandler(this.body, this.images, this.groups);
    this.body.modules["kamadaKawai"] = new KamadaKawai(this.body, 150, 0.05);
    this.body.modules["clustering"] = this.clustering;
    this.canvas._create();
    this.setOptions(options2);
    this.setData(data);
  }
  (0, import_component_emitter2.default)(Network.prototype);
  Network.prototype.setOptions = function(options2) {
    if (options2 === null) {
      options2 = void 0;
    }
    if (options2 !== void 0) {
      const errorFound2 = Validator2.validate(options2, allOptions2);
      if (errorFound2 === true) {
        console.error("%cErrors have been found in the supplied options object.", VALIDATOR_PRINT_STYLE);
      }
      const fields = ["locale", "locales", "clickToUse"];
      selectiveDeepExtend(fields, this.options, options2);
      if (options2.locale !== void 0) {
        options2.locale = normalizeLanguageCode(options2.locales || this.options.locales, options2.locale);
      }
      options2 = this.layoutEngine.setOptions(options2.layout, options2);
      this.canvas.setOptions(options2);
      this.groups.setOptions(options2.groups);
      this.nodesHandler.setOptions(options2.nodes);
      this.edgesHandler.setOptions(options2.edges);
      this.physics.setOptions(options2.physics);
      this.manipulation.setOptions(options2.manipulation, options2, this.options);
      this.interactionHandler.setOptions(options2.interaction);
      this.renderer.setOptions(options2.interaction);
      this.selectionHandler.setOptions(options2.interaction);
      if (options2.groups !== void 0) {
        this.body.emitter.emit("refreshNodes");
      }
      if ("configure" in options2) {
        if (!this.configurator) {
          this.configurator = new Configurator2(this, this.body.container, configureOptions, this.canvas.pixelRatio, configuratorHideOption);
        }
        this.configurator.setOptions(options2.configure);
      }
      if (this.configurator && this.configurator.options.enabled === true) {
        const networkOptions = {
          nodes: {},
          edges: {},
          layout: {},
          interaction: {},
          manipulation: {},
          physics: {},
          global: {}
        };
        deepExtend(networkOptions.nodes, this.nodesHandler.options);
        deepExtend(networkOptions.edges, this.edgesHandler.options);
        deepExtend(networkOptions.layout, this.layoutEngine.options);
        deepExtend(networkOptions.interaction, this.selectionHandler.options);
        deepExtend(networkOptions.interaction, this.renderer.options);
        deepExtend(networkOptions.interaction, this.interactionHandler.options);
        deepExtend(networkOptions.manipulation, this.manipulation.options);
        deepExtend(networkOptions.physics, this.physics.options);
        deepExtend(networkOptions.global, this.canvas.options);
        deepExtend(networkOptions.global, this.options);
        this.configurator.setModuleOptions(networkOptions);
      }
      if (options2.clickToUse !== void 0) {
        if (options2.clickToUse === true) {
          if (this.activator === void 0) {
            this.activator = new Activator(this.canvas.frame);
            this.activator.on("change", () => {
              this.body.emitter.emit("activate");
            });
          }
        } else {
          if (this.activator !== void 0) {
            this.activator.destroy();
            delete this.activator;
          }
          this.body.emitter.emit("activate");
        }
      } else {
        this.body.emitter.emit("activate");
      }
      this.canvas.setSize();
      this.body.emitter.emit("startSimulation");
    }
  };
  Network.prototype._updateVisibleIndices = function() {
    const nodes = this.body.nodes;
    const edges = this.body.edges;
    this.body.nodeIndices = [];
    this.body.edgeIndices = [];
    for (const nodeId in nodes) {
      if (Object.prototype.hasOwnProperty.call(nodes, nodeId)) {
        if (!this.clustering._isClusteredNode(nodeId) && nodes[nodeId].options.hidden === false) {
          this.body.nodeIndices.push(nodes[nodeId].id);
        }
      }
    }
    for (const edgeId in edges) {
      if (Object.prototype.hasOwnProperty.call(edges, edgeId)) {
        const edge = edges[edgeId];
        const fromNode = nodes[edge.fromId];
        const toNode = nodes[edge.toId];
        const edgeNodesPresent = fromNode !== void 0 && toNode !== void 0;
        const isVisible = !this.clustering._isClusteredEdge(edgeId) && edge.options.hidden === false && edgeNodesPresent && fromNode.options.hidden === false && toNode.options.hidden === false;
        if (isVisible) {
          this.body.edgeIndices.push(edge.id);
        }
      }
    }
  };
  Network.prototype.bindEventListeners = function() {
    this.body.emitter.on("_dataChanged", () => {
      this.edgesHandler._updateState();
      this.body.emitter.emit("_dataUpdated");
    });
    this.body.emitter.on("_dataUpdated", () => {
      this.clustering._updateState();
      this._updateVisibleIndices();
      this._updateValueRange(this.body.nodes);
      this._updateValueRange(this.body.edges);
      this.body.emitter.emit("startSimulation");
      this.body.emitter.emit("_requestRedraw");
    });
  };
  Network.prototype.setData = function(data) {
    this.body.emitter.emit("resetPhysics");
    this.body.emitter.emit("_resetData");
    this.selectionHandler.unselectAll();
    if (data && data.dot && (data.nodes || data.edges)) {
      throw new SyntaxError('Data must contain either parameter "dot" or  parameter pair "nodes" and "edges", but not both.');
    }
    this.setOptions(data && data.options);
    if (data && data.dot) {
      console.warn("The dot property has been deprecated. Please use the static convertDot method to convert DOT into vis.network format and use the normal data format with nodes and edges. This converter is used like this: var data = vis.network.convertDot(dotString);");
      const dotData = DOTToGraph(data.dot);
      this.setData(dotData);
      return;
    } else if (data && data.gephi) {
      console.warn("The gephi property has been deprecated. Please use the static convertGephi method to convert gephi into vis.network format and use the normal data format with nodes and edges. This converter is used like this: var data = vis.network.convertGephi(gephiJson);");
      const gephiData = parseGephi(data.gephi);
      this.setData(gephiData);
      return;
    } else {
      this.nodesHandler.setData(data && data.nodes, true);
      this.edgesHandler.setData(data && data.edges, true);
    }
    this.body.emitter.emit("_dataChanged");
    this.body.emitter.emit("_dataLoaded");
    this.body.emitter.emit("initPhysics");
  };
  Network.prototype.destroy = function() {
    this.body.emitter.emit("destroy");
    this.body.emitter.off();
    this.off();
    delete this.groups;
    delete this.canvas;
    delete this.selectionHandler;
    delete this.interactionHandler;
    delete this.view;
    delete this.renderer;
    delete this.physics;
    delete this.layoutEngine;
    delete this.clustering;
    delete this.manipulation;
    delete this.nodesHandler;
    delete this.edgesHandler;
    delete this.configurator;
    delete this.images;
    for (const nodeId in this.body.nodes) {
      if (!Object.prototype.hasOwnProperty.call(this.body.nodes, nodeId))
        continue;
      delete this.body.nodes[nodeId];
    }
    for (const edgeId in this.body.edges) {
      if (!Object.prototype.hasOwnProperty.call(this.body.edges, edgeId))
        continue;
      delete this.body.edges[edgeId];
    }
    recursiveDOMDelete(this.body.container);
  };
  Network.prototype._updateValueRange = function(obj) {
    let id;
    let valueMin = void 0;
    let valueMax = void 0;
    let valueTotal = 0;
    for (id in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, id)) {
        const value = obj[id].getValue();
        if (value !== void 0) {
          valueMin = valueMin === void 0 ? value : Math.min(value, valueMin);
          valueMax = valueMax === void 0 ? value : Math.max(value, valueMax);
          valueTotal += value;
        }
      }
    }
    if (valueMin !== void 0 && valueMax !== void 0) {
      for (id in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, id)) {
          obj[id].setValueRange(valueMin, valueMax, valueTotal);
        }
      }
    }
  };
  Network.prototype.isActive = function() {
    return !this.activator || this.activator.active;
  };
  Network.prototype.setSize = function() {
    return this.canvas.setSize.apply(this.canvas, arguments);
  };
  Network.prototype.canvasToDOM = function() {
    return this.canvas.canvasToDOM.apply(this.canvas, arguments);
  };
  Network.prototype.DOMtoCanvas = function() {
    return this.canvas.DOMtoCanvas.apply(this.canvas, arguments);
  };
  Network.prototype.findNode = function() {
    return this.clustering.findNode.apply(this.clustering, arguments);
  };
  Network.prototype.isCluster = function() {
    return this.clustering.isCluster.apply(this.clustering, arguments);
  };
  Network.prototype.openCluster = function() {
    return this.clustering.openCluster.apply(this.clustering, arguments);
  };
  Network.prototype.cluster = function() {
    return this.clustering.cluster.apply(this.clustering, arguments);
  };
  Network.prototype.getNodesInCluster = function() {
    return this.clustering.getNodesInCluster.apply(this.clustering, arguments);
  };
  Network.prototype.clusterByConnection = function() {
    return this.clustering.clusterByConnection.apply(this.clustering, arguments);
  };
  Network.prototype.clusterByHubsize = function() {
    return this.clustering.clusterByHubsize.apply(this.clustering, arguments);
  };
  Network.prototype.updateClusteredNode = function() {
    return this.clustering.updateClusteredNode.apply(this.clustering, arguments);
  };
  Network.prototype.getClusteredEdges = function() {
    return this.clustering.getClusteredEdges.apply(this.clustering, arguments);
  };
  Network.prototype.getBaseEdge = function() {
    return this.clustering.getBaseEdge.apply(this.clustering, arguments);
  };
  Network.prototype.getBaseEdges = function() {
    return this.clustering.getBaseEdges.apply(this.clustering, arguments);
  };
  Network.prototype.updateEdge = function() {
    return this.clustering.updateEdge.apply(this.clustering, arguments);
  };
  Network.prototype.clusterOutliers = function() {
    return this.clustering.clusterOutliers.apply(this.clustering, arguments);
  };
  Network.prototype.getSeed = function() {
    return this.layoutEngine.getSeed.apply(this.layoutEngine, arguments);
  };
  Network.prototype.enableEditMode = function() {
    return this.manipulation.enableEditMode.apply(this.manipulation, arguments);
  };
  Network.prototype.disableEditMode = function() {
    return this.manipulation.disableEditMode.apply(this.manipulation, arguments);
  };
  Network.prototype.addNodeMode = function() {
    return this.manipulation.addNodeMode.apply(this.manipulation, arguments);
  };
  Network.prototype.editNode = function() {
    return this.manipulation.editNode.apply(this.manipulation, arguments);
  };
  Network.prototype.editNodeMode = function() {
    console.warn("Deprecated: Please use editNode instead of editNodeMode.");
    return this.manipulation.editNode.apply(this.manipulation, arguments);
  };
  Network.prototype.addEdgeMode = function() {
    return this.manipulation.addEdgeMode.apply(this.manipulation, arguments);
  };
  Network.prototype.editEdgeMode = function() {
    return this.manipulation.editEdgeMode.apply(this.manipulation, arguments);
  };
  Network.prototype.deleteSelected = function() {
    return this.manipulation.deleteSelected.apply(this.manipulation, arguments);
  };
  Network.prototype.getPositions = function() {
    return this.nodesHandler.getPositions.apply(this.nodesHandler, arguments);
  };
  Network.prototype.getPosition = function() {
    return this.nodesHandler.getPosition.apply(this.nodesHandler, arguments);
  };
  Network.prototype.storePositions = function() {
    return this.nodesHandler.storePositions.apply(this.nodesHandler, arguments);
  };
  Network.prototype.moveNode = function() {
    return this.nodesHandler.moveNode.apply(this.nodesHandler, arguments);
  };
  Network.prototype.getBoundingBox = function() {
    return this.nodesHandler.getBoundingBox.apply(this.nodesHandler, arguments);
  };
  Network.prototype.getConnectedNodes = function(objectId) {
    if (this.body.nodes[objectId] !== void 0) {
      return this.nodesHandler.getConnectedNodes.apply(this.nodesHandler, arguments);
    } else {
      return this.edgesHandler.getConnectedNodes.apply(this.edgesHandler, arguments);
    }
  };
  Network.prototype.getConnectedEdges = function() {
    return this.nodesHandler.getConnectedEdges.apply(this.nodesHandler, arguments);
  };
  Network.prototype.startSimulation = function() {
    return this.physics.startSimulation.apply(this.physics, arguments);
  };
  Network.prototype.stopSimulation = function() {
    return this.physics.stopSimulation.apply(this.physics, arguments);
  };
  Network.prototype.stabilize = function() {
    return this.physics.stabilize.apply(this.physics, arguments);
  };
  Network.prototype.getSelection = function() {
    return this.selectionHandler.getSelection.apply(this.selectionHandler, arguments);
  };
  Network.prototype.setSelection = function() {
    return this.selectionHandler.setSelection.apply(this.selectionHandler, arguments);
  };
  Network.prototype.getSelectedNodes = function() {
    return this.selectionHandler.getSelectedNodeIds.apply(this.selectionHandler, arguments);
  };
  Network.prototype.getSelectedEdges = function() {
    return this.selectionHandler.getSelectedEdgeIds.apply(this.selectionHandler, arguments);
  };
  Network.prototype.getNodeAt = function() {
    const node = this.selectionHandler.getNodeAt.apply(this.selectionHandler, arguments);
    if (node !== void 0 && node.id !== void 0) {
      return node.id;
    }
    return node;
  };
  Network.prototype.getEdgeAt = function() {
    const edge = this.selectionHandler.getEdgeAt.apply(this.selectionHandler, arguments);
    if (edge !== void 0 && edge.id !== void 0) {
      return edge.id;
    }
    return edge;
  };
  Network.prototype.selectNodes = function() {
    return this.selectionHandler.selectNodes.apply(this.selectionHandler, arguments);
  };
  Network.prototype.selectEdges = function() {
    return this.selectionHandler.selectEdges.apply(this.selectionHandler, arguments);
  };
  Network.prototype.unselectAll = function() {
    this.selectionHandler.unselectAll.apply(this.selectionHandler, arguments);
    this.selectionHandler.commitWithoutEmitting.apply(this.selectionHandler);
    this.redraw();
  };
  Network.prototype.redraw = function() {
    return this.renderer.redraw.apply(this.renderer, arguments);
  };
  Network.prototype.getScale = function() {
    return this.view.getScale.apply(this.view, arguments);
  };
  Network.prototype.getViewPosition = function() {
    return this.view.getViewPosition.apply(this.view, arguments);
  };
  Network.prototype.fit = function() {
    return this.view.fit.apply(this.view, arguments);
  };
  Network.prototype.moveTo = function() {
    return this.view.moveTo.apply(this.view, arguments);
  };
  Network.prototype.focus = function() {
    return this.view.focus.apply(this.view, arguments);
  };
  Network.prototype.releaseNode = function() {
    return this.view.releaseNode.apply(this.view, arguments);
  };
  Network.prototype.getOptionsFromConfigurator = function() {
    let options2 = {};
    if (this.configurator) {
      options2 = this.configurator.getOptions.apply(this.configurator);
    }
    return options2;
  };

  // js/csrftoken.js
  var getCookie = (name) => {
    if (!document.cookie)
      return;
    let cookieValue = null;
    const cookies = document.cookie.split(";");
    for (let i2 = 0; i2 < cookies.length; i2++) {
      const cookie = cookies[i2].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
    return cookieValue;
  };

  // js/home.js
  var options = {
    interaction: {
      hover: true,
      hoverConnectedEdges: true,
      multiselect: true
    },
    nodes: {
      shape: "image",
      brokenImage: brokenImage != null ? brokenImage : "",
      size: 35,
      font: {
        multi: "md",
        face: "helvetica",
        color: document.documentElement.dataset.netboxColorMode === "dark" ? "#fff" : "#000"
      }
    },
    edges: {
      length: 100,
      width: 2,
      font: {
        face: "helvetica"
      },
      shadow: {
        enabled: true
      }
    },
    physics: {
      solver: "forceAtlas2Based"
    }
  };
  var csrftoken = getCookie("csrftoken");
  var graph = null;
  var container = document.querySelector("#visgraph");
  var coordSaveCheckbox = document.querySelector("#id_save_coords");
  (function handleLoadData() {
    if (!topologyData)
      return;
    function htmlTitle(text) {
      const container2 = document.createElement("div");
      container2.innerHTML = text;
      return container2;
    }
    const nodes = new DataSet(topologyData.nodes.map((node) => __spreadProps(__spreadValues({}, node), {
      title: htmlTitle(node.title)
    })));
    window.nodes = nodes;
    const edges = new DataSet(topologyData.edges.map((node) => __spreadProps(__spreadValues({}, node), {
      title: htmlTitle(node.title)
    })));
    const group_sites = topologyData.options.group_sites;
    const group_locations = topologyData.options.group_locations;
    const group_racks = topologyData.options.group_racks;
    const group_virtualchassis = topologyData.options.group_virtualchassis;
    const gridSize = 400;
    var dragMode = false;
    graph = new Network(container, { nodes, edges }, options);
    graph.fit();
    function getGridPosition(nodeId, gridSize2) {
      x = graph.getPosition(nodeId).x;
      y = graph.getPosition(nodeId).y;
      if (x >= 0) {
        if (x % gridSize2 > gridSize2 / 2) {
          x += gridSize2;
        }
      } else {
        if (-x % gridSize2 > gridSize2 / 2) {
          x -= gridSize2;
        }
      }
      x = x - x % gridSize2;
      if (y >= 0) {
        if (y % gridSize2 > gridSize2 / 2) {
          y += gridSize2;
        }
      } else {
        if (-y % gridSize2 > gridSize2 / 2) {
          y -= gridSize2;
        }
      }
      y = y - y % gridSize2;
      return {
        x,
        y
      };
    }
    graph.on("dragStart", (params) => {
      dragMode = true;
    });
    graph.on("dragEnd", (params) => {
      dragMode = false;
      if (coordSaveCheckbox.options[coordSaveCheckbox.selectedIndex].text != "Yes")
        return;
      if (graph.getSelectedNodes().length > 0) {
        for (i = 0; i < graph.getSelectedNodes().length; i++) {
          pos = getGridPosition(graph.getSelectedNodes()[i], gridSize);
          window.nodes.update({ id: graph.getSelectedNodes()[i], x: pos.x, y: pos.y });
        }
      }
      Promise.allSettled(Object.entries(graph.getPositions(params.nodes)).map((_0) => __async(this, [_0], function* ([nodeId, nodePosition]) {
        if (!isNaN(parseInt(nodeId))) {
          nodeKey = parseInt(nodeId);
        } else {
          nodeKey = nodeId;
        }
        try {
          window.nodes.update({ id: nodeKey, physics: false, x: nodePosition.x, y: nodePosition.y });
        } catch (e) {
          console.log([
            "Error while executing window.nodes.update()",
            "nodeId: " + nodeId,
            "nodeKey: " + nodeKey,
            "x: " + nodePosition.x,
            "y: " + nodePosition.y
          ]);
          console.log(e);
        }
        const res = yield fetch("/" + basePath + "api/plugins/netbox_topology_views/save-coords/save_coords/", {
          method: "PATCH",
          headers: {
            "X-CSRFToken": csrftoken,
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            node_id: nodeId,
            x: nodePosition.x,
            y: nodePosition.y,
            group: topologyData.group
          })
        });
      })));
    });
    graph.on("doubleClick", (params) => {
      if (params.nodes.length > 0) {
        params.nodes.forEach((node) => {
          window.open(nodes.get(node).href, "_blank");
        });
      } else {
        params.edges.forEach((edge) => {
          window.open(edges.get(edge).href, "_blank");
        });
      }
    });
    graph.on("beforeDrawing", (canvascontext) => {
      const zoomFactor = graph.getScale() * window.devicePixelRatio;
      const virtualWidth = canvascontext.canvas.width / zoomFactor;
      const virtualHeight = canvascontext.canvas.height / zoomFactor;
      const virtualCenter = graph.getViewPosition();
      const rasterizedCenterX = virtualCenter.x - virtualCenter.x % gridSize;
      const rasterizedCenterY = virtualCenter.y - virtualCenter.y % gridSize;
      const hSpace = virtualWidth / 2 - virtualWidth / 2 % gridSize + gridSize;
      const vSpace = virtualHeight / 2 - virtualHeight / 2 % gridSize + gridSize;
      const left = rasterizedCenterX - gridSize - hSpace;
      const right = rasterizedCenterX + gridSize + hSpace;
      const top = rasterizedCenterY - gridSize - vSpace;
      const bottom = rasterizedCenterY + gridSize + vSpace;
      canvascontext.beginPath();
      for (let x2 = left; x2 < right; x2 += gridSize) {
        canvascontext.moveTo(x2, top);
        canvascontext.lineTo(x2, bottom);
      }
      for (let y2 = top; y2 < bottom; y2 += gridSize) {
        canvascontext.moveTo(left, y2);
        canvascontext.lineTo(right, y2);
      }
      canvascontext.strokeStyle = "#777777";
      canvascontext.stroke();
    });
    graph.on("afterDrawing", (canvascontext) => {
      allRectangles = [];
      if (group_sites != null && group_sites == "on") {
        drawGroupRectangles(canvascontext, groupedNodeSites, siteRectParams);
      }
      if (group_locations != null && group_locations == "on") {
        drawGroupRectangles(canvascontext, groupedNodeLocations, locationRectParams);
      }
      if (group_racks != null && group_racks == "on") {
        drawGroupRectangles(canvascontext, groupedNodeRacks, rackRectParams);
      }
      if (group_virtualchassis != null && group_virtualchassis == "on") {
        drawGroupRectangles(canvascontext, groupedNodeVirtualchassis, virtualchassisRectParams);
      }
      if (dragMode == true && graph.getSelectedNodes().length > 0) {
        for (i = 0; i < graph.getSelectedNodes().length; i++) {
          pos = getGridPosition(graph.getSelectedNodes()[i], gridSize);
          canvascontext.beginPath();
          canvascontext.arc(graph.getPosition(graph.getSelectedNodes()[i]).x, graph.getPosition(graph.getSelectedNodes()[i]).y, 5, 0, 2 * Math.PI);
          canvascontext.fillStyle = "#FF3D3D";
          canvascontext.fill();
          canvascontext.beginPath();
          canvascontext.moveTo(graph.getPosition(graph.getSelectedNodes()[i]).x, graph.getPosition(graph.getSelectedNodes()[i]).y);
          canvascontext.lineTo(pos.x, pos.y);
          canvascontext.strokeStyle = "#FF3D3D";
          canvascontext.stroke();
          canvascontext.beginPath();
          canvascontext.arc(pos.x, pos.y, 10, 0, 2 * Math.PI);
          canvascontext.fillStyle = "#9C0000";
          canvascontext.fill();
        }
      }
    });
    graph.on("click", (canvascontext) => {
      allRectangles.forEach((key) => {
        if (canvascontext.pointer.canvas.x > key.x1 - key.border / 2 - 3 && canvascontext.pointer.canvas.x < key.x2 + key.border / 2 + 3 && canvascontext.pointer.canvas.y > key.y1 - key.border / 2 - 3 && canvascontext.pointer.canvas.y < key.y2 + key.border / 2 + 3) {
          if (canvascontext.pointer.canvas.x < key.x1 + key.border / 2 + 3 || canvascontext.pointer.canvas.x > key.x2 - key.border / 2 - 3 || canvascontext.pointer.canvas.y < key.y1 + key.border / 2 + 3 || canvascontext.pointer.canvas.y > key.y2 - key.border / 2 - 3) {
            let arr = [];
            if (key.category == "Site") {
              groupedNodeSites.forEach((subArray) => {
                subArray.forEach((element) => {
                  if (element[1] == key.id) {
                    arr.push(element[0]);
                  }
                });
              });
            }
            if (key.category == "Location") {
              groupedNodeLocations.forEach((subArray) => {
                subArray.forEach((element) => {
                  if (element[1] === key.id) {
                    arr.push(element[0]);
                  }
                });
              });
            }
            if (key.category == "Rack") {
              groupedNodeRacks.forEach((subArray) => {
                subArray.forEach((element) => {
                  if (element[1] === key.id) {
                    arr.push(element[0]);
                  }
                });
              });
            }
            if (key.category == "Virtual Chassis") {
              groupedNodeVirtualchassis.forEach((subArray) => {
                subArray.forEach((element) => {
                  if (element[1] === key.id) {
                    arr.push(element[0]);
                  }
                });
              });
            }
            graph.selectNodes(arr);
          }
        }
      });
    });
    function combineNodeInfo(typeId, type) {
      let nodesArray = [];
      for (let [key, value] of nodes._data) {
        if (value[typeId] != void 0) {
          nodesArray.push([value.id, value[typeId], value[type]]);
        }
      }
      let groupedNodeArray = nodesArray.reduce((acc, value) => {
        let key = value[1];
        acc[key] = acc[key] || [];
        acc[key].push(value);
        return acc;
      }, {});
      return Object.values(groupedNodeArray);
    }
    var allRectangles = [];
    function drawGroupRectangle(rectangle) {
      rectangle.ctx.beginPath();
      rectangle.ctx.lineWidth = rectangle.lineWidth;
      rectangle.ctx.strokeStyle = rectangle.color;
      rectangle.ctx.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);
      rectangle.ctx.stroke();
      rectangle.ctx.font = rectangle.font;
      rectangle.ctx.fillStyle = rectangle.color;
      rectangle.ctx.fillText(rectangle.text, rectangle.x + rectangle.textPaddingX, rectangle.y + rectangle.textPaddingY);
      allRectangles.push({ category: rectangle.category, id: rectangle.id, x1: rectangle.x, y1: rectangle.y, x2: rectangle.x + rectangle.width, y2: rectangle.y + rectangle.height, border: rectangle.lineWidth });
    }
    function drawGroupRectangles(canvascontext, groupedNodes, rectParams) {
      for (let value of Object.entries(groupedNodes)) {
        const rectangles = [];
        const xValues = [];
        const yValues = [];
        for (let val of value[1]) {
          xValues.push(graph.getPosition(val[0]).x);
          yValues.push(graph.getPosition(val[0]).y);
        }
        const rectX = Math.min(...xValues) - rectParams.paddingX;
        const rectY = Math.min(...yValues) - rectParams.paddingY;
        const rectSizeX = Math.max(...xValues) - Math.min(...xValues) + 2 * rectParams.paddingX;
        const rectSizeY = Math.max(...yValues) - Math.min(...yValues) + 2 * rectParams.paddingY;
        rectangles.push({
          ctx: canvascontext,
          x: rectX,
          y: rectY,
          width: rectSizeX,
          height: rectSizeY,
          lineWidth: rectParams.lineWidth,
          color: rectParams.color,
          text: value[1][0][2],
          textPaddingX: rectParams.textPaddingX,
          textPaddingY: rectParams.textPaddingY,
          font: rectParams.font,
          id: value[1][0][1],
          category: rectParams.category
        });
        rectangles.forEach(function(rectangle) {
          drawGroupRectangle(rectangle);
        });
      }
    }
    let groupedNodeSites = combineNodeInfo("site_id", "site");
    let siteRectParams = {
      lineWidth: "5",
      color: "red",
      paddingX: 84,
      paddingY: 84,
      textPaddingX: 8,
      textPaddingY: -8,
      font: "14px helvetica",
      category: "Site"
    };
    let groupedNodeLocations = combineNodeInfo("location_id", "location");
    let locationRectParams = {
      lineWidth: "5",
      color: "#337ab7",
      paddingX: 77,
      paddingY: 77,
      textPaddingX: 22,
      textPaddingY: 29,
      font: "14px helvetica",
      category: "Location"
    };
    let groupedNodeRacks = combineNodeInfo("rack_id", "rack");
    let rackRectParams = {
      lineWidth: "5",
      color: "green",
      paddingX: 70,
      paddingY: 70,
      textPaddingX: 15,
      textPaddingY: 36,
      font: "14px helvetica",
      category: "Rack"
    };
    let groupedNodeVirtualchassis = combineNodeInfo("virtual_chassis_id", "virtual_chassis");
    let virtualchassisRectParams = {
      lineWidth: "5",
      color: "orange",
      paddingX: 63,
      paddingY: 63,
      textPaddingX: 8,
      textPaddingY: 43,
      font: "14px helvetica",
      category: "Virtual Chassis"
    };
  })();
  var MIME_TYPE = "image/png";
  var downloadButton = document.querySelector("#btnDownloadImage");
  downloadButton.addEventListener("click", (e) => {
    performGraphDownload();
  });
  function performGraphDownload() {
    const canvas = container.querySelector("canvas");
    const tempDownloadLink = document.createElement("a");
    const generatedImageUrl = canvas.toDataURL(MIME_TYPE);
    tempDownloadLink.href = generatedImageUrl;
    tempDownloadLink.download = "topology";
    document.body.appendChild(tempDownloadLink);
    tempDownloadLink.click();
    document.body.removeChild(tempDownloadLink);
  }
  var downloadXmlButton = document.querySelector("#btnDownloadXml");
  downloadXmlButton.addEventListener("click", (e) => {
    performXmlDownload();
  });
  function performXmlDownload() {
    const tempDownloadLink = document.createElement("a");
    let xml_search_options = "";
    if (typeof is_htmx !== "undefined") {
      var curr_url = window.location.href;
      const sites_prefix = "/sites/";
      const location_prefix = "/locations/";
      if (curr_url.includes(sites_prefix)) {
        var site_id = curr_url.split(sites_prefix)[1];
        site_id = site_id.split("/")[0];
        xml_search_options = "site_id=" + site_id + "&show_cables=on&show_unconnected=on";
      } else if (curr_url.includes(location_prefix)) {
        var location_id = curr_url.split(location_prefix)[1];
        location_id = location_id.split("/")[0];
        xml_search_options = "location_id=" + location_id + "&show_cables=on&show_unconnected=on";
      }
    } else {
      xml_search_options = new URLSearchParams(window.location.search);
    }
    fetch("/" + basePath + "api/plugins/netbox_topology_views/xml-export/?" + xml_search_options).then((response) => response.text()).then((data) => {
      var blob = new Blob([data], { type: "text/plain" });
      tempDownloadLink.setAttribute("href", window.URL.createObjectURL(blob));
      tempDownloadLink.setAttribute("download", "topology.xml");
      tempDownloadLink.dataset.downloadurl = ["text/plain", tempDownloadLink.download, tempDownloadLink.href].join(":");
      tempDownloadLink.click();
    });
  }
  var observer = new MutationObserver((mutations) => mutations.forEach((mutation) => {
    if (!graph || mutation.type !== "attributes" || mutation.attributeName !== "data-bs-theme" || !(mutation.target instanceof HTMLElement))
      return;
    const netboxColorMode = mutation.target.dataset.bsTheme;
    options.nodes.font.color = netboxColorMode === "dark" ? "#fff" : "#000";
    graph.setOptions(options);
  }));
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-bs-theme"]
  });
})();
/*! Hammer.JS - v2.0.17-rc - 2019-12-16
 * http://naver.github.io/egjs
 *
 * Forked By Naver egjs
 * Copyright (c) hammerjs
 * Licensed under the MIT license */
/**
 * vis-data
 * http://visjs.org/
 *
 * Manage unstructured data using DataSet. Add, update, and remove data, and listen for changes in the data.
 *
 * @version 7.1.9
 * @date    2023-11-24T17:53:34.179Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */
/**
 * vis-network
 * https://visjs.github.io/vis-network/
 *
 * A dynamic, browser-based visualization library.
 *
 * @version 9.1.9
 * @date    2023-11-03T01:42:27.418Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */
/**
 * vis-util
 * https://github.com/visjs/vis-util
 *
 * utilitie collection for visjs
 *
 * @version 5.0.7
 * @date    2023-11-20T09:06:51.067Z
 *
 * @copyright (c) 2011-2017 Almende B.V, http://almende.com
 * @copyright (c) 2017-2019 visjs contributors, https://github.com/visjs
 *
 * @license
 * vis.js is dual licensed under both
 *
 *   1. The Apache 2.0 License
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *   and
 *
 *   2. The MIT License
 *      http://opensource.org/licenses/MIT
 *
 * vis.js may be distributed under either license.
 */
