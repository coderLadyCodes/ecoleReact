import { useParams } from 'react-router-dom';
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import cute from '../../images/cute.jpg';

const UserProfile = () => {
    const {id} = useParams();
    const[user, setUser] = useState({
        name : '',
        email : '',
        phone : '',
        password : '',
        profileImage : '',
        role : '',
        postList : '',
        student : '',
      });

      useEffect(() =>{
        loadUser();
    }, []);

      const loadUser = async () =>{
        const result = await axios.get(`http://localhost:8080/user/${id}`);
            setUser(result.data);   
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
                            src={cute}
                            alt="avatar"
                            className="rounded-circle img-fluid"
                            style={{ width: 120, height: 120 }}
                        />
                        <h5 className="my-3">
                            {`${user.name}`}
                        </h5>
                        <div className="d-flex justify-content-center mb-2">
                            <button
                                type="button"
                                className="btn btn-outline-primary">
                                Call
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-warning ms-1">
                                Message
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
                                    Name
                                </h5>
                            </div>

                            <div className="col-sm-9">
                                <p className="text-muted mb-0">
                                    {user.name}
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
                                    {user.email}
                                </p>
                            </div>
                        </div>
                        <hr />

                        <div className="row">
                            <div className="col-sm-3">
                                <h5 className="mb-0">
                                    Phone Number
                                </h5>
                            </div>

                        <div className="col-sm-9">
                            <p className="text-muted mb-0">
                                {user.phone}
                            </p>
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                            <div className="col-sm-3">
                                <h5 className="mb-0">
                                    Kid'
                                </h5>
                            </div>

                        <div className="col-sm-9">
                            <p className="text-muted mb-0">
                                {user.student.name}
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
