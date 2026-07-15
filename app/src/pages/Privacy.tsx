import PolicyLayout from '@/components/PolicyLayout';
import { Shield, Eye, Lock, Cookie, Share2, UserCheck, Bell, Mail } from 'lucide-react';

const sections = [
  {
    icon: Eye,
    title: 'Information We Collect',
    content: `We collect information that you provide directly to us when you:

• Create an account or place an order
• Contact us through our contact form, email, or WhatsApp
• Subscribe to our newsletter or YouTube channel
• Participate in surveys or promotions

The types of information we collect include your name, email address, phone number, shipping address, billing information, and any other information you choose to provide.

We also automatically collect certain information about your device when you visit our website, including your IP address, browser type, operating system, and browsing behavior.`,
  },
  {
    icon: Lock,
    title: 'How We Protect Your Information',
    content: `The security of your personal information is extremely important to us. We implement a variety of security measures to maintain the safety of your personal information:

• All sensitive information is transmitted via Secure Socket Layer (SSL) technology
• We use industry-standard encryption to protect your data
• Payment information is processed through PCI-DSS compliant payment gateways
• We never store your complete credit card or banking details on our servers
• Regular security audits and monitoring of our systems
• Access to personal information is restricted to authorized personnel only`,
  },
  {
    icon: Share2,
    title: 'How We Use Your Information',
    content: `We use the information we collect to:

• Process and fulfill your orders
• Send order confirmations, shipping notifications, and updates
• Respond to your inquiries and provide customer support
• Improve our website, products, and services
• Send promotional emails about new products, offers, or other information (you can opt out anytime)
• Comply with legal obligations and protect our rights

We do NOT sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers (such as shipping partners and payment processors) who assist us in operating our website and conducting our business.`,
  },
  {
    icon: Cookie,
    title: 'Cookies & Tracking',
    content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience:

• **Essential Cookies**: Required for the website to function properly (login, cart, preferences)
• **Analytics Cookies**: Help us understand how visitors interact with our website (Google Analytics)
• **Marketing Cookies**: Used to deliver relevant advertisements and track their performance

You can choose to disable cookies through your browser settings. However, this may affect your ability to use certain features of our website. By continuing to use our website, you consent to our use of cookies.`,
  },
  {
    icon: UserCheck,
    title: 'Your Rights & Choices',
    content: `You have the following rights regarding your personal information:

• **Access**: Request a copy of the personal information we hold about you
• **Correction**: Request correction of inaccurate or incomplete information
• **Deletion**: Request deletion of your personal information (subject to legal obligations)
• **Opt-out**: Unsubscribe from marketing communications at any time
• **Data Portability**: Request transfer of your data to another service

To exercise any of these rights, please contact us at brarscribbles@gmail.com or +91-84279-76607. We will respond to your request within 30 days.`,
  },
  {
    icon: Mail,
    title: 'Third-Party Services',
    content: `Our website may contain links to third-party websites and services, including:

• **Payment Processors**: Razorpay, PayU (for secure payment processing)
• **Shipping Partners**: Delhivery, Blue Dart, India Post
• **Analytics**: Google Analytics (for website usage analysis)
• **Social Media**: Facebook, Instagram, YouTube, Twitter, Pinterest

These third-party services have their own privacy policies. We encourage you to review their policies before providing any personal information. We are not responsible for the privacy practices of these third-party services.`,
  },
  {
    icon: Bell,
    title: 'Children\'s Privacy',
    content: `Our website is intended for a general audience, including students. We do not knowingly collect personal information from children under the age of 13 without parental consent. If you are a parent or guardian and believe that your child has provided us with personal information without your consent, please contact us immediately at brarscribbles@gmail.com. We will take steps to remove such information from our records.`,
  },
];

export default function Privacy() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      subtitle="Your privacy is important to us. Learn how we collect, use, and protect your personal information."
      description="Brar Scribbles Privacy Policy - Learn how we collect, use, store, and protect your personal information when you use our website and services."
      keywords="Brar Scribbles privacy policy, data protection, personal information, cookies policy, GDPR, data security, privacy rights"
      lastUpdated="January 1, 2024"
      heroGradient="from-[#0f172a] via-[#1e293b] to-[#3b82f6]/20"
    >
      {/* Intro */}
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#E8E4E0]">
        <div className="w-14 h-14 bg-[#FFF0E8] rounded-2xl flex items-center justify-center">
          <Shield size={28} className="text-[#F26522]" />
        </div>
        <div>
          <p className="text-sm text-[#9A9AAA]">Effective Date: January 1, 2024</p>
          <p className="text-sm text-[#9A9AAA]">Applies to: brarscribbles.com and all related services</p>
        </div>
      </div>

      <p className="text-[#5A5A6E] leading-relaxed mb-8">
        At Brar Scribbles, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website, make purchases, or interact with our services. By using Brar Scribbles, you consent to the practices described in this policy.
      </p>

      {/* Sections */}
      <div className="space-y-8">
        {sections.map((section, i) => (
          <div key={section.title} className="group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 bg-[#FFF0E8] rounded-lg flex items-center justify-center group-hover:bg-[#F26522] transition-colors">
                <section.icon size={16} className="text-[#F26522] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-semibold text-lg text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {i + 1}. {section.title}
              </h3>
            </div>
            <div className="pl-12 text-[#5A5A6E] text-sm leading-relaxed whitespace-pre-line">
              {section.content}
            </div>
          </div>
        ))}
      </div>

      {/* Contact */}
      <div className="mt-10 pt-6 border-t border-[#E8E4E0]">
        <h3 className="font-semibold text-[#1A1A2E] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Contact Us About Privacy
        </h3>
        <p className="text-sm text-[#5A5A6E] leading-relaxed mb-4">
          If you have any questions, concerns, or complaints about this Privacy Policy or our data practices, please contact us:
        </p>
        <div className="bg-[#FFFBF7] rounded-xl p-4 space-y-2 text-sm">
          <p><span className="text-[#9A9AAA]">Email:</span> <a href="mailto:brarscribbles@gmail.com" className="text-[#F26522] hover:underline">brarscribbles@gmail.com</a></p>
          <p><span className="text-[#9A9AAA]">Phone:</span> <a href="tel:+918427976607" className="text-[#F26522] hover:underline">+91-84279-76607</a></p>
          <p><span className="text-[#9A9AAA]">Address:</span> Patiala, Punjab, India</p>
        </div>
        <p className="text-xs text-[#9A9AAA] mt-4">
          We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date.
        </p>
      </div>
    </PolicyLayout>
  );
}
