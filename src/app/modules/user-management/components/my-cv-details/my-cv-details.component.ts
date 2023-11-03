import { Component, OnInit } from '@angular/core';
import { CvService } from 'src/app/service/cv.service';
import { UserService } from 'src/app/service/user.service';
import { jsPDF } from "jspdf"
import html2canvas from 'html2canvas';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-my-cv-details',
  templateUrl: './my-cv-details.component.html',
  styleUrls: ['./my-cv-details.component.scss']
})
export class MyCvDetailsComponent implements OnInit {
  token = sessionStorage.getItem('auth')
  me :any
  cvDatas : any
  cvData:any
  id = this.route.snapshot.paramMap.get('id');
  constructor(private userService : UserService , private cvService : CvService,private route: ActivatedRoute) {
    this.userService.getUser().subscribe(res=>{
      
      this.me = res.user
      console.log(this.me._id);
      this.cvService.getCvByIDUser(this.me._id).subscribe(res=>{
        console.log(res);
        this.cvDatas = res;
        this.cvDatas.reverse()
        this.cvData = this.cvDatas[0]
        
      })
    })
   }

  ngOnInit(): void {
  }



  delete(){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      this.cvService.delete(this.cvDatas._id).subscribe(res=>{
        if (result.isConfirmed) {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
   
    })
  
  }

  generatePdfmodelone() {


    const op = {
      background: 'white',
      scale: 3
    }
    var div = document.getElementById("modelone")
    console.log(div)
    setTimeout(() => {

      html2canvas(div, op).then(async canvas => {
        const contentDataURL = await canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4');
        var width = await pdf.internal.pageSize.getWidth();
        var height = await canvas.height * width / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
        pdf.save('output.pdf');
        localStorage.removeItem('commande')
      });



    }, 0);
  }
  generatePdfmodeltwo() {

    this.cvService.editCvById(this.id , {model : 2 }).subscribe(res=>{
      console.log(res)
    })
    const op = {
      background: 'white',
      scale: 3
    }
    var div = document.getElementById("modeltwo")
    console.log(div)
    setTimeout(() => {

      html2canvas(div, op).then(async canvas => {
        const contentDataURL = await canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4');
        var width = await pdf.internal.pageSize.getWidth();
        var height = await canvas.height * width / canvas.width;
        pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
        pdf.save('output.pdf');
        localStorage.removeItem('commande')
      });



    }, 0);
  }
 
}
