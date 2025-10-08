// /components/EmotionDiagnostic.js - Interactive emotion diagnostic quiz

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Square, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 1,
    question: "How would you describe your energy level right now?",
    type: "scale",
    options: [
      { value: "drained", label: "Completely drained", weight: { euphoria: 1 } },
      { value: "low", label: "Low energy", weight: { euphoria: 2 } },
      { value: "neutral", label: "Neutral/balanced", weight: { euphoria: 1, rage: 1 } },
      { value: "energized", label: "Energized", weight: { euphoria: 3, rage: 1 } },
      { value: "electric", label: "Electric/buzzing", weight: { euphoria: 3, rage: 2 } }
    ]
  },
  {
    id: 2,
    question: "What's your relationship with the future right now?",
    type: "multiple",
    options: [
      { value: "optimistic", label: "Excited about what's coming", weight: { euphoria: 3 } },
      { value: "uncertain", label: "Uncertain but curious", weight: { euphoria: 1, rage: 1 } },
      { value: "worried", label: "Worried about outcomes", weight: { rage: 2 } },
      { value: "present", label: "Focused on the present", weight: { euphoria: 2 } },
      { value: "avoidant", label: "Trying not to think about it", weight: { rage: 1 } }
    ]
  },
  {
    id: 3,
    question: "How do you feel about being around others right now?",
    type: "multiple",
    options: [
      { value: "craving", label: "Craving connection and energy", weight: { euphoria: 3 } },
      { value: "selective", label: "Want to be with specific people", weight: { euphoria: 2 } },
      { value: "neutral", label: "Comfortable either way", weight: { euphoria: 1, rage: 1 } },
      { value: "drained", label: "People feel draining", weight: { rage: 2 } },
      { value: "isolated", label: "Want to be completely alone", weight: { rage: 3 } }
    ]
  },
  {
    id: 4,
    question: "What kind of physical sensations are you experiencing?",
    type: "multiple",
    options: [
      { value: "lightness", label: "Lightness, like I could float", weight: { euphoria: 3 } },
      { value: "tension", label: "Tension in chest/shoulders", weight: { rage: 2 } },
      { value: "heaviness", label: "Heaviness, hard to move", weight: { rage: 1 } },
      { value: "restless", label: "Restless, need to move", weight: { euphoria: 2, rage: 2 } },
      { value: "grounded", label: "Grounded and stable", weight: { euphoria: 2 } }
    ]
  },
  {
    id: 5,
    question: "If your current state was a color, what would it be?",
    type: "visual",
    options: [
      { value: "gold", label: "Bright gold/yellow", color: "#FFD700", weight: { euphoria: 3 } },
      { value: "blue", label: "Deep blue", color: "#1E40AF", weight: { euphoria: 1 } },
      { value: "red", label: "Intense red", color: "#DC2626", weight: { rage: 3 } },
      { value: "green", label: "Soft green", color: "#059669", weight: { euphoria: 2 } },
      { value: "purple", label: "Rich purple", color: "#7C3AED", weight: { euphoria: 2 } },
      { value: "gray", label: "Muted gray", color: "#6B7280", weight: { rage: 1 } }
    ]
  }
];

const EMOTION_RESULTS = {
  euphoria: {
    name: "Euphoria",
    id: "euphoria",
    description: "You're radiating electric energy. Perfect for bold streetwear that matches your elevated state.",
    available: true,
    products: [
      { name: "Euphoria Oversized Hoodie", price: "$180", size: "XS-XL" },
      { name: "Electric Energy Tee", price: "$85", size: "XS-XL" },
      { name: "Golden Hour Dad Cap", price: "$65", size: "ONE SIZE" }
    ],
    shopifyHandle: "euphoria",
    colors: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" }
  },
  rage: {
    name: "Rage",
    id: "rage",
    description: "Channel that intense energy into statement pieces. Raw power deserves authentic expression.",
    available: true,
    products: [
      { name: "Rage Against Oversized Tee", price: "$90", size: "XS-XL" },
      { name: "Fury Track Pants", price: "$160", size: "XS-XL" },
      { name: "Anger Management Beanie", price: "$55", size: "ONE SIZE" }
    ],
    shopifyHandle: "rage",
    colors: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" }
  },
  melancholy: {
    name: "Melancholy",
    id: "melancholy",
    description: "You're in a reflective mood. Honor this contemplative state with thoughtful pieces.",
    available: false,
    launchDate: "Spring 2025",
    preorderAvailable: true,
    colors: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" }
  },
  anxiety: {
    name: "Anxiety",
    id: "anxiety",
    description: "Racing thoughts need grounding pieces. Find comfort in premium streetwear basics.",
    available: false,
    launchDate: "Summer 2025",
    preorderAvailable: false,
    colors: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" }
  }
};

export default function EmotionDiagnostic({ isOpen, onClose, source = 'navbar' }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Reset quiz when opened
  useEffect(() => {
    if (isOpen) {
      setCurrentQuestion(0);
      setAnswers({});
      setResult(null);
      setShowResult(false);
      setIsCalculating(false);
    }
  }, [isOpen]);

  // Analytics tracking
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'diagnostic_opened', {
        source: source,
        page_location: window.location.href
      });
    }
  }, [isOpen, source]);

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    
    if (currentQuestion < DIAGNOSTIC_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers) => {
    setIsCalculating(true);
    
    // Simulate processing time for better UX
    setTimeout(() => {
      const emotionScores = {};
      
      // Calculate weighted scores
      Object.entries(allAnswers).forEach(([questionId, answer]) => {
        const question = DIAGNOSTIC_QUESTIONS.find(q => q.id === parseInt(questionId));
        const option = question.options.find(opt => opt.value === answer);
        
        if (option && option.weight) {
          Object.entries(option.weight).forEach(([emotion, weight]) => {
            emotionScores[emotion] = (emotionScores[emotion] || 0) + weight;
          });
        }
      });
      
      // Find dominant emotion - prioritize our two main collections
      const availableEmotions = ['euphoria', 'rage'];
      let dominantEmotion = 'euphoria'; // default

      // Check if any of our available emotions scored
      const availableScores = availableEmotions.map(emotion => ({
        emotion,
        score: emotionScores[emotion] || 0
      })).sort((a, b) => b.score - a.score);

      if (availableScores[0].score > 0) {
        dominantEmotion = availableScores[0].emotion;
      }
      
      setResult(EMOTION_RESULTS[dominantEmotion] || EMOTION_RESULTS.euphoria);
      setIsCalculating(false);
      setShowResult(true);
      
      // Analytics
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'diagnostic_completed', {
          result: dominantEmotion,
          source: source,
          answers: Object.keys(allAnswers).length
        });
      }
    }, 2000);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setResult(null);
    setShowResult(false);
    setIsCalculating(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(10, 10, 15, 0.98)' }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="w-full max-w-3xl bg-white border border-zinc-300 relative overflow-hidden shadow-2xl"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="border-b border-zinc-300 px-8 lg:px-12 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-light text-zinc-900 tracking-[0.3em] uppercase mb-2">
              Emotion_Diagnostic
            </h2>
            <p className="text-[9px] text-zinc-700 tracking-[0.2em] uppercase font-light">
              Collection_Matching_System
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-700 hover:text-zinc-900 transition-colors p-2 border border-zinc-300 hover:border-zinc-500"
            data-cursor="CLOSE"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-8 lg:px-12 py-8 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          <AnimatePresence mode="wait">
            {/* Loading State */}
            {isCalculating && (
              <motion.div
                key="calculating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 border border-zinc-300 border-t-zinc-900 mx-auto mb-8"
                />
                <h3 className="text-xs font-light text-zinc-900 mb-3 uppercase tracking-[0.3em]">
                  Processing_Selection
                </h3>
                <p className="text-[10px] text-zinc-700 tracking-[0.2em] uppercase font-light">
                  Analyzing_Emotional_State
                </p>
              </motion.div>
            )}

            {/* Result State */}
            {showResult && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-xl mx-auto"
              >
                <div className="text-center mb-12">
                  <div className="inline-flex items-center gap-2 px-6 py-2 border border-zinc-300 mb-8">
                    <CheckCircle className="w-3 h-3 text-zinc-900" />
                    <span className="text-[9px] text-zinc-700 tracking-[0.3em] uppercase font-light">
                      Collection_Matched
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-light text-zinc-900 mb-6 tracking-tight">
                    {result.name}
                  </h3>

                  <p className="text-sm text-zinc-700 leading-relaxed font-light tracking-wide">
                    {result.description}
                  </p>
                </div>

                {result.available ? (
                  <div className="space-y-6">
                    <div className="text-[9px] text-zinc-700 tracking-[0.3em] uppercase text-center">
                      Available_Now
                    </div>
                    <div className="space-y-3">
                      {result.products?.map((product, index) => (
                        <div key={index} className="border border-zinc-300 p-6">
                          <div className="flex justify-between items-start mb-2">
                            <div className="text-xs text-zinc-900 font-light tracking-wide uppercase">
                              {product.name}
                            </div>
                            <div className="text-xs text-zinc-900 font-light">
                              {product.price}
                            </div>
                          </div>
                          <div className="text-[10px] text-zinc-700 uppercase tracking-wider">
                            {product.size}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4 pt-4">
                      <Link
                        href={`/collections/${result.shopifyHandle || result.id}`}
                        className="flex-1 py-4 px-6 bg-zinc-900 text-white hover:bg-zinc-200 transition-all text-[10px] uppercase tracking-[0.2em] font-light text-center"
                        onClick={onClose}
                        data-cursor="SHOP"
                      >
                        Shop_{result.name}
                      </Link>
                      <button
                        onClick={restartQuiz}
                        className="px-6 py-4 border border-zinc-300 text-zinc-700 hover:border-zinc-500 hover:text-zinc-900 transition-all text-[10px] uppercase tracking-[0.2em] font-light"
                        data-cursor="RESTART"
                      >
                        Retake
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="border border-zinc-300 p-6 text-center">
                      <p className="text-[9px] text-zinc-700 tracking-[0.3em] uppercase mb-3">
                        Collection_Status: In_Development
                      </p>
                      <p className="text-xs text-zinc-700 font-light tracking-wide">
                        {result.name} collection launches {result.launchDate}
                      </p>
                    </div>

                    <div className="flex gap-4">
                      {result.preorderAvailable ? (
                        <Link
                          href={`/collections/${result.id}`}
                          className="flex-1 py-4 px-6 bg-zinc-900 text-white hover:bg-zinc-200 transition-all text-[10px] uppercase tracking-[0.2em] font-light text-center"
                          onClick={onClose}
                          data-cursor="PREORDER"
                        >
                          Preorder_Now
                        </Link>
                      ) : (
                        <Link
                          href="/collections/euphoria"
                          className="flex-1 py-4 px-6 bg-zinc-900 text-white hover:bg-zinc-200 transition-all text-[10px] uppercase tracking-[0.2em] font-light text-center"
                          onClick={onClose}
                          data-cursor="SHOP"
                        >
                          Shop_Available
                        </Link>
                      )}
                      <button
                        onClick={restartQuiz}
                        className="px-6 py-4 border border-zinc-300 text-zinc-700 hover:border-zinc-500 hover:text-zinc-900 transition-all text-[10px] uppercase tracking-[0.2em] font-light"
                        data-cursor="RESTART"
                      >
                        Retake
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Question State */}
            {!isCalculating && !showResult && (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-2xl mx-auto"
              >
                {/* Progress */}
                <div className="mb-12">
                  <div className="flex items-center justify-between text-[9px] text-zinc-700 tracking-[0.3em] uppercase mb-4">
                    <span>Question_{(currentQuestion + 1).toString().padStart(2, '0')}</span>
                    <span>{Math.round(((currentQuestion + 1) / DIAGNOSTIC_QUESTIONS.length) * 100)}%_Complete</span>
                  </div>
                  <div className="w-full bg-white/50 h-px">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-xl lg:text-2xl font-light text-zinc-900 mb-12 leading-relaxed tracking-tight">
                  {DIAGNOSTIC_QUESTIONS[currentQuestion]?.question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {DIAGNOSTIC_QUESTIONS[currentQuestion]?.options.map((option, index) => (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleAnswer(DIAGNOSTIC_QUESTIONS[currentQuestion].id, option.value)}
                      className="w-full text-left p-5 border border-zinc-300 hover:border-zinc-500 transition-all group"
                      data-cursor="SELECT"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {option.color && (
                            <div
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ backgroundColor: option.color }}
                            />
                          )}
                          <span className="text-sm text-zinc-700 group-hover:text-zinc-900 transition-colors font-light tracking-wide">
                            {option.label}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-600 group-hover:text-zinc-900 transition-colors flex-shrink-0" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Back Button */}
                {currentQuestion > 0 && (
                  <button
                    onClick={goBack}
                    className="mt-8 flex items-center gap-2 text-zinc-700 hover:text-zinc-900 transition-colors border border-zinc-300 hover:border-zinc-500 py-3 px-5 text-[10px] uppercase tracking-[0.2em] font-light"
                    data-cursor="BACK"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    Previous
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}