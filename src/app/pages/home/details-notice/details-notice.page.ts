/* eslint-disable @typescript-eslint/dot-notation */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoticeModel } from 'src/app/core/models/notice.model';
import { NoticeService } from 'src/app/core/services/notice.service';
import { UtilService } from 'src/app/core/services/util.service';

@Component({
  templateUrl: './details-notice.page.html',
  styleUrls: ['./details-notice.page.scss'],
})
export class DetailsNoticePage implements OnInit {
  public notice: NoticeModel;
  id: any;
  fileLink: any;

  constructor(
    private noticeService: NoticeService,
    private route: ActivatedRoute,
    private location: Location,
    private util: UtilService
  ) {
    this.util.showLoader$.next(true);
    this.route.params.subscribe((res: any) => {
      this.id = res.id;
      console.log(res);
      this.getNotice();
    });
  }

  navigateBack(): void {
    this.location.back();
  }

  public getNotice() {
    // this.noticeService.get().subscribe(
    //   (res: any) => {

    //     console.log(res);
    //     this.notice = res.find((e) => e.id === this.id);
    //     this.fileLink = this.notice.file;
    //     this.util.showLoader$.next(false);
    //   },
    //   (error: any) => this.util.showLoader$.next(false)
    // );

    this.noticeService.get().subscribe(
      (data: any) => {
        if (data) {
          // eslint-disable-next-line arrow-body-style
          const allNotices = data.map((e: any) => {
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
          this.notice = allNotices.find((e) => e.id === this.id);
        }

        this.util.showLoader$.next(false);
      },
      (err: any) => {
        this.util.showLoader$.next(false);
      }
    );
  }
  ngOnInit(): void {}
}
