package com.tuempresa.computersservice;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import com.tuempresa.computersservice.model.Informe;
import com.tuempresa.computersservice.repository.InformeRepository;
import com.tuempresa.computersservice.service.InformeService;

class InformeServiceTest {
    @Test
    void testFindById() {
        InformeRepository repo = Mockito.mock(InformeRepository.class);
        InformeService service = new InformeService(repo);
        Informe inf = new Informe();
        inf.setTipo("equipos");
        inf.setFechaGeneracion(LocalDateTime.now());
        inf.setContenido("contenido de prueba");
        Mockito.when(repo.findById(1L)).thenReturn(Optional.of(inf));
        Optional<Informe> result = service.findById(1L);
        Assertions.assertTrue(result.isPresent());
        Assertions.assertEquals("equipos", result.get().getTipo());
    }
}
