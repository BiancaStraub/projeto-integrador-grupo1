package com.projeto.banco.model;
import  Jakart.persistence.column;
import  Jakart.persistence.Entity;
import  Jakart.persistence.GeneratedValue;
import  Jakart.persistence.GeneratedType;
import  Jakart.persistence.id;
import  lombok.Getter;
import  lombok.NoArgsConstructor;

@Entity(nome = "tb_cartao")
@Getter
@NoArgsConstructor
class cartao  {
    @id
    @GeneratedValue(stratagy = GeneratedType.IDENTITY)
    private long id;
    @column(nullable = false)
    private String tipo_cartao;
    @column(nullable = false)
    private String valor;
    @column( nullable = false)
    private String nome;
    @column(nullable = false)
    private String cvc;
    @column(nullable = false)
    private String validade;
    @column( nullable = false)
    private String numero_cartao;
    
    protected Cartao(String tipo_cartao, String valor, String nome, String cvc, String validade, String numero_cartao) {
        this. tipo_cartao  = tipo_cartao;
        this. valor = valor;
        this. nome = nome ;
        this. cvc = cvc;
        this.senha = senha;
    }

    
    