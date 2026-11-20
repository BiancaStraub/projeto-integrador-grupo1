package com.projeto.banco.model;

import java.math.BigDecimal;
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
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "tb_produto")
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
    private Integer quantidadeTotal = 0; // Soma consolidada das unidades em todas as filiais

    @Column(nullable = false, length = 20)
    private String unidadeMedida = "UN"; // Ex: "UN" (Unidade), "KG" (Quilo), "CENTO"

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal preco;

    @Column(nullable = false, length = 500)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 35)
    private SituacaoDisponibilidade situacao = SituacaoDisponibilidade.DISPONIVEL;

    // --- Vínculo com Campanhas Sazonais ---
    @ManyToMany
    @JoinTable(
        name = "tb_produto_campanha_sazonal",
        joinColumns = @JoinColumn(name = "produto_id"),
        inverseJoinColumns = @JoinColumn(name = "campanha_id")
    )
    private Set<CampanhaSazonal> campanhasSazonais = new HashSet<>();

    // --- Estoque distribuído por Filial ---
    @OneToMany(mappedBy = "produto", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<EstoqueFilial> estoquesPorFilial = new ArrayList<>();

    public Produto(String nomeProduto, CategoriaProduto categoria, BigDecimal preco,
                   String unidadeMedida, String descricao) {
        this.nomeProduto = nomeProduto;
        this.categoria = categoria;
        this.preco = preco;
        this.unidadeMedida = unidadeMedida;
        this.descricao = descricao;
        this.situacao = SituacaoDisponibilidade.DISPONIVEL;
        this.quantidadeTotal = 0;
    }

    // --- Métodos de Gestão do Catálogo ---

    public void vincularCampanha(CampanhaSazonal campanha) {
        this.campanhasSazonais.add(campanha);
        campanha.getProdutos().add(this);
    }

    public void desvincularCampanha(CampanhaSazonal campanha) {
        this.campanhasSazonais.remove(campanha);
        campanha.getProdutos().remove(this);
    }

    public void atualizarQuantidadeTotalEDisponibilidade() {
        this.quantidadeTotal = this.estoquesPorFilial.stream()
                .mapToInt(EstoqueFilial::getQuantidade)
                .sum();

        if (this.situacao != SituacaoDisponibilidade.SOB_ENCOMENDA
                && this.situacao != SituacaoDisponibilidade.INDISPONIVEL_TEMPORARIAMENTE) {
            this.situacao = (this.quantidadeTotal > 0)
                    ? SituacaoDisponibilidade.DISPONIVEL
                    : SituacaoDisponibilidade.ESGOTADO;
        }
    }
}
