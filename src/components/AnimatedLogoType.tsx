import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./AnimatedLogoType.css";

gsap.registerPlugin(useGSAP);

const LOGO_REVEAL_WIDTH = 198;
const NEON_STEADY_ALPHA = 0.88;

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
      const neonTarget = ".animated-logo-type__name-neon";

      motion.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".animated-logo-type__segment", {
          autoAlpha: 1,
          clearProps: "transform",
        });
        gsap.set(".animated-logo-type__name-reveal", {
          attr: { width: LOGO_REVEAL_WIDTH },
        });
        gsap.set(neonTarget, {
          autoAlpha: NEON_STEADY_ALPHA,
        });
      });

      motion.add("(prefers-reduced-motion: no-preference)", () => {
        let introComplete = false;
        let lastFlicker = 0;
        let lastScrollY = window.scrollY;
        let tubeHum: gsap.core.Tween | undefined;

        const flicker = gsap
          .timeline({
            paused: true,
            onStart: () => tubeHum?.pause(),
            onComplete: () => tubeHum?.play(),
          })
          .to(neonTarget, {
            autoAlpha: 0.7,
            scale: 0.998,
            duration: 0.035,
            ease: "none",
          })
          .to(neonTarget, {
            autoAlpha: 0.96,
            scale: 1.001,
            duration: 0.05,
            ease: "none",
          })
          .to(neonTarget, {
            autoAlpha: 0.76,
            scale: 0.999,
            duration: 0.025,
            ease: "none",
          })
          .to(neonTarget, {
            autoAlpha: NEON_STEADY_ALPHA,
            scale: 1,
            duration: 0.22,
            ease: "sine.out",
          });

        tubeHum = gsap.to(neonTarget, {
          autoAlpha: 0.95,
          duration: 2.4,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          paused: true,
        });

        let randomFlickerDelay: gsap.core.Tween;
        const randomFlicker = () => {
          if (introComplete && !flicker.isActive()) {
            flicker.restart();
          }

          randomFlickerDelay = gsap.delayedCall(gsap.utils.random(4.5, 9.5), randomFlicker);
          return randomFlickerDelay;
        };

        randomFlickerDelay = gsap.delayedCall(2.8, randomFlicker);

        const tl = gsap.timeline({
          onComplete: () => {
            introComplete = true;
            tubeHum?.play(0);
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
          .set(neonTarget, {
            autoAlpha: 0,
            scale: 1,
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
            ".animated-logo-type__name-reveal",
            {
              attr: { width: LOGO_REVEAL_WIDTH },
              duration: 0.74,
              ease: "power2.inOut",
            },
            "-=0.18",
          )
          .to(
            neonTarget,
            {
              autoAlpha: 1,
              duration: 0.08,
              ease: "none",
            },
            "-=0.2",
          )
          .to(
            neonTarget,
            {
              autoAlpha: NEON_STEADY_ALPHA,
              duration: 0.42,
              ease: "sine.out",
            },
            "+=0.18",
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
          tubeHum?.kill();
          randomFlickerDelay.kill();
          flicker.kill();
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
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.9" result="hotPinkBlur" />
            <feColorMatrix
              in="hotPinkBlur"
              result="hotPinkGlow"
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.08 0 0 0 0 0.72 0 0 0 0.9 0"
            />
            <feGaussianBlur in="SourceGraphic" stdDeviation="5.2" result="pinkBlur" />
            <feColorMatrix
              in="pinkBlur"
              result="pinkGlow"
              type="matrix"
              values="0 0 0 0 1 0 0 0 0 0.02 0 0 0 0 0.58 0 0 0 0.72 0"
            />
            <feMerge>
              <feMergeNode in="pinkGlow" />
              <feMergeNode in="hotPinkGlow" />
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
        </defs>
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
      </svg>
    </a>
  );
}
