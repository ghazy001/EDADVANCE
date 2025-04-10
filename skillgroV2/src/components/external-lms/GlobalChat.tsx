import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, addDoc, query, orderBy, updateDoc, deleteDoc, where, getDocs, doc, setDoc } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, deleteUser, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import './assets/GlobalChat.css';
import FooterOne from "../../layouts/footers/FooterOne.tsx";
import HeaderOne from "../../layouts/headers/HeaderOne.tsx";

const firebaseConfig = {
    apiKey: "AIzaSyBx3eDQoO1ta70WOqHjYn1M6j6JCbYv238",
    authDomain: "myeducationalplatform.firebaseapp.com",
    projectId: "myeducationalplatform",
    storageBucket: "myeducationalplatform.firebasestorage.app",
    messagingSenderId: "937804149307",
    appId: "1:937804149307:web:c4f7399913307dc127a21e",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

interface ChatMessage {
    id?: string;
    text: string;
    user: string;
    userId: string;
    timestamp: any;
    edited?: boolean;
    reactions?: { [emoji: string]: string[] };
    imageUrl?: string;
    voiceUrl?: string; // URL for voice message
}

interface UserPresence {
    uid: string;
    displayName: string;
    online: boolean;
    lastSeen: any;
}

const GlobalChat: React.FC = () => {
    const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
    const [currentUser, setCurrentUser] = useState<any>(null);
    const [newMessage, setNewMessage] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
    const [editText, setEditText] = useState<string>('');
    const [onlineUsers, setOnlineUsers] = useState<UserPresence[]>([]);
    const [reactionPickerId, setReactionPickerId] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // For images
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const reactionEmojis = ['👍', '❤️', '😂', '😮', '😢', '🚀'];
    const CLOUD_NAME = 'dkc5gwry5'; // Your Cloudinary cloud name
    const UPLOAD_PRESET = 'chat_upload_unsigned'; // Your upload preset name

    const listenToGlobalChat = () => {
        const q = query(collection(db, 'global-chat'), orderBy('timestamp', 'asc'));
        return onSnapshot(q, (snapshot) => {
            const messages = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as ChatMessage));
            setChatMessages(messages);
        }, (err) => {
            console.error('Firestore error:', err);
            setError('Failed to load chat messages.');
        });
    };

    const listenToPresence = () => {
        const q = query(collection(db, 'presence'));
        return onSnapshot(q, (snapshot) => {
            const users = snapshot.docs.map(doc => doc.data() as UserPresence);
            setOnlineUsers(users.filter(user => user.online));
        }, (err) => {
            console.error('Presence error:', err);
            setError('Failed to load online users.');
        });
    };

    const updatePresence = async (user: any, online: boolean) => {
        if (!user) return;
        const presenceRef = doc(db, 'presence', user.uid);
        await setDoc(presenceRef, {
            uid: user.uid,
            displayName: user.displayName || 'Anonymous',
            online,
            lastSeen: new Date(),
        }, { merge: true });
    };

    const sendMessage = async () => {
        if (!currentUser || (!newMessage.trim() && recordedChunks.length === 0 && !selectedFile)) return;

        try {
            let imageUrl = '';
            let voiceUrl = '';

            if (selectedFile) {
                const formData = new FormData();
                formData.append('file', selectedFile);
                formData.append('upload_preset', UPLOAD_PRESET);
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
                    { method: 'POST', body: formData }
                );
                const data = await response.json();
                if (data.error) throw new Error(data.error.message);
                imageUrl = data.secure_url;
                console.log('Image URL:', imageUrl);
            }

            if (recordedChunks.length > 0) {
                const blob = new Blob(recordedChunks, { type: 'audio/webm' });
                const formData = new FormData();
                formData.append('file', blob, 'voice-message.webm');
                formData.append('upload_preset', UPLOAD_PRESET);
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`,
                    { method: 'POST', body: formData }
                );
                const data = await response.json();
                if (data.error) throw new Error(data.error.message);
                voiceUrl = data.secure_url;
                console.log('Voice URL:', voiceUrl);
                setRecordedChunks([]);
            }

            await addDoc(collection(db, 'global-chat'), {
                text: newMessage || '',
                user: currentUser.displayName || 'Anonymous',
                userId: currentUser.uid,
                timestamp: new Date(),
                edited: false,
                reactions: {},
                imageUrl: imageUrl || null,
                voiceUrl: voiceUrl || null,
            });

            setNewMessage('');
            setSelectedFile(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
            scrollToBottom(); // Scroll only after sending a new message
        } catch (err) {
            console.error('Send message error:', err);
            setError('Failed to send message: ' + (err as Error).message);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type.startsWith('image/')) {
                if (file.size <= 10 * 1024 * 1024) {
                    setSelectedFile(file);
                    setError(null);
                } else {
                    setError('Image must be less than 10MB.');
                }
            } else {
                setError('Please select an image file.');
            }
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            setMediaRecorder(recorder);
            recorder.ondataavailable = (event) => {
                setRecordedChunks((prev) => [...prev, event.data]);
            };
            recorder.start();
            setIsRecording(true);
        } catch (err) {
            console.error('Recording error:', err);
            setError('Failed to start recording.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            mediaRecorder.stop();
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
            setIsRecording(false);
        }
    };

    const editMessage = async (messageId: string) => {
        if (!editText.trim() || !currentUser) return;
        try {
            const messageRef = doc(db, 'global-chat', messageId);
            await updateDoc(messageRef, { text: editText, edited: true });
            setEditingMessageId(null);
            setEditText('');
        } catch (err) {
            console.error('Edit message error:', err);
            setError('Failed to edit message.');
        }
    };

    const deleteMessage = async (messageId: string) => {
        try {
            await deleteDoc(doc(db, 'global-chat', messageId));
        } catch (err) {
            console.error('Delete message error:', err);
            setError('Failed to delete message.');
        }
    };

    const addReaction = async (messageId: string, emoji: string) => {
        if (!currentUser) return;
        try {
            const messageRef = doc(db, 'global-chat', messageId);
            const message = chatMessages.find(msg => msg.id === messageId);
            const currentReactions = message?.reactions || {};
            const users = currentReactions[emoji] || [];
            if (users.includes(currentUser.uid)) {
                const updatedUsers = users.filter(uid => uid !== currentUser.uid);
                if (updatedUsers.length > 0) {
                    currentReactions[emoji] = updatedUsers;
                } else {
                    delete currentReactions[emoji];
                }
            } else {
                currentReactions[emoji] = [...users, currentUser.uid];
            }
            await updateDoc(messageRef, { reactions: currentReactions });
            setReactionPickerId(null);
        } catch (err) {
            console.error('Add reaction error:', err);
            setError('Failed to add reaction.');
        }
    };

    const clearUserMessages = async () => {
        if (!currentUser) return;
        try {
            const messagesQuery = query(collection(db, 'global-chat'), where('userId', '==', currentUser.uid));
            const snapshot = await getDocs(messagesQuery);
            const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
        } catch (err) {
            console.error('Delete all messages error:', err);
            setError('Failed to clear messages.');
        }
    };

    const clearAllConversations = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'global-chat'));
            const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);
        } catch (err) {
            console.error('Clear all conversations error:', err);
            setError('Failed to clear all conversations.');
        }
    };

    const logOut = async () => {
        try {
            await updatePresence(currentUser, false);
            await signOut(auth);
            setCurrentUser(null);
            setError(null);
        } catch (err: any) {
            console.error('Logout error:', err);
            setError('Failed to log out.');
        }
    };

    const deleteAccount = async () => {
        if (!currentUser) return;
        const password = prompt('Please enter your password to confirm account deletion:');
        if (!password) {
            setError('Password is required to delete your account.');
            return;
        }
        try {
            const credential = EmailAuthProvider.credential(currentUser.email, password);
            await reauthenticateWithCredential(currentUser, credential);
            const messagesQuery = query(collection(db, 'global-chat'), where('userId', '==', currentUser.uid));
            const messagesSnapshot = await getDocs(messagesQuery);
            const messageDeletePromises = messagesSnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(messageDeletePromises);
            const presenceRef = doc(db, 'presence', currentUser.uid);
            await deleteDoc(presenceRef);
            await deleteUser(currentUser);
            setCurrentUser(null);
            setError(null);
        } catch (err: any) {
            console.error('Delete account error:', err);
            if (err.code === 'auth/wrong-password') {
                setError('Incorrect password. Please try again.');
            } else if (err.code === 'auth/requires-recent-login') {
                setError('Please log out and log in again to delete your account.');
            } else {
                setError('Failed to delete account: ' + err.message);
            }
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
            setCurrentUser(user);
            if (user) {
                await updatePresence(user, true);
                setError(null);
            } else {
                setOnlineUsers([]);
            }
        }, () => setError('Authentication failed.'));
        return () => unsubscribeAuth();
    }, []);

    useEffect(() => {
        let unsubscribeChat: (() => void) | undefined;
        let unsubscribePresence: (() => void) | undefined;
        if (currentUser) {
            unsubscribeChat = listenToGlobalChat();
            unsubscribePresence = listenToPresence();
        }
        return () => {
            unsubscribeChat && unsubscribeChat();
            unsubscribePresence && unsubscribePresence();
        };
    }, [currentUser]);

    // Removed the useEffect that called scrollToBottom on every chatMessages update

    const signUp = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: username });
            await updatePresence(userCredential.user, true);
            setCurrentUser(userCredential.user);
            setError(null);
            setEmail('');
            setPassword('');
            setUsername('');
        } catch (err: any) {
            console.error('Sign-up error:', err);
            if (err.code === 'auth/email-already-in-use') {
                setError('This email is already in use. Please use a different email or log in.');
            } else {
                setError(err.message || 'Failed to sign up. Please try again.');
            }
        }
    };

    const logIn = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            await updatePresence(userCredential.user, true);
            setCurrentUser(userCredential.user);
            setError(null);
            setEmail('');
            setPassword('');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.message || 'Failed to log in.');
        }
    };

    const getAvatarUrl = (email: string) => {
        const hash = email.trim().toLowerCase().split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=32`;
    };

    return (
        <>
            <HeaderOne />
            <div className={currentUser ? "chat-container" : "chat-container auth-container"}>
                {currentUser ? (
                    <>
                        <div className="chat-header">
                            <h1>The Student Room</h1>
                            <div>
                                <button onClick={logOut}>Log Out</button>
                                <button onClick={clearAllConversations} className="clear-all-btn">Clear All</button>
                                <button onClick={deleteAccount} className="delete-account-btn">Delete Account</button>
                            </div>
                        </div>
                        <div className="chat-main">
                            <div className="chat-messages">
                                {chatMessages.map((msg) => {
                                    console.log('Message:', msg);
                                    return (
                                        <div
                                            key={msg.id}
                                            className={`chat-message ${msg.userId === currentUser.uid ? 'own-message' : ''}`}
                                        >
                                            <div className="message-header">
                                                <img src={getAvatarUrl(msg.userId)} alt="Avatar" className="avatar" />
                                                <span className="username">{msg.user}</span>
                                                <span className="timestamp">
                                                    {new Date(msg.timestamp?.toDate()).toLocaleTimeString()}
                                                </span>
                                            </div>
                                            {editingMessageId === msg.id ? (
                                                <div className="edit-container">
                                                    <input
                                                        value={editText}
                                                        onChange={(e) => setEditText(e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && editMessage(msg.id!)}
                                                    />
                                                    <button onClick={() => editMessage(msg.id!)}>Save</button>
                                                    <button onClick={() => setEditingMessageId(null)}>Cancel</button>
                                                </div>
                                            ) : (
                                                <>
                                                    {msg.text && (
                                                        <p className="message-text">
                                                            {msg.text} {msg.edited && <span>(edited)</span>}
                                                        </p>
                                                    )}
                                                    {msg.imageUrl && (
                                                        <div className="message-image">
                                                            <img src={msg.imageUrl} alt="Image Attachment" />
                                                        </div>
                                                    )}
                                                    {msg.voiceUrl && (
                                                        <div className="voice-message">
                                                            <audio controls>
                                                                <source src={msg.voiceUrl} type="audio/webm" />
                                                                Your browser does not support the audio element.
                                                            </audio>
                                                        </div>
                                                    )}
                                                    <div className="message-actions">
                                                        {msg.userId === currentUser.uid && (
                                                            <>
                                                                <button onClick={() => { setEditingMessageId(msg.id!); setEditText(msg.text); }}>Edit</button>
                                                                <button onClick={() => deleteMessage(msg.id!)}>Delete</button>
                                                            </>
                                                        )}
                                                        <button onClick={() => setReactionPickerId(msg.id === reactionPickerId ? null : msg.id!)}>
                                                            React
                                                        </button>
                                                    </div>
                                                    {reactionPickerId === msg.id && (
                                                        <div className="reaction-picker">
                                                            {reactionEmojis.map(emoji => (
                                                                <button
                                                                    key={emoji}
                                                                    className="reaction-btn"
                                                                    onClick={() => addReaction(msg.id!, emoji)}
                                                                >
                                                                    {emoji}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {msg.reactions && (
                                                        <div className="reactions">
                                                            {Object.entries(msg.reactions).map(([emoji, users]) => (
                                                                <span
                                                                    key={emoji}
                                                                    className={`reaction ${users.includes(currentUser?.uid) ? 'user-reacted' : ''}`}
                                                                    onClick={() => addReaction(msg.id!, emoji)}
                                                                >
                                                                    {emoji} {users.length}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            )}
                                        </div>
                                    );
                                })}
                                <div ref={messagesEndRef} />
                            </div>
                            <div className="online-users">
                                <h3>Online Users</h3>
                                {onlineUsers.map(user => (
                                    <div key={user.uid} className="user-item">
                                        <img src={getAvatarUrl(user.uid)} alt="Avatar" className="avatar" />
                                        <span>{user.displayName}</span>
                                        <span className="status-dot online"></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="chat-controls">
                            <button onClick={clearUserMessages} className="clear-messages-btn">Clear My Messages</button>
                        </div>
                        <div className="chat-input">
                            <input
                                type="text"
                                placeholder={`Message #global-chat`}
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            />
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                className="file-input"
                            />
                            <button onClick={isRecording ? stopRecording : startRecording}>
                                {isRecording ? 'Stop Recording' : 'Record Voice'}
                            </button>
                            <button onClick={sendMessage} disabled={!newMessage.trim() && recordedChunks.length === 0 && !selectedFile}>
                                Send
                            </button>
                        </div>
                    </>
                ) : (

                    <>
                        <h1 style={{color: "white", marginBottom: "20px"}} >Connect, Learn, and Grow – Join Our Student Community!</h1>
                    <div className="auth-forms">
                        <form onSubmit={signUp} className="auth-form">

                            <h2>Sign Up</h2>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Sign Up</button>
                        </form>
                        <form onSubmit={logIn} className="auth-form">
                            <h2>Log In</h2>
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button type="submit">Log In</button>
                        </form>
                        {error && <div className="error-message">{error}</div>}
                    </div>
                    </>
                )}
            </div>
            <FooterOne />
        </>
    );
};

export default GlobalChat;