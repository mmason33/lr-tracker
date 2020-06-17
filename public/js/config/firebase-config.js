// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBqpNkOV1WblITIlimVIRmyG8ma4urM2pM",
	authDomain: "lr-tracker-d90c0.firebaseapp.com",
	databaseURL: "https://lr-tracker-d90c0.firebaseio.com",
	projectId: "lr-tracker-d90c0",
	storageBucket: "lr-tracker-d90c0.appspot.com",
	messagingSenderId: "397582508257",
	appId: "1:397582508257:web:393dc41c906980bf9417a0",
	measurementId: "G-ENRE4VBCXW"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var auth = firebase.auth;
