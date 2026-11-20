
package com.projeto.banco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.banco.model.Produto;

@Repository
public interface ProdutoRepository
        extends JpaRepository<Produto, Long> {

}
