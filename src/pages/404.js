import React from "react";
import PropTypes from "prop-types";
require("core-js/fn/array/find");

import Main from "../components/Main";
import Article from "../components/Main/Article";
import PageHeader from "../components/Page/PageHeader";
import Search from "../components/Search";

const SearchPage = props => {
  const { data } = props;

  return (
    <div style={{ width: "760px" }}>
      <Main>
        <Article>
          {/* <PageHeader title="Search by" algolia={true} />
          <Search algolia={data.site.siteMetadata.algolia} /> */}
          <h1>Page not found</h1>
        </Article>
      </Main>
    </div>
  );
};

SearchPage.propTypes = {
  data: PropTypes.object.isRequired
};

export default SearchPage;

