import { AnimatePresence } from "motion/react"
import Song from "../_model/Song"
import SongSearchListItem from "./SongSearchListItem"
import { SearchResultProps } from "../_interfaces/Props"
import { useContext, useEffect, useState } from "react";
import { getSongList } from "../_utils/api";
import Image from "next/image";
import LanguageContext from "../_context/LanguageContext";
import { searchResult } from "../_utils/content";

/**
 * Renders the search result.
 * @returns List of the songs from the search result.
 */
export default function SearchResult({ searchedSong, addNewSong, previousSongIds }: SearchResultProps) {
    const searchingForSong = searchedSong.title !== '' && searchedSong.artist !== '';
    const [matchedSongs, setMatchedSongs] = useState<Array<Song>>([]);
    const language = useContext(LanguageContext);
    const { header: headerContent} = searchResult;

    useEffect(() => {
        if (searchingForSong) {
            const { title, artist } = searchedSong;
            const getMatchedSongs = ({ title, artist, previousSongIds }: { title: string, artist: string, previousSongIds: string[] }) => {
                // API Call to musicBrainz API
                return getSongList({ title, artist, previousSongIds });
            }
            const fetchSongs = async () => {
                const songs = await getMatchedSongs({ title, artist, previousSongIds });
                setMatchedSongs(songs);
            }

            fetchSongs();
        }

        return () => {
            setMatchedSongs([]);
        };
    }, [searchingForSong, searchedSong, previousSongIds]);

    /**
     * @todo handle if no song match found
     */

    if (searchingForSong) {
        if (matchedSongs.length === 0) {
            return (
                <div className="animate-pulse">
                    <Image src='/loading-songs-smaller-magnifier.gif' width='200' height='200' alt="loading icon" />
                    <p className="text-center tracking-wider">Loading songs</p>
                </div>
            )
        }
        return <div className="flex flex-col items-center">
            <div className="mb-2">
                {headerContent[language]}
            </div>
            <ul id="search-result" className="flex flex-col items-center gap-y-3 max-h-70 overflow-x-clip overflow-y-scroll py-2 px-4 snap-y">
                <AnimatePresence>
                    {
                        matchedSongs.map(song => {
                            return <SongSearchListItem
                                song={song}
                                addSong={addNewSong}
                                key={song.id}
                            />
                        })
                    }
                </AnimatePresence>
            </ul>
        </div>
    }
}
