
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import Logo from '../layout/Logo';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  ExternalLink
} from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const footerSections = [
    {
      title: 'الشركة',
      links: [
        { label: 'من نحن', href: '/about' },
        { label: 'كيف نعمل', href: '/how-it-works' },
        { label: 'فريق العمل', href: '/team' },
        { label: 'الوظائف', href: '/careers' },
        { label: 'المدونة', href: '/blog' }
      ]
    },
    {
      title: 'الخدمات',
      links: [
        { label: 'الشراء التعاوني', href: '/create-group' },
        { label: 'تكوين الشركات', href: '/company-formation' },
        { label: 'الاستثمار', href: '/investment' },
        { label: 'التحكيم', href: '/arbitration' },
        { label: 'المستقلين', href: '/freelancer-dashboard' }
      ]
    },
    {
      title: 'الدعم',
      links: [
        { label: 'مركز المساعدة', href: '/help' },
        { label: 'الأسئلة الشائعة', href: '/faq' },
        { label: 'اتصل بنا', href: '/contact' },
        { label: 'تقرير مشكلة', href: '/report' },
        { label: 'طلب دعم', href: '/support' }
      ]
    },
    {
      title: 'قانوني',
      links: [
        { label: 'الشروط والأحكام', href: '/terms' },
        { label: 'سياسة الخصوصية', href: '/privacy' },
        { label: 'سياسة ملفات تعريف الارتباط', href: '/cookies' },
        { label: 'إخلاء المسؤولية', href: '/disclaimer' },
        { label: 'GDPR', href: '/gdpr' }
      ]
    }
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/gpoworld', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/gpoworld', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/gpoworld', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/gpoworld', label: 'LinkedIn' }
  ];

  const contactInfo = [
    { icon: Mail, label: 'info@gpoworld.com', href: 'mailto:info@gpoworld.com' },
    { icon: Phone, label: '+201004056668', href: 'tel:+201004056668' },
    { icon: MapPin, label: 'مصر-الجيزة- القرية الذكية', href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <Logo size="md" showText={true} className="text-white" />
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              منصة GPO WORLD هي منصة التجارة الجماعية الرائدة التي تهدف إلى تمكين الأفراد والشركات من تحقيق أفضل النتائج من خلال القوة الشرائية الجماعية والتعاون الذكي.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors"
                >
                  <contact.icon className="w-4 h-4" />
                  <span className="text-sm">{contact.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div key={index} className="lg:col-span-1">
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <button
                      onClick={() => navigate(link.href)}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-semibold text-lg mb-2">اشترك في نشرتنا الإخبارية</h3>
              <p className="text-gray-300 text-sm">
                احصل على آخر الأخبار والتحديثات حول المنصة والفرص الجديدة
              </p>
            </div>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700">
                اشتراك
              </Button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-6 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-gray-300 text-sm">تابعنا على:</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span>© 2024 GPO WORLD. جميع الحقوق محفوظة.</span>
              <a 
                href="/sitemap" 
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                خريطة الموقع
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
