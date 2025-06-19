package com.tuempresa.computersservice;

import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.tuempresa.computersservice.model.Tienda;
import com.tuempresa.computersservice.repository.TiendaRepository;
import com.tuempresa.computersservice.service.TiendaService;

class TiendaServiceTest {
    @Test
    void testFindById() {
        TiendaRepository repo = Mockito.mock(TiendaRepository.class);
        TiendaService service = new TiendaService(repo);
        Tienda tienda = new Tienda();
        tienda.setNombre("Tienda Demo");
        Mockito.when(repo.findById(1L)).thenReturn(Optional.of(tienda));
        Optional<Tienda> result = service.findById(1L);
        Assertions.assertTrue(result.isPresent());
        Assertions.assertEquals("Tienda Demo", result.get().getNombre());
    }
}
