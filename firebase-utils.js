// Firebase Utilities for Moonshot Crash Game

class FirebaseUtils {
    constructor() {
        this.db = firebase.firestore();
        this.realtimeDb = firebase.database();
        this.auth = firebase.auth();
    }

    // Access Code Management
    async checkAccessCode(accessCode) {
        try {
            const doc = await this.db.collection('accessCodes').doc(accessCode).get();
            return {
                exists: doc.exists,
                data: doc.exists ? doc.data() : null
            };
        } catch (error) {
            console.error('Error checking access code:', error);
            throw error;
        }
    }

    async updateAccessCodeUsage(accessCode, ipAddress) {
        try {
            await this.db.collection('accessCodes').doc(accessCode).set({
                lastUsed: new Date().toISOString(),
                lastUsedBy: ipAddress,
                status: 'active'
            }, { merge: true });
        } catch (error) {
            console.error('Error updating access code:', error);
            throw error;
        }
    }

    async revokeAccessCode(accessCode) {
        try {
            await this.db.collection('accessCodes').doc(accessCode).set({
                status: 'revoked',
                revokedAt: new Date().toISOString()
            }, { merge: true });
        } catch (error) {
            console.error('Error revoking access code:', error);
            throw error;
        }
    }

    // Session Management
    async createSession(accessCode, ipAddress) {
        try {
            const sessionData = {
                accessCode: accessCode,
                ipAddress: ipAddress,
                loginTime: new Date().toISOString(),
                lastActivity: new Date().toISOString(),
                status: 'active'
            };

            await this.db.collection('sessions').doc(accessCode).set(sessionData);
            return sessionData;
        } catch (error) {
            console.error('Error creating session:', error);
            throw error;
        }
    }

    async updateSessionActivity(accessCode) {
        try {
            await this.db.collection('sessions').doc(accessCode).update({
                lastActivity: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error updating session:', error);
            throw error;
        }
    }

    async endSession(accessCode) {
        try {
            await this.db.collection('sessions').doc(accessCode).update({
                status: 'ended',
                endTime: new Date().toISOString()
            });
        } catch (error) {
            console.error('Error ending session:', error);
            throw error;
        }
    }

    async checkSessionActive(accessCode) {
        try {
            const doc = await this.db.collection('sessions').doc(accessCode).get();
            return doc.exists && doc.data().status === 'active';
        } catch (error) {
            console.error('Error checking session:', error);
            return false;
        }
    }

    // Real-time Game Data
    async updateGameStats(userId, stats) {
        try {
            await this.db.collection('userStats').doc(userId).set(stats, { merge: true });
        } catch (error) {
            console.error('Error updating game stats:', error);
            throw error;
        }
    }

    async getGameStats(userId) {
        try {
            const doc = await this.db.collection('userStats').doc(userId).get();
            return doc.exists ? doc.data() : null;
        } catch (error) {
            console.error('Error getting game stats:', error);
            throw error;
        }
    }

    // Real-time Multiplayer Features
    setupGameStateListener(gameId, callback) {
        return this.realtimeDb.ref(`games/${gameId}`).on('value', (snapshot) => {
            callback(snapshot.val());
        });
    }

    async updateGameState(gameId, state) {
        try {
            await this.realtimeDb.ref(`games/${gameId}`).set(state);
        } catch (error) {
            console.error('Error updating game state:', error);
            throw error;
        }
    }

    // Admin Functions
    async getAllSessions() {
        try {
            const snapshot = await this.db.collection('sessions').get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting sessions:', error);
            throw error;
        }
    }

    async getAllAccessCodes() {
        try {
            const snapshot = await this.db.collection('accessCodes').get();
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        } catch (error) {
            console.error('Error getting access codes:', error);
            throw error;
        }
    }

    // Utility Functions
    getClientIP() {
        // This is a simplified version - in production, you'd get this from your server
        // or use a service like ipify.org
        return '192.168.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255);
    }

    generateUserId() {
        return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
}

// Create global instance
const firebaseUtils = new FirebaseUtils();
