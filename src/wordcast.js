import { randomBetween } from './utils';

let win = window,
  doc = win.document || document,
  create = doc.createElement,
  createText = doc.createTextNode;
class WordCast {

  /**
   * Creates an instance of WordCast.
   * @param {element} [rootElement=null] 
   * @param {array} [wordList=[]] 
   * 
   * @memberOf WordCast
   */
  constructor(rootElement = null, wordList = ['Thanks', 'For', 'Using', 'WordCast']) {
    this.rootElement = rootElement;
    this.wordList = wordList;
    this.colorPalette = ['#000000'];
    this.minFontSize = 8;
    this.maxFontSize = 16;
    this.fontFamily = 'sans-serif';
    this.wordsInCloud = [];
  }

  /**
   * Function to set the root element inside which
   * words will be created.
   * @param {element} [rootElement=null] 
   * @returns instance of this class
   * 
   * @memberOf WordCast
   */
  setRootElement(rootElement = null) {
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
  setWordList(wordList = []) {
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
  setMinimumFontSize(minFontSize = 8) {
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
  setMaximumFontSize(maxFontSize = 16) {
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
  setFontFamily(fontFamily = 'sans-serif') {
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
  setColorPalette(colorPalette = ['#000000']) {
    this.colorPalette = colorPalette;
    return this;
  }

  /**
   * Function to generate the word cloud
   * and append to the DOM
   * 
   * @memberOf WordCast
   */
  build() {
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
    let startingPoint = {
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
  _addToWordCast(wordElement, x, y) {
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
  _createWordElement(word, fontSize) {
    // Create the div container for text
    let wordContainerDiv = create('div');

    // Set the css styles of the word
    wordContainerDiv.style.position = "absolute";
    wordContainerDiv.style.fontSize = fontSize + "px";
    wordContainerDiv.style.color = this.colorPalette[randomBetween(0, this.colorPalette.length - 1)];

    // Append the text inside div
    wordContainerDiv.appendChild(createText(word));

    // Return the container
    return wordContainerDiv;
  }
}