package com.projeto.banco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.projeto.banco.model.Filial;

public interface FilialRepository
        extends JpaRepository<Filial, Long> {
}