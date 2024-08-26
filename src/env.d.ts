/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />


import * as React from 'react';

declare module 'react' {
    namespace React {
        type FC<P = {}> = preact.FunctionComponent<P>;

        interface SVGSVGElement extends SVGElement {
            className?: string;
        }

        // ...
    }
    export = React;
    export as namespace React;
}

declare module '@types/react' {
    interface SVGSVGElement extends SVGElement {
        className?: string;
    }
}
interface SVGSVGElement extends SVGElement {
  className?: string;
}
