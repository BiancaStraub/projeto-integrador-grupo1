package com.projeto.banco;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class StorefrontApiTests {
    @Autowired
    private MockMvc mvc;

    @Test
    void filiaisAceitamJsonEPersistem() throws Exception {
        mvc.perform(post("/api/filiais").contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"nome":"Loja Centro","endereco":"Rua Um, 10","contato":"(11) 1111-1111"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.nome").value("Loja Centro"));
        mvc.perform(get("/api/filiais"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].endereco").value("Rua Um, 10"));
    }

    @Test
    void catalogoEstoqueAceitaProdutoJson() throws Exception {
        mvc.perform(post("/api/estoque").contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"nome":"Bolo de chocolate","categoria":"Bolos","quantidade":8,
                                 "preco":45.00,"descricao":"Bolo médio"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.nome").value("Bolo de chocolate"))
                .andExpect(jsonPath("$.quantidade").value(8));
        mvc.perform(get("/api/estoque"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].preco").value(45.0));
    }

    @Test
    void encomendasPersistemItensTotalEStatusEPodemSerConsultadas() throws Exception {
        String response = mvc.perform(post("/api/encomendas").contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"nome":"Ana","endereco":"Rua Dois, 20","contato":"ana@example.test",
                                 "itens":[{"nome":"Bolo","quantidade":2,"precoUnitario":30.00}],
                                 "total":60.00,"status":"RECEBIDA"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.itens[0].nome").value("Bolo"))
                .andExpect(jsonPath("$.total").value(60.0))
                .andExpect(jsonPath("$.status").value("RECEBIDA"))
                .andReturn().getResponse().getContentAsString();
        String id = com.jayway.jsonpath.JsonPath.read(response, "$.id").toString();
        mvc.perform(get("/api/encomendas/{id}", id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nome").value("Ana"))
                .andExpect(jsonPath("$.itens[0].quantidade").value(2));
    }

    @Test
    void mensagensAceitamEListamJson() throws Exception {
        mvc.perform(post("/api/mensagens").contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"nome":"João","email":"joao@example.test","contato":"11999990000",
                                 "texto":"Gostaria de saber os sabores."}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.texto").value("Gostaria de saber os sabores."));
        mvc.perform(get("/api/mensagens"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].nome").value("João"));
    }

    @Test
    void cobrancasSaoDemonstracaoESemDadosDeCartao() throws Exception {
        mvc.perform(post("/api/cobrancas").contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"valor":25.50,"metodo":"PIX"}
                                """))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.demonstracao").value(true))
                .andExpect(jsonPath("$.status").value("DEMONSTRACAO_NAO_PROCESSADA"))
                .andExpect(jsonPath("$.aviso").isNotEmpty());
        mvc.perform(get("/api/cobrancas"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].demonstracao").value(true));

        mvc.perform(post("/api/cobrancas").contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"valor":25.50,"metodo":"MOCK_CARTAO","numeroCartao":"4111111111111111","cvv":"123"}
                                """))
                .andExpect(status().isBadRequest());
    }
}
