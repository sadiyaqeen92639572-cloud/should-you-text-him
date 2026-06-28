'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import QuizEngine from '../components/QuizEngine';
import SpinWheel from '../components/SpinWheel';
import { getQuiz, type QuizData } from '../lib/quizzes';
import { 
  ArrowRight, 
  RotateCcw, 
  Share2, 
  Check, 
  AlertTriangle, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp,
  Heart,
  Frown,
  Sparkles,
  Info
} from 'lucide-react';

// SEO Questions data
interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Should I text my ex after no contact?",
    answer: "No contact is a boundary designed to give you space to heal. If you break it, you risk resetting your recovery clock to zero. Unless they have reached out with real remorse and a desire to make amends, keep the streak alive. Run our quiz to score your specific situation."
  },
  {
    question: "Should I text him after ghosting?",
    answer: "If he ghosted you, his silence is a message. Reaching out shows you're willing to accept low-effort treatment. If you absolutely must text him back after ghosting, make it a single word like 'hey' and match his energy—or better yet, keep your self-respect and don't."
  },
  {
    question: "Should I text him back?",
    answer: "If you're interested and the conversation flows naturally, yes, reply. But you don't need to text back instantly if you are busy. Avoid sending double texts if he left you on read, as this changes the balance. Match his engagement levels."
  },
  {
    question: "Should I text him first after breakup?",
    answer: "Reaching out first after a breakup is a slippery slope. Usually, it's driven by temporary loneliness rather than a real reason to reconcile. Give yourself at least 30 days of space before making any decisions. Use our decision tool above to check your vibe."
  },
  {
    question: "Should I text my ex goodnight?",
    answer: "Absolutely not. Goodnight texts are for active relationships, not exes. Sending a goodnight text creates artificial intimacy and puts pressure on a situation that needs space. Put your phone on 'Do Not Disturb' and sleep on it."
  },
  {
    question: "Should I text my crush first?",
    answer: "Yes, texting first isn't desperate—it's direct! Just keep it very low-stakes. Don't start with a heavy declaration of feelings. Send something playful, short, and easy to respond to. Take our diagnostic quiz for a custom response."
  },
  {
    question: "What should I text my crush?",
    answer: "Keep it short, casual, and specific. Never send a simple 'hey'—it demands too much effort to reply to. Instead, send a meme, a quick question about something they mentioned, or a simple 'This reminded me of you' followed by an interesting link."
  },
  {
    question: "Should I text him on his birthday?",
    answer: "If you are on good terms and the breakup was amicable, a polite 'Happy Birthday!' is fine. But if it's an ex and you're secretly hoping it reopens a conversation, don't do it. It is a loaded move and they will see right through it."
  },
  {
    question: "Should I text him after he left me on read?",
    answer: "No. If he left you on read, the ball is firmly in his court. Sending another text is double-texting and signals anxiety. Respect his space (and your own dignity) and wait for him to initiate. If he never does, you have your answer."
  },
  {
    question: "Should I text him or move on?",
    answer: "Take the 5-question quiz above! It will calculate your chaos score based on your answers and give you a brutal, honest verdict instantly. If your score is low, it's time to put the phone down and move on to better things."
  },
  {
    question: "Should I text him after a week of silence?",
    answer: "A week of silence is long enough to feel deliberate — but not always. If your last conversation ended well and his usual pattern isn't radio silence, one casual message is fair game. If he regularly disappears, reaching out just confirms he can keep doing it."
  },
  {
    question: "Should I text him or leave him alone?",
    answer: "Look at the effort ratio. If you've been the one initiating every time and getting minimal back, leaving him alone is the power move. Silence reveals intention — his and yours. Use our quiz to get a read on your specific situation."
  },
  {
    question: "Should I text him I miss him?",
    answer: "Only if the feeling has been consistent for days — not if it hit you at midnight after three glasses of wine. 'I miss you' puts all the cards on the table, so make sure the situation can handle that kind of honesty before you send it."
  },
  {
    question: "I miss my ex — should I text him?",
    answer: "Missing your ex is normal. Acting on it without thinking is where it gets painful. The key question: do you miss HIM specifically, or do you miss having someone? If it's the latter, no text will fix that feeling. Take the quiz to find out which one it really is."
  }
];

interface QuestionOption {
  text: string;
  scoreValue: number;
}

interface QuizQuestion {
  id: number;
  questionText: string;
  options: QuestionOption[];
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionText: "Who is this person?",
    options: [
      { text: "💔 My ex", scoreValue: 0 },
      { text: "💘 My crush", scoreValue: 2 },
      { text: "👫 Someone I'm seeing", scoreValue: 3 },
      { text: "👻 Someone who ghosted me", scoreValue: -3 }
    ]
  },
  {
    id: 2,
    questionText: "Why do you want to text them?",
    options: [
      { text: "😭 I miss them / I'm lonely", scoreValue: -2 },
      { text: "📣 I have something important to say", scoreValue: +3 },
      { text: "😤 I'm upset and want answers", scoreValue: +1 },
      { text: "🌙 It's late and I'm bored", scoreValue: -3 },
      { text: "💬 Just to keep the convo going", scoreValue: +2 }
    ]
  },
  {
    id: 3,
    questionText: "When did they last reach out to you?",
    options: [
      { text: "Today or yesterday", scoreValue: +3 },
      { text: "A few days ago", scoreValue: +1 },
      { text: "Over a week ago", scoreValue: -2 },
      { text: "They haven't... ever", scoreValue: -4 }
    ]
  },
  {
    id: 4,
    questionText: "How would you feel if they don't reply?",
    options: [
      { text: "Fine, I just wanted to say it", scoreValue: +3 },
      { text: "Anxious but I'd survive", scoreValue: +1 },
      { text: "Devastated", scoreValue: -3 },
      { text: "I'd send a follow-up immediately", scoreValue: -4 }
    ]
  },
  {
    id: 5,
    questionText: "Be honest: are you texting because...",
    options: [
      { text: "I genuinely want to connect", scoreValue: +3 },
      { text: "I want them to want me back", scoreValue: -2 },
      { text: "I had a specific reason in mind", scoreValue: +2 },
      { text: "My friends dared me", scoreValue: +1 }
    ]
  }
];

export default function ShouldITextPage() {
  const [step, setStep] = useState<'landing' | 'quiz' | 'loading' | 'verdict'>('landing');
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [hydratedLastVerdict, setHydratedLastVerdict] = useState<string | null>(null);

  // Loading animation state variables
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [loadingPhase, setLoadingPhase] = useState<string>("ANALYZING YOUR SITUATION...");

  // FAQ state
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  // Sub-quiz state
  const [activeSubQuiz, setActiveSubQuiz] = useState<QuizData | null>(null);
  const subQuizRef = useRef<HTMLElement>(null);
  const subQuizHeaderRef = useRef<HTMLDivElement>(null);

  // Toast notifier
  const [showToast, setShowToast] = useState<boolean>(false);

  const openSubQuiz = (slug: string) => {
    const quiz = getQuiz(slug);
    if (!quiz) return;
    setActiveSubQuiz(quiz);
    setTimeout(() => {
      subQuizHeaderRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  // Read stored values safely on client-side after mount
  useEffect(() => {
    const saved = localStorage.getItem('should_i_text_last_verdict');
    if (saved) {
      setTimeout(() => {
        setHydratedLastVerdict(saved);
      }, 0);
    }
  }, []);

  const startQuiz = () => {
    setAnswers([]);
    setCurrentQuestion(0);
    setStep('quiz');
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectOption = (scoreValue: number) => {
    const nextAnswers = [...answers, scoreValue];
    setAnswers(nextAnswers);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      // Smooth advance to next question
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Start loading sequence
      setStep('loading');
      setLoadingProgress(0);
      setLoadingPhase("ANALYZING YOUR SITUATION...");

      // Simulate step-by-step diagnostic loading
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 2;
        if (currentProgress > 100) currentProgress = 100;
        setLoadingProgress(currentProgress);

        if (currentProgress < 35) {
          setLoadingPhase("ANALYZING YOUR SITUATION...");
        } else if (currentProgress < 70) {
          setLoadingPhase("CALCULATING CHAOS POTENTIAL...");
        } else {
          setLoadingPhase("CONSULTING THE UNIVERSE...");
        }

        if (currentProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setStep('verdict');
          }, 300);
        }
      }, 50); // 100% in 2.5 seconds
    }
  };

  // Calculate final score and verdict
  const totalScore = answers.reduce((acc, curr) => acc + curr, 0);

  const getVerdictData = (score: number) => {
    if (score >= 9) {
      return {
        verdict: "SEND IT 🔥",
        color: "#00FF00", // Green
        textColor: "text-black",
        sub: "You have a real reason, solid energy, and nothing to lose. Go."
      };
    } else if (score >= 5) {
      return {
        verdict: "YES, BUT MAKE IT GOOD 💬",
        color: "#FFD93D", // Yellow
        textColor: "text-black",
        sub: "The vibe is there. Don't text a novel. Keep it short, specific, and unbothered."
      };
    } else if (score >= 1) {
      return {
        verdict: "WAIT 24 HOURS ⏳",
        color: "#FFD93D", // Yellow
        textColor: "text-black",
        sub: "Not a no — just not right now. Sleep on it. If you still want to tomorrow, send it."
      };
    } else if (score >= -2) {
      return {
        verdict: "PUT THE PHONE DOWN 📵",
        color: "#FF6B6B", // Red
        textColor: "text-white",
        sub: "Current energy: chaos. Future-you will thank present-you for waiting."
      };
    } else {
      return {
        verdict: "ABSOLUTELY NOT 💀",
        color: "#FF6B6B", // Red
        textColor: "text-white",
        sub: "Step away from the keyboard. Hydrate. Call a friend. Do NOT send that text."
      };
    }
  };

  const currentVerdict = getVerdictData(totalScore);

  // Store verdict when calculated
  useEffect(() => {
    if (step === 'verdict') {
      localStorage.setItem('should_i_text_last_verdict', currentVerdict.verdict);
      setTimeout(() => {
        setHydratedLastVerdict(currentVerdict.verdict);
        if (typeof window !== 'undefined') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 0);
    }
  }, [step, currentVerdict.verdict]);

  // Determine what to text based on Question 1 selection
  // Q1 is "Who is this person?": 💔 My ex (idx 0), 💘 My crush (idx 1), 👫 Someone I'm seeing (idx 2), 👻 Someone who ghosted me (idx 3)
  const getQ1OptionIndex = () => {
    // Check if the first answer choice matches any. Let's trace back from answers array.
    // However, it's safer to store the actual answers options indexes, or we can look up using the score value.
    // Wait! Let's make it simpler. Let's record the exact selected option indexes.
    // Let's change how we store answers: { questionIdx: scoreValue, text: optionText } or just store optionIndex.
    // Let's define the actual answer options:
    // To keep it 100% accurate, let's look at the first answer's value. But score values are: ex = 0, crush = 2, seeing = 3, ghosted = -3.
    // Since all scores for Q1 are unique (0, 2, 3, -3), we can uniquely find which option was picked!
    const q1Score = answers[0];
    if (q1Score === 0) return 'ex';
    if (q1Score === 2) return 'crush';
    if (q1Score === 3) return 'seeing';
    if (q1Score === -3) return 'ghoster';
    return 'crush'; // default fallback
  };

  const q1PersonType = getQ1OptionIndex();

  const getSmsSuggestions = (personType: string, score: number) => {
    if (personType === 'ghoster') {
      return null; // Handle ghoster message separately
    }
    if (personType === 'crush') {
      return [
        "hey, thought of you when I saw [thing]",
        "ok this reminded me of you [link/thing]",
        "random but — how are you actually doing?"
      ];
    }
    if (personType === 'ex') {
      const list = [
        "hey, hope things are good with you",
        "I was thinking about [specific good memory] earlier. Weird."
      ];
      if (score >= 9) {
        list.push("I miss talking to you. Is that weird to say?");
      } else {
        list.push("hey, left my jacket at your place / hope you are doing ok");
      }
      return list;
    }
    if (personType === 'seeing') {
      return [
        "what are you doing later?",
        "no reason just thinking about you",
        "are you free [day]?"
      ];
    }
    return [];
  };

  const smsSuggestions = getSmsSuggestions(q1PersonType, totalScore);

  // Funny observations based on score pattern
  const getFunnyObservations = (score: number) => {
    if (score >= 9) {
      return [
        "You already had your thumb hovering over the 'Send' button before starting this test.",
        "You're just looking for verification, and congratulations, we are officially enabling you."
      ];
    } else if (score >= 5) {
      return [
        "You desperately want to text them, but also want to keep your dignity. It's a high-stakes tightrope walk.",
        "If you edit your draft more than 3 times, you're trying too hard. Keep it punchy."
      ];
    } else if (score >= 1) {
      return [
        "You are hoping that waiting 24 hours will magically make them miss you. (Spoiler: it actually might!).",
        "Your phone is currently radiating high-stress heat. Put it on charger in another room immediately."
      ];
    } else if (score >= -2) {
      return [
        "You are bored, slightly lonely, and hunting for a quick brain dopamine hit. Go drink some water instead.",
        "You know exactly what they're going to say (or not say), and you're already pre-annoyed by it."
      ];
    } else {
      return [
        "You are romanticizing a situationship that was actually 90% anxiety and 10% fun. Let it rest in peace.",
        "Your friends are currently holding their breath hoping you don't send this. Do it for them, please."
      ];
    }
  };

  const funnyObservations = getFunnyObservations(totalScore);

  // Handle Share functionality
  const handleShare = () => {
    const shareText = `I got "${currentVerdict.verdict}" on Should I Text Him? 📱 Get your instant texting verdict here!`;
    navigator.clipboard.writeText(shareText).then(() => {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }).catch(err => {
      console.error("Failed to copy text: ", err);
    });
  };

  const SITE_URL = 'https://shoulditext.co'

  // Map each FAQ index to its dedicated quiz slug
  const FAQ_QUIZ_SLUGS: string[] = [
    'ex-no-contact',
    'after-ghosting',
    'should-text-back',
    'first-after-breakup',
    'ex-goodnight',
    'crush-first',
    'what-to-text-crush',
    'his-birthday',
    'left-on-read',
    'or-move-on',
    'after-week-silence',
    'or-leave-alone',
    'i-miss-him',
    'miss-ex',
  ]

  // Structured Schema markup for search engines
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#app`,
        "name": "Should I Text Him?",
        "url": SITE_URL,
        "description": "An instant yes/no decision tool for texting dilemmas",
        "applicationCategory": "LifestyleApplication",
        "operatingSystem": "Any",
        "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          ...FAQ_ITEMS.map(item => ({
            "@type": "Question",
            "name": item.question,
            "acceptedAnswer": { "@type": "Answer", "text": item.answer }
          })),
          {
            "@type": "Question",
            "name": "Should I text him yes or no wheel — how does it work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The 'Should I Text Him Yes or No Wheel' is a free random decision spinner with 8 humorous outcomes: TEXT IT, SEND IT, DO IT, OBVIOUSLY YES (yes answers) and GIRL NO, PUT IT DOWN, STEP AWAY, ABSOLUTELY NOT (no answers). Spin it for an instant yes or no verdict. For a more accurate answer based on your real situation, use the full 5-question diagnostic above."
            }
          },
          {
            "@type": "Question",
            "name": "Is there a yes or no wheel to decide if I should text him?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes — textorwait.com has a free yes or no spin wheel specifically for the 'should I text him' dilemma. The wheel has alternating yes and no segments with funny labels. Click SPIN and get an instant random verdict. For a personalised answer based on context, timing, and your specific situation, take the 5-question quiz instead."
            }
          }
        ]
      },
      {
        "@type": "ItemList",
        "name": "Should I Text Him — Quizzes for Every Situation",
        "description": "14 free instant quizzes covering every texting dilemma: exes, crushes, ghosting, breakups, and more.",
        "numberOfItems": 14,
        "itemListElement": [
          { "@type": "ListItem", "position": 1,  "name": "Should I Text My Ex After No Contact?",       "url": `${SITE_URL}/quiz/ex-no-contact` },
          { "@type": "ListItem", "position": 2,  "name": "Should I Text Him After Ghosting?",            "url": `${SITE_URL}/quiz/after-ghosting` },
          { "@type": "ListItem", "position": 3,  "name": "Should I Text Him Back?",                      "url": `${SITE_URL}/quiz/should-text-back` },
          { "@type": "ListItem", "position": 4,  "name": "Should I Text Him First After Breakup?",       "url": `${SITE_URL}/quiz/first-after-breakup` },
          { "@type": "ListItem", "position": 5,  "name": "Should I Text My Ex Goodnight?",               "url": `${SITE_URL}/quiz/ex-goodnight` },
          { "@type": "ListItem", "position": 6,  "name": "Should I Text My Crush First?",                "url": `${SITE_URL}/quiz/crush-first` },
          { "@type": "ListItem", "position": 7,  "name": "What Should I Text My Crush?",                 "url": `${SITE_URL}/quiz/what-to-text-crush` },
          { "@type": "ListItem", "position": 8,  "name": "Should I Text Him On His Birthday?",           "url": `${SITE_URL}/quiz/his-birthday` },
          { "@type": "ListItem", "position": 9,  "name": "Should I Text Him After He Left Me On Read?",  "url": `${SITE_URL}/quiz/left-on-read` },
          { "@type": "ListItem", "position": 10, "name": "Should I Text Him Or Move On?",                "url": `${SITE_URL}/quiz/or-move-on` },
          { "@type": "ListItem", "position": 11, "name": "Should I Text Him After a Week of Silence?",   "url": `${SITE_URL}/quiz/after-week-silence` },
          { "@type": "ListItem", "position": 12, "name": "Should I Text Him or Leave Him Alone?",        "url": `${SITE_URL}/quiz/or-leave-alone` },
          { "@type": "ListItem", "position": 13, "name": "Should I Text Him I Miss Him?",                "url": `${SITE_URL}/quiz/i-miss-him` },
          { "@type": "ListItem", "position": 14, "name": "I Miss My Ex — Should I Text Him?",            "url": `${SITE_URL}/quiz/miss-ex` },
        ]
      }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col justify-between px-4 py-6 md:py-8 max-w-7xl mx-auto select-none font-sans bg-[#F4F4F1] text-black">
      
      {/* Insert JSON-LD Schema dynamically inside body */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />

      {/* Floating Clipboard Copy Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 bg-[#FFD93D] text-black border-4 border-black px-6 py-3 font-extrabold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
            id="toast-notification"
          >
            <Check className="w-5 h-5 stroke-[3px]" />
            Copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Bento Box */}
      <header className="w-full bg-[#FFD93D] border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <div className="inline-block bg-black text-white px-3 py-1 font-extrabold uppercase text-xs tracking-wider border-2 border-black mb-2">
            🔮 DECISION COMPASS v2.6
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-black uppercase leading-none">
            Should I Text Him?
          </h1>
          <p className="text-sm md:text-base font-bold text-black uppercase tracking-wide mt-1">
            5 questions. Instant verdict. No therapy needed.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <span className="text-[11px] font-black uppercase tracking-widest text-black/50">
            textorwait.com
          </span>
          <div className="bg-white border-4 border-black px-5 py-3 font-black uppercase text-xs md:text-sm tracking-wider shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2 justify-center">
            <span className="w-3 h-3 rounded-none bg-[#FF6B6B] border border-black animate-pulse"></span>
            LAST VERDICT: <span className="text-[#FF6B6B] underline ml-1">{hydratedLastVerdict ? hydratedLastVerdict : "NONE YET"}</span>
          </div>
        </div>
      </header>

      {/* Responsive Bento Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full flex-grow">
        
        {/* LEFT COMPONENT: Interactive Diagnostic Block (Col span 7/12) */}
        <main ref={subQuizRef} className="lg:col-span-7 xl:col-span-8 flex flex-col w-full">

          {/* Specific Sub-Quiz — appears above main quiz when FAQ CTA clicked */}
          <AnimatePresence>
            {activeSubQuiz && (
              <motion.div
                key={activeSubQuiz.slug}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.25 }}
                className="mb-6"
              >
                {/* Header */}
                <div ref={subQuizHeaderRef} className="flex items-center justify-between bg-[#FFD93D] border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] mb-4">
                  <div>
                    <div className="inline-block bg-black text-white px-2 py-0.5 font-extrabold uppercase text-[10px] tracking-wider border border-black mb-1">
                      🔮 SPECIFIC QUIZ
                    </div>
                    <h2 className="text-xl md:text-2xl font-black uppercase tracking-tight leading-none">
                      {activeSubQuiz.title}
                    </h2>
                  </div>
                  <button
                    onClick={() => setActiveSubQuiz(null)}
                    className="bg-black text-white border-2 border-black px-3 py-2 font-black uppercase text-xs hover:bg-[#FF6B6B] transition-colors cursor-pointer shrink-0 ml-4"
                  >
                    ✕ Close
                  </button>
                </div>
                {/* Intro */}
                <div className="bg-white border-4 border-black px-6 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
                  <p className="font-bold text-sm text-gray-700 leading-relaxed">{activeSubQuiz.intro}</p>
                </div>
                {/* Quiz engine */}
                <QuizEngine quiz={activeSubQuiz} onBack={() => setActiveSubQuiz(null)} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">
            
            {/* STEP 1: LANDING */}
            {step === 'landing' && (
              <motion.div
                key="landing-screen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full"
                id="landing-screen-container"
              >
                <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden mb-6">
                  <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF6B6B] border-b-4 border-l-4 border-black flex items-center justify-center font-black text-xl">
                    ⚡
                  </div>

                  <h3 className="text-xl md:text-3xl font-black uppercase mb-4 leading-tight">
                    Are you about to make a huge mistake, or is this the start of something beautiful?
                  </h3>
                  
                  <p className="text-sm md:text-base font-medium text-gray-700 mb-6 leading-relaxed">
                    Stop drafting, stop overthinking, and stop sending paragraphs to your group chat. Answer 5 quick, painfully honest questions and get a definitive answer.
                  </p>

                  <button
                    onClick={startQuiz}
                    className="w-full bg-[#FFD93D] hover:bg-[#ffe066] active:translate-x-1 active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-black font-black uppercase tracking-wider text-lg py-4 px-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3 cursor-pointer"
                    id="start-button"
                  >
                    START DIAGNOSTIC
                    <ArrowRight className="w-6 h-6 stroke-[3px]" />
                  </button>

                  <button
                    onClick={() => document.getElementById('spin-wheel')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="w-full mt-3 bg-white hover:bg-black hover:text-white text-black font-black uppercase tracking-wider text-sm py-3 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    🎡 Get a Quick Yes or No
                  </button>

                  <div className="mt-5 text-center">
                    <span className="text-xs font-black uppercase text-gray-500">
                      Also works for: exes, crushes, situationships, &amp; late-night regrets
                    </span>
                  </div>
                </div>

                {/* ADSENSE PLACEHOLDER 1 */}
                <div className="ad-placeholder w-full h-[90px] border-4 border-black bg-[#FFD93D] flex flex-col items-center justify-center relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="absolute top-1 left-2 text-[9px] font-black uppercase text-black/40 tracking-wider">AD</span>
                  <p className="font-black uppercase text-xs text-black tracking-widest text-center px-4">
                    While you overthink this text,<br/>
                    <span className="text-[10px] font-bold normal-case text-black/70">your future self is cringing. Sponsored by reality.</span>
                  </p>
                </div>

                {/* SPIN WHEEL */}
                <SpinWheel />
              </motion.div>
            )}

            {/* STEP 2: QUIZ */}
            {step === 'quiz' && (
              <motion.div
                key="quiz-screen"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="w-full"
                id="quiz-screen-container"
              >
                <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                  {/* Visual Progress Bar */}
                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2 font-black uppercase text-xs tracking-wider">
                      <span>Diagnostic Test Progress</span>
                      <span>Q {currentQuestion + 1} OF 5</span>
                    </div>
                    <div className="w-full bg-[#F4F4F1] border-4 border-black h-8 overflow-hidden relative">
                      <div 
                        className="bg-[#00FF00] h-full border-r-4 border-black transition-all duration-300" 
                        style={{ width: `${((currentQuestion + 1) / 5) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Animated Question Content */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`q-${currentQuestion}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.15 }}
                    >
                      <div className="bg-[#FFD93D] border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                        <span className="bg-black text-white px-2 py-0.5 text-xs font-black uppercase border border-black inline-block mb-2">
                          QUESTION 0{currentQuestion + 1}
                        </span>
                        <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight">
                          {QUIZ_QUESTIONS[currentQuestion].questionText}
                        </h2>
                      </div>

                      <div className="space-y-4">
                        {QUIZ_QUESTIONS[currentQuestion].options.map((option, index) => (
                          <button
                            key={`opt-${index}`}
                            onClick={() => handleSelectOption(option.scoreValue)}
                            className="w-full bg-white hover:bg-black hover:text-white text-black font-extrabold text-left border-4 border-black p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 transition-all text-base md:text-lg flex items-center justify-between group cursor-pointer"
                          >
                            <span>{option.text}</span>
                            <span className="w-6 h-6 border-2 border-black rounded-none group-hover:border-white bg-[#F4F4F1] group-hover:bg-black flex items-center justify-center shrink-0 ml-3">
                              <span className="w-2.5 h-2.5 bg-black group-hover:bg-white scale-0 group-hover:scale-100 transition-transform duration-100" />
                            </span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* STEP 3: LOADING */}
            {step === 'loading' && (
              <motion.div
                key="loading-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center px-6"
                id="loading-screen-container"
              >
                <div className="max-w-[480px] w-full text-center">
                  
                  {/* Neobrutalist loader widget */}
                  <div className="border-4 border-white bg-black p-6 mb-8 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
                    <div className="text-6xl mb-6 animate-pulse">🔮</div>
                    
                    <h2 className="text-xl md:text-2xl font-black tracking-widest uppercase mb-3 animate-pulse">
                      {loadingPhase}
                    </h2>
                    
                    <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">
                      Running emotional algorithms...
                    </p>

                    {/* Outer border bar */}
                    <div className="w-full bg-zinc-900 border-4 border-white h-8 overflow-hidden relative mb-4">
                      <div 
                        className="bg-[#00FF00] h-full border-r-4 border-white transition-all duration-100" 
                        style={{ width: `${loadingProgress}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center font-mono font-bold text-xs text-white mix-blend-difference">
                        {loadingProgress}% COMPLETE
                      </div>
                    </div>

                    <div className="flex justify-between font-mono text-[10px] text-gray-500 uppercase">
                      <span>Chaos: HIGH</span>
                      <span>Logic: COMPUTING</span>
                    </div>
                  </div>

                  {/* ADSENSE PLACEHOLDER 2 */}
                  <div className="ad-placeholder w-full h-[90px] border-4 border-white bg-zinc-900 flex flex-col items-center justify-center relative">
                    <span className="absolute top-1 left-2 text-[9px] font-black uppercase text-zinc-500 tracking-wider">AD</span>
                    <p className="font-black uppercase text-[10px] text-[#00FF00] tracking-widest text-center px-4">
                      Emotionally unavailable? Same.<br/>
                      <span className="text-[9px] font-bold normal-case text-zinc-400">Sponsored by the dating app you keep deleting.</span>
                    </p>
                  </div>

                </div>
              </motion.div>
            )}

            {/* STEP 4: VERDICT */}
            {step === 'verdict' && (
              <motion.div
                key="verdict-screen"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="w-full"
                id="verdict-screen-container"
              >
                {/* Result Block */}
                <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-6">
                  
                  <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-wider inline-block mb-3">
                    THE VERDICT
                  </span>

                  {/* Dynamic color code border card */}
                  <div 
                    className="border-4 border-black p-6 mb-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                    style={{ backgroundColor: currentVerdict.color }}
                  >
                    <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight leading-none text-black">
                      {currentVerdict.verdict}
                    </h2>
                  </div>

                  <p className="text-lg font-bold text-black mb-6 leading-snug">
                    {currentVerdict.sub}
                  </p>

                  <hr className="border-2 border-black border-dashed mb-6" />

                  {/* STEP 5: SUGGESTIONS */}
                  {smsSuggestions ? (
                    <div className="mb-6">
                      <h4 className="text-sm font-black uppercase text-gray-500 tracking-wider mb-3 flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 stroke-[3px]" />
                        3 TEXT MESSAGES TO SEND:
                      </h4>
                      <div className="space-y-3">
                        {smsSuggestions.map((text, idx) => (
                          <div 
                            key={`msg-${idx}`}
                            className="bg-[#F4F4F1] border-3 border-black p-4 font-mono text-sm font-extrabold text-black relative group"
                          >
                            <span className="absolute top-1 right-2 text-[9px] font-black uppercase text-gray-400">Option {idx + 1}</span>
                            <p className="pr-12">&ldquo;{text}&rdquo;</p>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(text);
                                setShowToast(true);
                                setTimeout(() => setShowToast(false), 3000);
                              }}
                              className="absolute right-2 bottom-2 bg-black hover:bg-[#FFD93D] text-white hover:text-black font-black uppercase text-[10px] px-2 py-1 border-2 border-black transition-colors shrink-0 cursor-pointer"
                            >
                              COPY
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // GHOSTER OR NO SUGGESTIONS RED FLAG WARNING
                    <div className="bg-[#FF6B6B] text-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-8 h-8 stroke-[3px] shrink-0 text-white" />
                        <div>
                          <h4 className="font-black uppercase text-base tracking-wide mb-1">
                            🚩 RED FLAG REMINDER
                          </h4>
                          <p className="font-extrabold text-xs leading-relaxed">
                            They previously ghosted you! If you absolutely must text, send exactly one word: <span className="underline font-black text-sm">&ldquo;hey&rdquo;</span> and nothing else. Then wait indefinitely. Let them match your minimal effort.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Funny observations based on score */}
                  <div className="bg-[#F4F4F1] border-4 border-black p-5 mb-6">
                    <h4 className="text-xs font-black uppercase text-black tracking-widest mb-3 flex items-center gap-1.5">
                      <Info className="w-4 h-4" />
                      WHAT YOUR GUT IS TELLING YOU:
                    </h4>
                    <ul className="space-y-2 text-sm font-bold text-gray-700">
                      {funnyObservations.map((obs, idx) => (
                        <li key={`obs-${idx}`} className="flex items-start gap-2">
                          <span className="text-[#FF6B6B] text-lg select-none">•</span>
                          <span>{obs}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={startQuiz}
                      className="bg-black hover:bg-gray-800 text-white font-black uppercase tracking-wider text-sm py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      id="try-again-button"
                    >
                      <RotateCcw className="w-4 h-4 stroke-[3px]" />
                      TRY AGAIN
                    </button>
                    <button
                      onClick={handleShare}
                      className="bg-[#FFD93D] hover:bg-[#ffe066] text-black font-black uppercase tracking-wider text-sm py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
                      id="share-button"
                    >
                      <Share2 className="w-4 h-4 stroke-[3px]" />
                      SHARE VERDICT
                    </button>
                  </div>

                </div>

                {/* ADSENSE PLACEHOLDER 3 */}
                <div className="ad-placeholder w-full h-[90px] border-4 border-black bg-black flex flex-col items-center justify-center relative mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <span className="absolute top-1 left-2 text-[9px] font-black uppercase text-white/30 tracking-wider">AD</span>
                  <p className="font-black uppercase text-xs text-white tracking-widest text-center px-4">
                    Verdict delivered. Phone still in hand.<br/>
                    <span className="text-[10px] font-bold normal-case text-[#FFD93D]">Sponsored by your inability to just put it down.</span>
                  </p>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </main>

        {/* RIGHT COMPONENT: FAQ / Advice Bento Sidebar (Col span 5/12) */}
        <aside className="lg:col-span-5 xl:col-span-4 flex flex-col gap-6 w-full">
          
          {/* Header block for Frequently Asked Chaos */}
          <div className="bg-[#00FF00] border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center font-black uppercase tracking-widest text-sm md:text-base">
            🔥 FREQUENTLY ASKED CHAOS
          </div>

          {/* Interactive FAQs Accordion block */}
          <div className="space-y-4" id="faq-section">
            {FAQ_ITEMS.map((item, idx) => {
              const isExpanded = expandedFaq === idx;
              return (
                <div 
                  key={`faq-${idx}`}
                  className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden"
                  id={`faq-item-${idx}`}
                >
                  <button
                    onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                    className="w-full p-4 text-left font-black uppercase text-xs md:text-sm flex justify-between items-center bg-[#F4F4F1] hover:bg-[#FFD93D] transition-colors focus:outline-none cursor-pointer select-none"
                  >
                    <span className="pr-2 leading-tight">{item.question}</span>
                    <span className="p-1 border-2 border-black bg-white shrink-0">
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5 stroke-[3px]" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5 stroke-[3px]" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.15, ease: "easeInOut" }}
                        className="overflow-hidden border-t-4 border-black"
                      >
                        <div className="p-4 font-semibold text-xs md:text-sm leading-relaxed text-gray-800 bg-white">
                          {item.answer}
                          {FAQ_QUIZ_SLUGS[idx] && (
                            <button
                              onClick={() => openSubQuiz(FAQ_QUIZ_SLUGS[idx])}
                              className="mt-3 flex items-center gap-2 bg-[#FFD93D] border-2 border-black px-3 py-2 text-[10px] font-black uppercase tracking-wide text-black hover:bg-black hover:text-[#FFD93D] transition-colors w-fit shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer"
                            >
                              <ArrowRight className="w-3 h-3 stroke-[3px]" />
                              Take the specific quiz →
                            </button>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Side-box: Text Regret Forecast / Chaos Alert */}
          <div className="bg-[#FF6B6B] text-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black uppercase text-base tracking-wide mb-2 flex items-center gap-2">
              ⚠️ CRITICAL FORECAST
            </h3>
            <p className="font-extrabold text-xs leading-relaxed uppercase">
              98% of texts sent to exes after 11 PM or before drinking three glasses of water are met with immediate, visceral, and irreversible psychological distress. Step away from the keypad if you score lower than a 5!
            </p>
          </div>

        </aside>

      </div>

      {/* Algorithm Explainer */}
      <section className="w-full mt-10 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-black text-white px-6 py-3 flex items-center gap-3">
          <span className="text-lg">⚙️</span>
          <h2 className="font-black uppercase tracking-widest text-sm">How The Algorithm Works</h2>
          <span className="ml-auto text-[10px] font-mono text-gray-400 uppercase tracking-wider">Decision Compass v2.6</span>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Step 1 */}
          <div className="border-4 border-black p-4 bg-[#F4F4F1]">
            <div className="bg-[#FFD93D] border-2 border-black w-8 h-8 flex items-center justify-center font-black text-sm mb-3">1</div>
            <h3 className="font-black uppercase text-xs tracking-wider mb-2">5 Questions → Chaos Score</h3>
            <p className="text-xs font-medium text-gray-700 leading-relaxed">
              Each answer carries a weighted score from <span className="font-black">−4</span> (red flag) to <span className="font-black">+3</span> (green light). Scores reflect emotional risk, timing, and motivation — not just &ldquo;do you like them.&rdquo;
            </p>
            <div className="mt-3 space-y-1 font-mono text-[10px]">
              <div className="flex justify-between"><span>Genuine reason to connect</span><span className="text-[#00AA00] font-black">+3</span></div>
              <div className="flex justify-between"><span>It&apos;s late and I&apos;m bored</span><span className="text-[#FF6B6B] font-black">−3</span></div>
              <div className="flex justify-between"><span>They ghosted me</span><span className="text-[#FF6B6B] font-black">−3</span></div>
              <div className="flex justify-between"><span>I&apos;d send a follow-up immediately</span><span className="text-[#FF6B6B] font-black">−4</span></div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="border-4 border-black p-4 bg-[#F4F4F1]">
            <div className="bg-[#00FF00] border-2 border-black w-8 h-8 flex items-center justify-center font-black text-sm mb-3">2</div>
            <h3 className="font-black uppercase text-xs tracking-wider mb-2">Score Thresholds → Verdict</h3>
            <p className="text-xs font-medium text-gray-700 leading-relaxed mb-3">
              Total score (min −14, max +14) maps to 5 verdict zones. Each zone has a colour, a verdict, and tailored SMS suggestions.
            </p>
            <div className="space-y-1.5 font-mono text-[10px]">
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#00FF00] border border-black shrink-0"></span><span>≥ 9 → SEND IT 🔥</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#FFD93D] border border-black shrink-0"></span><span>≥ 5 → YES, BUT MAKE IT GOOD</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#FFD93D] border border-black shrink-0"></span><span>≥ 1 → WAIT 24 HOURS ⏳</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#FF6B6B] border border-black shrink-0"></span><span>≥ −2 → PUT THE PHONE DOWN</span></div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 bg-[#FF6B6B] border border-black shrink-0"></span><span>&lt; −2 → ABSOLUTELY NOT 💀</span></div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="border-4 border-black p-4 bg-[#F4F4F1]">
            <div className="bg-[#FF6B6B] border-2 border-black w-8 h-8 flex items-center justify-center font-black text-sm mb-3 text-white">3</div>
            <h3 className="font-black uppercase text-xs tracking-wider mb-2">Context Modifier → SMS Templates</h3>
            <p className="text-xs font-medium text-gray-700 leading-relaxed mb-3">
              Q1 (who is this person?) adjusts the SMS templates shown. Ghosters get a red-flag warning instead of templates. Exes, crushes, and situationships each get specific copy.
            </p>
            <div className="space-y-1 font-mono text-[10px] text-gray-600">
              <div>💔 Ex → careful, low-stakes openers</div>
              <div>💘 Crush → playful, short, specific</div>
              <div>👫 Seeing → casual, direct</div>
              <div>👻 Ghoster → 🚩 Red Flag Warning</div>
            </div>
            <div className="mt-3 border-t-2 border-dashed border-black pt-2 text-[9px] font-mono text-gray-400 uppercase tracking-wider">
              No data stored · No account required · Pure client-side logic
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="w-full text-center mt-12 pt-6 border-t-4 border-black flex flex-col items-center gap-2">
        <span className="text-xs font-extrabold uppercase text-gray-600 tracking-widest">
          No data collected. No judgment. Just pure vibes.
        </span>
        <span className="text-sm font-black uppercase tracking-wider text-black">
          © 2026 ShouldIText
        </span>
        <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider">
          Made for highly indecisive people everywhere
        </span>
        <span className="text-[11px] font-black uppercase tracking-widest text-black/30 mt-1">
          textorwait.com
        </span>
      </footer>

    </div>
  );
}
