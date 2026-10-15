package com.projeto.banco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.banco.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

}


