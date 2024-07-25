import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithCustomToken, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
export const firebaseConfig = {
	apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
	authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
	databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
	projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
	messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
	appId: import.meta.env.VITE_FIREBASE_APP_ID,
	measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

console.log(firebaseConfig)

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export function firbaseSignUp(username, password) {
	const email = username + "@exobooster.com";
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			// console.log(userCredential)
			// Signed up 
			const user = userCredential.user;
			firebaseSignInWithToken(user.accessToken)
			// ...
		})
		.catch((error) => {
			console.log(error)
			const errorCode = error.code;
			const errorMessage = error.message;
			// ..
		});
}

export function firebaseSignIn1(token) {
	return new Promise((resolve, reject) => {
		signInWithCustomToken(auth, token)
			.then((userCredential) => {
				// console.log(userCredential)
				// Signed in
				const user = userCredential.user;
				resolve(user)
			})
			.catch((error) => {
				reject(error)
			})
	})
}

export function firebaseSignIn2(username, password) {
	return new Promise((resolve, reject) => {
		const email = username.includes('@') ? username : username + "@exobooster.com";
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in 
				const user = userCredential.user;
				resolve(user)
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				reject(errorMessage)
			});
	})
}

export function firebaseChangePassword(currentPassword, password) {
	return new Promise((resolve, reject) => {

		const user = auth.currentUser;

		if (user) {

			const credential = EmailAuthProvider.credential(user.email, currentPassword);
			reauthenticateWithCredential(user, credential).then(() => {
				console.log("Reauthenticated")

				updatePassword(auth.currentUser, password).then(() => {
					console.log("Password updated")
					resolve()
				});
			}).catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				reject(errorMessage)
			})
		} else {
			reject("User not found")

		}
	})
}

export function firebaseSignOut() {
	return new Promise((resolve, reject) => {
		signOut(auth).then(() => {
			resolve()
		}).catch((error) => {
			reject(error)
		});
	})
}

export const fetchSupportContacts = () => {
	return new Promise((resolve, reject) => {
		const docRef = doc(collection(db, "Extras"), "SupportContactsLinks");
		getDoc(docRef)
			.then((doc) => {
				if (doc.exists) {
					resolve(doc.data())
				}
				reject("Error getting document")
			})
			.catch((error) => {
				console.log("Error getting document:", error);
				reject(error)
			});
	})
}

export const fetchUserData = (uid) => {
	return new Promise((resolve, reject) => {
		const docRef = doc(db, "Users", uid);
		getDoc(docRef)
			.then((doc) => {
				if (doc.exists) {
					resolve(doc.data())
				}
				reject("Error getting document")
			})
			.catch((error) => {
				console.log("Error getting document:", error);
				reject(error)
			});
	})
}

export const fetchReferralInfo = () => {
	return new Promise((resolve, reject) => {
		const docRef = doc(db, "Extras", 'ReferralWeb');
		getDoc(docRef)
			.then((doc) => {
				if (doc.exists) {
					resolve(doc.data())
				}
				reject("Error getting document")
			})
			.catch((error) => {
				console.log("Error getting document:", error);
				reject(error)
			});
	})
}

export const fetchTotalOrders = () => {
	return new Promise((resolve, reject) => {
		const docRef = doc(db, "Extras", 'OrdersCounter');
		getDoc(docRef)
			.then((doc) => {
				if (doc.exists) {
					resolve(doc.data())
				}
				reject("Error getting document")
			})
			.catch((error) => {
				console.log("Error getting document:", error);
				reject(error)
			});
	})
}

export const docRef = uid => doc(db, "Users", uid);