"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./components/TimerGallery.jsx":
/*!*************************************!*\
  !*** ./components/TimerGallery.jsx ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ TimerGallery; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _PreviewTimer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PreviewTimer */ \"./components/PreviewTimer.jsx\");\n/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nanoid */ \"./node_modules/nanoid/index.dev.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\nfunction _arrayLikeToArray(arr, len) {\n    if (len == null || len > arr.length) len = arr.length;\n    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];\n    return arr2;\n}\nfunction _arrayWithHoles(arr) {\n    if (Array.isArray(arr)) return arr;\n}\nfunction _defineProperty(obj, key, value) {\n    if (key in obj) {\n        Object.defineProperty(obj, key, {\n            value: value,\n            enumerable: true,\n            configurable: true,\n            writable: true\n        });\n    } else {\n        obj[key] = value;\n    }\n    return obj;\n}\nfunction _iterableToArrayLimit(arr, i) {\n    var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"];\n    if (_i == null) return;\n    var _arr = [];\n    var _n = true;\n    var _d = false;\n    var _s1, _e;\n    try {\n        for(_i = _i.call(arr); !(_n = (_s1 = _i.next()).done); _n = true){\n            _arr.push(_s1.value);\n            if (i && _arr.length === i) break;\n        }\n    } catch (err) {\n        _d = true;\n        _e = err;\n    } finally{\n        try {\n            if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n        } finally{\n            if (_d) throw _e;\n        }\n    }\n    return _arr;\n}\nfunction _nonIterableRest() {\n    throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nfunction _objectSpread(target) {\n    for(var i = 1; i < arguments.length; i++){\n        var source = arguments[i] != null ? arguments[i] : {};\n        var ownKeys = Object.keys(source);\n        if (typeof Object.getOwnPropertySymbols === \"function\") {\n            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {\n                return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n            }));\n        }\n        ownKeys.forEach(function(key) {\n            _defineProperty(target, key, source[key]);\n        });\n    }\n    return target;\n}\nfunction _slicedToArray(arr, i) {\n    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();\n}\nfunction _unsupportedIterableToArray(o, minLen) {\n    if (!o) return;\n    if (typeof o === \"string\") return _arrayLikeToArray(o, minLen);\n    var n = Object.prototype.toString.call(o).slice(8, -1);\n    if (n === \"Object\" && o.constructor) n = o.constructor.name;\n    if (n === \"Map\" || n === \"Set\") return Array.from(n);\n    if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);\n}\nvar _s = $RefreshSig$();\n/**\r\n *\r\n * @param {*} props\r\n * @returns a component that allows you to swipe or click through timers to edit them individually if needed\r\n */ function TimerGallery(props) {\n    var _this = this;\n    var populateTimers = function populateTimers() {\n        var timerObjects = [];\n        for(var i = 0; i < props.number; i++){\n            var isBreak = false;\n            if (props.alternating) {\n                //every other one\n                if (i % 2 !== 0) {\n                    //odd number\n                    isBreak = true;\n                }\n            }\n            var id = (0,nanoid__WEBPACK_IMPORTED_MODULE_3__.nanoid)();\n            timerObjects.push({\n                key: i,\n                number: i + 1,\n                id: id,\n                isBreak: isBreak,\n                time: {\n                    hours: 0,\n                    minutes: 0,\n                    seconds: 0\n                },\n                description: \"\",\n                autostart: false\n            });\n        }\n        return timerObjects;\n    };\n    var changeIndex = function changeIndex(event) {\n        var value = parseInt(event.target.dataset.direction);\n        var result = index + value;\n        if (result < 0) {\n            setIndex(previewTimers.length - 1);\n        } else if (result >= previewTimers.length) {\n            setIndex(0);\n        } else {\n            setIndex(result);\n        }\n    };\n    var updateTimer = function updateTimer(data, id) {\n        console.log(\"updating timer with\", data);\n        setTimerData(function(prevData) {\n            return prevData.map(function(oldTimer) {\n                return oldTimer.id === id ? _objectSpread({}, oldTimer, {\n                    time: _objectSpread({}, data)\n                }) : oldTimer;\n            });\n        });\n    };\n    var updateTimerData = function updateTimerData(data, propertyName, id) {\n        setTimerData(function(prevData) {\n            return prevData.map(function(oldTimer) {\n                return oldTimer.id === id ? _objectSpread({}, oldTimer, _defineProperty({}, propertyName, data)) : oldTimer;\n            });\n        });\n        console.log(\"Updated data is\", timerData.find(function(timer) {\n            return timer.id === id;\n        }));\n    };\n    _s();\n    var ref = _slicedToArray(react__WEBPACK_IMPORTED_MODULE_1___default().useState(0), 2), index = ref[0], setIndex = ref[1];\n    var localStorageRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);\n    var breakTimerRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);\n    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(function() {\n        localStorageRef.current = window.localStorage;\n        console.log(window);\n    }, []);\n    var ref1 = _slicedToArray(react__WEBPACK_IMPORTED_MODULE_1___default().useState(JSON.parse(localStorage.current.getItem(\"previewTimers\")) || populateTimers()), 2), timerData = ref1[0], setTimerData = ref1[1]; //for storing timers in local state\n    var ref2 = _slicedToArray(react__WEBPACK_IMPORTED_MODULE_1___default().useState(timerData[0] && timerData[0].id || \"\"), 2), currentTimerId = ref2[0], setCurrentTimerId = ref2[1]; //get id of current timer\n    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(function() {\n        localStorageRef.current.setItem(\"previewTimers\", JSON.stringify(timerData));\n    }, [\n        timerData\n    ]);\n    var previewTimers = timerData.map(function(timer) {\n        /*#__PURE__*/ return (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_PreviewTimer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n            number: timer.number,\n            id: timer.id,\n            updateTimer: updateTimer,\n            isBreak: timer.isBreak,\n            time: timer.time,\n            autostart: timer.autostart,\n            description: timer.description,\n            updateTimerData: updateTimerData\n        }, timer.key, false, {\n            fileName: \"C:\\\\Users\\\\Maya Bradford\\\\OneDrive\\\\Documents\\\\MTC-Homework\\\\Javascript Test Projects\\\\My Original Projects\\\\stretches-site\\\\components\\\\TimerGallery.jsx\",\n            lineNumber: 90,\n            columnNumber: 9\n        }, _this);\n    });\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"timer-gallery\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: \"prev btn gallery__btn\",\n                \"data-direction\": -1,\n                onClick: changeIndex,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    className: \"material-icons\",\n                    children: \"arrow_back_ios\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Maya Bradford\\\\OneDrive\\\\Documents\\\\MTC-Homework\\\\Javascript Test Projects\\\\My Original Projects\\\\stretches-site\\\\components\\\\TimerGallery.jsx\",\n                    lineNumber: 108,\n                    columnNumber: 17\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Maya Bradford\\\\OneDrive\\\\Documents\\\\MTC-Homework\\\\Javascript Test Projects\\\\My Original Projects\\\\stretches-site\\\\components\\\\TimerGallery.jsx\",\n                lineNumber: 104,\n                columnNumber: 13\n            }, this),\n            previewTimers,\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: \"next btn gallery__btn\",\n                \"data-direction\": +1,\n                onClick: changeIndex,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    className: \"material-icons\",\n                    children: \"arrow_forward_ios\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Maya Bradford\\\\OneDrive\\\\Documents\\\\MTC-Homework\\\\Javascript Test Projects\\\\My Original Projects\\\\stretches-site\\\\components\\\\TimerGallery.jsx\",\n                    lineNumber: 115,\n                    columnNumber: 17\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Maya Bradford\\\\OneDrive\\\\Documents\\\\MTC-Homework\\\\Javascript Test Projects\\\\My Original Projects\\\\stretches-site\\\\components\\\\TimerGallery.jsx\",\n                lineNumber: 111,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Maya Bradford\\\\OneDrive\\\\Documents\\\\MTC-Homework\\\\Javascript Test Projects\\\\My Original Projects\\\\stretches-site\\\\components\\\\TimerGallery.jsx\",\n        lineNumber: 103,\n        columnNumber: 9\n    }, this));\n};\n_s(TimerGallery, \"Fh3AdVZc552rPZ/I4CwYpAlNNb4=\");\n_c = TimerGallery;\nvar _c;\n$RefreshReg$(_c, \"TimerGallery\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1lBQ3RCSyxJQUFJLEVBQUU4QixLQUFLLENBQUM5QixJQUFJO1lBQ2hCSyxTQUFTLEVBQUV5QjtZQUNYMUIsV0FBVyxFQUFFMEIsS0FBSyxDQUFDMUI7WUFDbkJzQixlQUFlLEVBQUVBO1dBUlpJLEtBQUssQ0FBQy9CLEdBQUc7Ozs7OztJQVd0QixNQUFNO1FBQ0dnRCxTQUFTLEVBQUMsQ0FBZTs7O2dCQUV0QkEsU0FBUyw2REFBd0I7Z0JBQ2pDRSxDQUFjLGtCQUFHO2dCQUNqQkM7O29CQUNNSCxTQUFTLEVBQUMsQ0FBZ0I7OEJBQUMsQ0FBYzs7Ozs7Ozs7Ozs7WUFFbEQvQixhQUFhOztnQkFFVitCLFNBQVMsRUFBQyxDQUF1QjtnQkFDakNFLENBQWM7Z0JBQ2RDLE9BQU8sRUFBRTVDOztvQkFDSHlDLFNBQVMsRUFBQyxDQUFnQjs4QkFBQyxDQUFpQjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJbEUsQ0FBQztHQTdHdUIxRCxZQUFZO0tBQVpBLFlBQVkiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vY29tcG9uZW50cy9UaW1lckdhbGxlcnkuanN4PzEzOTkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgUHJldmlld1RpbWVyIGZyb20gXCIuL1ByZXZpZXdUaW1lclwiO1xyXG5pbXBvcnQgeyBuYW5vaWQgfSBmcm9tIFwibmFub2lkXCI7XHJcblxyXG4vKipcclxuICpcclxuICogQHBhcmFtIHsqfSBwcm9wc1xyXG4gKiBAcmV0dXJucyBhIGNvbXBvbmVudCB0aGF0IGFsbG93cyB5b3UgdG8gc3dpcGUgb3IgY2xpY2sgdGhyb3VnaCB0aW1lcnMgdG8gZWRpdCB0aGVtIGluZGl2aWR1YWxseSBpZiBuZWVkZWRcclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFRpbWVyR2FsbGVyeShwcm9wcykge1xyXG4gICAgY29uc3QgW2luZGV4LCBzZXRJbmRleF0gPSBSZWFjdC51c2VTdGF0ZSgwKTtcclxuICAgIGNvbnN0IGxvY2FsU3RvcmFnZVJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcclxuICAgIGNvbnN0IGJyZWFrVGltZXJSZWYgPSBSZWFjdC51c2VSZWYobnVsbCk7XHJcbiAgICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGxvY2FsU3RvcmFnZVJlZi5jdXJyZW50ID0gd2luZG93LmxvY2FsU3RvcmFnZTtcclxuICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cpO1xyXG4gICAgfSwgW10pO1xyXG4gICAgY29uc3QgW3RpbWVyRGF0YSwgc2V0VGltZXJEYXRhXSA9IFJlYWN0LnVzZVN0YXRlKFxyXG4gICAgICAgIEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmN1cnJlbnQuZ2V0SXRlbShcInByZXZpZXdUaW1lcnNcIikpIHx8IHBvcHVsYXRlVGltZXJzKClcclxuICAgICk7IC8vZm9yIHN0b3JpbmcgdGltZXJzIGluIGxvY2FsIHN0YXRlXHJcbiAgICBjb25zdCBbY3VycmVudFRpbWVySWQsIHNldEN1cnJlbnRUaW1lcklkXSA9IFJlYWN0LnVzZVN0YXRlKFxyXG4gICAgICAgICh0aW1lckRhdGFbMF0gJiYgdGltZXJEYXRhWzBdLmlkKSB8fCBcIlwiXHJcbiAgICApOyAvL2dldCBpZCBvZiBjdXJyZW50IHRpbWVyXHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2VSZWYuY3VycmVudC5zZXRJdGVtKFwicHJldmlld1RpbWVyc1wiLCBKU09OLnN0cmluZ2lmeSh0aW1lckRhdGEpKTtcclxuICAgIH0sIFt0aW1lckRhdGFdKTtcclxuXHJcbiAgICBmdW5jdGlvbiBwb3B1bGF0ZVRpbWVycygpIHtcclxuICAgICAgICBsZXQgdGltZXJPYmplY3RzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9wcy5udW1iZXI7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaXNCcmVhayA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAocHJvcHMuYWx0ZXJuYXRpbmcpIHtcclxuICAgICAgICAgICAgICAgIC8vZXZlcnkgb3RoZXIgb25lXHJcbiAgICAgICAgICAgICAgICBpZiAoaSAlIDIgIT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAvL29kZCBudW1iZXJcclxuICAgICAgICAgICAgICAgICAgICBpc0JyZWFrID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgaWQgPSBuYW5vaWQoKTtcclxuXHJcbiAgICAgICAgICAgIHRpbWVyT2JqZWN0cy5wdXNoKHtcclxuICAgICAgICAgICAgICAgIGtleTogaSxcclxuICAgICAgICAgICAgICAgIG51bWJlcjogaSArIDEsXHJcbiAgICAgICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgICAgIGlzQnJlYWs6IGlzQnJlYWssXHJcbiAgICAgICAgICAgICAgICB0aW1lOiB7IGhvdXJzOiAwLCBtaW51dGVzOiAwLCBzZWNvbmRzOiAwIH0sXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogXCJcIixcclxuICAgICAgICAgICAgICAgIGF1dG9zdGFydDogZmFsc2UsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGltZXJPYmplY3RzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNoYW5nZUluZGV4KGV2ZW50KSB7XHJcbiAgICAgICAgbGV0IHZhbHVlID0gcGFyc2VJbnQoZXZlbnQudGFyZ2V0LmRhdGFzZXQuZGlyZWN0aW9uKTtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gaW5kZXggKyB2YWx1ZTtcclxuICAgICAgICBpZiAocmVzdWx0IDwgMCkge1xyXG4gICAgICAgICAgICBzZXRJbmRleChwcmV2aWV3VGltZXJzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0ID49IHByZXZpZXdUaW1lcnMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHNldEluZGV4KDApO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNldEluZGV4KHJlc3VsdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyKGRhdGEsIGlkKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ1cGRhdGluZyB0aW1lciB3aXRoXCIsIGRhdGEpO1xyXG4gICAgICAgIHNldFRpbWVyRGF0YSgocHJldkRhdGEpID0+XHJcbiAgICAgICAgICAgIHByZXZEYXRhLm1hcCgob2xkVGltZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvbGRUaW1lci5pZCA9PT0gaWQgPyB7IC4uLm9sZFRpbWVyLCB0aW1lOiB7IC4uLmRhdGEgfSB9IDogb2xkVGltZXI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVRpbWVyRGF0YShkYXRhLCBwcm9wZXJ0eU5hbWUsIGlkKSB7XHJcbiAgICAgICAgc2V0VGltZXJEYXRhKChwcmV2RGF0YSkgPT5cclxuICAgICAgICAgICAgcHJldkRhdGEubWFwKChvbGRUaW1lcikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG9sZFRpbWVyLmlkID09PSBpZFxyXG4gICAgICAgICAgICAgICAgICAgID8geyAuLi5vbGRUaW1lciwgW3Byb3BlcnR5TmFtZV06IGRhdGEgfVxyXG4gICAgICAgICAgICAgICAgICAgIDogb2xkVGltZXI7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcclxuICAgICAgICAgICAgXCJVcGRhdGVkIGRhdGEgaXNcIixcclxuICAgICAgICAgICAgdGltZXJEYXRhLmZpbmQoKHRpbWVyKSA9PiB0aW1lci5pZCA9PT0gaWQpXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgcHJldmlld1RpbWVycyA9IHRpbWVyRGF0YS5tYXAoKHRpbWVyKSA9PiAoXHJcbiAgICAgICAgPFByZXZpZXdUaW1lclxyXG4gICAgICAgICAgICBrZXk9e3RpbWVyLmtleX1cclxuICAgICAgICAgICAgbnVtYmVyPXt0aW1lci5udW1iZXJ9XHJcbiAgICAgICAgICAgIGlkPXt0aW1lci5pZH1cclxuICAgICAgICAgICAgdXBkYXRlVGltZXI9e3VwZGF0ZVRpbWVyfVxyXG4gICAgICAgICAgICBpc0JyZWFrPXt0aW1lci5pc0JyZWFrfVxyXG4gICAgICAgICAgICB0aW1lPXt0aW1lci50aW1lfVxyXG4gICAgICAgICAgICBhdXRvc3RhcnQ9e3RpbWVyLmF1dG9zdGFydH1cclxuICAgICAgICAgICAgZGVzY3JpcHRpb249e3RpbWVyLmRlc2NyaXB0aW9ufVxyXG4gICAgICAgICAgICB1cGRhdGVUaW1lckRhdGE9e3VwZGF0ZVRpbWVyRGF0YX1cclxuICAgICAgICAvPlxyXG4gICAgKSk7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZXItZ2FsbGVyeVwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwcmV2IGJ0biBnYWxsZXJ5X19idG5cIlxyXG4gICAgICAgICAgICAgICAgZGF0YS1kaXJlY3Rpb249ey0xfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2hhbmdlSW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5hcnJvd19iYWNrX2lvczwvc3Bhbj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIHtwcmV2aWV3VGltZXJzfVxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJuZXh0IGJ0biBnYWxsZXJ5X19idG5cIlxyXG4gICAgICAgICAgICAgICAgZGF0YS1kaXJlY3Rpb249eysxfVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17Y2hhbmdlSW5kZXh9PlxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibWF0ZXJpYWwtaWNvbnNcIj5hcnJvd19mb3J3YXJkX2lvczwvc3Bhbj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJSZWFjdCIsIlByZXZpZXdUaW1lciIsIm5hbm9pZCIsIlRpbWVyR2FsbGVyeSIsInByb3BzIiwicG9wdWxhdGVUaW1lcnMiLCJ0aW1lck9iamVjdHMiLCJpIiwibnVtYmVyIiwiaXNCcmVhayIsImFsdGVybmF0aW5nIiwiaWQiLCJwdXNoIiwia2V5IiwidGltZSIsImhvdXJzIiwibWludXRlcyIsInNlY29uZHMiLCJkZXNjcmlwdGlvbiIsImF1dG9zdGFydCIsImNoYW5nZUluZGV4IiwiZXZlbnQiLCJ2YWx1ZSIsInBhcnNlSW50IiwidGFyZ2V0IiwiZGF0YXNldCIsImRpcmVjdGlvbiIsInJlc3VsdCIsImluZGV4Iiwic2V0SW5kZXgiLCJwcmV2aWV3VGltZXJzIiwibGVuZ3RoIiwidXBkYXRlVGltZXIiLCJkYXRhIiwiY29uc29sZSIsImxvZyIsInNldFRpbWVyRGF0YSIsInByZXZEYXRhIiwibWFwIiwib2xkVGltZXIiLCJ1cGRhdGVUaW1lckRhdGEiLCJwcm9wZXJ0eU5hbWUiLCJ0aW1lckRhdGEiLCJmaW5kIiwidGltZXIiLCJ1c2VTdGF0ZSIsImxvY2FsU3RvcmFnZVJlZiIsInVzZVJlZiIsImJyZWFrVGltZXJSZWYiLCJ1c2VFZmZlY3QiLCJjdXJyZW50Iiwid2luZG93IiwibG9jYWxTdG9yYWdlIiwiSlNPTiIsInBhcnNlIiwiZ2V0SXRlbSIsImN1cnJlbnRUaW1lcklkIiwic2V0Q3VycmVudFRpbWVySWQiLCJzZXRJdGVtIiwic3RyaW5naWZ5IiwiZGl2IiwiY2xhc3NOYW1lIiwiYnV0dG9uIiwiZGF0YS1kaXJlY3Rpb24iLCJvbkNsaWNrIiwic3BhbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/TimerGallery.jsx\n");

/***/ })

});