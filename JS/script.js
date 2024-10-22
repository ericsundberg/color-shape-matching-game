const svgTemplates = {
    circle: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <circle cx="50" cy="50" r="50" fill="currentColor"/>
        </svg>`,
    square: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <rect width="100" height="100" fill="currentColor"/>
        </svg>`,
    triangle: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <polygon points="50,0 100,100 0,100" fill="currentColor"/>
        </svg>`,
    star: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
            <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" fill="currentColor"/>
        </svg>`,
    rectangle: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" width="100" height="100">
            <rect width="100" height="50" fill="currentColor"/>
        </svg>`,
    oval: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" width="100" height="100">
            <ellipse cx="50" cy="25" rx="50" ry="25" fill="currentColor"/>
        </svg>`,
    heart: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor"/>
        </svg>`,
    diamond: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100" height="100">
            <polygon points="12,2 22,12 12,22 2,12" fill="currentColor"/>
        </svg>`,
    octagon: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <polygon points="30,0 70,0 100,30 100,70 70,100 30,100 0,70 0,30" fill="currentColor"/>
        </svg>`,
    pentagon: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <polygon points="50,0 100,38 82,100 18,100 0,38" fill="currentColor"/>
        </svg>`,
    hexagon: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <polygon points="25,0 75,0 100,50 75,100 25,100 0,50" fill="currentColor"/>
        </svg>`,
    crescent: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2500 2500" width="100" height="100">
            <path d="M826.8,1250c0-615.6,491.2-1116.5,1103.1-1132.1C1768.8,42.3,1589,0,1399.3,0C709,0,149.3,559.6,149.3,1250 
                s559.6,1250,1250,1250c189.7,0,369.5-42.3,530.6-117.9C1318,2366.5,826.8,1865.6,826.8,1250z" fill="currentColor"/>
        </svg>`,
    cross: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
            <path d="M35 5h30v30h30v30h-30v30h-30v-30H5v-30h30z" fill="currentColor"/>
        </svg>`,
    trapezoid: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" width="100" height="100">
            <polygon points="20,50 80,50 90,0 10,0" fill="currentColor"/>
        </svg>`,
    semicircle: `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100" width="100" height="100">
            <path d="M 0 100 A 100 100 0 0 1 200 100 Z" fill="currentColor"/>
        </svg>`
};

// Function to get a random element from an array
function getRandomChoice(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Function to shuffle the elements of an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shapes = {
    easy: ["circle", "square", "triangle"],
    medium: ["rectangle", "oval", "star"],
    hard: ["heart", "diamond", "octagon"],
    advanced: ["pentagon", "hexagon", "crescent"],
    complex: ["cross", "trapezoid", "semicircle"]
};

const colors = {
    easy: ["red", "blue", "yellow"],
    medium: ["green", "orange"],
    hard: ["purple", "pink"]
};

// Difficulty and user performance variables
let colorLevel = 0; // 0 for easy, 1 for medium, 2 for hard
let shapeLevel = 0; // 0 for easy, 1 for medium, 2 for hard
let correctAnswers = 0;
let totalQuestions = 0;
let incorrectAnswers = 0;
let correctInRow = 0; // To track consecutive correct answers

let correctAnswer;
let lastTwoQuestions = [];
let lastIncorrectClip = null;
let firstRound = true;

// Global Audio Variables
let chordInterval; // Store interval reference for continuous chords
let noteIndex = 0; // Track current note in the sequence

// Chord Definitions
const chordFiles = {
    I: 'Assets/Sounds/sc_c_chord.mp3',
    ii: 'Assets/Sounds/sc_dm_chord.mp3',
    iii: 'Assets/Sounds/sc_em_chord.mp3',
    IV: 'Assets/Sounds/sc_f_chord.mp3',
    V: 'Assets/Sounds/sc_g_chord.mp3'
};

// Predefined Chord Progressions (Roman numeral notation)
// Each progression corresponds to an array of chord symbols in sequence
const chordProgressions = [
    ['ii', 'V', 'I'],              // ii-V-I
    ['I', 'IV', 'V', 'I'],          // I-IV-V-I
    ['I', 'iii', 'IV', 'V'],        // I-iii-IV-V
    ['I', 'V', 'iii', 'IV', 'I'],   // I-V-iii-IV-I
    ['ii', 'iii', 'IV', 'V', 'I'],  // ii-iii-IV-V-I
    ['I', 'IV', 'ii', 'V', 'I']     // I-IV-ii-V-I
];

let currentProgression = []; // Stores the current progression
let chordIndex = 0; // Tracks the current chord in the progression

const noteFiles = [
    'Assets/Sounds/sc_c1_bass.mp3',
    'Assets/Sounds/sc_d1_bass.mp3',
    'Assets/Sounds/sc_e1_bass.mp3',
    'Assets/Sounds/sc_f1_bass.mp3',
    'Assets/Sounds/sc_g1_bass.mp3',
    'Assets/Sounds/sc_a1_bass.mp3',
    'Assets/Sounds/sc_b1_bass.mp3',
    'Assets/Sounds/sc_c2_bass.mp3'
];

// Function to Play the Next Note in Sequence
function playNextNote() {
    const currentNote = new Audio(noteFiles[noteIndex]);
    currentNote.play();

    // Increment the note index, wrap to 0 if end of the array is reached
    noteIndex = (noteIndex + 1) % noteFiles.length;
}

// Function to Select a New Progression Randomly
function selectNewProgression() {
    currentProgression = getRandomChoice(chordProgressions); // Randomly select a progression
    chordIndex = 0; // Reset index for the new progression
}

// Define a volume level (0.0 is mute, 1.0 is max volume)
const chordVolume = 0.5; // Set to 50% volume (adjust as needed)

// Function to Play the Next Chord in the Progression
function playNextChord() {
    const chordSymbol = currentProgression[chordIndex]; // Get the current chord symbol (e.g., 'ii')
    const chordFile = chordFiles[chordSymbol]; // Get the corresponding audio file

    const chordAudio = new Audio(chordFile);
    chordAudio.volume = chordVolume; // Set the volume

    chordAudio.play();

    // Move to the next chord, wrap to the beginning if at the end of the progression
    chordIndex = (chordIndex + 1) % currentProgression.length;

    // If we just completed a progression, select a new one
    if (chordIndex === 0) {
        selectNewProgression();
    }
}


// Function to Start the Chord Progression Loop
function startChordProgressionLoop() {
    selectNewProgression(); // Select an initial progression
    playNextChord(); // Play the first chord immediately
    chordInterval = setInterval(playNextChord, 6000); // Play next chords every 6 seconds
}

// Function to Stop the Chord Progression Loop (if needed)
function stopChordProgressionLoop() {
    clearInterval(chordInterval);
}

// Generate Combined Levels for Colors and Shapes
function getCombinedLevels(level, data) {
    let combined = [];
    for (let i = 0; i <= level; i++) {
        combined = combined.concat(data[getDifficultyLevel(i)]);
    }
    return combined;
}

// Adjust Difficulty Level to include new levels
function getDifficultyLevel(level) {
    const levels = ["easy", "medium", "hard", "advanced", "complex"];
    return levels[Math.min(level, levels.length - 1)];
}

function generateValidQuestion() {
    const colorsCombined = getCombinedLevels(colorLevel, colors);
    const shapesCombined = getCombinedLevels(shapeLevel, shapes);

    let validQuestion;
    do {
        const color = getRandomChoice(colorsCombined);
        const shape = getRandomChoice(shapesCombined);
        validQuestion = { color, shape };
    } while (lastTwoQuestions.some(
        q => q.color === validQuestion.color && q.shape === validQuestion.shape
    ));
    lastTwoQuestions.push(validQuestion);
    if (lastTwoQuestions.length > 2) lastTwoQuestions.shift();
    return validQuestion;
}

function generateChoices(correctChoice, numChoices) {
    const colorsCombined = getCombinedLevels(colorLevel, colors);
    const shapesCombined = getCombinedLevels(shapeLevel, shapes);

    const usedCombinations = new Set([`${correctChoice.color}-${correctChoice.shape}`]);
    const choices = [correctChoice];
    while (choices.length < numChoices) {
        const color = getRandomChoice(colorsCombined);
        const shape = getRandomChoice(shapesCombined);
        const key = `${color}-${shape}`;
        if (!usedCombinations.has(key)) {
            usedCombinations.add(key);
            choices.push({ color, shape });
        }
    }
    return shuffleArray(choices);
}

function createShapeElement(color, shape) {
    const element = document.createElement("div");
    element.classList.add("shape-container");

    if (svgTemplates[shape]) {
        let svgMarkup = svgTemplates[shape];
        svgMarkup = svgMarkup.replace('currentColor', color);
        element.innerHTML = svgMarkup;
    }

    element.onclick = () => handleChoice(color, shape);
    return element;
}

// Modify the Shape Click to Play Notes in Sequence on Interaction
function handleChoice(selectedColor, selectedShape) {
    const [correctColor, correctShape] = correctAnswer;
    const feedback = document.getElementById("feedback");

    if (selectedColor === correctColor && selectedShape === correctShape) {
        correctAnswers++;
        correctInRow++;
        feedback.textContent = "Correct! Good job.";
        feedback.classList.add('show'); // Add show class
        playNextNote(); // Play the next note in sequence
        playRandomCorrectClip().then(() => setTimeout(nextRound, 500));
    } else {
        incorrectAnswers++;
        correctInRow = 0;
        feedback.textContent = "That's not it, try again.";
        feedback.classList.add('show'); // Add show class
        playRandomIncorrectClip();
    }

    totalQuestions++;
    adjustDifficulty(); // Adjust difficulty based on performance
}

// Adjust Difficulty Logic
function adjustDifficulty() {
    if (correctInRow >= 4 && shapeLevel < 4) {
        shapeLevel++;
        colorLevel = Math.min(colorLevel + 1, 2);
        correctInRow = 0;
    } else if (totalQuestions >= 10 && incorrectAnswers / totalQuestions >= 0.6) {
        shapeLevel = Math.max(0, shapeLevel - 1);
        colorLevel = Math.max(0, colorLevel - 1);
    }
}
function playVoiceClips(color, shape) {
    const colorClip = new Audio(`Assets/Sounds/vc_${color}.mp3`);
    const shapeClip = new Audio(`Assets/Sounds/vc_${shape}.mp3`);
    colorClip.play();
    colorClip.onended = () => shapeClip.play();
}

function playRandomCorrectClip() {
    const clipNumber = Math.floor(Math.random() * 4) + 1;
    const correctClip = new Audio(`Assets/Sounds/vc_correct_${clipNumber}.mp3`);
    return new Promise(resolve => {
        correctClip.play();
        correctClip.onended = resolve;
    });
}

function playRandomIncorrectClip() {
    let clipNumber;
    do {
        clipNumber = Math.floor(Math.random() * 3) + 1;
    } while (clipNumber === lastIncorrectClip);
    lastIncorrectClip = clipNumber;
    const incorrectClip = new Audio(`Assets/Sounds/vc_incorrect_${clipNumber}.mp3`);
    incorrectClip.play();
}

let lastWhichClip = null; // To track the last "which is the" clip played

// Function to play a "which is the" clip
function playWhichClip() {
    let clipNumber;
    do {
        clipNumber = Math.floor(Math.random() * 4) + 1; // Random number between 1 and 4
    } while (clipNumber === lastWhichClip);
    lastWhichClip = clipNumber;

    const whichClip = new Audio(`Assets/Sounds/vc_which_is_the_${clipNumber}.mp3`);
    return new Promise(resolve => {
        whichClip.play();
        whichClip.onended = resolve;
    });
}

// Update the nextRound function to include the new "which is the" audio clip
function nextRound() {
    const feedback = document.getElementById("feedback");
    feedback.classList.remove('show'); // Hide feedback between rounds

    const choicesContainer = document.getElementById("choices");
    const instruction = document.getElementById("instruction");

    choicesContainer.innerHTML = "";
    feedback.textContent = ""; // Clear feedback message

    const correctChoice = generateValidQuestion();
    correctAnswer = [correctChoice.color, correctChoice.shape];

    instruction.textContent = `Which is the ${correctChoice.color} ${correctChoice.shape}?`;

    if (firstRound) {
        const greetingClip = new Audio('Assets/Sounds/vc_hi_arty.mp3');
        greetingClip.play();
        greetingClip.onended = () => {
            playWhichClip().then(() => {
                playVoiceClips(correctChoice.color, correctChoice.shape);
            });
        };
        firstRound = false;
    } else {
        playWhichClip().then(() => {
            playVoiceClips(correctChoice.color, correctChoice.shape);
        });
    }

    const choices = generateChoices(correctChoice, 3);
    choices.forEach(choice => {
        const shapeElement = createShapeElement(choice.color, choice.shape);
        choicesContainer.appendChild(shapeElement);
    });

    choicesContainer.style.display = "flex";
}

// Start the chord progression loop when the game starts
document.getElementById("startButton").onclick = () => {
    document.getElementById("startButton").style.display = "none";
    startChordProgressionLoop(); // Start playing chords in progression
    nextRound();
};