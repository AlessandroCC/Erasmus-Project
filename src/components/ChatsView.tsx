import React, { useState, useRef, useEffect } from 'react';
import { Send, Search, Check, CheckCheck, MoreVertical, Paperclip, MessageSquare, CornerDownRight, X, Sparkles, Smile } from 'lucide-react';
import { Chat, Message } from '../types';

interface ChatsViewProps {
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  addPoints: (points: number) => void;
}

export default function ChatsView({ chats, setChats, addPoints }: ChatsViewProps) {
  const [selectedChatId, setSelectedChatId] = useState<string>('chat_group_hoops');
  const [inputValue, setInputValue] = useState<string>('');
  const [threadMessage, setSelectedMessageThread] = useState<Message | null>(null);
  const [threadInputValue, setThreadInputValue] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const chatEndRef = useRef<HTMLDivElement>(null);
  const threadEndRef = useRef<HTMLDivElement>(null);

  const selectedChat = chats.find(c => c.id === selectedChatId) || chats[0];

  // Scroll to bottom when message list changes
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedChat?.messages?.length, selectedChatId]);

  // Scroll thread to bottom
  useEffect(() => {
    threadEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [threadMessage?.threadReplies?.length]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: `msg_user_${Date.now()}`,
      senderName: 'Jordan (You)',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      senderRole: 'kid',
      content: inputValue,
      timestamp: 'Just now',
      isMe: true,
      threadReplies: []
    };

    const sentText = inputValue;
    setInputValue('');

    // Update messages in state
    setChats(prevChats =>
      prevChats.map(c => {
        if (c.id === selectedChatId) {
          return {
            ...c,
            lastMessage: `You: ${sentText}`,
            lastMessageTime: 'Just now',
            messages: [...c.messages, userMessage]
          };
        }
        return c;
      })
    );

    // Dynamic mock response generation based on the active chat
    setTimeout(() => {
      let replyContent = "Keep working hard! The court never lies.";
      let replierName = "Coach Marco";
      let replierAvatar = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&h=128&q=80";
      let replierRole: 'coach' | 'psychologist' | 'kid' | 'system' = 'coach';

      if (selectedChatId === 'chat_group_hoops') {
        const triggers = [
          { keyword: 'training', reply: "Coach Marco: 'Practice starts exactly at 5 PM. Don't be late!'" },
          { keyword: 'ball', reply: "Leo (Captain): 'Yeah Jordan, we need a fresh street grip ball. Bring yours!'" },
          { keyword: 'hey', reply: "Tariq: 'Yo! Getting on my sneakers now.'" },
        ];
        const match = triggers.find(t => sentText.toLowerCase().includes(t.keyword));
        replyContent = match ? match.reply.split(': ')[1] : "Leo (Captain): 'Solid work, Jordan. See you on the pavement shortly!'";
        replierName = match ? match.reply.split(': ')[0] : "Leo (Captain)";
        replierAvatar = replierName.startsWith('Coach') 
          ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&h=128&q=80"
          : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80";
        replierRole = replierName.startsWith('Coach') ? 'coach' : 'kid';
      } else if (selectedChatId === 'chat_coach_marco') {
        replyContent = "Got your update, Jordan. Stay focused on your breathing cycles and complete those defensive stance drills. Points are waiting!";
      } else if (selectedChatId === 'chat_dr_clara') {
        replyContent = "I love how reflective you are, Jordan. It is completely normal to feel that way. Let's touch base tomorrow at headquarters for pizza, okay?";
        replierName = "Dr. Clara";
        replierAvatar = "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&h=128&q=80";
        replierRole = 'psychologist';
      }

      const systemReply: Message = {
        id: `msg_reply_${Date.now()}`,
        senderName: replierName,
        senderAvatar: replierAvatar,
        senderRole: replierRole,
        content: replyContent,
        timestamp: 'Just now',
        threadReplies: []
      };

      setChats(prevChats =>
        prevChats.map(c => {
          if (c.id === selectedChatId) {
            return {
              ...c,
              lastMessage: `${replierName}: ${replyContent}`,
              lastMessageTime: 'Just now',
              messages: [...c.messages, systemReply]
            };
          }
          return c;
        })
      );

      // Award a small interaction bonus for active chat!
      addPoints(5);

    }, 1500);
  };

  const handleSendThreadReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!threadInputValue.trim() || !threadMessage) return;

    const userReply: Message = {
      id: `msg_reply_thread_${Date.now()}`,
      senderName: 'Jordan (You)',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
      senderRole: 'kid',
      content: threadInputValue,
      timestamp: 'Just now',
      isMe: true
    };

    const newReplyText = threadInputValue;
    setThreadInputValue('');

    // Update local thread state
    const updatedThreadReplies = [...(threadMessage.threadReplies || []), userReply];
    setSelectedMessageThread({
      ...threadMessage,
      threadReplies: updatedThreadReplies
    });

    // Update in root chats state
    setChats(prevChats =>
      prevChats.map(c => {
        if (c.id === selectedChatId) {
          const updatedMessages = c.messages.map(m => {
            if (m.id === threadMessage.id) {
              return {
                ...m,
                threadReplies: updatedThreadReplies
              };
            }
            return m;
          });
          return {
            ...c,
            messages: updatedMessages
          };
        }
        return c;
      })
    );

    // Mock replies in thread!
    setTimeout(() => {
      let replier = "Coach Marco";
      if (selectedChatId === 'chat_dr_clara') replier = "Dr. Clara";
      else if (selectedChatId === 'chat_group_hoops' && threadMessage.senderName.includes('Leo')) replier = "Leo (Captain)";

      const threadBotReply: Message = {
        id: `msg_reply_thread_bot_${Date.now()}`,
        senderName: replier,
        senderAvatar: replier.includes('Marco') ? "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&h=128&q=80" : 
                     replier.includes('Clara') ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&h=128&q=80" : 
                     "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80",
        senderRole: replier.includes('Marco') ? 'coach' : replier.includes('Clara') ? 'psychologist' : 'kid',
        content: `Got it! Let's follow through with this on court. 🚀`,
        timestamp: 'Just now'
      };

      const finalReplies = [...updatedThreadReplies, threadBotReply];
      
      setSelectedMessageThread(prev => {
        if (!prev) return null;
        return {
          ...prev,
          threadReplies: finalReplies
        };
      });

      setChats(prevChats =>
        prevChats.map(c => {
          if (c.id === selectedChatId) {
            const updatedMessages = c.messages.map(m => {
              if (m.id === threadMessage.id) {
                return {
                  ...m,
                  threadReplies: finalReplies
                };
              }
              return m;
            });
            return {
              ...c,
              messages: updatedMessages
            };
          }
          return c;
        })
      );
    }, 1200);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'coach': return 'border-orange-500 bg-orange-500/10 text-orange-400';
      case 'psychologist': return 'border-cyan-500 bg-cyan-500/10 text-cyan-400';
      default: return 'border-zinc-700 bg-zinc-800 text-zinc-400';
    }
  };

  const filteredChats = chats.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="chats-view" className="flex-1 flex h-screen bg-[#0f172a] overflow-hidden">
      
      {/* 1. Left Chat List Sidebar (WhatsApp style) */}
      <div className="w-80 border-r border-[#334155]/60 bg-black flex flex-col h-full shrink-0">
        <div className="p-4 border-b border-[#334155]/40 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-black text-white uppercase tracking-tight">Active Chats</h3>
            <span className="text-[10px] bg-lime-400 text-black px-2 py-0.5 font-mono font-bold rounded">LIVE FEED</span>
          </div>
          
          {/* Custom Search bar */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 text-zinc-500" size={14} />
            <input
              type="text"
              placeholder="Search chat or mentor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-[#1e293b] border border-[#334155] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition-all font-mono"
            />
          </div>
        </div>

        {/* Chats Queue */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#334155]/30">
          {filteredChats.map((chat) => {
            const isSelected = chat.id === selectedChatId;
            return (
              <button
                key={chat.id}
                id={`chat-item-${chat.id}`}
                onClick={() => {
                  setSelectedChatId(chat.id);
                  setSelectedMessageThread(null); // reset thread pane
                }}
                className={`w-full p-4 flex items-start gap-3 transition-colors text-left cursor-pointer ${
                  isSelected ? 'bg-[#1e293b] border-l-4 border-lime-400' : 'hover:bg-[#1e293b]/50'
                }`}
              >
                <div className="relative shrink-0 mt-0.5">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-zinc-700"
                  />
                  {chat.status === 'online' && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="text-sm font-bold text-white truncate">{chat.name}</h4>
                    <span className="text-[10px] text-zinc-500 font-mono font-bold">{chat.lastMessageTime}</span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate leading-snug">{chat.lastMessage}</p>
                </div>

                {chat.unreadCount > 0 && (
                  <span className="shrink-0 mt-1.5 w-5 h-5 bg-lime-400 text-black text-[10px] font-mono font-bold rounded-full flex items-center justify-center">
                    {chat.unreadCount}
                  </span>
                )}
              </button>
            );
          })}

          {filteredChats.length === 0 && (
            <div className="p-8 text-center">
              <p className="text-xs text-zinc-500">No conversations found.</p>
            </div>
          )}
        </div>
      </div>

      {/* 2. Middle Main Pane: Conversations area */}
      <div className="flex-1 flex flex-col h-full bg-[#0f172a] relative">
        
        {/* Chat Jumbotron Header */}
        <div className="p-4 border-b border-[#334155]/40 bg-black flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <img
              src={selectedChat.avatar}
              alt={selectedChat.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-zinc-700"
            />
            <div className="text-left">
              <h3 className="text-sm font-extrabold text-white leading-tight">{selectedChat.name}</h3>
              <p className="text-[10px] text-zinc-400 font-mono mt-0.5">
                {selectedChat.type === 'group' 
                  ? `${selectedChat.membersCount} participants • Sports Hub` 
                  : selectedChat.status === 'online' ? '● Online & Listening' : 'Offline'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-zinc-500 font-mono hidden md:inline">Click message bubble to open Thread replies</span>
            <button className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800">
              <MoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Messages Scrolling Arena */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-[#0f172a]">
          
          <div className="text-center">
            <span className="inline-block text-[9px] font-mono font-bold tracking-widest uppercase text-zinc-400 bg-[#1e293b] border border-[#334155] px-3 py-1 rounded-full mb-2">
              COMMUNAL SQUAD ROOM
            </span>
          </div>

          {selectedChat.messages.map((msg, index) => {
            const hasReplies = msg.threadReplies && msg.threadReplies.length > 0;
            return (
              <div
                key={msg.id || index}
                className={`flex gap-3 max-w-[80%] ${msg.isMe ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                {!msg.isMe && (
                  <img
                    src={msg.senderAvatar}
                    alt={msg.senderName}
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 rounded-full object-cover shrink-0 mt-1 border border-zinc-700"
                  />
                )}

                <div className="space-y-1">
                  {/* Sender Name & Role */}
                  <div className={`flex items-center gap-1.5 text-xs font-semibold ${msg.isMe ? 'justify-end text-lime-400' : 'text-zinc-300'}`}>
                    <span>{msg.senderName}</span>
                    {msg.senderRole !== 'kid' && (
                      <span className={`text-[9px] px-1.5 py-0.2 rounded border font-mono uppercase font-black ${getRoleBadge(msg.senderRole)}`}>
                        {msg.senderRole}
                      </span>
                    )}
                  </div>

                  {/* Bubble Container (Clicking opens thread) */}
                  <div
                    id={`message-bubble-${msg.id}`}
                    onClick={() => setSelectedMessageThread(msg)}
                    className={`p-3.5 rounded-2xl text-xs relative cursor-pointer group transition-all ${
                      msg.isMe
                        ? 'bg-lime-400 text-black font-medium rounded-tr-none hover:bg-lime-300 shadow-md'
                        : 'bg-[#1e293b] text-zinc-200 rounded-tl-none border border-[#334155] hover:border-lime-400/50'
                    }`}
                  >
                    <p className="leading-relaxed whitespace-pre-line">{msg.content}</p>

                    {/* Meta indicator (Click info overlay) */}
                    <span className="absolute bottom-1 right-2 scale-75 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 text-[8px] font-bold font-mono">
                      {msg.isMe ? 'Click to view thread' : 'Click to reply'} <CornerDownRight size={8} />
                    </span>

                    {/* Quick indicator if message has an active sub-thread */}
                    {hasReplies && (
                      <div className={`mt-2 flex items-center gap-1 text-[10px] font-bold font-mono py-1 px-2 rounded ${msg.isMe ? 'bg-black/10 text-black' : 'bg-[#0f172a] text-lime-400 border border-[#334155]/60'}`}>
                        <MessageSquare size={10} />
                        <span>{msg.threadReplies?.length} Thread Replies</span>
                      </div>
                    )}
                  </div>

                  {/* Timestamp / Read ticks */}
                  <div className={`flex items-center gap-1 text-[9px] text-zinc-500 font-mono ${msg.isMe ? 'justify-end' : ''}`}>
                    <span>{msg.timestamp}</span>
                    {msg.isMe && <CheckCheck size={12} className="text-lime-500" />}
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={chatEndRef} />
        </div>

        {/* Message Input Controls Panel */}
        <form onSubmit={handleSendMessage} className="p-4 bg-black border-t border-[#334155]/40 flex items-center gap-3 z-10">
          <button type="button" className="p-2 text-zinc-400 hover:text-white hover:bg-[#1e293b] rounded-lg">
            <Paperclip size={18} />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder={`Write message to ${selectedChat.name}...`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full bg-[#1e293b] border border-[#334155] rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 transition-all font-mono"
            />
            <button type="button" className="absolute right-3.5 top-3 text-zinc-500 hover:text-zinc-300">
              <Smile size={16} />
            </button>
          </div>

          <button
            type="submit"
            className="p-3 bg-lime-400 hover:bg-lime-300 text-black font-extrabold rounded-xl transition-all cursor-pointer shadow-[0_2px_10px_rgba(163,230,53,0.3)]"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* 3. Right Thread Details Drawer Panel (Inspired by Photo 3 / Photo 4 WhatsApp Threads) */}
      {threadMessage && (
        <div id="thread-drawer" className="w-80 border-l border-[#334155]/60 bg-black flex flex-col h-full z-25 shrink-0 animate-slide-in">
          
          {/* Thread Header */}
          <div className="p-4 border-b border-[#334155]/40 flex items-center justify-between bg-black">
            <div className="flex items-center gap-2">
              <MessageSquare size={16} className="text-lime-400" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider font-mono">Thread Conversation</h3>
            </div>
            <button
              onClick={() => setSelectedMessageThread(null)}
              className="p-1 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Original Source Message Card */}
          <div className="p-4 border-b border-[#334155]/40 bg-[#1e293b]/20 text-left">
            <span className="text-[9px] text-zinc-400 font-mono font-bold uppercase tracking-wider block mb-2">Original Message</span>
            <div className="flex gap-2.5 items-start">
              <img
                src={threadMessage.senderAvatar}
                alt={threadMessage.senderName}
                referrerPolicy="no-referrer"
                className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5"
              />
              <div className="min-w-0">
                <p className="text-xs font-bold text-white truncate">{threadMessage.senderName}</p>
                <div className="p-2.5 rounded-xl bg-black border border-[#334155] text-zinc-300 text-xs mt-1 leading-normal whitespace-pre-wrap">
                  {threadMessage.content}
                </div>
                <span className="text-[8px] text-zinc-500 font-mono mt-1 block">{threadMessage.timestamp}</span>
              </div>
            </div>
          </div>

          {/* Thread Replies List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <span className="text-[9px] text-zinc-500 font-mono font-bold uppercase tracking-wider block">Replies ({threadMessage.threadReplies?.length || 0})</span>
            
            {threadMessage.threadReplies && threadMessage.threadReplies.length > 0 ? (
              threadMessage.threadReplies.map((reply, index) => (
                <div key={reply.id || index} className="flex gap-2.5 items-start text-left">
                  <img
                    src={reply.senderAvatar}
                    alt={reply.senderName}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 border border-zinc-800"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                      <span>{reply.senderName}</span>
                      {reply.senderRole && reply.senderRole !== 'kid' && (
                        <span className={`text-[8px] px-1 rounded border font-mono uppercase font-black ${getRoleBadge(reply.senderRole)}`}>
                          {reply.senderRole}
                        </span>
                      )}
                    </p>
                    <div className={`p-2.5 rounded-xl text-xs mt-1 leading-normal ${
                      reply.isMe ? 'bg-lime-400 text-black font-semibold' : 'bg-[#1e293b] text-zinc-300 border border-[#334155]/60'
                    }`}>
                      {reply.content}
                    </div>
                    <span className="text-[8px] text-zinc-500 font-mono mt-1 block">{reply.timestamp}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-xs text-zinc-500">No replies in this thread yet. Be the first to start a conversation!</p>
              </div>
            )}
            <div ref={threadEndRef} />
          </div>

          {/* Thread Reply Input Box */}
          <form onSubmit={handleSendThreadReply} className="p-3 bg-[#1e293b] border-t border-[#334155]/60 flex items-center gap-2">
            <input
              type="text"
              placeholder="Reply to this thread..."
              value={threadInputValue}
              onChange={(e) => setThreadInputValue(e.target.value)}
              className="flex-1 bg-black border border-[#334155] rounded-lg px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-lime-400 font-mono"
            />
            <button
              type="submit"
              className="p-2 bg-lime-400 hover:bg-lime-300 text-black font-bold rounded-lg transition-all cursor-pointer"
            >
              <Send size={12} />
            </button>
          </form>
        </div>
      )}

    </div>
  );
}
