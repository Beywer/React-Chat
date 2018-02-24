export default function titleInitials(title) {
  try {
    return title
      .split(' ')
      .map(word => word[0])
      .map(chart => chart.toUpperCase())
      .slice(0, 2)
      .join('');
  } catch (err) {
    console.error(err);
    return 'DG';
  }
}
