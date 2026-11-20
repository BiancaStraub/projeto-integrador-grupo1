package com.projeto.banco.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "tb_cobranca")
@Getter
@Setter
@NoArgsConstructor
public class Cobranca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String data;

    @Column(nullable = false)
    private String valor;

    @Column(nullable = false)
    private String instituicao;

    @Column(nullable = false)
    private String lembrete;
}

