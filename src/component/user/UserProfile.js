import { useParams, Link } from 'react-router-dom';
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import cute from '../../images/cute.jpg';

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
    className="shadow"
    style={{ backgroundColor: "whitesmoke" }}>
    <div className="container py-5">
        <div className="row">
            <div className="col-lg-3">
                <div className="card mb-4">
                    <div className="card-body text-center">
                        <img
                            src={userDTO.multipartFile}
                            //src={cute}
                            alt="photo"
                            className="rounded-circle img-fluid"
                            style={{ width: 120, height: 120 }}
                        />
                        <h5 className="my-3">
                            {`${userDTO.name}`}
                        </h5>
                        <div className="d-flex justify-content-center mb-2">
                            <button
                                type="button"
                                className="btn btn-outline-primary">
                                   <a href={userDTO.phone}></a>            
                                Appel
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-warning ms-1">
                                Chat                                        
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-9">
                <div className="card mb-4">
                    <div className="card-body">
                        <hr />

                        <div className="row">
                            <div className="col-sm-3">
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

                        <div className="row">
                            <div className="col-sm-3">
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

                        <div className="row">
                            <div className="col-sm-3">
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
                      <div className="row">
                            <div className="col-sm-3">
                                <h5 className="mb-0">
                                    Enfant : 
                                </h5>
                            </div>

                        <div className="col-sm-9">
                            <p className="text-muted mb-0">
                              <Link to="/addStudent"> {userDTO.student} </Link>
                 
                            </p>
                        </div>
                      </div>
                      <hr />

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