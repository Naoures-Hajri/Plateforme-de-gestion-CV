import { Component, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ChangePasswordComponent } from 'src/app/modules/user-management/components/change-password/change-password.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  selectedOption: string;
  screenWidth!: number;
  user : any
  public isExpanded: boolean = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private dialog : MatDialog,private breakpointObserver: BreakpointObserver , private router : Router , private userService : UserService) {
    this.getScreenSize();
    this.getCurrentUser()
  }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenWidth = window.innerWidth;
    // console.log(this.screenWidth);     
    if (this.screenWidth <= 959) {
      this.isExpanded = true;
    } else {
      this.isExpanded = false;
    }
  }

  logout(){
    window.sessionStorage.removeItem('auth')
    this.router.navigateByUrl('auth/login')
  }

  getCurrentUser(){
    this.userService.currentUser().subscribe(res=>{
      this.user = res.user
      
    })
  }
  openDialogChangeMDP() {
    console.log()
    const dialogConfig = new MatDialogConfig();
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

}
