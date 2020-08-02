create table todo (
    id int unsigned auto_increment primary key,
    title varchar(283)  not null,
    state boolean not null
);

create table users (
    id int unsigned auto_increment primary key,
    username varchar(111) not null unique,
    password varchar(60) not null
);
