import React from "react";
import { performSongAction } from "../util/api";

export const Controls: React.FC<{ playing: boolean; }> = ({
    playing
}) => (

    <div className="controls">
        <button onClick={() => performSongAction("previous")}>Previous</button>
        <button onClick={() => playing ? performSongAction("pause") : performSongAction("play")}>{ playing ? "Pause" : "Play" }</button>
        <button onClick={() => performSongAction("next")}>Next</button>
    </div>

)