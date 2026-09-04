import { Router } from 'express'; import * as c from '../controllers/analysis.controller.js'; const r=Router(); r.get('/',c.list); r.post('/',c.create); r.get('/:id',c.get); export default r;
