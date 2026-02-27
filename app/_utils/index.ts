import { removeStopwords, eng, ind } from 'stopword';
import englishWords from 'an-array-of-english-words';

type WordList = {
    [key: string]: string[]
}

/** @todo Indonesian language feature */
const wordlists: WordList = {
    en: englishWords,
    id: englishWords,
}

/** @todo to be implemented in the future (Indonesian language) */
const stopwords: WordList = {
    en: eng,
    id: ind,
}

export const wordsIsInLanguage = (words: string[], language: string) => {
    if (Object.keys(wordlists).includes(language)) {
        return words.some(word => wordlists[language].includes(word));
    }
    return false;
}

/**
 * A function to split words for languages where words are separated by spaces.
 * This function also removes punctuation marks.
 * @param stringOfWords : The string to be splitted.
 * @returns string[]
 */
export const splitWords = (stringOfWords: string) => {
    const wordsWithoutPunctuation = stringOfWords.toLowerCase().replace(/[.,\/#!$%?\^&\*;:{}=\-_`~()]/g, "");
    return wordsWithoutPunctuation.split(" ");
}

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

    if (words.length <= 5) {
        return words
    }

    const customStopwords = eng.filter(word => !pronouns.includes(word))
    const withoutStopwords = removeStopwords(words, customStopwords);

    if (withoutStopwords.length === 0) {
        return words
    }

    return withoutStopwords;
}


export const extractKeywords = (songTitle: string) => {
    if (songTitle === '') {
        return [];
    }

    const wordsInTitle = splitWords(songTitle);
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