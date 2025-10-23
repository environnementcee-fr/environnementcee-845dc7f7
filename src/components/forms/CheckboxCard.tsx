import { cn } from "@/lib/utils";

interface CheckboxCardProps {
  value: string;
  icon: React.ReactNode | string;
  title: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckboxCard = ({
  icon,
  title,
  description,
  checked,
  onChange,
}: CheckboxCardProps) => {
  return (
    <div
      className={cn(
        "p-6 cursor-pointer transition-all border-2 hover:shadow-lg rounded-lg bg-card text-card-foreground shadow-sm",
        checked
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/50"
      )}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onChange(!checked);
      }}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <div className="self-end">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            onClick={(e) => e.stopPropagation()}
            className="w-5 h-5 text-primary border-2 border-primary rounded focus:ring-2 focus:ring-primary focus:ring-offset-2 cursor-pointer"
          />
        </div>
        <div className="text-4xl">{icon}</div>
        <div>
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
