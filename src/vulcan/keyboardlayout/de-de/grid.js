import * as keylist from "./keys.js";
import * as consts from "../../../consts.js";

export const KEYGRID = [
  //Row #0
  [
    keylist.KEYMAPPER.ESC,
    consts.NOKEY,
    keylist.KEYMAPPER.F1,
    keylist.KEYMAPPER.F2,
    keylist.KEYMAPPER.F3,
    keylist.KEYMAPPER.F4,
    consts.NOKEY,
    keylist.KEYMAPPER.F5,
    keylist.KEYMAPPER.F6,
    keylist.KEYMAPPER.F7,
    keylist.KEYMAPPER.F8,
    keylist.KEYMAPPER.F9,
    keylist.KEYMAPPER.F10,
    keylist.KEYMAPPER.F11,
    keylist.KEYMAPPER.F12,
    keylist.KEYMAPPER.PRTSCR,
    keylist.KEYMAPPER.SCROLLLOCK,
    keylist.KEYMAPPER.PAUSE,
    consts.NOKEY,
    consts.NOKEY,
    consts.NOKEY,
    consts.NOKEY,
  ],

  //Row #1
  [
    keylist.KEYMAPPER['^'],
    keylist.KEYMAPPER['1'],
    keylist.KEYMAPPER['2'],
    keylist.KEYMAPPER['3'],
    keylist.KEYMAPPER['4'],
    keylist.KEYMAPPER['5'],
    keylist.KEYMAPPER['6'],
    keylist.KEYMAPPER['7'],
    keylist.KEYMAPPER['8'],
    keylist.KEYMAPPER['9'],
    keylist.KEYMAPPER['0'],
    keylist.KEYMAPPER["ß"],
    keylist.KEYMAPPER['´'],
    consts.NOKEY,
    keylist.KEYMAPPER.BACKSPACE,
    keylist.KEYMAPPER.INSERT,
    keylist.KEYMAPPER.HOME,
    keylist.KEYMAPPER.PAGEUP,
    keylist.KEYMAPPER.NUMLOCK,
    keylist.KEYMAPPER.KPSLASH,
    keylist.KEYMAPPER.KPASTERISK,
    keylist.KEYMAPPER.KPMINUS
  ],

  //Row #2
  [
    keylist.KEYMAPPER.TAB,
    keylist.KEYMAPPER['Q'],
    keylist.KEYMAPPER['W'],
    keylist.KEYMAPPER['E'],
    keylist.KEYMAPPER['R'],
    keylist.KEYMAPPER['T'],
    keylist.KEYMAPPER['Z'],
    keylist.KEYMAPPER['U'],
    keylist.KEYMAPPER['I'],
    keylist.KEYMAPPER['O'],
    keylist.KEYMAPPER['P'],
    keylist.KEYMAPPER['Ü'],
    keylist.KEYMAPPER['+'],
    consts.NOKEY,
    keylist.KEYMAPPER.ENTER,
    keylist.KEYMAPPER.DELETE,
    keylist.KEYMAPPER.END,
    keylist.KEYMAPPER.PAGEDOWN,
    keylist.KEYMAPPER.KP7,
    keylist.KEYMAPPER.KP8,
    keylist.KEYMAPPER.KP9,
    keylist.KEYMAPPER.KPPLUS,
  ],

  ///Row #3
  [
    keylist.KEYMAPPER.CAPSLOCK,
    keylist.KEYMAPPER['A'],
    keylist.KEYMAPPER['S'],
    keylist.KEYMAPPER['D'],
    keylist.KEYMAPPER['F'],
    keylist.KEYMAPPER['G'],
    keylist.KEYMAPPER['H'],
    keylist.KEYMAPPER['J'],
    keylist.KEYMAPPER['K'],
    keylist.KEYMAPPER['L'],
    keylist.KEYMAPPER['Ö'],
    keylist.KEYMAPPER['Ä'],
    keylist.KEYMAPPER['#'],
    consts.NOKEY,
    consts.NOKEY,
    consts.NOKEY,
    consts.NOKEY,
    consts.NOKEY,
    keylist.KEYMAPPER.KP4,
    keylist.KEYMAPPER.KP5,
    keylist.KEYMAPPER.KP6,
    consts.NOKEY
  ],

  //Row #4
  [
    keylist.KEYMAPPER.LEFTSHIFT,
    keylist.KEYMAPPER['<'],
    keylist.KEYMAPPER['Y'],
    keylist.KEYMAPPER['X'],
    keylist.KEYMAPPER['C'],
    keylist.KEYMAPPER['V'],
    keylist.KEYMAPPER['B'],
    keylist.KEYMAPPER['N'],
    keylist.KEYMAPPER['M'],
    keylist.KEYMAPPER[','],
    keylist.KEYMAPPER['.'],
    keylist.KEYMAPPER['-'],
    consts.NOKEY,
    keylist.KEYMAPPER.RIGHTSHIFT,
    consts.NOKEY,
    consts.NOKEY,
    keylist.KEYMAPPER.UP,
    consts.NOKEY,
    keylist.KEYMAPPER.KP1,
    keylist.KEYMAPPER.KP2,
    keylist.KEYMAPPER.KP3,
    keylist.KEYMAPPER.KPENTER,
  ],

  //Row #5
  [
    keylist.KEYMAPPER.LEFTCTRL,
    keylist.KEYMAPPER.LEFTMETA,
    keylist.KEYMAPPER.LEFTALT,
    consts.NOKEY,
    consts.NOKEY,
    consts.NOKEY,
    keylist.KEYMAPPER.SPACE,
    consts.NOKEY,
    consts.NOKEY,
    consts.NOKEY,
    keylist.KEYMAPPER.RIGHTALT,
    keylist.KEYMAPPER.FN,
    keylist.KEYMAPPER.COMPOSE,
    keylist.KEYMAPPER.RIGHTCTRL,
    keylist.KEYMAPPER.LEFT,
    keylist.KEYMAPPER.DOWN,
    keylist.KEYMAPPER.RIGHT,
    keylist.KEYMAPPER.KP0,
    consts.NOKEY,
    consts.NOKEY,
    keylist.KEYMAPPER.KPDOT,
    consts.NOKEY
  ]
]