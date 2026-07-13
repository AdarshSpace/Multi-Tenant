import express from 'express';
import { generateUploadAuth } from '../lib/imagekit.js';
import { authentication } from '../middleware/authentication.js';
import {handleCreateUploadUrl} from "../controllers/Mux/createUpload.js"
import { handleGenerateAssessment } from '../controllers/Chat/assessment.js';
import { handleGetPlaybackToken } from '../controllers/Mux/playbackToken.js';


const router = express.Router();
router.use(authentication);

router.get('/auth', generateUploadAuth);
router.post('/create', handleCreateUploadUrl);
router.get('/:videoId/playback-token', handleGetPlaybackToken);
router.post('/:videoId/generate-assessment', handleGenerateAssessment);


export default router;