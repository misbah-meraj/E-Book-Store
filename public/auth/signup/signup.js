
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {
  getStorage,
  ref as strRef,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";


const firebaseConfig = {
  apiKey: "AIzaSyCILcQmrlEr0WyNpXKKTEesMsVvRn89HcI",
  authDomain: "book-shelf-store.firebaseapp.com",
  databaseURL: "https://book-shelf-store-default-rtdb.firebaseio.com",
  projectId: "book-shelf-store",
  storageBucket: "book-shelf-store.appspot.com",
  messagingSenderId: "14078234322",
  appId: "1:14078234322:web:3a016797b2b3d63a7c270b",
  measurementId: "G-KD0FR1KG0Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth();
const storage = getStorage();

var userName = document.getElementById("userName");
var email = document.getElementById("email");
var password = document.getElementById("password");

window.signupUser = function () {
  var obj = {
    userName: userName.value,
    email: email.value,
    password: password.value,
  };
  console.log(obj);
  createUserWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (res) {
      console.log("User Created Successfully", res);

      obj.id = res.user.uid;

      var reference = ref(db, `users/${obj.id}`);
      set(reference, obj)
        .then(function () {
          console.log("User Added in Database");
          window.location.href = "../../index.html";
        })
        .catch(function (dbError) {
          console.log("Database Error", dbError);
        });
        userName.value ="";
        email.value ="";
        password.value ="";
    })
    .catch(function (err) {
      console.log(err);
    });
};

