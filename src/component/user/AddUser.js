import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {

  let navigate = useNavigate();

  const [userDTO, setUserDTO] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const [error, setError] = useState(false);
 /* const [errors, setErrors] = useState({
    name:'',
    email:'',
    phone:'',
    multipartFile:''
  })*/

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDTO((prevUserDTO) => ({ ...prevUserDTO, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const formValidation = () =>{
    const MAX_FILE_SIZE = 1024; //1MB
    const FILE_SIZE = setFile.size / MAX_FILE_SIZE;
    if(FILE_SIZE > 1){
      setError("Le fichier est trop volumineux");
      alert("fichier volumineux")
      return
    }

    if(userDTO.name.trim()){
      setError("Ce champs est obligatoire");
      return
    }

    if(userDTO.email.trim()){
      setError("Ce champs est obligatoire");
      return
    }

    if(userDTO.phone.trim()){
      setError("Ce champs est obligatoire");
      return
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formValidation){
         try {
      const formData = new FormData();
      formData.append('userDTO', JSON.stringify(userDTO));
      formData.append('multipartFile', file);
      console.log(formData);
      const response = await axios.post('http://localhost:8080/users', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate("/view-users");

      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
    }

  }
  
  /*function validateForm(){
    let valid = true;
    const errorsCopy = {...errors};
  
    if(name.trim()){
      errorsCopy.name = '';
    }else {
      errorsCopy.name = 'Le Nom est Obligatoire';
      valid = false;
    }
  
    if(email.trim()){
      errorsCopy.email = '';
    }else {
      errorsCopy.email = 'Email est Obligatoire';
      valid = false;
    }
  
    if(phone.trim()){
      errorsCopy.phone = '';
    }else {
      errorsCopy.phone = 'Le Numéro de Tél est Obligatoire';
      valid = false;
    }

    if(multipartFile){
      errorsCopy.multipartFile ='';
    }else {
      errorsCopy.multipartFile = 'La Photo est Obligatoire';
    }
    setErrors(errorsCopy);
    return valid;
  }*/

    return (
      <div className="container">
        <div className="row">
      <div className="d-flex justify-content-center">
      <div className="lg-4">
        <div className="card">
        <div className="card-body text-center">
  
        <h2 className='mb-5'>Ajouter un utilisateur</h2>
  
        <form onSubmit={handleSubmit} encType="multipart/form-data" method='post'>  {/* (e) => saveUser(e)*/} 
  
          <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor='name'>Nom et Prénom</label>
            <input autoComplete="name" placeholder='Nom et Prénom' className='form-control col-sm-6' type='text' name='name' id='name'  onChange={handleInputChange} value={userDTO.name} />
            {/*errors.name && <div className='invalid-feedback'>{errors.name}</div>*/}
            <p className='error-message'>{error}</p>
          </div>
  
          <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor='email'>Email</label>
            <input autoComplete="email" placeholder='Email' className='form-control col-sm-6' type='email' name='email' id='email'  onChange={handleInputChange} value={userDTO.email}/>
            <p className='error-message'>{error}</p>
          </div>
  
          <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor='phone'>Numéro de Téléphone</label>
            <input autoComplete="tel" placeholder='Numero de Telephone' className='form-control col-sm-6' type='number' name='phone' id='phone'  onChange={handleInputChange} value={userDTO.phone}/>
            <p className='error-message'>{error}</p>
          </div>
  
          
          <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor='multipartFile'>Choisir une Photo</label>
            <input className='form-control col-sm-6' type='file' name='multipartFile' id='multipartFile' accept="image/*"   onChange={handleFileChange}/>
            <p className='error-message'>{error}</p>
          </div>
          <p className="info-message">taille max du fichier : 320px</p>
  
        {/*  <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor='role'>Role</label>
            <input className='form-control col-sm-6' type='role' name='role' id='role' required value={role} onChange={(e) => handleInputChange(e)}/>
          </div>*/}
  
          <div className='row mb-5'>
            <div className='col-sm-6 p-4'>
              <button type='submit' className='btn btn-outline-success btn-ls'>Save</button>
            </div>
            <div className='col-sm-4 p-4'>
              <Link to={"/view-users"}  type='submit' className='btn btn-outline-warning btn-ls'>Cancel</Link> 
            </div>
          </div>
        </form>   
      </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    );
  };
  
  export default AddUser;