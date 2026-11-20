package com.projeto.banco.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "tb_mensagem")
@Getter
@Setter
@NoArgsConstructor
public class Mensagem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "encomenda_id", nullable = false)
    private Encomenda encomenda;

    @Column(nullable = false, length = 100)
    private String remetente;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoRemetente tipoRemetente;

    @Column(nullable = false, length = 1000)
    private String texto;

    @Column(name = "data_envio", nullable = false)
    private LocalDateTime dataEnvio = LocalDateTime.now();

    @Column(nullable = false)
    private Boolean lida = false;

    private LocalDateTime dataLeitura;

    public Mensagem(Encomenda encomenda, String remetente, TipoRemetente tipoRemetente, String texto) {
        this.encomenda = encomenda;
        this.remetente = remetente;
        this.tipoRemetente = tipoRemetente;
        this.texto = texto;
        this.dataEnvio = LocalDateTime.now();
        this.lida = false;
    }

    public void marcarComoLida() {
        if (!this.lida) {
            this.lida = true;
            this.dataLeitura = LocalDateTime.now();
        }
    }
}