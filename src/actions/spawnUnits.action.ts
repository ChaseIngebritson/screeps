export default function spawnUnits(options: SpawnUnitsOptions): void {
  const targets = _.filter(Game.creeps, creep => creep.memory.role === options.role);

  if (targets.length < options.max) {
    const newName = `${options.title} ${Game.time}`;

    if (Game.spawns.Spawn1.isActive()) {
      console.log("isActive");
      Game.spawns.Spawn1.memory.working = false;
    }

    if (Game.spawns.Spawn1.memory.working) {
      console.log("isWorking");
      return;
    }

    const spawning = Game.spawns.Spawn1.spawnCreep(options.body, newName, {
      memory: {
        role: options.role,
        working: false
      }
    });

    if (spawning === 0) {
      Game.spawns.Spawn1.memory.working = true;
      console.log(`Spawning new ${options.title}: ${newName}`);
    } else if (spawning === ERR_NOT_ENOUGH_ENERGY) {
      console.log(`Unable to spawn ${options.title}, not enough energy.`);
    }
  } else if (targets.length > options.max) {
    const toDestroy = targets.length - options.max;

    for (let i = 0; i < toDestroy; i++) {
      targets[i].suicide();
    }
  }
}

interface SpawnUnitsOptions {
  title: string;
  role: string;
  max: number;
  body: BodyPartConstant[];
}
