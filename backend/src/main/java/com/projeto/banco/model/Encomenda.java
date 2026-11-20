package com.projeto.banco.model;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity(name = "tb_encomenda")
@Getter
@Setter
@NoArgsConstructor
public class Encomenda {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "numero_pedido", nullable = false, unique = true, length = 30)
    private String numeroPedido;

    @Column(name = "nome_cliente", nullable = false)
    private String nomeCliente;

    @Column(nullable = false)
    private String endereco;

    @Column(name = "cpf_cnpj", nullable = false, length = 18)
    private String cpfCnpj;

    @Column(nullable = false)
    private LocalDateTime dataPedido = LocalDateTime.now();

    @Column(nullable = false)
    private LocalDateTime dataEntregaPrevista;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 25)
    private StatusEncomenda status = StatusEncomenda.PENDENTE;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal valorTotal = BigDecimal.ZERO;

    @Column(length = 500)
    private String observacoesGerais;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "filial_id")
    private Filial filial;

    @OneToMany(mappedBy = "encomenda", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ItemEncomenda> itens = new ArrayList<>();

    @OneToMany(mappedBy = "encomenda", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("dataEnvio ASC")
    private List<Mensagem> historicoMensagens = new ArrayList<>();

    public Encomenda(String numeroPedido, String nomeCliente, String endereco, String cpfCnpj,
                     LocalDateTime dataEntregaPrevista, Cliente cliente, Filial filial) {
        this.numeroPedido = numeroPedido;
        this.nomeCliente = nomeCliente;
        this.endereco = endereco;
        this.cpfCnpj = cpfCnpj;
        this.dataPedido = LocalDateTime.now();
        this.dataEntregaPrevista = dataEntregaPrevista;
        this.cliente = cliente;
        this.filial = filial;
        this.status = StatusEncomenda.PENDENTE;
    }

    public void adicionarItem(ItemEncomenda item) {
        item.setEncomenda(this);
        item.calcularSubtotal();
        this.itens.add(item);
        recalcularValorTotal();
    }

    public void removerItem(ItemEncomenda item) {
        this.itens.remove(item);
        item.setEncomenda(null);
        recalcularValorTotal();
    }

    public void recalcularValorTotal() {
        this.valorTotal = this.itens.stream()
                .map(ItemEncomenda::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    public void enviarMensagem(String remetente, TipoRemetente tipo, String texto) {
        Mensagem novaMensagem = new Mensagem(this, remetente, tipo, texto);
        this.historicoMensagens.add(novaMensagem);
    }
}