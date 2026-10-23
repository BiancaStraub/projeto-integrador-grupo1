package com.projeto.banco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "tb_empresa")
@Getter @NoArgsConstructor
public class Empresa {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private String cnpj;
    @Column(nullable = false) private String endereco;
    @Column(nullable = false) private String numero_filial;
    @Column(nullable = false) private String contato;
}
