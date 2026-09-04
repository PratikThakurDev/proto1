import { Router } from 'express'; import * as c from '../controllers/assistant.controller.js'; const r=Router(); r.post('/message',c.ask); export default r;
