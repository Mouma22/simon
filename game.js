var randomColors=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];

var started= false;
var level=0;

$(document).keypress(function(){
    if(!started){
      nextSequence();
    $("#level-title").text("Level "+level);   //starting only at level 0//
    started= true;
    }
});




function nextSequence(){
  userClickedPattern = [];//once nextSequence() is trigerred the userclicked pattern array gets cleared and ready for next level.//
  //4. Inside nextSequence(),  increase the level by 1 every time nextSequence() is called.
  level++;
//5. Inside nextSequence(), update the h1 with this change in the value of level.
  $("#level-title").text("Level " + level);
var n=Math.random();
  n=n*4//getting number(in float) from 0 to 3.9999//
  var randomNumber= Math.floor(n);
  var randomChosenColors= randomColors[randomNumber];
  gamePattern.push(randomChosenColors);
  //for animation//
$("#" + randomChosenColors).fadeIn(100).fadeOut(100).fadeIn(100);
//for audio//
playSound(randomChosenColors);

}


$(".btn").click(function(){

  var userChosenColor= $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1)
});

function playSound(name){
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
  $("."+currentColor).addClass("pressed").removeClass("pressed");
},100);
}

function checkAnswer(currentLevel){

  if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
  {
    console.log("success");

        if(userClickedPattern.length===gamePattern.length){
           setTimeout(function(){
           nextSequence();
            }, 1000);
           }

  } else {

    console.log("wrong");
    //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
    playSound("wrong");

    //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

  }


  function startOver(){
    level=0;
    gamePattern=[];//for restarting the game we have to clear the game pattern also to startOver//
    started=false;
}
