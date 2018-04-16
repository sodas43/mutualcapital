import { ToastOptions } from 'ng2-toastr';

export class CustomToastOption extends ToastOptions {
  
  showCloseButton = false;
  dismiss = 'auto';  
  positionClass = 'toast-top-full-width';
}