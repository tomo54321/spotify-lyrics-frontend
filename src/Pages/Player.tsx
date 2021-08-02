import axios from "axios";
import FastAverageColor from "fast-average-color";
import { useEffect } from "react";
import { useRef } from "react";
import { useQuery } from "react-query";
import { Controls } from "../Components/Controls";
import { Lyrics } from "../Components/Lyrics";
import { LyricsStatus } from "../Components/LyricsStatus";
import { SongDetails } from "../Components/SongDetails";
import { getCurrentlyPlaying, getLyrics } from "../util/api";

const fac = new FastAverageColor();

export const Player = () => {

    const currentSongId = useRef("0");

    const currentlyPlaying = useQuery("currently-playing-song", () => {
        const cancelToken = axios.CancelToken.source();

        const promise = getCurrentlyPlaying(cancelToken.token);
        promise.cancel = () => {
            cancelToken.cancel("Request cancelled");
        }

        return promise;

    }, {
        cacheTime: 1000,
        refetchInterval: 1000,
        onSuccess(data) {
            if(currentSongId.current !== data.item.id) {
                currentSongId.current = data.item.id;
                currentLyrics.refetch();

                fac.getColorAsync(data.item.album.images[0].url)
                .then(color => {
                    document.body.style.backgroundColor = color.hex;
                });

            }
        },
        onError() {
            document.body.style.backgroundColor = "";
        }
    });

    const currentLyrics = useQuery(["current-song-lyrics", currentlyPlaying.data?.item.artists[0].name, currentlyPlaying.data?.item.name ], ({ queryKey }) => {
        const cancelToken = axios.CancelToken.source();

        // eslint-disable-next-line
        let [_key, artist, name] = queryKey;
        if(!artist || !name) {
            artist = "";
            name = "";
        }

        const promise = getLyrics(artist, name, cancelToken.token);
        promise.cancel = () => {
            cancelToken.cancel("Request cancelled");
        }

        return promise;

    }, {
        enabled: currentlyPlaying.data !== undefined,
        retry: false,
        cacheTime: Infinity,
        staleTime: Infinity
    });

    useEffect(() => {
        return () => {
            document.body.style.backgroundColor = "";
        }
    }, []);


    if(currentlyPlaying.isLoading) { return <h1>Loading...</h1>}

    if (!currentlyPlaying.data) {
        return (
            <div className="nothing-playing">
                <span className="title">Nothing playing</span>
                <span className="subtitle">You're not currently listening to anything.<br />Head to Spotify and begin playing something.</span>
            </div>
        )
    }

    return (
        <div className="player">
            {
                currentLyrics.data ? 
                <Lyrics lyrics={currentLyrics.data} currentTime={Math.floor(currentlyPlaying.data.progress_ms / 1000)}/>
                : <LyricsStatus loading={currentLyrics.isLoading}/>
            }
            {
                currentlyPlaying.data.item ?
                <SongDetails 
                    name={currentlyPlaying.data.item.name}
                    artist={currentlyPlaying.data.item.artists[0].name}
                    artwork={currentlyPlaying.data.item.album.images[currentlyPlaying.data.item.album.images.length - 2].url}
                />
                : null
            }
            <Controls playing={currentlyPlaying.data.is_playing}/>            
        </div>
    )

}