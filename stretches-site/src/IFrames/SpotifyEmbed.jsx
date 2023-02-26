import React from "react";

function SpotifyEmbed(props) {
    function convertEmbedLink(url) {
        let type = "track";
        if (url.includes("playlist")) {
            type = "playlist";
        } else if (url.includes("show")) {
            type = "show";
        }
        console.log(type);
        let convertedUrl = url.replace(type, `embed/${type}`);
        convertedUrl = convertedUrl.replace(/\?.*$/, `?utm_source=generator&theme=0`);
        // console.log(convertedUrl);
        return convertedUrl;
        // return convertedUrl;
    }

    return (
        <div>
            <iframe
                src={convertEmbedLink(props.src)}
                title={props.title}
                style={{ borderRadius: "12px" }}
                width="100%"
                height="380"
                frameBorder="0"
                allowFullScreen="true"
                allowautoplay="true"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
        </div>
    );
}

export default SpotifyEmbed;
