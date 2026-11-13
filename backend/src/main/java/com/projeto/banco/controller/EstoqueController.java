package com.projeto.banco.controller;

import java.math.BigDecimal;
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
import com.projeto.banco.model.Estoque;
import com.projeto.banco.repository.EstoqueRepository;
import com.projeto.banco.util.ApiValidation;

@RestController
@RequestMapping("/api/estoque")
public class EstoqueController {
    private final EstoqueRepository estoque;

    public EstoqueController(EstoqueRepository estoque) {
        this.estoque = estoque;
    }

    @GetMapping
    public List<EstoqueResponse> listar() {
        return estoque.findAll().stream().map(EstoqueResponse::from).toList();
    }

    @GetMapping("/{id}")
    public EstoqueResponse buscar(@PathVariable Long id) {
        return estoque.findById(id).map(EstoqueResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Produto não encontrado"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public EstoqueResponse criar(@RequestBody EstoqueRequest request) {
        if (request == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Corpo JSON obrigatório");
        String nome = ApiValidation.requiredText(request.nome(), "nome");
        String categoria = ApiValidation.requiredText(request.categoria(), "categoria");
        String descricao = ApiValidation.requiredText(request.descricao(), "descricao");
        ApiValidation.requireLength(nome, 160, "nome");
        ApiValidation.requireLength(categoria, 100, "categoria");
        ApiValidation.requireLength(descricao, 1000, "descricao");
        if (request.quantidade() == null || request.quantidade() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "quantidade deve ser zero ou maior");
        }
        if (request.preco() == null || request.preco().signum() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "preco deve ser zero ou maior");
        }
        return EstoqueResponse.from(estoque.save(new Estoque(nome, categoria, request.quantidade(),
                request.preco(), descricao)));
    }

    public record EstoqueRequest(
            @JsonAlias({"nome_produto", "nomeProduto", "produto"}) String nome,
            String categoria,
            Integer quantidade,
            BigDecimal preco,
            String descricao) { }

    public record EstoqueResponse(Long id, String nome, String categoria, Integer quantidade,
            BigDecimal preco, String descricao) {
        static EstoqueResponse from(Estoque produto) {
            return new EstoqueResponse(produto.getId(), produto.getNome(), produto.getCategoria(),
                    produto.getQuantidade(), produto.getPreco(), produto.getDescricao());
        }
    }
}
