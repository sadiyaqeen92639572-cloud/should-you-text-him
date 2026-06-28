export interface QuizOption {
  text: string
  score: number
}

export interface QuizQuestion {
  id: number
  text: string
  options: QuizOption[]
}

export interface QuizVerdict {
  minScore: number
  verdict: string
  color: string
  dark: boolean
  sub: string
}

export interface QuizData {
  slug: string
  title: string
  metaTitle: string
  metaDescription: string
  intro: string
  faqAnswer: string
  questions: QuizQuestion[]
  verdicts: QuizVerdict[]
  textSuggestions?: string[]
}

export const QUIZZES: QuizData[] = [
  {
    slug: 'ex-no-contact',
    title: 'Should I Text My Ex After No Contact?',
    metaTitle: 'Should I Text My Ex After No Contact? — Instant Quiz',
    metaDescription: 'Is your no-contact streak worth breaking? Answer 4 honest questions and get a brutally clear yes or no — plus what to say if you send it.',
    intro: 'Breaking no contact is a big move. Let\'s make sure you\'re doing it for the right reasons.',
    faqAnswer: 'No contact is a boundary designed to give you space to heal. Breaking it resets your recovery clock to zero — unless the timing, reason, and their behavior all align. This quiz tells you if they do.',
    questions: [
      {
        id: 1,
        text: 'How long has your no-contact streak been?',
        options: [
          { text: '⚡ Less than a week — barely started', score: -3 },
          { text: '📅 2–3 weeks', score: -1 },
          { text: '✅ 30+ days', score: 2 },
          { text: '🏆 I\'ve honestly lost count', score: 3 },
        ],
      },
      {
        id: 2,
        text: 'Why do you want to text right now?',
        options: [
          { text: '😢 I miss them / it\'s late and I\'m emotional', score: -3 },
          { text: '🎒 I have a legitimate practical reason (jacket, shared lease)', score: 3 },
          { text: '😌 I just want them to know I\'m doing fine', score: -1 },
          { text: '🎵 A song reminded me of them', score: -2 },
        ],
      },
      {
        id: 3,
        text: 'Have they reached out to you during NC?',
        options: [
          { text: '💌 Yes, with real effort and sincerity', score: 3 },
          { text: '👁️ Liked a story but nothing real', score: -1 },
          { text: '🔇 No contact at all', score: -2 },
          { text: '🚫 They blocked me', score: -4 },
        ],
      },
      {
        id: 4,
        text: 'If you texted and they didn\'t reply, you would...',
        options: [
          { text: '💔 Be devastated and definitely send a follow-up', score: -3 },
          { text: '😤 Spiral into anxious overthinking for days', score: -2 },
          { text: '🙏 Respect it and return to NC', score: 2 },
          { text: '😌 Be fine — I just needed to say it', score: 3 },
        ],
      },
    ],
    verdicts: [
      { minScore: 6, verdict: 'BREAK THE STREAK 🔥', color: '#00FF00', dark: false, sub: 'You have real reasons, solid energy, and can handle rejection. Text once. Keep it short. Then put the phone down.' },
      { minScore: 2, verdict: 'WAIT 3 MORE DAYS ⏳', color: '#FFD93D', dark: false, sub: 'Close — but not yet. Sleep on it 3 times. If you still feel this way after, re-run this quiz.' },
      { minScore: -1, verdict: 'STAY STRONG 💪', color: '#FFD93D', dark: false, sub: 'Your reasons are vibes, not logic. The streak is protecting you right now. Keep going.' },
      { minScore: -99, verdict: 'ABSOLUTELY NOT 🚫', color: '#FF6B6B', dark: true, sub: 'You\'re about to undo weeks of progress for a late-night heart emoji. Step away from the keyboard.' },
    ],
    textSuggestions: [
      'hey, hope you\'re doing well',
      'I\'ve been thinking — I think we both handled that badly. Would you want to talk?',
      '[Practical reason: jacket/book/keys] — any chance I could grab that this week?',
    ],
  },

  {
    slug: 'after-ghosting',
    title: 'Should I Text Him After Ghosting?',
    metaTitle: 'Should I Text Him After Ghosting? — Instant Quiz',
    metaDescription: 'He ghosted you. Now what? Take this 4-question quiz for a brutally honest verdict on whether reaching back out is empowering — or embarrassing.',
    intro: 'He ghosted. You\'re still thinking about it. Let\'s figure out if this is worth your energy.',
    faqAnswer: 'If he ghosted you, his silence was a message. Reaching out shows you\'re willing to accept low-effort treatment. This quiz helps you decide if your specific situation is the exception — or confirms you already know the answer.',
    questions: [
      {
        id: 1,
        text: 'How long ago did he ghost you?',
        options: [
          { text: '⏰ Under 48 hours — he might just be busy', score: -2 },
          { text: '📅 About a week', score: -1 },
          { text: '📆 2+ weeks', score: 1 },
          { text: '🗓️ Months ago', score: 2 },
        ],
      },
      {
        id: 2,
        text: 'How many times has THIS same person ghosted you?',
        options: [
          { text: '1️⃣ First time, completely out of nowhere', score: 2 },
          { text: '2️⃣ Twice', score: -1 },
          { text: '🔁 Three or more times', score: -4 },
        ],
      },
      {
        id: 3,
        text: 'What was your last conversation actually like?',
        options: [
          { text: '✨ Great — I genuinely thought we had something', score: 1 },
          { text: '😐 Fine, nothing special', score: 0 },
          { text: '📉 He was already pulling away before he disappeared', score: -2 },
          { text: '💥 We argued and then... silence', score: -1 },
        ],
      },
      {
        id: 4,
        text: 'What would you actually text him?',
        options: [
          { text: '😂 A meme or casual opener — very low-stakes', score: 1 },
          { text: '👋 Just "hey"', score: -1 },
          { text: '😤 Something confrontational like "why did you ghost me?"', score: -2 },
          { text: '📖 A vulnerable message I\'ve been rehearsing for days', score: -3 },
        ],
      },
    ],
    verdicts: [
      { minScore: 3, verdict: 'ONE TEXT, MAXIMUM 💬', color: '#FFD93D', dark: false, sub: 'Send something breezy. Nothing accusatory. If he doesn\'t reply in 48h, you have your definitive answer — and it\'s not the one you wanted.' },
      { minScore: 0, verdict: '50/50 — FLIP A COIN 🎲', color: '#FFD93D', dark: false, sub: 'Honestly, either outcome tells you something useful. Send if it would release you. Skip if you know you\'d spiral.' },
      { minScore: -99, verdict: 'LET HIM STAY GHOSTED 👻', color: '#FF6B6B', dark: true, sub: 'He showed you his communication style. Believe him. You reaching out only confirms his theory that you\'ll wait.' },
    ],
  },

  {
    slug: 'should-text-back',
    title: 'Should I Text Him Back?',
    metaTitle: 'Should I Text Him Back? — Instant Quiz',
    metaDescription: 'He texted. Now you\'re overthinking it. This 4-question quiz tells you exactly how and when to reply — or whether to leave it on read for once.',
    intro: 'He made the first move. Now the power is yours. Let\'s not waste it.',
    faqAnswer: 'If you\'re interested and the conversation flows naturally, yes. But you don\'t have to reply instantly, and you definitely don\'t owe a reply if the effort is nonexistent. Match his energy — or aim higher.',
    questions: [
      {
        id: 1,
        text: 'How long ago did he text you?',
        options: [
          { text: '⚡ Under an hour — still fresh', score: 3 },
          { text: '🕑 A few hours ago', score: 2 },
          { text: '📅 Yesterday', score: 1 },
          { text: '📆 Days ago', score: -1 },
          { text: '🗓️ Over a week ago', score: -2 },
        ],
      },
      {
        id: 2,
        text: 'What did he actually send?',
        options: [
          { text: '✉️ A real, thoughtful message that required effort', score: 3 },
          { text: '😂 A meme or a fun casual opener', score: 2 },
          { text: '👋 "Hey" or "wyd"', score: -1 },
          { text: '🌙 A drunk 2am text', score: -2 },
          { text: '😑 One word reply after leaving me on read for days', score: -2 },
        ],
      },
      {
        id: 3,
        text: 'How do you actually feel about him right now?',
        options: [
          { text: '🔥 Genuinely excited to hear from him', score: 2 },
          { text: '🤔 Cautiously interested', score: 1 },
          { text: '😐 Indifferent, honestly', score: 0 },
          { text: '😠 Annoyed, but also weirdly hoping', score: -1 },
        ],
      },
      {
        id: 4,
        text: 'Is there a pattern here?',
        options: [
          { text: '✅ No — he\'s generally consistent and reliable', score: 2 },
          { text: '🌡️ Hot and cold — unpredictable', score: -2 },
          { text: '🎰 He only texts when he\'s bored or lonely', score: -3 },
        ],
      },
    ],
    verdicts: [
      { minScore: 6, verdict: 'REPLY NOW ✅', color: '#00FF00', dark: false, sub: 'The timing is right and he made real effort. Don\'t play games — just reply. Being responsive isn\'t desperate, it\'s direct.' },
      { minScore: 2, verdict: 'REPLY WHEN READY 🕐', color: '#FFD93D', dark: false, sub: 'No rush. Reply when you have something worth saying. Don\'t force a conversation, but don\'t ghost a good opener either.' },
      { minScore: -1, verdict: 'WAIT AND SEE 👀', color: '#FFD93D', dark: false, sub: 'He\'ll either send something better or disappear. Both are useful data. Give it 24 hours.' },
      { minScore: -99, verdict: 'IGNORE THIS ONE 📵', color: '#FF6B6B', dark: true, sub: 'He\'s texting from boredom or habit. You deserve more than a throwaway "hey." Leaving this one on read is a complete sentence.' },
    ],
    textSuggestions: [
      'haha honestly same — [callback to their message]',
      'ok you have impeccable timing, I was just thinking about [shared topic]',
      '[Direct, genuine reply to their actual message]',
    ],
  },

  {
    slug: 'first-after-breakup',
    title: 'Should I Text Him First After Breakup?',
    metaTitle: 'Should I Text Him First After Breakup? — Instant Quiz',
    metaDescription: 'Thinking about texting first after the breakup? Answer 5 painfully honest questions and find out if this is your gut or just grief talking.',
    intro: 'Post-breakup texting is a high-stakes move. Let\'s make sure you\'re doing this from power, not panic.',
    faqAnswer: 'Reaching out first after a breakup is usually driven by temporary loneliness, not real reasons to reconnect. Give yourself at least 30 days before making any decisions. This quiz helps you figure out which camp you\'re actually in.',
    questions: [
      {
        id: 1,
        text: 'How long ago did you break up?',
        options: [
          { text: '💥 Less than a week — still raw', score: -4 },
          { text: '📅 2–3 weeks', score: -2 },
          { text: '📆 1–2 months', score: 1 },
          { text: '🗓️ 3+ months', score: 2 },
        ],
      },
      {
        id: 2,
        text: 'Who broke up with whom?',
        options: [
          { text: '✋ I ended it', score: 1 },
          { text: '💔 They ended it', score: -2 },
          { text: '🤝 It was genuinely mutual', score: 1 },
          { text: '🌀 It was complicated — a fight that became permanent', score: -1 },
        ],
      },
      {
        id: 3,
        text: 'What\'s your actual reason for reaching out?',
        options: [
          { text: '❤️‍🔥 I want to get back together', score: -2 },
          { text: '🔍 I need closure on something specific', score: 2 },
          { text: '🥺 I miss them and want to know if they miss me too', score: -3 },
          { text: '📦 Practical reason (item to return, shared plans)', score: 3 },
        ],
      },
      {
        id: 4,
        text: 'Have you eaten and slept properly in the last 24 hours?',
        options: [
          { text: '✅ Yes — I\'m actually in a stable headspace', score: 2 },
          { text: '😞 Not really — running entirely on emotion right now', score: -3 },
        ],
      },
      {
        id: 5,
        text: 'Your best friend\'s reaction to "I\'m about to text my ex" would be:',
        options: [
          { text: '😌 "Oh finally, that actually makes sense"', score: 2 },
          { text: '😬 "Are you sure about this...?"', score: -1 },
          { text: '🛑 "Please. Don\'t."', score: -3 },
        ],
      },
    ],
    verdicts: [
      { minScore: 5, verdict: 'SEND IT 🟢', color: '#00FF00', dark: false, sub: 'You have time, clarity, and a real reason. One text. No paragraph. No expectations. See what happens.' },
      { minScore: 1, verdict: 'DRAFT IT, DON\'T SEND IT YET ✏️', color: '#FFD93D', dark: false, sub: 'Write the text. Save it as a draft. Read it tomorrow morning sober and rested. If it still makes sense, send it then.' },
      { minScore: -2, verdict: 'WAIT ANOTHER WEEK ⏳', color: '#FFD93D', dark: false, sub: 'The timing isn\'t right and your nervous system knows it. Give yourself more runway.' },
      { minScore: -99, verdict: 'NOT TODAY 🚫', color: '#FF6B6B', dark: true, sub: 'Your nervous system is in chaos mode. You will regret this. Go for a walk, call a friend, do literally anything else first.' },
    ],
    textSuggestions: [
      'hey — I know it\'s been a while. Hope you\'re doing well.',
      'I\'ve been thinking, and I think we both deserved better from each other. Wanted to say that.',
      'Still have your [item] — should I drop it off this week?',
    ],
  },

  {
    slug: 'ex-goodnight',
    title: 'Should I Text My Ex Goodnight?',
    metaTitle: 'Should I Text My Ex Goodnight? — Instant Quiz',
    metaDescription: 'That goodnight text is sitting in your drafts. Take this 4-question quiz before you send something you\'ll be reading at 3am tomorrow wondering why you did it.',
    intro: 'A goodnight text to an ex is one of the highest-risk moves in the texting universe. Let\'s triage this.',
    faqAnswer: 'Goodnight texts are for active relationships, not exes. Sending one creates artificial intimacy and puts pressure on a situation that needs space. This quiz is the only thing standing between you and that mistake.',
    questions: [
      {
        id: 1,
        text: 'What time is it right now?',
        options: [
          { text: '🌅 Before 9pm — early enough to question this', score: 1 },
          { text: '🌆 9pm–11pm', score: 0 },
          { text: '🌃 11pm–1am', score: -2 },
          { text: '🌙 After 1am — we need to talk', score: -4 },
        ],
      },
      {
        id: 2,
        text: 'Have you had anything to drink tonight?',
        options: [
          { text: '💧 Nothing — stone cold sober', score: 2 },
          { text: '🍷 A glass or two with dinner', score: 0 },
          { text: '🍻 More than a few', score: -3 },
          { text: '🤔 Define "anything"', score: -4 },
        ],
      },
      {
        id: 3,
        text: 'How long ago did you break up?',
        options: [
          { text: '💥 Less than 2 weeks', score: -3 },
          { text: '📅 1–3 months', score: -1 },
          { text: '📆 6+ months', score: 1 },
        ],
      },
      {
        id: 4,
        text: 'What\'s your actual goal with this text?',
        options: [
          { text: '😊 Just saying goodnight, genuinely no agenda', score: 1 },
          { text: '💬 Hoping it starts a conversation that leads somewhere', score: -1 },
          { text: '💭 I want them to miss me', score: -2 },
          { text: '😢 I don\'t know — I\'m just emotional', score: -3 },
        ],
      },
    ],
    verdicts: [
      { minScore: 2, verdict: 'MAYBE — ONE TIME 🌙', color: '#FFD93D', dark: false, sub: 'Sober, early, and genuinely no agenda: a simple "goodnight" is low-stakes. Send it, close the app, expect nothing.' },
      { minScore: -1, verdict: 'SERIOUSLY RECONSIDER 🤔', color: '#FFD93D', dark: false, sub: 'You\'re in the middle of the chaos zone. Ask yourself what you\'re actually hoping for — then ask if a goodnight text is really the way to get it.' },
      { minScore: -99, verdict: 'ABSOLUTELY NOT 🚫', color: '#FF6B6B', dark: true, sub: 'This is a terrible idea wrapped in late-night nostalgia. Put the phone on airplane mode. Drink water. Sleep.' },
    ],
  },

  {
    slug: 'crush-first',
    title: 'Should I Text My Crush First?',
    metaTitle: 'Should I Text My Crush First? — Instant Quiz',
    metaDescription: 'Wondering if you should text your crush first? This 4-question quiz cuts through the overthinking and tells you exactly whether to send it — and what to say.',
    intro: 'Texting first isn\'t desperate. It\'s direct. But let\'s make sure the timing is right.',
    faqAnswer: 'Yes — texting first is confident, not desperate. Just keep it low-stakes and easy to reply to. This quiz tells you if your specific situation is ready for the first move.',
    questions: [
      {
        id: 1,
        text: 'How well do you actually know each other?',
        options: [
          { text: '💬 We\'ve had multiple real conversations', score: 3 },
          { text: '😊 Met a few times, some natural banter', score: 2 },
          { text: '📱 Social media mutual — not much IRL', score: 0 },
          { text: '👀 I\'ve never actually spoken to them', score: -2 },
        ],
      },
      {
        id: 2,
        text: 'What was your most recent interaction?',
        options: [
          { text: '✨ They gave clear positive signals — good energy', score: 3 },
          { text: '😊 Normal and friendly — nothing weird', score: 1 },
          { text: '😕 Awkward or hard to read', score: -1 },
          { text: '🫥 They haven\'t really noticed me yet', score: -2 },
        ],
      },
      {
        id: 3,
        text: 'What would you text them?',
        options: [
          { text: '🎯 A specific callback to something we talked about', score: 3 },
          { text: '😄 Something casual and very easy to reply to', score: 2 },
          { text: '😂 A meme that fits their vibe perfectly', score: 1 },
          { text: '👋 "Hey" or "what are you doing?"', score: -1 },
          { text: '📖 A paragraph about my feelings', score: -3 },
        ],
      },
      {
        id: 4,
        text: 'If they don\'t reply, you would...',
        options: [
          { text: '😌 Be fine — I can handle rejection without it wrecking me', score: 2 },
          { text: '😬 Be awkward next time we see each other but I\'d survive', score: 1 },
          { text: '💀 Be crushed for weeks and question everything', score: -2 },
        ],
      },
    ],
    verdicts: [
      { minScore: 7, verdict: 'SEND IT NOW 🔥', color: '#00FF00', dark: false, sub: 'You\'ve done the work, you have a good opener, and the signals are there. Waiting any longer is just self-sabotage.' },
      { minScore: 3, verdict: 'YES — WITH A GOOD OPENER 💬', color: '#FFD93D', dark: false, sub: 'Texting first is confident, not desperate. Make sure you have something worth replying to — then go.' },
      { minScore: 0, verdict: 'BUILD MORE FIRST 🌱', color: '#FFD93D', dark: false, sub: 'Get one more real interaction in before the DM slide. You want them to be excited to see your name pop up.' },
      { minScore: -99, verdict: 'NOT YET 🚧', color: '#FF6B6B', dark: true, sub: 'You\'re sending vibes into a void. Make contact IRL first — a good conversation gives your first text actual context.' },
    ],
    textSuggestions: [
      '[Specific reference to something they said] — thought of you when I saw this',
      'ok hear me out — [fun question about something you know they\'re into]',
      'random question but — [low-stakes, easy to answer question]',
    ],
  },

  {
    slug: 'what-to-text-crush',
    title: 'What Should I Text My Crush?',
    metaTitle: 'What Should I Text My Crush? — Message Ideas Quiz',
    metaDescription: 'Can\'t figure out what to text your crush? Answer 4 quick questions and get a specific, proven text message template — no more deleting drafts.',
    intro: 'Stop drafting and deleting. Let\'s find you the right opener for your specific situation.',
    faqAnswer: 'Keep it short, casual, and specific. Never send a generic "hey" — it demands effort for zero reward. Send something with a callback, a question, or a hook. This quiz builds you a custom opener.',
    questions: [
      {
        id: 1,
        text: 'What\'s your energy right now?',
        options: [
          { text: '😎 Confident and genuinely casual', score: 3 },
          { text: '🤩 Nervous but the good kind of excited', score: 2 },
          { text: '😰 Desperate and spiraling slightly', score: -2 },
          { text: '✏️ I\'ve written and deleted 14 drafts already', score: -3 },
        ],
      },
      {
        id: 2,
        text: 'What do you have in common with this person?',
        options: [
          { text: '🎯 A specific shared interest, joke, or memory', score: 3 },
          { text: '👥 Same friend group, class, or workplace', score: 2 },
          { text: '📱 We follow each other... that\'s about it', score: -1 },
        ],
      },
      {
        id: 3,
        text: 'When did you last interact in any way?',
        options: [
          { text: '📅 Today or this week — still warm', score: 3 },
          { text: '📆 A few weeks ago', score: 1 },
          { text: '🗓️ A while back — this text would come out of nowhere', score: -2 },
        ],
      },
      {
        id: 4,
        text: 'What\'s your actual goal with this text?',
        options: [
          { text: '💬 Start a fun conversation, see where it goes naturally', score: 2 },
          { text: '🧠 Make them think of me in a good way', score: 1 },
          { text: '📅 Get them to make plans with me', score: 0 },
          { text: '💌 Send a sincere confession of how I feel about them', score: -3 },
        ],
      },
    ],
    verdicts: [
      { minScore: 7, verdict: 'USE THE CALLBACK 🎯', color: '#00FF00', dark: false, sub: '"Hey [name], thought of you when [specific thing]. When are we actually doing [thing you discussed]?" — Specific, warm, and impossible to ignore.' },
      { minScore: 3, verdict: 'GO CASUAL AND LIGHT ☀️', color: '#FFD93D', dark: false, sub: '"ok this is completely random but — [easy, fun question about something they\'d know]" works every single time. Try it.' },
      { minScore: 0, verdict: 'TRY THE MEME APPROACH 😂', color: '#FFD93D', dark: false, sub: 'The meme approach requires zero vulnerability and tells you everything you need to know from their reply. Send something funny that fits their vibe exactly.' },
      { minScore: -99, verdict: 'WAIT, THEN COME BACK 🔄', color: '#FF6B6B', dark: true, sub: 'You don\'t have enough material yet. Get one real interaction in first — a good IRL moment gives your first text actual context and makes it land.' },
    ],
    textSuggestions: [
      'hey — thought of you when [specific thing]. When are we actually doing [thing]?',
      'ok completely random but — [easy, fun question about shared interest]',
      'this reminded me of you and I cannot explain why [meme/link/reference]',
    ],
  },

  {
    slug: 'his-birthday',
    title: 'Should I Text Him On His Birthday?',
    metaTitle: 'Should I Text Him On His Birthday? — Instant Quiz',
    metaDescription: 'Debating that birthday text? This 4-question quiz tells you if it\'s a sweet gesture or a strategic move your ex will immediately see through.',
    intro: 'Birthday texts are the most common texting trap. Let\'s figure out if yours is genuine or a sneaky strategy.',
    faqAnswer: 'If you\'re on good terms and have no hidden agenda, a polite "Happy Birthday" is fine. But if you\'re secretly hoping it reopens a conversation, don\'t — they will see right through it. This quiz helps you figure out which it is.',
    questions: [
      {
        id: 1,
        text: 'What\'s your current situation with this person?',
        options: [
          { text: '😊 Ex — but we\'re genuinely on good terms', score: 2 },
          { text: '💔 Ex who broke my heart — minimal contact since', score: -2 },
          { text: '🌀 Situationship that fizzled out', score: -1 },
          { text: '💘 Current crush or someone I\'m seeing', score: 3 },
        ],
      },
      {
        id: 2,
        text: 'What are you actually hoping the birthday text leads to?',
        options: [
          { text: '🎂 A friendly acknowledgment — genuinely nothing more', score: 2 },
          { text: '💬 A conversation that maybe leads to reconnection', score: -1 },
          { text: '🪄 Him realizing he misses me and reaching out', score: -3 },
          { text: '😌 I genuinely just want to wish him well', score: 3 },
        ],
      },
      {
        id: 3,
        text: 'Have you been in any contact recently?',
        options: [
          { text: '✅ Yes — we talk somewhat normally', score: 2 },
          { text: '🔇 Complete silence for a while', score: -1 },
          { text: '👁️ I\'ve been watching his stories but not texting', score: -2 },
        ],
      },
      {
        id: 4,
        text: 'Your honest vibe on his birthday, if you\'re being real:',
        options: [
          { text: '😊 Genuinely happy for him — no weird feelings', score: 2 },
          { text: '😔 Nostalgic and a little sad about what we had', score: -2 },
          { text: '🤞 Hoping he uses this as an opening to reconnect', score: -2 },
          { text: '🤷 Fine, just thought a polite message was the normal thing to do', score: 1 },
        ],
      },
    ],
    verdicts: [
      { minScore: 6, verdict: 'YES — KEEP IT BRIEF 🎂', color: '#00FF00', dark: false, sub: '"Happy birthday [name]! Hope it\'s a good one." Send it, close the app. Do not wait for a reply. Done.' },
      { minScore: 2, verdict: 'ONLY IF YOU TRULY MEAN IT 🤔', color: '#FFD93D', dark: false, sub: 'Send it only if there\'s genuinely zero strategy attached. If there\'s one molecule of hope riding on this text, skip it — you\'ll end up hurt either way.' },
      { minScore: -99, verdict: 'SKIP IT 🎈', color: '#FF6B6B', dark: true, sub: 'A birthday text as a strategy never works. They\'ll see through it immediately and you\'ll look like you haven\'t moved on. Let him have his birthday. You keep your dignity.' },
    ],
    textSuggestions: [
      'Happy birthday! Hope it\'s a good one 🎂',
      'Happy birthday — hope you\'re having a great day',
    ],
  },

  {
    slug: 'left-on-read',
    title: 'Should I Text Him After He Left Me On Read?',
    metaTitle: 'Should I Text Him After He Left Me On Read? — Quiz',
    metaDescription: 'He left you on read and you\'re debating a follow-up. This 4-question quiz tells you if double-texting is brave or embarrassing in your specific situation.',
    intro: 'Being left on read is a specific kind of emotional torture. Let\'s figure out the right move.',
    faqAnswer: 'If he left you on read, the ball is in his court. Sending another text signals anxiety and tells him you\'ll wait indefinitely. This quiz helps you decide if your situation warrants one more attempt — or if the silence already answered your question.',
    questions: [
      {
        id: 1,
        text: 'How long ago did he leave you on read?',
        options: [
          { text: '⏰ Under 6 hours — he\'s probably just busy', score: -3 },
          { text: '📅 A full day', score: -1 },
          { text: '📆 2–3 days', score: 1 },
          { text: '🗓️ A week or more', score: 2 },
        ],
      },
      {
        id: 2,
        text: 'Is this his established pattern?',
        options: [
          { text: '1️⃣ First time — completely out of character for him', score: 2 },
          { text: '🔄 He does this occasionally', score: -1 },
          { text: '📊 This is his standard communication style', score: -3 },
        ],
      },
      {
        id: 3,
        text: 'What was the message he left on read?',
        options: [
          { text: '😊 A fun, low-pressure message', score: 1 },
          { text: '❓ A question that required real effort to answer', score: 0 },
          { text: '💬 An emotional or vulnerable message', score: -1 },
          { text: '📨 It was the third message in a row from me', score: -3 },
        ],
      },
      {
        id: 4,
        text: 'What\'s your follow-up plan?',
        options: [
          { text: '😄 Something completely new and unrelated — casual tone', score: 2 },
          { text: '😂 Something so genuinely funny he physically can\'t ignore it', score: 1 },
          { text: '😤 Call out the fact that he left me on read', score: -3 },
          { text: '📨 Send the same message again', score: -3 },
        ],
      },
    ],
    verdicts: [
      { minScore: 4, verdict: 'ONE MORE, THEN DONE 💬', color: '#FFD93D', dark: false, sub: 'You have grounds for one more attempt. Make it completely unrelated to the ignored message — light, curious, easy to answer. If still nothing, you have your answer.' },
      { minScore: 0, verdict: 'WAIT 72 HOURS FIRST ⏳', color: '#FFD93D', dark: false, sub: 'Give it more time. People genuinely get busy and forget. If he still hasn\'t replied in 3 days, then decide. Not now.' },
      { minScore: -99, verdict: 'DO NOT DOUBLE TEXT 🚫', color: '#FF6B6B', dark: true, sub: 'The ball is in his court and it\'s been there for a reason. Another text doesn\'t change his mind — it just confirms you\'ll wait. Self-respect is the move here.' },
    ],
    textSuggestions: [
      '[Completely unrelated topic] — randomly thought of you',
      'ok forget the last message — you have to see [funny/interesting thing]',
      '[Easy, low-stakes question about something you know they\'re into]',
    ],
  },

  {
    slug: 'or-move-on',
    title: 'Should I Text Him Or Move On?',
    metaTitle: 'Should I Text Him Or Move On? — Instant Verdict Quiz',
    metaDescription: 'The question you\'ve been avoiding. Take this 5-question quiz for an honest answer on whether to text him one last time — or finally let it go.',
    intro: 'You\'ve been going back and forth on this for a while. Let\'s end the loop.',
    faqAnswer: 'Take the quiz. It will give you a brutally honest verdict based on your actual situation — not what you want to hear. If your score is low, it\'s time to put the phone down and redirect that energy somewhere that actually wants it.',
    questions: [
      {
        id: 1,
        text: 'How long have you been debating whether to text him?',
        options: [
          { text: '📅 A few days', score: 1 },
          { text: '📆 A week or two', score: 0 },
          { text: '🗓️ Over a month', score: -2 },
          { text: '😶 I\'ve genuinely lost count', score: -3 },
        ],
      },
      {
        id: 2,
        text: 'How many unanswered texts have you sent in the last 30 days?',
        options: [
          { text: '0️⃣ Zero — I\'ve been disciplined', score: 2 },
          { text: '1️⃣–2️⃣ One or two', score: 1 },
          { text: '3️⃣–4️⃣ Three or four', score: -2 },
          { text: '5️⃣+ Five or more', score: -4 },
        ],
      },
      {
        id: 3,
        text: 'If he replied right now, what would you actually want?',
        options: [
          { text: '💬 A real conversation about what actually went wrong', score: 2 },
          { text: '🔄 Pick up right where we left off', score: 1 },
          { text: '🔍 Some closure so I can finally move on', score: -1 },
          { text: '🤷 Honestly, I\'m not even sure anymore', score: -2 },
        ],
      },
      {
        id: 4,
        text: 'Be honest: do you miss HIM — or the idea of him?',
        options: [
          { text: '❤️ Him specifically — his laugh, his quirks, specific memories', score: 2 },
          { text: '🛋️ The comfort and routine of having someone around', score: -2 },
          { text: '🪞 The feeling of being wanted and chosen', score: -3 },
          { text: '🌀 I genuinely don\'t know anymore', score: -1 },
        ],
      },
      {
        id: 5,
        text: 'What would "moving on" actually look like for you?',
        options: [
          { text: '🆕 Delete the chat, unfollow, start completely fresh', score: 2 },
          { text: '💪 Find someone who actually shows up for me', score: 1 },
          { text: '🤔 I\'m not sure — I\'ve never really gotten there with anyone', score: -1 },
          { text: '😶 I can\'t even picture it right now', score: -3 },
        ],
      },
    ],
    verdicts: [
      { minScore: 5, verdict: 'ONE LAST TEXT, THEN CLOSE IT 📖', color: '#FFD93D', dark: false, sub: 'You\'ve been thoughtful. Send something genuine — not a guilt trip, not a declaration. Just honest. Then respect whatever happens next, completely.' },
      { minScore: 1, verdict: 'SEND NOTHING. WAIT. 🔇', color: '#FFD93D', dark: false, sub: 'The most powerful text is sometimes the one you don\'t send. Go silent for 30 days. If he doesn\'t reach out, you have your final answer.' },
      { minScore: -2, verdict: 'START MOVING ON 🚶‍♀️', color: '#FF6B6B', dark: true, sub: 'Text or no text, you\'re stuck in a loop. The answer isn\'t in his reply — it\'s in redirecting that energy to something that actually wants it back.' },
      { minScore: -99, verdict: 'MOVE ON 💨', color: '#FF6B6B', dark: true, sub: 'You already know the answer. You\'ve known for a while. The text won\'t change anything — it\'ll just delay the inevitable. Delete the draft. Go touch grass.' },
    ],
  },
  {
    slug: 'after-week-silence',
    title: 'Should I Text Him After a Week of Silence?',
    metaTitle: 'Should I Text Him After a Week of Silence? — Instant Quiz',
    metaDescription: 'A week of silence. Should you break it or hold the line? Answer 4 brutally honest questions and get an instant verdict on whether reaching out is smart — or self-sabotage.',
    intro: 'Seven days of silence is long enough to feel like a message in itself. Let\'s figure out what your message back should be.',
    faqAnswer: 'A week of silence can mean many things: he\'s busy, he\'s pulling away, or he\'s waiting to see if you\'ll reach out first. The right move depends on your history, your last exchange, and what you actually want. This quiz helps you decode it.',
    questions: [
      {
        id: 1,
        text: 'What was the last thing said between you two?',
        options: [
          { text: '✅ A positive conversation that ended naturally', score: 2 },
          { text: '😐 Something neutral — no real ending', score: 0 },
          { text: '😬 It ended kind of awkwardly', score: -2 },
          { text: '💥 An argument or tense moment', score: -3 },
        ],
      },
      {
        id: 2,
        text: 'Who went silent first — you or him?',
        options: [
          { text: '🤐 He went quiet on me out of nowhere', score: -2 },
          { text: '😶 I kind of pulled back and he matched my energy', score: 0 },
          { text: '🤝 Neither of us — the conversation just faded', score: 1 },
          { text: '⏸️ We agreed to take some space', score: 2 },
        ],
      },
      {
        id: 3,
        text: 'What is his normal texting behavior?',
        options: [
          { text: '📱 Usually consistent — a week is unusual for him', score: 2 },
          { text: '🌡️ Hot and cold — this is part of his pattern', score: -2 },
          { text: '🐢 Always a slow texter — this is just him', score: 1 },
          { text: '🔇 He regularly disappears without explanation', score: -3 },
        ],
      },
      {
        id: 4,
        text: 'Why do you want to text him right now?',
        options: [
          { text: '📣 I have something specific and real to say', score: 3 },
          { text: '🧠 I want to understand why things went quiet', score: 1 },
          { text: '😢 I miss him and can\'t handle the silence', score: -2 },
          { text: '🎰 I want to see if he\'s still interested', score: -1 },
        ],
      },
    ],
    verdicts: [
      { minScore: 5, verdict: 'BREAK THE SILENCE ✉️', color: '#00FF00', dark: false, sub: 'The silence is situational, not intentional. One casual, low-pressure text ends the ambiguity without costing you anything. Do it.' },
      { minScore: 1, verdict: 'WAIT 48 MORE HOURS ⏳', color: '#FFD93D', dark: false, sub: 'You\'re close to having a real reason. Give it two more days. If he still hasn\'t reached out by then, you\'ll know the silence was intentional.' },
      { minScore: -2, verdict: 'HOLD THE LINE 🚧', color: '#FFD93D', dark: false, sub: 'His pattern suggests he goes quiet when he\'s losing interest. Reaching out now confirms you\'ll always chase. Make him do the work for once.' },
      { minScore: -99, verdict: 'THE SILENCE IS YOUR ANSWER 🔇', color: '#FF6B6B', dark: true, sub: 'A week of silence after tension isn\'t an accident. Texting him now won\'t fix what caused the quiet — it just delays you from accepting it.' },
    ],
    textSuggestions: [
      'hey — been a minute. How are you actually doing?',
      'thought of you — [specific reference to something you talked about]',
      'ok I know we\'ve both been quiet. Can we just talk?',
    ],
  },

  {
    slug: 'or-leave-alone',
    title: 'Should I Text Him or Leave Him Alone?',
    metaTitle: 'Should I Text Him or Leave Him Alone? — Instant Quiz',
    metaDescription: 'Should you text him or leave him alone? This 4-question quiz gives you the brutally honest answer based on your specific situation — no guessing required.',
    intro: 'You\'re at a crossroads: reach out and risk it, or pull back and wonder. Let\'s make this decision for you.',
    faqAnswer: 'Sometimes the most powerful thing you can do is nothing. But sometimes silence reads as disinterest. This quiz figures out which situation you\'re actually in — and tells you exactly what to do.',
    questions: [
      {
        id: 1,
        text: 'How many times have YOU initiated contact recently?',
        options: [
          { text: '0️⃣ Not at all — it\'s been mutual or he initiates', score: 3 },
          { text: '1️⃣ Once or twice, that\'s it', score: 2 },
          { text: '📊 More than him, consistently', score: -2 },
          { text: '😬 I\'ve been the only one reaching out for weeks', score: -4 },
        ],
      },
      {
        id: 2,
        text: 'When he does respond, what is the energy like?',
        options: [
          { text: '🔥 Warm, engaged, clearly interested', score: 3 },
          { text: '😊 Normal and friendly — decent effort', score: 1 },
          { text: '💬 Short replies, takes forever to respond', score: -1 },
          { text: '🤖 One-word responses or pure obligation', score: -3 },
        ],
      },
      {
        id: 3,
        text: 'What does your gut say when you imagine sending nothing?',
        options: [
          { text: '😌 Relief — maybe some space would actually be good', score: 2 },
          { text: '😟 Anxious — I\'m scared he\'ll forget about me', score: -2 },
          { text: '🤔 Unsure — I genuinely can\'t read the situation', score: 0 },
          { text: '💪 Resolved — he should be putting in effort too', score: 3 },
        ],
      },
      {
        id: 4,
        text: 'What are you hoping texting him achieves?',
        options: [
          { text: '💬 A natural, genuine conversation', score: 2 },
          { text: '🔍 Clarity on where we actually stand', score: 1 },
          { text: '🪝 Keep him on the hook', score: -2 },
          { text: '❤️ Get him back', score: -3 },
        ],
      },
    ],
    verdicts: [
      { minScore: 7, verdict: 'TEXT HIM ✅', color: '#00FF00', dark: false, sub: 'The effort is mutual and you have a good reason. You\'re not chasing — you\'re engaging. There\'s a difference. Send something casual and let it breathe.' },
      { minScore: 3, verdict: 'ONE TEXT, THEN WAIT 📬', color: '#FFD93D', dark: false, sub: 'Send one low-key opener. Then put the phone down and wait for him to match your energy. His reply (or lack of one) tells you everything.' },
      { minScore: -1, verdict: 'LEAVE HIM ALONE FOR NOW 🤫', color: '#FFD93D', dark: false, sub: 'The effort has been one-sided. Pull back and give him a chance to notice the silence. If he doesn\'t reach out, the decision has been made for you.' },
      { minScore: -99, verdict: 'LEAVE HIM ALONE 🚶‍♀️', color: '#FF6B6B', dark: true, sub: 'You\'ve been doing all the work and getting minimal return. Stop. The most powerful move right now is silence. Let him feel the absence and decide what he wants.' },
    ],
    textSuggestions: [
      'hey, been thinking about [shared topic]. You still into that?',
      'random — but how are you actually doing?',
      '[Casual callback to last conversation] — anyway, hope you\'re good',
    ],
  },

  {
    slug: 'i-miss-him',
    title: 'Should I Text Him I Miss Him?',
    metaTitle: 'Should I Text Him I Miss Him? — Instant Quiz',
    metaDescription: 'You miss him and you want to say it. But should you? Take this 5-question quiz before you send that vulnerable text — it might just save you the cringe.',
    intro: 'Saying "I miss you" is one of the most vulnerable texts you can send. Let\'s make sure the timing and situation are actually right.',
    faqAnswer: '"I miss you" is a high-stakes text. It reveals everything and creates immediate pressure. Whether you should send it depends entirely on where things currently stand — and this quiz helps you figure that out in 90 seconds.',
    questions: [
      {
        id: 1,
        text: 'What is the current status between you two?',
        options: [
          { text: '💑 Together but going through a rough patch', score: 3 },
          { text: '🌀 Complicated situationship or talking stage', score: 1 },
          { text: '💔 Broken up but both of us are struggling', score: -1 },
          { text: '🚫 Broken up and he has moved on', score: -4 },
        ],
      },
      {
        id: 2,
        text: 'Has he given you any signal recently that he misses you too?',
        options: [
          { text: '💌 Yes — he\'s said it or shown it clearly', score: 3 },
          { text: '👁️ Some small signals — nothing explicit', score: 1 },
          { text: '🔇 No contact or signals at all', score: -2 },
          { text: '❄️ He\'s been cold or distant lately', score: -3 },
        ],
      },
      {
        id: 3,
        text: 'How long have you been missing him before deciding to say it?',
        options: [
          { text: '😢 This just hit me tonight — very fresh', score: -3 },
          { text: '📅 A few days of genuine feeling', score: 0 },
          { text: '📆 I\'ve felt this for weeks and it\'s real', score: 2 },
          { text: '🧠 Long enough to know it\'s not just boredom or loneliness', score: 3 },
        ],
      },
      {
        id: 4,
        text: 'If he doesn\'t reply or says he doesn\'t feel the same — what happens?',
        options: [
          { text: '😌 I\'d hurt, but I\'d respect it and move on', score: 3 },
          { text: '😔 I\'d be devastated, but eventually okay', score: 1 },
          { text: '💔 I\'d be destroyed for weeks', score: -2 },
          { text: '📨 I\'d send another message explaining myself', score: -4 },
        ],
      },
      {
        id: 5,
        text: 'Why do you want to say "I miss you" instead of just… texting him normally?',
        options: [
          { text: '💬 Because it\'s the most honest thing I can say', score: 2 },
          { text: '🪝 I want him to know so he comes back', score: -1 },
          { text: '🎭 I want to say it before I lose my nerve', score: 0 },
          { text: '😭 I can\'t take the silence anymore', score: -3 },
        ],
      },
    ],
    verdicts: [
      { minScore: 8, verdict: 'SAY IT 💬', color: '#00FF00', dark: false, sub: 'You\'ve earned this. The situation is right, the feeling is real, and you can handle whatever comes back. Say it simply. "I miss you" — three words. Nothing more.' },
      { minScore: 3, verdict: 'SAY IT SOFTLY 🌙', color: '#FFD93D', dark: false, sub: 'The feeling is real but the timing is delicate. A softer opener — "I\'ve been thinking about you" — lets you test the water before diving in.' },
      { minScore: -1, verdict: 'NOT YET 🛑', color: '#FFD93D', dark: false, sub: 'You miss the idea of him, or the timing is off. Send something casual first and see how he responds. If it\'s warm, you can say the real thing next time.' },
      { minScore: -99, verdict: 'DON\'T SAY IT 🤐', color: '#FF6B6B', dark: true, sub: 'The vulnerability isn\'t the problem — the situation is. Saying "I miss you" right now gives him all the power in a moment where you need to protect yourself. Hold this one.' },
    ],
    textSuggestions: [
      'I miss you. That\'s it — I just wanted to say it.',
      'I\'ve been thinking about you a lot lately. How are you?',
      'I know this is random but — I miss talking to you.',
    ],
  },

  {
    slug: 'miss-ex',
    title: 'I Miss My Ex — Should I Text Him?',
    metaTitle: 'I Miss My Ex — Should I Text Him? Instant Quiz',
    metaDescription: 'You miss your ex and you\'re thinking about texting him. Take this 5-question quiz first — it separates genuine reconnection from late-night emotional chaos.',
    intro: 'Missing an ex is completely normal. Acting on it without thinking it through is where people get hurt. Let\'s think it through together.',
    faqAnswer: 'Missing your ex doesn\'t automatically mean you should text him — it means you\'re human. The question is whether the missing is a real signal or just your brain romanticizing the past. This quiz helps you tell the difference.',
    questions: [
      {
        id: 1,
        text: 'What made you miss him today specifically?',
        options: [
          { text: '🎵 A song, a place, or something random triggered it', score: -2 },
          { text: '💭 I\'ve genuinely missed him consistently for weeks', score: 2 },
          { text: '😴 It\'s late and I\'m lonely — classic combo', score: -4 },
          { text: '🎯 A specific thing happened that made me think of him', score: 1 },
        ],
      },
      {
        id: 2,
        text: 'When you imagine him, what do you actually miss?',
        options: [
          { text: '❤️ Him specifically — his personality, his humor, him as a person', score: 3 },
          { text: '🛋️ The comfort of being in a relationship', score: -2 },
          { text: '🌟 The beginning — the version of us that no longer exists', score: -1 },
          { text: '🪞 Being chosen and wanted by someone', score: -2 },
        ],
      },
      {
        id: 3,
        text: 'Why did you break up?',
        options: [
          { text: '📍 Timing or circumstances — not personal failures', score: 2 },
          { text: '🌀 Things fizzled out — no big reason', score: 1 },
          { text: '💔 Fundamental incompatibility', score: -2 },
          { text: '🚩 He hurt me in a real way', score: -4 },
        ],
      },
      {
        id: 4,
        text: 'Have the things that caused the breakup actually changed?',
        options: [
          { text: '✅ Yes — genuinely, for both of us', score: 3 },
          { text: '🌱 I have — not sure about him', score: 1 },
          { text: '🤷 Honestly, I don\'t know', score: -1 },
          { text: '❌ No — nothing has changed', score: -3 },
        ],
      },
      {
        id: 5,
        text: 'What would you want to happen if you texted him?',
        options: [
          { text: '💬 Start a real conversation and see if there\'s still something there', score: 2 },
          { text: '🔄 Get back together', score: -1 },
          { text: '🔍 Get closure so I can finally stop missing him', score: 1 },
          { text: '😔 I don\'t know — I just don\'t want to feel this anymore', score: -3 },
        ],
      },
    ],
    verdicts: [
      { minScore: 7, verdict: 'REACH OUT 💌', color: '#00FF00', dark: false, sub: 'You miss him for real reasons, the context is right, and things have actually changed. One genuine message won\'t hurt — and might be exactly what you both needed.' },
      { minScore: 3, verdict: 'THINK ONE MORE DAY 🤔', color: '#FFD93D', dark: false, sub: 'The feeling seems real but make sure it\'s not circumstantial. Sleep on it once. If you still want to tomorrow morning, do it then with a clear head.' },
      { minScore: -1, verdict: 'MISS HIM IN SILENCE 🔇', color: '#FFD93D', dark: false, sub: 'You miss the relationship more than you miss him specifically. Texting won\'t fix that feeling — it\'ll just reopen something that needs more time to close properly.' },
      { minScore: -99, verdict: 'DON\'T TEXT HIM 🚫', color: '#FF6B6B', dark: true, sub: 'You\'re romanticizing the past or reaching out from pain, not clarity. The version of him you miss may not exist anymore — and a text tonight won\'t bring it back. Give yourself more time.' },
    ],
    textSuggestions: [
      'hey — I know it\'s been a while. I\'ve been thinking about you.',
      'I don\'t know if this is the right move but — I miss you. Thought you should know.',
      'hi. I\'ve been missing you lately. How are you doing?',
    ],
  },
]

export function getQuiz(slug: string): QuizData | undefined {
  return QUIZZES.find((q) => q.slug === slug)
}

export const QUIZ_SITE_URL = 'https://shoulditext.co'
