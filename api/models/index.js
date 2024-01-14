const mongoose = require('mongoose')

mongoose.Promise = global.Promise;

const db = {}


db.mongoose = mongoose

const { Role, User } = require("./authModels")
db.user = User
db.role = Role

db.ROLES = ["user, admin"]

module.exports = db

