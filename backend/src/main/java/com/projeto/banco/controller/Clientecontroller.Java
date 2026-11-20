package com.projeto.banco.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.projeto.banco.Service.ClienteService;

@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    private final ClienteService clienteService;

    public ClienteController(ClienteService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public String cadastrar(@RequestParam String nome,
                           @RequestParam String senha,
                           @RequestParam String email,
                           @RequestParam String endereco,
                           @RequestParam String contato) {
        return clienteService.cadastrar(nome, senha, email, endereco, contato);
    }

    @GetMapping
    public List<String> listar() {
        return clienteService.listar();
    }

    @GetMapping("/{id}")
    public String buscar(@PathVariable Long id) {
        return clienteService.buscarPorId(id);
    }
}
