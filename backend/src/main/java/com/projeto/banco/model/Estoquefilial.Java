package com.projeto.banco.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "tb_estoque_filial",
    uniqueConstraints = @UniqueConstraint(columnNames = {"produto_id", "filial_id"})
)
@Getter
@Setter
@NoArgsConstructor
public class EstoqueFilial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;

    @ManyToOne
    @JoinColumn(name = "filial_id", nullable = false)
    private Filial filial;

    @Column(nullable = false)
    private Integer quantidade = 0;

    @Column(nullable = false)
    private Integer estoqueMinimo = 5; // Gatilho para alerta de reposição na filial

    @Column(nullable = false)
    private Boolean disponivelNaFilial = true;

    @Column(nullable = false)
    private LocalDateTime ultimaAtualizacao = LocalDateTime.now();

    public EstoqueFilial(Produto produto, Filial filial, Integer quantidade, Integer estoqueMinimo) {
        this.produto = produto;
        this.filial = filial;
        this.quantidade = quantidade;
        this.estoqueMinimo = estoqueMinimo;
        this.disponivelNaFilial = quantidade > 0;
        this.ultimaAtualizacao = LocalDateTime.now();
    }

    // --- Métodos de Movimentação de Estoque ---

    public void adicionarEstoque(int qtd) {
        if (qtd > 0) {
            this.quantidade += qtd;
            this.disponivelNaFilial = this.quantidade > 0;
            this.ultimaAtualizacao = LocalDateTime.now();
            if (this.produto != null) {
                this.produto.atualizarQuantidadeTotalEDisponibilidade();
            }
        }
    }

    public void baixarEstoque(int qtd) {
        if (qtd > 0 && this.quantidade >= qtd) {
            this.quantidade -= qtd;
            this.disponivelNaFilial = this.quantidade > 0;
            this.ultimaAtualizacao = LocalDateTime.now();
            if (this.produto != null) {
                this.produto.atualizarQuantidadeTotalEDisponibilidade();
            }
        } else {
            throw new IllegalArgumentException("Estoque insuficiente na filial para realizar a baixa.");
        }
    }

    public boolean precisaReposicao() {
        return this.quantidade <= this.estoqueMinimo;
    }
}