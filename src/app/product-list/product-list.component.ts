import {Component, OnInit, TemplateRef} from '@angular/core';
import {ProductService} from "../services/product.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'actions'];
  selectedProduct: any;
  selectedCategory: string = '';
  recordCount: number = 5; // Valor por defecto
  recordCounts: number[] = [5, 10, 15]; // Opciones para la cantidad de registros
  categories: string[] = []; // Lista de categorías

  constructor(private productService: ProductService,
              private router: Router,
              private authService: AuthService,
              private modalService: NgbModal) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      (data) => {
        this.products = data;
        this.filteredProducts = this.products.slice(0, this.recordCount); // Inicializa los productos filtrados
        this.extractCategories(); // Extrae las categorías al cargar los productos
      },
      (error) => {
        console.error('Error al obtener los productos', error);
      }
    );
  }

  extractCategories() {
    const uniqueCategories = new Set(this.products.map(product => product.category));
    this.categories = Array.from(uniqueCategories);
  }

  filterProducts() {
    this.filteredProducts = this.products.filter(product =>
      this.selectedCategory ? product.category === this.selectedCategory : true
    ).slice(0, this.recordCount); // Filtra por categoría y limita la cantidad de registros
  }

  changeRecordCount() {
    console.log('aaa');
    this.filteredProducts = this.products.filter(product =>
      this.selectedCategory ? product.category === this.selectedCategory : true
    ).slice(0, this.recordCount); // Cambia la cantidad de registros mostrados
  }

  openDetails(product: any, content: TemplateRef<any>) {
    this.selectedProduct = product;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  logout() {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error al cerrar sesión', error);
      }
    });
  }
}
