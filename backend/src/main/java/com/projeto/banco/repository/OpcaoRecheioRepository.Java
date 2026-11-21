
package com.projeto.banco.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projeto.banco.model.OpcaoRecheio;

@Repository
public interface OpcaoRecheioRepository extends JpaRepository<OpcaoRecheio, Long> {

}
