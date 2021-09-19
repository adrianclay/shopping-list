import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";

export default async function initFirebase() {
    if (process.env.NODE_ENV === 'development') {
        const app = initializeApp({
            apiKey: "xxx",
            authDomain: "localhost",
            projectId: "demo-project-id",
        });
        connectFirestoreEmulator(getFirestore(app), "localhost", 8080)
        connectAuthEmulator(getAuth(app), "http://localhost:9099")
        return app;
    } else {
        // See https://firebase.google.com/docs/hosting/reserved-urls#sdk_auto-configuration
        const firebaseHostingSDKAutoConfigurationJsonFile = '/__/firebase/init.json';
        const firebaseHostingConfigResponse = await fetch(firebaseHostingSDKAutoConfigurationJsonFile);
        return initializeApp(await firebaseHostingConfigResponse.json());
    }
}
