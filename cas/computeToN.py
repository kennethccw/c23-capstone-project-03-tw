class Solution:
    def __init__(self):
        self.ans =[]
    def dfs(self,s,ans,path=""):
        if len(s)==0 and ans==50:
            self.ans.append(path)
        for i in range(len(s)):
            self.dfs(s[i+1:],ans+int(s[:i+1]),path+"+"+s[:i+1])
            self.dfs(s[i+1:],ans-int(s[:i+1]),path+"-"+s[:i+1])

a = Solution()
a.dfs("123456789",0)
for i in a.ans:
    print(i)