import { AnimatePresence, motion } from "motion/react";
import Song from "../_model/Song";
import SongHistoryListItem from "./SongHistoryListItem";

/**
 * 
 * @param param0 
 * @returns 
 */
export default function SongHistory({ displayedSongs }: { displayedSongs: Song[] }) {
    // ref: https://github.com/tailwindlabs/tailwindcss/discussions/3461
    const blurClass = {
        default: '',
        1: '',
        2: 'blur-[1px]',
        3: 'blur-[2px]',
        4: 'blur-[3px]',
    } as { [key: number]: string };

    const scaleClass = {
        1: '',
        2: 'scale-90 origin-center',
        3: 'scale-80 origin-center',
        4: 'scale-85 origin-center',
    } as { [key: number]: string };

    const offsetClass = {
        1: '',
        2: 'absolute left-[-3rem]',
        3: 'absolute left-[-6rem]',
        4: 'absolute left-[-9rem]',
    } as { [key: number]: string };

    const historyNotEmpty = displayedSongs.length !== 0;
    return (
        <AnimatePresence>
            {
                historyNotEmpty &&
                <motion.ul
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ opacity: 0 }}
                    id="history"
                    className="flex flex-row items-center relative mb-3"
                >
                    <AnimatePresence>
                        {
                            displayedSongs.map((song, index) => {
                                const numberOfDisplayedSongs = displayedSongs.length;
                                const variableClassName = ` ${blurClass[numberOfDisplayedSongs - index]} ${scaleClass[numberOfDisplayedSongs - index]} ${offsetClass[numberOfDisplayedSongs - index]}`;

                                return (
                                    <SongHistoryListItem
                                        song={song}
                                        className={variableClassName}
                                        key={song.id}
                                    />
                                );
                            })
                        }
                    </AnimatePresence>
                </motion.ul>
            }
        </AnimatePresence>

    );
}
