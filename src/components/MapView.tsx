import React, { useState } from 'react';
import { MapPin as PinIcon, Calendar, Users, Shield, Plus, Info, Check, Filter } from 'lucide-react';
import { MapPin } from '../types';

interface MapViewProps {
  pins: MapPin[];
  setPins: React.Dispatch<React.SetStateAction<MapPin[]>>;
  addPoints: (points: number) => void;
}

export default function MapView({ pins, setPins, addPoints }: MapViewProps) {
  const [selectedPinId, setSelectedPinId] = useState<string>('pin_01');
  const [filterType, setFilterType] = useState<string>('all');
  const [rsvpStatus, setRsvpStatus] = useState<Record<string, boolean>>({});

  const selectedPin = pins.find(p => p.id === selectedPinId) || pins[0];

  const handleJoinToggle = (pinId: string) => {
    setPins(prevPins =>
      prevPins.map(p => {
        if (p.id === pinId) {
          const isJoining = !p.isJoined;
          
          // If joining for the first time, give user a simulated 20 points!
          if (isJoining && !rsvpStatus[pinId]) {
            addPoints(20);
            setRsvpStatus(prev => ({ ...prev, [pinId]: true }));
          }

          return {
            ...p,
            isJoined: isJoining,
            attendeesCount: isJoining ? p.attendeesCount + 1 : p.attendeesCount - 1
          };
        }
        return p;
      })
    );
  };

  const getSportColor = (sport: string) => {
    switch (sport) {
      case 'Basketball': return 'bg-orange-500 text-white border-orange-400';
      case 'Soccer': return 'bg-emerald-500 text-white border-emerald-400';
      case 'Boxing': return 'bg-red-500 text-white border-red-400';
      case 'Skate': return 'bg-cyan-500 text-white border-cyan-400';
      case 'Meeting': return 'bg-amber-500 text-black border-amber-400';
      default: return 'bg-zinc-500 text-white border-zinc-400';
    }
  };

  const filteredPins = pins.filter(p => {
    if (filterType === 'all') return true;
    if (filterType === 'sports') return ['Basketball', 'Soccer', 'Boxing', 'Skate'].includes(p.sport);
    if (filterType === 'meetings') return p.sport === 'Meeting';
    return p.sport.toLowerCase() === filterType.toLowerCase();
  });

  return (
    <div id="map-view" className="flex-1 flex h-screen bg-[#0f172a] overflow-hidden">
      
      {/* Left Pane: Interactive Event Directory List */}
      <div className="w-80 border-r border-[#334155]/60 bg-black flex flex-col h-full z-10">
        
        {/* District Filter Panel */}
        <div className="p-5 border-b border-[#334155]/40 space-y-4">
          <div>
            <h3 className="text-lg font-black text-white uppercase tracking-tight">District Map</h3>
            <p className="text-xs text-zinc-400">Live games & community spots near you</p>
          </div>
          
          {/* Custom Select Filter Bar */}
          <div className="space-y-2">
            <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider flex items-center gap-1">
              <Filter size={10} /> Filter Street Activities
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs font-semibold font-mono">
              <button 
                onClick={() => setFilterType('all')}
                className={`py-2 px-3 rounded-lg text-left transition-colors truncate ${filterType === 'all' ? 'bg-lime-400 text-black font-extrabold' : 'bg-[#1e293b] text-[#94a3b8] hover:bg-[#1e293b]/70'}`}
              >
                ● All Areas
              </button>
              <button 
                onClick={() => setFilterType('basketball')}
                className={`py-2 px-3 rounded-lg text-left transition-colors truncate ${filterType === 'basketball' ? 'bg-orange-500 text-white font-extrabold' : 'bg-[#1e293b] text-[#94a3b8] hover:bg-[#1e293b]/70'}`}
              >
                🏀 Basketball
              </button>
              <button 
                onClick={() => setFilterType('soccer')}
                className={`py-2 px-3 rounded-lg text-left transition-colors truncate ${filterType === 'soccer' ? 'bg-emerald-500 text-white font-extrabold' : 'bg-[#1e293b] text-[#94a3b8] hover:bg-[#1e293b]/70'}`}
              >
                ⚽ Futsal
              </button>
              <button 
                onClick={() => setFilterType('meetings')}
                className={`py-2 px-3 rounded-lg text-left transition-colors truncate ${filterType === 'meetings' ? 'bg-amber-500 text-black font-extrabold' : 'bg-[#1e293b] text-[#94a3b8] hover:bg-[#1e293b]/70'}`}
              >
                🧠 Workshops
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Directory List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">Activities ({filteredPins.length})</span>
            <span className="text-[10px] text-lime-400 font-mono font-bold uppercase tracking-wider animate-pulse">● Live Tracking</span>
          </div>

          {filteredPins.map((pin) => {
            const isSelected = selectedPinId === pin.id;
            return (
              <div
                key={pin.id}
                onClick={() => setSelectedPinId(pin.id)}
                className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer text-left ${
                  isSelected
                    ? 'bg-[#1e293b] border-lime-400 shadow-[0_4px_15px_rgba(207,255,4,0.2)]'
                    : 'bg-[#1e293b]/40 border-[#334155] hover:border-lime-400/50 hover:bg-[#1e293b]/70'
                }`}
              >
                <div className="flex justify-between items-start gap-1">
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-mono uppercase font-bold ${getSportColor(pin.sport)}`}>
                    {pin.sport}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-mono">{pin.time.split(',')[0]}</span>
                </div>
                <h4 className="text-sm font-bold text-white mt-2 truncate">{pin.title}</h4>
                <p className="text-xs text-zinc-400 font-mono mt-1 truncate">{pin.locationName}</p>
                
                <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-[#334155]/40">
                  <div className="flex items-center gap-1 text-zinc-500 text-xs">
                    <Users size={12} />
                    <span className="font-mono text-[11px]">{pin.attendeesCount} joined</span>
                  </div>
                  {pin.isJoined && (
                    <span className="text-[10px] text-lime-400 font-bold font-mono flex items-center gap-1 bg-lime-400/10 px-1.5 py-0.5 rounded">
                      <Check size={10} /> Joined
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {filteredPins.length === 0 && (
            <div className="text-center py-12 px-4 bg-zinc-900/20 border border-zinc-800/60 rounded-xl">
              <p className="text-xs text-zinc-500">No events found for this filter.</p>
            </div>
          )}
        </div>
      </div>

      {/* Center Map Stage & Drawer Overlay */}
      <div className="flex-1 relative bg-[#0f172a] flex flex-col h-full justify-between">
        
        {/* SVG Street Grid Background Map */}
        <div className="absolute inset-0 z-0 select-none pointer-events-auto">
          <svg className="w-full h-full text-zinc-800" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
              </pattern>
              <radialGradient id="map-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#1a2e1a" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
              </radialGradient>
            </defs>

            {/* Glowing Map Ambient Base */}
            <rect width="100%" height="100%" fill="url(#grid)" />
            <rect width="100%" height="100%" fill="url(#map-glow)" />

            {/* Fictional River/Canal Parkway */}
            <path d="M -50,250 Q 250,150 550,450 T 1150,300" fill="none" stroke="#0e2a30" strokeWidth="48" strokeLinecap="round" opacity="0.4" />
            <path d="M -50,250 Q 250,150 550,450 T 1150,300" fill="none" stroke="#0ea5e9" strokeWidth="6" strokeLinecap="round" opacity="0.2" />

            {/* Fictional Street Road Vectors */}
            {/* Primary Highway */}
            <line x1="0" y1="300" x2="1200" y2="300" stroke="#1f2937" strokeWidth="24" opacity="0.7" />
            <line x1="0" y1="300" x2="1200" y2="300" stroke="#ccff00" strokeWidth="1" strokeDasharray="8 6" opacity="0.3" />

            {/* Cross Avenues */}
            <line x1="200" y1="0" x2="200" y2="800" stroke="#1c1c1c" strokeWidth="14" />
            <line x1="500" y1="0" x2="500" y2="800" stroke="#1c1c1c" strokeWidth="14" />
            <line x1="850" y1="0" x2="850" y2="800" stroke="#1c1c1c" strokeWidth="14" />
            
            {/* Neighborhood Streets */}
            <line x1="0" y1="120" x2="1200" y2="120" stroke="#18181b" strokeWidth="8" />
            <line x1="0" y1="550" x2="1200" y2="550" stroke="#18181b" strokeWidth="8" />
            <line x1="0" y1="680" x2="1200" y2="680" stroke="#18181b" strokeWidth="8" />

            {/* Diagonal Alleys */}
            <line x1="100" y1="100" x2="600" y2="600" stroke="#141414" strokeWidth="6" strokeDasharray="3 3" />
            <line x1="700" y1="100" x2="1100" y2="500" stroke="#141414" strokeWidth="6" />

            {/* Concrete Sports Court Blocks (Visual Rectangles) */}
            {/* Metro Court (Orange grid) */}
            <rect x="36%" y="36%" width="8%" height="8%" rx="6" fill="#241408" stroke="#f97316" strokeWidth="1.5" opacity="0.6" />
            <text x="40%" y="41%" fill="#f97316" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.8">METRO COURT</text>

            {/* Highway Overpass (Green Turf) */}
            <rect x="58%" y="20%" width="10%" height="7%" rx="6" fill="#082414" stroke="#10b981" strokeWidth="1.5" opacity="0.6" />
            <text x="63%" y="24%" fill="#10b981" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.8">OVERPASS FIELD</text>

            {/* Boxing Gym Center (Red ring) */}
            <rect x="20%" y="70%" width="8%" height="10%" rx="6" fill="#240808" stroke="#ef4444" strokeWidth="1.5" opacity="0.6" />
            <text x="24%" y="76%" fill="#ef4444" fontSize="8" fontFamily="monospace" textAnchor="middle" opacity="0.8">BOXING GYM</text>

            {/* Skate Yard (Cyan bowls) */}
            <circle cx="50%" cy="57%" r="28" fill="#082024" stroke="#06b6d4" strokeWidth="1.5" opacity="0.6" />
            <text x="50%" y="58%" fill="#06b6d4" fontSize="7" fontFamily="monospace" textAnchor="middle" opacity="0.8">RAMP YARD</text>

            {/* GWB HQ (Yellow zone) */}
            <rect x="74%" y="74%" width="10%" height="12%" rx="8" fill="#1c1c15" stroke="#fbbf24" strokeWidth="2" opacity="0.7" />
            <text x="79%" y="81%" fill="#fbbf24" fontSize="9" fontWeight="bold" fontFamily="monospace" textAnchor="middle" opacity="0.8">GWB HQ</text>

            {/* Beautiful district names printed */}
            <text x="120" y="70" fill="#4b5563" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="2">EAST DISTRICT</text>
            <text x="960" y="240" fill="#4b5563" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="2">CENTRAL SECTOR</text>
            <text x="100" y="600" fill="#4b5563" fontSize="10" fontWeight="bold" fontFamily="monospace" letterSpacing="2">BAY SIDE</text>
          </svg>

          {/* Interactive HTML glowing pins overlaid onto coordinate system */}
          {pins.map((pin) => {
            const isSelected = selectedPinId === pin.id;
            const isFilteredOut = filterType !== 'all' && 
              (filterType === 'sports' ? !['Basketball', 'Soccer', 'Boxing', 'Skate'].includes(pin.sport) : 
              filterType === 'meetings' ? pin.sport !== 'Meeting' : 
              pin.sport.toLowerCase() !== filterType.toLowerCase());

            if (isFilteredOut) return null;

            return (
              <button
                key={pin.id}
                id={`map-pin-${pin.id}`}
                onClick={() => setSelectedPinId(pin.id)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer transition-all duration-300"
                style={{ left: `${pin.lng}%`, top: `${pin.lat}%` }}
              >
                {/* Ping Pulse Outer Rings */}
                <span className={`absolute -inset-4 rounded-full animate-ping opacity-25 scale-75 ${
                  isSelected ? 'bg-lime-400' : 'bg-white group-hover:bg-lime-400'
                }`} style={{ animationDuration: '2s' }}></span>
                
                {/* Pin Card Mini Banner on Hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-black border border-[#334155] px-2.5 py-1 rounded-lg pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50 shadow-xl">
                  <p className="text-[10px] font-bold text-white font-mono">{pin.title}</p>
                </div>

                {/* Main Pin Dot Icon Container */}
                <div className={`p-2.5 rounded-full border-2 transition-all duration-300 shadow-lg ${
                  isSelected 
                    ? 'bg-lime-400 border-white text-black scale-125 shadow-[0_0_20px_#cfff04]' 
                    : 'bg-black border-[#334155] text-lime-400 hover:border-lime-400'
                }`}>
                  <PinIcon size={14} className={isSelected ? 'fill-black' : ''} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Map Header HUD bar */}
        <div className="p-4 bg-gradient-to-b from-black/80 to-transparent z-10 w-full flex items-center justify-between pointer-events-none">
          <div className="bg-black/90 border border-[#334155]/60 p-3 rounded-xl backdrop-blur-md pointer-events-auto flex items-center gap-3 shadow-lg">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-ping"></span>
            <p className="text-xs text-zinc-300 font-mono font-medium">
              5 Youth Safe-Zones Active in East District
            </p>
          </div>
          <div className="bg-black/90 border border-[#334155]/60 p-2.5 rounded-xl backdrop-blur-md pointer-events-auto text-[10px] text-zinc-400 font-mono flex items-center gap-1.5 shadow-lg">
            <span>💡 Click any colored marker on the map grid to inspect activity</span>
          </div>
        </div>

        {/* Bottom Floating Info Drawer Card */}
        <div className="p-6 bg-black border-t border-lime-400/20 z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="flex-1 space-y-2 text-left w-full">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono uppercase font-black ${getSportColor(selectedPin.sport)}`}>
                {selectedPin.sport}
              </span>
              <span className="text-xs bg-[#1e293b] border border-[#334155] text-zinc-300 px-2 py-0.5 rounded font-mono font-bold">
                Level Reward: +20 PTS
              </span>
              <span className="text-xs text-zinc-400 font-mono">{selectedPin.time}</span>
            </div>
            
            <h3 className="text-xl font-black text-white uppercase tracking-tight leading-tight">{selectedPin.title}</h3>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-3xl">{selectedPin.description}</p>
            
            <div className="flex flex-wrap gap-x-6 gap-y-1.5 pt-1 text-xs text-zinc-500 font-mono">
              <span className="flex items-center gap-1.5">📍 <strong className="text-zinc-300">{selectedPin.locationName}</strong></span>
              <span className="flex items-center gap-1.5">👤 Lead: <strong className="text-zinc-300">{selectedPin.organizer}</strong></span>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto shrink-0 justify-end border-t md:border-t-0 border-[#334155]/60 pt-4 md:pt-0">
            <div className="text-right font-mono pr-2">
              <span className="text-[10px] text-zinc-500 block uppercase font-bold">Current Attendees</span>
              <span className="text-base font-extrabold text-white">{selectedPin.attendeesCount} joined</span>
            </div>

            <button
              id={`rsvp-btn-${selectedPin.id}`}
              onClick={() => handleJoinToggle(selectedPin.id)}
              className={`px-6 py-4 rounded-xl font-bold flex items-center gap-2 transition-all duration-300 w-full md:w-auto justify-center cursor-pointer ${
                selectedPin.isJoined
                  ? 'bg-green-500 hover:bg-green-600 text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                  : 'bg-lime-400 hover:bg-lime-300 text-black shadow-[0_4px_15px_rgba(163,230,53,0.3)]'
              }`}
            >
              {selectedPin.isJoined ? (
                <>
                  <Check size={18} className="stroke-[2.5]" /> Joined (Leave)
                </>
              ) : (
                <>
                  <Plus size={18} className="stroke-[2.5]" /> Join Team & Attend
                </>
              )}
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
