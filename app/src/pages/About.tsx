import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ShoppingBag, PlayCircle, Heart, Target, Lightbulb, Users, ArrowRight, Quote } from 'lucide-react';
import PageHero from '@/components/PageHero';

const features = [
  {
    icon: BookOpen,
    title: 'Creative Study Material',
    desc: 'Colorful, memorable, eye-catching notes designed to make concepts stick. Our hand-illustrated study materials transform boring subjects into visual stories.',
  },
  {
    icon: ShoppingBag,
    title: 'Science Merchandise',
    desc: 'Mugs, apparel, gifts and accessories that celebrate science. Show your love for STEM with our unique, science-inspired products.',
  },
  {
    icon: PlayCircle,
    title: 'Educational Videos',
    desc: 'YouTube channel with animated science explainers and study tips. Free learning resources for students everywhere.',
  },
];

const values = [
  { icon: Heart, title: 'Passion for Teaching', desc: 'Every resource is crafted with genuine love for education and student success.' },
  { icon: Lightbulb, title: 'Creative Innovation', desc: 'We blend art with science to create learning tools that are both beautiful and effective.' },
  { icon: Users, title: 'Student First', desc: 'Designed by a teacher who understands what students truly need to excel.' },
  { icon: Target, title: 'Concept Clarity', desc: 'Complex topics simplified through visual storytelling and engaging design.' },
];

const milestones = [
  { year: '2018', title: 'Brar Scribbles Born', desc: 'Started as a passion project combining art and science teaching.' },
  { year: '2019', title: 'YouTube Channel', desc: 'Launched educational video content reaching thousands of students.' },
  { year: '2020', title: 'Online Shop Launch', desc: 'Opened our e-commerce store with science merchandise and study materials.' },
  { year: '2023', title: 'Growing Community', desc: 'Built a thriving community of science lovers and learners worldwide.' },
];

export default function About() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <PageHero
        title="About Us"
        subtitle="Where art meets science — creating educational resources that inspire curiosity and make learning unforgettable"
        backgroundImage="/images/hero-about.jpg"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'About' },
        ]}

      />

      {/* Author Section */}
      <section className="bg-[#FFFBF7] py-16 md:py-20">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-14">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/2"
            >
              <span className="text-[#F26522] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
                About the Author
              </span>
              <h2 className="text-3xl md:text-[40px] font-bold text-[#1A1A2E] mt-2 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Hi, I'm JP Brar!
              </h2>
              <p className="text-lg text-[#5A5A6E] mt-2 font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Teacher by Profession &amp; Artist by Passion
              </p>
              <div className="mt-5 space-y-4 text-[#5A5A6E] leading-relaxed">
                <p>
                  I'm the author and illustrator of Brar Scribbles. After completing my Master's degree in Engineering from Thapar University, Patiala, I got the chance to work as Assistant Professor in various reputed universities. That is where I have developed love and passion for teaching. Now I am running my own educational institute (WHITEHAWK ACADEMY) and it is one of its own kind.
                </p>
                <p>
                  I love communicating science and always try to bring new, creative, engaging, fun, and interactive tools to help students for better subject understanding. Also, I was fond of sketching &amp; art since my childhood. So, with love for the ART &amp; passion for TEACHING, I combined the two and BRAR SCRIBBLES was born. It is an awesome blend of art and science, creating a unique way to communicate science and cultivate curiosity among the learners.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 mt-6 bg-[#F26522] hover:bg-[#E55512] text-white px-6 py-3 rounded-lg font-semibold text-sm transition-colors group"
              >
                Contact Me
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full md:w-1/2"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-[#F26522]/20 to-[#F26522]/5 rounded-2xl -rotate-3" />
                <img
                  src="/images/author-exact.jpg"
                  alt="JP Brar - Author and Illustrator of Brar Scribbles"
                  className="relative w-full max-w-[500px] mx-auto rounded-xl shadow-lg object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Speciality */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <span className="text-[#F26522] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
              What We Do
            </span>
            <h2 className="text-3xl md:text-[32px] font-bold text-[#1A1A2E] mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Our Speciality
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-[#5A5A6E] max-w-[800px] mx-auto leading-relaxed mb-12"
          >
            Brar Scribbles is an online shop that celebrates science &amp; helps to promote diversity in science, technology, engineering &amp; math (STEM). Our aim is to demystify Science by creating easy, interactive and enjoyable Learning Resources (such as colorful and memorable eye-catching notes, science toys &amp; activity kits, flashcards, creative folders, educational comics/cartoons, mnemonics/tips, etc.), educational YouTube videos, science inspired mugs/apparel/gifts/art, sharing ideas &amp; more!! We love to add an artistic twist to conventional forms of teaching-learning resources with aim to make science visual, funny and engaging.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-[#FFFBF7] rounded-2xl p-8 text-center group hover:shadow-[0_8px_30px_rgba(242,101,34,0.12)] transition-shadow duration-300"
              >
                <div className="w-14 h-14 bg-[#FFF0E8] rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <f.icon size={28} className="text-[#F26522]" />
                </div>
                <h3 className="font-semibold text-lg text-[#1A1A2E] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {f.title}
                </h3>
                <p className="text-sm text-[#5A5A6E] leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-20 bg-[#FFFBF7]">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-[#F26522] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Principles
            </span>
            <h2 className="text-3xl md:text-[32px] font-bold text-[#1A1A2E] mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Our Core Values
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-[0_2px_12px_rgba(26,26,46,0.04)] hover:shadow-[0_8px_24px_rgba(26,26,46,0.08)] transition-shadow"
              >
                <div className="w-12 h-12 bg-[#FFF0E8] rounded-xl flex items-center justify-center mb-4">
                  <v.icon size={22} className="text-[#F26522]" />
                </div>
                <h3 className="font-semibold text-[#1A1A2E] mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{v.title}</h3>
                <p className="text-sm text-[#5A5A6E] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline / Milestones */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="text-[#F26522] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Journey
            </span>
            <h2 className="text-3xl md:text-[32px] font-bold text-[#1A1A2E] mt-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Our Story
            </h2>
          </motion.div>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#E8E4E0] -translate-x-1/2" />
            <div className="space-y-8 md:space-y-0">
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`relative md:flex md:items-center md:gap-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} ${i > 0 ? 'md:mt-8' : ''}`}
                >
                  <div className={`md:w-1/2 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className={`bg-[#FFFBF7] rounded-xl p-5 inline-block ${i % 2 === 0 ? 'md:ml-auto' : ''}`}>
                      <span className="text-[#F26522] font-bold text-lg">{m.year}</span>
                      <h3 className="font-semibold text-[#1A1A2E] mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>{m.title}</h3>
                      <p className="text-sm text-[#5A5A6E] mt-1">{m.desc}</p>
                    </div>
                  </div>
                  {/* Timeline dot */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-[#F26522] rounded-full border-4 border-white shadow-md items-center justify-center z-10" />
                  <div className="md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-20 bg-[#1A1A2E] relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#F26522]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#F26522]/5 rounded-full blur-3xl" />
        <div className="max-w-[700px] mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Quote size={36} className="text-[#F26522]/40 mx-auto mb-4" />
            <span className="text-[#F26522] font-semibold text-sm uppercase tracking-wider" style={{ fontFamily: 'Poppins, sans-serif' }}>
              Mission
            </span>
            <blockquote className="text-2xl md:text-[32px] font-bold text-white italic leading-snug mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
              "Cultivating curiosity and celebrating science."
            </blockquote>
            <div className="w-16 h-[3px] bg-[#F26522] mx-auto mt-6 mb-6 rounded-full" />
            <p className="text-white/70 leading-relaxed">
              Our endeavor is to bring to you the best collection of products &amp; services on a continuing basis and we hope they allow you to see science in a new light.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
