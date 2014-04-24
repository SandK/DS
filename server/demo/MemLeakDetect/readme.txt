1.npm install heapdump(需要python环境)
2.引入
require('heapdump');
3.kill -USR2 <pid>
生成heapdump-<sec>.<usec>.heapsnapshot文件(Json数据)
在Chrome Profiles面板查看