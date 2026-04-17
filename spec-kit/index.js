const testSuites = [];
let currentSuite = null;

function describe(description, fn) {
  const suite = {description, tests: []};
  testSuites.push(suite);
  const previousSuite = currentSuite;
  currentSuite = suite;
  fn();
  currentSuite = previousSuite;
}

function it(description, fn) {
  if (!currentSuite) {
    throw new Error('`it` must be called inside `describe`');
  }
  currentSuite.tests.push({description, fn});
}

function expect(actual) {
  return {
    toEqual(expected) {
      const actualJson = JSON.stringify(actual);
      const expectedJson = JSON.stringify(expected);
      if (actualJson !== expectedJson) {
        throw new Error(`Expected ${expectedJson}, but got ${actualJson}`);
      }
    },
    toBe(value) {
      if (actual !== value) {
        throw new Error(`Expected ${value}, but got ${actual}`);
      }
    },
    toContain(value) {
      if (!Array.isArray(actual)) {
        throw new Error('toContain expects an array');
      }
      if (!actual.includes(value)) {
        throw new Error(`Expected array to contain ${value}`);
      }
    }
  };
}

async function runSpecs(specFiles) {
  let passed = 0;
  let failed = 0;

  for (const file of specFiles) {
    require(file);
  }

  for (const suite of testSuites) {
    console.log(suite.description);
    for (const test of suite.tests) {
      try {
        const result = test.fn();
        if (result instanceof Promise) {
          await result;
        }
        console.log(`  ✅ ${test.description}`);
        passed += 1;
      } catch (error) {
        console.log(`  ❌ ${test.description}`);
        console.error(`    ${error.message}`);
        failed += 1;
      }
    }
    console.log('');
  }

  console.log(`Specs: ${passed + failed} total, ${passed} passed, ${failed} failed`);

  if (failed > 0) {
    process.exitCode = 1;
  }
}

module.exports = {
  describe,
  it,
  expect,
  runSpecs
};
