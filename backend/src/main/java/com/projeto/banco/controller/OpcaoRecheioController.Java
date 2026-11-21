
package com.projeto.banco.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.projeto.banco.model.OpcaoRecheio;
import com.projeto.banco.Service.OpcaoRecheioService;

@RestController
@RequestMapping("/opcoes-recheio")
public class OpcaoRecheioController {

    private final OpcaoRecheioService service;

    public OpcaoRecheioController(OpcaoRecheioService service) {
        this.service = service;
    }

    @PostMapping
    public OpcaoRecheio cadastrar(@RequestBody OpcaoRecheio recheio) {
        return service.salvar(recheio);
    }

    @GetMapping
    public List<OpcaoRecheio> listarTodos() {
        return service.listarTodos();
    }

    @GetMapping("/{id}")
    public OpcaoRecheio buscarPorId(@PathVariable Long id) {
        return service.buscarPorId(id);
    }

    @PutMapping("/{id}")
    public OpcaoRecheio atualizar(
            @PathVariable Long id,
            @RequestBody OpcaoRecheio recheio) {
        return service.atualizar(id, recheio);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        service.excluir(id);
    }
}
