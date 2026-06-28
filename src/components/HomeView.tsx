import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Shield, Calendar, Users, Award, MapPin, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { UserProfile } from '../types';
import gwbLogo from '../media/GwB-LOGO.jpeg';

interface HomeViewProps {
  user: UserProfile;
  setCurrentTab: (tab: string) => void;
  points: number;
}

const SUBTITLES = [
  { time: 1, text: "[Upbeat street hip-hop beat starts playing]" },
  { time: 3, text: "Coach Marco: 'The street is full of energy, but energy needs direction.'" },
  { time: 7, text: "Dr. Clara: 'We are here to offer these kids a safe space to grow, learn, and play.'" },
  { time: 12, text: "Jordan (GWB Member): 'When I joined the Wildcats, I didn't just get a jersey...'" },
  { time: 16, text: "Jordan (GWB Member): '...I got a team. I got a coach. I got a real family.'" },
  { time: 20, text: "[Cheering crowds and sound of basketball swishing through the net]" },
  { time: 25, text: "Join a team. Play hard. Change your future. Gangs with Balls 2026." },
];

export default function HomeView({ user, setCurrentTab, points }: HomeViewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoProgress, setVideoProgress] = useState(12); // starts mid-video
  const [currentSubtitle, setCurrentSubtitle] = useState("Click play to hear from our mentors and youth");
  
  // Simulate video playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setVideoProgress((prev) => {
          const next = prev >= 100 ? 0 : prev + 1;
          
          // Map percentage (0-100) to seconds (0-30 seconds video)
          const currentSecond = Math.floor((next / 100) * 30);
          const foundSubtitle = SUBTITLES.find(sub => currentSecond >= sub.time && currentSecond < sub.time + 4);
          if (foundSubtitle) {
            setCurrentSubtitle(foundSubtitle.text);
          } else if (currentSecond >= 28) {
            setCurrentSubtitle("Gangs with Balls: Join the Movement.");
          } else {
            setCurrentSubtitle("[Inspiring music continues]");
          }
          
          return next;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const stats = [
    { label: 'Active Youth', value: '342', desc: 'Street kids in sports teams', icon: Users, color: 'text-lime-400 bg-lime-400/10' },
    { label: 'Local Coaches', value: '18', desc: 'Certified trainers & guides', icon: Shield, color: 'text-orange-400 bg-orange-400/10' },
    { label: 'Youth Centers', value: '6', desc: 'Renovated concrete courts', icon: MapPin, color: 'text-cyan-400 bg-cyan-400/10' },
    { label: 'Quests Cleared', value: '1,450', desc: 'Life-changing accomplishments', icon: Award, color: 'text-amber-400 bg-amber-400/10' },
  ];

  return (
    <div id="home-view" className="flex-1 overflow-y-auto bg-[#0f172a] text-zinc-100 p-8">
      {/* Upper Grid: Welcome Headline and Mascot Illustration banner */}
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Sleek Header Jumbotron */}
        <div className="relative rounded-3xl overflow-hidden bg-[#1e293b] border border-[#334155] p-8 md:p-12 shadow-2xl bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#1e293b]/40 via-[#121b2a] to-[#0f172a]">
          {/* Neon street accent bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-lime-400 via-emerald-500 to-orange-500"></div>
          
          <div className="relative z-10 grid md:grid-cols-5 gap-8 items-center">
            <div className="md:col-span-3 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-lime-400/10 border border-lime-400/20 rounded-full text-lime-400 text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles size={12} /> Social Transformation Project
              </div>
              <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tighter text-white uppercase leading-none">
                Join a team, <br />
                play hard, and <br />
                <span className="text-lime-400 underline decoration-wavy decoration-emerald-500 underline-offset-4">change your future</span>
              </h2>
              <p className="text-zinc-400 text-base max-w-lg leading-relaxed">
                Gangs with Balls provides street youth with structured sports leagues, high-end athletic gear, 
                and professional mental guidance. Trade the corners for the courts, unlock positive achievements, 
                and build your path forward.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <button 
                  onClick={() => setCurrentTab('map')}
                  className="px-6 py-3.5 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-xl flex items-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(163,230,53,0.3)] hover:shadow-[0_4px_25px_rgba(163,230,53,0.5)] cursor-pointer"
                >
                  Find a Court <MapPin size={18} />
                </button>
                <button 
                  onClick={() => setCurrentTab('quests')}
                  className="px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 font-bold rounded-xl flex items-center gap-2 transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
                >
                  View Active Quests <ArrowRight size={18} />
                </button>
              </div>
            </div>

            {/* Live Dashboard summary stats bubble */}
            <div className="md:col-span-2 bg-[#000000]/90 border border-[#334155] p-6 rounded-2xl space-y-4 shadow-xl backdrop-blur-sm">
              <h3 className="font-sans font-black text-xs tracking-wider text-zinc-500 uppercase font-mono">My Live Progress</h3>
              <div className="flex items-center gap-4">
                <img 
                  src={user.avatar} 
                  alt="Avatar" 
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-full border-2 border-lime-400 object-cover" 
                />
                <div>
                  <h4 className="text-white font-bold">{user.firstName} {user.lastName}</h4>
                  <p className="text-xs text-zinc-400">{user.rank} • Level {user.level}</p>
                </div>
              </div>
              <hr className="border-[#334155]/60" />
              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-3 bg-[#0f172a] rounded-xl border border-[#334155]">
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">PTS Available</span>
                  <span className="text-xl font-extrabold text-lime-400">{points}</span>
                </div>
                <div className="p-3 bg-[#0f172a] rounded-xl border border-[#334155]">
                  <span className="text-[10px] text-zinc-400 block uppercase font-bold">Active Squad</span>
                  <span className="text-sm font-extrabold text-white truncate block">Wildcats 🏀</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Structured Manifesto Section */}
        <div className="bg-[#1e293b]/40 border border-[#334155]/60 rounded-3xl p-8 md:p-12 space-y-8 relative overflow-hidden shadow-2xl text-left">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-lime-400/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-4 max-w-4xl">
            {/* TITOLO PRINCIPALE - H1 */}
            <h1 className="text-4xl md:text-5xl font-sans font-black tracking-tight text-white uppercase leading-tight border-b-2 border-lime-400 pb-3">
              Our Mission: Changing the Game
            </h1>
            
            {/* PARAGRAFO INTRODUTTIVO - Testo lead */}
            <p className="text-lg md:text-xl text-zinc-200 leading-relaxed font-sans border-l-4 border-lime-400 pl-4 mt-6">
              <strong className="text-white font-extrabold">A coalition of public organizations is coming together to develop and construct sports facilities in troubled neighborhoods across major cities.</strong> In these areas, youth gangs, violence, alcohol abuse, drug dealing, unemployment, and domestic violence are often the norm.
            </p>

            {/* PARAGRAFO STANDARD */}
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed mt-4">
              Against the logic of mere police repression and the lack of resources and economic investment in marginalized areas, we aim to open new horizons. We want to show that a different life is possible and that nobody belongs to a societal gutter. Nobody’s here to make a quick buck; we’re here to make new friends, broaden our families, and strengthen community bonds. <strong className="text-lime-400 font-extrabold">Everything is possible.</strong>
            </p>

            {/* TITOLO DI SEZIONE - H2 */}
            <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-white uppercase pt-6 border-b border-[#334155]/60 pb-2">
              The Core of the Project
            </h2>

            {/* ELENCO PUNTATO - Standard with beautiful spacing and indicators */}
            <ul className="space-y-4 my-6">
              <li className="flex items-start gap-3 text-sm md:text-base text-zinc-300 leading-relaxed">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-lime-400 shrink-0 animate-pulse"></span>
                <div>
                  <strong className="text-white font-bold">Who:</strong> Public organizations, municipalities, citizens, human rights groups, public schools, and educational organizations. Private companies can participate with economic and material support (no advertisement included).
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-zinc-300 leading-relaxed">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-500 shrink-0"></span>
                <div>
                  <strong className="text-white font-bold">Where:</strong> Where it is needed the most: troubled neighborhoods, public housing projects, and underserved areas.
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-zinc-300 leading-relaxed">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
                <div>
                  <strong className="text-white font-bold">Why:</strong> To provide an alternative. To show the youth that nothing is lost and that there is always a new day and a new path to walk.
                </div>
              </li>
            </ul>

            {/* TITOLO DI SEZIONE - H2 */}
            <h2 className="text-2xl md:text-3xl font-sans font-black tracking-tight text-white uppercase pt-6 border-b border-[#334155]/60 pb-2">
              How the App Works
            </h2>

            {/* PARAGRAFO STANDARD */}
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              The application will function as an interactive platform where participants will need to complete at least two key actions per day:
            </p>

            {/* ELENCO NUMERATO - Beautiful design elements */}
            <ol className="space-y-4 my-6">
              <li className="flex items-start gap-4 p-5 rounded-2xl bg-[#0b0f19] border border-[#334155]/60 hover:border-lime-400/30 transition-all shadow-md">
                <span className="w-8 h-8 rounded-full bg-lime-400 text-black flex items-center justify-center font-mono font-black text-sm shrink-0 shadow-[0_0_15px_rgba(163,230,53,0.3)]">1</span>
                <div>
                  <strong className="text-white font-bold block mb-1 text-sm md:text-base">Check-in before training:</strong>
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">Connect before their scheduled session to state their name, sports class, trainer, and hour of attendance.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-5 rounded-2xl bg-[#0b0f19] border border-[#334155]/60 hover:border-orange-400/30 transition-all shadow-md">
                <span className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-mono font-black text-sm shrink-0">2</span>
                <div>
                  <strong className="text-white font-bold block mb-1 text-sm md:text-base">Log-out and review:</strong>
                  <p className="text-xs md:text-sm text-zinc-400 leading-relaxed">Log in after the training to verify attendance, leave comments on the day’s session, and fill in the "wish box" with what they’d like to see in the future.</p>
                </div>
              </li>
            </ol>

            {/* TITOLO DI SOTTO-SEZIONE - H3 */}
            <h3 className="text-xl md:text-2xl font-sans font-black tracking-tight text-lime-400 uppercase pt-4">
              The Impact
            </h3>

            {/* PARAGRAFO STANDARD */}
            <p className="text-sm md:text-base text-zinc-300 leading-relaxed">
              These daily routines are designed to achieve two crucial goals:
            </p>

            {/* ELENCO PUNTATO - Standard with custom layout */}
            <ul className="space-y-4 my-6">
              <li className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#1e293b]/40 to-transparent border border-[#334155]/30">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1.5 shrink-0 animate-pulse"></div>
                <div>
                  <strong className="text-emerald-300 font-bold text-sm md:text-base">Building Digital Literacy:</strong>
                  <span className="text-zinc-300 text-xs md:text-sm leading-relaxed block mt-1">Youth participants acquire basic digital skills, which are essential for almost every aspect of their future careers and daily lives.</span>
                </div>
              </li>
              <li className="flex items-start gap-3 p-4 rounded-2xl bg-gradient-to-r from-[#1e293b]/40 to-transparent border border-[#334155]/30">
                <div className="w-2.5 h-2.5 rounded-full bg-lime-400 mt-1.5 shrink-0 animate-pulse"></div>
                <div>
                  <strong className="text-lime-300 font-bold text-sm md:text-base">Fostering Responsibility:</strong>
                  <span className="text-zinc-300 text-xs md:text-sm leading-relaxed block mt-1">Participants develop a strong sense of accountability and discipline through simple, routine tasks carried out on a daily basis.</span>
                </div>
              </li>
            </ul>

          </div>
        </div>

        {/* Video Player Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-black text-white uppercase tracking-tight">Project Intro Video</h3>
              <p className="text-xs text-zinc-400">See how Gangs with Balls is reshaping our local neighborhoods.</p>
            </div>
          </div>

          {/* Interactive Simulated Video Frame */}
          <div className="relative rounded-3xl overflow-hidden aspect-video max-h-[480px] bg-black border border-[#334155] group shadow-2xl">
            {/* Custom simulated video preview graphics */}
            {!isPlaying ? (
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-8 bg-gradient-to-t from-black via-black/40 to-black/60">
                <div className="flex justify-between items-start">
                  <span className="px-3 py-1 bg-red-600 font-mono text-xs font-bold text-white uppercase rounded-md shadow-md">
                    Watch Trailer
                  </span>
                  <span className="text-xs font-mono text-zinc-300 font-bold bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-sm">
                    4:20 MINS
                  </span>
                </div>

                <div className="flex flex-col items-center justify-center absolute inset-0">
                  <button 
                    onClick={handlePlayToggle}
                    className="w-20 h-20 bg-lime-400 hover:bg-lime-300 text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(163,230,53,0.5)] transition-all duration-300 hover:scale-110 cursor-pointer"
                  >
                    <Play size={36} className="fill-black ml-1.5" />
                  </button>
                  <p className="mt-4 text-white text-sm font-bold uppercase tracking-wider drop-shadow-md">Play Project Documentary</p>
                </div>

                <div className="space-y-1">
                  <h4 className="text-lg font-black text-white uppercase tracking-tight">"From the Pavement to the Podium"</h4>
                  <p className="text-xs text-zinc-300 max-w-xl">Featuring stories from our champion players, coaches, and lead mental counselors who grew up in these very streets.</p>
                </div>
              </div>
            ) : (
              // Playing state animations/visualizations
              <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 bg-gradient-to-t from-black/90 via-black/20 to-black/80">
                {/* Upper bar with live details */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                    <span className="text-xs font-mono font-bold text-white uppercase">Stream Active - HD 1080p</span>
                  </div>
                  <button 
                    onClick={handlePlayToggle}
                    className="text-xs text-zinc-400 hover:text-white bg-black/60 px-3 py-1 rounded border border-zinc-800"
                  >
                    Reset Video
                  </button>
                </div>

                {/* Simulated Audio Spectrum & Center Visualizer */}
                <div className="flex items-center justify-center flex-1">
                  <div className="flex items-end gap-1.5 h-16">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((bar) => {
                      // Generate random pulse heights for a vibrant street feel
                      const animDelay = `${bar * 100}ms`;
                      return (
                        <div
                          key={bar}
                          className="w-1.5 bg-gradient-to-t from-lime-400 to-emerald-400 rounded-full animate-bounce"
                          style={{
                            height: `${20 + Math.sin(bar) * 60 + Math.random() * 20}%`,
                            animationDuration: '0.8s',
                            animationDelay: animDelay,
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Subtitle Display Overlay */}
                <div className="text-center bg-black/70 backdrop-blur-md px-6 py-3 rounded-xl border border-zinc-800 max-w-2xl mx-auto mb-4 animate-fade-in">
                  <p className="text-sm text-lime-300 font-semibold italic tracking-wide">
                    {currentSubtitle}
                  </p>
                </div>

                {/* Bottom Custom Play Controls */}
                <div className="bg-[#000000]/80 backdrop-blur-md p-4 rounded-2xl border border-[#334155]/60 flex items-center gap-4">
                  <button 
                    onClick={handlePlayToggle}
                    className="p-2.5 bg-lime-400 rounded-xl text-black hover:bg-lime-300 transition-all cursor-pointer"
                  >
                    <Pause size={16} />
                  </button>
                  <span className="text-xs text-zinc-400 font-mono">00:{videoProgress < 10 ? `0${Math.floor(videoProgress * 0.3)}` : Math.floor(videoProgress * 0.3)} / 00:30</span>
                  
                  {/* Slider Progress Bar */}
                  <div className="flex-1 h-1.5 bg-zinc-800 rounded-full relative overflow-hidden cursor-pointer">
                    <div 
                      className="h-full bg-lime-400 transition-all duration-300"
                      style={{ width: `${videoProgress}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-400">
                    <Volume2 size={16} />
                    <span className="text-xs font-mono">85%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Video Background Wallpaper Mock */}
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1519766304817-4f37bda74a27?auto=format&fit=crop&w=1200&h=720&q=80')` }}>
              <div className="absolute inset-0 bg-zinc-950/70 mix-blend-multiply"></div>
            </div>
          </div>
        </div>

        {/* Quick Hub Navigator Cards (Inspired by bento-style design) */}
        <div className="space-y-4">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Active Street Districts</h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            
            <div className="group bg-[#1e293b] border border-[#334155] p-6 rounded-2xl hover:border-lime-400/40 transition-all duration-300 flex flex-col justify-between shadow-md">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-lime-400/10 text-lime-400 flex items-center justify-center">
                  <MapPin size={20} />
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-lime-400 transition-colors">Street Maps Hub</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  See where games are happening in real-time. Locate community practices, coaching points, 
                  and counselling gatherings under supervisors.
                </p>
              </div>
              <button 
                onClick={() => setCurrentTab('map')}
                className="mt-6 text-xs text-lime-400 font-bold flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform text-left cursor-pointer"
              >
                Open Street Map <ArrowRight size={14} />
              </button>
            </div>

            <div className="group bg-[#1e293b] border border-[#334155] p-6 rounded-2xl hover:border-orange-500/40 transition-all duration-300 flex flex-col justify-between shadow-md">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center">
                  <MessageSquare size={20} />
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">Wildcats Team Chat</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Sync with your squad members. Ask Coach Marco about strategy or reach out directly 
                  to Dr. Clara for a comfortable chat thread.
                </p>
              </div>
              <button 
                onClick={() => setCurrentTab('chats')}
                className="mt-6 text-xs text-orange-400 font-bold flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform text-left cursor-pointer"
              >
                Go to Conversations <ArrowRight size={14} />
              </button>
            </div>

            <div className="group bg-[#1e293b] border border-[#334155] p-6 rounded-2xl hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-md">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400/10 text-amber-400 flex items-center justify-center">
                  <Award size={20} />
                </div>
                <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">GWB Mission Board</h4>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Earn points by checking in at sports locations, improving your drills, attending workshops, 
                  and claiming official apparel rewards.
                </p>
              </div>
              <button 
                onClick={() => setCurrentTab('quests')}
                className="mt-6 text-xs text-amber-400 font-bold flex items-center gap-1.5 group-hover:translate-x-1.5 transition-transform text-left cursor-pointer"
              >
                Start Quests <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* Global Project Statistics Row */}
        <div className="bg-[#1e293b]/60 border border-[#334155]/80 rounded-2xl p-6 shadow-md">
          <h4 className="text-xs text-zinc-400 font-mono font-bold uppercase tracking-wider mb-5">Social Impact Stats</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="space-y-2 border-r last:border-r-0 border-[#334155]/80 pr-4 last:pr-0">
                  <div className="flex items-center gap-2.5">
                    <div className={`p-1.5 rounded-lg ${stat.color}`}>
                      <Icon size={16} />
                    </div>
                    <span className="text-2xl font-black font-mono text-white leading-none tracking-tight">{stat.value}</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-300">{stat.label}</p>
                    <p className="text-[10px] text-zinc-500">{stat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Logo Showcase */}
        <div className="flex flex-col items-center justify-center pt-8 pb-6 border-t border-[#334155]/30">
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-2xl overflow-hidden border border-lime-400/30 shadow-[0_0_30px_rgba(207,255,4,0.15)] bg-slate-950 p-1">
            <img 
              src={gwbLogo} 
              alt="Gangs with Balls Logo" 
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />
          </div>
          <p className="mt-4 text-xs font-mono tracking-widest text-zinc-500 uppercase">
            Official GWB Emblem
          </p>

          {/* Partner & Funding Logos */}
          <div className="mt-6 flex flex-row items-center justify-center gap-4 flex-wrap">
            {/* Fundacja Integra+ Logo SVG */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-zinc-200">
              <svg width="28" height="28" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                <path d="M40 90C17.9086 90 0 72.0914 0 50C0 39.4 4.1 29.8 10.8 22.6C12.5 20.8 15.3 21 16.8 22.8L19.2 25.6C20.5 27.1 20.3 29.4 18.8 30.7C14.5 34.3 12 39.8 12 46C12 62.6 25.4 76 42 76C48.2 76 53.7 73.5 57.3 69.2C58.6 67.7 60.9 67.5 62.4 68.8L65.2 71.2C67 72.7 67.2 75.5 65.4 77.2C59.2 84.9 49.8 90 40 90Z" fill="#0A2540" />
                <path d="M12 40C12 24.5 24.5 12 40 12C46.5 12 52.3 14.2 57 18C58.5 19.2 60.8 19 62.2 17.5L64.5 15C66.2 13.2 66 10.3 64.2 8.8C57.5 3.3 49.1 0 40 0C17.9 0 0 17.9 0 40C0 49.1 3.3 57.5 8.8 64.2C10.3 66 13.2 66.2 15 64.5L17.5 62.2C19 60.8 19.2 58.5 18 57C14.2 52.3 12 46.5 12 40Z" fill="#0A2540" />
                <defs>
                  <linearGradient id="integraGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FF9E00" />
                    <stop offset="100%" stopColor="#FF5E00" />
                  </linearGradient>
                </defs>
                <circle cx="50" cy="30" r="14" fill="url(#integraGrad)" />
                <circle cx="50" cy="65" r="18" fill="url(#integraGrad)" />
                <circle cx="20" cy="45" r="9" fill="#0A2540" />
              </svg>
              <div className="flex flex-col text-left leading-none font-sans">
                <span className="text-[10px] font-medium text-[#0A2540] tracking-wide">Fundacja</span>
                <span className="text-[12px] font-bold text-[#0A2540] tracking-tight -mt-0.5">Integra+</span>
              </div>
            </div>

            {/* EU Co-funded Logo SVG */}
            <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-[0_2px_8px_rgba(0,0,0,0.15)] border border-zinc-200">
              <svg width="34" height="23" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 border border-[#003399]/20 rounded-sm">
                <rect width="18" height="12" fill="#003399" />
                <g fill="#FFCC00">
                  {/* 12 Stars of the EU flag rendered with high fidelity */}
                  {[...Array(12)].map((_, i) => {
                    const angle = (i * 30 * Math.PI) / 180;
                    const r = 3.3;
                    const cx = 9 + r * Math.cos(angle);
                    const cy = 6 + r * Math.sin(angle);
                    return (
                      <polygon
                        key={i}
                        points={`
                          ${cx},${cy - 0.45} 
                          ${cx + 0.13},${cy - 0.13} 
                          ${cx + 0.45},${cy - 0.13} 
                          ${cx + 0.19},${cy + 0.08} 
                          ${cx + 0.29},${cy + 0.42} 
                          ${cx},${cy + 0.21} 
                          ${cx - 0.29},${cy + 0.42} 
                          ${cx - 0.19},${cy + 0.08} 
                          ${cx - 0.45},${cy - 0.13} 
                          ${cx - 0.13},${cy - 0.13}
                        `}
                      />
                    );
                  })}
                </g>
              </svg>
              <div className="flex flex-col text-left leading-none font-sans">
                <span className="text-[8px] font-bold text-[#003399] tracking-wider uppercase">Co-funded by</span>
                <span className="text-[10px] font-black text-[#003399] tracking-tight -mt-0.5">the European Union</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
