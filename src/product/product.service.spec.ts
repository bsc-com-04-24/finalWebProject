import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
  });

  it('should create a product', async () => {
    const product = await service.create({
      name: 'Phone',
      description: 'Smartphone',
      price: 500,
      category: 'Electronics',
      sellerId: 1,
      stockQuantity: 10,
    });

    expect(product.name).toBe('Phone');
    expect(product.id).toBe(1);
    expect(product.sellerId).toBe(1);
  });

  it('should find all products', async () => {
    await service.create({
      name: 'Phone',
      description: 'Smartphone',
      price: 500,
      category: 'Electronics',
      sellerId: 1,
      stockQuantity: 10,
    });

    const products = await service.findAll();
    expect(products.length).toBe(1);
  });

  it('should find product by id', async () => {
    const created = await service.create({
      name: 'Phone',
      description: 'Smartphone',
      price: 500,
      category: 'Electronics',
      sellerId: 1,
      stockQuantity: 10,
    });

    const found = await service.findOne(created.id);
    expect(found.name).toBe('Phone');
  });

  it('should find products by seller', async () => {
    await service.create({
      name: 'Phone',
      description: 'Smartphone',
      price: 500,
      category: 'Electronics',
      sellerId: 1,
      stockQuantity: 10,
    });

    const products = await service.findBySeller(1);
    expect(products.length).toBeGreaterThan(0);
    expect(products[0].sellerId).toBe(1);
  });

  it('should update product', async () => {
    const created = await service.create({
      name: 'Phone',
      description: 'Smartphone',
      price: 500,
      category: 'Electronics',
      sellerId: 1,
      stockQuantity: 10,
    });

    const updated = await service.update(created.id, { price: 600 });
    expect(updated.price).toBe(600);
  });

  it('should delete product', async () => {
    const created = await service.create({
      name: 'Phone',
      description: 'Smartphone',
      price: 500,
      category: 'Electronics',
      sellerId: 1,
      stockQuantity: 10,
    });

    const result = await service.remove(created.id);
    expect(result.message).toContain('deleted');
  });
});
