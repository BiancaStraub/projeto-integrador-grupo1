package com.projeto.banco.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "filiais")
public class Filial {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String nome;

    @Column(nullable = false, length = 240)
    private String endereco;

    @Column(nullable = false, length = 120)
    private String contato;

    protected Filial() { }

    public Filial(String nome, String endereco, String contato) {
        this.nome = nome;
        this.endereco = endereco;
        this.contato = contato;
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEndereco() { return endereco; }
    public String getContato() { return contato; }
}
