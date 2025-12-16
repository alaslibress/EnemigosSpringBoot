package dam.saruman.service;


import dam.saruman.entity.Enemigo;
import dam.saruman.repository.EnemigoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//LOGICA DE NEGOCIO MANEJADA POR SERVICE

@Service
public class EnemigoService {
    @Autowired
    private EnemigoRepository enemigoRepository;

    public List<Enemigo> obtenerTodos() {
        List<Enemigo> enemigos = enemigoRepository.findAll();
        if (enemigos.isEmpty()) {
            System.out.println("Acho que esto ta to triste");
        } else {
            System.out.println("Esto va canela");
            enemigos.forEach(enemigo -> System.out.println(enemigo.getNombre()));
        }
        return enemigos;
    }

    public Enemigo guardar(Enemigo enemigo) {
        return enemigoRepository.save(enemigo);
    }

    public Optional<Enemigo> actualizar(Long id, Enemigo enemigo) {
        if (enemigoRepository.existsById(id)) {
            enemigo.setId(id);
            return Optional.of(enemigoRepository.save(enemigo));
        }
        return Optional.empty();
    }

    public boolean eliminar(Long id) {
        if (enemigoRepository.existsById(id)) {
            enemigoRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
