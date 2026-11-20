package com.projeto.banco.Controller;

import java.util.List;

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
    public String cadastrar(
            @RequestParam String pedido,
            @RequestParam String remetente,
            @RequestParam String texto,
            @RequestParam String data_envio) {

        return mensagemService.cadastrar(
                pedido, remetente, texto, data_envio);
    }

    @GetMapping
    public List<Mensagem> listar() {
        return mensagemService.listar();
    }

    @GetMapping("/{id}")
    public Mensagem buscar(@PathVariable Long id) {
        return mensagemService.buscarPorId(id);
    }
}