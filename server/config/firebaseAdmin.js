import admin from "firebase-admin";
import serviceAccount from "./amr010firebase-service-credentials.json" with { type: "json" };
import { config } from "./config.js";

// Initialize Firebase Admin with service account or default credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: config.STORAGE_BUCKET, // e.g. "your-app.appspot.com"
});

// Export the bucket
export const bucket = admin.storage().bucket();
