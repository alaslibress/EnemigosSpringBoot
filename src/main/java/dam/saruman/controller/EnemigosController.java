package dam.saruman.controller;

import dam.saruman.entity.Enemigo;
import dam.saruman.service.EnemigoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;

//Controlador REST de soringboot que realiza las operaciones de los ENEMIGOS

@RestController //Define la clase como un controlador REST, devuelve respuestas json
@RequestMapping("/api") //Establece el prefijo por defecto para todo el controlador.
public class EnemigosController {

    @Autowired
    private EnemigoService enemigoService;

    //Endpoints

    //Obtiene la lista de todos los enemigos (GET)
    @GetMapping("/enemigo")
    public List<Enemigo> getEnemigos() {
        return enemigoService.obtenerTodos(); //Return List<Enemigo>
    }

    //Crea enemigos  (POST)
    @PostMapping("/enemigo")
    public Enemigo crearEnemigo(@RequestBody Enemigo enemigo) {
        return enemigoService.guardar(enemigo);
    } //Return Enemigo creado

    //Actualiza un enemigo que ya existe (PUT)
    @PutMapping("/enemigo/{id}")
    //Esta bloque coge el enemigo según el id y devuelve un json que devuelve a objeto, edita el objeto y luego lo devuelve a json y lo actualiza
    public ResponseEntity<Enemigo> actualizarEnemigo(@PathVariable Long id, @RequestBody Enemigo enemigo) {
        //Optional por si el enemigo existe o no
        Optional<Enemigo> enemigoActualizado = enemigoService.actualizar(id, enemigo); //Actualiza el enemigo anterior por uno nuevo creado en base al otro
        return enemigoActualizado //Cadena de montaje que devuelve un error u otro en función de si existe o no el enemigo
                .map(ResponseEntity::ok) //200 + enemigo
                .orElse(ResponseEntity.notFound().build()); //error 404 no existe enemigo
    } //Return Enemigo actualizado o 404 si no existe

    //Elimina un enemigo (DELETE)
    @DeleteMapping("/enemigo/{id}")
    public ResponseEntity<Void> eliminarEnemigo(@PathVariable Long id) {
        if (enemigoService.eliminar(id)) {
            return ResponseEntity.noContent().build(); //204 eliminado correctamente
        }
        return ResponseEntity.notFound().build(); //404 no existía
    } //Return 204 si se elimina correctamente o 404 si no existe
}

