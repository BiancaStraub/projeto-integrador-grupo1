package com.projeto.banco.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projeto.banco.Service.MensagemService;
import com.projeto.banco.model.Mensagem;

@RestController
@RequestMapping("/api/mensagens")
public class MensagemController {

    private final MensagemService mensagemService;

    public MensagemController(MensagemService mensagemService) {
        this.mensagemService = mensagemService;
    }

    @PostMapping
    public Mensagem cadastrar(@RequestBody Mensagem mensagem) {
        return mensagemService.cadastrar(mensagem);
    }

    @GetMapping
    public List<Mensagem> listar() {
        return mensagemService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mensagem> buscar(@PathVariable Long id) {
        return mensagemService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}