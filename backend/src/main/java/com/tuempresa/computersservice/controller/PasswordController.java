package com.tuempresa.computersservice.controller;

import com.tuempresa.computersservice.model.User;
import com.tuempresa.computersservice.repository.UserRepository;
import com.tuempresa.computersservice.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/password")
public class PasswordController {
    private final UserRepository userRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    public PasswordController(UserRepository userRepository, EmailService emailService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/forgot")
    public ResponseEntity<String> forgotPassword(@RequestParam String email) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No existe un usuario con ese email");
        }
        String token = UUID.randomUUID().toString();
        // TODO: Guardar el token en la base de datos asociado al usuario
        // TODO: Crear una entidad PasswordResetToken para producción
        String resetLink = "http://localhost:5173/reset-password?token=" + token;
        emailService.sendEmail(email, "Recuperación de contraseña", "Haz clic aquí para restablecer tu contraseña: " + resetLink);
        return ResponseEntity.ok("Se ha enviado un email de recuperación");
    }

    @PostMapping("/reset")
    public ResponseEntity<String> resetPassword(@RequestParam String email, @RequestParam String newPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("No existe un usuario con ese email");
        }
        User user = userOpt.get();
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return ResponseEntity.ok("Contraseña actualizada correctamente");
    }
}
