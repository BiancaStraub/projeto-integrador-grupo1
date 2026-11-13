package com.projeto.banco.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.banco.model.Filial;
import com.projeto.banco.repository.FilialRepository;
import com.projeto.banco.util.ApiValidation;

@RestController
@RequestMapping("/api/filiais")
public class FilialController {
    private final FilialRepository filiais;

    public FilialController(FilialRepository filiais) {
        this.filiais = filiais;
    }

    @GetMapping
    public List<FilialResponse> listar() {
        return filiais.findAll().stream().map(FilialResponse::from).toList();
    }

    @GetMapping("/{id}")
    public FilialResponse buscar(@PathVariable Long id) {
        return filiais.findById(id).map(FilialResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Filial não encontrada"));
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public FilialResponse criar(@RequestBody FilialRequest request) {
        if (request == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Corpo JSON obrigatório");
        Filial filial = filiais.save(new Filial(
                ApiValidation.requiredText(request.nome(), "nome"),
                ApiValidation.requiredText(request.endereco(), "endereco"),
                ApiValidation.requiredText(request.contato(), "contato")));
        return FilialResponse.from(filial);
    }

    public record FilialRequest(String nome, String endereco, String contato) { }

    public record FilialResponse(Long id, String nome, String endereco, String contato) {
        static FilialResponse from(Filial filial) {
            return new FilialResponse(filial.getId(), filial.getNome(), filial.getEndereco(), filial.getContato());
        }
    }
}
