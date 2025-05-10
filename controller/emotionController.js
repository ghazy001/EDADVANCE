const Emotion = require('../models/Emotion');

const calculateEngagementScore = (emotions) => {
  if (!emotions.length) return 0;

  const emotionWeights = {
    happiness: 1.0,
    neutral: 0.7,
    surprise: 0.8,
    sadness: 0.3,
    anger: 0.2,
    disgust: 0.2,
    fear: 0.2,
  };

  const totalScore = emotions.reduce((sum, { emotion, intensity }) => {
    const weight = emotionWeights[emotion] || 0.5;
    return sum + weight * (intensity / 100);
  }, 0);

  const averageScore = (totalScore / emotions.length) * 100;
  return Math.min(Math.round(averageScore), 100);
};

const detectEngagementDrop = (emotions) => {
  if (emotions.length < 3) return { detected: false };

  const negativeEmotions = ['sadness', 'anger', 'disgust', 'fear'];
  const recentEmotions = emotions.slice(-3).map(e => e.emotion);

  const isDrop = recentEmotions.every(emotion => negativeEmotions.includes(emotion));
  return {
    detected: isDrop,
    suggestion: isDrop ? 'Proposer une pause ou contenu interactif' : undefined
  };
};

exports.logEmotion = async (req, res) => {
  const { quizId, userId, emotion, intensity = 0, sessionId } = req.body;
  console.log("Received emotion data:", req.body);

  if (!quizId || !userId || !emotion || !sessionId) {
    return res.status(400).json({ status: 'ERROR', message: 'Missing required fields' });
  }

  const validEmotions = ['happiness', 'neutral', 'surprise', 'sadness', 'anger', 'disgust', 'fear'];
  if (!validEmotions.includes(emotion)) {
    return res.status(400).json({ status: 'ERROR', message: 'Invalid emotion' });
  }

  try {
    const emotionData = { quizId, userId, emotion, intensity, sessionId, timestamp: new Date() };
    const savedEmotion = await Emotion.create(emotionData);

    const emotions = await Emotion.find({ sessionId }).sort({ timestamp: 1 });
    const engagementScore = calculateEngagementScore(emotions);
    const engagementDrop = detectEngagementDrop(emotions);

    res.status(200).json({
      status: 'SUCCESS',
      data: {
        emotionLogged: savedEmotion,
        engagementScore,
        engagementDrop
      }
    });
  } catch (error) {
    console.error('Error logging emotion:', error);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
};

exports.getEmotionReport = async (req, res) => {
  const { sessionId } = req.params;

  try {
    const emotions = await Emotion.find({ sessionId }).sort({ timestamp: 1 });
    if (!emotions.length) {
      return res.status(404).json({ status: 'ERROR', message: 'No emotions found for this session' });
    }

    const engagementScore = calculateEngagementScore(emotions);

    const emotionCounts = emotions.reduce((acc, { emotion }) => {
      acc[emotion] = (acc[emotion] || 0) + 1;
      return acc;
    }, {});
    const dominantEmotion = Object.keys(emotionCounts).reduce((a, b) => 
      emotionCounts[a] > emotionCounts[b] ? a : b
    );

    const negativeEmotions = ['sadness', 'anger', 'disgust', 'fear'];
    const fatiguePeriods = [];
    let fatigueStart = null;
    for (let i = 0; i < emotions.length; i++) {
      if (negativeEmotions.includes(emotions[i].emotion)) {
        if (!fatigueStart) fatigueStart = emotions[i].timestamp;
      } else {
        if (fatigueStart) {
          const duration = (new Date(emotions[i].timestamp) - new Date(fatigueStart)) / (1000 * 60);
          if (duration >= 1) {
            fatiguePeriods.push({
              start: fatigueStart,
              end: emotions[i].timestamp,
              duration: Math.round(duration)
            });
          }
          fatigueStart = null;
        }
      }
    }
    if (fatigueStart) {
      const duration = (new Date() - new Date(fatigueStart)) / (1000 * 60);
      if (duration >= 1) {
        fatiguePeriods.push({
          start: fatigueStart,
          end: new Date(),
          duration: Math.round(duration)
        });
      }
    }

    const peakEngagement = emotions.reduce((max, curr) => {
      const emotionWeights = {
        happiness: 1.0,
        neutral: 0.7,
        surprise: 0.8,
        sadness: 0.3,
        anger: 0.2,
        disgust: 0.2,
        fear: 0.2,
      };
      const score = (emotionWeights[curr.emotion] || 0.5) * (curr.intensity / 100);
      return score > (max.score || 0) ? { timestamp: curr.timestamp, score } : max;
    }, {});

    const recommendations = [];
    if (fatiguePeriods.length > 0) {
      recommendations.push('Prendre une pause à mi-session ⏸️');
      recommendations.push('Intégrer des vidéos interactives 📼');
    }
    if (engagementScore < 50) {
      recommendations.push('Revoir le contenu du cours avec des exemples pratiques 📚');
    }

    recommendations.push('Prenez une pause pour recharger vos batteries et revenir plus fort ! 🪫');


    res.status(200).json({
      status: 'SUCCESS',
      data: {
        engagementScore,
        dominantEmotion,
        fatiguePeriods,
        peakEngagement,
        recommendations
      }
    });
  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ status: 'ERROR', message: 'Server error' });
  }
};