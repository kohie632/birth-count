class Game{
  constructor(){
    this.reset();
  }

  reset(){
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.Sente = 1;
    this.Gote = -1;
    this.teban = this.Sente;
    this.winner = 0;
    this.end = false;
    for(let i = 0; i < 9; i++){
      this.update(String(i))
    }
    this.aSente = new Agent(1, false);
    this.aGote = new Agent(-1, true);
    // this.aSente = new Agent(1, true);
    // this.aGote = new Agent(-1, false);
    document.getElementById("msg").textContent = "Let's play the game!";
    this.agent();
  }

  proceed(place){
    if(this.end || place == 100){
      return;
    }
    if(this.board[place]=== 0){
      this.board[place] = this.teban;
      this.teban *= -1;
      if (this.hantei()){
        this.end = true;
      }
      this.update(place);
    }
    this.agent();
  }

  agent(){
    
    if(this.teban === this.Sente){
      console.log("agent: "+this.aSente.next(this.board))
      this.proceed(this.aSente.next(this.board));
    }else{
      this.proceed(this.aGote.next(this.board));
    }
  }

  update(place){
    if(this.board[place] === 0){
      document.getElementById(place).textContent = "";
    }else{
      if(this.board[place] === 1){
        document.getElementById(place).textContent = "○";
      }else{
        document.getElementById(place).textContent = "×";
      }
    }
  }

  hantei(){
    let flag = false;
    if(this.board[0] + this.board[1] + this.board[2] === 3 * this.Sente ||
      this.board[3] + this.board[4] + this.board[5] === 3 * this.Sente ||
      this.board[6] + this.board[7] + this.board[8] === 3 * this.Sente ||
      this.board[0] + this.board[3] + this.board[6] === 3 * this.Sente ||
      this.board[1] + this.board[4] + this.board[7] === 3 * this.Sente ||
      this.board[2] + this.board[5] + this.board[8] === 3 * this.Sente ||
      this.board[0] + this.board[4] + this.board[8] === 3 * this.Sente ||
      this.board[2] + this.board[4] + this.board[6] === 3 * this.Sente){
      this.winner = this.Sente;
      flag = true;
    }else{
      if(this.board[0] + this.board[1] + this.board[2] === 3 * this.Gote ||
        this.board[3] + this.board[4] + this.board[5] === 3 * this.Gote ||
        this.board[6] + this.board[7] + this.board[8] === 3 * this.Gote ||
        this.board[0] + this.board[3] + this.board[6] === 3 * this.Gote ||
        this.board[1] + this.board[4] + this.board[7] === 3 * this.Gote ||
        this.board[2] + this.board[5] + this.board[8] === 3 * this.Gote ||
        this.board[0] + this.board[4] + this.board[8] === 3 * this.Gote ||
        this.board[2] + this.board[4] + this.board[6] === 3 * this.Gote){
        this.winner = this.Gote;
        flag = true;
      }else{
        let c = 0;
        for(let i = 0; i< 9; i++){
          if(this.board[i]===0){
            c++;
          }
        }
        if(c === 0){
          flag = true;
        }
      }
    }
    if(flag){
      if(this.winner === 1){
        document.getElementById("msg").textContent = "You Lose!";
      }
      if(this.winner === -1){
        document.getElementById("msg").textContent = "You Win!";
      }
      if(this.winner === 0){
        document.getElementById("msg").textContent = "Draw.";
      }
    }else{
      if(this.teban === 1){
        document.getElementById("msg").textContent = "It's my turn!";
      }else{
        document.getElementById("msg").textContent = "It's your turn!";
      }
    }
    return flag;
  }
}
function eqar(a, b){
  if (!Array.isArray(a)){ return false; }
  if (!Array.isArray(b)){ return false; }
  if (a.length != b.length){ return false; }
  for (let i = 0, n = a.length; i < n; ++i) {
    if (a[i] !== b[i]){ return false; }
  }
  return true;
}

// class Agent{
//   constructor(teban, com){  //teban:先手1、後手-1、　com:false, 機械true
//     this.teban = teban;
//     this.com = com;
//   }

//   next(board){
//     if(this.com){
//       setTimeout(console.log("sleep()"),3000);
//       let z = [0,0,0,0,0,0,0,0,0,0]
//       let c = 0;
//       for(let i = 0; i< 9; i++){
//         if(board[i]===0){
//           z[c]=i;
//           c++;
//         }
//       }
//       return z[Math.floor(Math.random() * (c-1))];
//     }
//   }
// }

class Agent{
  MoveS = {210000000: 4, 120000000: 4, 201000000: 6, 20100000: 4, 221100000: 4, 200001000: 2, 212100000: 4, 100002000: 4, 121200000: 4, 211002000: 4, 20010000: 0, 100020000: 8, 10020000: 0, 20000010: 6, 120201000: 8, 210000120: 4, 210102000: 4, 20211000: 8, 210010020: 3, 120020010: 6, 20120010: 6, 200000001: 4, 212000100: 7, 201002001: 6, 210002001: 7, 200012001: 7, 210020001: 6, 221000010: 8, 120002010: 6, 210000021: 4, 221100210: 5, 221102001: 6, 210020121: 5, 210122001: 6, 210002100: 4, 211000020: 4, 201002010: 6, 210001020: 4, 212100120: 4, 211002021: 4, 212010120: 5, 210012021: 6, 20201010: 8, 221102010: 6, 120221010: 8, 210002121: 4, 211102020: 6, 212100021: 4, 210102021: 4, 210112020: 6, 212000121: 4}
  MoveG = {100000000: 4, 10000000: 4, 211000000: 4, 121000000: 4, 210100000: 4, 210000100: 4, 120001000: 4, 210001000: 4, 10000: 0, 10120000: 0, 100021000: 7, 120000010: 4, 20100010: 6, 211102000: 4, 20010010: 0, 10020010: 0, 210000001: 6, 212100100: 8, 211002001: 4, 200010001: 2, 100020001: 1, 201000010: 6, 100002010: 4, 212100001: 4, 221100010: 4, 121200010: 4, 210000121: 4, 210102001: 4, 210010021: 6, 210120001: 5, 121020010: 3, 120021010: 6, 211122001: 6, 211100020: 8, 200001010: 2, 120201010: 8, 210001120: 4, 20211010: 0, 20121010: 0, 211102021: 4, 210112021: 2, 212100121: 4, 212010121: 3}

  constructor(teban, com){  //teban:先手1、後手-1、　com: 人:false, 機械:true
    this.teban = teban;
    this.com = com;
  }

  next(board){
    if(this.com){ //com
      //リーチチェック
      const reach = this.checkR(board);
      if(reach < 9){ return reach; }
      //リーチなし
      //回転 -1→2
      const rott = this.rotate(board); //[fil, [rotated_array]]
      const fil = rott[0];
      const rot = rott[1];
      if(this.teban === 1){
        let h = this.h2n(rot)
        console.log("h",h);
        if(h in this.MoveS){
          console.log("MoveS remember!")
          console.log("rerotate("+this.MoveS[h]+","+fil+"): "+this.rerotate(this.MoveS[h], fil))
          return this.rerotate(this.MoveS[h], fil);
        }
        if(h in this.MoveG){
          console.log("MoveG remember!")
          console.log("rerotate("+this.MoveG[h]+","+fil+"): "+this.rerotate(this.MoveG[h], fil))
          return this.rerotate(this.MoveS[h], fil);
        }
        if(h === 0){
          console.log("start!")
          const ar = [0,2,4,6,8];
          return ar[Math.floor(Math.random() * ar.length)];
        }
      }
      //ランダム
      console.log("random")
      let z = [0,0,0,0,0,0,0,0,0,0]
      let c = 0;
      for(let i = 0; i< 9; i++){
        if(board[i]===0){
          z[c]=i;
          c++;
        }
      }
      return z[Math.floor(Math.random() * (c-1))];
    }else{ //人
      return 100;
    }
  }

  reach = [[[1,2],[3,6],[4,8]],[[0,2],[4,7]],[[0,1],[4,6],[5,8]],[[0,6],[4,5]],[[0,8],[1,7],[2,6],[3,5]],[[2,8],[3,4]],[[0,3],[2,4],[7,8]],[[1,4],[6,8]],[[6,7],[0,4],[2,5]],];
  checkR(board){
    //リーチのチェック　リーチあり:0~8, リーチなし:9
    let out = 9;
    for(let i=0; i<9; i++){
      if(board[i]===0){
        for(let j=0; j<this.reach[i].length; j++){
          let k = [board[this.reach[i][j][0]], board[this.reach[i][j][1]]]
          if(eqar(k,[this.teban, this.teban])){
            return i;
          }
          if(eqar(k,[-this.teban, -this.teban])){
            out = i;
  } } } }
    return out;
  }

  filter = [[0,1,2,3,4,5,6,7,8], [6,3,0,7,4,1,8,5,2],[8,7,6,5,4,3,2,1,0], [2,5,8,1,4,7,0,3,6], [2,1,0,5,4,3,8,7,6], [8,5,2,7,4,1,6,3,0], [6,7,8,3,4,5,0,1,2], [0,3,6,1,4,7,2,5,8]];
  rotate(board){//回転し最大値の配列とfilterを返す
    //回転
    let rot = [[],[],[],[],[],[],[],[]]
    for(let i=0; i<this.filter.length; i++){
      for(let j=0; j<this.filter[i].length; j++){
        let x = board[this.filter[i][j]]
        rot[i][j] = Math.floor((3*x-1) * x / 2 ); //-1を2に変換
      }
    }
    let out = [];
    let max = -1;
    let fil = 0
    for(let i=0; i<rot.length; i++){
      let x = this.h2n(rot[i]);
      if(max < x){
        out = rot[i];
        max = x;
        fil = i;
      }
    }
    return [fil, out];
  }
  
  rerotate(x, fil){ //回転を戻す
    return this.filter[fil][x];
  }


  h2n(a){
    let out=0;
    for(let i=0;i<9;i++){
      out += a[i]* Math.pow(10, 8-i);
    }
    return out;
  }
}

const g = new Game();