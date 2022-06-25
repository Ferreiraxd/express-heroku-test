const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate(){
    const limite = 100;
    for(let index=0;index < limite ;index ++){
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(),10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean()
      });
    }
  }

  async create(data){
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find(limite){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.products);
      }, 1000);
    });
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id);
    if(!product){
      throw boom.notFound('product not found');
    }
    if (product.isBlock){
      throw boom.conflict('product is blocked');
    }
    return product;
  }

  async update(id, body){

    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('product not found');
    }
    const oldProduct = this.products.find(item => item.id === id);
    this.products[index] = {...oldProduct, ...body}
    return this.products[index];
    /*this.products = this.products.map(product => {
      if(product.id === id){
        product = { ...product , ...body}
        return product;
      }
      return product;
    });
    return this.products.find(product => product.id === id);*/
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id }
  }
}

module.exports = ProductsService;
