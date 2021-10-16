import fs from 'fs';
import util from 'util';
import express, { Request, Response, NextFunction } from 'express';
// import { uploadFile } from '../../../s3';
import { requireAuth } from '../../middlewares/require-auth';
import { Gallery } from '../../models/gallery';
import { GalleryType } from '../../utility/gallery-type';
import { GalleryParent } from '../../utility/gallery-parent';
import { requireAdmin } from '../../middlewares/require-admin';

const Router = express.Router();

// const unlink = util.promisify(fs.unlink);

Router.post('/api/gallery', requireAuth, requireAdmin, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { caption, type, parent, url } = req.body;
    
        let modifiedType = GalleryType.Image;
        
        let imageUrl = "", videoUrl = "", isResourceUrl = false;

        if (url && url.trim().length > 0) {
            isResourceUrl = true;
            if (type == 'video') {
                videoUrl = url;
            } else {
                imageUrl = url;
            }
        }
    
        if (type === 'video') {
            modifiedType = GalleryType.Video;
            if (req.files && req.files.length > 0) {
                const file = (req.files as Express.Multer.File[])[0];
                isResourceUrl = false;
                videoUrl = file.path as string;
                // const result = await uploadFile(file);
                // videoUrl = 'videos/' + result.Key;
                // await unlink(file.path);
            }
        } else {
            if (req.files && req.files.length > 0) {
                const file = (req.files as Express.Multer.File[])[0];
                isResourceUrl = false;
                imageUrl = file.path as string;
                // const result = await uploadFile(file);
                // imageUrl = 'images/' + result.Key;
                // await unlink(file.path);
            }
        }

        let modifiedParent = GalleryParent.Location;

        if (parent === 'logo') {
            modifiedParent = GalleryParent.Logo;
        }
    
        const gallery = Gallery.build({
            imageUrl, videoUrl, caption, type: modifiedType, parent: modifiedParent, isResourceUrl
        });
    
        await gallery.save();
    
        res.status(201).send({
            message: 'gallery created successfully',
            gallery,
        });
    } catch (err) {
        next(err);
    }
});

export { Router as GalleryCreateRouter };