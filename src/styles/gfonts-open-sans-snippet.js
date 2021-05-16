const fontFaceCss = `@font-face {
  font-family: 'Open Sans';
  font-style: italic;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/l/font?kit=mem6YaGs126MiZpBA-UFUJ0bf8pkApTHrojzeA6hlkeqxL6srOchojwUfWII8pEpRAp7pSMBXsmpQPdsHZDp6Tv3Ir-3mNyUpR6Mt691nPvFKGqk1Em5dyVVGhbMdhdDahcXkQTOm6im-rIBkvU1tui6iDs&skey=743457fe2cc29280&v=v18) format('woff2');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 300;
  font-display: swap;
  src: url(https://fonts.gstatic.com/l/font?kit=mem5YaGs126MiZpBA-UN_r8-UOJuCqap04r0eQ2gmUapxbmtr-Y-oz8VemML854oRwt8pCAAIciqQfBtHpHm6Dj2Jb60mcOVph-Ltqx0k_rGKWyn1Xa4dCRSGxXNeRZAaxAWkgXRmqun_bMCk_o0tem9iTin&skey=b33cc031a589c168&v=v18) format('woff2');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url(https://fonts.gstatic.com/l/font?kit=mem8YaGs126MiZpBA-U1V5ccXcheXoe4q47xegCvlEWswryusvkjoDoSf2AG_JMrQgx5p11_XMuvRvVuE57r6z3xIL2pht6WoxiOtaF7nvnCLWia6ku7cSNXGBjCdBVFbBUVjxrMma6g-LAPnPc3sO64&skey=62c1cbfccc78b4b2&v=v18) format('woff2');
}
@font-face {
  font-family: 'Open Sans';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url(https://fonts.gstatic.com/l/font?kit=mem5YaGs126MiZpBA-UNirk-UOJuCqap04r0eQ2gmUapxbmtr-Y-oz8VemML854oRwt8pCAAIciqQfBtHpHm6Dj2Jb60mcOVph-Ltqx0k_rGKWyn1Xa4dCRSGxXNeRZAaxAWkgXRmqun_bMCk_o0tem9iTin&skey=a162967ffaa5aa08&v=v18) format('woff2');
}`;

export default fontFaceCss;

export const minifiedFontFace = fontFaceCss.replace(/\s*/gm, ``);
