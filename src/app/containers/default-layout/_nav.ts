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
        name: '4G / LTE',
        url: '/forms/addFormule'
      },
      {
        name: 'Upload CSV file',
        url: '/forms/uploadcsv'
      },

    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    iconComponent: { name: 'cil-chart-pie' },
    children: [
      {
        name: 'line chart',
        url: '/charts'
      },
      {
        name: 'donut chart',
        url: '/charts/Donut'
      },

    ]
  },



];




