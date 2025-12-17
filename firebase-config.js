// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push, onValue, query, orderByChild, limitToLast } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBMIX4bM4_DAibZlAdOp0bPUTl_B1VCYT4",
    authDomain: "memorialseverinofurtuoso.firebaseapp.com",
    databaseURL: "https://memorialseverinofurtuoso-default-rtdb.firebaseio.com",
    projectId: "memorialseverinofurtuoso",
    storageBucket: "memorialseverinofurtuoso.firebasestorage.app",
    messagingSenderId: "658224221232",
    appId: "1:658224221232:web:1a10ef19b7dcea814d71f5",
    measurementId: "G-S7D7ZRNXQK"
  };

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, push, onValue, query, orderByChild, limitToLast };