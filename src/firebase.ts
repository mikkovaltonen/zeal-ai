import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, addDoc, getDocs, query, orderBy } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Sign in with credentials from .env
let isAuthenticated = false;

async function ensureAuth(): Promise<boolean> {
  if (isAuthenticated) return true;

  const email = import.meta.env.VITE_USER;
  const password = import.meta.env.VITE_PW;

  if (!email || !password) {
    console.warn('Firebase credentials not found in .env');
    return false;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    isAuthenticated = true;
    console.log('✅ Firebase authenticated');
    return true;
  } catch (error) {
    console.error('Firebase auth error:', error);
    return false;
  }
}

// Save chat message to Firestore
export async function saveChatMessage(
  sessionId: string,
  role: 'user' | 'assistant',
  content: string
): Promise<void> {
  const authenticated = await ensureAuth();
  if (!authenticated) return;

  try {
    const sessionRef = doc(db, 'home_page_chat_log', sessionId);
    const timestamp = new Date().toISOString();

    // Update session document
    await setDoc(sessionRef, {
      updated_at: timestamp,
      created_at: timestamp,
    }, { merge: true });

    // Add message to subcollection
    const messagesRef = collection(sessionRef, 'messages');
    await addDoc(messagesRef, {
      role,
      content,
      timestamp
    });

    console.log(`📝 Chat message saved (${role})`);
  } catch (error) {
    console.error('Error saving chat message:', error);
  }
}

// Save feedback to Firestore
export async function saveFeedbackToFirestore(feedbackData: {
  sessionId: string;
  messageId: string;
  feedback: 'up' | 'down' | null;
  comment: string;
  messageContent: string;
  timestamp: string;
  url: string;
}): Promise<void> {
  const authenticated = await ensureAuth();
  if (!authenticated) return;

  try {
    const feedbackRef = collection(db, 'home_page_chat_feedback');
    await addDoc(feedbackRef, {
      ...feedbackData,
      createdAt: new Date().toISOString()
    });

    console.log('✅ Feedback saved to Firestore');
  } catch (error) {
    console.error('Error saving feedback:', error);
  }
}

// Load chat history from Firestore
export async function loadChatHistory(sessionId: string): Promise<any[]> {
  const authenticated = await ensureAuth();
  if (!authenticated) return [];

  try {
    const sessionRef = doc(db, 'home_page_chat_log', sessionId);
    const messagesRef = collection(sessionRef, 'messages');
    const q = query(messagesRef, orderBy('timestamp', 'asc'));
    const snapshot = await getDocs(q);

    const messages: any[] = [];
    snapshot.forEach((doc) => {
      messages.push(doc.data());
    });

    console.log(`📜 Loaded ${messages.length} messages from history`);
    return messages;
  } catch (error) {
    console.error('Error loading chat history:', error);
    return [];
  }
}

export { db, auth };
