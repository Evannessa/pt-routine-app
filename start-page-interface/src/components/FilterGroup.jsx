import React, { useState, useEffect } from "react";
import ComboBox from "./input/ComboBox";
import Input from "./input/Input";
import Select from "./input/Select";
import { ChipButton } from "./styled-components/chips.styled";
import * as Buttons from "./styled-components/Buttons.Styled";
import * as Layout from "./styled-components/layout.styled";

export function FilterGroup(props) {
    const [names, setNames] = useState(props.links.map((link) => link.name));
    const [tags, setTags] = useState(props.tags.map((tag) => tag.name));
    const [matches, setMatches] = useState();
    const [displayMode, setDisplayMode] = useState(props.displayMode);

    const [filter, setFilter] = useState(
        props.defaultValues
            ? { ...props.defaultValues, stringMatch: "", arrayMatch: [] } //spread in the default values with the matches
            : {
                  categoryName: "",
                  propertyChoice: "name",
                  relation: "equal",
                  stringMatch: "",
                  arrayMatch: [],
              }
    );

    const [propertyChoiceProps, setPropertyChoiceProps] = useState(
        getPropertyChoiceProps()
    );
    const [matchProps, setMatchProps] = useState();
    const matchType = {
        name: String,
        url: String,
        tags: Array,
    };

    useEffect(() => {
        setNames(props.links.map((link) => link.name));
        setTags(props.tags.map((tag) => tag.name));

        setMatchProps(
            getMatchProps(
                filter.propertyChoice,
                filter.propertyChoice === "tags" ? "array" : "string"
            )
        );
    }, []);

    function toggleDisplayMode(event) {
        setDisplayMode((prevMode) => !prevMode);
    }
    function findMatches() {
        setMatches(getMatches(props.links, filter.propertyChoice, filter.stringMatch));
    }
    useEffect(() => {
        findMatches();
    }, [props.links, filter]);

    useEffect(() => {
        // setPropertyChoiceProps(getPropertyChoiceProps());

        setMatchProps(
            getMatchProps(
                filter.propertyChoice,
                filter.propertyChoice === "tags" ? "array" : "string"
            )
        );
        findMatches();
    }, [filter, names, tags]);

    //the methods associated with each type
    const matchFunctions = {
        name: filterStringProperty,
        url: filterStringProperty,
        tags: filterArrayProperty,
    };

    /**
     *
     * @param {String} property - the name of the property we're testing
     * @param {String|Array} match - a string or array to match
     * @param {Boolean} matchAll - if all should match, or just some. For Strings it'll be if the word should match exactly or just partially.
     * @returns a boolean saying whether or not the property matches
     */
    function filterStringProperty(property, match, matchAll = false) {
        //match all should return an EXACT match
        console.log("Filter string property?", property, typeof property, match);
        if (matchAll) {
            return property === match;
        } else {
            //match all should return a non-exact, case-insensitive match that includes portions of the word
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
        // console.log(array[0], array[0][propertyName], property);

        return array.filter((item, index) => {
            return matchFunctions[propertyName](
                item[propertyName],
                conditionToMeet,
                matchAll,
                childProperty
            );
        });
    }

    /**
     *
     * @param {String} propertyName - the name of the property we're updating
     * @param {*} value - the value we're updating with
     */
    function updateFilter(propertyName, value) {
        setFilter((prevFilter) => {
            return { ...prevFilter, [propertyName]: value };
        });
    }
    let optionsByType = {
        string: [
            { name: "equals", _id: "equals" },
            { name: "doesNotEqual", _id: "doesNotEqual" },
            { name: "not", _id: "not" },
        ],
        array: [
            { name: "contains", _id: "contains" },
            { name: "doesNotContain", _id: "doesNotContain" },
        ],
    };

    // any vs all
    function getRelationProps() {
        let relationProps = {
            name: "relation",
            options: [
                { name: "equals", _id: "equals" },
                { name: "doesNotEqual", _id: "doesNotEqual" },
                { name: "not", _id: "not" },
            ],
            setStateFunction: updateFilter,
            value: filter["relation"],
        };
        return relationProps;
    }
    function getPropertyChoiceProps() {
        let propertyChoiceProps = {
            name: "propertyChoice",
            options: [
                { name: "tags", _id: "tags" },
                { name: "name", _id: "name" },
                { name: "url", _id: "url" },
                { name: "type", _id: "type" },
            ],
            setStateFunction: updateFilter,
            value: filter["propertyChoice"],
        };
        return propertyChoiceProps;
    }

    let precisionProps = {
        name: "precision",
        options: [
            { name: "any", _id: "any" },
            { name: "all", _id: "all" },
        ],
    };

    let matchByType = {
        string: {},
    };

    /**
     * gets different props depending on the type
     * @param {String} propertyName - the name of the property
     * @param {*} propertyType - the type of the property
     * @returns - an object to be destructured into props
     */
    function getMatchProps(propertyName, propertyType) {
        console.log("Name and type", propertyName, propertyType);
        let matchProps = {
            name: "match",
            id: "match",
            list: `${propertyName}s`,
            datalistId: `${propertyName}s`,
            setStateFunction: updateFilter,
        };
        //if it's a string
        if (propertyType === "string") {
            //want to show a combobox with all the various
            matchProps.name = "stringMatch";
            matchProps.options = names.map((name) => {
                return { name: name, _id: name };
            });
            matchProps.value = filter.stringMatch;

            //if it's an array
        } else if (propertyType === "array") {
            matchProps.name = "arrayMatch";
            matchProps.multiple = true;
            console.log("UPDATING THIS DAMN ARRAY", tags);
            matchProps.options = tags.map((name) => {
                console.log("Tags are", name);
                return { name: name, _id: name };
            });
            matchProps.value = filter.arrayMatch;
        }
        return matchProps;
    }

    return (
        <section>
            <Buttons.ContainedButton onClick={toggleDisplayMode}>
                <Buttons.StyledButtonIconSpan>
                    {displayMode ? "expand_more" : "unfold_less"}
                </Buttons.StyledButtonIconSpan>
                {filter.categoryName}
            </Buttons.ContainedButton>
            {!displayMode && (
                <Layout.StyledDropdown>
                    <fieldset flex-direction="row">
                        <Input
                            type="text"
                            value={filter.categoryName}
                            name="categoryName"
                            setStateFunction={updateFilter}
                            hasLabel={true}></Input>
                        <Select
                            {...propertyChoiceProps}
                            value={filter.propertyChoice}></Select>
                        <Select {...getRelationProps()}></Select>
                        <Select {...precisionProps}></Select>
                        {filter.propertyChoice && (
                            <div>
                                {filter.propertyChoice !== "tags" ? (
                                    <ComboBox {...matchProps}></ComboBox>
                                ) : (
                                    <Select
                                        {...matchProps}
                                        options={props.tags.map((tag) => {
                                            return { name: tag.name, _id: tag.name };
                                        })}></Select>
                                )}
                            </div>
                        )}
                        {/* <div>
					{matches
						? matches.map((match) => <div key={match._id}>{match.name}</div>)
						: []}
								</div> */}
                    </fieldset>
                </Layout.StyledDropdown>
            )}
        </section>
    );
}
