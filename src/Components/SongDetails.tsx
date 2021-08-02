import React from "react";

interface SongDetailsProps {
    artwork: string;
    name: string;
    artist: string;
}
export const SongDetails: React.FC<SongDetailsProps> = ({
    artwork,
    name,
    artist
}) => (
    <div className="details">
        <img src={artwork} alt={`${name} - ${artist}`} />
        <div>
            <span className="song">{name}</span>
            <span className="artist">{artist}</span>
        </div>
    </div>
)