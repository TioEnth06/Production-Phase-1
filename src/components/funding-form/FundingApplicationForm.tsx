import React, { useState } from "react";
import { ApplicantInfoSection } from "./ApplicantInfoSection";
import { IPNftInfoSection } from "./IPNftInfoSection";
import { ProjectOverviewSection } from "./ProjectOverviewSection";
import { CommercializationPlanSection } from "./CommercializationPlanSection";
import { FundingRequirementsSection } from "./FundingRequirementsSection";
import { TeamExpertiseSection } from "./TeamExpertiseSection";
import { SupportingDocumentsSection } from "./SupportingDocumentsSection";
import { DeclarationsSection } from "./DeclarationsSection";
import { ReviewSubmitSection } from "./ReviewSubmitSection";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

type SectionId = 
  | 'applicant' 
  | 'ip-nft' 
  | 'project-overview' 
  | 'commercialization' 
  | 'funding' 
  | 'team' 
  | 'documents' 
  | 'declarations' 
  | 'review';

interface Section {
  id: SectionId;
  title: string;
  description: string;
}

const sections: Section[] = [
  { id: 'applicant', title: 'Applicant Information', description: "Provide your personal or institutional details for the funding application." },
  { id: 'ip-nft', title: 'IP-NFT Information', description: "Select and verify the IP-NFT you want to seek funding for." },
  { id: 'project-overview', title: 'Project Overview', description: "Describe your project, problem statement, and technology readiness." },
  { id: 'commercialization', title: 'Commercialization Plan', description: "Outline your target market and commercialization strategy." },
  { id: 'funding', title: 'Funding Requirements', description: "Specify the funding amount needed and how it will be utilized." },
  { id: 'team', title: 'Team & Expertise', description: "Provide details about the applicant and key team members." },
  { id: 'documents', title: 'Supporting Documents', description: "Upload technical documents and supporting materials." },
  { id: 'declarations', title: 'Declarations & Governance', description: "Review and accept the terms for funding evaluation." },
  { id: 'review', title: 'Review & Submit', description: "Review your application summary and submit for evaluation." },
];

interface FundingApplicationFormProps {
  onClose?: () => void;
}

export function FundingApplicationForm({ onClose }: FundingApplicationFormProps) {
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
      title: "Funding Proposal Submitted",
      description: "Your funding application has been submitted successfully. The ERB will review it within 3-5 business days.",
    });
    setTimeout(() => {
      onClose?.();
    }, 1500);
  };

  const renderSectionContent = (sectionId: SectionId) => {
    switch (sectionId) {
      case 'applicant':
        return <ApplicantInfoSection 
          onContinue={() => handleContinue('applicant')} 
          onValidationChange={(isValid) => handleValidationChange('applicant', isValid)}
          initialData={formData['applicant']}
          onDataChange={(data) => handleDataChange('applicant', data)}
        />;
      case 'ip-nft':
        return <IPNftInfoSection 
          onContinue={() => handleContinue('ip-nft')}
          onValidationChange={(isValid) => handleValidationChange('ip-nft', isValid)}
          initialData={formData['ip-nft']}
          onDataChange={(data) => handleDataChange('ip-nft', data)}
        />;
      case 'project-overview':
        return <ProjectOverviewSection 
          onContinue={() => handleContinue('project-overview')}
          onValidationChange={(isValid) => handleValidationChange('project-overview', isValid)}
        />;
      case 'commercialization':
        return <CommercializationPlanSection 
          onContinue={() => handleContinue('commercialization')}
          onValidationChange={(isValid) => handleValidationChange('commercialization', isValid)}
        />;
      case 'funding':
        return <FundingRequirementsSection 
          onContinue={() => handleContinue('funding')}
          onValidationChange={(isValid) => handleValidationChange('funding', isValid)}
        />;
      case 'team':
        return <TeamExpertiseSection 
          onContinue={() => handleContinue('team')}
          onValidationChange={(isValid) => handleValidationChange('team', isValid)}
        />;
      case 'documents':
        return <SupportingDocumentsSection 
          onContinue={() => handleContinue('documents')}
          onValidationChange={(isValid) => handleValidationChange('documents', isValid)}
        />;
      case 'declarations':
        return <DeclarationsSection 
          onContinue={() => handleContinue('declarations')}
          onValidationChange={(isValid) => handleValidationChange('declarations', isValid)}
        />;
      case 'review':
        return <ReviewSubmitSection onSubmit={handleSubmit} formData={formData} />;
      default:
        return null;
    }
  };

  // Check if current section is valid
  const validationState = sectionValidation[currentSection.id];
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
          <div />
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


