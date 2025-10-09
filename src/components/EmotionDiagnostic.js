// /components/EmotionDiagnostic.js - Interactive emotion diagnostic quiz

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, ArrowLeft, Square, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import client from '../lib/shopify';

const DIAGNOSTIC_QUESTIONS = [
  {
    id: 1,
    question: "How would you describe your energy level right now?",
    type: "scale",
    options: [
      { value: "drained", label: "Completely drained", weight: { melancholy: 3, serenity: 2 } },
      { value: "low", label: "Low energy", weight: { melancholy: 2, nostalgia: 1 } },
      { value: "neutral", label: "Neutral/balanced", weight: { serenity: 3, euphoria: 1, rage: 1 } },
      { value: "energized", label: "Energized", weight: { euphoria: 3, anxiety: 2 } },
      { value: "electric", label: "Electric/buzzing", weight: { euphoria: 3, rage: 2, transcendence: 2 } }
    ]
  },
  {
    id: 2,
    question: "What's your relationship with the future right now?",
    type: "multiple",
    options: [
      { value: "optimistic", label: "Excited about what's coming", weight: { euphoria: 3, transcendence: 1 } },
      { value: "uncertain", label: "Uncertain but curious", weight: { anxiety: 3, nostalgia: 1 } },
      { value: "worried", label: "Worried about outcomes", weight: { anxiety: 3, rage: 2 } },
      { value: "present", label: "Focused on the present", weight: { serenity: 3, euphoria: 1 } },
      { value: "avoidant", label: "Trying not to think about it", weight: { melancholy: 2, rage: 1 } }
    ]
  },
  {
    id: 3,
    question: "How do you feel about being around others right now?",
    type: "multiple",
    options: [
      { value: "craving", label: "Craving connection and energy", weight: { euphoria: 3, anxiety: 1 } },
      { value: "selective", label: "Want to be with specific people", weight: { nostalgia: 2, serenity: 1 } },
      { value: "neutral", label: "Comfortable either way", weight: { serenity: 3 } },
      { value: "drained", label: "People feel draining", weight: { melancholy: 2, anxiety: 2 } },
      { value: "isolated", label: "Want to be completely alone", weight: { melancholy: 3, rage: 2 } }
    ]
  },
  {
    id: 4,
    question: "What kind of physical sensations are you experiencing?",
    type: "multiple",
    options: [
      { value: "lightness", label: "Lightness, like I could float", weight: { euphoria: 3, transcendence: 2 } },
      { value: "tension", label: "Tension in chest/shoulders", weight: { anxiety: 3, rage: 2 } },
      { value: "heaviness", label: "Heaviness, hard to move", weight: { melancholy: 3 } },
      { value: "restless", label: "Restless, need to move", weight: { anxiety: 2, rage: 2 } },
      { value: "grounded", label: "Grounded and stable", weight: { serenity: 3, nostalgia: 1 } }
    ]
  },
  {
    id: 5,
    question: "If your current state was a color, what would it be?",
    type: "visual",
    options: [
      { value: "gold", label: "Bright gold/yellow", color: "#FFD700", weight: { euphoria: 3, transcendence: 2 } },
      { value: "blue", label: "Deep blue", color: "#1E40AF", weight: { melancholy: 3, serenity: 1 } },
      { value: "red", label: "Intense red", color: "#DC2626", weight: { rage: 3 } },
      { value: "green", label: "Soft green", color: "#059669", weight: { serenity: 3 } },
      { value: "purple", label: "Rich purple", color: "#7C3AED", weight: { nostalgia: 3, transcendence: 1 } },
      { value: "orange", label: "Bright orange", color: "#f59e0b", weight: { anxiety: 3, rage: 1 } }
    ]
  }
];

const EMOTION_RESULTS = {
  euphoria: {
    name: "Euphoria",
    id: "euphoria",
    description: "You're radiating electric energy. Perfect for bold streetwear that matches your elevated state.",
    available: true,
    shopifyHandle: "euphoria",
    colors: { bg: "bg-indigo-500/20", text: "text-indigo-400", border: "border-indigo-500/30" }
  },
  rage: {
    name: "Rage",
    id: "rage",
    description: "Channel that intense energy into statement pieces. Raw power deserves authentic expression.",
    available: true,
    shopifyHandle: "rage",
    colors: { bg: "bg-red-500/20", text: "text-red-400", border: "border-red-500/30" }
  },
  anxiety: {
    name: "Anxiety",
    id: "anxiety",
    description: "Racing thoughts need grounding pieces. Find comfort in premium streetwear basics.",
    available: true,
    shopifyHandle: "anxiety",
    colors: { bg: "bg-amber-500/20", text: "text-amber-400", border: "border-amber-500/30" }
  },
  melancholy: {
    name: "Melancholy",
    id: "melancholy",
    description: "You're in a reflective mood. Honor this contemplative state with thoughtful pieces.",
    available: true,
    shopifyHandle: "melancholy",
    colors: { bg: "bg-slate-500/20", text: "text-slate-400", border: "border-slate-500/30" }
  },
  serenity: {
    name: "Serenity",
    id: "serenity",
    description: "You're in perfect balance. Embrace this calm with pieces that honor stability.",
    available: true,
    shopifyHandle: "serenity",
    colors: { bg: "bg-emerald-500/20", text: "text-emerald-400", border: "border-emerald-500/30" }
  },
  nostalgia: {
    name: "Nostalgia",
    id: "nostalgia",
    description: "You're dwelling in memories. Honor the past with pieces that carry stories.",
    available: true,
    shopifyHandle: "nostalgia",
    colors: { bg: "bg-violet-500/20", text: "text-violet-400", border: "border-violet-500/30" }
  },
  transcendence: {
    name: "Transcendence",
    id: "transcendence",
    description: "You're reaching beyond. Experimental pieces for experimental states.",
    available: true,
    shopifyHandle: "transcendence",
    colors: { bg: "bg-amber-500/20", text: "text-amber-200", border: "border-amber-500/30" }
  }
};

export default function EmotionDiagnostic({ isOpen, onClose, source = 'navbar' }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [products, setProducts] = useState([]);

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

  const fetchProductsForEmotion = async (emotionHandle) => {
    if (!client) {
      console.log('Shopify client not available');
      return [];
    }

    try {
      const query = `
        query getCollectionProducts($handle: String!) {
          collection(handle: $handle) {
            products(first: 3) {
              edges {
                node {
                  id
                  title
                  handle
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  variants(first: 1) {
                    edges {
                      node {
                        availableForSale
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const response = await client.request(query, {
        variables: { handle: emotionHandle }
      });

      if (response?.data?.collection?.products?.edges) {
        return response.data.collection.products.edges.map(({ node }) => ({
          id: node.id,
          title: node.title,
          handle: node.handle,
          price: `$${parseFloat(node.priceRange.minVariantPrice.amount).toFixed(0)}`,
          available: node.variants.edges[0]?.node?.availableForSale || false
        }));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }

    return [];
  };

  const calculateResult = async (allAnswers) => {
    setIsCalculating(true);

    // Simulate processing time for better UX
    setTimeout(async () => {
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

      // Find dominant emotion from ALL emotions
      const allEmotionScores = Object.entries(emotionScores)
        .map(([emotion, score]) => ({ emotion, score }))
        .sort((a, b) => b.score - a.score);

      let dominantEmotion = allEmotionScores[0]?.emotion || 'euphoria';

      const emotionResult = EMOTION_RESULTS[dominantEmotion] || EMOTION_RESULTS.euphoria;

      // Fetch products from Shopify
      const emotionProducts = await fetchProductsForEmotion(emotionResult.shopifyHandle);
      setProducts(emotionProducts);

      setResult(emotionResult);
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
        className="w-full max-w-3xl bg-zinc-900 border border-zinc-700 relative overflow-hidden shadow-2xl"
        style={{ maxHeight: '90vh' }}
        data-diagnostic-modal="true"
      >
        {/* Header */}
        <div className="border-b border-zinc-700 px-8 lg:px-12 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-light text-white tracking-[0.3em] uppercase mb-2">
              Emotion_Diagnostic
            </h2>
            <p className="text-[9px] text-zinc-400 tracking-[0.2em] uppercase font-light">
              Collection_Matching_System
            </p>
          </div>

          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white transition-colors p-2 border border-zinc-700 hover:border-zinc-500"
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
                  className="w-12 h-12 border border-zinc-700 border-t-white mx-auto mb-8"
                />
                <h3 className="text-xs font-light text-white mb-3 uppercase tracking-[0.3em]">
                  Processing_Selection
                </h3>
                <p className="text-[10px] text-zinc-400 tracking-[0.2em] uppercase font-light">
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
                  <div className="inline-flex items-center gap-2 px-6 py-2 border border-zinc-700 mb-8">
                    <CheckCircle className="w-3 h-3 text-white" />
                    <span className="text-[9px] text-zinc-400 tracking-[0.3em] uppercase font-light">
                      Collection_Matched
                    </span>
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-light text-white mb-6 tracking-tight">
                    {result.name}
                  </h3>

                  <p className="text-sm text-zinc-300 leading-relaxed font-light tracking-wide">
                    {result.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="text-[9px] text-zinc-400 tracking-[0.3em] uppercase text-center">
                    Available_Now
                  </div>

                  {products.length > 0 ? (
                    <div className="space-y-3">
                      {products.map((product, index) => (
                        <Link
                          key={product.id || index}
                          href={`/products/${product.handle}`}
                          className="block border border-zinc-700 p-6 hover:border-zinc-500 transition-colors"
                          data-cursor="VIEW"
                        >
                          <div className="flex justify-between items-start">
                            <div className="text-xs text-white font-light tracking-wide uppercase">
                              {product.title}
                            </div>
                            <div className="text-xs text-white font-light">
                              {product.price}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="border border-zinc-700 p-6 text-center">
                      <p className="text-xs text-zinc-400 font-light tracking-wide">
                        No products available yet. Check back soon.
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <Link
                      href={`/collections/${result.shopifyHandle || result.id}`}
                      className="flex-1 py-4 px-6 bg-white text-zinc-900 hover:bg-zinc-200 transition-all text-[10px] uppercase tracking-[0.2em] font-light text-center"
                      onClick={onClose}
                      data-cursor="SHOP"
                    >
                      Shop_{result.name}
                    </Link>
                    <button
                      onClick={restartQuiz}
                      className="px-6 py-4 border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-white transition-all text-[10px] uppercase tracking-[0.2em] font-light"
                      data-cursor="RESTART"
                    >
                      Retake
                    </button>
                  </div>
                </div>
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
                  <div className="flex items-center justify-between text-[9px] text-zinc-400 tracking-[0.3em] uppercase mb-4">
                    <span>Question_{(currentQuestion + 1).toString().padStart(2, '0')}</span>
                    <span>{Math.round(((currentQuestion + 1) / DIAGNOSTIC_QUESTIONS.length) * 100)}%_Complete</span>
                  </div>
                  <div className="w-full bg-zinc-800 h-px">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestion + 1) / DIAGNOSTIC_QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-xl lg:text-2xl font-light text-white mb-12 leading-relaxed tracking-tight">
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
                      className="w-full text-left p-5 border border-zinc-700 hover:border-zinc-500 transition-all group"
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
                          <span className="text-sm text-zinc-300 group-hover:text-white transition-colors font-light tracking-wide">
                            {option.label}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors flex-shrink-0" />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Back Button */}
                {currentQuestion > 0 && (
                  <button
                    onClick={goBack}
                    className="mt-8 flex items-center gap-2 text-zinc-400 hover:text-white transition-colors border border-zinc-700 hover:border-zinc-500 py-3 px-5 text-[10px] uppercase tracking-[0.2em] font-light"
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