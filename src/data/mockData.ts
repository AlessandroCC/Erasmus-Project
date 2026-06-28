import { Chat, MapPin, Quest, Reward, UserProfile } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'user_01',
  firstName: 'Jordan',
  lastName: 'Silva',
  nickname: 'Aero',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  teamName: 'East-Side Wildcats',
  teamSport: 'Basketball',
  rank: 'Street Elite',
  level: 4,
  xp: 720,
  nextLevelXp: 1000,
  joinedDate: 'March 15, 2026',
  emergencyContact: 'Aunt Teresa (+55 11 98765-4321)',
};

export const INITIAL_CHATS: Chat[] = [
  {
    id: 'chat_group_hoops',
    name: 'East-Side Wildcats 🏀',
    avatar: 'https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=128&h=128&q=80',
    type: 'group',
    lastMessage: 'Coach Marco: Great workout today, wildcats! Keep it up.',
    lastMessageTime: '09:42 AM',
    unreadCount: 3,
    membersCount: 12,
    status: 'online',
    messages: [
      {
        id: 'msg_wildcats_1',
        senderName: 'Leo (Captain)',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80',
        senderRole: 'kid',
        content: 'Hey gang, who is coming to the court at 5 PM today? We need at least 6 for a solid scrimmage.',
        timestamp: 'Yesterday, 4:15 PM',
        threadReplies: [
          {
            id: 'tr_1',
            senderName: 'Tariq',
            senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&h=128&q=80',
            senderRole: 'kid',
            content: 'I am down! Bringing my own basketball too.',
            timestamp: 'Yesterday, 4:18 PM'
          },
          {
            id: 'tr_2',
            senderName: 'Jordan (You)',
            senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
            senderRole: 'kid',
            content: 'Count me in, Leo! Need to practice my jump shot anyway.',
            timestamp: 'Yesterday, 4:22 PM',
            isMe: true
          }
        ]
      },
      {
        id: 'msg_wildcats_2',
        senderName: 'Jordan (You)',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
        senderRole: 'kid',
        content: 'Are we doing the drills Coach Marco uploaded in the Quests section?',
        timestamp: 'Yesterday, 4:30 PM',
        isMe: true
      },
      {
        id: 'msg_wildcats_3',
        senderName: 'Coach Marco',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&h=128&q=80',
        senderRole: 'coach',
        content: 'Yes! Focus on those dribbling crossovers. Your left hand needs to be as lethal as your right!',
        timestamp: 'Yesterday, 5:02 PM',
        threadReplies: [
          {
            id: 'tr_3',
            senderName: 'Jordan (You)',
            senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
            senderRole: 'kid',
            content: 'Got it, coach! Working on it daily.',
            timestamp: 'Yesterday, 5:05 PM',
            isMe: true
          }
        ]
      },
      {
        id: 'msg_wildcats_4',
        senderName: 'Tariq',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=128&h=128&q=80',
        senderRole: 'kid',
        content: 'The court is swept and ready. Air is clean.',
        timestamp: 'Yesterday, 6:10 PM'
      },
      {
        id: 'msg_wildcats_5',
        senderName: 'Coach Marco',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&h=128&q=80',
        senderRole: 'coach',
        content: 'Great workout today, wildcats! Keep it up.',
        timestamp: '09:42 AM'
      }
    ]
  },
  {
    id: 'chat_coach_marco',
    name: 'Coach Marco 🏀',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&h=128&q=80',
    type: 'individual',
    lastMessage: 'Make sure to log your reps, Jordan.',
    lastMessageTime: '10:05 AM',
    unreadCount: 0,
    status: 'online',
    messages: [
      {
        id: 'msg_marco_1',
        senderName: 'Coach Marco',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&h=128&q=80',
        senderRole: 'coach',
        content: 'Hey Jordan, noticed you missed the workshop last Tuesday. Everything okay at home?',
        timestamp: 'Wednesday, 2:10 PM'
      },
      {
        id: 'msg_marco_2',
        senderName: 'Jordan (You)',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
        senderRole: 'kid',
        content: 'Yes coach, sorry about that. I had to help my aunt carry groceries and watch my younger cousin. I did do my conditioning workout at night though!',
        timestamp: 'Wednesday, 2:32 PM',
        isMe: true
      },
      {
        id: 'msg_marco_3',
        senderName: 'Coach Marco',
        senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=128&h=128&q=80',
        senderRole: 'coach',
        content: 'No need to apologize, family comes first. I am glad you got the conditioning done! That shows real character. Make sure to log your reps, Jordan.',
        timestamp: 'Wednesday, 3:00 PM'
      }
    ]
  },
  {
    id: 'chat_dr_clara',
    name: 'Dr. Clara (Psychologist) 🧠',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&h=128&q=80',
    type: 'individual',
    lastMessage: 'Awesome! Let\'s schedule 15 minutes soon.',
    lastMessageTime: 'Yesterday, 5:30 PM',
    unreadCount: 1,
    status: 'offline',
    messages: [
      {
        id: 'msg_clara_1',
        senderName: 'Dr. Clara',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&h=128&q=80',
        senderRole: 'psychologist',
        content: 'Hello Jordan! Just checking in on you. I know this week was a bit heavy with exams and practices. How is your stress levels?',
        timestamp: 'Yesterday, 3:20 PM'
      },
      {
        id: 'msg_clara_2',
        senderName: 'Jordan (You)',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
        senderRole: 'kid',
        content: 'Hi Dr. Clara, thanks for asking. Basketball is actually helping me vent a lot of frustration. When I am on the court, everything else goes quiet.',
        timestamp: 'Yesterday, 4:15 PM',
        isMe: true
      },
      {
        id: 'msg_clara_3',
        senderName: 'Dr. Clara',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&h=128&q=80',
        senderRole: 'psychologist',
        content: 'That is exactly why sports is therapy! Channeling that energy is beautiful. Awesome! Let\'s schedule 15 minutes soon to talk about goals.',
        timestamp: 'Yesterday, 5:30 PM'
      }
    ]
  },
  {
    id: 'chat_group_futsal',
    name: 'Asphalt Kings Futsal ⚽',
    avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=128&h=128&q=80',
    type: 'group',
    lastMessage: 'Bruno: Match under the highway is confirmed!',
    lastMessageTime: 'Monday',
    unreadCount: 0,
    membersCount: 8,
    status: 'offline',
    messages: [
      {
        id: 'msg_futsal_1',
        senderName: 'Bruno',
        senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=128&h=128&q=80',
        senderRole: 'kid',
        content: 'Match under the highway is confirmed! Friday at 7 PM. Coach Sergio is bringing the bibs.',
        timestamp: 'Monday, 11:20 AM'
      }
    ]
  }
];

export const INITIAL_PINS: MapPin[] = [
  {
    id: 'pin_01',
    title: 'Wildcats Scrimmage Meetup',
    sport: 'Basketball',
    type: 'match',
    description: 'Casual pick-up match open to any kids in the district. Coach Marco supervising and scouting for the Wildcats roster.',
    locationName: 'Metro Court Block 12',
    lat: 38,
    lng: 42,
    time: 'Today, 5:00 PM',
    organizer: 'Coach Marco',
    attendeesCount: 9,
    isJoined: true,
  },
  {
    id: 'pin_02',
    title: 'Futsal Turf Clash',
    sport: 'Soccer',
    type: 'match',
    description: 'Fast-paced futsal play under the Highway Overpass court. Bring light shoes.',
    locationName: 'highway Overpass Court B',
    lat: 62,
    lng: 24,
    time: 'Friday, 7:00 PM',
    organizer: 'Coach Sergio',
    attendeesCount: 5,
    isJoined: false,
  },
  {
    id: 'pin_03',
    title: 'Shadowboxing & Core Drill',
    sport: 'Boxing',
    type: 'training',
    description: 'Learn fundamental punches, balance, and core strength. No physical contact sparring, safe environment for beginner youth.',
    locationName: 'District 3 Community Gym',
    lat: 25,
    lng: 78,
    time: 'Tomorrow, 4:00 PM',
    organizer: 'Coach Tyson',
    attendeesCount: 14,
    isJoined: false,
  },
  {
    id: 'pin_04',
    title: 'Skate Grind Clinic',
    sport: 'Skate',
    type: 'hangout',
    description: 'Learn ollie basics or flat ground tricks with veteran local skaters. Gear (helmets, boards) available on loan.',
    locationName: 'Central Plaza Ramp Yard',
    lat: 50,
    lng: 60,
    time: 'Saturday, 2:00 PM',
    organizer: 'GWB Team',
    attendeesCount: 8,
    isJoined: false,
  },
  {
    id: 'pin_05',
    title: 'Pizza & Goal Setting Session',
    sport: 'Meeting',
    type: 'workshop',
    description: 'Grab a slice of pepperoni and talk with Dr. Clara about managing stress, setting career goals, and mastering your focus.',
    locationName: 'GWB Headquarters Room 2',
    lat: 78,
    lng: 82,
    time: 'Thursday, 6:00 PM',
    organizer: 'Dr. Clara',
    attendeesCount: 6,
    isJoined: false,
  }
];

export const INITIAL_QUESTS: Quest[] = [
  {
    id: 'quest_01',
    title: 'Join a Street Team',
    description: 'Take the first step towards a different future. Connect with a coach and register with one of our sports squads.',
    points: 150,
    progress: 100,
    totalSteps: 1,
    currentStep: 1,
    stepsList: [
      'Talk with a local representative or sign up in profile.'
    ],
    category: 'sports',
    status: 'claimed',
  },
  {
    id: 'quest_02',
    title: 'Earn Your Left Hand',
    description: 'Complete the specialized crossover and off-hand dribbling drills specified by Coach Marco.',
    points: 100,
    progress: 66,
    totalSteps: 3,
    currentStep: 2,
    stepsList: [
      'Perform 50 stationary left-hand dribbles (Completed)',
      'Perform 30 cross-over cycles on the run (Completed)',
      'Video record your final 1-minute agility drill for Coach feedback.'
    ],
    category: 'sports',
    status: 'in_progress',
  },
  {
    id: 'quest_03',
    title: 'Focus Check-In with Dr. Clara',
    description: 'Schedule and complete a 1-on-1 counseling session to evaluate stress management and set life targets.',
    points: 150,
    progress: 0,
    totalSteps: 1,
    currentStep: 0,
    stepsList: [
      'Complete a 15-minute introductory consultation.'
    ],
    category: 'growth',
    status: 'available',
  },
  {
    id: 'quest_04',
    title: 'Bring a Friend to the Courts',
    description: 'True leaders lift their community. Invite a local peer who is out on the streets to play or hang out in any of our hubs.',
    points: 200,
    progress: 0,
    totalSteps: 2,
    currentStep: 0,
    stepsList: [
      'Add peer details to your GWB contact book',
      'Attend any map event together with your peer.'
    ],
    category: 'social',
    status: 'available',
  }
];

export const INITIAL_REWARDS: Reward[] = [
  {
    id: 'rew_01',
    title: 'Official Team Jersey',
    description: 'Engineered street-mesh jersey in Gangs with Balls deep black and neon electric colorways. Custom name printing included.',
    pointsCost: 300,
    image: 'shirt',
    category: 'gear',
    stock: 12,
  },
  {
    id: 'rew_02',
    title: 'GWB Matte Black Hydration Flask',
    description: 'Double-walled stainless steel vacuum-insulated bottle (750ml). Built to survive tough street courts and keep beverages ice cold.',
    pointsCost: 150,
    image: 'droplet',
    category: 'gear',
    stock: 24,
  },
  {
    id: 'rew_03',
    title: 'Urban Grid Multi-Pocket Backpack',
    description: 'Rugged water-resistant ballistic nylon pack with modular straps for carrying basketballs, skateboards, or training gear.',
    pointsCost: 400,
    image: 'backpack',
    category: 'gear',
    stock: 5,
  },
  {
    id: 'rew_04',
    title: 'GWB Precision Grip Basketball',
    description: 'Moisture-absorbing composite leather ball optimized for rough outdoor concrete court durability and high-tack control.',
    pointsCost: 250,
    image: 'basketball',
    category: 'gear',
    stock: 8,
  },
  {
    id: 'rew_05',
    title: '1-on-1 Pro Masterclass',
    description: 'A dedicated 60-minute technical and strategic mentoring session with Coach Marco or visiting professional athletes.',
    pointsCost: 500,
    image: 'sparkles',
    category: 'experience',
    stock: 99,
  },
  {
    id: 'rew_06',
    title: 'Subway Healthy Combo Voucher',
    description: 'Free footlong sandwich, cookie, and cold beverage at any participating local Subway branch for post-workout premium fueling.',
    pointsCost: 100,
    image: 'utensils',
    category: 'voucher',
    stock: 50,
  }
];
