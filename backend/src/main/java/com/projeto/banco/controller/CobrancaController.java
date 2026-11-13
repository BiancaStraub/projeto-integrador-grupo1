package com.projeto.banco.controller;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.projeto.banco.model.Cobranca;
import com.projeto.banco.repository.CobrancaRepository;
import com.projeto.banco.repository.EncomendaRepository;
import com.projeto.banco.util.ApiValidation;

@RestController
@RequestMapping("/api/cobrancas")
public class CobrancaController {
    private static final String AVISO = "Demonstração: nenhum pagamento foi processado e não há integração com gateway.";

    private final CobrancaRepository cobrancas;
    private final EncomendaRepository encomendas;

    public CobrancaController(CobrancaRepository cobrancas, EncomendaRepository encomendas) {
        this.cobrancas = cobrancas;
        this.encomendas = encomendas;
    }

    @GetMapping
    public List<CobrancaResponse> listar() {
        return cobrancas.findAll().stream().map(CobrancaResponse::from).toList();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public CobrancaResponse criar(@RequestBody CobrancaRequest request) {
        if (request == null) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Corpo JSON obrigatório");
        String metodo = ApiValidation.requiredText(request.metodo(), "metodo");
        ApiValidation.requireLength(metodo, 40, "metodo");
        if (request.valor() == null || request.valor().signum() < 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "valor deve ser zero ou maior");
        }
        if (request.encomendaId() != null && !encomendas.existsById(request.encomendaId())) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Encomenda não encontrada");
        }
        return CobrancaResponse.from(cobrancas.save(new Cobranca(request.encomendaId(), request.valor(), metodo)));
    }

    // Apenas dados não sensíveis: dados de cartão (PAN/CVV/validade) são rejeitados como propriedades desconhecidas.
    public record CobrancaRequest(
            @JsonAlias("orderId") Long encomendaId,
            @JsonAlias("amount") BigDecimal valor,
            @JsonAlias({"formaPagamento", "paymentMethod"}) String metodo) { }

    public record CobrancaResponse(Long id, Long encomendaId, BigDecimal valor, String metodo,
            String status, java.time.Instant criadaEm, boolean demonstracao, String aviso) {
        static CobrancaResponse from(Cobranca cobranca) {
            return new CobrancaResponse(cobranca.getId(), cobranca.getEncomendaId(), cobranca.getValor(),
                    cobranca.getMetodo(), cobranca.getStatus(), cobranca.getCriadaEm(), true, AVISO);
        }
    }
}
