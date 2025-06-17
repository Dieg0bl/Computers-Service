package com.tuempresa.computersservice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.tuempresa.computersservice.model.Informe;
import com.tuempresa.computersservice.repository.InformeRepository;

@Service
public class InformeService {
    private final InformeRepository informeRepository;

    public InformeService(InformeRepository informeRepository) {
        this.informeRepository = informeRepository;
    }

    public List<Informe> findAll() {
        return informeRepository.findAll();
    }

    public Optional<Informe> findById(Long id) {
        return informeRepository.findById(id);
    }

    public Informe save(Informe informe) {
        return informeRepository.save(informe);
    }

    public void deleteById(Long id) {
        informeRepository.deleteById(id);
    }
}
