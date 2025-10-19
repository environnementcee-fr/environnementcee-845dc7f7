import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface Option {
  value: string;
  label: string;
}

interface RadioGroupFieldProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  name: string;
}

export const RadioGroupField = ({ options, value, onChange, name }: RadioGroupFieldProps) => {
  return (
    <RadioGroup value={value} onValueChange={onChange} className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center space-x-2">
          <RadioGroupItem value={option.value} id={`${name}-${option.value}`} />
          <Label htmlFor={`${name}-${option.value}`} className="cursor-pointer">
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
};
