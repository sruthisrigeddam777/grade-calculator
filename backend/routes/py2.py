import requests
import json
from bs4 import BeautifulSoup
credits_file=open("code-credits.json")
credits_data=json.load(credits_file)
grades_file=open("grade-points.json")
grades_data=json.load(grades_file)
url1="https://examcell.rguktn.ac.in/results/202122_19E1_S1_Reg/"
r=requests.get(url1)# to get csrf token
soup = BeautifulSoup(r.content, 'html5lib')
# print(soup.prettify())
token1=soup.find(id="token")["value"]
print((token1))
studentId="N191034"
studentpass="bgxD%24n"
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
url2="https://examcell.rguktn.ac.in/results/202122_19E1_S1_Reg/authenticate_user.php"
response2=requests.post(url=url2,headers=headers2,data=body2)
# #with csrf token send post request to authenticate user.php
print("resss is",response2.status_code)
phpsesid=response2.headers["Set-Cookie"][10:36]
print("res is",phpsesid,"with type",type(phpsesid))
cookies3={"PHPSESSID":phpsesid}
print("res of 2 is",response2.text)
token1=token1[:-2]
url3="https://examcell.rguktn.ac.in/results/202122_19E1_S1_Reg/getResult.php"
body3=dict(SID=studentId,token=token1)
print("body 3 us",body3,"and tyep",type(body3))
response3=requests.post(url=url3,headers=headers2,data=body3,cookies=cookies3)
# print("res3s status code",response3.text)
soup=BeautifulSoup(response3.content,"html5lib")
table1=soup.find("table",attrs={"class":"table table-bordered"})
rows=table1.find_all("tr")
rows=rows[1:]
# print("rows ",rows)
# print(table1)
student1={}
for row in rows:
    cols=row.find_all("td")
    # print("tr[3]=",cols[3].text,"and tr[4]:",cols[4].text)
    student1[cols[3].text]=cols[4].text
print("student1 is ",student1)
# print("greades data",greades_data,"credits data",credits_data)
student_creds=0
sum_of_creds=0
for i in credits_data:
    sum_of_creds+=float(credits_data[i])
'''student1 is  
{'20CS1101': 'A', '20CS1181': 'Ex', '20EE1109': 'A', '20EE1189': 'A', '20EG1181': 'B', '20HS1101': 'P', '20MA1102': 'B', '20ME1114': 'A'}'''
for i in student1:
    #i means subject code
    # print(i,student1[i])
    x=float(credits_data[i])# x credits of correspoinding subject
    y=grades_data[student1[i]] #studen1[i] means the gotten grade of student,y means 
    # y means the value that is ex:10 a:9
    student_creds+=(x*y)
#     print("scode:",i,"creds",x,"pints:",y,"ans:",x*y)
# print("student creds",student_creds)
# print("sum of creds",sum_of_creds)
# print("final grad:",round((student_creds/sum_of_creds),3))
answer=round((student_creds/sum_of_creds),3)
