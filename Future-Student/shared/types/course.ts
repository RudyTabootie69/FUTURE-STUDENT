export class Course {
  uacID: number;
  uniID?: string; 
  title: string;
  description?: string;
  university: string;
  location: string;
  code: string;
  startDate: string;
  closingDate: string;
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
    title: "Bachelor of Testing Courses",
    description: "This is a degree that focuses on testing pages that would use the Course data type.",
    university: "University of Wollongong",
    location: "Wollongong",
    code: "testtest1234",
    startDate: "01-01-2000",
    closingDate: "05-01-2000",
    applicationOpenDate: "30-01-1999",
    openDayDate: "04-10-2020",
    offerReleaseDate: "04-01-2000",
    expoDate: "02-02-2000",
    logoUrl: "N/A",
    atar: 99.8, // approximate ATAR requirement
    duration: 3,
    field: "Testing", // category of study
  });
}


export function toString(c: Course): string {
  return `${c.university}__${c.uacID}`;
}
