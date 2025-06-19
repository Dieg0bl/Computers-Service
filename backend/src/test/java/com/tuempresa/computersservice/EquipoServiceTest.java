package com.tuempresa.computersservice;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.tuempresa.computersservice.model.Equipo;
import com.tuempresa.computersservice.repository.EquipoRepository;
import com.tuempresa.computersservice.service.EquipoService;

class EquipoServiceTest {
    @Test
    void testFindById() {
        EquipoRepository repo = Mockito.mock(EquipoRepository.class);
        EquipoService service = new EquipoService(repo);
        Equipo equipo = new Equipo();
        equipo.setMarca("HP");
        Mockito.when(repo.findById(1L)).thenReturn(Optional.of(equipo));
        Optional<Equipo> result = service.findById(1L);
        Assertions.assertTrue(result.isPresent());
        Assertions.assertEquals("HP", result.get().getMarca());
    }
}
