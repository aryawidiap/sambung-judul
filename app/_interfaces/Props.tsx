import Song from "../_model/Song";

export interface SearchFormProps {
    showFullForm: boolean;
    openMainPage: () => void;
    setSearchedSong: ({ title, artist }: { title: string, artist: string }) => void;
    latestSongTitle: string;
}

export interface SearchResultProps {
    searchedSong: {title: string, artist: string};
    addNewSong: (song: Song) => void;
    /**
     * To prevent songs that have been selected before
     * showing in the search result, we filter the result
     * using the previousSongIds props.
     */
    previousSongIds: string[];
};
