package com.tuempresa.computersservice;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.tuempresa.computersservice.model.Reparacion;
import com.tuempresa.computersservice.repository.ReparacionRepository;
import com.tuempresa.computersservice.service.ReparacionService;

class ReparacionServiceTest {
    @Test
    void testFindById() {
        ReparacionRepository repo = Mockito.mock(ReparacionRepository.class);
        ReparacionService service = new ReparacionService(repo);
        Reparacion rep = new Reparacion();
        rep.setDescripcion("Pantalla rota");
        Mockito.when(repo.findById(1L)).thenReturn(Optional.of(rep));
        Optional<Reparacion> result = service.findById(1L);
        Assertions.assertTrue(result.isPresent());
        Assertions.assertEquals("Pantalla rota", result.get().getDescripcion());
    }
}
