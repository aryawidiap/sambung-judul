import { AnimatePresence, motion } from "motion/react";
import Song from "../_model/Song";
import SongImage from "./SongImage";

export default function SongDetails({ song, expandTitleFromExternal }: { song: Song, expandTitleFromExternal: boolean }) {

    return (
        <div className="flex flex-row items-center p-3 me-1">
            <div className="album-cover rounded-md bg-blue-100 size-[80px] min-w-[80px] min-h-[80px] overflow-clip">
                <SongImage songCoverArtLink={song.songCoverArtLink} />
            </div>
            <div className="ml-3 min-w-0 text-stone-700">
                <div className="group relative w-100">
                    <AnimatePresence>
                        <motion.h3
                            style={{
                                height: expandTitleFromExternal ? "auto" : "1lh",
                                textWrap: expandTitleFromExternal ? "wrap" : "nowrap"
                            }}
                            transition={{ ease: "easeInOut" }}
                            whileHover={{ height: "auto", textWrap: "wrap" }}
                            className="text-md font-semibold w-2xs overflow-hidden text-ellipsis capitalize w-50"
                        >
                            {song.title}
                        </motion.h3>
                    </AnimatePresence>
                </div>
                <div className="text-sm">{song.artist}</div>
                <div className="text-sm w-[4ch]">{song.year}</div>
            </div>
        </div>
    );
}
