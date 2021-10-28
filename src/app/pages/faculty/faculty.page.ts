/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NoticeService } from 'src/app/core/services/notice.service';
import { UtilService } from 'src/app/core/services/util.service';
import { NoticeModel } from 'src/app/core/models/notice.model';

@Component({
  templateUrl: './faculty.page.html',
  styleUrls: ['./faculty.page.scss'],
})
export class FacultyPage implements OnInit {
  allNotices: any;
  faculty: string;

  constructor(
    private noticeService: NoticeService,
    public router: Router,
    private util: UtilService,
    private location: Location
  ) {
    this.util.getUserRole().subscribe((res: any) => {
      console.log(res);
      this.faculty = res.faculty;
    });
  }

  navigateBack(): void {
    this.location.back();
  }

  getAllNotice(): any {
    this.util.showLoader$.next(true);

    this.noticeService.get().subscribe(
      (data: any) => {
        if (data) {
          // eslint-disable-next-line arrow-body-style
          this.allNotices = data.map((e: any) => {
            return {
              id: e.payload.doc.id,
              date: e.payload.doc.data()['date'],
              description: e.payload.doc.data()['description'],
              faculty: e.payload.doc.data()['faculty'],
              title: e.payload.doc.data()['title'],
              fileName: e.payload.doc.data()['fileName'],
              user: e.payload.doc.data()['user'],
              isFavorite: e.payload.doc.data()['isFavorite'],
              hide: e.payload.doc.data()['hide'],
              file: e.payload.doc.data()['file'],
            };
          });

          console.log('>>>>>>>>>>>>>>>>>', this.allNotices);
          this.allNotices = this.allNotices.filter(
            (r: any) => r.faculty === this.faculty
          );
        }
        this.util.showLoader$.next(false);
      },
      (err: any) => {
        this.util.showLoader$.next(false);
      }
    );
  }

  addFavorite(data: NoticeModel) {
    this.noticeService
      .put(data.id, data)
      .then(() => {
        this.getAllNotice();
      })
      .catch(() => {
        this.util.presentErrorMessage(
          'Error adding notice to favorite',
          'Error'
        );
      });
  }

  ngOnInit(): void {
    this.getAllNotice();
  }
}
