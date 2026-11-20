package com.projeto.banco.controller;

import java.util.List;

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

import com.projeto.banco.model.CampanhaSazonal;
import com.projeto.banco.service.CampanhaSazonalService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/campanhas")
@RequiredArgsConstructor
public class CampanhaSazonalController {

    private final CampanhaSazonalService campanhaService;

    // POST /api/campanhas - Cria uma nova campanha sazonal
    @PostMapping
    public ResponseEntity<CampanhaSazonal> criar(@RequestBody CampanhaSazonal campanha) {
        CampanhaSazonal criada = campanhaService.criar(campanha);
        return ResponseEntity.status(HttpStatus.CREATED).body(criada);
    }

    // GET /api/campanhas - Lista todas as campanhas cadastradas
    @GetMapping
    public ResponseEntity<List<CampanhaSazonal>> listarTodas() {
        return ResponseEntity.ok(campanhaService.listarTodas());
    }

    // GET /api/campanhas/vigentes - Lista apenas campanhas ativas na data atual
    @GetMapping("/vigentes")
    public ResponseEntity<List<CampanhaSazonal>> listarVigentes() {
        return ResponseEntity.ok(campanhaService.listarVigentes());
    }

    // GET /api/campanhas/{id} - Busca uma campanha pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<CampanhaSazonal> buscarPorId(@PathVariable Long id) {
        return ResponseEntity.ok(campanhaService.buscarPorId(id));
    }

    // PUT /api/campanhas/{id} - Atualiza os dados de uma campanha
    @PutMapping("/{id}")
    public ResponseEntity<CampanhaSazonal> atualizar(@PathVariable Long id, @RequestBody CampanhaSazonal campanha) {
        return ResponseEntity.ok(campanhaService.atualizar(id, campanha));
    }

    // PATCH /api/campanhas/{id}/status?ativa=false - Ativa ou desativa a campanha
    @PatchMapping("/{id}/status")
    public ResponseEntity<Void> alterarStatus(@PathVariable Long id, @RequestParam boolean ativa) {
        campanhaService.alterarStatus(id, ativa);
        return ResponseEntity.noContent().build();
    }

    // POST /api/campanhas/{campanhaId}/produtos/{produtoId} - Vincula um produto à campanha
    @PostMapping("/{campanhaId}/produtos/{produtoId}")
    public ResponseEntity<CampanhaSazonal> vincularProduto(
            @PathVariable Long campanhaId,
            @PathVariable Long produtoId) {
        return ResponseEntity.ok(campanhaService.vincularProduto(campanhaId, produtoId));
    }

    // DELETE /api/campanhas/{campanhaId}/produtos/{produtoId} - Remove um produto da campanha
    @DeleteMapping("/{campanhaId}/produtos/{produtoId}")
    public ResponseEntity<CampanhaSazonal> desvincularProduto(
            @PathVariable Long campanhaId,
            @PathVariable Long produtoId) {
        return ResponseEntity.ok(campanhaService.desvincularProduto(campanhaId, produtoId));
    }

    // DELETE /api/campanhas/{id} - Exclui a campanha
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        campanhaService.deletar(id);
        return ResponseEntity.noContent().build();
    }
}