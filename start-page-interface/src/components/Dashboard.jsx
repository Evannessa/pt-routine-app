import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { requests } from "../helpers/requests";
import CategoryView from "./CategoryView";

function Dashboard() {
    const [categories, setCategories] = useState();
    const [filteredViews, setFilteredViews] = useState();
    const [links, setLinks] = useState();
    const [tags, setAllTags] = useState();

    useEffect(() => {
        let options = {
            method: "GET",
            pathsArray: ["display", "groups"],
            setStateCallback: setFilteredViews,
        };
        requests.axiosRequest(options);
        let linkOptions = {
            method: "GET",
            pathsArray: ["display"],
            setStateCallback: setLinks,
        };
        requests.axiosRequest(linkOptions);
        let tagOptions = {
            method: "GET",
            pathsArray: ["display", "tags"],
            setStateCallback: setAllTags,
        };
        requests.axiosRequest(tagOptions);
    }, []);

    let categoryComponents = filteredViews
        ? filteredViews.map((filterGroup) => (
              <CategoryView
                  key={filterGroup._id}
                  defaultValues={filterGroup}
                  links={links || []}
                  tags={tags || []}></CategoryView>
          ))
        : [];

    return (
        <div>
            <h1>Dashboard</h1>
            <section>{categoryComponents}</section>
        </div>
    );
}

export default Dashboard;
