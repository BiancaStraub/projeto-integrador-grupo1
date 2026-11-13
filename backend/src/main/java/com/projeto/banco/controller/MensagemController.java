package com.projeto.banco.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.projeto.banco.model.Mensagem;
import com.projeto.banco.repository.MensagemRepository;
import com.projeto.banco.util.ApiValidation;

@RestController
@RequestMapping("/api/mensagens")
public class MensagemController {
    private final MensagemRepository mensagens;

    public MensagemController(MensagemRepository mensagens) {
        this.mensagens = mensagens;
    }

    @GetMapping
    public List<MensagemResponse> listar() {
        return mensagens.findAll().stream().map(MensagemResponse::from).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MensagemResponse criar(@RequestBody MensagemRequest request) {
        if (request == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Corpo JSON obrigatório");
        String nome = ApiValidation.requiredText(request.nome(), "nome");
        String texto = ApiValidation.requiredText(request.texto(), "texto");
        ApiValidation.requireLength(nome, 160, "nome");
        ApiValidation.requireLength(texto, 4000, "texto");
        if (request.email() != null) ApiValidation.requireLength(request.email(), 160, "email");
        if (request.contato() != null) ApiValidation.requireLength(request.contato(), 120, "contato");
        return MensagemResponse.from(mensagens.save(new Mensagem(nome, request.email(), request.contato(), texto)));
    }

    public record MensagemRequest(
            @JsonAlias({"remetente", "name"}) String nome,
            String email,
            String contato,
            @JsonAlias({"mensagem", "conteudo"}) String texto) { }

    public record MensagemResponse(Long id, String nome, String email, String contato,
            String texto, java.time.Instant criadaEm) {
        static MensagemResponse from(Mensagem mensagem) {
            return new MensagemResponse(mensagem.getId(), mensagem.getNome(), mensagem.getEmail(),
                    mensagem.getContato(), mensagem.getTexto(), mensagem.getCriadaEm());
        }
    }
}
