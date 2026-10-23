package com.projeto.banco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "tb_encomenda")
@Getter @NoArgsConstructor
public class Encomenda {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private String numero_pedido;
    @Column(nullable = false) private String nome_cliente;
    @Column(nullable = false) private String endereco;
    @Column(nullable = false) private String cpf;
}
