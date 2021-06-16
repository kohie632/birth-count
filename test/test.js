class Agent{
  MoveS = {210000000: 4, 120000000: 4, 201000000: 6, 20100000: 4, 221100000: 4, 200001000: 2, 212100000: 4, 100002000: 4, 121200000: 4, 211002000: 4, 200010000: 9, 20010000: 0, 100020000: 8, 10020000: 0, 20000010: 6, 120201000: 8, 210000120: 4, 210102000: 4, 20211000: 8, 210010020: 3, 120020010: 6, 20120010: 6, 200000001: 4, 212000100: 7, 201002001: 6, 210002001: 7, 200012001: 7, 210020001: 6, 221000010: 8, 120002010: 6, 210000021: 4, 221100210: 5, 221102001: 6, 210020121: 5, 210122001: 6, 210002100: 4, 211000020: 4, 201002010: 6, 210001020: 4, 212100120: 4, 211002021: 4, 212010120: 5, 210012021: 6, 20201010: 8, 221102010: 6, 120221010: 8, 210002121: 4, 211102020: 6, 212100021: 4, 210102021: 4, 210112020: 6, 212000121: 4}

  constructor(teban, com){  //teban:先手1、後手-1、　com:false, 機械true
    this.teban = teban;
    this.com = com;
  }

  next(board){
    //リーチチェック
    const reach = checkR(board);
    if(reach < 9){ return rreach; }
    //リーチなし
    //回転 -1→2
    const rott = rotate(board); //[fil, [rotated_array]]
    const fil = rott[0];
    const rot = rott[1];
    if(this.teban === 1){
      let h = this.h2n(rot)
      if(h in this.MoveS){
        return this.rerotate(this.MoveS(h), fil);
      }
      if(h === 0){
        const ar = [0,2,4,6,8];
        return ar[Math.floor(Math.random() * ar.length)];
      }
    }

    //ランダム
    if(this.com){
      let z = [0,0,0,0,0,0,0,0,0,0]
      let c = 0;
      for(let i = 0; i< 9; i++){
        if(board[i]===0){
          z[c]=i;
          c++;
        }
      }
      return z[Math.floor(Math.random() * (c-1))];
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
        rot[i][j] = Math.floor((3-board[this.filter[i][j]])/2); //-1を2に変換
      }
    }
    let out = [];
    let max = -1;
    let fil = 0
    for(let i=0; i<rot.length; i++){
      let x = h2n(rot[i]);
      if(max < x){
        out = rot[i];
        max = x;
        fil = i;
      }
    }
    return [fil, out];
  }
  
  rerotate(x, fil){ //回転を戻す
    return this.filter[fil].findIndex(x);
  }


  h2n(a){
    let out=0;
    for(let i=0;i<9;i++){
      out += a[i]* Math.pow(10, i-8);
    }
    return out;
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
function calc(){
  return [1, ["a","b", "c","d"]]
}

a = calc()
console.log(a[0])
console.log(a[1])