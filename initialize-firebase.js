// Firebase Initialization Script
// Run this in your browser console after setting up Firebase to create initial test codes

// Make sure Firebase is initialized first
if (typeof firebase === 'undefined') {
    console.error('Firebase is not loaded. Please include Firebase SDK first.');
} else {
    // Initialize Firebase if not already done
    if (!firebase.apps.length) {
        // Replace with your actual Firebase config
        const firebaseConfig = {
            apiKey: "AIzaSyC2UOJ3ClN6Jw0zx_7wBB1nO2IvggwFXzQ",
            authDomain: "moonshot-crash.firebaseapp.com",
            databaseURL: "https://moonshot-crash-default-rtdb.firebaseio.com",
            projectId: "moonshot-crash",
            storageBucket: "moonshot-crash.firebasestorage.app",
            messagingSenderId: "669491600892",
            appId: "1:669491600892:web:bd5d5ddc5284b4b51ae679",
            measurementId: "G-V28NTSDZ1F"
          };
        
        firebase.initializeApp(firebaseConfig);
        console.log('Firebase initialized for initialization script');
    }

    // Access codes to create
    const accessCodes = [
        { code: 'REAZ', status: 'active', type: 'user' },
        { code: 'TEST1', status: 'active', type: 'user' },
        { code: 'TEST2', status: 'active', type: 'user' },
        { code: 'ADMIN123', status: 'active', type: 'admin' }
    ];

    // Function to create access codes
    async function initializeAccessCodes() {
        console.log('Starting access code initialization...');
        
        const db = firebase.firestore();
        let createdCount = 0;
        let errorCount = 0;

        for (const { code, status, type } of accessCodes) {
            try {
                await db.collection('accessCodes').doc(code).set({
                    status: status,
                    type: type,
                    createdAt: new Date().toISOString(),
                    createdBy: 'initialization-script',
                    lastUsed: null,
                    usageCount: 0
                });
                console.log(`✅ Created access code: ${code} (${type})`);
                createdCount++;
            } catch (error) {
                console.error(`❌ Error creating code ${code}:`, error);
                errorCount++;
            }
        }

        console.log(`\nInitialization complete!`);
        console.log(`✅ Created: ${createdCount} codes`);
        console.log(`❌ Errors: ${errorCount} codes`);
        
        if (errorCount === 0) {
            console.log('\n🎉 All access codes created successfully!');
            console.log('Test codes: REAZ, TEST1, TEST2');
            console.log('Admin code: ADMIN123');
        }
    }

    // Run initialization
    initializeAccessCodes().catch(console.error);
}
