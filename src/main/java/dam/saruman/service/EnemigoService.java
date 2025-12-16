package dam.saruman.service;


import dam.saruman.entity.Enemigo;
import dam.saruman.repository.EnemigoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<Enemigo> obtenerPorId(String id) {
        return enemigoRepository.findById(id);
    }

    public Enemigo guardar(Enemigo enemigo) {
        return enemigoRepository.save(enemigo);
    }

    public Optional<Enemigo> actualizar(String id, Enemigo enemigo) {
        if (enemigoRepository.findById(id).isPresent()) {
            enemigo.setId(id);
            return Optional.of(enemigoRepository.save(enemigo));
        }
        return Optional.empty();
    }

    public boolean eliminar(String id) {
        if (enemigoRepository.findById(id).isPresent()) {
            enemigoRepository.deleteById(id);
            return true;
        }
        return false;
    }

    //Validaciones:

    //Comprobamos que el nombre sea único y no se repita
    public boolean existeNombre(String nombre) {
        List<Enemigo> encontrados = enemigoRepository.findByNombre(nombre); //Buscamos por nombre
        return !encontrados.isEmpty();
    }

    //Comprobamos que el nombre tenga mínimo 3 caracteres
    public String validarEnemigo(Enemigo enemigo) {
        if (enemigo.getNombre() == null || enemigo.getNombre().trim().length() < 3) {
            return "Ni tres letras tiene tu nombre...";
        }
        return null;
    }

    //Buscamos por nombre con este método
    public List<Enemigo> buscarPorNombre(String nombre) {
        return enemigoRepository.findByNombre(nombre);
    }
}
