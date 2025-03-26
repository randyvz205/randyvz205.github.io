$(function() {
    var loc = window.location.href+'';
    if (loc.indexOf('http://')==0){
        window.location.href = loc.replace('http://','https://');
    }
    var FADE_TIME = 150; // ms
    var TYPING_TIMER_LENGTH = 400; // ms
    var COLORS = ["#ff0000", "#003EFF","#000000","#7ce674","#9B00FF","#00000","#00ffdd","#59ff00","#ffffff","#32a852","#8a8a8a","#eb6161","#56d2dd","#36fc7f","#808080","#F39AFF","#F39AFF","#F39AFF","#FCFF00","#FCFF00","#FCFF00","#cdcdcd","#cdcdcd","#cdcdcd","#cdcdcd","#DC34FA","#DC34FA"];
    
    // Initialize variables
    var $window = $(window);
    var $usernameInput = $('.usernameInput'); // Input for username
    var $messages = $('.messages'); // Messages area
    var $inputMessage = $('.inputMessage'); // Input message input box
  
    var $loginPage = $('.login.page'); // The login page
    var $chatPage = $('.chat.page'); // The chatroom page
  
    // Prompt for setting a username
    //var audio = new Audio('https://cdn.glitch.com/c4a5911a-6f48-4e0e-8250-84cc9d86a6cb%2Frec_3s.mp3?1507817293560');
    var username;
    var connected = false;
    var typing = false;
    var lastTypingTime;
    var $currentInput = $usernameInput.focus();
    var unread = 0;
    var occupied = true;
    var temp = '';
    var isValid = false;
  
    var socket = io();
    
    $(window).on("blur focus", function(e) {
      var prevType = $(this).data("prevType");
  
      if (prevType != e.type) {   //  reduce double fire issues
          switch (e.type) {
              case "blur":
                  occupied = false;
                  break;
              case "focus":
                  document.title = "Booter <3"
                  unread = 0;
                  occupied = true;
                  break;
          }
      }