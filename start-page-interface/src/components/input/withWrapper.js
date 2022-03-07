import { Component } from "react";

const WithWrapper = (WrappedComponent, Wrapper, otherChildren) => {
    return (
        <Wrapper>
            {otherChildren}
            <WrappedComponent></WrappedComponent>
        </Wrapper>
    );
};

export default WithWrapper;
