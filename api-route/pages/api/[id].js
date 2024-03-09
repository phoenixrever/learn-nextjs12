export default function handler(req, res) {
  console.log('req.query.id', req.query.id);
    res.status(200).json({ message: 'oops!' });
}
