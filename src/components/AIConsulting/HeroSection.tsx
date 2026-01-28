import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

export const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-32">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div
          className="absolute h-full w-full animate-gradient bg-gradient-to-br from-primary via-[hsl(var(--neon-cyan))] to-primary"
          style={{
            backgroundSize: "400% 400%",
          }}
        />
      </div>

      {/* Floating geometric shapes - simplified */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none opacity-20">
        <div className="absolute left-[10%] top-[20%] h-32 w-32 rounded-full border-2 border-primary/30" />
        <div className="absolute right-[15%] top-[40%] h-40 w-40 rotate-45 border-2 border-[hsl(var(--neon-cyan))]/30" />
        <div className="absolute left-[60%] bottom-[30%] h-36 w-36 rotate-12 rounded-2xl border-2 border-primary/30" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Glitch-style subtitle */}
          <div
            className={cn(
              "mb-6 overflow-hidden transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <span className="inline-block bg-primary/10 border-2 border-primary/50 rounded-full px-6 py-2 text-sm font-bold uppercase tracking-wider text-primary backdrop-blur-sm md:text-base">
              AI TRANSFORMATION EXPERT
            </span>
          </div>

          {/* Massive, attention-grabbing headline */}
          <h1
            className={cn(
              "relative mb-8 text-5xl font-black leading-[1.1] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl",
              "transition-all duration-700",
              isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
            style={{ transitionDelay: "150ms" }}
          >
            <span className="block bg-gradient-to-r from-white via-primary to-[hsl(var(--neon-cyan))] bg-clip-text text-transparent" style={{ backgroundSize: "200% auto", animation: "text-shimmer 4s linear infinite" }}>
              UNLEASH
            </span>
            <span className="block my-2 text-white" style={{
              WebkitTextStroke: "2px hsl(var(--neon-cyan))",
              paintOrder: "stroke fill",
              textShadow: "0 0 20px hsl(var(--neon-cyan)), 0 0 40px hsl(var(--neon-cyan))"
            }}>
              THE POWER
            </span>
            <span className="block bg-gradient-to-r from-primary via-[hsl(var(--neon-cyan))] to-white bg-clip-text text-transparent" style={{ backgroundSize: "200% auto", animation: "text-shimmer 4s linear infinite", animationDelay: "0.5s" }}>
              OF AI
            </span>
          </h1>

          {/* Bold statement */}
          <p
            className={cn(
              "mx-auto mb-12 max-w-3xl text-lg font-light leading-relaxed text-foreground/90 sm:text-xl md:text-2xl lg:text-3xl",
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "300ms" }}
          >
            Stop playing catch-up.{" "}
            <span className="font-bold text-primary">Dominate your industry</span>{" "}
            with AI that actually works.
          </p>

          {/* Dramatic CTA buttons */}
          <div
            className={cn(
              "flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6",
              "transition-all duration-700",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: "450ms" }}
          >
            <Button
              asChild
              size="lg"
              className={cn(
                "group relative overflow-hidden px-10 py-6 text-lg font-black uppercase sm:px-12 sm:py-8 sm:text-xl",
                "bg-gradient-to-r from-primary via-[hsl(var(--neon-cyan))] to-primary",
                "text-black shadow-2xl shadow-primary/50",
                "transition-all duration-300 hover:scale-110 hover:shadow-primary/70",
                "border-4 border-white/20"
              )}
              style={{ backgroundSize: "200% auto" }}
            >
              <a href="/contact" className="relative z-10">
                <span className="relative z-10 drop-shadow-lg">LET'S GO →</span>
              </a>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className={cn(
                "group border-4 border-[hsl(var(--neon-cyan))] bg-transparent px-10 py-6 text-lg font-black uppercase sm:px-12 sm:py-8 sm:text-xl",
                "text-[hsl(var(--neon-cyan))] backdrop-blur-sm transition-all duration-300",
                "hover:scale-110 hover:border-white hover:bg-[hsl(var(--neon-cyan))]/20 hover:text-white",
                "hover:shadow-2xl hover:shadow-[hsl(var(--neon-cyan))]/50"
              )}
            >
              <a href="#services">SEE HOW</a>
            </Button>
          </div>

          {/* Animated scroll indicator */}
          <div
            className={cn(
              "mt-20 transition-all duration-700",
              isVisible ? "opacity-60 hover:opacity-100" : "opacity-0"
            )}
            style={{ transitionDelay: "600ms" }}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="h-12 w-8 rounded-full border-2 border-primary/50 p-2">
                <div className="h-2 w-2 animate-bounce rounded-full bg-primary" />
              </div>
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                Scroll
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
