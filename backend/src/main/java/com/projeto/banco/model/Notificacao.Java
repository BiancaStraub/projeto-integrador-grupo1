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

@Entity(name = "tb_notificacao")
@Getter
@Setter
@NoArgsConstructor
public class Notificacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String email;

    @Column(name = "numero_celular", nullable = false, length = 20)
    private String numeroCelular;

    @Column(nullable = false, length = 100)
    private String titulo; // Resumo curto do alerta (Ex: "Pedido #42 Pronto")

    @Column(nullable = false, length = 500)
    private String mensagem;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TipoAlerta tipoAlerta; // Categoriza o alerta para o cliente

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private StatusNotificacao status = StatusNotificacao.PENDENTE;

    @Column(nullable = false)
    private Boolean lida = false;

    @Column(nullable = false)
    private LocalDateTime dataCriacao = LocalDateTime.now();

    private LocalDateTime dataEnvio;

    private LocalDateTime dataLeitura;

    @ManyToOne
    @JoinColumn(name = "cliente_id", nullable = false)
    private Cliente cliente; // Funciona tanto para ClienteFisica quanto ClienteEmpresa

    public Notificacao(Cliente cliente, TipoAlerta tipoAlerta, String titulo, String mensagem) {
        this.cliente = cliente;
        this.email = cliente.getEmail(); // Puxa automaticamente do cadastro do cliente
        this.numeroCelular = cliente.getContato(); // Puxa automaticamente do contato do cliente
        this.tipoAlerta = tipoAlerta;
        this.titulo = titulo;
        this.mensagem = mensagem;
        this.status = StatusNotificacao.PENDENTE;
        this.lida = false;
        this.dataCriacao = LocalDateTime.now();
    }

    // --- Métodos de Gestão de Status e Alertas ---

    public void marcarComoEnviada() {
        this.status = StatusNotificacao.ENVIADA;
        this.dataEnvio = LocalDateTime.now();
    }

    public void registrarFalhaEnvio() {
        this.status = StatusNotificacao.FALHA;
    }

    public void marcarComoLida() {
        this.lida = true;
        this.status = StatusNotificacao.LIDA;
        this.dataLeitura = LocalDateTime.now();
    }

    public void atualizarStatus(StatusNotificacao novoStatus) {
        this.status = novoStatus;
        if (novoStatus == StatusNotificacao.ENVIADA) {
            this.dataEnvio = LocalDateTime.now();
        } else if (novoStatus == StatusNotificacao.LIDA) {
            this.lida = true;
            this.dataLeitura = LocalDateTime.now();
        }
    }
}
