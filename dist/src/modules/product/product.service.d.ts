import { ProductCreateDto, ProductDao } from '../../common/io/product-module';
export declare const createProduct: (dto: ProductCreateDto) => Promise<ProductDao>;
