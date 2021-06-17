export default function returnToOutpost(creep: Creep): void {
  const target = creep.pos.findClosestByPath(FIND_FLAGS, {
    filter: outpost => {
      return outpost.name.includes(creep.memory.role);
    }
  });

  if (target) {
    creep.moveTo(target.pos, { visualizePathStyle: { stroke: "#f40408" } });
    if (!creep.pos.isNearTo(target)) {
      creep.say("🏠");
    }
  } else {
    creep.say("❓");
  }
}
