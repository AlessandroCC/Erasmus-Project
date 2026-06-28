import { useState } from 'react';
import Sidebar from './components/Sidebar';
import HomeView from './components/HomeView';
import MapView from './components/MapView';
import ChatsView from './components/ChatsView';
import QuestsView from './components/QuestsView';
import RewardsView from './components/RewardsView';
import ProfileView from './components/ProfileView';

import { Chat, MapPin, Quest, Reward, RedeemedItem, UserProfile } from './types';
import {
  INITIAL_USER,
  INITIAL_CHATS,
  INITIAL_PINS,
  INITIAL_QUESTS,
  INITIAL_REWARDS
} from './data/mockData';

export default function App() {
  // 1. Central states for the simulated prototype
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [points, setPoints] = useState<number>(470); // start with 470 as requested
  const [chats, setChats] = useState<Chat[]>(INITIAL_CHATS);
  const [pins, setPins] = useState<MapPin[]>(INITIAL_PINS);
  const [quests, setQuests] = useState<Quest[]>(INITIAL_QUESTS);
  const [rewards, setRewards] = useState<Reward[]>(INITIAL_REWARDS);
  const [redeemedItems, setRedeemedItems] = useState<RedeemedItem[]>([]);

  // 2. Helper helper functions passed down to views
  const addPoints = (pointsValue: number) => {
    setPoints(prev => prev + pointsValue);

    // Also boost user XP progress inside profile to make leveling up reactive!
    setUser(prev => {
      let nextXp = prev.xp + Math.floor(pointsValue * 1.5);
      let nextLevel = prev.level;
      if (nextXp >= prev.nextLevelXp) {
        nextXp = nextXp - prev.nextLevelXp;
        nextLevel += 1;
      }
      return {
        ...prev,
        xp: nextXp,
        level: nextLevel
      };
    });
  };

  // Render view conditionally based on active tab state
  const renderActiveView = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomeView
            user={user}
            setCurrentTab={setCurrentTab}
            points={points}
          />
        );
      case 'map':
        return (
          <MapView
            pins={pins}
            setPins={setPins}
            addPoints={addPoints}
          />
        );
      case 'chats':
        return (
          <ChatsView
            chats={chats}
            setChats={setChats}
            addPoints={addPoints}
          />
        );
      case 'quests':
        return (
          <QuestsView
            quests={quests}
            setQuests={setQuests}
            addPoints={addPoints}
            userPoints={points}
          />
        );
      case 'rewards':
        return (
          <RewardsView
            rewards={rewards}
            setRewards={setRewards}
            points={points}
            setPoints={setPoints}
            redeemedItems={redeemedItems}
            setRedeemedItems={setRedeemedItems}
          />
        );
      case 'profile':
        return (
          <ProfileView
            user={user}
            setUser={setUser}
            addPoints={addPoints}
          />
        );
      default:
        return (
          <HomeView
            user={user}
            setCurrentTab={setCurrentTab}
            points={points}
          />
        );
    }
  };

  return (
    <div id="root-layout" className="flex h-screen w-full bg-[#0f172a] overflow-hidden select-none font-sans antialiased text-zinc-100">
      
      {/* Persisted left-hand desktop panel navigation (inspired by university layout adaptions) */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        user={user}
        points={points}
      />

      {/* Primary view content window */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Dynamic decorative upper overlay for visual high-contrast depth */}
        <div className="absolute top-0 left-0 right-0 h-44 bg-gradient-to-b from-lime-400/5 to-transparent pointer-events-none z-0"></div>

        {/* View Frame */}
        <div className="flex-1 flex flex-col relative z-10 overflow-hidden">
          {renderActiveView()}
        </div>

      </main>

    </div>
  );
}
