import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithCustomToken, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
export const firebaseConfig = {
	apiKey: "AIzaSyDVqxoMQw4DnkCXwtIesSQR4-qoSFVYYww",
	authDomain: "exobooster-59de3.firebaseapp.com",
	databaseURL: "https://exobooster-59de3-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "exobooster-59de3",
	messagingSenderId: "311433638015",
	appId: "1:311433638015:web:93a48c36290dd2bc7b4f4a",
	measurementId: "G-WPYN5P7DNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export function firbaseSignUp(username, password) {
	const email = username + "@exobooster.com";
	createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential) => {
			console.log(userCredential)
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
				console.log(userCredential)
				// Signed in
				const user = userCredential.user;
				resolve(user)
			})
			.catch((error) => {
				console.log(error)
				const errorCode = error.code;
				const errorMessage = error.message;
				reject(errorMessage)
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
				console.log(doc.data())
				if (doc.exists) {
					resolve(doc.data())
				}
				reject("Error getting document")
			})
			.catch((error) => {
				console.log("Error getting document:", error);
				reject("Check your internet connection and try again.")
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

export const fetchReferralInfo = (uid) => {
	return new Promise((resolve, reject) => {
		const docRef = doc(db, "Referral", 'en');
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