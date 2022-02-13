const fileUpload = require("express-fileupload");
const uploadImage = async (req, res) => {
    // console.log(req);
    console.log("Files are", req.files);
    res.status(200).send("upload product image");
};

module.exports = {
    uploadImage,
};
