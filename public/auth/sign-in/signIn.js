// Import the functions you need from the SDKs you need
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
  signInWithEmailAndPassword,
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

var email = document.getElementById("email");
var password = document.getElementById("password");

window.loginUser = function () {
  var obj = {
    email: email.value,
    password: password.value,
  };
  console.log(obj);
  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then(function (res) {
      console.log("Login Successfully", res);

      var id = res.user.uid;

      var reference = ref(db, `users/${id}`);

      onValue(reference, function (data) {
        var responseUser = data.val();

        console.log(responseUser);

        localStorage.setItem("userData", JSON.stringify(responseUser));
        window.location.href = "../../index.html";
      });
      email.value = "";
      password.value = "";
    })
    .catch(function (err) {
      console.log(err);
    });
};
