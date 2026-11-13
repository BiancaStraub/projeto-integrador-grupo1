package com.projeto.banco.model;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OrderColumn;
import jakarta.persistence.Table;

@Entity
@Table(name = "encomendas")
public class Encomenda {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 160)
    private String nome;

    @Column(nullable = false, length = 300)
    private String endereco;

    @Column(nullable = false, length = 120)
    private String contato;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "encomenda_itens", joinColumns = @JoinColumn(name = "encomenda_id"))
    @OrderColumn(name = "posicao")
    private List<ItemEncomenda> itens = new ArrayList<>();

    @Column(nullable = false, precision = 12, scale = 2)
    private BigDecimal total;

    @Column(nullable = false, length = 40)
    private String status;

    @Column(nullable = false)
    private Instant criadaEm;

    protected Encomenda() { }

    public Encomenda(String nome, String endereco, String contato, List<ItemEncomenda> itens,
            BigDecimal total, String status) {
        this.nome = nome;
        this.endereco = endereco;
        this.contato = contato;
        this.itens = new ArrayList<>(itens);
        this.total = total;
        this.status = status;
        this.criadaEm = Instant.now();
    }

    public Long getId() { return id; }
    public String getNome() { return nome; }
    public String getEndereco() { return endereco; }
    public String getContato() { return contato; }
    public List<ItemEncomenda> getItens() { return itens; }
    public BigDecimal getTotal() { return total; }
    public String getStatus() { return status; }
    public Instant getCriadaEm() { return criadaEm; }
}
