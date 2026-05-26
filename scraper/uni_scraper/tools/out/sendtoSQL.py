from sqlalchemy import create_engine, MetaData, Table, table, Column, Numeric, insert, Integer, VARCHAR, update, text, delete
from sqlalchemy.engine import result
import json

user = "future-student"
password = "fsdbpw"
host = "127.0.0.1"
port = 3306
database = "futurestudentdb"


unis = set()
courses = set()
courseVariants = set()
courseOfferings = set()
coursetags = set()
durations = set()
modesofattendance = set()
atarStats = set()
data = []
events = set()
campuses = set()
courseID, uniAcronym, courseTitle = "", "", ""
offeringID, durationID, modecounter = 0, 0, 0 


def checkNone(inputType):
    if inputType is None:
        return "NULL"
    else:
        return inputType

class Uni:
    def __init__(self, uniAcronym, uniTitle, criscosId, teqsaId, rtoId):
        self.uniAcronym = uniAcronym
        self.uniTitle = uniTitle
        self.criscosId = criscosId
        self.teqsaId = teqsaId
        self.rtoId = rtoId
    
    def __eq__(self, other):
        if not isinstance(other, Uni):
            return NotImplemented
        return (
            self.uniAcronym == other.uniAcronym
        )

    def __hash__(self):
        return hash((self.uniAcronym))

class Campus:
    def __init__(self, uniAcronym, campusname):
        self.uniAcronym = uniAcronym
        self.campusname = campusname

    def __eq__(self, other):
        if not isinstance(other, Campus):
            return NotImplemented
        return (
            self.uniAcronym == other.uniAcronym and
            self.campusname == other.campusname
        )

    def __hash__(self):
        return hash((self.uniAcronym, self.campusname))

class Course:
    def __init__(self, uniAcronym, courseCode, courseTitle, header, careerOptions, studyDetails, practicalDetails, feeURL, courseurl):
        self.uniAcronym = uniAcronym
        self.courseCode = courseCode
        self.courseTitle = courseTitle
        self.header = header
        self.careerOptions = careerOptions
        self.studyDetails = studyDetails
        self.practicalDetails = practicalDetails
        self.feeURL = feeURL
        self.courseurl = courseurl

class CourseVariant:
    def __init__(self, courseID, variantID, uniAcronym, campus, feeType):
        self.courseID = courseID
        self.variantID = variantID
        self.uniAcronym = uniAcronym
        self.campus = campus
        self.feeType = feeType
    
    def __eq__(self, other):
        if not isinstance(other, CourseVariant):
            return NotImplemented
        return (
            self.variantID == other.variantID
        )

    def __hash__(self):
        return hash((self.variantID))

class CourseOffering:
    def __init__(self, variantID, enrolOpen, enrolClose):
        self.variantID = variantID
        self.enrolOpen = enrolOpen
        self.enrolClose = enrolClose
    
    def __eq__(self, other):
        if not isinstance(other, CourseOffering):
            return NotImplemented
        return (
            self.variantID == other.variantID and
            self.enrolOpen == other.enrolOpen and
            self.enrolClose == other.enrolClose
        )

    def __hash__(self):
        return hash((self.variantID, self.enrolOpen, self.enrolClose))

class Duration:
    def __init__(self, variantID, duration):
        self.variantID = variantID
        self.duration = duration
    
    def __eq__(self, other):
        if not isinstance(other, Duration):
            return NotImplemented
        return (
            self.variantID == other.variantID and
            self.duration == other.duration
        )

    def __hash__(self):
        return hash((self.variantID, self.duration))

class modeOfAttendance:
    def __init__(self, variantID, mode):
        self.variantID = variantID
        self.mode = mode
    def __eq__(self, other):
        if not isinstance(other, modeOfAttendance):
            return NotImplemented
        return (
            self.variantID == other.variantID and
            self.mode == other.mode
        )

    def __hash__(self):
        return hash((self.variantID, self.mode))
    
class courseAtarRequirement:
    def __init__ (self, variantID, atarProfileCode, minAtar, medianAtar, lowestRank, medianRank):
        self.variantID = variantID
        self.atarProfileCode = atarProfileCode
        self.minAtar = minAtar
        self.medianAtar = medianAtar
        self.lowestRank = lowestRank
        self.medianRank = medianRank
    def __eq__(self, other):
        if not isinstance(other, courseAtarRequirement):
            return NotImplemented
        return (
            self.variantID == other.variantID and
            self.atarProfileCode == other.atarProfileCode
        )

    def __hash__(self):
        return hash((self.variantID, self.atarProfileCode))
    
class CourseTag:
    def __init__(self, courseID, tagtext):
        self.courseID = courseID
        self.tagtext = tagtext

with open('uac_details_html_removed.jl', 'r') as file:
    for line in file:

        data = (json.loads(line))

        newAcronym = data["provider_id"]
        newName = data["provider_name"]
        newcriscosId = checkNone(data["details_json"]["course"]["providerCriscosId"])
        newrtoId = checkNone(data["details_json"]["course"]["providerRTOCode"])
        newteqsaId = checkNone(data["details_json"]["course"]["providerTeqsaId"])
        newCourseCode = data["course_url"]
        newCourseTitle = data["title"]
        newHeader = data["details_json"]["contentJson"]["aboutIntro"]
        newCareerOptions = data["details_json"]["contentJson"]["aboutDetails"]["careerOpportunities"]
        newstudyDetails = data["details_json"]["contentJson"]["aboutDetails"]["areasOfStudy"]


        if "practicalExperience" in data["details_json"]["contentJson"]["aboutDetails"]:
            newpracticalDetails = data["details_json"]["contentJson"]["aboutDetails"]["practicalExperience"]
        else:
            newpracticalDetails = "N/A"

        if "feesAndCharges" in data["details_json"]["course"]:
            newfeeDetails = data["details_json"]["course"]["feesAndCharges"]
        elif "feesAndCharges" in data["details_json"]["contentJson"]["aboutDetails"]:
            newfeeDetails = data["details_json"]["contentJson"]["aboutDetails"]["feesAndCharges"]
        else:
            newfeeDetails = "N/A"
        
        if newfeeDetails is not None:
            if "href=" in newfeeDetails:
                newfeeDetails = newfeeDetails.split("href=\"")[1].split("\"")[0]
        newfeeDetails = checkNone(newfeeDetails)

        try:
            newCourseUrl = data["details_json"]["contentJson"]["furtherInfo"]["url"]
        except:
            newCourseUrl = "N/A"
        
        if 'keywords' in data["details_json"]["contentJson"]:
            newtags = data["details_json"]["contentJson"]["keywords"].split(",")

            for newtag in newtags:
                coursetags.add(CourseTag(newCourseCode, newtag))

        if data["details_json"]["course"]["studentProfileLink"] is not None:
            print(data["details_json"]["course"]["studentProfileLink"])

        if newAcronym is not None:
            unis.add(Uni(newAcronym, newName, newcriscosId, newteqsaId, newrtoId))

        courses.add(Course(newAcronym, newCourseCode, newCourseTitle, newHeader, newCareerOptions, newstudyDetails, newpracticalDetails, newfeeDetails, newCourseUrl))
        newcoursevariants = data["details_json"]["courseList"]
        
        for newcoursevariant in newcoursevariants:
            newcampuscode = newcoursevariant["campusCode"]
            newFeeType = newcoursevariant["feeType"]
            newcoursevariantId = newcoursevariant["courseCode"]
            campuses.add(Campus(newAcronym, newcampuscode))
            courseVariants.add(CourseVariant(newCourseCode, newcoursevariantId, newAcronym, newcampuscode, newFeeType))
            
            newofferings = newcoursevariant["offerings"]
            for newoffering in newofferings:
                newenrolopen = newoffering["startDate"]
                newenrolclose = newoffering["finalClosing"]
                courseOfferings.add(CourseOffering(newcoursevariantId, newenrolopen, newenrolclose)) 

            newdurations = newcoursevariant["duration"]
            for newduration in newdurations:
                durations.add(Duration(newcoursevariantId, newduration))

            newmodesofattendances = newcoursevariant["modeOfAttendance"]
            for newmodeofattendance in newmodesofattendances:
                modesofattendance.add(modeOfAttendance(newcoursevariantId, newmodeofattendance))
            
            if newcoursevariant["studentProfile"] is not None:
                for studentProfile in newcoursevariant["studentProfile"]["StudentProfiles"]:
                    try:
                        percenttotalstudents = studentProfile["percentTotalStudents"]
                    except:
                        percenttotalstudents = "N/A"

            if newcoursevariant["atarProfile"] is not None and newcoursevariant["atarProfile"]["AtarProfiles"] is not None:
                for atarProfile in newcoursevariant["atarProfile"]["AtarProfiles"]:
                    if isinstance(atarProfile["medianAtar"], str) and isinstance(atarProfile["lowestAtar"], str):
                        continue
                    else: 
                        try: 
                            newAtarCode = atarProfile["atarProfileCode"]
                        except:
                            newAtarCode = newcoursevariantId
                        newMinAtar= atarProfile["lowestAtar"]
                        newMedianAtar = atarProfile["medianAtar"]
                        newlsr = atarProfile["lsr"]
                        newmsr = atarProfile["msr"]
                        atarStats.add(courseAtarRequirement(newcoursevariantId, newAtarCode, newMinAtar, newMedianAtar, newlsr, newmsr )) 

def get_connection():
    engine = create_engine(
        f"mysql+pymysql://{user}:{password}@{host}:{port}/{database}", echo=True
    )
    return engine

conn = any

if __name__ == "__main__":

    try:
        engine = get_connection()
        conn = engine.connect()
        print(f"Connection to the {host} for user {user} created successfully.")

    except Exception as ex:
        print("Connection could not be made due to the following error:\n", ex)
        exit()

metadata = MetaData()

for uni in unis:
    statement = conn.execute(table('Institution', Column('acronym'), Column('institutionType'), Column('name'), Column('criscos'), Column('teqsa'), Column('rto')).insert().values({ 'acronym': uni.uniAcronym, 'institutionType': 'University', 'name': uni.uniTitle, 'criscos': uni.criscosId, 'teqsa': uni.teqsaId, 'rto': uni.rtoId }))

for campus in campuses:
    statement = conn.execute(table('Campus', Column('uni'), Column('campus')).insert().values({ 'uni': campus.uniAcronym, 'campus': campus.campusname}))

for course in courses:
    statement = conn.execute(table('Course', Column('courseID'), Column('uniAcronym'), Column('title'), Column('header'), Column('careerOptions'), Column('studyDetails'), Column('pracDetails'), Column('feeurl'), Column('courseurl')).insert().values({'courseID': course.courseCode, 'uniAcronym': course.uniAcronym, 'title': course.courseTitle, 'header':course.header, 'careerOptions':course.careerOptions, 'studyDetails': course.studyDetails, 'pracDetails': course.practicalDetails, 'feeurl': course.feeURL, 'courseurl':course.courseurl}))

for coursevariant in courseVariants:
    statement = conn.execute(table('CourseVariant', Column('courseID'), Column('variantID'), Column('uni'), Column('campus'), Column('feeType')).insert().values({ 'courseID': coursevariant.courseID, 'variantID': coursevariant.variantID, 'uni': coursevariant.uniAcronym, 'campus': coursevariant.campus, 'feeType': coursevariant.feeType }))

for courseOffering in courseOfferings:
    try:
        statement = conn.execute(table('CourseOffering', Column('variantID'), Column('startDate'), Column('lastDate')).insert().values({ 'variantID': coursevariant.variantID, 'startDate': courseOffering.enrolOpen, 'lastDate': courseOffering.enrolClose }))
    except:
        print("error")
counter = 1
for coursetag in coursetags:
    conn.execute(table('Tag', Column('tagID'), Column('title')).insert().values({ 'tagID': counter, 'title': coursetag.tagtext}))
    conn.execute(table('CourseTag', Column('courseID'), Column('tagID')).insert().values({ 'courseID': coursetag.courseID, 'tagID': counter}))
    counter = counter + 1

for duration in durations:
    conn.execute(table('Duration', Column('variantID'), Column('duration')).insert().values({ 'variantID': duration.variantID, 'duration': duration.duration}))

for modeofattendance in modesofattendance:
    conn.execute(table('ModeOfAttendance', Column('variantID'), Column('mode')).insert().values({ 'variantID': modeofattendance.variantID,'mode': modeofattendance.mode}))

for event in events:
    conn.execute(table())
conn.commit()