'use client';

import Link from "next/link";
import { footer as footerContent } from "../_utils/content";

export default function Footer() {
    return <footer className="flex flex-col gap-2 md:flex-row md:gap-5 my-3">
        <Link className="hover:underline hover:text-transparent hover:bg-linear-to-r hover:from-fuchsia-600 hover:to-orange-600 hover:bg-clip-text hover:text-shadow-md hover:text-shadow-white/10" href="https://musicbrainz.org/doc/MusicBrainz_API">
            {footerContent.madeWith['en']}
        </Link>
        <div className="flex flex-row gap-5 mx-auto">
            <Link className="hover:underline hover:text-transparent hover:bg-linear-to-r hover:from-white hover:via-white hover:to-gray-600 hover:bg-clip-text hover:text-shadow-md hover:text-shadow-white/10" href="https://github.com/aryawidiap">Github</Link>
            <Link className="hover:underline hover:text-transparent hover:bg-linear-to-r hover:from-fuchsia-500 hover:via-orange-500 hover:to-amber-300 hover:bg-clip-text hover:text-shadow-md hover:text-shadow-white/10" href="https://instagram.com/aryaw.portfolio">Instagram</Link>
        </div>
    </footer>;
}
