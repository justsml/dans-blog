import React, { useMemo } from "react";
import { ThreeCanvas } from "@remotion/three";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { destinationPages, type DestinationPage } from "./generated-pages";

const AmbientLight = "ambientLight" as any;
const DirectionalLight = "directionalLight" as any;
const PointLight = "pointLight" as any;
const Mesh = "mesh" as any;
const PlaneGeometry = "planeGeometry" as any;
const MeshStandardMaterial = "meshStandardMaterial" as any;

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const DURATION_IN_FRAMES = 450;

const HOME_FRAMES = 96;
const POST_FRAMES = 66;
const EXIT_FRAMES = 28;
const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
const calmInOut = Easing.bezier(0.45, 0, 0.2, 1);
const moveOut = Easing.bezier(0.33, 0, 0.2, 1);

const accentColors = ["#50f0c8", "#ffd166", "#ff4d8d", "#8be9fd", "#c3f56a"];
const articlePages = destinationPages.slice(1);
const railTop = 247;
const railGap = 104;

const focusBySlug: Record<string, { label: string; zoom: number; originX: number; originY: number; panX: number }> = {
  "llm-connection-strings": {
    label: "One string. Everything you need.",
    zoom: 1.1,
    originX: 54,
    originY: 49,
    panX: -12,
  },
  "into-the-breach": {
    label: "Containers, canaries, boring limits.",
    zoom: 1.08,
    originX: 52,
    originY: 42,
    panX: -8,
  },
  "llm-evals-are-broken": {
    label: "Your system needs its own measures.",
    zoom: 1.11,
    originX: 51,
    originY: 46,
    panX: -10,
  },
  "postgres-text-search-guide": {
    label: "Pick the primitive by input shape.",
    zoom: 1.14,
    originX: 50,
    originY: 58,
    panX: -16,
  },
  "semantic-vector-search-landscape": {
    label: "Exact, fuzzy, semantic, hybrid.",
    zoom: 1.12,
    originX: 52,
    originY: 55,
    panX: -14,
  },
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const pageStart = (index: number) => (index === 0 ? 0 : HOME_FRAMES + (index - 1) * POST_FRAMES);
const pageDuration = (index: number) => (index === 0 ? HOME_FRAMES : POST_FRAMES);

const getActiveIndex = (frame: number) => {
  if (frame < HOME_FRAMES) return 0;
  return clamp(Math.floor((frame - HOME_FRAMES) / POST_FRAMES) + 1, 1, destinationPages.length - 1);
};

const formatUrl = (url: string) => (url === "/" ? "danlevy.net" : `danlevy.net${url}`);
const shortTitle = (title: string) =>
  title
    .replace("Semantic Vector Search and Other Topics to Win Friends and Lovers", "Semantic Vector Search")
    .replace("It's Time for llm:// Connection Strings", "llm:// Connection Strings")
    .replace("Postgres Text Searching Guide 2026", "Postgres Text Search");

const ScreenPanel = ({ page, index }: { page: DestinationPage; index: number }) => {
  const frame = useCurrentFrame();
  const start = pageStart(index);
  const duration = pageDuration(index);
  const localFrame = frame - start;
  const intro = interpolate(frame, [start - 12, start + 26], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outro = interpolate(frame, [start + duration - 18, start + duration + 22], [0, 1], {
    easing: moveOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const presence = clamp(intro - outro, 0, 1);
  const panelWidth = index === 0 ? 930 : 870;
  const chromeHeight = 54;
  const contentHeight = Math.round((panelWidth * 1400) / 1440);
  const imageScale = panelWidth / page.width;
  const focus = focusBySlug[page.slug];
  const scrollProgress = interpolate(localFrame, [16, duration - 20], [0, 1], {
    easing: calmInOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const focusProgress = index === 0
    ? 0
    : interpolate(localFrame, [duration * 0.44, duration - 16], [0, 1], {
        easing: easeOut,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      });
  const scrollY = page.scrollTarget * imageScale * scrollProgress;
  const imageZoom = interpolate(focusProgress, [0, 1], [1, focus?.zoom ?? 1]);
  const focusPanX = interpolate(focusProgress, [0, 1], [0, focus?.panX ?? 0]);
  const translateX = interpolate(intro, [0, 1], [540, index === 0 ? 70 : 36]) + interpolate(outro, [0, 1], [0, -320]);
  const translateY = interpolate(intro, [0, 1], [-118, index === 0 ? -4 : 12]) + interpolate(outro, [0, 1], [0, 38]);
  const translateZ = interpolate(intro, [0, 1], [-500, 0]) + interpolate(outro, [0, 1], [0, 170]);
  const rotationY = interpolate(intro, [0, 1], [32, index % 2 === 0 ? -6 : 6]) + interpolate(outro, [0, 1], [0, -16]);
  const rotationX = interpolate(intro, [0, 1], [-9, -2]) + interpolate(outro, [0, 1], [0, 4]);
  const scale = interpolate(intro, [0, 1], [0.78, index === 0 ? 0.95 : 0.9]) * interpolate(outro, [0, 1], [1, 0.9]);
  const loadProgress = interpolate(localFrame, [0, 22], [0.05, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (presence <= 0.001) return null;

  return (
    <div
      style={{
        position: "absolute",
        top: 112,
        right: 82,
        width: panelWidth,
        opacity: presence,
        transformStyle: "preserve-3d",
        transformOrigin: "50% 48%",
        transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) rotateZ(-1deg) scale(${scale})`,
        filter: `drop-shadow(0 46px 80px rgba(0, 0, 0, ${0.42 * presence}))`,
      }}
    >
      <div
        style={{
          height: chromeHeight,
          borderRadius: "18px 18px 0 0",
          background: "linear-gradient(180deg, #282522, #171615)",
          border: "1px solid rgba(245,239,229,0.18)",
          borderBottom: "0",
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 20px",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
      >
        <span style={{ width: 13, height: 13, borderRadius: 99, background: "#ff5f57" }} />
        <span style={{ width: 13, height: 13, borderRadius: 99, background: "#ffbd2e" }} />
        <span style={{ width: 13, height: 13, borderRadius: 99, background: "#28c840" }} />
        <div
          style={{
            flex: 1,
            height: 20,
            marginLeft: 14,
            background: "rgba(245,239,229,0.08)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${loadProgress * 100}%`,
              height: "100%",
              background:
                index % 3 === 0
                  ? "linear-gradient(90deg, #50f0c8, #ffd166)"
                  : index % 3 === 1
                    ? "linear-gradient(90deg, #ffd166, #ff4d8d)"
                    : "linear-gradient(90deg, #ff4d8d, #50f0c8)",
            }}
          />
        </div>
      </div>
      <div
        style={{
          position: "relative",
          height: contentHeight,
          overflow: "hidden",
          background: "#f8f5ec",
          border: "1px solid rgba(245,239,229,0.18)",
          borderTop: "0",
          borderRadius: "0 0 18px 18px",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.12)",
        }}
      >
        <Img
          src={staticFile(page.image)}
          style={{
            width: panelWidth,
            height: "auto",
            display: "block",
            transformOrigin: `${focus?.originX ?? 50}% ${focus?.originY ?? 48}%`,
            transform: `translate(${focusPanX}px, ${-scrollY}px) scale(${imageZoom})`,
          }}
        />
        {focus && (
          <div
            style={{
              position: "absolute",
              left: 32,
              right: 32,
              bottom: 30,
              opacity: focusProgress,
              translate: `0 ${interpolate(focusProgress, [0, 1], [18, 0])}px`,
              padding: "16px 18px",
              background: "rgba(12, 13, 12, 0.76)",
              borderLeft: `5px solid ${accentColors[(index - 1) % accentColors.length]}`,
              color: "#f5efe5",
              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
              fontSize: 27,
              lineHeight: 1.08,
              fontWeight: 900,
              boxShadow: "0 20px 46px rgba(0,0,0,0.34)",
            }}
          >
            {focus.label}
          </div>
        )}
      </div>
    </div>
  );
};

const ScreensLayer = () => {
  return (
    <AbsoluteFill
      style={{
        zIndex: 2,
        perspective: 1300,
        perspectiveOrigin: "62% 48%",
        overflow: "hidden",
      }}
    >
      {destinationPages.map((page, index) => (
        <ScreenPanel key={page.slug} page={page} index={index} />
      ))}
    </AbsoluteFill>
  );
};

const Scene3D = () => {
  const { width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ zIndex: 1 }}>
      <ThreeCanvas width={width} height={height} camera={{ fov: 42, position: [0, 0.05, 4.8], near: 0.1, far: 100 }}>
        <AmbientLight intensity={0.78} />
        <DirectionalLight position={[4.8, 5.2, 7]} intensity={1.3} />
        <PointLight position={[-3.5, 1.8, 2.2]} intensity={4.8} color="#40f5d0" />
        <PointLight position={[3.9, -1.5, 1.2]} intensity={3.4} color="#ffb84d" />
        <Mesh position={[2.2, -0.25, -3.4]} rotation={[-0.06, -0.16, 0]}>
          <PlaneGeometry args={[5.7, 5.55]} />
          <MeshStandardMaterial color="#2b2520" emissive="#15100d" emissiveIntensity={0.4} transparent opacity={0.38} />
        </Mesh>
        <Mesh position={[-2.9, -1.35, -3.9]} rotation={[-1.34, 0, 0.14]}>
          <PlaneGeometry args={[7.8, 5.6, 12, 12]} />
          <MeshStandardMaterial color="#161412" emissive="#0d1f1a" emissiveIntensity={0.6} wireframe transparent opacity={0.28} />
        </Mesh>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};

const Background = () => {
  const frame = useCurrentFrame();
  const sweep = interpolate(frame, [0, DURATION_IN_FRAMES], [-28, 28], {
    easing: Easing.bezier(0.45, 0, 0.55, 1),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        zIndex: 0,
        background:
          "radial-gradient(circle at 18% 22%, rgba(80, 240, 200, 0.2), transparent 25%), radial-gradient(circle at 78% 30%, rgba(255, 78, 141, 0.18), transparent 27%), linear-gradient(135deg, #11100f 0%, #191817 42%, #0e1110 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -120,
          opacity: 0.27,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
          translate: `${sweep}px ${sweep * 0.42}px`,
          rotate: "-7deg",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(90deg, rgba(255,209,102,0.09), transparent 28%, transparent 70%, rgba(80,240,200,0.11))",
          mixBlendMode: "screen",
        }}
      />
    </AbsoluteFill>
  );
};

const TitleOverlay = () => {
  const frame = useCurrentFrame();
  const activeIndex = getActiveIndex(frame);
  const start = pageStart(activeIndex);
  const localFrame = frame - start;
  const listEnter = interpolate(frame, [8, 42], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const outro = interpolate(frame, [DURATION_IN_FRAMES - EXIT_FRAMES, DURATION_IN_FRAMES], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const activeArticleIndex = activeIndex - 1;
  const activeAccent = activeArticleIndex >= 0 ? accentColors[activeArticleIndex % accentColors.length] : "#ffd166";
  const beamProgress = activeArticleIndex >= 0
    ? interpolate(localFrame, [4, 28], [0, 1], {
        easing: easeOut,
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 0;
  const beamY = railTop + activeArticleIndex * railGap + 50;
  const beamDash = interpolate(frame % 36, [0, 36], [0, -44], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        zIndex: 3,
        padding: "74px 86px 78px",
        color: "#f5efe5",
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        justifyContent: "space-between",
        pointerEvents: "none",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 32 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: 0.88,
            fontSize: 31,
            fontWeight: 800,
            letterSpacing: 0,
          }}
        >
          <Img src={staticFile("images/avatar.webp")} style={{ width: 58, height: 58, borderRadius: 12, objectFit: "cover" }} />
          <span>DanLevy.net</span>
        </div>
        <div
          style={{
            border: "1px solid rgba(245, 239, 229, 0.28)",
            color: activeAccent,
            padding: "12px 18px",
            fontSize: 27,
            fontWeight: 750,
            background: "rgba(12, 13, 12, 0.48)",
          }}
        >
          {activeIndex === 0 ? "Start here" : `${activeIndex} / 5`}
        </div>
      </div>

      {activeArticleIndex >= 0 && (
        <svg
          width={1920}
          height={1080}
          viewBox="0 0 1920 1080"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            opacity: 0.78 * (1 - outro),
          }}
        >
          <defs>
            <linearGradient id="destination-beam" x1="0%" x2="100%" y1="0%" y2="0%">
              <stop offset="0%" stopColor={activeAccent} stopOpacity="0.12" />
              <stop offset="52%" stopColor={activeAccent} stopOpacity="0.94" />
              <stop offset="100%" stopColor="#f5efe5" stopOpacity="0.28" />
            </linearGradient>
          </defs>
          <path
            d={`M 650 ${beamY} C 762 ${beamY - 42}, 872 302, 1016 312`}
            fill="none"
            stroke="url(#destination-beam)"
            strokeWidth={5}
            strokeLinecap="round"
            strokeDasharray={`${420 * beamProgress} 999`}
            strokeDashoffset={beamDash}
          />
          <path
            d={`M 999 312 l -22 -12 m 22 12 l -18 18`}
            fill="none"
            stroke={activeAccent}
            strokeWidth={5}
            strokeLinecap="round"
            opacity={beamProgress}
          />
        </svg>
      )}

      <div
        style={{
          position: "absolute",
          left: 86,
          top: 172,
          width: 610,
          zIndex: 1,
          opacity: listEnter * (1 - outro),
        }}
      >
        <div
          style={{
            color: "rgba(245,239,229,0.58)",
            fontSize: 25,
            lineHeight: 1.1,
            fontWeight: 850,
            textTransform: "uppercase",
            marginBottom: 26,
            letterSpacing: 0,
          }}
        >
          Five featured articles
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {articlePages.map((page, itemIndex) => {
            const itemStart = pageStart(itemIndex + 1);
            const isActive = activeArticleIndex === itemIndex;
            const wasActive = activeArticleIndex > itemIndex;
            const accent = accentColors[itemIndex % accentColors.length];
            const activate = interpolate(frame, [itemStart - 10, itemStart + 24], [0, 1], {
              easing: easeOut,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const deactivate = interpolate(frame, [itemStart + POST_FRAMES - 22, itemStart + POST_FRAMES + 16], [0, 1], {
              easing: calmInOut,
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            const energy = isActive ? clamp(activate - deactivate, 0, 1) : 0;
            const quiet = activeIndex === 0 ? 0.08 : wasActive ? 0.24 : 0;
            const slotOpacity = interpolate(listEnter, [0, 1], [0, isActive ? 1 : 0.54 + quiet], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });

            return (
              <div
                key={page.slug}
                style={{
                  height: 106,
                  display: "grid",
                  gridTemplateColumns: "52px 1fr",
                  columnGap: 18,
                  alignItems: "start",
                  opacity: slotOpacity,
                  transformOrigin: "0 50%",
                  transform: `translateX(${interpolate(energy, [0, 1], [-4, 16])}px) scale(${interpolate(energy, [0, 1], [0.94, 1.11])})`,
                }}
              >
                <div
                  style={{
                    width: 42,
                    height: 42,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: isActive ? "#101211" : "rgba(245,239,229,0.56)",
                    background: isActive ? accent : "rgba(245,239,229,0.08)",
                    fontSize: 22,
                    fontWeight: 950,
                    border: `1px solid ${isActive ? accent : "rgba(245,239,229,0.12)"}`,
                  }}
                >
                  {itemIndex + 1}
                </div>
                <div>
                  <div
                    style={{
                    color: isActive ? accent : "rgba(245,239,229,0.48)",
                    fontSize: isActive ? 20 : 15,
                      lineHeight: 1,
                      fontWeight: 950,
                      textTransform: "uppercase",
                      marginBottom: 8,
                    }}
                  >
                    {page.category}
                  </div>
                  <div
                    style={{
                      color: isActive ? "#f5efe5" : "rgba(245,239,229,0.58)",
                      fontSize: isActive ? 43 : 30,
                      lineHeight: 0.98,
                      fontWeight: isActive ? 950 : 800,
                      letterSpacing: 0,
                      textShadow: isActive ? "0 18px 54px rgba(0,0,0,0.42)" : "none",
                    }}
                  >
                    {shortTitle(page.title)}
                  </div>
                  <div
                    style={{
                      marginTop: 9,
                      color: isActive ? "rgba(245,239,229,0.74)" : "rgba(245,239,229,0.24)",
                      fontSize: isActive ? 20 : 0,
                      lineHeight: 1.12,
                      fontWeight: 650,
                      maxHeight: isActive ? 44 : 0,
                      overflow: "hidden",
                      opacity: energy,
                    }}
                  >
                    {page.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            marginTop: 22,
            color: activeIndex === 0 ? "#ffd166" : activeAccent,
            fontSize: 24,
            fontFamily: "'DM Mono', 'SFMono-Regular', Consolas, monospace",
            fontWeight: 850,
            opacity: activeIndex === 0 ? 0.82 : 1,
          }}
        >
          {activeIndex === 0 ? "danlevy.net" : formatUrl(destinationPages[activeIndex].url)}
        </div>
      </div>

      <div
        style={{
          alignSelf: "flex-end",
          width: 510,
          opacity: 0.78,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        <div style={{ height: 5, background: "rgba(245,239,229,0.18)" }}>
          <div
            style={{
              height: "100%",
              width: `${interpolate(frame, [0, DURATION_IN_FRAMES - EXIT_FRAMES], [4, 100], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}%`,
              background: "linear-gradient(90deg, #50f0c8, #ffd166, #ff4d8d)",
            }}
          />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const FinalCard = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [DURATION_IN_FRAMES - 30, DURATION_IN_FRAMES - 8], [0, 1], {
    easing: easeOut,
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        zIndex: 3,
        alignItems: "center",
        justifyContent: "center",
        color: "#f5efe5",
        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
        opacity,
      }}
    >
      <div style={{ textAlign: "center", maxWidth: 1100 }}>
        <div style={{ color: "#50f0c8", fontSize: 38, fontWeight: 900, textTransform: "uppercase", marginBottom: 20 }}>
          Make the web worth reading
        </div>
        <div style={{ fontSize: 112, lineHeight: 0.92, fontWeight: 950, letterSpacing: 0 }}>DanLevy.net</div>
      </div>
    </AbsoluteFill>
  );
};

export const DestinationPromo = () => {
  const pages = useMemo(() => destinationPages, []);

  if (pages.length < 2) {
    return (
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", background: "#11100f", color: "#f5efe5", fontSize: 42 }}>
        Run bun run video:capture:destination first.
      </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill>
      <Background />
      <Scene3D />
      <ScreensLayer />
      <TitleOverlay />
      <FinalCard />
    </AbsoluteFill>
  );
};
