// src/game/functions.js
import { QUESTIONS } from "./questions.js";
import playerImg from "../assets/player.png";
import q1Img from "../assets/q1.png";
import q2Img from "../assets/q2.png";
import q3Img from "../assets/q3.png";
import q4Img from "../assets/q4.png";
import q5Img from "../assets/q5.png";
import q6Img from "../assets/q6.png";
import q7Img from "../assets/q7.png";
import q8Img from "../assets/q8.png";
import q9Img from "../assets/q9.png";
import q10Img from "../assets/q10.png";
import q11Img from "../assets/q11.png";
import q12Img from "../assets/q12.png";
import q13Img from "../assets/q13.png";
import q14Img from "../assets/q14.png";
import q15Img from "../assets/q15.png";
import q16Img from "../assets/q16.png";
import q17Img from "../assets/q17.png";
import q18Img from "../assets/q18.png";
import q19Img from "../assets/q19.png";
import q20Img from "../assets/q20.png";
import q21Img from "../assets/q21.png";
import q22Img from "../assets/q22.png";
import q23Img from "../assets/q23.png";
import q24Img from "../assets/q24.png";
import q25Img from "../assets/q25.png";
import q26Img from "../assets/q26.png";

const backgroundImages = [
  q1Img,q2Img,q3Img,q4Img,q5Img,q6Img,q7Img,q8Img,q9Img,q10Img,
  q11Img,q12Img,q13Img,q14Img,q15Img,q16Img,q17Img,q18Img,q19Img,q20Img,
  q21Img,q22Img,q23Img,q24Img,q25Img,q26Img
];

// ---------------- ASSETS ----------------
export function loadAssets(game){
  game.loadSprite("player", playerImg);
  backgroundImages.forEach((img,index) => {
    game.loadSprite(`q${index+1}`, img);
  });
}

// ---------------- BACKGROUND ----------------
export function loadBackground(game,key){
  game.destroyAll("background");
  const bg = game.add([game.sprite(key), game.pos(0,0), game.fixed(), "background"]);
  const scaleX = game.width()/bg.width;
  const scaleY = game.height()/bg.height;
  const scaleFactor = Math.max(scaleX, scaleY);
  bg.scale = scaleFactor;
}

// ---------------- EARTHQUAKE EFFECT ----------------
export function addEarthquakeEffects(game){
  game.loop(0.2, () => {
    if(Math.random()<0.1) game.shake(1);
  });

  // destroy previous dust if any then recreate (prevents accumulation)
  game.destroyAll("dust");
  for(let i=0;i<20;i++){
    game.add([game.circle(2), game.pos(Math.random()*game.width(), Math.random()*game.height()), game.color(200,200,200), game.opacity(0.4), "dust"]);
  }

  game.onUpdate("dust",(d) => {
    d.pos.y -= 0.5;
    d.pos.x += Math.sin(game.time()*2+d.pos.x)*0.1;
    d.opacity = Math.sin(game.time()*3+d.pos.x)*0.5+0.5;
    if(d.pos.y<-10){
      d.pos.y = game.height()+10;
      d.pos.x = Math.random()*game.width();
    }
  });
}

// ---------------- UI ----------------
export function addQuestionBanner(game,text){
  game.destroyAll("questionBanner");
  game.add([game.rect(game.width(),80), game.pos(0,0), game.color(0,0,0), game.fixed(), "questionBanner"]);
  const textSize = Math.max(12, Math.min(20, game.width()/40));
  game.add([game.text(text,{size: textSize, width: game.width()-40}), game.pos(game.width()/2,60), game.anchor("center"), game.color(255,255,255), game.fixed(), "questionBanner"]);
}

export function addCharacterDisplay(game,emoji){
  game.destroyAll("characterDisplay");
  game.add([game.text(emoji,{size:48}), game.pos(game.width()-60,40), game.anchor("center"), game.fixed(), "characterDisplay"]);
}

export function addScoreDisplay(game,gameState){
  game.destroyAll("scoreDisplay");
  const textSize = Math.max(12, Math.min(18, game.width()/60));
  game.add([game.text(`Score: ${gameState.score}/${gameState.totalQuestions}`,{size:textSize}), game.pos(20,20), game.color(255,255,0), game.fixed(), "scoreDisplay"]);
}

// ---------------- PLAYER ----------------
export function addPlayer(game){
  const startX = game.width() / 2;
  const startY = game.height() /2;
  const boxW = Math.min(250, game.width() * 0.45);
  const boxH = Math.min(75, game.height() * 0.12);

  game.destroyAll("player");

  const player = game.add([
    game.sprite("player"),
    game.pos(startX, startY),
    game.anchor("center"),
    game.area({
      shape: new game.Rect(game.vec2(0), boxW, boxH), // Dynamic sizing
      offset: game.vec2(-boxW/2, -boxH/2)
    }),
    game.scale(0.4),
    game.z(100),
    "player"
  ]);

  console.log("Player created - setting up controls");

  // FIX 1: Use proper key handling with dt (delta time)
  game.onKeyDown("left", () => {
    player.move(-300, 0);
    console.log("LEFT pressed");
  });
  
  game.onKeyDown("right", () => {
    player.move(300, 0);
    console.log("RIGHT pressed");
  });
  
  game.onKeyDown("up", () => {
    player.move(0, -300);
    console.log("UP pressed");
  });
  
  game.onKeyDown("down", () => {
    player.move(0, 300);
    console.log("DOWN pressed");
  });

  // Alternative WASD keys
  game.onKeyDown("a", () => player.move(-300, 0));
  game.onKeyDown("d", () => player.move(300, 0));
  game.onKeyDown("w", () => player.move(0, -300));
  game.onKeyDown("s", () => player.move(0, 300));

  // FIXED: Use mouseDown with proper position access
  let targetPos = null;
  
  game.onMouseDown((pos) => {
    // pos should already be in game coordinates
    targetPos = pos;
    console.log("Mouse pressed at:", pos.x, pos.y);
  });

  // Alternative: If the above doesn't work, use this:
  game.onMouseDown(() => {
    const mousePos = game.mousePos();
    targetPos = mousePos;
    console.log("Mouse pressed at (mousePos):", mousePos.x, mousePos.y);
  });

  player.onUpdate(() => {
    if (targetPos) {
      const speed = 400;
      const dx = targetPos.x - player.pos.x;
      const dy = targetPos.y - player.pos.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      console.log("Moving toward:", targetPos.x, targetPos.y, "distance:", dist);
      
      if (dist < 5) {
        player.pos.x = targetPos.x;
        player.pos.y = targetPos.y;
        targetPos = null;
        console.log("Reached target");
      } else {
        player.pos.x += (dx / dist) * speed * game.dt();
        player.pos.y += (dy / dist) * speed * game.dt();
      }
    }
  });

  return player;
}

// ---------------- ANSWERS ----------------
export function addAnswerOptions(game,options,gameState){
  // dynamic padding so options aren't too close on small screens
  const paddingX = Math.max(120, Math.min(220, game.width() * 0.18));
  const paddingY = Math.max(120, Math.min(220, game.height() * 0.18));

  const positions = [
    {x: paddingX, y: game.height()-paddingY},
    {x: game.width()-paddingX, y: game.height()-paddingY},
    {x: paddingX, y: paddingY},
    {x: game.width()-paddingX, y: paddingY}
  ];

  game.destroyAll("answerOption");
  game.destroyAll("answerText");

  options.forEach((opt,i) => {
    if(i < positions.length){
      const pos = positions[i];
      // use a slightly smaller hit box visual if needed
      const boxW = Math.min(250, game.width() * 0.45);
      const boxH = Math.min(75, game.height() * 0.12);
      game.add([game.rect(boxW, boxH), game.pos(pos.x - boxW/2, pos.y - boxH/2), game.color(210,180,140), game.area(), "answerOption", { option: opt }]);
      const textSize = Math.max(12, Math.min(16, Math.floor(boxW / 16)));
      game.add([game.text(opt.text, { size: textSize, width: boxW, align: "center" }), game.pos(pos.x, pos.y), game.anchor("center"), game.color(0,0,0), game.fixed(), "answerText"]);
    }
  });

  // collision handler
  game.onCollide("player","answerOption",(p,optObj) => {
    if(gameState && !gameState.isTransitioning){
      selectAnswer(game, optObj.option, gameState);
    }
  });
}

export function selectAnswer(game, option, gameState){
  // prevent accidental double triggers
  gameState.isTransitioning = true;
  if(option.correct) gameState.score++;

  game.add([game.text(option.correct ? "Correct!" : "Unsafe Choice", { size: 32 }), game.pos(game.width()/2, game.height()/2), game.anchor("center"), option.correct ? game.color(0,255,0) : game.color(255,0,0), game.fixed()]);

  game.wait(1.5, () => {
    if(option.nextQuestion === -1) game.go("end");
    else loadQuestion(game, option.nextQuestion, gameState);
  });
}
// Add this temporary debug function to test controls
function addDebugControls(game) {
  game.onKeyPress("space", () => {
    console.log("SPACE pressed - player at:", game.get("player")[0].pos);
  });
  
  // Add arrow key indicators
  game.add([
    game.text("Use ARROW KEYS or WASD to move", { size: 16 }),
    game.pos(game.width() / 2, game.height() - 30),
    game.anchor("center"),
    game.color(255, 255, 0),
    game.fixed(),
    "debugText"
  ]);
}

// ---------------- LOAD QUESTION ----------------
export function loadQuestion(game, questionId, gameState) {
  const question = QUESTIONS.find(q => q.id === questionId);
  if (!question) { game.go("end"); return; }

  gameState.currentQuestion = questionId;

  // Clean up previous elements
  ["background","questionBanner","characterDisplay","scoreDisplay","answerOption","answerText","debugMarker","debugText"].forEach(tag => {
    game.destroyAll(tag);
  });

  // Load background and effects
  loadBackground(game, question.background);
  addEarthquakeEffects(game);

  // UI
  addQuestionBanner(game, question.text);
  addCharacterDisplay(game, question.character);
  addScoreDisplay(game, gameState);

  // Player - ALWAYS recreate to ensure fresh controls
  addPlayer(game);
  
  // Debug
  addDebugControls(game);
  
  // Add answer options
  addAnswerOptions(game, question.options, gameState);

  gameState.isTransitioning = false;
}



