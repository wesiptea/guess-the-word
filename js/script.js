const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
const playerGuess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");
// The two buttons have been selected by class names, ".guess" and ".play-again hide," to distiguish them from each other.

let word = "magnolia";
const guessedLetters = [];
// This empty array will contain all of the letters of player guesses
let remainingGuesses = 8;
// The above 'let' variables need to be defined using 'let' rather than const since their values need to be reassigned/changed as the code runs.

const getWord = async function () {
    const getWordAPI = await fetch (
    'https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt'
    );
    const words = await getWordAPI.text();
    const wordArray = words.split("\n");
    const selectRandomWord = Math.floor(Math.random() * wordArray.length); 
    word = wordArray[selectRandomWord].trim();   
    console.log(wordArray, selectRandomWord);
    placeholders(word);
}
getWord();



// Display the dots as placeholders for word letters
const placeholders = function(word) {
    const placeholdersForWord = [];
    // This empty array allows each letter of a selected word to be converted into an array.
    for (const letter of word) {
        // Declared a var called 'letter' to loop through letters of words = this is to ensure that every letter is a separate item.
        console.log(letter);

        placeholdersForWord.push("●");
        // This allows a dot to be pushed out for each letter of the selected word.
    }
    wordInProgress.innerText = placeholdersForWord.join("");
    // If you leave the .join() empty - commas will separate array items. If you include "" w/in the method, commas will not be included. 
    // ex: console.log(alphabet.join("")); // abc
}

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    // prevents the page from reloading when button is clicked and reseting everything on screen (clearing guessed letters, etc)
    
    message.innerText = "";
    // Empty message paragraph

    // Below: captures the value of the input. Logs out the value of the variable capturing the input. Then, empties the value of the input. 
    // .value is code which allows us to "capture" whatever is entered (playerGuess) into a form.
    let guess = playerGuess.value;
   
    const validGuess = validInput(guess);

    if (validGuess) {
        makeGuess(validGuess);            
    }
    playerGuess.value = "";
    // This empty string clears the box so the next letter can be guessed.
});

const validInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    // This code makes sure that only letters are accepted as input into form.
    if (input.length === 0) {
        message.innerText = "Whoops, you forgot to enter a letter!";
    } else if (input.length > 1) {
        message.innerText = "Please enter just 1 letter.";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please a letter (a-z or A-Z).";
    } else {
        return input;
    }
};

const makeGuess = function(guessedLetter) {
    guessedLetter = guessedLetter.toUpperCase();
    // Change all letters to uppercase to avoid issues with case sensitivity
    console.log("guessedLetter", guessedLetter);

    if (guessedLetters.includes(guessedLetter)) {
        message.innerText = "You have already guessed that letter, try a new letter."
    } else {
        guessedLetters.push(guessedLetter);
        // makeGuess(wordInProgress);
        guessesRemainingCount(guessedLetter);
        updatePageLetters();
        updateWordInProgress(guessedLetters);
    }
};

const updatePageLetters = function () {
    guessedLettersList.innerHTML = "";
    // clearing the list (above)

    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersList.append(li);
    } 
};

const updateWordInProgress = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const showWord = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            showWord.push(letter.toUpperCase());
        } else {
            showWord.push("●");
        }
    }
    wordInProgress.innerText = showWord.join("");
    checkIfWon();
};
// console.log(showWord);

const guessesRemainingCount = function (guess) {
    const uppercaseWord = word.toUpperCase();
    if (!uppercaseWord.includes(guess)) {
        message.innerText = `This word does not contain ${guess}. Try again!`;

        remainingGuesses -= 1;
        // -= subtracts from a value and assigns the variable the new result
    } else {
        message.innerText = `That was a good guess! This word has ${guess} in it!`;
    }
    
    if (remainingGuesses === 0) {
        message.innerHTML = `Sorry, you have run out of guesses! The word was <span class="highlight">${word}</span>. Try a new word!`;
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
    } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    }
};

const checkIfWon = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML =`<p class="highlight">You guessed correct the word! Congrats!</p>`;

        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesElement.classList.add("hide");
    guessedLettersList.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function() {
    message.classList.remove("win");
    guessedLetter = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersList.innerHTML = "";
    message.innerText = "";

    // Grab a new word from array
    getWord();

    // Revealing and hiding the correct UI elements
    guessButton.classList.add("hide");
    playAgainButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersList.classList.remove("hide");
});


