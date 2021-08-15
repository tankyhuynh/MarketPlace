const express = require('express');
const router = express.Router();
const { Project } = require("../models/Project");

const { auth } = require("../middleware/auth");
const multer = require("multer");

// STORAGE MULTER CONFIG
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.jpg' && ext !== '.png' && ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");


router.post("/uploadfiles", (req, res) => {
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename });
    });
});

router.post("/createProject", (req, res) => {
    let project = new Project({ 
        ten: req.body.ten, 
        hightlight: req.body.hightlight, 
        content: req.body.content, writer: req.body.userID 
    });

    project.save((err, project) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json(project)
    })

});


router.get("/", (req, res) => {
    Project.find()
        .populate("writer")
        .exec((err, projects) => {
            if (err) return res.status(400).send(err);
            res.status(200).json(projects);
        });
});

router.get("/:id", (req, res) => {
    const id = req.params.id;
    Project.findOne({ "_id": id })
        .populate('writer')
        .exec((err, project) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({ success: true, project })
        })
});

module.exports = router;
