import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Building2, DollarSign, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { commercializationPlanSchema, type CommercializationPlanFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CommercializationPlanSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

const industries = [
  "Healthcare & Pharmaceuticals",
  "Information Technology",
  "Automotive",
  "Energy & Clean Tech",
  "Consumer Electronics",
  "Manufacturing",
  "Aerospace & Defense",
  "Agriculture & Food Tech",
  "Financial Services",
  "Telecommunications"
];

const commercializationModels = [
  "Licensing",
  "Joint Development",
  "Manufacturing & Scale-up",
  "Spin-off Startup"
];

export function CommercializationPlanSection({ onContinue, onValidationChange }: CommercializationPlanSectionProps) {
  const form = useForm<CommercializationPlanFormData>({
    resolver: zodResolver(commercializationPlanSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      targetIndustry: "",
      commercializationModel: "",
      timeToMarket: "",
      commercializationCost: "",
    },
  });

  const { isValid } = form.formState;

  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="auto-saved-badge">
            <Check className="w-3 h-3" />
            Auto-saved
          </span>
        </div>

        {/* Target Industry */}
        <FormField
          control={form.control}
          name="targetIndustry"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Target Industry</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Target Industry" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {industries.map((industry) => (
                    <SelectItem key={industry} value={industry.toLowerCase().replace(/\s+/g, '-')}>
                      {industry}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Commercialization / Licensing Model */}
        <FormField
          control={form.control}
          name="commercializationModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Commercialization / Licensing Model</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-2"
                >
                  {commercializationModels.map((model) => (
                    <div key={model} className="flex items-center space-x-2">
                      <RadioGroupItem value={model.toLowerCase().replace(/\s+/g, '-')} id={`model-${model}`} />
                      <Label htmlFor={`model-${model}`} className="cursor-pointer font-normal">
                        {model}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Estimated Time to Market */}
        <FormField
          control={form.control}
          name="timeToMarket"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Estimated Time to Market (months)</FormLabel>
              <FormControl>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="e.g., 12"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Estimated Commercialization Cost (Optional) */}
        <FormField
          control={form.control}
          name="commercializationCost"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1.5">
                <FormLabel className="form-label">Estimated Commercialization Cost (USDT)</FormLabel>
                <span className="text-xs text-muted-foreground">Optional</span>
              </div>
              <FormControl>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="number"
                    placeholder="0.00"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}



