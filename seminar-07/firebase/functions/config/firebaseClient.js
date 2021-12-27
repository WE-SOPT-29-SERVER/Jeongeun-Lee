const { initializeApp } = require('firebase/app');
const { getAuth } = require('firebase/auth');

const firebaseConfig = {
  apiKey: 'AIzaSyCBbAJ9l2fjxUJEre-qOMlT2fvd2Bd6LHg',
  authDomain: 'wesopt29-463f2.firebaseapp.com',
  projectId: 'wesopt29-463f2',
  storageBucket: 'wesopt29-463f2.appspot.com',
  messagingSenderId: '707517789753',
  appId: '1:707517789753:web:e310e80e02b90c6f59bfe8',
  measurementId: 'G-T1E9VMFSG6',
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);

module.exports = { firebaseApp, firebaseAuth, firebaseConfig };
