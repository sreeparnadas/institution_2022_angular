import { Component, OnInit } from '@angular/core';
import {MenuItem} from "primeng/api";
import {CommonService} from "../../services/common.service";

@Component({
  selector: 'app-course-content',
  templateUrl: './course-content.component.html',
  styleUrls: ['./course-content.component.scss']
})
export class CourseContentComponent implements OnInit {
  items: MenuItem[] = [
    {
      label: 'Microsoft Excel',
      icon:'pi pi-fw pi-file-excel',
      items: [
        {
          label: 'Finance & Accounting',
          icon:'pi pi-fw pi-circle-on',
          items: [
            {
              label: 'Bookmark',
              icon:'pi pi-fw pi-bookmark',
              routerLink: "./CourseContentExcel"
            },
            {
              label: 'Video',
              icon:'pi pi-fw pi-video'
            }
          ]
        },
        {
          label: 'Accounting & MIS',
          icon:'pi pi-fw pi-circle-on',
          items: [
            {
              label: 'Bookmark',
              icon:'pi pi-fw pi-bookmark',
              routerLink: "./CourseContentExcel"
            }
          ]
        },
        {
          label: 'Basic Excel',
          icon:'pi pi-fw pi-slack'
        },
        {
          label: 'For Insurance Agents',
          icon:'pi pi-fw  pi-slack'
        }
      ]
    },
    {
      label: 'Programming Language',
      icon:'pi pi-fw pi-pencil',
      items: [
        {
          label: 'Left',
          icon:'pi pi-fw pi-align-left'
        },
        {
          label: 'Right',
          icon:'pi pi-fw pi-align-right'
        },
        {
          label: 'Center',
          icon:'pi pi-fw pi-align-center'
        },
        {
          label: 'Justify',
          icon:'pi pi-fw pi-align-justify'
        }
      ]
    },
    {
      label: 'Web Designing',
      icon:'pi pi-fw pi-user',
      disabled: true,
      items: [
        {
          label: 'New',
          icon:'pi pi-fw pi-user-plus',

        },
        {
          label: 'Delete',
          icon:'pi pi-fw pi-user-minus',
        },
        {
          label: 'Search',
          icon:'pi pi-fw pi-users',
          items: [
            {
              label: 'Filter',
              icon:'pi pi-fw pi-filter',
              items: [
                {
                  label: 'Print',
                  icon:'pi pi-fw pi-print'
                }
              ]
            },
            {
              icon:'pi pi-fw pi-bars',
              label: 'List'
            }
          ]
        }
      ]
    },
    {
      label: 'Photoshop & Photography',
      icon:'pi pi-fw pi-calendar',
      disabled: true,
      items: [
        {
          label: 'Edit',
          icon:'pi pi-fw pi-pencil',
          items: [
            {
              label: 'Save',
              icon:'pi pi-fw pi-calendar-plus'
            },
            {
              label: 'Delete',
              icon:'pi pi-fw pi-calendar-minus'
            }
          ]
        },
        {
          label: 'Archieve',
          icon:'pi pi-fw pi-calendar-times',
          items: [
            {
              label: 'Remove',
              icon:'pi pi-fw pi-calendar-minus'
            }
          ]
        }
      ]
    }
  ];
  constructor(public commonService: CommonService) { }

  ngOnInit(): void {

  }

}
