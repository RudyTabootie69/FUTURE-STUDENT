export class Course {
  uacID: number;
  uniID?: string; 
  title: string;
  description?: string;
  uniName: string;
  acronym: string;
  campus: string;
  courseID: string;
  variantID: string;
  startDate: string | null;
  lastDate: string | null;
  applicationOpenDate?: string;
  openDayDate?: string;
  offerReleaseDate?: string;
  expoDate?: string;
  logoUrl?: string | null;
  atar?: number; // approximate ATAR requirement
  duration?: number;
  field?: string; // category of study
  
  static default = Object.assign(new Course(), {
    uacID: 1111,
    uniID: 22222,
    title: "Bachelor of Computer Science",
    description: "An intensive program covering software architecture, cloud networks, DevOps pipelines, and full-stack microservices design.",
    university: "University of Wollongong",
    location: "Wollongong Campus",
    code: "UOW-CS-2026",
    startDate: "01-01-2000",
    closingDate: "05-01-2000",
    applicationOpenDate: "30-01-1999",
    openDayDate: "04-10-2020",
    offerReleaseDate: "04-01-2000",
    expoDate: "02-02-2000",
    logoUrl: "N/A",
    atar: 75.0, // approximate ATAR requirement
    duration: 3,
    field: "Software Engineering", // category of study
  });
}

export function toString(c: Course): string {
  return `${c.uniName}__${c.courseID}__${c.variantID}__${c.campus}__${c.startDate}__${c.lastDate}__${c.atar}`;
}
