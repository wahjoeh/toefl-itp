const listeningScoreTable = {
  50: 68, 49: 67, 48: 66, 47: 65, 46: 63,
  45: 62, 44: 61, 43: 60, 42: 59, 41: 58,
  40: 57, 39: 57, 38: 56, 37: 55, 36: 54,
  35: 54, 34: 53, 33: 52, 32: 52, 31: 51,
  30: 51, 29: 50, 28: 49, 27: 49, 26: 48,
  25: 48, 24: 47, 23: 47, 22: 46, 21: 45,
  20: 45, 19: 44, 18: 43, 17: 42, 16: 41,
  15: 41, 14: 39, 13: 38, 12: 37, 11: 35,
  10: 33, 9: 32, 8: 32, 7: 31, 6: 30,
  5: 29, 4: 28, 3: 27, 2: 26, 1: 25, 0: 24
}

const readingScoreTable = {
  50: 67, 49: 66, 48: 65, 47: 63, 46: 61,
  45: 60, 44: 59, 43: 58, 42: 57, 41: 56,
  40: 55, 39: 54, 38: 54, 37: 53, 36: 52,
  35: 52, 34: 51, 33: 50, 32: 49, 31: 48,
  30: 48, 29: 47, 28: 46, 27: 46, 26: 45,
  25: 44, 24: 43, 23: 43, 22: 42, 21: 41,
  20: 40, 19: 39, 18: 38, 17: 37, 16: 36,
  15: 35, 14: 34, 13: 32, 12: 31, 11: 30,
  10: 29, 9: 28, 8: 28, 7: 27, 6: 26,
  5: 25, 4: 24, 3: 23, 2: 23, 1: 22, 0: 21
}

export const convertListeningScore =
  correct =>
    listeningScoreTable[correct] || 24

export const convertReadingScore =
  correct =>
    readingScoreTable[correct] || 21

export const structureScoreTable = {

  0:20,
  1:21,
  2:22,
  3:23,
  4:24,
  5:25,
  6:26,
  7:27,
  8:29,
  9:31,
  10:33,
  11:35,
  12:37,
  13:39,
  14:41,
  15:43,
  16:45,
  17:47,
  18:49,
  19:51,
  20:53,
  21:55,
  22:57,
  23:59,
  24:61,
  25:63,
  26:65,
  27:67,
  28:68,
  29:69,
  30:70,
  31:71,
  32:72,
  33:73,
  34:74,
  35:75,
  36:76,
  37:77,
  38:78,
  39:79,
  40:80

}

export const convertStructureScore =
  correct =>
    structureScoreTable[
      correct
    ] || 20

export const calculateToeflScore = (
  listeningCorrect,
  structureCorrect,
  readingCorrect
) => {

  const listeningScaled =
    convertListeningScore(
      listeningCorrect
    )

  const structureScaled =
    convertStructureScore(
      structureCorrect
    )

  const readingScaled =
    convertReadingScore(
      readingCorrect
    )

  return Math.round(
    (
      listeningScaled +
      structureScaled +
      readingScaled
    ) * 10 / 3
  )
}