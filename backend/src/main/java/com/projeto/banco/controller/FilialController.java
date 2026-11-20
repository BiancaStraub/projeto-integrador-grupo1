package com.projeto.banco.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.projeto.banco.Service.FilialService;
import com.projeto.banco.model.Filial;

@RestController
@RequestMapping("/api/filiais")
public class FilialController {

    private final FilialService filialService;

    public FilialController(FilialService filialService) {
        this.filialService = filialService;
    }

    @PostMapping
    public String cadastrar(
            @RequestParam String nome,
            @RequestParam String endereco,
            @RequestParam String contato) {

        return filialService.cadastrar(nome, endereco, contato);
    }

    @GetMapping
    public List<Filial> listar() {
        return filialService.listar();
    }

    @GetMapping("/{id}")
    public Filial buscar(@PathVariable Long id) {
        return filialService.buscarPorId(id);
    }
}