
package com.projeto.banco.Controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projeto.banco.Service.FilialService;
import com.projeto.banco.model.Filial;

@RestController
@RequestMapping("/api/filiais")
public class FilialController {

    private final FilialService filialService;

    public FilialController(FilialService filialService) {
        this.filialService = filialService;
    }

    @PostMapping
    public Filial cadastrar(@RequestBody Filial filial) {
        return filialService.cadastrar(filial);
    }

    @GetMapping
    public List<Filial> listar() {
        return filialService.listar();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Filial> buscar(@PathVariable Long id) {
        return filialService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
