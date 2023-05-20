export class Etudiant {
    idEtudiant: number;
    prenom: string;
    nom: string;
    dateNaissance: Date;
    sexe: string;
    op: Option;
    email: string;
    username: string;
    password: string;
}

export enum Option {
    TWIN = "TWIN",
    BI = "BI",
    SLEAM = "SLEAM"
}
