import React, { useState } from 'react';
import { Trophy, CheckCircle, Flame, Compass, ChevronRight, Award, CircleDot, Play, ExternalLink, RefreshCw } from 'lucide-react';
import { Quest } from '../types';

interface QuestsViewProps {
  quests: Quest[];
  setQuests: React.Dispatch<React.SetStateAction<Quest[]>>;
  addPoints: (points: number) => void;
  userPoints: number;
}

export default function QuestsView({ quests, setQuests, addPoints, userPoints }: QuestsViewProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleClaimPoints = (questId: string, pointsValue: number) => {
    // 1. Mark quest as claimed in parent state
    setQuests(prevQuests =>
      prevQuests.map(q => {
        if (q.id === questId) {
          return { ...q, status: 'claimed' };
        }
        return q;
      })
    );

    // 2. Add points to user wallet
    addPoints(pointsValue);

    // 3. Show high-contrast celebratory toast
    setToastMessage(`🎉 Claimed +${pointsValue} Points! Wallet updated successfully.`);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const handleSimulateStep = (questId: string) => {
    setQuests(prevQuests =>
      prevQuests.map(q => {
        if (q.id === questId && q.status === 'in_progress') {
          const nextStep = q.currentStep + 1;
          const nextProgress = Math.floor((nextStep / q.totalSteps) * 100);
          const isFinished = nextStep >= q.totalSteps;
          return {
            ...q,
            currentStep: nextStep,
            progress: nextProgress,
            status: isFinished ? 'completed' : 'in_progress'
          };
        }
        return q;
      })
    );
  };

  const handleStartQuest = (questId: string) => {
    setQuests(prevQuests =>
      prevQuests.map(q => {
        if (q.id === questId && q.status === 'available') {
          return { ...q, status: 'in_progress', progress: 0, currentStep: 0 };
        }
        return q;
      })
    );
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'sports': return '🏀';
      case 'social': return '🤝';
      case 'growth': return '🧠';
      default: return '⚡';
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'sports': return 'text-orange-400 border-orange-500/20 bg-orange-500/10';
      case 'social': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
      case 'growth': return 'text-cyan-400 border-cyan-500/20 bg-cyan-500/10';
      default: return 'text-zinc-400 border-zinc-800 bg-zinc-900';
    }
  };

  const filteredQuests = quests.filter(q => {
    if (selectedCategory === 'all') return true;
    return q.category === selectedCategory;
  });

  // Calculate master stats
  const completedCount = quests.filter(q => q.status === 'completed' || q.status === 'claimed').length;
  const masteryPercentage = Math.round((completedCount / quests.length) * 100);

  return (
    <div id="quests-view" className="flex-1 overflow-y-auto bg-[#0f172a] text-zinc-100 p-8">
      
      {/* Toast Alert Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-lime-400 to-emerald-500 text-black px-6 py-4 rounded-2xl font-black font-mono shadow-[0_10px_35px_rgba(163,230,53,0.4)] border border-white/20 animate-bounce flex items-center gap-3">
          <Award size={20} className="stroke-[2.5]" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header Title Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="text-left">
            <span className="text-[10px] bg-amber-400/10 border border-amber-400/20 text-amber-400 px-3 py-1 font-mono font-bold rounded-full uppercase tracking-wider">
              🏆 Achievements & Missions
            </span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mt-2.5">GWB Quest Hub</h2>
            <p className="text-xs text-zinc-400">Unlock skills, complete training, and earn redeemable GWB points.</p>
          </div>

          {/* Quick Stats Block */}
          <div className="flex items-center gap-4 bg-[#1e293b]/40 border border-[#334155]/60 p-4 rounded-2xl shrink-0 font-mono">
            <div className="text-left pr-4 border-r border-[#334155]/60">
              <span className="text-[9px] text-zinc-500 block uppercase font-bold">Quests Finished</span>
              <span className="text-lg font-black text-white">{completedCount} / {quests.length}</span>
            </div>
            <div className="text-left">
              <span className="text-[9px] text-zinc-500 block uppercase font-bold">Total Points Earned</span>
              <span className="text-lg font-black text-lime-400">{userPoints + 450} <span className="text-[10px] text-zinc-500">PTS</span></span>
            </div>
          </div>
        </div>

        {/* Master Progress Meter (Inspired by Photo 2) */}
        <div className="bg-[#1e293b]/40 border border-[#334155]/60 p-6 rounded-3xl relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/5 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="flex justify-between items-baseline mb-4 text-left">
            <div>
              <h3 className="text-sm font-black text-white uppercase tracking-tight">Active District Mastery</h3>
              <p className="text-xs text-zinc-400">Complete quests to level up your status on the streets</p>
            </div>
            <span className="text-2xl font-black text-lime-400 font-mono">{masteryPercentage}%</span>
          </div>

          {/* Progress Bar Container */}
          <div className="space-y-2">
            <div className="h-4 bg-black border border-[#334155]/60 rounded-full p-0.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(163,230,53,0.5)]"
                style={{ width: `${masteryPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono font-bold uppercase">
              <span>Novice Player</span>
              <span>Squad Rookie</span>
              <span>District Mentor</span>
            </div>
          </div>
        </div>

        {/* Quests Filters */}
        <div className="flex flex-wrap gap-2 justify-start border-b border-[#334155]/40 pb-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-colors cursor-pointer ${selectedCategory === 'all' ? 'bg-lime-400 text-black font-extrabold' : 'bg-[#1e293b] text-[#94a3b8] hover:bg-slate-800/60'}`}
          >
            ● All Missions
          </button>
          <button
            onClick={() => setSelectedCategory('sports')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-colors flex items-center gap-2 cursor-pointer ${selectedCategory === 'sports' ? 'bg-orange-500 text-white font-extrabold' : 'bg-[#1e293b] text-[#94a3b8] hover:bg-slate-800/60'}`}
          >
            <span>🏀</span> Sports & Drills
          </button>
          <button
            onClick={() => setSelectedCategory('social')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-colors flex items-center gap-2 cursor-pointer ${selectedCategory === 'social' ? 'bg-emerald-500 text-white font-extrabold' : 'bg-[#1e293b] text-[#94a3b8] hover:bg-slate-800/60'}`}
          >
            <span>🤝</span> Social Impact
          </button>
          <button
            onClick={() => setSelectedCategory('growth')}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-colors flex items-center gap-2 cursor-pointer ${selectedCategory === 'growth' ? 'bg-cyan-500 text-white font-extrabold' : 'bg-[#1e293b] text-[#94a3b8] hover:bg-slate-800/60'}`}
          >
            <span>🧠</span> Mental Growth
          </button>
        </div>

        {/* Cards Queue (Inspired by Photo 2) */}
        <div className="space-y-6">
          {filteredQuests.map((quest) => {
            const isCompleted = quest.status === 'completed';
            const isClaimed = quest.status === 'claimed';
            const isInProgress = quest.status === 'in_progress';
            const isAvailable = quest.status === 'available';

            return (
              <div
                key={quest.id}
                id={`quest-card-${quest.id}`}
                className={`border rounded-3xl p-6 transition-all relative overflow-hidden text-left ${
                  isClaimed 
                    ? 'border-[#334155]/40 opacity-60 bg-black/40' 
                    : isCompleted 
                      ? 'bg-[#1e293b]/30 border-lime-400/50 shadow-[0_0_20px_rgba(207,255,4,0.15)]' 
                      : 'bg-[#1e293b]/40 border-[#334155]/60 hover:border-lime-400/40'
                }`}
              >
                
                {/* Neon tag watermark */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-lime-400/5 to-transparent rounded-full blur-xl pointer-events-none"></div>

                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  
                  {/* Category symbol block */}
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center text-2xl shrink-0 ${getCategoryColor(quest.category)}`}>
                    {getCategoryIcon(quest.category)}
                  </div>

                  {/* Body Content */}
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/40 pb-3">
                      <div>
                        <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-widest">{quest.category} Category</span>
                        <h3 className="text-lg font-extrabold text-white uppercase tracking-tight mt-1">{quest.title}</h3>
                      </div>
                      <div className="flex items-center gap-3 font-mono font-bold">
                        <span className="text-xs text-zinc-400 uppercase">Reward:</span>
                        <span className="text-sm text-lime-400 bg-lime-400/10 px-2.5 py-1 rounded-lg border border-lime-400/20">+{quest.points} PTS</span>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-400 leading-relaxed max-w-2xl">{quest.description}</p>

                    {/* Step-by-Step checklist breakdown inside the Quest */}
                    <div className="space-y-2.5 bg-black p-4 rounded-2xl border border-[#334155]/60">
                      <span className="text-[9px] text-zinc-500 font-mono font-bold uppercase tracking-wider block">Requirements:</span>
                      {quest.stepsList.map((step, idx) => {
                        const isStepDone = isInProgress && quest.currentStep > idx;
                        const isAllDone = isCompleted || isClaimed;
                        return (
                          <div key={idx} className="flex items-start gap-2 text-xs">
                            <span className="mt-0.5 shrink-0">
                              {isStepDone || isAllDone ? (
                                <span className="text-green-500 font-bold font-mono">✓</span>
                              ) : (
                                <span className="text-zinc-600 font-mono">○</span>
                              )}
                            </span>
                            <span className={`${isStepDone || isAllDone ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>{step}</span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Interactive Progress Bar inside Card */}
                    {!isAvailable && (
                      <div className="space-y-1.5 pt-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-zinc-500">Progress: {quest.currentStep} of {quest.totalSteps} steps</span>
                          <span className="text-white font-bold">{quest.progress}%</span>
                        </div>
                        <div className="h-2 bg-black border border-[#334155]/60 rounded-full overflow-hidden p-0.5">
                          <div
                            className="h-full bg-lime-400 rounded-full transition-all duration-300"
                            style={{ width: `${quest.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Action buttons based on Quest Status */}
                    <div className="pt-2 flex justify-end gap-3">
                      {isAvailable && (
                        <button
                          id={`start-quest-btn-${quest.id}`}
                          onClick={() => handleStartQuest(quest.id)}
                          className="px-5 py-2.5 bg-[#1e293b] hover:bg-[#1e293b]/80 text-white font-bold text-xs rounded-xl border border-[#334155]/60 transition-all flex items-center gap-1.5 cursor-pointer"
                        >
                          <Play size={12} /> Activate Quest
                        </button>
                      )}

                      {isInProgress && (
                        <div className="flex gap-2">
                          <button
                            id={`simulate-step-btn-${quest.id}`}
                            onClick={() => handleSimulateStep(quest.id)}
                            className="px-5 py-2.5 bg-[#1e293b] hover:bg-[#1e293b]/80 text-zinc-300 font-bold text-xs rounded-xl border border-[#334155]/60 transition-all flex items-center gap-1.5 cursor-pointer"
                          >
                            <RefreshCw size={12} /> Complete Step
                          </button>
                          <button
                            onClick={() => setSelectedCategory('all')}
                            className="px-4 py-2.5 bg-black border border-[#334155]/60 hover:bg-[#1e293b]/60 text-zinc-400 text-xs font-semibold rounded-xl transition-all"
                          >
                            Guidance Info
                          </button>
                        </div>
                      )}

                      {isCompleted && (
                        <button
                          id={`claim-quest-btn-${quest.id}`}
                          onClick={() => handleClaimPoints(quest.id, quest.points)}
                          className="px-6 py-3 bg-gradient-to-r from-lime-400 to-emerald-400 text-black font-black text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-[0_0_15px_rgba(163,230,53,0.4)] cursor-pointer"
                        >
                          <Award size={14} className="stroke-[2.5]" /> Claim +{quest.points} Points
                        </button>
                      )}

                      {isClaimed && (
                        <span className="text-xs font-mono font-bold text-zinc-500 bg-black border border-[#334155]/60 px-4 py-2 rounded-xl flex items-center gap-1.5">
                          ✓ Mission Accomplished & Points Redeemed
                        </span>
                      )}
                    </div>

                  </div>
                </div>

              </div>
            );
          })}

          {filteredQuests.length === 0 && (
            <div className="text-center py-16 px-4 bg-black/10 border border-[#334155]/60 border-dashed rounded-3xl">
              <Compass size={40} className="text-zinc-600 mx-auto mb-3" />
              <p className="text-sm text-zinc-500 font-mono">No active quests found in this category.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
