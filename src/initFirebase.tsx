import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

export default async function initFirebase() {
    if (process.env.NODE_ENV === 'development') {
        const firebaseConfig = {
            projectId: "dummy-project-id",
        };
        if (process.env.REACT_APP_FIREBASE_API_KEY && process.env.REACT_APP_FIREBASE_AUTH_DOMAIN) {
            Object.assign(
                firebaseConfig,
                {
                    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
                    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
                }
            );
        }

        const app = firebase.initializeApp(firebaseConfig);
        app.firestore().settings({
            host: "localhost:8080",
            ssl: false
        });
        return app;
    } else {
        // See https://firebase.google.com/docs/hosting/reserved-urls#sdk_auto-configuration
        const firebaseHostingSDKAutoConfigurationJsonFile = '/__/firebase/init.json';
        const firebaseHostingConfigResponse = await fetch(firebaseHostingSDKAutoConfigurationJsonFile);
        return firebase.initializeApp(await firebaseHostingConfigResponse.json());
    }
}
