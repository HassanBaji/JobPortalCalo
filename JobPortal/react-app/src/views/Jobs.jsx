import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";
import { useStateContext } from "../ContextProvider";
import { useNavigate } from "react-router-dom";

export default function Jobs() {
    const [service, setService] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const { token, user, role } = useStateContext();
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const [showFavorites, setShowFavorites] = useState(false);
    const navigate = useNavigate();

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
        setShowFavorites(false);
    };

    const toggleFavorites = () => {
        setShowFavorites(!showFavorites);
    };

    const filteredServices = showFavorites
        ? service.filter((b) => favorites.includes(b.id))
        : service.filter((b) =>
              b.title.toLowerCase().includes(searchTerm.toLowerCase())
          );

    const addToFav = (b) => {
        const index = favorites.indexOf(b.id);
        if (index !== -1) {
            favorites.splice(index, 1);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        } else {
            favorites.push(b.id);
            localStorage.setItem("favorites", JSON.stringify(favorites));
        }
        navigate("/jobs");
    };

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Jobs</h1>
                {!token && (
                    <Link to="/post-form/new" className="btn-add">
                        Add new
                    </Link>
                )}
            </div>
            <div className="card animated fadeInDown">
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by job title..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <label htmlFor="favorites">
                        Favorites
                        <input
                            type="checkbox"
                            id="favorites"
                            checked={showFavorites}
                            onChange={toggleFavorites}
                        />
                    </label>
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
                                        <Link
                                            to={`/post-form/${b.id}`}
                                            className="btn-edit"
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            className="btn-edit"
                                            onClick={() => addToFav(b)}
                                        >
                                            {favorites.includes(b.id)
                                                ? "Remove from favorites"
                                                : "Add to favorites"}
                                        </button>
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
