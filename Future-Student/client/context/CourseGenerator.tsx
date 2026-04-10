export type Field =
  | "Computing & IT"
  | "Engineering"
  | "Business"
  | "Law"
  | "Arts & Design"
  | "Education & Health"
  | "Science";

export type DegreeTemplate = {
  key: string;
  field: Field;
  titles: string[];
  typicalDurationYears: number;
  atarBand: [number, number];
  commonTags?: string[];
};

export type Intake =
  | "Semester 1"
  | "Semester 2"
  | "Term 1"
  | "Term 2"
  | "Term 3";

export type UniversityProfile = {
  name: string;
  abbr: string;
  locations: string[];
  supportedFields: Field[];
  preferredDegreeKeys: string[];
  namingStyle?:
    | "traditional"
    | "practical"
    | "science-major"
    | "engineering-major";
  atarAdjustment: number;
  intakePattern: Intake[];
  courseCountRange: [number, number];
};

export type Course = {
  university: string;
  location: string;
  degree: string;
  code: string;
  startDate: string;
  closingDate: string;
  applicationOpenDate: string;
  openDayDate: string;
  offerReleaseDate: string;
  expoDate: string;
  atar: number;
  field: Field;
  durationYears: number;
  intake: Intake;
  studyMode: "On Campus" | "Online" | "Mixed";
};

const degreeTemplates: DegreeTemplate[] = [
  {
    key: "computer-science",
    field: "Computing & IT",
    titles: [
      "Bachelor of Computer Science",
      "Bachelor of Advanced Computing",
      "Bachelor of Science (Computer Science)",
    ],
    typicalDurationYears: 3,
    atarBand: [72, 96],
    commonTags: ["programming", "software", "algorithms"],
  },
  {
    key: "information-technology",
    field: "Computing & IT",
    titles: [
      "Bachelor of Information Technology",
      "Bachelor of IT",
      "Bachelor of Information Systems",
    ],
    typicalDurationYears: 3,
    atarBand: [58, 88],
  },
  {
    key: "software-engineering",
    field: "Computing & IT",
    titles: [
      "Bachelor of Software Engineering",
      "Bachelor of Engineering (Software)",
    ],
    typicalDurationYears: 4,
    atarBand: [70, 95],
  },
  {
    key: "data-science",
    field: "Computing & IT",
    titles: ["Bachelor of Data Science", "Bachelor of Science (Data Science)"],
    typicalDurationYears: 3,
    atarBand: [68, 94],
  },
  {
    key: "civil-engineering",
    field: "Engineering",
    titles: [
      "Bachelor of Civil Engineering",
      "Bachelor of Engineering (Civil)",
    ],
    typicalDurationYears: 4,
    atarBand: [65, 92],
  },
  {
    key: "mechanical-engineering",
    field: "Engineering",
    titles: [
      "Bachelor of Mechanical Engineering",
      "Bachelor of Engineering (Mechanical)",
    ],
    typicalDurationYears: 4,
    atarBand: [66, 93],
  },
  {
    key: "electrical-engineering",
    field: "Engineering",
    titles: [
      "Bachelor of Electrical Engineering",
      "Bachelor of Engineering (Electrical)",
    ],
    typicalDurationYears: 4,
    atarBand: [68, 94],
  },
  {
    key: "business",
    field: "Business",
    titles: [
      "Bachelor of Business",
      "Bachelor of Commerce",
      "Bachelor of Business Administration",
    ],
    typicalDurationYears: 3,
    atarBand: [55, 90],
  },
  {
    key: "accounting",
    field: "Business",
    titles: ["Bachelor of Accounting", "Bachelor of Commerce (Accounting)"],
    typicalDurationYears: 3,
    atarBand: [58, 88],
  },
  {
    key: "finance",
    field: "Business",
    titles: ["Bachelor of Finance", "Bachelor of Commerce (Finance)"],
    typicalDurationYears: 3,
    atarBand: [62, 91],
  },
  {
    key: "law",
    field: "Law",
    titles: ["Bachelor of Laws", "Bachelor of Laws (Honours)"],
    typicalDurationYears: 4,
    atarBand: [82, 99],
  },
  {
    key: "arts",
    field: "Arts & Design",
    titles: ["Bachelor of Arts"],
    typicalDurationYears: 3,
    atarBand: [50, 85],
  },
  {
    key: "design",
    field: "Arts & Design",
    titles: [
      "Bachelor of Design",
      "Bachelor of Design in Visual Communication",
    ],
    typicalDurationYears: 3,
    atarBand: [55, 89],
  },
  {
    key: "architecture",
    field: "Arts & Design",
    titles: [
      "Bachelor of Architecture Design",
      "Bachelor of Architectural Studies",
    ],
    typicalDurationYears: 3,
    atarBand: [72, 95],
  },
  {
    key: "education",
    field: "Education & Health",
    titles: [
      "Bachelor of Education (Primary)",
      "Bachelor of Education (Secondary)",
    ],
    typicalDurationYears: 4,
    atarBand: [52, 84],
  },
  {
    key: "nursing",
    field: "Education & Health",
    titles: ["Bachelor of Nursing"],
    typicalDurationYears: 3,
    atarBand: [58, 87],
  },
  {
    key: "psychology",
    field: "Education & Health",
    titles: ["Bachelor of Psychology", "Bachelor of Psychological Science"],
    typicalDurationYears: 3,
    atarBand: [68, 95],
  },
  {
    key: "biomedical-science",
    field: "Science",
    titles: [
      "Bachelor of Biomedical Science",
      "Bachelor of Science (Biomedical Science)",
    ],
    typicalDurationYears: 3,
    atarBand: [65, 92],
  },
  {
    key: "environmental-science",
    field: "Science",
    titles: [
      "Bachelor of Environmental Science",
      "Bachelor of Science (Environmental Science)",
    ],
    typicalDurationYears: 3,
    atarBand: [52, 84],
  },
  {
    key: "communication",
    field: "Arts & Design",
    titles: [
      "Bachelor of Communication",
      "Bachelor of Media and Communication",
    ],
    typicalDurationYears: 3,
    atarBand: [54, 86],
  },
];

const universityProfiles: UniversityProfile[] = [
  {
    name: "University of New South Wales",
    abbr: "UNSW",
    locations: ["Kensington, NSW"],
    supportedFields: [
      "Computing & IT",
      "Engineering",
      "Business",
      "Law",
      "Science",
      "Arts & Design",
    ],
    preferredDegreeKeys: [
      "computer-science",
      "software-engineering",
      "data-science",
      "electrical-engineering",
      "mechanical-engineering",
      "civil-engineering",
      "business",
      "finance",
      "law",
      "architecture",
      "biomedical-science",
    ],
    namingStyle: "engineering-major",
    atarAdjustment: 6,
    intakePattern: ["Term 1", "Term 2", "Term 3"],
    courseCountRange: [10, 15],
  },
  {
    name: "University of Sydney",
    abbr: "USYD",
    locations: ["Camperdown, NSW"],
    supportedFields: [
      "Computing & IT",
      "Engineering",
      "Business",
      "Law",
      "Science",
      "Arts & Design",
      "Education & Health",
    ],
    preferredDegreeKeys: [
      "computer-science",
      "data-science",
      "electrical-engineering",
      "civil-engineering",
      "business",
      "finance",
      "law",
      "arts",
      "psychology",
      "biomedical-science",
    ],
    namingStyle: "science-major",
    atarAdjustment: 7,
    intakePattern: ["Semester 1", "Semester 2"],
    courseCountRange: [10, 14],
  },
  {
    name: "University of Technology Sydney",
    abbr: "UTS",
    locations: ["Ultimo, NSW"],
    supportedFields: [
      "Computing & IT",
      "Engineering",
      "Business",
      "Law",
      "Arts & Design",
      "Science",
    ],
    preferredDegreeKeys: [
      "information-technology",
      "software-engineering",
      "data-science",
      "civil-engineering",
      "business",
      "accounting",
      "communication",
      "design",
      "law",
    ],
    namingStyle: "practical",
    atarAdjustment: 2,
    intakePattern: ["Semester 1", "Semester 2"],
    courseCountRange: [9, 13],
  },
  {
    name: "Western Sydney University",
    abbr: "WSU",
    locations: ["Parramatta, NSW", "Campbelltown, NSW", "Penrith, NSW"],
    supportedFields: [
      "Computing & IT",
      "Engineering",
      "Business",
      "Law",
      "Arts & Design",
      "Education & Health",
      "Science",
    ],
    preferredDegreeKeys: [
      "information-technology",
      "computer-science",
      "business",
      "accounting",
      "nursing",
      "education",
      "psychology",
      "biomedical-science",
      "communication",
    ],
    namingStyle: "traditional",
    atarAdjustment: -4,
    intakePattern: ["Semester 1", "Semester 2"],
    courseCountRange: [10, 16],
  },
  {
    name: "Charles Sturt University",
    abbr: "CSU",
    locations: ["Wagga Wagga, NSW", "Bathurst, NSW", "Online"],
    supportedFields: [
      "Computing & IT",
      "Business",
      "Education & Health",
      "Science",
    ],
    preferredDegreeKeys: [
      "information-technology",
      "business",
      "accounting",
      "education",
      "nursing",
      "psychology",
      "environmental-science",
    ],
    namingStyle: "traditional",
    atarAdjustment: -8,
    intakePattern: ["Semester 1", "Semester 2"],
    courseCountRange: [8, 12],
  },
];

const intakeDates: Record<Intake, { start: string; close: string }> = {
  "Semester 1": { start: "02-MAR-2026", close: "31-JAN-2026" },
  "Semester 2": { start: "27-JUL-2026", close: "30-JUN-2026" },
  "Term 1": { start: "16-FEB-2026", close: "20-JAN-2026" },
  "Term 2": { start: "01-JUN-2026", close: "10-MAY-2026" },
  "Term 3": { start: "14-SEP-2026", close: "20-AUG-2026" },
};

function clamp(num: number, min: number, max: number) {
  return Math.max(min, Math.min(max, num));
}

function hashString(input: string) {
  let h = 0;
  for (let i = 0; i < input.length; i++) {
    h = (h * 31 + input.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function pickDeterministic<T>(items: T[], seed: string): T {
  return items[hashString(seed) % items.length];
}

function numberFromRange(min: number, max: number, seed: string) {
  const span = max - min;
  return min + (hashString(seed) % (span + 1));
}

function parseDMY(s: string): Date {
  const MONTHS: Record<string, number> = {
    JAN: 0,
    FEB: 1,
    MAR: 2,
    APR: 3,
    MAY: 4,
    JUN: 5,
    JUL: 6,
    AUG: 7,
    SEP: 8,
    OCT: 9,
    NOV: 10,
    DEC: 11,
  };
  const [dd, mmm, yyyy] = s.split("-");
  return new Date(Number(yyyy), MONTHS[mmm], Number(dd));
}

function fmtDMY(d: Date): string {
  const inv = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  return `${String(d.getDate()).padStart(2, "0")}-${inv[d.getMonth()]}-${d.getFullYear()}`;
}

function addDays(base: Date, days: number): Date {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d;
}

function getStudyMode(location: string): "On Campus" | "Online" | "Mixed" {
  if (location === "Online") return "Online";
  return location.includes("Online") ? "Mixed" : "On Campus";
}

function pickTitle(
  template: DegreeTemplate,
  profile: UniversityProfile,
): string {
  if (
    profile.namingStyle === "science-major" &&
    template.key === "computer-science"
  ) {
    return "Bachelor of Science (Computer Science)";
  }

  if (
    profile.namingStyle === "engineering-major" &&
    template.field === "Engineering"
  ) {
    const engineeringTitle = template.titles.find((t) =>
      t.includes("Engineering ("),
    );
    return engineeringTitle ?? template.titles[0];
  }

  if (
    profile.namingStyle === "practical" &&
    template.key === "information-technology"
  ) {
    return "Bachelor of Information Technology";
  }

  return template.titles[0];
}

function buildCourseCode(uniAbbr: string, degreeKey: string, location: string) {
  const short = degreeKey
    .split("-")
    .map((s) => s.slice(0, 2).toUpperCase())
    .join("");
  const loc = location
    .split(",")[0]
    .replace(/\s+/g, "")
    .slice(0, 3)
    .toUpperCase();
  return `${uniAbbr}-${short}-${loc}`;
}

export function buildCourses(): Course[] {
  const courses: Course[] = [];

  for (const uni of universityProfiles) {
    for (const degreeKey of uni.preferredDegreeKeys) {
      const template = degreeTemplates.find((d) => d.key === degreeKey);
      if (!template) continue;
      if (!uni.supportedFields.includes(template.field)) continue;

      const location = pickDeterministic(
        uni.locations,
        `${uni.abbr}-${degreeKey}-location`,
      );
      const intake = pickDeterministic(
        uni.intakePattern,
        `${uni.abbr}-${degreeKey}-intake`,
      );
      const schedule = intakeDates[intake];

      const title = pickTitle(template, uni);

      const baseAtar = numberFromRange(
        template.atarBand[0],
        template.atarBand[1],
        `${uni.abbr}-${degreeKey}-atar`,
      );

      const adjustedAtar = clamp(baseAtar + uni.atarAdjustment, 30, 99);

      const startD = parseDMY(schedule.start);
      const closeD = parseDMY(schedule.close);
      const appOpenD = addDays(
        closeD,
        -100 + (hashString(`${uni.abbr}-${degreeKey}-open`) % 25),
      );
      const openDayD = addDays(
        startD,
        -40 + (hashString(`${uni.abbr}-${degreeKey}-oday`) % 12),
      );
      const offerReleaseD = addDays(
        startD,
        -14 + (hashString(`${uni.abbr}-${degreeKey}-offer`) % 7),
      );
      const expoD = addDays(
        closeD,
        -55 + (hashString(`${uni.abbr}-${degreeKey}-expo`) % 15),
      );

      courses.push({
        university: uni.name,
        location,
        degree: title,
        code: buildCourseCode(uni.abbr, degreeKey, location),
        startDate: schedule.start,
        closingDate: schedule.close,
        applicationOpenDate: fmtDMY(appOpenD),
        openDayDate: fmtDMY(openDayD),
        offerReleaseDate: fmtDMY(offerReleaseD),
        expoDate: fmtDMY(expoD),
        atar: adjustedAtar,
        field: template.field,
        durationYears: template.typicalDurationYears,
        intake,
        studyMode: getStudyMode(location),
      });
    }
  }

  return courses;
}
