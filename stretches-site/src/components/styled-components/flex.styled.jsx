import styled from "styled-components";
import { device } from "./devices";
import { Container } from "./layout.styled";
const Flex = styled(Container)`
    display: flex;
    flex-wrap: ${(props) => {
        if (props.wrapReverse) return "wrap-reverse";
        else if (props.noWrap) return "nowrap";
        return "wrap";
    }};
    justify-content: ${(props) => {
        if (props.justifyContent) return props.justifyContent;
        if (props.justifyCenter) return "center";
        else if (props.justifyAround) return "space-around";
        else if (props.justifyBetween) return "space-between";
        else if (props.justifyEnd) return "flex-end";
        return "flex-start";
    }};
    align-items: ${(props) => {
        if (props.alignItems) return props.alignItems;
        else if (props.alignStretch) return "stretch";
        else if (props.alignEnd) return "flex-end";
        else if (props.alignCenter) return "center";
        else if (props.alignBaseline) return "baseline";
        return "flex-start";
    }};
    flex-direction: ${(props) => (props.column ? "column" : "row")};
`;
const StyledColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;
export const Column = styled.div`
    width: ${(props) => {
        if (props.three) return "33.33%";
        if (props.four) return "25%";
        return "50%";
    }};
    padding: ${(props) => (props.noPadding ? 0 : "15px")};
`;
Flex.displayName = "FlexContainer";
/**
 *
 * @param {*} numberOfColumns - the number of columns
 * @param {Array} _elements - the array of elements
 */
function generateColumns(_elements, numberOfColumns = 3, maxPerColumn = 1) {
    let columnArray = [];
    let elements = [..._elements]; //copy array
    for (let n = numberOfColumns; n > 0; n--) {
        //splice modifies and returns original array
        //Math.ceil rounds up
        //cut the array from 0 to tne length of the array divided by number of columns, return the original array
        let chunk = elements.splice(0, Math.ceil(elements.length / n));
        //push that chunk into this
        columnArray.push(<StyledColumn key={n}>{chunk}</StyledColumn>);
    }
    return columnArray;
}

// export const FlexContainer = () => {
// 	return(<Flex>

// 	</Flex>)

// }
export default Flex;
