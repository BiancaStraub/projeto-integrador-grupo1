package com.projeto.banco.model;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "tb_cupom")
@Getter
@Setter
@NoArgsConstructor
public class Cupom {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String codigo; // Ex: "PADARIA10", "BEMVINDO15"

    @Column(length = 255)
    private String descricao;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private TipoDescontoCupom tipoDesconto;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valorDesconto; // Ex: 10.00 (10% ou R$ 10,00)

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valorMinimoPedido = BigDecimal.ZERO;

    @Column(nullable = false)
    private LocalDateTime dataInicio;

    @Column(nullable = false)
    private LocalDateTime dataValidade;

    @Column(nullable = false)
    private Integer limiteUsos; // Quantidade máxima total de utilizações

    @Column(nullable = false)
    private Integer usosAtuais = 0;

    @Column(nullable = false)
    private Boolean ativo = true;

    public Cupom(String codigo, String descricao, TipoDescontoCupom tipoDesconto, BigDecimal valorDesconto,
                 BigDecimal valorMinimoPedido, LocalDateTime dataInicio, LocalDateTime dataValidade, Integer limiteUsos) {
        this.codigo = codigo.toUpperCase().trim();
        this.descricao = descricao;
        this.tipoDesconto = tipoDesconto;
        this.valorDesconto = valorDesconto;
        this.valorMinimoPedido = valorMinimoPedido != null ? valorMinimoPedido : BigDecimal.ZERO;
        this.dataInicio = dataInicio;
        this.dataValidade = dataValidade;
        this.limiteUsos = limiteUsos;
        this.usosAtuais = 0;
        this.ativo = true;
    }

    // --- Métodos de Negócio ---

    public boolean isValidoParaUso(BigDecimal valorPedido) {
        LocalDateTime agora = LocalDateTime.now();
        return Boolean.TRUE.equals(this.ativo)
                && !agora.isBefore(this.dataInicio)
                && !agora.isAfter(this.dataValidade)
                && this.usosAtuais < this.limiteUsos
                && valorPedido.compareTo(this.valorMinimoPedido) >= 0;
    }

    public BigDecimal calcularDesconto(BigDecimal valorPedido) {
        if (!isValidoParaUso(valorPedido)) {
            throw new IllegalStateException("Cupom inválido, expirado, esgotado ou pedido abaixo do valor mínimo.");
        }

        if (this.tipoDesconto == TipoDescontoCupom.PERCENTUAL) {
            return valorPedido.multiply(this.valorDesconto)
                    .divide(new BigDecimal("100"), 2, RoundingMode.HALF_UP);
        }

        // Garante que o desconto fixo não seja maior que o valor total do pedido
        return this.valorDesconto.min(valorPedido);
    }

    public void registrarUso() {
        if (this.usosAtuais >= this.limiteUsos) {
            throw new IllegalStateException("Limite de usos do cupom atingido.");
        }
        this.usosAtuais++;
        if (this.usosAtuais >= this.limiteUsos) {
            this.ativo = false;
        }
    }
}