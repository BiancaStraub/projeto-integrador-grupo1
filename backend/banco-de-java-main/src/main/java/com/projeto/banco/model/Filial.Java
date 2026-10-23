package com.projeto.banco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "tb_filial")
@Getter @NoArgsConstructor
public class Filial {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private String nome;
    @Column(nullable = false) private String endereco;
    @Column(nullable = false) private String contato;
}
