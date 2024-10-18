import  LoginPayload  from '../data/request-payloads/post-signin-payload.json';

LoginPayload.email = process.env.USER!
LoginPayload.senha = process.env.PASSWORD!

async function globalSetup() {

  process.env.TEST = 'test';
  console.log(`vida ${process.env.API_TOKEN}`);
  console.log(`vida ${process.env.TEST}`);
}

export default globalSetup;

