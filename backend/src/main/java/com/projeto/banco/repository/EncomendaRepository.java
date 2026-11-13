package com.projeto.banco.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.banco.model.Encomenda;

public interface EncomendaRepository extends JpaRepository<Encomenda, Long> { }
