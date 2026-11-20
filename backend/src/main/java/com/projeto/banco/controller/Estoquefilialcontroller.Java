package com.projeto.banco.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.projeto.banco.Service.EstoqueService;
import com.projeto.banco.model.Estoque;

@RestController
@RequestMapping("/api/estoque")
public class EstoqueController {

    private final EstoqueService estoqueService;

    public EstoqueController(EstoqueService estoqueService) {
        this.estoqueService = estoqueService;
    }

    @PostMapping
    public String cadastrar(
            @RequestParam String nome_produto,
            @RequestParam String categoria,
            @RequestParam Integer quantidade,
            @RequestParam Double preco,
            @RequestParam String descricao) {

        return estoqueService.cadastrar(
                nome_produto, categoria, quantidade, preco, descricao);
    }

    @GetMapping
    public List<Estoque> listar() {
        return estoqueService.listar();
    }

    @GetMapping("/{id}")
    public Estoque buscar(@PathVariable Long id) {
        return estoqueService.buscarPorId(id);
    }
}