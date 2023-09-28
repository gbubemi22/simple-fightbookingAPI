// import { promises as fs } from "fs";
// import path from "path";
// import { fileURLToPath } from "url";
// import readData from "../paymentData.json";
// // Get the directory of the current module using import.meta.url
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const dataPath = path.join(__dirname, "../mockData/paymentData.json");

// paymentService.js

import  path  from 'path';
import  Payment  from '../model/Payment.js';

// paymentService.js
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


class PaymentService {
  static async getPaymentStatus(paymentId) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const paymentDataPath = path.join(__dirname, '../mockData/paymentData.json');

    try {
      
      const data = await fs.readFile(paymentDataPath, 'utf8');
      const paymentData = JSON.parse(data);
      const payment = paymentData.payments.find((p) => p.id === paymentId);

      if (payment) {
        return new Payment(payment.paymentStatus);
      }

      return null;
    } catch (error) {
      console.error('Error reading payment data:', error);
      return null;
    }
  }
}

export default PaymentService;

