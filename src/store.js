import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
//Custom Reducers
import notifyReducer from './reducers/notifyReducer';

const firebaseConfig = {
  // Initialize Firebase
  apiKey: 'AIzaSyD5IdyMdQPCakDx1Eh-lBC09N2rXft3U0Y',
  authDomain: 'reactclientpanelmoose.firebaseapp.com',
  databaseURL: 'https://reactclientpanelmoose.firebaseio.com',
  projectId: 'reactclientpanelmoose',
  storageBucket: 'reactclientpanelmoose.appspot.com',
  messagingSenderId: '156334806525'
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase instance
firebase.initializeApp(firebaseConfig);

//Init firestore
const firestore = firebase.firestore();
//Following fixes the FireBase's new time stamp error - added by Moose
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer
});

// Create Initial state
const initialState = {};

// Create Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
