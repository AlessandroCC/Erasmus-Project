export interface Message {
  id: string;
  senderName: string;
  senderAvatar: string;
  senderRole: 'kid' | 'coach' | 'psychologist' | 'system';
  content: string;
  timestamp: string;
  isMe?: boolean;
  threadReplies?: Message[];
}

export interface Chat {
  id: string;
  name: string;
  avatar: string;
  type: 'group' | 'individual';
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  membersCount?: number;
  status?: string; // 'online' | 'offline' | 'typing'
  messages: Message[];
}

export interface MapPin {
  id: string;
  title: string;
  sport: 'Basketball' | 'Soccer' | 'Boxing' | 'Skate' | 'Meeting';
  type: 'match' | 'training' | 'hangout' | 'workshop';
  description: string;
  locationName: string;
  lat: number; // 0 to 100 relative on custom SVG map
  lng: number; // 0 to 100 relative on custom SVG map
  time: string;
  organizer: string;
  attendeesCount: number;
  isJoined?: boolean;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  points: number;
  progress: number; // 0 to 100
  totalSteps: number;
  currentStep: number;
  stepsList: string[];
  category: 'sports' | 'social' | 'growth';
  status: 'available' | 'in_progress' | 'completed' | 'claimed';
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  pointsCost: number;
  image: string; // SVG icon or beautiful styled placeholder
  category: 'gear' | 'experience' | 'voucher';
  stock: number;
}

export interface RedeemedItem {
  id: string;
  rewardId: string;
  title: string;
  pointsSpent: number;
  redeemedAt: string;
  status: 'processing' | 'ready_for_pickup' | 'collected';
  pickupCode: string;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  avatar: string;
  nickname: string;
  teamName: string;
  teamSport: string;
  rank: string;
  level: number;
  xp: number;
  nextLevelXp: number;
  joinedDate: string;
  emergencyContact: string;
}
