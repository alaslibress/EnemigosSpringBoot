package dam.saruman.entity;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "enemigos")
public class Enemigo {
    @Id

    private String id;

    @Indexed(unique = true)
    private String nombre;

    private String pais;

    private String afiliacion;

    public Enemigo() {
    }

    public Enemigo(String afiliacion, String pais, String nombre, String id) {
        this.afiliacion = afiliacion;
        this.pais = pais;
        this.nombre = nombre;
        this.id = id;
    }

    public String getAfiliacion() {
        return afiliacion;
    }

    public void setAfiliacion(String afiliacion) {
        this.afiliacion = afiliacion;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    @Override
    public String toString() {
        return "Enemigos" +
                "id='" + id + '\'' +
                ", nombre='" + nombre + '\'' +
                ", pais='" + pais + '\'' +
                ", afiliacion='" + afiliacion + '\'' +
                '}';
    }
}
