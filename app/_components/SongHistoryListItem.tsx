import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from "motion/react";
import SongDetails from "./SongDetails";
import SongHistoryListItemProps from "../_interfaces/SongHistoryListItemProps";

library.add(fas)

export default function SongHistoryListItem({ song, className }: SongHistoryListItemProps) {
    return (
        <motion.li
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ ease: "easeInOut" }}
            id={song.id}
            className={"transition duration-500 ease-in-out outline rounded-xl bg-white/50 backdrop-blur-xs w-xs " + className}>

            <SongDetails song={song} />
        </motion.li>

    );
}

