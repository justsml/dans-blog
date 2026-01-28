import * as React from "react";
import { cn } from "@/utils";
import { Check } from "lucide-react";

export interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  delay?: number;
  variant?: "primary" | "secondary" | "tertiary";
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  features,
  delay = 0,
  variant = "primary",
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const variantStyles = {
    primary: "from-primary/20 to-[hsl(var(--neon-cyan))]/20 border-primary hover:border-[hsl(var(--neon-cyan))]",
    secondary: "from-[hsl(var(--neon-cyan))]/20 to-primary/20 border-[hsl(var(--neon-cyan))] hover:border-primary",
    tertiary: "from-primary/10 via-[hsl(var(--neon-cyan))]/10 to-primary/10 border-primary/50 hover:border-white",
  };

  return (
    <div
      className={cn(
        "group relative h-full"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative h-full overflow-hidden rounded-3xl border-4 bg-gradient-to-br",
          "transition-all duration-300",
          "backdrop-blur-sm",
          variantStyles[variant],
          isHovered && "scale-[1.02] shadow-2xl"
        )}
      >
        {/* Simplified hover overlay */}
        <div
          className={cn(
            "absolute inset-0 opacity-0 transition-opacity duration-300",
            "bg-primary/5",
            isHovered && "opacity-100"
          )}
        />

        <div className="relative z-10 p-6 sm:p-8 md:p-10">
          {/* Icon with dramatic entrance */}
          <div className="mb-6 flex items-start justify-between">
            <div
              className={cn(
                "flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-2xl border-2",
                "bg-gradient-to-br from-background/80 to-background/40",
                "transition-all duration-300",
                isHovered
                  ? "border-white shadow-lg shadow-primary/20"
                  : "border-primary/50"
              )}
            >
              <div className="text-primary">
                {typeof icon === 'string' ? (
                  <span className="text-4xl sm:text-5xl">{icon}</span>
                ) : (
                  React.createElement(icon as React.ComponentType<{ className?: string }>, {
                    className: "h-8 w-8 sm:h-10 sm:w-10"
                  })
                )}
              </div>
            </div>

            {/* Number badge */}
            <div
              className={cn(
                "flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full",
                "border-2 text-xl sm:text-2xl font-black",
                isHovered ? "border-primary text-primary" : "border-primary/30 text-primary/50"
              )}
            >
              {variant === "primary" ? "01" : variant === "secondary" ? "02" : "03"}
            </div>
          </div>

          {/* Title with bold styling */}
          <h3
            className={cn(
              "mb-3 text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-tight",
              "transition-colors duration-300",
              isHovered ? "text-white" : "text-primary"
            )}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className={cn(
              "mb-6 text-sm sm:text-base md:text-lg leading-relaxed",
              "transition-colors duration-300",
              isHovered ? "text-foreground" : "text-foreground/70"
            )}
          >
            {description}
          </p>

          {/* Features list */}
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <div
                  className="mt-0.5 flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-md border-2 border-primary/50 bg-primary/10"
                >
                  <Check
                    className="h-3 w-3 sm:h-4 sm:w-4 text-primary"
                    strokeWidth={3}
                  />
                </div>
                <span
                  className={cn(
                    "text-xs sm:text-sm md:text-base font-medium leading-tight",
                    "transition-colors duration-300",
                    isHovered ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-primary via-[hsl(var(--neon-cyan))] to-primary opacity-50" />
      </div>
    </div>
  );
};
