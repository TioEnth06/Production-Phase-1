import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getVaultApplicationById, updateVaultApplicationStatus, VaultApplication } from "@/lib/vaultStorage";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, User, Calendar, FileText, CheckCircle2, XCircle, FileEdit, Download, File, CheckCircle, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { SPVSidebar } from "@/components/spv/SPVSidebar";
import { SPVHeader } from "@/components/spv/SPVHeader";

const SPVApplicationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [application, setApplication] = useState<VaultApplication | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectConfirmationWord, setRejectConfirmationWord] = useState("");
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revisionReason, setRevisionReason] = useState("");
  const [revisionConfirmationWord, setRevisionConfirmationWord] = useState("");
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [approveConfirmationWord, setApproveConfirmationWord] = useState("");
  
  const REJECT_CONFIRMATION_TEXT = "REJECT";
  const REVISION_CONFIRMATION_TEXT = "REVISION";
  const APPROVE_CONFIRMATION_TEXT = "APPROVE";

  useEffect(() => {
    if (user?.role !== "spv") {
      navigate("/");
      return;
    }

    if (id) {
      const app = getVaultApplicationById(id);
      if (app) {
        setApplication(app);
      } else {
        toast({
          title: "Application Not Found",
          description: "The requested application could not be found.",
          variant: "destructive",
        });
        navigate("/spv");
      }
    }
  }, [id, user, navigate, toast]);

  const handleApproveClick = () => {
    setIsApproveModalOpen(true);
  };

  const handleApproveSubmit = () => {
    if (!application || !user) return;

    if (approveConfirmationWord.trim() !== APPROVE_CONFIRMATION_TEXT) {
      toast({
        title: "Confirmation Required",
        description: `Please type "${APPROVE_CONFIRMATION_TEXT}" to confirm the approval.`,
        variant: "destructive",
      });
      return;
    }

    const success = updateVaultApplicationStatus(
      application.id,
      "approved",
      user.email,
      "Application approved by SPV reviewer"
    );

    if (success) {
      toast({
        title: "Application Approved",
        description: "The vault application has been approved successfully.",
        icon: <CheckCircle2 className="w-5 h-5 text-success" />,
      });
      setIsApproveModalOpen(false);
      setApproveConfirmationWord("");
      // Reload application data
      const updatedApp = getVaultApplicationById(application.id);
      if (updatedApp) setApplication(updatedApp);
    } else {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    }
  };

  const handleRejectClick = () => {
    setIsRejectModalOpen(true);
  };

  const handleRejectSubmit = () => {
    if (!application || !user) return;

    if (!rejectionReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for rejection.",
        variant: "destructive",
      });
      return;
    }

    if (rejectConfirmationWord.trim() !== REJECT_CONFIRMATION_TEXT) {
      toast({
        title: "Confirmation Required",
        description: `Please type "${REJECT_CONFIRMATION_TEXT}" to confirm the rejection.`,
        variant: "destructive",
      });
      return;
    }

    const success = updateVaultApplicationStatus(
      application.id,
      "rejected",
      user.email,
      rejectionReason.trim()
    );

    if (success) {
      toast({
        title: "Application Rejected",
        description: "The vault application has been rejected.",
        variant: "destructive",
      });
      setIsRejectModalOpen(false);
      setRejectionReason("");
      setRejectConfirmationWord("");
      // Reload application data
      const updatedApp = getVaultApplicationById(application.id);
      if (updatedApp) setApplication(updatedApp);
    } else {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    }
  };

  const handleRevisionClick = () => {
    setIsRevisionModalOpen(true);
  };

  const handleRevisionSubmit = () => {
    if (!application || !user) return;

    if (!revisionReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for requesting revision.",
        variant: "destructive",
      });
      return;
    }

    if (revisionConfirmationWord.trim() !== REVISION_CONFIRMATION_TEXT) {
      toast({
        title: "Confirmation Required",
        description: `Please type "${REVISION_CONFIRMATION_TEXT}" to confirm the revision request.`,
        variant: "destructive",
      });
      return;
    }

    // For revision, we'll mark it as rejected with a revision note
    // In a real system, you might have a separate "revision-requested" status
    const success = updateVaultApplicationStatus(
      application.id,
      "rejected",
      user.email,
      revisionReason.trim()
    );

    if (success) {
      toast({
        title: "Revision Requested",
        description: "The applicant has been notified to submit a revision.",
        icon: <FileEdit className="w-5 h-5" />,
      });
      setIsRevisionModalOpen(false);
      setRevisionReason("");
      setRevisionConfirmationWord("");
      // Navigate back to dashboard after requesting revision
      setTimeout(() => {
        navigate("/spv");
      }, 1500);
    } else {
      toast({
        title: "Error",
        description: "Failed to update application status.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
            Pending Review
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-200">
            Approved
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-200">
            Rejected
          </Badge>
        );
      default:
        return null;
    }
  };

  if (!user || user?.role !== "spv") {
    return null;
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <SPVSidebar />
        <div className="flex-1 ml-64 flex flex-col">
          <SPVHeader searchValue="" onSearchChange={() => {}} />
          <main className="flex-1 bg-gray-50 p-6">
            <div className="text-center py-12">
              <p className="text-gray-500">Loading application details...</p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const formData = application.formData || {};

  // Define all form sections (matching PatentVaultForm)
  const allSections = [
    { id: 'inventor', title: 'Inventor Details' },
    { id: 'patent', title: 'Patent Details' },
    { id: 'documentation', title: 'Documentation' },
    { id: 'commercial', title: 'Commercial Value' },
    { id: 'ownership', title: 'Ownership' },
    { id: 'valuation', title: 'Valuation' },
    { id: 'nft', title: 'IP-NFT' },
    { id: 'submit', title: 'Submitted' },
  ];

  // Determine which sections have data
  const hasInventor = !!formData.inventor;
  const hasPatent = !!formData.patent;
  const hasDocumentation = !!formData.documentation;
  const hasCommercial = !!formData.commercial;
  const hasOwnership = !!formData.ownership;
  const hasValuation = !!formData.valuation;
  const hasNft = !!formData.nft;

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <SPVSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Header */}
        <SPVHeader searchValue="" onSearchChange={() => {}} />

        {/* Main Content Area */}
        <main className="flex-1 bg-gray-50">
          <div className="p-6">
            <div className="space-y-6">
              {/* Back Button and Header */}
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/spv")}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Button>
              </div>

              {/* Page Header */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <h1 className="text-2xl font-bold text-gray-900">Application Details</h1>
                </div>
                <p className="text-sm text-gray-500">
                  Review all submitted information for this vault application
                </p>
              </div>

              {/* Progress Indicator */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <div className="p-6">
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        Step {allSections.filter((s, i) => {
                          let isCompleted = false;
                          switch (s.id) {
                            case 'inventor': isCompleted = hasInventor; break;
                            case 'patent': isCompleted = hasPatent; break;
                            case 'documentation': isCompleted = hasDocumentation; break;
                            case 'commercial': isCompleted = hasCommercial; break;
                            case 'ownership': isCompleted = hasOwnership; break;
                            case 'valuation': isCompleted = hasValuation; break;
                            case 'nft': isCompleted = hasNft; break;
                            case 'submit': isCompleted = application.status !== "pending"; break;
                          }
                          return isCompleted;
                        }).length} of {allSections.length}
                      </span>
                      <span className="text-sm font-medium text-muted-foreground">
                        {Math.round((allSections.filter((s) => {
                          switch (s.id) {
                            case 'inventor': return hasInventor;
                            case 'patent': return hasPatent;
                            case 'documentation': return hasDocumentation;
                            case 'commercial': return hasCommercial;
                            case 'ownership': return hasOwnership;
                            case 'valuation': return hasValuation;
                            case 'nft': return hasNft;
                            case 'submit': return application.status !== "pending";
                            default: return false;
                          }
                        }).length / allSections.length) * 100)}% Complete
                      </span>
                    </div>
                    <Progress 
                      value={(allSections.filter((s) => {
                        switch (s.id) {
                          case 'inventor': return hasInventor;
                          case 'patent': return hasPatent;
                          case 'documentation': return hasDocumentation;
                          case 'commercial': return hasCommercial;
                          case 'ownership': return hasOwnership;
                          case 'valuation': return hasValuation;
                          case 'nft': return hasNft;
                          case 'submit': return application.status !== "pending";
                          default: return false;
                        }
                      }).length / allSections.length) * 100} 
                      className="h-2" 
                    />
                  </div>

                  {/* Step Indicator */}
                  <div className="mb-6">
                    <div className="flex items-start justify-between overflow-x-auto py-2 scrollbar-hide w-full">
                      {allSections.map((section, index) => {
                        let isCompleted = false;
                        switch (section.id) {
                          case 'inventor': isCompleted = hasInventor; break;
                          case 'patent': isCompleted = hasPatent; break;
                          case 'documentation': isCompleted = hasDocumentation; break;
                          case 'commercial': isCompleted = hasCommercial; break;
                          case 'ownership': isCompleted = hasOwnership; break;
                          case 'valuation': isCompleted = hasValuation; break;
                          case 'nft': isCompleted = hasNft; break;
                          case 'submit': isCompleted = application.status !== "pending"; break;
                        }
                        
                        return (
                          <div key={section.id} className="flex items-start flex-1 justify-center relative">
                            <div className="flex flex-col items-center gap-4 w-full">
                              <div className="flex items-center justify-center w-full relative">
                                <div
                                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0 z-10 ${
                                    isCompleted
                                      ? 'bg-success text-success-foreground'
                                      : 'bg-muted text-muted-foreground'
                                  }`}
                                >
                                  {isCompleted ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                  ) : (
                                    <span className="text-sm font-semibold">{index + 1}</span>
                                  )}
                                </div>
                                {index < allSections.length - 1 && (
                                  <div
                                    className={`absolute left-1/2 h-1 w-full transition-all ${
                                      isCompleted ? 'bg-success' : 'bg-muted'
                                    }`}
                                    style={{ marginLeft: '20px', top: '50%', transform: 'translateY(-50%)' }}
                                  />
                                )}
                              </div>
                              <span
                                className={`text-xs text-center max-w-[80px] transition-all ${
                                  'text-muted-foreground'
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
                </div>
              </Card>

              {/* Application Info Card */}
              <Card className="border border-gray-200 shadow-sm bg-white">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Submitted By</p>
                        <p className="text-sm font-medium text-gray-900">{application.submittedBy}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Submitted At</p>
                        <p className="text-sm font-medium text-gray-900">{formatDate(application.submittedAt)}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Application ID</p>
                      <p className="text-sm font-medium text-gray-900">{application.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Status</p>
                      {getStatusBadge(application.status)}
                    </div>
                  </div>

                  {/* Form Sections */}
                  {formData.inventor && (
                    <div className="border border-gray-200 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Inventor Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(formData.inventor).map(([key, value]) => (
                          <div key={key} className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Label>
                            <Input
                              defaultValue={String(value)}
                              className="text-sm"
                              readOnly
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {formData.patent && (
                    <div className="border border-gray-200 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Patent Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(formData.patent).map(([key, value]) => {
                          const isTextarea = key === "description" || (typeof value === "string" && value.length > 100);
                          return (
                            <div key={key} className={`space-y-2 ${isTextarea ? "md:col-span-2" : ""}`}>
                              <Label className="text-sm font-medium text-gray-700 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </Label>
                              {isTextarea ? (
                                <Textarea
                                  defaultValue={String(value)}
                                  className="text-sm min-h-[100px] resize-none"
                                  readOnly
                                />
                              ) : (
                                <Input
                                  defaultValue={String(value)}
                                  className="text-sm"
                                  readOnly
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {formData.valuation && (
                    <div className="border border-gray-200 rounded-lg p-4 mb-4">
                      <h3 className="font-semibold text-gray-900 mb-4">Valuation</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {Object.entries(formData.valuation).map(([key, value]) => {
                          const isTextarea = key === "justification" || (typeof value === "string" && value.length > 100);
                          return (
                            <div key={key} className={`space-y-2 ${isTextarea ? "md:col-span-2" : ""}`}>
                              <Label className="text-sm font-medium text-gray-700 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </Label>
                              {isTextarea ? (
                                <Textarea
                                  defaultValue={String(value)}
                                  className="text-sm min-h-[100px] resize-none"
                                  readOnly
                                />
                              ) : (
                                <Input
                                  defaultValue={String(value)}
                                  className="text-sm"
                                  readOnly
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Legal Documents Section */}
                  <div className="border border-gray-200 rounded-lg p-6 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Legal Documents</h3>
                    <div className="space-y-4">
                      {/* Sample Legal Documents - In real app, these would come from formData */}
                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-medium text-gray-900">Articles of Incorporation</p>
                              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Valid</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>Legal</span>
                              <span>•</span>
                              <span>Dec 15, 2024</span>
                              <span>•</span>
                              <span>2.4 MB</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                          onClick={() => {
                            toast({
                              title: "Download Started",
                              description: "Downloading Articles of Incorporation...",
                            });
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-medium text-gray-900">Financial Statements 2024</p>
                              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">Valid</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>Financial</span>
                              <span>•</span>
                              <span>Dec 15, 2024</span>
                              <span>•</span>
                              <span>5.1 MB</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                          onClick={() => {
                            toast({
                              title: "Download Started",
                              description: "Downloading Financial Statements 2024...",
                            });
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-gray-600" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-medium text-gray-900">Investor Agreement</p>
                              <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 text-xs">Draft</Badge>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <span>Legal</span>
                              <span>•</span>
                              <span>Dec 16, 2024</span>
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-2"
                          onClick={() => {
                            toast({
                              title: "Download Started",
                              description: "Downloading Investor Agreement...",
                            });
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Milestone Progress Section */}
                  <div className="border border-gray-200 rounded-lg p-6 mb-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Milestone Progress</h3>
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Initial Funding Tranche</h4>
                            <p className="text-sm text-gray-600">Release of first 30% upon legal clearance</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">$750K</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
                          <Clock className="w-3 h-3" />
                          <span>Due: Jan 15, 2025</span>
                        </div>
                      </div>

                      <div className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="text-sm font-semibold text-gray-900 mb-1">Product Launch Milestone</h4>
                            <p className="text-sm text-gray-600">Release upon successful EU launch</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-semibold text-gray-900">$1,000K</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-3 pt-3 border-t border-gray-200">
                          <Clock className="w-3 h-3" />
                          <span>Due: Apr 1, 2025</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {application.status === "pending" && (
                    <div className="flex justify-between items-center gap-3 pt-4 border-t border-gray-200">
                      <Button
                        variant="outline"
                        className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                        onClick={handleRejectClick}
                      >
                        <XCircle className="w-4 h-4" />
                        Reject
                      </Button>
                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          className="gap-2 text-gray-900 hover:text-gray-900 hover:bg-gray-50 border-gray-200"
                          onClick={handleRevisionClick}
                        >
                          <FileEdit className="w-4 h-4" />
                          Revision
                        </Button>
                        <Button
                          className="gap-2 bg-green-600 hover:bg-green-700"
                          onClick={handleApproveClick}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Approve
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>

      {/* Reject Confirmation Modal */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <XCircle className="w-5 h-5 text-red-600" />
              Reject Application
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this application. This reason will be sent to the applicant.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="rejection-reason" className="text-sm font-medium">
                Rejection Reason <span className="text-red-600">*</span>
              </Label>
              <Textarea
                id="rejection-reason"
                placeholder="Enter the reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <p className="text-xs text-gray-500">
                A clear and detailed reason helps the applicant understand what needs to be improved.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="reject-confirmation-word" className="text-sm font-medium">
                Type <span className="font-mono font-bold text-red-600">{REJECT_CONFIRMATION_TEXT}</span> to confirm <span className="text-red-600">*</span>
              </Label>
              <Input
                id="reject-confirmation-word"
                type="text"
                placeholder={REJECT_CONFIRMATION_TEXT}
                value={rejectConfirmationWord}
                onChange={(e) => setRejectConfirmationWord(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-gray-500">
                This action cannot be undone. Please type the confirmation word to proceed.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsRejectModalOpen(false);
                setRejectionReason("");
                setRejectConfirmationWord("");
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleRejectSubmit}
              disabled={!rejectionReason.trim() || rejectConfirmationWord.trim() !== REJECT_CONFIRMATION_TEXT}
            >
              <XCircle className="w-4 h-4 mr-2" />
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Revision Confirmation Modal */}
      <Dialog open={isRevisionModalOpen} onOpenChange={setIsRevisionModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileEdit className="w-5 h-5 text-orange-600" />
              Request Revision
            </DialogTitle>
            <DialogDescription>
              Please provide a reason for requesting a revision. This reason will be sent to the applicant.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="revision-reason" className="text-sm font-medium">
                Revision Reason <span className="text-red-600">*</span>
              </Label>
              <Textarea
                id="revision-reason"
                placeholder="Enter the reason for requesting revision..."
                value={revisionReason}
                onChange={(e) => setRevisionReason(e.target.value)}
                className="min-h-[120px] resize-none"
              />
              <p className="text-xs text-gray-500">
                A clear and detailed reason helps the applicant understand what needs to be revised.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="revision-confirmation-word" className="text-sm font-medium">
                Type <span className="font-mono font-bold text-orange-600">{REVISION_CONFIRMATION_TEXT}</span> to confirm <span className="text-red-600">*</span>
              </Label>
              <Input
                id="revision-confirmation-word"
                type="text"
                placeholder={REVISION_CONFIRMATION_TEXT}
                value={revisionConfirmationWord}
                onChange={(e) => setRevisionConfirmationWord(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-gray-500">
                This action will notify the applicant to submit a revision. Please type the confirmation word to proceed.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsRevisionModalOpen(false);
                setRevisionReason("");
                setRevisionConfirmationWord("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="gap-2 bg-orange-600 hover:bg-orange-700"
              onClick={handleRevisionSubmit}
              disabled={!revisionReason.trim() || revisionConfirmationWord.trim() !== REVISION_CONFIRMATION_TEXT}
            >
              <FileEdit className="w-4 h-4" />
              Confirm Revision Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Approve Confirmation Modal */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              Approve Application
            </DialogTitle>
            <DialogDescription>
              Please confirm that you want to approve this application. This action will approve the vault application.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="approve-confirmation-word" className="text-sm font-medium">
                Type <span className="font-mono font-bold text-green-600">{APPROVE_CONFIRMATION_TEXT}</span> to confirm <span className="text-red-600">*</span>
              </Label>
              <Input
                id="approve-confirmation-word"
                type="text"
                placeholder={APPROVE_CONFIRMATION_TEXT}
                value={approveConfirmationWord}
                onChange={(e) => setApproveConfirmationWord(e.target.value)}
                className="font-mono"
              />
              <p className="text-xs text-gray-500">
                This action will approve the application. Please type the confirmation word to proceed.
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsApproveModalOpen(false);
                setApproveConfirmationWord("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="gap-2 bg-green-600 hover:bg-green-700"
              onClick={handleApproveSubmit}
              disabled={approveConfirmationWord.trim() !== APPROVE_CONFIRMATION_TEXT}
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SPVApplicationDetail;

