import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { collateralSchema, type CollateralFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface CollateralDetailsSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
  initialData?: Partial<CollateralFormData>;
  onDataChange?: (data: CollateralFormData) => void;
}

// Mock IP-NFTs for selection
const mockIPNFTs = [
  { id: "IP-NFT-001", title: "Quantum Computing Algorithm", value: "$500,000" },
  { id: "IP-NFT-002", title: "Nanotechnology Material Process", value: "$750,000" },
  { id: "IP-NFT-003", title: "AI Neural Network Architecture", value: "$1,200,000" },
];

const valuationSources = [
  "Independent Appraisal",
  "Market Comparable Analysis",
  "Cost Approach",
  "Income Approach",
  "Combined Approach"
];

export function CollateralDetailsSection({ onContinue, onValidationChange, initialData, onDataChange }: CollateralDetailsSectionProps) {
  const form = useForm<CollateralFormData>({
    resolver: zodResolver(collateralSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      ipNftId: initialData?.ipNftId || "",
      patentTitle: initialData?.patentTitle || "",
      valuationSource: initialData?.valuationSource || "",
      verifiedValue: initialData?.verifiedValue || "",
    },
  });

  const { isValid } = form.formState;
  const selectedNFT = mockIPNFTs.find(nft => nft.id === form.watch("ipNftId"));

  // Update form when initialData changes
  React.useEffect(() => {
    if (initialData) {
      form.reset({
        ipNftId: initialData.ipNftId || "",
        patentTitle: initialData.patentTitle || "",
        valuationSource: initialData.valuationSource || "",
        verifiedValue: initialData.verifiedValue || "",
      });
    }
  }, [initialData, form]);

  // Report validation state to parent
  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  // Save form data on change
  React.useEffect(() => {
    const subscription = form.watch((data) => {
      onDataChange?.(data as CollateralFormData);
    });
    return () => subscription.unsubscribe();
  }, [form, onDataChange]);

  const handleNFTSelect = (value: string) => {
    const nft = mockIPNFTs.find(n => n.id === value);
    if (nft) {
      form.setValue("ipNftId", nft.id);
      form.setValue("patentTitle", nft.title);
      form.setValue("verifiedValue", nft.value.replace("$", "").replace(",", ""));
    }
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

        {/* Choose IP-NFT */}
        <FormField
          control={form.control}
          name="ipNftId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Choose IP-NFT to Use as Collateral</FormLabel>
              <Select onValueChange={(value) => { field.onChange(value); handleNFTSelect(value); }} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select IP-NFT" />
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

        {/* IP NFT ID/Mint Address (Auto-filled) */}
        <FormField
          control={form.control}
          name="ipNftId"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">IP NFT ID/Mint Address</FormLabel>
              <FormControl>
                <Input placeholder="Auto-filled from selection" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Patent Title (Auto-filled) */}
        <FormField
          control={form.control}
          name="patentTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label">Patent Title</FormLabel>
              <FormControl>
                <Input placeholder="Auto-filled from selection" {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Valuation Source */}
        <FormField
          control={form.control}
          name="valuationSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Valuation Source</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Valuation Source" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {valuationSources.map((source) => (
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

        {/* Verified Collateral Value */}
        <FormField
          control={form.control}
          name="verifiedValue"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1.5">
                <FormLabel className="form-label form-label-required">Verified Collateral Value (USD)</FormLabel>
                <span className="text-xs text-muted-foreground">Auto-filled from selection</span>
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
      </form>
    </Form>
  );
}

