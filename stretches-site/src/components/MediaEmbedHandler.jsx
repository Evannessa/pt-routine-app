import React from 'react';
import ActionModal from "./ActionModal";

const MediaEmbedHandler = () => {
    // const [showModal, setShowModal] = React.useState({
    //     isOpen: false,
    //     currentModalIndex: -1,
    // }); //whether or not we want to show the modal
    // const modalInfo = [
    //     {
    //         name: "spotifyLink",
    //         description: <span>Copy paste a Spotify link here to embed a Spotify Episode or Playlist.</span>,
    //         type: "embed",
    //         onSubmit: linkSpotify,
    //     },
    //     {
    //         name: "youtubeLink",
    //         title: "Embed Youtube Video or Playlist",
    //         description: <span>Copy paste a Youtube link here to embed a YouTube Video or Playlist.</span>,
    //         type: "embed",
    //         onSubmit: linkYoutube,
    //     },
    // ];
    // /**
    //  *
    //  * @param {any} data - add link to spotify
    //  */
    // function linkSpotify(data) {
    //     console.log(data);
    //     setFormData((oldData) => {
    //         return { ...oldData, spotifyLink: data };
    //     });
    // }
    // function linkYoutube(data) {
    //     setFormData((oldData) => {
    //         return { ...oldData, youtubeLink: data };
    //     });
    // }

    // function closeModal() {
    //     setShowModal({ isOpen: false, currentModalIndex: -1 });
    // }


    return (
        <>
  {/* {showModal.isOpen && (
                <ActionModal
                    open={showModal.isOpen}
                    title={modalInfo[showModal.currentModalIndex].name}
                    description={modalInfo[showModal.currentModalIndex].description}
                    type={modalInfo[showModal.currentModalIndex].type}
                    primaryAction={modalInfo[showModal.currentModalIndex].onSubmit}
                    secondaryAction={closeModal}
                    cancelAction={closeModal}
                    currentValue={formData[modalInfo[showModal.currentModalIndex].name]}
                ></ActionModal>
            )}
            
        </> */}
        </>
    );
}

export default MediaEmbedHandler;
