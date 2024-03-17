import express from 'express';
import { createEmployee, updateEmployee, deleteEmployee, getEmployee, getAllEmployees } from '../controller/empolyee.controller.js';
import multer from 'multer';

const router = express.Router();


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, `${file.originalname}`); 
  }
});

const fileFilter = (req, file, cb) => {
  
  const allowedTypes = ['image/jpeg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPeG and PNG files are allowed.'));
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });


router.post('/employee', upload.single('f_Image'), createEmployee);
router.put('/employeeupdate', upload.single('f_Image'), updateEmployee);


router.delete('/employeedelete', deleteEmployee);
router.get('/employeegetemployee', getEmployee);
router.get('/employees', getAllEmployees);

export default router;
