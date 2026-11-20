
package com.projeto.banco.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_produto")
@Getter
@Setter
@NoArgsConstructor
public class Produto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome_produto", nullable = false, length = 120)
    private String nomeProduto;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private CategoriaProduto categoria;

    @Column(nullable = false)
    private Integer quantidadeTotal = 0;

    @Column(nullable = false, length = 20)
    private String unidadeMedida = "UN";

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    @Column(nullable = false, length = 500)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 35)
    private SituacaoDisponibilidade situacao =
            SituacaoDisponibilidade.DISPONIVEL;

    // Relacionamento com campanhas sazonais
    @ManyToMany
    @JoinTable(
        name = "tb_produto_campanha_sazonal",
        joinColumns = @JoinColumn(name = "produto_id"),
        inverseJoinColumns = @JoinColumn(name = "campanha_id")
    )
    private Set<CampanhaSazonal> campanhasSazonais = new HashSet<>();

    // Controle de estoque por filial
    @OneToMany(
        mappedBy = "produto",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<EstoqueFilial> estoquesPorFilial = new ArrayList<>();

    public Produto(
            String nomeProduto,
            CategoriaProduto categoria,
            BigDecimal preco,
            String unidadeMedida,
            String descricao) {

        this.nomeProduto = nomeProduto;
        this.categoria = categoria;
        this.preco = preco;
        this.unidadeMedida = unidadeMedida;
        this.descricao = descricao;
        this.situacao = SituacaoDisponibilidade.DISPONIVEL;
        this.quantidadeTotal = 0;
    }

    // Vincular campanha
    public void vincularCampanha(CampanhaSazonal campanha) {
        campanhasSazonais.add(campanha);
        campanha.getProdutos().add(this);
    }

    // Desvincular campanha
    public void desvincularCampanha(CampanhaSazonal campanha) {
        campanhasSazonais.remove(campanha);
        campanha.getProdutos().remove(this);
    }

    // Adicionar estoque em uma filial
    public void adicionarEstoque(
            Filial filial,
            int quantidade,
            int estoqueMinimo) {

        if (quantidade < 0 || estoqueMinimo < 0) {
            throw new IllegalArgumentException(
                "Quantidade e estoque mínimo não podem ser negativos."
            );
        }

        EstoqueFilial estoque = estoquesPorFilial.stream()
                .filter(e -> e.getFilial().equals(filial))
                .findFirst()
                .orElse(null);

        if (estoque == null) {

            estoque = new EstoqueFilial();
            estoque.setProduto(this);
            estoque.setFilial(filial);
            estoque.setQuantidade(quantidade);
            estoque.setEstoqueMinimo(estoqueMinimo);
            estoque.setDisponivelNaFilial(quantidade > 0);
            estoque.setUltimaAtualizacao(LocalDateTime.now());

            estoquesPorFilial.add(estoque);

        } else {
            estoque.adicionarEstoque(quantidade);
        }

        atualizarQuantidadeTotalEDisponibilidade();
    }

    // Baixar estoque de uma filial
    public void baixarEstoque(Filial filial, int quantidade) {

        EstoqueFilial estoque = estoquesPorFilial.stream()
                .filter(e -> e.getFilial().equals(filial))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(
                    "Estoque não encontrado nesta filial."
                ));

        estoque.baixarEstoque(quantidade);

        atualizarQuantidadeTotalEDisponibilidade();
    }

    // Calcular quantidade total em todas as filiais
    public void atualizarQuantidadeTotalEDisponibilidade() {

        this.quantidadeTotal = estoquesPorFilial.stream()
                .mapToInt(EstoqueFilial::getQuantidade)
                .sum();

        if (this.situacao != SituacaoDisponibilidade.SOB_ENCOMENDA
                && this.situacao !=
                SituacaoDisponibilidade.INDISPONIVEL_TEMPORARIAMENTE) {

            this.situacao = quantidadeTotal > 0
                    ? SituacaoDisponibilidade.DISPONIVEL
                    : SituacaoDisponibilidade.ESGOTADO;
        }
    }

    // Verificar necessidade de reposição em uma filial
    public boolean precisaReposicao(Filial filial) {

        return estoquesPorFilial.stream()
                .filter(e -> e.getFilial().equals(filial))
                .findFirst()
                .map(e -> e.getQuantidade() <= e.getEstoqueMinimo())
                .orElse(false);
    }
}

