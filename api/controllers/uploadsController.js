const path = require("path");
const fs = require('fs')
let mongoose = require("mongoose");

const uploadImage = async (req, res) => {
    console.log("Our files are", req.files);
    const slideImage = req.files.image; //get the image data from the upload
    const imagePath = path.join(__dirname, "../public/uploads/" + `${slideImage.name}`);
    //get the path we want to move it to in tue public folder
    await slideImage.mv(imagePath);
    //move the image to the image path

    if (!slideImage) {
        //send the data back
        return res.status(500).json({ msg: "Something went wrong" });
    }
    return res.status(200).json({ image: { src: `/uploads/${slideImage.name}` } });
};

const getImage = async (req, res) => {
    try {
        const slideImageName = req.imageName
        const folder = path.join(__dirname, "../public/uploads/")
        fs.readdir(folder, (err, files) => {
            const imgFiles = files.filter((file) => {
                const extensions = [".png", ".jpg", ".webp", ".jpeg", ".gif"]
                return extensions.includes(path.extname(file).toLowerCase())
            })
            res.status(200).json({ document: imgFiles });
        })

    } catch (err) {

        res.status(500).json({ msg: "Something went wrong" });
    }


}

const getAllUploads = async (req, res) => {
    try {
        const folder = path.join(__dirname, "../public/uploads/")
        fs.readdir(folder, (err, files) => {
            const imgFiles = files.filter((file) => {
                const extensions = [".png", ".jpg", ".webp", ".jpeg", ".gif"]
                return extensions.includes(path.extname(file).toLowerCase())
            })
            res.status(200).json({ document: imgFiles });
        })

    } catch (err) {

        res.status(500).json({ msg: "Something went wrong" });
    }



}

module.exports = {
    uploadImage,
    getAllUploads,
    getImage
};
