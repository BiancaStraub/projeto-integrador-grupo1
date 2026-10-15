package com.projeto.banco.model;
import Jakart.persitence.column;
import Jakart.persitence.Entity;
import Jakart.persistence.GeneratedValue;
import Jakart.persistence.GeneratedType;
import Jakart.persistence.id;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "tb_clientefisica")
@Getter
@NoArgsConstructor
class Clientefisica {
    @id
    @column(nullable = false)
    private String cpf;
    @Column(nullable = false)
    private String nome;
    @Column(nullable = false, unique = true)
    private String senha;
    private String email;
    private String endereco;
    private String contato;


    protected Cliente(String nome, String cpf, String endereco, String email, String contato, String senha) {
        this.nome = nome;
        this.senha = senha;
        this.email = email;
        this.endereco = endereco;
        this.contato = contato;
        this.cpf = cpf;
    }
}
    

