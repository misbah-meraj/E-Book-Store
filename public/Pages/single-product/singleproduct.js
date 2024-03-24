import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
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

var productImage = document.getElementById("productImage");
var productTitle = document.getElementById("productTitle");
var productDescription = document.getElementById("productDescription");
var productPrice = document.getElementById("productPrice");

var productId = localStorage.getItem("productId");

function checkAuth() {
  onAuthStateChanged(auth, function (user) {
    if (user) {
      const uid = user.uid;
      console.log(uid);

      var userObj = localStorage.getItem("userData");
      userObj = JSON.parse(userObj);

      userBox.style.display = "block";
      userName.innerHTML = userObj.userName;
      // ...
    } else {
      // User is signed out
    }
  });
}
checkAuth();

window.logoutUser = function () {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      localStorage.removeItem("userData");
    })
    .catch((error) => {});
};

var productResponse;
function getProduct() {
  var reference = ref(db, `products/${productId}`);

  onValue(reference, function (data) {
    productResponse = data.val();
    console.log(productResponse);

    productImage.src = productResponse.imgUrl;
    productTitle.innerHTML = productResponse.title;
    productDescription.innerHTML = productResponse.description;
    productPrice.innerHTML = productResponse.afterPrice;
    productPrice.innerHTML = productResponse.beforePrice;
  });
}
getProduct();

window.placeOrder = function () {
  var loginUser = localStorage.getItem("userData");
  if (!loginUser) {
    alert("User Must be Login to Place Order");
    window.location.assign("../login/login.html");
  } else {
    var user = JSON.parse(localStorage.getItem("userData"));
    var obj = {
      userName: user.userName,
      userEmail: user.email,
      image: productResponse.imgUrl,
      productTitle: productResponse.title,
    };

    obj.id = push(ref(db, "orders/")).key;
    var reference = ref(db, `orders/${obj.id}`);

    set(reference, obj)
      .then(function () {
        alert("Order Placed Successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
};
