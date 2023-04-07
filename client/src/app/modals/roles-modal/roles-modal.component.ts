import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css']
})
export class RolesModalComponent {
  user: User = {}as User;
  availableRoles: any[] = [];
  selectedRoles: any[] =[];

  constructor(public bsModalRef: BsModalRef, private adminService: AdminService){}

  updateChecked(checkedValue: string){
    const index = this.selectedRoles.indexOf(checkedValue);
    index !== -1 ? this.selectedRoles.splice(index, 1) : this.selectedRoles.push(checkedValue)
  }
  submit(){
    console.log(this.user)
    const selectedRoles = this.bsModalRef.content?.selectedRoles;
    if (!this.arrayEqual(selectedRoles!, this.user.roles)) {
      this.adminService.updateUserRoles(this.user.username, selectedRoles!).subscribe({
        next: roles => this.user.roles = roles
      })
    }
    this.bsModalRef.hide();    
  }
  private arrayEqual(arr1: any[], arr2: any[]) {
    console.log(arr1)
    console.log(arr2)
    return JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort());
  }
}
