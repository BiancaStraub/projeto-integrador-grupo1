package com.projeto.banco.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.projeto.banco.model.Cartao;
import com.projeto.banco.Repository.CartaoRepository;

@Service
public class CartaoService {

    private final CartaoRepository repository;

    public CartaoService(CartaoRepository repository) {
        this.repository = repository;
    }

    public Cartao cadastrar(Cartao cartao) {
        return repository.save(cartao);
    }

    public List<Cartao> listar() {
        return repository.findAll();
    }

    public Optional<Cartao> buscarPorId(Long id) {
        return repository.findById(id);
    }
}