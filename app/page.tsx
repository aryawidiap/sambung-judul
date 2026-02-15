'use client'
import { Ms_Madi } from 'next/font/google'
import { figtree } from "./fonts";
import { ChangeEvent, use, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Song from "./_model/Song";
import { FaBars, FaClockRotateLeft, FaInfo, FaPlus, FaQuestion, FaXmark } from 'react-icons/fa6';

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
    const [searchedSong, setSearchedSong] = useState({ title: '', artist: '' });

    const aboutModal = useRef<HTMLDialogElement>(null);
    const howToModal = useRef<HTMLDialogElement>(null);

    const displayedSongs = songs.slice(-3);

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

    const previousSongIds = songs.map(song => song.id);

    return (
        <div className='min-h-screen w-full bg-zinc-50 font-sans dark:bg-radial-[at_50%_75%] dark:from-emerald-950 dark:via-green-700 dark:to-lime-600 dark:to-90% relative'>
            <div className={`flex min-h-screen w-full flex-col items-center ${initialPage ? "justify-center" : "justify-between"}  transition`}>
                <nav>
                    <h1 className={"text-3xl my-3 transition " + msMadi.className + (initialPage ? "" : "")}>Sambung <span className={figtree.className + " font-bold uppercase text-2xl"}>Judul</span></h1>
                    <div className='flex flex-row gap-3 justify-center'>
                        <button className="position-absolute cursor-pointer hover:*:fill-blue-200" onClick={openAboutModal}><FaInfo /></button>
                        <button className="position-absolute cursor-pointer hover:*:fill-blue-200" onClick={openHowToModal}><FaQuestion /></button>
                        <button className="position-absolute cursor-pointer hover:*:fill-blue-200"><FaPlus /></button>
                    </div>
                </nav>
                <main className={"flex w-full max-w-3xl flex-col items-center justify-center py-5 px-5 sm:items-center overflow-x-clip"}>
                    <SongHistory displayedSongs={displayedSongs} />
                    <SearchForm showFullForm={!initialPage} openMainPage={openMainPage} setSearchedSong={setSearchedSong} latestSongTitle={latestSongTitle} />
                    <SearchResult searchedSong={searchedSong} addNewSong={addNewSong} previousSongIds={previousSongIds} />
                </main>
                <Footer />
            </div>
            <SimpleModal
                header='Tentang Sambung Judul'
                reference={aboutModal}
                closeModal={closeAboutModal}
            >
                <p>
                    Sambung Judul adalah gim yang menggabungkan permainan sambung kata dengan permainan asosiasi lagu.
                    Gim ini terinspirasi dari permainan yang dilakukan pengembang aplikasi saat sedang
                    jalan-jalan bersama teman.
                </p>
            </SimpleModal>
            <SimpleModal
                header='Cara Bermain'
                reference={howToModal}
                closeModal={closeHowToModal}
            >
                <p>
                    <ol className='list-decimal ms-6'>
                        <li>
                            Ketik judul lagu dan nama penyanyi pada kolom input.
                        </li>
                        <li>
                            Tekan tombol &apos;Cari&apos;
                        </li>
                        <li>
                            Cari lagu yang diinginkan pada daftar hasil pencarian.
                        </li>
                        <li>
                            Tekan tombol panah kanan (&gt;) untuk menambahkan lagu
                            ke daftar lagu permainan.
                        </li>
                        <li>
                            Ulangi Langkah 1, tapi sekarang judul lagu harus mengandung
                            minimal satu kata dari lagu sebelumnya!
                        </li>
                    </ol>
                </p>
            </SimpleModal>
        </div>

    );
}

