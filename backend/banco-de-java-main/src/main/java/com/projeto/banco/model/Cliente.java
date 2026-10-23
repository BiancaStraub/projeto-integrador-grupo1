package com.projeto.banco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo_cliente")
@Getter
@NoArgsConstructor
public abstract class Cliente {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private String nome;
    @Column(nullable = false) private String senha;
    private String email;
    private String endereco;
    private String contato;
    @Column(nullable = false, unique = true) private String documento;

    protected Cliente(String nome, String documento, String endereco, String email, String contato, String senha) {
        this.nome = nome;
        this.documento = documento;
        this.endereco = endereco;
        this.email = email;
        this.contato = contato;
        this.senha = senha;
    }
}
