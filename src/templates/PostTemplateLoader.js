import React, { Suspense, lazy } from "react";

const PostTemplateAsync = lazy(() => import("./PostTemplate.js"));

export default function PostTemplateLoader(props) {
  return (
    <Suspense fallback={<p>Loading, please wait...</p>}>
      <PostTemplateAsync {...props} />
    </Suspense>
  );
}
