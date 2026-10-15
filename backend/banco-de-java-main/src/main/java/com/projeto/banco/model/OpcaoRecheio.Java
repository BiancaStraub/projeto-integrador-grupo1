package com.projeto.banco.model;
import  Jakart.persistence.column;
import  Jakart.persistence.Entity;
import  Jakart.persistence.GeneratedValue;
import  Jakart.persistence.GeneratedType;
import  Jakart.persistence.id;
import  lombok.Getter;
import  lombok.NoArgsConstructor;

@Entity(name = "tb_opcao_recheio)
@Getter
@NoArgsConstructor
class opcao_recheio
    @id
    @GeneratedValue(stratagy = GeneratedType.IDENTITY)
    private long id;
    @column(nullable = false)
    private String nome;
    @column(nullable = false)
    private String preco_adicional; 
    @column( nullable = false)
    private String disponivel;
}