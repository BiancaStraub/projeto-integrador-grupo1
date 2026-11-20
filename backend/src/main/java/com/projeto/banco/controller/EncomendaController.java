
package com.projeto.banco.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projeto.banco.Service.EncomendaService;
import com.projeto.banco.model.Encomenda;

@RestController
@RequestMapping("/api/encomendas")
public class EncomendaController {

    private final EncomendaService encomendaService;

    public EncomendaController(EncomendaService encomendaService) {
        this.encomendaService = encomendaService;
    }

    @PostMapping
    public Encomenda cadastrar(@RequestBody Encomenda encomenda) {
        return encomendaService.cadastrar(encomenda);
    }

    @GetMapping
    public List<Encomenda> listar() {
        return encomendaService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Encomenda> buscar(@PathVariable Long id) {
        return encomendaService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

