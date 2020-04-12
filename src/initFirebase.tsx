import firebase from "firebase/app";
import 'firebase/firestore'

export default function initFirebase() {
    if (process.env.NODE_ENV === 'development') {
        firebase.initializeApp({
            "projectId": "dummy-project-id",
        });
        firebase.firestore().settings({
            host: "localhost:8080",
            ssl: false
        });
    } else {
        // See https://firebase.google.com/docs/hosting/reserved-urls#sdk_auto-configuration
        const firebaseHostingSDKAutoConfigurationJsonFile = '/__/firebase/init.json';
        fetch(firebaseHostingSDKAutoConfigurationJsonFile).then(async response => {
            firebase.initializeApp(await response.json());
        });
    }
}
