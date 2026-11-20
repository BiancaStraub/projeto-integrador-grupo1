package com.projeto.banco.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projeto.banco.model.Cupom;

@Repository
public interface CupomRepository extends JpaRepository<Cupom, Long> {

    Optional<Cupom> findByCodigoIgnoreCase(String codigo);

    boolean existsByCodigoIgnoreCase(String codigo);

    List<Cupom> findByAtivoTrue();

    @Query("SELECT c FROM Cupom c WHERE c.ativo = true AND :agora BETWEEN c.dataInicio AND c.dataValidade AND c.usosAtuais < c.limiteUsos")
    List<Cupom> findCuponsDisponiveis(@Param("agora") LocalDateTime agora);
}