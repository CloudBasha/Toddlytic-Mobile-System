CREATE TABLE IF NOT EXISTS developer(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,skill TEXT,yearsOfExperience INTEGER);
INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Simon', 'Ionic', '4');
INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Jorge', 'Firebase', '2');
INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Max', 'Startup', '5');

CREATE TABLE IF NOT EXISTS groups(id INTEGER PRIMARY KEY AUTOINCREMENT,groupid INTEGER, name TEXT,type TEXT,users INTEGER);
INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Simon', 'Ionic', '4');
INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Jorge', 'Firebase', '2');
INSERT INTO developer(name, skill, yearsOfExperience) VALUES ('Max', 'Startup', '5');

CREATE TABLE IF NOT EXISTS group_users(id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,type TEXT,users INTEGER);

CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY AUTOINCREMENT,userid INTEGER, name TEXT,type TEXT,email TEXT);

CREATE TABLE IF NOT EXISTS group_user_messages(id INTEGER PRIMARY KEY AUTOINCREMENT,msgid INTEGER, name TEXT, type TEXT,content JSON);