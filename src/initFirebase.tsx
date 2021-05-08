import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

export default async function initFirebase() {
    if (process.env.NODE_ENV === 'development') {
        const app = firebase.initializeApp({
            projectId: "dummy-project-id",
        });
        app.firestore().settings({
            host: "localhost:8080",
            ssl: false
        });
        app.auth().useEmulator('http://localhost:9099');
        return app;
    } else {
        // See https://firebase.google.com/docs/hosting/reserved-urls#sdk_auto-configuration
        const firebaseHostingSDKAutoConfigurationJsonFile = '/__/firebase/init.json';
        const firebaseHostingConfigResponse = await fetch(firebaseHostingSDKAutoConfigurationJsonFile);
        return firebase.initializeApp(await firebaseHostingConfigResponse.json());
    }
}
