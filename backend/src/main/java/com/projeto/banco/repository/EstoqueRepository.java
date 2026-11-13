package com.projeto.banco.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.projeto.banco.model.Estoque;

public interface EstoqueRepository extends JpaRepository<Estoque, Long> { }
