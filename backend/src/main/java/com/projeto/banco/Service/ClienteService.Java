package com.projeto.banco.Service;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class ClienteService {

    public String cadastrar(String nome, String senha, String email, String endereco, String contato) {
        return "Cliente cadastrado: " + nome;
    }

    public List<String> listar() {
        return Collections.emptyList();
    }

    public String buscarPorId(Long id) {
        return "Cliente " + id;
    }
}
