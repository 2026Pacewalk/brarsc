import PolicyLayout from '@/components/PolicyLayout';
import { AlertTriangle, BookOpen, ExternalLink, FileText, GraduationCap, Scale } from 'lucide-react';

const sections = [
  {
    icon: FileText,
    title: 'General Disclaimer',
    content: `The information provided on Brar Scribbles (brarscribbles.com) is for general educational and informational purposes only. While we strive to ensure the accuracy, completeness, and reliability of all content including study materials, formula sheets, and educational resources, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability of the information, products, services, or related graphics contained on the website for any purpose.

Any reliance you place on such information is strictly at your own risk. In no event will Brar Scribbles be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.`,
  },
  {
    icon: GraduationCap,
    title: 'Educational Content Disclaimer',
    content: `Our study materials, formula sheets, synopsis notes, and educational content are designed to supplement formal education and aid in student learning. However:

• Our materials should be used as supplementary study aids, not as a replacement for classroom teaching, textbooks, or formal instruction
• We do not guarantee specific academic results, grades, or exam scores from using our products
• Students should always cross-reference information with their official textbooks and curriculum
• While we make every effort to ensure accuracy, educational content may contain typographical errors or omissions
• Science is constantly evolving, and some information may become outdated over time

We strongly recommend that students follow their school curriculum and teacher guidance alongside our study materials.`,
  },
  {
    icon: Scale,
    title: 'Intellectual Property',
    content: `All content on this website including but not limited to text, graphics, logos, images, illustrations, study materials, formula sheets, designs, icons, photographs, audio clips, digital downloads, and software is the property of Brar Scribbles or its content suppliers and is protected by Indian and international copyright laws.

• You may not reproduce, duplicate, copy, sell, resell, or exploit any portion of our content without express written permission
• Our study materials are for personal use only and may not be redistributed, shared, or sold
• The Brar Scribbles name, logo, and all related product names are trademarks of Brar Scribbles
• Unauthorized use of any content may violate copyright, trademark, and other applicable laws

If you believe that any content on our website infringes upon your intellectual property rights, please contact us at brarscribbles@gmail.com.`,
  },
  {
    icon: ExternalLink,
    title: 'External Links Disclaimer',
    content: `Our website may contain links to external websites that are not provided or maintained by Brar Scribbles, including but not limited to:

• Amazon (for product listings)
• YouTube (for educational videos)
• Social media platforms (Facebook, Instagram, Twitter, Pinterest)
• Payment processing services
• Shipping and logistics partners

Please note that Brar Scribbles does not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.

We have no control over the nature, content, and availability of those sites. We strongly advise you to review the privacy policy and terms of service of any third-party websites you visit.`,
  },
  {
    icon: BookOpen,
    title: 'Product Disclaimer',
    content: `Regarding our physical products (mugs, apparel, posters, stickers, etc.):

• Product images on our website are for illustrative purposes only. Actual product colors may vary slightly due to lighting, monitor settings, and manufacturing processes
• We make every effort to display products as accurately as possible but cannot guarantee that your computer monitor will display colors accurately
• Product dimensions and weights provided are approximate
• We reserve the right to modify, discontinue, or update products at any time without prior notice
• Product availability is subject to change without notice

Regarding our digital products (PDF study materials):

• Downloads are available immediately after successful payment
• Download links are valid for a limited period (30 days) to prevent unauthorized sharing
• You are responsible for ensuring you have the necessary software (PDF reader) to access digital products
• We recommend downloading your purchases immediately as we cannot guarantee permanent availability of download links`,
  },
  {
    icon: AlertTriangle,
    title: 'Limitation of Liability',
    content: `To the fullest extent permitted by applicable law, Brar Scribbles and its founder JP Brar shall not be liable for:

• Any direct, indirect, incidental, special, consequential, or punitive damages
• Loss of profits, data, goodwill, or other intangible losses
• Any errors, mistakes, or inaccuracies in content
• Personal injury or property damage resulting from your use of our products or services
• Any unauthorized access to or use of our servers and/or any personal information stored therein
• Any interruption or cessation of transmission to or from our services
• Any bugs, viruses, trojan horses, or similar harmful elements that may be transmitted through our services

This limitation of liability applies whether the alleged liability is based on contract, tort, negligence, strict liability, or any other basis, even if Brar Scribbles has been advised of the possibility of such damage.`,
  },
];

export default function Disclaimer() {
  return (
    <PolicyLayout
      title="Disclaimer"
      subtitle="Please read this disclaimer carefully before using our website, products, and services."
      description="Brar Scribbles Disclaimer - Read about the limitations, terms of use, and conditions for using our website, educational materials, and products."
      keywords="Brar Scribbles disclaimer, terms of use, educational content disclaimer, liability limitation, intellectual property, external links"
      lastUpdated="January 1, 2024"
      heroGradient="from-[#1a1010] via-[#291a1a] to-[#b91c1c]/20"
    >
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#E8E4E0]">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center">
          <AlertTriangle size={28} className="text-red-500" />
        </div>
        <div>
          <p className="text-sm text-[#5A5A6E] leading-relaxed">
            This disclaimer governs your use of the Brar Scribbles website and all content, products, and services available through it. By accessing or using our website, you acknowledge that you have read, understood, and agree to be bound by this disclaimer.
          </p>
        </div>
      </div>

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

      <div className="mt-10 pt-6 border-t border-[#E8E4E0]">
        <h3 className="font-semibold text-[#1A1A2E] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Changes to This Disclaimer
        </h3>
        <p className="text-sm text-[#5A5A6E] leading-relaxed mb-4">
          We reserve the right to modify this disclaimer at any time. Changes will be posted on this page with an updated date. We encourage you to review this page periodically. Your continued use of our website after any changes constitutes acceptance of those changes.
        </p>
        <p className="text-sm text-[#5A5A6E] leading-relaxed">
          If you have any questions about this disclaimer, please contact us at <a href="mailto:brarscribbles@gmail.com" className="text-[#F26522] hover:underline">brarscribbles@gmail.com</a> or call us at <a href="tel:+918427976607" className="text-[#F26522] hover:underline">+91-84279-76607</a>.
        </p>
      </div>
    </PolicyLayout>
  );
}
