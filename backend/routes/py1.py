import os
import sys
print("hi")
a=int(sys.argv[1])
b=int(sys.argv[2])
def fun1(a,b):
    print("a=",a,"and b is ",b)
    return a+b
ans=fun1(a,b)
print("ans is",ans)
file1=os.getcwd()+"/routes/test1.txt"
f=open(file1,"w")
f.write("test")
f.close()
print ("Executed when invoked directly")