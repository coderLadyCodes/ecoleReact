import React, { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {

  let navigate = useNavigate();
  const {id} = useParams();

  const [userDTO, setUserDTO] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useEffect(() =>{
    loadUser();
}, []);

const loadUser = async () =>{
  const result = await axios.get(`http://localhost:8080/users/${id}`);
      setUserDTO(result.data);   
};

  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDTO((prevUserDTO) => ({ ...prevUserDTO, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const updateUser = async (e) => {
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

    }try {
      const formData = new FormData();
      formData.append('userDTO', JSON.stringify(userDTO));
      formData.append('multipartFile', file);
      console.log(formData);
      const response = await axios.put(`http://localhost:8080/users/${id}`,userDTO, formData, {
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

    return (
      <div className="container">
        <div className="row">
      <div className="d-flex justify-content-center">
      <div className="lg-4">
        <div className="card">
        <div className="card-body text-center">
  
        <h2 className='mb-5'>Ajouter un utilisateur</h2>
  
        <form onSubmit={updateUser} encType="multipart/form-data" method='post'>
  
          <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor='name'>Nom et Prénom</label>
            <input autoComplete="name" placeholder='Nom et Prénom' className='form-control col-sm-6' type='text' name='name' id='name' onChange={handleInputChange} value={userDTO.name} required/>
          </div>
  
          <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor='email'>Email</label>
            <input autoComplete="email" placeholder='Email' className='form-control col-sm-6' type='email' name='email' id='email' onChange={handleInputChange} value={userDTO.email} required/>
          </div>
  
          <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor='phone'>Numéro de Téléphone</label>
            <input autoComplete="tel" placeholder='Numero de Telephone' className='form-control col-sm-6' type='number' name='phone' id='phone' onChange={handleInputChange} value={userDTO.phone} required/>
          </div>
  
          
          <div className='input-group mb-5'>
            <label className='input-group-text' htmlFor='multipartFile'>Choisir une Photo</label>
            <input className='form-control col-sm-6' type='file' name='multipartFile' id='multipartFile' accept="image/*" onChange={handleFileChange}/>
          </div>
          <p className="info-message">taille max du fichier : 320px</p>
  
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