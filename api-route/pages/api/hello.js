// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import fs from 'fs';
import path from 'path';

//api 是特殊的文件名 不能更改
//这边是服务端 所有代码都不会出现在客户端
export default function handler(req, res) {
  console.log('req.methed', req.method);
  if (req.method === 'POST') {
    console.log(req.body);

    const { email, advice } = req.body;

    const adviceObj = {
      id: new Date().toISOString(),
      email: email,
      advice: advice,
    };
    const dataFilepath = path.join(process.cwd(), 'data', 'advice.json');
    const dataStr = fs.readFileSync(dataFilepath);
    const dataArr = JSON.parse(dataStr);
    dataArr.push(adviceObj);
    fs.writeFileSync(dataFilepath, JSON.stringify(dataArr));

    res
      .status(201)
      .json({ message: 'save advice done! thanks to your kind help!' });
  } else if (req.method === 'GET') {
    const dataFilepath = path.join(process.cwd(), 'data', 'advice.json');
    const dataStr = fs.readFileSync(dataFilepath);
    const dataArr = JSON.parse(dataStr);
    res.status(201).json({ data: dataArr });
  } else {
    res.status(200).json({ message: 'oops!' });
  }
}
