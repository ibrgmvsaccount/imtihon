const express=require('express');
const router=express.Router();
const permissionController=require('../controllers/permissionController');
const {checkToken,checkPermission}=require('../middlewares/auth');

router.post('/add',checkToken,checkPermission('permission','create'),permissionController.addPermission);
router.put('/change/:id',checkToken,checkPermission('permission','update'),permissionController.changePermission);
router.delete('/delete/:id',checkToken,checkPermission('permission','delete'),permissionController.deletePermission);
router.get('/all',checkToken,checkPermission('permission','read'),permissionController.getAllPermissions);
router.get('/own',checkToken,permissionController.getOwnPermissions);
module.exports=router;