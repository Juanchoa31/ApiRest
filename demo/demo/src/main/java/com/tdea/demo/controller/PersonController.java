package com.tdea.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.tdea.demo.modelo.Person;
import com.tdea.demo.modelo.repository.PersonRepository;

import java.util.List;

@RestController
@RequestMapping("/api/person")
public class PersonController {

    @Autowired
    private PersonRepository repository;

    // Obtener todas las personas
    @GetMapping
    public List<Person> allPersons() {
        return repository.findAll();
    }

    // Buscar personas por nombre
    @GetMapping("/{name}")
    public List<Person> findByName(@PathVariable("name") String name) {
        return repository.findByName(name);
    }

    // Crear una nueva persona para digitar los datos
    @PostMapping
    public Person createPerson(@RequestBody Person person) {
        return repository.save(person);
    }

    // Actualizar persona por id
    @PutMapping("/{id}")
    public Person updatePerson(@PathVariable("id") Long id, @RequestBody Person person) {
        person.setId(id);
        return repository.save(person);
    }

    // Eliminar persona por id
    @DeleteMapping("/{id}")
    public void deletePerson(@PathVariable("id") Long id) {
        repository.deleteById(id);
    }
}
