import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { InventorSection } from "./InventorSection";
import { PatentDetailsSection } from "./PatentDetailsSection";
import { DocumentationSection } from "./DocumentationSection";
import { CommercialValueSection } from "./CommercialValueSection";
import { OwnershipSection } from "./OwnershipSection";
import { ValuationSection } from "./ValuationSection";
import { NFTMintingSection } from "./NFTMintingSection";
import { SignSubmitSection } from "./SignSubmitSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Loader2, Home } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { saveVaultApplication } from "@/lib/vaultStorage";
import { useAuth } from "@/contexts/AuthContext";

type SectionId = 
  | 'inventor' 
  | 'patent' 
  | 'documentation' 
  | 'commercial' 
  | 'ownership' 
  | 'valuation' 
  | 'nft' 
  | 'submit';

interface Section {
  id: SectionId;
  title: string;
  description: string;
}

const sections: Section[] = [
  { id: 'inventor', title: 'Inventor Details', description: "Share who is behind this patent. You can update these details later before submission." },
  { id: 'patent', title: 'Patent Details', description: "Provide the core information about your patent registration and classification." },
  { id: 'documentation', title: 'Documentation', description: "Upload required documents including specifications and technical drawings." },
  { id: 'commercial', title: 'Commercial Value & Market Information', description: "Describe the commercial potential and market positioning of your patent." },
  { id: 'ownership', title: 'Ownership Verification', description: "Verify your ownership rights and list any co-owners of the patent." },
  { id: 'valuation', title: 'Requested IP Valuation', description: "Propose your valuation with supporting justification and methodology." },
  { id: 'nft', title: 'IP-NFT Minting Parameters', description: "Configure how your patent will be tokenized as an IP-NFT." },
  { id: 'submit', title: 'Sign & Submit', description: "Review and sign your application to complete the submission." },
];

interface PatentVaultFormProps {
  onClose?: () => void;
}

export function PatentVaultForm({ onClose }: PatentVaultFormProps) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [completedSections, setCompletedSections] = useState<SectionId[]>([]);
  const [sectionValidation, setSectionValidation] = useState<Record<SectionId, boolean>>({});
  const [formData, setFormData] = useState<Record<SectionId, any>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

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

  const handleNext = () => {
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Simulate submission process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Save application to storage
      const applicationId = saveVaultApplication({
        submittedBy: user?.email || "unknown",
        formData: formData,
      });

      setIsSubmitting(false);
      setIsSubmitted(true);

      toast({
        title: "Application Submitted",
        description: "Your patent vault application has been submitted successfully. SPV will review it within 3-5 business days.",
      });
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderSectionContent = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'inventor':
        return <InventorSection 
          onContinue={() => handleContinue('inventor')} 
          onValidationChange={(isValid) => handleValidationChange('inventor', isValid)}
          initialData={formData['inventor']}
          onDataChange={(data) => handleDataChange('inventor', data)}
        />;
      case 'patent':
        return <PatentDetailsSection 
          onContinue={() => handleContinue('patent')}
          onValidationChange={(isValid) => handleValidationChange('patent', isValid)}
          initialData={formData['patent']}
          onDataChange={(data) => handleDataChange('patent', data)}
        />;
      case 'documentation':
        return <DocumentationSection 
          onContinue={() => handleContinue('documentation')}
          onValidationChange={(isValid) => handleValidationChange('documentation', isValid)}
        />;
      case 'commercial':
        return <CommercialValueSection 
          onContinue={() => handleContinue('commercial')}
          onValidationChange={(isValid) => handleValidationChange('commercial', isValid)}
        />;
      case 'ownership':
        return <OwnershipSection 
          onContinue={() => handleContinue('ownership')}
          onValidationChange={(isValid) => handleValidationChange('ownership', isValid)}
        />;
      case 'valuation':
        return <ValuationSection 
          onContinue={() => handleContinue('valuation')}
          onValidationChange={(isValid) => handleValidationChange('valuation', isValid)}
        />;
      case 'nft':
        return <NFTMintingSection 
          onContinue={() => handleContinue('nft')}
          onValidationChange={(isValid) => handleValidationChange('nft', isValid)}
        />;
      case 'submit':
        return <SignSubmitSection onSubmit={handleSubmit} />;
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

  // Show waiting/submitted page
  if (isSubmitting || isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg border border-gray-200 p-12 shadow-sm">
          <div className="text-center">
            {isSubmitting ? (
              <>
                <div className="flex justify-center mb-6">
                  <Loader2 className="w-16 h-16 text-primary animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Submitting Your Application</h2>
                <p className="text-muted-foreground mb-8">
                  Please wait while we process your patent vault application. This may take a few moments...
                </p>
                <div className="flex justify-center">
                  <div className="w-64">
                    <Progress value={66} className="h-2" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle2 className="w-12 h-12 text-success" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">Application Submitted Successfully!</h2>
                <p className="text-muted-foreground mb-6">
                  Your patent vault application has been submitted successfully. Our team will review it within 3-5 business days.
                </p>
                <div className="bg-muted/50 rounded-lg p-6 mb-8 text-left">
                  <h3 className="font-medium mb-3">What happens next?</h3>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>You'll receive an email confirmation shortly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>Our SPV team will review your application within 3-5 business days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>You'll be notified via email once the review is complete</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      <span>Upon approval, your IP-NFT will be minted and added to your portfolio</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center gap-4">
                  <Button
                    onClick={() => navigate("/")}
                    className="gap-2"
                    size="lg"
                  >
                    <Home className="w-4 h-4" />
                    Back to Home
                  </Button>
                  <Button
                    onClick={() => navigate("/vault")}
                    variant="outline"
                    className="gap-2"
                    size="lg"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Vault
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

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
        {(() => {
          try {
            return renderSectionContent(currentSection.id);
          } catch (error) {
            console.error("Error rendering section:", error);
            return (
              <div className="p-4 text-center text-destructive">
                <p>Error loading form section. Please refresh the page.</p>
                <p className="text-sm mt-2">{error instanceof Error ? error.message : "Unknown error"}</p>
              </div>
            );
          }
        })()}
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

