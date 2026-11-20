package com.projeto.banco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.projeto.banco.model.Cobranca;

@Repository
public interface CobrancaRepository extends JpaRepository<Cobranca, Long> {
}