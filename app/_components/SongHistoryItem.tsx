import Song from "../_model/Song";
import { AnimatePresence, motion } from "motion/react";

interface SongHistoryItemProps {
    song: Song;
    className: string;
}
export default function SongHistoryItem({ song, className }: SongHistoryItemProps) {
    return (
        <AnimatePresence>
            <motion.li 
            initial={{opacity: 0, scale: 1.1}}
            animate={{opacity: 1, scale: 1}}
            exit={{opacity: 0, scale: 0}}
            transition={{ease: "easeInOut"}}
            id={song.id} 
            className={className}>
                <div className="album-cover rounded-md bg-blue-100 size-[72px]"></div>
                <div className="song-description ml-3">
                    <div className="flex flex-row">
                        <h3 className="w-25">{song.title}</h3>
                        <div className="ml-2 w-[4ch]">{song.year}</div>
                    </div>
                    <div>
                        {song.artist}
                    </div>
                </div>
            </motion.li>
        </AnimatePresence>

    );
}