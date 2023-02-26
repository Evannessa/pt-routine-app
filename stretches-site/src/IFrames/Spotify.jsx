import React from "react";

export default function Spotify(props) {
    return (
        <div>
            {props.music && (
                <iframe
                    src="https://open.spotify.com/embed/playlist/3aI7ztMmDhMHhYe1KOPFLG?utm_source=generator&theme=0"
                    title="videoGameMusic"
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
            )}
            {props.podcast && (
                <iframe
                    src="https://open.spotify.com/embed/show/4pqW0HTIeZcx7vqHpwzmZj?utm_source=generator&theme=0&t=0"
                    title="noSuchThingAsFish"
                    width="100%"
                    height="232"
                    frameBorder="0"
                    allowfullscreen=""
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
            )}
        </div>
    );
}
