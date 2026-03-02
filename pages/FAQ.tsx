
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FAQ: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    { q: "How do I track my active consignment?", a: "Access the 'Track Telemetry' portal using your unique Protocol ID. This ID provides a direct telemetry link to our global security monitoring network." },
    { q: "What sectors of the globe do you cover?", a: "Our infrastructure spans over 190 countries, with elite security hubs operating in New York, London, Singapore, and Dubai." },
    { q: "Are you equipped for sensitive asset transport?", a: "Yes, our Secure Protocol division manages HazMat, pharmaceutical-grade refrigeration, and high-value asset protection with specialized armored fleet encryption." },
    { q: "What is the expected latency for Secure Air Freight?", a: "Global express air transit typically resolves within 2-5 business days, including priority security clearance and armored transfer." },
    { q: "Do you provide off-grid vaulting?", a: "Zentriq Logistics offers high-security, biometrically encrypted vaulting and fulfillment infrastructure across all major global transit sectors." }
  ];

  return (
    <div className="pt-40 pb-20 max-w-5xl mx-auto px-6 bg-white dark:bg-navy-dark transition-colors duration-500 min-h-screen">
      <div className="text-center mb-24 animate-fade-in-up">
        <div className="inline-block text-apexRed font-black uppercase tracking-[0.3em] text-[10px] mb-6">Intelligence Repository</div>
        <h1 className="text-5xl md:text-7xl font-heading font-black text-navy dark:text-white mb-8 tracking-tighter leading-[0.9]">
          System <span className="text-apexRed italic">Intelligence.</span>
        </h1>
        <p className="text-slate dark:text-slate/40 text-xl font-light max-w-2xl mx-auto">Access the comprehensive knowledge base for global security and logistics protocols.</p>
      </div>

      <div className="space-y-6 max-w-4xl mx-auto animate-fade-in-up">
        {faqs.map((faq, idx) => (
          <div key={idx} className={`glass rounded-[2rem] overflow-hidden border border-navy/5 dark:border-white/5 transition-all duration-500 premium-card ${openIdx === idx ? 'shadow-elevated dark:shadow-premium-dark' : 'shadow-sm'}`}>
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className={`w-full px-10 py-8 flex justify-between items-center text-left transition-colors ${openIdx === idx ? 'bg-ghost dark:bg-white/5' : 'hover:bg-ghost dark:hover:bg-white/5'}`}
            >
              <span className={`font-black text-xl tracking-tight transition-colors ${openIdx === idx ? 'text-apexRed' : 'text-navy dark:text-white'}`}>{faq.q}</span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${openIdx === idx ? 'bg-apexRed text-white rotate-180' : 'bg-ghost dark:bg-white/10 text-slate'}`}>
                <i className="fa-solid fa-chevron-down text-xs"></i>
              </div>
            </button>
            <div className={`px-10 overflow-hidden transition-all duration-500 ease-in-out ${openIdx === idx ? 'max-h-[300px] pb-10 opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="pt-4 border-t border-navy/5 dark:border-white/5">
                <p className="text-slate dark:text-slate/40 text-lg leading-relaxed font-medium">{faq.a}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-32 glass p-16 md:p-24 rounded-[4rem] text-center shadow-elevated dark:shadow-elevated-dark premium-card border border-navy/5 dark:border-white/5">
        <h3 className="text-4xl font-black text-navy dark:text-white mb-6 tracking-tighter">Direct Nexus Support</h3>
        <p className="text-slate dark:text-slate/40 text-xl mb-12 font-light max-w-xl mx-auto leading-relaxed">Our strategic command team is available 24/7 for mission-critical inquiries.</p>
        <Link 
          to="/contact"
          className="inline-block bg-apexRed text-white px-16 py-6 rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-xs hover:scale-105 transition-all shadow-apex"
        >
          Establish Priority Connection
        </Link>
      </div>
    </div>
  );
};

export default FAQ;
