const RoleBuilder: Role = {
  run(creep) {
    if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
      creep.memory.working = false;
      creep.say("🔄 harvest");
    }

    if (!creep.memory.working && creep.store.getFreeCapacity() === 0) {
      creep.memory.working = true;
      creep.say("🚧 build");
    }

    if (creep.memory.working) {
      const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
      if (targets.length) {
        if (creep.build(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      } else {
        const repairTargets = creep.room.find(FIND_STRUCTURES, {
          filter: object => object.hits < object.hitsMax
        });

        repairTargets.sort((a, b) => a.hits - b.hits);

        if (repairTargets.length > 0) {
          if (creep.repair(repairTargets[0]) === ERR_NOT_IN_RANGE) {
            creep.moveTo(repairTargets[0]);
          }
        }
      }
    } else {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[0], { visualizePathStyle: { stroke: "#ffaa00" } });
      }
    }
  }
};

export default RoleBuilder;
