const path = require("path");

const fileUpload = require("express-fileupload");
const uploadImage = async (req, res) => {
    // console.log(req);
    const slideImage = req.files.image; //get the image data from the upload
    const imagePath = path.join(__dirname, "../public/uploads/" + `${slideImage.name}`);
    //get the path we want to move it to in tue public folder
    await slideImage.mv(imagePath);
    //move the image to the image path

    //send the data back
    return res.status(200).json({ image: { src: `/uploads/${slideImage.name}` } });

    res.status(200).send("upload product image");
};

module.exports = {
    uploadImage,
};
