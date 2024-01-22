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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDTO((prevUserDTO) => ({ ...prevUserDTO, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" method='post'>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" onChange={handleInputChange} value={userDTO.name} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" onChange={handleInputChange} value={userDTO.email} />
      </div>
      <div>
        <label htmlFor="phone">Phone:</label>
        <input type="text" id="phone" name="phone" onChange={handleInputChange} value={userDTO.phone} />
      </div>
      <div>
        <label htmlFor="file">Profile Image:</label>
        <input type="file" id="file" name="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Create User</button>
    </form>
  );
};

export default AddUser;
