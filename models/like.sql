create table liked (
    
    like_id varchar(1000) primary key,
    user_id varchar(1000) not null,
    vin varchar(255) not null, 
    liked int(1) default 0,
    CONSTRAINT FK_USERID FOREIGN KEY (user_id)
    REFERENCES user(user_id)
    
)