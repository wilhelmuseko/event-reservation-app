exports.snakeCaseToTitleCase = (input) => {
  if (input.includes('.')) {
    const index = input.lastIndexOf('.');
    input = input.slice(index + 1);
  }
  return (input.charAt(0).toUpperCase() + input.slice(1)).replace(/_/g, ' ');
};
