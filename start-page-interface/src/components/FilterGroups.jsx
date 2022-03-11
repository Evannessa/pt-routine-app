import React, { useState } from "react";
import styled from "styled-components";
import * as StyledInputs from "./styled-components/input.styled";
import Select from "./input/Select";
import Form from "./input/Form";
import { FilterGroup } from "./FilterGroup";

/**
 *
 * @param {*} props
 * @returns - grouped filters
 */
function FilterGroups(props) {
    const [filters, setFilters] = useState({
        propertyChoice: "name",
        relation: "and",
        match: [],
    });

    //filters should be sub-groups

    //the methods associated with each type
    const matchFunctions = {
        name: filterStringProperty,
        url: filterStringProperty,
        tags: filterArrayProperty,
    };

    function determineAll(group) {}

    /**
     *
     * @param {String} property - the name of the property we're testing
     * @param {String|Array} match - a string or array to match
     * @param {Boolean} matchAll - if all should match, or just some. For Strings it'll be if the word should match exactly or just partially.
     * @returns a boolean saying whether or not the property matches
     */
    function filterStringProperty(property, match, matchAll = false) {
        //match all should return an EXACT match
        if (matchAll) {
            return property === match;
        } else {
            //match all should return a non-exact, case-insensitive match that includes portions of the word
            console.log(property);
            return property.toLowerCase().includes(match.toLowerCase());
        }
    }
    /**
     *
     * @param {*} childArray - the nested array of items
     * @param {*} property -
     * @param {*} match
     * @returns if all (or some) of the values in the array match
     */
    function filterArrayProperty(childArray, match, matchAll, childProperty = "") {
        let nameArray = [];
        if (childProperty) {
            nameArray = childArray.map((item) => item[childProperty].toLowerCase());
        } else {
            nameArray = childArray.map((item) => item.toLowerCase()); //get names of items
        }
        console.log(childArray);
        if (matchAll && match instanceof Array) {
            let allIncluded = match.every((matchString) =>
                nameArray.includes(matchString.toLowerCase())
            );
            return allIncluded;
        }
        //use some to make sure only some of the values in the child array match
        else {
            let someIncluded = match.some((matchString) =>
                nameArray.includes(matchString.toLowerCase())
            );
            return someIncluded;
        }
    }
    const getNestedObject = (nestedObject, pathArray) => {
        return pathArray.reduce(function (obj, key) {
            if (obj && obj[key] !== undefined) {
                console.log(obj, key, obj[key]);
                return obj[key];
            }
            return undefined;
        }, nestedObject);
    };
    function breakDownPropertyName(propertyName) {
        return propertyName.split(".");
    }

    function getMatches(
        array,
        property,
        conditionToMeet,
        matchAll = false,
        childProperty = ""
    ) {
        //for the strings, match all could be ""
        let propertyName = property;

        return array.filter((item, index) => {
            // let newPathString = property.replace("index", index);
            return matchFunctions[propertyName](
                item[propertyName],
                conditionToMeet,
                matchAll,
                childProperty
            );
        });
    }

    function updateFilters(propertyName, value) {
        setFilters({ [propertyName]: value });
    }

    let andOrProps = {
        name: "relation",
        options: [
            { name: "and", _id: "and" },
            { name: "or", _id: "or" },
            { name: "not", _id: "not" },
        ],
        setStateFunction: updateFilters,
        value: filters["relation"],
    };

    return (
        <Form>
            <FilterGroup links={props.links} tags={props.tags}></FilterGroup>
            <Select {...andOrProps}></Select>
        </Form>
    );
}

export default FilterGroups;
