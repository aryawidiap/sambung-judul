import Song from "../_model/Song";
import SongImage from "./SongImage";

export default function SongDetails({ song }: { song: Song; }) {
    return (
        <div className="flex flex-row items-center p-3 me-1">
            <div className="album-cover rounded-md bg-blue-100 size-[80px] min-w-[80px] min-h-[80px] overflow-clip">
                <SongImage songCoverArtLink={song.songCoverArtLink} />
            </div>
            <div className="ml-3 min-w-0 text-stone-700">
                <div className="group relative w-100">
                    <h3 className="text-md font-semibold w-2xs overflow-hidden text-nowrap text-ellipsis capitalize w-100">{song.title}</h3>
                    <div className="tooltip absolute invisible group-hover:visible bg-neutral-200 text-stone-900 rounded transition px-2 py-1 text-sm text-center bottom-[100%] capitalize">{song.title}</div>
                </div>
                <div className="text-sm">{song.artist}</div>
                <div className="text-sm w-[4ch]">{song.year}</div>
            </div>
        </div>
    );
}
