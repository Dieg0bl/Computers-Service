package com.tuempresa.computersservice.service;

import com.tuempresa.computersservice.model.Reparacion;
import com.tuempresa.computersservice.repository.ReparacionRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReparacionService {
    private final ReparacionRepository reparacionRepository;

    public ReparacionService(ReparacionRepository reparacionRepository) {
        this.reparacionRepository = reparacionRepository;
    }

    public List<Reparacion> findAll() {
        return reparacionRepository.findAll();
    }

    public Optional<Reparacion> findById(Long id) {
        return reparacionRepository.findById(id);
    }

    public Reparacion save(Reparacion reparacion) {
        return reparacionRepository.save(reparacion);
    }

    public void deleteById(Long id) {
        reparacionRepository.deleteById(id);
    }
}
