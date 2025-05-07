import requests
import json
import os
from bs4 import BeautifulSoup
def grade_calc(studentId,studentpass,url1):
    url2=url1+"authenticate_user.php"
    url3=url1+"getResult.php"
    credits_file=open(os.getcwd()+"/routes/code-credits.json")
    credits_data=json.load(credits_file)
    grades_file=open(os.getcwd()+"/routes/grade-points.json")
    grades_data=json.load(grades_file)
    r=requests.get(url1)# to get csrf token
    soup = BeautifulSoup(r.content, 'html5lib')
    token1=soup.find(id="token")["value"]
    body2={"token":token1,
       "StudentId1":studentId,
       "StudentDob1":studentpass
       }
    headers2={
            "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0",
            "Accept": "*/*",
            "Accept-Language": "en-US,en;q=0.5",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "X-Requested-With": "XMLHttpRequest",
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin"
        }
    response2=requests.post(url=url2,headers=headers2,data=body2)
    phpsesid=response2.headers["Set-Cookie"][10:36]
    cookies3={"PHPSESSID":phpsesid}
    token1=token1[:-2]
    body3=dict(SID=studentId,token=token1)
    response3=requests.post(url=url3,headers=headers2,data=body3,cookies=cookies3)
    soup=BeautifulSoup(response3.content,"html5lib")
    table1=soup.find("table",attrs={"class":"table table-bordered"})
    rows=table1.find_all("tr")
    rows=rows[1:]
    student1={}
    for row in rows:
        cols=row.find_all("td")
        student1[cols[3].text]=cols[4].text
    student_creds=0
    sum_of_creds=0
    
    for i in student1:
        x=float(credits_data[i])
        y=grades_data[student1[i]]
        student_creds+=(x*y)
        sum_of_creds+=x
        # print("scode:",i,"creds",x,"pints:",y,"ans:",x*y)
    answer=round((student_creds/sum_of_creds),3)
    # print("anser in grade calsc",answer)
    return answer