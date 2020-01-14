import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/functions';

import {
	of ,
	BehaviorSubject
} from 'rxjs';
import {
	switchMap,
	startWith,
	map,
	scan
} from 'rxjs/operators';

import {
	authState
} from 'rxfire/auth';
import {
	docData,
	collectionData
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

const scheduleRef = firestore.collection("schedules")
	.where("is_featured", "==", true)
	.orderBy("priority", "desc");

const scheduleObservable = collectionData(scheduleRef);

const fullScheduleObservable = scheduleObservable.pipe(
	map((documents, idx) => {
		let result = [];
		for (let document of documents) {
			if (document["content_type"] === "list_content") {
				result = [...result, ...(document["content"] || [])];
			}
		}
		return result;
	})
);

export {
	app,
	auth,
	firestore,
	authUserObservable,
	getEmailByUsername,
	scheduleObservable,
	fullScheduleObservable,
};
export default firebase;