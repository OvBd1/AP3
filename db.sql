CREATE DATABASE `db_slam_ap`;
USE db_slam_ap;

CREATE TABLE `categorie` (
  `id_categorie` int NOT NULL AUTO_INCREMENT,
  `lib_court` varchar(50) DEFAULT NULL,
  `lib_long` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_categorie`)
) ;

CREATE TABLE `commande` (
  `id_commande` int NOT NULL AUTO_INCREMENT,
  `date_commande` timestamp NULL DEFAULT NULL,
  `status` enum('en attente','validée','expédiée','annulée') DEFAULT NULL,
  `total` decimal(10,0) DEFAULT NULL,
  `id_user` int DEFAULT NULL,
  PRIMARY KEY (`id_commande`),
  KEY `id_user` (`id_user`),
  CONSTRAINT `commande_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ;

CREATE TABLE `commande_produit` (
  `id_produit` int NOT NULL,
  `id_commande` int NOT NULL,
  `quantite` int NOT NULL,
  PRIMARY KEY (`id_produit`,`id_commande`),
  KEY `id_commande` (`id_commande`),
  CONSTRAINT `commande_produit_ibfk_1` FOREIGN KEY (`id_commande`) REFERENCES `commande` (`id_commande`),
  CONSTRAINT `commande_produit_ibfk_2` FOREIGN KEY (`id_produit`) REFERENCES `produit` (`id_produit`)
) ;

CREATE TABLE `log_admin` (
  `id_log_admin` int NOT NULL AUTO_INCREMENT,
  `action_type` enum('CREATE','READ','UPDATE','DELETE') DEFAULT NULL,
  `id_user` int NOT NULL,
  `id_admin` int DEFAULT NULL,
  PRIMARY KEY (`id_log_admin`),
  KEY `log_admin_index_0` (`id_user`),
  CONSTRAINT `log_admin_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`)
) ;

CREATE TABLE `produit` (
  `id_produit` int NOT NULL AUTO_INCREMENT,
  `nom_produit` varchar(50) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `forme` enum('orale','dermique','injectable','médicamenteuse') DEFAULT NULL,
  `dosage` varchar(50) DEFAULT NULL,
  `prix` decimal(10,0) DEFAULT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `restriction` varchar(255) DEFAULT NULL,
  `conservation` varchar(255) DEFAULT NULL,
  `quantite` int NOT NULL DEFAULT '0',
  `id_categorie` int DEFAULT NULL,
  PRIMARY KEY (`id_produit`),
  UNIQUE KEY `id_produit` (`id_produit`),
  KEY `produit_ibfk_1` (`id_categorie`),
  CONSTRAINT `produit_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`)
) ;

CREATE TABLE `user` (
  `id_user` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  `prenom` varchar(50) DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `mdp` varchar(255) DEFAULT NULL,
  `num_tel` varchar(15) DEFAULT NULL,
  `date_naissance` timestamp NULL DEFAULT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id_user`)
) ;

INSERT INTO produit (nom_produit, description, forme, dosage, prix, image_url, restriction, conservation, quantite, id_categorie) VALUES
('Paracétamol 500mg', 'Antalgique utilisé contre douleurs et fièvre', 'orale', '500 mg', 200, 'https://www.pharmashopi.com/media/catalog/product/cache/0150f7f90c4350f46d5248c6d93952d1/b/i/biogaran-paracetamol-500mg-gelules-1410368649.png', 'Ne pas dépasser 3g par jour', 'Température ambiante', 150, 1),
('Ibuprofène 200mg', 'Anti-inflammatoire non stéroïdien', 'orale', '200 mg', 250, 'https://www.pharmashopi.com/media/catalog/product/cache/e786a2ca762f3511f55e5fe0681ebb31/i/b/ibruprofene-200mg-mylan-1373125033.png', 'Déconseillé en cas d’ulcère', 'À l’abri de l’humidité', 100, 1),
('Onctose', 'Traitement des inflammations cutanées', 'dermique', '1%', 550, 'https://www.pharmashopi.com/media/mf_webp/png/media/catalog/product/cache/8fb9ccd96a3a4426c64d43d5c86136cb/o/n/onctose-creme-1372664110.webp', 'Usage local uniquement', 'Garder au frais après ouverture', 75, 2),
('fervex', 'Vaccin contre la grippe saisonnière', 'injectable', '0.5 ml', 1500, 'https://www.pharmashopi.com/media/catalog/product/cache/8fb9ccd96a3a4426c64d43d5c86136cb/F/e/Fervex-Rhume-adulte-UPSA-16-comprimes-pellicules-3400930.png', 'Administré par un professionnel', 'Entre 2°C et 8°C', 50, 3),
('Phytoxil', 'Soulage les toux sèches ou grasses', 'orale', '100 ml', 800, 'https://www.pharmashopi.com/media/catalog/product/cache/0150f7f90c4350f46d5248c6d93952d1/P/e/Petit-Chene-Toux-seche-grasse-Les-3-Chenes-flacon-de-140ml-3525722056854.png', 'Déconseillé aux enfants < 6 ans', 'Température ambiante', 200, 1),
('Econazole', 'Traitement local des mycoses', 'dermique', '2%', 600, 'https://moncoinsante.com/mcs/80261-home_default/econazole-mylan-1-creme-30g-traitements-des-mycoses-et-affections-cutanees-dues-a-des-champignons.jpg', 'Ne pas avaler', 'À conserver au sec', 90, 2),
('Actrapid', 'Traitement du diabète type 1', 'injectable', '100 UI/ml', 3000, 'https://www.aversi.ge/image.php?path=uploads/matimg/2ebed99772c9e94d4e5b9de144f5fd22.png&width=260&height=', 'Sous contrôle médical', 'Réfrigérateur (2–8°C)', 40, 3),
('Gélules de magnésium', 'Supplément pour réduire la fatigue', 'orale', '300 mg', 450, 'https://www.dplantes.com/pub/media/catalog/product/m/a/magnesium-marin_1_.png', 'Respecter la dose journalière', 'À l’abri de la lumière', 180, 1),
('Initiv', 'Libération transdermique de médicament', 'dermique', '12 mcg/h', 2200, 'https://www.pharmashopi.com/media/catalog/product/cache/8fb9ccd96a3a4426c64d43d5c86136cb/I/n/Initiv-Patch-dos-anti-douleur-Sanofi-boite-de-3-patchs-3664798065787.png', 'Sur prescription', 'Température ambiante', 30, 4),
('Esoméprazole', 'Traitement des infections bactériennes', 'orale', '1g', 950, 'https://www.pharmashopi.com/media/mf_webp/jpg/media/catalog/product/cache/8fb9ccd96a3a4426c64d43d5c86136cb/E/s/EsOmeprazole-20-mg-Mylan-7-gelules-gastro-resistantes-34.webp', 'Respecter la durée du traitement', 'À conserver à l’abri de l’humidité', 120, 1);

INSERT INTO categorie (lib_court, lib_long) VALUES
('Douleurs', 'Médicaments contre douleurs, fièvre et céphalées'),
('Peau', 'Produits dermatologiques pour usage cutané'),
('Injectables', 'Vaccins et autres traitements par injection'),
('Spécifiques', 'Produits à usage particulier comme les patchs ou hormones');