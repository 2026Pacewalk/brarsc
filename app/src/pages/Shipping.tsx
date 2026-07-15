import PolicyLayout from '@/components/PolicyLayout';
import { Truck, Clock, Package, MapPin, CreditCard, Phone, AlertCircle, CheckCircle2 } from 'lucide-react';

const deliveryZones = [
  { zone: 'Metro Cities', cities: 'Delhi, Mumbai, Bangalore, Kolkata, Chennai, Hyderabad, Pune', time: '3-5 business days', shipping: 'Rs. 49 (Free above Rs. 499)' },
  { zone: 'Tier 2 Cities', cities: 'Jaipur, Lucknow, Chandigarh, Indore, Nagpur, Kochi, etc.', time: '4-6 business days', shipping: 'Rs. 49 (Free above Rs. 499)' },
  { zone: 'Rest of India', cities: 'All other cities and towns', time: '5-7 business days', shipping: 'Rs. 69 (Free above Rs. 499)' },
  { zone: 'Remote Areas', cities: 'North East, J&K, Himachal Pradesh, Uttarakhand', time: '7-10 business days', shipping: 'Rs. 99 (Free above Rs. 499)' },
];

const steps = [
  { icon: CheckCircle2, title: 'Order Placed', desc: 'You place your order and make payment' },
  { icon: Clock, title: 'Processing', desc: 'We process your order within 24 hours' },
  { icon: Package, title: 'Shipped', desc: 'Your order is packed and dispatched' },
  { icon: Truck, title: 'In Transit', desc: 'Your package is on its way to you' },
  { icon: MapPin, title: 'Delivered', desc: 'Your order arrives at your doorstep' },
];

export default function Shipping() {
  return (
    <PolicyLayout
      title="Shipping & Delivery"
      subtitle="Learn about our shipping methods, delivery timelines, charges, and tracking process."
      description="Brar Scribbles Shipping and Delivery Policy - Know about delivery timelines, shipping charges, order tracking, and delivery zones across India."
      keywords="Brar Scribbles shipping policy, delivery time, shipping charges, order tracking, free shipping, delivery zones, courier partners"
      lastUpdated="January 1, 2024"
      heroGradient="from-[#0c2028] via-[#143540] to-[#06b6d4]/20"
    >
      <div className="flex items-center gap-4 mb-8 pb-6 border-b border-[#E8E4E0]">
        <div className="w-14 h-14 bg-[#FFF0E8] rounded-2xl flex items-center justify-center">
          <Truck size={28} className="text-[#F26522]" />
        </div>
        <div>
          <p className="text-sm text-[#5A5A6E] leading-relaxed">
            We strive to deliver your orders as quickly and safely as possible. This page outlines our shipping methods, delivery timelines, charges, and tracking process for both physical and digital products.
          </p>
        </div>
      </div>

      {/* Digital Products */}
      <div className="mb-10 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle2 size={20} className="text-green-600" />
          </div>
          <h3 className="font-semibold text-lg text-green-800" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Digital Products - Instant Delivery
          </h3>
        </div>
        <p className="text-sm text-green-700 leading-relaxed">
          Our digital study materials (PDF formula sheets, synopsis notes) are delivered instantly to your registered email address after successful payment confirmation. No shipping charges apply to digital products. Download links are valid for 30 days from the date of purchase.
        </p>
      </div>

      {/* Delivery Timeline */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#1A1A2E] mb-5 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Clock size={22} className="text-[#F26522]" />
          Delivery Timeline
        </h2>

        {/* Steps */}
        <div className="relative">
          <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-[#E8E4E0]" />
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <div key={step.title} className="relative text-center">
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 ${i === 0 ? 'bg-[#F26522] text-white' : 'bg-[#FFF0E8] text-[#F26522]'}`}>
                  <step.icon size={24} />
                </div>
                <h4 className="font-medium text-sm text-[#1A1A2E]">{step.title}</h4>
                <p className="text-xs text-[#9A9AAA] mt-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delivery Zones Table */}
      <div className="mb-10">
        <h2 className="text-xl font-bold text-[#1A1A2E] mb-5 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <MapPin size={22} className="text-[#F26522]" />
          Delivery Zones & Charges
        </h2>
        <div className="overflow-x-auto rounded-xl border border-[#E8E4E0]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#1A1A2E] text-white">
                <th className="text-left px-5 py-3.5 font-medium">Zone</th>
                <th className="text-left px-5 py-3.5 font-medium">Cities</th>
                <th className="text-left px-5 py-3.5 font-medium">Delivery Time</th>
                <th className="text-left px-5 py-3.5 font-medium">Shipping Cost</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E4E0]">
              {deliveryZones.map((zone) => (
                <tr key={zone.zone} className="hover:bg-[#FFFBF7] transition-colors">
                  <td className="px-5 py-4 font-medium text-[#1A1A2E]">{zone.zone}</td>
                  <td className="px-5 py-4 text-[#5A5A6E]">{zone.cities}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 bg-[#FFF0E8] text-[#F26522] px-2.5 py-1 rounded-md text-xs font-medium">
                      <Clock size={12} />
                      {zone.time}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-[#5A5A6E]">{zone.shipping}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Shipping Policy Details */}
      <div className="space-y-8 mb-10">
        <div>
          <h3 className="font-semibold text-lg text-[#1A1A2E] mb-3 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Package size={18} className="text-[#F26522]" />
            Packaging
          </h3>
          <p className="text-sm text-[#5A5A6E] leading-relaxed">
            All physical products are carefully packaged to ensure they reach you in perfect condition. Study materials are shipped in protective sleeves or envelopes. Mugs and fragile items are wrapped in bubble wrap and packed in sturdy boxes. We use eco-friendly packaging materials wherever possible.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-[#1A1A2E] mb-3 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <Truck size={18} className="text-[#F26522]" />
            Courier Partners
          </h3>
          <p className="text-sm text-[#5A5A6E] leading-relaxed">
            We partner with reliable courier services including Delhivery, Blue Dart, India Post, and DTDC to ensure safe and timely delivery. The courier partner is selected based on your location and package size to provide the best delivery experience.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg text-[#1A1A2E] mb-3 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <CreditCard size={18} className="text-[#F26522]" />
            Free Shipping
          </h3>
          <p className="text-sm text-[#5A5A6E] leading-relaxed">
            We offer FREE standard shipping on all orders above Rs. 499. This applies to all delivery zones across India. Orders below Rs. 499 will be charged a nominal shipping fee based on the delivery zone (see table above). Free shipping is automatically applied at checkout when your cart total exceeds Rs. 499.
          </p>
        </div>
      </div>

      {/* Order Tracking */}
      <div className="p-6 bg-[#FFFBF7] rounded-xl border border-[#E8E4E0]">
        <h3 className="font-semibold text-lg text-[#1A1A2E] mb-3 flex items-center gap-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <Phone size={18} className="text-[#F26522]" />
          Order Tracking
        </h3>
        <p className="text-sm text-[#5A5A6E] leading-relaxed mb-4">
          Once your order is shipped, you will receive an email and SMS with your tracking number. You can use this number to track your package on our website or directly on the courier partner's website. If you have any issues with tracking, contact us at <a href="mailto:brarscribbles@gmail.com" className="text-[#F26522] hover:underline">brarscribbles@gmail.com</a> or <a href="tel:+918427976607" className="text-[#F26522] hover:underline">+91-84279-76607</a>.
        </p>
      </div>

      {/* Note */}
      <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200 flex items-start gap-3">
        <AlertCircle size={20} className="text-yellow-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-yellow-800 font-medium mb-1">Important Note</p>
          <p className="text-xs text-yellow-700 leading-relaxed">
            Delivery timelines are estimates and not guaranteed. We are not responsible for delays caused by courier partners, weather conditions, natural disasters, strikes, or other circumstances beyond our control. During sale periods and festivals, delivery may take 1-2 additional days.
          </p>
        </div>
      </div>
    </PolicyLayout>
  );
}
