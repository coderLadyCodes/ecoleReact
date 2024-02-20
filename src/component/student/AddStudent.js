import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddStudent = () => {

    let navigate = useNavigate()

    const [studentDTO, setStudentDTO] = useState({
        name: '',
        birthday: new Date(),
        presence: false,
        cantine: false,
    })

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
   
      //  navigate("/view-students");
  
      } catch (error) {
        console.error('Error:', error);
      }
    }

  return (
    <div>
      
    </div>
  )
}

export default AddStudent
