import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(() => {
    service = new ProductsService();
    controller = new ProductsController(service);
  });

  it('should create a product', async () => {
    const result = await controller.create({
      name: 'Phone',
      description: 'Smartphone',
      price: 500,
      category: 'Electronics',
      sellerId: 1,
      stockQuantity: 10,
    });

    expect(result.name).toBe('Phone');
    expect(result.id).toBe(1);
  });

  it('should get all products', async () => {
    await controller.create({
      name: 'Phone',
      description: 'Smartphone',
      price: 500,
      category: 'Electronics',
      sellerId: 1,
      stockQuantity: 10,
    });

    const result = await controller.findAll();
    expect(result.length).toBe(1);
  });

  it('should get product by id', async () => {
    const created = await controller.create({
      name: 'Phone',
      description: 'Smartphone',
      price: 500,
      category: 'Electronics',
      sellerId: 1,
      stockQuantity: 10,
    });

    const result = await controller.findOne(String(created.id));
    expect(result.name).toBe('Phone');
  });

  it('should get products by seller', async () => {
    await controller.create({
      name: 'Phone',
      description: 'Smartphone',
      price: 500,
      category: 'Electronics',
      sellerId: 1,
      stockQuantity: 10,
    });

    const result = await controller.findAll('1');
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].sellerId).toBe(1);
  });

  it('should update product', async () => {
    const created = await controller.create({
      name: 'Phone',
      description: 'Smartphone',
      price: 500,
      category: 'Electronics',
      sellerId: 1,
      stockQuantity: 10,
    });

    const result = await controller.update(String(created.id), { price: 600 });
    expect(result.price).toBe(600);
  });

  it('should delete product', async () => {
    const created = await controller.create({
      name: 'Phone',
      description: 'Smartphone',
      price: 500,
      category: 'Electronics',
      sellerId: 1,
      stockQuantity: 10,
    });

    const result = await controller.remove(String(created.id));
    expect(result.message).toContain('deleted');
  });
});
