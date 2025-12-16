package dam.saruman.repository;

import dam.saruman.entity.Enemigo;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

public interface EnemigoRepository extends MongoRepository<Enemigo, String> {

    //Buscamos por nombre
    List<Enemigo> findByNombre(String user_name);


}
