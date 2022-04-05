#!/usr/bin/env node

process.stdin.resume()
process.stdin.setEncoding('utf8')

let data = []
let reader = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
})
reader.on('line', (line) => {
  data.push(line)
  // data = line.split(' ').map((el) => parseInt(el));
})
reader.on('close', () => {
  //console.log(data[0])
  //console.log(data)
  let get_rid_of_title = data.shift()
  let memo = new Memo(data[0], get_rid_of_title)
  console.log(memo.title)
  console.log(memo.description)
  reader.close()
  process.exit()
})

class Memo {
  constructor (title, description) {
    this.title = title,
    this.description = description
  }
}

// let get_rid_of_title = data.shift()
// let memo = new Memo(data[0], get_rid_of_title)
// console.log(memo.title, memo.description)
// console.log('aaa')



// class file {
//   //書き込み
//   const fs = require("fs").promises;

//   const writer = async (file) =>{
//     try{
//       await fs.writeFile(file, "ここに標準入力");
//     }
//     catch(e){
//       console.log(e.message);
//     }
//   };

//   writer('memo.json');




//   //読み込み
//   const fs = require("fs");
//   const readline = require("readline");

//   const displayFile = async (file) => {
//     const stream = fs.createReadStream(file);
//     const rl = readline.createInterface({
//       input: stream
//     });

//     let i = 1;
//     for await (const line of rl) {
//       // 行番号を作成
//       let num = i.toString().padStart(5, "0");  //5文字未満は"0"で埋める
//       i++;

//       console.log(`${num}: ${line}`);
//     }
//   };

//   displayFile('memo.json');
// }

// //ファイル選択
// const { Select } = require('enquirer');
  
// const prompt = new Select({
//   name: 'title',
//   message: 'Title',
//   choices: ['apple', 'grape', 'watermelon', 'cherry', 'orange']
// });

// prompt.run()
//   .then(answer => console.log('Answer:', answer))
//   .catch(console.error);
