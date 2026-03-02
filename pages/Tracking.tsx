import React, { useState } from 'react';
import { Shipment, ShipmentStatus } from '../types';
import { getServiceIcon } from '../constants';
import { supabase } from '../lib/supabase';

interface TrackingProps {
  shipments: Shipment[];
}

const Tracking: React.FC<TrackingProps> = ({ shipments }) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<Shipment | null>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.trim().toUpperCase();
    if (!cleanQuery) return;
    
    setIsSearching(true);
    setScanProgress(0);
    setResult(null);
    setError('');

    const interval = setInterval(() => {
      setScanProgress(prev => Math.min(prev + Math.floor(Math.random() * 20), 95));
    }, 100);
    
    try {
      const { data, error: sbError } = await supabase
        .from('shipments')
        .select(`*, updates:shipment_updates(*)`)
        .eq('trackingNumber', cleanQuery)
        .single();

      if (sbError || !data) throw new Error('NOT_FOUND');

      setScanProgress(100);
      setTimeout(() => {
        setResult(data as Shipment);
        setIsSearching(false);
        clearInterval(interval);
      }, 500);

    } catch (err: any) {
      clearInterval(interval);
      setTimeout(() => {
        setError(err.message === 'NOT_FOUND' ? 'ZENTRIQ_ERROR :: MANIFEST_NOT_FOUND' : 'ZENTRIQ_ERROR :: UPLINK_TIMEOUT');
        setIsSearching(false);
      }, 800);
    }
  };

  const getStatusColor = (status: ShipmentStatus) => {
    switch (status) {
      case ShipmentStatus.DELIVERED: return 'bg-green-500';
      case ShipmentStatus.DELAYED: return 'bg-apexRed';
      case ShipmentStatus.PENDING: return 'bg-blue-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div className="pt-32 pb-32 min-h-screen bg-navy-dark relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-full h-full bg-apexRed/[0.02] animate-pulse-slow"></div>

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="text-center mb-20 animate-reveal">
          <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter leading-none uppercase italic">
            Asset <span className="text-apexRed">Telemetry.</span>
          </h1>
          <p className="text-white/30 text-lg font-medium tracking-[0.1em] uppercase">Real-time intelligence feed for global consignments.</p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-24 animate-reveal">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-apexRed/10 rounded-[2.5rem] blur-lg opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
            <div className="relative bg-[#0A0F1E] p-2 rounded-[2.5rem] border border-white/10 shadow-2xl flex items-center overflow-hidden">
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="INPUT WAYBILL NUMBER..." 
                className="flex-grow bg-transparent border-none py-5 px-8 text-white font-mono text-xl outline-none placeholder:text-white/5 uppercase tracking-[0.1em]"
              />
              <button 
                type="submit"
                disabled={isSearching}
                className="bg-apexRed text-white w-16 h-16 rounded-full flex items-center justify-center shadow-apex hover:scale-105 active:scale-95 transition-all"
              >
                {isSearching ? <i className="fa-solid fa-spinner fa-spin text-xl"></i> : <i className="fa-solid fa-satellite-dish text-xl"></i>}
              </button>
            </div>
          </div>
          {isSearching && (
            <div className="mt-8 px-8 animate-reveal">
              <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-apexRed shadow-[0_0_10px_#A61A1A] transition-all duration-300" style={{ width: `${scanProgress}%` }}></div>
              </div>
              <p className="mt-3 text-[9px] font-mono text-apexRed uppercase tracking-[0.4em] text-center animate-pulse">Establishing Secure Uplink...</p>
            </div>
          )}
          {error && <p className="mt-8 text-center text-apexRed font-black uppercase tracking-[0.3em] text-[10px] animate-shake italic">{error}</p>}
        </form>

        {result && (
          <div className="space-y-10 animate-reveal">
            {/* Primary Dashboard */}
            <div className="relative bg-navy-panel rounded-[3rem] p-10 md:p-16 border-l-[12px] border-l-apexRed overflow-hidden shadow-elevated-dark">
              <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none translate-x-1/4">
                <i className="fa-solid fa-earth-americas text-[30rem]"></i>
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row justify-between gap-16">
                <div className="flex-grow">
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mb-3">Waybill ID</p>
                  <h2 className="text-4xl md:text-6xl font-black tracking-tighter font-mono mb-10">{result.trackingNumber}</h2>
                  
                  <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full w-fit mb-12">
                    <div className={`w-2.5 h-2.5 rounded-full ${getStatusColor(result.status)} animate-pulse shadow-lg`}></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{result.status}</span>
                  </div>

                  <div className="max-w-lg">
                    <div className="flex justify-between items-end mb-3">
                       <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Protocol Integrity</span>
                       <span className="text-3xl font-black">{result.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-5">
                      <div className="h-full bg-apexRed shadow-apex transition-all duration-1000" style={{ width: `${result.progress}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[9px] font-black uppercase tracking-[0.2em] text-apexRed">
                      <span>ORIGIN</span>
                      <span>DESTINATION</span>
                    </div>
                  </div>
                </div>

                <div className="text-left lg:text-right flex flex-col justify-end">
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] mb-3">Est. Deployment</p>
                  <h3 className="text-3xl md:text-5xl font-black tracking-tighter">{result.estimatedDelivery}</h3>
                  <div className="mt-6 flex items-center justify-start lg:justify-end gap-2.5 text-green-500">
                    <i className="fa-solid fa-lock text-xs"></i>
                    <span className="text-[8px] font-black uppercase tracking-widest">Encrypted Transmission</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { label: 'Carrier Mass', val: result.weight, icon: 'fa-weight-hanging', color: 'text-apexRed' },
                 { label: 'Transit Modality', val: result.serviceType, icon: getServiceIcon(result.serviceType), color: 'text-blue-400' },
                 { label: 'Current Sector', val: result.currentLocation, icon: 'fa-location-crosshairs', color: 'text-yellow-400' }
               ].map((stat, i) => (
                 <div key={i} className="bg-navy-panel p-8 rounded-[2rem] border border-white/5 flex items-center gap-6 group hover:border-white/20 transition-all shadow-xl">
                    <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                       <i className={`fa-solid ${stat.icon}`}></i>
                    </div>
                    <div className="min-w-0">
                       <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-1.5">{stat.label}</p>
                       <p className="text-lg font-black uppercase tracking-tight truncate">{stat.val}</p>
                    </div>
                 </div>
               ))}
            </div>

            {/* Tactical Timeline */}
            <div className="mt-24">
              <h4 className="text-[10px] font-black text-apexRed uppercase tracking-[0.8em] mb-16 text-center">Intel Feed Log</h4>
              
              <div className="space-y-12 max-w-3xl mx-auto">
                {result.updates && result.updates.length > 0 ? (
                  result.updates.sort((a,b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((update, idx) => (
                    <div key={idx} className="flex gap-8 group relative">
                      <div className="relative flex-shrink-0">
                         <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white relative z-10 transition-all duration-700 ${idx === 0 ? 'bg-apexRed shadow-apex scale-110' : 'bg-navy-dark border border-white/10 opacity-40'}`}>
                           <i className={`fa-solid ${idx === 0 ? 'fa-satellite-dish' : 'fa-box-open'} text-lg`}></i>
                         </div>
                         {idx === 0 && <div className="absolute inset-0 bg-apexRed rounded-xl animate-ping opacity-20"></div>}
                         {idx !== result.updates.length - 1 && (
                           <div className="absolute left-1/2 -translate-x-1/2 top-16 bottom-[-48px] w-[1px] bg-gradient-to-b from-white/10 to-transparent"></div>
                         )}
                      </div>

                      <div className="flex-grow pb-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3">
                          <div>
                            <h6 className="text-2xl font-black uppercase tracking-tighter text-white mb-1.5">{update.location}</h6>
                            <p className={`text-[9px] font-black uppercase tracking-widest ${idx === 0 ? 'text-blue-400' : 'text-white/20'}`}>
                               {update.status} {idx === 0 && '// LIVE_FEED'}
                            </p>
                          </div>
                          <p className="text-[9px] font-mono text-white/10 uppercase tracking-widest bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/5 self-start">{update.timestamp}</p>
                        </div>
                        
                        <div className="bg-navy-dark/40 p-8 rounded-[2rem] border border-white/5 relative group-hover:border-apexRed/20 transition-all shadow-inner italic">
                          <p className="text-white/50 text-lg font-medium leading-relaxed">
                             "{update.description}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-20 opacity-10">
                     <i className="fa-solid fa-ghost text-5xl mb-5"></i>
                     <p className="text-[10px] font-black uppercase tracking-[0.8em]">NO DATA PACKETS</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
        .animate-shake { animation: shake 0.5s var(--expo-out); }
        .shadow-apex { box-shadow: 0 0 25px rgba(166, 26, 26, 0.35); }
      `}</style>
    </div>
  );
};

export default Tracking;