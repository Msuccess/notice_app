import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { NoticeModel } from 'src/app/core/models/notice.model';
import { NoticeService } from 'src/app/core/services/notice.service';

@Component({
  templateUrl: './details-notice.page.html',
  styleUrls: ['./details-notice.page.scss'],
})
export class DetailsNoticePage implements OnInit {
  public notice: NoticeModel;
  id: any;

  constructor(
    private noticeService: NoticeService,
    private route: ActivatedRoute,
    private location: Location
  ) {
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
    this.noticeService.get().subscribe((res: NoticeModel[]) => {
      console.log(res);
      this.notice = res.find((e) => e.id === this.id);
    });
  }
  ngOnInit(): void {}
}
