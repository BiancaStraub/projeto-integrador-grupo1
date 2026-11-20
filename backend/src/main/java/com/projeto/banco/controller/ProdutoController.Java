
package com.projeto.banco.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projeto.banco.model.Produto;
import com.projeto.banco.Service.ProdutoService;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    private final ProdutoService produtoService;

    public ProdutoController(ProdutoService produtoService) {
        this.produtoService = produtoService;
    }

    // Cadastrar produto
    @PostMapping
    public ResponseEntity<Produto> cadastrar(
            @RequestBody Produto produto) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(produtoService.cadastrar(produto));
    }

    // Listar todos os produtos
    @GetMapping
    public ResponseEntity<List<Produto>> listar() {
        return ResponseEntity.ok(produtoService.listar());
    }

    // Buscar produto por ID
    @GetMapping("/{id}")
    public ResponseEntity<Produto> buscarPorId(
            @PathVariable Long id) {

        return ResponseEntity.ok(
            produtoService.buscarPorId(id)
        );
    }

    // Atualizar produto
    @PutMapping("/{id}")
    public ResponseEntity<Produto> atualizar(
            @PathVariable Long id,
            @RequestBody Produto produto) {

        return ResponseEntity.ok(
            produtoService.atualizar(id, produto)
        );
    }

    // Excluir produto
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(
            @PathVariable Long id) {

        produtoService.excluir(id);

        return ResponseEntity.noContent().build();
    }

    // Adicionar estoque em uma filial
    @PostMapping("/{produtoId}/estoque/{filialId}/adicionar")
    public ResponseEntity<Produto> adicionarEstoque(
            @PathVariable Long produtoId,
            @PathVariable Long filialId,
            @RequestParam int quantidade,
            @RequestParam int estoqueMinimo) {

        return ResponseEntity.ok(
            produtoService.adicionarEstoque(
                produtoId,
                filialId,
                quantidade,
                estoqueMinimo
            )
        );
    }

    // Baixar estoque de uma filial
    @PostMapping("/{produtoId}/estoque/{filialId}/baixar")
    public ResponseEntity<Produto> baixarEstoque(
            @PathVariable Long produtoId,
            @PathVariable Long filialId,
            @RequestParam int quantidade) {

        return ResponseEntity.ok(
            produtoService.baixarEstoque(
                produtoId,
                filialId,
                quantidade
            )
        );
    }

    // Consultar produtos disponíveis em uma filial
    @GetMapping("/filial/{filialId}/disponiveis")
    public ResponseEntity<List<Produto>> listarDisponiveis(
            @PathVariable Long filialId) {

        return ResponseEntity.ok(
            produtoService.listarDisponiveisPorFilial(filialId)
        );
    }

    // Consultar produtos que precisam de reposição
    @GetMapping("/filial/{filialId}/reposicao")
    public ResponseEntity<List<Produto>> listarParaReposicao(
            @PathVariable Long filialId) {

        return ResponseEntity.ok(
            produtoService.listarParaReposicao(filialId)
        );
    }
}
