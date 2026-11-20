package com.projeto.banco.Repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projeto.banco.model.CampanhaSazonal;

@Repository
public interface CampanhaSazonalRepository extends JpaRepository<CampanhaSazonal, Long> {

    // Lista todas as campanhas marcadas como ativas
    List<CampanhaSazonal> findByAtivaTrue();

    // Busca campanhas ativas e dentro do período de vigência na data informada
    @Query("SELECT c FROM CampanhaSazonal c WHERE c.ativa = true AND :dataAtual BETWEEN c.dataInicio AND c.dataFim")
    List<CampanhaSazonal> findCampanhasVigentes(@Param("dataAtual") LocalDate dataAtual);

    // Busca por parte do nome ignorando maiúsculas/minúsculas
    List<CampanhaSazonal> findByNomeContainingIgnoreCase(String nome);
}