require('dotenv').config();
const mongoose = require('mongoose');
const Route = require('./models/Route');

const routes = [
  { name: 'Ikeja to Yaba BRT', from: 'Ikeja', to: 'Yaba', stops: ['Ikeja', 'Ojota', 'Onipanu', 'Yaba'], fare: 800, duration: '45 mins', transportType: 'brt' },
  { name: 'Ikeja to Yaba Danfo', from: 'Ikeja', to: 'Yaba', stops: ['Ikeja', 'Ojota', 'Yaba'], fare: 600, duration: '50 mins', transportType: 'danfo' },
  { name: 'Oshodi to Lekki BRT', from: 'Oshodi', to: 'Lekki', stops: ['Oshodi', 'Mile 2', 'Lekki Phase 1', 'Lekki'], fare: 1200, duration: '1 hr 10 mins', transportType: 'brt' },
  { name: 'Oshodi to Lekki Danfo', from: 'Oshodi', to: 'Lekki', stops: ['Oshodi', 'Mile 2', 'Lekki'], fare: 1000, duration: '1 hr 20 mins', transportType: 'danfo' },
  { name: 'Yaba to Ikeja BRT', from: 'Yaba', to: 'Ikeja', stops: ['Yaba', 'Onipanu', 'Ojota', 'Ikeja'], fare: 800, duration: '45 mins', transportType: 'brt' },
  { name: 'Ikeja to Oshodi Danfo', from: 'Ikeja', to: 'Oshodi', stops: ['Ikeja', 'Oshodi'], fare: 500, duration: '30 mins', transportType: 'danfo' },
  { name: 'Ikeja to Lekki BRT', from: 'Ikeja', to: 'Lekki', stops: ['Ikeja', 'Ojota', 'Mile 2', 'Lekki'], fare: 1500, duration: '1 hr 30 mins', transportType: 'brt' },
  { name: 'Yaba to Lekki Danfo', from: 'Yaba', to: 'Lekki', stops: ['Yaba', 'Obalende', 'Lekki'], fare: 900, duration: '1 hr', transportType: 'danfo' },
  { name: 'Oshodi to Yaba Danfo', from: 'Oshodi', to: 'Yaba', stops: ['Oshodi', 'Onipanu', 'Yaba'], fare: 500, duration: '35 mins', transportType: 'danfo' },
  { name: 'Ikeja to Surulere Keke', from: 'Ikeja', to: 'Surulere', stops: ['Ikeja', 'Oshodi', 'Surulere'], fare: 700, duration: '40 mins', transportType: 'keke' },
  { name: 'Surulere to Yaba Danfo', from: 'Surulere', to: 'Yaba', stops: ['Surulere', 'Onipanu', 'Yaba'], fare: 400, duration: '25 mins', transportType: 'danfo' },
  { name: 'Ikeja to Ojota Danfo', from: 'Ikeja', to: 'Ojota', stops: ['Ikeja', 'Ojota'], fare: 300, duration: '15 mins', transportType: 'danfo' },
  { name: 'Oshodi to Surulere Danfo', from: 'Oshodi', to: 'Surulere', stops: ['Oshodi', 'Surulere'], fare: 400, duration: '20 mins', transportType: 'danfo' },
  { name: 'Yaba to Ojota Danfo', from: 'Yaba', to: 'Ojota', stops: ['Yaba', 'Onipanu', 'Ojota'], fare: 400, duration: '20 mins', transportType: 'danfo' },
  { name: 'Lekki to Ikeja BRT', from: 'Lekki', to: 'Ikeja', stops: ['Lekki', 'Mile 2', 'Ojota', 'Ikeja'], fare: 1500, duration: '1 hr 30 mins', transportType: 'brt' },
  { name: 'Ikeja to Mile 2 BRT', from: 'Ikeja', to: 'Mile 2', stops: ['Ikeja', 'Ojota', 'Mile 2'], fare: 900, duration: '55 mins', transportType: 'brt' },
  { name: 'Mile 2 to Oshodi Danfo', from: 'Mile 2', to: 'Oshodi', stops: ['Mile 2', 'Oshodi'], fare: 400, duration: '25 mins', transportType: 'danfo' },
  { name: 'Yaba to Surulere Keke', from: 'Yaba', to: 'Surulere', stops: ['Yaba', 'Surulere'], fare: 350, duration: '20 mins', transportType: 'keke' },
  { name: 'Ojota to Lekki Danfo', from: 'Ojota', to: 'Lekki', stops: ['Ojota', 'Mile 2', 'Lekki'], fare: 1000, duration: '1 hr', transportType: 'danfo' },
  { name: 'Oshodi to Ikeja BRT', from: 'Oshodi', to: 'Ikeja', stops: ['Oshodi', 'Ikeja'], fare: 600, duration: '30 mins', transportType: 'brt' },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    await Route.deleteMany({});
    console.log('Old routes cleared');
    await Route.insertMany(routes);
    console.log(`✅ Seeded ${routes.length} routes`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();