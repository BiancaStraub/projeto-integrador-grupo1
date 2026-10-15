package com.projeto.banco.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "tb_cliente_empresa")
@Getter
@NoArgsConstructor
public class Clienteempresa  {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @Column(nullable = false)
    private String cnpj;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false, unique = true)
    private String senha;
    private String email;
    private String endereco;
    private String contato;
    private String documento;

    
    protected Clienteempresa (String nome, String cnpj, String endereco, String email, String contato, String senha, String documento) {
        this.nome = nome;
        this.senha = senha;
        this.email = email;
        this.endereco = endereco;
        this.contato = contato;
        this.cnpj = cnpj;
        this.documento = documento;
    }
}
    


