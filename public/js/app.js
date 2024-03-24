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

// var main = document.getElementById("main");
var userBox = document.getElementById("userBox");
var userName = document.getElementById("userName");
var products = [];

function renderProducts(containerId) {
  var main = document.getElementById(containerId);

  main.innerHTML = "";
  for (var i = 0; i < products.length; i++) {
    var x = products[i];

    main.innerHTML += `
    <div class="swiper-slide box" onclick="cardClick('${x.id}')" >
    <div class="icons">
      <a  class="fas fa-search"></a>
      <a  class="fas fa-eye"></a>
    </div>
    <div class="image">
      <a>
        <img src="${x.imgUrl}" alt="" />
      </a>
    </div>
    <div class="content " onclick="cardClick('${x.id}')" >
      <h3 style="color: #105a60">${x.title}</h3>
      <div class="price">${x.afterPrice || x.price} <span>${
      x.beforePrice || x.price
    }</span></div>
      <a  class="btn" onclick="cardClick('${x.id}')">add to cart</a>
    </div>
  </div>
      `;
  }
}

function getProduct() {
  var reference = ref(db, `products/`);

  onValue(reference, function (data) {
    console.log(data.val());
    products = Object.values(data.val());
    renderProducts("all-book");
    renderProducts("category");
    // renderProducts("all-book-home")
  });
}
getProduct();

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
      // ...
    }
  });
}
checkAuth();

window.logoutUser = function (userData) {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("abc");
      localStorage.removeItem(userData);
      location.reload();
    })
    .catch((error) => {
      console.log(error);
    });
};

window.cardClick = function (id) {
  localStorage.setItem("productId", id);
  window.location.assign("./Pages/single-product/singleproduct.html");
};

window.onload = () => {
  if (window.scrollY > 80) {
    document.querySelector(".header .header-2").classList.add("active");
  } else {
    document.querySelector(".header .header-2").classList.remove("active");
  }

  fadeOut();
};

function loader() {
  document.querySelector(".loader-container").classList.add("active");
}

function fadeOut() {
  setTimeout(loader, 1000);
}

var swiper = new Swiper(".books-slider", {
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".all-book-slider", {
  spaceBetween: 10,
  loop: true,
  // centeredSlides: true,
  parallax: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".category-slider", {
  spaceBetween: 10,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".reviews-slider", {
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});

let cartForm = document.querySelector(".cart-form-container");

window.CategoryBtn = function (categoryName) {
  document.getElementById("categoryHeading").innerText = categoryName;
  cartForm.classList.toggle("active");
};

window.CategoryBtnClose = function () {
  cartForm.classList.remove("active");
};
