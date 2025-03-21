export interface Product {
    nom_produit: string;
    description?: string;
    forme: string;
    dosage: string;
    prix: number;
    image_url: string;
    restriction?: string;
    conservation: string;
    id_categorie: number;
    createdAt?: string; // Optionally add for tracking creation date
    updatedAt?: string; // Optionally add for tracking update date
  }
  