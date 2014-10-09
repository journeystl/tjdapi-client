module.exports.empty = {
  num_found: 0,
  limit: 50,
  offset: 0,
  results: [],
}

module.exports.one = {
  num_found: 1,
  limit: 50,
  offset: 0,
  results: [
    {
      foo: "bar",
    }
  ],
}

module.exports.many = {
  num_found: 2,
  limit: 50,
  offset: 0,
  results: [
    {
      foo: "bar",
    },
    {
      foo: "bar1",
    }
  ],
}

module.exports.manyMoreOne = {
  num_found: 6,
  limit: 2,
  offset: 0,
  results: new Array(2),
}

module.exports.manyMoreTwo = {
  num_found: 6,
  limit: 2,
  offset: 2,
  results: new Array(2),
}

module.exports.manyMoreThree = {
  num_found: 6,
  limit: 2,
  offset: 4,
  results: new Array(2),
}