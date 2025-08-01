
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/hooks/useLanguage';
import { Github, Twitter, Linkedin, Mail, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const footerLinks = [
    { label: t('about'), route: '/about' },
    { label: t('founders'), route: '/founders' },
    { label: t('legal'), route: '/legal' },
    { label: t('contact'), route: '/contact' },
    { label: t('userGuide'), route: '/user-guide' }
  ];

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="w-8 h-8 text-blue-400" />
              <h3 className="text-2xl font-bold">GPO NEXUS</h3>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your AI-powered unified workspace for global business collaboration. 
              Connect, negotiate, and grow with businesses worldwide through our 
              innovative group purchasing and service platform.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Github className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Mail className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.route}>
                  <Button
                    variant="ghost"
                    className="text-gray-400 hover:text-white p-0 h-auto font-normal"
                    onClick={() => navigate(link.route)}
                  >
                    {link.label}
                  </Button>
                </li>
              ))}
            </ul>
          </div>

          {/* Business Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Business</h4>
            <ul className="space-y-2">
              <li>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white p-0 h-auto font-normal"
                  onClick={() => navigate('/marketplace')}
                >
                  Marketplace
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white p-0 h-auto font-normal"
                  onClick={() => navigate('/suppliers')}
                >
                  Suppliers
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white p-0 h-auto font-normal"
                  onClick={() => navigate('/arbitration')}
                >
                  Arbitration
                </Button>
              </li>
              <li>
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white p-0 h-auto font-normal"
                  onClick={() => navigate('/company-formation')}
                >
                  Company Formation
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 GPO NEXUS. All rights reserved. Global Business Platform.
          </p>
          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <span className="text-gray-400 text-sm">Currency: USD</span>
            <span className="text-gray-400 text-sm">|</span>
            <span className="text-gray-400 text-sm">Global Platform</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
