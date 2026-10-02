// Keep published homepage fragments usable after moving the long sections.
export const HOME_SECTION_TARGETS: Record<string, string> = {
  world: 'numbers/#world', 'hierarchy-title': 'numbers/#hierarchy-title',
  geography: 'geography/#atlas-title', 'atlas-title': 'geography/#atlas-title',
  'map-title': 'geography/#map-title', 'map-desc': 'geography/#map-desc',
  'no-data': 'geography/#no-data', 'atlas-country': 'geography/#atlas-country', 'country-detail': 'geography/#country-detail',
  traditions: 'religions/#traditions', 'families-title': 'religions/#families-title',
  'judaism-title': 'religions/#judaism-title', 'christian-title': 'religions/#christian-title',
  'development-title': 'religions/#development-title', 'trinitarian-title': 'religions/#trinitarian-title',
  'nontrinitarian-title': 'religions/#nontrinitarian-title', 'islam-title': 'religions/#islam-title',
  'other-traditions': 'religions/#other-traditions', 'other-title': 'religions/#other-title',
  ...Object.fromEntries(['hinduism', 'buddhism', 'sikhism', 'shinto', 'daoism', 'other'].map((id) => [`overview-${id}`, `religions/#overview-${id}`])),
};
