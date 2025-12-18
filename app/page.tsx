'use client'
import Image from "next/image";
import { Ms_Madi, Figtree } from 'next/font/google'
import { figtree } from "./fonts";
import { ChangeEvent, useEffect, useState } from "react";
import { SongHistoryListItem, SongSearchListItem } from "./_components/SongListItem";
import { AnimatePresence, motion } from "motion/react";
import Song from "./_model/Song";
import { removeStopwords, eng } from 'stopword';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

const msMadi = Ms_Madi({
  weight: ['400'],
});

export default function Home() {
  const [songs, setSongs] = useState<Array<Song>>([]);
  // const [displayedSongs, setDisplayedSongs] = useState<Array<Song>>([]);
  const [matchedSongs, setMatchedSongs] = useState<Array<Song>>([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [keywords, setKeywords] = useState<Array<{ term: string, foundInTitle: boolean }>>([]);
  const [initialPage, setInitialPage] = useState(true);
  const displayedSongs = songs.slice(-3);
  const { removeStopwords } = require('stopword');

  const getSongCoverArt = async () => {

  }

  const getSongList = async () => {
    try {
      const url = encodeURI(`https://musicbrainz.org/ws/2/recording?query=recording:${encodeURIComponent(title)} AND artist:${encodeURIComponent(artist)}`);
      const response = await fetch(
        url,
        {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          }
        }
      );
      const data = await response.json();
      // console.log(data);

      const songList = data.recordings.map((song: any) => {
        console.log(song);
        // TODO: consider null/properties not found
        return {
          id: song["id"],
          title: song["title"],
          year: song["first-release-date"] ? song["first-release-date"].split('-')[0] : 'unknown',
          artist: song["artist-credit"][0]["name"]
        } as Song
      }) as Song[];
      return songList;
    } catch (error) {
      console.log(error);
    }
    return [] as Song[];
  }

  // @ts-ignore
  const angleRightIcon: IconProp = "fa-solid fa-angle-right";

  let id = 3
  let keywordHit = songs.length > 0 ? (keywords.filter((word) => word.foundInTitle === true).length > 0) : true;
  let formInputClassName = `block mt-3 py-3 px-3 
  min-w-0 w-3xs sm:w-xs 
  focus:sm:scale-125 focus:sm:w-sm
  focus:scale-110 focus:sm:w-sm
  bg-neutral-600/30 outline outline-white/50 focus:outline-white/50
  backdrop-blur-xs
  rounded-full
  hover:shadow-md shadow-white/50 focus:shadow-lg focus:shadow-white/50
  sm:text-sm/6 text-center ${initialPage ? "text-white" : "text-grey"} 
  font-semibold
  transition
  `
  let inputLabelClassName = `block text-center text-sm font-bold`;

  const getMatchedSongs = () => {
    // API Call to musicBrainz API
    return getSongList();
  }

  const handleSubmit = async () => {
    if (keywordHit) {
      setMatchedSongs(await getMatchedSongs());
    }
  }

  // ref: https://github.com/tailwindlabs/tailwindcss/discussions/3461
  const blurClass = {
    default: '',
    1: '',
    2: 'blur-[1px]',
    3: 'blur-[2px]',
    4: 'blur-[3px]',
  } as { [key: number]: {} };

  const scaleClass = {
    1: '',
    2: 'scale-90 origin-center',
    3: 'scale-80 origin-center',
    4: 'scale-85 origin-center',
  } as { [key: number]: {} };

  const offsetClass = {
    1: '',
    2: 'absolute left-[-3rem]',
    3: 'absolute left-[-6rem]',
    4: 'absolute left-[-9rem]',
  } as { [key: number]: {} };

  const createSongHistoryItem = (song: Song, index: number, totalSongs: number) => {
    // console.log("song name: " + song.title + " index: " + (totalSongs - index));
    let variableClassName = ` ${blurClass[totalSongs - index]} ${scaleClass[totalSongs - index]} ${offsetClass[totalSongs - index]}`;


    return (<SongHistoryListItem
      song={song}
      className={variableClassName}
      key={song.id}
    />)
  }

  const addNewSong = (song: Song) => {
    setSongs(
      [
        ...songs,
        song
      ]
    );
    // Replace punctuation -> Source - https://stackoverflow.com/a
    // Posted by Mike Grace, modified by community. See post 'Timeline' for change history
    // Retrieved 2025-12-09, License - CC BY-SA 3.0
    setKeywords(removeStopwords(song.title.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").split(" ")).map(((word: string) => {
      return {
        term: word,
        foundInTitle: false,
      }
    })))
    id++;
    setMatchedSongs([]);
    setTitle("");
    setArtist("");
  }

  const handleJudulLaguChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    checkKeywordsInTitle(e.target.value.toLowerCase());
  }

  const checkKeywordsInTitle = (title: string) => {
    if (keywords.length === 0) {
      return true
    }

    let currentKeywords = keywords;

    currentKeywords.forEach(keyword => {
      /** reset to false */ 
      keyword.foundInTitle = false;
      /** mark keyword found in title */
      if (title.includes(keyword.term)) {
        keyword.foundInTitle = true;
      }
    });

    setKeywords(currentKeywords);
  }

  function PreviousSongKeywords() {
    if (songs.length > 0) {
      return (
        <div className="flex flex-row gap-2 mt-3 text-xs">
          Kata kunci:
          <ul className="flex flex-row gap-1">
            {
              keywords.map((keyword, index) =>
                <li key={index} className={"font-semibold " + (keyword.foundInTitle ? "text-white" : "text-white/50")}>
                  {keyword.term + (index === keywords.length - 1 ? "" : ",")}
                </li>
              )
            }
          </ul>
        </div>
      )
    } else {
      return (
        <div className="flex flex-row gap-1 mt-3 text-xs text-white/50">
          Kata kunci:
          <span className={"font-semibold"}>belum ada lagu sebelumnya ;D</span>
        </div>
      )
    }
  }

  function SearchResult() {
    /**
     * TODO: {known bug} SearchResult function is executed twice
     * Update: twice rendering is a React feature, but the key duplicate is still a mystery
     */
    let count = 0;
    if (matchedSongs.length) {
      // console.log(matchedSongs);
      return <div className="flex flex-col items-center">
        <div className="mb-2">
          Manakah lagu yang kamu maksud?
        </div>
        <ul id="search-result" className="flex flex-col gap-y-3">
          <AnimatePresence>
            { // maybe at pagination?
              matchedSongs.map(song => {
                count++;
                console.log(count);
                return <SongSearchListItem
                  song={song}
                  addSong={addNewSong}
                  key={song.id}
                />
              }
              )
            }
          </AnimatePresence>
        </ul>
      </div>
    }
  }



  return (
    <div className={`flex min-h-screen w-full flex-col items-center ${initialPage ? "justify-center" : "justify-between"} bg-zinc-50 font-sans dark:bg-radial-[at_50%_75%] dark:from-emerald-950 dark:via-green-700 dark:to-lime-600 dark:to-90% transition`}>
      <nav>
        <h1 className={"text-3xl my-3 transition " + msMadi.className + (initialPage ? "" : "")}>Sambung <span className={figtree.className + " font-bold uppercase text-2xl"}>Judul</span></h1>
      </nav>
      <main className={"flex w-full max-w-3xl flex-col items-center justify-center py-5 px-5 sm:items-center overflow-x-clip"}>

        {
          displayedSongs.length !== 0 ?
            <motion.ul
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              id="history"
              className="flex flex-row items-center relative mb-3"
            >
              <AnimatePresence>
                {
                  displayedSongs.map((song, index) => {
                    const totalNumberOfSongsInHistory = songs.length <= 3 ? songs.length : 3;
                    return createSongHistoryItem(song, index, totalNumberOfSongsInHistory)
                  })
                }
              </AnimatePresence>
            </motion.ul>
            : null
        }


        <form action="" className="mb-4">
          <div className="sm:col-span-4 flex flex-col items-center-safe">

            {initialPage ?
              null
              :
              <motion.label
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                htmlFor="judulLagu"
                className={inputLabelClassName}
              >
                Judul lagu
              </motion.label>}
            <input id="judulLagu" name="judulLagu" value={title}
              onClick={(e) => initialPage ? setInitialPage(false) : setInitialPage(false)}
              onChange={(e) => handleJudulLaguChange(e)} type="text"
              className={formInputClassName}
              placeholder={initialPage ? "Ketik judul untuk mulai" : "Ketik judul lagu"} />
            <PreviousSongKeywords />
          </div>
          <div className={initialPage ? "hidden" : "sm:col-span-4 mt-4 flex flex-col items-center-safe"}>
            <motion.label
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              htmlFor="penyanyi"
              className={inputLabelClassName}
            >
              Penyanyi
            </motion.label>
            <motion.input
              initial={{ opacity: 0, }}
              animate={{ opacity: 1, }}
              id="penyanyi"
              name="penyayi"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              type="text"
              className={formInputClassName}
              placeholder="Ketik nama penyanyi" />
          </div>
          <div className={initialPage ? "hidden" : "mt-6 flex items-center justify-center gap-x-6"}>
            <button type="button" onClick={handleSubmit}
              className="rounded-full bg-slate-800/50 px-6 py-2 
            text-sm font-semibold text-white 
            focus-visible:outline-2 focus-visible:outline-offset-2 
            focus-visible:outline-neutral-100 focus-visible:scale-110
            hover:outline-2 hover:outline-offset-2 
            hover:outline-neutral-100 hover:scale-110
            active:scale-90 active:bg-slate-800/70 active:inset-shadow-sm 
            active:inset-shadow-slate-950/70 transition">Cari</button>
          </div>
        </form>

        <SearchResult />

      </main>
      <hr />
      <footer className="flex flex-row gap-2 my-3">
        <div>Made with MusicBrainz DB |</div>
        <div>Instagram |</div>
        <div>Github</div>
      </footer>
    </div>
  );
}
