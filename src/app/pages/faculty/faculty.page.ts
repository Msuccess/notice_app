import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NoticeService } from 'src/app/core/services/notice.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  templateUrl: './faculty.page.html',
  styleUrls: ['./faculty.page.scss'],
})
export class FacultyPage implements OnInit {
  allNotices: any;

  constructor(
    private noticeService: NoticeService,
    public router: Router,
    private util: UtilService,
    private location: Location
  ) {
    this.util.getUser().subscribe((res: any) => {
      console.log(res);
    });
  }

  navigateBack(): void {
    this.location.back();
  }

  getAllNotice(): any {
    this.util.showLoader$.next(true);
    this.noticeService.get().subscribe(
      (data: any) => {
        console.log(data);
        this.allNotices = data;
        this.util.showLoader$.next(false);
      },
      (err: any) => {
        this.util.showLoader$.next(false);
      }
    );
  }

  ngOnInit(): void {
    this.getAllNotice();
  }
}
