CREATE TABLE IF NOT EXISTS settings(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,start_no INTEGER,current_no INTEGER,last_no INTEGER, last_updated TIMESTAMP);
INSERT INTO settings(name, start_no, current_no, last_no) VALUES ('user','00005', '0', '0', NOW());
INSERT INTO settings(name, start_no, current_no, last_no) VALUES ('group','50000', '50001', '59999', NOW());
INSERT INTO settings(name, start_no, current_no, last_no) VALUES ('chat','5000000', '5000001','5999999', NOW());

CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,toddltic_type TEXT,group_id INTEGER);
INSERT INTO groups(name, toddltic_type, group_id) VALUES ('Daniel Zakaru', 'Student', '50001');
INSERT INTO groups(name, toddltic_type, group_id) VALUES ('Program Taska', 'Program', '50002');
INSERT INTO groups(name, toddltic_type, group_id) VALUES ('School1', 'School', '50003');
UPDATE settings SET current_no = '50003' WHERE name = 'group';

CREATE TABLE IF NOT EXISTS chats(id INTEGER PRIMARY KEY AUTOINCREMENT,groupid INTEGER, chat TEXT,global_id INTEGER);
INSERT INTO chats(name, skill, id) VALUES ('Simon', 'Ionic', '4');
INSERT INTO chats(name, skill, id) VALUES ('Jorge', 'Firebase', '2');
INSERT INTO chats(name, skill, id) VALUES ('Max', 'Startup', '5');

CREATE TABLE IF NOT EXISTS group_users(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,type TEXT,users INTEGER);

CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,userid INTEGER, name TEXT,type TEXT,email TEXT);

CREATE TABLE IF NOT EXISTS group_user_messages(id INTEGER PRIMARY KEY AUTOINCREMENT,msgid INTEGER, name TEXT, type TEXT,content JSON);


/* Sample
CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT,groupid INTEGER, name TEXT,type TEXT,users INTEGER);
INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Simon', 'Ionic', '4');
INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Jorge', 'Firebase', '2');
INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Max', 'Startup', '5');
*/