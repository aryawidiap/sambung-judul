'use client'
import Image from "next/image";
import { useState } from "react";

interface Song {
  id: string,
  title: string,
  year: number,
  artist: string
}

const SAMPLE_SONGS = [
  {
    id: '1',
    title: 'Time for the moon night',
    year: 2018,
    artist: 'GFRIEND'
  },
  {
    id: '2',
    title: 'Water Flower',
    year: 2018,
    artist: 'GFRIEND'
  },
  {
    id: '3',
    title: 'Flower Garden',
    year: 2018,
    artist: 'GFRIEND'
  },
  {
    id: '4',
    title: 'Flower',
    year: 2018,
    artist: 'GFRIEND'
  },
]

export default function Home() {
  const [songs, setSongs] = useState<Array<Song>>([]);
  const [matchedSongs, setMatchedSongs] = useState<Array<Song>>([]);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [keywords, setKeywords] = useState<Array<string>>([]);
  const [initialPage, setInitialPage] = useState(true);
  let id = 3

  // setSongs(SAMPLE_SONGS);
  const getMatchedSongs = () => {
    // TODO: replace with api call later
    return SAMPLE_SONGS.filter((song) => song.title.toLowerCase().includes(title.toLowerCase()));
  }

  const handleSubmit = () => {
    setMatchedSongs(getMatchedSongs());
  }

  const listMatchedSong = (song: Song) => {
    return <li id={song.id} key={song.id} className="flex flex-row p-3 outline rounded-xl bg-white/30">
      <div className="album-cover rounded-md bg-blue-100 size-[72px]"></div>
      <div className="song-description ml-3">
        <div className="flex flex-row ">
          <h3>{song.title}</h3>
          <div className="ml-2">{song.year}</div>
        </div>
        <div>
          {song.artist}
        </div>
      </div>
      <button className="bg-green-600 px-3 ml-3" onClick={() => {
        addNewSong(song)
      }}>
        yes
      </button>
    </li>
  }

  // ref: https://github.com/tailwindlabs/tailwindcss/discussions/3461
  const blurClass = {
    default: '',
    1: '',
    2: 'blur-[1px]',
    3: 'blur-[2px]',
    4: 'blur-[3px]',
  } as {[key: number]: {}};

  const scaleClass = {
    1: '',
    2: 'scale-95 origin-bottom',
    3: 'scale-90 origin-bottom',
    4: 'scale-85 origin-bottom',
  } as {[key: number]: {}};

  const createSongHistoryItem = (song: Song, index: number, totalSongs: number) => {
    console.log("song name: " + song.title + " index: " + (totalSongs - index));
    let className = "transition duration-500 ease-in-out flex flex-row p-3 outline rounded-xl bg-white/30";
    if (index != songs.length - 1) {
      const blur = "blur-[" + (songs.length - index).toString() + "px]";
      const scale = "scale-" + (100 - (5 * (songs.length - index))).toString();
      className += ` ${blurClass[totalSongs - index]} ${scaleClass[totalSongs - index]}`;
    }

    return <li id={song.id} key={song.id} className={className}>
      <div className="album-cover rounded-md bg-blue-100 size-[72px]"></div>
      <div className="song-description ml-3">
        <div className="flex flex-row ">
          <h3>{song.title}</h3>
          <div className="ml-2">{song.year}</div>
        </div>
        <div>
          {song.artist}
        </div>
      </div>
    </li>
  }

  const addNewSong = (song: Song) => {
    setSongs(
      [
        ...songs,
        song
      ]
    );
    setKeywords(song.title.toLowerCase().split(" "))
    console.log(setKeywords);
    id++;
    setMatchedSongs([]);
  }

  const checkKeywordsInTitle = () => {
    if(keywords.length === 0) {
      return true
    }

    let keywordUsed = false;

    keywords.forEach(keyword => {
      if(title.includes(keyword)) {
        keywordUsed = true;
      }
    });

    return keywordUsed;
  }

  function PreviousSongKeywords() {
    if (songs.length > 0) {
      return <div className="flex flex-row gap-2">
        Kata kunci:
        <ul className="flex flex-row gap-1">
          {
            keywords.map((keyword, index) =>
              <li key={index} className="font-semibold">
                {keyword},
              </li>
            )
          }
        </ul>
      </div>
    } else {
      return <div className="flex flex-row gap-2 text-gray-700 italic">
        Kata kunci akan muncul di sini saat lagu dipilih
      </div>
    }
  }

  function SearchResult() {
    if (matchedSongs.length) {
      return <div>
        <div>
          Manakah lagu yang kamu maksud?
        </div>
        <ul id="search-result" className="flex flex-col gap-y-3">
          { // maybe at pagination?
            matchedSongs.map((song, index) =>
              listMatchedSong(song)
            )
          }
        </ul>

      </div>
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-center">
        <h1 className="text-3xl mb-6">Sambung Lagu</h1>
        <ul id="history" className="flex flex-col-reverse">
          {
            songs.slice(-3).map((song, index) =>
              { 
                const totalNumberOfSongsInHistory = songs.length <= 3 ? songs.length : 3;
                return createSongHistoryItem(song, index, totalNumberOfSongsInHistory)
              }
            )
          }
        </ul>
        {
          PreviousSongKeywords()
        }

        <form action="">
          <div className="sm:col-span-4">
            <label htmlFor="judulLagu" className={initialPage ? "hidden" : "block text-center"}>Judul lagu</label>
            <input id="judulLagu" name="judulLagu" value={title} onClick={(e) => initialPage ? setInitialPage(false) : setInitialPage(false) } onChange={(e) => setTitle(e.target.value)} type="text" className="block mt-3 min-w-0 grow bg-stone-900 outline rounded-full focus:outline-blue-300 sm:text-sm/6 py-1.5 px-3 text-center" placeholder="Ketik judul untuk mulai" />
          </div>
          <div className={initialPage ? "hidden" :"sm:col-span-4 mt-4"}>
            <label htmlFor="penyanyi" className="block text-center">Penyanyi</label>
            <input id="penyanyi" name="penyayi" value={artist} onChange={(e) => setArtist(e.target.value)} type="text" className="block mt-3 min-w-0 grow bg-stone-900 outline rounded-full focus:outline-blue-300 sm:text-sm/6 py-1.5 px-3 text-center" placeholder="Ketik nama penyanyi" />
          </div>
          <div className={initialPage ? "hidden" : "mt-6 flex items-center justify-center gap-x-6"}>
            <button type="button" onClick={handleSubmit} className="rounded-full bg-indigo-500 px-6 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Cari</button>
          </div>
        </form>
        {
          SearchResult()
        }
      </main>
    </div>
  );
}
