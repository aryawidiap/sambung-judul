import { AnimatePresence } from "motion/react"
import Song from "../_model/Song"
import { SongSearchListItem } from "./SongListItem"

/**
 * Renders the search result.
 * @returns List of the songs from the search result.
 */
export default function SearchResult({ matchedSongs, addNewSong }: { matchedSongs: Song[], addNewSong: Function }) {
    return <div className="flex flex-col items-center">
        <div className="mb-2">
            Manakah lagu yang kamu maksud?
        </div>
        <ul id="search-result" className="flex flex-col gap-y-3">
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
