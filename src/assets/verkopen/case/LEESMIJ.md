# Foto's voor de verkoopcase

Foto's in deze map verschijnen vanzelf in de case op de verkooppagina, in alle
vier de talen (`/huis-verkopen-marokko/`, `/en/sell-your-property/`,
`/fr/vendre-votre-bien/`, `/ar/sell-your-property/`).

- Formaat: jpg, png of webp (geen HEIC: exporteer iPhone-foto's eerst als JPG).
- Liggend, minimaal 1600 px breed.
- De bestandsnaam bepaalt de volgorde en de alt-tekst:
  `01-woonkamer-met-terras.jpg` wordt "Woonkamer met terras".
- De eerste foto is de grote hoofdfoto.

De tekst van de case (titel, gegevens, situatie) staat per taal in
`src/i18n/verkopen.ts` onder `case`. Zet daarna `verkoopcase.voorbeeld` op
`false`, dan verdwijnt het label "Voorbeeldcase".
