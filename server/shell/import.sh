sql="db.users.drop();db.tasks.drop();";
/usr/bin/mongo local --eval "$sql"
/usr/bin/mongoimport -d local -c users /home/db/user.dat
/usr/bin/mongoimport -d local -c tasks /home/db/task.dat