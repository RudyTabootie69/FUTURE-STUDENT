data = []
newdata = []
with open('uac_details.jl', 'r') as file:
    data = file.readlines()

for line in data:
    line = line.replace("<p>", "")
    line = line.replace("</p>", "")
    line = line.replace("<a>", "")
    line = line.replace("</a>", "")
    line = line.replace("<strong>", "")
    line = line.replace("</strong>", "")
    line = line.replace("<br>", "")
    line = line.replace("<span>", "")
    line = line.replace("</span>", "")
    line = line.replace("<ul>", "")
    line = line.replace("</ul>", "")
    line = line.replace("<li>", "")
    line = line.replace("</li>", "")
    line = line.replace("</li>", "")
    line = line.replace("color: rgb", "")
    line = line.replace("(255, 255, 255)", "")
    line = line.replace("(57, 64, 73)", "")
    line = line.replace("(33, 37, 41)", "")
    line = line.replace("background-color", "")
    line = line.replace("style=", "")
    line = line.replace("rel=", "")
    line = line.replace("target=", "")
    line = line.replace("<strong ", "")
    line = line.replace("<", "")
    line = line.replace(">", "")
    line = line.replace(";", "")
    line = line.replace("'", "’")
    newdata.append(line)
    

with open('uac_details_html_removed.jl', 'w') as file:
    file.writelines( newdata )
