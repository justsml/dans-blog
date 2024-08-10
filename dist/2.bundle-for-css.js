webpackJsonp([2],{

/***/ 956:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(109);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactJss = __webpack_require__(254);

	var _reactJss2 = _interopRequireDefault(_reactJss);

	var _reactShare = __webpack_require__(957);

	var _config = __webpack_require__(882);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var styles = function styles(theme) {
	  var _share, _label;

	  return {
	    share: (_share = {
	      display: "flex",
	      flexDirection: "column",
	      justifyContent: "center",
	      alignItems: "center",
	      padding: "1em 0 0"
	    }, _share["@media (min-width: " + theme.mediaQueryTresholds.M + "px)"] = {
	      flexDirection: "row"
	    }, _share),
	    links: {
	      display: "flex",
	      flexDirection: "row",
	      "& .SocialMediaShareButton": {
	        margin: "0 .8em",
	        cursor: "pointer"
	      }
	    },
	    label: (_label = {
	      fontSize: "1.2em",
	      margin: "0 1em 1em"
	    }, _label["@media (min-width: " + theme.mediaQueryTresholds.M + "px)"] = {
	      margin: "0 1em"
	    }, _label)
	  };
	};

	var PostShare = function (_React$Component) {
	  _inherits(PostShare, _React$Component);

	  function PostShare() {
	    _classCallCheck(this, PostShare);

	    return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
	  }

	  PostShare.prototype.render = function render() {
	    var _props = this.props,
	        post = _props.post,
	        classes = _props.classes,
	        slug = _props.slug;

	    var _ref = post || {},
	        excerpt = _ref.excerpt,
	        frontmatter = _ref.frontmatter;

	    var _ref2 = frontmatter || {},
	        title = _ref2.title;

	    var url = _config2.default.siteUrl + _config2.default.pathPrefix + slug;

	    var iconSize = 36;
	    var filter = function filter(count) {
	      return count > 0 ? count : "";
	    };

	    return _react2.default.createElement(
	      "div",
	      { className: classes.share },
	      _react2.default.createElement(
	        "span",
	        { className: classes.label },
	        "SHARE"
	      ),
	      _react2.default.createElement(
	        "div",
	        { className: classes.links },
	        _react2.default.createElement(
	          _reactShare.TwitterShareButton,
	          { url: url, title: title },
	          _react2.default.createElement(_reactShare.TwitterIcon, { round: true, size: iconSize })
	        ),
	        _react2.default.createElement(
	          _reactShare.GooglePlusShareButton,
	          { url: url },
	          _react2.default.createElement(_reactShare.GooglePlusIcon, { round: true, size: iconSize }),
	          _react2.default.createElement(
	            _reactShare.GooglePlusShareCount,
	            { url: url },
	            function (count) {
	              return _react2.default.createElement(
	                "div",
	                { className: "share-count" },
	                filter(count)
	              );
	            }
	          )
	        ),
	        _react2.default.createElement(
	          _reactShare.FacebookShareButton,
	          {
	            url: url,
	            quote: title + " - " + excerpt,
	            "aria-label": "Facebook share"
	          },
	          _react2.default.createElement(_reactShare.FacebookIcon, { round: true, size: iconSize }),
	          _react2.default.createElement(
	            _reactShare.FacebookShareCount,
	            { url: url },
	            function (count) {
	              return _react2.default.createElement(
	                "div",
	                { className: "share-count" },
	                filter(count)
	              );
	            }
	          )
	        ),
	        _react2.default.createElement(
	          _reactShare.LinkedinShareButton,
	          { url: url, title: title, description: excerpt },
	          _react2.default.createElement(_reactShare.LinkedinIcon, { round: true, size: iconSize }),
	          _react2.default.createElement(
	            _reactShare.LinkedinShareCount,
	            { url: url },
	            function (count) {
	              return _react2.default.createElement(
	                "div",
	                { className: "share-count" },
	                filter(count)
	              );
	            }
	          )
	        )
	      )
	    );
	  };

	  return PostShare;
	}(_react2.default.Component);

	PostShare.propTypes = {
	  post: _propTypes2.default.object.isRequired,
	  classes: _propTypes2.default.object.isRequired,
	  slug: _propTypes2.default.string.isRequired
	};

	exports.default = (0, _reactJss2.default)(styles)(PostShare);
	module.exports = exports["default"];

/***/ })

});