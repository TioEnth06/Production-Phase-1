import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Check, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loanRequestSchema, type LoanRequestFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface LoanRequestInfoSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

const loanTypes = [
  "Term Loan",
  "Revolving Credit Line",
  "Bridge Loan",
  "Working Capital Loan"
];

const loanDurations = [
  "3 months",
  "6 months",
  "12 months",
  "18 months",
  "24 months",
  "36 months"
];

const interestModels = [
  "Fixed APR",
  "Revenue-sharing APR",
  "Dynamic Oracle APR"
];

const loanPurposes = [
  "R&D Funding",
  "Commercialization Funding",
  "Prototype Development",
  "Expansion/Operational Funding"
];

export function LoanRequestInfoSection({ onContinue, onValidationChange }: LoanRequestInfoSectionProps) {
  const form = useForm<LoanRequestFormData>({
    resolver: zodResolver(loanRequestSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      requestedAmount: "",
      loanType: "",
      loanDuration: "",
      interestModel: "",
      purpose: "",
      fundingProposal: null,
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

        {/* Requested Loan Amount */}
        <FormField
          control={form.control}
          name="requestedAmount"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1.5">
                <FormLabel className="form-label form-label-required">Requested Loan Amount (USD)</FormLabel>
                <span className="text-xs text-muted-foreground">Minimum: $10,000</span>
              </div>
              <FormControl>
                <Input 
                  type="number" 
                  placeholder="0.00" 
                  {...field}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Loan Type */}
        <FormField
          control={form.control}
          name="loanType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Loan Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Loan Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loanTypes.map((type) => (
                    <SelectItem key={type} value={type.toLowerCase().replace(/\s/g, '-')}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Loan Duration */}
        <FormField
          control={form.control}
          name="loanDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Loan Duration</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Loan Duration" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loanDurations.map((duration) => (
                    <SelectItem key={duration} value={duration}>
                      {duration}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Preferred Interest Model */}
        <FormField
          control={form.control}
          name="interestModel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Preferred Interest Model</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Interest Model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {interestModels.map((model) => (
                    <SelectItem key={model} value={model.toLowerCase().replace(/\s/g, '-')}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Purpose of Loan */}
        <FormField
          control={form.control}
          name="purpose"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Purpose of Loan</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Purpose" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {loanPurposes.map((purpose) => (
                    <SelectItem key={purpose} value={purpose.toLowerCase().replace(/\s/g, '-').replace(/\//g, '-')}>
                      {purpose}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Detail Funding Proposal (PDF) */}
        <FormField
          control={form.control}
          name="fundingProposal"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Detail Funding Proposal (PDF)</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      onChange(file);
                    }}
                    className="hidden"
                    id="funding-proposal"
                    {...field}
                  />
                  <label
                    htmlFor="funding-proposal"
                    className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-accent"
                  >
                    <Upload className="w-4 h-4" />
                    {value ? value.name : "Upload PDF"}
                  </label>
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

