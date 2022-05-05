const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
// Buttons have been selected w class names, "guess" and "play-again hide," to distiguish them from each other.
const playerGuess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again hide");

const word = "magnolia";
const guessedLetters = [];
// This empty array will contain all of the letters of player guesses

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
placeholders(word);

guessButton.addEventListener("click", function(e) {
    e.preventDefault();
    // prevents the page from reloading when button is clicked and reseting everything on screen (clearing guessed letters, etc)
    
    message.innerText = "";
    // Empty message paragraph

    // Below: captures the value of the input. Logs out the value of the variable capturing the input. Then, empties the value of the input. 
    // .value is code which allows us to "capture" whatever is entered (playerGuess) into a form.
    const guess = playerGuess.value;
   
    const validGuess = validInput(guess);

    if (validGuess) {
        makeGuess(guess);            
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
    
    if (guessedLetters.includes(guessedLetter)) {
        message.innerText = "You have already guessed that letter, try a new letter."
    } else {
        guessedLetters.push(guessedLetter);
    }
    console.log(guessedLetters);
};

