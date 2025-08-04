
import React from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Mail, 
  Globe, 
  Shield, 
  FileText, 
  Users, 
  Building2,
  Twitter,
  Linkedin,
  Github
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Founders Message Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Building2 className="w-6 h-6" />
              💼 Founders' Message
            </h3>
            <div className="text-gray-300 leading-relaxed space-y-4">
              <p>
                We, <strong>Mohamed Hassanein</strong> and <strong>Ahmed Seddiq</strong>, firmly believe that the future of business lies in collaborative intelligence, transparency, and empowering individuals and groups to negotiate collectively and effectively.
              </p>
              <p>
                We founded <strong>gpodo.com</strong> to offer everyone — freelancers, startups, suppliers, and buyers alike — a fair opportunity to form smart groups, manage contracts professionally, and control negotiation processes with flexibility and security.
              </p>
              <p>
                In a world filled with gaps between needs and supply, and between ideas and execution, we decided to build a practical solution grounded in:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Collective empowerment</li>
                <li>Contractual fairness</li>
                <li>Intelligent role integration</li>
                <li>Bridging collaborative economy with international commercial law</li>
              </ul>
              <p>
                Combining our expertise in international trade, arbitration, technology, and business management, we built this platform to transform negotiation from a privilege into a professional, participatory process — accessible to all, not just those with influence or budget.
              </p>
              <p>
                Our vision is for <strong>GPO SMART</strong> to become a vital link between individuals and institutions across global markets — a real tool for fair negotiation, and a foundation for cooperative projects based on transparent, legally recognized principles.
              </p>
              <p className="font-medium">
                We promise to uphold the values of innovation, governance, and user protection in every interaction and transaction on this platform.
              </p>
              <p className="text-right font-medium">
                Yours sincerely,<br />
                <strong>Mohamed Hassanein & Ahmed Seddiq</strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">🧠 GPO DO</h4>
            <p className="text-gray-400 text-sm">
              Smart Collaborative Platform for the future of business collaboration and negotiation.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
                <Github className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">About Us</a></li>
              <li><a href="/how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors">How It Works</a></li>
              <li><a href="/features" className="text-gray-400 hover:text-white text-sm transition-colors">Features</a></li>
              <li><a href="/pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Legal
            </h4>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a></li>
              <li><a href="/terms-of-use" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Use</a></li>
              <li><a href="/user-guide" className="text-gray-400 hover:text-white text-sm transition-colors">User Guide</a></li>
              <li><a href="/arbitration" className="text-gray-400 hover:text-white text-sm transition-colors">Arbitration Rules</a></li>
              <li><a href="/compliance" className="text-gray-400 hover:text-white text-sm transition-colors">Compliance</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contact
            </h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                support@gpodo.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                legal@gpodo.com
              </li>
              <li className="flex items-center gap-2 text-sm text-gray-400">
                <Globe className="w-4 h-4" />
                www.gpodo.com
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-800" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-gray-400">
            © {currentYear} GPO DO. All rights reserved. Built with ❤️ for collaborative business.
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>UNCITRAL & ICC Compliant</span>
            <span>•</span>
            <span>ISO 44001 Standards</span>
            <span>•</span>
            <span>GDPR Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
