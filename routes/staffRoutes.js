const express=require('express');
const router=express.Router();
const staffController=require('../controllers/staffController');
const {checkToken,checkPermission}=require('../middlewares/auth');

router.post('/add',checkToken,checkPermission('staff','create'),staffController.addStaff);
router.put('/update/:id',checkToken,checkPermission('staff','update'),staffController.updateStaff);
router.delete('/delete/:id',checkToken,checkPermission('staff','delete'),staffController.deleteStaff);
router.get('/',checkToken,checkPermission('staff','read'),staffController.getStaffs);
router.get('/:id',checkToken,checkPermission('staff','read'),staffController.getStaffById);
module.exports=router;