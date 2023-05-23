import { Compteur } from "./compteur";
import { Kpi } from "./kpi";

export class Formule {
    idFormule: number;
    nomFormule: string;
    descFormule: string;
    kpis: Kpi;
    compteurs: Compteur;
  }
    