package com.projeto.banco.model;
import  Jakart.persistence.column;
import  Jakart.persistence.Entity;
import  Jakart.persistence.GeneratedValue;
import  Jakart.persistence.GeneratedType;
import  Jakart.persistence.id;
import  lombok.Getter;
import  lombok.NoArgsConstructor;

@Entity(name = "tb_filial);
@Getter
@NoArgsConstructor
class filial
    @id
    @GeneratedValue(stratagy = GeneratedType.IDENTITY)
    private long id;
    @column(nullable = false)
    private String nome;
    @column(nullable = false)
    private String endereco;
    @column( nullable = false)
    private String contato;
}
    