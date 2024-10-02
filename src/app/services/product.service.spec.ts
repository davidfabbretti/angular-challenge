import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products from API', () => {
    const mockProducts = [{ id: 1, title: 'Product 1', category: 'Category 1', price: 100 }];

    service.getProducts().subscribe(products => {
      expect(products.length).toBe(1);
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts); // Devuelve productos simulados
  });

  it('should handle error response from API', () => {
    service.getProducts().subscribe(
      () => fail('Expected an error, not products'),
      (error) => {
        expect(error).toContain('Error fetching products');
      }
    );

    const req = httpMock.expectOne('https://fakestoreapi.com/products');
    req.error(new ErrorEvent('Network error'));
  });

  afterEach(() => {
    httpMock.verify(); // Verifica que no haya peticiones pendientes
  });
});
