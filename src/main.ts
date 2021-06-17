import { ErrorMapper } from "utils/ErrorMapper";
import RoleBuilder from "roles/builder.role";
import RoleDefender from "roles/defender.role";
import RoleHarvester from "roles/harvester.role";
import RoleHealer from "roles/healer.role";
import RoleUpgrader from "roles/upgrader.role";
import spawnUnits from "actions/spawnUnits.action";

const PRINT_TIME_FREQUENCY = 10;

const units = {
  harvesters: {
    title: "Harvester",
    role: "harvester",
    max: 3,
    body: [WORK, CARRY, MOVE]
  },
  upgraders: {
    title: "Upgrader",
    role: "upgrader",
    max: 3,
    body: [WORK, CARRY, MOVE]
  },
  bigUpgraders: {
    title: "Big Upgrader",
    role: "upgrader",
    max: 2,
    body: [WORK, CARRY, CARRY, MOVE, MOVE, MOVE]
  },
  builders: {
    title: "Builder",
    role: "builder",
    max: 3,
    body: [WORK, CARRY, MOVE]
  },
  defenders: {
    title: "Defender",
    role: "defender",
    max: 2,
    body: [TOUGH, ATTACK, MOVE]
  },
  bigDefenders: {
    title: "Big Defender",
    role: "defender",
    max: 2,
    body: [TOUGH, ATTACK, ATTACK, MOVE, MOVE, MOVE]
  },
  healers: {
    title: "Healer",
    role: "healer",
    max: 1,
    body: [TOUGH, HEAL, MOVE]
  }
};

export const loop = ErrorMapper.wrapLoop(() => {
  if (Game.time % PRINT_TIME_FREQUENCY === 0) {
    console.log(`Current game tick is ${Game.time}`);
  }

  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  spawnUnits(units.harvesters);
  spawnUnits(units.upgraders);
  spawnUnits(units.builders);
  spawnUnits(units.defenders);
  spawnUnits(units.healers);
  spawnUnits(units.bigUpgraders);

  if (Game.spawns.Spawn1.spawning) {
    const spawningCreep = Game.creeps[Game.spawns.Spawn1.spawning.name];
    Game.spawns.Spawn1.room.visual.text(
      "🛠️" + spawningCreep.memory.role,
      Game.spawns.Spawn1.pos.x + 1,
      Game.spawns.Spawn1.pos.y,
      { align: "left", opacity: 0.8 }
    );
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];

    switch (creep.memory.role) {
      case "harvester":
        RoleHarvester.run(creep);
        break;
      case "upgrader":
        RoleUpgrader.run(creep);
        break;
      case "builder":
        RoleBuilder.run(creep);
        break;
      case "defender":
        RoleDefender.run(creep);
        break;
      case "healer":
        RoleHealer.run(creep);
        break;
    }
  }
});
