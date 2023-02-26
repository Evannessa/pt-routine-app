import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
	:root{
	--clr-primary-orange-darker: #b03902;
	--clr-primary-orange: #fd6e2b;
	--clr-primary-orange-lighter: #fea880;
	--clr-primary-pink-darker: #a00b28;
	--clr-primary-pink: #f02e5f;
	--clr-primary-pink-lighter: #f68298;
	--clr-secondary-blue-darker: #157784;
	--clr-secondary-blue: #24C6DC;
	--clr-secondary-blue-lighter: #7cddea;
	--clr-secondary-purple-lighter: #928dc9;
	--clr-secondary-purple: #514A9D;
	--clr-secondary-purple-darker: #312c5e;
	--clr-success: #3DDC97;
	--clr-warning: #9A031E;
	}
	body{
		transition: all 0.25s linear;
	}
	html, body, *{

    &::-webkit-scrollbar {
        width: 0.25rem !important;
    }
    &::-webkit-scrollbar-track {
		background-color: rgba(255, 255, 255, 0.5);
		width: 0.25rem !important;
    }
    &::-webkit-scrollbar-thumb {

		${
            "" /* background: linear-gradient(45deg, var(--clr-secondary-blue), var(--clr-secondary-purple)); */
        }
		border-radius: 999px;
		width: 0.25rem !important;
    }
	}
`;
export default GlobalStyle;
