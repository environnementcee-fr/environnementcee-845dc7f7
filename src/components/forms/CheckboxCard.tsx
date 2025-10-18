import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface CheckboxCardProps {
  value: string;
  icon: React.ReactNode;
  title: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export const CheckboxCard = ({
  value,
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
      <div className="flex items-start gap-4">
        <Checkbox
          checked={checked}
          className="mt-1"
          onCheckedChange={onChange}
        />
        <div className="flex-1">
          <div className="text-4xl mb-3">{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </Card>
  );
};
