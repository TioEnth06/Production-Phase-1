import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, FileText, DollarSign, Building2, User, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ReviewSubmitSectionProps {
  onSubmit: () => void;
  formData: Record<string, any>;
}

export function ReviewSubmitSection({ onSubmit, formData }: ReviewSubmitSectionProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate validation and submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Funding Proposal Submitted Successfully",
        description: "Your proposal has been submitted. The ERB will review it within 3-5 business days.",
      });

      onSubmit();
      
      // Redirect to governance/funding dashboard
      setTimeout(() => {
        navigate("/governance");
      }, 2000);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Applicant Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {formData.applicant?.fullName || "Not provided"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              IP-NFT Selected
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {formData['ip-nft']?.inventionName || "Not selected"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Funding Requested
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {formData.funding?.totalFunding ? `$${formData.funding.totalFunding} USDT` : "Not specified"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Target Industry
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {formData.commercialization?.targetIndustry || "Not specified"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Submission Info */}
      <div className="rounded-lg border border-green-200 bg-green-50 p-4 flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </div>
        <div className="text-sm text-green-800">
          <p className="font-medium mb-1">Ready to Submit</p>
          <p>Please review all information carefully. Once submitted, your proposal will be evaluated by the ERB across Technical, Legal, and Financial dimensions.</p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          size="lg"
          className="gap-2 px-8"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Submit Funding Proposal
            </>
          )}
        </Button>
      </div>
    </div>
  );
}


