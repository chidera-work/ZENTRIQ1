
import React from 'react';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="pt-40 pb-20 bg-navy-dark transition-colors duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-24 animate-fade-in-up">
          <div className="inline-block text-apexRed font-black uppercase tracking-[0.3em] text-[10px] mb-6">Global Logistics Matrix</div>
          <h1 className="text-5xl md:text-7xl font-heading font-black text-main mb-8 tracking-tighter">
            Core <span className="text-gradient">Capabilities.</span>
          </h1>
          <p className="text-muted text-xl font-light max-w-3xl mx-auto leading-relaxed">
            From hyper-local transit to interstellar-scale supply chain management, we provide the infrastructure for total global commerce.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
          {SERVICES.map((s, i) => (
            <div key={i} className="glass p-12 rounded-[3rem] border border-main/5 transition-all group premium-card shadow-premium flex flex-col">
               <div className="flex flex-col lg:flex-row items-start gap-10 flex-grow">
                  <div className="w-24 h-24 bg-main/5 flex-shrink-0 flex items-center justify-center rounded-[2rem] shadow-elevated group-hover:bg-apexRed transition-all duration-500">
                    <i className={`fa-solid ${s.icon} text-4xl text-apexRed group-hover:text-white`}></i>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-3xl font-black text-main mb-6 tracking-tight">{s.title}</h3>
                    <p className="text-muted leading-relaxed mb-8 font-medium">
                      {s.description} Deployed via a network of Tier-1 carriers and precision route-optimization algorithms.
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                       {s.features?.map((feat, j) => (
                         <li key={j} className="text-main/50 text-[10px] font-black uppercase tracking-widest flex items-center group/feat">
                            <div className="w-8 h-8 rounded-lg bg-main/10 flex items-center justify-center mr-4 text-apexRed opacity-50 group-hover/feat:opacity-100 transition-opacity">
                              <i className={`fa-solid ${feat.icon} text-[11px]`}></i>
                            </div>
                            {feat.text}
                         </li>
                       ))}
                    </ul>
                    <Link 
                      to={`/services/${s.slug}`}
                      className="inline-flex items-center text-apexRed font-black uppercase tracking-widest text-[11px] hover:gap-6 transition-all group/link"
                    >
                      View Technical Specs 
                      <i className="fa-solid fa-arrow-right ml-3 transform group-hover/link:translate-x-2 transition-transform"></i>
                    </Link>
                  </div>
               </div>
            </div>
          ))}
        </div>

        <div className="bg-navy-panel rounded-[4rem] p-16 md:p-24 text-center relative overflow-hidden shadow-elevated">
           <div className="absolute top-0 right-0 opacity-5 -translate-y-1/4 translate-x-1/4 animate-float">
              <i className="fa-solid fa-earth-americas text-[30rem] text-main"></i>
           </div>
           <div className="relative z-10">
             <h2 className="text-4xl md:text-6xl font-heading font-black text-main mb-10 tracking-tighter">Initiate Global Freight?</h2>
             <p className="text-main/40 text-xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">Secure a mission-critical quote within 30 minutes for any volume, any destination.</p>
             <div className="flex flex-col sm:flex-row justify-center gap-8">
                <Link to="/contact" className="bg-apexRed text-white px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:bg-neonRed transition-all shadow-2xl">Request Manifest</Link>
                <Link to="/track" className="glass text-main px-12 py-6 rounded-[2.5rem] font-black uppercase tracking-widest text-xs hover:bg-main/10 transition-all border border-main/10">Analyze Network</Link>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
