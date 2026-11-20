package com.projeto.banco.Controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.projeto.banco.Service.CartaoService;
import com.projeto.banco.model.Cartao;

@RestController
@RequestMapping("/api/cartoes")
public class CartaoController {

    private final CartaoService cartaoService;

    public CartaoController(CartaoService cartaoService) {
        this.cartaoService = cartaoService;
    }

    @PostMapping
    public String cadastrar(
            @RequestParam String tipo_cartao,
            @RequestParam String valor,
            @RequestParam String nome,
            @RequestParam String cvc,
            @RequestParam String validade,
            @RequestParam String numero_cartao) {

        return cartaoService.cadastrar(
                tipo_cartao, valor, nome,
                cvc, validade, numero_cartao);
    }

    @GetMapping
    public List<Cartao> listar() {
        return cartaoService.listar();
    }

    @GetMapping("/{id}")
    public Cartao buscar(@PathVariable Long id) {
        return cartaoService.buscarPorId(id);
    }
}