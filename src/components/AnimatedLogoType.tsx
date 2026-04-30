import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./AnimatedLogoType.css";

gsap.registerPlugin(useGSAP);

const LOGO_REVEAL_WIDTH = 198;
const LOGO_SWEEP_X = 192;

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
        gsap.set(".animated-logo-type__thread, .animated-logo-type__segment", {
          autoAlpha: 1,
          clearProps: "transform",
        });
        gsap.set(".animated-logo-type__name-reveal", {
          attr: { width: LOGO_REVEAL_WIDTH },
        });
        gsap.set(".animated-logo-type__name-neon", {
          autoAlpha: 0.68,
        });
        gsap.set(".animated-logo-type__sweep", {
          autoAlpha: 0,
        });
        gsap.set(".animated-logo-type__rule", {
          strokeDashoffset: 0,
        });
      });

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        let introComplete = false;
        let lastFlicker = 0;
        let lastScrollY = window.scrollY;

        const flicker = gsap
          .timeline({ paused: true })
          .to(".animated-logo-type__name-neon", {
            autoAlpha: 0.34,
            duration: 0.035,
            ease: "none",
          })
          .to(".animated-logo-type__name-neon", {
            autoAlpha: 0.9,
            duration: 0.055,
            ease: "none",
          })
          .to(".animated-logo-type__name-neon", {
            autoAlpha: 0.48,
            duration: 0.03,
            ease: "none",
          })
          .to(".animated-logo-type__name-neon", {
            autoAlpha: 0.72,
            duration: 0.16,
            ease: "sine.out",
          });

        const tl = gsap.timeline({
          onComplete: () => {
            introComplete = true;
          },
          defaults: {
            ease: "power3.out",
            duration: 0.52,
          },
        });

        tl.set(".animated-logo-type__segment--name", {
          autoAlpha: 1,
          y: 0,
        })
          .set(".animated-logo-type__name-reveal", {
            attr: { width: 0 },
          })
          .set(".animated-logo-type__thread, .animated-logo-type__rule", {
            strokeDashoffset: 1,
          })
          .set(".animated-logo-type__name-neon, .animated-logo-type__sweep", {
            autoAlpha: 0,
          })
          .set(".animated-logo-type__sweep", {
            x: -22,
          })
          .from(
            ".animated-logo-type__avatar",
            {
              autoAlpha: 0,
              scale: 0.9,
              duration: 0.28,
              ease: "power3.out",
            },
            0,
          )
          .to(
            ".animated-logo-type__thread",
            {
              strokeDashoffset: 0,
              duration: 0.56,
              ease: "power2.inOut",
            },
            0.06,
          )
          .to(
            ".animated-logo-type__name-reveal",
            {
              attr: { width: LOGO_REVEAL_WIDTH },
              duration: 0.74,
              ease: "power2.inOut",
            },
            "-=0.18",
          )
          .to(
            ".animated-logo-type__thread",
            {
              autoAlpha: 0.36,
              duration: 0.28,
              ease: "sine.out",
            },
            "-=0.2",
          )
          .to(
            ".animated-logo-type__rule",
            {
              strokeDashoffset: 0,
              duration: 0.42,
              ease: "power2.inOut",
            },
            "-=0.16",
          )
          .to(
            ".animated-logo-type__name-neon",
            {
              autoAlpha: 1,
              duration: 0.08,
              ease: "none",
            },
            "-=0.2",
          )
          .to(
            ".animated-logo-type__sweep",
            {
              autoAlpha: 1,
              x: LOGO_SWEEP_X,
              duration: 0.68,
              ease: "power2.inOut",
            },
            "<",
          )
          .to(
            ".animated-logo-type__name-neon",
            {
              autoAlpha: 0.72,
              duration: 0.22,
              ease: "sine.out",
            },
            "-=0.18",
          )
          .to(
            ".animated-logo-type__sweep",
            {
              autoAlpha: 0,
              duration: 0.18,
              ease: "sine.out",
            },
            "<",
          );

        const disturbNeon = () => {
          const now = Date.now();
          const delta = Math.abs(window.scrollY - lastScrollY);
          lastScrollY = window.scrollY;

          if (!introComplete || delta < 8 || now - lastFlicker < 520) return;

          lastFlicker = now;
          flicker.restart();
        };

        window.addEventListener("scroll", disturbNeon, { passive: true });

        return () => {
          window.removeEventListener("scroll", disturbNeon);
        };
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
        viewBox="0 0 244 54"
        role="img"
        aria-hidden="true"
      >
        <defs>
          <filter
            id="animated-logo-type-glow"
            x="-70%"
            y="-150%"
            width="260%"
            height="430%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" result="softTube" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="cyanBlur" />
            <feColorMatrix
              in="cyanBlur"
              result="cyanGlow"
              type="matrix"
              values="0 0 0 0 0.74 0 0 0 0 0.34 0 0 0 0 1 0 0 0 0.72 0"
            />
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.6" result="pinkBlur" />
            <feColorMatrix
              in="pinkBlur"
              result="pinkGlow"
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.17 0 0 0 0 0.67 0 0 0 0.55 0"
            />
            <feMerge>
              <feMergeNode in="pinkGlow" />
              <feMergeNode in="cyanGlow" />
              <feMergeNode in="softTube" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <mask id="animated-logo-type-name-mask" maskUnits="userSpaceOnUse">
            <rect
              className="animated-logo-type__name-reveal"
              x="0"
              y="0"
              width="0"
              height="47"
              fill="#fff"
            />
          </mask>
          <clipPath id="animated-logo-type-sweep-clip">
            <text className="animated-logo-type__segment animated-logo-type__segment--name" x="2" y="34">
              DanLevy.net
            </text>
          </clipPath>
        </defs>
        <path
          className="animated-logo-type__thread"
          pathLength="1"
          d="M0 29 C16 30 25 25 36 27 C55 30 72 35 91 30 C108 26 121 22 139 26 C158 30 174 33 198 29"
        />
        <g className="animated-logo-type__wordmark" mask="url(#animated-logo-type-name-mask)">
          <text className="animated-logo-type__segment animated-logo-type__segment--name" x="2" y="34">
            DanLevy.net
          </text>
        </g>
        <text
          className="animated-logo-type__segment animated-logo-type__segment--name animated-logo-type__name-neon"
          x="2"
          y="34"
        >
          DanLevy.net
        </text>
        <rect
          className="animated-logo-type__sweep"
          clipPath="url(#animated-logo-type-sweep-clip)"
          x="2"
          y="2"
          width="30"
          height="44"
          rx="15"
        />
        <path
          className="animated-logo-type__rule"
          pathLength="1"
          d="M5 43 C58 46 130 46 228 42"
        />
      </svg>
    </a>
  );
}
