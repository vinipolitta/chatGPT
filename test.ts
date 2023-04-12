import { TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CriptService } from './cript.service';
import { MyService } from './my.service';

describe('MyService', () => {
  let service: MyService;
  let httpMock: HttpTestingController;
  let toastr: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ToastrModule.forRoot()
      ],
      providers: [
        CriptService,
        MyService
      ]
    });
    service = TestBed.inject(MyService);
    httpMock = TestBed.inject(HttpTestingController);
    toastr = TestBed.inject(ToastrService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should call HttpClient.patch() with the correct URL and payload', fakeAsync(() => {
    const list = [/* test data */];
    service.patchListChannelMotor(list);
    tick();

    const req = httpMock.expectOne(urlConfig.patchMotorChannels);
    expect(req.request.method).toEqual('PATCH');
    expect(req.request.body).toEqual(list);

    req.flush({ returnMessage: 'Success' });

    tick();

    expect(toastr.success).toHaveBeenCalledWith('Success', '', {
      disableTimeOut: true,
      tapToDismiss: false,
      positionClass: 'toast-top-center',
      toastClass: 'toast-icon custom-toast-success'
    });
  }));

  it('should display an error message if the patch request fails', fakeAsync(() => {
    const list = [/* test data */];
    service.patchListChannelMotor(list);
    tick();

    const req = httpMock.expectOne(urlConfig.patchMotorChannels);
    req.error(new ErrorEvent('network error'));

    tick();

    expect(toastr.error).toHaveBeenCalledWith('CHANNEL MOTORS - network error', '', {
      disableTimeOut: true,
      tapToDismiss: false,
      positionClass: 'toast-top-center',
      toastClass: 'toast-icon custom-toast-danger'
    });
  }));
});
