import { Label } from "@/components/ui/label";

interface Option {
  value: string;
  label: string;
}

interface SimpleRadioGroupProps {
  options: Option[];
  value?: string;
  onChange: (value: string) => void;
  name: string;
}

export const SimpleRadioGroup = ({ options, value, onChange, name }: SimpleRadioGroupProps) => {
  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label 
          key={option.value} 
          className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg border border-border hover:border-primary/50 hover:bg-accent/50 transition-colors"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => onChange(e.target.value)}
            className="w-4 h-4 text-primary border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
          />
          <Label className="cursor-pointer flex-1 font-normal">
            {option.label}
          </Label>
        </label>
      ))}
    </div>
  );
};
