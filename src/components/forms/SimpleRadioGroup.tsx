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
  onAutoAdvance?: () => void;
}

export const SimpleRadioGroup = ({ options, value, onChange, name, onAutoAdvance }: SimpleRadioGroupProps) => {
  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (onAutoAdvance) {
      setTimeout(() => onAutoAdvance(), 400);
    }
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label 
          key={option.value} 
          className="flex items-center space-x-3 cursor-pointer p-4 rounded-lg border-2 border-border hover:border-primary/50 hover:bg-accent/50 transition-all has-[:checked]:border-primary has-[:checked]:bg-primary/5 has-[:checked]:ring-2 has-[:checked]:ring-primary/30"
        >
          <input
            type="radio"
            name={name}
            value={option.value}
            checked={value === option.value}
            onChange={(e) => handleChange(e.target.value)}
            className="w-5 h-5 text-primary border-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
          />
          <Label className="cursor-pointer flex-1 font-medium">
            {option.label}
          </Label>
        </label>
      ))}
    </div>
  );
};
