from grade_calc import *
import sys
studentId="N191034"
studentId=sys.argv[1]
studentpass="bgxD$n"
studentpass=sys.argv[2]
urls=[]
url1="https://examcell.rguktn.ac.in/results/202122_19E1_S1_Reg/"
url2="https://examcell.rguktn.ac.in/results/202122_19E1_S2_Reg/"
url3="https://examcell.rguktn.ac.in/results/202223_19E2_S1_Reg/"
url4="https://examcell.rguktn.ac.in/results/202223_19E2_S1_Reg/"
urls=[url1,url2,url3,url4]
# urls=[url1]
final1=0
for i in urls:
    ans1=grade_calc(studentId,studentpass,i)
    # print("a:",ans1)
    final1+=ans1
print(round(final1/4,3))
