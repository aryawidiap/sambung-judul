/**
* Contents for localization
*/

export const mainPage = {
    about: {
        header: {
            id: 'Tentang Sambung Judul',
            en: 'About Sambung Judul',
        },
        content: {
            id: 'Sambung Judul adalah gim yang menggabungkan permainan sambung kata dengan permainan asosiasi lagu. Gim ini terinspirasi dari permainan yang dilakukan pengembang aplikasi saat sedang jalan-jalan bersama teman.',
            en: 'Sambung Judul is a game that combines word chain and song association game. The creation of this game was inspired by an impromptu game played by the developer and his friends when travelling.',
        },
    },
    howTo: {
        header: {
            id: 'Cara Bermain',
            en: 'How to Play',
        },
        content: {
            id: [
                {
                    stepNumber: 1,
                    image: '',
                    description: 'Ketik judul lagu dan nama penyanyi pada kolom input.'
                },
                {
                    stepNumber: 2,
                    image: '',
                    description: 'Tekan tombol "Cari"'
                },
                {
                    stepNumber: 3,
                    image: '',
                    description: 'Tekan tombol panah kanan \> untuk menambahkan lagu ke daftar lagu permainan.'
                },
                {
                    stepNumber: 4,
                    image: '',
                    description: 'Ulangi Langkah 1, tetapi sekarang judul lagu harus mengandung minimal satu kata dari lagu sebelumnya. Selamat bermain!'
                },
            ],
            en: [
                {
                    stepNumber: 1,
                    image: '',
                    description: 'Type the title of the song and the artist in their respective field.'
                },
                {
                    stepNumber: 2,
                    image: '',
                    description: 'Click the "Search" button'
                },
                {
                    stepNumber: 3,
                    image: '',
                    description: 'Click the right arrow  sign (>) to add the song to current game\'s song list'
                },
                {
                    stepNumber: 4,
                    image: '',
                    description: 'Repeat Step 1, but now, the title of the new song has to contain one of words from the previous song. Have fun playing!'
                },
            ],
        },
    },
    newGame: {
        id: "Mulai permainan baru",
        en: 'Start a new game',
    },
    madeWith: {
        id: "",
        en: ""
    }
}

export const footer = {
    madeWith: {
        id: "Dibuat dengan MusicBrainz DB",
        en: "Developed with MusicBrainz DB",
    }
}

export const searchForm = {
    title: {
        label: {
            id: 'Judul lagu',
            en: 'Song title',
        },
        placeholder: {
            initialPage: {
                id: 'Ketik judul lagu untuk mulai',
                en: 'Type a song title to start',
            },
            fullForm: {
                id: 'Ketik judul lagu di sini',
                en: 'Type a song title here',
            },
        },
    },
    artist: {
        label: {
            id: 'Penyanyi',
            en: 'Artist',
        },
        placeholder: {
            id: 'Ketik nama penyanyi di sini',
            en: 'Type the artist name here',
        },
    },
    submitButton: {
        id: 'Cari',
        en: 'Search',
    }
}

export const songKeywords = {
    header: {
        id: 'Kata kunci',
        en: 'Keywords',
    },
    placeholder: {
        id: 'belum ada lagu sebelumnya ;D',
        en: 'no song in the your history yet ;D',
    }
}

export const searchResult = {
    header: {
        id: 'Manakah lagu yang kamu maksud?',
        en: 'Which song do you want to choose?',
    },
    notFoundMessage: {
        id: 'Lagu tidak ditemukan :(',
        en: 'We could not find the song :('
    },
}

export const searchHistory = {}
