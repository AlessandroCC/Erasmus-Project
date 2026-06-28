import { Home, Map, MessageSquare, Trophy, Gift, User, Award, Flame } from 'lucide-react';
import { UserProfile } from '../types';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  user: UserProfile;
  points: number;
}

export default function Sidebar({ currentTab, setCurrentTab, user, points }: SidebarProps) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'map', label: 'Street Map', icon: Map, badge: '5 Live' },
    { id: 'chats', label: 'Chats', icon: MessageSquare, badge: '4 Chats' },
    { id: 'quests', label: 'Missions', icon: Trophy },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  return (
    <aside id="app-sidebar" className="w-64 bg-black border-r border-lime-400/20 flex flex-col h-screen sticky top-0 text-zinc-300">
      {/* Brand Logo & Banner */}
      <div className="p-6 border-b border-lime-400/10 flex items-center gap-3 bg-black">
        <div className="p-2 bg-lime-400 rounded-lg text-black animate-pulse shadow-[0_0_15px_#cfff04]">
          <Flame size={24} className="fill-black" />
        </div>
        <div>
          <h1 className="font-sans font-black tracking-tighter text-lg text-white uppercase leading-none">
            Gangs <span className="text-lime-400 font-extrabold block text-xs tracking-widest mt-0.5">With Balls</span>
          </h1>
        </div>
      </div>

      {/* Mini Profile Summary */}
      <div className="p-5 border-b border-[#334155]/40 flex items-center gap-3 bg-[#1e293b]/25">
        <div className="relative">
          <img
            src={user.avatar}
            alt={user.firstName}
            referrerPolicy="no-referrer"
            className="w-12 h-12 rounded-full object-cover border-2 border-lime-400 shadow-[0_0_8px_rgba(207,255,4,0.3)]"
          />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full"></span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{user.firstName} "{user.nickname}"</p>
          <span className="text-xs text-[#94a3b8] font-mono block truncate">{user.teamName}</span>
          {/* Level Progress */}
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="text-[10px] bg-black text-lime-400 px-1 rounded font-bold">LVL {user.level}</span>
            <div className="flex-1 h-1.5 bg-[#334155] rounded-full overflow-hidden">
              <div 
                className="h-full bg-lime-400 transition-all duration-500" 
                style={{ width: `${(user.xp / user.nextLevelXp) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                isActive
                  ? 'bg-[#1e293b] text-white border-l-4 border-lime-400'
                  : 'text-[#94a3b8] hover:bg-[#1e293b]/50 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={`transition-transform group-hover:scale-110 duration-200 ${
                    isActive ? 'text-lime-400' : 'text-[#94a3b8] group-hover:text-lime-400/80'
                  }`}
                />
                <span className="font-semibold">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-lime-400 text-black' : 'bg-black text-[#94a3b8]'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Persistent Point Wallet */}
      <div className="p-4 m-4 bg-[#1e293b] border border-[#334155] rounded-2xl flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl text-black shadow-md">
            <Award size={20} className="stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] text-zinc-400 font-mono font-bold block uppercase tracking-wider">My GWB Wallet</span>
            <span className="text-xl font-black text-white leading-none font-mono tracking-tight">{points} <span className="text-xs text-amber-400 font-bold font-sans">PTS</span></span>
          </div>
        </div>
        <button 
          onClick={() => setCurrentTab('rewards')}
          className="text-xs font-bold text-lime-400 hover:text-white px-2 py-1.5 hover:bg-lime-400/10 rounded-lg transition-colors"
        >
          Redeem
        </button>
      </div>

      {/* Footer Branding */}
      <div className="p-4 border-t border-[#334155]/40 text-center">
        <p className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">
          GWB Prototype v1.2
        </p>
      </div>
    </aside>
  );
}
