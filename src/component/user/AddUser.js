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

  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]; //setFile(e.target.files[0]);
    const maxSizeInBytes = 0.5 * 1024 * 1024;

    if (selectedFile && selectedFile.size > maxSizeInBytes) {
      alert("La taille du fichier excede 500KB, veuillez reduire le volume svp");
      setFile(null);
    } else {
      setFile(selectedFile);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDTO((prevUserDTO) => ({ ...prevUserDTO, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!userDTO.name || !userDTO.email || !userDTO.phone) {
      alert("Completez tout les champs");
      return;
    }
    if (!userDTO.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      alert('Adresse mail invalide');
      return;
    }
    if (!userDTO.phone.match(/^\d{10}$/)) {
      alert('Please enter a valid phone number');
      return;
    }
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

    } catch (error) {
      console.error('Error:', error);
    }
  }

    return (
      <div className="container">
      <div className="row">
      <div className="d-flex justify-content-center">
      <div className="lg-4">
        <div className="card">
        <div className="card-body text-center">
  
        <h2 className='mb-5'>Ajouter un Parent</h2>
  
        <form onSubmit={handleSubmit} encType="multipart/form-data" method='post'>
  
          <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor='name'>Nom et Prénom</label>
            <input autoComplete="name" className='form-control col-sm-6' type='text' name='name' id='name' onChange={handleInputChange} value={userDTO.name} required/>
          </div>
  
          <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor='email'>Email</label>
            <input autoComplete="email" className='form-control col-sm-6' type='email' name='email' id='email' onChange={handleInputChange} value={userDTO.email} required/>
          </div>
  
          <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor='phone'>Numéro de Téléphone</label>
            <input autoComplete="tel" className='form-control col-sm-6' type='number' name='phone' id='phone' onChange={handleInputChange} value={userDTO.phone} required/>
          </div>
  
          
          <div className='input-group mb-5'>
            {/*<label className='input-group-text' htmlFor='multipartFile'>Choisir une Photo</label>*/}
            <input className='form-control col-sm-6' type='file' name='multipartFile' id='multipartFile' accept=".jpeg, .jpg, .png" onChange={handleFileChange}/>
          </div>
          <p className="info-message">taille max du fichier : 500KB</p>
  
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