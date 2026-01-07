import React from "react";
import { FileText, Video, Upload, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { supportingDocumentsSchema, type SupportingDocumentsFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

interface SupportingDocumentsSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function FileUpload({ 
  label, 
  required,
  hint, 
  icon,
  value, 
  onChange,
  accept = ".pdf",
  error
}: {
  label: string;
  required?: boolean;
  hint?: string;
  icon: React.ReactNode;
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
      <label className={`form-label ${required ? 'form-label-required' : ''}`}>{label}</label>
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
            {icon}
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

export function SupportingDocumentsSection({ onContinue, onValidationChange }: SupportingDocumentsSectionProps) {
  const form = useForm<SupportingDocumentsFormData>({
    resolver: zodResolver(supportingDocumentsSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      technicalDocument: null,
      licensingDraft: null,
      pitchVideo: null,
    },
  });

  const { isValid, formState: { errors } } = form.formState;

  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  const technicalDocError = errors.technicalDocument?.message as string | undefined;

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="auto-saved-badge">
            <Check className="w-3 h-3" />
            Auto-saved
          </span>
        </div>

        {/* Technical Document */}
        <FormField
          control={form.control}
          name="technicalDocument"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload
                  label="Upload Technical Document (PDF)"
                  required
                  icon={<FileText className="w-5 h-5 text-muted-foreground" />}
                  hint="PDF (max 10MB)"
                  value={field.value as File | null}
                  onChange={(file) => field.onChange(file)}
                  error={technicalDocError}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Licensing Draft / Market Study (Optional) */}
        <FormField
          control={form.control}
          name="licensingDraft"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload
                  label="Upload Licensing Draft / Market Study (Optional)"
                  icon={<FileText className="w-5 h-5 text-muted-foreground" />}
                  hint="PDF (max 10MB)"
                  value={field.value as File | null}
                  onChange={(file) => field.onChange(file)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pitch Video (Optional) */}
        <FormField
          control={form.control}
          name="pitchVideo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload
                  label="Upload Pitch Video (Optional)"
                  icon={<Video className="w-5 h-5 text-muted-foreground" />}
                  hint="MP4, MOV (max 10MB)"
                  accept="video/*"
                  value={field.value as File | null}
                  onChange={(file) => field.onChange(file)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}



