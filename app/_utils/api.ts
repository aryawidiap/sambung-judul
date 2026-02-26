import Song from "../_model/Song";

/**
 * Getting the cover art of a song by calling  API
 * @returns url of the cover art image
 */
export async function getSongCoverArt(releaseMbid: string) {
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

        if (response.ok) {
            const data = await response.json();
            const imageData = data['images'][0];
            const thumbnailLink = imageData['thumbnails']['500'] as string;

            if (thumbnailLink) {
                return thumbnailLink;
            }

            return '';
        } else {
            // not found, just return empty string
            if (response.status === 404) {
                return '';
            }
            // other errors, might be important to know
            throw 'An error that is not a \'not found\' error occurs: \n'
            + response.status
            + response.statusText;
        }
    } catch (error) {
        console.log(error);
    }

    return '';
}

export async function getSongList({ title, artist, previousSongIds }: { title: string, artist: string, previousSongIds: string[] }) {
    try {
        const baseUrl = encodeURI(`https://musicbrainz.org/ws/2/recording?query=recording:"(title)" AND artist:"(artist)"`)
        const encodedTitle = encodeURIComponent(title);
        const encodedArtist = encodeURIComponent(artist);
        const urlWithParameter = baseUrl.replace("(title)", encodedTitle).replace("(artist)", encodedArtist)
        const response = await fetch(
            urlWithParameter,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                }
            }
        );
        const data = await response.json();

        const songList = (data.recordings.map((song: any) => {
            const releases = song['releases'];
            if (!releases) {
                return null;
            }

            const firstRelease = releases[0]
            if (!firstRelease) {
                return null;
            }

            const firstReleaseId = firstRelease['id'];
            if (!firstReleaseId) {
                return null;
            }

            return {
                id: song["id"],
                title: song["title"],
                year: song["first-release-date"] ? song["first-release-date"].split('-')[0] : 'unknown',
                artist: song["artist-credit"][0]["name"],
                songCoverArtLink: '',
                releaseId: firstReleaseId,
            } as Song;
        }) as Song[])
            .filter((song) => song !== null)
            // do not include all the songs already added to history
            .filter((song) => !previousSongIds.includes(song.id));

        const songCoverArtLinks = await Promise.all(songList.map((song) => getSongCoverArt(song.releaseId)))
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