import { INavData } from '@coreui/angular';



const userRole = localStorage.getItem('role');

export const navItems: INavData[] = [


  {
    name: 'Components',
    title: true
  },


  {
    name: 'Forms',
    url: '/forms',
    iconComponent: { name: 'cil-notes' },
    children: [
      {
        name: 'Upload CSV file',
        url: '/forms/uploadcsv'
      },
      {
        name: 'model deploiment',
        url: '/forms/predict'
      },
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    iconComponent: { name: 'cil-chart-pie' },
    children: [
      {
        name: 'Indiv Amount charts',
        url: '/charts'
      },
      {
        name: 'Recutement charts',
        url: '/charts/Recut'
      },
      {
        name: 'Mass Salariale charts',
        url: '/charts/Donut'
      },

    ]
  },



];




