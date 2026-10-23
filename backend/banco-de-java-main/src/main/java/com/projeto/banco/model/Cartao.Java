package com.projeto.banco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "tb_cartao")
@Getter @NoArgsConstructor
public class Cartao {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private String tipo_cartao;
    @Column(nullable = false) private String valor;
    @Column(nullable = false) private String nome;
    @Column(nullable = false) private String cvc;
    @Column(nullable = false) private String validade;
    @Column(nullable = false) private String numero_cartao;

    public Cartao(String tipo_cartao, String valor, String nome, String cvc, String validade, String numero_cartao) {
        this.tipo_cartao = tipo_cartao;
        this.valor = valor;
        this.nome = nome;
        this.cvc = cvc;
        this.validade = validade;
        this.numero_cartao = numero_cartao;
    }
}
