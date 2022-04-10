import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadService } from './services/upload.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public file: File;
  closed :Boolean= true;
  showScreen :Boolean= false;

  tableOneElements : any=[] ;
  tableTwoElements : any =[];
  tableThreeElements : any =[] ;
  headElements = ['Points','X', 'Y', 'Z'];
  @ViewChild('popup', {static: false}) popup: any;

  
  constructor(
    private modalService: NgbModal,
    private uploadService: UploadService
  ) {
  }
  
  ngOnInit() {

  }
  ngAfterViewInit(): void {
    this.openPopup(this.popup);
  }

  openPopup(content: any): void {
    this.modalService.open(content, {backdrop: 'static', centered: true});
  }
  
  upload(dismiss: any): void {

    if(this.file){
      this.uploadService.upload(this.file).subscribe((data)=>{
        console.log(data)

        if (data.success) {
          this.showScreen = true;
          for(let i =0 ; i < data.asset[0].X.length ;i++){
            this.tableOneElements[i]={
              x:data.asset[0].X[i],
              y:data.asset[0].Y[i],
              z:data.asset[0].Z[i],
            }
            this.tableTwoElements[i]={
              x:data.asset[1].X[i],
              y:data.asset[1].Y[i],
              z:data.asset[1].Z[i],
            }
            this.tableThreeElements[i]={
              x:data.asset[2].X[i],
              y:data.asset[2].Y[i],
              z:data.asset[2].Z[i],
            }
          }
          dismiss();
        }
      })
    }
  }

  public onFileChange(event): void
  {
    this.file = event.target.files[0];
    let extension = this.file.name.split('.')[1];
    if(extension!= "c3d"){
      this.closed = false ;
      setTimeout(()=>{
        this.closed = true ;
      },4000 )
    }
  }
}
