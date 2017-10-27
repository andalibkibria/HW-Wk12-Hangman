// Option to display the word while testing the game
var test = require("./hangman_modules/test")(process.argv);

const Word = require("./hangman_modules/word");
const Letter = require("./hangman_modules/letter");

var inquirer = require('inquirer');
var word = null;


function startGame() {
	word = new Word;
	word.mask.map(item => {
		word.wordCopy += item;
	});
	if (test) {
		console.log(`WORD: ${word.word}`);
	}
	console.log(`\n${word.wordCopy}\n\n`);

	inquirer.prompt([ {
		type: 'input',
		name: 'entry',
		message: "Guess a letter. Hint: The word is a programming language\n",
		validate: function (value) {
			return new Letter(value, word).validate();
		}
	}
	]).then(answers => {
		var entry = answers.entry.toUpperCase();
		var isQuitter = entry === 'QUIT' || entry === 'EXIT';

		if (isQuitter) {
			return false;
		} else {
			playAgain();
		}
	});
}

function playAgain() {
	inquirer.prompt([ {
		type: 'list',
		name: 'playagain',
		message: 'Want to play again?',
		choices: ['YES', 'NO'],
	}]).then(answers => {
		if (answers.playagain === 'YES') {
			startGame();
		} else {
			process.exit();
		}
	});
}

startGame();