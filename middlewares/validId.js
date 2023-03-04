const mongoose = require("mongoose");

const validId = (req, res, next) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({message: "id inválido"})
    }
    next()
}

module.exports = validId;