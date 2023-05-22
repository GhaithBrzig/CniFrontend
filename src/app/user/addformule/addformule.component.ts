import { KpiService } from './../../core/services/kpi.service';
import { CompteurService } from './../../core/services/compteur.service';
import { Component, OnInit } from '@angular/core';
import { FormuleService } from '../../core/services/formul.service';
import { Formule } from 'src/app/core/model/formule';
import { Kpi } from 'src/app/core/model/kpi';
import { Compteur } from 'src/app/core/model/compteur';

@Component({
  selector: 'app-addformule',
  templateUrl: './addformule.component.html',
  styleUrls: ['./addformule.component.scss']
})
export class AddformuleComponent implements OnInit {
  formule: Formule = new Formule();
  selectedKpi: Kpi | null = null;
  selectedCompteur: Compteur | null = null;
  formuleInput: string = ''; // Declare the formuleInput property
  formules: Formule[] = [];
  kpis: Kpi[] = [];
  compteurs: Compteur[] = [];


  constructor(
    private formuleService: FormuleService,
    private compteurService: CompteurService,
    private kpiService: KpiService
  ) {}

  ngOnInit(): void {
    this.fetchKpis();
    this.fetchCompteurs();
    this.fetchAllFormules();
  }

  fetchKpis(): void {
    this.kpiService.getKpis().subscribe(
      (kpis) => {
        this.kpis = kpis;
        console.log('KPIs:', this.kpis);
      },
      (error) => {
        console.error('Error fetching kpis', error);
      }
    );
  }

  fetchCompteurs(): void {
    this.compteurService.getCompteurs().subscribe(
      (compteurs) => {
        this.compteurs = compteurs;
        console.log('Compteurs:', this.compteurs);
      },
      (error) => {
        console.error('Error fetching compteurs', error);
      }
    );
  }
  
  fetchAllFormules(): void {
    this.formuleService.getAllFormules().subscribe(
      (formules) => {
        this.formules = formules;
      },
      (error) => {
        console.error('Error fetching formules', error);
      }
    );
  }

  fetchKpisForFormules(): void {
    const kpiId = this.formule.kpis.idk;
    this.kpiService.getKpiById(kpiId).subscribe(
      (kpis) => {
        this.kpis = [kpis]; // Wrap the single Kpi object in an array
      },
      (error) => {
        console.error('Error fetching kpis', error);
      }
    );
  }
  getKpiName(kpi: Kpi): string {
    return kpi ? kpi.nomKpi : '';

  }
  
  
  

  addFormule(): void {
    if (!this.selectedKpi || !this.selectedCompteur || !this.formuleInput) {
      return; // Validation: Ensure required fields are selected/entered
    }
  
    const formuleData: Formule = new Formule();
    formuleData.nomFormule = this.formuleInput;
    formuleData.kpis = new Kpi();
    formuleData.kpis.nomKpi = this.selectedKpi.nomKpi;
    formuleData.compteurs = new Compteur();
    formuleData.compteurs.nomCompteur = this.selectedCompteur.nomCompteur;

  
    this.formuleService.addFormule(formuleData).subscribe(
      (response) => {
        console.log('Formula added successfully', response);
        // Reset form
        this.formuleInput = '';
        this.selectedKpi = null;
        this.selectedCompteur = null;
      },
      (error) => {
        console.error('Error adding formula', error);
      }
    );
  }
  

  test() {
    alert('L"opération est ajoutée');
  }
}
