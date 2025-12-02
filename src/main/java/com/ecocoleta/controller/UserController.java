package com.ecocoleta.controller;

import com.ecocoleta.model.User;
import com.ecocoleta.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*") // Permite acesso do app Expo
public class UserController {

    private final UserRepository userRepository;

    @Value("${upload.path:uploads}")
    private String uploadPath;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public ResponseEntity<List<User>> list() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<User> create(
            @RequestParam("name") String name,
            @RequestParam("email") String email,
            @RequestParam(value = "photo", required = false) MultipartFile photo
    ) throws IOException {

        String photoUrl = null;

        if (photo != null && !photo.isEmpty()) {

            // Cria pasta se não existir
            Path uploadDir = Paths.get(uploadPath);
            if (!Files.exists(uploadDir)) {
                Files.createDirectories(uploadDir);
            }

            // Gera nome único
            String fileName = System.currentTimeMillis() + "_" + photo.getOriginalFilename();
            Path filePath = uploadDir.resolve(fileName);

            // Salva o arquivo
            Files.write(filePath, photo.getBytes(), StandardOpenOption.CREATE);

            // URL pública da imagem
            photoUrl = "/uploads/" + fileName;
        }

        User user = new User(name, email, photoUrl);
        userRepository.save(user);

        return ResponseEntity.ok(user);
    }
}
