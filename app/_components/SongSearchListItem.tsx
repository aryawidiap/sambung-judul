import SongSearchListItemProps from "../_interfaces/SongSearchListItemProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp, library } from '@fortawesome/fontawesome-svg-core'
/* import all the icons in Free Solid, Free Regular, and Brands styles */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { motion } from "motion/react";
import SongDetails from "./SongDetails";
import { useState } from "react";


export default function SongSearchListItem({ song, addSong }: SongSearchListItemProps) {
    library.add(fas);
    // @ts-expect-error Type '"fa-solid fa-angle-right"' is not assignable to type 'IconProp'.
    const angleRightIcon: IconProp = "fa-solid fa-angle-right";
    
    const [addButtonIsFocused, setAddButtonIsFocused] = useState(false);

    const handleAddButtonFocus = () => {
        setAddButtonIsFocused(true);
    }

    const handleAddButtonBlur = () => {
        setAddButtonIsFocused(false);
    }
    
    return (
        <motion.li
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            id={song.id}
            className="outline rounded-xl bg-white/50 backdrop-blur-xs relative w-xs ">
            <SongDetails song={song} buttonFocus={addButtonIsFocused}/>
            <button className="ps-5 absolute inset-y-0 right-0 snap-start scroll-mt-2 scroll-smooth
      text-white/50
      hover:bg-linear-to-r hover:from-white/0 hover:to-white/80 
      hover:text-stone-800 
      active:ps-20
      rounded-r-xl
      transition" onClick={() => {
                    addSong(song)
                }}
                
                onFocus={handleAddButtonFocus}
                onBlur={handleAddButtonBlur}
                >
                <FontAwesomeIcon icon={angleRightIcon} />
            </button>
        </motion.li>
    );
}





