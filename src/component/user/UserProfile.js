import { useParams, Link } from 'react-router-dom'
import React, {useEffect, useState } from 'react'
import axios from 'axios'
import {FaEdit} from 'react-icons/fa'

const UserProfile = () => {

    const {id} = useParams()
    const[userDTO, setUserDTO] = useState({
        name : '',
        email : '',
        phone : '',
        multipartFile: '',
      })
    //const [studentDTO, setStudentDTO] = useState(null)

    useEffect(() =>{
        const fetchData = async () => {
            try {
                {/*const[userData, studentData] = await Promise.all([
                    axios.get(`http://localhost:8080/users/${id}`),
                    axios.get(`http://localhost:8080/students/${id}`)
                ])
                setUserDTO(userData.data)
            setStudentDTO(studentData.data)*/}
            const response = await axios.get(`http://localhost:8080/users/${id}`)
            setUserDTO(response.data)
            } catch (error) {
                console.log('Error : ', error)
            }
        }
    fetchData()

}, [id])

   {/* if (!userDTO || !studentDTO){
        return <div>Loading . . !</div>
    }*/}

  return(

<section>
    <div>
    <div>
        <div>
        <div style={{width: '40rem'}}>
            <div>
            <img
                src={`http://localhost:8080/images/${userDTO.id}/${userDTO.profileImage}`}
                alt="photo"
                style={{ width: 120, height: 120}}
            />
            <h5>{`${userDTO.name}`}</h5>
                       
            <div>
            <button type="button"> <a href={userDTO.phone}></a>Appel</button>
            <button type="button">Chat</button>
                    
            </div>
            </div>
            </div>
            </div>
           
            
            <div>
                <div>
                    <div>
                        <hr />
                    
                        <div>
                            <div>
                            <h5>Nom et Prénom</h5>
                            </div>

                            <div>
                                <p>{userDTO.name}</p>
                            </div>
                        </div> 
                        
                        <hr />
                        
                        <div>
                            <div>
                                <h5>Email</h5>
                            </div>

                            <div>
                                <p>{userDTO.email}</p>
                            </div>
                        </div> 
                        <hr />
                        
                        <div>
                            <div>
                                <h5> Numéro de télephone</h5>
                            </div>

                        <div>
                            <p>{userDTO.phone}</p>
                        </div>
                      </div> 
                      <hr /> 
                
        {/*<div className="d-flex justify-content-center">
        
        <div className="card mb-4" style={{width: '40rem'}}>
       
            <div className="card-body text-center">
            <img
                src={`http://localhost:8080/images/${studentDTO.id}/${studentDTO.profileImage}`}
                alt="photo"
                className="rounded-circle img-fluid"
                style={{ width: 120, height: 120}}
            />
            <h5 className="my-3">
                {`${studentDTO.name}`}
            </h5>
                       
            <div className="d-flex justify-content-center ms-6">
            <button
                type="button"
                className="btn btn-outline-warning ms-2">
                METTRE QULEQUE CHOSE ICI                                        
            </button>         
            </div>
            </div> 
            <hr />
            
            <div className="column d-flex justify-content-center">
                <div className="col-sm-2">
                <h5 className="mb-0">
                    Nom et Prénom
                </h5>
                </div>

                <div className="col-sm-9">
                    <p className="text-muted mb-0">
                        {studentDTO.name}
                    </p>
                </div>
            </div>
            <hr />
            
            <div className="column d-flex justify-content-center">
                <div className="col-sm-2">
                <h5 className="mb-0">
                    Date de Naissance
                </h5>
                </div>

                <div className="col-sm-9">
                    <p className="text-muted mb-0">
                        {studentDTO.birthday}
                    </p>
                </div>
            </div>
            <hr />
            
            <div className="column d-flex justify-content-center">
                <div className="col-sm-2">
                <h5 className="mb-0">
                    Presence
                </h5>
                </div>

                <div className="col-sm-9">
                    <p className="text-muted mb-0">
                        {studentDTO.presence.toString()}
                    </p>
                </div>
            </div>
            <hr />
            
            <div className="column d-flex justify-content-center">
                <div className="col-sm-2">
                <h5 className="mb-0">
                    Cantine
                </h5>
                </div>

                <div className="col-sm-9">
                    <p className="text-muted mb-0">
                        {studentDTO.cantine.toString()}
                    </p>
                </div>
            </div>
            <hr />
            
            <div className="column d-flex justify-content-center">
                <div className="col-sm-2">
                <h5 className="mb-0">
                    Parent ID
                </h5>
                </div>

                <div className="col-sm-9">
                    <p className="text-muted mb-0">
                        {studentDTO.id}
                    </p>
                </div>
            </div>
            </div>
            </div>*/}

        </div>
        </div>
        </div>
        </div>
    </div>
    </section>
)
}

export default UserProfile