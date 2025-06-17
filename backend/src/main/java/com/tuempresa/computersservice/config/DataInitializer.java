package com.tuempresa.computersservice.config;

import com.tuempresa.computersservice.model.Tienda;
import com.tuempresa.computersservice.model.User;
import com.tuempresa.computersservice.model.User.Role;
import com.tuempresa.computersservice.repository.TiendaRepository;
import com.tuempresa.computersservice.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.Set;

@Configuration
public class DataInitializer {
    @Bean
    public CommandLineRunner initData(UserRepository userRepository, TiendaRepository tiendaRepository, PasswordEncoder encoder) {
        return args -> {
            if (userRepository.count() == 0) {
                Tienda tienda = new Tienda();
                tienda.setNombre("Computer Service Demo");
                tienda.setDireccion("Calle Ejemplo 123");
                tienda.setTelefono("600123456");
                tiendaRepository.save(tienda);

                User admin = new User();
                admin.setEmail("admin@computerservice.com");
                admin.setPassword(encoder.encode("admin1234"));
                admin.setNombre("Admin Demo");
                admin.setRole(Role.ADMIN_USER);
                admin.setTiendas(Set.of(tienda));
                userRepository.save(admin);
            }
        };
    }
}
