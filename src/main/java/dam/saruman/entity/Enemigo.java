package dam.saruman.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "enemigosestado")
public class Enemigo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Long id;

    @Column
    private String nombre;

    @Column
    private String pais;

    @Column
    private String afiliacion;

    public Enemigo() {
    }

    public Enemigo(String afiliacion, String pais, String nombre, Long id) {
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }
}
