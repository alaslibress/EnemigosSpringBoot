package dam.saruman.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

//Este es el controlador que hace que al entrar a la ruta de la api te devuelva el index.html
@Controller
public class HomeController {
    @RequestMapping("/")
    public String index() {
        return "index.html";
    }
}
