import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, BookOpen, ShoppingCart, CreditCard, Truck, RotateCcw, GraduationCap } from 'lucide-react';
import PolicyLayout from '@/components/PolicyLayout';

interface FaqItemData {
  question: string;
  answer: string;
}

interface FaqCategory {
  name: string;
  icon: typeof BookOpen;
  items: FaqItemData[];
}

const faqCategories: FaqCategory[] = [
  {
    name: 'General Questions',
    icon: BookOpen,
    items: [
      { question: 'What is Brar Scribbles?', answer: 'Brar Scribbles is an online store that celebrates science and helps promote diversity in STEM. We offer creative science study materials including colorful formula sheets, synopsis notes, educational posters, science-inspired merchandise like mugs and apparel, and educational YouTube content. Our products are designed by JP Brar, a teacher by profession and artist by passion.' },
      { question: 'Who is JP Brar?', answer: 'JP Brar is the founder, author, and illustrator of Brar Scribbles. After completing his Masters degree in Engineering from Thapar University, Patiala, he worked as an Assistant Professor at various reputed universities. He now runs WHITEHAWK ACADEMY and combines his love for art and passion for teaching through Brar Scribbles.' },
      { question: 'Are your study materials suitable for competitive exams?', answer: 'Yes! Our formula sheets and synopsis notes are specifically designed to help students preparing for CBSE board exams, JEE, NEET, and other competitive examinations. The colorful, visual approach helps with quick revision and better retention of concepts.' },
      { question: 'How can I access your free educational content?', answer: 'You can subscribe to our YouTube channel "Brar Scribbles" for free animated science explainers, study tips, and creative learning resources. We also share free tips and educational content on our social media channels including Instagram, Facebook, and Twitter.' },
    ],
  },
  {
    name: 'Orders & Products',
    icon: ShoppingCart,
    items: [
      { question: 'How do I place an order?', answer: 'You can browse our shop, select the products you want, add them to your cart, and proceed to checkout. You will need to create an account or log in to complete your purchase. Follow the on-screen instructions to enter your shipping details and make payment.' },
      { question: 'What types of products do you sell?', answer: 'We sell a variety of products including: (1) Digital Study Materials - Physics, Chemistry & Biology formula sheets and synopsis notes as PDF downloads, (2) Physical Products - Science-inspired mugs, apparel, posters, stickers, keychains, plushies, and acrylic blocks, (3) Science Toys & Activity Kits - STEM educational toys and learning kits.' },
      { question: 'Can I get your notes on Amazon?', answer: 'Yes! Selected Brar Scribbles study notes and products are available on Amazon India. You can search for "Brar Scribbles" on Amazon. However, our complete collection is available exclusively on our website brarscribbles.com.' },
      { question: 'Do you offer bulk orders for schools or coaching institutes?', answer: 'Absolutely! We offer special discounts for bulk orders from schools, coaching centers, and educational institutions. Please contact us through the contact form or WhatsApp at +91-84279-76607 with your requirements for a customized quote.' },
    ],
  },
  {
    name: 'Payment',
    icon: CreditCard,
    items: [
      { question: 'What payment methods do you accept?', answer: 'We accept multiple secure payment methods including: UPI (Google Pay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, RuPay), Net Banking, and Wallets. All payments are processed through secure, encrypted gateways.' },
      { question: 'Is my payment information secure?', answer: 'Yes, your payment information is 100% secure. We use industry-standard SSL encryption and do not store your card or banking details. All transactions are processed through PCI-DSS compliant payment gateways.' },
      { question: 'Do you offer Cash on Delivery (COD)?', answer: 'Currently, we do not offer Cash on Delivery. All orders must be prepaid through our secure online payment system. This helps us process your orders faster and maintain quality service.' },
    ],
  },
  {
    name: 'Shipping & Delivery',
    icon: Truck,
    items: [
      { question: 'How long does delivery take?', answer: 'Digital products (PDF notes) are delivered instantly to your registered email after payment confirmation. Physical products are delivered within 5-7 business days across India. Delivery to remote areas may take 1-2 additional days.' },
      { question: 'What are the shipping charges?', answer: 'Shipping charges are calculated at checkout based on your location and order weight. We offer free shipping on orders above Rs. 499. Digital products have no shipping charges as they are delivered via email.' },
      { question: 'How can I track my order?', answer: 'Once your order is shipped, you will receive a tracking number via email and SMS. You can use this number to track your package on our website through the "Track Your Order" link or directly on the courier partner website.' },
      { question: 'Do you ship outside India?', answer: 'Currently, we only ship physical products within India. However, our digital products (PDF study notes) can be purchased and downloaded from anywhere in the world.' },
    ],
  },
  {
    name: 'Returns & Refunds',
    icon: RotateCcw,
    items: [
      { question: 'What is your refund policy for digital products?', answer: 'Due to the digital nature of our study materials (PDFs), we do not offer refunds once the download link has been delivered. Please review the product description carefully before purchasing. If you face any technical issues, contact us for support.' },
      { question: 'Can I return physical products?', answer: 'Physical products can be returned within 7 days of delivery if they are damaged, defective, or incorrect. The product must be unused and in original packaging. Please contact us with photos of the issue to initiate a return.' },
      { question: 'How do I cancel my order?', answer: 'Orders can be cancelled within 24 hours of placing them, provided they have not been shipped. Digital product orders cannot be cancelled once the download link has been sent. Contact us immediately at brarscribbles@gmail.com or +91-84279-76607 for cancellation requests.' },
    ],
  },
  {
    name: 'Education & Content',
    icon: GraduationCap,
    items: [
      { question: 'Which classes are your study materials for?', answer: 'Our study materials cover Physics, Chemistry, and Biology for Classes 9, 10, 11, and 12 (CBSE). We offer formula sheets, synopsis notes, and topic-specific guides for each subject and class level.' },
      { question: 'Can I request a specific topic to be covered?', answer: 'Yes! We love hearing from students about what they need. You can suggest topics through our contact form or social media. If there is enough demand, we may create study materials for requested topics.' },
      { question: 'Do you offer online tutoring?', answer: 'JP Brar runs WHITEHAWK ACADEMY which offers educational services. For online tutoring and course inquiries, please contact us directly through the contact form or WhatsApp.' },
    ],
  },
];

const allFaqs: FaqItemData[] = faqCategories.flatMap((c) => c.items);

function AccordionItem({ item, index }: { item: FaqItemData; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-[#E8E4E0] rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-5 text-left hover:bg-[#FFFBF7] transition-colors">
        <span className="w-9 h-9 bg-[#FFF0E8] text-[#F26522] rounded-lg flex items-center justify-center text-sm font-bold shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-medium text-[#1A1A2E] flex-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{item.question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="text-[#9A9AAA]" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
            <div className="px-5 pb-5 pl-[72px]">
              <p className="text-[#5A5A6E] text-sm leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQs() {
  return (
    <PolicyLayout
      title="Frequently Asked Questions"
      subtitle="Find answers to common questions about our products, shipping, payments, and more."
      description="Find answers to frequently asked questions about Brar Scribbles study materials, science merchandise, shipping, payments, returns, and more."
      keywords="Brar Scribbles FAQ, science study materials FAQ, shipping policy, payment methods, refund policy, order tracking, bulk orders"
      faqSchema={allFaqs}
      heroGradient="from-[#1A1A2E] via-[#1e1e3a] to-[#F26522]/20"
    >
      <div className="space-y-10">
        {faqCategories.map((cat) => (
          <div key={cat.name}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#FFF0E8] rounded-xl flex items-center justify-center">
                <cat.icon size={20} className="text-[#F26522]" />
              </div>
              <h2 className="text-xl font-bold text-[#1A1A2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>
                {cat.name}
              </h2>
            </div>
            <div className="space-y-3">
              {cat.items.map((item, i) => {
                const globalIndex = faqCategories.slice(0, faqCategories.indexOf(cat)).reduce((acc, c) => acc + c.items.length, 0) + i;
                return (
                  <AccordionItem key={item.question} item={item} index={globalIndex} />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Still Have Questions */}
      <div className="mt-10 p-6 bg-gradient-to-r from-[#FFF0E8] to-white rounded-xl border border-[#F26522]/10 text-center">
        <h3 className="font-semibold text-[#1A1A2E] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          Still have questions?
        </h3>
        <p className="text-sm text-[#5A5A6E] mb-4">
          Our team is happy to help! Reach out to us directly.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="mailto:brarscribbles@gmail.com" className="inline-flex items-center gap-2 bg-[#F26522] hover:bg-[#E55512] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
            Email Us
          </a>
          <a href="https://wa.me/918427976607" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors">
            WhatsApp
          </a>
        </div>
      </div>
    </PolicyLayout>
  );
}
