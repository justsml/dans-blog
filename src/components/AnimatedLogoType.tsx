import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./AnimatedLogoType.css";

gsap.registerPlugin(useGSAP);

type AnimatedLogoTypeProps = {
  avatarSrc: string;
  siteTitle: string;
  href?: string;
};

export default function AnimatedLogoType({
  avatarSrc,
  siteTitle,
  href = "/",
}: AnimatedLogoTypeProps) {
  const rootRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const motion = gsap.matchMedia();

      motion.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".animated-logo-type__segment, .animated-logo-type__sweep", {
          autoAlpha: 1,
          clearProps: "transform",
        });
        gsap.set(".animated-logo-type__rule", {
          strokeDashoffset: 0,
        });
      });

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          defaults: {
            ease: "power3.out",
            duration: 0.52,
          },
        });

        tl.set(".animated-logo-type__segment", {
          autoAlpha: 0,
          y: 5,
        })
          .set(".animated-logo-type__sweep", {
            autoAlpha: 0,
            x: -18,
          })
          .from(
            ".animated-logo-type__avatar",
            {
              autoAlpha: 0,
              scale: 0.9,
              duration: 0.32,
              ease: "power3.out",
            },
            0,
          )
          .to(
            ".animated-logo-type__segment",
            {
              autoAlpha: 1,
              y: 0,
              stagger: 0.045,
              duration: 0.38,
              ease: "power3.out",
            },
            0.1,
          )
          .to(
            ".animated-logo-type__rule",
            {
              strokeDashoffset: 0,
              duration: 0.52,
              ease: "power2.inOut",
            },
            "-=0.18",
          )
          .to(
            ".animated-logo-type__sweep",
            {
              autoAlpha: 1,
              x: 180,
              duration: 0.62,
              ease: "power2.inOut",
            },
            "-=0.28",
          )
          .to(".animated-logo-type__sweep", {
            autoAlpha: 0,
            duration: 0.18,
            ease: "sine.inOut",
          });
      });

      return () => motion.revert();
    },
    { scope: rootRef },
  );

  return (
    <a ref={rootRef} className="animated-logo-type u-url" href={href} aria-label="Return Home">
      <img
        src={avatarSrc}
        alt="Dan Levy's Avatar"
        className="animated-logo-type__avatar u-logo"
        width="88"
        height="88"
      />
      <span className="animated-logo-type__sr p-name">{siteTitle}</span>
      <svg
        className="animated-logo-type__svg"
        viewBox="0 0 204 48"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="animated-logo-type-gradient" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#8cf8ff" stopOpacity="0.08" />
            <stop offset="42%" stopColor="#8cf8ff" stopOpacity="0.82" />
            <stop offset="100%" stopColor="#ff7bd8" stopOpacity="0.58" />
          </linearGradient>
        </defs>
        <g className="animated-logo-type__wordmark">
          <text className="animated-logo-type__segment animated-logo-type__segment--name" x="2" y="31">
            DanLevy
          </text>
          <text className="animated-logo-type__segment animated-logo-type__segment--suffix" x="139" y="31">
            .net
          </text>
        </g>
        <path
          className="animated-logo-type__rule"
          stroke="url(#animated-logo-type-gradient)"
          pathLength="1"
          d="M5 38 C48 41 104 41 184 38"
        />
        <rect className="animated-logo-type__sweep" x="4" y="7" width="18" height="32" rx="9" />
      </svg>
    </a>
  );
}
