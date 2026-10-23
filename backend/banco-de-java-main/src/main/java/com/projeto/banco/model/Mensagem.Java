package com.projeto.banco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "tb_mensagem")
@Getter @NoArgsConstructor
public class Mensagem {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private String pedido;
    @Column(nullable = false) private String remetente;
    @Column(nullable = false) private String texto;
    @Column(nullable = false) private String data_envio;
}
