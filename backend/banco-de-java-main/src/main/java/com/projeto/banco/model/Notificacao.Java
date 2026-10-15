package com.projeto.banco.model;
import  Jakart.persistence.column;
import  Jakart.persistence.Entity;
import  Jakart.persistence.GeneratedValue;
import  Jakart.persistence.GeneratedType;
import  Jakart.persistence.id;
import  lombok.Getter;
import  lombok.NoArgsConstructor;

@Entity(nome = "tb_notificacao")
@Getter
@NoArgsConstructor
class notificacao {
    @id
    @GeneratedValue(stratagy = GeneratedType.IDENTITY)
    private long id;
    @column(nullable = false)
    private String email;
    @column(nullable = false)
    private String numero_celular;
    @column( nullable = false)
    private String status;
    @column(nullable = false)
        
}

