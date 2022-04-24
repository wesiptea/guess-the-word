const guessedLettersList = document.querySelector(".guessed-letters");
const guessButton = document.querySelector(".guess");
// This button is referred to by its class of "guess" to distiguish it from the second button below.
const playerGuess = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again hide");

const word = "magnolia";

// Display the dots as placeholders for word letters
const placeholders = function (word) {
    const placeholdersForWord = [];
    // This empty array allows each letter placeholder of the word to be an item in the array.
    for (const letter of word) {
        // declared a var called 'letter' - created for this loop = for converting every letter into a separate item
        console.log(letter);
        placeholdersForWord.push("●");
        // The above for...of loop enables the code to create a placeholder for each letter of target word 
    }
    wordInProgress.innerText = placeholdersForWord.join("");
    // If you leave the .join() empty - commas will separate array items. If you include "" then commas will not be included. ex: console.log(alphabet.join("")); // abc

}
placeholders(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    // this code above prevents the page from reloading when button is clicked and reset everything
    const guessedLetter = playerGuess.value;
    console.log(guessedLetter);
    playerGuess.value = "";
});