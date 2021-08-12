const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = mongoose.Schema({
    name: {
        type: String
    },
    hightlight: {
        type: String
    }
    ,content: {
        type:String,
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true })


const Project = mongoose.model('Project', projectSchema);

module.exports = { Project }