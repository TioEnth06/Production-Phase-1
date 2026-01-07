import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, FileText, Calendar } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ipNftInfoSchema, type IPNftInfoFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface IPNftInfoSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
  initialData?: Partial<IPNftInfoFormData>;
  onDataChange?: (data: IPNftInfoFormData) => void;
}

// Mock IP-NFTs for selection
const mockIPNFTs = [
  { id: "IP-NFT-001", title: "Quantum Computing Algorithm", patentNumber: "US10,123,456", year: "2023" },
  { id: "IP-NFT-002", title: "Nanotechnology Material Process", patentNumber: "EP2,345,678", year: "2022" },
  { id: "IP-NFT-003", title: "AI Neural Network Architecture", patentNumber: "US11,789,012", year: "2024" },
];

const ipTypes = [
  "Granted Patent",
  "Patent Pending",
  "Trade Secret",
  "Process / Formula"
];

const technologyCategories = [
  "Nanomaterials",
  "Nano-coating",
  "Medical Nanotechnology",
  "Energy",
  "Advanced Manufacturing",
  "Biotechnology",
  "Others"
];

export function IPNftInfoSection({ onContinue, onValidationChange, initialData, onDataChange }: IPNftInfoSectionProps) {
  const form = useForm<IPNftInfoFormData>({
    resolver: zodResolver(ipNftInfoSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ipNftId: initialData?.ipNftId || "",
      inventionName: initialData?.inventionName || "",
      patentNumber: initialData?.patentNumber || "",
      publicationYear: initialData?.publicationYear || "",
      ipType: initialData?.ipType || "",
      technologyCategory: initialData?.technologyCategory || "",
      otherCategory: initialData?.otherCategory || "",
    },
  });

  const { isValid } = form.formState;
  const selectedNFT = mockIPNFTs.find(nft => nft.id === form.watch("ipNftId"));
  const technologyCategory = form.watch("technologyCategory");

  React.useEffect(() => {
    if (initialData) {
      form.reset({
        ipNftId: initialData.ipNftId || "",
        inventionName: initialData.inventionName || "",
        patentNumber: initialData.patentNumber || "",
        publicationYear: initialData.publicationYear || "",
        ipType: initialData.ipType || "",
        technologyCategory: initialData.technologyCategory || "",
        otherCategory: initialData.otherCategory || "",
      });
    }
  }, [initialData, form]);

  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  React.useEffect(() => {
    const subscription = form.watch((data) => {
      onDataChange?.(data as IPNftInfoFormData);
    });
    return () => subscription.unsubscribe();
  }, [form, onDataChange]);

  const handleNFTSelect = (value: string) => {
    const nft = mockIPNFTs.find(n => n.id === value);
    if (nft) {
      form.setValue("ipNftId", nft.id);
      form.setValue("inventionName", nft.title);
      form.setValue("patentNumber", nft.patentNumber);
      form.setValue("publicationYear", nft.year);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="auto-saved-badge">
            <Check className="w-3 h-3" />
            Auto-saved
          </span>
        </div>

        {/* Select IP-NFT */}
        <FormField
          control={form.control}
          name="ipNftId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Select IP-NFT</FormLabel>
              <Select onValueChange={(value) => { field.onChange(value); handleNFTSelect(value); }} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select IP-NFT from your vault" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mockIPNFTs.map((nft) => (
                    <SelectItem key={nft.id} value={nft.id}>
                      {nft.id} - {nft.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Invention / Technology Name (Auto-filled) */}
        <FormField
          control={form.control}
          name="inventionName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Invention / Technology Name</FormLabel>
              <FormControl>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Auto-filled from selection"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Patent Number / Registration Status (Auto-filled) */}
        <FormField
          control={form.control}
          name="patentNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Patent Number / Registration Status</FormLabel>
              <FormControl>
                <Input
                  placeholder="Auto-filled from selection"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Publication Year (Auto-filled) */}
        <FormField
          control={form.control}
          name="publicationYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Publication Year</FormLabel>
              <FormControl>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Auto-filled from selection"
                    className="pl-10"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* IP Type */}
        <FormField
          control={form.control}
          name="ipType"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">IP Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col space-y-2"
                >
                  {ipTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <RadioGroupItem value={type.toLowerCase().replace(/\s+/g, '-')} id={`ip-type-${type}`} />
                      <Label htmlFor={`ip-type-${type}`} className="cursor-pointer font-normal">
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

        {/* Technology Category */}
        <FormField
          control={form.control}
          name="technologyCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Technology Category</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Technology Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {technologyCategories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase().replace(/\s+/g, '-')}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Other Category (conditional) */}
        {technologyCategory === 'others' && (
          <FormField
            control={form.control}
            name="otherCategory"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="form-label form-label-required">Specify Other Category</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter technology category"
                    {...field}
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



