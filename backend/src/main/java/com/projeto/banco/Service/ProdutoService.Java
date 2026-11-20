
package com.projeto.banco.Service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projeto.banco.model.Produto;
import com.projeto.banco.model.Filial;
import com.projeto.banco.Repository.ProdutoRepository;
import com.projeto.banco.Repository.FilialRepository;

@Service
public class ProdutoService {

    private final ProdutoRepository produtoRepository;
    private final FilialRepository filialRepository;

    public ProdutoService(
            ProdutoRepository produtoRepository,
            FilialRepository filialRepository) {

        this.produtoRepository = produtoRepository;
        this.filialRepository = filialRepository;
    }

    // Cadastrar produto
    public Produto cadastrar(Produto produto) {
        return produtoRepository.save(produto);
    }

    // Listar todos os produtos
    public List<Produto> listar() {
        return produtoRepository.findAll();
    }

    // Buscar produto por ID
    public Produto buscarPorId(Long id) {
        return produtoRepository.findById(id)
                .orElseThrow(() ->
                    new IllegalArgumentException(
                        "Produto não encontrado."
                    ));
    }

    // Atualizar produto
    public Produto atualizar(Long id, Produto dados) {

        Produto produto = buscarPorId(id);

        produto.setNomeProduto(dados.getNomeProduto());
        produto.setCategoria(dados.getCategoria());
        produto.setPreco(dados.getPreco());
        produto.setUnidadeMedida(dados.getUnidadeMedida());
        produto.setDescricao(dados.getDescricao());

        return produtoRepository.save(produto);
    }

    // Excluir produto
    public void excluir(Long id) {

        Produto produto = buscarPorId(id);

        produtoRepository.delete(produto);
    }

    // Adicionar estoque em uma filial
    @Transactional
    public Produto adicionarEstoque(
            Long produtoId,
            Long filialId,
            int quantidade,
            int estoqueMinimo) {

        Produto produto = buscarPorId(produtoId);

        Filial filial = filialRepository.findById(filialId)
                .orElseThrow(() ->
                    new IllegalArgumentException(
                        "Filial não encontrada."
                    ));

        produto.adicionarEstoque(
            filial,
            quantidade,
            estoqueMinimo
        );

        return produtoRepository.save(produto);
    }

    // Baixar estoque de uma filial
    @Transactional
    public Produto baixarEstoque(
            Long produtoId,
            Long filialId,
            int quantidade) {

        Produto produto = buscarPorId(produtoId);

        Filial filial = filialRepository.findById(filialId)
                .orElseThrow(() ->
                    new IllegalArgumentException(
                        "Filial não encontrada."
                    ));

        produto.baixarEstoque(filial, quantidade);

        return produtoRepository.save(produto);
    }

    // Listar produtos disponíveis em uma filial
    @Transactional(readOnly = true)
    public List<Produto> listarDisponiveisPorFilial(Long filialId) {

        Filial filial = filialRepository.findById(filialId)
                .orElseThrow(() ->
                    new IllegalArgumentException(
                        "Filial não encontrada."
                    ));

        return produtoRepository.findAll().stream()
                .filter(produto ->
                    produto.getEstoquesPorFilial().stream()
                        .anyMatch(estoque ->
                            estoque.getFilial().getId()
                                .equals(filial.getId())
                            && estoque.getDisponivelNaFilial()
                        )
                )
                .toList();
    }

    // Listar produtos que precisam de reposição
    @Transactional(readOnly = true)
    public List<Produto> listarParaReposicao(Long filialId) {

        Filial filial = filialRepository.findById(filialId)
                .orElseThrow(() ->
                    new IllegalArgumentException(
                        "Filial não encontrada."
                    ));

        return produtoRepository.findAll().stream()
                .filter(produto -> produto.precisaReposicao(filial))
                .toList();
    }
}
