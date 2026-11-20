package com.projeto.banco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projeto.banco.model.Cartao;

public interface CartaoRepository
        extends JpaRepository<Cartao, Long> {
}