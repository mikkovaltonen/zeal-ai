import type { VercelRequest, VercelResponse } from '@vercel/node';
import { initializeApp, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
if (getApps().length === 0) {
  initializeApp({
    projectId: process.env.VITE_FIREBASE_PROJECT_ID,
  });
}

const db = getFirestore();

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId, messageId, feedback, comment, messageContent, timestamp, url } = req.body;

    if (!sessionId || !messageId) {
      return res.status(400).json({ error: 'sessionId and messageId are required' });
    }

    // Save feedback to Firestore
    const feedbackRef = db.collection('chat_feedback').doc();
    await feedbackRef.set({
      sessionId,
      messageId,
      feedback,
      comment: comment || '',
      messageContent: messageContent || '',
      timestamp: timestamp || new Date().toISOString(),
      url: url || '',
      createdAt: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      feedbackId: feedbackRef.id
    });
  } catch (error) {
    console.error('Feedback API error:', error);
    return res.status(500).json({
      error: 'Failed to save feedback',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
