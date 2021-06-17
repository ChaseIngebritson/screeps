export default function returnToOutpost(creep: Creep): void {
  const target = creep.pos.findClosestByPath(FIND_FLAGS, {
    filter: outpost => {
      return outpost.name.includes(creep.memory.role);
    }
  });

  if (target) {
    if (creep.memory.working) {
      creep.memory.working = false;
      creep.say("🏠");
    }

    creep.moveTo(target.pos, { visualizePathStyle: { stroke: "#f40408" } });
  } else {
    creep.say("❓");
  }
}
