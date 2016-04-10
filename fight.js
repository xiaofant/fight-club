'use strict';

// Character Class definition
class Character {
  constructor(name, health, attack, defense) {
    this.name = name;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
  }
}

Character.prototype.attackCharacter = function(defender) {
  var base_damage = Math.abs(this.health - defender.health);
  var random_damage = Math.floor(Math.random() * 5);
  var total_damage = base_damage + random_damage;

  defender.health -= total_damage;

  console.log("%s does %d damage to %s\n", this.name, total_damage, defender.name);
  //console.log("attackCharacter! return: %d \n", total_damage);
  return total_damage;
}

// Main Fight Logic
var player = new Character('Edward Norton', 100, 25, 20);
var enemy  = new Character('Tyler Durden', 100, 25, 20);
var round  = 1;

while (player.health && enemy.health) {
  runRound(round, player, enemy);
  round++;
  console.log('');
}

function runRound(round, p1, p2) {

  console.log('----- Round %d -----\n', round);

  p1.attackCharacter(p2);
  //check, if defender's health falls strictly below zero, the games ends
  if (p2.health < 0 ){
    endGame(p1, p2);
  }
  p2.attackCharacter(p1);
  //check, if defender's health falls strictly below zero, the game ends
  if (p1.health < 0){
    endGame(p2, p1);
  }

  //log each player's health at the end of each round
  console.log("%s health: %d\n", p1.name, p1.health);
  console.log("%s health: %d\n", p2.name, p2.health);

}

function endGame(winner, loser) {
  console.log('\n======== GAME OVER ========');
  console.log(winner.name + " wins against " + loser.name + " with " + winner.health + " health remaining!");
  process.exit();
}
