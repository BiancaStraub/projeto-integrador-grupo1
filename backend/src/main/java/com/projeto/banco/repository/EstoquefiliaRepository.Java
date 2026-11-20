package com.projeto.banco.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.projeto.banco.model.EstoqueFilial;

@Repository
public interface EstoqueFilialRepository extends JpaRepository<EstoqueFilial, Long> {

    // Busca o estoque de um produto específico dentro de uma filial específica
    Optional<EstoqueFilial> findByProdutoIdAndFilialId(Long produtoId, Long filialId);

    // Lista todo o estoque de uma unidade física (filial)
    List<EstoqueFilial> findByFilialId(Long filialId);

    // Lista apenas os produtos disponíveis em uma filial específica
    List<EstoqueFilial> findByFilialIdAndDisponivelNaFilialTrue(Long filialId);

    // Verifica em quais filiais um determinado produto está disponível
    List<EstoqueFilial> findByProdutoIdAndDisponivelNaFilialTrue(Long produtoId);

    // Busca todos os itens de uma filial que atingiram ou ficaram abaixo do estoque mínimo (alerta de reposição)
    @Query("SELECT e FROM EstoqueFilial e WHERE e.filial.id = :filialId AND e.quantidade <= e.estoqueMinimo")
    List<EstoqueFilial> findItensParaReposicaoPorFilial(@Param("filialId") Long filialId);

    // Verifica se já existe registro de estoque para o par produto + filial antes de cadastrar
    boolean existsByProdutoIdAndFilialId(Long produtoId, Long filialId);
}