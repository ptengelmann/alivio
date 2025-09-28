// /components/EmotionDiagnostic.js - Interactive emotion diagnostic quiz

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Terminal, Square, CheckCircle } from 'lucide-react';
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
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl bg-black border border-zinc-900 relative overflow-hidden"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="border-b border-zinc-900 p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Square className="w-4 h-4 fill-current text-white" />
            <div>
              <h2 className="text-lg font-black font-mono text-white">
                COLLECTION_MATCHER
              </h2>
              <p className="text-xs text-zinc-400 font-mono">
                STREETWEAR_SELECTION_PROTOCOL
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-2 border border-zinc-800 hover:border-white"
            data-cursor="CLOSE"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto" style={{ maxHeight: 'calc(90vh - 140px)' }}>
          <AnimatePresence mode="wait">
            {/* Loading State */}
            {isCalculating && (
              <motion.div
                key="calculating"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-12"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-2 border-white border-t-transparent mx-auto mb-6"
                />
                <h3 className="text-xl font-bold font-mono text-white mb-2">
                  PROCESSING_SELECTION
                </h3>
                <p className="text-sm text-zinc-400 font-mono">
                  ANALYZING_PREFERENCES_AND_EMOTIONAL_STATE
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
                className="text-center"
              >
                <div className={`inline-flex items-center gap-2 px-4 py-2 ${result.colors.bg} ${result.colors.border} border mb-6`}>
                  <CheckCircle className={`w-4 h-4 ${result.colors.text}`} />
                  <span className={`font-mono text-sm ${result.colors.text}`}>
                    COLLECTION MATCHED
                  </span>
                </div>

                <h3 className={`text-3xl font-black font-mono mb-4 ${result.colors.text}`}>
                  {result.name.toUpperCase()}
                </h3>
                
                <p className="text-white/80 mb-8 leading-relaxed">
                  {result.description}
                </p>

                {result.available ? (
                  <div className="space-y-4">
                    <p className="text-sm font-mono text-white">
                      COLLECTION_STATUS: AVAILABLE
                    </p>
                    <div className="grid gap-3">
                      {result.products?.map((product, index) => (
                        <div key={index} className="p-3 border border-zinc-800 bg-zinc-950 text-left">
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-mono text-white">
                              {product.name}
                            </div>
                            <div className="flex gap-4 text-xs font-mono text-zinc-400">
                              <span>{product.price}</span>
                              <span>{product.size}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-3 pt-4">
                      <Link
                        href={`/collections/${result.shopifyHandle || result.id}`}
                        className={`flex-1 py-3 px-6 ${result.colors.bg} ${result.colors.border} border ${result.colors.text} hover:bg-white hover:text-black transition-all font-mono font-bold text-center`}
                        onClick={onClose}
                        data-cursor="SHOP"
                      >
                        SHOP_{result.name.toUpperCase()}
                      </Link>
                      <button
                        onClick={restartQuiz}
                        className="px-6 py-3 border border-zinc-800 text-white hover:border-white transition-colors font-mono"
                        data-cursor="RESTART"
                      >
                        RETAKE_QUIZ
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className={`p-4 ${result.colors.bg} ${result.colors.border} border`}>
                      <p className={`text-sm font-mono ${result.colors.text} mb-2`}>
                        COLLECTION_STATUS: IN_DEVELOPMENT
                      </p>
                      <p className="text-white/80 text-sm">
                        {result.name} collection launches {result.launchDate}
                      </p>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                      {result.preorderAvailable ? (
                        <Link
                          href={`/collections/${result.id}`}
                          className={`flex-1 py-3 px-6 ${result.colors.bg} ${result.colors.border} border ${result.colors.text} hover:opacity-80 transition-all font-mono font-bold text-center`}
                          onClick={onClose}
                          data-cursor="PREORDER"
                        >
                          PREORDER_NOW
                        </Link>
                      ) : (
                        <Link
                          href="/collections/euphoria"
                          className="flex-1 py-3 px-6 bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/30 transition-all font-mono font-bold text-center"
                          onClick={onClose}
                          data-cursor="SHOP"
                        >
                          SHOP_AVAILABLE
                        </Link>
                      )}
                      <button
                        onClick={restartQuiz}
                        className="px-6 py-3 border border-zinc-800 text-white hover:border-white transition-colors font-mono"
                        data-cursor="RESTART"
                      >
                        RETAKE_QUIZ
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
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span>QUESTION_{(currentQuestion + 1).toString().padStart(2, '0')}</span>
                    <span>{Math.round(((currentQuestion + 1) / DIAGNOSTIC_QUESTIONS.length) * 100)}%_COMPLETE</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-1">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-xl font-bold text-white mb-8 leading-relaxed">
                  {DIAGNOSTIC_QUESTIONS[currentQuestion]?.question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {DIAGNOSTIC_QUESTIONS[currentQuestion]?.options.map((option, index) => (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleAnswer(DIAGNOSTIC_QUESTIONS[currentQuestion].id, option.value)}
                      className="w-full text-left p-4 border border-zinc-800 hover:border-white hover:bg-zinc-950 transition-all group"
                      data-cursor="SELECT"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {option.color && (
                            <div 
                              className="w-4 h-4 rounded-full" 
                              style={{ backgroundColor: option.color }}
                            />
                          )}
                          <span className="text-white group-hover:text-white transition-colors font-mono">
                            {option.label}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-white transition-colors" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Back Button */}
                {currentQuestion > 0 && (
                  <button
                    onClick={goBack}
                    className="mt-6 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-mono border border-zinc-800 hover:border-white py-2 px-4"
                    data-cursor="BACK"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    PREVIOUS_QUESTION
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