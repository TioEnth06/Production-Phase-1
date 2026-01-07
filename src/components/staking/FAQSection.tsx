import { useEffect, useRef } from "react";
import { Mail, ChevronRight, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FAQSection = () => {
  const faqs = [
    {
      id: "what-is",
      question: "What is NanoFi Staking?",
      answer: "NanoFi Staking allows you to earn passive yield by depositing your NANO tokens into our curated vault strategies.",
    },
    {
      id: "earn-rewards",
      question: "How do I earn rewards?",
      answer: "Rewards are automatically accrued based on the vault's APY. You can claim your rewards at any time from your dashboard.",
    },
    {
      id: "withdraw",
      question: "Can I withdraw anytime?",
      answer: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      id: "risks",
      question: "What are the risks?",
      answer: "Like all DeFi protocols, there are smart contract risks and market risks. We mitigate these through audits and conservative strategies.",
    },
    {
      id: "fees",
      question: "Are there any fees?",
      answer: "NanoFi charges a small performance fee on earned yields. There are no deposit or withdrawal fees.",
    },
    {
      id: "apy",
      question: "How is APY calculated?",
      answer: "APY is calculated based on the vault's historical performance and projected returns from the underlying strategy.",
    },
  ];

  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
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

  return (
    <section ref={sectionRef} className="grid gap-8 lg:grid-cols-2">
      {/* Left Side */}
      <div>
        <span className="inline-block rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
          COMMON QUESTION
        </span>
        <h3 className="mt-4 text-2xl font-semibold text-foreground lg:text-3xl">
          Frequently Asked
          <br />
          Question Answered
        </h3>
        <p className="mt-4 text-muted-foreground">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium
          doloremque laudantium
        </p>

        <div className="mt-8">
          <p className="text-sm text-muted-foreground">Have more questions?</p>
          <Button variant="outline" className="mt-3">
            <Mail className="h-4 w-4" />
            Send Email
          </Button>
        </div>
      </div>

      {/* Right Side - Accordion */}
      <div>
        <Accordion type="single" collapsible defaultValue="withdraw" className="space-y-3">
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              value={faq.id}
              className="rounded-lg border border-border bg-card px-4 data-[state=open]:border-primary/30 data-[state=open]:bg-primary/5"
            >
              <AccordionTrigger className="py-4 text-left font-medium text-foreground hover:no-underline [&[data-state=open]>svg]:rotate-180 [&>svg]:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
