package com.projeto.banco.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.projeto.banco.model.Cliente;
import com.projeto.banco.model.ClienteFisica;
import com.projeto.banco.model.ClienteEmpresa;
import com.projeto.banco.repository.ClienteRepository;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente cadastrar(String tipo, String nome, String senha, String email, String endereco, String contato, String documento) {
        if (!"PJ".equalsIgnoreCase(tipo) && !"PF".equalsIgnoreCase(tipo)) {
            throw erro("Tipo de cliente invalido. Use PF ou PJ.");
        }
        validarDocumentoUnico(documento);

        Cliente cliente = "PJ".equalsIgnoreCase(tipo)
                ? new ClienteEmpresa(nome, documento, endereco, email, contato, senha)
                : new ClienteFisica(nome, documento, endereco, email, contato, senha);

        return clienteRepository.save(cliente);
    }

    public List<Cliente> listar() {
        return clienteRepository.findAll();
    }

    public Cliente buscarPorId(Long id) {
        return clienteRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "Cliente " + id + " nao encontrado."));
    }

    // ----- regras de validacao -----

    private void validarDocumentoUnico(String documento) {
        if (clienteRepository.existsByDocumento(documento)) {
            throw erro("Ja existe um cliente com o documento " + documento + ".");
        }
    }

    private ResponseStatusException erro(String mensagem) {
        return new ResponseStatusException(HttpStatus.BAD_REQUEST, mensagem);
    }
}
