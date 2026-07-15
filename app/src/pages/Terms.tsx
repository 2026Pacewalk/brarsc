import PolicyLayout from '@/components/PolicyLayout';
import { ScrollText, ShoppingBag, CreditCard, Truck, RotateCcw, Copyright, Gavel, Users } from 'lucide-react';

const sections = [
  {
    icon: ScrollText,
    title: 'Acceptance of Terms',
    content: `By accessing, browsing, or using the Brar Scribbles website (brarscribbles.com), creating an account, or making a purchase, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website or services.

We reserve the right to modify, update, or change these terms at any time without prior notice. Your continued use of the website after any changes constitutes your acceptance of the revised terms. It is your responsibility to review these terms periodically.`,
  },
  {
    icon: Users,
    title: 'User Accounts & Responsibilities',
    content: `To make purchases on our website, you may need to create an account. When you create an account, you agree to:

• Provide accurate, current, and complete information about yourself
• Maintain the security of your password and account credentials
• Accept responsibility for all activities that occur under your account
• Notify us immediately of any unauthorized use of your account
• Ensure that your account information is kept up to date

We reserve the right to refuse service, terminate accounts, remove or edit content, or cancel orders at our sole discretion if we believe that your conduct violates applicable laws or is harmful to our interests.`,
  },
  {
    icon: ShoppingBag,
    title: 'Products & Pricing',
    content: `All products listed on our website are subject to availability. We reserve the right to discontinue any product at any time.

• Prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise
• Prices are subject to change without notice
• In the event of a pricing error, we reserve the right to cancel any orders placed at the incorrect price
• Product descriptions, images, and specifications are provided for informational purposes and may not be entirely accurate
• Colors of physical products may vary slightly from what appears on your screen due to monitor settings
• We reserve the right to limit quantities of any products or services that we offer

All offers and promotions are subject to specific terms and conditions which will be communicated at the time of the offer.`,
  },
  {
    icon: CreditCard,
    title: 'Payment Terms',
    content: `By placing an order, you agree to pay the full price of the products plus any applicable shipping charges and taxes.

• Full payment must be received before orders are processed and shipped
• We accept UPI, Credit/Debit Cards, Net Banking, and select Wallets
• All payments are processed through secure, PCI-DSS compliant payment gateways
• We do not store your complete card or banking information on our servers
• In case of payment failure, the order will not be processed
• Any additional bank or payment gateway charges are the responsibility of the customer

You represent and warrant that: (i) you have the legal right to use any payment method used in connection with any purchase; and (ii) the information you supply to us is true, correct, and complete.`,
  },
  {
    icon: Truck,
    title: 'Shipping & Delivery Terms',
    content: `We currently ship physical products within India only. Digital products (PDF notes) are delivered via email and can be accessed worldwide.

• Delivery timelines are estimates and not guaranteed (typically 5-7 business days)
• We are not responsible for delays caused by courier partners, weather, or other circumstances beyond our control
• Risk of loss and title for items pass to you upon delivery to the courier
• You are responsible for providing accurate and complete shipping address information
• Additional delivery attempts may incur extra charges
• We may use different courier services based on availability and destination
• For digital products, download links are sent to your registered email after payment confirmation

If a package is returned to us due to an incorrect address or failed delivery attempts, you may be responsible for additional shipping charges for re-delivery.`,
  },
  {
    icon: RotateCcw,
    title: 'Cancellation & Refund Policy',
    content: `**Order Cancellation:**
• Orders can be cancelled within 24 hours of placing them, provided they have not been shipped
• Digital product orders cannot be cancelled once the download link has been delivered
• To cancel an order, contact us immediately at brarscribbles@gmail.com or +91-84279-76607

**Refunds for Digital Products:**
Due to the digital nature of our study materials (PDFs), we do not offer refunds once the download link has been delivered. Please review product descriptions carefully before purchasing. If you experience technical issues, contact us for support.

**Returns for Physical Products:**
• Physical products can be returned within 7 days of delivery if damaged, defective, or incorrect
• Products must be unused, in original packaging, with all tags attached
• Return shipping costs are borne by the customer unless the product was damaged/defective
• Refunds will be processed within 7-10 business days after we receive the returned item
• Refunds will be credited to the original payment method`,
  },
  {
    icon: Copyright,
    title: 'Copyright & Intellectual Property',
    content: `All content on this website, including but not limited to text, graphics, logos, images, illustrations, study materials, formula sheets, designs, audio clips, and software, is the property of Brar Scribbles and is protected by Indian and international copyright, trademark, and other intellectual property laws.

You may NOT:
• Reproduce, distribute, display, or transmit any content without written permission
• Create derivative works from our study materials or content
• Use our content for commercial purposes without authorization
• Remove any copyright or proprietary notices from our materials
• Share your account credentials or digital downloads with others

You MAY:
• Use our study materials for your personal educational purposes
• Print digital study materials for your personal use
• Share our website link with others
• Use our products as intended

Violation of these terms may result in legal action.`,
  },
  {
    icon: Gavel,
    title: 'Governing Law & Disputes',
    content: `These Terms and Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these terms shall be subject to the exclusive jurisdiction of the courts in Patiala, Punjab, India.

Before initiating any formal legal proceedings, we encourage you to contact us directly to attempt to resolve any disputes amicably. We are committed to working with our customers to find fair solutions.

If any provision of these terms is found to be invalid or unenforceable by a court, the remaining provisions will continue in full force and effect. Our failure to enforce any right or provision of these terms will not be considered a waiver of those rights.`,
  },
];

export default function Terms() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      subtitle="Please read these terms carefully before using our website and services."
      description="Brar Scribbles Terms and Conditions - Read the rules, guidelines, and legal terms for using our website, purchasing products, and accessing our services."
      keywords="Brar Scribbles terms and conditions, user agreement, purchase terms, shipping terms, refund policy, copyright policy, legal terms"
      lastUpdated="January 1, 2024"
      heroGradient="from-[#0f172a] via-[#1e293b] to-[#6366f1]/20"
    >
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#E8E4E0]">
        <div className="w-14 h-14 bg-[#FFF0E8] rounded-2xl flex items-center justify-center">
          <ScrollText size={28} className="text-[#F26522]" />
        </div>
        <div>
          <p className="text-sm text-[#5A5A6E] leading-relaxed">
            These Terms and Conditions constitute a legally binding agreement between you and Brar Scribbles regarding your use of our website and services. By accessing or using Brar Scribbles, you agree to these terms in full.
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
          Contact Information
        </h3>
        <p className="text-sm text-[#5A5A6E] leading-relaxed">
          For any questions about these Terms and Conditions, please contact us at <a href="mailto:brarscribbles@gmail.com" className="text-[#F26522] hover:underline">brarscribbles@gmail.com</a> or call <a href="tel:+918427976607" className="text-[#F26522] hover:underline">+91-84279-76607</a>.
        </p>
      </div>
    </PolicyLayout>
  );
}
