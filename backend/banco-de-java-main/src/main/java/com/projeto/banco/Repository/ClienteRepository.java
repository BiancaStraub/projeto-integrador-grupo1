package com.projeto.banco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projeto.banco.model.ClienteFisica;

public interface ClienteFisicaRepository
        extends JpaRepository<ClienteFisica, String> {
}


