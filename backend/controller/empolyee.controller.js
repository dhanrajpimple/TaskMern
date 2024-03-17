import Employee from '../model/Employee.model.js';

const createEmployee = async (req, res) => {
  try {
    const { f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;
    const f_Image = req.file ? req.file.filename : ''; 

   
    if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

   
    const existingEmployee = await Employee.findOne({ f_Email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee with the same email already exists', success: false });
    }

    const employee = await Employee.create({
      f_Image,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course
    });

    if (!employee) {
      return res.status(400).json({ message: 'Employee creation failed', success: false });
    }

    return res.status(201).json({ message: 'Employee created successfully', success: true, employee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const { id, f_Name, f_Email, f_Mobile, f_Designation, f_gender, f_Course } = req.body;

   
    if (!id || !f_Name || !f_Email || !f_Mobile || !f_Designation || !f_gender || !f_Course) {
      return res.status(400).json({ message: 'All fields are required', success: false });
    }

    const f_Createdate = new Date(); 

    let f_Image = '';
    if (req.file) {
      f_Image = req.file.filename; 
    }

   
    const employee = await Employee.findByIdAndUpdate(id, {
      f_Image,
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_gender,
      f_Course,
      f_Createdate
    }, { new: true });

   
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found', success: false });
    }

   
    return res.status(200).json({ message: 'Employee updated successfully', success: true, employee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    
    
    if (!id) {
      return res.status(400).json({ message: 'ID is required', success: false });
    }

    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    return res.status(200).json({ success: true, message: 'Employee deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    
   
    if (!id) {
      return res.status(400).json({ message: 'ID is required', success: false });
    }

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' });
    }
    return res.status(200).json({ success: true, employee });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();

    return res.status(200).json({ success: true, employees });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export { createEmployee, updateEmployee, getAllEmployees, deleteEmployee, getEmployee };
