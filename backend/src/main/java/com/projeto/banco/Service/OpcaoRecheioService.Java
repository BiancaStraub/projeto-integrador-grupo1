
package com.projeto.banco.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.projeto.banco.model.OpcaoRecheio;
import com.projeto.banco.Repository.OpcaoRecheioRepository;

@Service
public class OpcaoRecheioService {

    private final OpcaoRecheioRepository repository;

    public OpcaoRecheioService(OpcaoRecheioRepository repository) {
        this.repository = repository;
    }

    public OpcaoRecheio salvar(OpcaoRecheio recheio) {
        return repository.save(recheio);
    }

    public List<OpcaoRecheio> listarTodos() {
        return repository.findAll();
    }

    public OpcaoRecheio buscarPorId(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Recheio não encontrado"));
    }

    public OpcaoRecheio atualizar(Long id, OpcaoRecheio recheio) {
        OpcaoRecheio existente = buscarPorId(id);

        existente.setNome(recheio.getNome());
        existente.setPrecoAdicional(recheio.getPrecoAdicional());
        existente.setDisponivel(recheio.getDisponivel());
        existente.setDescricao(recheio.getDescricao());
        existente.setCategoria(recheio.getCategoria());
        existente.setAlergenicos(recheio.getAlergenicos());
        existente.setPermitePersonalizacao(recheio.getPermitePersonalizacao());
        existente.setMaximoIngredientesExtras(recheio.getMaximoIngredientesExtras());
        existente.setIngredientesDisponiveis(recheio.getIngredientesDisponiveis());

        return repository.save(existente);
    }

    public void excluir(Long id) {
        OpcaoRecheio recheio = buscarPorId(id);
        repository.delete(recheio);
    }
}
