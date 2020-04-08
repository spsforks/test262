// Copyright (C) 2020 Rick Waldron. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-atomics.waitasync
description: >
  False timeout arg should result in an +0 timeout
info: |
  Atomics.waitAsync( typedArray, index, value, timeout )

  1. Return DoWait(async, typedArray, index, value, timeout).

  DoWait ( mode, typedArray, index, value, timeout )

  6. Let q be ? ToNumber(timeout).

includes: [atomicsHelper.js]
features: [Atomics.waitAsync, SharedArrayBuffer, TypedArray, Atomics]
---*/
const RUNNING = 1;

$262.agent.start(`
  const valueOf = {
    valueOf() {
      return false;
    }
  };

  const toPrimitive = {
    [Symbol.toPrimitive]() {
      return false;
    }
  };

  $262.agent.receiveBroadcast(async (sab) => {
    const i32a = new Int32Array(sab);
    Atomics.add(i32a, ${RUNNING}, 1);
    $262.agent.report(await Atomics.waitAsync(i32a, 0, 0, false).value);
    $262.agent.report(await Atomics.waitAsync(i32a, 0, 0, valueOf).value);
    $262.agent.report(await Atomics.waitAsync(i32a, 0, 0, toPrimitive).value);
    $262.agent.report(Atomics.waitAsync(i32a, 0, 0, false).value);
    $262.agent.report(Atomics.waitAsync(i32a, 0, 0, valueOf).value);
    $262.agent.report(Atomics.waitAsync(i32a, 0, 0, toPrimitive).value);
    $262.agent.leaving();
  });
`);

const i32a = new Int32Array(
  new SharedArrayBuffer(Int32Array.BYTES_PER_ELEMENT * 4)
);

$262.agent.safeBroadcast(i32a);
$262.agent.waitUntil(i32a, RUNNING, 1);
$262.agent.tryYield();

assert.sameValue(
  $262.agent.getReport(),
  'timed-out',
  'await Atomics.waitAsync(i32a, 0, 0, false).value resolves to "timed-out"'
);
assert.sameValue(
  $262.agent.getReport(),
  'timed-out',
  'await Atomics.waitAsync(i32a, 0, 0, valueOf).value resolves to "timed-out"'
);
assert.sameValue(
  $262.agent.getReport(),
  'timed-out',
  'await Atomics.waitAsync(i32a, 0, 0, toPrimitive).value resolves to "timed-out"'
);
assert.sameValue(
  $262.agent.getReport(),
  'timed-out',
  'Atomics.waitAsync(i32a, 0, 0, false).value resolves to "timed-out"'
);
assert.sameValue(
  $262.agent.getReport(),
  'timed-out',
  'Atomics.waitAsync(i32a, 0, 0, valueOf).value resolves to "timed-out"'
);
assert.sameValue(
  $262.agent.getReport(),
  'timed-out',
  'Atomics.waitAsync(i32a, 0, 0, toPrimitive).value resolves to "timed-out"'
);

assert.sameValue(Atomics.notify(i32a, 0), 0, 'Atomics.notify(i32a, 0) returns 0');