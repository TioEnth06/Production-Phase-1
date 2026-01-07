import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, Wallet, Mail, Phone, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { applicantInfoSchema, type ApplicantInfoFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ApplicantInfoSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
  initialData?: Partial<ApplicantInfoFormData>;
  onDataChange?: (data: ApplicantInfoFormData) => void;
}

const applicantTypes = [
  "Individual",
  "Institution",
  "Startup",
  "University / Research Center"
];

export function ApplicantInfoSection({ onContinue, onValidationChange, initialData, onDataChange }: ApplicantInfoSectionProps) {
  const form = useForm<ApplicantInfoFormData>({
    resolver: zodResolver(applicantInfoSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      walletAddress: initialData?.walletAddress || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
      fullName: initialData?.fullName || "",
      email: initialData?.email || "",
      phone: initialData?.phone || "",
      applicantType: initialData?.applicantType || "",
    },
  });

  const { isValid } = form.formState;

  React.useEffect(() => {
    if (initialData) {
      form.reset({
        walletAddress: initialData.walletAddress || "0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb",
        fullName: initialData.fullName || "",
        email: initialData.email || "",
        phone: initialData.phone || "",
        applicantType: initialData.applicantType || "",
      });
    }
  }, [initialData, form]);

  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  React.useEffect(() => {
    const subscription = form.watch((data) => {
      onDataChange?.(data as ApplicantInfoFormData);
    });
    return () => subscription.unsubscribe();
  }, [form, onDataChange]);

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="auto-saved-badge">
            <Check className="w-3 h-3" />
            Auto-saved
          </span>
        </div>

        {/* Wallet Address (Auto-filled) */}
        <FormField
          control={form.control}
          name="walletAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Wallet Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="0x..."
                    className="pl-10 font-mono text-sm"
                    {...field}
                    disabled
                  />
                </div>
              </FormControl>
              <p className="text-xs text-muted-foreground">Auto-filled from connected wallet</p>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Full Name / Institution Name */}
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Full Name / Institution Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="John Doe or Institution Name"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Email Address</FormLabel>
              <FormControl>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="your.email@example.com"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number (Optional) */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1.5">
                <FormLabel className="form-label">Phone Number</FormLabel>
                <span className="text-xs text-muted-foreground">Optional</span>
              </div>
              <FormControl>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Applicant Type */}
        <FormField
          control={form.control}
          name="applicantType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Applicant Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-2"
                >
                  {applicantTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.toLowerCase().replace(/\s+/g, '-')} id={`applicant-${type}`} />
                      <Label htmlFor={`applicant-${type}`} className="cursor-pointer font-normal">
                        {type}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}



