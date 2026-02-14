import Song from "../_model/Song";

export default interface SongSearchListItemProps {
    song: Song;
    addSong: (song: Song) => void;
}
