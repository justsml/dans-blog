import React, { useState, useEffect } from "react";

/**
 * Function-as-a-child (aka FaaC) pattern
 * to provide the `isBrowserActive` value.
 *
 * @example
 * ```js
 * <SsrDetectionFaaC>
 *   {({isBrowserActive}) => {
 *     <NavBar
 *       browserMode={isBrowserActive}
 *       serverMode={!isBrowserActive}
 *     />
 *   }}
 * </SsrDetectionFaaC>
 * ```
 *
 * @param Component a React Component
 * @returns `<Component isBrowserActive={isBrowserActive} />`
 */
export function SsrDetectionFaaC({ children }) {
  const [isBrowserActive, setIsBrowserRendering] = useState(false);
  useEffect(() => {
    setIsBrowserRendering(true);
  }, []);

  return children({ isBrowserActive });
}

/**
 * Higher-order Component adds `isBrowserActive` prop to provided component.
 *
 * @example
 * ```js
 * export default withBrowserDetection(NavBar);
 * ```
 *
 * @param Component a React Component
 * @returns `<Component isBrowserActive={isBrowserActive} />`
 */
export function withBrowserDetection(Component) {
  const [isBrowserActive, setIsBrowserRendering] = useState(false);
  useEffect(() => {
    setIsBrowserRendering(true);
  }, []);

  const WrappedComponent = React.useCallback(
    props => <Component {...props} isBrowserActive={isBrowserActive} />,
    [isBrowserActive]
  );

  return WrappedComponent;
}
