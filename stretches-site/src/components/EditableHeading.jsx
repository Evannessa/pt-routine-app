import React, {useState} from 'react';
import Input from './input/Input';
import styled from 'styled-components';

const StyledEditableHeader = styled.div`
   display: flex; 
   justify-content: center;
   align-items: center;
`;




const EditableHeading = ({
    text,
    headingNumber=2,
    inputProps={},
    className="",
    }) => {

        const [editMode, setEditMode] = useState(false)

        const ConditionalWrapper = ()=> {
            // let heading 
            let text = inputProps.value
            switch (headingNumber) {
                case 1:
                    return <h1>{text}</h1>
                case 2:
                    return <h2>{text}</h2>
                case 3:
                    return <h3>{text}</h3>
                case 4:
                    return <h4>{text}</h4>
                default:
                    return <h1>{text}</h1>
            }
        }

        function updateText(event){

            inputProps.setStateFunction()
        }
    
    return (
        <StyledEditableHeader onClick={()=> setEditMode(true)} className={className}>
            {!editMode ? 
                <ConditionalWrapper/>: 
                <Input 
                    {...inputProps}
                    value={inputProps.value}
                    onBlur={()=> setEditMode(false)}
                />
            }
            
        </StyledEditableHeader>
    );
};




export default EditableHeading;
