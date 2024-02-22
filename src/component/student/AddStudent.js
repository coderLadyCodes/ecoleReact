import React, { useState } from 'react'
import {Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {FaCalendarAlt} from 'react-icons/fa';

const AddStudent = () => {
  function CustumInputDate({value, onClick}){
    return(
      <div className='input-group'>
        <input type="text" className='form-control' value={value} onClick={onClick} readOnly/>
        <div className='input-group-append'>
           <span className='input-group-text'><FaCalendarAlt/></span>
           </div>
      </div>
    )
  }

    let navigate = useNavigate()

    const [studentDTO, setStudentDTO] = useState({
        name: '',
        birthday: null,
        presence: false,
        cantine: false,
    })
    const [birthday, setBirthday] = useState(null)

    const [file, setFile] = useState(null)
    
    const handleFileChange = (e) => {
      const selectedFile = e.target.files[0]
      const maxSizeInBytes = 0.5 * 1024 * 1024
  
      if (selectedFile && selectedFile.size > maxSizeInBytes) {
        alert("La taille du fichier excede 500KB, veuillez reduire le volume svp")
        setFile(null)
      } else {
        setFile(selectedFile)
      }
    }

    const handleInputChange = (e) => {
      const { name, value } = e.target
      setStudentDTO((prevStudentDTO) => ({ ...prevStudentDTO, [name]: value }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
  
           try {
        const formData = new FormData();
        formData.append('studentDTO', JSON.stringify(studentDTO));
        formData.append('multipartFile', file);
        console.log(formData);
        const response = await axios.post('http://localhost:8080/students', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
   
        navigate("/view-students");
  
      } catch (error) {
        console.error('Error:', error);
      }
    }

  return (
  <div className='container'>
  <div className='d-flex justify-content-center'>
  <div className='card' style={{width:'50%'}}>
  <h2 className='mb-6 p-4 text-center'>Ajouter un Elève</h2>

  <form onSubmit={handleSubmit} encType="multipart/form-data" method='post'>

  <div className="mb-4 p-4">
    <label for="name" className="form-label">Nom et Prénom</label>
    <input type="text" className="form-control" id="name"/>
  </div>

  <fieldset className="row mb-4 m-3">
    <legend className="col-form-label col-sm-2 pt-0">Cantine</legend>
    <div className="col-sm-10">
      <div className="form-check">
        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
        <label className="form-check-label" for="gridRadios1">
          Oui
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
        <label className="form-check-label" for="gridRadios2">
          Non
        </label>
      </div>
      </div>
  </fieldset>

  <fieldset className="row mb-4 m-3">
    <legend className="col-form-label col-sm-2 pt-0">Présence</legend>
    <div className="col-sm-10">
      <div className="form-check">
        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" checked/>
        <label className="form-check-label" for="gridRadios1">
          Présent
        </label>
      </div>
      <div className="form-check">
        <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
        <label className="form-check-label" for="gridRadios2">
          Absent
        </label>
      </div>
      </div>
  </fieldset>
  <div div className='row mb-4 m-3'>
  <label for="birthday" className="form-label">Date De Naissance<DatePicker selected={birthday} onChange={(date) => setBirthday(date)} customInput={<CustumInputDate/>}/></label>
  </div>
  <div className='d-flex justify-content-center p-4'>
            <div className='p-4'>
              <button type='submit' className='btn btn-outline-success btn-ls'>Save</button>
            </div>
            <div className='p-4'>
              <Link to={"/view-students"}  type='submit' className='btn btn-outline-warning btn-ls'>Cancel</Link> 
            </div>
          </div>
  </form>
  </div>
  </div>
  </div>
  )
}

export default AddStudent
