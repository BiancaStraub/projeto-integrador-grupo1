package com.projeto.banco.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.projeto.banco.model.Cliente;
import com.projeto.banco.service.ClienteService;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public Cliente cadastrar(@RequestParam String nome,
                             @RequestParam String senha,
                             @RequestParam String email,
                             @RequestParam String endereco,
                             @RequestParam String contato,
                             @RequestParam String tipo,
                             @RequestParam String documento) {
        return clienteService.cadastrar(tipo, nome, senha, email, endereco, contato, documento);
    }

    @GetMapping
    public List<Cliente> listar() {
        return clienteService.listar();
    }

    @GetMapping("/{id}")
    public Cliente buscar(@PathVariable Long id) {
        return clienteService.buscarPorId(id);
    }
}
