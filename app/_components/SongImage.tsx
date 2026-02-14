import Image from "next/image";


export default function SongImage({ songCoverArtLink }: { songCoverArtLink: string; }) {
    return <Image src={songCoverArtLink === '' ? `/music_placeholder.png` : songCoverArtLink} alt="" className="object-cover h-auto w-full" height={300} width={300}/>;
}
