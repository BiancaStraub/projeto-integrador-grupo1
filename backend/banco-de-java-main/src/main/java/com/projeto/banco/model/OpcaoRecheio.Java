package com.projeto.banco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "tb_opcao_recheio")
@Getter @NoArgsConstructor
public class OpcaoRecheio {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private String nome;
    @Column(nullable = false) private String preco_adicional;
    @Column(nullable = false) private String disponivel;
}
