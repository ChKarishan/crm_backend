import mongoose from "mongoose";

export const saleData = [
    {
      SaleID: '1',
      ItemID: 'A123',
      ItemName: 'Product 1',
      Price: 19.99,
      Date: new Date('2023-01-01'),
    },
    {
      SaleID: '2',
      ItemID: 'B456',
      ItemName: 'Product 2',
      Price: 29.99,
      Date: new Date('2023-01-15'),
    },
    {
      SaleID: '3',
      ItemID: 'C789',
      ItemName: 'Product 3',
      Price: 9.99,
      Date: new Date('2023-02-05'),
    },
    // Add more sale records as needed
  ];
  
  export const userData = [
    {
      email: 'user1@example.com',
      password: 'password123',
    },
    {
      email: 'user2@example.com',
      password: 'secret456',
    },
    {
      email: 'user3@example.com',
      password: 'test789',
    },
    // Add more user records as needed
  ];