package com.projeto.banco.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projeto.banco.Repository.CampanhaSazonalRepository;
import com.projeto.banco.Repository.ProdutoRepository;
import com.projeto.banco.model.CampanhaSazonal;
import com.projeto.banco.model.Produto;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CampanhaSazonalService {

    private final CampanhaSazonalRepository campanhaRepository;
    private final ProdutoRepository produtoRepository;

    @Transactional
    public CampanhaSazonal criar(CampanhaSazonal campanha) {
        validarCampanha(campanha);
        campanha.setAtiva(true);
        return campanhaRepository.save(campanha);
    }

    @Transactional(readOnly = true)
    public List<CampanhaSazonal> listarTodas() {
        return campanhaRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<CampanhaSazonal> listarVigentes() {
        return campanhaRepository.findCampanhasVigentes(LocalDate.now());
    }

    @Transactional(readOnly = true)
    public CampanhaSazonal buscarPorId(Long id) {
        return campanhaRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Campanha sazonal não encontrada com ID: " + id));
    }

    @Transactional
    public CampanhaSazonal atualizar(Long id, CampanhaSazonal dadosAtualizados) {
        CampanhaSazonal existente = buscarPorId(id);
        validarCampanha(dadosAtualizados);

        existente.setNome(dadosAtualizados.getNome());
        existente.setDescricao(dadosAtualizados.getDescricao());
        existente.setDataInicio(dadosAtualizados.getDataInicio());
        existente.setDataFim(dadosAtualizados.getDataFim());
        existente.setPercentualDesconto(dadosAtualizados.getPercentualDesconto());
        if (dadosAtualizados.getAtiva() != null) {
            existente.setAtiva(dadosAtualizados.getAtiva());
        }

        return campanhaRepository.save(existente);
    }

    @Transactional
    public void alterarStatus(Long id, boolean ativa) {
        CampanhaSazonal campanha = buscarPorId(id);
        campanha.setAtiva(ativa);
        campanhaRepository.save(campanha);
    }

    @Transactional
    public CampanhaSazonal vincularProduto(Long campanhaId, Long produtoId) {
        CampanhaSazonal campanha = buscarPorId(campanhaId);
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com ID: " + produtoId));

        produto.vincularCampanha(campanha);
        produtoRepository.save(produto);
        return campanha;
    }

    @Transactional
    public CampanhaSazonal desvincularProduto(Long campanhaId, Long produtoId) {
        CampanhaSazonal campanha = buscarPorId(campanhaId);
        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new EntityNotFoundException("Produto não encontrado com ID: " + produtoId));

        produto.desvincularCampanha(campanha);
        produtoRepository.save(produto);
        return campanha;
    }

    @Transactional
    public void deletar(Long id) {
        CampanhaSazonal campanha = buscarPorId(id);
        // Remove o vínculo dos produtos antes de excluir a campanha
        campanha.getProdutos().forEach(produto -> produto.getCampanhasSazonais().remove(campanha));
        campanhaRepository.delete(campanha);
    }

    private void validarCampanha(CampanhaSazonal campanha) {
        if (campanha.getDataInicio() == null || campanha.getDataFim() == null) {
            throw new IllegalArgumentException("As datas de início e fim da campanha são obrigatórias.");
        }
        if (campanha.getDataFim().isBefore(campanha.getDataInicio())) {
            throw new IllegalArgumentException("A data de término não pode ser anterior à data de início.");
        }
        if (campanha.getPercentualDesconto() != null &&
                (campanha.getPercentualDesconto().compareTo(BigDecimal.ZERO) < 0 ||
                 campanha.getPercentualDesconto().compareTo(new BigDecimal("100")) > 0)) {
            throw new IllegalArgumentException("O percentual de desconto deve estar entre 0 e 100.");
        }
    }
}