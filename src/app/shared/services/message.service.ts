import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MessageService {

  constructor(private toastr: ToastrService) { }

  showSuccess(msg, title, config) {
    this.toastr.success(msg, title, config);
  }

  showInfo(msg, title, config) {
    this.toastr.info(msg, title, config);
  }

  showWarning(msg, title, config) {
    this.toastr.warning(msg, title, config);
  }

  showError(msg, title, config) {
    this.toastr.error(msg, title, config);
  }
}
