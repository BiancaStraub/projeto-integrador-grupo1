package com.projeto.banco.model;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "tb_campanha_sazonal")
@Getter
@Setter
@NoArgsConstructor
public class CampanhaSazonal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome; // Ex: "Especial de Páscoa 2026"

    @Column(length = 300)
    private String descricao;

    @Column(nullable = false)
    private LocalDate dataInicio;

    @Column(nullable = false)
    private LocalDate dataFim;

    @Column(precision = 5, scale = 2)
    private BigDecimal percentualDesconto = BigDecimal.ZERO; // Ex: 10.00 para 10% de desconto

    @Column(nullable = false)
    private Boolean ativa = true;

    @ManyToMany(mappedBy = "campanhasSazonais")
    private Set<Produto> produtos = new HashSet<>();

    public CampanhaSazonal(String nome, String descricao, LocalDate dataInicio, LocalDate dataFim, BigDecimal percentualDesconto) {
        this.nome = nome;
        this.descricao = descricao;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.percentualDesconto = percentualDesconto;
        this.ativa = true;
    }

    public boolean isVigente() {
        LocalDate hoje = LocalDate.now();
        return Boolean.TRUE.equals(this.ativa) && !hoje.isBefore(dataInicio) && !hoje.isAfter(dataFim);
    }
}