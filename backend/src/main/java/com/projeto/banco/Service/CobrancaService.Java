package com.projeto.banco.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.projeto.banco.model.Cobranca;
import com.projeto.banco.Repository.CobrancaRepository;

@Service
public class CobrancaService {

    private final CobrancaRepository repository;

    public CobrancaService(CobrancaRepository repository) {
        this.repository = repository;
    }

    public Cobranca cadastrar(Cobranca cobranca) {
        return repository.save(cobranca);
    }

    public List<Cobranca> listar() {
        return repository.findAll();
    }

    public Cobranca buscarPorId(Long id) {
        return repository.findById(id).orElse(null); 
        // Ou você pode retornar Optional<Cobranca> e tratar no controller
    }
}