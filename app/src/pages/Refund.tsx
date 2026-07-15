import PolicyLayout from '@/components/PolicyLayout';
import { RotateCcw, XCircle, Package, CheckCircle2, Clock, AlertTriangle, CreditCard, MessageCircle } from 'lucide-react';

const refundTimeline = [
  { step: 'Request Received', desc: 'We receive your cancellation or return request', icon: MessageCircle },
  { step: 'Review & Approve', desc: 'Our team reviews your request within 24-48 hours', icon: Clock },
  { step: 'Return Product', desc: 'For physical products, you ship the item back to us', icon: Package },
  { step: 'Inspection', desc: 'We inspect the returned product for eligibility', icon: CheckCircle2 },
  { step: 'Refund Processed', desc: 'Refund is initiated to your original payment method', icon: CreditCard },
];

const cancellationRules = [
  {
    stage: 'Within 1 hour',
    physical: 'Full refund, no questions asked',
    digital: 'Full refund if download link not sent',
  },
  {
    stage: 'Within 24 hours',
    physical: 'Full refund if not yet shipped',
    digital: 'No refund if download link sent',
  },
  {
    stage: 'After 24 hours',
    physical: 'Subject to approval based on shipping status',
    digital: 'No refund',
  },
  {
    stage: 'After delivery',
    physical: 'Return within 7 days for eligible products',
    digital: 'No refund',
  },
];

export default function Refund() {
  return (
    <PolicyLayout
      title="Cancellation & Refund"
      subtitle="Our policies for order cancellation, returns, and refunds for both digital and physical products."
      description="Brar Scribbles Cancellation and Refund Policy - Learn about order cancellation, return process, refund eligibility, and timelines for digital and physical products."
      keywords="Brar Scribbles cancellation policy, refund policy, return policy, order cancellation, digital products refund, physical product returns, money back"
      lastUpdated="January 1, 2024"
      heroGradient="from-[#281515] via-[#3d1f1f] to-[#b91c1c]/20"
    >
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#E8E4E0]">
        <div className="w-14 h-14 bg-[#FFF0E8] rounded-2xl flex items-center justify-center">
          <RotateCcw size={28} className="text-[#F26522]" />
        </div>
        <div>
          <p className="text-sm text-[#5A5A6E] leading-relaxed">
            We want you to be completely satisfied with your purchase. This page outlines our policies for order cancellation, returns, and refunds for both digital and physical products. Please read these policies carefully before making a purchase.
          </p>
        </div>
      </div>

      {/* Digital vs Physical */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
        <div className="p-6 bg-gradient-to-br from-orange-50 to-white rounded-xl border border-orange-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[#FFF0E8] rounded-lg flex items-center justify-center">
              <XCircle size={20} className="text-[#F26522]" />
            </div>
            <h3 className="font-semibold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Digital Products
            </h3>
          </div>
          <ul className="space-y-3 text-sm text-[#5A5A6E]">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#F26522] shrink-0 mt-0.5" />
              <span><strong>No refunds</strong> once the download link has been delivered</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#F26522] shrink-0 mt-0.5" />
              <span>Full refund within 1 hour if download link not yet sent</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#F26522] shrink-0 mt-0.5" />
              <span>Download links are valid for 30 days from purchase</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-[#F26522] shrink-0 mt-0.5" />
              <span>Technical support provided for download issues</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl border border-blue-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package size={20} className="text-blue-600" />
            </div>
            <h3 className="font-semibold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Physical Products
            </h3>
          </div>
          <ul className="space-y-3 text-sm text-[#5A5A6E]">
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
              <span>Can be returned within <strong>7 days</strong> of delivery</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
              <span>Full refund for damaged, defective, or incorrect items</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
              <span>Product must be unused with original packaging</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 size={14} className="text-blue-600 shrink-0 mt-0.5" />
              <span>Refund processed within 7-10 business days</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Cancellation Table */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#1A1A2E] mb-5 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Clock size={22} className="text-[#F26522]" />
          Cancellation Timeline
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[#E8E4E0]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1A1A2E] text-white">
                <th className="text-left px-5 py-3.5 font-medium">Order Stage</th>
                <th className="text-left px-5 py-3.5 font-medium">Physical Products</th>
                <th className="text-left px-5 py-3.5 font-medium">Digital Products</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E4E0]">
              {cancellationRules.map((rule) => (
                <tr key={rule.stage} className="hover:bg-[#FFFBF7] transition-colors">
                  <td className="px-5 py-4 font-medium text-[#1A1A2E]">{rule.stage}</td>
                  <td className="px-5 py-4 text-[#5A5A6E]">{rule.physical}</td>
                  <td className="px-5 py-4 text-[#5A5A6E]">{rule.digital}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Return Process */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#1A1A2E] mb-5 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <RotateCcw size={22} className="text-[#F26522]" />
          Return Process for Physical Products
        </h2>
        <div className="space-y-4">
          {[
            { title: 'Initiate Return', desc: 'Contact us within 7 days of delivery via email (brarscribbles@gmail.com) or WhatsApp (+91-84279-76607) with your order number and photos of the issue (if damaged/defective).' },
            { title: 'Return Approval', desc: 'Our team will review your request within 24-48 hours. If approved, we will provide you with a return address and instructions.' },
            { title: 'Ship the Product', desc: 'Pack the product securely in its original packaging and ship it to the provided address. We recommend using a trackable shipping service.' },
            { title: 'Inspection', desc: 'Once we receive the returned product, we will inspect it to verify the issue and ensure it meets our return criteria.' },
            { title: 'Refund or Replacement', desc: 'After successful inspection, we will process a full refund to your original payment method or arrange a replacement, as per your preference.' },
          ].map((step, i) => (
            <div key={step.title} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[#E8E4E0] hover:shadow-md transition-shadow">
              <div className="w-9 h-9 bg-[#FFF0E8] rounded-lg flex items-center justify-center text-[#F26522] font-bold text-sm shrink-0">
                {i + 1}
              </div>
              <div>
                <h4 className="font-medium text-[#1A1A2E] mb-1">{step.title}</h4>
                <p className="text-sm text-[#5A5A6E] leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Refund Timeline */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#1A1A2E] mb-5 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <CreditCard size={22} className="text-[#F26522]" />
          Refund Processing Timeline
        </h2>
        <div className="relative">
          <div className="hidden md:block absolute top-6 left-0 right-0 h-0.5 bg-[#E8E4E0]" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {refundTimeline.map((item, i) => (
              <div key={item.step} className="relative text-center">
                <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 relative z-10 ${i === refundTimeline.length - 1 ? 'bg-green-500 text-white' : 'bg-[#FFF0E8] text-[#F26522]'}`}>
                  <item.icon size={20} />
                </div>
                <h4 className="font-medium text-xs text-[#1A1A2E]">{item.step}</h4>
                <p className="text-[10px] text-[#9A9AAA] mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Non-Returnable Items */}
      <div className="p-5 bg-red-50 rounded-xl border border-red-200 mb-8">
        <div className="flex items-start gap-3">
          <AlertTriangle size={20} className="text-red-600 shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-800 mb-2 text-sm">Non-Returnable Items</h3>
            <p className="text-xs text-red-700 leading-relaxed">
              The following items cannot be returned or refunded: (1) Digital products (PDFs) once delivered, (2) Products damaged due to customer misuse, (3) Products without original packaging, (4) Items purchased during flash sales marked as &quot;Final Sale&quot;, (5) Personalized or custom-made products.
            </p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="p-6 bg-[#FFFBF7] rounded-xl border border-[#E8E4E0]">
        <h3 className="font-semibold text-[#1A1A2E] mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Need Help with a Return?
        </h3>
        <p className="text-sm text-[#5A5A6E] leading-relaxed mb-4">
          Our customer support team is here to help you with any cancellation or return queries. Contact us through any of the following channels:
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="mailto:brarscribbles@gmail.com" className="inline-flex items-center gap-2 bg-[#F26522] hover:bg-[#E55512] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
            <MessageCircle size={15} />
            Email Support
          </a>
          <a href="https://wa.me/918427976607" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
            WhatsApp Support
          </a>
          <a href="tel:+918427976607" className="inline-flex items-center gap-2 bg-[#1A1A2E] hover:bg-[#2a2a3e] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Call Us
          </a>
        </div>
      </div>
    </PolicyLayout>
  );
}
