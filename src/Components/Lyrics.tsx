import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { SingleLyric } from "../@types/lyric";
import { seekTo } from "../util/api";

export const Lyrics: React.FC<{ lyrics: SingleLyric[]; currentTime: number; }> = ({
    lyrics,
    currentTime
}) => {

    const container = useRef<HTMLDivElement | null>(null);
    const [manualScroll, setManualScroll] = useState(false);
    const [currentLyricSeconds, setCurrentLyricSeconds] = useState(0);

    useEffect(() => {
        
        const currentLyric = lyrics.reduce((previous, current) => {
            if(Math.abs(current.seconds - currentTime) < Math.abs(previous.seconds - currentTime)) {
                return current;
            } else {
                return previous;
            }
        });

        setCurrentLyricSeconds(currentLyric.seconds);

    }, [currentTime, lyrics]);

    useEffect(() => {
        if(manualScroll){ return; }

        const el = document.querySelector("[data-seconds='"+currentLyricSeconds+"']");
        if(el) {
            container.current?.scrollTo({
                top: (el as any).offsetTop - 200,
                behavior: "smooth"
            });
        }

    }, [manualScroll, currentLyricSeconds]);

    return (
        <div 
            ref={ref => container.current = ref} 
            className={"lyrics-container" + (manualScroll ? " illuminate" : "")}
            onTouchMove={() => setManualScroll(true)}
            onWheel={() => setManualScroll(true)}
        >
            {lyrics.map((lyric, index) => (
                <div 
                    key={`lyric-${index}-at-${lyric.seconds}sec`}
                    className={`lyric ${currentLyricSeconds === lyric.seconds ? "current" : ""}`}
                    data-seconds={lyric.seconds}
                    onClick={() => {
                        seekTo(lyric.seconds * 1000);
                        setManualScroll(false);
                    }}
                >{lyric.lyrics}</div>
            ))}

            {
                manualScroll && <button className="reset-lyric-scroll" onClick={() => setManualScroll(false)}>Enable Auto Scrolling</button>
            }
        </div>
    )

}