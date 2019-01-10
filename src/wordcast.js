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
}