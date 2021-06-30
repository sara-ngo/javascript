const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const HEAL_VALUE = 20;

const MODE_ATTACK = "ATTACK"; //global var so easier to identify, avoid mistyping
const MODE_STRONG_ATTACK = "STRONG_ATTACK";
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "STRONG_PLAYER_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";


let battleLog = [];
let lastLoggedEntry;

function getMaxLifeValues() {
  const enteredValue = prompt("Maximum life for you and the monster.", "100"); //dialog when user can enter something
  const parsedValue = parseInt(enteredValue); //convert to int

  if (isNaN(parsedValue) || parsedValue <= 0) {
    //if it's not a number or a neg value
    throw { message: 'Invalid input. Not a number!'};
  }
  return parsedValue;
}

let chosenMaxLife;

try {
  chosenMaxLife = getMaxLifeValues();
} catch (error) {
  console.log(error);
  chosenMaxLife = 100;
  alert('You entered invalid value. Set to default value: 100.');
} 

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife); // from vendor

function writeToLog(event, value, monsterHealth, playerHealth) {
  let logEntry = {
    //create log obj
    event: event, //store event to event
    value: value,
    finalMonsterHealth: monsterHealth,
    finalPlayerHealth: playerHealth,
  };

  switch(event) { //replace if below
    case LOG_EVENT_PLAYER_ATTACK: 
      logEntry.target = 'MONSTER';
      break; //finish, don't evaluate other cases
    case LOG_EVENT_PLAYER_STRONG_ATTACK:
      logEntry.target = 'MONSTER';
      break;
    case LOG_EVENT_MONSTER_ATTACK:
      logEntry.target = 'PLAYER';
      break;
    case LOG_EVENT_PLAYER_HEAL:
      logEntry.target = 'PLAYER';
      break;
    case LOG_EVENT_GAME_OVER:
      logEntry;
      break;
    default: 
      logEntry = {}; //empty obj
  }

  // if (event === LOG_EVENT_PLAYER_ATTACK) {
  //   logEntry.target = "MONSTER";
  // } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
  //   logEntry.target = "MONSTER";
  // } else if (event === LOG_EVENT_MONSTER_ATTACK) {
  //   logEntry.target = "PLAYER";
  // } else if (event === LOG_EVENT_PLAYER_HEAL) {
  //   logEntry.target = "PLAYER";
  // } else if (event === LOG_EVENT_GAME_OVER) {
  //   logEntry;
  // }
  battleLog.push(logEntry); 
}

function reset() {
  // reset when the game is over
  currentPlayerHealth = chosenMaxLife; // update
  currentMonsterHealth = chosenMaxLife; // update
  resetGame(chosenMaxLife);
}

function endRound() {
  const initialPlayerHealth = currentPlayerHealth;
  const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE); //deal randomly
  currentPlayerHealth -= playerDamage; // update current health

  writeToLog(
    //record monster attack
    LOG_EVENT_MONSTER_ATTACK,
    playerDamage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  
  // check if game ends and bonus life available
  if (currentPlayerHealth <= 0 && hasBonusLife) {
    // if has a bonus life
    hasBonusLife = false;
    removeBonusLife();
    currentPlayerHealth = initialPlayerHealth; // reset
    alert("You would be dead but the bonus life save you!");
    setPlayerHealth(initialPlayerHealth); //update the bar, if not it will show 0
  }

  //print the result
  if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
    alert("You Won!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER WON",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
    alert("You lost!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "PLAYER LOST",
      currentMonsterHealth,
      currentPlayerHealth
    );
  } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
    alert("Tie!");
    writeToLog(
      LOG_EVENT_GAME_OVER,
      "TIE GAME",
      currentMonsterHealth,
      currentPlayerHealth
    );
  }

  //game over, reset the game
  if (currentPlayerHealth <= 0 || currentMonsterHealth <= 0) {
    reset();
  }
}

function attackMonster(attackType) {
  //this ternary opr replace the code below
  let damageValue = attackType === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
  let logEvent = attackType === MODE_ATTACK ? LOG_EVENT_PLAYER_ATTACK : LOG_EVENT_PLAYER_STRONG_ATTACK;
 
  // if (attackType === MODE_ATTACK) {
  //   damageValue = ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_ATTACK;
  // } else if (attackType === MODE_STRONG_ATTACK) {
  //   damageValue = STRONG_ATTACK_VALUE;
  //   logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
  // }

  const damage = dealMonsterDamage(damageValue); // deal randomly
  currentMonsterHealth -= damage; // update monster current health
  writeToLog(
    //record player attack
    logEvent,
    damage,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function attackHandler() {
  attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
  attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
  let healValue;
  if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
    alert("You can't heal to more than your max initial health.");
    healValue = chosenMaxLife - currentMonsterHealth; // heal up to max
  } else {
    healValue = HEAL_VALUE;
  }
  increasePlayerHealth(healValue); // from vendor
  currentPlayerHealth += healValue; // update current health
  writeToLog( //record heal value
    LOG_EVENT_PLAYER_HEAL,
    healValue,
    currentMonsterHealth,
    currentPlayerHealth
  );
  endRound();
}

function printLogHandler() {
  // for (let i=0; i<battleLog.length; i++) { //print every element on its own
  //   console.log(battleLog[i]);
  // }
  let i=0; 
  for (const logEntry of battleLog) { //for-of loop
    if ((!lastLoggedEntry && lastLoggedEntry !== 0) || lastLoggedEntry < i) { //control console
      console.log(`#${i}`); //number of log
      for (const key in logEntry) {
        console.log(`${key} => ${logEntry[key]}`);
        // console.log(key); //for-in loop
        // console.log(logEntry['event']); //simlar to console.log(logEntry.event)
      }
      lastLoggedEntry = i;
      break;
    }
    i++;
  }
  //console.log(battleLog); //no loop
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", printLogHandler);
