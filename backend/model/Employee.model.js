import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  f_Image: { type: String },
  f_Name: { type: String },
  f_Email: { type: String },
  f_Mobile: { type: String },
  f_Designation: { type: String },
  f_gender: { type: String },
  f_Course: { type: String},
  f_Createdate: { type: Date, default: Date.now }
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
