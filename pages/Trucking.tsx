
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';

const Trucking: React.FC = () => {
  return (
    <div className="pt-24 pb-20 bg-white dark:bg-navy-dark transition-colors duration-500 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section with Branded Fleet Overlay */}
        <div className="relative rounded-[4rem] overflow-hidden min-h-[600px] flex items-center mb-32 shadow-elevated dark:shadow-elevated-dark group">
           {/* Main Hero Image */}
           <img 
             src="https://lh3.googleusercontent.com/d/1sItrXuiw9rxhr3c_80kC5BuSk9NxMtnh" 
             className="absolute inset-0 w-full h-full object-cover brightness-50 dark:brightness-[0.4] group-hover:scale-110 transition-transform duration-[10s]" 
             alt="Zentriq Armored Fleet" 
           />
           
           {/* Fleet Branded Decal Overlay */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none group-hover:opacity-70 transition-opacity duration-1000">
              <div className="flex flex-col items-center">
                 <div className="p-10 glass rounded-[3rem] border-white/20 backdrop-blur-sm scale-90 md:scale-100">
                    <Logo iconOnly className="h-40 md:h-56 drop-shadow-2xl" />
                 </div>
                 <h2 className="text-white font-black text-3xl md:text-5xl tracking-tighter uppercase mt-8 drop-shadow-lg">ZENTRIQ LOGISTICS FLEET</h2>
                 <p className="text-apexRed font-black text-[10px] md:text-xs tracking-[0.6em] uppercase mt-2">Mobile Defense Unit // Active</p>
              </div>
           </div>

           <div className="absolute inset-0 bg-gradient-to-r from-navy dark:from-navy-dark via-transparent to-transparent opacity-80"></div>
           <div className="relative z-10 px-12 md:px-24 max-w-3xl animate-fade-in-up">
              <div className="inline-block text-apexRed font-black uppercase tracking-[0.3em] text-[10px] mb-8 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-apexRed animate-pulse"></span>
                Ground Logistics Division
              </div>
              <h1 className="text-6xl md:text-8xl font-heading font-black text-white mb-8 leading-[0.9] tracking-tighter">Armored <br /><span className="text-apexRed italic">Haulage.</span></h1>
              <p className="text-white/60 text-xl leading-relaxed font-light mb-12">
                Our high-performance armored fleet deploys advanced telematics and route-synthesis to provide unbreakable ground logistics infrastructure for high-value assets.
              </p>
              <div className="flex gap-4">
                <Link to="/track" className="bg-apexRed text-white px-8 py-5 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-apex hover:scale-105 transition-all">
                  Track Fleet Unit
                </Link>
                <Link to="/contact" className="glass text-white px-8 py-5 rounded-xl font-black uppercase tracking-widest text-[10px] border border-white/10 hover:bg-white/5 transition-all">
                  Request Armored Escort
                </Link>
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-40">
           {[
             { title: 'Secure FTL Protocol', icon: 'fa-truck-field', desc: 'Exclusive armored payload capacity for high-volume enterprise transit requirements.' },
             { title: 'Protected LTL Matrix', icon: 'fa-truck-moving', desc: 'Consolidated secure payload scaling for optimized cost-efficiency in sub-capacity loads.' },
             { title: 'Thermal-Transit', icon: 'fa-snowflake', desc: 'High-fidelity climate control for pharmaceutical and sensitive biological payloads within secure chassis.' }
           ].map((t, i) => (
             <div key={i} className="glass p-12 rounded-[3rem] border border-navy/5 dark:border-white/5 transition-all duration-500 premium-card shadow-premium dark:shadow-premium-dark group">
                <div className="w-20 h-20 bg-ghost dark:bg-white/5 flex items-center justify-center rounded-[2rem] text-apexRed text-3xl mb-10 group-hover:bg-apexRed group-hover:text-white transition-all shadow-elevated dark:shadow-premium-dark">
                  <i className={`fa-solid ${t.icon}`}></i>
                </div>
                <h3 className="text-2xl font-black text-navy dark:text-white mb-6 tracking-tight">{t.title}</h3>
                <p className="text-slate dark:text-slate/40 text-sm font-medium leading-relaxed">{t.desc}</p>
                <Link to="/contact" className="inline-block mt-8 text-apexRed font-black text-[9px] uppercase tracking-widest hover:gap-4 transition-all">
                  Inquire Protocol <i className="fa-solid fa-arrow-right ml-2"></i>
                </Link>
             </div>
           ))}
        </div>

        {/* Updated Section Without Image */}
        <div className="glass p-16 md:p-24 rounded-[4rem] shadow-elevated dark:shadow-elevated-dark border border-navy/5 dark:border-white/5 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
              <Logo iconOnly className="h-[400px]" />
           </div>
           
           <div className="max-w-4xl mx-auto relative z-10 text-center">
              <h2 className="text-4xl md:text-7xl font-black text-navy dark:text-white mb-10 tracking-tighter leading-none italic uppercase">Network <span className="text-apexRed">Intelligence.</span></h2>
              <p className="text-slate dark:text-slate/40 mb-16 leading-relaxed text-xl font-light">
                Every unit in the Zentriq Logistics fleet is equipped with advanced sensor arrays monitoring vector data, braking patterns, and atmospheric integrity. Our command hub maintains a 24/7 kinetic uplink to ensure total mission success.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                 {[
                   { label: '24/7 Command Center', icon: 'fa-headset' },
                   { label: 'Real-time GPS Stream', icon: 'fa-satellite' },
                   { label: 'ELD Cloud Sync', icon: 'fa-cloud-arrow-up' },
                   { label: 'Tier-1 Armed Escorts', icon: 'fa-user-shield' }
                 ].map((point, i) => (
                   <div key={i} className="flex flex-col items-center gap-4 bg-ghost dark:bg-white/5 p-8 rounded-[2rem] border border-navy/5 dark:border-white/5 hover:border-apexRed/20 transition-all group">
                      <div className="w-12 h-12 rounded-xl bg-apexRed/10 flex items-center justify-center text-apexRed group-hover:bg-apexRed group-hover:text-white transition-all shadow-inner">
                        <i className={`fa-solid ${point.icon}`}></i>
                      </div>
                      <span className="text-navy dark:text-white font-black text-[9px] uppercase tracking-widest">{point.label}</span>
                   </div>
                 ))}
              </div>

              <div className="mt-20">
                 <Link 
                   to="/contact" 
                   className="inline-block bg-apexRed text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-apex hover:scale-105 transition-all"
                 >
                   Establish Direct Command Link
                 </Link>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Trucking;
