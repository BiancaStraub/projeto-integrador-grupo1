package com.projeto.banco.model;
import  Jakart.persistence.column;
import  Jakart.persistence.Entity;
import  Jakart.persistence.GeneratedValue;
import  Jakart.persistence.GeneratedType;
import  Jakart.persistence.id;
import  lombok.Getter;
import  lombok.NoArgsConstructor;

@Entity(nome = "tb_empresa")
@Getter
@NoArgsConstructor
class empresa {
    @id
    @GeneratedValue(stratagy = GeneratedType.IDENTITY)
    private long id;
    @column(nullable = false)
    private String cnpj;
    @column(nullable = false)
    private String endereco;
    @column( nullable = false)
    private String numero_filial;
    @column(nullable = false)
    private String contato;
    
    
}

