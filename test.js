if (sortByDate) {
    data.data.tools.sort((a, b) => new Date(a.published_in) - new Date(b.published_in) );
  }