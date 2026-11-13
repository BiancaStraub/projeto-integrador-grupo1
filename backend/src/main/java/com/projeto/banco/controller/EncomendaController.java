package com.projeto.banco.controller;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.projeto.banco.model.Encomenda;
import com.projeto.banco.model.ItemEncomenda;
import com.projeto.banco.repository.EncomendaRepository;
import com.projeto.banco.util.ApiValidation;

@RestController
@RequestMapping("/api/encomendas")
public class EncomendaController {
    private final EncomendaRepository encomendas;

    public EncomendaController(EncomendaRepository encomendas) {
        this.encomendas = encomendas;
    }

    @GetMapping
    public List<EncomendaResponse> listar() {
        return encomendas.findAll().stream().map(EncomendaResponse::from).toList();
    }

    @GetMapping("/{id}")
    public EncomendaResponse buscar(@PathVariable Long id) {
        return encomendas.findById(id).map(EncomendaResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Encomenda não encontrada"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EncomendaResponse criar(@RequestBody EncomendaRequest request) {
        if (request == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Corpo JSON obrigatório");
        String nome = ApiValidation.requiredText(request.nome(), "nome");
        String endereco = ApiValidation.requiredText(request.endereco(), "endereco");
        String contato = ApiValidation.requiredText(request.contato(), "contato");
        if (request.itens() == null || request.itens().isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "A encomenda precisa de ao menos um item");
        }
        ApiValidation.requireLength(nome, 160, "nome");
        ApiValidation.requireLength(endereco, 300, "endereco");
        ApiValidation.requireLength(contato, 120, "contato");

        List<ItemEncomenda> itens = request.itens().stream().map(item -> {
            String itemNome = ApiValidation.requiredText(item.nome(), "itens.nome");
            ApiValidation.requireLength(itemNome, 160, "itens.nome");
            if (item.quantidade() == null || item.quantidade() <= 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "itens.quantidade deve ser maior que zero");
            }
            if (item.precoUnitario() == null || item.precoUnitario().signum() < 0) {
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "itens.precoUnitario deve ser zero ou maior");
            }
            return new ItemEncomenda(itemNome, item.quantidade(), item.precoUnitario());
        }).toList();

        BigDecimal totalCalculado = request.itens().stream()
                .map(item -> item.precoUnitario().multiply(BigDecimal.valueOf(item.quantidade())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
        BigDecimal total = request.total() == null ? totalCalculado : request.total();
        if (total.signum() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "total deve ser zero ou maior");
        }
        String status = request.status() == null || request.status().isBlank()
                ? "RECEBIDA" : request.status().trim();
        ApiValidation.requireLength(status, 40, "status");
        return EncomendaResponse.from(encomendas.save(new Encomenda(nome, endereco, contato, itens,
                total.setScale(2, RoundingMode.HALF_UP), status)));
    }

    public record EncomendaRequest(
            @JsonAlias({"nome_cliente", "nomeCliente"}) String nome,
            String endereco,
            String contato,
            List<ItemRequest> itens,
            BigDecimal total,
            String status) { }

    public record ItemRequest(
            @JsonAlias({"produto", "nomeProduto"}) String nome,
            Integer quantidade,
            @JsonAlias("preco") BigDecimal precoUnitario) { }

    public record ItemResponse(String nome, Integer quantidade, BigDecimal precoUnitario) {
        static ItemResponse from(ItemEncomenda item) {
            return new ItemResponse(item.getNome(), item.getQuantidade(), item.getPrecoUnitario());
        }
    }

    public record EncomendaResponse(Long id, String nome, String endereco, String contato,
            List<ItemResponse> itens, BigDecimal total, String status, java.time.Instant criadaEm) {
        static EncomendaResponse from(Encomenda encomenda) {
            return new EncomendaResponse(encomenda.getId(), encomenda.getNome(), encomenda.getEndereco(),
                    encomenda.getContato(), encomenda.getItens().stream().map(ItemResponse::from).toList(),
                    encomenda.getTotal(), encomenda.getStatus(), encomenda.getCriadaEm());
        }
    }
}
