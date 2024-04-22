/**********************************************
 * STARTER CODE
 **********************************************/

/**
 * shuffle()
 * Shuffle the contents of an array
 *   depending the datatype of the source
 * Makes a copy. Does NOT shuffle the original.
 * Based on Steve Griffith's array shuffle prototype
 * @Parameters: Array or string
 * @Return: Scrambled Array or string, based on the provided parameter
 */
function shuffle (src) {
  const copy = [...src]

  const length = copy.length
  for (let i = 0; i < length; i++) {
    const x = copy[i]
    const y = Math.floor(Math.random() * length)
    const z = copy[y]
    copy[i] = z
    copy[y] = x
  }

  if (typeof src === 'string') {
    return copy.join('')
  }

  return copy
}

/**********************************************
 * YOUR CODE BELOW
 **********************************************/

 const { useState, useEffect } = React;

 const wordList = [
  "red",
  "blue",
  "green",
  "yellow",
  "orange",
  "purple",
  "pink",
  "black",
  "white",
  "brown"
];


const shuffledWordList = shuffle(wordList);
function shuffleWord(word){
  const letters = word.split('');
  const shuffledLetters = shuffle(letters);
  return shuffledLetters.join('');
}
function App() {
  const [currentWord, setCurrentWord] = useState('false');
  const [inputValue, setInputValue] = useState('');
  const [points, setPoints] = useState(0);
  const [passesRemaining, setPassesRemaining] = useState(5);
  const [message, setMessage] = useState('');


  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    return wordList[randomIndex];
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleCheckAnswer = () => {
    if (inputValue.toLowerCase() === currentWord) {
      setPoints(points + 1);
      setMessage('Correct! Next word.');
      setCurrentWord(shuffle(wordList)[0]);
      setInputValue('');
    } else {
      setMessage('Wrong! Try again.');
      setInputValue('');
    }
  };

  const handlePass = () => {
    if (passesRemaining > 0) {
      setPassesRemaining(passesRemaining - 1);
      setCurrentWord(getRandomWord());
      setInputValue('');
    } else {
      setMessage('No passes remaining.');
    }
  };
//local storage
useEffect(() => {
  setCurrentWord(shuffleWord(getRandomWord()));
  const savedGameState = JSON.parse(localStorage.getItem('scrambleGameState'));
  if (savedGameState) {
    setCurrentWord(savedGameState.currentWord);
    setPoints(savedGameState.points);
    setPassesRemaining(savedGameState.passesRemaining);
  } else {
    setCurrentWord(getRandomWord());
  }
   return () =>{

   };
}, []);

// Save game state to local storage whenever it changes
useEffect(() => {
  
  localStorage.setItem('scrambleGameState', JSON.stringify({
    currentWord,
    points,
    passesRemaining
  }));
}, [currentWord, points, passesRemaining]);

  // Initial setup
  useState(() => {
    setCurrentWord(getRandomWord());
  }, []);

  return (
    <div className='word_scramble'>
      <div className='message'>{message}</div>
      <h1>Welcome to Scramble</h1>
      <p>Points: {points}</p>
      <p>Passes Remaining: {passesRemaining}</p>

      
      
      <div className='content'>
      <p>Guess the word:</p>
      <p>{currentWord}</p>

        <input type='text' value={inputValue} onChange={handleInputChange} />
        <button onClick={handleCheckAnswer}>Submit</button>
        <button onClick={handlePass}>Pass</button>
      </div>
    </div>
  );
}

//   return(
//     <div className='word_scramble'>
//       <div className='correct_message'>
//         <p>Correct,Next word</p>
//       </div>
//       <div className='wrong_message'>
//         <p>Wrong,Try again</p>
//       </div>
//       <h1>Welcome to Scramble</h1>
//       <p>Points</p>
//       <p>Starts</p>
      
//       <div className='content'>
//         <input type='text'/>
//         <button>Passes Remaining</button>

//       </div>
//     </div>
//   )
// }


const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)

