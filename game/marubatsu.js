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
    document.getElementById("msg").textContent = "Let's play the game!";
  }

  proceed(place){
    if(this.end){
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
      this.aSente.next(this.board);
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
        document.getElementById("msg").textContent = "○の勝ちです！";
      }
      if(this.winner === -1){
        document.getElementById("msg").textContent = "×の勝ちです！";
      }
      if(this.winner === 0){
        document.getElementById("msg").textContent = "引き分け！";
      }
    }else{

    }
    
    return flag;
  }
}

class Agent{
  constructor(teban, com){  //teban:先手1、後手-1、　com:false, 機械true
    this.teban = teban;
    this.com = com;
  }

  next(board){
    if(this.com){
      setTimeout(console.log("sleep()"),3000);
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
}

const g = new Game();