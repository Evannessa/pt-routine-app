const { createGlobalStyle } = require("styled-components");

export const Global = createGlobalStyle`
	:root{
		
  --clr-primary-deep-dark: #171529;
  --clr-primary-dark: #25203f;
  --clr-primary-base: #342E57;
  --clr-primary-light: #6357a6;
  --clr-accent: #6495ed;
  --clr-accent-green:#4ab4c7;
--clr-accent-pink: #bf2063;
  --clr-shadow: rgba(0, 0, 0, 0.25);
	}
	html, body{
		scrollbar-width: thin;
	}
`;
