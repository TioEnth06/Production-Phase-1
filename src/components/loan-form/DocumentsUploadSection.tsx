import React, { useState, useRef } from "react";
import { Check, Upload, FileText } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { documentsSchema, type DocumentsFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DocumentsUploadSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

export function DocumentsUploadSection({ onContinue, onValidationChange }: DocumentsUploadSectionProps) {
  const form = useForm<DocumentsFormData>({
    resolver: zodResolver(documentsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      patentCertificate: null,
      valuationDocument: null,
      technicalDocumentation: null,
      financialProjection: null,
      companyRegistration: null,
    },
  });

  const { isValid } = form.formState;

  // Report validation state to parent
  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  const FileUploadField = ({ 
    name, 
    label, 
    required = false, 
    accept = ".pdf,.doc,.docx",
    hint = "PDF, DOC, DOCX (max 10MB)"
  }: { 
    name: keyof DocumentsFormData; 
    label: string; 
    required?: boolean;
    accept?: string;
    hint?: string;
  }) => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    return (
      <FormField
        control={form.control}
        name={name}
        render={({ field: { value, onChange, ...field } }) => (
          <FormItem>
            <div className="flex items-center justify-between mb-1.5">
              <FormLabel className={required ? "form-label form-label-required" : "form-label"}>
                {label}
              </FormLabel>
              {!required && <span className="text-xs text-muted-foreground">Optional</span>}
            </div>
            <FormControl>
              <div
                className={`border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer ${
                  isDragging ? "border-primary bg-primary/5" : ""
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragging(false);
                  const file = e.dataTransfer.files[0];
                  if (file) {
                    onChange(file);
                  }
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept={accept}
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    onChange(file);
                  }}
                  className="hidden"
                  id={name}
                  {...field}
                />
                <div className="flex flex-col items-center gap-2">
                  {value ? (
                    <>
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <FileText className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{value.name}</p>
                        <p className="text-xs text-muted-foreground">Click to change file</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                        <Upload className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground">{hint}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

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

        {/* Patent Certificate/Filing Document */}
        <FileUploadField 
          name="patentCertificate" 
          label="Patent Certificate/Filing Document" 
          required
        />

        {/* Valuation Document */}
        <FileUploadField 
          name="valuationDocument" 
          label="Valuation Document" 
          required
        />

        {/* Technical Documentation */}
        <FileUploadField 
          name="technicalDocumentation" 
          label="Technical Documentation" 
          required
        />

        {/* Financial Projection */}
        <FileUploadField 
          name="financialProjection" 
          label="Financial Projection" 
          required
        />

        {/* Company Registration/KYC */}
        <FileUploadField 
          name="companyRegistration" 
          label="Company Registration/KYC" 
          required
        />
      </form>
    </Form>
  );
}

