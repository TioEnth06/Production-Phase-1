import React, { useState } from "react";
import { BorrowerInformationSection } from "./BorrowerInformationSection";
import { CollateralDetailsSection } from "./CollateralDetailsSection";
import { LoanRequestInfoSection } from "./LoanRequestInfoSection";
import { RiskComplianceSection } from "./RiskComplianceSection";
import { LTVRequestSection } from "./LTVRequestSection";
import { RepaymentStructureSection } from "./RepaymentStructureSection";
import { DocumentsUploadSection } from "./DocumentsUploadSection";
import { TermsCollateralSection } from "./TermsCollateralSection";
import { ReviewSubmitSection } from "./ReviewSubmitSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type SectionId = 
  | 'borrower' 
  | 'collateral' 
  | 'loan-request' 
  | 'risk-compliance' 
  | 'ltv-request' 
  | 'repayment' 
  | 'documents' 
  | 'terms' 
  | 'review';

interface Section {
  id: SectionId;
  title: string;
  description: string;
}

const sections: Section[] = [
  { id: 'borrower', title: 'Borrower Information', description: "Provide your personal or organizational details for loan application." },
  { id: 'collateral', title: 'Collateral (IP-NFT) Details', description: "Select and verify the IP-NFT you want to use as collateral." },
  { id: 'loan-request', title: 'Loan Request Information', description: "Specify the loan amount, type, duration, and purpose." },
  { id: 'risk-compliance', title: 'Risk & Compliance', description: "Disclose existing obligations, patent status, and legal documentation." },
  { id: 'ltv-request', title: 'Loan-to-Value (LTV) Request', description: "Set your preferred LTV ratio and understand the risk implications." },
  { id: 'repayment', title: 'Repayment & Revenue Structure', description: "Define how you plan to repay the loan and revenue sharing options." },
  { id: 'documents', title: 'Required Documents Upload', description: "Upload all necessary documentation for loan approval." },
  { id: 'terms', title: 'Terms & Collateral Locking', description: "Review and accept the terms for collateral locking and liquidation." },
  { id: 'review', title: 'Review & Submit', description: "Review your application summary and submit for approval." },
];

interface RequestLoanFormProps {
  onClose?: () => void;
}

export function RequestLoanForm({ onClose }: RequestLoanFormProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<SectionId[]>([]);
  const [sectionValidation, setSectionValidation] = useState<Record<SectionId, boolean>>({});
  const [formData, setFormData] = useState<Record<SectionId, any>>({});
  const { toast } = useToast();

  const currentSection = sections[currentSectionIndex];
  const isFirstSection = currentSectionIndex === 0;
  const isLastSection = currentSectionIndex === sections.length - 1;
  const progress = ((currentSectionIndex + 1) / sections.length) * 100;

  const handleValidationChange = (sectionId: SectionId, isValid: boolean) => {
    setSectionValidation(prev => ({
      ...prev,
      [sectionId]: isValid
    }));
  };

  const handleDataChange = (sectionId: SectionId, data: any) => {
    setFormData(prev => ({
      ...prev,
      [sectionId]: data
    }));
  };

  const handleContinue = (currentSectionId: SectionId) => {
    // Check if current section is valid - only proceed if explicitly true
    const validationState = sectionValidation[currentSectionId];
    if (validationState !== true) {
      toast({
        title: "Please complete all required fields",
        description: "All required fields must be filled before proceeding.",
        variant: "destructive",
        icon: <AlertCircle className="w-5 h-5" />,
      });
      return;
    }

    // Mark current section as complete
    if (!completedSections.includes(currentSectionId)) {
      setCompletedSections([...completedSections, currentSectionId]);
    }
    
    // Move to next section
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      // Scroll to top when moving to next section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Loan Application Submitted",
      description: "Your loan request has been submitted successfully. We'll review it within 3-5 business days.",
    });
    setTimeout(() => {
      onClose?.();
    }, 1500);
  };

  const renderSectionContent = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'borrower':
        return <BorrowerInformationSection 
          onContinue={() => handleContinue('borrower')} 
          onValidationChange={(isValid) => handleValidationChange('borrower', isValid)}
          initialData={formData['borrower']}
          onDataChange={(data) => handleDataChange('borrower', data)}
        />;
      case 'collateral':
        return <CollateralDetailsSection 
          onContinue={() => handleContinue('collateral')}
          onValidationChange={(isValid) => handleValidationChange('collateral', isValid)}
          initialData={formData['collateral']}
          onDataChange={(data) => handleDataChange('collateral', data)}
        />;
      case 'loan-request':
        return <LoanRequestInfoSection 
          onContinue={() => handleContinue('loan-request')}
          onValidationChange={(isValid) => handleValidationChange('loan-request', isValid)}
        />;
      case 'risk-compliance':
        return <RiskComplianceSection 
          onContinue={() => handleContinue('risk-compliance')}
          onValidationChange={(isValid) => handleValidationChange('risk-compliance', isValid)}
        />;
      case 'ltv-request':
        return <LTVRequestSection 
          onContinue={() => handleContinue('ltv-request')}
          onValidationChange={(isValid) => handleValidationChange('ltv-request', isValid)}
        />;
      case 'repayment':
        return <RepaymentStructureSection 
          onContinue={() => handleContinue('repayment')}
          onValidationChange={(isValid) => handleValidationChange('repayment', isValid)}
        />;
      case 'documents':
        return <DocumentsUploadSection 
          onContinue={() => handleContinue('documents')}
          onValidationChange={(isValid) => handleValidationChange('documents', isValid)}
        />;
      case 'terms':
        return <TermsCollateralSection 
          onContinue={() => handleContinue('terms')}
          onValidationChange={(isValid) => handleValidationChange('terms', isValid)}
        />;
      case 'review':
        return <ReviewSubmitSection onSubmit={handleSubmit} />;
      default:
        return null;
    }
  };

  // Check if current section is valid
  // The button should only be enabled when validation is explicitly true
  // Disabled if validation is false, undefined, or not yet set
  const validationState = sectionValidation[currentSection.id];
  // Only enable navigation if validation is explicitly true
  const isCurrentSectionValid = validationState === true;

  return (
    <div className="max-w-5xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {currentSectionIndex + 1} of {sections.length}
          </span>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step Indicator */}
      <div className="mb-6">
        <div className="flex items-start justify-between overflow-x-auto py-2 scrollbar-hide w-full">
          {sections.map((section, index) => {
            const isCompleted = completedSections.includes(section.id);
            const isCurrent = index === currentSectionIndex;
            const isPast = index < currentSectionIndex;
            
            return (
              <div key={section.id} className="flex items-start flex-1 justify-center relative">
                <div className="flex flex-col items-center gap-4 w-full">
                  <div className="flex items-center justify-center w-full relative">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 z-10 ${
                        isCurrent
                          ? 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2 scale-110 shadow-lg shadow-primary/50'
                          : isCompleted || isPast
                          ? 'bg-success text-success-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {isCompleted || isPast ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <span className="text-sm font-semibold">{index + 1}</span>
                      )}
                    </div>
                    {index < sections.length - 1 && (
                      <div
                        className={`absolute left-1/2 h-1 w-full transition-all ${
                          isPast ? 'bg-success' : 'bg-muted'
                        }`}
                        style={{ marginLeft: '20px', top: '50%', transform: 'translateY(-50%)' }}
                      />
                    )}
                  </div>
                  <span
                    className={`text-xs text-center max-w-[80px] transition-all ${
                      isCurrent 
                        ? 'font-semibold text-foreground' 
                        : 'text-muted-foreground'
                    }`}
                  >
                    {section.title}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Form Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground mb-2">{currentSection.title}</h1>
        <p className="text-muted-foreground">
          {currentSection.description}
        </p>
      </div>

      {/* Current Section Content */}
      <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6">
        {renderSectionContent(currentSection.id)}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6">
        {!isFirstSection ? (
          <Button
            variant="outline"
            onClick={handlePrevious}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </Button>
        ) : (
          <div /> // Spacer to maintain justify-between layout
        )}
        
        {!isLastSection && (
          <Button
            onClick={() => handleContinue(currentSection.id)}
            className="gap-2"
            disabled={!isCurrentSectionValid}
            title={isCurrentSectionValid ? "Click to continue to next step" : "Please complete all required fields before proceeding"}
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
