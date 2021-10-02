export interface Produit {
    _id: string;
    designation: string;
    couleurs: string[];
    tailles: string[];
    description: string;
    quantite: number;
    disponible: boolean;
    images: string[];
    category: string;
}