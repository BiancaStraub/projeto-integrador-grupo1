package com.projeto.banco.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "mensagens")
public class Mensagem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 160)
    private String nome;

    @Column(length = 160)
    private String email;

    @Column(length = 120)
    private String contato;

    @Column(nullable = false, length = 4000)
    private String texto;

    @Column(nullable = false)
    private Instant criadaEm;

    protected Mensagem() { }

    public Mensagem(String nome, String email, String contato, String texto) {
        this.nome = nome;
        this.email = email;
        this.contato = contato;
        this.texto = texto;
        this.criadaEm = Instant.now();
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEmail() { return email; }
    public String getContato() { return contato; }
    public String getTexto() { return texto; }
    public Instant getCriadaEm() { return criadaEm; }
}
