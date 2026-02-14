'use client'
import { Ms_Madi } from 'next/font/google'
import { figtree } from "./fonts";
import { ChangeEvent, use, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Song from "./_model/Song";

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
import Footer  from './_components/Footer';
library.add(fas)
/**
 * `const` for the font used in "Sambung Judul" header.
 */
const msMadi = Ms_Madi({
    weight: ['400'],
});

/**
 * @returns The main page component
 */
export default function Home() {

    const [songs, setSongs] = useState<Array<Song>>([]);
    const [latestSongTitle, setLatestSongTitle] = useState('');
    const [initialPage, setInitialPage] = useState(true);
    const [searchedSong, setSearchedSong] = useState({title: '', artist: ''});
    const displayedSongs = songs.slice(-3);
    const { removeStopwords } = require('stopword');

    const addNewSong = (song: Song) => {
        setSongs(
            [
                ...songs,
                song
            ]
        );
        setLatestSongTitle(song.title);
        setSearchedSong({title: '', artist: ''});
    }

    const openMainPage = () => {
        setInitialPage(false);
    }

    const previousSongIds = songs.map(song => song.id);

    return (
        <div className={`flex min-h-screen w-full flex-col items-center ${initialPage ? "justify-center" : "justify-between"} bg-zinc-50 font-sans dark:bg-radial-[at_50%_75%] dark:from-emerald-950 dark:via-green-700 dark:to-lime-600 dark:to-90% transition`}>
            <nav>
                <h1 className={"text-3xl my-3 transition " + msMadi.className + (initialPage ? "" : "")}>Sambung <span className={figtree.className + " font-bold uppercase text-2xl"}>Judul</span></h1>
            </nav>
            <main className={"flex w-full max-w-3xl flex-col items-center justify-center py-5 px-5 sm:items-center overflow-x-clip"}>
                <SongHistory displayedSongs={displayedSongs} />
                <SearchForm showFullForm={!initialPage} openMainPage={openMainPage} setSearchedSong={setSearchedSong} latestSongTitle={latestSongTitle}/>
                <SearchResult searchedSong={searchedSong} addNewSong={addNewSong} previousSongIds={previousSongIds}/>
            </main>
            <hr />
            <Footer />
        </div>
    );
}

