package com.git.banco.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.git.banco.model.Cliente;
import com.git.banco.model.ClienteFisica;
import com.git.banco.model.ClienteEmpresa;
import com.git.banco.repository.ClienteRepository;

@Service
public class ClienteService {

    private final ClienteRepository clienteRepository;

    public ClienteService(ClienteRepository clienteRepository) {
        this.clienteRepository = clienteRepository;
    }

    public Cliente cadastrar(String nome, String senha, String email, String endereco, String contato, String documento) {
        validarDocumentoUnico(documento);

        Cliente cliente = tipo.equalsIgnoreCase("PJ")
                ? new Clienteempresa(nome, cnpj, endereco,  email,  contato,  senha)
                : new Clientefisica(nome, cpf, endereco,  email,  contato,  senha)

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
