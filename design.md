# FlexCarousel Integration (React Bits)

The `<FlexCarousel />` component from React Bits has been integrated into the Sthapatya 2026–27 website, powering the dedicated **Gallery** section (`#gallery`, replacing the legacy static discipline cards).

### Component Specification
- **Engine**: WebGL2 using `ogl` (bundled offline in [ogl.umd.js](file:///c:/Users/ASUS/website/ogl.umd.js))
- **Styles**: CAD Blueprint glassmorphism in [FlexCarousel.css](file:///c:/Users/ASUS/website/FlexCarousel.css)
- **Implementations**:
  - React JSX: [FlexCarousel.jsx](file:///c:/Users/ASUS/website/FlexCarousel.jsx)
  - Vanilla JS: [FlexCarousel.js](file:///c:/Users/ASUS/website/FlexCarousel.js) (`window.FlexCarousel`)
- **Total Gallery Items**: 28 real event photographs in `assets/gallery/` (`gallery-01.jpg` – `gallery-28.jpg`)

### Active Configuration
```jsx
<div style={{ width: '100%', height: '560px', position: 'relative' }}>
  <FlexCarousel
    items={GALLERY_ITEMS}
    preset="liquid"
    intro="rise"
    cardHeight={0.5}
    gap={12}
    squeeze={0.2}
    focusOnClick
    captions
    tilt={60}
  />
</div>
```

### Gallery Narrative Structure (28 Items)
1. **Ribbon-Cutting & Event Launch** (`gallery-07.jpg`)
2. **Inauguration Ceremony** (`gallery-05.jpg`)
3. **Sthapatya Souvenir Unveiling** (`gallery-25.jpg`)
4. **Faculty Dignitaries & Student Leads** (`gallery-08.jpg`)
5. **Keynote & Faculty Address** (`gallery-06.jpg`)
6. **Civil Corridor & CiESA Volunteers** (`gallery-21.jpg`)
7. **Sthapatya Arena & CiESA Crew** (`gallery-04.jpg`)
8. **CiESA Volunteers & Operations** (`gallery-09.jpg`)
9. **Participant Briefing & Problem Statement** (`gallery-16.jpg`)
10. **Event Briefing & Scoring Grid** (`gallery-22.jpg`)
11. **Civil Technical Quiz & Debate** (`gallery-17.jpg`)
12. **Total Station & Geodetic Surveying** (`gallery-18.jpg`)
13. **Auto Level & Differential Leveling** (`gallery-26.jpg`)
14. **Truss Showdown Workshop** (`gallery-01.jpg`)
15. **Structural Precision Challenge** (`gallery-02.jpg`)
16. **Structural Load & Failure Testing** (`gallery-11.jpg`)
17. **Materials & Testing Lab Jury** (`gallery-23.jpg`)
18. **ECOVISION & Project Defense** (`gallery-03.jpg`)
19. **Green Tech & SDG Research** (`gallery-10.jpg`)
20. **Hydrology & Evaporation Analysis** (`gallery-24.jpg`)
21. **Tug-of-War Anchor & Power Pull** (`gallery-27.jpg`)
22. **Tug-of-War Turf Battle** (`gallery-28.jpg`)
23. **Scrutiny & Evaluation Committee** (`gallery-20.jpg`)
24. **Valedictory & Plenary Session** (`gallery-12.jpg`)
25. **Presidential Address & Remarks** (`gallery-13.jpg`)
26. **Prize Distribution & Felicitation** (`gallery-14.jpg`)
27. **CiESA Organizing Secretariat** (`gallery-15.jpg`)
28. **Sthapatya Grand Symposium Conclave** (`gallery-19.jpg`)