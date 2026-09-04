# IP-SAKTI Sahayak Backend

MERN backend for the IP-SAKTI Sahayak frontend. RAG is intentionally not included in this version. The architecture leaves `/analysis` and the assistant service ready for a future RAG integration.

## Demo data
Run `npm run seed` after MongoDB is running.

Demo login:
- Email: `demo@ipsakti.local`
- Password: `Demo@123`

## Start
```bash
npm install
npm run seed
npm run dev
```

Health check: `GET http://localhost:5000/api/health`

## Bhashini
The language service follows the Bhashini ULCA flow: pipeline configuration first, then pipeline compute/inference. Put your own Bhashini integrator credentials in `.env`; never commit them.

Required environment variables:
- `BHASHINI_USER_ID`
- `BHASHINI_API_KEY`
- `BHASHINI_PIPELINE_ID`

The backend obtains the inference callback URL/authorization from the pipeline configuration response when possible.
