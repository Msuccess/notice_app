import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginModel } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: UserLoginModel = { email: '', password: '' };
  submitted = false;

  constructor(
    public authService: AuthService,
    public router: Router,
    private util: UtilService
  ) {}

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.authService
        .login(this.login.email, this.login.password)
        .then((res: any) => {
          console.log('>>>>>>>>>>>>>>>>>>,res', res);
          this.getUser(res.user.uid);
          this.util.setUser('user', res.user);
          this.util.setUser('token', res.user.refreshToken);

          this.submitted = false;
        })
        .catch(() => {
          this.submitted = false;
          this.util.presentErrorMessage(
            'Error Logging In Check credentials and try again',
            'Error'
          );
        })
        .finally(() => (this.submitted = false));
    }
  }

  ngOnInit(): void {}

  getUser(id: string) {
    this.authService.getUser().subscribe((res: any) => {
      const r = res.find((user: any) => user.id === id);
      this.util.setUser('userData', r);
      this.router.navigate(['app/notices']);
    });
  }

  onSignup() {
    this.router.navigateByUrl('/auth/register');
  }
}
