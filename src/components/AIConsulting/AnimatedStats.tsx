import * as React from "react";
import { cn } from "@/utils";

interface StatProps {
  value: string;
  label: string;
  icon: string;
  delay?: number;
}

export const AnimatedStat: React.FC<StatProps> = ({
  value,
  label,
  icon,
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  React.useEffect(() => {
    if (!isVisible) return;

    const targetValue = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(targetValue)) return;

    let current = 0;
    const increment = targetValue / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetValue) {
        setCount(targetValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 30);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  const displayValue = value.includes("+")
    ? `${count}+`
    : value.includes("%")
      ? `${count}%`
      : count.toString();

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border-2 border-border bg-gradient-to-br",
        "from-[hsl(var(--background))] to-[hsl(var(--bg-dark))] p-6 text-center transition-all duration-500",
        "hover:scale-105 hover:border-primary hover:shadow-lg hover:shadow-primary/20",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      {/* Animated background gradient */}
      <div
        className={cn(
          "absolute inset-0 opacity-0 transition-opacity duration-500",
          "bg-gradient-to-br from-primary/5 to-[hsl(var(--neon-cyan))]/5",
          "group-hover:opacity-100"
        )}
      />

      <div className="relative z-10">
        <div className="mb-3 text-4xl transition-transform duration-300 group-hover:scale-110">
          {icon}
        </div>
        <div
          className={cn(
            "mb-2 text-4xl font-bold transition-colors duration-300",
            "bg-gradient-to-r from-primary to-[hsl(var(--neon-cyan))] bg-clip-text text-transparent"
          )}
        >
          {isNaN(count) ? value : displayValue}
        </div>
        <div className="text-sm font-medium text-muted-foreground">
          {label}
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r",
          "from-primary via-[hsl(var(--neon-cyan))] to-primary opacity-0 transition-opacity duration-500",
          "group-hover:opacity-100"
        )}
      />
    </div>
  );
};

interface AnimatedStatsProps {
  stats: StatProps[];
}

export const AnimatedStats: React.FC<AnimatedStatsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <AnimatedStat key={index} {...stat} delay={index * 100} />
      ))}
    </div>
  );
};
