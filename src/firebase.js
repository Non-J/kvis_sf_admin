import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

import {
	of
} from 'rxjs';
import {
	switchMap,
	startWith,
	map
} from 'rxjs/operators';

import {
	authState
} from 'rxfire/auth';
import {
	docData
} from 'rxfire/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyCIEe0iPxo-BrzF_jSIp6SNysTvk6OuToY',
	authDomain: 'kvis-science-fair.firebaseapp.com',
	databaseURL: 'https://kvis-science-fair.firebaseio.com',
	projectId: 'kvis-science-fair',
	storageBucket: 'kvis-science-fair.appspot.com',
	messagingSenderId: '1088811209397',
	appId: '1:1088811209397:web:df82d84434269a61eee4fc',
	measurementId: 'G-3JK8ERPVP0'
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firestore = firebase.firestore();
const functions = firebase.functions();

const authUserObservable = authState(auth)
	.pipe(
		startWith(null),
		switchMap((firebaseUser) => {
			if (firebaseUser == null) {
				return of(null);
			} else {
				return docData(
					firestore
					.collection('users')
					.doc(firebaseUser['uid']),
				).pipe(
					startWith({
						user: firebaseUser,
						data: null
					}),
					map(document => ({
						user: firebaseUser,
						data: document
					}))
				);
			}
		}));

const getEmailByUsername = functions.httpsCallable('getEmailByUsername');

const Schedule = async () => {
	var Events = []
	var Days = []
	let schedule_collections = ["UbFemGoQkFDQtQpDjl1E", "fMu0m6OrT55hOt8mKpFZ", "aOHyccK7yRvfMYWpCcCU", "E60HaUR41g4lWDvl8Ccu", "OytS1cVHVBiHDAs8Z0C9", "9AoQIm93JyR2QLJtF7LD", "JgBP96O3QzD6atggRpVh"]
	for (let col in schedule_collections) {
		await firestore.collection("schedules").doc(schedule_collections[col]).get().then((doc) => {
			if (doc.exists) {
				doc.data().content.forEach((obj) => { Events.push(obj); })
				Days.push(doc.data())
			}
		})
	}
	return [Events, Days];
}

export {
	app,
	auth,
	firestore,
	authUserObservable,
	getEmailByUsername,
	Schedule,
};
export default firebase;