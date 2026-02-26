import { removeStopwords, eng } from 'stopword';

export const extractKeywords = (songTitle: string) => {
    if (songTitle === '') {
        return [];
    }

    const titleWithoutPunctuation = songTitle.toLowerCase().replace(/[.,\/#!$%?\^&\*;:{}=\-_`~()]/g, "");
    const wordsInTitle = titleWithoutPunctuation.split(" ");
    /**
     * @todo Filter english word only
     * ref library to use:
     * https://www.npmjs.com/package/wordlist-english
     * https://www.npmjs.com/package/an-array-of-english-words
     * https://www.npmjs.com/package/wordnet?activeTab=dependents
     */
    const wordsInTitleWithoutStopwords = removeStopwords(wordsInTitle)
    const finalKeywords = wordsInTitleWithoutStopwords.map(((word: string) => {
        return {
            term: word,
            foundInTitle: false,
        }
    }));
    return finalKeywords;
}