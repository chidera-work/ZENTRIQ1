
import React, { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { SERVICES } from '../constants';
import Logo from '../components/Logo';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!service) {
    return <Navigate to="/services" />;
  }

  return (
    <div className="pt-24 md:pt-40 pb-20 bg-navy-dark min-h-screen relative overflow-hidden">
      {/* Blueprint Grid Background */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <Link to="/services" className="inline-flex items-center gap-4 text-white/40 hover:text-apexRed transition-all uppercase font-black tracking-widest text-[10px] mb-12 group">
          <i className="fa-solid fa-arrow-left group-hover:-translate-x-2 transition-transform"></i>
          Return to Matrix
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-24 items-start">
          
          {/* Main Content Column */}
          <div className="lg:col-span-7 animate-reveal">
            <div className="inline-flex items-center gap-4 mb-8">
               <div className="w-16 h-16 bg-apexRed rounded-2xl flex items-center justify-center text-white shadow-apex">
                 <i className={`fa-solid ${service.icon} text-2xl`}></i>
               </div>
               <div>
                 <span className="text-apexRed font-black uppercase tracking-[0.4em] text-[9px]">Technical Specification // ZENTRIQ-{service.slug.toUpperCase()}</span>
                 <h1 className="text-5xl md:text-8xl font-heading font-black text-white tracking-tighter leading-none mt-2">
                   {service.title.split(' ')[0]} <br />
                   <span className="text-apexRed italic">{service.title.split(' ').slice(1).join(' ')}</span>
                 </h1>
               </div>
            </div>

            <p className="text-slate/60 text-xl md:text-2xl font-light leading-relaxed mb-16 max-w-2xl border-l-4 border-apexRed/20 pl-10 italic">
              "{service.description} Engineered for zero-compromise asset delivery within global supply nexus vectors."
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-16">
               {service.features?.map((feat, idx) => (
                 <div key={idx} className="glass p-8 rounded-3xl border-white/5 group hover:border-apexRed/30 transition-all">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-apexRed mb-6 group-hover:scale-110 transition-transform">
                      <i className={`fa-solid ${feat.icon} text-lg`}></i>
                    </div>
                    <h4 className="text-white font-black text-lg mb-2 tracking-tight uppercase">{feat.text}</h4>
                    <p className="text-slate/40 text-xs font-medium uppercase tracking-widest">Protocol ID: VX-{idx + 100}</p>
                 </div>
               ))}
            </div>

            <div className="glass p-12 rounded-[3rem] border-white/5 bg-navy-panel/20 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-10 opacity-[0.03] rotate-12">
                 <Logo iconOnly className="h-64" />
               </div>
               <h3 className="text-2xl font-black text-white mb-8 tracking-tighter flex items-center gap-4">
                 <i className="fa-solid fa-list-check text-apexRed opacity-40"></i>
                 Operational Directive
               </h3>
               <p className="text-slate/60 text-sm leading-relaxed mb-8 relative z-10">
                 All deployments under the {service.title} protocol are managed by our Global Command Center. Every node in the transit chain is verified against the SHA-256 integrity matrix before asset release.
               </p>
               <Link to="/contact" className="inline-flex bg-apexRed text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-apex hover:scale-105 active:scale-95 transition-all">
                  Initiate Secure Quote
               </Link>
            </div>
          </div>

          {/* Technical Specs Sidebar */}
          <div className="lg:col-span-5 animate-reveal delay-300">
             <div className="glass rounded-[3rem] p-10 md:p-14 border-white/10 shadow-elevated-dark sticky top-40 bg-navy-dark/60">
                <div className="flex items-center justify-between mb-12 border-b border-white/5 pb-8">
                   <h2 className="text-2xl font-black text-white tracking-tighter uppercase">Tactical Specs</h2>
                   <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">Verified</span>
                   </div>
                </div>

                <div className="space-y-10">
                   {Object.entries(service.technicalSpecs).map(([key, val], i) => (
                     <div key={i} className="flex flex-col gap-2">
                        <span className="text-slate/40 text-[9px] font-black uppercase tracking-[0.4em]">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <div className="flex items-baseline justify-between group">
                           <span className="text-xl font-mono font-black text-white group-hover:text-apexRed transition-colors uppercase tracking-tight">{val as string}</span>
                           <div className="flex-grow mx-4 h-px bg-white/5 group-hover:bg-apexRed/20 transition-all"></div>
                           <i className="fa-solid fa-microchip text-[10px] text-white/10 group-hover:text-apexRed/40"></i>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="mt-16 pt-10 border-t border-white/5">
                   <div className="flex items-center gap-6 mb-8">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-apexRed">
                         <i className="fa-solid fa-shield-virus"></i>
                      </div>
                      <div>
                         <p className="text-white font-black text-xs uppercase tracking-tight">Encryption Active</p>
                         <p className="text-slate/40 text-[9px] font-bold uppercase">End-to-End Integrity</p>
                      </div>
                   </div>
                   <div className="h-2 w-full bg-navy-dark rounded-full overflow-hidden">
                      <div className="h-full bg-apexRed w-[92%] animate-[scan_2s_linear_infinite]"></div>
                   </div>
                </div>
             </div>

             <div className="mt-8 glass p-8 rounded-[2rem] border-white/5 text-center">
                <p className="text-slate/40 text-[8px] font-black uppercase tracking-[0.5em] mb-4 leading-relaxed">
                   Authorized Document // ZENTRIQ GLOBAL SECURITY NETWORK <br />
                   UUID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </p>
                <div className="flex justify-center gap-4 opacity-20">
                   <i className="fa-solid fa-barcode text-4xl"></i>
                   <i className="fa-solid fa-qrcode text-4xl"></i>
                </div>
             </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
};

export default ServiceDetail;
