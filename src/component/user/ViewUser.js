import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {FaEdit} from 'react-icons/fa'

const ViewUser = () => {

    const {id} = useParams()
    const [userDTO, setUserDTO] = useState([])

    useEffect(() => {
        loadUser()
    }, [])

    const loadUser = async () =>{
        try {
        const result = await axios.get(`http://localhost:8080/users/${id}`)
        setUserDTO(result.data)  
    } catch (error) {
        console.error('Error:', error)
      }
    }
  return (
    <section>
        <h2>Parent</h2>
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
            <h5>
                {`${userDTO.name}`}
            </h5>
                        {/* BUTTONS ARE NOT CONNECTED YET */}
            <div>
             <button
              type="button">
              <Link to={`/edit-user/${userDTO.id}`}><FaEdit />Modifier</Link>                                       
             </button>     
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
                                <h5>Numéro de télephone</h5>
                            </div>

                        <div>
                            <p>{userDTO.phone}</p>
                        </div>
                      </div>
                      <hr />
                      <div>
                            <div>
                                <h5> Enfants :</h5>
                            </div>

                        <div>
                           
                                <button type="button">
                                <Link to={`/add-student/${userDTO.id}`}>Ajoutez vos Enfants ici</Link>
                                </button>
                           
                        </div>
                      </div>
                      <hr />
                      <div>
                      
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </section>
  )
}

export default ViewUser
