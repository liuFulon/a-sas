DROP DATABASE IF EXISTS charityevents_db;
CREATE DATABASE charityevents_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE charityevents_db;
CREATE TABLE organizations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  description TEXT,
  contact_email VARCHAR(200),
  website VARCHAR(255)
);
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL
);
CREATE TABLE events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  organization_id INT,
  category_id INT,
  name VARCHAR(255) NOT NULL,
  short_desc VARCHAR(500),
  description TEXT,
  start_date DATE,
  end_date DATE,
  location VARCHAR(255),
  image_url VARCHAR(255),
  goal_amount DECIMAL(12,2) DEFAULT 0,
  raised_amount DECIMAL(12,2) DEFAULT 0,
  paused TINYINT(1) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id) ON DELETE SET NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
INSERT INTO organizations (name,description,contact_email,website) VALUES
('City Care Foundation','A local charity supporting community projects','info@citycare.org','https://citycare.example'),
('Hope Runners','Organizes charity runs to raise awareness','contact@hoperunners.org','https://hoperunners.example');
INSERT INTO categories (name) VALUES
('Charity Run'),
('Gala Dinner'),
('Silent Auction'),
('Music Concert'),
('Fundraising Workshop');
INSERT INTO events (organization_id,category_id,name,short_desc,description,start_date,end_date,location,image_url,goal_amount,raised_amount,paused) VALUES
(1,1,'Spring Hope Run','5km community run raising funds for shelters','Join neighbors for a 5km run to support local shelters.', '2025-10-10','2025-10-10','Riverside Park','/assets/images/placeholder.jpg',5000.00,1250.00,0),
(1,2,'Autumn Charity Gala','Black-tie dinner supporting education programs','An elegant evening to raise funds for scholarships.','2025-11-15','2025-11-15','Grand Hall','/assets/images/placeholder.jpg',20000.00,8000.00,0),
(2,1,'City Fun Run','Family-friendly 3km run','A casual run for families and friends.','2025-09-05','2025-09-05','Central Avenue','/assets/images/placeholder.jpg',3000.00,3000.00,0),
(2,4,'Summer Music Aid','Concert featuring local bands','Music night to raise funds for youth programs.','2025-08-20','2025-08-20','City Amphitheatre','/assets/images/placeholder.jpg',7000.00,4200.00,0),
(1,3,'Charity Auction','Auction of donated items','An auction to support food banks.','2025-12-05','2025-12-05','Community Center','/assets/images/placeholder.jpg',10000.00,2500.00,0),
(1,5,'Fundraising Workshop','Learn fundraising skills','Workshop for small NGOs.','2025-10-25','2025-10-25','Library Hall','/assets/images/placeholder.jpg',1500.00,450.00,0),
(2,4,'Winter Benefit Concert','Seasonal concert series','A concert to support elderly care.','2024-12-10','2024-12-10','Main Square','/assets/images/placeholder.jpg',6000.00,6000.00,0),
(2,2,'Evening for Hope','Gala supporting mental health initiatives','Dinner and speakers to raise awareness.','2025-11-01','2025-11-01','Rooftop Venue','/assets/images/placeholder.jpg',15000.00,3000.00,1);
