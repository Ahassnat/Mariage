import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm:NgForm
user:User;
created:string;
  age:string;
  options = {weekday : 'long' , year :'numeric' , month : 'long',day:'numeric'};
photoUrl:string;
@HostListener('window:beforeunload',['$event'])
unLoadNotification($event:any){
  if(this.editForm.dirty){
    $event.returnValue=true;
  }
}
  constructor(private route:ActivatedRoute,private alertify:AlertifyService, private userService:UserService,
    private authService:AuthService ) { }

  ngOnInit() {
  
    this.route.data.subscribe(
      data=>{
        this.user=data['user']
      }
    );
    this.authService.currentPhotoUrl.subscribe(
      photoUrl=>this.photoUrl=photoUrl
      
    )
    this.created = new Date(this.user.created).toLocaleString('fr-FR',this.options);
    this.age = this.user.age.toLocaleString('fr-FR');
  }
  updateUser(){    

     
   this.userService.updateUser(this.authService.decodedToken.nameid,this.user).subscribe(()=>{
    this.alertify.success('vos modifications sont enregistrées');
    this.editForm.reset(this.user);
   },error=>this.alertify.error(error))
    
  }
  updateMainPhoto(photoUrl){

    this.user.photoURL=photoUrl;
  }

}
