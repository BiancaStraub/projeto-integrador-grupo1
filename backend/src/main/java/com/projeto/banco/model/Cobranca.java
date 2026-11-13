package com.projeto.banco.model;

import java.math.BigDecimal;
import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "cobrancas")
public class Cobranca {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long encomendaId;

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal valor;

    @Column(nullable = false, length = 40)
    private String metodo;

    @Column(nullable = false, length = 40)
    private String status;

    @Column(nullable = false)
    private Instant criadaEm;

    protected Cobranca() { }

    public Cobranca(Long encomendaId, BigDecimal valor, String metodo) {
        this.encomendaId = encomendaId;
        this.valor = valor;
        this.metodo = metodo;
        this.status = "DEMONSTRACAO_NAO_PROCESSADA";
        this.criadaEm = Instant.now();
    }

    public Long getId() { return id; }
    public Long getEncomendaId() { return encomendaId; }
    public BigDecimal getValor() { return valor; }
    public String getMetodo() { return metodo; }
    public String getStatus() { return status; }
    public Instant getCriadaEm() { return criadaEm; }
}
