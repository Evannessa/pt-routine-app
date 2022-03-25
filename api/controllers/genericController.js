export const Controller = (async function () {
    async function create(type, req, res) {
        const document = await type.create({ ...req.body });
        return res.status(201).json({ document });
    }
    async function findOrCreate(type, req, res) {
        let document = await type.findOne({ ...req.body });
        //if it doesn't exist, create it, else, return it
        if (!document) {
            document = await type.create({ ...req.body });
            return res.status(201).json({ document });
        }
        return res.status(201).json({ document });
    }
    async function createMultiple(type, req, res) {
        const document = await type
            .insertMany(req.body)
            .then((document) => res.status(201).json(document))
            .catch((error) => res.status(500).json({ msg: error }));
    }
    async function getSingle(type, req, res, next, name, populateWith) {
        const { id } = req.params;
        const document = await type.findOne({ _id: id }).populate(populateWith);
        if (!document) {
            return next(
                createCustomError(`No ${name} found with id ${id}`, 404)
            );
        }
        return res.status(200).json({ document });
    }
    async function getAll(type, req, res, next, name, populateWith = "") {
        const document = await type.find({});
        if (!document) {
            return next(createCustomError(`No ${name}s found`, 404));
        }
        if (populateWith) {
            return populate(document, populateWith, name);
        } else {
            return res.status(200).json({ document });
        }
    }
    async function populate(document, populateWith, name) {
        document.populate(populateWith).exec((error, document) => {
            if (error) {
                return next(createCustomError(`No ${name} found`, 404));
            }
            return res.status(200).json({ document });
        });
    }
    async function deleteSingle(type, req, res, next, name) {
        const { id } = req.params;
        const document = await type.findOneAndDelete({ _id: id });
        if (!document) {
            return next(createCustomError(`No ${name} found`), 404);
        }
        return res.status(200).json({ document });
    }
    async function updateSingle(type, req, res, next, name, populateWith = "") {
        const { id } = req.params;
        const document = await type
            .findOneAndUpdate({ _id: id }, { ...req.body }, { new: true })
            .populate(populateWith);
        if (!document) {
            return next(
                createCustomError(`No ${name} found with id ${id}`, 404)
            );
        }
        return res.status(200).json({ document });
        if (populateWith) {
            return populate(document, populateWith, name);
        } else {
            return res.status(200).json({ document });
        }
    }
    async function updateSubDocument(type, req, res, next, name) {}

    async function deleteMultiple(type, req, res, next, name) {
        const document = await type.deleteMany(req.body);
        if (document.deleteCount === 0) {
            return next(createCustomError(`No documents deleted`), 404);
        }
        return res.status(200).json({ document });
    }
    async function updateMultiple(type, req, res, next, name) {
        const document = await type.updateMany(
            req.body.filter,
            req.body.updateData,
            { new: true }
        );
        if (document.matchedCount == 0) {
            return res
                .status(404)
                .json({
                    msg: "No " + name + " documents matching that filter",
                });
        }
        if (document.modifiedCount == 0) {
            return res
                .status(500)
                .json({ msg: "No " + name + " documents able to be modified" });
        }
        return res.status(200).json({ document });
    }
    return {};
})();
