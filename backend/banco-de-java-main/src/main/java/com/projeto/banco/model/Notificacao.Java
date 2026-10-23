package com.projeto.banco.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity(name = "tb_notificacao")
@Getter @NoArgsConstructor
public class Notificacao {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @Column(nullable = false) private String email;
    @Column(nullable = false) private String numero_celular;
    @Column(nullable = false) private String status;
}
