CREATE DATABASE check24backendtest;
CREATE USER 'check24backendtest'@'%' IDENTIFIED BY 'check24backendtest';
GRANT ALL PRIVILEGES ON check24backendtest . * TO 'check24backendtest'@'%';
FLUSH PRIVILEGES;

SHOW DATABASES;
