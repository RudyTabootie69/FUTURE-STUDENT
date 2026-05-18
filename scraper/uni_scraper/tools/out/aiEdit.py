import json
import time
from google import genai
GEMINI_API_KEY = 'AIzaSyBbixaRMO2ZolbasPTnKr-uIjqwqdG6CEU'

client = genai.Client(api_key=GEMINI_API_KEY)

def aiTransform(inputString):

    response = client.models.generate_content(
        model="gemini-2.5-flash", contents="Remove all html tags, and syntax errors. Reword and summarise in 500 characters or less from the following string: " +  inputString
    )
    outputString = response.text
    time.sleep(4)
    return outputString


with open('uac_details_ai_edit.jl', 'a') as writefile:

    with open('uac_details_html_removed.jl', 'r') as readfile:
        for line in readfile:

            data = (json.loads(line))
            data["details_json"]["contentJson"]["aboutIntro"] = aiTransform(data["details_json"]["contentJson"]["aboutIntro"])
            data["details_json"]["contentJson"]["aboutDetails"]["careerOpportunities"] = aiTransform(data["details_json"]["contentJson"]["aboutDetails"]["careerOpportunities"])
            data["details_json"]["contentJson"]["aboutDetails"]["areasOfStudy"] = aiTransform(data["details_json"]["contentJson"]["aboutDetails"]["areasOfStudy"])

            if "practicalExperience" in data["details_json"]["contentJson"]["aboutDetails"]:
                data["details_json"]["contentJson"]["aboutDetails"]["practicalExperience"] = aiTransform(data["details_json"]["contentJson"]["aboutDetails"]["practicalExperience"])
            else:
                newpracticalDetails = "N/A"
            
            modified_json = json.dumps(data)

            writefile.write(modified_json)