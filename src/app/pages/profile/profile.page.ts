import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  register = {} as UserModel;
  submitted = false;
  faculties: { id: number; name: string }[];
  email: string;

  constructor(
    public authService: AuthService,
    public router: Router,
    private util: UtilService
  ) {
    this.faculties = util.getSchools();
    this.util.getUser().subscribe((res: any) => {
      this.email = res.email;
      this.getProfile();
    });
  }

  getProfile() {
    this.authService.getUser().subscribe((res: any[]) => {
      const r = res.find((e: any) => e.email === this.email);
      this.register = r;
    });
  }

  onSubmit(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      if (form.valid) {
        this.authService
          .signup(this.register.email, this.register.password)
          .then((res: any) => {
            console.log(res);
            this.authService.registerUser(this.register);
            this.util.setUser('user', res.user);
            this.util.setUser('userData', this.register);
            this.submitted = false;
            this.router.navigateByUrl('/auth/login');
          })
          .catch(() => {
            this.util.presentErrorMessage('User Already Exist', 'Error');
          });
      }
    }
  }

  ngOnInit(): void {}
}
