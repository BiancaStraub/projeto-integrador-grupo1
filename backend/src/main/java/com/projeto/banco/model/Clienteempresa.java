package com.projeto.banco.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "tb_cliente_empresa")
@PrimaryKeyJoinColumn(name = "cliente_id") // Chave estrangeira que liga à tabela tb_cliente
@Getter
@Setter
@NoArgsConstructor
public class Clienteempresa {

    @Column(nullable = false, unique = true, length = 18)
    private String endereco;
    private String email;
    private String contato;
    private String senha;
    private String nome;
    private String cnpj;
    @Column(nullable = false)
    private String razaoSocial; 
    private String inscricaoEstadual; 
    private String representanteLegal;

    public Clienteempresa(String nome, String razaoSocial, String cnpj, String inscricaoEstadual,
                          String representanteLegal, String endereco, String email, String contato, String senha) {
        this.endereco = endereco;
        this.contato = contato;
        this.email = email;
        this.senha = senha;
        this.nome = nome;
        this.razaoSocial = razaoSocial;
        this.cnpj = cnpj;
        this.inscricaoEstadual = inscricaoEstadual;
        this.representanteLegal = representanteLegal;
    }
}
    


