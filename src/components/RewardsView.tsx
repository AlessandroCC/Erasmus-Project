import React, { useState } from 'react';
import { Shirt, Droplet, Briefcase, Award, Sparkles, Utensils, Ticket, Check, RefreshCw, AlertCircle, ShoppingBag } from 'lucide-react';
import { Reward, RedeemedItem } from '../types';

interface RewardsViewProps {
  rewards: Reward[];
  setRewards: React.Dispatch<React.SetStateAction<Reward[]>>;
  points: number;
  setPoints: React.Dispatch<React.SetStateAction<number>>;
  redeemedItems: RedeemedItem[];
  setRedeemedItems: React.Dispatch<React.SetStateAction<RedeemedItem[]>>;
}

export default function RewardsView({
  rewards,
  setRewards,
  points,
  setPoints,
  redeemedItems,
  setRedeemedItems
}: RewardsViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [successToast, setSuccessToast] = useState<string | null>(null);
  const [errorToast, setErrorToast] = useState<string | null>(null);

  const handleRedeemItem = (reward: Reward) => {
    // 1. Validation: check points
    if (points < reward.pointsCost) {
      const difference = reward.pointsCost - points;
      setErrorToast(`❌ Insufficient Points! You need ${difference} more points. Go complete some missions!`);
      setTimeout(() => setErrorToast(null), 4000);
      return;
    }

    // 2. Validation: check stock
    if (reward.stock <= 0) {
      setErrorToast(`❌ Item is out of stock! Check back later.`);
      setTimeout(() => setErrorToast(null), 3000);
      return;
    }

    // 3. Subtract points
    setPoints(prev => prev - reward.pointsCost);

    // 4. Decrement stock
    setRewards(prevRewards =>
      prevRewards.map(r => {
        if (r.id === reward.id) {
          return { ...r, stock: r.stock - 1 };
        }
        return r;
      })
    );

    // 5. Generate pickup code and add to redeemed inventory
    const generateCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let code = 'GWB-';
      for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return code;
    };

    const newRedemption: RedeemedItem = {
      id: `red_${Date.now()}`,
      rewardId: reward.id,
      title: reward.title,
      pointsSpent: reward.pointsCost,
      redeemedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'ready_for_pickup',
      pickupCode: generateCode()
    };

    setRedeemedItems(prev => [newRedemption, ...prev]);

    // 6. Show success toast
    setSuccessToast(`🎁 Success! Claimed "${reward.title}". Your pickup code is: ${newRedemption.pickupCode}`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  const getRewardIcon = (iconName: string) => {
    switch (iconName) {
      case 'shirt': return <Shirt size={24} className="text-lime-400" />;
      case 'droplet': return <Droplet size={24} className="text-cyan-400" />;
      case 'backpack': return <Briefcase size={24} className="text-orange-400" />;
      case 'basketball': return <Award size={24} className="text-amber-400" />;
      case 'sparkles': return <Sparkles size={24} className="text-pink-400" />;
      case 'utensils': return <Utensils size={24} className="text-emerald-400" />;
      default: return <Ticket size={24} className="text-zinc-400" />;
    }
  };

  const filteredRewards = rewards.filter(r => {
    if (activeCategory === 'all') return true;
    return r.category === activeCategory;
  });

  return (
    <div id="rewards-view" className="flex-1 overflow-y-auto bg-[#0f172a] text-zinc-100 p-8">
      
      {/* Toast notifications */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 rounded-2xl font-black font-mono shadow-[0_10px_35px_rgba(34,197,94,0.4)] border border-white/20 animate-fade-in flex flex-col gap-1 max-w-sm text-left">
          <div className="flex items-center gap-2">
            <Check size={18} className="stroke-[3] text-lime-300" />
            <span className="text-sm">Redeemed Successfully!</span>
          </div>
          <span className="text-xs text-zinc-100 font-normal leading-relaxed">{successToast.split('! ')[1]}</span>
        </div>
      )}

      {errorToast && (
        <div className="fixed top-6 right-6 z-50 bg-red-600 text-white px-6 py-4 rounded-2xl font-bold font-mono shadow-[0_10px_35px_rgba(220,38,38,0.4)] border border-white/20 animate-shake flex items-center gap-3 max-w-sm text-left">
          <AlertCircle size={20} className="shrink-0 text-red-200" />
          <span className="text-xs leading-tight">{errorToast}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header HUD */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-left">
            <span className="text-[10px] bg-lime-400/10 border border-lime-400/20 text-lime-400 px-3 py-1 font-mono font-bold rounded-full uppercase tracking-wider">
              🎁 Store & gear desk
            </span>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mt-2.5">Redeemable Gear</h2>
            <p className="text-xs text-zinc-400">Trade your earned GWB points for premium street apparel and sports vouchers.</p>
          </div>

          {/* Point wallet card (Double checked alignment with user points balance) */}
          <div className="bg-[#1e293b]/40 border-2 border-[#334155]/60 p-5 rounded-2xl shrink-0 text-left min-w-[200px] relative overflow-hidden shadow-2xl">
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-amber-400/10 rounded-full blur-xl"></div>
            <span className="text-[10px] text-zinc-500 font-mono font-black uppercase tracking-widest block mb-1">Your Total Balance</span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black text-white font-mono">{points}</span>
              <span className="text-xs text-amber-400 font-bold font-mono">PTS AVAILABLE</span>
            </div>
          </div>
        </div>

        {/* Master Catalog section */}
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left 2 Columns: Catalog Grid */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Category Filter tabs */}
            <div className="flex flex-wrap gap-2 pb-2 justify-start border-b border-[#334155]/40">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-colors cursor-pointer ${activeCategory === 'all' ? 'bg-lime-400 text-black font-extrabold' : 'bg-[#1e293b] text-[#94a3b8] hover:bg-slate-800/60'}`}
              >
                ● All Gear
              </button>
              <button
                onClick={() => setActiveCategory('gear')}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-colors cursor-pointer ${activeCategory === 'gear' ? 'bg-orange-500 text-white font-extrabold' : 'bg-[#1e293b] text-[#94a3b8] hover:bg-slate-800/60'}`}
              >
                🎒 Accessories & Apparel
              </button>
              <button
                onClick={() => setActiveCategory('experience')}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-colors cursor-pointer ${activeCategory === 'experience' ? 'bg-cyan-500 text-white font-extrabold' : 'bg-[#1e293b] text-[#94a3b8] hover:bg-slate-800/60'}`}
              >
                ⭐ Mentoring & Camps
              </button>
              <button
                onClick={() => setActiveCategory('voucher')}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold font-mono transition-colors cursor-pointer ${activeCategory === 'voucher' ? 'bg-emerald-500 text-white font-extrabold' : 'bg-[#1e293b] text-[#94a3b8] hover:bg-slate-800/60'}`}
              >
                🍔 Food Vouchers
              </button>
            </div>

            {/* Catalog list */}
            <div className="grid md:grid-cols-2 gap-6">
              {filteredRewards.map((reward) => {
                const canAfford = points >= reward.pointsCost;
                const outOfStock = reward.stock <= 0;

                return (
                  <div
                    key={reward.id}
                    className="bg-[#1e293b]/40 border border-[#334155]/60 rounded-2xl p-5 flex flex-col justify-between hover:border-lime-400/40 transition-all text-left relative"
                  >
                    {outOfStock && (
                      <span className="absolute top-3 right-3 bg-red-600 text-white font-mono text-[9px] font-black px-2 py-0.5 rounded uppercase">
                        Sold Out
                      </span>
                    )}

                    <div className="space-y-4">
                      {/* Logo Placeholder inside Card */}
                      <div className="w-11 h-11 rounded-xl bg-black border border-[#334155]/60 flex items-center justify-center">
                        {getRewardIcon(reward.image)}
                      </div>

                      <div>
                        <h4 className="text-base font-extrabold text-white uppercase tracking-tight truncate">{reward.title}</h4>
                        <p className="text-[11px] text-zinc-400 mt-1.5 leading-relaxed h-14 overflow-hidden text-ellipsis">
                          {reward.description}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 pt-3.5 border-t border-[#334155]/40 flex items-center justify-between">
                      <div className="font-mono text-left">
                        <span className="text-[9px] text-zinc-500 block uppercase font-bold">Cost</span>
                        <span className="text-base font-extrabold text-lime-400">{reward.pointsCost} <span className="text-[10px] font-sans font-bold text-zinc-400">PTS</span></span>
                      </div>

                      <button
                        id={`redeem-btn-${reward.id}`}
                        onClick={() => handleRedeemItem(reward)}
                        disabled={outOfStock}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          outOfStock
                            ? 'bg-black border border-[#334155]/60 text-zinc-600 cursor-not-allowed'
                            : canAfford
                              ? 'bg-lime-400 text-black hover:bg-lime-300 shadow-md'
                              : 'bg-[#1e293b] text-[#94a3b8]/60 hover:bg-slate-800'
                        }`}
                      >
                        {outOfStock ? 'No Stock' : canAfford ? 'Redeem Item' : `Need ${reward.pointsCost - points} pts`}
                      </button>
                    </div>

                    <div className="mt-2.5 flex justify-between text-[9px] text-zinc-500 font-mono">
                      <span>Stock Left: {reward.stock} items</span>
                      <span>HQ Delivery</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 1 Column: "My Redeemed Items / Backpack" (inspired by Photo 1 structure) */}
          <div className="bg-[#1e293b]/40 border border-[#334155]/60 rounded-3xl p-6 h-fit space-y-6">
            <div className="flex items-center gap-2 border-b border-[#334155]/40 pb-3">
              <ShoppingBag className="text-lime-400" size={18} />
              <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono text-left">My Claimed Backpack</h3>
            </div>

            <p className="text-[11px] text-zinc-400 text-left leading-relaxed">
              Show these pickup codes to your local team coach at headquarters or court check-in to collect physical gear!
            </p>

            <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
              {redeemedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-black border border-[#334155]/60 p-4 rounded-2xl space-y-2 text-left hover:border-lime-400/40 transition-colors"
                >
                  <div className="flex justify-between items-start gap-1">
                    <h5 className="text-xs font-extrabold text-white uppercase truncate">{item.title}</h5>
                    <span className="text-[9px] bg-lime-400/10 text-lime-400 font-mono font-bold px-1.5 py-0.5 rounded border border-lime-400/20 whitespace-nowrap">
                      Ready
                    </span>
                  </div>

                  <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                    <span>Spent: {item.pointsSpent} pts</span>
                    <span>{item.redeemedAt}</span>
                  </div>

                  <div className="bg-[#1e293b]/80 border border-dashed border-[#334155]/60 px-3 py-2 rounded-xl flex items-center justify-between mt-2 font-mono">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase">Pickup Code</span>
                    <span className="text-xs font-black text-white tracking-widest">{item.pickupCode}</span>
                  </div>
                </div>
              ))}

              {redeemedItems.length === 0 && (
                <div className="text-center py-12 bg-black/40 border border-dashed border-[#334155]/60 rounded-2xl">
                  <p className="text-xs text-zinc-500 font-mono">Your claimed backpack is empty.</p>
                  <p className="text-[10px] text-zinc-600 font-mono mt-1">Acquire points from quests to shop gear!</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
