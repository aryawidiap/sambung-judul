import { SearchFormProps } from "../_interfaces/Props";
import { ChangeEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import PreviousSongKeywords from "./PreviousSongKeywords";
// DO NOT DELETE
import { removeStopwords, eng } from 'stopword';
// DO NOT DELETE
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { searchForm } from "../_utils/content";


export default function SearchForm({ showFullForm, openMainPage, setSearchedSong, latestSongTitle }: SearchFormProps) {
    /**
     * Constant values
     */
    const inputLabelClassName = `block text-center text-sm font-bold`;
    const formInputClassName = "block mt-3 py-3 px-3 \
        min-w-0 w-3xs sm:w-xs \
        focus:sm:scale-125 focus:sm:w-sm \
        focus:scale-110 focus:sm:w-sm \
        bg-neutral-600/30 outline outline-white/50 focus:outline-white/50 \
        backdrop-blur-xs \
        rounded-full \
        hover:shadow-md shadow-white/50 focus:shadow-lg focus:shadow-white/50 \
        sm:text-sm/6 text-center \
        font-semibold \
        transition " + (showFullForm ? "text-grey" : "text-white");
    const buttonClassName = "rounded-full bg-slate-800/50 px-6 py-2 \
        text-sm font-semibold text-white outline-1 \
        focus-visible:outline-2 focus-visible:outline-offset-2 \
        focus-visible:outline-neutral-100 focus-visible:scale-110 \
        hover:outline-2 hover:outline-offset-2 \
        hover:outline-neutral-100 hover:scale-110 \
        active:scale-90 active:bg-slate-800/70 active:inset-shadow-sm \
        active:inset-shadow-slate-950/70 transition";

    const extractKeywords = (songTitle: string) => {
        if (songTitle === '') {
            return [];
        }

        const songTitleWithoutStopwords = removeStopwords(songTitle.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" "))
        const finalKeywords = songTitleWithoutStopwords.map(((word: string) => {
            return {
                term: word,
                foundInTitle: false,
            }
        }));
        return finalKeywords;
    }

    const getKeywords = (newTitle: string, previousTitle: string) => {
        const rawKeywords = extractKeywords(previousTitle);
        return checkKeywordsInTitle(newTitle, rawKeywords);
    }

    const checkKeywordsInTitle = (title: string, keywords: Array<{ term: string, foundInTitle: boolean }>) => {
        if (keywords.length === 0) {
            return [];
        }

        const lowerCaseTitle = title.toLowerCase();
        const currentKeywords = keywords.map((keyword) => {
            if (lowerCaseTitle.includes(keyword.term)) {
                return {
                    term: keyword.term,
                    foundInTitle: true,
                }
            }
            return {
                term: keyword.term,
                foundInTitle: false,
            }
        })

        return currentKeywords;
    }

    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const keywords = getKeywords(title, latestSongTitle);
    const {
        title: titleContent,
        artist: artistContent,
        submitButton: submitButtonContent,
    } = searchForm;

    useEffect(() => {
        return () => {
            setTitle('');
            setArtist('');
            console.log(latestSongTitle);
        };
    }, [latestSongTitle]);

    const handleTitleInputFocus = () => {
        if (!showFullForm) {
            openMainPage();
        }
    }

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    }

    const handleArtistChange = (event: ChangeEvent<HTMLInputElement>) => {
        setArtist(event.target.value);
    }

    const keywordHit = keywords.length > 0 ? (keywords.filter((word) => word.foundInTitle === true).length > 0) : true;

    const handleSubmit = () => {
        if (keywordHit) {
            setSearchedSong({ title, artist });
        }
    }

    return (
        <form action="" className="mb-4">
            <div className="sm:col-span-4 flex flex-col items-center-safe">
                <motion.label
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    htmlFor="songTitle"
                    className={inputLabelClassName + (showFullForm ? "" : " hidden")}
                >
                    {titleContent.label['en']}
                </motion.label>
                <input id="songTitle" name="songTitle" value={title}
                    onFocus={handleTitleInputFocus}
                    onChange={handleTitleChange} type="text"
                    className={formInputClassName}
                    placeholder={
                        showFullForm
                            ? titleContent.placeholder.initialPage['en']
                            : titleContent.placeholder.fullForm['en']
                    }
                />
                <PreviousSongKeywords show={keywords.length !== 0} keywords={keywords} />
            </div>

            <div className={showFullForm ? "sm:col-span-4 mt-4 flex flex-col items-center-safe" : "hidden"}>
                <motion.label
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    htmlFor="artist"
                    className={inputLabelClassName}
                >
                    {artistContent.label['en']}
                </motion.label>
                <motion.input
                    initial={{ opacity: 0, }}
                    animate={{ opacity: 1, }}
                    id="artist"
                    name="artist"
                    value={artist}
                    onChange={handleArtistChange}
                    type="text"
                    className={formInputClassName}
                    placeholder={artistContent.placeholder['en']} />
            </div>
            <div className={showFullForm ? "mt-6 flex items-center justify-center gap-x-6" : "hidden"}>
                <button type="button" onClick={handleSubmit}
                    className={buttonClassName}>{submitButtonContent['en']}</button>
            </div>
        </form>
    );
}