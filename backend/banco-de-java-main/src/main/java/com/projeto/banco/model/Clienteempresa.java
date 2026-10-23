package com.projeto.banco.model;

import jakarta.persistence.Column;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@DiscriminatorValue("PJ")
@Getter
@NoArgsConstructor
public class ClienteEmpresa extends Cliente {
    // This column shares the table with ClienteFisica rows, so it must be nullable.
    @Column
    private String cnpj;

    public ClienteEmpresa(String nome, String cnpj, String endereco, String email, String contato, String senha) {
        super(nome, cnpj, endereco, email, contato, senha);
        this.cnpj = cnpj;
    }
}
    


