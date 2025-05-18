package com.arnab.Repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.arnab.entity.Course;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByDepartment(String department);
}