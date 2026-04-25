// SECTION CONFIGURATION

export const SECTION_RULES = [
  {
    name: "President",
    match: (d) => d.includes("president") && !d.includes("vice"),
  },

  {
    name: "Vice President",
    match: (d) => d.includes("vice president"),
  },

  {
    name: "Secretary",
    match: (d) => d.includes("secretary"),
  },

  {
    name: "Treasurer",
    match: (d) => d.includes("treasurer"),
  },

  {
    name: "Tech Team",
    match: (d) => d.includes("tech") || d.includes("developer"),
  },

  {
    name: "Graphics Team",
    match: (d) => d.includes("graphic") || d.includes("designer"),
  },

  {
    name: "Executive Members",
    match: () => true,
  },
];

export const SECTION_ORDER = SECTION_RULES.map(
  (rule) => rule.name,
);