package com.projeto.banco.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "tb_filial")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Filial {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome; 

    @Column(nullable = false, unique = true, length = 18)
    private String cnpj; 

    @Column(nullable = false)
    private String endereco;

    @Column(nullable = false, length = 20)
    private String contato;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TipoUnidade tipoUnidade; 

    @Column(nullable = false)
    private Boolean ativa = true;
}