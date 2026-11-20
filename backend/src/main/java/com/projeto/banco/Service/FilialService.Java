package com.projeto.banco.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import com.projeto.banco.model.Filial;
import com.projeto.banco.Repository.FilialRepository;

@Service
public class FilialService {

    private final FilialRepository repository;

    public FilialService(FilialRepository repository) {
        this.repository = repository;
    }

    public Filial cadastrar(Filial filial) {
        return repository.save(filial);
    }

    public List<Filial> listar() {
        return repository.findAll();
    }

    public Optional<Filial> buscarPorId(Long id) {
        return repository.findById(id);
    }
}