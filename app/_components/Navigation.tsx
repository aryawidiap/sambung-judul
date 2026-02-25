'use client';
import { FaInfo, FaQuestion, FaPlus } from 'react-icons/fa6';
import { figtree } from '../fonts';
import { msMadi } from '../page';

export function Navigation({ initialPage, newGame, openAboutModal, openHowToModal, startNewGame, changeLanguage, language }: { initialPage: boolean; newGame: boolean; openAboutModal: () => void; openHowToModal: () => void; startNewGame: () => void; changeLanguage: (language: string) => void; language: string }) {
    const newGameButtonClassName = newGame ?
        "position-absolute cursor-not-allowed opacity-50"
        : "position-absolute cursor-pointer hover:*:fill-blue-200";

    const toggleLanguage = () => {
        if (language === 'id') {
            changeLanguage('en');
        }

        if (language === 'en') {
            changeLanguage('id');
        }
    }

    return <nav>
        <h1 className={"text-3xl my-3 transition " + msMadi.className + (initialPage ? "" : "")}>Sambung
            <span className={figtree.className + " font-bold uppercase text-2xl"}>Judul</span>
        </h1>
        <div className='flex flex-row gap-3 justify-center'>
            <button className="position-absolute cursor-pointer hover:*:fill-blue-200" onClick={openAboutModal}><FaInfo /></button>
            <button className="position-absolute cursor-pointer hover:*:fill-blue-200" onClick={openHowToModal}><FaQuestion /></button>
            <button className={newGameButtonClassName} onClick={startNewGame} disabled={newGame}><FaPlus /></button>
            <button className="position-absolute cursor-pointer hover:*:fill-blue-200" onClick={toggleLanguage}>{language}</button>
        </div>
    </nav>;
}
