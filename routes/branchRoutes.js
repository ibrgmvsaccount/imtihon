const express=require('express');
const router=express.Router();
const branchController=require('../controllers/branchController');
const {checkToken,checkPermission}=require('../middlewares/auth');

router.post('/add',checkToken,checkPermission('branch','create'),branchController.addBranch);
router.put('/update/:id',checkToken,checkPermission('branch','update'),branchController.updateBranch);
router.delete('/delete/:id',checkToken,checkPermission('branch','delete'),branchController.deleteBranch);
router.get('/',checkToken,checkPermission('branch','read'),branchController.getBranches);
router.get('/:id',checkToken,checkPermission('branch','read'),branchController.getBranchById);
module.exports=router;