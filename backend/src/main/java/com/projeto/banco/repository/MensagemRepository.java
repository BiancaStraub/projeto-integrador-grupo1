package com.projeto.banco.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.banco.model.Mensagem;

public interface MensagemRepository extends JpaRepository<Mensagem, Long> { }
