rm -f *.dat
/usr/bin/mongoexport -d local -c users -o /home/db/user.dat
/usr/bin/mongoexport -d local -c tasks -o /home/db/task.dat