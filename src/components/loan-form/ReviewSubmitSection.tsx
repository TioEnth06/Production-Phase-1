import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { PenTool, Shield, FileCheck, Info, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ReviewSubmitSectionProps {
  onSubmit: () => void;
}

export function ReviewSubmitSection({ onSubmit }: ReviewSubmitSectionProps) {
  return (
    <div className="space-y-6">
      {/* Application Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-primary" />
            Application Summary
          </CardTitle>
          <CardDescription>
            Review all the information you've provided before submitting
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Borrower Information:</span>
              <p className="font-medium">✓ Completed</p>
            </div>
            <div>
              <span className="text-muted-foreground">Collateral Details:</span>
              <p className="font-medium">✓ Completed</p>
            </div>
            <div>
              <span className="text-muted-foreground">Loan Request:</span>
              <p className="font-medium">✓ Completed</p>
            </div>
            <div>
              <span className="text-muted-foreground">Risk & Compliance:</span>
              <p className="font-medium">✓ Completed</p>
            </div>
            <div>
              <span className="text-muted-foreground">LTV Request:</span>
              <p className="font-medium">✓ Completed</p>
            </div>
            <div>
              <span className="text-muted-foreground">Repayment Structure:</span>
              <p className="font-medium">✓ Completed</p>
            </div>
            <div>
              <span className="text-muted-foreground">Documents:</span>
              <p className="font-medium">✓ Completed</p>
            </div>
            <div>
              <span className="text-muted-foreground">Terms & Collateral:</span>
              <p className="font-medium">✓ Completed</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Digital Signature */}
      <div className="rounded-lg border border-border p-6 bg-muted/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <PenTool className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium mb-1">Digital Signature Required</h4>
            <p className="text-sm text-muted-foreground mb-4">
              By signing this form, you confirm that all information provided is accurate and you have the authority to request this loan using your IP-NFT as collateral.
            </p>
            <Button variant="outline" className="gap-2">
              <PenTool className="w-4 h-4" />
              Sign with Wallet
            </Button>
          </div>
        </div>
      </div>

      {/* Confirmations */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox id="confirm-ownership" />
          <Label htmlFor="confirm-ownership" className="text-sm leading-relaxed cursor-pointer">
            I confirm that I am the rightful owner of the IP-NFT used as collateral and have the legal authority to use it for this loan.
          </Label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="confirm-accuracy" />
          <Label htmlFor="confirm-accuracy" className="text-sm leading-relaxed cursor-pointer">
            I certify that all information, documents, and financial data provided in this loan application are accurate, complete, and not misleading.
          </Label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="confirm-terms" />
          <Label htmlFor="confirm-terms" className="text-sm leading-relaxed cursor-pointer">
            I have read and agree to the <a href="#" className="text-primary hover:underline">Loan Terms</a>, <a href="#" className="text-primary hover:underline">Collateral Agreement</a>, and <a href="#" className="text-primary hover:underline">Auto-liquidation Policy</a>.
          </Label>
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="confirm-repayment" />
          <Label htmlFor="confirm-repayment" className="text-sm leading-relaxed cursor-pointer">
            I understand my repayment obligations and confirm that I have the means to repay the loan according to the agreed schedule.
          </Label>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-success/5 border border-success/20">
        <Shield className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-success">Secure Submission</p>
          <p className="text-xs text-muted-foreground mt-1">
            Your data is encrypted and securely stored. Only authorized personnel will have access to your sensitive documents and financial information.
          </p>
        </div>
      </div>

      {/* Submission Info */}
      <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
        <FileCheck className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium">What happens next?</p>
          <ul className="text-xs text-muted-foreground mt-1 space-y-1">
            <li>• Our team will review your loan application within 3-5 business days</li>
            <li>• You'll receive email updates on your application status</li>
            <li>• Upon approval, your collateral will be locked and funds will be disbursed</li>
            <li>• You can track your loan status in your dashboard</li>
          </ul>
        </div>
      </div>

      {/* Review Period Note */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          <Info className="w-5 h-5 text-yellow-600" />
        </div>
        <p className="text-sm text-yellow-800">
          <span className="font-medium">Review Period:</span> Your loan application will be reviewed within 3-5 business days. You will be notified via email once the review is complete and if any additional information is required.
        </p>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onSubmit} className="gap-2 bg-primary hover:bg-primary/90 px-8">
          Submit Loan Application
        </Button>
      </div>
    </div>
  );
}


