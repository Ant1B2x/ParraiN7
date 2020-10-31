-- password is 'secure'
INSERT INTO users (email, password, firstname, lastname, "isGodfather", "isAdmin")
VALUES ('mohamed.moudjeb@etu.toulouse-inp.fr', '$2a$10$PXGGlh1ifPVnLFbIT/dgNeYCu8rOqOkbIOMex.9bustBv33Dy8/pq',
        'Mohamed', 'Moudjeb', 'false', 'false'),
       ('yvan.leduc@etu.toulouse-inp.fr', '$2a$10$PXGGlh1ifPVnLFbIT/dgNeYCu8rOqOkbIOMex.9bustBv33Dy8/pq', 'Yvan',
        'Le Duc', 'true', 'false'),
       ('antoine.bedex@etu.toulouse-inp.fr', '$2a$10$PXGGlh1ifPVnLFbIT/dgNeYCu8rOqOkbIOMex.9bustBv33Dy8/pq', 'Antoine',
        'Bédex', 'true', 'false'),
       ('esteban.baichoo@etu.toulouse-inp.fr', '$2a$10$PXGGlh1ifPVnLFbIT/dgNeYCu8rOqOkbIOMex.9bustBv33Dy8/pq',
        'Esteban', 'Baichoo', 'true', 'false');
