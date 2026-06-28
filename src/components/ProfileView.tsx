import React, { useState } from 'react';
import { User, Award, Shield, Settings, Calendar, Save, CheckCircle2, ChevronRight, Zap, Phone, Dumbbell } from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  addPoints: (points: number) => void;
}

export default function ProfileView({ user, setUser, addPoints }: ProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    nickname: user.nickname,
    teamName: user.teamName,
    teamSport: user.teamSport,
    emergencyContact: user.emergencyContact
  });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [xpAnimation, setXpAnimation] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      firstName: formData.firstName,
      lastName: formData.lastName,
      nickname: formData.nickname,
      teamName: formData.teamName,
      teamSport: formData.teamSport,
      emergencyContact: formData.emergencyContact
    }));
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSimulateTraining = () => {
    setXpAnimation(true);
    setTimeout(() => setXpAnimation(false), 1000);

    setUser(prev => {
      const addedXp = 100;
      let newXp = prev.xp + addedXp;
      let newLevel = prev.level;
      let nextXp = prev.nextLevelXp;

      if (newXp >= prev.nextLevelXp) {
        newLevel += 1;
        newXp = newXp - prev.nextLevelXp;
        // Award points on level up!
        addPoints(100);
      }

      return {
        ...prev,
        level: newLevel,
        xp: newXp,
        nextLevelXp: nextXp
      };
    });
  };

  const badges = [
    { name: 'Crossover Pro', desc: 'Completed Coach Marco\'s dribbling quests', icon: '🏀', unlocked: true },
    { name: 'First Check-in', desc: 'RSVP and check-in at local Map Court', icon: '📍', unlocked: true },
    { name: 'Healthy Fueler', desc: 'Redeemed food coupons at Subway desk', icon: '🍔', unlocked: user.level >= 5 },
    { name: 'Mentor Companion', desc: 'Completed introductorytalk with Dr. Clara', icon: '🧠', unlocked: false },
    { name: 'Street Leader', desc: 'Invited 1 peer and registered them in GWB', icon: '🤝', unlocked: false },
  ];

  return (
    <div id="profile-view" className="flex-1 overflow-y-auto bg-[#0f172a] text-zinc-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Status Alert */}
        {saveSuccess && (
          <div className="bg-green-500/10 border border-green-500/30 text-green-400 p-4 rounded-xl text-xs font-mono font-bold text-left flex items-center gap-2">
            <CheckCircle2 size={16} /> Profile parameters updated and stored locally!
          </div>
        )}

        {/* Master Identity Jumbotron */}
        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Left Column: Visual Athlete Card (Gangs with Balls Licensed Card layout) */}
          <div className="md:col-span-1 space-y-6">
            
            <div className="bg-black border-2 border-[#334155] rounded-3xl p-6 relative overflow-hidden shadow-2xl text-center flex flex-col justify-between aspect-[3/4.5] min-h-[380px]">
              {/* Neon corner watermarks */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-lime-400/10 to-transparent rounded-full blur-xl pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-emerald-500/10 to-transparent rounded-full blur-xl pointer-events-none"></div>

              {/* Card Header branding */}
              <div className="flex justify-between items-center border-b border-[#334155]/60 pb-3">
                <span className="text-[9px] font-mono font-black text-lime-400 uppercase tracking-widest">Licensed Athlete</span>
                <span className="text-[9px] font-mono text-zinc-500 font-bold">REG #GWB-2026</span>
              </div>

              {/* Central Athlete Photo frame */}
              <div className="space-y-4 my-auto">
                <div className="relative inline-block mx-auto">
                  <img
                    src={user.avatar}
                    alt={user.firstName}
                    referrerPolicy="no-referrer"
                    className="w-28 h-28 rounded-full object-cover border-4 border-lime-400 shadow-[0_0_20px_rgba(163,230,53,0.3)] mx-auto"
                  />
                  <div className="absolute -bottom-1 -right-1 p-2 bg-[#0f172a] text-lime-400 rounded-full border border-[#334155] shadow-md">
                    <Shield size={16} />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight leading-none">{user.firstName} {user.lastName}</h3>
                  <span className="text-xs bg-[#1e293b] text-zinc-300 px-2.5 py-1 rounded-full font-mono mt-2 inline-block">
                    "{user.nickname}" • Wildcats Wing
                  </span>
                </div>
              </div>

              {/* Barcode & Signature Footer */}
              <div className="border-t border-[#334155]/60 pt-4 space-y-3">
                <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                  <span>Joined: {user.joinedDate}</span>
                  <span>Team: {user.teamSport}</span>
                </div>
                
                {/* Visual Barcode Vector */}
                <div className="h-7 bg-black border border-[#334155]/60 rounded flex items-center justify-around px-2 opacity-75">
                  {[1, 2, 4, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 4, 1, 3].map((bar, i) => (
                    <div
                      key={i}
                      className="bg-zinc-400 rounded-sm"
                      style={{
                        width: `${bar * 1}px`,
                        height: '16px'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Simulate Training Experience Booster */}
            <div className="bg-[#1e293b]/40 border border-[#334155]/60 p-5 rounded-2xl space-y-3">
              <div className="text-left">
                <h4 className="text-xs font-black text-zinc-400 uppercase font-mono tracking-wider">Simulate Practice Drill</h4>
                <p className="text-[10px] text-zinc-500">Boost your athlete experience level to unlock higher rank gear.</p>
              </div>

              <button
                id="simulate-training-btn"
                onClick={handleSimulateTraining}
                className={`w-full py-3 bg-black border border-[#334155]/60 hover:border-lime-400 hover:text-white rounded-xl text-xs font-mono font-bold text-zinc-400 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  xpAnimation ? 'animate-pulse text-lime-400' : ''
                }`}
              >
                <Dumbbell size={14} /> {xpAnimation ? 'Earning +100 XP...' : 'Simulate 1hr Workout'}
              </button>
            </div>

          </div>

          {/* Right 2 Columns: Information & Edit forms */}
          <div className="md:col-span-2 space-y-6 text-left">
            
            {/* XP and Level Stats Bar */}
            <div className="bg-[#1e293b]/40 border border-[#334155]/60 p-6 rounded-3xl space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-black text-zinc-500 uppercase font-mono tracking-wider">Overall Status Ranks</h4>
                  <p className="text-xl font-black text-white uppercase tracking-tight mt-1">{user.rank}</p>
                </div>
                <div className="text-right font-mono">
                  <span className="text-[10px] text-zinc-500 block uppercase font-bold">Level</span>
                  <span className="text-2xl font-black text-lime-400">LVL {user.level}</span>
                </div>
              </div>

              {/* Progress Tracker Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-400">XP Progress Tracker:</span>
                  <span className="text-white font-bold">{user.xp} / {user.nextLevelXp} XP</span>
                </div>
                <div className="h-3.5 bg-black border border-[#334155]/60 rounded-full p-0.5 overflow-hidden">
                  <div
                    className="h-full bg-lime-400 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(163,230,53,0.3)]"
                    style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Main Tabs / Forms */}
            <div className="bg-[#1e293b]/40 border border-[#334155]/60 rounded-3xl overflow-hidden shadow-lg">
              
              <div className="p-5 border-b border-[#334155]/60 bg-black/50 flex justify-between items-center">
                <h4 className="text-sm font-black text-white uppercase tracking-tight">Athlete Parameters</h4>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="px-3.5 py-1.5 bg-[#1e293b] hover:bg-[#1e293b]/80 text-xs font-mono font-bold text-zinc-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Settings size={12} /> {isEditing ? 'View Credentials' : 'Edit Information'}
                </button>
              </div>

              {isEditing ? (
                // Interactive Edit Form (Matches dynamic inputs requirements)
                <form onSubmit={handleSave} className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-500 font-mono font-bold uppercase block">First Name</label>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        className="w-full bg-black border border-[#334155]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime-400 font-mono"
                        required
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-500 font-mono font-bold uppercase block">Last Name</label>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        className="w-full bg-black border border-[#334155]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime-400 font-mono"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-500 font-mono font-bold uppercase block">Nickname</label>
                      <input
                        type="text"
                        value={formData.nickname}
                        onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                        className="w-full bg-black border border-[#334155]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime-400 font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-500 font-mono font-bold uppercase block">Active Team</label>
                      <input
                        type="text"
                        value={formData.teamName}
                        onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                        className="w-full bg-black border border-[#334155]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime-400 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] text-zinc-500 font-mono font-bold uppercase block">Emergency Contacts</label>
                    <input
                      type="text"
                      value={formData.emergencyContact}
                      onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
                      className="w-full bg-black border border-[#334155]/80 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-lime-400 font-mono"
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="submit"
                      id="save-profile-btn"
                      className="px-5 py-3 bg-lime-400 hover:bg-lime-300 text-black font-black text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <Save size={12} /> Save Credentials
                    </button>
                  </div>
                </form>
              ) : (
                // Information view mode
                <div className="p-6 space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-mono">
                    <div className="p-4 bg-black/50 border border-[#334155]/60 rounded-2xl">
                      <span className="text-[9px] text-zinc-500 block uppercase font-bold">First & Last Name</span>
                      <span className="text-xs font-bold text-white block mt-1.5">{user.firstName} {user.lastName}</span>
                    </div>

                    <div className="p-4 bg-black/50 border border-[#334155]/60 rounded-2xl">
                      <span className="text-[9px] text-zinc-500 block uppercase font-bold">Primary Sport</span>
                      <span className="text-xs font-bold text-white block mt-1.5">{user.teamSport} Wing</span>
                    </div>

                    <div className="p-4 bg-black/50 border border-[#334155]/60 rounded-2xl col-span-2 md:col-span-1">
                      <span className="text-[9px] text-zinc-500 block uppercase font-bold">HQ Registries</span>
                      <span className="text-xs font-bold text-zinc-300 block mt-1.5">Wildcats Hub B-12</span>
                    </div>
                  </div>

                  {/* Safety check contact (Emphasizing safety/social elements) */}
                  <div className="p-4 bg-black/50 border border-[#334155]/60 rounded-2xl flex items-center gap-4 text-left">
                    <div className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="text-[9px] text-zinc-500 block uppercase font-mono font-black">Registered GWB Emergency Guard</span>
                      <span className="text-xs font-bold text-zinc-300 block mt-0.5">{user.emergencyContact}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Badges and Street Stats Showcase (inspired by Photo 1 point-based showcase) */}
            <div className="space-y-4">
              <h4 className="text-sm font-black text-white uppercase tracking-tight">Earned Badges & Ribbons</h4>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {badges.map((badge, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-2xl border flex gap-4 items-center transition-all ${
                      badge.unlocked
                        ? 'bg-[#1e293b]/40 border-[#334155]/60 hover:border-lime-400/50'
                        : 'bg-black/20 border-[#334155]/20 opacity-40'
                    }`}
                  >
                    <div className="text-2xl p-2 bg-black border border-[#334155] rounded-xl font-sans shrink-0">
                      {badge.unlocked ? badge.icon : '🔒'}
                    </div>

                    <div className="min-w-0">
                      <h5 className="text-xs font-extrabold text-white uppercase truncate">{badge.name}</h5>
                      <p className="text-[10px] text-zinc-500 mt-0.5 leading-normal">{badge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
