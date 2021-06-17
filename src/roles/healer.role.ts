import returnToOutpost from "actions/returnToOutpost.action";

const RoleHealer: Role = {
  run(creep: Creep): void {
    const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
      filter(object) {
        return object.hits < object.hitsMax;
      }
    });

    if (target) {
      creep.moveTo(target);
      if (creep.pos.isNearTo(target)) {
        creep.heal(target);
      } else {
        creep.rangedHeal(target);
      }
    } else {
      returnToOutpost(creep);
    }
  }
};

export default RoleHealer;
