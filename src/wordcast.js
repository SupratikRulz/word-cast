import { randomBetween } from './utils';

let math = Math,
  cos = math.cos,
  sin = math.sin;
class WordCast {

  /**
   * Creates an instance of WordCast.
   * @param {element} [rootElement=null] 
   * @param {array} [wordList=[]] 
   * 
   * @memberOf WordCast
   */
  constructor (rootElement = null, wordList = ['Thanks', 'For', 'Using', 'WordCast']) {
    this.rootElement = rootElement;
    this.wordList = wordList;
    this.colorPalette = ['#000000'];
    this.minFontSize = 8;
    this.maxFontSize = 16;
    this.fontFamily = 'sans-serif';
    this.wordsInCloud = [];
    this.xPadding = 3;
    this.yPadding = 3;
    this.cloudSpread = 365;
    this._x = 0;
    this._y = 0;
    this._startingPoint = {
      x: 0,
      y: 0
    };
    this.elementCreated = 0;
  }

  /**
   * Function to set the root element inside which
   * words will be created.
   * @param {element} [rootElement=null] 
   * @returns instance of this class
   * 
   * @memberOf WordCast
   */
  setRootElement (rootElement = null) {
    this.rootElement = rootElement;
    return this;
  }

  /**
   * Function which accepts array of words(strings)
   * and stores them in list.
   * @param {array} [wordList=[]] 
   * @returns instance of this class
   * 
   * @memberOf WordCast
   */
  setWordList (wordList = []) {
    this.wordList = wordList;
    return this;
  }

  /**
   * Function to set the minimum font-size
   * 
   * @param {number} [minFontSize=8] 
   * @returns instance of this class
   * 
   * @memberOf WordCast
   */
  setMinimumFontSize (minFontSize = 8) {
    this.minFontSize = minFontSize;
    return this;
  }

  /**
   * Function to set the maximum font-size
   * 
   * @param {number} [maxFontSize=16] 
   * @returns instance of this class
   * 
   * @memberOf WordCast
   */
  setMaximumFontSize (maxFontSize = 16) {
    this.maxFontSize = maxFontSize;
    return this;
  }

  /**
   * Function to set the font-family of the words
   * 
   * @param {string} [fontFamily='sans-serif'] 
   * @returns the instance of the class
   * 
   * @memberOf WordCast
   */
  setFontFamily (fontFamily = 'sans-serif') {
    this.fontFamily = fontFamily;
    return this;
  }

  /**
   * Function to set the color palette for the words to be displayed
   * 
   * @param {array} [colorPalette=['#000000']] 
   * @returns instance of this class
   * 
   * @memberOf WordCast
   */
  setColorPalette (colorPalette = ['#000000']) {
    this.colorPalette = colorPalette;
    return this;
  }

  /**
   * Function to set the x padding for the word
   * 
   * @param {number} [xPadding=3] 
   * @returns instance of this class
   * 
   * @memberOf WordCast
   */
  setXPadding (xPadding = 3) {
    this.xPadding = xPadding;
    return this;
  }

  /**
   * Function to set y padding for the word
   * 
   * @param {number} [yPadding=3] 
   * @returns instance of this class
   * 
   * @memberOf WordCast
   */
  setYPadding (yPadding = 3) {
    this.yPadding = yPadding;
    return this;
  }

  /**
   * Function to set the x padding and y padding of the word
   * 
   * @param {number} [xPadding=3] 
   * @param {number} [yPadding=3] 
   * @returns instance of this class
   * 
   * @memberOf WordCast
   */
  setPadding (xPadding = 3, yPadding = 3) {
    this.xPadding = xPadding;
    this.yPadding = yPadding;
    return this;
  }

  /**
   * Function to set the cloud spread
   * 
   * @param {number} [cloudSpread=365] 
   * @returns the instance of this class
   * 
   * @memberOf WordCast
   */
  setCloudSpread (cloudSpread = 365) {
    this.cloudSpread = cloudSpread;
    return this;
  }

  /**
   * Function to generate the word cloud
   * and append to the DOM
   * 
   * @memberOf WordCast
   */
  build () {
    // Create the word list array sorted according to font-size
    let wordList = this.wordList.map(_word => ({
      word: _word,
      fontSize: randomBetween(this.minFontSize, this.maxFontSize)
    }))
    .sort((a, b) => b.fontSize - a.fontSize);

    // Set the font and position of the root element inside which word cloud will be created
    this.rootElement.style.position = 'relative';
    this.rootElement.style.fontFamily = this.fontFamily;

    // Set the starting point to the center of the rootElement
    this._setStartingPoint();

    // Place the words in the word cloud
    this._placeWords(wordList);
  }


  /**
   * Function to set the starting point for placing the words.
   * 
   * @memberOf WordCast
   */
  _setStartingPoint () {
    this._startingPoint = {
      x: this.rootElement.offsetWidth / 2,
      y: this.rootElement.offsetHeight / 2
    }
  }

  /**
   * Function to add the word element to the word cloud
   *
   * @param {element} wordElement
   * @param {number} x
   * @param {number} y
   *
   * @memberOf WordCast
   */
  _addToWordCast (wordElement, x, y) {
    // Add the word inside the root element
    this.rootElement.appendChild(wordElement);

    // Set the left and top of the word
    wordElement.style.left = x - wordElement.offsetWidth/2 + "px";
    wordElement.style.top = y - wordElement.offsetHeight/2 + "px";

    // Push the position and dimension of the word added to the cloud into wordsInCloud array
    this.wordsInCloud.push(wordElement.getBoundingClientRect());
  }

  /**
   * Function to create the word container element
   * 
   * @param {string} word 
   * @param {number} fontSize 
   * @returns the container element of the word
   * 
   * @memberOf WordCast
   */
  _createWordElement (word, fontSize) {
    // Create the div container for text
    let wordContainerDiv = document.createElement('div');

    // Set the css styles of the word
    wordContainerDiv.style.position = "absolute";
    wordContainerDiv.style.fontSize = fontSize + "px";
    wordContainerDiv.style.color = this.colorPalette[this.elementCreated++%this.colorPalette.length];

    // Append the text inside div
    wordContainerDiv.appendChild(document.createTextNode(word));

    // Return the container
    return wordContainerDiv;
  }

  /**
   * Function to check if the word is safe to place in the position (x,y)
   * such that it does not intersect with other words
   * @param {element} wordElement 
   * @param {number} x 
   * @param {number} y 
   * 
   * @memberOf WordCast
   */
  _isWordSafeToPlace (wordElement, x, y) {
    // Place the word in the cloud initially for getting the position of the word
    this.rootElement.appendChild(wordElement);

    // Set the top and left of the word
    wordElement.style.left = x - wordElement.offsetWidth/2 + "px";
    wordElement.style.top = y - wordElement.offsetHeight/2 + "px";

    // Get the position of the word
    let currentWordPosition = wordElement.getBoundingClientRect();

    // Remove the word from the cloud
    this.rootElement.removeChild(wordElement);

    // Iterate through the positions of all the elements placed in word cloud
    // and determine if it's not overlapping with others.
    for (let comparisonWordPosition of this.wordsInCloud) {
      if (!(
            (currentWordPosition.right + this.xPadding < comparisonWordPosition.left - this.xPadding) ||
            (currentWordPosition.left - this.xPadding > comparisonWordPosition.right + this.xPadding) ||
            (currentWordPosition.top - this.yPadding > comparisonWordPosition.bottom + this.yPadding) ||
            (currentWordPosition.bottom + this.yPadding < comparisonWordPosition.top - this.yPadding)
          )
      ) {
          return false;
      }
    }
    return true;
  }

  /**
   * Function to calculate the potential position for placing the word
   * 
   * @param {number} angle 
   * @param {function} callback 
   * @returns the value returned by the callback method
   * 
   * @memberOf WordCast
   */
  _computePotentialPosition (angle, callback) {
    this._x = (1 + angle) * cos(angle);
    this._y = (1 + angle) * sin(angle);

    return callback ? callback() : null;
  }

  /**
   * Function to populate the words in word cloud without overlapping with each other
   * 
   * @param {array} wordList 
   * 
   * @memberOf WordCast
   */
  _placeWords (wordList) {
    // Loop through all the words in wordList
    for (let word of wordList) {
      // Create the div element for each word
      let wordElement = this._createWordElement(word.word, word.fontSize);

      // Find a suitable position in the cloudSpread and place it there
      for (let angle = 0; angle < this.cloudSpread; ++angle) {
        // If the word is placed in word-cloud,
        // then break the loop and repeat the same for next word(if available)
        if (this._computePotentialPosition(angle, () => {
          let x = this._startingPoint.x + this._x,
            y = this._startingPoint.y + this._y;
          // If the word is safe to place, then add to the word-cloud
          if (this._isWordSafeToPlace(wordElement, x, y)) {
            this._addToWordCast(wordElement, x, y);
            return true;
          }
        })) {
          break;
        }
      }
    }
  }
}

export default WordCast;
