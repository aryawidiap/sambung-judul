'use client'
import { Ms_Madi } from 'next/font/google'
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Song from "./_model/Song";
import { FaBars, FaClockRotateLeft, FaXmark } from 'react-icons/fa6';

// DO NOT DELETE
import { removeStopwords, eng } from 'stopword';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
// DO NOT DELETE

/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import SongHistory from "./_components/SongHistory";
import SearchResult from './_components/SearchResult';
import SearchForm from './_components/SearchForm';
import Footer from './_components/Footer';
import SimpleModal from './_components/SimpleModal';
import { mainPage } from './_utils/content';
import { Navigation } from './_components/Navigation';
import LanguageContext, { LanguageContextType } from './_context/LanguageContext';
library.add(fas)

/**
 * `const` for the font used in "Sambung Judul" header.
 */
export const msMadi = Ms_Madi({
    weight: ['400'],
});

/**
 * @returns The main page component
 */
export default function Home() {
    const getHistoryFromStorage = () => {
        if (typeof window !== 'undefined') {
            const history = localStorage.getItem('history');

            if (history) {
                const pastSongs = JSON.parse(history);
                return pastSongs;
            } else {
                return [];
            }
        }
        return [];
    };

    const [songs, setSongs] = useState<Array<Song>>([]);
    const [latestSongTitle, setLatestSongTitle] = useState('');
    const [initialPage, setInitialPage] = useState(true);
    const [searchedSong, setSearchedSong] = useState({ title: '', artist: '' });
    const [language, setLanguage] = useState<LanguageContextType>('en');

    const aboutModal = useRef<HTMLDialogElement>(null);
    const howToModal = useRef<HTMLDialogElement>(null);

    const addNewSong = (song: Song) => {
        setSongs(
            [
                ...songs,
                song
            ]
        );
        setLatestSongTitle(song.title);
        setSearchedSong({ title: '', artist: '' });
        localStorage.setItem('history', JSON.stringify([...songs, song]));
    }

    const openMainPage = () => {
        setInitialPage(false);
    }

    const openAboutModal = () => {
        if (aboutModal.current !== null) {
            aboutModal.current.showModal();
        }
    }

    const closeAboutModal = () => {
        if (aboutModal.current !== null) {
            aboutModal.current.close();
        }
    }

    const openHowToModal = () => {
        if (howToModal.current !== null) {
            howToModal.current.showModal();
        }
    }

    const closeHowToModal = () => {
        if (howToModal.current !== null) {
            howToModal.current.close();
        }
    }

    const startNewGame = () => {
        localStorage.removeItem('history');
        setSongs([]);
        setSearchedSong({ title: '', artist: '' });
        setLatestSongTitle('');
    }

    const changeLanguage = (newLanguage: string) => {
        if (newLanguage === 'id') {
            setSearchedSong({ title: '', artist: '' });
            setLanguage(newLanguage);
            localStorage.setItem('preferredLanguage', newLanguage);
        }

        if (newLanguage === 'en') {
            setSearchedSong({ title: '', artist: '' });
            setLanguage(newLanguage);
            localStorage.setItem('preferredLanguage', newLanguage);
        }
    }

    useEffect(() => {
        const pastSongs = getHistoryFromStorage();
        const lastSong = pastSongs.slice(-1).findLast((song: Song) => true);
        if (lastSong) {
            setLatestSongTitle(lastSong.title);
        }
        setSongs(pastSongs);

        const preferredLanguage = localStorage.getItem('preferredLanguage');
        if (preferredLanguage) {
            changeLanguage(preferredLanguage);
        }
    }, []);

    const version = '0.1.1';
    const displayedSongs = songs.slice(-3);
    const previousSongIds = songs.map(song => song.id);
    const newGame = songs.length === 0;
    const {
        about: aboutContent,
        howTo: howToContent,
        newGame: newGameContent,
    } = mainPage;

    return (
        <LanguageContext value={language}>
            <div className='min-h-screen w-full bg-zinc-50 font-sans dark:bg-radial-[at_50%_75%] dark:from-emerald-950 dark:via-green-700 dark:to-lime-600 dark:to-90% relative'>
                <div className={`flex min-h-screen w-full flex-col items-center ${initialPage ? "justify-center" : "justify-between"}  transition`}>
                    <Navigation initialPage={initialPage} newGame={newGame} language={language} openAboutModal={openAboutModal} openHowToModal={openHowToModal} startNewGame={startNewGame} changeLanguage={changeLanguage} />
                    <main className={"flex w-full max-w-3xl flex-col items-center justify-center py-5 px-5 sm:items-center overflow-x-clip"}>
                        <SongHistory displayedSongs={displayedSongs} />
                        <SearchForm showFullForm={!initialPage} openMainPage={openMainPage} setSearchedSong={setSearchedSong} latestSongTitle={latestSongTitle} />
                        <SearchResult searchedSong={searchedSong} addNewSong={addNewSong} previousSongIds={previousSongIds} />
                    </main>
                    <Footer />
                </div>
                <SimpleModal
                    header={aboutContent.header[language]}
                    reference={aboutModal}
                    closeModal={closeAboutModal}
                >
                    <p>
                        {aboutContent.content[language]}
                    </p>
                    <p className='italic font-bold mt-4 text-xs'>version {version}</p>
                </SimpleModal>
                <SimpleModal
                    header={howToContent.header[language]}
                    reference={howToModal}
                    closeModal={closeHowToModal}
                >

                    <ol className='list-decimal ms-6'>
                        {howToContent.content[language].map((step) => {
                            return (
                                <li key={step.stepNumber}>
                                    {step.description}
                                </li>
                            )
                        })}
                    </ol>
                </SimpleModal>
            </div>
        </LanguageContext>
    );
}


