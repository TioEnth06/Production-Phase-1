import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { riskComplianceSchema, type RiskComplianceFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RiskComplianceSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

const patentStatuses = [
  "Granted",
  "Pending",
  "Under Review"
];

export function RiskComplianceSection({ onContinue, onValidationChange }: RiskComplianceSectionProps) {
  const form = useForm<RiskComplianceFormData>({
    resolver: zodResolver(riskComplianceSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      existingObligations: "",
      coOwnership: "",
      patentStatus: "",
      materialRisks: "",
      ipLegalDocs: null,
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

        {/* Existing Obligations/Licensing Agreements */}
        <FormField
          control={form.control}
          name="existingObligations"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Existing Obligations/Licensing Agreements</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Describe any existing licensing agreements, obligations, or encumbrances on the patent..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Co-ownership Confirmation */}
        <FormField
          control={form.control}
          name="coOwnership"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Co-ownership Confirmation</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="co-own-yes" />
                    <Label htmlFor="co-own-yes">Yes, there are co-owners</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="co-own-no" />
                    <Label htmlFor="co-own-no">No, I am the sole owner</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Patent Status */}
        <FormField
          control={form.control}
          name="patentStatus"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Patent Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Patent Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {patentStatuses.map((status) => (
                    <SelectItem key={status} value={status.toLowerCase().replace(/\s/g, '-')}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Material Risks (Optional) */}
        <FormField
          control={form.control}
          name="materialRisks"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1.5">
                <FormLabel className="form-label">Material Risks</FormLabel>
                <span className="text-xs text-muted-foreground">Optional</span>
              </div>
              <FormControl>
                <Textarea 
                  placeholder="Describe any material risks associated with the patent or collateral..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* IP Legal Documentation */}
        <FormField
          control={form.control}
          name="ipLegalDocs"
          render={({ field: { value, onChange, ...field } }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">IP Legal Documentation</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      onChange(file);
                    }}
                    className="hidden"
                    id="ip-legal-docs"
                    {...field}
                  />
                  <label
                    htmlFor="ip-legal-docs"
                    className="flex items-center gap-2 px-4 py-2 border rounded-md cursor-pointer hover:bg-accent"
                  >
                    <Upload className="w-4 h-4" />
                    {value ? value.name : "Upload Legal Documents"}
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

