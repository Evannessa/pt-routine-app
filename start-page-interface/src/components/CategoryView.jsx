import React, { useEffect, useState } from "react";
import FilterGroups from "./FilterGroups";
import { FilterGroup } from "./FilterGroup";
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
            <FilterGroup links={props.links} tags={props.tags}></FilterGroup>
        </div>
    );
}

export default CategoryView;