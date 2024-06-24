import mysql, { } from "mysql2"
import dotenv from "dotenv"
dotenv.config();


export const sql_con = mysql.createConnection({
    host: process.env.HOST || '127.0.0.1',
    user: 'root',
    password: process.env.DBPWD,
    database: process.env.SHEMA,
    charset: 'utf8mb4'
})

// CREATE DATABASE findsales default CHARACTER SET UTF8;

/*

CREATE DATABASE allthatby default CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS sub_board(
    sb_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sb_domain VARCHAR(50),
    sb_subject VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    sb_content TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    sb_created_at DATETIME,
    sb_updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS member(
    mb_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    mb_email VARCHAR(50) UNIQUE,
    mb_phone VARCHAR(50),
    mb_nick VARCHAR(50) UNIQUE,
    mb_pwd VARCHAR(100),
    mb_rate VARCHAR(10) DEFAULT 10,
    mb_status BOOLEAN DEFAULT TRUE,
    mb_thumbnail VARCHAR(255),
    mb_provider VARCHAR(10),
    mb_token VARCHAR(255),
    mb_name VARCHAR(50),
    mb_introduce TEXT,
    mb_charge VARCHAR(255),
    mb_kakaolink VARCHAR(100),
    mb_ad_start DATETIME,
    mb_ad_end DATETIME,
    mb_last_contact DATETIME,
    mb_created_at DATETIME,
    mb_updated_at DATETIME,
    mb_deleted_at DATETIME 
);

CREATE TABLE IF NOT EXISTS land(
    ld_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    ld_domain VARCHAR(50) UNIQUE,
    ld_name VARCHAR(100),
    ld_description VARCHAR(255),
    ld_add_scripts TEXT,
    ld_logo VARCHAR(100),
    ld_bgcolor VARCHAR(50),
    ld_txtcolor VARCHAR(50),
    ld_manager_email VARCHAR(100),
    ld_phone_num VARCHAR(100),
    ld_sms_num VARCHAR(100),
    ld_main_img TEXT,
    ld_overview_img TEXT,
    ld_environ_img TEXT,
    ld_premium_img TEXT,
    ld_product_img TEXT,
    ld_created_at DATETIME
);

ALTER TABLE land ADD ld_add_scripts TEXT AFTER ld_description;
ALTER TABLE land ADD ld_kakao VARCHAR(255) AFTER ld_sms_num;

CREATE TABLE IF NOT EXISTS board(
    bo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    bo_type VARCHAR(100),
    bo_user VARCHAR(50),
    bo_category VARCHAR(50),
    bo_subject VARCHAR(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    bo_content TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    bo_good INT(100) DEFAULT 0,
    bo_bad INT(100) DEFAULT 0,
    bo_action_list TEXT,
    bo_view INT(255),
    bo_created_at DATETIME,
    bo_updated_at DATETIME 
);

CREATE TABLE IF NOT EXISTS reply(
    re_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    re_depth VARCHAR(50),
    re_parent VARCHAR(10),
    re_parent_id VARCHAR(10),
    re_content TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
    re_user VARCHAR(50),
    re_good INT(100) DEFAULT 0,
    re_bad INT(100) DEFAULT 0,
    re_action_list TEXT,
    re_status VARCHAR(10) DEFAULT 'normal',
    re_created_at DATETIME,
    re_updated_at DATETIME
);

CREATE TABLE IF NOT EXISTS auth_temp(
    at_email VARCHAR(255),
    at_phone VARCHAR(255),
    at_authnum VARCHAR(255)
);



CREATE TABLE IF NOT EXISTS site(
    st_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    st_name VARCHAR(100),
    st_house_num VARCHAR(50),
    st_area_size VARCHAR(50),
    st_scale VARCHAR(50),
    st_constructer VARCHAR(50),
    st_construct_date VARCHAR(100),
    st_developer VARCHAR(50),
    st_supply_location VARCHAR(50),
    st_movein_date VARCHAR(50),
    st_inquiry VARCHAR(50),
    st_parcel_price VARCHAR(50),
    st_description TEXT,
    st_main_img VARCHAR(255),
    st_imgs TEXT,
    st_floor_plan TEXT,
    st_created_at DATETIME,
    st_updated_at DATETIME
);

ALTER TABLE site ADD COLUMN st_main_img VARCHAR(255) AFTER st_description;
ALTER TABLE site ADD COLUMN st_construct_date VARCHAR(100) AFTER st_constructer;

*/