'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');
const btnLogin = document.querySelector('.btn--login-app');
const cookieButton = document.querySelector('.cookie-message');
const section1 = document.querySelector('#section--1');
const btnScrollTo = document.querySelector('.btn--scroll-to');


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnLogin.addEventListener('click', function(e){

  e.preventDefault();
  window.location.replace('app.html');

})

const message = document.createElement("div");
message.classList.add("cookie-message");
  // 1. Create an element.
  // 2. Add text to that element and containing an button in it.
  // 3. Then, add event listener to that button, which performs an required action.
message.innerHTML = "We make use of cookies for better functionality of the application.<button class='btn btn-close--cookie'>'Yeah Got it'</button>"
header.append(message);
message.style.background = "#808080";
message.style.width = "100vw";
message.style.paddingBottom = "15px";

document.querySelector('.btn-close--cookie')
.addEventListener('click',function(){
  message.remove();
});

//practice smooth scrolling
// btnScrollTo.addEventListener("click", function(e) {
//   //e.preventDefault();
//   section1.scrollIntoView({behavior: 'smooth'});
// })

//practice event propogation.


// const navBarElement = document.querySelector(".nav");
// const navBarChildElement = document.querySelector(".nav__link");
// const grayColor = "#DCDCDC";
// const blueColor = "#0000ff";

// navBarChildElement.addEventListener("click", function(){
//   console.log("The child button got clicked");
//   this.style.background = grayColor;
// })

// navBarElement.addEventListener("click", function(){
//   console.log("The parrent button got clicked");
//   this.style.background = blueColor;
// })


//added the smooth scrolling here using the element ID's
// document.querySelectorAll(".nav__link").forEach((function(element){

//   element.addEventListener('click', function(e){
//     e.preventDefault();
//     const hrefID = this.getAttribute('href');      
//     document.querySelector(hrefID).scrollIntoView({behavior: 'smooth'});
//   })
// })
// )

//adding the smooth scrolling here using the event delegation


document.querySelector("nav").addEventListener("click", function(e){
  e.preventDefault();
  console.log(`This is the taget`+ e.target.classList);
  if(e.target.classList.contains("nav__link")){
     document.querySelector(e.target.getAttribute('href')).scrollIntoView({behavior: 'smooth'});
  }

})
