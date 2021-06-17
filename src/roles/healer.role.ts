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
      const outposts = creep.room.find(FIND_FLAGS);
      const healerOutposts = _.filter(outposts, outpost => outpost.name.includes("healer"));
      creep.moveTo(healerOutposts[0], { visualizePathStyle: { stroke: "#f40408" } });
    }
  }
};

export default RoleHealer;
