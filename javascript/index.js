// Navigation bar on index.html. Navbar will appear once user scrolls
// function that updates the navigation bar display
function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    //navbar is the ID of the navigation bar. First we must grab the element
    document.getElementById("navbar").style.top = "0"; //Display navigation bar
  } else {
    document.getElementById("navbar").style.top = "-50px"; //hide navigation bar
  }
}
//listen for scroll event
window.onscroll = function () {
  scrollFunction(); //when the window is scrolled, call the function that updates the navigation bar display
};

//type writer effect on index.html
// initialize the values and store in TxtType
var TxtType = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};
// function for each letter tick
TxtType.prototype.tick = function () {
  var i = this.loopNum % this.toRotate.length;
  var fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    //full max of text in array
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //continue typing text in array
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  var that = this;
  var delta = 200 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true; //set to true, reached the length of the element in array
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++; //keep incrementing in array
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

// event listener, when the window loads
window.onload = function () {
  // 1. grab the html element. Class = "typewrite"
  var elements = document.getElementsByClassName("typewrite");
  // for loop to get the data-type and data-period anchor tag attribute
  for (var i = 0; i < elements.length; i++) {
    var toRotate = elements[i].getAttribute("data-type");
    var period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtType(elements[i], JSON.parse(toRotate), period);
    }
  }
  // CSS
  var css = document.createElement("style");
  css.type = "text/css";
  // css for the line at the end of the typing effect
  css.innerHTML = ".typewrite > .wrap { border-right: 0.10em solid #ff3b3f}";
  document.body.appendChild(css);
};
