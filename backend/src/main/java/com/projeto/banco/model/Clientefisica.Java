package com.projeto.banco.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "tb_cliente_fisica")
@PrimaryKeyJoinColumn(name = "cliente_id") // Liga o registro de PF ao ID da tabela tb_cliente
@Getter
@Setter
@NoArgsConstructor
public class ClienteFisica {

    @Column(nullable = false, unique = true, length = 14)
            String nome,
            String cpf,
            String endereco,
            String email,
            String contato,
            String senha

    public Clienteempresa(String nome, String cpf, String endereco, String email, String contato, String senha) {
        this.endereco = endereco;
        this.contato = contato;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.cnpj = cpf;
    }
}


