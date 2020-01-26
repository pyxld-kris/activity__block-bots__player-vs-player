/**
 * @author       Kris Gano <kris@pyxld.com>
 * @copyright    2019 Dev Launchers
 * @license      {@link https://opensource.org/licenses/MIT|MIT License}
 */

import Phaser from "phaser";
import BattleSquare from "./BattleSquare";
import BattleSquareInfoArea from "./BattleSquareInfoArea";
import CenteredTimedText from "./CenteredTimedText";

/* botStageFiles olds strings that determine the order bots will be loaded into the game based
 * on the stage the player has reached */
var stageConfigs = [
  {
    stageIntroText: "Initializing\nBot Battles...",
    botFile: "short-jump.mjs"
  },
  {
    stageIntroText: "Stage Cleared!",
    botFile: "random-jump-height.mjs"
  },
  /*
  {
    stageIntroText: "Stage Cleared!",
    botFile: "random-short-jump.mjs"
  },
  */
  {
    stageIntroText: "Stage Cleared!",
    botFile: "random-high-jumps.mjs"
  },
  {
    stageIntroText: "Stage Cleared!",
    botFile: "big-jump-aggro.mjs"
  },
  {
    stageIntroText: "Stage Cleared!",
    botFile: "measured-long-jump-attack.mjs"
  },
  {
    stageIntroText: "Final Stage!!!",
    botFile: "dash-dodge-jump-kill.mjs"
  }
  /*
  "short-jump.mjs",
  "random-jump-height.mjs",
  "random-short-jump.mjs",
  "random-high-jumps.mjs",
  "big-jump-aggro.mjs",
  "measured-long-jump-attack.mjs",
  "dash-dodge-jump-kill.mjs"
*/
];

export default class StageManager {
  constructor(scene) {
    this.scene = scene;

    this.botEntities = []; // Holds references to all bots that are a part of this stage

    this.stageNum = 0;
    this.displayText = scene.add
      .text(scene.game.config.width / 2, 20, "Stage: " + this.stageNum, {
        fontSize: "32px",
        fontFamily: '"Press Start 2P"',
        align: "center",
        padding: { x: 1, y: 1 },
        backgroundColor: "transparent",
        fill: "#000000",
        stroke: "#ffffff",
        strokeThickness: 8
      })
      .setOrigin(0.5, 0.5)
      .setScrollFactor(0)
      .setResolution(3) // Makes text more crisp
      .setScale(0.5) // Makes text more crisp
      .setDepth(100);
  }

  // Must be called after this stage manager has been created, and bots have been added
  init() {
    this.nextStage();
  }

  updateDisplay() {
    this.displayText.setText("Round: " + this.stageNum);
  }

  addBot(x, y) {
    let thisBot = new BattleSquare(this.scene, x, y);
    this.botEntities.push(thisBot);

    // Hook into thisBot's "point-scored" event to check when we should transition to new levels
    thisBot.events.on("pointscored", () => {
      // Check the current score of each bot to see if one has won
      for (let i = 0; i < this.botEntities.length; i++) {
        let bot = this.botEntities[i];
        if (bot.getScore() >= 3) {
          new CenteredTimedText(
            this.scene,
            bot.name + " Wins!",
            {},
            5000,
            () => {}
          );

          this.resetAllBots();
          this.updateDisplay();
        }
      }
    });

    // Add BattleSquareInfoArea for this BattleSquare
    let oneFourthWidth = this.scene.game.config.width / 2;
    new BattleSquareInfoArea(
      this.scene,
      thisBot,
      oneFourthWidth / 2 + oneFourthWidth * (this.botEntities.length - 1),
      400
    );

    return thisBot;
  }

  nextStage() {
    this.stageNum++;
    this.updateDisplay();
  }

  resetAllBots() {
    for (let i = 0; i < this.botEntities.length; i++) {
      let bot = this.botEntities[i];
      bot.fullReset();
    }
  }

  resetStage() {
    this.resetAllBots();
  }

  destroy() {
    // Remove this object's update listener from the scene
    this.scene.events.off("update", this.update, this);

    // Call this object's parent class destroy method
    super.destroy();
  }
}

/***************************/
/* HELPER FUNCTIONS FOLLOW */
/***************************/

/*
 * evalWithinContext()
 * Allows a string of javascript code to be executed within the given scope/context
 * Used after fetching student code in order to run it within the current Phaser scene
 *     (Keeps student coding interface clean)
 */
var evalWithinContext = function(context, code) {
  (function(code) {
    eval(code);
  }.apply(context, [code]));
};

/*
 * loadModifyCode()
 * Loads the 'modify.mjs' file students will be making changes in, and executes it in the
 * current module's scope. We're using this method instead of import to maintain scene scope
 * and keep import/export out of the modify.js script. This makes it more simple for the
 * students to work with.
 */
// Let's load the modify.js script and run it in this scope!
// using this method instead of import to maintain scene scope and keep import/export
//    out of the modify.js script. More simple for students to work with
function loadModifyCode(scene) {
  loadScriptWithinContext("../modify.mjs", scene);
}
function loadScriptWithinContext(path, context) {
  /* eslint-disable */
  let codeText = fetch(path)
    .then(function(response) {
      return response.text();
    })
    .then(function(textString) {
      evalWithinContext(context, textString);
    });
  /* eslint-enable */
}
