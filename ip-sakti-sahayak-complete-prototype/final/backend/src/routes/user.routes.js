import { Router } from 'express'; import * as c from '../controllers/user.controller.js'; const r=Router(); r.get('/me',c.me); r.put('/me',c.update); export default r;
