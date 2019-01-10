class WordCast {

  /**
   * Creates an instance of WordCast.
   * @param {element} [rootElement=null] 
   * @param {array} [wordList=[]] 
   * 
   * @memberOf WordCast
   */
  constructor(rootElement = null, wordList = []) {
    this.rootElement = rootElement;
    this.wordList = wordList;
    this.colorPalette = ['#000000'];
    this.minFontSize = 8;
    this.maxFontSize = 16;
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
    
  }
}