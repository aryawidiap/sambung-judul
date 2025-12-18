import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
library.add(fas)

import Song from "../_model/Song";
import { AnimatePresence, motion } from "motion/react";

/**
 * Getting the cover art of a song by calling  API
 * @returns url of the cover art image
 */
const getSongCoverArt = async () => {
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

interface SongHistoryListItemProps {
    song: Song;
    className: string;
}

export function SongHistoryListItem({ song, className }: SongHistoryListItemProps) {
    return (
        <motion.li
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ ease: "easeInOut" }}
            id={song.id}
            className={"transition duration-500 ease-in-out outline rounded-xl bg-white/30 backdrop-blur-xs w-xs" + className}>

            <SongDetails song={song} />
        </motion.li>

    );
}

interface SongSearchListItemProps {
    song: Song;
    addSong: Function;
}

// @ts-ignore
const angleRightIcon: IconProp = "fa-solid fa-angle-right";

export function SongSearchListItem({ song, addSong }: SongSearchListItemProps) {
    console.log(song.id);
    return (
        <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id={song.id}
            className="outline rounded-xl bg-white/30 backdrop-blur-xs relative w-xs">
            <SongDetails song={song} />
            <button className="ps-5 absolute inset-y-0 right-0 
      text-white/50
      hover:bg-linear-to-r hover:from-white/0 hover:to-white/80 
      hover:text-stone-800 
      active:ps-20
      rounded-r-xl
      transition" onClick={() => {
                    addSong(song)
                }}>
                <FontAwesomeIcon icon={angleRightIcon} />
            </button>
        </motion.li>
    );
}

function SongDetails({ song }: { song: Song }) {
    return (
        <div className="flex flex-row items-center p-3 me-1">
            <div className="album-cover rounded-md bg-blue-100 size-[80px] min-w-[80px] min-h-[80px] overflow-clip">
                <img src={song.songCoverArtLink === '' ? `/music_placeholder.png` : song.songCoverArtLink} alt="" className="object-cover h-auto w-full" />
            </div>
            <div className="ml-3 min-w-0">
                <div className="group relative">
                    <h3 className="text-md font-semibold w-2xs overflow-hidden text-nowrap text-ellipsis capitalize">{song.title}</h3>
                    <div className="tooltip absolute invisible group-hover:visible bg-neutral-200 text-stone-900 rounded transition px-2 py-1 text-sm text-center bottom-[100%] capitalize">{song.title}</div>
                </div>
                <div className="text-sm">{song.artist}</div>
                <div className="text-sm w-[4ch]">{song.year}</div>
            </div>
        </div>
    );
}
