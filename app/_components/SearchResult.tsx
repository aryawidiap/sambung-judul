import { AnimatePresence } from "motion/react"
import Song from "../_model/Song"
import SongSearchListItem from "./SongSearchListItem"
import { SearchResultProps } from "../_interfaces/Props"
import { useEffect, useState } from "react";
import { getSongList } from "../_utils/api";

/**
 * Renders the search result.
 * @returns List of the songs from the search result.
 */
export default function SearchResult({ searchedSong, addNewSong, previousSongIds }: SearchResultProps) {
    const searchingForSong = searchedSong.title !== '' && searchedSong.artist !== '';
    const [matchedSongs, setMatchedSongs] = useState<Array<Song>>([]);

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

    if (searchingForSong) {
        if(matchedSongs.length === 0) {
            return (
                <div>
                    Loading song...
                </div>
            )
        }
        return <div className="flex flex-col items-center">
            <div className="mb-2">
                Manakah lagu yang kamu maksud?
            </div>
            {/** @todo x is scrolling */}
            <ul id="search-result" className="flex flex-col items-center gap-y-3 max-h-70 overflow-y-scroll p-2">
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
