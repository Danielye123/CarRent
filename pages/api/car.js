import { connectDB } from '../../utils/connectDB';
import Car from '../../models/carSchema';

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const cars = await Car.find({});
        res.status(200).json({ success: true, data: cars });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const cars = await Car.create(req.body);
        res.status(201).json({ success: true, data: cars });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
