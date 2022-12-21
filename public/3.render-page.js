exports.ids = [3];
exports.modules = {

/***/ 956:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _propTypes = __webpack_require__(11);
	
	var _propTypes2 = _interopRequireDefault(_propTypes);
	
	var _reactJss = __webpack_require__(198);
	
	var _reactJss2 = _interopRequireDefault(_reactJss);
	
	var _config = __webpack_require__(853);
	
	var _config2 = _interopRequireDefault(_config);
	
	var _AsyncComponent = __webpack_require__(376);
	
	var _AsyncComponent2 = _interopRequireDefault(_AsyncComponent);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// const DiscussionEmbedAsync = React.lazy(() =>
	//   import("disqus-react").then(({ DiscussionEmbed }) => DiscussionEmbed)
	// );
	
	// import FacebookProvider, { Comments } from "react-facebook";
	// import { DiscussionEmbed } from "disqus-react";
	var DiscussionEmbed = (0, _AsyncComponent2.default)(function () {
	  return new Promise(function (resolve) {
	    __webpack_require__.e/* nsure */(4, function (require) {
	      resolve(__webpack_require__(957));
	    });
	  }).then(function (module) {
	    return module.DiscussionEmbed;
	  }).catch(function (error) {});
	});
	
	var styles = function styles(theme) {
	  return {
	    postComments: {
	      margin: "3em 0 0",
	      padding: "3em 0 0",
	      borderTop: "1px solid #ddd"
	    }
	  };
	};
	
	// {/* <Disqus.CommentCount shortname={disqusShortname} config={disqusConfig}>
	//   Comments
	// </Disqus.CommentCount> */}
	
	var DISQUS_DELAY = 6000;
	
	var PostComments = function PostComments(props) {
	  var _useState = (0, _react.useState)(false),
	      showComments = _useState[0],
	      setShowComments = _useState[1];
	
	  var _ref = props || {},
	      classes = _ref.classes,
	      slug = _ref.slug,
	      post = _ref.post;
	
	  var title = post && post.frontmatter && post.frontmatter.title;
	  var category = post && post.frontmatter && post.frontmatter.category;
	
	  var url = _config2.default.siteUrl + _config2.default.pathPrefix + slug;
	  var disqusConfig = {
	    identifier: (post && post.fields && post.fields.prefix) + "/" + category,
	    title: title || slug,
	    url: url
	  };
	
	  // eslint-disable-next-line no-undef
	  var isSSR = typeof globalThis === "undefined";
	
	  if (isSSR) return _react2.default.createElement("div", { className: "post-comments-ssr-placeholder" });
	
	  (0, _react.useEffect)(function () {
	    setTimeout(setShowComments, DISQUS_DELAY, true);
	  }, []);
	
	  return _react2.default.createElement(
	    "div",
	    { id: "post-comments", className: classes.postComments },
	    showComments && _react2.default.createElement(DiscussionEmbed, { shortname: _config2.default.disqusShortname, config: disqusConfig })
	  );
	};
	
	PostComments.propTypes = {
	  classes: _propTypes2.default.object.isRequired,
	  post: _propTypes2.default.object.isRequired,
	  slug: _propTypes2.default.string.isRequired,
	  theme: _propTypes2.default.object.isRequired
	  // facebook: PropTypes.object.isRequired
	};
	
	exports.default = (0, _reactJss2.default)(styles)(PostComments);
	module.exports = exports["default"];

/***/ })

};;
//# sourceMappingURL=3.render-page.js.map