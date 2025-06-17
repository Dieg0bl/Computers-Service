package com.tuempresa.computersservice.controller;

import com.tuempresa.computersservice.model.Reparacion;
import com.tuempresa.computersservice.service.ReparacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reparaciones")
public class ReparacionController {
    private final ReparacionService reparacionService;

    public ReparacionController(ReparacionService reparacionService) {
        this.reparacionService = reparacionService;
    }

    @GetMapping
    public List<Reparacion> getAllReparaciones() {
        return reparacionService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reparacion> getReparacionById(@PathVariable Long id) {
        Optional<Reparacion> reparacion = reparacionService.findById(id);
        return reparacion.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Reparacion createReparacion(@RequestBody Reparacion reparacion) {
        return reparacionService.save(reparacion);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReparacion(@PathVariable Long id) {
        reparacionService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
