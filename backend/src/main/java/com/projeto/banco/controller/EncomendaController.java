import org.springframework.web.bind.annotation.*;

import com.projeto.banco.Service.EncomendaService;
import com.projeto.banco.model.Encomenda;

@RestController
@RequestMapping("/api/encomendas")
public class EncomendaController {

    private final EncomendaService encomendaService;

    public EncomendaController(EncomendaService encomendaService) {
        this.encomendaService = encomendaService;
    }

    @PostMapping
    public String cadastrar(
            @RequestParam String numero_pedido,
            @RequestParam String nome_cliente,
            @RequestParam String endereco,
            @RequestParam String cpf) {

        return encomendaService.cadastrar(
                numero_pedido, nome_cliente, endereco, cpf);
    }

    @GetMapping
    public List<Encomenda> listar() {
        return encomendaService.listar();
    }

    @GetMapping("/{id}")
    public Encomenda buscar(@PathVariable Long id) {
        return encomendaService.buscarPorId(id);
    }
}