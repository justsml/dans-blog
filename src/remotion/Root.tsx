import React from "react";
import { Composition } from "remotion";
import { DestinationPromo, DURATION_IN_FRAMES, FPS, HEIGHT, WIDTH } from "./destination-promo/DestinationPromo";

export const RemotionRoot = () => {
  return (
    <Composition
      id="DestinationPromo"
      component={DestinationPromo}
      durationInFrames={DURATION_IN_FRAMES}
      fps={FPS}
      width={WIDTH}
      height={HEIGHT}
    />
  );
};
