import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '../service/patient.service';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { PictureComponent } from '../picture/picture.component';
@Component({
  selector: 'app-patient-table',
  standalone: true,
  imports: [
    CommonModule,
    DataTablesModule,
    MatIconModule,
    MatProgressBarModule,
    NgFor,
    NgIf,
  ],
  templateUrl: './patient-table.component.html',
  styleUrl: './patient-table.component.scss'
})
export class PatientTableComponent implements AfterViewInit, OnDestroy, OnInit{
  constructor
    (
      private _patientService: PatientService,
      private _changeDetectorRef: ChangeDetectorRef,
      private dialog: MatDialog,
    ) { }

    dtOptions: Config = {};
    dtTrigger: Subject<any> = new Subject();
    @ViewChild(DataTableDirective)
    dtElement!: DataTableDirective
    languageUrl = 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json';
    dataRow: any[] = [];
    isLoading: boolean = false;

    ngOnInit() {
      this.loadTable();
    }

    showPicture(imgObject: any): void {
      this.dialog
        .open(PictureComponent, {
          width: 'auto',
          height: 'auto',
          disableClose: true,
          data: {
            imgSelected: imgObject,
          },
          panelClass: 'picture-dialog',
        })
        .afterClosed()
        .subscribe(() => {

        });
    }

    pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };

    loadTable(): void {
  
      const that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing: true,
        language: {
          url: this.languageUrl,
        },
        ajax: (dataTablesParameters: any, callback) => {
          that._patientService
            .getPage(dataTablesParameters)
            .subscribe((resp: any) => {
              console.log(resp);
              
              this.dataRow = resp.data;
              this.pages.current_page = resp.meta.currentPage;
              this.pages.last_page = resp.meta.totalPages;
              this.pages.per_page = resp.meta.itemsPerPage;
              if (resp.meta.currentPage > 1) {
                this.pages.begin =
                resp.meta.itemsPerPage * resp.meta.currentPage - 1;
              } else {
                this.pages.begin = 0;
              }
  
              callback({
                recordsTotal: resp.meta.totalItems,
                recordsFiltered: resp.meta.totalItems,
                data: [],
              });
              this._changeDetectorRef.markForCheck();
            });
        }
      };
  
    }
  
    ngAfterViewInit(): void {
      this.dtTrigger.next(null);
    }
  
    ngOnDestroy(): void {
      // Do not forget to unsubscribe the event
      this.dtTrigger.unsubscribe();
    }
  
    rerender(): void {
      if (this.dtElement.dtInstance) {
        this.dtElement.dtInstance.then((dtInstance) => {
          dtInstance.ajax.reload();
        });
      } else {
        // If DataTables instance is not ready, reinitialize
        this.dtTrigger.next(null);
      }
    }
}