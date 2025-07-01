import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

type InputChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

interface FormInputProps {
  type?: "text" | "email" | "password" | "textarea" | "radio";
  value: string;
  onChange: (value: string, event?: InputChangeEvent) => void;
  placeholder?: string;
  required?: boolean;
  name?: string;
  label?: string;
  rows?: number; // textarea rows
  className?: string;
  options?: { label: string; value: string }[]; // for radio group
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  name,
  label,
  rows = 3,
  className = "",
  options = [],
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  const errorClass = error ? "border-red-500 focus-visible:ring-red-500" : "";

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={name}>{label}</Label>}

      {type === "textarea" ? (
        <Textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value, e)}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={cn(errorClass)}
        />
      ) : type === "radio" ? (
        <RadioGroup
          value={value}
          onValueChange={(val) => onChange(val)}
          className={cn("flex gap-4", errorClass)}
        >
          {options.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem
                value={option.value}
                id={`${name}-${option.value}`}
              />
              <Label htmlFor={`${name}-${option.value}`}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      ) : (
        <div className="relative">
          <Input
            id={name}
            name={name}
            type={inputType}
            value={value}
            onChange={(e) => onChange(e.target.value, e)}
            placeholder={placeholder}
            required={required}
            className={cn("focus:outline-nonef focud:ring-2", errorClass)}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-3 flex items-center text-muted-foreground"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default FormInput;
