import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Check, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { declarationsSchema, type DeclarationsFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface DeclarationsSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

export function DeclarationsSection({ onContinue, onValidationChange }: DeclarationsSectionProps) {
  const form = useForm<DeclarationsFormData>({
    resolver: zodResolver(declarationsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      acknowledgeEvaluation: false,
      agreeToMonitoring: false,
      consentToDataAccess: false,
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

        {/* Declaration 1 */}
        <FormField
          control={form.control}
          name="acknowledgeEvaluation"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  I acknowledge that the ERB will evaluate the proposal across 3 dimensions: Technical – Legal – Financial.
                </label>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Declaration 2 */}
        <FormField
          control={form.control}
          name="agreeToMonitoring"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  I agree to milestone-based monitoring by the Legal SPV.
                </label>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Declaration 3 */}
        <FormField
          control={form.control}
          name="consentToDataAccess"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer">
                  I consent to limited data access for ERB reviewers.
                </label>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Info Box */}
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-sm text-blue-800">
            <p className="font-medium mb-1">Important:</p>
            <p>All three declarations must be accepted to proceed with the funding application. By accepting these terms, you agree to the evaluation and monitoring processes outlined by the ERB.</p>
          </div>
        </div>
      </form>
    </Form>
  );
}


