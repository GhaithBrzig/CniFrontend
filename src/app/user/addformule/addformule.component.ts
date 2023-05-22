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
  selectedKpi: any;
  selectedCompteur: any;
  toshow = '';
  currentvalue = '';
  formules: Formule[] = [];
  kpis: Kpi[] = [];

  compteurs:Compteur[]=[];

  constructor(
    private formuleService: FormuleService,
    private compteurService: CompteurService,
    private kpiService: KpiService
  ) {}

  ngOnInit(): void {
    this.kpiService.getKpis().subscribe(
      (kpis) => {
        this.kpis = kpis;
        console.log('KPIs:', this.kpis);
      },
      (error) => {
        console.error('Error fetching kpis', error);
      }
    );
    this.compteurService.getCompteurs().subscribe(
      (compteurs) => {
        this.compteurs = compteurs;
        console.log('Compteurs:', this.compteurs);
      },
      (error) => {
        console.error('Error fetching kpis', error);
      }
    );
    this.formuleService.getAllFormules().subscribe(
      (formules) => {
        this.formules = formules;
      },
      (error) => {
        console.error('Error fetching formules', error);
      }
    );
    this.kpiService.getKpis().subscribe(
      (kpis) => {
        this.kpis = kpis;
      },
      (error) => {
        console.error('Error fetching kpis', error);
      }
    );

  }
  fetchKpisForFormules(): void {
    const kpiIds = this.formules.map((formule) => formule.kpis.idk);
    this.kpiService.getKpiById(kpiIds).subscribe(
      (kpis) => {
        this.kpis = kpis;
      },
      (error) => {
        console.error('Error fetching kpis', error);
      }
    );
  }
  

  addFormule(): void {
    this.formuleService.addFormule(this.formule).subscribe(
      (response) => {
        // Handle successful response
        console.log('Formula added successfully', response);
        // Reset formule object or perform any other necessary operations
        this.formule = new Formule();
      },
      (error) => {
        // Handle error response
        console.error('Error adding formula', error);
      }
    );
  }

  test() {
    alert('L"opération est ajoutée');
  }
}
