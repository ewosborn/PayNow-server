import express from 'express';
import { auth } from '../middlewares/auth.js';
import multer from 'multer';
const uploadRouter = express.Router();


// Upload image
    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'assets/images/');
        },
        filename(req, file, cb) {
            cb(null, `${Date.now()}.jpg`);
        },
    });

    const upload = multer({ storage });
    uploadRouter.post('/', auth, upload.single('image'), (req, res) => {
    res.send(`/${req.file.path}`);
    });


export default uploadRouter;