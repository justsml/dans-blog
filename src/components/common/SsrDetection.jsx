import React, { useState, useEffect } from "react";

/**
 * Function-as-a-child (aka FaaC) pattern
 * to provide the `isBrowserRendering` value.
 *
 * @example
 * ```js
 * <SsrDetectionFaaC>
 *   {({isBrowserRendering}) => {
 *     <NavBar
 *       browserMode={isBrowserRendering}
 *       serverMode={!isBrowserRendering}
 *     />
 *   }}
 * </SsrDetectionFaaC>
 * ```
 *
 * @param Component a React Component
 * @returns `<Component isBrowserRendering={isBrowserRendering} />`
 */
export function SsrDetectionFaaC({ children }) {
  const [isBrowserRendering, setIsBrowserRendering] = useState(false);
  useEffect(() => {
    setIsBrowserRendering(true);
  }, []);

  return children({ isBrowserRendering });
}

/**
 * Higher-order Component adds `isBrowserRendering` prop to provided component.
 *
 * @example
 * ```js
 * export default withBrowserDetection(NavBar);
 * ```
 *
 * @param Component a React Component
 * @returns `<Component isBrowserRendering={isBrowserRendering} />`
 */
export function withBrowserDetection(Component) {
  const [isBrowserRendering, setIsBrowserRendering] = useState(false);
  useEffect(() => {
    setIsBrowserRendering(true);
  }, []);

  const WrappedComponent = React.useCallback(
    props => <Component {...props} isBrowserRendering={isBrowserRendering} />,
    [isBrowserRendering]
  );

  return WrappedComponent;
}
