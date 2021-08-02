import React from "react";
import { Artist } from "../@types/currentSong";

interface SongDetailsProps {
    artwork: string;
    songURL: string;
    name: string;
    artists: Artist[];
}
export const SongDetails: React.FC<SongDetailsProps> = ({
    artwork,
    name,
    songURL,
    artists
}) => (
    <div className="details">
        <img src={artwork} alt={`${name} - ${artists[0].name}`} />
        <div>
            <a href={songURL} target="_blank" rel="noopener noreferrer" className="song">{name}</a>
            <div className="artists">
                {artists.map((artist, index) => <a 
                    href={artist.external_urls.spotify} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="artist"
                >{artist.name}{index < (artists.length - 1) ? ", " : ""}</a>
            )}
            </div>
        </div>
    </div>
)