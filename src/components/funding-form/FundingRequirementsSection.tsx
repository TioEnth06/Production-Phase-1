import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, DollarSign, Upload, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fundingRequirementsSchema, type FundingRequirementsFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface FundingRequirementsSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function FileUpload({ 
  label, 
  hint, 
  value, 
  onChange,
  accept = ".pdf",
  error 
}: {
  label: string;
  hint?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
  error?: string;
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const validateFile = (file: File): boolean => {
    if (file.size > MAX_FILE_SIZE) {
      return false;
    }
    return true;
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      if (validateFile(file)) {
        onChange?.(file);
      } else {
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        onChange?.(null);
      }
    } else {
      onChange?.(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div>
      <label className="form-label">{label}</label>
      <div
        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
          error
            ? 'border-destructive bg-destructive/5 hover:border-destructive/80' 
            : 'border-border hover:border-primary/50'
        }`}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleFileChange}
        />
        <div className="flex flex-col items-center gap-2">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
            error ? 'bg-destructive/10' : 'bg-muted'
          }`}>
            <Upload className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">{hint || 'PDF (max 10MB)'}</p>
            {value && !error && (
              <div className="mt-2">
                <p className="text-xs text-primary font-medium">{value.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Size: {formatFileSize(value.size)}
                </p>
              </div>
            )}
            {error && (
              <p className="text-xs text-destructive mt-2 font-medium">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function FundingRequirementsSection({ onContinue, onValidationChange }: FundingRequirementsSectionProps) {
  const form = useForm<FundingRequirementsFormData>({
    resolver: zodResolver(fundingRequirementsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      totalFunding: "",
      rndAllocation: "",
      prototypingAllocation: "",
      legalAllocation: "",
      marketTestingAllocation: "",
      productionAllocation: "",
      operationsAllocation: "",
      utilizationTimeline: "",
      hasCoInvestors: "",
      commitmentLetter: null,
    },
  });

  const { isValid } = form.formState;
  const hasCoInvestors = form.watch("hasCoInvestors");

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

        {/* Total Funding Requested */}
        <FormField
          control={form.control}
          name="totalFunding"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Total Funding Requested (USDT)</FormLabel>
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

        {/* Breakdown of Fund Allocation */}
        <div>
          <FormLabel className="form-label">Breakdown of Fund Allocation (Optional)</FormLabel>
          <p className="text-xs text-muted-foreground mb-4">You can specify how the funding will be allocated across different categories</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="rndAllocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">R&D</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="prototypingAllocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Prototyping</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="legalAllocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Legal/IP</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="marketTestingAllocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Market Testing</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productionAllocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Production</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="operationsAllocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="form-label">Operations</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Funding Utilization Timeline */}
        <FormField
          control={form.control}
          name="utilizationTimeline"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Funding Utilization Timeline (months)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="e.g., 24"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Any Co-Investors? */}
        <FormField
          control={form.control}
          name="hasCoInvestors"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Any Co-Investors?</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-row space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="co-investors-yes" />
                    <Label htmlFor="co-investors-yes" className="cursor-pointer font-normal">
                      Yes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="co-investors-no" />
                    <Label htmlFor="co-investors-no" className="cursor-pointer font-normal">
                      No
                    </Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Commitment Letter (conditional) */}
        {hasCoInvestors === 'yes' && (
          <FormField
            control={form.control}
            name="commitmentLetter"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <FileUpload
                    label="Upload Commitment Letter (Optional)"
                    hint="PDF (max 10MB)"
                    value={field.value as File | null}
                    onChange={(file) => field.onChange(file)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  );
}



