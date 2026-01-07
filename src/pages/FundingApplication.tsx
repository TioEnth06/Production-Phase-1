import { useEffect, useRef } from "react";
import { Navbar } from "@/components/Navbar";
import { FundingApplicationForm } from "@/components/funding-form/FundingApplicationForm";
import { Footer } from "@/components/Footer";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FundingApplication = () => {
  const navigate = useNavigate();
  const formRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    navigate("/governance");
  };

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        form,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: form,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activePage="governance" />
      <main className="p-6">
        <div className="max-w-[1400px] mx-auto">
          <div>
            <div className="mb-6">
              <button
                onClick={handleClose}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m12 19-7-7 7-7" />
                  <path d="M19 12H5" />
                </svg>
                Back to Funding
              </button>
            </div>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground mb-2">Funding Application Form</h1>
              <p className="text-muted-foreground">
                Complete all sections to submit your funding application. The ERB will evaluate your proposal across Technical, Legal, and Financial dimensions.
              </p>
            </div>
            <div ref={formRef}>
              <FundingApplicationForm onClose={handleClose} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FundingApplication;


