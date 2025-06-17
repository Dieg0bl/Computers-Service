package com.tuempresa.computersservice.service;

import com.tuempresa.computersservice.model.Tienda;
import com.tuempresa.computersservice.repository.TiendaRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TiendaService {
    private final TiendaRepository tiendaRepository;

    public TiendaService(TiendaRepository tiendaRepository) {
        this.tiendaRepository = tiendaRepository;
    }

    public List<Tienda> findAll() {
        return tiendaRepository.findAll();
    }

    public Optional<Tienda> findById(Long id) {
        return tiendaRepository.findById(id);
    }

    public Tienda save(Tienda tienda) {
        return tiendaRepository.save(tienda);
    }

    public void deleteById(Long id) {
        tiendaRepository.deleteById(id);
    }
}
