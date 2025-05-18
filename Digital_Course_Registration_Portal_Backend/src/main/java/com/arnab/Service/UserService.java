package com.arnab.Service;




import com.arnab.DTO.UserDTO;
import com.arnab.entity.User;



import com.arnab.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(UserDTO userDTO) throws Exception {
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new Exception("Username already exists");
        }

        User user = new User();
        user.setUsername(userDTO.getUsername());
        user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
        user.setName(userDTO.getName());
        user.setEmail(userDTO.getEmail());
        user.setDepartment(userDTO.getDepartment());
        user.setRole("STUDENT");

        return userRepository.save(user);
    }
 
	
}