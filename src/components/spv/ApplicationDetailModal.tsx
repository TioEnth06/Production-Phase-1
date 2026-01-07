import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VaultApplication } from "@/lib/vaultStorage";
import { User, Calendar, FileText, CheckCircle2, XCircle } from "lucide-react";

interface ApplicationDetailModalProps {
  application: VaultApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export function ApplicationDetailModal({
  application,
  open,
  onOpenChange,
  onApprove,
  onReject,
}: ApplicationDetailModalProps) {
  if (!application) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formData = application.formData || {};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Application Details
          </DialogTitle>
          <DialogDescription>
            Review all submitted information for this vault application
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Application Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Submitted By</p>
                <p className="text-sm font-medium">{application.submittedBy}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">Submitted At</p>
                <p className="text-sm font-medium">{formatDate(application.submittedAt)}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Application ID</p>
              <p className="text-sm font-medium">{application.id}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                Pending Review
              </Badge>
            </div>
          </div>

          {/* Form Sections */}
          {formData.inventor && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Inventor Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {Object.entries(formData.inventor).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData.patent && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Patent Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {Object.entries(formData.patent).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {formData.valuation && (
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-3">Valuation</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {Object.entries(formData.valuation).map(([key, value]) => (
                  <div key={key}>
                    <span className="text-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}: </span>
                    <span className="font-medium">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button
              variant="outline"
              className="gap-2 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => {
                onReject(application.id);
                onOpenChange(false);
              }}
            >
              <XCircle className="w-4 h-4" />
              Reject
            </Button>
            <Button
              className="gap-2 bg-success hover:bg-success/90"
              onClick={() => {
                onApprove(application.id);
                onOpenChange(false);
              }}
            >
              <CheckCircle2 className="w-4 h-4" />
              Approve
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}



