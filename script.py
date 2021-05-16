import os
import webbrowser

initial = os.getcwd()


def primera():
    if os.path.exists("cypress/screenshots/paletta.spec.js/imagen1.png"):
        os.remove("cypress/screenshots/paletta.spec.js/imagen1.png")
    if os.path.exists("cypress/screenshots/paletta.spec.js/imagen2.png"):
        os.remove("cypress/screenshots/paletta.spec.js/imagen2.png")
    os.system("cypress run --headless")
   
    
def segunda():
    
    os.system("node index.js")
    

primera()
segunda()


path = os.path.abspath('report.html')
url = 'file://' + path
webbrowser.open(url)

