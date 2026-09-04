import { Router } from 'express'; import * as c from '../controllers/evidence.controller.js'; const r=Router(); r.get('/',c.list); r.get('/:id',c.get); export default r;
