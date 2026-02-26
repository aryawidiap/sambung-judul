import { removeStopwords, eng } from 'stopword';
import {} from 'an-array-of-english-words';

export const extractKeywords = (songTitle: string) => {
    const englishWords = require('an-array-of-english-words') as string[];

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
    const withoutStopwords = removeStopwords(wordsInTitle)
    const englishWordOnly = withoutStopwords.filter(keyword => englishWords.includes(keyword));
    const finalKeywords = englishWordOnly.map(((word: string) => {
        return {
            term: word,
            foundInTitle: false,
        }
    }));
    return finalKeywords;
}