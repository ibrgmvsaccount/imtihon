const express=require('express');
const router=express.Router();
const adminController=require('../controllers/adminController');
const {checkToken,checkPermission}=require('../middlewares/auth');

router.post('/add',checkToken,checkPermission('admin','create'),adminController.addAdmin);
router.get('/',checkToken,checkPermission('admin','read'),adminController.getAdmins);
router.get('/:id',checkToken,checkPermission('admin','read'),adminController.getAdminByID);
router.delete('/delete/:id',checkToken,checkPermission('admin','delete'),adminController.deleteAdmin);
module.exports=router