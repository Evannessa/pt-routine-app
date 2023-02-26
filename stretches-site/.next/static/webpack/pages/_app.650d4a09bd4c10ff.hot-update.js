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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ TimerGallery; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _PreviewTimer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PreviewTimer */ \"./components/PreviewTimer.jsx\");\n/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nanoid */ \"./node_modules/nanoid/index.dev.js\");\n/* module decorator */ module = __webpack_require__.hmd(module);\n\n\n\n\nfunction _arrayLikeToArray(arr, len) {\n    if (len == null || len > arr.length) len = arr.length;\n    for(var i = 0, arr2 = new Array(len); i < len; i++)arr2[i] = arr[i];\n    return arr2;\n}\nfunction _arrayWithHoles(arr) {\n    if (Array.isArray(arr)) return arr;\n}\nfunction _defineProperty(obj, key, value) {\n    if (key in obj) {\n        Object.defineProperty(obj, key, {\n            value: value,\n            enumerable: true,\n            configurable: true,\n            writable: true\n        });\n    } else {\n        obj[key] = value;\n    }\n    return obj;\n}\nfunction _iterableToArrayLimit(arr, i) {\n    var _i = arr == null ? null : typeof Symbol !== \"undefined\" && arr[Symbol.iterator] || arr[\"@@iterator\"];\n    if (_i == null) return;\n    var _arr = [];\n    var _n = true;\n    var _d = false;\n    var _s1, _e;\n    try {\n        for(_i = _i.call(arr); !(_n = (_s1 = _i.next()).done); _n = true){\n            _arr.push(_s1.value);\n            if (i && _arr.length === i) break;\n        }\n    } catch (err) {\n        _d = true;\n        _e = err;\n    } finally{\n        try {\n            if (!_n && _i[\"return\"] != null) _i[\"return\"]();\n        } finally{\n            if (_d) throw _e;\n        }\n    }\n    return _arr;\n}\nfunction _nonIterableRest() {\n    throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\");\n}\nfunction _objectSpread(target) {\n    for(var i = 1; i < arguments.length; i++){\n        var source = arguments[i] != null ? arguments[i] : {};\n        var ownKeys = Object.keys(source);\n        if (typeof Object.getOwnPropertySymbols === \"function\") {\n            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {\n                return Object.getOwnPropertyDescriptor(source, sym).enumerable;\n            }));\n        }\n        ownKeys.forEach(function(key) {\n            _defineProperty(target, key, source[key]);\n        });\n    }\n    return target;\n}\nfunction _slicedToArray(arr, i) {\n    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();\n}\nfunction _unsupportedIterableToArray(o, minLen) {\n    if (!o) return;\n    if (typeof o === \"string\") return _arrayLikeToArray(o, minLen);\n    var n = Object.prototype.toString.call(o).slice(8, -1);\n    if (n === \"Object\" && o.constructor) n = o.constructor.name;\n    if (n === \"Map\" || n === \"Set\") return Array.from(n);\n    if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);\n}\nvar _s = $RefreshSig$();\n/**\r\n *\r\n * @param {*} props\r\n * @returns a component that allows you to swipe or click through timers to edit them individually if needed\r\n */ function TimerGallery(props) {\n    var _this = this;\n    var populateTimers = function populateTimers() {\n        var timerObjects = [];\n        for(var i = 0; i < props.number; i++){\n            var isBreak = false;\n            if (props.alternating) {\n                //every other one\n                if (i % 2 !== 0) {\n                    //odd number\n                    isBreak = true;\n                }\n            }\n            var id = (0,nanoid__WEBPACK_IMPORTED_MODULE_3__.nanoid)();\n            timerObjects.push({\n                key: i,\n                number: i + 1,\n                id: id,\n                isBreak: isBreak,\n                time: {\n                    hours: 0,\n                    minutes: 0,\n                    seconds: 0\n                },\n                description: \"\",\n                autostart: false\n            });\n        }\n        return timerObjects;\n    };\n    var changeIndex = function changeIndex(event) {\n        var value = parseInt(event.target.dataset.direction);\n        var result = index + value;\n        if (result < 0) {\n            setIndex(previewTimers.length - 1);\n        } else if (result >= previewTimers.length) {\n            setIndex(0);\n        } else {\n            setIndex(result);\n        }\n    };\n    var updateTimer = function updateTimer(data, id) {\n        console.log(\"updating timer with\", data);\n        setTimerData(function(prevData) {\n            return prevData.map(function(oldTimer) {\n                return oldTimer.id === id ? _objectSpread({}, oldTimer, {\n                    time: _objectSpread({}, data)\n                }) : oldTimer;\n            });\n        });\n    };\n    var updateTimerData = function updateTimerData(data, propertyName, id) {\n        setTimerData(function(prevData) {\n            return prevData.map(function(oldTimer) {\n                return oldTimer.id === id ? _objectSpread({}, oldTimer, _defineProperty({}, propertyName, data)) : oldTimer;\n            });\n        });\n        console.log(\"Updated data is\", timerData.find(function(timer) {\n            return timer.id === id;\n        }));\n    };\n    _s();\n    var ref = _slicedToArray(react__WEBPACK_IMPORTED_MODULE_1___default().useState(0), 2), index = ref[0], setIndex = ref[1];\n    var localStorageRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);\n    var breakTimerRef = react__WEBPACK_IMPORTED_MODULE_1___default().useRef(null);\n    var ref1 = _slicedToArray(react__WEBPACK_IMPORTED_MODULE_1___default().useState(JSON.parse(localStorage.getItem(\"previewTimers\")) || populateTimers()), 2), timerData = ref1[0], setTimerData = ref1[1]; //for storing timers in local state\n    var ref2 = _slicedToArray(react__WEBPACK_IMPORTED_MODULE_1___default().useState(timerData[0] && timerData[0].id || \"\"), 2), currentTimerId = ref2[0], setCurrentTimerId = ref2[1]; //get id of current timer\n    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(function() {\n        localStorageRef.current = window.localStorage;\n        console.log(window, localStorage);\n    }, []);\n    react__WEBPACK_IMPORTED_MODULE_1___default().useEffect(function() {\n        localStorageRef.current.setItem(\"previewTimers\", JSON.stringify(timerData));\n    }, [\n        timerData\n    ]);\n    var previewTimers = timerData.map(function(timer) {\n        /*#__PURE__*/ return (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_PreviewTimer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n            number: timer.number,\n            id: timer.id,\n            updateTimer: updateTimer,\n            isBreak: timer.isBreak,\n            time: timer.time,\n            autostart: timer.autostart,\n            description: timer.description,\n            updateTimerData: updateTimerData\n        }, timer.key, false, {\n            fileName: \"C:\\\\Users\\\\Maya Bradford\\\\OneDrive\\\\Documents\\\\MTC-Homework\\\\Javascript Test Projects\\\\My Original Projects\\\\stretches-site\\\\components\\\\TimerGallery.jsx\",\n            lineNumber: 92,\n            columnNumber: 9\n        }, _this);\n    });\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"timer-gallery\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: \"prev btn gallery__btn\",\n                \"data-direction\": -1,\n                onClick: changeIndex,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    className: \"material-icons\",\n                    children: \"arrow_back_ios\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Maya Bradford\\\\OneDrive\\\\Documents\\\\MTC-Homework\\\\Javascript Test Projects\\\\My Original Projects\\\\stretches-site\\\\components\\\\TimerGallery.jsx\",\n                    lineNumber: 110,\n                    columnNumber: 17\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Maya Bradford\\\\OneDrive\\\\Documents\\\\MTC-Homework\\\\Javascript Test Projects\\\\My Original Projects\\\\stretches-site\\\\components\\\\TimerGallery.jsx\",\n                lineNumber: 106,\n                columnNumber: 13\n            }, this),\n            previewTimers,\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                className: \"next btn gallery__btn\",\n                \"data-direction\": +1,\n                onClick: changeIndex,\n                children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    className: \"material-icons\",\n                    children: \"arrow_forward_ios\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\Maya Bradford\\\\OneDrive\\\\Documents\\\\MTC-Homework\\\\Javascript Test Projects\\\\My Original Projects\\\\stretches-site\\\\components\\\\TimerGallery.jsx\",\n                    lineNumber: 117,\n                    columnNumber: 17\n                }, this)\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\Maya Bradford\\\\OneDrive\\\\Documents\\\\MTC-Homework\\\\Javascript Test Projects\\\\My Original Projects\\\\stretches-site\\\\components\\\\TimerGallery.jsx\",\n                lineNumber: 113,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\Maya Bradford\\\\OneDrive\\\\Documents\\\\MTC-Homework\\\\Javascript Test Projects\\\\My Original Projects\\\\stretches-site\\\\components\\\\TimerGallery.jsx\",\n        lineNumber: 105,\n        columnNumber: 9\n    }, this));\n};\n_s(TimerGallery, \"4UrDBkaS5EJv7F25TPcNzrbfUjA=\");\n_c = TimerGallery;\nvar _c;\n$RefreshReg$(_c, \"TimerGallery\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            var currentExports = module.__proto__.exports;\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFHLENBQUMsUUFBUSxDQUFQTSxLQUFLOztZQUdoQ3BDOztZQUVBd0IsV0FBVyxFQUFFQSxXQUFXO1lBQ3hCdkIsT0FBTyxFQUFFbUMsS0FBSyxDQUFDbkMsRUFBQUEsNkRBQU87WUFDdEJLLElBQUksRUFBRThCLEtBQUssQ0FBQzlCLElBQUk7WUFDaEJLLFNBQVMsRUFBRXlCO1lBQ1gxQixXQUFXLEVBQUUwQixLQUFLLENBQUMxQjtZQUNuQnNCLGVBQWUsRUFBRUE7V0FSWkksS0FBSyxDQUFDL0IsR0FBRzs7Ozs7O0lBV3RCLE1BQU07UUFDR2dELFNBQVMsRUFBQyxDQUFlOzs7Z0JBRXRCQSxTQUFTLDZEQUF3QjtnQkFDakNFLENBQWMsa0JBQUc7Z0JBQ2pCQzs7b0JBQ01ILFNBQVMsRUFBQyxDQUFnQjs4QkFBQyxDQUFjOzs7Ozs7Ozs7OztZQUVsRC9CLGFBQWE7O2dCQUVWK0IsU0FBUyxFQUFDLENBQXVCO2dCQUNqQ0UsQ0FBYztnQkFDZEMsT0FBTyxFQUFFNUM7O29CQUNIeUMsU0FBUyxFQUFDLENBQWdCOzhCQUFDLENBQWlCOzs7Ozs7Ozs7Ozs7Ozs7OztBQUlsRSxDQUFDO0dBL0d1QjFELFlBQVk7S0FBWkEsWUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL1RpbWVyR2FsbGVyeS5qc3g/MTM5OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCBQcmV2aWV3VGltZXIgZnJvbSBcIi4vUHJldmlld1RpbWVyXCI7XHJcbmltcG9ydCB7IG5hbm9pZCB9IGZyb20gXCJuYW5vaWRcIjtcclxuXHJcbi8qKlxyXG4gKlxyXG4gKiBAcGFyYW0geyp9IHByb3BzXHJcbiAqIEByZXR1cm5zIGEgY29tcG9uZW50IHRoYXQgYWxsb3dzIHlvdSB0byBzd2lwZSBvciBjbGljayB0aHJvdWdoIHRpbWVycyB0byBlZGl0IHRoZW0gaW5kaXZpZHVhbGx5IGlmIG5lZWRlZFxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gVGltZXJHYWxsZXJ5KHByb3BzKSB7XHJcbiAgICBjb25zdCBbaW5kZXgsIHNldEluZGV4XSA9IFJlYWN0LnVzZVN0YXRlKDApO1xyXG4gICAgY29uc3QgbG9jYWxTdG9yYWdlUmVmID0gUmVhY3QudXNlUmVmKG51bGwpO1xyXG4gICAgY29uc3QgYnJlYWtUaW1lclJlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcclxuXHJcbiAgICBjb25zdCBbdGltZXJEYXRhLCBzZXRUaW1lckRhdGFdID0gUmVhY3QudXNlU3RhdGUoXHJcbiAgICAgICAgSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByZXZpZXdUaW1lcnNcIikpIHx8IHBvcHVsYXRlVGltZXJzKClcclxuICAgICk7IC8vZm9yIHN0b3JpbmcgdGltZXJzIGluIGxvY2FsIHN0YXRlXHJcbiAgICBjb25zdCBbY3VycmVudFRpbWVySWQsIHNldEN1cnJlbnRUaW1lcklkXSA9IFJlYWN0LnVzZVN0YXRlKFxyXG4gICAgICAgICh0aW1lckRhdGFbMF0gJiYgdGltZXJEYXRhWzBdLmlkKSB8fCBcIlwiXHJcbiAgICApOyAvL2dldCBpZCBvZiBjdXJyZW50IHRpbWVyXHJcblxyXG4gICAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBsb2NhbFN0b3JhZ2VSZWYuY3VycmVudCA9IHdpbmRvdy5sb2NhbFN0b3JhZ2U7XHJcbiAgICAgICAgY29uc29sZS5sb2cod2luZG93LCBsb2NhbFN0b3JhZ2UpO1xyXG4gICAgfSwgW10pO1xyXG5cclxuICAgIFJlYWN0LnVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgICAgbG9jYWxTdG9yYWdlUmVmLmN1cnJlbnQuc2V0SXRlbShcInByZXZpZXdUaW1lcnNcIiwgSlNPTi5zdHJpbmdpZnkodGltZXJEYXRhKSk7XHJcbiAgICB9LCBbdGltZXJEYXRhXSk7XHJcblxyXG4gICAgZnVuY3Rpb24gcG9wdWxhdGVUaW1lcnMoKSB7XHJcbiAgICAgICAgbGV0IHRpbWVyT2JqZWN0cyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvcHMubnVtYmVyOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IGlzQnJlYWsgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHByb3BzLmFsdGVybmF0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICAvL2V2ZXJ5IG90aGVyIG9uZVxyXG4gICAgICAgICAgICAgICAgaWYgKGkgJSAyICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy9vZGQgbnVtYmVyXHJcbiAgICAgICAgICAgICAgICAgICAgaXNCcmVhayA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IGlkID0gbmFub2lkKCk7XHJcblxyXG4gICAgICAgICAgICB0aW1lck9iamVjdHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICBrZXk6IGksXHJcbiAgICAgICAgICAgICAgICBudW1iZXI6IGkgKyAxLFxyXG4gICAgICAgICAgICAgICAgaWQsXHJcbiAgICAgICAgICAgICAgICBpc0JyZWFrOiBpc0JyZWFrLFxyXG4gICAgICAgICAgICAgICAgdGltZTogeyBob3VyczogMCwgbWludXRlczogMCwgc2Vjb25kczogMCB9LFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBhdXRvc3RhcnQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRpbWVyT2JqZWN0cztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjaGFuZ2VJbmRleChldmVudCkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHBhcnNlSW50KGV2ZW50LnRhcmdldC5kYXRhc2V0LmRpcmVjdGlvbik7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IGluZGV4ICsgdmFsdWU7XHJcbiAgICAgICAgaWYgKHJlc3VsdCA8IDApIHtcclxuICAgICAgICAgICAgc2V0SW5kZXgocHJldmlld1RpbWVycy5sZW5ndGggLSAxKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCA+PSBwcmV2aWV3VGltZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzZXRJbmRleCgwKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZXRJbmRleChyZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVUaW1lcihkYXRhLCBpZCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidXBkYXRpbmcgdGltZXIgd2l0aFwiLCBkYXRhKTtcclxuICAgICAgICBzZXRUaW1lckRhdGEoKHByZXZEYXRhKSA9PlxyXG4gICAgICAgICAgICBwcmV2RGF0YS5tYXAoKG9sZFRpbWVyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2xkVGltZXIuaWQgPT09IGlkID8geyAuLi5vbGRUaW1lciwgdGltZTogeyAuLi5kYXRhIH0gfSA6IG9sZFRpbWVyO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBmdW5jdGlvbiB1cGRhdGVUaW1lckRhdGEoZGF0YSwgcHJvcGVydHlOYW1lLCBpZCkge1xyXG4gICAgICAgIHNldFRpbWVyRGF0YSgocHJldkRhdGEpID0+XHJcbiAgICAgICAgICAgIHByZXZEYXRhLm1hcCgob2xkVGltZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBvbGRUaW1lci5pZCA9PT0gaWRcclxuICAgICAgICAgICAgICAgICAgICA/IHsgLi4ub2xkVGltZXIsIFtwcm9wZXJ0eU5hbWVdOiBkYXRhIH1cclxuICAgICAgICAgICAgICAgICAgICA6IG9sZFRpbWVyO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgY29uc29sZS5sb2coXHJcbiAgICAgICAgICAgIFwiVXBkYXRlZCBkYXRhIGlzXCIsXHJcbiAgICAgICAgICAgIHRpbWVyRGF0YS5maW5kKCh0aW1lcikgPT4gdGltZXIuaWQgPT09IGlkKVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHByZXZpZXdUaW1lcnMgPSB0aW1lckRhdGEubWFwKCh0aW1lcikgPT4gKFxyXG4gICAgICAgIDxQcmV2aWV3VGltZXJcclxuICAgICAgICAgICAga2V5PXt0aW1lci5rZXl9XHJcbiAgICAgICAgICAgIG51bWJlcj17dGltZXIubnVtYmVyfVxyXG4gICAgICAgICAgICBpZD17dGltZXIuaWR9XHJcbiAgICAgICAgICAgIHVwZGF0ZVRpbWVyPXt1cGRhdGVUaW1lcn1cclxuICAgICAgICAgICAgaXNCcmVhaz17dGltZXIuaXNCcmVha31cclxuICAgICAgICAgICAgdGltZT17dGltZXIudGltZX1cclxuICAgICAgICAgICAgYXV0b3N0YXJ0PXt0aW1lci5hdXRvc3RhcnR9XHJcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uPXt0aW1lci5kZXNjcmlwdGlvbn1cclxuICAgICAgICAgICAgdXBkYXRlVGltZXJEYXRhPXt1cGRhdGVUaW1lckRhdGF9XHJcbiAgICAgICAgLz5cclxuICAgICkpO1xyXG4gICAgcmV0dXJuIChcclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVyLWdhbGxlcnlcIj5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwicHJldiBidG4gZ2FsbGVyeV9fYnRuXCJcclxuICAgICAgICAgICAgICAgIGRhdGEtZGlyZWN0aW9uPXstMX1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NoYW5nZUluZGV4fT5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+YXJyb3dfYmFja19pb3M8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICB7cHJldmlld1RpbWVyc31cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibmV4dCBidG4gZ2FsbGVyeV9fYnRuXCJcclxuICAgICAgICAgICAgICAgIGRhdGEtZGlyZWN0aW9uPXsrMX1cclxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e2NoYW5nZUluZGV4fT5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1hdGVyaWFsLWljb25zXCI+YXJyb3dfZm9yd2FyZF9pb3M8L3NwYW4+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgKTtcclxufVxyXG4iXSwibmFtZXMiOlsiUmVhY3QiLCJQcmV2aWV3VGltZXIiLCJuYW5vaWQiLCJUaW1lckdhbGxlcnkiLCJwcm9wcyIsInBvcHVsYXRlVGltZXJzIiwidGltZXJPYmplY3RzIiwiaSIsIm51bWJlciIsImlzQnJlYWsiLCJhbHRlcm5hdGluZyIsImlkIiwicHVzaCIsImtleSIsInRpbWUiLCJob3VycyIsIm1pbnV0ZXMiLCJzZWNvbmRzIiwiZGVzY3JpcHRpb24iLCJhdXRvc3RhcnQiLCJjaGFuZ2VJbmRleCIsImV2ZW50IiwidmFsdWUiLCJwYXJzZUludCIsInRhcmdldCIsImRhdGFzZXQiLCJkaXJlY3Rpb24iLCJyZXN1bHQiLCJpbmRleCIsInNldEluZGV4IiwicHJldmlld1RpbWVycyIsImxlbmd0aCIsInVwZGF0ZVRpbWVyIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJzZXRUaW1lckRhdGEiLCJwcmV2RGF0YSIsIm1hcCIsIm9sZFRpbWVyIiwidXBkYXRlVGltZXJEYXRhIiwicHJvcGVydHlOYW1lIiwidGltZXJEYXRhIiwiZmluZCIsInRpbWVyIiwidXNlU3RhdGUiLCJsb2NhbFN0b3JhZ2VSZWYiLCJ1c2VSZWYiLCJicmVha1RpbWVyUmVmIiwiSlNPTiIsInBhcnNlIiwibG9jYWxTdG9yYWdlIiwiZ2V0SXRlbSIsImN1cnJlbnRUaW1lcklkIiwic2V0Q3VycmVudFRpbWVySWQiLCJ1c2VFZmZlY3QiLCJjdXJyZW50Iiwid2luZG93Iiwic2V0SXRlbSIsInN0cmluZ2lmeSIsImRpdiIsImNsYXNzTmFtZSIsImJ1dHRvbiIsImRhdGEtZGlyZWN0aW9uIiwib25DbGljayIsInNwYW4iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/TimerGallery.jsx\n");

/***/ })

});