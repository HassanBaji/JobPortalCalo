import { formToJSON } from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../ContextProvider";

export default function PostJobForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState();
    const { notification, setNotification } = useStateContext();
    const [post, setPost] = useState({
        id: null,
        title: "",
        desc: "",
    });

    if (id) {
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/posts/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    console.log(post.key);
                    console.log(data);
                    setPost({ ...data, id: id });
                    console.log(post);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        if (post.id) {
            axiosClient
                .put(`/posts/${post.id}`, post)
                .then(() => {
                    setNotification("post was Succesfully updated");
                    console.log("edited succefully");
                    //navigate('/admin/services-admin')
                })
                .catch((err) => {
                    setLoading(false);
                    const response = err.response;
                    if (response) {
                        setErrors(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/posts`, post)
                .then(() => {
                    setNotification("service was Succesfully created");

                    navigate("/");
                })
                .catch((err) => {
                    setLoading(false);
                    const response = err.response;
                    if (response) {
                        setErrors(response.data.errors);
                    }
                });
        }
    };

    return (
        <div>
            {post.id && <h1>Update post: {post.title}</h1>}
            {!post.id && <h1>new post</h1>}

            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            value={post.title}
                            onChange={(ev) =>
                                setPost({ ...post, title: ev.target.value })
                            }
                            placeholder="Title"
                        />
                        <input
                            value={post.desc}
                            onChange={(ev) =>
                                setPost({ ...post, desc: ev.target.value })
                            }
                            placeholder="Description"
                        />
                        {/* <button onClick={() => navigate('/admin/services-admin')} className='btn-delete'>back</button> */}
                        &nbsp;
                        <button type="submit" className="btn-edit">
                            {" "}
                            Save{" "}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
