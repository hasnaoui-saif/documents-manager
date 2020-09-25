import { Injectable } from '@angular/core';
import {MessageService} from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private messageService: MessageService) { }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Operation completed successfully'});
  }

  showFailure() {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'A problem has occurred'});
  }
}
