import React from "react";

export const LyricsStatus: React.FC<{ loading: boolean; }> = ({
    loading
}) => {

    return (
        <div 
            className="lyrics-container"
        >
            <div className="message">
                <h1>
                    {loading ? "Fetching Lyrics" : "Lyrics not available"}
                </h1>
                {
                    !loading && <span className="sub-error">Lyrics are not available for this song, sorry!</span>
                }
            </div>
        </div>
    )

}