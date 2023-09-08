webpackJsonp([3],{

/***/ 1015:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _propTypes = __webpack_require__(109);

	var _propTypes2 = _interopRequireDefault(_propTypes);

	var _reactJss = __webpack_require__(254);

	var _reactJss2 = _interopRequireDefault(_reactJss);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// import FacebookProvider, { Comments } from "react-facebook";
	// import { DiscussionEmbed } from "disqus-react";
	// import config from "../../../content/meta/config";
	// import asyncComponent from "../common/AsyncComponent";

	// const DiscussionEmbedAsync = React.lazy(() =>
	//   import("disqus-react").then(({ DiscussionEmbed }) => DiscussionEmbed)
	// );
	// const DiscussionEmbed = asyncComponent(() =>
	//   import("disqus-react")
	//     .then(module => {
	//       return module.DiscussionEmbed;
	//     })
	//     .catch(error => {})
	// );

	var styles = function styles(theme) {
	  return {
	    postComments: {
	      margin: "3em 0 0",
	      padding: "3em 0 0",
	      borderTop: "1px solid #ddd"
	    }
	  };
	};

	var COMMENTS_DELAY = 3000;

	var GitHubIssueComments = function GitHubIssueComments() {
	  return _react2.default.createElement("script", {
	    src: "https://utteranc.es/client.js",
	    repo: "justsml/dans-blog",
	    "issue-term": "pathname",
	    label: "\uD83D\uDCAC comment",
	    theme: "photon-dark",
	    crossOrigin: "anonymous",
	    async: true
	  });
	};

	var PostComments = function PostComments(props) {
	  var _useState = (0, _react.useState)(false),
	      showComments = _useState[0],
	      setShowComments = _useState[1];

	  var _ref = props || {},
	      classes = _ref.classes;
	  // const title = post && post.frontmatter && post.frontmatter.title;
	  // const category = post && post.frontmatter && post.frontmatter.category;

	  // const url = config.siteUrl + config.pathPrefix + slug;
	  // const disqusConfig = {
	  //   identifier: `${post && post.fields && post.fields.prefix}/${category}`,
	  //   title: title || slug,
	  //   url
	  // };

	  // eslint-disable-next-line no-undef


	  var isSSR = typeof globalThis === "undefined";

	  if (isSSR) return _react2.default.createElement("div", { className: "post-comments-ssr-placeholder" });

	  (0, _react.useEffect)(function () {
	    var t = setTimeout(setShowComments, COMMENTS_DELAY, true);
	    return function () {
	      return clearTimeout(t);
	    };
	  }, []);

	  return _react2.default.createElement(
	    "div",
	    { id: "post-comments", className: classes.postComments },
	    showComments ? _react2.default.createElement(GitHubIssueComments, null) : "Loading comments..."
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

});