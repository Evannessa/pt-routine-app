const { createGlobalStyle } = require("styled-components");

export const Global = createGlobalStyle`
	:root{
		
  --clr-primary-deep-dark: hsl(220, 19%, 10%);
  --clr-primary-dark: hsl(222, 13%, 15%);
  --clr-primary-base: hsl(216, 14%, 21%); 
  --clr-primary-light: hsl(216, 14%, 34%);
 --clr-primary-lighter: hsl(216, 22%, 60%); 
 --clr-primary-lightest: hsl(216, 40%, 73%);
--clr-accent: hsl(197, 84%, 57%);
--clr-accent-lighter: hsl(197, 94%, 67%);
  --clr-accent-green:#4ab4c7;
--clr-accent-pink: #ff5a6c;
  --clr-shadow: rgba(0, 0, 0, 0.25);
	}
	html, body{
		scrollbar-width: thin;
	}
`;
