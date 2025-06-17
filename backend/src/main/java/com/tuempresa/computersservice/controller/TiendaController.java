package com.tuempresa.computersservice.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tuempresa.computersservice.model.Tienda;
import com.tuempresa.computersservice.service.TiendaService;

@RestController
@RequestMapping("/api/tiendas")
public class TiendaController {
    private final TiendaService tiendaService;

    public TiendaController(TiendaService tiendaService) {
        this.tiendaService = tiendaService;
    }

    @GetMapping
    public List<Tienda> getAllTiendas() {
        return tiendaService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tienda> getTiendaById(@PathVariable Long id) {
        Optional<Tienda> tienda = tiendaService.findById(id);
        return tienda.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Tienda createTienda(@RequestBody Tienda tienda) {
        return tiendaService.save(tienda);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTienda(@PathVariable Long id) {
        tiendaService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
