import React, {forwardRef} from 'react';


const DummyThumbnail = forwardRef((props, ref) => {
    return (
        <div 
        ref={ref}
            style={{
            backgroundColor: 'white',
            width: '100px',
            height: '100px'
        }}>
            {props.timer?._id.slice(-2)}
            {props.children}
        </div>
    );
})

export default DummyThumbnail;
