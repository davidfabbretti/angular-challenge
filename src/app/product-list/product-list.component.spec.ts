import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {of, throwError} from 'rxjs';
import {ProductService} from "../services/product.service";

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productService: jasmine.SpyObj<ProductService>;
  let modalService: jasmine.SpyObj<NgbModal>;

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', ['getProducts']);
    const modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open']);

    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: NgbModal, useValue: modalServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    modalService = TestBed.inject(NgbModal) as jasmine.SpyObj<NgbModal>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    const mockProducts = [{ id: 1, title: 'Product 1', category: 'Category 1', price: 100 }];
    productService.getProducts.and.returnValue(of(mockProducts));

    component.ngOnInit();

    expect(productService.getProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.filteredProducts).toEqual(mockProducts.slice(0, component.recordCount));
  });

  it('should handle error when fetching products', () => {
    productService.getProducts.and.returnValue(throwError('Error fetching products'));

    component.ngOnInit();

    expect(component.products).toEqual([]); // Asegúrate de manejar el error en tu método
  });

  it('should filter products by category', () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', category: 'Category 1', price: 100 },
      { id: 2, title: 'Product 2', category: 'Category 2', price: 200 }
    ];
    productService.getProducts.and.returnValue(of(mockProducts));
    component.ngOnInit();

    component.selectedCategory = 'Category 1';
    component.filterProducts();

    expect(component.filteredProducts.length).toBe(1);
    expect(component.filteredProducts[0].title).toBe('Product 1');
  });

  it('should open modal with product details', () => {
    const mockProduct = { id: 1, title: 'Product 1', image: 'image_url', category: 'Category 1', price: 100 };
    component.openDetails(mockProduct, {} as any);

    expect(component.selectedProduct).toEqual(mockProduct);
    expect(modalService.open).toHaveBeenCalled();
  });
});
