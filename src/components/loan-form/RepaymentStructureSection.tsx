import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { repaymentSchema, type RepaymentFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface RepaymentStructureSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

const repaymentMethods = [
  "Monthly Installments",
  "Quarterly Installments",
  "Bullet Payment (End of Term)",
  "Interest-Only with Balloon",
  "Flexible Repayment"
];

const repaymentSources = [
  "Licensing Revenue",
  "Royalty Income",
  "Cashflow from company",
  "External R&D Funding"
];

export function RepaymentStructureSection({ onContinue, onValidationChange }: RepaymentStructureSectionProps) {
  const form = useForm<RepaymentFormData>({
    resolver: zodResolver(repaymentSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      repaymentMethod: "",
      repaymentSource: "",
      royaltyShare: "",
    },
  });

  const { isValid } = form.formState;

  // Report validation state to parent
  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        {/* Auto-saved Badge */}
        <div className="flex items-center gap-2">
          <span className="auto-saved-badge">
            <Check className="w-3 h-3" />
            Auto-saved
          </span>
        </div>

        {/* Repayment Method */}
        <FormField
          control={form.control}
          name="repaymentMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Repayment Method</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Repayment Method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {repaymentMethods.map((method) => (
                    <SelectItem key={method} value={method.toLowerCase().replace(/\s/g, '-')}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Source of Repayment */}
        <FormField
          control={form.control}
          name="repaymentSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Source of Repayment</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Repayment Source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {repaymentSources.map((source) => (
                    <SelectItem key={source} value={source.toLowerCase().replace(/\s/g, '-')}>
                      {source}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Offer Royalty Share to Lenders (Optional) */}
        <FormField
          control={form.control}
          name="royaltyShare"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1.5">
                <FormLabel className="form-label">Offer Royalty Share to Lenders (%)</FormLabel>
                <span className="text-xs text-muted-foreground">Optional</span>
              </div>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <p className="text-xs text-muted-foreground mt-1">
                Optional: Offer a percentage of future royalty income to lenders as an incentive
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

