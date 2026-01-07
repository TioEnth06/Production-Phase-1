import { Twitter, Github, MessageCircle } from "lucide-react";

const footerLinks = {
  Products: ["Vault", "Lending", "Marketplace", "Governance", "Treasury"],
  Resources: ["Whitepaper", "Blog", "Press", "FAQ"],
  Company: ["About", "Careers", "Contact", "Privacy", "Terms"],
};

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground mt-8">
      <div className="px-4 sm:px-6 md:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row justify-between gap-8 md:gap-12 lg:gap-8">
          {/* Logo and Description Section */}
          <div className="max-w-sm w-full lg:w-auto">
            <div className="flex items-center gap-2 mb-4">
              <img 
                src="/nanofi-logo.png" 
                alt="NanoFi Logo" 
                className="h-7 sm:h-8 w-auto object-contain"
                style={{ maxHeight: '32px', maxWidth: '120px' }}
              />
            </div>
            <p className="text-primary-foreground/70 text-sm mb-6 leading-relaxed">
              Transforming intellectual property into liquid, tradeable asset through decentralized finance
            </p>
            <div className="flex gap-3">
              <button className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Github className="w-4 h-4" />
              </button>
              <button className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </button>
              <button className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Footer Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 xl:gap-20 w-full lg:w-auto">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="font-semibold mb-3 md:mb-4 text-sm md:text-base">{category}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors block py-1"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-primary-foreground/10 px-4 sm:px-6 md:px-8 py-4 md:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p className="text-center sm:text-left">© 2025 NanoFi. All Right Reserved.</p>
          <div className="flex gap-4 items-center">
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Terms & Conditions
            </a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
