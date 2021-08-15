const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = mongoose.Schema({
    id: {
        type: String
    },
    ten: {
        type: String
    },
    author: [],
    address: {
        type: String
    },
    phone: {
        type: String
    },  
    email: {
        type: String
    },
    website: {
        type: String
    },
    hightlight: [],
    quyTrinh: [],
    lvApDung: {
        type: String
    },
    uuDiem: [],
    mucDoPhatTrien: {
        type: String
    },
    phuongThucChuyenGiao: [],
    phamViThuongMai: [],
    chaoGiaThamKhao: {
        type:String,
    },
    hinhAnhTongThe: [],
    content: {
        type:String,
    },
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

projectSchema.pre('save', async function (next) {
    const randomInteger = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    this.id = Math.random()
      .toString(36)
      .substr(2, randomInteger(6, 10));
    next();
  });


const Project = mongoose.model('Project', projectSchema);

module.exports = { Project }