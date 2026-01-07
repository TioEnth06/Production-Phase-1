import { Calculator, Info, TrendingUp, Shield, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function LTVCalculator() {
  const [patentValue, setPatentValue] = useState("");
  const [interestRate, setInterestRate] = useState<string>("");
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [ltvRatio, setLtvRatio] = useState<number | null>(null);
  const [maxLoanAmount, setMaxLoanAmount] = useState<string>("");
  const calculatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculator = calculatorRef.current;
    if (!calculator) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        calculator,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: calculator,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    if (patentValue) {
      const value = parseFloat(patentValue.replace(/[^0-9.]/g, ""));
      if (!isNaN(value) && value > 0) {
        // Calculate risk score (simulated - would come from oracle)
        const calculatedRiskScore = Math.min(100, Math.max(0, 85 - (value / 100000) * 0.1));
        setRiskScore(Math.round(calculatedRiskScore));

        // Calculate LTV ratio based on risk score
        let calculatedLTV = 0;
        if (calculatedRiskScore >= 80) {
          calculatedLTV = 70; // Low risk
          setInterestRate("6.5%");
        } else if (calculatedRiskScore >= 60) {
          calculatedLTV = 60; // Medium risk
          setInterestRate("8.5%");
        } else {
          calculatedLTV = 50; // High risk
          setInterestRate("12.0%");
        }
        setLtvRatio(calculatedLTV);
        setMaxLoanAmount((value * (calculatedLTV / 100)).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }));
      } else {
        setRiskScore(null);
        setLtvRatio(null);
        setInterestRate("");
        setMaxLoanAmount("");
      }
    } else {
      setRiskScore(null);
      setLtvRatio(null);
      setInterestRate("");
      setMaxLoanAmount("");
    }
  }, [patentValue]);

  const getRiskColor = (score: number | null) => {
    if (!score) return "text-muted-foreground";
    if (score >= 80) return "text-success";
    if (score >= 60) return "text-warning";
    return "text-destructive";
  };

  const getRiskLabel = (score: number | null) => {
    if (!score) return "";
    if (score >= 80) return "Low Risk";
    if (score >= 60) return "Medium Risk";
    return "High Risk";
  };

  return (
    <div ref={calculatorRef} className="rounded-xl border border-border bg-card p-6 shadow-sm h-auto lg:sticky lg:top-20 lg:z-10">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
          <Calculator className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-foreground">LTV Calculator</h3>
          <p className="text-xs text-muted-foreground">Calculate your loan potential</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-foreground">
            Patent Appraised Value
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <input
              type="text"
              value={patentValue}
              onChange={(e) => setPatentValue(e.target.value)}
              placeholder="0.00"
              className="w-full rounded-lg border border-border bg-background py-2.5 pl-7 pr-4 text-foreground placeholder:text-muted-foreground focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-lg bg-muted/50 p-3">
          <Info className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            Based on verified patent valuation
          </p>
        </div>

        {/* Interest Rate Preview */}
        {interestRate && (
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Interest Rate Preview</span>
              </div>
              <span className="text-lg font-bold text-primary">{interestRate}</span>
            </div>
            <p className="text-xs text-muted-foreground">Fixed APR based on your collateral</p>
          </div>
        )}

        {/* Risk Score from Valuation Oracle */}
        {riskScore !== null && (
          <div className="rounded-lg border border-border bg-muted/30 p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">Risk Score</span>
              </div>
              <div className="text-right">
                <span className={cn("text-lg font-bold", getRiskColor(riskScore))}>
                  {riskScore}
                </span>
                <span className="text-xs text-muted-foreground ml-1">/100</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">From Valuation Oracle</span>
              <span className={cn("text-xs font-medium", getRiskColor(riskScore))}>
                {getRiskLabel(riskScore)}
              </span>
            </div>
            {ltvRatio !== null && (
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">Max Loan Amount (LTV {ltvRatio}%)</span>
                  <span className="text-sm font-semibold text-foreground">{maxLoanAmount}</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div
                    className={cn(
                      "h-2 rounded-full transition-all duration-500",
                      getRiskColor(riskScore) === "text-success" ? "bg-success" :
                      getRiskColor(riskScore) === "text-warning" ? "bg-warning" : "bg-destructive"
                    )}
                    style={{ width: `${ltvRatio}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {!patentValue && (
          <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-center">
            <p className="text-sm font-medium text-foreground">Ready to Calculate</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Enter your patent valuation data above to see your collateral conversion and LTV ratio
            </p>
          </div>
        )}

        <Button 
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
          disabled={!patentValue || !interestRate}
        >
          <Send className="h-4 w-4" />
          Submit Loan Request
        </Button>
      </div>
    </div>
  );
}

