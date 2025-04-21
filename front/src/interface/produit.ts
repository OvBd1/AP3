export interface Product {
    id_produit: number
    nom_produit: string;
    description?: string;
    forme: string;
    dosage: string;
    prix: number;
    image_url: string;
    restriction?: string;
    conservation: string;
    quantite: number;
    id_categorie: number;
    createdAt?: string;
    updatedAt?: string;
}