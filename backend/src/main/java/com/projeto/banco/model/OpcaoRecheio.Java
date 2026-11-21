
package com.projeto.banco.model;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

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

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "tb_opcao_recheio")
@Getter
@Setter
@NoArgsConstructor
public class OpcaoRecheio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(name = "preco_adicional", nullable = false, precision = 10, scale = 2)
    private BigDecimal precoAdicional = BigDecimal.ZERO;

    @Column(nullable = false)
    private Boolean disponivel = true;

    // Especificações do Recheio

    @Column(length = 300)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private CategoriaRecheio categoria;

    @Column(length = 200)
    private String alergenicos;

    @Column(nullable = false)
    private Boolean permitePersonalizacao = true;

    @Column(nullable = false)
    private Integer maximoIngredientesExtras = 3;

    @ManyToMany
    @JoinTable(
        name = "tb_recheio_ingredientes_disponiveis",
        joinColumns = @JoinColumn(name = "recheio_id"),
        inverseJoinColumns = @JoinColumn(name = "ingrediente_id")
    )
    private Set<IngredientePersonalizacao> ingredientesDisponiveis = new HashSet<>();

    public OpcaoRecheio(String nome, BigDecimal precoAdicional, CategoriaRecheio categoria,
                        String descricao, String alergenicos) {
        this.nome = nome;
        this.precoAdicional = precoAdicional;
        this.categoria = categoria;
        this.descricao = descricao;
        this.alergenicos = alergenicos;
        this.disponivel = true;
    }

    // Métodos Auxiliares de Gestão

    public void adicionarIngredienteDisponivel(IngredientePersonalizacao ingrediente) {
        this.ingredientesDisponiveis.add(ingrediente);
    }

    public void removerIngredienteDisponivel(IngredientePersonalizacao ingrediente) {
        this.ingredientesDisponiveis.remove(ingrediente);
    }

    // Método para atualizar os ingredientes disponíveis

    public void setIngredientesDisponiveis(
            Set<IngredientePersonalizacao> ingredientesDisponiveis) {
        this.ingredientesDisponiveis = ingredientesDisponiveis;
    }
}
