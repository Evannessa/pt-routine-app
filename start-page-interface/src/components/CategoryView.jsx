import React, { useEffect, useState } from "react";
import FilterGroup from "./FilterGroup";
import { Filter } from "./Filter";
import { Link } from "react-router-dom";

function CategoryView(props) {
    const [filteredLinks, setFilteredLinks] = useState();
    useEffect(() => {
        setFilteredLinks(props.links);
    }, []);
    const linkComponents = filteredLinks
        ? filteredLinks.map((link) => <div key={link._id}>{link.name}</div>)
        : [];

    return (
        <div>
            <Filter links={props.links} tags={props.tags}></Filter>
        </div>
    );
}

export default CategoryView;
