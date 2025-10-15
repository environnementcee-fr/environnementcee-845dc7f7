import { cn } from "@/lib/utils";

interface FormFieldWithIconProps {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  className?: string;
}

export const FormFieldWithIcon = ({
  icon,
  label,
  children,
  className,
}: FormFieldWithIconProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="flex items-center gap-2 text-sm font-medium text-foreground">
        <span className="text-xl">{icon}</span>
        {label}
      </label>
      {children}
    </div>
  );
};
