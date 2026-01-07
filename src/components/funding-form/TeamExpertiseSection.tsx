import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, FileText, Link2, User, Briefcase, Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamExpertiseSchema, type TeamExpertiseFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface TeamExpertiseSectionProps {
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
}: {
  label: string;
  hint?: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
  accept?: string;
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
        className="border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer border-border hover:border-primary/50"
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
          <div className="w-12 h-12 rounded-full flex items-center justify-center bg-muted">
            <Upload className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground">{hint || 'PDF (max 10MB)'}</p>
            {value && (
              <div className="mt-2">
                <p className="text-xs text-primary font-medium">{value.name}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Size: {formatFileSize(value.size)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function TeamExpertiseSection({ onContinue, onValidationChange }: TeamExpertiseSectionProps) {
  const form = useForm<TeamExpertiseFormData>({
    resolver: zodResolver(teamExpertiseSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      applicantName: "",
      role: "",
      background: "",
      cv: null,
      supportingLinks: "",
    },
  });

  const { isValid } = form.formState;
  const background = form.watch("background");

  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  // Count words for background
  const wordCount = background ? background.trim().split(/\s+/).filter(Boolean).length : 0;
  const maxWords = 100;

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="auto-saved-badge">
            <Check className="w-3 h-3" />
            Auto-saved
          </span>
        </div>

        {/* Applicant / Person in Charge (PIC) */}
        <FormField
          control={form.control}
          name="applicantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Applicant / Person in Charge (PIC)</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Full name"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Role / Position */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Role / Position</FormLabel>
              <FormControl>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="e.g., Principal Investigator, CEO, Lead Researcher"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Short Background */}
        <FormField
          control={form.control}
          name="background"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1.5">
                <FormLabel className="form-label form-label-required">Short Background</FormLabel>
                <span className={`text-xs ${wordCount > maxWords ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {wordCount} / {maxWords} words
                </span>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Provide a brief background about the applicant (max 100 words)..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Upload CV (Optional) */}
        <FormField
          control={form.control}
          name="cv"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <FileUpload
                  label="Upload CV (Optional)"
                  hint="PDF (max 10MB)"
                  value={field.value as File | null}
                  onChange={(file) => field.onChange(file)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Supporting Links (Optional) */}
        <FormField
          control={form.control}
          name="supportingLinks"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1.5">
                <FormLabel className="form-label">Supporting Links</FormLabel>
                <span className="text-xs text-muted-foreground">Optional</span>
              </div>
              <FormControl>
                <div className="relative">
                  <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Google Scholar, LinkedIn, Portfolio, etc. (separate with commas)"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <p className="text-xs text-muted-foreground mt-1">
                Add links separated by commas (e.g., https://scholar.google.com, https://linkedin.com/in/name)
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}



