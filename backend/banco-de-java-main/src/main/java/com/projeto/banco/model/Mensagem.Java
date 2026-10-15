package com.projeto.banco.model;
import  Jakart.persistence.column;
import  Jakart.persistence.Entity;
import  Jakart.persistence.GeneratedValue;
import  Jakart.persistence.GeneratedType;
import  Jakart.persistence.id;
import  lombok.Getter;
import  lombok.NoArgsConstructor;

@Entity(name = "tb_mensagem
@Getter
@NoArgsConstructor
class mensagem
    @id
    @GeneratedValue(stratagy = GeneratedType.IDENTITY)
    private long id;
    @column(nullable = false)
    private String pedido;
    @column(nullable = false)
    private String remetente;
    @column( nullable = false)
    private String texto;
    @column( nullable = false)
    private String data_envio;

}