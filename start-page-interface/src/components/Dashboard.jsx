import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { requests } from "../helpers/requests";
import CategoryView from "./CategoryView";

function Dashboard() {
    const [categories, setCategories] = useState();
    const [filteredViews, setFilteredViews] = useState();

    useEffect(() => {
        let options = {
            method: "GET",
            pathsArray: ["display", "groups"],
            setStateCallback: setFilteredViews,
        };
        requests.axiosRequest(options);
    }, []);

    let categoryComponents = filteredViews
        ? filteredViews.map((filterGroup) => (
              <CategoryView
                  key={filterGroup._id}
                  defaultValues={filterGroup}></CategoryView>
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
