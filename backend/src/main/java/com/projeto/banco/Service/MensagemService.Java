package com.projeto.banco.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.projeto.banco.model.Mensagem;
import com.projeto.banco.Repository.MensagemRepository;

@Service
public class MensagemService {

    private final MensagemRepository repository;

    public MensagemService(MensagemRepository repository) {
        this.repository = repository;
    }

    public Mensagem cadastrar(Mensagem mensagem) {
        return repository.save(mensagem);
    }

    public List<Mensagem> listar() {
        return repository.findAll();
    }

    public Optional<Mensagem> buscarPorId(Long id) {
        return repository.findById(id);
    }
}