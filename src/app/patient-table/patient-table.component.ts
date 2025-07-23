import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { MatDialog } from '@angular/material/dialog';
import { PatientService } from '../service/patient.service';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { PictureComponent } from '../picture/picture.component';
import { faXmark, faFileImage, faPlusSquare, faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormComponent } from './form/form.component';
import { EditPatientComponent } from './edit-patient/edit-patient.component';
import { DeletePatientComponent } from './delete-patient/delete-patient.component';

@Component({
  selector: 'app-patient-table',
  standalone: true,
  imports: [
    CommonModule,
    DataTablesModule,
    NgFor,
    NgIf,
    FontAwesomeModule
  ],
  templateUrl: './patient-table.component.html',
  styleUrl: './patient-table.component.scss'
})
export class PatientTableComponent implements AfterViewInit, OnDestroy, OnInit {
  
  constructor(
    private _patientService: PatientService,
    private _changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog
  ) { }

  faFileImage = faFileImage;
  faXmark = faXmark;
  faPlusSquare = faPlusSquare;
  faPen = faPen;
  faTrash = faTrash;

  dtOptions: Config = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective) dtElement!: DataTableDirective;
  languageUrl = 'https://cdn.datatables.net/plug-ins/1.11.3/i18n/th.json';
  dataRow: any[] = [];
  isLoading: boolean = false;

  ngOnInit() {
    this.loadTable();
  }

  pages = { current_page: 1, last_page: 1, per_page: 10, begin: 0 };

  loadTable(): void {

    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing: true,
      ordering: false,
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
    this.dtTrigger.unsubscribe();
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance) => {
      dtInstance.ajax.reload();
    });
  }

  showPicture(imgObject: any): void {
    this.dialog.open(PictureComponent, {
      width: 'auto',
      height: 'auto',
      disableClose: true,
      data: { imgSelected: imgObject },
      panelClass: 'picture-dialog',
    });
  }

  addElement() {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '800px',
      height: 'auto',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => this.rerender());
  }

  editElement(id: number) {
    this.dialog.open(EditPatientComponent, {
      width: '800px',
      height: 'auto',
      disableClose: true,
      data: { id: id },
    });
  }

  deleteElement(id: number, firstName: string, lastName: string) {
    const dialogRef = this.dialog.open(DeletePatientComponent, {
      width: '350px',
      disableClose: true,
      data: { 
        message: `คุณต้องการลบผู้ป่วย ชื่อ ${firstName} ${lastName} หรือไม่`, 
        id: id,
        firstName: firstName,
        lastName: lastName
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Deleting item with ID:', id);
      } else {
        console.log('Deletion canceled');
      }
    });
  }
}
