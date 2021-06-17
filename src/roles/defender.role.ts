import returnToOutpost from "actions/returnToOutpost.action";

const RoleDefender: Role = {
  run(creep: Creep): void {
    const targets = creep.room.find(FIND_HOSTILE_CREEPS);

    if (targets.length) {
      if (creep.attack(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#f40408" } });
      }
    } else {
      returnToOutpost(creep);
    }
  }
};

export default RoleDefender;
