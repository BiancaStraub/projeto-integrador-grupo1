package com.projeto.banco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projeto.banco.model.Encomenda;

public interface EncomendaRepository
        extends JpaRepository<Encomenda, Long> {
}