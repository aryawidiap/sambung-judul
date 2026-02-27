import Image from "next/image";


export default function SongImage({ songCoverArtLink }: { songCoverArtLink: string; }) {
    const getActualSrc = (coverLink: string) => {
        if (coverLink === '') {
            return `/music_placeholder.png`;
        }
        return coverLink;
    }
    return <Image src={getActualSrc(songCoverArtLink)} alt="" className="object-cover h-auto w-full" height={300} width={300} placeholder="blur" blurDataURL="/music_placeholder.png"/>;
}
