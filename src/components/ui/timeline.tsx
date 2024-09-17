import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { slugify } from "../../shared/pathHelpers";

type TimelineEntry =
  | {
      title: string;
      content: React.ReactNode;
    }
  | {
      title: string;
      slot: string;
    };

export const Timeline = ({
  data,
  headline = "",
  subHeadline = "",
  ...rest
}: {
  data: TimelineEntry[];
  headline?: string;
  subHeadline?: string;
  [key: string]: any;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  // console.log('rest', rest);
  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="timeline w-full font-sans md:px-10"
      ref={containerRef}
    >
      {(headline || subHeadline) && <div className="max-w-7xl mx-auto py-2 px-4 md:px-8 lg:px-10">
        {headline && (
          <h2 className="text-lg md:text-4xl mb-4 text-white max-w-4xl" id={slugify(headline)}>
            {headline}
          </h2>
        )}
        {subHeadline && (
          <p className="text-neutral-300 text-sm md:text-base max-w-sm">
            {subHeadline}
          </p>
        )}
      </div>}

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-20 md:gap-10"
          >
            <div className="sticky flex flex-col z-40 items-center top-40 pl-6 self-start max-w-xs">
              <div className="h-10 absolute left-3 w-10 rounded-full bg-neutral-200 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full border-neutral-300 p-2" />
              </div>
          </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="block text-xl mb-4 text-left text-neutral-200 font-sans font-extralight" id={slugify(item.title)}>
                <a href={'#' + slugify(item.title)}>{item.title}</a>
              </h3>
              {'content' in item ? item.content : rest[item.slot]}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
