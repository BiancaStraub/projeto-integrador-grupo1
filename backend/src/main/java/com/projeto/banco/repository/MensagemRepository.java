package com.projeto.banco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projeto.banco.model.Mensagem;

public interface MensagemRepository
        extends JpaRepository<Mensagem, Long> {
}