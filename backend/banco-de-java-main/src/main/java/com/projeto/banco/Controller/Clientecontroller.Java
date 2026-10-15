package com.git.cliente.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.git.banco.model.Cliente;
import com.git.banco.service.ClienteService;

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
                             @RequestParam(required = false) String email) {
        return clienteService.cadastrar(nome, senha, email,endereco,contato);
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
