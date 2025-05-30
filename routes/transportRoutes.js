const express=require('express');
const router=express.Router();
const transportController=require('../controllers/transportController');
const {checkToken,checkPermission}=require('../middlewares/auth');

router.post('/add',checkToken,checkPermission('transport','create'),transportController.addTransport);
router.put('/update/:id',checkToken,checkPermission('transport','update'),transportController.updateTransport);
router.delete('/delete/:id',checkToken,checkPermission('transport','delete'),transportController.deleteTransport);
router.get('/',checkToken,checkPermission('transport','read'),transportController.getTransports);
module.exports=router;