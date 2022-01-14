exports.ids = [4];
exports.modules = {

/***/ 953:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DiscussionEmbed = exports.CommentEmbed = exports.CommentCount = undefined;
	
	var _CommentCount = __webpack_require__(954);
	
	var _CommentEmbed = __webpack_require__(956);
	
	var _DiscussionEmbed = __webpack_require__(957);
	
	exports.CommentCount = _CommentCount.CommentCount;
	exports.CommentEmbed = _CommentEmbed.CommentEmbed;
	exports.DiscussionEmbed = _DiscussionEmbed.DiscussionEmbed;
	
	
	var Disqus = {
	    CommentCount: _CommentCount.CommentCount,
	    CommentEmbed: _CommentEmbed.CommentEmbed,
	    DiscussionEmbed: _DiscussionEmbed.DiscussionEmbed
	};
	
	exports.default = Disqus;

/***/ }),

/***/ 954:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CommentCount = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(955);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var queueResetCount = (0, _utils.debounce)(function () {
	    if (window.DISQUSWIDGETS) window.DISQUSWIDGETS.getCount({ reset: true });
	}, 300, false); // eslint-disable-line no-magic-numbers
	
	var CommentCount = exports.CommentCount = function (_React$Component) {
	    _inherits(CommentCount, _React$Component);
	
	    function CommentCount() {
	        _classCallCheck(this, CommentCount);
	
	        return _possibleConstructorReturn(this, (CommentCount.__proto__ || Object.getPrototypeOf(CommentCount)).apply(this, arguments));
	    }
	
	    _createClass(CommentCount, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.loadInstance();
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps) {
	            if (this.props.shortname !== nextProps.shortname) return true;
	
	            var nextConfig = nextProps.config;
	            var config = this.props.config;
	            if (nextConfig.url === config.url || nextConfig.identifier === config.identifier) return false;
	            return true;
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps) {
	            if (this.props.shortname !== nextProps.shortname) this.cleanInstance();
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.loadInstance();
	        }
	    }, {
	        key: 'loadInstance',
	        value: function loadInstance() {
	            var doc = window.document;
	            if (doc.getElementById('dsq-count-scr')) queueResetCount();else (0, _utils.insertScript)('https://' + this.props.shortname + '.disqus.com/count.js', 'dsq-count-scr', doc.body);
	        }
	    }, {
	        key: 'cleanInstance',
	        value: function cleanInstance() {
	            var body = window.document.body;
	            (0, _utils.removeScript)('dsq-count-scr', body);
	
	            // count.js only reassigns this window object if it's undefined.
	            window.DISQUSWIDGETS = undefined;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'span',
	                {
	                    className: 'disqus-comment-count',
	                    'data-disqus-identifier': this.props.config.identifier,
	                    'data-disqus-url': this.props.config.url
	                },
	                this.props.children
	            );
	        }
	    }]);
	
	    return CommentCount;
	}(_react2.default.Component);

/***/ }),

/***/ 955:
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.insertScript = insertScript;
	exports.removeScript = removeScript;
	exports.debounce = debounce;
	function insertScript(src, id, parentElement) {
	    var script = window.document.createElement('script');
	    script.async = true;
	    script.src = src;
	    script.id = id;
	    parentElement.appendChild(script);
	
	    return script;
	}
	
	function removeScript(id, parentElement) {
	    var script = window.document.getElementById(id);
	    if (script) parentElement.removeChild(script);
	}
	
	function debounce(func, wait, runOnFirstCall) {
	    var timeout = void 0;
	    return function () {
	        var context = this; // eslint-disable-line consistent-this
	        var args = arguments;
	
	        var deferredExecution = function deferredExecution() {
	            timeout = null;
	            if (!runOnFirstCall) func.apply(context, args);
	        };
	
	        var callNow = runOnFirstCall && !timeout;
	
	        window.clearTimeout(timeout);
	        timeout = setTimeout(deferredExecution, wait);
	
	        if (callNow) func.apply(context, args);
	    };
	}

/***/ }),

/***/ 956:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.CommentEmbed = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RADIX_BASE = 36;
	
	var CommentEmbed = exports.CommentEmbed = function (_React$Component) {
	    _inherits(CommentEmbed, _React$Component);
	
	    function CommentEmbed() {
	        _classCallCheck(this, CommentEmbed);
	
	        return _possibleConstructorReturn(this, (CommentEmbed.__proto__ || Object.getPrototypeOf(CommentEmbed)).apply(this, arguments));
	    }
	
	    _createClass(CommentEmbed, [{
	        key: 'getSrc',
	        value: function getSrc() {
	            var post = Number(this.props.commentId).toString(RADIX_BASE);
	            var parentParam = this.props.showParentComment ? '1' : '0';
	            var mediaParam = this.props.showMedia ? '1' : '0';
	
	            return 'https://embed.disqus.com/p/' + post + '?p=' + parentParam + '&m=' + mediaParam;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement('iframe', {
	                src: this.getSrc(),
	                width: this.props.width,
	                height: this.props.height,
	                seamless: 'seamless',
	                scrolling: 'no',
	                frameBorder: '0'
	            });
	        }
	    }]);
	
	    return CommentEmbed;
	}(_react2.default.Component);
	
	CommentEmbed.defaultProps = {
	    showMedia: true,
	    showParentComment: true,
	    width: 420,
	    height: 320
	};

/***/ }),

/***/ 957:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.DiscussionEmbed = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _utils = __webpack_require__(955);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var DiscussionEmbed = exports.DiscussionEmbed = function (_React$Component) {
	    _inherits(DiscussionEmbed, _React$Component);
	
	    function DiscussionEmbed() {
	        _classCallCheck(this, DiscussionEmbed);
	
	        return _possibleConstructorReturn(this, (DiscussionEmbed.__proto__ || Object.getPrototypeOf(DiscussionEmbed)).apply(this, arguments));
	    }
	
	    _createClass(DiscussionEmbed, [{
	        key: 'componentWillMount',
	        value: function componentWillMount() {
	            if (typeof window !== 'undefined' && window.disqus_shortname && window.disqus_shortname !== this.props.shortname) this.cleanInstance();
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            this.loadInstance();
	        }
	    }, {
	        key: 'shouldComponentUpdate',
	        value: function shouldComponentUpdate(nextProps) {
	            if (this.props.shortname !== nextProps.shortname) return true;
	
	            var nextConfig = nextProps.config;
	            var config = this.props.config;
	            if (nextConfig.url === config.url || nextConfig.identifier === config.identifier) return false;
	            return true;
	        }
	    }, {
	        key: 'componentWillUpdate',
	        value: function componentWillUpdate(nextProps) {
	            if (this.props.shortname !== nextProps.shortname) this.cleanInstance();
	        }
	    }, {
	        key: 'componentDidUpdate',
	        value: function componentDidUpdate() {
	            this.loadInstance();
	        }
	    }, {
	        key: 'loadInstance',
	        value: function loadInstance() {
	            var doc = window.document;
	            if (window && window.DISQUS && doc.getElementById('dsq-embed-scr')) {
	                window.DISQUS.reset({
	                    reload: true,
	                    config: this.getDisqusConfig(this.props.config)
	                });
	            } else {
	                window.disqus_config = this.getDisqusConfig(this.props.config);
	                window.disqus_shortname = this.props.shortname;
	                (0, _utils.insertScript)('https://' + this.props.shortname + '.disqus.com/embed.js', 'dsq-embed-scr', doc.body);
	            }
	        }
	    }, {
	        key: 'cleanInstance',
	        value: function cleanInstance() {
	            var doc = window.document;
	            (0, _utils.removeScript)('dsq-embed-scr', doc.body);
	            if (window && window.DISQUS) window.DISQUS.reset({});
	
	            try {
	                delete window.DISQUS;
	            } catch (error) {
	                window.DISQUS = undefined;
	            }
	            var disqusThread = doc.getElementById('disqus_thread');
	            if (disqusThread) {
	                while (disqusThread.hasChildNodes()) {
	                    disqusThread.removeChild(disqusThread.firstChild);
	                }
	            }
	        }
	    }, {
	        key: 'getDisqusConfig',
	        value: function getDisqusConfig(config) {
	            return function () {
	                this.page.identifier = config.identifier;
	                this.page.url = config.url;
	                this.page.title = config.title;
	                this.callbacks.onNewComment = [config.onNewComment];
	            };
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement('div', { id: 'disqus_thread' });
	        }
	    }]);
	
	    return DiscussionEmbed;
	}(_react2.default.Component);

/***/ })

};;
//# sourceMappingURL=4.render-page.js.map