package com.projeto.banco.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class ClienteFisica {

    @Id
    @Column(nullable = false)
    private String cpf;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String senha;

    private String email;
    private String endereco;
    private String contato;

    protected ClienteFisica(
            String nome,
            String cpf,
            String endereco,
            String email,
            String contato,
            String senha) {

        this.nome = nome;
        this.senha = senha;
        this.email = email;
        this.endereco = endereco;
        this.contato = contato;
        this.cpf = cpf;
    }
}