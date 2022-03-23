const { createGlobalStyle } = require("styled-components");

export const Global = createGlobalStyle`
	:root{
		
  --clr-primary-deep-dark: hsl(220, 19%, 10%);
  --clr-primary-dark: hsl(222, 13%, 15%);
  --clr-primary-dark-hsl: 222deg, 13%, 15%;
  --clr-primary-dark-translucent: hsla(222, 13%, 15%, 0.5);
  --clr-primary-base: hsl(216, 14%, 21%); 
  --clr-primary-base-hsl: 216deg, 14%, 21%; 
  --clr-primary-base-translucent: hsla(216, 14%, 21%, 0.85); 
  --clr-primary-light: hsl(216, 14%, 34%);
 --clr-primary-lighter: hsl(216, 22%, 60%); 
 --clr-primary-lightest: hsl(216, 40%, 73%);
${"" /* --clr-accent: hsl(197, 84%, 57%); */}
--clr-accent-hsl: 201, 88%, 53%;
--clr-accent: hsl(201, 88%, 53%);
--clr-accent-lighter: hsl(197, 94%, 67%);
--clr-accent-violet: #5e52d7;
--clr-accent-indigo: #417AE3;
--clr-accent-pink: #F24998;
--clr-accent-red: #F14B69;
--clr-accent-orange: #fc7442;
  --clr-accent-green:#4ab4c7;
  --clr-shadow: rgba(0, 0, 0, 0.25);
  --gradient-color: var(--clr-accent), var(--clr-accent-indigo), var(--clr-accent-violet), var(--clr-accent-pink), var(--clr-accent-red), var(--clr-accent-orange);
	}
	html, body{
		scrollbar-width: thin;
	}
`;
