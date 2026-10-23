package com.projeto.banco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "tb_cobranca")
@Getter @NoArgsConstructor
public class Cobranca {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private String data;
    @Column(nullable = false) private String valor;
    @Column(nullable = false) private String instituicao;
    @Column(nullable = false) private String lembrete;
}
