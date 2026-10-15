package com.projeto.banco.model;
import  Jakart.persistence.column;
import  Jakart.persistence.Entity;
import  Jakart.persistence.GeneratedValue;
import  Jakart.persistence.GeneratedType;
import  Jakart.persistence.id;
import  lombok.Getter;
import  lombok.NoArgsConstructor;

@Entity(nome = "tb_encomenda")
@Getter
@NoArgsConstructor
class encomenda {
    @id
    @GeneratedValue(stratagy = GeneratedType.IDENTITY)
    private long id;
    @column(nullable = false)
    private String numero_pedido;
    @column(nullable = false)
    private String nome_cliente;
    @column( nullable = false)
    private String endereco;
    @column(nullable = false)
    private String cpf;
    
}

