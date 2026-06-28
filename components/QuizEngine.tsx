'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ArrowRight,
  RotateCcw,
  Share2,
  Check,
  MessageSquare,
  ChevronLeft,
} from 'lucide-react'
import type { QuizData } from '../lib/quizzes'

interface Props {
  quiz: QuizData
  onBack?: () => void
}

export default function QuizEngine({ quiz, onBack }: Props) {
  const [step, setStep] = useState<'quiz' | 'loading' | 'verdict'>('quiz')
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [scores, setScores] = useState<number[]>([])
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [loadingPhase, setLoadingPhase] = useState('ANALYZING YOUR SITUATION...')
  const [showToast, setShowToast] = useState(false)

  const restart = () => {
    setStep('quiz')
    setCurrentQuestion(0)
    setScores([])
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOption = (score: number) => {
    const next = [...scores, score]
    setScores(next)
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setStep('loading')
      setLoadingProgress(0)
      let p = 0
      const iv = setInterval(() => {
        p += 3
        if (p > 100) p = 100
        setLoadingProgress(p)
        if (p < 35) setLoadingPhase('ANALYZING YOUR SITUATION...')
        else if (p < 70) setLoadingPhase('CALCULATING CHAOS POTENTIAL...')
        else setLoadingPhase('CONSULTING THE UNIVERSE...')
        if (p >= 100) {
          clearInterval(iv)
          setTimeout(() => {
            setStep('verdict')
            if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' })
          }, 300)
        }
      }, 40)
    }
  }

  const totalScore = scores.reduce((a, b) => a + b, 0)

  const verdict = [...quiz.verdicts]
    .sort((a, b) => b.minScore - a.minScore)
    .find((v) => totalScore >= v.minScore) ?? quiz.verdicts[quiz.verdicts.length - 1]

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setShowToast(true)
      setTimeout(() => setShowToast(false), 3000)
    })
  }

  return (
    <>
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#FFD93D] text-black border-4 border-black px-6 py-3 font-extrabold uppercase shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2"
          >
            <Check className="w-5 h-5 stroke-[3px]" />
            Copied!
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">

        {/* ── QUIZ ── */}
        {step === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2 font-black uppercase text-xs tracking-wider">
                <span>Progress</span>
                <span>Q {currentQuestion + 1} OF {quiz.questions.length}</span>
              </div>
              <div className="w-full bg-[#F4F4F1] border-4 border-black h-8 overflow-hidden">
                <div
                  className="bg-[#00FF00] h-full border-r-4 border-black transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Question */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
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
                    {quiz.questions[currentQuestion].text}
                  </h2>
                </div>
                <div className="space-y-4">
                  {quiz.questions[currentQuestion].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOption(opt.score)}
                      className="w-full bg-white hover:bg-black hover:text-white text-black font-extrabold text-left border-4 border-black p-5 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 transition-all text-base md:text-lg flex items-center justify-between group cursor-pointer"
                    >
                      <span>{opt.text}</span>
                      <span className="w-6 h-6 border-2 border-black rounded-none group-hover:border-white bg-[#F4F4F1] group-hover:bg-black flex items-center justify-center shrink-0 ml-3">
                        <span className="w-2.5 h-2.5 bg-black group-hover:bg-white scale-0 group-hover:scale-100 transition-transform duration-100" />
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}

        {/* ── LOADING ── */}
        {step === 'loading' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black text-white flex flex-col items-center justify-center px-6"
          >
            <div className="max-w-[480px] w-full text-center">
              <div className="border-4 border-white bg-black p-6 mb-6 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)]">
                <div className="text-6xl mb-6 animate-pulse">🔮</div>
                <h2 className="text-xl md:text-2xl font-black tracking-widest uppercase mb-3 animate-pulse">
                  {loadingPhase}
                </h2>
                <p className="text-xs font-mono text-gray-400 uppercase tracking-widest mb-6">
                  Running emotional algorithms...
                </p>
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
            </div>
          </motion.div>
        )}

        {/* ── VERDICT ── */}
        {step === 'verdict' && (
          <motion.div
            key="verdict"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <span className="bg-black text-white px-3 py-1 text-xs font-black uppercase tracking-wider inline-block mb-3">
              THE VERDICT
            </span>

            <div
              className="border-4 border-black p-6 mb-6 text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              style={{ backgroundColor: verdict.color }}
            >
              <h2 className={`text-3xl md:text-4xl font-black uppercase tracking-tight leading-none ${verdict.dark ? 'text-white' : 'text-black'}`}>
                {verdict.verdict}
              </h2>
            </div>

            <p className="text-lg font-bold text-black mb-6 leading-snug">{verdict.sub}</p>

            <hr className="border-2 border-black border-dashed mb-6" />

            {/* Text suggestions */}
            {quiz.textSuggestions && quiz.textSuggestions.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-black uppercase text-gray-500 tracking-wider mb-3 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 stroke-[3px]" />
                  {quiz.textSuggestions.length} TEXT TEMPLATES:
                </h4>
                <div className="space-y-3">
                  {quiz.textSuggestions.map((text, idx) => (
                    <div
                      key={idx}
                      className="bg-[#F4F4F1] border-3 border-black p-4 font-mono text-sm font-extrabold text-black relative group"
                    >
                      <span className="absolute top-1 right-2 text-[9px] font-black uppercase text-gray-400">
                        Option {idx + 1}
                      </span>
                      <p className="pr-12">&ldquo;{text}&rdquo;</p>
                      <button
                        onClick={() => copy(text)}
                        className="absolute right-2 bottom-2 bg-black hover:bg-[#FFD93D] text-white hover:text-black font-black uppercase text-[10px] px-2 py-1 border-2 border-black transition-colors cursor-pointer"
                      >
                        COPY
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <button
                onClick={restart}
                className="bg-black hover:bg-gray-800 text-white font-black uppercase tracking-wider text-sm py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 stroke-[3px]" />
                TRY AGAIN
              </button>
              <button
                onClick={() => copy(`I got "${verdict.verdict}" on ${quiz.title} — shoulditext.co`)}
                className="bg-[#FFD93D] hover:bg-[#ffe066] text-black font-black uppercase tracking-wider text-sm py-4 px-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Share2 className="w-4 h-4 stroke-[3px]" />
                SHARE VERDICT
              </button>
            </div>

            {/* Back link */}
            <div className="mt-6 text-center">
              {onBack ? (
                <button
                  onClick={onBack}
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black hover:text-[#FF6B6B] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3 h-3 stroke-[3px]" />
                  Back to main quiz
                </button>
              ) : (
                <a
                  href="/"
                  className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-black hover:text-[#FF6B6B] transition-colors"
                >
                  <ChevronLeft className="w-3 h-3 stroke-[3px]" />
                  Back to main quiz
                </a>
              )}
            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </>
  )
}
