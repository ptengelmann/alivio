// Alívio Emotional Contraband Database

export const EMOTION_SYSTEM = {
  euphoria: {
    id: 'euphoria',
    name: 'Euphoria',
    tagline: 'CONTROLLED_SUBSTANCE_CLASS_A',
    description: 'Peak emotional state. Highly regulated. Extreme potency documented in laboratory conditions.',
    colors: {
      primary: '#6366f1', // indigo-500 - more muted
      accent: '#818cf8', // indigo-400
      background: '#0f0f23', // very dark indigo
      text: 'text-indigo-400',
      bg: 'bg-indigo-500/5',
      border: 'border-indigo-500/30',
      gradient: 'from-indigo-400 to-violet-500'
    },
    contraband: {
      classification: 'SCHEDULE_I',
      purity: '99.7%',
      batchNumber: 'EUP-001-2024',
      halfLife: '4-6 hours',
      sideEffects: ['Heightened awareness', 'Temporary invincibility complex', 'Infectious optimism'],
      antidote: 'melancholy'
    },
    manifesto: [
      "Peak states are contraband.",
      "This batch tested at 99.7% purity.",
      "Wear responsibly. Effects may last."
    ],
    intensity: 97.3,
    frequency: '432Hz',
    pattern: 'GAMMA_BURST',
    storyChapters: [
      {
        title: "SYNTHESIS",
        content: "First isolated in laboratory conditions March 2024. Subject reported complete temporal dissociation and heightened sensory input. Crystalline structure formed at precisely 11:47 PM."
      },
      {
        title: "DISTRIBUTION",
        content: "Underground networks formed overnight. Demand exceeded supply by 400%. Street names: 'Lightning', 'Peak', 'Gold Standard'. Authorities issued warnings."
      },
      {
        title: "DOCUMENTATION",
        content: "Each dose authenticated with QR codes. Molecular signatures verified. Chain of custody maintained. This is pharmaceutical-grade emotional contraband."
      }
    ],
    shopifyTags: ['euphoria', 'class-a', 'peak-state', 'controlled'],
    volumes: {
      'vol-1': {
        title: 'Initial synthesis complete',
        subtitle: 'LABORATORY_GRADE_SAMPLE',
        batchCode: 'EUP-001-2024-V1',
        timestamp: 'MAR.10.2024_23:47:00Z',
        status: 'available',
        units: 500,
        story: {
          title: 'THE_DISCOVERY',
          description: 'First documented synthesis of pure euphoric compounds under controlled laboratory conditions.',
          chapters: [
            {
              id: 'breakthrough',
              title: 'BREAKTHROUGH_PROTOCOL',
              content: 'Scientists achieved 99.7% purity in euphoric compound extraction. Subject exhibited complete temporal dissociation and heightened sensory input.'
            }
          ]
        },
        products: ['euphoria-tee-vol-1', 'euphoria-cap-vol-1', 'euphoria-trouser-vol-1', 'euphoria-tee-vol-1-surge']
      },
      'vol-2': {
        title: 'Mass production initiated',
        subtitle: 'STREET_DISTRIBUTION_READY',
        batchCode: 'EUP-002-2024-V2',
        timestamp: 'APR.20.2024_15:30:00Z',
        status: 'coming-soon',
        units: 1000,
        story: {
          title: 'DISTRIBUTION_PROTOCOL',
          description: 'Underground networks established. Mass production protocols approved for civilian distribution.',
          chapters: [
            {
              id: 'deployment',
              title: 'STREET_DEPLOYMENT',
              content: 'Distribution networks activated across major urban centers. Each unit tagged for tracking and authentication.'
            }
          ]
        },
        products: ['euphoria-bomber-vol-2', 'euphoria-cargo-vol-2']
      }
    }
  },

  anxiety: {
    id: 'anxiety',
    name: 'Anxiety',
    tagline: 'INDUSTRIAL_GRADE_STIMULANT',
    description: 'Hypervigilance compound. Consciousness accelerant. Handle with caution.',
    colors: {
      primary: '#f59e0b', // amber-500
      accent: '#fbbf24', // amber-400
      background: '#1f1500', // very dark amber
      text: 'text-amber-400',
      bg: 'bg-amber-500/5',
      border: 'border-amber-500/30',
      gradient: 'from-amber-400 to-orange-500'
    },
    contraband: {
      classification: 'SCHEDULE_II',
      purity: '94.2%',
      batchNumber: 'ANX-002-2024',
      halfLife: '12-72 hours',
      sideEffects: ['Heightened alertness', 'Rapid cognition', 'Time dilation'],
      antidote: 'serenity'
    },
    manifesto: [
      "Hypervigilance is power.",
      "Industrial strength awareness.",
      "Side effects include clarity."
    ],
    intensity: 89.4,
    frequency: '528Hz',
    pattern: 'RAPID_OSCILLATION',
    volumes: {
      'vol-1': {
        title: 'Mass production initiated',
        subtitle: 'INDUSTRIAL_BATCH_001',
        batchCode: 'ANX-002-2024-V1',
        timestamp: 'APR.15.2024_14:23:00Z',
        status: 'available',
        units: 750
      }
    }
  },

  melancholy: {
    id: 'melancholy',
    name: 'Melancholy',
    tagline: 'THERAPEUTIC_GRADE_DEPRESSANT',
    description: 'Introspective compound. Depth enhancer. Prescribed for emotional range expansion.',
    colors: {
      primary: '#64748b', // slate-500
      accent: '#94a3b8', // slate-400
      background: '#0f1419', // very dark slate
      text: 'text-slate-400',
      bg: 'bg-slate-500/5',
      border: 'border-slate-500/30',
      gradient: 'from-slate-400 to-gray-500'
    },
    contraband: {
      classification: 'SCHEDULE_III',
      purity: '87.6%',
      batchNumber: 'MEL-003-2024',
      halfLife: '6-24 hours',
      sideEffects: ['Enhanced empathy', 'Temporal slowing', 'Artistic insights'],
      antidote: 'euphoria'
    },
    manifesto: [
      "Sadness is sacred contraband.",
      "Depth requires darkness.",
      "Beauty lives in the undertow."
    ],
    intensity: 23.7,
    frequency: '174Hz',
    pattern: 'DEEP_RESONANCE',
    volumes: {
      'vol-1': {
        title: 'Therapeutic trials approved',
        subtitle: 'MEDICAL_GRADE_SAMPLE',
        batchCode: 'MEL-003-2024-V1',
        timestamp: 'MAY.01.2024_09:15:00Z',
        status: 'available',
        units: 300
      }
    }
  },

  rage: {
    id: 'rage',
    name: 'Rage',
    tagline: 'WEAPONS_GRADE_CATALYST',
    description: 'High-energy destructor compound. Extreme potency. Restricted distribution.',
    colors: {
      primary: '#dc2626', // red-600
      accent: '#ef4444', // red-500
      background: '#1a0000', // very dark red
      text: 'text-red-400',
      bg: 'bg-red-500/5',
      border: 'border-red-500/30',
      gradient: 'from-red-500 to-orange-600'
    },
    contraband: {
      classification: 'SCHEDULE_I',
      purity: '96.8%',
      batchNumber: 'RAG-004-2024',
      halfLife: '2-8 hours',
      sideEffects: ['Explosive energy', 'Boundary dissolution', 'Righteous clarity'],
      antidote: 'serenity'
    },
    manifesto: [
      "Anger is rocket fuel.",
      "Weapons-grade intensity.",
      "Channel responsibly."
    ],
    intensity: 98.9,
    frequency: '741Hz',
    pattern: 'SPIKE_WAVE',
    volumes: {
      'vol-1': {
        title: 'Weapons testing complete',
        subtitle: 'MAXIMUM_POTENCY_ACHIEVED',
        batchCode: 'RAG-004-2024-V1',
        timestamp: 'JUN.12.2024_16:45:00Z',
        status: 'available',
        units: 150,
        story: {
          title: 'WEAPONS_DEVELOPMENT',
          description: 'Combat-grade emotional weaponization. Extreme stress testing protocols completed.',
          chapters: [
            {
              id: 'testing',
              title: 'STRESS_TESTING',
              content: 'Compound tested under extreme conditions. Subjects exhibited explosive energy release and complete boundary dissolution. Weapons-grade classification confirmed.'
            }
          ]
        },
        products: ['rage-tee-vol-1', 'rage-cap-vol-1', 'rage-trouser-vol-1']
      },
      'vol-2': {
        title: 'Combat deployment ready',
        subtitle: 'FIELD_OPERATIONS_APPROVED',
        batchCode: 'RAG-005-2024-V2',
        timestamp: 'JUL.30.2024_20:15:00Z',
        status: 'coming-soon',
        units: 200,
        story: {
          title: 'COMBAT_DEPLOYMENT',
          description: 'Field operatives equipped with full arsenal. Urban deployment protocols activated.',
          chapters: [
            {
              id: 'deployment',
              title: 'FIELD_DEPLOYMENT',
              content: 'Operatives deployed across metropolitan areas. Each unit contains concentrated kinetic energy compounds rated for maximum impact scenarios.'
            }
          ]
        },
        products: ['rage-tactical-vest-vol-2', 'rage-combat-pants-vol-2']
      }
    }
  },

  serenity: {
    id: 'serenity',
    name: 'Serenity',
    tagline: 'PHARMACEUTICAL_GRADE_STABILIZER',
    description: 'Neural stabilizer. Anxiety countermeasure. Prescription only.',
    colors: {
      primary: '#059669', // emerald-600
      accent: '#10b981', // emerald-500
      background: '#001a0f', // very dark emerald
      text: 'text-emerald-400',
      bg: 'bg-emerald-500/5',
      border: 'border-emerald-500/30',
      gradient: 'from-emerald-400 to-teal-500'
    },
    contraband: {
      classification: 'SCHEDULE_IV',
      purity: '91.3%',
      batchNumber: 'SER-005-2024',
      halfLife: '8-16 hours',
      sideEffects: ['Complete calm', 'Temporal stability', 'Enhanced perspective'],
      antidote: 'anxiety'
    },
    manifesto: [
      "Peace is revolutionary.",
      "Calm in chaos.",
      "Stability is strength."
    ],
    intensity: 12.4,
    frequency: '396Hz',
    pattern: 'STEADY_STATE',
    volumes: {
      'vol-1': {
        title: 'Medical trials approved',
        subtitle: 'PRESCRIPTION_READY',
        batchCode: 'SER-005-2024-V1',
        timestamp: 'JUL.08.2024_11:30:00Z',
        status: 'available',
        units: 600
      }
    }
  },

  nostalgia: {
    id: 'nostalgia',
    name: 'Nostalgia',
    tagline: 'TEMPORAL_DISPLACEMENT_AGENT',
    description: 'Memory enhancer. Time-travel compound. Handle with care.',
    colors: {
      primary: '#7c3aed', // violet-600
      accent: '#8b5cf6', // violet-500
      background: '#1a0d2e', // very dark violet
      text: 'text-violet-400',
      bg: 'bg-violet-500/5',
      border: 'border-violet-500/30',
      gradient: 'from-violet-400 to-purple-500'
    },
    contraband: {
      classification: 'SCHEDULE_III',
      purity: '88.9%',
      batchNumber: 'NOS-006-2024',
      halfLife: '4-12 hours',
      sideEffects: ['Temporal displacement', 'Memory enhancement', 'Emotional archaeology'],
      antidote: 'presence'
    },
    manifesto: [
      "The past is contraband.",
      "Memory is a controlled substance.",
      "Time travel through feeling."
    ],
    intensity: 45.2,
    frequency: '285Hz',
    pattern: 'WAVE_INTERFERENCE',
    volumes: {
      'vol-1': {
        title: 'Time trials completed',
        subtitle: 'TEMPORAL_DISPLACEMENT_VERIFIED',
        batchCode: 'NOS-006-2024-V1',
        timestamp: 'AUG.20.2024_19:22:00Z',
        status: 'available',
        units: 400
      }
    }
  },

  transcendence: {
    id: 'transcendence',
    name: 'Transcendence',
    tagline: 'EXPERIMENTAL_CONSCIOUSNESS_EXPANDER',
    description: 'Prototype compound. Consciousness elevator. Experimental use only.',
    colors: {
      primary: '#fbbf24', // amber-400 but different shade
      accent: '#f3f4f6', // gray-100 - almost white
      background: '#1f1611', // very dark amber/gold
      text: 'text-amber-200',
      bg: 'bg-amber-500/5',
      border: 'border-amber-500/30',
      gradient: 'from-amber-200 to-yellow-300'
    },
    contraband: {
      classification: 'EXPERIMENTAL',
      purity: '???.?%',
      batchNumber: 'TRA-007-2024',
      halfLife: 'Unknown',
      sideEffects: ['Reality expansion', 'Ego dissolution', 'Universal connection'],
      antidote: 'Unknown'
    },
    manifesto: [
      "Consciousness is the final frontier.",
      "Experimental batch. Use caution.",
      "Transcendence through chemistry."
    ],
    intensity: 'UNMEASURABLE',
    frequency: '963Hz',
    pattern: 'QUANTUM_ENTANGLEMENT',
    volumes: {
      'vol-1': {
        title: 'Prototype synthesis',
        subtitle: 'EXPERIMENTAL_PHASE_I',
        batchCode: 'TRA-007-2024-V1',
        timestamp: 'SEP.30.2024_03:33:00Z',
        status: 'experimental',
        units: 50
      }
    }
  }
};

// Helper functions for the system
export const getEmotion = (emotionId) => {
  return EMOTION_SYSTEM[emotionId] || null;
};

export const getEmotionByHandle = (handle) => {
  // Handle formats: 'euphoria', 'euphoria-vol-1'
  const emotionId = handle.split('-')[0].toLowerCase(); // Ensure lowercase
  return getEmotion(emotionId);
};

export const getVolumeFromHandle = (handle) => {
  // Extract volume info from handle like 'euphoria-vol-1'
  const parts = handle.split('-');
  if (parts.length >= 3 && parts[1] === 'vol') {
    const emotionId = parts[0].toLowerCase(); // Ensure lowercase
    const volumeId = `vol-${parts[2]}`;
    const emotion = getEmotion(emotionId);
    return emotion?.volumes?.[volumeId] || null;
  }
  return null;
};

export const isVolumeCollection = (handle) => {
  return handle.includes('-vol-');
};

export const isMainCollection = (handle) => {
  const emotionId = handle.toLowerCase();
  return EMOTION_SYSTEM.hasOwnProperty(emotionId) && !handle.includes('-vol-');
};

export const getAllEmotions = () => {
  // Only return the two main collections for now
  return [EMOTION_SYSTEM.euphoria, EMOTION_SYSTEM.rage];
};

export const getEmotionColors = (emotionId) => {
  const emotion = getEmotion(emotionId);
  return emotion?.colors || {
    primary: '#6b7280',
    text: 'text-gray-400',
    bg: 'bg-gray-500/10',
    border: 'border-gray-500',
    gradient: 'from-gray-400 to-gray-600'
  };
};