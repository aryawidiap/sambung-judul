import Song from "../_model/Song";

/**
 * Getting the cover art of a song by calling  API
 * @returns url of the cover art image
 */
export async function getSongCoverArt (releaseMbid: string) {
    try {
        const url = encodeURI(`http://coverartarchive.org/release/${encodeURIComponent(releaseMbid)}`);
        const response = await fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            }
        );
        const data = await response.json();
        console.log(data);

        const imageData = data['images'][0];
        const thumbnailLink = imageData['thumbnails']['500'] as string;

        return thumbnailLink;
    } catch (error) {
        console.log(error);
    }

    return '';
}

export async function getSongList({ title, artist, previousSongIds }: { title: string, artist: string, previousSongIds: string[] }) {
    try {
        const url = encodeURI(`https://musicbrainz.org/ws/2/recording?query=recording:${encodeURIComponent(title)} AND artist:${encodeURIComponent(artist)}`);
        const response = await fetch(
            url,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            }
        );
        const data = await response.json();
        // console.log(data);


        const songList = (data.recordings.map((song: any) => {
            const releaseId = song['releases'][0]['id'];

            return {
                id: song["id"],
                title: song["title"],
                year: song["first-release-date"] ? song["first-release-date"].split('-')[0] : 'unknown',
                artist: song["artist-credit"][0]["name"],
                songCoverArtLink: '',
                releaseId: releaseId,
            } as Song
        }) as Song[])
            // do not include all the songs already added to history
            .filter((song) => !previousSongIds.includes(song.id));

        const songCoverArtLinks = await Promise.all(songList.map((song) => getSongCoverArt(song.releaseId)))
        console.log(songCoverArtLinks)

        const songListWithImage = songList.map((song, index) => {
            return {
                id: song.id,
                title: song.title,
                year: song.year,
                artist: song.artist,
                songCoverArtLink: songCoverArtLinks[index],
                releaseId: song.releaseId,
            } as Song;
        })


        return songListWithImage;
    } catch (error) {
        console.log(error);
    }
    return [] as Song[];
}