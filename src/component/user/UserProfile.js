import { useParams, Link } from 'react-router-dom';
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import {FaEdit} from 'react-icons/fa';

const UserProfile = () => {

    const {id} = useParams();

    const[userDTO, setUserDTO] = useState({
        name : '',
        email : '',
        phone : '',
        multipartFile: '',
      });

      useEffect(() =>{
        loadUser();
    }, []);


      const loadUser = async () =>{
        try {
        const result = await axios.get(`http://localhost:8080/users/${id}`);
        setUserDTO(result.data);  
    } catch (error) {
        console.error('Error:', error);
      }
    };

  return(

<section
    className="d-flex flex-column">
    <div className="d-flex justify-content-center">
    <div className="column">
        <div className="d-flex justify-content-center">
        <div className="card mb-4" style={{width: '40rem'}}>
            <div className="card-body text-center">
            <img
                src={`http://localhost:8080/images/${userDTO.id}/${userDTO.profileImage}`}
                alt="photo"
                className="rounded-circle img-fluid"
                style={{ width: 120, height: 120}}
            />
            <h5 className="my-3">
                {`${userDTO.name}`}
            </h5>
                        {/* BUTTONS ARE NOT CONNECTED YET */}
            <div className="d-flex justify-content-center ms-6">
            <button
                type="button"
                className="btn btn-outline-primary">
                    <a href={userDTO.phone}></a>            
                Appel
            </button>
            <button
                type="button"
                className="btn btn-outline-warning ms-2">
                Chat                                        
            </button>
                    
            </div>
            </div>
            </div>
            </div>

            <div className="card-body">
                <div className="card mb-2">
                    <div className="card-body">
                        <hr />

                        <div className="column d-flex justify-content-center">
                            <div className="col-sm-2">
                            <h5 className="mb-0">
                                Nom et Prénom
                            </h5>
                            </div>

                            <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                    {userDTO.name}
                                </p>
                            </div>
                        </div>

                        <hr />

                        <div className="column d-flex justify-content-center">
                            <div className="col-sm-2">
                                <h5 className="mb-0">
                                    Email
                                </h5>
                            </div>

                            <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                    {userDTO.email}
                                </p>
                            </div>
                        </div>
                        <hr />

                        <div className="column d-flex justify-content-center">
                            <div className="col-sm-2">
                                <h5 className="mb-0">
                                    Numéro de télephone
                                </h5>
                            </div>

                        <div className="col-sm-9">
                            <p className="text-muted mb-0">
                                {userDTO.phone}
                            </p>
                        </div>
                      </div>
                      <hr />
                      <div className="column d-flex justify-content-center">
                            <div className="col-sm-2">
                                <h5 className="mb-0">
                                    Enfant : 
                                </h5>
                            </div>

                        <div className="col-sm-9">
                            <p className="text-muted mb-0">
                              <Link to="/addStudent"> {userDTO.student} </Link>
                                         {/* MAKE SURE TO LINK TO THE STUDENT HERE */}
                            </p>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-center ms-6">
                      <button
                        type="button"
                        className="btn warning ms-2">
                        <Link to={`/edit-user/${userDTO.id}`} className='btn btn-warning'><FaEdit />Modifier</Link>                                       
                       </button>
                       </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </section>
);
}

export default UserProfile
           {/*[user.student].map((stud) => (
                        <ul key={stud.id} style={{listStyle:'none'}}>
                            <li>Nom : {stud.name}</li>
                            <li> Image: {stud.profileImage}</li>
                            <li> Birthday : {stud.birthday}</li>
                            <li>Présence : {String(stud.presence)}</li>
                            <li>Cantine : {String(stud.cantine)}</li>
                        </ul>
                            ))*/}