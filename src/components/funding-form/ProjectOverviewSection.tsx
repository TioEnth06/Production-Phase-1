import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectOverviewSchema, type ProjectOverviewFormData } from "@/lib/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface ProjectOverviewSectionProps {
  onContinue: () => void;
  onValidationChange?: (isValid: boolean) => void;
}

const trlLevels = [
  "TRL 1 - Basic principles observed",
  "TRL 2 - Technology concept formulated",
  "TRL 3 - Experimental proof of concept",
  "TRL 4 - Technology validated in lab",
  "TRL 5 - Technology validated in relevant environment",
  "TRL 6 - Technology demonstrated in relevant environment",
  "TRL 7 - System prototype demonstration in operational environment",
  "TRL 8 - System complete and qualified",
  "TRL 9 - Actual system proven in operational environment",
];

export function ProjectOverviewSection({ onContinue, onValidationChange }: ProjectOverviewSectionProps) {
  const form = useForm<ProjectOverviewFormData>({
    resolver: zodResolver(projectOverviewSchema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      projectSummary: "",
      problemBeingSolved: "",
      proposedSolution: "",
      uniqueValueProposition: "",
      trlLevel: "",
    },
  });

  const { isValid } = form.formState;
  const projectSummary = form.watch("projectSummary");

  React.useEffect(() => {
    onValidationChange?.(isValid);
  }, [isValid, onValidationChange]);

  // Count words for project summary
  const wordCount = projectSummary ? projectSummary.trim().split(/\s+/).filter(Boolean).length : 0;
  const maxWords = 150;

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="auto-saved-badge">
            <Check className="w-3 h-3" />
            Auto-saved
          </span>
        </div>

        {/* Project Summary */}
        <FormField
          control={form.control}
          name="projectSummary"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between mb-1.5">
                <FormLabel className="form-label form-label-required">Project Summary</FormLabel>
                <span className={`text-xs ${wordCount > maxWords ? 'text-destructive' : 'text-muted-foreground'}`}>
                  {wordCount} / {maxWords} words
                </span>
              </div>
              <FormControl>
                <Textarea
                  placeholder="Provide a concise summary of your project (max 150 words)..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Problem Being Solved */}
        <FormField
          control={form.control}
          name="problemBeingSolved"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Problem Being Solved</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe the problem or challenge your technology addresses..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Proposed Solution / Technology */}
        <FormField
          control={form.control}
          name="proposedSolution"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Proposed Solution / Technology</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Explain your proposed solution and how the technology works..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Unique Value Proposition */}
        <FormField
          control={form.control}
          name="uniqueValueProposition"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Unique Value Proposition (USP)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="What makes your solution unique? What competitive advantages does it offer?..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Technology Readiness Level */}
        <FormField
          control={form.control}
          name="trlLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="form-label form-label-required">Technology Readiness Level (TRL 1-9)</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select TRL Level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {trlLevels.map((level) => (
                    <SelectItem key={level} value={level.toLowerCase().replace(/trl\s+\d+\s*-\s*/i, '').replace(/\s+/g, '-')}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}



