from sqlalchemy import create_engine, MetaData, Table, table, Column, Numeric, insert, Integer, VARCHAR, update, text, delete
from sqlalchemy.engine import result
import json


user = "future-student"
password = ""
host = "127.0.0.1"
port = 3306
database = "futurestudentdb"

unis = []
uniacronyms = []
unititles = []
courses = []
courseVariants = []
courseOfferings = []
coursetags = []
durations = []
modesofattendance = []
atarStats = []
data = []
events = []
courseID, uniAcronym, courseTitle = "", "", ""
offeringID, durationID, modecounter = 0, 0, 0 

#Aidan, I have no idea how ai works but I'm defining a function here that returns itself and have used it in the program, in this function do AI transform?
def aiTransform(inputString):
    outputString = inputString
    return outputString

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
    def __init__(self, courseID, variantID, campus, feeType):
        self.courseID = courseID
        self.variantID = variantID
        self.campus = campus
        self.feeType = feeType

class CourseOffering:
    def __init__(self, variantID, offeringID, enrolOpen, enrolClose):
        self.variantID = variantID
        self.offeringID = offeringID
        self.enrolOpen = enrolOpen
        self.enrolClose = enrolClose

class CourseTag:
    def __init__(self, courseID, tagtext):
        self.courseID = courseID
        self.tagtext = tagtext

class Duration:
    def __init__(self, variantID, durationID, duration):
        self.variantID = variantID
        self.durationID = durationID
        self.duration = duration

class modeOfAttendance:
    def __init__(self, variantID, modeID, mode):
        self.variantID = variantID
        self.modeID = modeID
        self.mode = mode

class courseAtarRequirement:
    def __init__ (self, variantID, atarProfileCode, minAtar, medianAtar, lowestRank, medianRank):
        self.variantID = variantID
        self.atarProfileCode = atarProfileCode
        self.minAtar = minAtar
        self.medianAtar = medianAtar
        self.lowestRank = lowestRank
        self.medianRank = medianRank

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
        newHeader = aiTransform(data["details_json"]["contentJson"]["aboutIntro"])
        newCareerOptions = aiTransform(data["details_json"]["contentJson"]["aboutDetails"]["careerOpportunities"])
        newstudyDetails = aiTransform(data["details_json"]["contentJson"]["aboutDetails"]["areasOfStudy"])


        if "practicalExperience" in data["details_json"]["contentJson"]["aboutDetails"]:
            newpracticalDetails = aiTransform(data["details_json"]["contentJson"]["aboutDetails"]["practicalExperience"])
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
            elif "N/A" not in newfeeDetails:
                print(newfeeDetails)
        newfeeDetails = checkNone(newfeeDetails)

        try:
            newCourseUrl = data["details_json"]["contentJson"]["furtherInfo"]["url"]
        except:
            newCourseUrl = "N/A"
        
        if 'keywords' in data["details_json"]["contentJson"]:
            newtags = data["details_json"]["contentJson"]["keywords"].split(",")

            for newtag in newtags:
                newcoursetag = CourseTag(newCourseCode, newtag)
                if newcoursetag not in coursetags:
                    coursetags.append(newcoursetag)

        if data["details_json"]["course"]["studentProfileLink"] is not None:
            print(data["details_json"]["course"]["studentProfileLink"])

        if newAcronym not in uniacronyms and newName not in unititles and newAcronym is not None:
            newuni = Uni(newAcronym, newName, newcriscosId, newteqsaId, newrtoId)
            unis.append(newuni)
            uniacronyms.append(newuni.uniAcronym)
            unititles.append(newuni.uniTitle)

        courses.append(Course(newAcronym, newCourseCode, newCourseTitle, newHeader, newCareerOptions, newstudyDetails, newpracticalDetails, newfeeDetails, newCourseUrl))
        newcoursevariants = data["details_json"]["courseList"]
        
        for newcoursevariant in newcoursevariants:
            newcampus = newcoursevariant["campusCode"]
            newFeeType = newcoursevariant["feeType"]
            newcoursevariantId = newcoursevariant["courseCode"]
            courseVariants.append(CourseVariant(newCourseCode, newcoursevariantId, newcampus, newFeeType))
            
            newofferings = newcoursevariant["offerings"]
            for newoffering in newofferings:
                newenrolopen = newoffering["startDate"]
                newenrolclose = newoffering["finalClosing"]
                courseOfferings.append(CourseOffering(newcoursevariantId, offeringID, newenrolopen, newenrolclose)) 
                offeringID = offeringID + 1

            newdurations = newcoursevariant["duration"]
            for newduration in newdurations:
                durations.append(Duration(newcoursevariantId, durationID, newduration))
                durationID = durationID + 1

            newmodesofattendances = newcoursevariant["modeOfAttendance"]
            for newmodeofattendance in newmodesofattendances:
                modesofattendance.append(modeOfAttendance(newcoursevariantId, modecounter, newmodeofattendance))
                modecounter = modecounter + 1
            
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
                        atarStats.append(courseAtarRequirement(newcoursevariantId, newAtarCode, newMinAtar, newMedianAtar, newlsr, newmsr )) 

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
    statement = conn.execute(table('University', Column('acronym'), Column('name'), Column('criscos'), Column('teqsa'), Column('rto')).insert().values({ 'acronym': uni.uniAcronym, 'name': uni.uniTitle, 'criscos': uni.criscosId, 'teqsa': uni.teqsaId, 'rto': uni.rtoId }))

for course in courses:
    statement = conn.execute(table('Course', Column('courseID'), Column('uniAcronym'), Column('title'), Column('header'), Column('careerOptions'), Column('studyDetails'), Column('pracDetails'), Column('feeurl'), Column('courseurl')).insert().values({'courseID': course.courseCode, 'uniAcronym': course.uniAcronym, 'title': course.courseTitle, 'header':course.header, 'careerOptions':course.careerOptions, 'studyDetails': course.studyDetails, 'pracDetails': course.practicalDetails, 'feeurl': course.feeURL, 'courseurl':course.courseurl}))

for coursevariant in courseVariants:
    statement = conn.execute(table('CourseVariant', Column('courseID'), Column('variantID'), Column('campus'), Column('feeType')).insert().values({ 'courseID': coursevariant.courseID, 'variantID': coursevariant.variantID, 'campus': coursevariant.campus, 'feeType': coursevariant.feeType }))

for courseOffering in courseOfferings:
    statement = conn.execute(table('CourseOffering', Column('variantID'), Column('offeringID'), Column('startDate'), Column('lastDate')).insert().values({ 'variantID': coursevariant.variantID, 'offeringID': courseOffering.offeringID, 'startDate': courseOffering.enrolOpen, 'lastDate': courseOffering.enrolClose }))

counter = 1
for coursetag in coursetags:
    conn.execute(table('Tag', Column('tagID'), Column('title')).insert().values({ 'tagID': counter, 'title': coursetag.tagtext}))
    conn.execute(table('CourseTag', Column('courseID'), Column('tagID')).insert().values({ 'courseID': coursetag.courseID, 'tagID': counter}))
    counter = counter + 1

for duration in durations:
    conn.execute(table('Duration', Column('variantID'), Column('durationID'), Column('duration')).insert().values({ 'variantID': duration.variantID, 'durationID': duration.durationID, 'duration': duration.duration}))

for modeofattendance in modesofattendance:
    conn.execute(table('ModeOfAttendance', Column('variantID'), Column('modeID'), Column('mode')).insert().values({ 'variantID': modeofattendance.variantID, 'modeID': modeofattendance.modeID ,'mode': modeofattendance.mode}))

for event in events:
    conn.execute(table())
conn.commit()