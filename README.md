# RAINY Bindrune Studio
Mongolian, responsive, client-side Elder Futhark / Ogham SVG studio. No API keys, database, or build dependencies.

## Run
Node 20+: `npm start`, open http://localhost:3000. `PORT` is supported for Railway. Static hosting (including GitHub Pages) can serve the root directly. `npm test` and `npm run check` verify the engine.

## Behavior
- Editable Mongolian-to-Latin convenience transliteration; this is not a linguistic standard or phonetic translation.
- 24 Elder Futhark entries; longest-match TH, NG, EI. Explicit Latin approximations, unsupported-character notices, 32-token limit.
- Bind composition retains every occurrence in separate vertical slots on a shared stem. Sequence mode shows individual stylized runes. Ogham renders the 20 primary letters bottom upward with short vowel notches.
- SVG export is vector, optional background. PNG uses a dark background and a 3000px longest edge. Color and line weight controls. No name is sent to a backend.

## Evidence and limits
Unicode charts establish encoded characters, not a universal historical font or transliteration rule. Geometry here is our stylized interpretation. Shared-axis name compositions are modern designs, not certified historical inscriptions. Reconstructed rune names and literal glosses have uncertainties (especially Perthro, Algiz, Kenaz). No predictive or supernatural claim is made. Fearn uses V as a transcription key; modern F approximates it. J/Y, X and other unsupported modern letters are approximations with visible notices.

Sources: https://www.unicode.org/charts/PDF/U16A0.pdf ; https://www.unicode.org/charts/PDF/U1680.pdf ; https://unicode.org/versions/Unicode16.0.0/core-spec/chapter-8/ ; https://natmus.dk/historisk-viden/temaer/runer/runer-i-jernalderen/

Files: engine.js (mapping/parser/geometry/export), app.js (UI/downloads), index.html/style.css (interface), server.js (Node server). Google Fonts is optional; system font fallback works offline.

## Epigraphy refinement
Default mode now displays individual runes with rune-specific staves (no invented center line through Gebo, Kenaz, Sowilo, Ingwaz, etc.). Fehu branches point upward. Unicode scholarly inputs þ, ŋ, ï are supported; EI is an application convenience, not a historical phonetic claim. Strict mode blocks approximate or incomplete exports. The interactive alphabet displays all 24/20 letters with vector samples, code points and source links. Basalt, bronze, parchment and clean-vector preview materials are cosmetic and do not alter exports.

Additional source: https://natmus.dk/historisk-viden/temaer/runer/runernes-navne/ explains reconstructed names. The conventional names used here differ in spelling from the museum's reconstructed forms. Meanings are brief traditional glosses, not word-for-word translations of a single ancient document. Unicode 16 §8.7/§8.15 establishes the repertoires and Ogham direction; it does not certify our precise stroke coordinates. No individual archaeological object is reproduced or claimed as a facsimile.

Verification: 10 engine tests, JavaScript syntax and HTML nesting checks. Visual browser QA remains pending because the browser binary download was unavailable in this environment.
