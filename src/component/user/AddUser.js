import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const AddUser = () => {
  let navigate = useNavigate();
/* const[user, setUser] = useState({
    name : '',
    email : '',
    phone : '',
    password : '',
    profileImage : '',
    student : {name : ''},
  }); */

const[name, setName] = useState("");
const[email, setEmail] = useState("");
const[phone, setPhone] = useState("");
const[password, setPassword] = useState("");
const[profileImage, setProfileImage] = React.useState(null);
//const[student, setStudent] = useState("");


const handleFormSubmit = async (e) =>{
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("password", password);
  formData.append("profileImage", profileImage);
  //formData.append("student", student);
  try {
    const response = await axios.post("http://localhost:8080/user", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json"
      }
    });
    console.log("user created : ", response.data);
    navigate("/view-users");
  } catch (error) {
    console.error("ERROR TRYONG TO CREATE THE USER  : ", error);
  }
}
const handleImage = (e) => {
  setProfileImage(e.target.files[0])
}


/* function formValidation(){
      // NAME
      if(name.length == 0){
        alert('le Nom est obligatoire')
      }

      // EMAIL
      if(email.length == 0){
        alert('l email est obligatoire');
      }

      // PHONE NUMBER
      const pattern = new RegExp(/^\d{1,10}$/);
      if(phone.length == 0 || !phone.match(pattern)){
        alert('Le numéro de télephone est obligatoire et correct');
      }

      // STUDENT
      if(student.length == 0){
        alert('le Nom de votre enfant est obligatoire');
      }

      // PASSWORD
      if(password.length < 8){
        alert('Le mot de passe doit avoir au minimum 8 characteres');
      }
    } */

  return (
    <div className="container">
      <div className="row">
    <div className="d-flex justify-content-center">
    <div className="lg-4">
      <div className="card">
      <div className="card-body text-center">

      <h2 className='mb-5'>Add User</h2>

      <form onSubmit={handleFormSubmit} encType="multipart/form-data">  {/* (e) => saveUser(e)*/} 

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='name'>Nom et Prénom</label>
          <input autoComplete="name" placeholder='Nom et Prénom' className='form-control col-sm-6' type='text' name='name' id='name' required value={name} onChange={(e) => setName(e.target.value)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='email'>Email</label>
          <input autoComplete="email" placeholder='Email' className='form-control col-sm-6' type='email' name='email' id='email' required value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='phone'>Numéro de Téléphone</label>
          <input autoComplete="tel" placeholder='Numero de Telephone' className='form-control col-sm-6' type='number' name='phone' id='phone' required value={phone} onChange={(e) => setPhone(e.target.value)}/>
        </div>

        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='password'>Mot de Passe</label>
          <input placeholder='Mot de Passe' className='form-control col-sm-6' type='password' name='password' id='password' required value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='profileImage'>Choisir une Photo</label>
          <input className='form-control col-sm-6'  type='file' name='profileImage' id='profileImage' accept="image" /*required value={profileImage}*/ onChange={handleImage}/>
        </div>

       {/* <div className='input-group mb-5'>
          <label className='input-group-text' htmlFor='role'>Role</label>
          <input className='form-control col-sm-6' type='role' name='role' id='role' required value={role} onChange={(e) => handleInputChange(e)}/>
        </div>

        <div className='input-group mb-5'>
          <label  className='input-group-text' htmlFor='student'>Nom et Prénom de L'Enfant</label>
          <input  placeholder='Nom et Prénom de Votre Enfant' className='form-control col-sm-6' type='student' name='student' id='student' required value={student} onChange={(e) => setStudent(e.target.value)}/>
          </div>*/}


        <div className='row mb-5'>
          <div className='col-sm-6 p-4'>
            <button type='submit' className='btn btn-outline-success btn-ls'>Save</button>
          </div>
          <div className='col-sm-4 p-4'>
            <Link to={"/view-users"} type='submit' className='btn btn-outline-warning btn-ls'>Cancel</Link>
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
}

export default AddUser
