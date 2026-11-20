package com.projeto.banco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projeto.banco.model.Cobranca;

public interface CobrancaRepository
        extends JpaRepository<Cobranca, Long> {
}