package com.projeto.banco.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.banco.model.Cupom;
import com.projeto.banco.service.CupomService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/cupons")
@RequiredArgsConstructor
public class CupomController {

    private final CupomService cupomService;

    // POST /api/cupons - Cadastra um novo cupom
    @PostMapping
    public ResponseEntity<Cupom> criar(@RequestBody Cupom cupom) {
        return ResponseEntity.status(HttpStatus.CREATED).body(cupomService.criar(cupom));
    }

    // GET /api/cupons - Lista todos os cupons
    @GetMapping
    public ResponseEntity<List<Cupom>> listarTodos() {
        return ResponseEntity.ok(cupomService.listarTodos());
    }

    // GET /api/cupons/disponiveis - Lista apenas cupons ativos, válidos e com usos restantes
    @GetMapping("/disponiveis")
    public ResponseEntity<List<Cupom>> listarDisponiveis() {
        return ResponseEntity.ok(cupomService.listarDisponiveis());
    }

    // GET /api/cupons/{id} - Busca cupom por ID
    @GetMapping("/{id}")
    public ResponseEntity<Cupom> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(cupomService.buscarPorId(id));
    }

    // GET /api/cupons/codigo/{codigo} - Busca cupom pelo código promocional
    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<Cupom> buscarPorCodigo(@PathVariable String codigo) {
        return ResponseEntity.ok(cupomService.buscarPorCodigo(codigo));
    }

    // GET /api/cupons/validar?codigo=PADARIA10&valorPedido=80.00 - Simula desconto sem consumir o cupom
    @GetMapping("/validar")
    public ResponseEntity> validarESimular(
            @RequestParam String codigo,
            @RequestParam BigDecimal valorPedido) {
        BigDecimal desconto = cupomService.simularDesconto(codigo, valorPedido);
        BigDecimal valorFinal = valorPedido.subtract(desconto);
        return ResponseEntity.ok(Map.of(
                "valorOriginal", valorPedido,
                "desconto", desconto,
                "valorFinal", valorFinal
        ));
    }

    // POST /api/cupons/aplicar?codigo=PADARIA10&valorPedido=80.00 - Aplica o cupom e incrementa uso
    @PostMapping("/aplicar")
    public ResponseEntity> aplicarCupom(
            @RequestParam String codigo,
            @RequestParam BigDecimal valorPedido) {
        BigDecimal desconto = cupomService.aplicarCupom(codigo, valorPedido);
        BigDecimal valorFinal = valorPedido.subtract(desconto);
        return ResponseEntity.ok(Map.of(
                "valorOriginal", valorPedido,
                "descontoAplicado", desconto,
                "valorFinal", valorFinal
        ));
    }

    // PUT /api/cupons/{id} - Atualiza os dados de um cupom
    @PutMapping("/{id}")
    public ResponseEntity<Cupom> atualizar(@PathVariable Long id, @RequestBody Cupom cupom) {
        return ResponseEntity.ok(cupomService.atualizar(id, cupom));
    }

    // PATCH /api/cupons/{id}/status?ativo=false - Ativa ou desativa um cupom
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> alterarStatus(@PathVariable Long id, @RequestParam boolean ativo) {
        cupomService.alterarStatus(id, ativo);
        return ResponseEntity.noContent().build();
    }

    // DELETE /api/cupons/{id} - Exclui um cupom
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        cupomService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}