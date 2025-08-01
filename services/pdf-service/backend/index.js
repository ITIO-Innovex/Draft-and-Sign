import express from 'express';
import {verifyJWT} from '@draftnsign/auth-lib'

const app = express();
app.use(cors({
  origin: "*"
}));
app.use(verifyJWT(process.env.ACCESS_TOKEN_SECRET));
app.get('/convert', (req, res) => {
  res.send(`Hello ${req.user.data.fullname}, converting PDF...`);
});

app.listen(4001, () => console.log('PDF Service running on 4001'));
