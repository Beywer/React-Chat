import {
  red, pink, purple, indigo, blue, teal, green, lightGreen, amber, orange, deepOrange, deepPurple, blueGrey
} from 'material-ui/colors'

const colors = [
  red, pink, purple, indigo, blue, teal, green, lightGreen, amber, orange, deepOrange, deepPurple, blueGrey
];

export default function colorFrom(string) {
  try {
    const index = string
      .toString()
      .split('')
      .map(char => char.charCodeAt())
      .reduce((sum, charCode) => sum + charCode, 0);

    const colorIndex = index % colors.length;
    return colors[colorIndex][500];

  } catch (err) {
    console.error(err);
    return blueGrey[500];
  }
}
