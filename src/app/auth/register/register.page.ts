import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Faculty } from 'src/app/core/models/faculty';
import { UserLoginModel, UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  register = {} as UserModel;
  submitted = false;
  faculties: { id: number; name: string }[];

  constructor(
    public authService: AuthService,
    public router: Router,
    private util: UtilService
  ) {
    this.faculties = util.getSchools();
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      if (form.valid) {
        this.authService
          .signup(this.register.email, this.register.password)
          .then((res: any) => {
            console.log('>>>>>>>>>>>>>', res);
            const register = {} as UserModel;
            register.id = res.user.uid;
            register.email = res.user.email;
            register.faculty = this.register.faculty;
            register.fullname = this.register.fullname;
            register.role = 'student';

            this.authService.registerUser(register);
            this.submitted = false;
            this.router.navigateByUrl('/auth/login');
          })
          .catch((error: any) => {
            this.submitted = false;
            this.util.presentErrorMessage(error.message, 'Error');
          });
      }
    }
  }

  ngOnInit(): void {}
}
