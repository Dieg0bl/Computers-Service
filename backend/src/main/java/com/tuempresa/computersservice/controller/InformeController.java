package com.tuempresa.computersservice.controller;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tuempresa.computersservice.model.Equipo;
import com.tuempresa.computersservice.model.Informe;
import com.tuempresa.computersservice.model.Reparacion;
import com.tuempresa.computersservice.service.EquipoService;
import com.tuempresa.computersservice.service.InformeService;
import com.tuempresa.computersservice.service.ReparacionService;

@RestController
@RequestMapping("/api/informes")
public class InformeController {
    private final InformeService informeService;
    private final EquipoService equipoService;
    private final ReparacionService reparacionService;

    public InformeController(InformeService informeService, EquipoService equipoService, ReparacionService reparacionService) {
        this.informeService = informeService;
        this.equipoService = equipoService;
        this.reparacionService = reparacionService;
    }

    @GetMapping
    public List<Informe> getAllInformes() {
        return informeService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Informe> getInformeById(@PathVariable Long id) {
        return informeService.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping("/equipos")
    public Informe generarInformeEquipos() {
        List<Equipo> equipos = equipoService.findAll();
        StringBuilder contenido = new StringBuilder();
        contenido.append("INFORME DE EQUIPOS\n\n");
        for (Equipo eq : equipos) {
            contenido.append("ID: ").append(eq.getId())
                .append(", Tipo: ").append(eq.getTipo())
                .append(", Marca: ").append(eq.getMarca())
                .append(", Modelo: ").append(eq.getModelo())
                .append(", Nº Serie: ").append(eq.getNumeroSerie())
                .append("\n");
        }
        Informe informe = new Informe();
        informe.setTipo("equipos");
        informe.setFechaGeneracion(LocalDateTime.now());
        informe.setContenido(contenido.toString());
        return informeService.save(informe);
    }

    @PostMapping("/reparaciones")
    public Informe generarInformeReparaciones() {
        List<Reparacion> reparaciones = reparacionService.findAll();
        StringBuilder contenido = new StringBuilder();
        contenido.append("INFORME DE REPARACIONES\n\n");
        for (Reparacion rep : reparaciones) {
            contenido.append("ID: ").append(rep.getId())
                .append(", Equipo: ").append(rep.getEquipo() != null ? rep.getEquipo().getId() : "-")
                .append(", Estado: ").append(rep.getEstado())
                .append(", Descripción: ").append(rep.getDescripcion())
                .append(", Fecha Solicitud: ").append(rep.getFechaSolicitud())
                .append(", Fecha Finalización: ").append(rep.getFechaFinalizacion())
                .append("\n");
        }
        Informe informe = new Informe();
        informe.setTipo("reparaciones");
        informe.setFechaGeneracion(LocalDateTime.now());
        informe.setContenido(contenido.toString());
        return informeService.save(informe);
    }
}
