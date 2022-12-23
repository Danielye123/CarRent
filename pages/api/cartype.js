import { connectDB } from '../../utils/connectDB';
import Car from '../../models/carSchema';

// api/car/:type
export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  switch (method) {
    case 'GET':
      try {
        const cars = await Car.find({ tag: req.query.tag }).limit(10).exec();
        res.status(200).json({ success: true, data: cars });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
