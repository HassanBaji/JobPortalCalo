import React from "react";

export default function FavoriteList() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    return <div>FavoriteList</div>;
}
