package com.projeto.banco.service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projeto.banco.Repository.CupomRepository;
import com.projeto.banco.model.Cupom;
import com.projeto.banco.model.TipoDescontoCupom;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CupomService {

    private final CupomRepository cupomRepository;

    @Transactional
    public Cupom criar(Cupom cupom) {
        cupom.setCodigo(cupom.getCodigo().toUpperCase().trim());

        if (cupomRepository.existsByCodigoIgnoreCase(cupom.getCodigo())) {
            throw new IllegalArgumentException("Já existe um cupom cadastrado com o código: " + cupom.getCodigo());
        }

        validarCupom(cupom);
        cupom.setUsosAtuais(0);
        cupom.setAtivo(true);
        return cupomRepository.save(cupom);
    }

    @Transactional(readOnly = true)
    public List<Cupom> listarTodos() {
        return cupomRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<Cupom> listarDisponiveis() {
        return cupomRepository.findCuponsDisponiveis(LocalDateTime.now());
    }

    @Transactional(readOnly = true)
    public Cupom buscarPorId(Long id) {
        return cupomRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Cupom não encontrado com ID: " + id));
    }

    @Transactional(readOnly = true)
    public Cupom buscarPorCodigo(String codigo) {
        return cupomRepository.findByCodigoIgnoreCase(codigo.trim())
                .orElseThrow(() -> new EntityNotFoundException("Cupom não encontrado com o código: " + codigo));
    }

    @Transactional(readOnly = true)
    public BigDecimal simularDesconto(String codigo, BigDecimal valorPedido) {
        Cupom cupom = buscarPorCodigo(codigo);
        return cupom.calcularDesconto(valorPedido);
    }

    @Transactional
    public BigDecimal aplicarCupom(String codigo, BigDecimal valorPedido) {
        Cupom cupom = buscarPorCodigo(codigo);
        BigDecimal desconto = cupom.calcularDesconto(valorPedido);
        cupom.registrarUso();
        cupomRepository.save(cupom);
        return desconto;
    }

    @Transactional
    public Cupom atualizar(Long id, Cupom dadosAtualizados) {
        Cupom existente = buscarPorId(id);
        validarCupom(dadosAtualizados);

        existente.setDescricao(dadosAtualizados.getDescricao());
        existente.setTipoDesconto(dadosAtualizados.getTipoDesconto());
        existente.setValorDesconto(dadosAtualizados.getValorDesconto());
        existente.setValorMinimoPedido(dadosAtualizados.getValorMinimoPedido());
        existente.setDataInicio(dadosAtualizados.getDataInicio());
        existente.setDataValidade(dadosAtualizados.getDataValidade());
        existente.setLimiteUsos(dadosAtualizados.getLimiteUsos());
        if (dadosAtualizados.getAtivo() != null) {
            existente.setAtivo(dadosAtualizados.getAtivo());
        }

        return cupomRepository.save(existente);
    }

    @Transactional
    public void alterarStatus(Long id, boolean ativo) {
        Cupom cupom = buscarPorId(id);
        cupom.setAtivo(ativo);
        cupomRepository.save(cupom);
    }

    @Transactional
    public void deletar(Long id) {
        Cupom cupom = buscarPorId(id);
        cupomRepository.delete(cupom);
    }

    private void validarCupom(Cupom cupom) {
        if (cupom.getDataValidade().isBefore(cupom.getDataInicio())) {
            throw new IllegalArgumentException("A data de validade não pode ser anterior à data de início.");
        }
        if (cupom.getValorDesconto() == null || cupom.getValorDesconto().compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("O valor do desconto deve ser maior que zero.");
        }
        if (cupom.getTipoDesconto() == TipoDescontoCupom.PERCENTUAL
                && cupom.getValorDesconto().compareTo(new BigDecimal("100")) > 0) {
            throw new IllegalArgumentException("O desconto percentual não pode ultrapassar 100%.");
        }
        if (cupom.getLimiteUsos() == null || cupom.getLimiteUsos() <= 0) {
            throw new IllegalArgumentException("O limite de usos deve ser maior que zero.");
        }
    }
}