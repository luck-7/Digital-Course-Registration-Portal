-- Database: courseportal

CREATE DATABASE courseportal
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.utf8'
    LC_CTYPE = 'en_US.utf8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- User Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    department VARCHAR(100),
    role VARCHAR(20) NOT NULL DEFAULT 'STUDENT',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Course Table
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    code VARCHAR(20) NOT NULL UNIQUE,
    description TEXT,
    instructor VARCHAR(100),
    department VARCHAR(100),
    capacity INTEGER NOT NULL DEFAULT 30,
    enrolled INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Enrollment Table
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER NOT NULL,
    course_id INTEGER NOT NULL,
    enrollment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    UNIQUE (student_id, course_id)
);

-- Indexes
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_courses_department ON courses(department);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_course ON enrollments(course_id);

-- Sample Data: Admin User
INSERT INTO users (username, password, name, email, department, role)
VALUES ('admin', '$2a$10$XptfskLsT1l/bRTLRiiCgejHqOpgXFreUnNUa35gJdCr2v2QbVFzu', 'Admin User', 'admin@example.com', 'Administration', 'ADMIN');

-- Sample Data: Student User
INSERT INTO users (username, password, name, email, department, role)
VALUES ('student', '$2a$10$XptfskLsT1l/bRTLRiiCgejHqOpgXFreUnNUa35gJdCr2v2QbVFzu', 'Student User', 'student@example.com', 'Computer Science', 'STUDENT');

-- Sample Data: Courses
INSERT INTO courses (title, code, description, instructor, department, capacity, enrolled)
VALUES 
('Introduction to Computer Science', 'CS101', 'Fundamental concepts of computer science', 'Dr. Smith', 'Computer Science', 50, 0),
('Data Structures and Algorithms', 'CS201', 'Study of data structures and algorithms', 'Dr. Johnson', 'Computer Science', 40, 0),
('Database Systems', 'CS301', 'Introduction to database design and SQL', 'Dr. Williams', 'Computer Science', 35, 0),
('Web Development', 'CS401', 'Building modern web applications', 'Dr. Brown', 'Computer Science', 30, 0),
('Machine Learning', 'CS501', 'Introduction to machine learning concepts', 'Dr. Davis', 'Computer Science', 25, 0),
('Calculus I', 'MATH101', 'Introduction to differential calculus', 'Dr. Wilson', 'Mathematics', 60, 0),
('Linear Algebra', 'MATH201', 'Study of vector spaces and linear mappings', 'Dr. Moore', 'Mathematics', 45, 0),
('Physics I', 'PHYS101', 'Introduction to mechanics', 'Dr. Taylor', 'Physics', 55, 0),
('Organic Chemistry', 'CHEM201', 'Study of organic compounds', 'Dr. Anderson', 'Chemistry', 40, 0),
('Introduction to Psychology', 'PSYC101', 'Basic concepts in psychology', 'Dr. Thomas', 'Psychology', 70, 0);

-- Triggers for updating timestamps
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = CURRENT_TIMESTAMP;
   RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_timestamp
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

CREATE TRIGGER update_courses_timestamp
BEFORE UPDATE ON courses
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Trigger for updating course enrollment count
CREATE OR REPLACE FUNCTION update_course_enrollment()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE courses SET enrolled = enrolled + 1 WHERE id = NEW.course_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE courses SET enrolled = enrolled - 1 WHERE id = OLD.course_id;
    END IF;
    RETURN NULL;
END;
$$ language 'plpgsql';

CREATE TRIGGER enrollment_update
AFTER INSERT OR DELETE ON enrollments
FOR EACH ROW
EXECUTE FUNCTION update_course_enrollment();
