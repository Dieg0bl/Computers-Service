package com.tuempresa.computersservice.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.tuempresa.computersservice.model.Informe;

public interface InformeRepository extends JpaRepository<Informe, Long> {
}
