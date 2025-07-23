import { CommonModule, NgFor, NgIf } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFileImage, faPen, faPlusSquare, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { PictureComponent } from '../picture/picture.component';
import { NurseService } from '../service/nurse.service';
import { FormComponent } from './form/form.component';
import { EditNurseComponent } from './edit-nurse/edit-nurse.component';
import { DeleteNurseComponent } from './delete-nurse/delete-nurse.component';


@Component({
  selector: 'app-nurse-table',
  standalone: true,
  imports: [
    CommonModule,
    DataTablesModule,
    NgFor,
    NgIf,
    FontAwesomeModule,
    MatIconModule
  ],
  templateUrl: './nurse-table.component.html',
  styleUrl: './nurse-table.component.scss'
})
export class NurseTableComponent implements AfterViewInit, OnDestroy, OnInit{
  constructor
  (
    private _nurseService: NurseService,
    private _changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
  ) { }

  faFileImage = faFileImage;
  faXmark = faXmark;
  faPlusSquare = faPlusSquare;
  faPen = faPen;
  faTrash = faTrash;

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
        that._nurseService
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
    this.loadTable();
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
    this.dialog.open(EditNurseComponent, {
      width: '800px',
      height: 'auto',
      disableClose: true,
      data: { id: id },
    });
  }

  deleteElement(id: number, firstName: string, lastName: string) {
    const dialogRef = this.dialog.open(DeleteNurseComponent, {
      width: '350px',
      disableClose: true,
      data: { 
        message: `คุณต้องการลบพยาบาลชื่อ ${firstName} ${lastName} หรือไม่`, 
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
