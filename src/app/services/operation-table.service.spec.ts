import { defer, Observable } from 'rxjs';
import { OperationTableService } from './operation-table.service';

export function asyncData<T>(data: T): Observable<T> {
  return defer(() => Promise.resolve(data));
}

describe('OperationTableService', () => {
  let httpClientSpy: { get: jasmine.Spy };
  let service: OperationTableService;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new OperationTableService(httpClientSpy as any);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should return expected table data (HttpClient called once)', () => {
    const expectedParams: any[] =
      [
        [1, 'type_1', 26432],
        [2, 'type_2', 23756],
        [3, 'type_3', 53422],
      ];

    httpClientSpy.get.and.returnValue(asyncData(expectedParams));

    service.loadOperationTable(['id', 'test'], [['test', 30], ['test2', 40]]).subscribe(
      response =>   expect(response).toEqual(expectedParams),
      fail
    );


    expect(httpClientSpy.get.calls.count()).toBe(1);
  });


});
