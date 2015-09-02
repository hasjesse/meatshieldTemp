import colors from 'node_modules/matstyle/less/colors';

export function gridUnits(units) {
  return `${units * 5}px`;
}

export function combineStyles(...args) {
  let validArgs = args.filter(arg => arg && arg.constructor === Object);
  let ret = {};
  while (validArgs.length > 0) {
    ret = {...ret, ...validArgs.shift()}
}
return ret;
}

//@TODO - remove when color work is done
colors.neutral = {
  0   : '#ffffff',
  50  : '#f5f6f7',
  100 : '#d9dee2',
  200 : '#c3c9d1',
  300 : '#97a2b2',
  400 : '#707e91',
  500 : '#4d5e77',
  600 : '#374558',
  700 : '#283346',
  800 : '#1b222e',
  900 : '#0d1017'
}

colors.accent = {
  primary : {
    50  : '#e6f2ff' ,
    100 : '#d4edff' ,
    200 : '#b6e0ff' ,
    300 : '#94ccff' ,
    400 : '#55aeff' ,
    500 : '#007aff' ,
    600 : '#0252c6' ,
    700 : '#083e7f' ,
    800 : '#002951' ,
    900 : '#001c3d'
  }
}

colors.poppy = {
  100 : '#ffdbd9' ,
  200 : '#ffb3b3' ,
  300 : '#ff8482' ,
  400 : '#ff5957' ,
  500 : '#e71336' ,
  600 : '#b9001d' ,
  700 : '#890e1b' ,
  800 : '#61090e' ,
  900 : '#3c0707'
}

colors.bajateal = {
  50  : '#e5f9f5' ,
  100 : '#d5faf3' ,
  200 : '#bdf1e8' ,
  300 : '#94eddc' ,
  400 : '#3fc7b0' ,
  500 : '#00a888' ,
  600 : '#00846b' ,
  700 : '#226659' ,
  800 : '#184940' ,
  900 : '#0f332c'
}



export {colors as colors}