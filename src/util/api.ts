import axios, { CancelToken } from "axios";
import { CancelPromise } from "../@types/cancelPromise";
import { currentlyPlayingType } from "../@types/currentSong";
import { SingleLyric } from "../@types/lyric";
import { APIClient } from "../App";

export const API = axios.create({
    baseURL: process.env.REACT_APP_API,
    withCredentials: true
})

export const getCurrentlyPlaying = (cancelToken: CancelToken): CancelPromise<currentlyPlayingType> => {

    return new Promise(async (resolve, reject) => {

        try {

            const { data } = await API.get("/api/getCurrentSong");

            resolve(data);

        } catch (e) {
            if(!axios.isCancel(e)) {
                reject(e);
            }
        }
    
    })

}
export const getLyrics = (artist: string, title: string, cancelToken: CancelToken): CancelPromise<SingleLyric[]> => {

    return new Promise(async (resolve, reject) => {

        if(artist === "" || title === "") {
            reject();
        }        
        
        try {

            const { data } = await API.get("/api/getLyrics", {
                params: {
                    artist,
                    title
                }
            });

            resolve(data);

        } catch (e) {
            if(!axios.isCancel(e)) {
                reject(e);
            }
        }
    
    })

}

export const performSongAction = (action: "play" | "pause" | "next" | "previous"): Promise<{ result: string; }> => {

    return new Promise(async (resolve, reject) => {

        try {

            const { data } = await API.get("/api/" + action);
            resolve(data);

            if(['next', 'previous'].includes(action)) {
                APIClient.invalidateQueries("currently-playing-song");
            }

        } catch (e) {
            if(!axios.isCancel(e)) {
                reject(e);
            }
        }
    
    })

}

export const seekTo = (position: number): Promise<{ result: string; }> => {

    return new Promise(async (resolve, reject) => {

        try {

            const { data } = await API.get("/api/seek", {
                params: {
                    position
                }
            });
            resolve(data);

        } catch (e) {
            if(!axios.isCancel(e)) {
                reject(e);
            }
        }
    
    })

}
