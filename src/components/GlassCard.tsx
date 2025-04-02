
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

const GlassCard = ({ children, className = "" }: GlassCardProps) => {
  return (
    <div className={`glass p-8 rounded-xl max-w-md w-full mx-auto ${className}`}>
      {children}
    </div>
  );
};

export default GlassCard;
