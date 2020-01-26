/**** WELCOME! *********************************************/
/**
 * Program your Bot to defeat a series of opponents! 
 * 
 * Game Summary:
 *  - Every .5 seconds, each Bot is able to make a
 * movement if they are touching the ground. Each movement expends 
 * a certain amount of energy when made, defined by the code running
 * the Bot. Higher energy used == bigger movement. A movement is either 
 * a jump or a dash. Bots gain a point when they jump on top of another
 * Bot or when their opponent Bot runs out of energy. For each round, 
 * the first Bot to 3 points wins!
 * 
 * Use the "Activity Documentation" button to read more about 
 * all the different ways you can control your bot
 * 
 * ----------------------------------------------------------
 * After making a change: save this file, then press the refresh
 * button above the game window!
 * ----------------------------------------------------------
 */

var myBot = this; // More readable/easier access
var opponent = this.opponent; // More readable/easier access


/**************** Start Modifying Here! *********************/

myBot.setName('Meep');
myBot.setColor(0x992222);
myBot.makeMove = function() {
  /*
    * Scene Width: 800
    * Scene Height: 480
    */
    //(1)if opp is in range,above bot, moving toward bot, bot x value is less than 650 and more than 150, and opp if left of bot
  if (opponent.isAbove(myBot) && opponent.distanceFrom(myBot)<150 && opponent.isMovingToward(myBot)&& myBot.getX()<650 && myBot.getX()>150 && opponent.isLeftOf(myBot)) {
    // (1)then bot will dash right
  myBot.dashRight(5)}

    //(2)if opp is in range,above bot, moving toward bot, bot x value is less than 650 and more than 150, and opp is right of bot
  else if (opponent.isAbove(myBot) && opponent.distanceFrom(myBot)<150 && opponent.isMovingToward(myBot)&& myBot.getX()<650 && myBot.getX()>150 && opponent.isRightOf(myBot)) {
    //(2) then bot will dash left
  myBot.dashLeft(5)}

    //(3) if opp is above,in range,moving toward bot, bot x value is more than 650, and opp is left of bot
  else if (opponent.isAbove(myBot) && opponent.distanceFrom(myBot)<150 && opponent.isMovingToward(myBot)&& myBot.getX()>650 && opponent.isLeftOf(myBot)){
    //(3)then bot will dash toward opp
  myBot.dashToward(opponent, 10)}

    //(4) if opp is above,in range,moving toward bot, bot x value is more than 650, and opp is right of bot
  else if (opponent.isAbove(myBot) && opponent.distanceFrom(myBot)<150 && opponent.isMovingToward(myBot)&& myBot.getX()>650 && opponent.isRightOf(myBot)){
    //(4)then bot will dash toward opp
  myBot.dashAwayFrom(opponent, 10)}

    //(5)if opp is above, in range,moving toward, bot x value is less than 150, and opponent is right of bot
  else if (opponent.isAbove(myBot) && opponent.distanceFrom(myBot)<150 && opponent.isMovingToward(myBot)&& myBot.getX()<150 && opponent.isRightOf(myBot)) {
    //(5)then bot will dash toward opp
  myBot.dashToward(opponent, 10)}

    //(6)if opp is above, in range,moving toward, bot x value is less than 150, and opponent is left of bot
  else if (opponent.isAbove(myBot) && opponent.distanceFrom(myBot)<150 && opponent.isMovingToward(myBot)&& myBot.getX()<150 && opponent.isLeftOf(myBot)) {
    //(6)then bot will dash toward opp
  myBot.dashAwayFrom(opponent, 10)}
  
  
  if (opponent.isAlive()===false && myBot.getX()===50===false) {
    //if opp is dead dash left
   myBot.dashRight(6)}
   else { if (myBot.getX()===50&&(opponent.xDistanceFrom(myBot)<150))
   myBot.dashLeft(10)}

   if (opponent.isMovingToward(myBot))  {
    //if opp X is less than 150 and above, dash left
   myBot.dashRight(5)}

   if (myBot.xDistanceFrom(opponent) > 150) {
    //if my bot is more than 150 away from opp, jump toward opp
   myBot.jumpToward(opponent, 10);} 
    
   else  {
   myBot.dashAwayFrom(opponent,5)
   }

  
};




/**** GOODBYE! ************************************************/

   // Paste your bot code in this file!