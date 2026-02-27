import { removeStopwords, eng } from 'stopword';
import { } from 'an-array-of-english-words';

const handleStopwords = (words: string[]) => {
    const pronouns = [
        'i', 'me', 'my', 'mine',
        'we', 'us', 'our', 'ours',
        'you', 'your', 'yours',
        'he', 'him', 'his',
        'she', 'her', 'hers',
        'it', 'its',
        'they', 'them', 'their', 'theirs',
    ];
    
    if(words.length <= 5) {
        return words
    }

    const customStopwords = eng.filter(word => !pronouns.includes(word))
    const withoutStopwords = removeStopwords(words, customStopwords);

    if(withoutStopwords.length === 0) {
        return words
    }

    return withoutStopwords;
}
export const extractKeywords = (songTitle: string) => {
    const englishWords = require('an-array-of-english-words') as string[];

    if (songTitle === '') {
        return [];
    }

    const titleWithoutPunctuation = songTitle.toLowerCase().replace(/[.,\/#!$%?\^&\*;:{}=\-_`~()]/g, "");
    const wordsInTitle = titleWithoutPunctuation.split(" ");
    const withoutStopwords = handleStopwords(wordsInTitle)
    const englishWordOnly = withoutStopwords.filter(keyword => englishWords.includes(keyword));
    const uniqueKeywords = Array.from(new Set(englishWordOnly));

    const finalKeywords = uniqueKeywords.map(((word: string) => {
        return {
            term: word,
            foundInTitle: false,
        }
    }));
    
    return finalKeywords;
}