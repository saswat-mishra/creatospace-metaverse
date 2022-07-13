const KeyboardControls = (actions) => {
  let sitting = false,
    standing = true,
    walking;
  const keyPressed = {
    w: false,
    a: false,
    s: false,
    d: false,
    f: false,
    g: false,
    h: false,
    e: false,
  };
  let walkFlag = false;

  window.addEventListener("keydown", (e) => {
    if (e.key.toLowerCase() == "w") {
      keyPressed.w = true;
      if (!walkFlag) {
        actions["stand-idle"]?.fadeOut(0.5);
        actions["walk"]?.reset().fadeIn(0.5).play();
        walkFlag = true;
      }
    } else if (e.key.toLowerCase() == "a") {
      keyPressed.a = true;
    } else if (e.key.toLowerCase() == "s") {
      keyPressed.s = true;
    } else if (e.key.toLowerCase() == "d") {
      keyPressed.d = true;
    }
    // else if (e.key.toLowerCase() == "e") {
    //   if (standing) {
    //     actions["stand-idle"]?.fadeOut(0.5);
    //     actions["sit"]?.reset().fadeIn(0.5).play();
    //     setTimeout(() => {
    //       actions["sit"]?.fadeOut(0.5);
    //       actions["sit-idle"]?.reset().fadeIn(0.5).play();
    //     }, 1500);
    //     sitting = true;
    //     standing = false;
    //   } else if (sitting) {
    //     actions["sit-idle"]?.fadeOut(0.5);
    //     actions["standup"]?.reset().fadeIn(0.5).play();
    //     setTimeout(() => {
    //       actions["standup"]?.fadeOut(0.5);
    //       actions["stand-idle"]?.reset().fadeIn(0.5).play();
    //     }, 1500);
    //     standing = true;
    //     sitting = false;
    //   }

    //   keyPressed.e = true;
    // }
    // else if (e.key.toLowerCase() == "f") {
    //   if (sitting) {
    //     actions["sit-idle"]?.fadeOut(0.5);
    //     actions["standing-clap"]?.reset().fadeIn(0.5).play();
    //     setTimeout(() => {
    //       actions["standing-clap"]?.fadeOut(0.5);
    //       actions["sit-idle"]?.reset().fadeIn(0.5).play();
    //     }, 2500);
    //   }
    //   keyPressed.f = true;
    // } else if (e.key.toLowerCase() == "g") {
    //   if (sitting) {
    //     actions["sit-idle"]?.fadeOut(0.5);
    //     actions["enthusiastic-clap"]?.reset().fadeIn(0.5).play();
    //     setTimeout(() => {
    //       actions["enthusiastic-clap"]?.fadeOut(0.5);
    //       actions["sit-idle"]?.reset().fadeIn(0.5).play();
    //     }, 1500);
    //   }
    //   keyPressed.g = true;
    // } else if (e.key.toLowerCase() == "h") {
    //   keyPressed.h = true;
    // }
  });
  window.addEventListener("keyup", (e) => {
    if (e.key.toLowerCase() == "w") {
      keyPressed.w = false;
      actions["walk"]?.fadeOut(0.5);
      actions["stand-idle"]?.reset().fadeIn(0.5).play();
      walkFlag = false;
    } else if (e.key.toLowerCase() == "a") {
      keyPressed.a = false;
    } else if (e.key.toLowerCase() == "s") {
      keyPressed.s = false;
    } else if (e.key.toLowerCase() == "d") {
      keyPressed.d = false;
    }
  });

  return keyPressed;
};

export default KeyboardControls;
