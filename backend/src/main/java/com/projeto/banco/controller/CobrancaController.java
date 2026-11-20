package com.projeto.banco.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.projeto.banco.Service.CobrancaService;
import com.projeto.banco.model.Cobranca;

@RestController
@RequestMapping("/api/cobrancas")
public class CobrancaController {

    private final CobrancaService cobrancaService;

    public CobrancaController(CobrancaService cobrancaService) {
        this.cobrancaService = cobrancaService;
    }

    @PostMapping
    public Cobranca cadastrar(@RequestBody Cobranca cobranca) {
        return cobrancaService.cadastrar(cobranca);
    }

    @GetMapping
    public List<Cobranca> listar() {
        return cobrancaService.listar();
    }

    @GetMapping("/{id}")
    public Cobranca buscar(@PathVariable Long id) {
        return cobrancaService.buscarPorId(id);
    }
}