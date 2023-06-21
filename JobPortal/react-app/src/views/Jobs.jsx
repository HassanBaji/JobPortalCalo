import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Jobs() {
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = () => {
        setLoading(true);
        axiosClient
            .get("posts")
            .then(({ data }) => {
                setLoading(false);
                console.log(data);
                const eventsArr = Object.keys(data).map((key) => {
                    return {
                        ...data[key],
                        id: key,
                    };
                });
                console.log(eventsArr);
                if (Array.isArray(eventsArr)) {
                    setService(eventsArr);
                } else {
                    setService([]);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const onDelete = (b) => {
        if (!window.confirm("Are you sure you want to delete this posts?")) {
            return;
        }

        axiosClient.delete(`/posts/${b.id}`).then(() => {
            //TODO show notofication
            getPosts();
        });
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredServices = service.filter((b) =>
        b.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Services</h1>
                <Link to="new" className="btn-add">
                    Add new
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by service name..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Desc</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading..
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {filteredServices.map((b, i) => (
                                <tr key={b.id}>
                                    <td>{b.title}</td>
                                    <td>{b.desc}</td>
                                    <td>
                                        <Link to={b.id} className="btn-edit">
                                            Edit
                                        </Link>
                                        &nbsp;
                                        {/* <button onClick={(ev) => onDelete(b)} className="btn-delete">
                    Delete
                  </button> */}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
