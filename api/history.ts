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
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { sessionId } = req.query;

    if (!sessionId || typeof sessionId !== 'string') {
      return res.status(400).json({ error: 'sessionId is required' });
    }

    // Get messages from Firestore
    const messagesRef = db
      .collection('chat_sessions')
      .doc(sessionId)
      .collection('messages')
      .orderBy('timestamp', 'asc')
      .limit(50);

    const snapshot = await messagesRef.get();

    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({ messages, sessionId });
  } catch (error) {
    console.error('History API error:', error);
    return res.status(500).json({
      error: 'Failed to fetch chat history',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
