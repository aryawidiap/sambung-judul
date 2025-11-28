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
    title: 'Time for the moon night',
    year: 2018,
    artist: 'IVE'
  },
]

export default function Home() {
  const [songs, setSongs] = useState<Array<Song>>(SAMPLE_SONGS);
  const [title, setTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [keywords, setKeywords] = useState<Array<string>>([]);
  let id = 3

  // setSongs(SAMPLE_SONGS);
  const handleSubmit = () => {
    setSongs(
      [
        ...songs,
        {
          id: id.toString(),
          title: title,
          year: 2018,
          artist: artist
        }
      ]
    );
    setKeywords(title.toLowerCase().split(" "))
    console.log(setKeywords);
    id++;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1>Sambung Lagu</h1>
        <ul id="history" className="flex flex-col">
          {/* TODO: The code below should be an exampe on how to make a blurry card
I just havent discovered how to pass the index to the className
so that the bluriness depends on the index */}
          <li id="album21094" className="flex flex-row p-3 outline rounded-xl bg-white/30 blur-[2px] scale-90">
            <div className="album-cover rounded-md bg-blue-100 size-[72px]"></div>
            <div className="song-description ml-3">
              <div className="flex flex-row ">
                <h3>Time for the moon night</h3>
                <div className="ml-2">2018</div>
              </div>
              <div>
                GFRIEND
              </div>
            </div>
          </li>
          {
            songs.slice(-3).map(song =>
              <li id={song.id} className="flex flex-row p-3 outline rounded-xl bg-white/30">
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
            )
          }
        </ul>
        
        <div>
          <h2>Salah satu kata ini harus ada di judul lagu selanjutnya</h2>
          <ul className="flex flex-row gap-2">
            {
              keywords.map((keyword, index) => 
                <li key={index} className="outline px-3 rounded-full bg-green-800">
                  {keyword}
                </li>
              )
            }
          </ul>
        </div>
        <form action="">
          <div className="sm:col-span-4">
            <label htmlFor="judulLagu" className="block text-center">Judul lagu</label>
            <input name="judulLagu" value={title} onChange={(e) => setTitle(e.target.value)} type="text" className="block mt-3 min-w-0 grow bg-stone-900 outline rounded-full focus:outline-blue-300 sm:text-sm/6 py-1.5 px-3 text-center" placeholder="Ketik judul untuk mulai" />
          </div>
          <div className="sm:col-span-4 mt-6">
            <label htmlFor="penyanyi" className="block text-center">Penyanyi</label>
            <input name="penyayi" value={artist} onChange={(e) => setArtist(e.target.value)} type="text" className="block mt-3 min-w-0 grow bg-stone-900 outline rounded-full focus:outline-blue-300 sm:text-sm/6 py-1.5 px-3 text-center" placeholder="Ketik nama penyanyi" />
          </div>
          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button type="button" onClick={handleSubmit} className="rounded-full bg-indigo-500 px-6 py-2 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">Cari</button>
          </div>
        </form>
        <div>
          <div>
            Manakah lagu yang kamu maksud?
          </div>
          <ul id="search-result" className="flex flex-col gap-y-3">


            <li id="album21092" className="flex flex-row p-3 outline rounded-xl bg-white/30">
              <div className="album-cover rounded-md bg-blue-100 size-[72px]"></div>
              <div className="song-description ml-3">
                <div className="flex flex-row ">
                  <h3>Fever</h3>
                  <div className="ml-2">2019</div>
                </div>
                <div>
                  GFRIEND
                </div>
              </div>
            </li>
            <li id="album21094" className="flex flex-row p-3 outline rounded-xl bg-white/30">
              <div className="album-cover rounded-md bg-blue-100 size-[72px]"></div>
              <div className="song-description ml-3">
                <div className="flex flex-row ">
                  <h3>Fever</h3>
                  <div className="ml-2">2019</div>
                </div>
                <div>
                  GFRIEND
                </div>
              </div>
            </li>
          </ul>

        </div>
      </main>
    </div>
  );
}
