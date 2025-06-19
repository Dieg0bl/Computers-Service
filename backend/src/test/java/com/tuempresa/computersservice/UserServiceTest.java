package com.tuempresa.computersservice;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.tuempresa.computersservice.model.User;
import com.tuempresa.computersservice.repository.UserRepository;
import com.tuempresa.computersservice.service.UserService;

class UserServiceTest {
    @Test
    void testFindByEmail() {
        UserRepository repo = Mockito.mock(UserRepository.class);
        PasswordEncoder encoder = Mockito.mock(PasswordEncoder.class);
        UserService service = new UserService(repo, encoder);
        User user = new User();
        user.setEmail("test@demo.com");
        Mockito.when(repo.findByEmail("test@demo.com")).thenReturn(Optional.of(user));
        Optional<User> result = service.findByEmail("test@demo.com");
        Assertions.assertTrue(result.isPresent());
        Assertions.assertEquals("test@demo.com", result.get().getEmail());
    }
}
