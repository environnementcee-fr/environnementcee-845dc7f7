import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
    <Card
      className={cn(
        "p-6 cursor-pointer transition-all border-2 hover:shadow-lg",
        checked
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/50"
      )}
      onClick={() => onChange(!checked)}
    >
      <div className="flex flex-col items-center text-center gap-3">
        <Checkbox
          checked={checked}
          className="self-end"
        />
        <div className="text-4xl">{icon}</div>
        <div>
          <h3 className="text-lg font-bold mb-1">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
