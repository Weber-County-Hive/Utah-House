// The Weber County Hive — Utah House Directory
// One entry per representative profile page. To add a new one: copy an
// object below, fill in the fields, save. weber-hive-house-directory.html
// reads this file and builds the directory automatically.
//
// status: "live" | "coming-soon"
const REPRESENTATIVES = [
  {
    id: "teuscher",
    dist: 44,
    label: [40.52, -112.45],
    name: "Rep. Jordan D. Teuscher",
    district: "House District 44 (South Jordan / Riverton, Salt Lake County)",
    role: "House Rules Chair · Co-Chair, Point of the Mountain State Land Authority",
    summary: "A conflict-of-interest form that lists no board seats, sitting on a board he's personally legislated for three sessions running — plus a bill he held with no explanation, and a sign-disclosure law with a real money trail behind it.",
    tags: ["House Rules Chair", "Board Conflict", "COI Disclosure Gap", "Lost 2026"],
    status: "live",
    link: "weber-hive-teuscher.html"
  },
  {
    id: "christofferson",
    dist: 53,
    label: [40.5, -111.45],
    name: "Rep. Kay J. Christofferson",
    district: "House District 53 (Lehi, Utah County)",
    role: "House Transportation Committee Chair",
    summary: "His campaign credits him with a 2026 tax cut, but the bill he actually sponsored for it died at the same midnight deadline that killed seven others. A wide-ranging transit bill he carried passed over organized public opposition. A $16,000 campaign payment to an Election Hive-linked vendor is logged only as \"campaign expense.\"",
    tags: ["Transportation Chair", "Wayne Harper Network", "Federalism Commission", "Midnight Kill", "Election Hive", "Won 2026"],
    status: "live",
    link: "weber-hive-christofferson.html"
  },
  {
    id: "lisonbee",
    dist: 14,
    label: [41.12, -112.45],
    name: "Rep. Karianne Lisonbee",
    district: "House District 14 (Davis County)",
    role: "House Judiciary and House Education committees · Did not seek re-election in 2026",
    summary: "Two nonprofit board seats on her 2025 conflict of interest form are not on her 2026 form. Nine 2026 bills, seven signed, with cost notes. Her largest 2025 campaign payee is listed only as \"Campaign Expense.\"",
    tags: ["House Judiciary", "COI Form Change", "Child Welfare Bills", "Kyle Palmer", "Did Not Run 2026"],
    status: "live",
    link: "weber-hive-lisonbee.html"
  },
  {
    id: "thurston",
    dist: 62,
    label: [40.24, -111.45],
    name: "Rep. Norm Thurston",
    district: "House District 62 (Provo / Springville, Utah County)",
    role: "General Government Appropriations Subcommittee · House Business, Labor and Commerce · House Transportation",
    summary: "An economist who has served since 2015. His campaign's own deposits are its largest single source. Lost his seat on Nov. 3.",
    tags: ["Lost 2026", "House Transportation", "Richard Jaussi"],
    status: "live",
    link: "weber-hive-thurston.html"
  },
  {
    id: "schultz",
    dist: 12,
    label: [41.44, -112.45],
    name: "Rep. Mike Schultz",
    district: "House District 12 (Hooper / West Weber and west Davis)",
    role: "Speaker of the House · Executive Appropriations · Legislative Management",
    summary: "Speaker of the House, in office since 2015. His form lists 25 entries he owns or helps run. Lines on his reports labeled as donations total $258,875. Re-elected Nov. 3.",
    tags: ["House Speaker", "Won 2026", "Kyle Palmer", "25 Entities"],
    status: "live",
    link: "weber-hive-schultz.html"
  },
  {
    id: "kyle",
    dist: 8,
    label: [41.32, -111.45],
    name: "Rep. Jason Kyle",
    district: "House District 8 (Ogden Valley / east Weber and Morgan)",
    role: "House Revenue and Taxation · House Business, Labor and Commerce · Economic and Community Development Appropriations",
    summary: "House sponsor of S.J.R. 2 (Amendment B). Nearly all of his campaign spending went to one firm. Lost his seat on Nov. 3.",
    tags: ["Lost 2026", "Amendment B", "Tactical Campaigns", "GSL Votes"],
    status: "live",
    link: "weber-hive-kyle.html"
  },
  {
    id: "shelley",
    dist: 66,
    label: [39.6, -111.45],
    name: "Rep. Troy Shelley",
    district: "House District 66 (Juab, Sanpete and south Utah County)",
    role: "Public Utilities and Energy · Economic Development and Workforce Services · Natural Resources Appropriations",
    summary: "In office since 2025. His form lists energy, stone and welding businesses. One of them gave his campaign $12,000. Re-elected Nov. 3.",
    tags: ["Won 2026", "Energy", "Sanpete Stone"],
    status: "live",
    link: "weber-hive-shelley.html"
  },
  {
    id: "ivory",
    dist: 39,
    label: [40.7, -111.45],
    name: "Rep. Ken Ivory",
    district: "House District 39 (West Jordan / Midvale, Salt Lake County)",
    role: "Federalism Commission · House Transportation · House Business, Labor and Commerce",
    summary: "An attorney in office since 2011. Two House GOP committees gave $69,000. More than $105,000 of spending is labeled \"Campaign Expense.\" Lost his seat on Nov. 3.",
    tags: ["Lost 2026", "Federalism Commission", "Election Hive"],
    status: "live",
    link: "weber-hive-ivory.html"
  },
  {
    id: "macpherson",
    dist: 26,
    label: [40.84, -112.45],
    name: "Rep. Matt MacPherson",
    district: "House District 26 (West Valley City / Magna, Salt Lake County)",
    role: "House Education · House Government Operations · General Oversight",
    summary: "Appointed in 2023. Two House GOP committees gave $132,500, more than half of what he raised. He sponsored 18 bills in 2026. Lost his seat on Nov. 3.",
    tags: ["Lost 2026", "Leadership PACs", "Election Hive"],
    status: "live",
    link: "weber-hive-macpherson.html"
  },
  {
    id: "loubet",
    dist: 27,
    label: [40.68, -112.45],
    name: "Rep. Anthony Loubet",
    district: "House District 27 (Kearns / West Valley / West Jordan, Salt Lake County)",
    role: "House Judiciary · House Government Operations · General Government Appropriations",
    summary: "An attorney in office since 2023. Party and leadership committees were his largest donors. Election Hive was his largest payee. Lost his seat on Nov. 3 to Liz Oates.",
    tags: ["Lost 2026", "Election Hive", "Tactical Campaigns"],
    status: "live",
    link: "weber-hive-loubet.html"
  },
  {
    id: "wilcox",
    dist: 7,
    label: [41.48, -111.45],
    name: "Rep. Ryan Wilcox",
    district: "House District 7 (North Ogden / Ogden, Weber County)",
    role: "House Rules · House Law Enforcement and Criminal Justice · House Business, Labor and Commerce",
    summary: "Served 2008 to 2014 and again since 2021. He works in federal relations for Intermountain Health. He sponsored 22 bills in 2026. Re-elected Nov. 3 by 468 votes.",
    tags: ["Won 2026", "House Rules", "Lincoln Hill"],
    status: "live",
    link: "weber-hive-wilcox.html"
  },
  {
    id: "sawyer",
    dist: 9,
    label: [41.28, -112.45],
    name: "Rep. Jake Sawyer",
    district: "House District 9 (Roy / West Haven / Ogden, Weber County)",
    role: "House Transportation · House Business, Labor and Commerce · Transportation Appropriations",
    summary: "In office since 2025. Three party and leadership PACs gave $67,500 of his $109,151 raised. Lost his seat on Nov. 3 to Angela Choberka.",
    tags: ["Lost 2026", "Leadership PACs"],
    status: "live",
    link: "weber-hive-sawyer.html"
  },
  {
    id: "hall",
    dist: 11,
    label: [41.16, -111.45],
    name: "Rep. Katy Hall",
    district: "House District 11 (South Ogden / Riverdale / Roy / Layton area)",
    role: "House Health and Human Services · House Law Enforcement and Criminal Justice · Higher Education Appropriations",
    summary: "A registered nurse in office since 2023. Seven of her eight 2026 bills were signed. A note about her spouse's business interests on her January 2026 form is not on her July 2026 form. Re-elected Nov. 3.",
    tags: ["Won 2026", "Health and Human Services", "COI Form Change"],
    status: "live",
    link: "weber-hive-hall.html"
  },
  {
    id: "bishop",
    dist: 6,
    label: [41.6, -112.45],
    name: "Rep. Rob Bishop",
    district: "House District 6 (Plain City / Farr West / Perry / west Weber and Box Elder)",
    role: "Federalism Commission · Public Education Appropriations · Education Interim",
    summary: "A former congressman who joined the Utah House on May 6, 2026, after a delegate vote. His 2026 account raised $34,831. Won a full term Nov. 3.",
    tags: ["Won 2026", "Federalism Commission", "Joined May 2026"],
    status: "live",
    link: "weber-hive-bishop.html"
  },
  {
    id: "gricius",
    dist: 50,
    label: [40.2, -112.45],
    name: "Rep. Stephanie Gricius",
    district: "House District 50 (Eagle Mountain / Saratoga Springs, Utah County)",
    role: "House Judiciary · House Health and Human Services · Social Services Appropriations",
    summary: "In office since 2023. Her largest payee is herself. Money moved both ways between her campaign and Rep. Karianne Lisonbee's. Re-elected Nov. 3.",
    tags: ["Won 2026", "House Judiciary", "Lisonbee"],
    status: "live",
    link: "weber-hive-gricius.html"
  }
];
