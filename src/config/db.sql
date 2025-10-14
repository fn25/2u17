CREATE EXTENSION IF NOT EXISTS "pgcrypto";


create table users(id UUID primary key,
name varchar,
email VARCHAR UNIQUE not null,
password VARCHAR not null);

create table board(id UUID primary key,
title varchar,
columns text);

create table  tasks(id UUID PRIMARY key,
title varchar not null,
order varchar,
description text,
userId UUID REFERENCES user(id) on delete cascade,
boardId UUID references on delete cascade,
columnId varchar(60));