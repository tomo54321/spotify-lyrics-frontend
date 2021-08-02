import React from "react";
import { Pause, Play, SkipBack, SkipForward } from "react-feather";
import { performSongAction } from "../util/api";

export const Controls: React.FC<{ playing: boolean; }> = ({
    playing
}) => (

    <div className="controls">
        <button 
            onClick={() => performSongAction("previous")} 
            className="action skip"
        >
            <SkipBack />
        </button>

        <button 
            onClick={() => playing ? performSongAction("pause") : performSongAction("play")}
            className="action play-state"
        >
            { playing ? <Pause /> : <Play /> }
        </button>

        <button 
            onClick={() => performSongAction("next")} 
            className="action skip"
        >
            <SkipForward />
        </button>
    </div>

)