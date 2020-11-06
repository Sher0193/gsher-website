export const populatePages = (page, endPage) => {
  const array =
    endPage < 6
      ? Array.from(Array(endPage).keys())
      : Array.from(Array(6).keys());
  let i = 0;
  if (page + 3 > endPage) {
    for (const x in array) {
      array[x] = i + (endPage - (array.length - 1));
      i++;
    }
  } else if (page < 4) {
    for (const x in array) {
      array[x] = i + 1;
      i++;
    }
  } else {
    for (const x in array) {
      array[x] = i + page - 3;
      i++;
    }
  }
  return array;
};

export const arraysEqual = (a, b) => {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  // Please note that calling sort on an array will modify that array.
  // you might want to clone your array first.

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
