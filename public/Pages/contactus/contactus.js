// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  ref,
  set,
  getDatabase,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const database = getDatabase();

var fullname = document.getElementById("fullname");
var email = document.getElementById("email");
var phone = document.getElementById("phone");
var message = document.getElementById("message");

var showRow = document.getElementById("showRow");
var getUser;

window.add = function () {
  var obj = {
    Fullname: fullname.value,
    Email: email.value,
    Phone: phone.value,
    Message: message.value,
  };

  obj.id = push(ref(database, "userContact/")).key;
  var reference = ref(database, `userContact/${obj.id}`);
  set(reference, obj);

  // Show alert
  alert("Form submitted successfully!");

  // Clear all fields after submission

  fullname.value = "";
  email.value = "";
  phone.value = "";
  message.value = "";
};

function userList() {
  showRow.innerHTML = "";
  for (var i = 0; i < getUser.length; i++) {
    showRow.innerHTML += `<tr>
    <td>${getUser[i].Fullname}  ${getUser[i].Fathername}</td>
    <td>${getUser[i].Email}</td>
    <td>${getUser[i].Phone}</td>
    <td>${getUser[i].Message}</td>
  </tr>`;
  }
}

function getData() {
  var reference = ref(database, "userContact/");

  onValue(reference, function (data) {
    console.log(data.val());
    getUser = Object.values(data.val());
    userList();
  });
}
getData();
