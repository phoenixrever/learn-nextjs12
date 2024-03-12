export default async function handler(req, res) {
  try {
    // setTimeout不会阻塞
    const promise = new Promise(resolve =>  setTimeout(() => {
      console.log('req.query.id', req.query.id);
      /**
       * resolve() 是一个函数，用于将 Promise 对象的状态从未完成（pending）变为已完成（fulfilled），并将结果传递给 .then() 方法注册的回调函数。
       * 当调用 resolve() 函数时，Promise 的状态将变为已解决，并且会执行 .then() 方法注册的成功回调函数。
       * 如果提供了参数，该参数将作为成功的结果传递给 .then() 方法。
       */
      resolve();
    }, 3000));
   
    await promise;

    res.status(200).json({ message: 'action confirmed' });
  } catch (error) {
    console.log('error test',error);
    res.status(200).json({ message: 'oops! something wrong!' });
  }

}
